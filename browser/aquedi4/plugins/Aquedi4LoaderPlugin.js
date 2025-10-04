// plugins/Aquedi4LoaderPlugin.js

// --- Import the custom file classes ---
import { BmpFile, BmpSpritesheetFile } from '../loaders/BmpFile.js';
import { DatFile } from '../loaders/DatFile.js';
import { Stg4File } from '../loaders/Stg4File.js';

// --- Create the Loader Plugin ---
export default class Aquedi4LoaderPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);

        // Register the file types with Phaser's Loader an tell it how to create them.
        pluginManager.registerFileType('bmp', this.bmpLoaderCallback);
        pluginManager.registerFileType('dat', this.datLoaderCallback);
        pluginManager.registerFileType('stg4_1020', this.stg4LoaderCallback);
        pluginManager.registerFileType('bmpSpritesheet', this.bmpSpritesheetLoaderCallback);
    }

    // Callback for bmp files. 'this' will be the LoaderPlugin instance.
    bmpLoaderCallback(key, url) {
        this.addFile(new BmpFile(this, key, url));
        return this;
    }

    // Callback for dat files
    datLoaderCallback(key, url, parserName) {
        this.addFile(new DatFile(this, key, url, parserName));
        return this;
    }

    // Callback for stg4 files
    stg4LoaderCallback(key, url) {
        this.addFile(new Stg4File(this, key, url));
        return this;
    }

    bmpSpritesheetLoaderCallback(key, url, frameConfig) {
        this.addFile(new BmpSpritesheetFile(this, key, url, frameConfig));
        return this;
    }
}