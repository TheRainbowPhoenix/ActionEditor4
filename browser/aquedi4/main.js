// main.js
import BootScene from './scenes/BootScene.js';
import WorldMapScene from './scenes/WorldMapScene.js';
import StageScene from './scenes/StageScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';

import Aquedi4LoaderPlugin from './plugins/Aquedi4LoaderPlugin.js';

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: 'game-container',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        BootScene,
        WorldMapScene,
        StageScene,
        MainMenuScene
    ],
    plugins: {
        global: [
            {
                key: 'Aquedi4Loader',
                plugin: Aquedi4LoaderPlugin,
                start: true
            }
        ]
    }
};

const game = new Phaser.Game(config);