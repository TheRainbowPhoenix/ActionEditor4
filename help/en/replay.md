---
title: About Replays
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: About Replays
    url: /menu_support/actioneditor4_help/replay/
description: Online help for the action game creation software "Action Editor 4". "About Replays" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## About Replays Table of Contents

- [Replay Overview](#ABOUT)
- [Replays May Not Be Faithfully Reproduced](#ERROR)
- [Replay File Names Saved in Versions Below 9.50 and Their Issues](#FILENAME)

<a name="ABOUT"></a>

## Replay Overview

From the "Replay" option on the title screen, you can watch automatically saved replays or replays manually saved with the F1/F2 keys.  
Replay files, whether automatically or manually saved, are stored in the "rpl4" folder within the "user_data" folder. Before version 9.30, you could change the save destination for manual saves, but from version 9.50, replay files are no longer displayed in the replay mode playlist unless they are in the "rpl4" folder, so the save destination for manual saves has also been fixed.  

Replay auto-save settings and replay playback settings can be changed from "Options" on the title screen.  
> For details on game-side replay settings, refer to ["Game Mode Explanation" > "Options"](/en/menu_support/actioneditor4_help/gamemode/#OPTION).  

Note that you can also turn off the replay function from Main Menu "Project" > "System1".  

[Back to top of page](#TOP)

<a name="ERROR"></a>

## Replays May Not Be Faithfully Reproduced

Replays may not be faithfully reproduced.  
There are mainly two cases where playback fails.  

The first is when **edit data other than stage data differs between replay save time and replay playback time**.  
Replay files primarily save stage data, the state before playback (HP, stock, common variable values, etc.), and input data from the keyboard or gamepad. However, they do not include other edit data such as common palettes, databases, or system settings, so if these have changed since the replay was saved, playback may not be reproduced.  

The second is when **the game program (Game_v*.exe) version at the time the replay was saved and the version of the game program playing it are different**.  
In this case, there is also a slight possibility that playback will not be reproduced.  

Also, **it is rare but possible for reproduction to fail due to reasons other than these two.**  

[Back to top of page](#TOP)

<a name="FILENAME"></a>

## Replay File Names Saved in Versions Below 9.50 and Their Issues

With the implementation of the replay playlist (option "Replay Playback Order"), a new feature in version 9.50, the structure of replay file names was changed from versions below 9.50.  
  
First, in versions below 9.50, the file name structure looked something like this:  
  
`[Stage Filename]_[Variation Variable Number]_[Variation Value]__[Year]__[Month]_[Day]__[Hour]_[Minute]`  
Example: `StageFileName__c001_0_2019_04_30__19_36.rpl4_*`  
  
In contrast, the file name structure in version 9.50 and later is as follows:  
  
`[Year]_[MonthDay]_[HourMinuteSecond]_[Stage Filename]_[Variation Variable Number]_[Variation Value]_[Stage Cleared Boolean]`  
Example: `2019_0430_193620_StageFileName_c001_0_CLEAR_.rpl4_*`  
(The `[Stage Filename]` part can also be changed to "Stage Name" in the system settings.)  
  
As you can see, the date and time information comes at the beginning of the filename, and there have been significant changes (I deliberately made significant changes so that it's clear at a glance that it's a version 9.50 or higher file). What's important here is the [Stage Cleared Boolean] part at the end of the filename; specifically, if the replay is from a cleared stage, "_CLEAR_" will be included.  
Replay files with "_CLEAR_" at the end of their filename will be played when "Replay Playback Order" in option mode is set to "Sort Order & Stage Clear Only".  
**In version 9.50's new auto-save feature for replays, if the play cleared the stage, the "_CLEAR_" text is automatically appended to the filename. In manual replay saving from version 9.50, the player can choose whether to append the "_CLEAR_" text.**  
However, **versions below 9.50 did not have such a feature, so replay files for cleared stages do not have "_CLEAR_" appended.**  
Therefore, they will be excluded from playback when "Sort Order & Stage Clear Only" is selected for replay playback.  
However, since the game program only judges by filename, **even for replays from versions below 9.50, if you manually add "_CLEAR_" to the end of the filename in Explorer, this problem will be solved** (though it might be too much trouble for most people).  

[Back to top of page](#TOP)

---

  

[To Next Topic](/en/menu_support/actioneditor4_help/light/)

[To Help Table of Contents](/en/menu_support/actioneditor4_help/)