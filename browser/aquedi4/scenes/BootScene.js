// scenes/BootScene.js
import { DataManager } from '../managers/DataManager.js';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Display a loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        // --- Load all game assets ---

        // Load Databases
        this.load.dat('$dataWorldMap', 'data/WorldMap.dat', 'worldmap');
        this.load.dat('$dataSystem', 'data/System.dat', 'system.dat');
        this.load.dat('$dataSound', 'data/database/Sound.dat', 'sound.dat');
        this.load.dat('$dataAnime', 'data/database/Anime.dat', 'anime.dat');
        // ... load other .dat files

        // Load World Map assets
        this.load.bmp('worldmap_chip', 'bmp/WorldMapChip.bmp');
        this.load.bmp('worldmap_event', 'bmp/WorldEvent.bmp');
        
        // Load Character assets
        
        this.load.bmpSpritesheet('player_world', 'bmp/Accessory.bmp', {
            frameWidth: 32,
            frameHeight: 32
        });

        // Keep the stage player separate if it's different
        this.load.bmpSpritesheet('player_stage', 'bmp/chara_sp/Player01.bmp', {
            frameWidth: 32,
            frameHeight: 32
        });

        // this.load.bmp('player', 'bmp/chara_sp/Player01.bmp');
        // this.load.spritesheet('player', 'bmp/chara_sp/Player01.bmp', {
        //     frameWidth: 32,
        //     frameHeight: 32
        // });
    }

    create() {
        // --- Populate the DataManager ---
        // Move data from Phaser's cache to our global DataManager for easy access
        // TODO: DataManager .
        globalThis.$dataWorldMap = DataManager.$dataWorldMap = this.cache.custom.dat.get('$dataWorldMap');
        globalThis.$dataSystem = DataManager.$dataSystem = this.cache.custom.dat.get('$dataSystem');
        globalThis.$dataSound = DataManager.$dataSound = this.cache.custom.dat.get('$dataSound');
        globalThis.$dataAnime = DataManager.$dataAnime = this.cache.custom.dat.get('$dataAnime');
        
        this.processWorldMapTiles();
        
        console.log("All data loaded. Starting WorldMapScene.");
        
        this.scene.start('WorldMapScene');
    }

    /**
     * Converts the chunked 1D tile array from WorldMap.dat into a clean
     * 2D array that Phaser can use, discarding padding tiles.
     */
    processWorldMapTiles() {
        if (!DataManager.$dataWorldMap) return;

        const mapData = DataManager.$dataWorldMap.data;
        const rawTiles = mapData.tiles;
        const mapWidth = mapData.width;
        const mapHeight = mapData.height;
        const chunkWidth = mapData.chunk_width || mapWidth; // Fallback if chunk_width is 0

        const cleanTiles = [];
        for (let i = 0; i < rawTiles.length; i++) {
            const x = i % chunkWidth;
            const y = Math.floor(i / chunkWidth);

            // Only include tiles that are within the actual map dimensions
            if (x < mapWidth && y < mapHeight) {
                // We'll create a simple 1D array first
                cleanTiles.push(rawTiles[i]);
            }
        }
        
        // Replace the raw tiles array with our processed one
        mapData.tiles = cleanTiles;
        
        // Verify the size is correct now
        console.log(`Processed world map tiles. Expected size: ${mapWidth * mapHeight}, Actual size: ${cleanTiles.length}`);
    }
}