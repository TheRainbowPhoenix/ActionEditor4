const FONT_FAMILY = '"MS Gothic", "MS PGothic", "Yu Gothic", monospace';
const FONT_SIZE = 16;
const LINE_HEIGHT = 16;
const HALF_ADVANCE = 9;
const FULL_ADVANCE = 18;
const GLYPH_SPACING = 0.25;
const PANEL_COLOR = 0x808080;
const BORDER_COLOR = 0xffffff;
const TEXT_COLOR = '#ffffff';

function isHalfWidth(ch) {
    const code = ch.codePointAt(0) || 0;
    return code <= 0xff || (code >= 0xff61 && code <= 0xff9f);
}

function charAdvance(ch) {
    if (ch === '\t') return HALF_ADVANCE * 4;
    return (isHalfWidth(ch) ? HALF_ADVANCE : FULL_ADVANCE) + GLYPH_SPACING;
}

export function measureAquediText(message) {
    const lines = String(message || '').replace(/\r\n/g, '\n').split('\n');
    let width = 0;
    for (const line of lines) {
        let x = 0;
        for (const ch of line) x += charAdvance(ch);
        width = Math.max(width, Math.ceil(x));
    }
    return {
        lines,
        textWidth: width,
        textHeight: Math.max(1, lines.length) * LINE_HEIGHT,
        windowWidth: width + 2,
        windowHeight: Math.max(1, lines.length) * LINE_HEIGHT + 2
    };
}

export function wrapAquediText(message, maxWidth) {
    const out = [];
    for (const raw of String(message || '').replace(/\r\n/g, '\n').split('\n')) {
        let line = '';
        let width = 0;
        for (const ch of raw) {
            const advance = charAdvance(ch);
            if (line && width + advance > maxWidth) {
                out.push(line);
                line = ch;
                width = advance;
            } else {
                line += ch;
                width += advance;
            }
        }
        out.push(line);
    }
    return out.join('\n');
}

function makeBitmapText(scene, lines, textWidth, textHeight) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, textWidth);
    canvas.height = Math.max(1, textHeight);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    ctx.font = FONT_SIZE + 'px ' + FONT_FAMILY;
    ctx.textBaseline = 'top';
    ctx.fillStyle = TEXT_COLOR;
    ctx.imageSmoothingEnabled = false;
    for (let row = 0; row < lines.length; row++) {
        let x = 0;
        for (const ch of lines[row]) {
            ctx.fillText(ch, x, row * LINE_HEIGHT);
            x += charAdvance(ch);
        }
    }

    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < image.data.length; i += 4) {
        const a = image.data[i + 3] > 96 ? 255 : 0;
        image.data[i] = 255;
        image.data[i + 1] = 255;
        image.data[i + 2] = 255;
        image.data[i + 3] = a;
    }
    ctx.putImageData(image, 0, 0);

    const key = 'aquedi_gui_text_' + scene.sys.game.loop.frame + '_' + Math.random().toString(36).slice(2);
    scene.textures.addCanvas(key, canvas);
    return { key, width: canvas.width, height: canvas.height };
}

export function createAquediMessageWindow(scene, message, x, y, options = {}) {
    const maxTextWidth = options.maxTextWidth || 0;
    const wrapped = maxTextWidth ? wrapAquediText(message, maxTextWidth) : String(message || '');
    const metrics = measureAquediText(wrapped);
    const bitmap = makeBitmapText(scene, metrics.lines, metrics.textWidth, metrics.textHeight);
    const depth = options.depth ?? 30;
    const origin = options.origin || { x: 0, y: 0 };
    const width = metrics.windowWidth;
    const height = metrics.windowHeight;

    const panel = scene.add.rectangle(x, y, width, height, PANEL_COLOR, 1)
        .setOrigin(origin.x, origin.y)
        .setStrokeStyle(1, BORDER_COLOR, 1)
        .setDepth(depth);
    const textX = x + (1 - origin.x * width);
    const textY = y + (1 - origin.y * height);
    const text = bitmap
        ? scene.add.image(textX, textY, bitmap.key).setOrigin(0, 0).setDepth(depth + 1)
        : scene.add.text(textX, textY, wrapped, {
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE + 'px',
            fill: TEXT_COLOR,
            lineSpacing: 0,
            resolution: 1
        }).setOrigin(0, 0).setDepth(depth + 1);

    if (options.scrollFactor === 0) {
        panel.setScrollFactor(0);
        text.setScrollFactor(0);
    }

    return {
        panel,
        text,
        textureKey: bitmap?.key || null,
        message: wrapped,
        width,
        height,
        setPosition(nx, ny) {
            panel.setPosition(nx, ny);
            text.setPosition(nx + (1 - origin.x * width), ny + (1 - origin.y * height));
        },
        setVisible(visible) {
            panel.setVisible(visible);
            text.setVisible(visible);
        },
        setScale(scale) {
            panel.setScale(scale);
        },
        destroy() {
            panel.destroy();
            text.destroy();
            if (this.textureKey && scene.textures.exists(this.textureKey)) scene.textures.remove(this.textureKey);
        }
    };
}
