"use strict";

const MODULE = "Game_v1020.exe";
const IDA_BASE = 0x400000;
const OUT_PATH = "work_aquedi\\outputs\\input_record_latest.jsonl";
const TRACE_EVERY_SUBSTEP = false;
const FRAME_SAMPLE_INTERVAL = 5;

const VK = { UP: 0x26, DOWN: 0x28, Z: 0x5A };

const A = {
    scene_manager: 0x452210,
    StageScene_LoadStage: 0x406FA0,
    StageScene_State1_Playing: 0x402D50,
    EntityVector_At: 0x401000,
    Input_UpdateStateBuffer: 0x49D250,
    Entity_ProcessActions: 0x46B210,
    Player_MoveX: 0x4A1200,
    Player_MoveY: 0x4A13B0,
    g_player_entity: 0x5B9A28,
    g_gravity: 0x5A9818,
    g_substeps: 0x5A97FC,
    g_max_air_time: 0x5A9828,
    g_max_speed: 0x5A9820
};

let base = null;
try { base = Process.getModuleByName(MODULE).base; } catch (_) {}
if (!base) throw new Error("module not found: " + MODULE);

const R = {};
for (const k in A) R[k] = base.add(A[k] - IDA_BASE);

function u16(p) { try { return ptr(p).readU16(); } catch (_) { return 0; } }
function u32(p) { try { return ptr(p).readU32(); } catch (_) { return 0; } }
function dbl(p) { try { return ptr(p).readDouble(); } catch (_) { return NaN; } }
function fp(v) { return isFinite(v) ? Math.round(v * 1000000) / 1000000 : null; }

let out = null;
try {
    out = new File(OUT_PATH, "w");
} catch (e) {
    console.log("[record] File open failed: " + e);
}

function emit(obj) {
    const line = JSON.stringify(obj);
    if (out) {
        out.write(line + "\n");
        out.flush();
    }
    if (obj.type !== "input" && obj.type !== "frame" || obj.changed) {
        console.log(line);
    }
}

let cachedPlayer = ptr(0);
function playerPtr() {
    if (cachedPlayer && !cachedPlayer.isNull()) return cachedPlayer;
    const first = u32(R.g_player_entity.add(4));
    const last = u32(R.g_player_entity.add(8));
    if (!first || !last || last <= first) return ptr(0);
    return ptr(first);
}

function playerState() {
    const e = playerPtr();
    if (!e || e.isNull()) return null;
    return {
        p: e.toString(),
        x0: fp(dbl(e.add(0x80))),
        y0: fp(dbl(e.add(0x88))),
        x1: fp(dbl(e.add(0x90))),
        y1: fp(dbl(e.add(0x98))),
        vx: fp(dbl(e.add(0xB0))),
        vy: fp(dbl(e.add(0xB8))),
        accel_x: fp(dbl(e.add(0xC0))),
        accel_y: fp(dbl(e.add(0xC8))),
        decel: fp(dbl(e.add(0xD0))),
        impact_x: fp(dbl(e.add(0x288))),
        impact_y: fp(dbl(e.add(0x290))),
        floor_tile: u32(e.add(0x2C8)),
        in_air: u32(e.add(0x2B0)),
        air_time: u32(e.add(0x2C4)),
        stand_parent: u32(e.add(0x32C))
    };
}

const navScript = [
    { t0: 1200, t1: 1500, vk: VK.Z,    name: "title Z" },
    { t0: 2600, t1: 2900, vk: VK.DOWN, name: "menu down 1" },
    { t0: 3400, t1: 3700, vk: VK.DOWN, name: "menu down 2" },
    { t0: 4300, t1: 4600, vk: VK.UP,   name: "submenu up" },
    { t0: 5200, t1: 5500, vk: VK.Z,    name: "stage Z" }
];

let navStartMs = 0;
let pollTick = 0;
let navEnabled = true;
let stageLoading = false;
let playingFrame = 0;
let lastSceneId = -1;
let lastInput = null;
let lastInputKey = "";

function isSyntheticKeyDown(vk) {
    if (!navEnabled || stageLoading || navStartMs === 0) return false;
    const elapsed = Date.now() - navStartMs;
    for (let i = 0; i < navScript.length; i++) {
        const ev = navScript[i];
        if (ev.vk === vk && elapsed >= ev.t0 && elapsed < ev.t1) return true;
    }
    return false;
}

const realGetAsyncKeyState = Module.getGlobalExportByName("GetAsyncKeyState");
const keybdEventPtr = Module.getGlobalExportByName("keybd_event");
const keybdEvent = new NativeFunction(keybdEventPtr, "void", ["uint8", "uint8", "uint32", "pointer"]);
const findWindowA = new NativeFunction(Module.getGlobalExportByName("FindWindowA"), "pointer", ["pointer", "pointer"]);
const postMessageA = new NativeFunction(Module.getGlobalExportByName("PostMessageA"), "int", ["pointer", "uint32", "pointer", "pointer"]);
const mapVirtualKeyA = new NativeFunction(Module.getGlobalExportByName("MapVirtualKeyA"), "uint32", ["uint32", "uint32"]);
const KEYEVENTF_KEYUP = 0x0002;
const WM_KEYDOWN = 0x0100;
const WM_KEYUP = 0x0101;

function scheduleNavKeyEvents() {
    const hwnd = findWindowA(Memory.allocAnsiString("ActionEditor4"), ptr(0));
    emit({ type: "nav_window", hwnd: hwnd.toString(), t: Date.now() });
    for (let i = 0; i < navScript.length; i++) {
        const ev = navScript[i];
        setTimeout(function () {
            if (!navEnabled || stageLoading) return;
            emit({ type: "nav", event: ev.name, state: "down", elapsed: Date.now() - navStartMs, t: Date.now() });
            keybdEvent(ev.vk, 0, 0, ptr(0));
            const scan = mapVirtualKeyA(ev.vk, 0);
            postMessageA(hwnd, WM_KEYDOWN, ptr(ev.vk), ptr(1 | (scan << 16)));
        }, ev.t0);
        setTimeout(function () {
            emit({ type: "nav", event: ev.name, state: "up", elapsed: Date.now() - navStartMs, t: Date.now() });
            keybdEvent(ev.vk, 0, KEYEVENTF_KEYUP, ptr(0));
            const scan = mapVirtualKeyA(ev.vk, 0);
            postMessageA(hwnd, WM_KEYUP, ptr(ev.vk), ptr(0xC0000001 | (scan << 16)));
        }, ev.t1);
    }
}

Interceptor.attach(realGetAsyncKeyState, {
    onEnter(args) {
        this.vk = args[0].toInt32() & 0xFFFF;
    },
    onLeave(ret) {
        if (isSyntheticKeyDown(this.vk)) ret.replace(0x8001);
    }
});

emit({
    type: "meta",
    base: base.toString(),
    out: OUT_PATH,
    gravity: fp(dbl(R.g_gravity)),
    substeps: u32(R.g_substeps),
    max_air_time: u32(R.g_max_air_time),
    max_speed: fp(dbl(R.g_max_speed)),
    t: Date.now()
});

Interceptor.attach(R.scene_manager, {
    onEnter(args) {
        const id = args[0].toInt32();
        if (id !== lastSceneId) emit({ type: "scene", id: id, ecx: this.context.ecx.toString(), t: Date.now() });
        if (id === 0 && navStartMs === 0) {
            navStartMs = Date.now();
            scheduleNavKeyEvents();
        }
        lastSceneId = id;
    }
});

Interceptor.attach(R.EntityVector_At, {
    onEnter(args) {
        this.vec = args[0];
        this.idx = args[1].toInt32();
    },
    onLeave(ret) {
        if (this.vec.equals(R.g_player_entity) && this.idx === 0 && !ret.isNull()) cachedPlayer = ret;
    }
});

Interceptor.attach(R.StageScene_LoadStage, {
    onEnter(args) {
        stageLoading = true;
        navEnabled = false;
        emit({ type: "stage_load_enter", ecx: this.context.ecx.toString(), a0: args[0].toInt32(), a1: args[1].toInt32(), t: Date.now() });
    },
    onLeave(ret) {
        emit({ type: "stage_load_leave", ret: ret.toString(), player: playerState(), gravity: fp(dbl(R.g_gravity)), substeps: u32(R.g_substeps), t: Date.now() });
    }
});

Interceptor.attach(R.StageScene_State1_Playing, {
    onEnter(args) {
        playingFrame++;
        if (playingFrame === 1) emit({ type: "record_start", note: "Synthetic menu input stopped. Play now.", t: Date.now(), player: playerState() });
        if ((playingFrame % FRAME_SAMPLE_INTERVAL) === 0) emit({ type: "frame", frame: playingFrame, poll: pollTick, input: lastInput, player: playerState(), t: Date.now() });
    }
});

Interceptor.attach(R.Input_UpdateStateBuffer, {
    onEnter(args) {
        pollTick++;
        this.input = this.context.ecx;
    },
    onLeave(ret) {
        lastInput = { dir: u16(this.input), btn: u16(this.input.add(2)) };
        if (playingFrame > 0) {
            const key = lastInput.dir + ":" + lastInput.btn;
            emit({ type: "input", frame: playingFrame, poll: pollTick, changed: key !== lastInputKey, input: lastInput, player: playerState(), t: Date.now() });
            lastInputKey = key;
        }
    }
});

function hookPlayerStep(label, addr) {
    Interceptor.attach(addr, {
        onEnter(args) {
            this.p = playerPtr();
            this.hit = TRACE_EVERY_SUBSTEP && this.p && !this.p.isNull() && this.context.ecx.equals(this.p) && playingFrame > 0;
            if (this.hit) this.before = playerState();
        },
        onLeave(ret) {
            if (this.hit) emit({ type: label, frame: playingFrame, poll: pollTick, ret: ret.toInt32(), before: this.before, after: playerState(), t: Date.now() });
        }
    });
}

Interceptor.attach(R.Entity_ProcessActions, {
    onEnter(args) {
        this.p = playerPtr();
        this.hit = TRACE_EVERY_SUBSTEP && this.p && !this.p.isNull() && this.context.ecx.equals(this.p) && playingFrame > 0;
        if (this.hit) this.before = playerState();
    },
    onLeave(ret) {
        if (this.hit) emit({ type: "process_actions", frame: playingFrame, poll: pollTick, before: this.before, after: playerState(), t: Date.now() });
    }
});

hookPlayerStep("move_x", R.Player_MoveX);
hookPlayerStep("move_y", R.Player_MoveY);
