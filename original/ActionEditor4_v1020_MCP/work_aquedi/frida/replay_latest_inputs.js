"use strict";

const MODULE = "Game_v1020.exe";
const IDA_BASE = 0x400000;
const REC_PATH = "work_aquedi\\outputs\\input_record_latest.jsonl";

const VK = { UP: 0x26, DOWN: 0x28, Z: 0x5A };

const A = {
    scene_manager: 0x452210,
    StageScene_LoadStage: 0x406FA0,
    StageScene_State1_Playing: 0x402D50,
    EntityVector_At: 0x401000,
    Input_UpdateHoldCounters: 0x49D010,
    Input_UpdateStateBuffer: 0x49D250,
    g_player_entity: 0x5B9A28
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

function readReplay() {
    const byFrame = {};
    let text = "";
    try {
        text = File.readAllText(REC_PATH);
    } catch (e) {
        throw new Error("failed to read " + REC_PATH + ": " + e);
    }
    const lines = text.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line[0] !== "{") continue;
        let obj = null;
        try { obj = JSON.parse(line); } catch (_) { continue; }
        if (obj.type === "input" && obj.frame && obj.input) {
            byFrame[obj.frame | 0] = { dir: obj.input.dir | 0, btn: obj.input.btn | 0 };
        }
    }
    return byFrame;
}

const replayByFrame = readReplay();
const replayFrames = Object.keys(replayByFrame).map(function (x) { return parseInt(x, 10); }).sort(function (a, b) { return a - b; });
if (replayFrames.length === 0) throw new Error("no replay input frames in " + REC_PATH);

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
        x0: fp(dbl(e.add(0x80))),
        y0: fp(dbl(e.add(0x88))),
        x1: fp(dbl(e.add(0x90))),
        y1: fp(dbl(e.add(0x98))),
        vx: fp(dbl(e.add(0xB0))),
        vy: fp(dbl(e.add(0xB8))),
        air_time: u32(e.add(0x2C4)),
        in_air: u32(e.add(0x2B0))
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
let lastReplay = { dir: 0, btn: 0 };

function replayInputForCurrentFrame() {
    return replayByFrame[playingFrame] || lastReplay;
}

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
    console.log("[nav] hwnd=" + hwnd);
    for (let i = 0; i < navScript.length; i++) {
        const ev = navScript[i];
        setTimeout(function () {
            if (!navEnabled || stageLoading) return;
            console.log("[nav] " + ev.name + " down elapsed=" + (Date.now() - navStartMs));
            keybdEvent(ev.vk, 0, 0, ptr(0));
            const scan = mapVirtualKeyA(ev.vk, 0);
            postMessageA(hwnd, WM_KEYDOWN, ptr(ev.vk), ptr(1 | (scan << 16)));
        }, ev.t0);
        setTimeout(function () {
            console.log("[nav] " + ev.name + " up elapsed=" + (Date.now() - navStartMs));
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

console.log("[replay] loaded frames=" + replayFrames.length + " first=" + replayFrames[0] + " last=" + replayFrames[replayFrames.length - 1]);

Interceptor.attach(R.scene_manager, {
    onEnter(args) {
        const id = args[0].toInt32();
        if (id !== lastSceneId) console.log("[scene] id=" + id);
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
        console.log("[stage_load] enter a0=" + args[0].toInt32() + " a1=" + args[1].toInt32());
    },
    onLeave(ret) {
        console.log("[stage_load] leave ret=" + ret + " player=" + JSON.stringify(playerState()));
    }
});

Interceptor.attach(R.StageScene_State1_Playing, {
    onEnter(args) {
        playingFrame++;
        if (playingFrame === 1) console.log("[replay] gameplay start");
        if ((playingFrame % 30) === 0) console.log("[replay] frame=" + playingFrame + " input=" + JSON.stringify(lastReplay) + " player=" + JSON.stringify(playerState()));
    }
});

Interceptor.attach(R.Input_UpdateStateBuffer, {
    onEnter(args) {
        pollTick++;
        this.input = this.context.ecx;
    },
    onLeave(ret) {
        if (playingFrame <= 0) return;
        const next = replayInputForCurrentFrame();
        this.input.writeU16(next.dir);
        this.input.add(2).writeU16(next.btn);
        if (next.dir !== lastReplay.dir || next.btn !== lastReplay.btn) {
            console.log("[replay input] frame=" + playingFrame + " dir=" + next.dir + " btn=" + next.btn);
        }
        lastReplay = next;
    }
});

Interceptor.attach(R.Input_UpdateHoldCounters, {
    onEnter(args) {
        if (playingFrame <= 0) return;
        const next = replayInputForCurrentFrame();
        const input = this.context.ecx;
        input.writeU16(next.dir);
        input.add(2).writeU16(next.btn);
    }
});
