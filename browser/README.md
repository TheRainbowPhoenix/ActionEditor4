phaser-port/
├── index.html              // The main HTML file
├── assets/
│   ├── data/               // <-- Put your original .dat, .cplt4 files here
│   │   ├── Stage1.dat
│   │   └── CommonPalette.cplt4
│   ├── images/             // <-- Put your .bmp files here (converted to .png is better for web)
│   │   ├── block.png
│   │   ├── character1.png
│   │   └── shot.png
│   └── audio/              // <-- Put your .wav files here
│       └── damage.wav
└── src/
    ├── main.js             // Initializes the Phaser game
    ├── scenes/
    │   ├── PreloaderScene.js // Loads all assets and data files
    │   └── GameScene.js      // The main gameplay scene
    ├── data/
    │   ├── DataReader.js     // ★ CRITICAL: Helper to read binary data sequentially
    │   └── DataParser.js     // ★ CRITICAL: Translates binary data to JS objects
    ├── game-objects/
    │   ├── Character.js      // Base class for Player and Enemies
    │   ├── Player.js         // Player-specific logic (input handling)
    │   ├── Shot.js           // Projectile logic
    │   └── Block.js          // (Optional) If blocks have state or special behavior
    └── logic/
        ├── FlowProcessor.js  // The "brain" that interprets and runs Flows and Commands
        └── CollisionManager.js // Sets up all physics collision handlers