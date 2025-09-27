---
title: "Stage > Stage Settings"
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: "Stage > Stage Settings"
    url: /menu_support/actioneditor4_help/menu_stage_set/
description: Online help for the action game creation software "Action Editor 4". "Stage > Stage Settings" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## "Stage" > "Stage Settings" Table of Contents

- ["Basic Settings" Tab](#STAGE_1)
- ["Advanced Settings" Tab](#STAGE_S1)
- ["Advanced Settings 2" Tab](#STAGE_S2)

<a name="STAGE_1"></a>

## "Basic Settings" Tab

The "Basic Settings" tab allows you to configure general stage settings.  
  
Stage Settings Window "Basic Settings" Tab  
![](/menu_support/actioneditor4_help/menu_stage_set/Stage1.jpg)  
  
● Stage Name  
The name of the stage.  
It was not displayed in the game until version 9.30, but **in version 9.50, a setting was implemented to append this stage name to replay file names.** This is configured in "Replay file name composition" under Main Menu "Project" > "System".  
  
● Width / Height  
The size of the stage.  
The "Memory Usage" displayed next to it must not exceed the "Limit", otherwise the size expansion will fail.  
**The "Limit" is primarily determined by the available physical memory of your computer, so the more free memory you have, the larger stages you can create.**  
Also, if memory is tight, the number of "Undo" operations will be forcibly reduced.  
Expanding or shrinking the size can take considerable time in some cases. (Especially shrinking).  
  
Furthermore, the combo box next to it, "Expand to ○ direction (or Delete ○)", allows you to specify the direction of expansion (or shrinking).  
・Expand to right (or Delete right) ... When increasing "Width", new space is added to the right of the stage. When decreasing "Width", it is deleted from the right of the stage.  
・Expand to left (or Delete left) ... When increasing "Width", new space is added to the left of the stage. When decreasing "Width", it is deleted from the left of the stage. **Since the X coordinate will shift, if you have set absolute coordinates for movement destinations in character movement or warp commands, you will need to reconfigure them.**  
・Expand to bottom (or Delete bottom) ... When increasing "Height", new space is added to the bottom of the stage. When decreasing "Height", it is deleted from the bottom of the stage.  
・Expand to top (or Delete top) ... When increasing "Height", new space is added to the top of the stage. When decreasing "Height", it is deleted from the top of the stage. **Since the Y coordinate will shift, if you have set absolute coordinates for movement destinations in character movement or warp commands, you will need to reconfigure them.**  
  
● Set horizontal scroll minimum value (left edge)  
● Set horizontal scroll maximum value (right edge)  
● Set vertical scroll minimum value (top edge)  
● Set vertical scroll maximum value (bottom edge)  
The scrollable range of the stage.  
For example, if you set the horizontal scroll minimum value (left edge) to "10", the screen's left edge X-coordinate (stage coordinate) will not go below 10, so it will no longer scroll further left.  
Also, flying protagonists can only move within the scrollable range.  
"Hidden Width" displayed to the right of each setting refers to the width that is not displayed on the screen during the game (does not enter the screen).  
  
● Horizontal Scroll  
● Vertical Scroll  
Scrolling behavior.  
・Scroll with protagonist's position ... Always scrolls so that the protagonist is centered on the screen.  
・Auto-scroll ... Scrolls at the speed set in "Scroll Speed" regardless of the protagonist's position.  
  
● Time Limit  
Whether to set a time limit.  
  
● Warning Sound Start Time  
When a time limit is set, at how many seconds remaining does the warning sound begin to play.  
  
● Gravity  
Gravity for walking characters.  
The default is "0.4", and **setting it to anything other than "0.4" will result in slight errors in jump power, etc.**  
  
● Protagonist's continuous damage invincibility time (1/60s)  
● Protagonist's continuous damage invincibility time from same character (1/60s)  
● Enemy's continuous damage invincibility time (1/60s)  
● Enemy's continuous damage invincibility time from same character (1/60s)  
While the continuous damage invincibility time elapses after a character takes damage or impact, characters and shots will not hit (they will pass through).  
However, **as an exception, shots that have absolutely no effect (no damage, impact, or item acquisition) will hit even during the continuous damage invincibility time.**  
If you absolutely want to disable this behavior, check "Apply behavior from versions 7.59 and earlier when hit by a shot with no effect (no damage, impact, or item acquisition) (shots with no effect will pass through without hitting)" in the system settings.  
  
● Display status window  
Whether to display the status window at the top of the screen.  
  
● BGM  
The BGM to play.  
Can be specified from the BGM set in the database.  
Checking "Loop Playback" will loop the song.  
Checking "Do not restart playback if stage BGM does not change" will continue playback from the current position without restarting the song if the BGM is the same as the previously played stage.  
  
● After stage clear, switch scene without waiting for enter key input *However, it will no longer be possible to register in the ranking*  
If this is checked, after the stage is cleared, the scene will switch immediately without waiting for enter key input.  
However, even if you achieve a good score, it cannot be registered in the ranking.  
  
● Allow replay saving  
If "Allow replay saving" is enabled in the system settings, and this item is also checked, manual replay saving will be possible, and it will also be subject to the automatic replay saving function.  
For example, **for opening or ending stages, unchecking this can reduce unnecessary replay files from automatic replay saving.**  
  
● Background (Frame)  
The background of the stage.  
When multiple backgrounds are set, they are drawn in order from the top of the list in the game, so **backgrounds lower in the list will be displayed closer to the foreground.**  
**Among the default images, files starting with "Tr_" use transparency colors and can be displayed layered.**  
Note that backgrounds are not displayed in the editor.  
  
Background Settings Window  
![](/menu_support/actioneditor4_help/menu_stage_set/Back.jpg)  
  
Below are the settings for the background settings window.  
  
○ Display from start  
The background is displayed from the beginning.  
If you want to display the background from the middle of the stage using the "Display Background" command in a character's flow, uncheck this.  
  
○ Image  
Specifies the background by image.  
**Please specify images from the "back" folder. (If you want to use your own images, please put them in the "back" folder.)**  
  
○ Specify by color  
Specifies the background by "color number".  
  
○ Display in front of character  
Whether to display in front of the character.  
  
○ Horizontal scroll speed  
○ Vertical scroll speed  
How much the background scrolls relative to the protagonist's movement.  
When the scroll speed is 1.00, it moves at the same speed as the protagonist.  
Checking "Auto-scroll" will always scroll the background.  
  
● Stock (Frame)  
Settings related to stock.  
The target of stock (which stats to stock) can be changed in Main Menu "Project" > "System" > "2" tab "Stock Target".  
  
● Display text images (Frame)  
Whether to display text images for "STAGE X" (e.g., "STAGE 1"), "READY", "CLEAR!", and "GAMEOVER" respectively.  
"STAGE X" and "READY" will not be displayed during test play even if checked. (This is a specification to allow for quick testing).  
  
● Ranking (Frame)  
Whether to enable rankings for each genre.  
**Rankings will not function unless "Ranking" on Main Menu "Project" > "System" > "1" tab is also enabled.**  
  
**One ranking is prepared per world, and ranking registration processing is performed each time a world is cleared.**  
**If one world consists of multiple stages, the ranking settings for the final stage will be the ranking settings for that world.**  

[Back to top of page](#TOP)

<a name="STAGE_S1"></a>

## "Advanced Settings" Tab

The "Advanced Settings" tab allows you to configure advanced stage-wide settings.  
  
Stage Settings Window "Advanced Settings" Tab  
![](/menu_support/actioneditor4_help/menu_stage_set/Stage2.jpg)  
  
  
● Frame Rate  
The frame rate (≒ game speed) when playing this stage.  
**If set to anything other than "60", the time limit count will differ from real-world time intervals.  
Also, unit notations (e.g., "1/10s") across all editing will no longer be accurate.**  
**For example, if the frame rate is set to "30" and the time limit to "60" (1/10s), the actual time limit will be twice that, 120 seconds.  
Furthermore, if it's "61" or higher, vertical synchronization during screen updates will be disabled (the screen will flicker slightly).**  
*In Direct3D mode, if VSync (in System.ini) is enabled, it will be fixed at "60".  
  
● Hit Detection Level  
First, hit detection refers to the process (performed by the program) of determining whether objects such as characters, blocks, items, and shots have collided.  
"Character landed on a block," "Shot hit a character," "Character picked up an item," etc., all involve hit detection.  
  
And, the **hit detection level** that can be set here refers to **the precision of hit detection**, and can be set between 1 and 10.  
**The default is "10 (Speed Limit 600)", and operation is not guaranteed if any other setting is used.**  
**The sole and significant advantage of lowering the hit detection level is that the game's operation becomes lighter** (the effect is immense).  
  
Although only hit detection level "10 (Speed Limit 600)" guarantees operation, **hit detection will still function correctly even if you specify a speed limit other than 600 with a level other than "10".** (By the way, the speed limit for levels other than 600 is "Hit Detection Level × 60".)  
**However, since movement, jump, impact, etc., speeds will be limited, it often won't operate as intended by the creator.**  
  
In contrast, if you set a hit detection level **other than "10" and keep the speed limit at 600, the precision of hit detection will decrease, but character and shot speeds will not be limited.**  
**However, a decrease in hit detection precision means that, for example, a shot that should hit a character might pass through, or a character might die just by hitting a block, being considered "sandwiched between blocks."**  
However, **even if hit detection precision is lowered, if character and shot speeds are kept below "Hit Detection Level × 60", hit detection will still function correctly.**  
  
"Speed Limit" refers to the maximum movement speed of characters and shots in the stage.  
**For example, if the speed limit is 60, even if a character's move command is set to "80", the actual character's movement speed will be 60.  
While "Speed" etc. in character move commands are easy to understand because they are set by value, this becomes tricky with jumps and impacts.**  
  
**In particular, the initial speed when taking impact is considerably fast and highly susceptible to the hit detection level, so caution is necessary.  
In stages that use impact, it's best to either unequivocally set the hit detection level to "10 (Speed Limit 600)" or lower the hit detection level and speed limit, accepting that the knockback distance will be shorter than the distance set in "Impact".  
The danger lies in lowering only the hit detection level while keeping the speed limit at 600. When a character takes impact (at high speed) and touches a block, the program may inexplicably consider the character "sandwiched between blocks" and the character may die.**  
  
  
Well, to summarize after this long explanation:  
  
・If you want the game to run lighter → Lower the hit detection level.  
  
・When lowering the hit detection level  
　**If you want stable operation even if character and shot speeds are limited → Lower the speed limit.  
　If you don't want to lower character and shot speeds, even if hit detection precision decreases → Keep speed limit at 600.** **※Especially be careful with impacts**  
  
● Character vs. Shot Hit Detection Precision  
The precision of hit detection between characters and shots.  
  
**The default is "Maximum (same as hit detection level)", and please note that operation is not guaranteed if any other setting is used.**  
**The sole and significant advantage of lowering hit detection precision is that the game's operation becomes lighter.**  
**This is effective in bullet-hell shooting games, etc.**  
  
If you set it to anything other than "Maximum (same as hit detection level)", **setting it higher than "Hit Detection Level" has no meaning.**  
Also, **please set it so that (Hit Detection Level ÷ Character vs. Shot Hit Detection Precision) is an integer.**  
  
<Example>  
○ Hit Detection Level: 4 Character vs. Shot Hit Detection Precision: 2 → 4 ÷ 2 is an integer!  
× Hit Detection Level: 4 Character vs. Shot Hit Detection Precision: 3 → 4 ÷ 3 is not an integer...  
  
If (Hit Detection Level ÷ Character vs. Shot Hit Detection Precision) is not an integer, the corresponding speed will decrease.  
"Corresponding speed" refers to the permissible movement speed of characters and shots.  
**If the movement speed of characters or shots exceeds the corresponding speed, hit detection may not occur correctly, and a shot that should hit a character might pass through.**  
  
● Enable "Z-coordinate" for characters, items, shots, and swords (turning off increases execution speed)  
Whether to enable "Z-coordinate" for characters, items, shots, and swords.  
Turning it off increases execution speed.  
  
● Do not take damage outside the screen (turning off significantly reduces execution speed)  
Whether the protagonist and enemy characters do not take damage when off-screen.  
Turning it off significantly reduces execution speed. **The more characters placed in a stage, the heavier it becomes.**  
  
● Auto-disappearance (Frame)  
Conditions for the disappearance of off-screen enemies (non-block), enemies (block), items, protagonist's shots, and enemy's shots.  
**Think of it as "how far away from the protagonist (screen) before its existence is erased (no longer needed)."**  
**Utilizing this function can make stages lighter.**  
  
For example, in a stage that continuously auto-scrolls to the right, set "Enemy (non-block)" and "Enemy (block)" to "Disappear if left of screen left edge + 0 (bl)".  
In this stage, once an enemy disappears off the left side of the screen, it will no longer contact the protagonist, so there's no problem with it disappearing the moment it goes off-screen to the left.  
This eliminates unnecessary objects and eliminates the need to execute unnecessary processing, making the stage lighter.  
  
Note that when an enemy disappears, the score set for the enemy and any items it possessed cannot be acquired. (This is different from "death").  

[Back to top of page](#TOP)

<a name="STAGE_S2"></a>

## "Advanced Settings 2" Tab

The "Advanced Settings 2" tab allows you to change the ranges used for hit detection.  
  
Stage Settings Window "Advanced Settings 2" Tab  
![](/menu_support/actioneditor4_help/menu_stage_set/Stage3.jpg)  
  
  
● Hit Detection Range (Frame)  
The hit detection range for each combination.  
For example, the hit detection range used to determine "whether the protagonist picked up an item" is "Protagonist"'s "vs. Item" and "Item"'s "vs. Character".  
  
○ Range  
Set in the format of "Width" x "Height".  
**Always use even values.**  
Values in parentheses are default values. **Operation is not guaranteed if values other than default are set.**  
**Specifically, setting values smaller than the default may cause issues such as shots passing through characters (hitting without effect) or characters dying by being considered "sandwiched between blocks" just by touching them.**  
  
**For scaled objects, the range also scales by that magnification.**  
For example, if the protagonist's "vs. Character when walking" is set to "16x24" and the protagonist is scaled up 4 times, the actual hit detection range becomes 32x48 (2 times height and width = 4 times).  
  
○ Position  
Where the hit detection range is located relative to each object.  
・"Center" ... The center of the hit detection range = the center of the object.  
・"Bottom" ... Placed at the bottom of the object. The bottom edge of the hit detection range will be at the same height as the bottom edge of the object's display area (image).  
  
Items that cannot have "Position" specified are fixed to "Center".  
For walking characters, "Bottom" is recommended.  
This is because **if set to "Center", a much smaller character could easily walk under and pass through a giant character.**  
  
○ Display  
Only for the protagonist's hit detection range, it can be displayed during the game.  
It's a good idea to actually display it once to see what happens when the character is enlarged, and what the difference is between "Center" and "Bottom" for "Position".  

[Back to top of page](#TOP)

---

  

[To Next Topic](/en/menu_support/actioneditor4_help/menu_project_database/)

[To Help Table of Contents](/en/menu_support/actioneditor4_help/)