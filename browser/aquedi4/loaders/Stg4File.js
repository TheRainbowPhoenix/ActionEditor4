// loaders/Stg4File.js
import { parseStage } from '../parsers/stg4-parser.js';

export class Stg4File extends Phaser.Loader.File {
    constructor(loader, key, url) {
        super(loader, {
            type: 'binary',
            key: key,
            url: url,
            extension: 'stg4_1020',
            // responseType: 'stream'
            cache: loader.cacheManager.addCustom("stg4_1020")
        });
    }

    async onProcess() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                return this.onProcessError();
            }

            this.data = await parseStage(response.body);
            this.onProcessComplete();

        } catch (e) {
            console.error(`Error processing STG4 file ${this.key}:`, e);
            this.onProcessError();
        }
    }
}