// loaders/BmpFile.js
import { Bitmap } from '../core/Bitmap.js';

export class BmpFile extends Phaser.Loader.File {
    constructor(loader, key, url) {
        super(loader, {
            type: 'binary',
            key: key,
            url: url,
            extension: 'bmp',
            responseType: 'arraybuffer',
            cache: loader.cacheManager.addCustom("bmp")
        });
        this.loader = loader
    }

    async onProcess() {
        // Bitmap.loadBmp needs a URL, not an ArrayBuffer, so we fetch again.
        // This is slightly inefficient but simplifies the Bitmap parser.
        try {
            let canvas = await Bitmap.loadBmp(this.url); //.then(canvas => {
            this.processMagicGreen(canvas);
            this.loader.textureManager.addCanvas(this.key, canvas);
            this.onProcessComplete();
        } catch (e) {
        // }).catch((e) => {
            console.error(`Error processing BMP ${this.key}:`, e);
            this.onProcessError();
        // });
        }
    }

    /**
     * Scans a canvas and replaces the magic green color (#00B100) with transparency.
     * @param {HTMLCanvasElement} canvas The canvas to process.
     */
    processMagicGreen(canvas) {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // The RGB values for #00B100
        const magicR = 0;
        const magicG = 177; // B1 in hex
        const magicB = 0;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            if (r === magicR && g === magicG && b === magicB) {
                // Set alpha to 0 to make it transparent
                data[i + 3] = 0;
            }
        }
        
        // Write the modified pixel data back to the canvas
        ctx.putImageData(imageData, 0, 0);
    }
}

export class BmpSpritesheetFile extends Phaser.Loader.File {
    constructor(loader, key, url, frameConfig) {
        super(loader, {
            type: 'spritesheet',
            key: key,
            url: url,
            extension: 'bmp',
            frameConfig: frameConfig || {
                frameWidth: 32,
                frameHeight: 32
            },
            // cache: loader.cacheManager.addCustom("bmpss")
        });
        this.frameConfig = frameConfig;
    }

    async onProcess() {
        // This is a bit of a trick: we instantiate our BmpFile loader
        // to handle the parsing and transparency processing.
        const bmpLoader = new BmpFile(this.loader, this.key, this.url);

        await bmpLoader.onProcess();
        //  = () => {
             // The BmpFile loader has now created a canvas and added it to the texture manager.
             // Now, we can tell Phaser to treat that texture as a spritesheet.
        const texture = this.loader.textureManager.get(this.key);
        if (texture && texture.source[0].isCanvas) {
            Phaser.Textures.Parsers.SpriteSheet(texture, 0, 0, 0, texture.width, texture.height, this.frameConfig);
            this.onProcessComplete();
        } else {
            this.onProcessError();
        }
        // };

        // Manually start the processing of the BmpFile loader
        // bmpLoader.onProcess();
    }
}