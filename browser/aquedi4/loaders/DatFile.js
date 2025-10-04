// loaders/DatFile.js
import { parseWorldMap } from '../parsers/worldMap.js';
import { parseSystem } from '../parsers/system.js';
import { PARSER_FUNC_MAP } from '../parsers/database.js';
import { DataReader } from '../parsers/data-reader-writer.js'; // Assuming this is where DataReader is

// Create a unified map of ALL parsers
const ALL_PARSERS = new Map([
    ...PARSER_FUNC_MAP,
    ['system.dat', parseSystem],
    ['worldmap.dat', parseWorldMap]
]);

export class DatFile extends Phaser.Loader.File {
    constructor(loader, key, url, parserName) {
        super(loader, {
            type: 'binary', // Changed from 'stream' as we will fetch it
            key: key,
            url: url,
            extension: 'dat',
            cache: loader.cacheManager.addCustom("dat"),
            responseType: 'arraybuffer'
            // responseType: 'stream' // We'll use the response stream
        });
        this.parserName = parserName.toLowerCase();
    }

    async onProcess() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                return this.onProcessError();
            }

            let parsedData;
            // Choose the correct stream parser
            if (this.parserName === 'system.dat') {
                parsedData = await parseSystem(response.body);
            } else if (this.parserName === 'worldmap') {
                parsedData = await parseWorldMap(response.body);
            } 
            // Then check the generic parser map
            else if (PARSER_FUNC_MAP.has(this.parserName)) {
                // We don't need the loadDatabase function here, just the stream
                const parserFunc = PARSER_FUNC_MAP.get(this.parserName);
                
                // Manually pipe the stream through our transform
                const buffer = await response.arrayBuffer();
                const reader = new DataReader(buffer); // Assuming DataReader can take a buffer
                parsedData = parserFunc(reader);

            } else {
                throw new Error(`No parser found for '${this.parserName}'`);
            }
            
            this.data = parsedData;
            this.onProcessComplete();

        } catch (e) {
            console.error(`Error processing DAT file ${this.key} (${this.parserName}):`, e);
            this.onProcessError();
        }
    }
}