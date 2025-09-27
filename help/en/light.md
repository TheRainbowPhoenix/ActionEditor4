---
title: How to Improve Performance?
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: How to Improve Performance?
    url: /menu_support/actioneditor4_help/light/
description: Online help for the action game creation software "Action Editor 4". "How to Improve Performance?" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## How to Improve Performance? Table of Contents

This section explains how to improve game performance.  
  

- [Understanding Performance Load and Processing Time](#SHOW)
- [Improving Performance](#LIGHT)

<a name="SHOW"></a>

## Understanding Performance Load and Processing Time

First, I will teach you how to know "how heavy is it now?" and "how much time is currently being spent on processing (calculations and display)?"  
  
**First, open the environment configuration file "System.ini" and set "ShowFps=1" or "ShowFps=2". Additionally, if running in DirectDraw mode, set "VSync=0" (for details on "ShowFps" and "VSync", please refer to the "System.ini" explanation).**  
Then, pay attention to "FPS○○(□□)" in the bottom right of the game screen.  
"FPS" (FramesPerSecond) refers to the frame rate, or "how many times the screen is updated per second?".  
Normally (with default FPS settings), if this value is consistently around 60, it is considered normal and feels smooth.  
Conversely, if the FPS drops below 60, performance is heavy, and character movements become choppy.  
In short, by looking at the FPS, you can numerically determine whether the game is running slowly.  
  
However, this alone is not enough.  
"It runs on my computer, but I don't know how it will perform on others'..."  
"It might become heavy in certain situations (e.g., repeatedly using "Character Summon")..."  
  
There's a way to somewhat solve such concerns.  
  
**Pay attention to the number in parentheses displayed after the FPS mentioned earlier.  
This is actually the processing time per frame in the game, called "MSPF" (MilliSecondPerFrame) (strictly speaking, it's the average over the latest 16 frames).  
A higher MSPF means slower processing speed, and if this value exceeds a certain point, the FPS will start to drop.  
Normally, FPS will start to drop when MSPF reaches 17 or higher.  
In short, by looking at MSPF, you can tell how soon performance will become heavy.  
**  
Especially when distributing games on homepages or other platforms to a large, unspecified audience, don't be complacent just because the FPS is around 60; it's better to also pay attention to MSPF.  
The higher your computer's performance, the more you should strive to keep MSPF low.  

[Back to top of page](#TOP)

<a name="LIGHT"></a>

## Improving Performance

This section lists common causes of game slowdowns and provides solutions for them.  
  
● Many characters and shots  
Blocks and items, which have fewer calculations for behavior and hit detection, don't significantly burden the system even in large numbers.  
Characters and shots, however, involve many complex calculations for behavior (flow) and hit detection.  
**Especially when using 3 or more factions, even a slight increase in the number of characters or shots can dramatically increase the number of hit detection executions, potentially slowing down performance.  
For example, if you have 1 character in faction 0 and 100 characters in faction 1, the number of hit detection executions per frame is "1 × 100", or 100 times.  
Now, what if you have 1 character in faction 0, 50 characters in faction 1, and 50 characters in faction 2? In this case, the number of hit detection executions per frame is a whopping "1 × 50 + 1 × 50 + 50 × 50", totaling 2600 times.**  
As you can see, even with the same total of 101 entities, there's a huge difference in the number of hit detection executions.  
  
However, even with many characters and shots, you can reduce the number of hit detection executions per frame.  
If "Do not take damage outside the screen" is disabled in stage settings, hit detection is only performed between objects on screen. So, you just need to design the stage so that the number of characters and shots on screen at any one time doesn't become excessive.  
**Be aware that for block characters (characters converted to blocks), even if "Do not take damage outside the screen" is disabled, hit detection (whether the character has touched a block) is always performed.**  
  
Also, **if there are many characters, rendering can cause slowdowns more than calculations for behavior and hit detection.**  
In this case, setting "Character Drawing Type" to "Speed Priority" in the system settings might improve performance.  
  
<Solutions>  
**・Lower "Hit Detection Level" and "Character vs. Shot Hit Detection Precision" in stage settings. This is highly effective.  
・Reduce the number of block characters.  
**・Prevent too many characters and shots from appearing on screen at once.** Especially in bullet-hell STGs, reducing the number of protagonist's shots or increasing shot speed (so they disappear off screen faster) is a simple and highly effective measure.**  
・Eliminate unnecessary enemies using "Auto-disappearance" in stage settings.  
**・Set "Character Drawing Type" in system settings to "Speed Priority".**  
  
● Many screen effects and character effects  
Screen effects are slow because they are applied to the entire screen.  
For character effects, **the larger the character, the slower the effect processing.**  
Depending on the type of effect, for example, performing a character effect on two 100x characters can be slower than a screen effect.  
  
<Solutions>  
・Change from slow-executing effects to fast-executing effects. **By the way, character effect "Flicker" is actually faster than normal display.**  
  
● Many giant characters and giant effects (DirectDraw mode only)  
Drawing giant characters in DirectDraw mode is quite slow.  
The larger they are, the slower they get. For example, a 4x character's drawing speed will probably be more than 4 times slower than a normal-sized character.  
However, **it is not so slow if it is a 4x to 100x character of specific BMP (where the bitmap itself is large) and there is no need for internal scaling processing in the program.  
Regarding effect drawing, if "Allow Scaling" is checked in the database settings, there is a possibility that scaling processing will be performed internally by the program before drawing, which will slow down the drawing.  
**Drawing giant characters and giant effects is not very slow in Direct3D mode.**  
  
<Solutions>  
・Reduce character size.  
・Prepare a specific BMP of the necessary size.  
・Uncheck "Allow Scaling" for effects.  
・Run in Direct3D mode.  
  
● Many backgrounds  
Drawing many backgrounds (whether colors or images) at once can be slow.  
In Direct3D mode, depending on the environment, backgrounds that are too small can be slow.  
**In DirectDraw mode, background images of 640x480 size have the fastest drawing speed, and if they are even 1 pixel larger in height or width than 640x480, they will be more than twice as slow.**  
Also, backgrounds that are too small can be slow.  
  
<Solutions>  
・Reduce the number of backgrounds displayed at once.  
・Do not make background images too small.  
・In DirectDraw mode, make background images 640x480 or smaller. 640x480 is best.  

[Back to top of page](#TOP)

---

  

[To Next Topic](/en/menu_support/actioneditor4_help/packaging/)

[To Help Table of Contents](/en/menu_support/actioneditor4_help/)