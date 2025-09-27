---
title: Command Settings
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Command Settings
    url: /menu_support/actioneditor4_help/commando/
description: Online help for the action game creation software "Action Editor 4". "Command Settings" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## Command Settings Table of Contents

■ Character-Specific Commands

- [Wait](#WAIT)
- [Straight Move](#MOVE_LINE)
- [Ground Return Move](#MOVE_TURN)
- [Circular Move](#MOVE_CIRCLE)
- [Charge Move](#MOVE_CHARGE)
- [Homing Move](#MOVE_HOMING)
- [Off-screen Avoidance Move](#MOVE_SCRIN)
- [Disable Movement](#MOVE_STOP)
- [Change Direction](#CHANGEDIR)
- [Jump](#JUMP)
- [Shot](#SHOT)
- [Sword](#SWORD)
- [Block Summon](#SUMMONBLOCK)
- [Character Summon](#SUMMONCHARA)
- [Item Summon](#SUMMONITEM)
- [Flow Operation](#FLOW)

■ Item-Specific Commands

- [Change Flow](#CHANGEFLOW)

■ Common Commands for Characters and Items

- [Stage Clear](#CLEAR)
- [Game Wait](#GAMEWAIT)
- [Message](#MESSAGE)
- [Warp](#WARP)
- [Set Target](#TARGET)
- [Status Manipulation](#STATUS)
- [Status Manipulation 2](#STATUS_2)
- [Disappearance](#VANISH)
- [Acquire Item](#GETITEM)
- [Change Graphic](#GRAPHIC)
- [Change Basic Animation Set](#ANIMSET_COMMAND)
- [Execute Animation](#ANIM_COMMAND)
- [Execute Effect](#EFFECT_COMMAND)
- [Execute Character Effect](#CHARAEFFECT_COMMAND)
- [Execute Screen Effect](#SCREFFECT_COMMAND)
- [Display Picture](#PICTURE_COMMAND)
- [Change Screen Color](#SCRCOLOR_COMMAND)
- [Change Background](#BACK_COMMAND)
- [Play Sound Effect](#SOUND_COMMAND)
- [Play BGM](#BGM_COMMAND)
- [Execute Code](#CODE_COMMAND)
- [Arrange](#ARRANGE_COMMAND)
- [Loop](#LOOP_COMMAND)

<a name="WAIT"></a>

## Wait

![](/menu_support/actioneditor4_help/commando/Wait.jpg)  
  
The character waits (does nothing).  
**This command alone is meaningless, but it is useful for adjusting the start time of other commands.**  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  
  
● Execution Time (1/10s)  
The execution time of the command.  

[Back to top of page](#TOP)

<a name="MOVE_LINE"></a>

## Straight Move

![](/menu_support/actioneditor4_help/commando/MoveLine.jpg)  
  
The character moves in a straight line.  
Walking characters have all vertical movement disabled.  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  

---

"Movement Direction" Frame  
  
● Setting Type  
How to set the movement direction.  
・Specify by direction ... Specify by simple direction.  
・Specify by target coordinates ... Specify by target coordinates. The character moves towards that target.  
  
● Direction  
Movement direction.  
If "Input Direction", it moves according to the player's directional key input.  
  
● If character direction changes mid-execution, reverse speed *Only effective when direction is fixed*  
**For example, if you want to perfectly (naturally) achieve actions like "movement direction reverses when hitting a block," check this.**  
  
● Target Type  
The type of coordinates for the movement target.  
・Relative coordinates from placement position ... Relative coordinates where the character's initial position is (0,0).  
・Relative coordinates ... Relative coordinates where the character's position at the time of command execution is (0,0).  
・Absolute coordinates ... Stage coordinates. The top-left of the stage is (0,0).  
・Screen coordinates ... The top-left of the game screen is (0,0).  
  
● Target X (bl)  
● Target Y (bl)  
The target coordinates for movement.  
Can also be offset by dot units.  
When "Target Type" is "Relative coordinates from placement position" or "Relative coordinates" and "Invert if right-facing placement" is checked, the sign (+-) of the target coordinates is inverted if the character is placed facing right.  
**※Since the "Straight Move" command determines movement direction and speed at the start of command execution, if executed in parallel with other movement commands or if impact is received mid-execution, it will deviate from the target coordinates accordingly.**  
● Execute until target coordinates reached  
Whether to execute until target coordinates are reached.  
  
● Prevent Sway  
**Whether to prevent the character's display from swaying after reaching target coordinates.**  
Execution speed will slightly decrease.  
  
● Angle  
Offset in movement angle.  
**Checking "Reverse rotation if right-facing placement" will invert the sign (+-) of the angle if the character is placed facing right.  
This prevents vertical movement from being reversed regardless of whether the character is placed facing left or right.**  
**However, if "Direction" is "Input Direction", "Reverse rotation if right-facing placement" will always be disabled.  
※When "Character's Fixed Direction" is disabled, the character's direction is determined by movement direction or target, but "Angle" will not change the character's direction.**  
  
● Disable horizontal movement  
Horizontal movement speed becomes 0.  
  
● Disable vertical movement  
Vertical movement speed becomes 0.  
  
● Do not change character direction  
When "Fixed Direction" is disabled, the character's direction is forcibly changed according to movement direction, but checking this prevents the character's direction from changing.  

---

"Time/Speed/Distance" Frame  
  
● Setting Type  
How to set movement time, movement speed, and movement distance.  
**・Specify time and speed ... Specify "Execution Time" and "Speed". Movement distance will be "Execution Time" × "Speed".  
・Specify time and distance ... Specify "Execution Time" and "Distance". Movement speed will be "Distance" ÷ "Execution Time".  
・Specify speed and distance ... Specify "Speed" and "Distance". Movement time will be "Distance" ÷ "Speed".  
**  
● Execution Time (1/10s)  
The execution time of the command.  
  
● Speed  
Movement speed.  
"10" means about 60 dots per second.  
  
● Distance  
Movement distance.  
You can choose the unit for distance: "(hbl)" or "(dot)".  
**For character movement, such as the protagonist's movement, if you only want the character to move a little (with one input of the movement key), it's a good idea to set "Setting Type" to "Specify speed and distance" and set a short "Distance".** *If "Setting Type" is "Speed and Distance", it will not move at the correct speed unless the result of "Distance (dot)" ÷ "Speed" is 0.10 or more (or -0.10 or less).  
*If "Setting Type" is "Time and Distance", a speed limit will be applied and the movement distance will be shorter unless the result of "Distance (dot)" ÷ "Time" is between -600 and 600.  

---

"Inertia" Frame  
  
● Inertia  
Whether to apply inertia to movement.  
**When inertia is enabled, "Speed" is treated as acceleration.**  
**Movement to target coordinates and "Distance" do not consider inertia, so applying inertia will prevent accurate movement to target coordinates and the movement distance will not be as set.**  
  
● Max Speed  
Maximum speed during inertial movement.  
**If multiple movement commands with "Inertia" enabled are executed simultaneously, the slowest maximum speed among those commands will be applied** (more precisely, that maximum speed + α, but I won won't explain it in detail).  
  
● Speed correction on direction change  
When inertial movement speed is applied in the opposite direction of movement during command execution, this value corrects the speed.  
"1.0" means no speed correction.  
A higher value allows changing movement direction in a shorter time, making it easier to move.  

---

"Animation" Frame  
  
● Animation  
Changes animation.  
・Move Animation ... Becomes "Move" or "Flying Move" from the basic animation set.  
・Still Animation ... Becomes "Still" or "Flying" from the basic animation set.  
・Other ... If "None (do not change)", it continues the currently executing animation. You can also specify an "Animation" created in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  

[Back to top of page](#TOP)

<a name="MOVE_TURN"></a>

## Ground Return Move

![](/menu_support/actioneditor4_help/commando/MoveTurn.jpg)  
  
The character moves back and forth on blocks.  
**It primarily moves straight, but if there's no footing, the character's direction reverses and the movement direction changes.**  
*This command is only effective for walking characters.  
*Even if "Fixed Direction" is enabled for the character, the character's direction will reverse when turning back.  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  

---

"Time/Speed/Distance" Frame  
  
● Setting Type  
How to set movement time, movement speed, and movement distance.  
**・Specify time and speed ... Specify "Execution Time" and "Speed". Movement distance will be "Execution Time" × "Speed".  
・Specify time and distance ... Specify "Execution Time" and "Distance". Movement speed will be "Distance" ÷ "Execution Time".  
・Specify speed and distance ... Specify "Speed" and "Distance". Movement time will be "Distance" ÷ "Speed".  
**  
● Execution Time (1/10s)  
The execution time of the command.  
  
● Speed  
Movement speed.  
"10" means about 60 dots per second.  
  
● Distance  
Movement distance.  
You can choose the unit for distance: "(hbl)" or "(dot)".  
*If "Setting Type" is "Speed and Distance", it will not move at the correct speed unless the result of "Distance (dot)" ÷ "Speed" is 0.10 or more (or -0.10 or less).  

---

"Inertia" Frame  
  
● Inertia  
Whether to apply inertia to movement.  
**When inertia is enabled, "Speed" is treated as acceleration.**  
**"Distance" does not consider inertia, so applying inertia will prevent the movement distance from being as set.**  
  
● Max Speed  
Maximum speed during inertial movement.  
**If multiple movement commands with "Inertia" enabled are executed simultaneously, the slowest maximum speed among those commands will be applied** (more precisely, that maximum speed + α, but I won't explain it in detail).  
  
● Speed correction on direction change  
When inertial movement speed is applied in the opposite direction of movement during command execution, this value corrects the speed.  
"1.0" means no speed correction.  
A higher value allows changing movement direction in a shorter time, making it easier to move.  

---

"Animation" Frame  
  
● Animation  
Changes animation.  
・Move Animation ... Becomes "Move" or "Flying Move" from the basic animation set.  
・Still Animation ... Becomes "Still" or "Flying" from the basic animation set.  
・Other ... If "None (do not change)", it continues the currently executing animation. You can also specify an "Animation" created in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  

[Back to top of page](#TOP)

<a name="MOVE_CIRCLE"></a>

## Circular Move

![](/menu_support/actioneditor4_help/commando/MoveCircle.jpg)  
  
The character moves in a circular path.  
Walking characters have all vertical movement disabled.  
**※Strictly speaking, it will not be a perfectly circular trajectory. If left for a long time while moving in a circle, the center of the circle will drift.**  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  

---

"Movement Direction" Frame  
  
● Rotation Direction  
Rotation direction.  
Right Turn ... Rotates clockwise.  
Left Turn ... Rotates counter-clockwise.  
Right Turn if facing left, Left Turn if facing right ... Rotates clockwise if the character is facing left when the command is executed, counter-clockwise if facing right.  
Left Turn if facing left, Right Turn if facing right ... Rotates counter-clockwise if the character is facing left when the command is executed, clockwise if facing right.  
  
● If right-facing placement, reverse rotation, start/end angle +180 degrees  
Checking this will reverse "Rotation Direction" and add +180 degrees to "Start Angle" and "End Angle" if the character is placed facing right.  
  
● If right-facing placement, reverse rotation  
Checking this will reverse "Rotation Direction" if the character is placed facing right.  
  
● Disable horizontal movement  
Horizontal movement speed becomes 0.  
  
● Disable vertical movement  
Vertical movement speed becomes 0.  
  
● Do not change character direction  
When "Fixed Direction" is disabled, the character's direction is forcibly changed according to movement direction, but checking this prevents the character's direction from changing.  

---

"Time/Speed/Distance" Frame  
  
● Setting Type  
How to set movement time and movement speed.  
**・Specify time ... Specify "Execution Time". The increase angle, which greatly affects movement speed, will be {("End Angle" - "Start Angle") ÷ "Execution Time"}.  
・Specify speed ... Specify "Speed (Increase Angle)". Movement time will be {("End Angle" - "Start Angle") ÷ "Speed (Increase Angle)"}.**  
*It will not function correctly unless {("End Angle" - "Start Angle") ÷ Increase Angle} is set to be an integer. For example, if you intend to complete exactly one rotation (0→360 degrees), it might stop just before completing the rotation.  
  
● Execution Time (1/10s)  
The execution time of the command.  
  
● Speed (Increase Angle)  
Increase angle that greatly affects movement speed.  
A higher value increases movement speed.  
"60" means about 1 rotation per second.  
  
● Start Angle  
● End Angle  
● Radius (hbl)  
These three, "Start Angle," "End Angle," and "Radius," determine the movement distance. **These three are equivalent to "Distance" in "Straight Move" commands etc., and "Execution Time" or "Speed (Increase Angle)" will change depending on these settings.**  
The character moves in a circle from "Start Angle" to "End Angle".  
*Specify angles with 0 degrees being the 12 o'clock direction (directly above).  
"Radius" is the radius of the circle at this time.  

---

"Animation" Frame  
  
● Animation  
Changes animation.  
・Move Animation ... Becomes "Move" or "Flying Move" from the basic animation set.  
・Still Animation ... Becomes "Still" or "Flying" from the basic animation set.  
・Other ... If "None (do not change)", it continues the currently executing animation. You can also specify an "Animation" created in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  

[Back to top of page](#TOP)

<a name="MOVE_CHARGE"></a>

## Charge Move

![](/menu_support/actioneditor4_help/commando/MoveCharge.jpg)  
  
The character moves **towards the target**.  
Movement direction (movement speed) is determined at the start of command execution and remains constant thereafter.  
Walking characters have all vertical movement disabled.  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  

---

"Movement Direction" Frame  
  
● Target  
The target for movement.  
  
● Target Offset X (bl)  
● Target Offset Y (bl)  
Offset of the movement target (target's position).  
Can also be offset by dot units.  
Checking "Invert if right-facing placement" will invert the sign (+-) of the target offset if the character is placed facing right.  
  
● Angle  
Offset in movement angle.  
**Checking "Reverse rotation if right-facing placement" will invert the sign (+-) of the angle if the character is placed facing right.  
This prevents vertical movement from being reversed regardless of whether the character is placed facing left or right.**  
**※When "Character's Fixed Direction" is disabled, the character's direction is determined by target (target), but "Angle" will not change the character's direction.**  
  
● Disable horizontal movement  
Horizontal movement speed becomes 0.  
  
● Disable vertical movement  
Vertical movement speed becomes 0.  
  
● Do not change character direction  
When "Fixed Direction" is disabled, the character's direction is forcibly changed according to movement direction, but checking this prevents the character's direction from changing.  

---

"Time/Speed/Distance" Frame  
  
● Setting Type  
How to set movement time, movement speed, and movement distance.  
**・Specify time and speed ... Specify "Execution Time" and "Speed". Movement distance will be "Execution Time" × "Speed".  
・Specify time and distance ... Specify "Execution Time" and "Distance". Movement speed will be "Distance" ÷ "Execution Time".  
・Specify speed and distance ... Specify "Speed" and "Distance". Movement time will be "Distance" ÷ "Speed".  
****If speed is a negative value, movement direction will not be exactly opposite (+180 degrees), but will precisely move diagonally (same vertical and horizontal movement speed) away from the target.**  
  
● Execution Time (1/10s)  
The execution time of the command.  
  
● Speed  
Movement speed.  
"10" means about 60 dots per second.  
  
● Distance  
Movement distance.  
You can choose the unit for distance: "(hbl)" or "(dot)".  
*If "Setting Type" is "Speed and Distance", it will not move at the correct speed unless the result of "Distance (dot)" ÷ "Speed" is 0.10 or more (or -0.10 or less).  

---

"Inertia" Frame  
  
● Inertia  
Whether to apply inertia to movement.  
**When inertia is enabled, "Speed" is treated as acceleration.**  
**Charge movement (movement to target) and "Distance" do not consider inertia, so applying inertia will prevent accurate movement to the target and the movement distance will not be as set.**  
  
● Max Speed  
Maximum speed during inertial movement.  
**If multiple movement commands with "Inertia" enabled are executed simultaneously, the slowest maximum speed among those commands will be applied** (more precisely, that maximum speed + α, but I won't explain it in detail).  
  
● Speed correction on direction change  
When inertial movement speed is applied in the opposite direction of movement during command execution, this value corrects the speed.  
"1.0" means no speed correction.  
A higher value allows changing movement direction in a shorter time, making it easier to move.  

---

"Animation" Frame  
  
● Animation  
Changes animation.  
・Move Animation ... Becomes "Move" or "Flying Move" from the basic animation set.  
・Still Animation ... Becomes "Still" or "Flying" from the basic animation set.  
・Other ... If "None (do not change)", it continues the currently executing animation. You can also specify an "Animation" created in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  

[Back to top of page](#TOP)

<a name="MOVE_HOMING"></a>

## Homing Move

![](/menu_support/actioneditor4_help/commando/MoveHoming.jpg)  
  
The character moves **towards the target**.  
Movement direction and speed constantly change (every frame) during command execution, so it will persistently chase the target even if the target moves mid-execution.  
Walking characters have all vertical movement disabled.  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  

---

"Movement Direction" Frame  
  
● Target  
The target for movement.  
  
● Homing Accuracy Degradation  
**A higher value means lower homing accuracy.**  
**Specifically, it refers to "how many frames ago the target's position is used as the movement target."**  
  
● Target Offset X (bl)  
● Target Offset Y (bl)  
Offset of the movement target (target's position).  
Can also be offset by dot units.  
Checking "Invert if right-facing placement" will invert the sign (+-) of the target offset if the character is placed facing right.  
  
● Prevent Sway (※Sways during auto-scrolling)  
**Whether to prevent the character's display from swaying after overlapping with the target.**  
Execution speed will slightly decrease.  
  
● Disable horizontal movement  
Horizontal movement speed becomes 0.  
  
● Disable vertical movement  
Vertical movement speed becomes 0.  
  
● Do not change character direction  
When "Fixed Direction" is disabled, the character's direction is forcibly changed according to movement direction, but checking this prevents the character's direction from changing.  

---

"Time/Speed/Distance" Frame  
  
● Setting Type  
How to set movement time, movement speed, and movement distance.  
**・Specify time and speed ... Specify "Execution Time" and "Speed". Movement distance will be "Execution Time" × "Speed".  
・Specify time and distance ... Specify "Execution Time" and "Distance". Movement speed will be "Distance" ÷ "Execution Time".  
・Specify speed and distance ... Specify "Speed" and "Distance". Movement time will be "Distance" ÷ "Speed".  
****If speed is a negative value, movement direction will not be exactly opposite (+180 degrees), but will precisely move diagonally (same vertical and horizontal movement speed) away from the target.**  
  
● Execution Time (1/10s)  
The execution time of the command.  
  
● Speed  
Movement speed.  
"10" means about 60 dots per second.  
  
● Distance  
Movement distance.  
You can choose the unit for distance: "(hbl)" or "(dot)".  
*If "Setting Type" is "Speed and Distance", it will not move at the correct speed unless the result of "Distance (dot)" ÷ "Speed" is 0.10 or more (or -0.10 or less).  

---

"Inertia" Frame  
  
● Inertia  
Whether to apply inertia to movement.  
**When inertia is enabled, "Speed" is treated as acceleration.**  
**Homing movement (movement to target) and "Distance" do not consider inertia, so applying inertia will prevent accurate movement to the target and the movement distance will not be as set.**  
  
● Max Speed  
Maximum speed during inertial movement.  
**If multiple movement commands with "Inertia" enabled are executed simultaneously, the slowest maximum speed among those commands will be applied** (more precisely, that maximum speed + α, but I won't explain it in detail).  
  
● Speed correction on direction change  
When inertial movement speed is applied in the opposite direction of movement during command execution, this value corrects the speed.  
"1.0" means no speed correction.  
A higher value allows changing movement direction in a shorter time, making it easier to move.  

---

"Animation" Frame  
  
● Animation  
Changes animation.  
・Move Animation ... Becomes "Move" or "Flying Move" from the basic animation set.  
・Still Animation ... Becomes "Still" or "Flying" from the basic animation set.  
・Other ... If "None (do not change)", it continues the currently executing animation. You can also specify an "Animation" created in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  

[Back to top of page](#TOP)

<a name="MOVE_SCRIN"></a>

## Off-screen Avoidance Move

![](/menu_support/actioneditor4_help/commando/MoveScrin.jpg)  
  
**When the character is off-screen, it moves to try and enter the screen.**  
Walking characters have all vertical movement disabled.  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  

---

"Movement Direction" Frame  
  
● Direction  
Movement direction.  
**For example, if "Left", when the character is off-screen to the right, it moves left until it enters the screen. If already on-screen, it doesn't move.**  
If "Input Direction", the player's directional key input determines the movement direction.  
  
● Do not change character direction  
When "Fixed Direction" is disabled, the character's direction is forcibly changed according to movement direction, but checking this prevents the character's direction from changing.  

---

"Time/Speed/Distance" Frame  
  
● Setting Type  
How to set movement time, movement speed, and movement distance.  
**・Specify time and speed ... Specify "Execution Time" and "Speed". Movement distance will be "Execution Time" × "Speed".  
・Specify time and distance ... Specify "Execution Time" and "Distance". Movement speed will be "Distance" ÷ "Execution Time".  
・Specify speed and distance ... Specify "Speed" and "Distance". Movement time will be "Distance" ÷ "Speed".  
**  
● Execution Time (1/10s)  
The execution time of the command.  
  
● Speed  
Movement speed.  
"10" means about 60 dots per second.  
  
● Distance  
Movement distance.  
You can choose the unit for distance: "(hbl)" or "(dot)".  
*If "Setting Type" is "Speed and Distance", it will not move at the correct speed unless the result of "Distance (dot)" ÷ "Speed" is 0.10 or more (or -0.10 or less).  

---

"Inertia" Frame  
  
● Inertia  
Whether to apply inertia to movement.  
**When inertia is enabled, "Speed" is treated as acceleration.**  
**"Distance" does not consider inertia, so applying inertia will prevent the movement distance from being as set.**  
  
● Max Speed  
Maximum speed during inertial movement.  
**If multiple movement commands with "Inertia" enabled are executed simultaneously, the slowest maximum speed among those commands will be applied** (more precisely, that maximum speed + α, but I won't explain it in detail).  
  
● Speed correction on direction change  
When inertial movement speed is applied in the opposite direction of movement during command execution, this value corrects the speed.  
"1.0" means no speed correction.  
A higher value allows changing movement direction in a shorter time, making it easier to move.  

---

"Animation" Frame  
  
● Animation  
Changes animation.  
・Move Animation ... Becomes "Move" or "Flying Move" from the basic animation set.  
・Still Animation ... Becomes "Still" or "Flying" from the basic animation set.  
・Other ... If "None (do not change)", it continues the currently executing animation. You can also specify an "Animation" created in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  

[Back to top of page](#TOP)

<a name="MOVE_STOP"></a>

## Disable Movement

![](/menu_support/actioneditor4_help/commando/MoveStop.jpg)  
  
Sets the character's movement speed to 0.  
Not only movement commands, but also **gravity and impact are disabled.**  
When executing for a walking character, be aware that gravity is also disabled, so its feet will not be on the ground. (Even if it appears to be on a block, the program judges it as "not on a block.")  
  
The speed that is disabled is limited to the speed currently being applied at the time this command is executed.  
**Since the flow list is executed from top to bottom, for example, if there is a flow with a "Straight Move" command below a flow with a "Disable Movement" command, "Disable Movement" will be executed before "Straight Move", so the character will still perform the straight move.**  
To reliably disable all movement, it's best to set the "Disable Movement" command in the very last flow.  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  
  
● Execution Time (1/10s)  
The execution time of the command.  

[Back to top of page](#TOP)

<a name="CHANGEDIR"></a>

## Change Direction

![](/menu_support/actioneditor4_help/commando/ChangeDir.jpg)  
  
Changes the character's direction.  
  
● Direction  
The character's new direction.  
If "Face last block hit", if the character's left side last touched a block, it faces left; if its right side last touched a block, it faces right.  
  
● Animation  
Animation during command execution.  
Can be specified from "Animation" in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  
  
● Sound Effect  
Sound effect during command execution.  
Can be specified from "Sound Effect" in the database.  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  
  
● Execution Time (1/10s)  
The execution time of the command.  
Direction changes at an interval of 1 per 1/10s, so think of it as "how many consecutive direction changes to make".  

[Back to top of page](#TOP)

<a name="JUMP"></a>

## Jump

![](/menu_support/actioneditor4_help/commando/Jump.jpg)  
  
The character jumps.  
This command is only effective for walking characters.  
**Execution time varies depending on jump height, gravity, etc.** (Execution time is displayed as "?" in the command list.)  
Also, this command is always parallel execution ("P-?").  
  
● Jump Type  
Type of jump.  
・Height not adjustable by key ... Always jumps to "Max Jump" height.  
・Height adjustable by key (protagonist only) ... Jump height changes with key press duration. **"Key" here refers to the last key in the flow's "Key Condition" (the key set at the very bottom of the key condition list).**  
*The jump accepts jump key input from the start of the jump execution until it reaches "Max Jump" height (more precisely, just before reaching "Max Jump"). If the flow ends before the height reaches "Max Jump" (if the last command in the command list finishes), jump height can no longer be adjusted by the jump key thereafter.  
・Determine height by inertial movement speed (protagonist only) ... Jump height changes with the character's inertial movement speed at the start of command execution. In addition, **jump height also changes with key press duration.**  
  
● Max Jump  
The highest jump.  
  
● Min Jump  
The lowest jump.  
  
● Animation  
Animation during command execution.  
Can be specified from "Animation" in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  
  
● Sound Effect  
Sound effect during command execution.  
Can be specified from "Sound Effect" in the database.  

[Back to top of page](#TOP)

<a name="SHOT"></a>

## Shot

![](/menu_support/actioneditor4_help/commando/Shot.jpg)  
  
The character fires a shot.  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  
  
● Execution Time (1/10s)  
The execution time of the command.  
Fires at an interval of 1 per 1/10s, so think of it as "how many shots to fire consecutively".  

---

"Display" Frame  
● Graphic  
The graphic of the shot.  
Checking "Transparent" will make the graphic invisible during gameplay.  
  
● Z-coordinate  
The program draws objects in order from the smallest "Z-coordinate".  
In other words, a larger "Z-coordinate" means it will be displayed closer to the foreground.  
Note that if multiple objects have the same "Z-coordinate", their display order is not guaranteed.  

---

"Fire" Frame  
  
● Formation  
This setting determines the basic launch position and movement direction (movement speed) of the shot.  
> For details on formations, refer to ["Formation Settings"](../formation/). This also explains formation-specific settings.  
  
● Number of Shots  
The number of shots fired at once.  
  
● Number of Clones  
The number of shot clones.  
Setting this value to "1" or more allows firing multiple shots at the same position.  
Similar to character clones, **each shot is assigned a clone value according to the "number of clones".  
For example, if "Number of Clones" is "2", a total of 3 shots with clone values of "0", "1", and "2" will be fired.**  
  
● Direction  
The direction of firing.  
If "Input Direction", it fires in the direction corresponding to the player's directional key input.  
  
● Target  
The target of the shot for some formations.  
  
● Set angle by targeting target  
Whether to adjust the firing angle to hit the target.  
● Target  
The target of the shot.  
If "Target" is selected for "Target", or if "Set angle by targeting target" is checked, you further specify the target type here.  
This determines the launch position and launch angle.  
This is a separate item from "Target" for movement type.  
  
● Angle Offset  
Offset in firing angle.  
**Checking "Reverse rotation if user is right-facing" will invert the sign (+-) of the angle if the character is facing right.  
This prevents the shot's vertical movement from being reversed regardless of whether the character fires facing left or right.**  
  
● Dispersion Angle  
Variation in firing angle.  
The actual firing angle (when dispersion angle is set) will be base firing angle + ( - "Dispersion Angle" to + "Dispersion Angle" ← random number).  
  
● Change launch position based on angle  
Whether the shot's initial position changes based on the firing angle.  
  
● Launch Position Offset X (dot)  
● Launch Position Offset Y (dot)  
Offset of the shot's initial position.  
Checking "Invert if right-facing" will invert the sign (+-) of the offset if the character is facing right.  
  
● Animation  
Animation during command execution.  
Can be specified from "Animation" in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  
  
● Sound Effect  
Sound effect during command execution.  
Can be specified from "Sound Effect" in the database.  

---

"Performance" Frame  
  
● Faction  
Faction is information used to distinguish between allies and enemies.  
**Hit detection is not performed between characters or shots of the same faction. (They will not take damage or impact when they collide.)**  
  
● Scale  
How many times to enlarge the shot.  
  
● Movement Type  
The shot's movement type.  
**The movement direction immediately after firing is determined by the settings in the "Fire" frame (e.g., "Formation"). "Movement Type" refers to changes in movement direction (movement speed) after the shot has been fired.**  
Now, let's explain each movement type.  
  
○ Straight  
Moves straight.  
Movement direction is entirely governed by the settings in the "Fire" frame.  
  
○ Target Protagonist  
Moves straight towards the protagonist.  
"Trajectory Change (hbl)" can be set as a movement type-specific parameter.  
"Trajectory Change (hbl)" is the movement distance until the trajectory is corrected to move towards the protagonist.  
  
○ Target Closest Character  
Moves straight towards the closest character within the specified faction.  
Characters that are "Invincible (pass through shots)" are excluded.  
**If "Do not take damage off-screen" is enabled in Stage Settings, it prioritizes targeting enemies on-screen (even if an off-screen enemy is closer, it will head towards a farther on-screen enemy).**  
"Trajectory Change (hbl)" and "Target Faction" can be set as movement type-specific parameters.  
"Trajectory Change (hbl)" is the movement distance until the trajectory is corrected to move towards the closest character.  
"Target Faction" is the faction of the target candidates.  
  
○ Target Specific Target  
Moves straight towards the specified target.  
"Trajectory Change (hbl)" can be set as a movement type-specific parameter.  
"Trajectory Change (hbl)" is the movement distance until the trajectory is corrected to move towards the target.  
  
○ Guide to Protagonist  
Persistently tracks the protagonist.  
"Homing Start (hbl)" and "Homing End (hbl)" can be set as movement type-specific parameters.  
"Homing Start (hbl)" is the movement distance until the homing effect activates.  
"Homing End (hbl)" is the movement distance until the homing effect ends.  
  
○ Guide to Closest Character (If target dies, disable homing)  
Persistently tracks the closest character within the specified faction.  
Characters that are "Invincible (pass through shots)" are excluded.  
**If "Do not take damage off-screen" is enabled in Stage Settings, it prioritizes targeting enemies on-screen (even if an off-screen enemy is closer, it will head towards a farther on-screen enemy).**  
If the homing target dies, it becomes a simple straight-moving shot.  
"Homing Start (hbl)", "Homing End (hbl)", and "Target Faction" can be set as movement type-specific parameters.  
"Homing Start (hbl)" is the movement distance until the homing effect activates.  
"Homing End (hbl)" is the movement distance until the homing effect ends.  
"Target Faction" is the faction of the target candidates for this movement type.  
  
○ Guide to Target  
Persistently tracks the target.  
"Homing Start (hbl)" and "Homing End (hbl)" can be set as movement type-specific parameters.  
"Homing Start (hbl)" is the movement distance until the homing effect activates.  
"Homing End (hbl)" is the movement distance until the homing effect ends.  
  
○ Guide to Closest Character (If target dies, change target)  
Persistently tracks the closest character within the specified faction.  
Characters that are "Invincible (pass through shots)" are excluded.  
**If "Do not take damage off-screen" is enabled in Stage Settings, it prioritizes targeting enemies on-screen (even if an off-screen enemy is closer, it will head towards a farther on-screen enemy).**  
If the homing target dies, the target changes to the closest character at that moment.  
"Homing Start (hbl)", "Homing End (hbl)", and "Target Faction" can be set as movement type-specific parameters.  
"Homing Start (hbl)" is the movement distance until the homing effect activates.  
"Homing End (hbl)" is the movement distance until the homing effect ends.  
"Target Faction" is the faction of the target candidates.  
  
○ Wave  
Moves in a wave.  
**※There is a slight deviation between the upper and lower wave trajectories, and this deviation increases as "Hit Detection Level" in Stage Settings decreases (this refers to the "upper wave" and "lower wave" when firing a shot perfectly horizontally).**  
"Wave Max (hbl)", "Wave Speed", and "Start Angle" can be set as movement type-specific parameters.  
"Wave Max (hbl)" is the size of the wave.  
"Wave Speed" is the speed of the wave.  
**"Start Angle" is at what degree of a sine wave the wave starts. If firing a shot perfectly horizontally, "0" means the wave starts from the top, and "180" means it starts from the bottom.**  
○ Fall  
Falls under gravity, similar to walking characters.  
"Trajectory Change (hbl)" can be set as a movement type-specific parameter.  
"Trajectory Change (hbl)" is the movement distance until the falling effect activates.  
  
● Target  
The target for some movement types.  
This is a separate item from "Target" which determines the launch position and launch angle.  
  
● Sync with Auto-scroll (Recommended for homing movement type)  
Whether to add speed to the shot equal to the auto-scroll speed.  
**Syncing homing movement shots with auto-scroll makes the relative speed to the target symmetrical.**  
**For example, if the horizontal auto-scroll speed is 10, the relative speed to the target will be the same whether moving from left to right or from right to left with homing movement.**  
  
● Speed  
Movement speed.  
"10" means about 60 dots per second.  
  
● Acceleration  
Movement acceleration.  
If "Speed" is "0", acceleration is disabled.  
**Shot homing movement and "Flight Distance" do not consider "Acceleration", so adding acceleration will prevent accurate movement to the target and the flight distance will not be as set.**  
  
● Flight Distance (hbl)  
Flight distance.  
If "Do not disappear at end" is checked, the shot will stop after moving its flight distance and remain on the stage without disappearing.  
  
● Existence Time (1/10s)  
Existence time.  
  
● Disappear on Shot Hit  
Whether shots disappear when they hit each other.  
**If shots that disappear upon hitting each other collide, only the shot with the lower "Disappearance Value" will disappear. If "Disappearance Value" is the same, both will disappear.**  
● Pass Through Blocks  
Whether to pass through blocks.  
  
● Pass Through Characters  
Whether to pass through non-block characters.  
Character-piercing shots will not hit a character more than once.  
  
● Pass Through Block Characters  
Whether to pass through block characters.  
For characters that are "Invincible (pass through shots)", the shot will pass through regardless of whether this is checked.  
  
● Power  
How much damage to deal to an opponent when hitting a character of a different faction.  
Actual Damage = "Power" - Opponent's "Defense".  
**If the value is negative, the opponent recovers.**  
  
● Impact (hbl)  
How much to blow away an opponent when hitting a character of a different faction.  
Actual Impact = "Impact" - Opponent's "Impact Resistance".  
**The direction of blowback will be the same as the shot's movement direction. (If the value is negative, it will blow in the opposite direction of the shot's movement.)**  
**If the shot is stationary, it cannot blow away the opponent.**  
  
● Effect  
Effect to display when hitting a character of a different faction.  
Can be specified from "Effect" in the database.  
  
● Attack (Enable user's attack-related timings)  
Whether to treat the shot as an attack.  
**If an attack (a shot with attack enabled) hits a character, the attack user's (parent character's) attack-related timings will trigger (e.g., "When damage dealt by attack" timing).**  
"Valid Flow (ID)" allows limiting the flow to be executed by specifying an ID.  
  
● Acquired Item  
Item acquired by the protagonist when hitting a protagonist of a different faction.  
Can be specified from the item palette.  
**※Stage palette cannot be specified from common palette data.  
**

[Back to top of page](#TOP)

<a name="SWORD"></a>

## Sword

![](/menu_support/actioneditor4_help/commando/Sword.jpg)  
  
The character swings a sword.  
The sword's direction will always be the same as the character's direction.  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  
  
● Execution Time (1/10s)  
The execution time of the command.  
However, it cannot be set here.  
It is governed by the "Sword Type" settings.  

---

"Performance" Frame  
  
● Faction  
Faction is information used to distinguish between allies and enemies.  
**Hit detection is not performed between characters or shots of the same faction. (They will not take damage or impact when they collide.)**  
  
● Sword Type  
This determines graphics, execution time, hit detection range, etc.  
Can be specified from "Sword Type" in the database.  
> For details on sword types, refer to [Main Menu "Project" > "Database"](../menu_project_database/#SWORDTYPE).  
  
● Scale  
How many times to enlarge the sword.  
  
● Power  
How much damage to deal to an opponent when hitting a character of a different faction.  
Actual Damage = "Power" - Opponent's "Defense".  
**If the value is negative, the opponent recovers.**  
  
● Impact (hbl)  
How much to blow away an opponent when hitting a character of a different faction.  
Actual Impact = "Impact" - Opponent's "Impact Resistance".  
**The direction of blowback will be the same as the sword's direction (= user's direction). (If the value is negative, it will blow in the opposite direction.)**  
  
● Effect  
Effect to display when hitting a character of a different faction.  
Can be specified from "Effect" in the database.  
  
● Attack (Enable user's attack-related timings)  
Whether to treat the sword as an attack.  
**If an attack (a sword with attack enabled) hits a character, the attack user's (parent character's) attack-related timings will trigger (e.g., "When damage dealt by attack" timing).**  
"Valid Flow (ID)" allows limiting the flow to be executed by specifying an ID.  
  
● Acquired Item  
Item acquired by the protagonist when hitting a protagonist of a different faction.  
Can be specified from the item palette.  
**※Stage palette cannot be specified from common palette data.  
**

---

"Display" Frame  
  
● Transparent  
Checking this will make the sword's graphic invisible during gameplay.  
  
● Z-coordinate  
The program draws objects in order from the smallest "Z-coordinate".  
In other words, a larger "Z-coordinate" means it will be displayed closer to the foreground.  
Note that if multiple objects have the same "Z-coordinate", their display order is not guaranteed.  

---

"Other" Frame  
  
● Animation  
Animation during command execution.  
Can be specified from "Animation" in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  
  
● Sound Effect  
Sound effect during command execution.  
Can be specified from "Sound Effect" in the database.  

[Back to top of page](#TOP)

<a name="SUMMONBLOCK"></a>

## Block Summon

![](/menu_support/actioneditor4_help/commando/SummonBlock.jpg)  
  
The character summons or erases blocks.  
**However, if the summoned block's destination is of a type that "disables block summon", the block summon will fail.**  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  
  
● Execution Time (1/10s)  
The execution time of the command.  
Blocks are summoned at an interval of 1 per 1/10s, so think of it as "how many blocks to summon consecutively".  

---

"Summon Block" Frame  
  
● Summon Type  
Type of block summon.  
・Summon Block ... Summons a block. If a block already exists at the summon destination, it changes that block.  
・Erase Block ... Erases a block.  
・Summon if no block, erase if block exists ... Summons a block if no block exists at the summon destination. If a block already exists at the summon destination, it erases that block.  
  
**※If the block's summon destination is a square with a block whose appearance conditions are not yet met, the block will be overwritten by the summon, including its appearance conditions. Therefore, even if the appearance conditions are met after the summon, the block from before the summon will not appear.**  
  
● (Summon Block)  
The block data to summon.  
Can be specified from the block palette.  
**※Stage palette cannot be specified from common palette data.  
**  
● Fail if block-hitting protagonist exists at summon destination  
Whether block summon fails if a block-hitting protagonist exists at the summon destination.  
**Checking this often causes summons to fail when the protagonist summons blocks near themselves, which can be frustrating for players.**  
  
● Fail if block-hitting enemy exists at summon destination  
Whether block summon fails if a block-hitting enemy exists at the summon destination.  

---

"Summon Position" Frame  
  
● Formation  
This setting determines the basic appearance position of blocks.  
> For details on formations, refer to ["Formation Settings"](../formation/).  
  
● Number  
The number of blocks to summon at once.  
**Since block summon positions only change in block units (32x32), even if you set "Number" to "2" and try to summon, if the two blocks overlap, only one block will be summoned.**  
  
● Direction  
The direction of summoning.  
If "Input Direction", it summons in the direction corresponding to the player's directional key input.  
  
● Target  
The target for summoning in some formations.  
  
● Target  
If "Target" is selected for "Target", you further specify the target type here.  
  
● Summon Position Offset X (dot)  
● Summon Position Offset Y (dot)  
Offset of the summon position.  
**Since block summon positions only change in block units (32x32) and often don't appear where intended with just "Formation" and "Direction" settings, please make fine adjustments here.**  
Checking "Invert if user is right-facing" will invert the sign (+-) of the offset if the character is facing right.  

---

"Other" Frame  
  
● Animation  
Animation during command execution.  
Can be specified from "Animation" in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  
  
● Sound Effect  
Sound effect during command execution.  
Can be specified from "Sound Effect" in the database.  

---

● Assign return value to flow variable  
Whether to assign the command's execution result to a flow variable when the command ends.  
Flow variable A will contain the number of blocks added/removed in one summon.  
Note that the return value is assigned for each single summon (execution time 1). For example, if execution time is 2, it will not be the total number of blocks created by 2 summons, but the number of blocks created in the last summon.  
**If the summon destination is off-stage, the summon fails and is not counted in the summon count.**  

[Back to top of page](#TOP)

<a name="SUMMONCHARA"></a>

## Character Summon

![](/menu_support/actioneditor4_help/commando/SummonChara.jpg)  
  
The character summons another character.  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  
  
● Execution Time (1/10s)  
The execution time of the command.  
Characters are summoned at an interval of 1 per 1/10s, so think of it as "how many characters to summon consecutively".  

---

"Summon Character" Frame  
  
● (Summon Character)  
The character data to summon.  
Can be specified from the character palette.  
**※Common palette data cannot specify stage palette.**  
  
● Existence Time (1/10s)  
The time from when the character is summoned until it disappears.  
  
● Faction  
Faction is information used to distinguish between allies and enemies.  
**Hit detection is not performed between characters or shots of the same faction. (They will not take damage or impact when they collide.)**  
  
● Reverse Direction (Faces opposite of user)  
Whether to reverse the summoned character's direction from the user's direction.  
  
● Attack (Enable user's attack-related timings)  
Whether to treat the summoned character as an attack.  
**If an attack hits a character, the attack user's (parent character's) attack-related timings will trigger (e.g., "When damage dealt by attack" timing).**  
"Valid Flow (ID)" allows limiting the flow to be executed by specifying an ID.  
  
● Set acquired score to 0  
Whether to set the summoned character's "Score" to "0".  
Checking this prevents enemies that repeatedly summon characters from being exploited for endless score grinding.  

---

"Summon Position" Frame  
  
● Formation  
This setting determines the basic appearance position of characters.  
> For details on formations, refer to ["Formation Settings"](../formation/).  
  
● Number  
The number of characters to summon at once.  
  
● Direction  
The direction of summoning.  
If "Input Direction", it summons in the direction corresponding to the player's directional key input.  
  
● Target  
The target for summoning in some formations.  
  
● Target  
If "Target" is selected for "Target", you further specify the target type here.  
  
● Summon Position Offset X (dot)  
● Summon Position Offset Y (dot)  
Offset of the summon position.  
Checking "Invert if user is right-facing" will invert the sign (+-) of the offset if the character is facing right.  

---

"Other" Frame  
  
● Animation  
Animation during command execution.  
Can be specified from "Animation" in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  
  
● Sound Effect  
Sound effect during command execution.  
Can be specified from "Sound Effect" in the database.  

---

● Assign return value to flow variable  
Whether to assign the command's execution result to a flow variable when the command ends.  
Flow variable A will contain the number of characters summoned in one summon.  
Note that the return value is assigned for each single summon (execution time 1). For example, if execution time is 2, it will not be the total number of characters created by 2 summons, but the number of characters created in the last summon.  
**If the summon destination is off-stage, character summon will not fail and will be counted in the summon count (because characters may move from off-stage to on-stage after summoning, this is by design).**  

[Back to top of page](#TOP)

<a name="SUMMONITEM"></a>

## Item Summon

![](/menu_support/actioneditor4_help/commando/SummonItem.jpg)  
  
The character summons an item.  
  
● Parallel Execution  
Whether to execute this command in parallel with the next command.  
  
● Execution Time (1/10s)  
The execution time of the command.  
Items are summoned at an interval of 1 per 1/10s, so think of it as "how many items to summon consecutively".  

---

"Summon Item" Frame  
  
● (Summon Item)  
The item data to summon.  
Can be specified from the item palette.  
**※Stage palette cannot be specified from common palette data.  
**  
● Existence Time (1/10s)  
The time from when the item is summoned until it disappears.  
  

---

"Summon Position" Frame  
  
● Formation  
This setting determines the basic appearance position of items.  
> For details on formations, refer to ["Formation Settings"](../formation/).  
  
● Number  
The number of items to summon at once.  
  
● Direction  
The direction of summoning.  
If "Input Direction", it summons in the direction corresponding to the player's directional key input.  
  
● Target  
The target for summoning in some formations.  
  
● Target  
If "Target" is selected for "Target", you further specify the target type here.  
  
● Summon Position Offset X (dot)  
● Summon Position Offset Y (dot)  
Offset of the summon position.  
Checking "Invert if user is right-facing" will invert the sign (+-) of the offset if the character is facing right.  

---

"Other" Frame  
  
● Animation  
Animation during command execution.  
Can be specified from "Animation" in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  
  
● Sound Effect  
Sound effect during command execution.  
Can be specified from "Sound Effect" in the database.  

[Back to top of page](#TOP)

<a name="FLOW"></a>

## Flow Operation

![](/menu_support/actioneditor4_help/commando/Flow.jpg)  
  
Operates flows of itself or target.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● Execution Condition (Frame)  
Command execution conditions.  
If this condition is not met, the flow operation will not be performed.  
  
○ Condition Exists  
Whether to set a condition.  
  
○ Condition List  
Multiple conditions can be set.  
> For details on setting the condition list, refer to ["Appearance Condition List / Flow Basic Condition (Execution Condition) List Settings"](../cond/).  
  
○ Evaluation Type  
How the conditions are ultimately evaluated based on the basic condition list.  
"True" here means that the set condition has been met.  
  
● Operation  
Operation settings are configured in the format: "[Target Character] 's [Target Flow] [Operation Content]".  
  
○ Target Character  
Whose flow to operate.  
  
○ Target Flow  
・This Flow ... The flow currently being configured is targeted.  
・All Except This Flow ... All flows except the one currently being configured are targeted.  
・Specify by ID ... All flows matching the specified ID are targeted.  
  
○ Operation Content  
・Start ... Starts the flow. **Executes the command unconditionally, regardless of the flow's execution conditions.**  
・End ... Terminates the executing flow.  
・Pause ... Temporarily pauses the executing flow. It remains paused until "Resume" is issued. Also, **it has the effect of suppressing flow execution.** (Suppresses flow execution until "Resume" is issued).  
・Resume ... Resumes a "paused" flow.  
・Delete ... Deletes the flow, making it unexecutable. *  
・Permanent Stop ... Permanently stops the flow, making it unexecutable. *  
  
* "Delete" and "Permanent Stop" yield the same result but differ in execution speed.  
**The "Delete" process itself (at the moment of deletion) is slower than "Permanent Stop", but it becomes slightly faster in the long term and memory is freed immediately.**  
**However, there's no need to overthink it.**  
**Usually, "Delete" is sufficient. If the frame rate (FPS) becomes unstable due to many characters using "Delete", then try "Permanent Stop".**  
  
● Assign return value to flow variable  
Whether to assign the command's execution result to a flow variable when the command ends.  
Flow variable A will contain 1 if the operation succeeded, 2 if it failed.  
Cases of operation failure include when the execution condition is not met.  

[Back to top of page](#TOP)

<a name="CHANGEFLOW"></a>

## Change Flow

![](/menu_support/actioneditor4_help/commando/ChangeFlow.jpg)  
  
Changes the flow of the item acquiring character (= protagonist).  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● Operation  
・Add ... Adds the flow set in "Flow Settings".  
・Change ... Deletes all flows matching the ID specified in "Delete ID", then inserts the flow set in "Flow Settings" **at the position of the topmost deleted flow in the flow list**.  
・Delete ... Deletes all flows matching the ID specified in "Delete ID", making them unexecutable.  

[Back to top of page](#TOP)

<a name="CLEAR"></a>

## Stage Clear

![](/menu_support/actioneditor4_help/commando/Clear.jpg)  
  
Clears the stage.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● Stage Transition  
Specifies the next stage to play.  
・To Next Stage ... Transitions to the next stage number. **If the next stage number does not exist, it becomes a world clear. ※**  
・Specify by Number ... Transitions to the stage specified by "Number". **If the specified stage number does not exist, it becomes a world clear. ※**  
・Specify by Path ... Transitions to an arbitrary stage. You can select the stage file by pressing the "Browse" button. Note that the stage number of the stage specified by "path" is treated as the same as the previous stage and does not change.  
・World Clear ... Clears the world. After world clear, returns to the world map or stage select.  
  
*When composing a world with multiple stages, append "-S" (S...stage number) to the end of the stage filename.  
Also, specify the stage with stage number 1 as the "Start Stage" on the world map.  
Example: "stage-1.stg4_*", "stage-2.stg4_*", "stage-3.stg4_*" ...... **※Must start with "stage-1.stg4_*"**  
Otherwise, "To Next Stage", "Specify by Number", and "Specify by Path" will all fail.  
However, the filename for the stage specified by "path" is flexible.  
In return, when specifying by "path", the stage number remains unchanged from the current number (it does not become the number after "-" in the stage file name), so caution is required when the destination stage uses "To next stage" (to the next stage number). If this explanation is unclear, or if you prefer simplicity, either use only "To next stage" and "Specify by number", or only "Specify by path".  
  
**※The program memorizes the starting stage's filename for a world and retains it until the world is cleared.**  
**If the starting stage's filename is "A-1.stg4_***" (*** is the version), then that world is treated as "A" until the world is cleared.**  
For example, if you start a world from stage "A-1" but then use "Specify by Number" to jump to stage "Z"'s number 2, this is not possible. If you started from stage "A-1", specifying number 2 with "Specify by Number" will transition to "A-2".  
"A-2" not "Z-2".  
  
● Forcibly change initial position of next stage  
Whether to forcibly change the protagonist's initial position and direction in the next stage within the same world.  
Specify by stage coordinates "X(bl)" and "Y(bl)". Protagonist's direction can also be changed.  
  
● Warp on World Map  
Whether to change the protagonist's position on the world map when the world is cleared.  
Specify by world map coordinates "X" and "Y".  
**By warping to coordinates where a world exists, you can force the player to continue playing that world.**  
  
● Execute auto-save before next stage starts  
If there are subsequent stages, whether to perform auto-save.  
Checking this allows saving mid-world in worlds composed of multiple stages.  
"Auto-save ON" must be set in the Story Mode World Map menu.  
*When resuming mid-world (playing from the 2nd stage onwards) via "Continue", if the stage file for the resuming stage has been deleted or its filename changed, stage loading will fail, not only making further world progression impossible but also preventing return to the world map. Especially **when updating a work already published online, be careful not to delete stage files from the 2nd stage onwards or change their filenames.**  
  
● Append "_CLEAR_" to filename on replay auto-save  
Whether to append "_CLEAR_" to the end of the filename for replay auto-saves.  
Replay files with "_CLEAR_" attached will be played when "Replay Playback Order" in option mode is set to "Sort Order & Stage Clear Only".  
Usually, ON should be fine.  
**Its use case would be, for example, if you set the "Stage Clear" command to "When died" flow timing, and "you want to record high scores etc. even on death, but don't want it treated as a stage clear."** In this case, by not appending "_CLEAR_" during replay auto-save, it can be saved as a replay file that hasn't cleared the stage.  

[Back to top of page](#TOP)

<a name="GAMEWAIT"></a>

## Game Wait

![](/menu_support/actioneditor4_help/commando/GameWait.jpg)  
  
Pauses the entire game.  
During game wait, player key input (including pause) is also not accepted.  
  
● Execution Time (1/10s)  
The execution time of the command.  

[Back to top of page](#TOP)

<a name="MESSAGE"></a>

## Message

![](/menu_support/actioneditor4_help/commando/Message.jpg)  
  
Displays text.  
  
● Display common variables with #C1~999., stage variables with #S1~999., character variables with #v1~8, and flow variables with #f1~2.  
Whether to replace "#C1~999.", "#S1~999.", "#v1~8.", "#f1~2." (**← all half-width**) with variable values and display them.  
"C" represents common variables, "S" represents stage variables, "v" represents character variables, and "f" represents flow variables. The numbers "1~999" after them are the variable numbers.  
**Flow variables are specified by variable number, not by alphabet. For example, "#f1." displays the value of flow variable A.**  
You can append "_" (underscore) after the variable number, followed by "Max Digits", "z", or "p" options.  
It's a bit complex, so please refer to the examples in the editor while working on it.  
The final "." (half-width period) is not strictly necessary for display, but please include it just in case.  
  
● Auto Update (Responds to variable changes)  
Whether to immediately update the display when the value of a variable displayed in a message changes.  
Only supports common variables and stage variables. **If you enable this setting for a message displaying character variables or flow variables, the character variable and flow variable display parts will become "?".**  
**Enabling this will make it slightly heavier, but it will be much lighter than constantly executing and updating the message command.**  
**As long as the variable's value doesn't change, the drawing content is not updated, so the less frequently the variable changes, the lighter it becomes. If the number of digits in the variable changes, causing the entire message width to change, it will be heavy (at that moment).**  
  
● Update Interval (1/60s)  
The interval for checking updates when "Auto Update" is enabled.  
For example, setting it to "1" checks for updates every frame. Setting it to "6" checks for updates 10 times per second.  
As long as the variable's value in the message doesn't change, the drawing content is not updated, so "1" often doesn't cause much load. However, **if the variable's value changes frequently, increasing the update interval will make it lighter.**  
  
● Variables (Reference, for renaming) (Frame)  
You can check variable names or change them here.  
This has no effect on the game.  
  
● Set choices with #R*.  
Whether to use the choice function by placing one or more "#R*." (**← all half-width**) in the message text.  
The "*" part will be the numerical return value when the player selects that choice, allowing you to branch processing based on the choice.  
In the game, a cursor for selecting choices will be displayed in the space of "#R*.", but since the cursor moves with the ↑ and ↓ keys, vertical arrangement of "#R*." is recommended.  
You can also change the default cursor position by appending "_" (underscore) after "*" and then adding "D", "C1~999", "S1~999", "v1~8", "f1~2" options.  
**Flow variables are specified by variable number, not by alphabet. For example, "f1" specifies flow variable A.**  
It's a bit complex, so please refer to the examples in the editor while working on it.  
The final "." (half-width period) is not strictly necessary, but please include it just in case.  
  
● Display Window  
Whether to display the message window.  
  
● Clear Message (Clear fails if Message ID is not set)  
Clears the message with the specified Message ID.  
Unlike picture clearing, if the ID is not set, clearing fails.  
  
● Message ID ☆Replace with message of same ID  
Setting a Message ID here allows you to replace or clear messages at any time.  
When executing the message command, the program first searches for and clears the message with the specified Message ID from the stage, and then displays the newly set message.  
  
● Display Position  
The display position of the message.  
Set in the format: "[Display Position Type] [Unit]".  
The types of [Display Position Type] are as follows:  
・Specify by screen coordinates (specify top-left) ... Specify by screen coordinates. The top-left of the game screen is (0,0), and you specify the top-left coordinate of the message.  
・Specify by screen coordinates (specify center) ... Specify by screen coordinates. The top-left of the game screen is (0,0), and you specify the center coordinate of the message.  
・Specify by stage coordinates (specify top-left) ... Specify by stage coordinates. The top-left of the stage is (0,0), and you specify the top-left coordinate of the message.  
・Specify by stage coordinates (specify center) ... Specify by stage coordinates. The top-left of the stage is (0,0), and you specify the center coordinate of the message.  
(Explanations for other selection items are omitted)  
  
● Coordinate X (bl)  
● Coordinate Y (bl)  
Coordinates when "Display Position" is "Specify by Screen Coordinates" or "Specify by Stage Coordinates".  
● Display Position Offset X (dot)  
● Display Position Offset Y (dot)  
Offset of the message's display position.  
  
● Auto-adjust to stay within screen  
Whether to adjust and display the message, specified by "Display Position", to just barely stay within the screen if it overflows.  
  
● Follow screen (position does not change with scrolling)  
When displaying messages that do not pause the game, whether the message follows the screen (whether the message's display position changes with stage scrolling).  
  
● Display Time  
The display time of the message.  
Display until advance key is pressed ... Displays until the message advance key (usually Z key) is pressed. The entire game pauses until the message advance key is pressed.  
Display until stage ends ... Displays until the stage ends.  
Specify by time ... Displays until "Time" elapses.  
  
● Time (1/10s)  
Message display time when "Display Time" is "Specify by Time".  
Checking "Instant Display (1/60s)" displays it for only 1/60th of a second.  
  
● Pause  
When "Display Time" is "Specify by Time", whether the entire game pauses during message display.  
  
● Assign return value to flow variable  
Whether to assign the command's execution result to a flow variable when the command ends.  
Flow variable A will contain a value according to the "Set choices with #R*." setting.  

[Back to top of page](#TOP)

<a name="WARP"></a>

## Warp

![](/menu_support/actioneditor4_help/commando/Warp.jpg)  
  
The character instantly moves.  
If the warp target character is a block-hitting type, the command will fail if there is a block at the warp destination.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● Setting Type  
・Specify by direction and distance ... Specify by "Direction" and "Distance" from the character's position at command execution.  
・Specify by direction and distance from target (1~4) ... Specify by "Direction" and "Distance" from the target's (1~4) position at command execution.  
・Specify by target coordinates ... Specify by "Target" coordinates.  
  
● Direction  
The direction to warp.  
If "Input Direction", it warps in the direction corresponding to the player's directional key input.  
  
● Distance (hbl)  
Warp distance.  
  
● Target Type  
The type of coordinates for the warp target.  
Set in the format: "[Coordinate Type] [Unit]".  
The types of [Coordinate Type] are as follows:  
・Relative coordinates ... Relative coordinates where the character's center at command execution is (0,0).  
・Absolute coordinates ... Stage coordinates. The top-left of the stage is (0,0).  
・Screen coordinates ... The top-left of the game screen is (0,0).  
  
● Giant character coordinate position  
This setting is only valid when the coordinate type is "Absolute Coordinates" or "Screen Coordinates".  
When the warp target character is a giant character, which position of the character's coordinates to specify.  
・Character's center ... The center of the warp target character becomes the specified coordinate.  
・Character's mid-bottom ... The mid-bottom of the warp target character becomes the specified coordinate. **If specifying coordinates in (bl) units, it will be the same as the initial position when placing the character at that coordinate in stage edit**, which might be more convenient than "Character's center".  
・Mid-bottom for walking, center for flying ... If the warp target character's flight is OFF, it's "Character's mid-bottom"; if flight is ON, it's "Character's center". This is **the same behavior as versions 8.90 and earlier**, when the "Giant character coordinate position" setting item itself did not exist.  
Note that if the warp target character is not a giant character, it will be the character's center regardless of this setting.  
  
● Target X (bl)  
● Target Y (bl)  
The target coordinates for warping.  
Either X or Y can be disabled, or offset by dot units.  
When "Target Type" is "Relative Coordinates" and "Invert if right-facing" is checked, the sign (+-) of the target coordinates is inverted if the character is facing right.  
  
● Assign return value to flow variable  
Whether to assign the command's execution result to a flow variable when the command ends.  
Flow variable A will contain 1 if the warp succeeded, 2 if it failed.  
Cases of warp failure include being crushed by a block at the warp destination, and the target being invalid.  

[Back to top of page](#TOP)

<a name="TARGET"></a>

## Set Target

![](/menu_support/actioneditor4_help/commando/Target.jpg)  
  
Changes your target.  
Target refers to the destination in some movement commands, and the object of shots, etc.  
"Charge Move," "Shot," "Status Manipulation" commands, etc., utilize targets.  
By the way, **by default, "Target 1" is set to the protagonist, and "Target 2" to "Target 4" are set to empty (not pointing to anyone).**  
**※If a target is empty or has disappeared from the stage due to death, commands using that target will fail, and conditions using that target will always be false.**  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● Basic Settings  
Basic settings are made in the format: "Set [Target to Change] to [Target]".  
  
○ Target to Change  
The target to change with this command.  
  
○ Target  
The target to set.  
・Protagonist ... Sets the protagonist as the target.  
・Self ... Sets yourself as the target.  
・Closest Character ... Sets the closest character within the specified faction as the target.  
・Character (Specify by Character ID) ... Specifies faction, character ID, etc., to target a character that meets the conditions.  
・Parent Character (Character that summoned self) ... Sets the parent character as the target. Fails if no parent character exists (not summoned by anyone or parent character has died).  
・Child Character (Last summoned character) ... Sets the last summoned character as the target.  
・Child Character (Conditional. Prioritizes later summoned character) ... Sets the character that was summoned most recently among the child characters that meet the subsequent conditions.  
・Target (1~4) ... Swaps your own targets.  
  
● Target Range  
When "Target" is "Closest Character", what range to consider for target candidates.  
  
● Target Faction  
The faction to consider for target candidates.  
  
● Target Character ID  
The character ID to consider for target candidates.  
  
● Character Variable Condition  
Determines target candidates based on character variable values.  
The setting method is the same as for appearance conditions and flow basic conditions.  
**"Is a multiple of" includes 0 and negative values.**  
**For example, "Common Variable is a multiple of 2" will be true for 0 or -2.**  
  
● Exclude Self  
Whether to exclude yourself from target candidates.  
  
● Exclude Invincible (shots hit) characters  
Whether to exclude "Invincible (shots hit)" characters from target candidates.  
  
● Exclude Invincible (shots pass through) characters  
Whether to exclude "Invincible (shots pass through)" characters from target candidates.  
  
● Exclude block characters  
Whether to exclude block characters from target candidates.  
  
● If no one matches  
Action if no target candidates are found during this command's execution.  
If "No Target", commands using the target will fail, and conditions using the target will always be false.  
If "Do not change target", the target remains as is (state just before executing this command).  
  
● Assign return value to flow variable  
Whether to assign the command's execution result to a flow variable when the command ends.  
Flow variable A will contain 1 if the target exists, 2 if it does not.  
Flow variable B will contain 1 if the target changed, 2 if it remained the same.  
**If the target changes from none to existing, or existing to none, due to this command's execution, it is still considered a target change, and the return value will be 1.**  

[Back to top of page](#TOP)

<a name="STATUS"></a>

## Status Manipulation

![](/menu_support/actioneditor4_help/commando/Status.jpg)  
  
Manipulates numerical type statuses of characters or the system.  
The operation content is set with a simple formula.  
The left side of the operator in the center of the window will be referred to as the left operand, and the right side as the right operand.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● (Left Operand)  
Target of operation.  
"Ease of stopping" is correctly "Ease of stopping during inertial movement".  
**If "Remaining Lives" of "System" is specified, this command will always fail if lives are ∞ (infinite) (infinite lives cannot be changed). Even if lives are not set to ∞, be aware that lives automatically become ∞ during single-stage test play.**  
**"X-coordinate" and "Y-coordinate" instantly move the character's position, but internally the "Warp" command is actually called. Therefore, specifications such as the command failing if a block is at the destination for a block-hitting character are the same as warp.**  
  
● Operator  
Calculation method.  
**・"=" ... Assigns the right operand to the left operand.**  
**・"+" ... Adds the right operand to the left operand.**  
**・"-" ... Subtracts the right operand from the left operand.**  
**・"×" ... Multiplies the left operand by the right operand.**  
**・"÷" ... Divides the left operand by the right operand.**  
**・"÷ X Remainder" ... Divides the left operand by the right operand and takes the remainder.**  
**・"X %" ... Calculates the right operand as a percentage of the left operand. For example, if the right operand is "50 (%)", the left operand (result) becomes half of its original value.**  
  
● (Right Operand)  
Calculated value.  
In addition to constants and random numbers, you can also specify statuses similar to the left operand.  
**If "Remaining Lives" of "System" is specified, infinite lives (∞) are calculated as 100. Even if lives are not set to ∞, be aware that lives automatically become ∞ during single-stage test play.**  
  
● Display bar above character's head  
When manipulating "HP" or "SP", whether to display a bar above the character's head.  
  
● Invalid if target character is invincible  
Whether to invalidate this command if the target character is invincible.  
  
● Specify as percentage  
Whether to calculate the right operand as a percentage of the left operand.  
For example, if you execute "Character Variable - 20(%)" on a character variable with a value of 10, 20% of the character variable, which is 2, will be subtracted, and the result will be 8.  
  
● (Calculation Type)  
Settings only valid when the left operand is "HP" or "SP".  
This setting changes how the right operand is handled.  
・Normal Calculation ... Specifies the right operand as a value (not a percentage).  
・Specify as % of max value ... Specifies as a percentage where the target character's max HP is 100 (%).  
・Specify as % of current value ... Specifies as a percentage where the target character's current HP is 100 (%).  
  
● Coordinate Type  
This setting is only effective when each operand is "X-coordinate" or "Y-coordinate."  
This setting changes the origin (0,0).  
・Relative coordinates ... Relative coordinates where your position (the character executing the command) is (0,0).  
・Absolute coordinates ... Stage coordinates. The top-left of the stage is (0,0).  
・Screen coordinates ... The top-left of the game screen is (0,0).  
All coordinate types are in dot units, not block units (bl). (By the way, 1 bl is 32 dots).  
  
● Giant character coordinate position  
This setting is only valid when the coordinate type is "Absolute Coordinates" or "Screen Coordinates".  
When the target character is a giant character, which position of the character's coordinates to specify.  
・Character's center ... The center of the target character becomes the specified coordinate.  
・Character's mid-bottom ... The mid-bottom of the target character becomes the specified coordinate. **If specifying coordinates in (bl) units, it will be the same as the initial position when placing the character at that coordinate in stage edit**, which might be more convenient than "Character's center".  
・Mid-bottom for walking, center for flying ... If the target character's flight is OFF, it's "Character's mid-bottom"; if flight is ON, it's "Character's center". This is **the same behavior as versions 8.90 and earlier**, when the "Giant character coordinate position" setting item itself did not exist.  
Note that if the target character is not a giant character, it will be the character's center regardless of this setting.  
  
● Assign return value to flow variable  
Whether to assign the command's execution result to a flow variable when the command ends.  
Flow variable A will contain 1 if the operation succeeded, 2 if it failed.  
Cases of operation failure include an invalid target, incorrect command settings (e.g., performing an operation on an enemy character that only applies to player characters), or attempting to change character coordinates but a block is present at the destination causing crushing.  
Flow variable B will contain the amount of value change.  
For example, if a certain variable was 3 before the operation and became 5 after, (+)2 will be entered into Flow Variable B.  
**Flow Variable B will contain the correct value only if the operation succeeded.**  

[Back to top of page](#TOP)

<a name="STATUS_2"></a>

## Status Manipulation 2

![](/menu_support/actioneditor4_help/commando/Status2.jpg)  
  
Manipulates non-numerical type statuses of characters or the system.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
Set in the format: "[Target Character (System)] 's [Target Status] to [Result]".  
  
Setting "Disappearance" of [Target Status] to "ON" will make the character disappear.  
For enemies, performing "Disappearance" will not yield score or items possessed by the enemy, unlike death.  
  
Operating "Flight" of [Target Status] is only effective for the protagonist.  
There are "Position Memory" and "Crush Avoidance" checkboxes as options for "Flight" state toggle.  
Checking "Crush Avoidance" will revert the character's position to the memorized position if there's a possibility of being crushed.  
Position memory and crush avoidance are safe to use when you want to temporarily (for a short time) make a walking character fly. Especially if you switch from flight OFF to flight ON (colliding with blocks), the hit detection range against blocks becomes smaller, and if the character is then crushed by a block when switching back to flight OFF, this function can prevent it.  
Example: For a character with flight OFF → Flight ON (Position Memory ON) → Flight Movement → Flight OFF (Crush Avoidance ON)  
*However, while it prevents crushing reliably, the character's position will revert even with a slight possibility of crushing.  
  
Especially when scaling up characters, the difference in hit detection range against blocks between flight ON (colliding with blocks) and flight OFF becomes larger, making crushing more likely in unexpected situations. So, this function might be useful.  
It can be safely executed not only when switching from walking to flying, but also from "Flying (collides with blocks)" → "Flying (passes through blocks)" → "Flying (collides with blocks)", etc.  
  
● Assign return value to flow variable  
Whether to assign the command's execution result to a flow variable when the command ends.  
Flow variable A will contain 1 if the operation succeeded, 2 if it failed.  
Cases of operation failure include an invalid target or incorrect command settings (e.g., performing an operation on an enemy character that only applies to player characters).  

[Back to top of page](#TOP)

<a name="VANISH"></a>

## Disappearance

![](/menu_support/actioneditor4_help/commando/Vanish.jpg)  
  
Makes all characters or shots of the specified faction disappear.  
Very effective for clearing bullets in STGs (bomb effect), etc.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● Target  
Target for disappearance.  
"Child and subordinate characters" means that not only child characters (characters you summoned) but also grandchild characters (characters summoned by child characters) and below will disappear. However, **the program traces from parent to child, and child to grandchild, to find child and subordinate characters. Therefore, if a child has already died or disappeared, the disappearance process will not extend to grandchildren.**  
"Child and subordinate characters and grandchild and subordinate shots" makes all shots disappear except those you fired yourself.  
  
● Target Range  
The range for target disappearance.  
  
● Target Faction  
The faction to target for disappearance.  
  
● Assign return value to flow variable  
Whether to assign the command's execution result to a flow variable when the command ends.  
Flow variable A will contain the number of characters disappeared.  
Flow variable B will contain the number of shots disappeared.  

[Back to top of page](#TOP)

<a name="GETITEM"></a>

## Acquire Item

![](/menu_support/actioneditor4_help/commando/GetItem.jpg)  
  
The protagonist acquires an item.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● Acquired Item  
The item the protagonist acquires.  
Can be specified from the item palette.  
**※Stage palette cannot be specified from common palette data.  
**※Immediately after acquiring an item containing the "Change Flow" command with this command, the "Flow Operation" command cannot be executed on the flow added by that item! (You can operate it without problem after 1/10s.)**  

[Back to top of page](#TOP)

<a name="GRAPHIC"></a>

## Change Graphic

![](/menu_support/actioneditor4_help/commando/Graphic.jpg)  
  
Changes the character's graphic.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● Graphic  
The character's new graphic.  

[Back to top of page](#TOP)

<a name="ANIMSET_COMMAND"></a>

## Change Basic Animation Set

![](/menu_support/actioneditor4_help/commando/AnimSet.jpg)  
  
Changes the character's basic animation set.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● Animation Set  
The character's new basic animation set.  
Can be specified from "Basic Animation Set" in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  

[Back to top of page](#TOP)

<a name="ANIM_COMMAND"></a>

## Execute Animation

![](/menu_support/actioneditor4_help/commando/Anim.jpg)  
  
Executes a character's animation.  
**Animations executed with this command, of course, have higher priority than basic animation set animations, but lower priority than animations set by commands other than "Execute Animation" (e.g., "Shot").  
For example, if "Execute Animation" and "Shot" commands are performed simultaneously, the actual animation will be the one set for "Shot".**  
**This command is a parallel execution type with an execution time of 0 ("P-0(*)").**  
  
● Animation  
The animation to execute.  
Can be specified from "Animation" in the database.  
> For details on animation, refer to ["Character Animation"](../animation/).  
  
● End this animation  
Whether to end the animation specified in "Animation" without executing it.  

[Back to top of page](#TOP)

<a name="EFFECT_COMMAND"></a>

## Execute Effect

![](/menu_support/actioneditor4_help/commando/Effect.jpg)  
  
Executes an effect.  
This command is a parallel execution type with an execution time of 0 ("P-0(*)").  
  
● Effect  
The effect to execute.  
Can be specified from "Effect" in the database.  
  
● Display Position  
The display position of the effect.  
Set in the format: "[Display Position Type] [Unit]".  
The types of [Display Position Type] are as follows:  
・Specify by screen coordinates (specify top-left) ... Specify by screen coordinates. The top-left of the game screen is (0,0), and you specify the top-left coordinate of the effect.  
・Specify by screen coordinates (specify center) ... Specify by screen coordinates. The top-left of the game screen is (0,0), and you specify the center coordinate of the effect.  
・Specify by stage coordinates (specify top-left) ... Specify by stage coordinates. The top-left of the stage is (0,0), and you specify the top-left coordinate of the effect.  
・Specify by stage coordinates (specify center) ... Specify by stage coordinates. The top-left of the stage is (0,0), and you specify the center coordinate of the effect.  
(Explanations for other selection items are omitted)  
  
● Coordinate X (bl)  
● Coordinate Y (bl)  
Coordinates when "Display Position" is "Specify by Screen Coordinates" or "Specify by Stage Coordinates".  
  
● Display Position Offset X (dot)  
● Display Position Offset Y (dot)    
Offset of the effect's display position.  
  
● Scale (%)  
The scale of the effect.  
**If set to anything other than "100" (%), the image will be rough and execution speed will decrease.**  
  
● Display in front of character  
Whether to display in front of characters, items, shots, etc.  
  
● Pause  
Whether to pause the entire game until the effect ends.  

[Back to top of page](#TOP)

<a name="CHARAEFFECT_COMMAND"></a>

## Execute Character Effect

![](/menu_support/actioneditor4_help/commando/CharaEffect.jpg)  
  
Executes a character effect on itself.  
Multiple character effects cannot be executed simultaneously on one character.  
This command is a parallel execution type with an execution time of 0 ("P-0(*)").  
  
● Character Effect  
The character effect to execute.  
Can be specified from "Character Effect" in the database.  
  
● Execution Type  
How the character effect is executed.  
・Normal Execution ... Executes as set in database "Character Effect".  
**・Reverse Execution ... Executes the character effect in reverse.**  
**・Loop Execution ... Performs "Normal Execution" followed by "Reverse Execution".**  
  
● Loop Execution  
Whether to repeat the character effect execution.  

[Back to top of page](#TOP)

<a name="SCREFFECT_COMMAND"></a>

## Execute Screen Effect

![](/menu_support/actioneditor4_help/commando/ScrEffect.jpg)  
  
Executes a screen effect.  
Multiple screen effects cannot be executed simultaneously.  
This command is a parallel execution type with an execution time of 0 ("P-0(*)").  
  
● Screen Effect  
The screen effect to execute.  
Can be specified from "Screen Effect" in the database.  
  
● Execution Type  
How the screen effect is executed.  
・Normal Execution ... Executes as set in database "Screen Effect".  
**・Reverse Execution ... Executes the screen effect in reverse.**  
**・Loop Execution ... Performs "Normal Execution" followed by "Reverse Execution".**  
  
● Loop Execution  
Whether to repeat the screen effect execution.  

[Back to top of page](#TOP)

<a name="PICTURE_COMMAND"></a>

## Display Picture

![](/menu_support/actioneditor4_help/commando/Picture.jpg)  
  
Displays a picture.  
This command is a parallel execution type with an execution time of 0 ("P-0(*)").  
  
● Picture  
The picture to display.  
Can be specified from "Picture" in the database.  
You can also clear any picture with a specified Picture ID using "Clear Picture (clears all if ID not set)".  
  
● Picture ID ☆Replace with picture of same ID  
Setting a Picture ID here allows you to replace or clear pictures at any time.  
When executing the "Display Picture" command, the program first searches for and clears the picture with the specified Picture ID from the stage, and then displays the newly set picture.  
  
● Display Position  
The display position of the picture.  
Set in the format: "[Display Position Type] [Unit]".  
The types of [Display Position Type] are as follows:  
・Specify by screen coordinates (specify top-left) ... Specify by screen coordinates. The top-left of the game screen is (0,0), and you specify the top-left coordinate of the picture.  
・Specify by screen coordinates (specify center) ... Specify by screen coordinates. The top-left of the game screen is (0,0), and you specify the center coordinate of the picture.  
・Specify by stage coordinates (specify top-left) ... Specify by stage coordinates. The top-left of the stage is (0,0), and you specify the top-left coordinate of the picture.  
・Specify by stage coordinates (specify center) ... Specify by stage coordinates. The top-left of the stage is (0,0), and you specify the center coordinate of the picture.  
(Explanations for other selection items are omitted)  
  
● Coordinate X (bl)  
● Coordinate Y (bl)  
Coordinates when "Display Position" is "Specify by Screen Coordinates" or "Specify by Stage Coordinates".  
  
● Display Position Offset X (dot)  
● Display Position Offset Y (dot)  
Offset of the picture's display position.  
  
● Scale (%)  
The scale of the picture.  
**If set to anything other than "100" (%), the image will be rough and execution speed will decrease.**  
  
● Vertical Scale (%)  
If this item is checked, "Scale (%)" becomes the horizontal scale, and "Vertical Scale (%)" becomes the vertical scale.  
  
● Horizontal Flip  
● Vertical Flip  
Whether to display the picture horizontally or vertically flipped.  
Only effective when Direct3D is used.  
  
● Follow screen (position does not change with scrolling)  
When displaying pictures that do not pause the game, whether the picture follows the screen (whether the picture's display position changes with stage scrolling).  
  
● Display in front of character  
Whether to display in front of characters, items, shots, etc.  
  
● Display Time  
The display time of the picture.  
Display until advance key is pressed ... Displays until the message advance key (usually Z key) is pressed. The entire game pauses until the message advance key is pressed.  
Display until stage ends ... Displays until the stage ends.  
Specify by time ... Displays until "Time" elapses.  
  
● Time (1/10s)  
Picture display time when "Display Time" is "Specify by Time".  
Checking "Instant Display (1/60s)" displays it for only 1/60th of a second.  
  
● Pause  
When "Display Time" is "Specify by Time", whether the entire game pauses during picture display.  

[Back to top of page](#TOP)

<a name="SCRCOLOR_COMMAND"></a>

## Change Screen Color

![](/menu_support/actioneditor4_help/commando/ScrColor.jpg)  
  
Changes the screen's hue by compositing it with an arbitrary color.  
In DirectDraw mode, it only changes the color palette, so it has no effect unless the screen is 256 colors (8-bit). (Even if bitmaps are 256 colors, this command is disabled if the screen color depth in "System.ini" is not 256 colors.)  
In Direct3D mode, colors can be changed even with 16-bit or 32-bit screens. **In versions 5.96 and earlier, changing screen color drastically slowed down screen effect execution, but this was improved in version 6.06.**  
This command is a parallel execution type with an execution time of 0 ("P-0(*)").  
  
● R  
● G  
● B  
Colors to composite with the screen.  
Specify in RGB values (R=Red, G=Green, B=Blue).  
  
● %  
Composition ratio.  
If "100" (%), the screen will be dyed with the color specified by "R", "G", "B".  
**This command composites even text and cursor colors, so the higher the composition ratio, the harder text and cursors will be to see.**  
  
● Revert to original color  
Checking this allows reverting the screen color changed by this command to its original screen color.  
  
● Time required for change (1/10s)  
Time required to change screen color.  
**The longer this time, the slower the color changes.**  
  
● Instant Display  
Whether to make screen color change time instantaneous.  
"Instant Display Count" is the number of times to display instantly.  

[Back to top of page](#TOP)

<a name="BACK_COMMAND"></a>

## Change Background

![](/menu_support/actioneditor4_help/commando/Back.jpg)  
  
Changes the stage background.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
> For details on stage background specifications, refer to [Main Menu "Stage" > "Stage Settings"](../menu_stage_set/#BACK).  
  
● Background Number  
The background number to be changed (which background in the stage background list).  
  
● (Display/Hide)  
Background display settings.  
・Display ... Displays the background.  
・Hide ... Hides the background.  
・Toggle (Display ⇔ Hide) ... If the background is displayed, it hides it. If the background is not displayed, it displays it.  

[Back to top of page](#TOP)

<a name="SOUND_COMMAND"></a>

## Play Sound Effect

![](/menu_support/actioneditor4_help/commando/Sound.jpg)  
  
Plays a sound effect.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● Sound Effect  
The sound effect to play.  
Can be specified from "Sound Effect" in the database.  
  
● Do not play if character is off-screen  
Whether to not play if the character is off-screen.  

[Back to top of page](#TOP)

<a name="BGM_COMMAND"></a>

## Play BGM

![](/menu_support/actioneditor4_help/commando/Bgm.jpg)  
  
Plays BGM.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
● BGM  
The BGM to play.  
Can be specified from "BGM" in the database.  
  
● Loop Playback  
Whether to loop playback.  

[Back to top of page](#TOP)

<a name="CODE_COMMAND"></a>

## Execute Code

![](/menu_support/actioneditor4_help/commando/Code.jpg)  
  
Executes a command expressed as a single assignment expression (code).  
This is a command for advanced users and can be replaced by "Status Manipulation", so there's no need to force yourself to learn it. However, this one can perform many calculations at once.  
**However, "Execute Code" often has slightly slower execution speed than "Status Manipulation" because the game program starts parsing the code at the time of command execution.**  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
**※In versions 7.51 and earlier, a bug exists where, in an expression with two or more operators excluding "=", the calculation result of the leftmost operator excluding "=" becomes the result of the entire expression (for details, see update history on download page).  
To obtain a correct calculation result, you need to use version 7.52 or later and uncheck "Apply behavior from versions 7.51 and earlier for "Execute Code" command" in the system settings (to use the latest version's behavior).**  
**※Decimals are not supported. Decimal places are truncated even in intermediate calculations (calculation result for one operator).  
**For example, suppose you want to assign some percentage (%) to common variable 3 (C3) and execute the code "C3 = C1 / C2 * 100" (meaning "Common Variable 3 = Common Variable 1 ÷ Common Variable 2 × 100").  
If C1 is 1 and C2 is 2, the result will not be 50(%). At the "C1 / C2" point, the decimal part is truncated, so 0.5 becomes 0.0, and multiplying by 100 still results in 0(%). (By the way, in this case, writing "* 100" first, like "C3 = C1 * 100 / C2", solves the problem).  
  
● Code  
The content of the command.  
Uses half-width alphanumeric characters and operators to create a single **assignment expression (an expression using "=").**  
**Always separate operators and values (constants or variables) with a half-width space.**  
**※If the value exceeds the range of -2147483648 to 2147483647 during calculation, a correct result will not be obtained!**  
**※Ensure no division by 0 occurs. If division by 0 occurs, the command will always fail.**  
  
Now, let's explain each keyword.  
  
○ Object  
Represents a character or the system. You can refer to statuses by adding "." (half-width period) after the object.  
・my ... Self. "my" can be omitted. **Omitting "my" slightly increases execution speed.**  
・tg1~4 ... Target. tg1 for Target 1, tg2 for Target 2...  
・tg ... Target 1. tg is the same as tg1.  
・pl ... Protagonist.  
・sys ... System (includes stage settings).  
  
○ Status (Character)  
By writing the following keywords after "Object.", you can refer to each status.  
・v1~8 ... Character variables 1~8.  
・hp ... Current HP value. When HP changes, the bar above the character's head also displays.  
・sp ... Current SP value. When SP changes, the bar above the character's head also displays.  
・mhp ... Max HP value.  
・msp ... Max SP value.  
・cid ... Character ID.  
・x_rel ... X-coordinate (relative coordinate). Relative coordinate where the origin (0,0) is your position (the character executing the command), unit is dot (dot). *  
・x_abs ... X-coordinate (absolute coordinate). Unit is dot (dot). *  
・x_scr ... X-coordinate (screen coordinate). Unit is dot (dot). *  
・y_rel ... Y-coordinate (relative coordinate). Relative coordinate where the origin (0,0) is your position (the character executing the command), unit is dot (dot). *  
・y_abs ... Y-coordinate (absolute coordinate). Unit is dot (dot). *  
・y_scr ... Y-coordinate (screen coordinate). Unit is dot (dot). *  
・z ... Z-coordinate.  
・mark ... Mark number.  
・sight ... Vision range (hbl).  
・power ... Body collision power.  
・imp ... Body collision impact (hbl).  
・def ... Defense power.  
・impd ... Impact resistance.  
・stop ... Ease of stopping during inertial movement.  
・getsc ... Acquired score.  
  
※**For X-coordinate and Y-coordinate manipulation (assignment) via code execution, the "Warp" command is actually called internally by the program. Therefore, specifications such as the command failing if a block is present at the destination for a block-hitting character are the same as warp.** The "Giant character coordinate position" setting, which applies to the "Warp" command, is **fixed to "Mid-bottom for walking, center for flying" (however, in version 8.90, it was "Character's center")**, which may be inconvenient in many situations.  
  
○ Status (System)  
By writing the following keywords after "sys.", you can refer to each status.  
・time ... Remaining time of the time limit.  
・scrlx ... Horizontal scroll speed.  
・scrly ... Vertical scroll speed.  
・score ... Score.  
・life ... Remaining lives. **If lives are ∞ (infinite), assigning to it (left operand) will always cause the command to fail (infinite lives cannot be changed). If it's on the right operand, it's calculated as 100. Even if lives are not set to ∞, be aware that lives automatically become ∞ during single-stage test play.**  
  
○ Variables  
Variable values.  
・C1~999 ... Common variables 1~999.  
・S1~999 ... Stage variables 1~999.  
・v1~8 ... Character variables 1~8.  
・fA,fB ... Flow variables A, B.  
・rA,rB ... Flow variables A, B. Using either fA,fB or rA,rB yields the same result.  
  
○ Operators  
Calculation method.  
・= ... Assigns.  
・+ ... Adds.  
・- ... Subtracts.  
・* ... Multiplies.  
・/ ... Divides.  
・% ... Modulo (remainder). **※Different meaning from "%" operator in "Status Manipulation" command.**  
  
○ Function  
A function performs a specific calculation based on 0 or more values and returns the result.  
Currently, only rand is provided (and probably will be indefinitely...).  
・rand(min, max) ... Generates a random number in the range of "min" to "max".  
  
○ Other  
・() ... Changes calculation priority. For example, "hp = (hp + sp) / 2".  
  
I feel it's meaningless to explain further in words, so please refer to the examples provided in the editor for more learning.  
  
● Variables (Reference, for renaming) (Frame)  
You can check variable names or change them here.  
This has no effect on the game.  

[Back to top of page](#TOP)

<a name="ARRANGE_COMMAND"></a>

## Arrange

![](/menu_support/actioneditor4_help/commando/Arrange.jpg)  
  
Edits the numerical type settings of the command to be executed next, other than "Arrange", using variables.  
For example, you can set the "Power" of a shot or sword, or the "X Coordinate (bl)" (display position) of a message or picture to a variable's value.  
This command is a parallel execution type with an execution time of 0 ("P-0").  
  
**※Arrange is executed only at the start of the target command. Once a command starts, its value will not change until that command ends. For example, if you set "Power" = "Variable A" for a shot with execution time 2 (2 consecutive shots), even if "Variable A" changes after the first shot is fired, it will not be reflected in the second shot.**  
  
**You can execute multiple arrangements for a single command.**  
For example, by executing arrangements consecutively as shown below, you can replace a shot's "Power" with "Protagonist's Attack Power" (a variable by that name), and "Speed" with "Protagonist's Shot Speed".  
<Example>  
P-0 ◆ Arrange ◆ Next shot's "Power" = "Protagonist's Attack Power" (variable)  
P-0 ◆ Arrange ◆ Next shot's "Speed" = "Protagonist's Shot Speed" (variable)  
1 ◆ Shot ◆  
  
  
Arrange is set in the format:  
[Command to Arrange]  
[Left Operand (Setting Item to Arrange)] [Operator] [Right Operand (Variable)]  
  
● Command to Arrange  
The command to be arranged.  
If any command other than Arrange or the Arrange target command (e.g., "Shot") is placed between Arrange and the Arrange target command, the arrangement will fail.  
<Example>  
P-0 ◆ Arrange ◆ Next shot's "Power" = "Protagonist's Attack Power" (variable)  
P-0 ◆ Arrange ◆ Next shot's "Speed" = "Protagonist's Shot Speed" (variable)  
10 ◆ Straight Move ◆  
1 ◆ Shot ◆ ← Arrangement invalid!  
  
● (Left Operand)  
The setting item to be arranged.  
There are quite a few numerical settings that cannot be arranged, such as the general command's "Execution Time" and movement command's "Speed".  
If this is "× Not supported", all setting items are not arrangeable.  
  
● Operator  
Calculation method.  
**・"=" ... Assigns the right operand to the left operand.**  
**・"+" ... Adds the right operand to the left operand.**  
**・"-" ... Subtracts the right operand from the left operand.**  
**・"×" ... Multiplies the left operand by the right operand.**  
**・"÷" ... Divides the left operand by the right operand.**  
**・"÷ X Remainder" ... Divides the left operand by the right operand and takes the remainder.**  
**・"X %" ... Calculates the right operand as a percentage of the left operand. For example, if the right operand is "50 (%)", the left operand (result) becomes half of its original value.**  
The types of operators are the same as those in the "Status Condition" command.  
If it's not "=", it's an operation between the left operand's value and the variable.  
  
● (Right Operand)  
Variable.  
When executing a command from an item, if "Character Variable" is specified, the protagonist's character variable is applied.  

[Back to top of page](#TOP)

<a name="LOOP_COMMAND"></a>

## Loop

![](/menu_support/actioneditor4_help/commando/Loop.jpg)  
  
"Loop" repeats a specified range of commands for a specified number of times.  
The result is the same as copying and pasting the commands you want to repeat, but it makes it easier to modify them later if necessary.  
  
In loop processing (internally in the program), the loop part is duplicated in the command list according to the loop range and number of repetitions.  
The important thing is that loop processing occurs before the stage starts.  
Although displayed as "P-0" (parallel execution and execution time 0) in the editor, all loop commands are actually executed before the stage starts.  
**※Be careful that if the loop range is too wide or the number of repetitions is too large, loop processing will become heavy, and the stage will take a long time to start.**  
  
**If multiple loop commands exist in one flow, loop processing is executed sequentially from the first command (from the top of the command list).**  
<Example>  
P-0 ◆ Loop ◆ Repeat next 3 commands 2 times  
10 ◆ Straight Move ◆  
P-0 ◆ Loop ◆ Repeat next 1 command 2 times  
1 ◆ Shot ◆  
  
↓ (Internally in the program) Loop processing!  
  
10 ◆ Straight Move ◆  
P-0 ◆ Loop ◆ Repeat next 1 command 2 times  
1 ◆ Shot ◆  
10 ◆ Straight Move ◆  
P-0 ◆ Loop ◆ Repeat next 1 command 2 times  
1 ◆ Shot ◆  
  
↓  
  
10 ◆ Straight Move ◆  
1 ◆ Shot ◆  
1 ◆ Shot ◆  
10 ◆ Straight Move ◆  
P-0 ◆ Loop ◆ Repeat next 1 command 2 times  
1 ◆ Shot ◆  
  
↓  
  
10 ◆ Straight Move ◆  
1 ◆ Shot ◆  
1 ◆ Shot ◆  
10 ◆ Straight Move ◆  
1 ◆ Shot ◆  
1 ◆ Shot ◆  
  
This is how it is processed.  
  

[Back to top of page](#TOP)

---

  

[To Next Topic](../cond/)

[To Help Table of Contents](..)