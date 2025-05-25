# Tools for working with ActionEditor4

ActionEditor4 is a now dead game engine wrote in 2008 by Anton. The site was located at `http://omoshiro-game.com/soft/ActionEditor4/` and is now for sale. 

> Note: A mirror of the website is online and translated here : https://omoshiro-game.github.io/en/menu_support/actioneditor4_help/

Patterns available on the "patterns" folder are meant to explore the binary files format used by the engine and can be used with "ImHEX" as "pattern", or adapted to any software to read original format

## Editor

An experimental re-implementation of the editor is ongoing under the "editor" folder:

![QuickStart.png](editor/docs/QuickStart.png)
![Database.png](editor/docs/Database.png)
![BmpCharaExc.png](editor/docs/BmpCharaExc.png)
![Picture.png](editor/docs/Picture.png)
![Sound.png](editor/docs/Sound.png)
![CharaEffect.png](editor/docs/CharaEffect.png)
![Effect.png](editor/docs/Effect.png)
![SwordType.png](editor/docs/SwordType.png)
![BGM.png](editor/docs/BGM.png)

The World Map Editor is in progress :

![WorldMapEdit.png](editor/docs/WorldMapEdit.png)

The idea is to test quickly the various format parsing and compare them against the original engine to understand it better

If you just need a parser / converter (to JSON or other engine) you can take a look at [files.py](editor\acted4\data\files.py) with clean dataclass parsing