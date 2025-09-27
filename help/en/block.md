---
title: Block Settings
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Block Settings
    url: /menu_support/actioneditor4_help/block/
description: Online help for the action game creation software "Action Editor 4". "Block Settings" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## Block Settings

Block Data Edit Window  
![](/menu_support/actioneditor4_help/block/Block.jpg)  
  

Explains block parameters.

● Inheritance Palette  
The palette where the inherited source data for each parameter exists.  
Only higher-level palettes can be specified.  
  
● Inherited Data  
The inherited source data for each parameter.  
  
● Inherit (Multiple checkboxes on the left of the window)  
Whether to inherit settings from the data configured in "Inherited Data."  
One checkbox is provided for each parameter or group of parameters.  
  
● Block Name  
The name of the block.  
It will not be displayed in the game, but for palette data, the block name is displayed in "Inherited Data" and "Block Summon" commands, etc., so it's good to name it.  
  
● Appearance Condition  
Conditions for the block to appear.  
  
○ Appearance Condition List  
Multiple conditions can be set.  
> For details on setting the appearance condition list, refer to ["Appearance Condition List / Flow Basic Condition (Execution Condition) List Settings"](../cond/).  
  
○ Evaluation Type  
How the conditions are ultimately evaluated based on the appearance condition list.  
"True" here means that the set condition has been met.  
  
○ Once condition is met, it is always met unconditionally thereafter  
Self-explanatory.  
  
● Graphic  
The graphic of the block.  
  
● Display in front of character  
Whether to display in front of characters, items, shots, etc.  
  
● Transparent  
Whether to hide the graphic.  
  
● Mark  
Whether to display a mark.  
The mark is displayed in front of the block's graphic.  
The mark's original role (reason for implementation) is to "display only in the editor", allowing **different objects with the same appearance to be distinguished in the editor.**  
  
● Block Type  
Basic properties of the block.  
・"No Hit" ... Does not collide.  
・"Hit" ... Collides.  
・"Instant Death for Protagonist on Hit" ... Protagonist dies instantly upon touching. Enemies do not die. (Same as "Hit" for enemies).  
  
● Disabled Faction  
When "Block Type" is not "No Hit", if "Disabled Faction" is the same as a character's or shot's "Faction", they will pass through the block without colliding.  
If "None", all factions will collide.  
  
● Action  
Actions that activate **for the protagonist** when the protagonist lands on it.  
・"None" ... Nothing happens.  
・"Jump X=Height (hbl)" ... The protagonist jumps the moment they land. "X" is the jump height.  
・"Jump Prohibited" ... Disables protagonist's jump while they are on it.  
・"Move Speed Change X=%" ... Modifies protagonist's move speed while on it. "X" is the modification value (specified in %).  
・"Move Left X=Speed" ... Protagonist moves left while on it. "X" is the move speed.  
・"Move Right X=Speed" ... Protagonist moves right while on it. "X" is the move speed.  
  
● Acquired Item  
Item acquired **the moment the protagonist lands on it and then at 1-second intervals thereafter**.  
Items can be specified from data in higher-level palettes.  
  
● Disable Block Summon (Do not allow changes by block summon)  
Whether to disable changing or deleting the block type using the "Block Summon" command.  

[Back to top of page](#TOP)

---

  

[To Next Topic](../chara/)

[To Help Table of Contents](..)