---
title: Explanation of Terms
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Explanation of Terms
    url: /menu_support/actioneditor4_help/word/
description: Online help for the action game creation software "Action Editor 4". "Explanation of Terms" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## Explanation of Terms Table of Contents

- [Editor and Game](#EDITOR_GAME)
- [Main Window (Stage Window)](#MAINWINDOW)
- [World](#WORLD)
- [Unit Notation](#TANNI)
- [Palette](#PALETTE)
- [Inheritance](#KEISHOU)
- [Stock](#STOCK)
- [Variables](#VAL)
- [Target](#TARGET)
- [Parent and Child](#PARENTCHILD)
- [Clone Value](#BUNSHINPOINT)
- [Front Y / Back Y](#MAEY_USHIROY)
- [Drawing Mode (Direct3D, DirectDraw)](#DRAWMODE)
- [Return Value](#RETURN)

<a name="EDITOR_GAME"></a>

## Editor and Game

In this help, the program "Editor_v*.exe" is often referred to simply as "editor," and the program "Game_v*.exe" is often referred to simply as "game."

[Back to top of page](#TOP)

<a name="MAINWINDOW"></a>

## Main Window (Stage Window)

When the editor is launched, the first large window displayed is called the "main window." (It's the second window displayed on first launch.)  
Also, since stages are displayed in this window, it's also called the "stage window."  
In explanations related to stage editing, it is likely that "stage window" will be used frequently.

[Back to top of page](#TOP)

<a name="WORLD"></a>

## World

A "world" refers to a collection of one or more stages, where clearing them all (strictly speaking, the final stage) counts as clearing that game mode.  
Even a single stage can be called a "world".  
  
**To compose a world with multiple stages, append "-S" (where "S" is the stage number) to the end of the stage filename.**  
Example: "stage-1.stg4_*", "stage-2.stg4_*"  

[Back to top of page](#TOP)

<a name="TANNI"></a>

## Unit Notation

Units displayed in the editor.  
**・(1/10s) ... Unit of 1/10th of a second  
・(1/60s) ... Unit of 1/60th of a second  
・(bl) ... Block unit (=32 dot unit)  
・(hbl) ... Half-block unit (=16 dot unit)  
・(dot) ... Dot unit  
**

[Back to top of page](#TOP)

<a name="PALETTE"></a>

## Palette

Palette refers to the pre-placement data of objects (blocks, characters, items).  
Each object can have its parameters changed even after being placed on the stage, but it's more efficient to keep frequently used data in a palette.  
  
● Types of Palettes  
There are common palettes and stage palettes.  
  
○ Common Palette  
**A palette shared across the entire game (all stages).**  
It's similar to "Database" in that it's shared across the entire game.  
The one with "[Common]" written in its window title bar is the common palette.  
  
**※When editing the common palette, you need to carefully consider the impact on not only the currently edited stage but all other stages as well.  
The referencer (e.g., the "inherited data" of a block placed on a stage) only holds the common palette's number, so if data is deleted or reordered, changing the common palette's number, the referenced data will also be swapped.**  
  
○ Stage Palette  
**A palette used within a single stage.**  
**By creating data on the stage palette that you usually wouldn't use (in the main story), and then making standalone stages or bonus stages, you can avoid the common palette becoming bloated.**  
The one with "[Stage]" written in its window title bar is the stage palette.  

[Back to top of page](#TOP)

<a name="KEISHOU"></a>

## Inheritance

Inheritance is a function that partially adopts settings from a higher-level palette.  
"Common Palette" → "Stage Palette" → "Placed Data" are in descending order of rank (higher level), so settings can be inherited from "Common Palette" to "Stage Palette," but not from "Stage Palette" to "Common Palette."  
**If you change parameters in a higher-level palette, all parameters in the inherited destinations will automatically change,** making it easy to adjust game balance even after data has been placed.****  
  
**You can set default inheritance information in "Project" > "Project Options" > "Inheritance Defaults" tab in the main menu.**  
For some parameters, the inheritance function might feel annoying, so in such cases, uncheck the parameters you don't want to inherit here.  

[Back to top of page](#TOP)

<a name="STOCK"></a>

## Stock

Stock is a place to store the protagonist's and system's status (state).  
Alternatively, it refers to the function of storing or retrieving stored items from that place.  
  
**By using stock, you can carry over the protagonist's status (e.g., "Remaining HP") after clearing a stage to the next stage.**  
  
Stock settings are configured per stage.  
These are the two settings in Main Menu "Stage" > "Stage Settings" > "Basic Settings" tab: "Inherit status from stock before stage start" and "Store status to stock after stage end".  
**If you want to share status across all stages, please check both of these for all stages.**  
  
The target of stock (which stats to stock) can be changed in Main Menu "Project" > "System" > "3" tab "Stock Target".  
This setting applies to all stages.  

[Back to top of page](#TOP)

<a name="VAL"></a>

## Variables

Variables are not "strange numbers."  
Variables are "changing numbers" or "numbers that can be changed."  
  
You can change the value of variables using the "Status Manipulation" command or the "Code Execution" command.  
Also, variables can be used as information for condition evaluation, such as appearance conditions for blocks, characters, and items, or flow execution conditions.  
  
**For example, a common use case is like a flag, such as the following "block appears when switch is pressed."**  
  
<Example>  
[Switch (Item)] Effect: "Status Manipulation" command Variable A = 1  
[Block] Appearance Condition: Variable A is 1  
  
● Types of Variables  
There are common variables, stage variables, character variables, and flow variables.  
  
○ Common Variables  
**Variables independent for each game mode**, with 999 available per game mode.  
For example, Story Mode and Challenge Mode use different common variables.  
Common variables are initialized to 0.  
  
○ Stage Variables  
**Variables independent for each stage**, with 999 available per stage.  
Stage variables are **initialized to 0 before the stage starts.**  
  
○ Character Variables  
**Variables independent for each character**, with 8 available per character.  
Character variables are **initialized to 0 before the stage starts.**  
  
○ Flow Variables  
**Variables independent for each flow**, with 2 available (A, B) per flow.  
In the case of characters, there are (number of flows) × 2 (A, B) flow variables, and **items also actually have 2 (A, B) flow variables (considering the command list of "Effect" as one flow).**  
Flow variables are **initialized to 0 before the stage starts.**  
  
● Naming Common Variables and Stage Variables  
**You can name the selected variable by clicking the small button to the right of the variable combo box.**  

[Back to top of page](#TOP)

<a name="TARGET"></a>

## Target

Target refers to the destination in some movement commands, or the object of shots, etc.  
You can change the target at any time with the "Set Target" command.  
  
"Charge Move," "Shot," "Status Manipulation" commands, etc., are compatible with targets.  
  
Up to 4 targets ("Target 1" to "Target 4") can be handled per character, and they can be used differently depending on the situation.  
**By default, "Target 1" is set to the protagonist, and "Target 2" to "Target 4" are set to empty (not pointing to anyone).**  
Unless the target is changed with the "Set Target" command, "Target 1" will remain the protagonist.  
**※In versions 7.59 and earlier, only one target existed. If data from versions 7.59 and earlier is migrated to a newer version, the target from the old version will be inherited as "Target 1".**  
  
**※If a target is empty or has disappeared from the stage due to death, commands using that target will fail, and conditions using that target will always be false.**  

[Back to top of page](#TOP)

<a name="PARENTCHILD"></a>

## Parent and Child

In shots, swords, and character summoning, the relationship between the creator and the created is represented as "parent" and "child."  
**The creator of the shot or character is the "parent," and the created entity is the "child." A child's child is a "grandchild."**  
In commands like "Set Target," you can specify "parent character" and "child character" as targets.  

[Back to top of page](#TOP)

<a name="BUNSHINPOINT"></a>

## Clone Value

"Clone value" refers to "which clone number it is."  
  
Each character (clone body) is assigned a clone value according to the character's "number of clones."  
**For example, if "Number of Clones" is "2", a total of 3 entities with clone values of "0", "1", and "2" will be placed in one square.**  
Clone values can be used in character's "Initial Position Offset" and movement commands, etc.  

[Back to top of page](#TOP)

<a name="MAEY_USHIROY"></a>

## Front Y / Back Y

This section explains "Front Y" and "Back Y" which can be specified in "Direction" (movement direction) of movement commands.  
**"Front Y" is a setting where it means upward if the character is facing left, and downward if facing right.  
"Back Y" is the opposite: downward if the character is facing left, and upward if facing right.  
**

[Back to top of page](#TOP)

<a name="DRAWMODE"></a>

## Drawing Mode (Direct3D, DirectDraw)

There are two drawing modes: Direct3D and DirectDraw.  
You can switch modes by changing the value of "*" in "Direct3D=*" in the environment configuration file "System.ini".  
Explanations of these two modes are also found in "System.ini".  
In versions 2.84 and earlier, the drawing mode could not be selected and was always DirectDraw mode (Direct3D was disabled), so users of versions 2.84 and earlier should ignore the descriptions regarding Direct3D mode in this help. (However, DirectDraw is an old drawing mode and is not recommended now).  
  

[Back to top of page](#TOP)

<a name="RETURN"></a>

## Return Value

A return value is a numerical representation of the result of executing certain commands.  
For example, for the "Warp" command, if the warp is successful, 1 is set to Return Value A; if the warp fails, 2 is set.  

To use return values, first check the "Assign return value to flow variable" option in the settings of the corresponding command.  
This will cause the return value to be assigned to the flow variable when the command ends.  
Some commands may assign two or more return values simultaneously (to Flow Variable A and Flow Variable B).  

It is important to note that **flow variables where return values are assigned are independent for each flow.**  
If you want to perform condition evaluation or other actions in a different flow than the one that acquired the return value, you need to assign it to a character variable or similar.  
Note that due to this "independent for each flow" specification, "flow variables" cannot be specified in "Status Conditions" for "Appearance Conditions" of blocks, characters, and items (because it's unclear which flow's flow variable to refer to).  

[Back to top of page](#TOP)

---

  

[To Next Topic](../sousa/)

[To Help Table of Contents](../)