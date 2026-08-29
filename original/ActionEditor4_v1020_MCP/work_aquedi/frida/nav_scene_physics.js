"use strict";

const MODULE = "Game_v1020.exe";
const IDA_BASE = 0x400000;

const VK = {
    LEFT: 0x25,
    UP: 0x26,
    RIGHT: 0x27,
    DOWN: 0x28,
    Z: 0x5A,
    X: 0x58
};

const A = {
    scene_manager: 0x452210,
    StageScene_ctor: 0x4021D0,
    StageScene_Init_LoadStageFile: 0x402830,
    StageScene_LoadStage: 0x406FA0,
    StageScene_State1_Playing: 0x402D50,
    StageScene_Render: 0x4063A0,
    EntityVector_At: 0x401000,
    Input_GetVectorFromKeys: 0x49CFB0,
    Input_UpdateStateBuffer: 0x49D250,
    Entity_ProcessActions: 0x46B210,
    Entity_ApplyGravity: 0x4698B0,
    Entity_ResolveEnvironmentCollisions: 0x40CE90,
    Entity_ResolveFloorAndCeilingCollision: 0x40D390,
    Entity_CheckAllCollisions: 0x40FDE0,
    g_player_entity: 0x5B9A28,
    g_current_scene: 0x5B8DD8,
    g_input_first: 0x5A9A44,
    g_input_last: 0x5A9A48,
    g_gravity: 0x5A9818,
    g_substeps: 0x5A97FC,
    g_max_air_time: 0x5A9828
};

let base = null;
try { base = Process.getModuleByName(MODULE).base; } catch (_) {}
if (!base) throw new Error("module not found: " + MODULE);

const R = {};
for (const k in A) R[k] = base.add(A[k] - IDA_BASE);

function u8(p) { try { return ptr(p).readU8(); } catch (_) { return 0; } }
function u16(p) { try { return ptr(p).readU16(); } catch (_) { return 0; } }
function u32(p) { try { return ptr(p).readU32(); } catch (_) { return 0; } }
function s32(p) { try { return ptr(p).readS32(); } catch (_) { return 0; } }
function dbl(p) { try { return ptr(p).readDouble(); } catch (_) { return NaN; } }
function fp(v, n) { return isFinite(v) ? v.toFixed(n) : "NaN"; }

function playerPtr() {
    if (cachedPlayer && !cachedPlayer.isNull()) return cachedPlayer;
    const first = u32(R.g_player_entity.add(4));
    const last = u32(R.g_player_entity.add(8));
    if (!first || !last || last <= first) return ptr(0);
    return ptr(first);
}

function hex32(p) {
    return "0x" + u32(p).toString(16).padStart(8, "0");
}

function entityLine(e) {
    if (!e || e.isNull()) return "e=NULL";
    return "e=" + e +
        " x=[" + fp(dbl(e.add(128)), 2) + "," + fp(dbl(e.add(144)), 2) + "]" +
        " y=[" + fp(dbl(e.add(136)), 2) + "," + fp(dbl(e.add(152)), 2) + "]" +
        " v=(" + fp(dbl(e.add(176)), 3) + "," + fp(dbl(e.add(184)), 3) + ")" +
        " app=(" + fp(dbl(e.add(192)), 3) + "," + fp(dbl(e.add(200)), 3) + ")" +
        " flags LRTB=" + u32(e.add(756)) + u32(e.add(760)) + u32(e.add(764)) + u32(e.add(768)) +
        " ground=" + u32(e.add(684)) +
        " inAir=" + u32(e.add(688)) +
        " airT=" + u32(e.add(708)) +
        " stand=" + u32(e.add(812));
}

function isPlayerEntity(e) {
    const p = playerPtr();
    return p && !p.isNull() && e && !e.isNull() && e.equals(p);
}

function shouldSampleFrame() {
    return playingFrames > 0 && playingFrames <= 120 && ((playingFrames % 20) === 1);
}

function hookPlayerMethod(label, target) {
    Interceptor.attach(target, {
        onEnter(args) {
            this.e = this.context.ecx;
            this.shouldLog = isPlayerEntity(this.e) && shouldSampleFrame();
            if (this.shouldLog) console.log("[" + label + " enter] " + entityLine(this.e));
        },
        onLeave(ret) {
            if (this.shouldLog) {
                console.log("[" + label + " leave ret=" + ret.toInt32() + "] " + entityLine(this.e));
            }
        }
    });
}

function hookPlayerVtableOnce(e) {
    if (playerVtableHooked || !e || e.isNull()) return;
    const vt = e.readPointer();
    const hmove = vt.add(68).readPointer();
    const vmove = vt.add(72).readPointer();
    console.log("[player vtable] vt=" + vt + " +68=" + hmove + " +72=" + vmove);
    hookPlayerMethod("player vtbl+68", hmove);
    hookPlayerMethod("player vtbl+72", vmove);
    playerVtableHooked = true;
}

let tick = 0;
let playingFrames = 0;
let currentKeys = {};
let navEnabled = true;
let stageLoading = false;
let clearGameplayInput = true;
let cachedPlayer = ptr(0);
let lastSceneId = -1;
let playerVtableHooked = false;

const script = [
    { t0: 20,  t1: 26,  vk: VK.Z,    name: "title Z" },
    { t0: 55,  t1: 61,  vk: VK.DOWN, name: "menu down 1" },
    { t0: 85,  t1: 91,  vk: VK.DOWN, name: "menu down 2" },
    { t0: 115, t1: 121, vk: VK.UP,   name: "submenu up" },
    { t0: 145, t1: 151, vk: VK.Z,    name: "stage Z" }
];

function updateKeys() {
    tick++;
    currentKeys = {};
    if (!navEnabled || stageLoading) return;
    for (let i = 0; i < script.length; i++) {
        const ev = script[i];
        if (tick >= ev.t0 && tick < ev.t1) currentKeys[ev.vk] = true;
        if (tick === ev.t0) console.log("[nav] " + ev.name + " down tick=" + tick);
        if (tick === ev.t1) console.log("[nav] " + ev.name + " up tick=" + tick);
    }
}

const realGetAsyncKeyState = Module.getGlobalExportByName("GetAsyncKeyState");
if (!realGetAsyncKeyState) throw new Error("GetAsyncKeyState export not found");
Interceptor.attach(realGetAsyncKeyState, {
    onEnter(args) {
        this.vk = args[0].toInt32() & 0xFFFF;
    },
    onLeave(ret) {
        if (currentKeys[this.vk]) ret.replace(0x8001);
    }
});

console.log("[nav] base=" + base + " GetAsyncKeyState=" + realGetAsyncKeyState);

Interceptor.attach(R.scene_manager, {
    onEnter(args) {
        const id = args[0].toInt32();
        if (id !== lastSceneId) {
            console.log("[scene_manager] this=" + this.context.ecx + " scene_id=" + id);
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
        if (this.vec.equals(R.g_player_entity) && this.idx === 0 && !ret.isNull()) {
            cachedPlayer = ret;
        }
    }
});

Interceptor.attach(R.StageScene_ctor, {
    onEnter(args) {
        console.log("[StageScene::ctor] this=" + this.context.ecx);
    }
});

Interceptor.attach(R.StageScene_Init_LoadStageFile, {
    onEnter(args) {
        console.log("[StageScene_Init_LoadStageFile] this=" + this.context.ecx);
    }
});

Interceptor.attach(R.StageScene_LoadStage, {
    onEnter(args) {
        this.sc = this.context.ecx;
        stageLoading = true;
        navEnabled = false;
        currentKeys = {};
        console.log("[StageScene_LoadStage enter] this=" + this.sc + " a0=" + args[0].toInt32() + " a1=" + args[1].toInt32());
    },
    onLeave(ret) {
        const p = playerPtr();
        hookPlayerVtableOnce(p);
        console.log("[StageScene_LoadStage leave] ret=" + ret + " gravity=" + fp(dbl(R.g_gravity), 6) +
            " substeps=" + u32(R.g_substeps) + " maxAir=" + u32(R.g_max_air_time));
        console.log("[raw globals] gravity=" + hex32(R.g_gravity) + "/" + hex32(R.g_gravity.add(4)) +
            " substeps=" + hex32(R.g_substeps) + " maxAir=" + hex32(R.g_max_air_time) +
            " playerVec=" + hex32(R.g_player_entity) + "/" + hex32(R.g_player_entity.add(4)) + "/" + hex32(R.g_player_entity.add(8)));
        console.log("[player after load] " + entityLine(p));
    }
});

Interceptor.attach(R.Input_UpdateStateBuffer, {
    onEnter(args) {
        updateKeys();
        this.input = this.context.ecx;
    },
    onLeave(ret) {
        if (clearGameplayInput && playingFrames > 0) {
            this.input.writeU16(0);
            this.input.add(2).writeU16(0);
        }
        if (tick < 220 || (tick % 60) === 0) {
            console.log("[input] tick=" + tick +
                " dirMask=0x" + u16(this.input).toString(16) +
                " btnMask=0x" + u16(this.input.add(2)).toString(16));
        }
    }
});

Interceptor.attach(R.Input_GetVectorFromKeys, {
    onLeave(ret) {
        if (tick < 220 || (tick % 60) === 0) {
            console.log("[input vector] tick=" + tick + " vector=" + ret.toInt32());
        }
    }
});

Interceptor.attach(R.StageScene_State1_Playing, {
    onEnter(args) {
        playingFrames++;
        if (playingFrames === 1) {
            navEnabled = false;
            currentKeys = {};
            console.log("[playing enter] nav disabled; first gameplay frame");
        }
        if (playingFrames <= 180 && ((playingFrames % 10) === 1)) {
            console.log("[playing] frame=" + playingFrames + " " + entityLine(playerPtr()));
        }
    }
});

function hookEntityCall(name, addr, entityArgIndex) {
    Interceptor.attach(addr, {
        onEnter(args) {
            this.e = entityArgIndex < 0 ? this.context.ecx : args[entityArgIndex];
            this.shouldLog = isPlayerEntity(this.e) && shouldSampleFrame();
            if (this.shouldLog) {
                console.log("[" + name + " enter] " + entityLine(this.e));
            }
        },
        onLeave(ret) {
            if (this.shouldLog) {
                console.log("[" + name + " leave ret=" + ret.toInt32() + "] " + entityLine(this.e));
            }
        }
    });
}

hookEntityCall("env", R.Entity_ResolveEnvironmentCollisions, 0);
hookEntityCall("floorceil", R.Entity_ResolveFloorAndCeilingCollision, 0);
hookEntityCall("allcoll", R.Entity_CheckAllCollisions, 0);

Interceptor.attach(R.Entity_ApplyGravity, {
    onEnter(args) {
        this.e = this.context.ecx;
        this.before = dbl(this.e.add(184));
        this.shouldLog = isPlayerEntity(this.e) && shouldSampleFrame();
    },
    onLeave(ret) {
        if (this.shouldLog) {
            console.log("[gravity] vy " + fp(this.before, 3) + " -> " + fp(dbl(this.e.add(184)), 3) +
                " " + entityLine(this.e));
        }
    }
});

Interceptor.attach(R.Entity_ProcessActions, {
    onEnter(args) {
        this.e = this.context.ecx;
        this.arg0 = args[0].toInt32();
        this.shouldLog = isPlayerEntity(this.e) && shouldSampleFrame();
        if (this.shouldLog) {
            console.log("[process actions enter a0=" + this.arg0 + "] " + entityLine(this.e));
        }
    },
    onLeave(ret) {
        if (this.shouldLog) {
            console.log("[process actions leave] " + entityLine(this.e));
        }
    }
});
