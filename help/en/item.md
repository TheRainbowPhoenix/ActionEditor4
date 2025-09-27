---
title: Item Settings
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Item Settings
    url: /menu_support/actioneditor4_help/item/
description: Online help for the action game creation software "Action Editor 4". "Item Settings" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## Item Settings Table of Contents

Explains item parameters.  

- ["1" Tab](#ITEM_1)
- ["2" Tab](#ITEM_2)

<a name="ITEM_1"></a>

## "1" Tab

Item Data Edit Window "1" Tab  
![](/menu_support/actioneditor4_help/item/Item1.jpg)  
  

● Inheritance Palette  
The palette where the inherited source data for each parameter exists.  
Only higher-level palettes can be specified.  
  
● Inherited Data  
The inherited source data for each parameter.  
  
● Inherit (Multiple checkboxes on the left of the window)  
Whether to inherit settings from the data configured in "Inherited Data."  
One checkbox is provided for each parameter or group of parameters.  
  
● Item Name  
The name of the item.  
It will not be displayed in the game, but for palette data, the item name is displayed in "Inherited Data" and "Item Summon" commands, etc., so it's good to name it.  
  
● Appearance Condition  
Conditions for the item to appear.  
  
○ Appearance Condition List  
Multiple conditions can be set.  
**※If an item is possessed by a character, the appearance conditions are invalid. Meaning the character possesses it from the start.**  
> For details on setting the appearance condition list, refer to ["Appearance Condition List / Flow Basic Condition (Execution Condition) List Settings"](../cond/).  
  
○ Evaluation Type  
How the conditions are ultimately evaluated based on the appearance condition list.  
"True" here means that the set condition has been met.  
  
○ Once condition is met, it is always met unconditionally thereafter  
Self-explanatory.  
  
● Initial Position Offset Y (dot)  
Normally, items appear in the center of the square where they are placed.  
By setting an initial position offset, you can shift the appearance position by any number of dots from the center of the square.  
  
● Graphic  
The graphic of the item.  
  
● Z-coordinate  
The program draws objects in order from the smallest "Z-coordinate".  
In other words, a larger "Z-coordinate" means it will be displayed closer to the foreground.  
Note that if multiple objects have the same "Z-coordinate", their display order is not guaranteed.  
  
● Transparent  
Whether to hide the graphic.  
  
● Mark  
Whether to display a mark.  
The mark is displayed in front of the item's graphic.  
The mark's original role (reason for implementation) is to "display only in the editor", allowing **different objects with the same appearance to be distinguished in the editor.**  

[Back to top of page](#TOP)

<a name="ITEM_2"></a>

## "2" Tab

Item Data Edit Window "2" Tab  
![](/menu_support/actioneditor4_help/item/Item2.jpg)  
  

● Scale  
How many times to enlarge the item.  
  
● Acquisition Type  
Whether the item can be picked up.  
**Only the protagonist can acquire items.**  
  
● Display item above character's head upon acquisition  
Whether to display a small image of the item above the protagonist's head upon item acquisition.  
  
● Sound Effect  
Sound effect to play when the item is acquired.  
Can be specified from the sound effects configured in the database.  
  
● Effect  
The effect obtained when the item is acquired.  
**It has similar specifications to the "Commands" section in character flows (however, the types of executable commands differ).**  
> For details on character flows, refer to ["Character Settings"](../chara/#CHARA_4).  

[Back to top of page](#TOP)

---

  

[To Next Topic](../commando/)

[To Help Table of Contents](..)