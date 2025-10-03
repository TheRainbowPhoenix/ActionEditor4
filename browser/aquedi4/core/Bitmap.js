import { Graphics } from "./Graphics.js";

/**
 * The basic object that represents an image, built on a canvas.
 */
export function Bitmap() {
    this.initialize(...arguments);
}

Bitmap.prototype.initialize = function(width, height) {
    this._canvas = document.createElement("canvas");
    this._context = this._canvas.getContext("2d");
    this._canvas.width = Math.max(width || 0, 1);
    this._canvas.height = Math.max(height || 0, 1);
    this._baseTexture = new PIXI.BaseTexture(this._canvas);
    this._url = "";
    this._loadListeners = [];
    this._loadingState = "none"; // "none", "loading", "loaded", or "error"
};

/**
 * Loads an image file.
 * @param {string} url - The image URL.
 * @returns {Bitmap} The new bitmap object.
 */
Bitmap.load = function(url) {
    const bitmap = new Bitmap();
    bitmap._url = url;
    bitmap._loadingState = "loading";

    if (url.endsWith('.bmp')) {
        Bitmap.loadBmp(url)
            .then(bmpCanvas => {
                bitmap._canvas = bmpCanvas;
                bitmap._context = bmpCanvas.getContext('2d');
                bitmap._baseTexture.source = bmpCanvas;
                bitmap._baseTexture.update();
                bitmap._onLoad();
            })
            .catch(() => bitmap._onError());
    } else {
        const image = new Image();
        image.src = url;
        image.onload = () => {
            bitmap._canvas.width = image.width;
            bitmap._canvas.height = image.height;
            bitmap._context.drawImage(image, 0, 0);
            bitmap._baseTexture.update();
            bitmap._onLoad();
        };
        image.onerror = () => bitmap._onError();
    }
    return bitmap;
};

/**
 * Loads a BMP file and converts it to a canvas.
 * @param {string} url - The URL of the .bmp file.
 * @returns {Promise<HTMLCanvasElement>} A promise that resolves with the canvas.
 */
Bitmap.loadBmp = async function(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch BMP: ${url}`);
    }
    const buffer = await response.arrayBuffer();
    const view = new DataView(buffer);

    // -- BMP Header Parsing --
    if (view.getUint16(0, true) !== 0x4D42) { // Magic number 'BM'
        throw new Error("Not a valid BMP file.");
    }
    const pixelDataOffset = view.getUint32(10, true);
    const dibHeaderSize = view.getUint32(14, true);
    const width = view.getInt32(18, true);
    const height = view.getInt32(22, true);
    const bpp = view.getUint16(28, true);
    const numColors = view.getUint32(46, true);

    if (bpp !== 8 && bpp !== 24 && bpp !== 32) {
        throw new Error(`Unsupported BMP bit depth: ${bpp}`);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    // -- Color Palette Parsing (for 8-bit) --
    let palette = null;
    if (bpp === 8) {
        palette = [];
        const paletteSize = numColors === 0 ? 256 : numColors;
        const paletteOffset = 14 + dibHeaderSize;
        for (let i = 0; i < paletteSize; i++) {
            const b = view.getUint8(paletteOffset + i * 4);
            const g = view.getUint8(paletteOffset + i * 4 + 1);
            const r = view.getUint8(paletteOffset + i * 4 + 2);
            // The 4th byte is reserved (alpha)
            palette.push([r, g, b]);
        }
    }

    // -- Pixel Data Parsing --
    const bytesPerPixel = bpp / 8;
    const rowSize = Math.floor((bpp * width + 31) / 32) * 4; // Each row is padded to a multiple of 4 bytes

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // BMPs are stored bottom-to-top, so we read rows in reverse
            const bmpY = height - 1 - y;
            const bmpIndex = pixelDataOffset + (bmpY * rowSize) + (x * bytesPerPixel);
            const canvasIndex = (y * width + x) * 4;

            if (bpp === 8) {
                const paletteIndex = view.getUint8(bmpIndex);
                const [r, g, b] = palette[paletteIndex];
                data[canvasIndex] = r;
                data[canvasIndex + 1] = g;
                data[canvasIndex + 2] = b;
                data[canvasIndex + 3] = 255;
            } else { // 24-bit or 32-bit
                const b = view.getUint8(bmpIndex);
                const g = view.getUint8(bmpIndex + 1);
                const r = view.getUint8(bmpIndex + 2);
                
                data[canvasIndex] = r;
                data[canvasIndex + 1] = g;
                data[canvasIndex + 2] = b;
                data[canvasIndex + 3] = (bpp === 32) ? view.getUint8(bmpIndex + 3) : 255;
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
};

Bitmap.prototype.isReady = function() {
    return this._loadingState === "loaded";
};

Bitmap.prototype.addLoadListener = function(listener) {
    if (this.isReady()) {
        listener(this);
    } else {
        this._loadListeners.push(listener);
    }
};

Bitmap.prototype._onLoad = function() {
    this._loadingState = "loaded";
    this._callLoadListeners();
};

Bitmap.prototype._onError = function() {
    this._loadingState = "error";
};

Bitmap.prototype._callLoadListeners = function() {
    while (this._loadListeners.length > 0) {
        this._loadListeners.shift()(this);
    }
};

Object.defineProperty(Bitmap.prototype, "width", {
    get: function() { return this._canvas.width; },
    configurable: true
});

Object.defineProperty(Bitmap.prototype, "height", {
    get: function() { return this._canvas.height; },
    configurable: true
});

Object.defineProperty(Bitmap.prototype, "baseTexture", {
    get: function() { return this._baseTexture; },
    configurable: true
});