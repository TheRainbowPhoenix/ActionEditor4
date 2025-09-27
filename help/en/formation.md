---
title: Formation Settings
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Formation Settings
    url: /menu_support/actioneditor4_help/formation/
description: Online help for the action game creation software "Action Editor 4". "Formation Settings" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## Formation Settings

This section explains "Formations" in "Shot," "Block Summon," "Character Summon," and "Item Summon" commands.  
"Formations" determine the basic appearance position and movement direction (movement speed) of projectiles (shots and summoned objects).  
  
Now, let's explain each formation.  
**Below, the explanation assumes the "Shot" command and a "Forward" firing direction.**  
The basics are the same for "Block Summon," "Character Summon," and "Item Summon" commands, but they do not have movement speed. (Speed is always 0. Summoned characters only change their left/right orientation.)  
  
○ Straight A  
Fires a shot straight ahead.  
If "Number of Shots" is multiple, they fly in a vertical line.  
"Interval (hbl)" can be set as a formation-specific parameter.  
"Interval (hbl)" is the distance between shots when "Number of Shots" is multiple.  
  
○ Straight B  
Fires a shot straight ahead from the character's feet.  
If "Number of Shots" is multiple, they fly vertically upwards from the character's feet.  
"Interval (hbl)" can be set as a formation-specific parameter.  
"Interval (hbl)" is the distance between shots when "Number of Shots" is multiple.  
  
○ Spread  
Fires shots spreading out in front of the character.  
"Angle" can be set as a formation-specific parameter.  
"Angle" is the angle between shots when "Number of Shots" is multiple.  
**※When shot "Movement Type" is "Target ~", the shots maintain their spread formation and move towards the target (the center of the entire spread shot). Therefore, if "Number of Shots" is even, the shots will not hit the target.**  
  
○ Lightning  
Fires shots that target a "Target" and move from one edge of the screen to the other.  
If "Number of Shots" is multiple, they fly horizontally in a line.  
"Interval (hbl)", "Number of Columns", and "Column Interval (hbl)" can be set as formation-specific parameters.  
"Interval (hbl)" is the distance between shots when "Number of Shots" is multiple.  
"Number of Columns" is the number of vertical columns of shots, and the actual number of shots will be "Number of Shots" × "Number of Columns" (× "Number of Clones").  
"Column Interval (hbl)" is the distance between columns when "Number of Columns" is multiple.  
  
○ Explosion  
Fires shots that scatter outwards from the center of the character.  
If "Number of Shots" is multiple, the angles between shots are equal.  
  
○ Encircle  
Shots appear around a "Target" and each shot moves towards the "Target".  
If "Number of Shots" is multiple, the angles between shots are equal.  
"Distance (hbl)" can be set as a formation-specific parameter.  
"Distance (hbl)" is the distance between the shot and the "Target".  

[Back to top of page](#TOP)

---

  

[To Next Topic](../menu/)

[To Help Table of Contents](..)