---
title: Game Mode Explanation
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Game Mode Explanation
    url: /menu_support/actioneditor4_help/gamemode/
description: Online help for the action game creation software "Action Editor 4". "Game Mode Explanation" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## Game Mode Explanation Table of Contents

Title Screen  
![](/menu_support/actioneditor4_help/gamemode/Title.jpg)  
  

- [Story Mode](#STORY)
- [Challenge Mode](#CHALLENGE)
- [Free Mode](#FREE)
- [Replay Mode](#REPLAY)
- [Options](#OPTION)

<a name="STORY"></a>

## Story Mode

Selecting "New Game" or "Continue" from the title screen enters Story Mode.  
In Story Mode, the world map serves as the stage.  
  
In Story Mode, depending on the editor's settings, the initial value for auto-save might be OFF.  
Press the X key on the world map to call up the menu and select "Save".  
  
**If you want to create a world composed of multiple stages, append "-S" (S...stage number) to the end of the stage filename.**  
Example: "stage-1.stg4_*", "stage-2.stg4_*".  
Then, by specifying the next stage to transition to after clearing the current one with the character or item's "Stage Clear" command, you can have multiple stages within one world.  
  
> Story Mode settings are configured in [Main Menu "Project" > "System"](../menu_project_system/#SYSTEM_2).  

[Back to top of page](#TOP)

<a name="CHALLENGE"></a>

## Challenge Mode

Selecting "Challenge" from the title screen enters Challenge Mode.  
In Challenge Mode, you select and play any stage from the stage selection screen.  
In Challenge Mode, the game is automatically saved every time you clear a world.  
  
**If you want to play in Challenge Mode, name your stage files as "cW-S.stg4_*" (W...2-digit world number (01-99), S...stage number, *...version).**  
Example: "c01-1.stg4_*", "c01-2.stg4_*", "c02-1.stg4_*", "c02-2.stg4_*".  
  
> Challenge Mode settings are configured in [Main Menu "Project" > "System"](../menu_project_system/index.html#SYSTEM_2).  

[Back to top of page](#TOP)

<a name="FREE"></a>

## Free Mode

Selecting "Free" from the title screen enters Free Mode.  
In Free Mode, you can choose and play any stage file from the "data" > "stg4" folder.  
  
> Free Mode settings are configured in [Main Menu "Project" > "System"](../menu_project_system/index.html#SYSTEM_2).  

[Back to top of page](#TOP)

<a name="REPLAY"></a>

## Replay Mode

Selecting "Replay" from the title screen enters Replay Mode.  
In Replay Mode, you can view replays automatically saved in the "user_data" > "rpl4" folder or replays saved using F1/F2 keys.  
Before version 9.30, it used an Explorer-like file selection dialog, but from version 9.50, that was abolished and the UI and specifications changed significantly (you can revert to 9.30 or earlier using "Use Explorer-style file selection dialog from versions 9.30 and earlier when selecting files in Free Mode and Replay Mode, and when manually saving replays" in Main Menu "Project" > "System1").  
From version 9.50, you can play replays in the order of the playlist or play only replays that have cleared the stage. You can change these settings in "Options", which is explained next.  
> For details on the replay feature, refer to [About Replay](../replay/).  

[Back to top of page](#TOP)

<a name="OPTION"></a>

## Options

Selecting "Options" from the title screen enters Option Mode.  
Here you can set game preferences.  
  
・"Color" ... Game screen color. Normally, the default setting of "0" will be the most viewable.  
・"Gamepad" ... If using a gamepad, set to "ON"; otherwise, set to "OFF". However, **strictly speaking, this setting determines whether to detect gamepad connection during play, and even if "OFF", the gamepad will be recognized if connected before game launch. Conversely, if "ON" is selected when not using a gamepad, connection detection will be performed at regular intervals only when disconnected, causing the game's execution speed (FPS) to become unstable. That said, connection detection is not performed during stage maps or battles where stable speed is crucial, so there's no need to be overly concerned.**  
・"BGM" ... Music volume. Adjustable in 8 steps from 0 to 7. 0 is mute, 7 is 100%. Initial value is 7.  
・"SE" ... Sound effect volume. Adjustable in 11 steps from 0 to 10. 0 is mute, 10 is 100%. Initial value is 7 (not 10).  
・"Ranking Registration" ... Ranking registration method. When "Manual Registration" is selected, press the F3 key upon stage clear to register.  
・"Ranking Registration Name" ... The name registered in the ranking when "Ranking Registration" is set to "~ (Fixed Registration Name)". Also, the default registration name when "~ (Input Registration Name)" is selected.  
・"Replay Auto Save" ... Whether to automatically save replay data, which can reproduce one play's content for a single stage, to a file. **"Save All" saves replays not only upon stage clear or failure, but also when selecting "Quit", "Retry", or "Return to Map" from the pause menu (it will not save if closed with ESC key or the "x" button in the top right of the window).** **Saving will fail if there is less than 100MB of free storage.** By the way, replays can also be saved with F1/F2 keys regardless of the auto-save setting (F1 key: saves the current play in the current stage. F2 key: saves the previous play in the current stage). Note that auto-save is disabled during test play.  
・"Replay Playback Order" ... Playback order in replay mode. "Sort Order" plays replays in the order of the replay playlist implemented in version 9.50. "Sort Order & Stage Clear Only" only plays replays whose filename ends with "_CLEAR_".  
・"Replay Message Auto Advance Seconds" ... How many seconds messages or pictures that are displayed until the Z key is pressed will be shown during replay playback. Note that you can advance messages with the Z key regardless of this setting.  
  
> For details on the replay feature, refer to [About Replay](../replay/).  

[Back to top of page](#TOP)

---

  

[To Next Topic](../file/)

[To Help Table of Contents](../)