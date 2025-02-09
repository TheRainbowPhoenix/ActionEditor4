# Distribution Guidelines

Games created with **Action Editor 4** can be distributed (both for commercial and non-commercial purposes).  
However, please follow the regulations outlined below.

## Distribution Regulations

### ● At Your Own Risk
If any issues arise from distributing the game, the author (Anton) is not responsible in any way.

### ● Game Title
To avoid confusion, please refrain from naming the game with "Action Editor 4" in the title.

### ● What Can and Cannot Be Distributed

Please **do not distribute** the files marked as "prohibited distribution files."  
Apart from the "prohibited distribution files" and "Vox.dll," you may distribute the files individually.  
For more details on each file, please refer to the included **"Readme.txt"**.

#### ○ Prohibited Distribution Files (Must Be Deleted)

- **"Editor_v***.exe"** – The editor program (*** is the version number). Unlike previous versions like Action Editor (+), the distribution of the editor is not allowed.
- **"Readme.txt"** – This file is intended for game creators (you) and should not be distributed.
- **"二次配布について.html"** – Same as above.
- **"Online Help (Shortcut)"** – Same as above.

#### ○ Files/Folders that Are Not Prohibited, but Should Be Deleted Before Distribution

- **"dafault" folder** – Default editor data.
- **"e_data" folder** – Environment data used only by the editor, such as the path of the last opened stage or settings for "Create New Stage."
- **"e_bmp" folder** – Images used only by the editor.
- **"user_data" folder** – All save data for the game. Deleting this folder will reset all save data related to story, challenges, replays, options, rankings, etc. Deleting the folder will automatically recreate it when the game is launched again. *Note: Challenge and option data are auto-saved, so be cautious not to forget deleting them.*
- **"data > stg4 > old_ver" folder** – May contain older version stage files.
- **"Report_Editor.txt"** – Contains PC specs and debug information generated when launching the editor.
- **"Report_Game.txt"** – Contains PC specs and debug information generated when launching the game.

#### ○ Recommended Distribution Format (The Most Basic Distribution Form)

- **"Game_v***.exe"** – The game program (*** is the version number).
- **"KeyConfig.exe"** – Program to change key assignments.
- **"data" folder** – Edit data.
- **"bmp" folder** – Images.
- **"wave" folder** – Sound effects.
- **"bgm" folder** – Music.
- **"Vox.dll"** – Required for playing OggVorbis (.ogg) files. Even if you don’t use .ogg files, do not delete this file. The copyright of this file belongs to Mr. Nomura XX, so it should not be distributed separately. Distribute it alongside the game.
- **"System.ini"** – Game environment settings file.
- **"Readme2.txt"** – Write the game overview here.

You are also free to include and distribute your own assets, documents, or copyright-free materials.  
Additionally, you are welcome to share captured videos of the game on video-sharing platforms like YouTube or Nico Nico Douga.

### ● About "Readme2.txt"

The **"Readme2.txt"** file is helpful when distributing games made with Action Editor 4.  
It contains promotional content for Action Editor 4, but attaching it is optional.

Edit **"Readme2.txt"** as follows:
- Remove the first line **"※ This document is helpful for distributing games created with Action Editor 4. (Please remove this line)"**.
- Replace "□□□□" with the game title.
- Replace "○○○○" with the author name (your name).
- Under "■ Contact," enter your URL and email.
- Optionally, add a game description or create a separate document for it.
- Finally, rename the file from **"Readme2.txt"** to **"Readme.txt"**.

This is the basic editing method. Feel free to make any additional changes within reason.

You can modify the section **"■ For Distribution"** to include:  
**"If you wish to distribute, please contact ○○○○."**  
If left in its original form, secondary distribution is permitted.

**"Secondary distribution is allowed only in its original form (immediately after acquisition)."**  
You may rewrite this as you see fit.

### ● About the "System.ini" File

The **"System.ini"** file is the game’s environment settings file.  
Before distributing, review its settings.

The section labeled **<Description>** is intended for the game creator (you).  
In particular, under **"WindowMode"** and **"Bpp"**, the explanation differs for "256-color (8bit) bitmaps" and "24-bit (16.7 million colors) bitmaps."  
Simply delete the unnecessary section depending on the bitmaps used in your game.  
For default images (256-color), you can safely delete the section related to the 24-bit bitmaps.

### ● Regarding Assets

Images (.bmp), music (.mid), and sound effects (.wav) can be used freely as assets and distributed separately as free assets.  
There is no need to provide copyright attribution.

Regarding assets in games made with Action Editor 4, you may freely use and modify images (including character designs and settings) from games made by Anton, as long as they are from games released by Anton's site.  
*Note: Games by authors other than Anton are also available, so be sure to use images from Anton's games only.*

### ● About Linking

If you like, please link to the author's website when publishing your game on your homepage.

- **Site Name**: Omoshiro Game Temple
- **URL**: [http://www.omoshiro-game.com/](http://www.omoshiro-game.com/)
- **Banner** (Use only if necessary):
  - (88×31) ![Banner 88x31](http://www.omoshiro-game.com/banner/OGBanner_88_31.gif)
  - (200×40) ![Banner 200x40](http://www.omoshiro-game.com/banner/OGBanner_200_40.gif)

**Example Introduction Text**:  
**"○○○○ (Game Title)"** was made using **Action Editor 4** and is distributed on this site.

---

## Bonus

### ● For Capturing Game Screens

Due to the 256-color limitation in Action Editor 4, screenshots captured using the PrintScreen key or similar methods may not display colors correctly.  
To capture game screenshots, use a software compatible with 256-color images.  
The author (Anton) uses the following software for capturing:

- **Software Name**: Winshot
- **Author**: WoodyBells
- **URL**: [http://www.woodybells.com/winshot.html](http://www.woodybells.com/winshot.html)