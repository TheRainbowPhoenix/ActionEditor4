import { DataManager } from '../managers/DataManager.js';

/** @typedef {import('phaser')} Phaser */

export default class WorldMapScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');

        // Layout constants (640x480 target)
        this.MENU_X = 240;        // left of the 160px panel so it's centered-ish
        this.MENU_Y = 240;         // top
        this.ITEM_W = 160;
        this.ITEM_H = 32;
        this.ITEM_SPACING = 32;
        this.NUM_ITEMS = 7;

        // Animation params (mirroring sub_452FF0 ping-pongs)
        this.step = 4;            // like dword_5A92DC; tweak speed
        this.ramps = [
            { v: 64,  dir: 0 },   // g_Ramp0  (0..255)
            { v: 96,  dir: 0 },   // g_Ramp1
            { v: 128, dir: 0 },   // g_Ramp2
            { v: 160, dir: 0 },   // g_Ramp3
            { v: 192, dir: 0 },   // g_Ramp4
            { v: 224, dir: 0 },   // g_Ramp5
            { v: 255, dir: 1 },   // g_Ramp6 (will bounce)
            { v: 0,   dir: 0 },   // g_Ramp7
        ];
        this.phaseRamp = { v: 0, dir: 0 }; // g_PhaseRamp (dword_5A0C98)
        this.phaseIndex = 0;               // dword_5A0CC4 (0..3)
        this.phaseHitCountdown = 0;        // to slow the phase rotate a touch
    }

    preload() {
        // One column, 7 rows of 32px each => frameHeight=32, frameWidth=160.  bmp/GameMode.bmp
        if (!this.textures.exists('game_mode')) {
            this.load.bmpSpritesheet('game_mode', 'bmp/GameMode.bmp', {
                frameWidth: 160,
                frameHeight: 32
            });
        }

        // Not all 32x32, but we use frame 0
        if (!this.textures.exists('accessory32')) {
            this.load.bmpSpritesheet('accessory32', 'bmp/Accessory.bmp', {
                frameWidth: 32,
                frameHeight: 32
            });
        }
    }

    create() {
        // Background color: black by default
        this.cameras.main.setBackgroundColor(0xBDBDBD);

        // Create menu items as a vertical strip of 7 frames from the sheet (0..6)
        this.items = [];
        for (let i = 0; i < this.NUM_ITEMS; i++) {
            const img = this.add.sprite(
                this.MENU_X + this.ITEM_W * 0.5,
                this.MENU_Y + i * this.ITEM_SPACING + this.ITEM_H * 0.5,
                'game_mode',
                i // frame index = row i
            );
            img.setOrigin(0.5, 0.5);
            // Start with a neutral tint (white)
            img.setTint(0xffffff);
            this.items.push(img);
        }

        // Selection (arrow at left). Use a simple text glyph by default.
        this.selectedIndex = 0;
        this.arrow = this.add.sprite(
            this.MENU_X - 8, // a little inside the left gutter
            this.MENU_Y + this.selectedIndex * this.ITEM_SPACING + this.ITEM_H * 0.5,
            'accessory32',
            0
        )
        .setOrigin(1, 0.5)  // right edge anchored at x
        .setScale(1)
        .setTint(0xffffff)
        .setFlipX(false); 

        // Input
        this.input.keyboard.on('keydown-UP',   () => this.moveSelection(-1));
        this.input.keyboard.on('keydown-DOWN', () => this.moveSelection(+1));
        this.input.keyboard.on('keydown-Z',    () => this.confirm());
        this.input.keyboard.on('keydown-ENTER',() => this.confirm());

        // Give non-selected items a subtle dim so the highlight pops
        // this.updateItemTints(true);
    }

    // Move selection and reposition the arrow
    moveSelection(delta) {
        const old = this.selectedIndex;
        this.selectedIndex = (this.selectedIndex + delta + this.NUM_ITEMS) % this.NUM_ITEMS;
        if (this.selectedIndex !== old) {
            this.arrow.setY(this.MENU_Y + this.selectedIndex * this.ITEM_SPACING + this.ITEM_H * 0.5);
            // this.updateItemTints(true); // immediate refresh on change
        }
    }

    confirm() {
        // Emit or handle transitions.
        // this.scene.start('StageScene', { stageFile: 'Stage01.bin' });
        // this.sound?.play?.('confirm'); // if you have sfx
        console.log('Menu confirm on index:', this.selectedIndex);

        if (this.selectedIndex == 0) {
            this.scene.start('WorldMapScene');
        }
    }

    // sub_452FF0 equivalent: ping-pong 0..255 with a direction flag.
    // returns true if the ramp hit an end and flipped.
    pingPong(ramp) {
        if (ramp.dir) {
            ramp.v -= this.step;
            if (ramp.v <= 0) {
                ramp.v = 0 + (0 - ramp.v); // mirror if overshoot
                ramp.dir = 0;
                return true;
            }
        } else {
            ramp.v += this.step;
            if (ramp.v >= 255) {
                ramp.v = 255 - (ramp.v - 255);
                ramp.dir = 1;
                return true;
            }
        }
        return false;
    }

    // Create a packed tint from three 0..255 channels
    packTint(r, g, b) {
        return (r << 16) | (g << 8) | (b);
    }

    // Rotate a single ramp value through RGB channels, like the 4-phase block in sub_452C90
    computePhaseTint(val) {
        // phaseIndex: 0 => R, 1 => G, 2 => B, 3 => white
        let r = 0, g = 0, b = 0;
        switch (this.phaseIndex & 3) {
            case 0: r = val; g = 0;   b = 0;   break;
            case 1: r = 0;   g = val; b = 0;   break;
            case 2: r = 0;   g = 0;   b = val; break;
            case 3: r = val; g = val; b = val; break;
        }
        return this.packTint(r, g, b);
    }

    // Build a tint similar to the “packed registers” in the original.
    // Here we combine a couple of ramps so the look is lively but readable.
    buildUnselectedTint() {
        // Use two ramps to make a gently shifting gray-blue
        const a = this.ramps[1].v;     // 0..255
        const b = this.ramps[3].v;     // 0..255
        const r = (a * 3 + b) >> 2;    // weighted mix
        const g = (a + b * 3) >> 2;
        const bl = (a + b) >> 1;
        return this.packTint(r >> 1, g >> 1, bl); // dimmer overall
    }

    updateItemTints(force = false) {
        // Unselected items get a stable dim tint; selected item gets the phase tint.
        const selected = this.items[this.selectedIndex];
        const unselectedTint = this.buildUnselectedTint();

        for (let i = 0; i < this.items.length; i++) {
            if (i === this.selectedIndex) continue;
            if (force || this.items[i]._lastTint !== unselectedTint) {
                this.items[i].setTint(unselectedTint);
                this.items[i]._lastTint = unselectedTint;
            }
        }

        // Selected item highlight
        const selVal = this.phaseRamp.v;
        const selTint = this.computePhaseTint(selVal);
        if (force || selected._lastTint !== selTint) {
            selected.setTint(selTint);
            selected._lastTint = selTint;
        }
    }

    update(time, delta) {
        // Drive the ramps every frame (or throttle with an accumulator if needed)
        // let anyPhaseEdge = false;

        // for (let i = 0; i < this.ramps.length; i++) {
        //     this.pingPong(this.ramps[i]);
        // }

        // if (this.pingPong(this.phaseRamp)) {
        //     anyPhaseEdge = true;
        // }

        // // Advance the 4-phase index when the phase ramp hits an end,
        // // but slow it a bit so it’s readable.
        // if (anyPhaseEdge) {
        //     this.phaseHitCountdown++;
        //     if (this.phaseHitCountdown >= 2) { // every second “bounce”
        //         this.phaseHitCountdown = 0;
        //         this.phaseIndex = (this.phaseIndex + 1) & 3;
        //     }
        // }

        // // Apply tints
        // this.updateItemTints(false);

        // // (Optional) give the arrow a subtle blink using one ramp
        // const arrowAlpha = Phaser.Math.Linear(0.6, 1.0, this.ramps[0].v / 255);
        // this.arrow.setAlpha(arrowAlpha);
    }
}
