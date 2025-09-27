---
title: "Project > Project Options"
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: "Project > Project Options"
    url: /menu_support/actioneditor4_help/menu_project_option/
description: Online help for the action game creation software "Action Editor 4". "Project > Project Options" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## "Project" > "Project Options" Table of Contents

- ["General" Tab](#ZENPAN)
- ["Inheritance Defaults" Tab](#KEISHOU)

<a name="ZENPAN"></a>

## "General" Tab

The "General" tab allows you to configure project-wide settings.  
  
Project Options Window "General" Tab  
![](/menu_support/actioneditor4_help/menu_project_option/ProjectOption1.jpg)  
  
● Palette Data Default Settings (Frame)  
Default settings for each palette data of blocks, characters, and items.  
For example, if you increase the number of palette data using the "Change Data Count" menu in the palette window, the data set here will be added as new data.  
  
● "Overwrite Stage Save" after Action Editor 4 Version Up  
**When performing "Overwrite Stage Save" in Action Editor 4, if the editor version differs between the previous save and the current one, it will always be a new save.**  
In such cases, this setting determines how the old version's file is handled.  
  
・Move old version stage files to "old_ver" folder  
Old version stage files are moved to the "data" > "old_ver" folder. This allows you to revert the Action Editor 4 version and play in a pinch.  
*This setting will not function unless you save the stage in the "data" > "stg4" folder.  
  
・Keep old version stage files as they are  
Old version stage files remain as they are.  
If you frequently update Action Editor 4, a large number of stage files with different versions will accumulate, making it complicated when opening files.  
  
・Delete old version stage files  
Deletes old version stage files.  
In a way, this is the most natural approach and doesn't consume disk space.  
*This setting may not function unless you save the stage in the "data" > "stg4" folder.  
  
● Path to Test Play Game Program (Frame)  
The location of the game program (Game_v*.exe) to launch during test play.  
Normally, checking "Auto acquire" should be fine.  
If an error dialog "Could not call game program!" appears when running test play, uncheck "Auto acquire" and then use the "Browse" button to specify the game program.  
  
● Prevent a bug that occurs in some environments where "when test playing without saving common palette and stage changes, the game hides behind the editor"  
Checking this can prevent the aforementioned bug, but it will disable automatic saving of stage and common palette changes during test play, forcing manual saving.  
  
● Backup edit data immediately after editor launch  
Enabling this feature allows you to prepare for the possibility of any edit data file being corrupted.  
The "Re-backup if X hours have passed since last backup" item sets the backup frequency. If this is "0" hours, a backup will be executed every time the editor is launched.  
This backup function simply copies the "data" and "e_data" folders, where the edit data files are stored, as "data_backup" and "e_data_backup" folders. If the editor can no longer be launched in the future, first revert "e_data_backup" to "e_data". If it still cannot be launched, revert "data_backup" to "data".  

[Back to top of page](#TOP)

<a name="KEISHOU"></a>

## "Inheritance Defaults" Tab

The "Inheritance Defaults" tab allows you to set default values for the "Inherit" parameters for blocks, characters, and items.  
  
Project Options Window "Inheritance Defaults" Tab  
![](/menu_support/actioneditor4_help/menu_project_option/ProjectOption2.jpg)  
  
● Inheritance Palette Defaults (Frame)  
Default settings for the "Inheritance Palette" in blocks, characters, and items.  
  
○ Stage  
Default settings for "Inheritance Palette" in stage palette data.  
  
○ Common → Placement  
Default settings for "Inheritance Palette" when placing common palette data onto a stage.  
  
○ Stage → Placement  
Default settings for "Inheritance Palette" when placing stage palette data onto a stage.  
  
● Inheritance Parameter Defaults (Frame)  
Default settings for the "Inherit" checkbox for each parameter of blocks, characters, and items.  
Three checkboxes form a set: from left to right, they represent new data in the stage palette, placing common palette data onto a stage, and placing stage palette data onto a stage, respectively.  

[Back to top of page](#TOP)

---

  

[To Next Topic](/en/menu_support/actioneditor4_help/menu_others_bmpconvert/)

[To Help Table of Contents](/en/menu_support/actioneditor4_help/)