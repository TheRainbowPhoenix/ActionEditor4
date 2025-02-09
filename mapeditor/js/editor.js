// Import the types from Phaser
/** @typedef {import("phaser").Phaser} Phaser */

const tiles_path = "bmp/Block.bmp";

/** @typedef {import("phaser").Phaser} Phaser */

/**
 * Tile palette scene to display all tiles in the tileset
 */
class TilePaletteScene extends Phaser.Scene {
  /** @type {Phaser.Game} */
  game;
  /** @type {Phaser.GameObjects.Image[]} */
  tileButtons = [];
  /** @type {number} */
  tileWidth = 32;
  /** @type {number} */
  tileHeight = 32;
  /** @type {number} */
  mapWidth = 256;
  /** @type {number} */
  mapHeight = 480;
  /** @type {Phaser.Tilemaps.Tilemap} */
  map;
  /** @type {Phaser.Tilemaps.TilemapLayer} */
  picklayer;

  constructor() {
    super("TilePaletteScene");
  }

  preload() {
    // Load the tileset image (update the path to your tileset image)
    this.load.image("tiles", tiles_path);
  }

  create() {
    // Calculate the number of tiles across and down
    const tilesAcross = this.mapWidth / this.tileWidth; // Number of tiles horizontally (8 tiles)
    const tilesDown = this.mapHeight / this.tileHeight; // Number of tiles vertically (15 tiles)

    // Generate the level array dynamically
    const level = [];
    for (let y = 0; y < tilesDown; y++) {
      const row = [];
      for (let x = 0; x < tilesAcross; x++) {
        row.push(y * tilesAcross + x);
      }
      level.push(row);
    }

    const emptyMap = {
      tileWidth: this.tileWidth,
      tileHeight: this.tileHeight,
      data: level, // Using the dynamically generated level
    };

    this.map = this.make.tilemap(emptyMap);
    this.tiles = this.map.addTilesetImage("tiles");
    this.picklayer = this.map.createLayer(0, this.tiles, 0, 0);
    window.$currentTileID = null;

    // Create the marker for tile selection
    this.marker = this.add.graphics();
    this.marker.lineStyle(5, 0xffffff, 1);
    this.marker.strokeRect(0, 0, this.tileWidth, this.tileHeight);
    this.marker.lineStyle(3, 0xff4f78, 1);
    this.marker.strokeRect(0, 0, this.tileWidth, this.tileHeight);
    this.marker.setDepth(2);

    // Create the selection cursor that won't move with the mouse
    this.selectionCursor = this.add.graphics();
    this.selectionCursor.lineStyle(2, 0xffffff, 1);
    this.selectionCursor.strokeRect(0, 0, this.tileWidth, this.tileHeight);
    this.selectionCursor.setVisible(false);
  }

  update() {
    const worldPoint = this.input.activePointer.positionToCamera(
      this.cameras.main
    );

    const tileXY = this.picklayer.worldToTileXY(worldPoint.x, worldPoint.y);
    const snappedWorldPoint = this.picklayer.tileToWorldXY(tileXY.x, tileXY.y);

    this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);

    if (this.input.manager.activePointer.isDown) {
      let pickedTile = this.picklayer.getTileAt(tileXY.x, tileXY.y);
      if (pickedTile && pickedTile.index !== window.$currentTileID) {
        window.$currentTileID = pickedTile.index;
        console.log(window.$currentTileID);
        this.selectionCursor.setPosition(
          snappedWorldPoint.x,
          snappedWorldPoint.y
        );
        this.selectionCursor.setVisible(true);
      }
    }
  }
}

/**
 * The main tilemap editor scene
 */
class TilemapEditorScene extends Phaser.Scene {
  /** @type {Phaser.Game} */
  game;
  /** @type {Phaser.Tilemaps.Tilemap} */
  map;
  /** @type {Phaser.Tilemaps.TilemapLayer} */
  groundLayer;
  /** @type {Phaser.GameObjects.Graphics} */
  marker;
  /** @type {Phaser.Input.Keyboard.Key} */
  shiftKey;
  /** @type {Phaser.Cameras.Controls.FixedKeyControl} */
  controls;

  constructor() {
    super("TilemapEditorScene");
  }

  preload() {
    this.load.image("tiles", tiles_path);
    // this.load.tilemapTiledJSON("map", "tilemaps/plt.json");
  }

  create() {
    // Create the tilemap and its layers

    const level = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10],
      [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 10],
      [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 10],
      [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 0],
      [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 0],
      [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 0],
      [0, 0, 14, 14, 14, 14, 14, 0, 0, 0, 15],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
      [35, 36, 37, 0, 0, 0, 0, 0, 15, 15, 15],
      [39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39],
    ];

    const emptyMap = {
      tileWidth: 32,
      tileHeight: 32,
      // width: 40,
      // height: 40,
      data: level, // Array.from({ length: 40 }, () => Array.from({ length: 40 }, () => 1))
    };
    // const thisMap = { key: "map" };

    this.map = this.make.tilemap(emptyMap);
    this.tiles = this.map.addTilesetImage("tiles");
    // const tiles = this.map.addTilesetImage("Block", "tiles", 32, 32, 0, 0, 0);

    // this.createLayer("Ground");
    // this.groundLayer = this.map.createLayer("Ground", tiles);
    this.groundLayer = this.map.createLayer(0, this.tiles, 0, 0);

    // Set up the Shift key for erasing tiles
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    const cursors = this.input.keyboard.createCursorKeys();
    const controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
    };
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    // Create a marker graphic for tile selection
    this.marker = this.add.graphics();
    this.marker.lineStyle(5, 0xffffff, 1);
    this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);
    this.marker.lineStyle(3, 0xff4f78, 1);
    this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

    const saveButton = document.getElementById("saveButton");
    if (saveButton) {
      saveButton.addEventListener("click", () => this.saveMapToJSON());
    }

    const loadFileInput = document.getElementById("loadFileInput");
    if (loadFileInput) {
      loadFileInput.addEventListener("change", (event) =>
        this.loadMapFromJSON(event)
      );
    }

    window.addEventListener("loadMap", (event) => this.reloadMap(event.detail));
  }

  createLayer(name) {
    const tilemap = this.map;

    const layer = new Phaser.Tilemaps.LayerData({
      name,
      width: this.map.width,
      height: this.map.height,
    });

    layer.data = Array.from({ length: tilemap.height }, (_, y) => {
      return Array.from({ length: tilemap.width }, (__, x) => {
        const found = false; // visibleLayers.find(v => topTileIds.includes(v.data[y][x].index));
        return new Phaser.Tilemaps.Tile(
          layer,
          -1, // (found ? found.data[y][x].index : -1),
          x,
          y,
          32,
          32,
          32,
          32
        );
        /* .setFlip(
                found && found.data[y][x].flipX,
                found && found.data[y][x].flipY
            ); */
      });
    });

    this.map.layers.push(layer);
  }

  update(time, delta) {
    this.controls.update(delta);

    // Convert the mouse position to world position within the camera
    const worldPoint = this.input.activePointer.positionToCamera(
      this.cameras.main
    );

    // Snap the position to the tile grid
    const pointerTileXY = this.groundLayer.worldToTileXY(
      worldPoint.x,
      worldPoint.y
    );
    const snappedWorldPoint = this.groundLayer.tileToWorldXY(
      pointerTileXY.x,
      pointerTileXY.y
    );
    this.marker.setPosition(snappedWorldPoint.x, snappedWorldPoint.y);

    // Draw or erase tiles
    if (this.input.manager.activePointer.isDown) {
      if (this.shiftKey.isDown) {
        this.groundLayer.removeTileAtWorldXY(worldPoint.x, worldPoint.y);
      } else {
        if (window.$currentTileID !== null) {
          // this.picklayer.putTileAt(window.$currentTileID, tileXY.x, tileXY.y);
          this.groundLayer.putTileAtWorldXY(
            window.$currentTileID,
            worldPoint.x,
            worldPoint.y
          );
        }
      }
    }
  }

  saveMapToJSON() {
    // Get the tile data from the ground layer
    const levelData = [];
    const layerWidth = this.groundLayer.width;
    const layerHeight = this.groundLayer.height;

    // Loop through the ground layer and store the tile indices in a 2D array
    for (let y = 0; y < layerHeight; y++) {
      const row = [];
      for (let x = 0; x < layerWidth; x++) {
        const tile = this.groundLayer.getTileAt(x, y);
        row.push(tile ? tile.index : -1); // Push tile index or -1 for empty tiles
      }
      levelData.push(row);
    }

    // Prepare the data to save
    const mapData = {
      tileWidth: this.map.tileWidth,
      tileHeight: this.map.tileHeight,
      width: layerWidth,
      height: layerHeight,
      data: levelData, // The 2D array of tile indices
    };

    // Convert the map data to a JSON string
    const jsonString = JSON.stringify(mapData, null, 2); // Pretty-print with 2 spaces indentation

    // Create a Blob with the JSON data and prepare the download
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "map.json"; // Filename for the downloaded file
    link.click();
  }

  loadMapFromJSON(event) {
    const file = event.target.files[0];
    
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      
      // Once the file is loaded, parse it and send the custom event
      reader.onload = (e) => {
        try {
          const mapData = JSON.parse(e.target.result);
  
          // Dispatch the custom event with the map data
          const customEvent = new CustomEvent('loadMap', { 
            detail: mapData 
          });
          window.dispatchEvent(customEvent);
  
        } catch (error) {
          console.error('Error reading or parsing the file:', error);
        } finally {
          // Clean up the input field for reuse
          event.target.value = ''; // Reset the input field so it can be reused
        }
      };
  
      // Read the file as text
      reader.readAsText(file);
    } else {
      alert('Please select a valid JSON file.');
      event.target.value = ''; // Reset the input field if the file is not valid
    }
  }
  

  reloadMap(mapData) {
    // Clear the current map
    this.map.destroy();

    // Create a new map based on the loaded JSON data
    const emptyMap = {
      tileWidth: mapData.tileWidth,
      tileHeight: mapData.tileHeight,
      data: mapData.data,
    };

    this.map = this.make.tilemap(emptyMap);
    this.tiles = this.map.addTilesetImage("tiles");
    this.groundLayer = this.map.createLayer(0, this.tiles, 0, 0);

    // Recreate the marker
    this.marker = this.add.graphics();
    this.marker.lineStyle(5, 0xffffff, 1);
    this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);
    this.marker.lineStyle(3, 0xff4f78, 1);
    this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

    // Any other necessary setup after loading the map
  }
}

/** @type {Phaser.Types.Core.GameConfig} */
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "gameCanvas",
  backgroundColor: "#1d212d",
  pixelArt: true,
  scene: [TilemapEditorScene],
};

/** @type {Phaser.Game} */
const game = new Phaser.Game(config);

/** @type {Phaser.Types.Core.GameConfig} */
const ui_config = {
  type: Phaser.AUTO,
  width: 256,
  height: 480,
  parent: "uiCanvas",
  backgroundColor: "#000000",
  pixelArt: true,
  scene: [TilePaletteScene],
};

/** @type {Phaser.Game} */
const ui_game = new Phaser.Game(ui_config);
