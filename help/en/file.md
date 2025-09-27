---
title: File Explanation
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: File Explanation
    url: /menu_support/actioneditor4_help/file/
description: Online help for the action game creation software "Action Editor 4". "File Explanation" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## File Explanation Table of Contents

This section explains each file in Action Editor 4.  
  
・"Editor_v*.exe" ... Editor program (* represents the version).  
・"Game_v*.exe" ... Game program.  
・"KeyConfig.exe" ... Program to change key assignments.  
・"System.ini" ... Game's environment configuration file. Open with a text editor and edit if necessary.  
・"Readme.txt" ... Document for game creators (you).  
・"Readme2.txt" ... Document (template) to attach when distributing the game.  
**・"About Game Distribution.html" ... Contains terms and conditions for distributing games.  
**・"Vox.dll" ... Required for playing OggVorbis (.ogg) files. Do not delete even if you don't play ogg files.  
・"GuruGuruSMF4.dll" ... Included from version 8.14. Required for playing midi files. Do not delete even if you don't play midi files. Midi will play without this file, but issues may occur depending on the playback environment and midi files.  
・"Report_Editor.txt" ... Debug report file generated when the editor starts.  
・"Report_Game.txt" ... Debug report file generated when the game starts.  
・"Online Help" ... Just an internet shortcut. Links to Action Editor 4's help.  
・"Download Latest Version" ... Just an internet shortcut. Links to Action Editor 4's download page.  
・"Download Sample Game" ... Just an internet shortcut. Links to Action Editor 4 sample game's download page.  
・"Author's Site" ... Just an internet shortcut. Links to Action Editor 4's author's site.  
  
Other files are explained by folder.  
  
● "data" folder  
Edit data.  
This folder is generated when the editor or game starts for the first time.  
・"CommonPalette.cplt4" ... Common palette data.  
・"GValInfo.dat" ... Common variable name data.  
・"PrjOption.dat" ... "Project Options" data.  
・"System.dat" ... "System" data.  
・"WorldMap.dat" ... "World Map" data. **Also includes "World Chip" data from the database.**  
  
○ "database" folder  
・"Anime.dat" ... Database "Animation" data.  
・"AnimeSet.dat" ... Database "Basic Animation Set" data.  
・"Bgm.dat" ... Database "BGM" data.  
・"Bmp_CharaExc.dat" ... Database "Character Specific BMP" data.  
・"CharaEffect.dat" ... Database "Character Effect" data.  
・"Effect.dat" ... Database "Effect" data.  
・"Picture.dat" ... Database "Picture" data.  
・"ScrEffect.dat" ... Database "Screen Effect" data.  
・"Sound.dat" ... Database "Sound" data.  
・"SwordType.dat" ... Database "Sword Type" data.  
  
○ "plt4" folder  
Default save destination for stage palette files (.plt4).  
  
○ "work" folder  
A folder used temporarily for purposes like restoring stage files if they get corrupted.  
  
○ "stg4"  
**This folder contains stage files "～.stg4_*".  
The "*" part indicates the editor version at the time of the last save.**  
For example, a file created with Ver1.00 would be "~.stg_100".  
**Also, the "old_ver" folder may contain older versions of stage files.  
(When loading an old version stage after updating the editor, the old version file is automatically backed up to the "old_ver" folder when saving that stage, according to a setting).  
**  
● "default" folder  
Default edit data.  
**When the editor starts for the first time, this folder is copied as the "data" folder.**  
Please do not modify it, just in case.  
  
● "data_backup" folder  
Backup of the "data" folder.  
Backup settings can be changed in "Project" > "Project Options" from the main menu.  
  
● "e_data" folder  
This folder is generated when the editor or game starts for the first time.  
・"EditConfig.dat" ... Environment data used only by the editor. For example, the path to the last opened stage, and settings for "New Stage Creation".  
・"SheetSize.dat" ... Information related to the size of some windows.  
  
● "e_data_backup" folder  
Backup of the "e_data" folder.  
Backup settings can be changed in "Project" > "Project Options" from the main menu.  
  
● "user_data" folder  
Game save data.  
This folder is generated when the editor or game starts for the first time.  
**Deleting this folder will reset all game save data, including story, challenge, replays, options, and rankings.  
**Even if you delete the entire folder, a new "user_data" folder will be automatically created the next time the game starts, so there's no problem.  
・"Boot.dat" ... Setting data for the drawing mode selection dialog displayed immediately after game launch.  
・"Window.dat" ... Data storing the window position and size at the time of the last game exit. The program first reads this file to restore the previous window position and size.  
・"KeyConfig.dat" ... KeyConfig.exe's setting data.  
・"Replay.dat" ... Replay playlist data (last played replay file, etc.).  
・"Free.dat" ... Free mode data (last played stage file, etc.).  
・"Option.dat" ... Options setting data.  
  
○ "challenge" folder  
・"～.dat" ... Challenge mode save data.  
・"～.rkg" ... Challenge mode ranking data.  
  
○ "free" folder  
・"～.dat" ... Free mode save data.  
・"～.rkg" ... Free mode ranking data.  
  
○ "rpl4" folder  
Save destination for replay files (.rpl4_*).  
Please put replay files in this folder.  
  
○ "story" folder  
・"～.dat" ... Story mode save data.  
・"～.rkg" ... Story mode ranking data.  
  
● "bmp" folder  
Contains images (.bmp) used by both the editor and the game.  
The "Unused" folder contains images from older versions.  
> For image standards, refer to ["Image Standards"](../bmp/).  
  
● "e_bmp" folder  
Contains images (.bmp) used only by the editor.  
It also contains icon images for program files (*.exe), but changing them will not change the program icon.  
  
● "bgm" folder  
Music used in the game.  
Supports Midi (.mid) and OggVorbis (.ogg) formats.  
It is recommended to put your own files in this folder as well.  
  
● "wave" folder  
Sound effects used in the game.  
**Only supports PCM wave format; other formats (such as ADPCM) will not play in the game even if they play in the editor.**  
It is recommended to put your own files in this folder as well.  

[Back to top of page](#TOP)

---

  

[To Next Topic](../bmp/)

[To Help Table of Contents](../)