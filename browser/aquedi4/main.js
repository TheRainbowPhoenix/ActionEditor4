// import { Graphics } from './core/Graphics.js';
// import { SceneManager } from './managers/SceneManager.js';
// import { Scene_Boot } from './scenes/Scene_Boot.js';
// import { Input } from './core/Input.js';

// window.onload = function() {
//     Graphics.initialize(640, 480, 'gameCanvas');
//     Input.initialize();
//     SceneManager.run(Scene_Boot);
// };
// main.js

class Main {
    constructor() {
        this.error = null;
    }

    run() {
        this.showLoadingSpinner();
        this.loadEngineModules();
    }

    showLoadingSpinner() {
        const loadingSpinner = document.createElement("div");
        const loadingSpinnerImage = document.createElement("div");
        loadingSpinner.id = "loadingSpinner";
        loadingSpinnerImage.id = "loadingSpinnerImage";
        loadingSpinner.appendChild(loadingSpinnerImage);
        document.body.appendChild(loadingSpinner);
    }

    eraseLoadingSpinner() {
        const loadingSpinner = document.getElementById("loadingSpinner");
        if (loadingSpinner) {
            document.body.removeChild(loadingSpinner);
        }
    }

    printError(name, message) {
        this.eraseLoadingSpinner();
        if (!document.getElementById("errorPrinter")) {
            const errorPrinter = document.createElement("div");
            errorPrinter.id = "errorPrinter";
            errorPrinter.innerHTML = `<strong>${name}:</strong> ${message}`;
            document.body.appendChild(errorPrinter);
        }
    }

    async loadEngineModules() {
        try {
            // Sequentially import modules to ensure dependencies are met.
            // Core Systems
            const { Graphics } = await import('./core/Graphics.js');
            const { Input } = await import('./core/Input.js');
            
            // Managers
            const { SceneManager } = await import('./managers/SceneManager.js');

            // Scenes (Only need the first one for boot)
            const { Scene_Boot } = await import('./scenes/Scene_Boot.js');

            // Initialize after all modules are loaded
            this.onModulesLoaded(Graphics, Input, SceneManager, Scene_Boot);

        } catch (e) {
            this.onError(e);
        }
    }

    onModulesLoaded(Graphics, Input, SceneManager, Scene_Boot) {
        // Now that the engine code is loaded, we can initialize systems
        // Graphics.initialize(640, 480);
        // Input.initialize();

        // SceneManager can now run the first scene
        SceneManager.run(Scene_Boot);

        // We can hide the spinner now. Scene_Boot will show its own progress if needed.
        this.eraseLoadingSpinner();
    }
    
    onError(e) {
        console.error(e);
        this.printError(e.name, e.message);
    }
}

// Create and run the Main class
const main = new Main();
main.run();