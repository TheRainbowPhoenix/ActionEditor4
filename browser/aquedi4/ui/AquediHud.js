const FONT_FAMILY = '"MS Gothic", "MS PGothic", "Yu Gothic", monospace';
const HUD_DEPTH = 100;
const BAR_W = 50;
const BAR_H = 16;
const TOP_H = 20;
const MINI_BAR_H = 2;
const MINI_BAR_W = 50;
const MINI_BAR_MS = 1000;
const WORD_TIMER_ROW = 5;

function clamp01(value) {
    return Math.max(0, Math.min(1, value));
}

function text(scene, x, y, value, options = {}) {
    return scene.add.text(x, y, value, {
        fontFamily: FONT_FAMILY,
        fontSize: (options.size || 16) + 'px',
        color: options.color || '#ffffff',
        resolution: 1
    }).setOrigin(options.originX || 0, options.originY || 0)
        .setScrollFactor(0)
        .setDepth(options.depth ?? HUD_DEPTH + 1);
}

function addFrame(texture, name, x, y, width, height) {
    if (texture.frames && texture.frames[name]) return;
    texture.add(name, 0, x, y, width, height);
}

function ensureAccessoryFrames(scene) {
    const texture = scene.textures.get('accessory');
    if (!texture) return false;
    addFrame(texture, 'hud_item_icon', 0, 32, 16, 16);
    addFrame(texture, 'hud_hp_track', 0, 128, BAR_W, BAR_H);
    addFrame(texture, 'hud_hp_fill', 0, 144, BAR_W, BAR_H);
    addFrame(texture, 'hud_hp_warn', 0, 160, BAR_W, BAR_H);
    addFrame(texture, 'hud_sp_track', 64, 128, BAR_W, BAR_H);
    addFrame(texture, 'hud_sp_fill', 64, 144, BAR_W, BAR_H);
    addFrame(texture, 'hud_sp_warn', 64, 160, BAR_W, BAR_H);
    addFrame(texture, 'hud_hp_mini_track', 0, 208, MINI_BAR_W, MINI_BAR_H);
    addFrame(texture, 'hud_hp_mini_fill', 0, 210, MINI_BAR_W, MINI_BAR_H);
    addFrame(texture, 'hud_hp_mini_warn', 0, 212, MINI_BAR_W, MINI_BAR_H);
    addFrame(texture, 'hud_sp_mini_track', 64, 208, MINI_BAR_W, MINI_BAR_H);
    addFrame(texture, 'hud_sp_mini_fill', 64, 210, MINI_BAR_W, MINI_BAR_H);
    addFrame(texture, 'hud_sp_mini_warn', 64, 212, MINI_BAR_W, MINI_BAR_H);
    return true;
}

class Sprite_AquediGauge {
    constructor(scene, x, y, kind) {
        this.scene = scene;
        this.kind = kind;
        this.usingBitmap = scene.textures.exists('accessory');
        if (this.usingBitmap) {
            this.track = scene.add.image(x, y, 'accessory', 'hud_' + kind + '_track')
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setDepth(HUD_DEPTH + 1);
            this.fill = scene.add.image(x, y, 'accessory', 'hud_' + kind + '_fill')
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setDepth(HUD_DEPTH + 2);
        } else {
            this.track = scene.add.rectangle(x, y, BAR_W, BAR_H, 0xc8c8c8, 1)
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setDepth(HUD_DEPTH + 1);
            this.fill = scene.add.rectangle(x + 1, y + 1, 0, BAR_H - 2, 0xff4090, 1)
                .setOrigin(0, 0)
                .setScrollFactor(0)
                .setDepth(HUD_DEPTH + 2);
        }
        this.valueText = text(scene, x + 2, y + 5, '', { size: 8, depth: HUD_DEPTH + 3 });
    }

    setValue(value, max) {
        const width = Math.floor(BAR_W * clamp01(max ? value / max : 0));
        if (this.usingBitmap) {
            const frame = 'hud_' + this.kind + (max && value <= Math.max(1, Math.floor(max / 4)) ? '_warn' : '_fill');
            this.fill.setFrame(frame).setCrop(0, 0, width, BAR_H);
        } else {
            this.fill.width = Math.max(0, width - 2);
        }
        this.valueText.setText(String(Math.max(0, value | 0)));
    }
}

class Sprite_AquediTransientGauge {
    constructor(scene, kind, entity) {
        this.scene = scene;
        this.kind = kind;
        this.entity = entity;
        this.elapsed = 0;
        this.usingBitmap = scene.textures.exists('accessory');
        if (this.usingBitmap) {
            this.track = scene.add.image(0, 0, 'accessory', 'hud_' + kind + '_mini_track')
                .setOrigin(0, 0)
                .setDepth(HUD_DEPTH - 1);
            this.fill = scene.add.image(0, 0, 'accessory', 'hud_' + kind + '_mini_fill')
                .setOrigin(0, 0)
                .setDepth(HUD_DEPTH);
        } else {
            const color = kind === 'sp' ? 0xff60b8 : 0xff2088;
            this.track = scene.add.rectangle(0, 0, MINI_BAR_W, MINI_BAR_H, 0xffffff, 1)
                .setOrigin(0, 0)
                .setDepth(HUD_DEPTH - 1);
            this.fill = scene.add.rectangle(0, 0, MINI_BAR_W, MINI_BAR_H, color, 1)
                .setOrigin(0, 0)
                .setDepth(HUD_DEPTH);
        }
    }

    update(delta) {
        this.elapsed += delta;
        if (!this.entity || this.elapsed >= MINI_BAR_MS) return false;
        const x = Math.round((this.entity.xmin + this.entity.xmax) * 0.5 - 25);
        const y = Math.round(this.entity.ymin - (this.kind === 'sp' ? 7 : 3));
        const value = this.kind === 'sp' ? this.entity.sp : this.entity.hp;
        const max = this.kind === 'sp' ? this.entity.maxSp : this.entity.maxHp;
        const width = Math.floor(MINI_BAR_W * clamp01(max ? value / max : 0));
        const alpha = 1 - Math.max(0, this.elapsed - 760) / 240;
        this.track.setPosition(x, y).setAlpha(alpha);
        this.fill.setPosition(x, y).setAlpha(alpha);
        if (this.usingBitmap) {
            const frame = 'hud_' + this.kind + '_mini' + (max && value <= Math.max(1, Math.floor(max / 4)) ? '_warn' : '_fill');
            this.fill.setFrame(frame).setCrop(0, 0, width, MINI_BAR_H);
        } else {
            this.fill.width = width;
        }
        return true;
    }

    destroy() {
        this.track.destroy();
        this.fill.destroy();
    }
}

class Sprite_AquediTimerDigits {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.digits = [];
    }

    setValue(value) {
        const visible = value !== null && value !== undefined;
        if (!visible || !this.scene.textures.exists('word_digits')) {
            for (const sprite of this.digits) sprite.setVisible(false);
            return;
        }
        const chars = String(Math.max(0, value | 0)).split('');
        const startX = this.x + (chars.length < 3 ? Math.floor(32 * (3 - chars.length) / 2) : 0);
        for (let i = 0; i < chars.length; i++) {
            if (!this.digits[i]) {
                this.digits[i] = this.scene.add.sprite(startX + i * 32, this.y, 'word_digits', 0)
                    .setOrigin(0, 0)
                    .setScrollFactor(0)
                    .setDepth(HUD_DEPTH + 2);
            }
            const ch = chars[i];
            this.digits[i].setVisible(true);
            this.digits[i].setFrame(WORD_TIMER_ROW * 10 + Number(ch));
            this.digits[i].setPosition(startX + i * 32, this.y);
        }
        for (let i = chars.length; i < this.digits.length; i++) this.digits[i].setVisible(false);
    }
}

export class Window_AquediStageHud {
    constructor(scene) {
        this.scene = scene;
        this._resourceBars = [];
        this._score = 0;
        ensureAccessoryFrames(scene);

        const w = scene.scale.width || 640;
        this._top = scene.add.rectangle(0, 0, w, TOP_H - 1, 0x808080, 1)
            .setOrigin(0, 0)
            .setStrokeStyle(1, 0xffffff, 1)
            .setScrollFactor(0)
            .setDepth(HUD_DEPTH);

        this._itemIcon = scene.textures.exists('accessory')
            ? scene.add.image(12, 3, 'accessory', 'hud_item_icon').setOrigin(0, 0).setScrollFactor(0).setDepth(HUD_DEPTH + 1)
            : null;
        this._itemCount = text(scene, 30, 3, '0', { size: 16 });
        this._scoreText = text(scene, 184, 3, 'スコア０', { size: 16 });
        this._hpLabel = text(scene, 388, 3, 'ＨＰ', { size: 16 });
        this._spLabel = text(scene, 482, 3, 'ＳＰ', { size: 16 });
        this._lifeText = text(scene, 576, 3, '人-', { size: 16 });
        this._hpGauge = new Sprite_AquediGauge(scene, 420, 3, 'hp');
        this._spGauge = new Sprite_AquediGauge(scene, 514, 3, 'sp');
        this._timerDigits = new Sprite_AquediTimerDigits(scene, 272, 24);

        this._bottomPrompt = text(scene, Math.round(w * 0.5), (scene.scale.height || 480) - 24, 'スペースキーで終了', {
            size: 16,
            originX: 0.5
        });
        this._fpsPanel = scene.add.rectangle(w - 2, (scene.scale.height || 480) - 2, 142, 18, 0x808080, 1)
            .setOrigin(1, 1)
            .setStrokeStyle(1, 0xffffff, 1)
            .setScrollFactor(0)
            .setDepth(HUD_DEPTH);
        this._fpsText = text(scene, w - 138, (scene.scale.height || 480) - 18, 'ＦＰＳ 0 （ 1）', { size: 16 });
    }

    setScore(value) {
        this._score = Number(value || 0);
    }

    showPlayerResourceBars(player, kind = 'both') {
        if (!player) return;
        if (kind === 'both' || kind === 'hp') this._resourceBars.push(new Sprite_AquediTransientGauge(this.scene, 'hp', player));
        if (kind === 'both' || kind === 'sp') this._resourceBars.push(new Sprite_AquediTransientGauge(this.scene, 'sp', player));
    }

    update(player, state = {}) {
        const hp = player?.hp ?? 0;
        const maxHp = player?.maxHp ?? 0;
        const sp = player?.sp ?? 0;
        const maxSp = player?.maxSp ?? 0;
        this._hpGauge.setValue(hp, maxHp);
        this._spGauge.setValue(sp, maxSp);
        this._scoreText.setText('スコア' + String(state.score ?? this._score));
        this._itemCount.setText(String(state.itemCount ?? 0));
        this._timerDigits.setValue(state.timer);
        this._fpsText.setText('ＦＰＳ' + String(Math.round(this.scene.game.loop.actualFps || 0)).padStart(2, ' ') + '（ 1）');

        const delta = state.delta ?? 16.6667;
        for (let i = this._resourceBars.length - 1; i >= 0; i--) {
            if (!this._resourceBars[i].update(delta)) {
                this._resourceBars[i].destroy();
                this._resourceBars.splice(i, 1);
            }
        }
    }

    destroy() {
        for (const bar of this._resourceBars) bar.destroy();
        this._resourceBars.length = 0;
    }
}
