"use strict";

const MODULE = "Game_v1020.exe";
const IDA_BASE = 0x400000;

const A = {
    scene_manager: 0x452210,
    StageScene_Init_LoadStageFile: 0x402830,
    StageScene_LoadStage: 0x406FA0,
    StageScene_State1_Playing: 0x402D50,
    Entity_ApplyGravity: 0x4698B0,
    Entity_ResolveEnvironmentCollisions: 0x40CE90,
    Entity_ResolveFloorAndCeilingCollision: 0x40D390,
    Entity_CheckFloorTile: 0x40D740,
    Entity_CheckCeilingTile: 0x40D670
};

function u32(p) { try { return Memory.readU32(ptr(p)); } catch (_) { return 0; } }
function dbl(p) { try { return Memory.readDouble(ptr(p)); } catch (_) { return NaN; } }
function hx(v) { return "0x" + v.toUInt32().toString(16); }

let base = null;
try {
    base = Process.getModuleByName(MODULE).base;
} catch (_) {
    try {
        base = Module.findBaseAddress(MODULE);
    } catch (_) {
        base = null;
    }
}
if (!base) {
    console.error("[smoke] module not found: " + MODULE);
} else {
    console.log("[smoke] base=" + base);

    const R = {};
    for (const k in A) R[k] = base.add(A[k] - IDA_BASE);

    function entityLine(e) {
        return "e=" + e +
            " x=[" + dbl(e.add(128)).toFixed(2) + "," + dbl(e.add(144)).toFixed(2) + "]" +
            " y=[" + dbl(e.add(136)).toFixed(2) + "," + dbl(e.add(152)).toFixed(2) + "]" +
            " v=(" + dbl(e.add(176)).toFixed(3) + "," + dbl(e.add(184)).toFixed(3) + ")" +
            " flags LRTB=" + u32(e.add(756)) + u32(e.add(760)) + u32(e.add(764)) + u32(e.add(768)) +
            " ground=" + u32(e.add(684)) + " air=" + u32(e.add(688)) +
            " stand=" + u32(e.add(812));
    }

    Interceptor.attach(R.scene_manager, {
        onEnter(args) {
            console.log("[scene_manager] ecx=" + this.context.ecx + " arg0=" + args[0]);
        }
    });

    Interceptor.attach(R.StageScene_Init_LoadStageFile, {
        onEnter(args) {
            console.log("[stage_init] this=" + this.context.ecx);
        }
    });

    Interceptor.attach(R.StageScene_LoadStage, {
        onEnter(args) {
            this.sc = this.context.ecx;
            console.log("[load enter] this=" + this.sc + " a0=" + args[0].toInt32() + " a1=" + args[1].toInt32());
        },
        onLeave(ret) {
            console.log("[load leave] this=" + this.sc + " ret=" + ret);
        }
    });

    let frame = 0;
    Interceptor.attach(R.StageScene_State1_Playing, {
        onEnter(args) {
            frame++;
            if ((frame % 30) === 1) console.log("[playing] frame=" + frame + " this=" + this.context.ecx);
        }
    });

    function hookEntity(name, addr) {
        Interceptor.attach(addr, {
            onEnter(args) {
                this.e = name === "gravity" ? this.context.ecx : args[0];
                if ((frame % 30) === 1 && this.e && !this.e.isNull()) {
                    console.log("[" + name + " enter] " + entityLine(this.e));
                }
            },
            onLeave(ret) {
                if ((frame % 30) === 1 && this.e && !this.e.isNull()) {
                    console.log("[" + name + " leave ret=" + ret.toInt32() + "] " + entityLine(this.e));
                }
            }
        });
    }

    hookEntity("env", R.Entity_ResolveEnvironmentCollisions);
    hookEntity("floorceil", R.Entity_ResolveFloorAndCeilingCollision);

    Interceptor.attach(R.Entity_ApplyGravity, {
        onEnter(args) {
            this.e = this.context.ecx;
            this.before = dbl(this.e.add(184));
        },
        onLeave(ret) {
            if ((frame % 30) === 1) {
                console.log("[gravity] vy " + this.before.toFixed(3) + " -> " + dbl(this.e.add(184)).toFixed(3) + " " + entityLine(this.e));
            }
        }
    });
}
