---
title: Image Standards
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Image Standards
    url: /menu_support/actioneditor4_help/bmp/
description: Online help for the action game creation software "Action Editor 4". "Image Standards" is a page within "Omoshiro Game Shrine".
---

## Image Standards

Images used by both the editor and the game are in the "bmp" folder, while images used only by the editor are in the "e_bmp" folder.  
  
Action Editor 4 supports two bitmap formats: 256 colors (8-bit) and 16.77 million colors (24-bit).  
Each format has its pros and cons. > For details, refer to [Main Menu "Project" > "System"](/en/menu_support/actioneditor4_help/menu_project_system/#BMPCOLOR).  
You need to specify which bitmap format to use in "Bitmap Color Depth" under Main Menu "Project" > "System", and all images in the "bmp" folder (except "palette.bmp" and "palette2.bmp") must be unified to that format.  
  
● About 256-color (8-bit) bitmaps  
**If using 256-color (8-bit) bitmaps, you must use Action Editor 4's unique color palette and adhere to several rules, otherwise, color corruption or other issues may occur during the game.**  
  
First, **draw 256-color (8-bit) bitmaps with a 256-color compatible graphics tool (painting software).**  
By the way, the software Anton uses:  
Software Name: EDGE2  
Author: TAKABO-sama  
Site Name: TAKABO SOFT NETWORK  
URL: [http://takabosoft.com/edge2/](http://takabosoft.com/edge2/)  
  
● Color palette (color number) standard for 256-color (8-bit) bitmaps  
**・No. 0 ... Transparency color.** (Background color for "Character1.bmp", etc.)  
・Nos. 1-9 ... Unused colors. Please do not use.  
**・Nos. 10-15 ... Line colors (outlines) used for characters, etc. Line colors do not change even if "Color" is changed in the game's options.** (Conversely, if you ignore "Color", there's no need to insist on drawing character outlines with line colors).  
・Nos. 16-207 ... Normal colors. Please use.  
**・Nos. 208-239 ... Invincible colors. If "When screen is 256 colors (8bit), execute color animation (invincible color changes rapidly)" is enabled in Main Menu "Project" > "System", color animation will only execute when played in DirectDraw mode with a 256-color (8bit) screen.** Please use for painting invincible characters, etc.  
・No. 240 ... Window frame color. Please do not use.  
・No. 241 ... Normal text color. Please do not use.  
・No. 242 ... Intended for special text colors, but ultimately unused. Please do not use.  
・Nos. 243-255 ... Unused colors. Please do not use.  
  
**Please draw all bitmaps using colors from numbers 0 and 10-239.**  
  
**※Do not edit the color palette. Please use it as is with the default image's color palette.**  
**Editing the color palette is not recommended as it may cause color corruption in some parts.** At least, the character effect "Transparency" will result in strange colors.  
  
● About 16.77 million color (24-bit) bitmaps  
16.77 million color (24-bit) bitmaps are supported by many software such as Windows' standard "Paint" and "EDGE2".  
They **do not have color restrictions due to a color palette**, so they should be easier to draw than 256-color ones, but loading will be slower.  
  
**Since the default images are 256 colors (8-bit), they need to be converted to 16.77 million colors (24-bit) if you want to use them.**  
**※Only "Palette.bmp" and "Palette2.bmp" in the "bmp" > "plt" folder should remain 256 colors (8-bit).** Otherwise, the solid background colors in stages and world maps may change or cause other issues.  
  
As for how to convert color depth, you can convert them with graphics tools like EDGE2, but it might be faster to use software that can batch convert the color depth of all images.  
The author uses a free software called ["BatchGOO!"](http://www.lnsoft.net/graphicconverter.htm) to convert them all at once. It might be easier to back up first and then run it with "Overwrite."  
  
And, here is the default image converted to 16.77 million colors (24-bit) [here (for versions 8.80 and later)](/soft/ActionEditor4/ae4_bmp_24bit.zip).  
Please feel free to use it.  
I didn't include it with the Action Editor 4 main package because of its larger size and my personal preference for 256 colors.  
  
● About image size  
**You must not change the image size. Please keep it the same as the default image size.**  
**As exceptions, the size of game mode text ("GameMode.bmp"), world map background ("WorldBack.bmp"), world chips ("WorldMapChip.bmp"), world events ("WorldEvent.bmp"), stage backgrounds, character images ("Character1~8.bmp"), character-specific BMPs, swords, effects, and pictures can be changed.**  
  
However, **please note that Direct3D has a maximum size that can be handled by the video card (GPU).**  
It is advisable to keep both width and height at 2048 or less to avoid issues even on older environments from around the Windows XP era.  
If 2048 is not enough, aim for up to 4096; if 4096 is still not enough, then up to 8192.  
Also, especially with older video cards, the width and height may be expanded internally to powers of 2 (256, 512, 1024, etc.) or forced to be the same (adjusted to the longer side), leading to unnecessary video memory usage.  
Therefore, **setting the width and height to powers of 2 (256, 512, 1024, etc.) or making them the same can reduce unnecessary video memory usage.**  
For example, for a 600x600 image, in some environments, it may be expanded internally to 1024x1024 (the power of 2 greater than or equal to 600 is 1024), resulting in nearly three times the video memory usage (600x600 = 360000, 1024x1024 = 1048576, so about 3 times).  
**※In Direct3D mode, if video memory runs out, not only does performance slow down, but problems can occur with font rendering.  
**Be especially careful when drawing stage backgrounds and world map backgrounds, which tend to be large.  
  
● Explanation of each bitmap  
Only images in the "bmp" folder will be explained.  
They will be explained in alphabetical order.  
  
・Accessory.bmp  
Cursors, symbols, protagonist on the world map, HP bar, SP bar, etc.  
The thin line at the very bottom is a bar that is displayed for a moment above the character's head when HP or SP increases or decreases.  
**Unused areas are filled with color number 113 (dark blue-green).**  
  
・Block.bmp  
Blocks.  
Up to 119 can be drawn.  
  
・Character1~8.bmp  
Characters.  
Animations can be set and changed in the editor.  
Up to 20 frames per character (up to 640 pixels wide) can be drawn.  
Up to 119 characters can be drawn.  
  
・Debug.bmp  
Will not be displayed in either the editor or the game, but do not delete it.  
  
・GameMode.bmp  
Game mode text on the title screen.  
To display this image, "Display image on title screen" must be enabled in the system settings.  
**The bitmap size can only be changed in width.** **However, the width must be a multiple of 4 and within 640 pixels.**  
  
・Item.bmp  
Items.  
Fixed 2-frame animation.  
  
・Item_Mini.bmp  
Miniature version of items ("Item.bmp").  
In the editor, it's shown on the stage; in the game, it appears briefly above the character's head when an item is acquired.  
Up to 119 can be drawn.  
  
・Mark.bmp  
Marks.  
Up to 119 can be drawn.  
  
・Shot.bmp  
Shots.  
Fixed 2-frame animation.  
Up to 119 can be drawn.  
  
・StatusWindow.bmp  
Background of the status window at the top of the action screen.  
  
・Symbol.bmp  
Symbols displayed with lowercase half-width alphabets "a" to "z" in "Message" commands and all other text displays.  
To enable symbol display, "Support symbol image display" must be checked in the system settings.  
  
・Title.bmp  
Background of the title screen.  
  
・Window.bmp  
Background for windows other than the status window at the top of the action screen.  
Always displayed from the top-left, regardless of window size.  
  
・Word.bmp  
Text on the action screen.  
**Unused areas are filled with color number 113 (dark blue-green).**  
  
・WorldBack.bmp  
Background of the world map.  
**The bitmap size can be changed.** **However, the width must be a multiple of 4.**  
  
・WorldEvent.bmp  
World map events.  
The graphic on the right is for stage events after stage clear.  
Up to 15 can be drawn.  
  
・WorldMapChip.bmp  
World map chips.  
Up to 75 can be drawn.  
  
・back folder  
Contains stage backgrounds.  
**The bitmap size is flexible.** **However, the width must be a multiple of 4.**  
  
・chara_sp folder  
Contains character-specific BMPs.  
In character-specific BMPs, one character is drawn per bitmap.  
Animations can be set in the editor.  
**The bitmap size is free for both width and height** (**for versions 9.85 and below, width was fixed at 512**). **However, please make both width and height a multiple of 32.**  
**In DirectDraw mode, if the width exceeds 640 or the height exceeds 480, rendering at equal scale (without scaling) becomes slightly slow, but it's not critically slow unless a large number are drawn.**  
Also, only up to 119 frames are supported.  
Character-specific BMPs also **support giant characters (4x to 100x)**. You can refer to the default image "Enemy01_009.bmp" for reference.  
Up to 999 characters (999 bitmaps) can be created.  
  
・convert folder  
Default save destination folder for the editor's "Bitmap Conversion Tool."  
  
・effect folder  
Contains effects.  
Display size and animation can be set and changed in the editor.  
**The bitmap size is flexible.** **However, the width must be a multiple of 4, and both width must be within 640 pixels, and height must be within 480 pixels.**  
**  
・hbt folder  
Contains files necessary for executing character effects like "Transparency."  
  
・picture folder  
Contains pictures.  
**The bitmap size is flexible.** **However, the width must be a multiple of 4, and both width must be within 640 pixels, and height must be within 480 pixels.**  
**  
・plt folder  
**Palette.bmp ... Game's color palette. Loaded when the game starts. (Loaded even when using 16.77 million color (24bit) bitmaps).  
Palette2.bmp ... Used by the editor's "Bitmap Conversion Tool"** (for 256 colors)**. Bitmap conversion by the bitmap conversion tool means replacing colors with approximate colors within color numbers 0 and 16-207 of "Palette2.bmp".**  
  
・sword folder  
Contains swords.  
Display size and animation can be set and changed in the editor.  
**The bitmap size can be changed.****However, the width must be a multiple of 4, and both width must be within 640 pixels, and height must be within 480 pixels.****  
  
・Loading.bmp  
Displayed when the game starts or a stage is loading.  
  
● Other tips  
Most image sizes are multiples of 16 for both width and height.  
Therefore, **it is easier to edit if you set the grid to 16 in your graphics tool.**  

[Back to top of page](/en/menu_support/actioneditor4_help/bmp/)

---

  

[To Next Topic](/en/menu_support/actioneditor4_help/stage/)

[To Help Table of Contents](/en/menu_support/actioneditor4_help/)