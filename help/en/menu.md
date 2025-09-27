---
title: Main Menu
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Main Menu
    url: /menu_support/actioneditor4_help/menu/
description: Online help for the action game creation software "Action Editor 4". "Main Menu" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## Main Menu Table of Contents

Main Window  
![](/menu_support/actioneditor4_help/menu/Main.jpg)  

The menu at the top of the main window is called the main menu.  
Each item is explained below.  
  

- ["File"](#FILE)
- ["Edit"](#EDIT)
- ["View"](#SHOW)
- ["Stage"](#STAGE)
- ["Project"](#PROJECT)
- ["Test Play"](#TESTPLAY)
- ["Other"](#OTHERS)

<a name="FILE"></a>

## "File"

● Create New Stage  
Creates a new stage.  
  
New Stage Creation Window  
![](/menu_support/actioneditor4_help/menu/StageNew.jpg)  
  
○ Path to stage file to copy (Template)  
This determines the initial state of the stage, excluding the stage palette.  
Whether you input the version part of the extension or not, the latest version will be read, so it's fine to use ".stg4_***" or ".stg4_", etc.  
  
○ Stage Palette  
Initial state of the stage palette.  
  
● Open Stage  
Loads a stage from an existing stage file (.stg4_*).  
**You can load old version stage files, but you cannot load stage files with a newer version than the editor.**  
By the way, you can identify the stage file version by its extension. (The "*" part of the filename "~.stg_*" represents the version).  
  
● Close Stage  
Closes the currently edited stage.  
  
● Overwrite Save Common Palette & Overwrite Save Stage  
Overwrites and saves the common palette and the currently edited stage.  
**If the editor version differs between the previous save and the current one, it will always be a new save.**  
**At this time, the old version of the stage file will be automatically backed up to the "data" > "stg4" > "old_ver" folder. (You can also prevent backup in the "Project" > "Project Options" settings.)**  
  
● Overwrite Save Common Palette & New Save Stage  
Overwrites and saves the common palette, then saves the currently edited stage as a new file.  
  
● Overwrite Save Common Palette  
Overwrites and saves the common palette.  

[Back to top of page](#TOP)

<a name="EDIT"></a>

## "Edit"

● Undo  
Undoes the most recent operation performed on the stage window.  
The state of the common palette and stage palette cannot be undone.  
  
● Redo  
Cancels the state reverted by "Undo."  
● Change Palette  
Switches the palette mode (Block or Character or Item).  
  
● Clear Placement Data  
Deletes all placed data.  

[Back to top of page](#TOP)

<a name="SHOW"></a>

## "View"

● Common Palette  
Toggles the display/hide of the common palette window.  
  
● Stage Palette  
Toggles the display/hide of the stage palette window.  
  
● Group Information  
Toggles the display/hide of the group information window.  

[Back to top of page](#TOP)

<a name="STAGE"></a>

## "Stage"

● Stage Settings  
Configures stage-wide settings, such as changing stage size.  
> For details, refer to [Main Menu "Stage" > "Stage Settings"](../menu_stage_set/).  
  
● Load Stage Palette  
Loads a stage palette from an existing stage palette file (.plt4).  
  
● Save Stage Palette  
Saves only the stage palette portion of the currently edited stage to a separate file.  
  
● Stage Options  
Sets the editor's behavior for the current stage.  
  
Stage Options Window  
![](/menu_support/actioneditor4_help/menu/StageOption.jpg)  
  
○ Undo Count  
How many times the "Undo" operation can be performed for stage edits.  
**If your computer's physical memory is insufficient, attempts to increase the count will be denied.  
The larger the stage size, the more restricted the undo count will be.  
**  
○ Mouse Wheel Scroll Direction  
Whether the stage scrolls horizontally or vertically with mouse wheel operation.  

[Back to top of page](#TOP)

<a name="PROJECT"></a>

## "Project"

● Database  
Sets up databases for animations, BGM, and more.  
> For details, refer to [Main Menu "Project" > "Database"](../menu_project_database/).  
  
● World Map  
Edits the world map.  
> For details, refer to [World Map Chip Placement](../worldmapchip/), [World Map Event Placement](../worldmapevent/), [World Map Menu](../worldmapmenu/).  
  
● System  
Configures the overall game system.  
> For details, refer to [Main Menu "Project" > "System"](../menu_project_system/).  
  
● Project Options  
Configures the editor's behavior for this game.  
> For details, refer to [Main Menu "Project" > "Options"](../menu_project_option/).  

[Back to top of page](#TOP)

<a name="TESTPLAY"></a>

## "Test Play"

**When test play is executed, the currently edited stage and common palette are automatically overwritten and saved.**  
  
**During test play, "test play only" flows will operate.**  
**Also, during test play, even if you achieve a good score, it cannot be registered in the ranking.**  
  
● Test Play  
Tests the currently edited stage individually.  
  
● Test Play Entire Game  
Tests the entire game.  

[Back to top of page](#TOP)

<a name="OTHERS"></a>

## "Other"

● Bitmap Conversion Tool  
**Converts any bitmap to a bitmap usable in Action Editor 4.**  
> For details, refer to [Main Menu "Other" > "Bitmap Conversion Tool"](../menu_others_bmpconvert/).  

[Back to top of page](#TOP)

---

  

[To Next Topic](../menu_stage_set/)

[To Help Table of Contents](../)