---
title: World Map Event Placement
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: World Map Event Placement
    url: /menu_support/actioneditor4_help/worldmapevent/
description: Online help for the action game creation software "Action Editor 4". "World Map Event Placement" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## World Map Event Placement Table of Contents

There are only three types of events on the world map: "World (Stage), Path, and Wall", and you cannot configure them in great detail.

- [Event Placement](#PUT)
- [About Event Palette](#PALETTE)
- [Event Settings](#SET)

<a name="PUT"></a>

## Event Placement

To place an event, first switch the palette mode to Event Palette.  
To switch, select "Edit" -> "Change Palette" -> "Event" from the menu on the world map window.  
Then, the following window will appear.  
  
World Map Event Palette Window  
![](/menu_support/actioneditor4_help/worldmapevent/Event.jpg)  
  
Left-clicking on the map allows you to place or edit an event (placement or edit depends on settings).  
The placed event will be the one selected in the event palette.  
  
Also, right-clicking on the map will bring up a menu like the one below.  
  
![](/menu_support/actioneditor4_help/worldmapevent/PopupMenu01.png)  
  
● Edit  
Edits the selected event.  
  
● Cut / Copy / Paste  
Performs cut, copy, and paste operations on the selected event.  
You can also copy an event on the map and paste that data onto the event palette.  
  
● Create New  
Creates a new event at the selected position.  
Regardless of which data is selected in the event palette window, the event will be default (minimal) data.  
  
● Delete  
Deletes the selected event.  

[Back to top of page](#TOP)

<a name="PALETTE"></a>

## About Event Palette

Event palette data is merely a template for event data.  
**Note that editing event palette data does not affect already placed events.**  
Having frequently used events readily available on the event palette can improve event placement efficiency.  
  
Now, let's explain the items at the top of the event palette window first.  
● Edit if placed  
If this is checked, when placing an event with a left-click, if an event already exists at the cursor position, it will enter editing of the existing event (instead of placing a new event).  
  
● Edit immediately before placement  
If this is checked, when placing an event with a left-click, it will enter event editing before placing the event.  
  
● Auto-assign World Number  
**If this is checked and you place an event, a world number not yet used on the world map will be automatically assigned.**  
  
● Event List (Template) (Frame)  
List of event data.  
You can edit this list using the "Insert," "Edit," "Delete," and "Data Count" buttons, or by right-clicking.  

[Back to top of page](#TOP)

<a name="SET"></a>

## Event Settings

When you "Edit" an event on the map, or click the "Insert" or "Edit" button in the event palette, the following window appears.  
  
Event Edit Window  
![](/menu_support/actioneditor4_help/worldmapevent/SetEvent.jpg)  
  
Event settings will be performed in this window.  
Explanations for each item are as follows:  
  
● Event Name  
The name of the event.  
It will not be displayed in the game.  
  
● Page List  
The list on the left side of the window is called the page list.  
All items explained after this page list are collectively referred to as a page (or event page), and one event can have multiple pages.  
When an event has multiple pages, you can click on any page in this page list to refer to that page.  
  
You can edit the page list using the "Insert" and "Delete" buttons at the top of the page list, or by right-clicking.  
  
● Appearance Condition  
Conditions for the event to appear.  
**If the appearance conditions for multiple pages are met, only the page with the lowest page number (the page positioned highest in the page list) will appear.**  
Explanations for each item in appearance conditions are as follows:  
  
○ World  
If the world with the number set here is cleared, the event appears.  
If "0", there are no stage conditions.  
  
○ Variable Condition  
A condition using common variables.  
**You can name the selected variable by clicking the small button to the right of the variable combo box.**  
  
○ Total Score  
A condition using total score.  
  
● Graphic  
The graphic of the event.  
In the game, the background (black) will not be displayed.  
  
● Event Type  
The content of the event.  
・World ... Loads and plays a stage.  
・Path ... Makes the event's position passable, **regardless of map chips**.  
・Wall ... Makes the event's position impassable, **regardless of map chips**.  
  
● World Name  
The title displayed on the world map.  
  
● Start Stage  
Specify the very first stage to play in this world from existing stage files.  
**※Regardless of which version file is specified here, the file actually loaded will be the newest version.**  
For example, even if "Stage.stg4_v100" is specified here, if "Stage.stg4_v101" exists in the "stg" folder, the newer v1.01 will be loaded.  
  
● Variation  
Variation is a feature that changes common variables before the world starts.  
For example, it can be used to present normal and hard modes as different worlds for one world (stage) by changing the "Difficulty" common variable.  
Of course, there's no need to duplicate stage files.  
Instead of using variations, you could create a mechanism to choose between normal and hard modes within the stage, but variations offer the advantage of separately recording information like clear status, high scores, and rankings.  
However, a little ingenuity is needed to correctly test single stages (with the desired variation). For example, create a test-play-only flow that initializes variables "Before stage start" for the protagonist character.  
  
● World Number  
**Internally, the program provides 999 variables (1-999) to manage whether each world has been cleared.  
Here, please specify which of these numbers corresponds to the current world.**  
Basically, **as long as the numbers don't overlap for each world, there should be no problem.** (If "Auto-assign World Number" is checked in the event palette window, the numbers will almost certainly not overlap.)  
There's also a technique where you intentionally use the same number for multiple worlds to make "clearing one automatically clear the other."  
  
● Passable even if not cleared  
Checking this will allow passage even if the world has not been cleared.  
Conversely, if unchecked, you cannot pass through unless it has been cleared at least once.  
  
● Playable even after clear  
Checking this allows you to play the world again even after clearing it once.  
  
● Game Clear  
Whether to consider the world cleared as a game clear.  
・Do not ... Does not count as a game clear.  
・Start 2nd Playthrough ... **All worlds revert to uncleared, and the protagonist returns to the initial position.**  
・Return to title (※Not Recommended) ... Counts as a game clear and returns to the title screen. **The reason for "※Not Recommended" is that returning to the title screen eliminates save opportunities, and if auto-save is enabled upon stage clear in a multi-stage world (depending on settings), it might become impossible to return to the world map.**  

[Back to top of page](#TOP)

---

  

[To Next Topic](../worldmapmenu/)

[To Help Table of Contents](..)