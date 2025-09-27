---
title: Appearance Condition List / Flow Basic Condition List Settings
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Appearance Condition List / Flow Basic Condition List Settings
    url: /menu_support/actioneditor4_help/cond/
description: Online help for the action game creation software "Action Editor 4". "Appearance Condition List / Flow Basic Condition List Settings" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## Appearance Condition List / Flow Basic Condition List Settings

This section explains how to set the appearance condition list for blocks, characters, and items, and the basic condition (execution condition) list for flows.  
Multiple conditions can be set.  
  
● Types of Conditions  
○ Common Variable Condition  
A condition using common variables.  
**"Is a multiple of" includes 0 and negative values.**  
**For example, "Common Variable is a multiple of 2" will be true for 0 or -2.**  
  
○ Stage Variable Condition  
A condition using stage variables.  
  
○ Character Variable Condition  
A condition using character variables.  
**In the appearance condition settings for blocks and items, the protagonist's character variables are targeted.**  
In the appearance condition and flow basic condition settings for characters, the character's (the one being edited) own character variables are targeted.  
  
○ Status Condition  
A condition using character/system status or variables.  
**"Status Condition" has slow execution speed, so if you're just comparing variables and constants, you should use "Common Variable Condition," "Stage Variable Condition," or "Character Variable Condition."**  
When specifying "X-coordinate" or "Y-coordinate" for "Self" or "Target X (1~4)", you also set "Coordinate Type".  
The types of coordinate types are as follows:  
・Relative coordinates ... Relative coordinates where your position (the character executing the command) is (0,0).  
・Absolute coordinates ... Stage coordinates. The top-left of the stage is (0,0).  
・Screen coordinates ... The top-left of the game screen is (0,0).  
**All coordinate types are in dot units, not block units (bl)**. (By the way, 1 bl is 32 dots).  
**If "Remaining Lives" of "System" is specified, infinite lives (∞) are evaluated as 100. Even if lives are not set to ∞, be aware that lives automatically become ∞ during single-stage test play.**  
**"Flow variables" are independent for each flow, so they cannot be specified in appearance conditions for blocks, characters, or items (because it's unclear which flow's flow variable to refer to).**  
  
○ Status Condition 2  
A condition using non-numerical status of characters or the system.  
  
○ Status Condition 3  
A condition using the character's situation.  
  
○ Distance Condition  
A condition using the distance between yourself (the character being edited) and the protagonist or target.  
Can only be set for character appearance conditions and flow basic conditions.  
"Display Range" can display the range of the distance condition, but "Circle" display is slower than straight lines (non-"Circle") so overuse is prohibited.  
Also, **if the drawing mode is DirectDraw, the line will become thicker as the "Circle" gets larger, which is a specification.**  

[Back to top of page](#TOP)

---

  

[To Next Topic](../formation/)

[To Help Table of Contents](..)