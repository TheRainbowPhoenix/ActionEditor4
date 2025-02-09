# Action Game Creation Software - Action Editor 4

You can download the action game creation software **Action Editor 4** here.  
There is also a collection of games made with Action Editor 4.

[Download Action Editor 4](#)  
[Game Collection](#)

## Download Action Editor 4

Games created with Action Editor 4 can be easily distributed on personal websites and more.  
For details, please refer to the included file **"ゲームの配布について.html"** (previously known as **"二次配布について.html"**).

### Download the Latest Version of Action Editor 4 (ZIP)

- **Version**: 10.20  
- **Genre**: Action Game Creation Software  
- **Target Audience**: 1 person  
- **Software Type**: Free Software (Free)  
- **System Requirements**: Windows 10, 8, 7, Vista, XP  
- **Initial Release**: 2008/09/26  
- **Latest Release**: 2020/12/24  
- **Description**: The latest version of the Action Editor series.  
   No programming skills required to create fun 2D action games.  
   High development efficiency and significant freedom are offered.  
   You can make not only action games but also action RPGs, shooting games, puzzle games, and more.

[Back to top](#)

---

## Update History and Downloads for Each Version

### How to Read the Update History

- **◆Editor**: Updates to the editor program (Editor_v*.exe) or default data.  
  If you transfer data from older versions, the gameplay will not change.

- **◆Game**: Updates to the game program (Game_v*.exe).  
  If the editor program is updated, but there is an update affecting gameplay, it will be listed under "◆Game".

If transferring data from older versions, updates listed as "◆Game" may cause changes in gameplay behavior (this can happen occasionally).

---

**v10.20 2020/12/24**
- **Game**: Fixed a bug where the game would crash when trying to display character variables using the "Message" command from an item.
- **Game**: Fixed a bug where characters couldn't be moved to the correct position when assigning X and Y coordinates in the "Manipulate Status" command.
- **Game**: Fixed a bug where return values were not correctly assigned when the left side of the "Manipulate Status" command was "Status."

**v10.10 2020/9/26**
- **Other**: Fixed an issue where some antivirus software falsely flagged `KeyConfig.exe` as a threat.
  - **Note**: This fix is still incomplete, and some false positives remain. I plan to provide a better solution in the next version, but I’m not sure if it will work. It would take too long to explain the reasons for releasing an incomplete fix, so I’ll leave it out for now.

- **2020/10/6 Update**:
  - In conclusion, I couldn't fully resolve the false positive issue.
  - I scanned `KeyConfig.exe` from versions 9.67 to 10.00 (during which the filename was `KeyConfig_v2.12.exe`) on OPSWAT (https://metadefender.opswat.com/) with multi-scan (38 antivirus engines simultaneously). 
    - **Kaspersky**, **RocketCyber**, and **Filseclab** falsely flagged it.
    - The false detection by **Kaspersky** has been fixed in version 10.10.
    - I contacted **RocketCyber**, and they replied that the latest engine no longer detects it. They asked me to wait until OPSWAT updates their engine. As of October 6, 2020, OPSWAT still detects it as a threat, so it may take more time.
    - I contacted **Filseclab** on September 29, 2020, but have not received a response.
  - Honestly, I’ve done everything I can for now regarding this issue. If you're still facing false positives, you can contact the companies that provide the antivirus engines (they’re usually in English). I think anyone can contact them, not just developers. I apologize for the inconvenience.

**v10.00 2020/7/2**
- **Game**: Added the ability to set the zoom in the vertical and horizontal directions separately in the "Display Picture" command.
- **Game**: Implemented the functionality to flip images horizontally and vertically in the "Display Picture" command.

**v9.97 2020/3/9**
- **Game**: Added an option to skip the window asking for a save location when selecting "Start from the Beginning" in Story Mode, and instead automatically fix it to save at location 1. To enable this, go to the main menu → "Project" → "System" → Tab "2" → "Auto-save Initial Settings" and set "Fix save location to 1 and always keep auto-save ON". In the title screen, if no save data exists, only "Start from the Beginning" will be displayed, and "Continue" will be hidden. Conversely, if save data exists, only "Continue" will be displayed. Additionally, the "Save" and "Auto-Save" commands will not appear in the world map menu.

**v9.96 2019/11/9**
- **Editor**: Fixed a bug where right-clicking menu commands in certain windows, such as the palette window, would only execute the command after the mouse pointer entered the window frame, even if the pointer was outside the frame when clicked.

**v9.95 2019/10/26**
- **Game**: Fixed a bug in version 9.91 where damage-reducing sound effects were played when shots with 0 power or 0 shock hit, even though they shouldn’t be. The sound effect should only play when damage or shock is nullified due to the character's defense or invincibility, as intended.
- **Game**: Fixed a bug where message choices in replays could still be changed with key input, even though they shouldn't be.

**v9.94 2019/10/2**
- **Game**: Updated the game program (`Game_v*.exe`) and editor program files (`Editor_v*.exe`) because in version 9.93, they were still at version 9.92.

**v9.93 2019/10/1**
- **Game**: Fixed a bug in versions 9.91 and 9.92 where changes to the "Show Symbol Image" setting in "System" were not saved.

**v9.92 2019/9/21**
- **Game**: Changed the challenge mode completion mark in the top-right corner of the default image (`Accessory.bmp`) from a "○" character to a star. The old "○" would float when applying shadow or border effects to fonts, so it was changed.
- **Other**: Updated "About Game Distribution.html" and added a link to the online help about "Packaging."


**v9.91 2019/8/24**
- **Game**: Added the ability to add a border to fonts in the "System" settings.
- **Game**: Added a setting in the "System" settings for "Minimum damage reduction by defense." For example, setting this to 1 means that even if defense is higher than the damage or shot power, at least 1 damage will be received. It can also be specified as a percentage of the damage or shot power.
- **Game**: Added a setting in the "System" settings for "Minimum shock reduction by shock resistance." For example, setting this to 1 means that even if shock resistance is higher than the shock from body slams or shots, 1 (hbl) will still be knocked back. It can also be specified as a percentage of the shock from body slams or shots.
- **Game**: Added a setting in the "System" settings to configure the sound effect when damage is nullified by defense or invincibility. Additionally, a sound effect file called "DamageNullified.wav" has been included. If you are upgrading from an older version, the "Damage.wav" sound will still be played when damage is nullified, so you should change it to "DamageNullified.wav" or another sound if necessary.
- **Other**: Minor updates.

**v9.88 2019/8/10**
- This version has officially moved from a beta version to the stable version.
- **Game**: Fixed a bug in version 9.87 beta where the return value of the "Warp" command was incorrect. It should return 2 when the warp fails, but it was returning 1.
- **Editor**: Added a checkbox in the project options to prevent the bug that occurs in some environments where, after running a test play without saving changes to common palettes and stage changes, the game gets hidden behind the editor. If this checkbox is selected, it will prevent the bug, but it will force you to manually save the project, as automatic saving will be disabled during test play.

**v9.87β 2019/8/1**
- **Game**: When using the "Wave (Horizontal)" or "Wave (Vertical)" character effect, the wave height will smoothly change when either the "start width" or "end width" is set to 0. Previously, the wave would remain static for a long time (this is noticeable when the "Reverse Execution" option is used), but this has been slightly improved. If the wave still feels too static, you can change the width from 0 to 1, for example.
- **Editor**: Fixed a crash that occurred when setting the "Warp" command in an item or editing an item that already had the "Warp" command set, introduced since version 9.80β.

**v9.86β 2019/7/28**
- **Game**: Fixed a bug in version 9.10 and later where using images with a width other than 512 pixels in the "Character-Specific BMP" database would cause the tiles to be misaligned. Originally, the character-specific BMP images were required to have a fixed width of 512, but starting with version 9.10, the game was intended to support widths other than 512. However, this was only supported in the editor and not in the game, so images with widths other than 512 would display the tiles incorrectly. This bug has been fixed.
- **Game**: Officially supports character-specific BMP images with widths other than 512 pixels. The width and height of the image must both be multiples of 32 (as the character's size is a multiple of 32, there should be no issue if drawn normally).
- **Game**: In the "BGM" option mode, the volume can now be adjusted in 8 levels, from 0 to 7. The previous "BGM ON" volume corresponds to level 7, so now you can lower the BGM volume. The "SE" (sound effect) volume can still be adjusted in 11 levels, but due to certain reasons, "BGM" uses 8 levels.
- **Game**: In the "SE" option mode, the volume for values 4 and above will be slightly reduced.
- **Game**: Fixed a bug that occurred in versions 9.66 and later when using DirectDraw as the drawing mode. If the window size wasn’t 640x480 (100%) when the game was launched, the drawing area would still be set to 640x480. This bug was not critical, as it could be resolved by moving the window slightly, but it was noticeable on the first launch, so it has been fixed.

**v9.85β 2019/7/24**
- **Game**: Fixed a bug in the "Message" command where, when the "Set Choices" option was checked, and the display type was set to anything other than "Display until the action key is pressed," the cursor would be incorrectly shown during other choice-based messages. Note that choices will not appear unless the display type is set to "Display until the action key is pressed" as intended.
- **Game**: The "Arrange" command now supports the use of flow variables.
- **Game**: The "Block Summon" and "Character Summon" commands now return the actual number of summons made. If the summon target is outside the stage, the "Block Summon" will be marked as a failure and not count toward the total, while the "Character Summon" will still count even if the summon is outside the stage (since the character might later enter the stage through movement).
- **Game**: The "Message" command now allows displaying the values of character and flow variables. Flow variables should be specified with their variable numbers (e.g., "#f1.", "#f2.") rather than using letters, and automatic updates are not supported.
- **Game**: The default cursor position for choices in the "Message" command can now be set based on the values of character and flow variables. Again, flow variables must be specified by their variable number (e.g., "f1", "f2.") rather than using letters.
- **Editor**: The "Run Code" command now recognizes flow variables as "rA", "rB", but they can also be recognized as "fA", "fB". Since flow variables in the "Message" command use "f", the editor now recommends using "fA", "fB" in "Run Code" as well for consistency.
- **Editor**: The "Run Code" command now explains that decimal places will be truncated during calculations and that division by zero should be avoided. This was previously only mentioned in the help section but is now explained in the editor as well.
- **Other**: Minor updates.

**v9.82β 2019/7/17**  
- **Game**: Fixed a bug where the automatic replay save failed on the next play after dying once in versions 9.80β and 9.81β when the pause menu was never opened (without pressing the space key).  

**v9.81β 2019/7/16**  
- **Game**: In version 9.80β, the names for the return values' assignment destinations (such as "Status Operations") were changed from "Return Value (A, B)" to "Flow Variable (A, B)" for clarity, as they can be used similarly to variables. Flow variables are now independent per flow (there is one Flow Variable A and B for each flow).  
- **Game**: Fixed an issue where, when assigning a return value to a flow variable in commands supporting return values, unrelated flow variables would incorrectly be set to 0. For example, with the Warp command, if Flow Variable A was set to 1 (success) or 2 (failure), Flow Variable B was also incorrectly set to 0. Now, only the related flow variable will be updated. A new system setting was added to apply the behavior from version 9.80β, but it's recommended to disable it.  
- **Game**: Fixed a bug where the game would crash when attempting to receive a return value from an item’s effect.  
- **Game**: Implemented flow variables for items so they can receive return values as well. The command list of item effects is treated as a single flow, allowing items to use flow variables.  
- **Game**: Fixed a bug in the "Message" command where variables wouldn't be displayed after choice text (e.g., #R1.#S1.).  
- **Editor**: Fixed a bug where an error would occur when assigning "rA" or "rB" (flow variables) as destinations in the "Execute Code" command.  
- **Other**: Minor updates.

**v9.80β 2019/7/13**  
- **Game**: Added a choice feature to the "Message" command.  
- **Game**: Implemented return values for commands. Return values are numerical results of commands that can be assigned to variables using the "Status Operations" command. The following commands now support return values:

    - **Flow Operations**  
      Return Value A: 1 if the operation is successful, 2 if it fails.  
    - **Message**  
      Return Value A: The choice selected by the player.  
    - **Warp**  
      Return Value A: 1 if the warp is successful, 2 if it fails.  
    - **Target Settings**  
      Return Value A: 1 if the target exists, 2 if it doesn’t.  
      Return Value B: 1 if the target was changed, 2 if it wasn’t.  
    - **Status Operations**  
      Return Value A: 1 if the operation is successful, 2 if it fails.  
      Return Value B: The amount of change.  
    - **Status Operations 2**  
      Return Value A: 1 if the operation is successful, 2 if it fails.  
    - **Destruction**  
      Return Value A: The number of characters destroyed.  
      Return Value B: The number of shots destroyed.  

    Help has been updated with an explanation of return values.  

- **Game**: Fixed a bug where the F2 key saved the most recent play instead of the previous play (this bug occurred between versions 9.50 and 9.67).  
- **Game**: Fixed a bug where the following four flow timings, introduced in version 9.00, were not compatible with the "Target the Character involved in the Timing" setting:  
    - Damage Taken (damage >= 1)  
    - Shock Taken (shock >= 1 or <= -1)  
    - Damage Dealt with an Attack (damage >= 1)  
    - Shock Dealt with an Attack (shock >= 1 or <= -1)  
- **Game**: Fixed a bug in Replay mode, where selecting a save from a version prior to 9.20 after playing a replay from version 9.20 or above could result in a "Stage cannot be loaded" error. Restarting the game would allow loading to work.  
- **Game**: Added a system setting to allow or prevent replay saving in specific stages. For example, you can disable this in opening or ending stages to avoid unnecessary replay files.  
- **Game**: Fixed a bug where text like "Press Space to End" or "Press F3 to Register for Ranking" was shown at the bottom of the screen before the title screen when a stage (defined in "System.ini" under "FreeStage=") was played.  
- **Game**: Adjusted the timing of "Message" commands with "Wait for Progress Key to be Pressed" so that the display transition takes a bit longer, and the Z key won't skip the message for 0.2 seconds after the display. This is to prevent accidental skipping in games where the Z key is rapidly pressed.  
- **Game**: Fixed an issue where, on the world map, if the "World Name" and "High Score" text was too long, it overlapped with the ranking window.

- **Editor**: Fixed a bug where setting the data name to be the same as the filename caused issues if the filename contained the character "ソ". Other characters may have been problematic as well.
- **Other**: Updated the explanation in "System.ini".
- **Other**: Added three stages from Story Mode as reference stages.
- **Other**: Minor updates.

## v9.64 (2019/6/14)
- This version transitions from Beta to Official (Stable) version.
- **Other**: Improved the issue where program files (.exe) were falsely detected by some antivirus software. While this may not completely eliminate false detections, it should now be much less frequent.
- **Other**: Minor updates.

## v9.63β (2019/6/5)
- **Game**: Fixed a bug where the game would crash when returning to the world map after completing a stage in Story Mode with the "Gamepad" option enabled in version 9.60β or later.
- **Game**: Fixed a bug where the required DirectX version for program startup had increased in versions 9.60β to 9.62β. This caused games to fail to run if the default DirectX was installed, and the player needed to install the DirectX runtime manually.
- **Game**: Increased the maximum character limit for in-game text in "System4" and "System5" by 0-4 characters.
- **Other**: Fixed a bug in "KeyConfig_v2.exe" where the up key would continuously input if certain gamepads were connected. Updated to "KeyConfig_v2.1.exe". Please use this version from now on.

## v9.62β (2019/6/1)
- **Editor**: Fixed a bug in the bitmap conversion tool that failed to convert multiple files via drag-and-drop.

## v9.61β (2019/5/31)
- **Game**: Fixed a bug where changing the window size from a maximized state with the system menu would prevent it from correctly maximizing again.
- **Game**: Fixed a bug in replay mode where BGM wouldn't change when transitioning to the next replay.
- **Editor**: Fixed a bug where changes to the "Replay Auto Save Type" and "Replay Playback Order" settings in the system would reset on restart.

## v9.60β (2019/5/26)
- **Game**: Supported XInput-compatible gamepads' POV (D-pad) controls. Both analog sticks and D-pad now work for movement.
- **Game**: Fixed an issue where only the highest-priority gamepad could be used. Now, other gamepads can also be used without needing to be marked as "Preferred Device".
- **Game**: Added an option to turn "Gamepad" on or off in the game options. When set to "ON", the game will attempt to detect and use a connected gamepad.
- **Other**: Updated the "KeyConfig.exe" to "KeyConfig_v2.exe" to support changes related to the new gamepad detection.

> *Apologies for the delayed fix regarding the issue where only the highest-priority gamepad could be used. It was a common issue in older games, but I realize the "Preferred Device" setting is not as well known, and I should have addressed this sooner.*

## v9.51β 2019/5/16
- **Game**: Fixed a bug where replays were saved regardless of the "Only Save When Stage Cleared" setting in the auto-save replay option.

## v9.50β 2019/5/12
This update has many changes, so it's a beta version.
- **Game**: Added "Auto Save Replay" option in the game settings. You can choose between "Do not auto-save," "Save only when stage is cleared," and "Save all replays." The "Save all replays" option saves the replay not only at stage completion or when a mistake occurs, but also when selecting "Finish," "Retry," or "Return to Map" from the pause menu (it will not save when closing the game with ESC or the "×" button in the top right). Note that auto-saving does not work during test play.
- **Game**: The replay file selection in Replay Mode has changed from an Explorer-style dialog to a Challenge Mode-style UI, and a playback list (sequential replay) system has been implemented. This update also adds scrollbars at coordinates (64,16) and (80,16) in the "Accessory.bmp" image. Subfolders are no longer displayed. You can revert to the Explorer-style file selection dialog from versions 9.30 and earlier by checking "Use the Explorer-style file selection dialog for free mode and replay mode file selection, and manual replay saving" in the settings. However, the playback list is not supported in that case. The new UI is simpler for players who are unfamiliar with Action Editor 4 and provides more comfortable replay list-based playback.
- **Game**: The file selection in Free Mode is now similar to the Replay Mode file selection and also uses the Challenge Mode-style UI. Subfolders are no longer displayed.
- **Game**: Added "Replay Playback Order" option in the game settings. You can select between "Sort Order," "Sort Order & Stage Cleared Only," and "Repeat the Same Replay." This allows you to replay in the order of the list in Replay Mode or play only the replays of stages that have been cleared.
- **Game**: When saving a replay from a world composed of multiple stages, the stage number will now be added to the replay file name.
- **Game**: Changed the replay file name structure. For auto-saved replays, "_CLEAR_" will be appended to the file name when the stage is cleared. This change mainly supports the behavior of the "Sort Order & Stage Cleared Only" option in "Replay Playback Order."
- **Game**: Updated the dialog for manual replay saving with the F1 and F2 keys. You can now select whether to save the replay as "Stage Cleared Replay" (with "_CLEAR_" appended to the file name) or "Non-Cleared Replay."
- **Game**: Implemented "Replay File Name Structure" under "Project" > "System" in the settings. You can choose whether to include the [Stage File Name] or [Stage Name] in the replay file name.
- **Game**: Added an option under the "Stage Clear" command to append "_CLEAR_" to the replay file name for auto-saved replays. It's usually recommended to leave this ON. You might turn it OFF in cases where, for example, a "Stage Clear" command is set to trigger when the player dies but you don't want it to be treated as a stage clearance.
- **Game**: Added "Auto Progress Message Seconds for Replay" option in the game settings. This function will automatically advance messages or pictures displayed in the replay after a set number of seconds, without requiring the Z key to be pressed.
- **Game**: Added a text description area at the bottom of the options screen in the game settings. You can enable this through the "Project" > "System" menu.
- **Game**: Added "Next Replay," "Previous Replay," and "Select Replay" options to the pause menu, available only in Replay Mode.
- **Game**: The pause feature (Pause Menu) can no longer be turned off in Replay Mode. Even if you disable the "Pause with Space Key" option in "Project" > "System," Replay Mode will always have the pause menu. This feature has been intentionally designed for the convenience of Replay Mode users.
- **Game**: Replay files will now be saved with a read-only attribute. Since the sort order in the replay list is based on the file's modification date, this will prevent easy changes to the date.
- **Game**: In Challenge Mode, you can now use the up key to move to the last world from World 1, and the down key to move to World 1 from the last world.
- **Game**: In Free Mode, replay files that include stage data can no longer be loaded. In previous versions, an error message "File is corrupted" would appear if you tried to load a replay file. In this version, replay files will no longer even appear in the stage selection screen in Free Mode.
- **Other**: Added sections for "Controls" and "Replays" in the bundled "Readme2.txt" file. This might be useful for editing during distribution.
- **Other**: Updated the bundled "Game Distribution Guide.html" and the online help in the options menu with the following technique:

>  If you want to change the default settings when distributing the game, don't delete the entire "user_data" folder. Instead, change the default settings in the options, and then delete all files except "Option.dat" in the "user_data" folder (and distribute that).

- **Other**: Made slight updates to the bundled "System.ini."
- **Other**: Made small updates.

With this update, I have added "Replays" to the online help. The section on "Replays may not always be faithfully recreated" is not related to this update but has been added as it was previously not well explained. I apologize for the delay.

If you upgrade from an older version, the newly added options like "Auto Save Replay," "Replay Playback Order," and "Auto Progress Message Seconds for Replay" will not be visible, and the setting "Use the Explorer-style file selection dialog for Free Mode and Replay Mode file selection, and Manual Replay Saving" will be enabled (though this is not recommended). Other settings have been kept as close to the previous version's behavior as possible. If you'd like to use the newly implemented features, you'll need to change the settings from "Project" > "System" in the main menu.

### v9.30 2019/4/15
This version has transitioned from beta to the stable (official) version.

- **Game**: Fixed a bug where the file selection dialog displayed during Free Mode, Replay Mode, or when saving replays would freeze the application if file operations like delete or copy-paste were performed.
- **Other**: Updated the environment settings file "System.ini" to explain why fullscreen mode (WindowMode=0) is not recommended. The main reason is that if the file selection dialog appears in Free Mode, Replay Mode, or during replay saving, switching applications with Alt+Tab may cause the app to not recover correctly.
- **Other**: Fixed minor issues.

I’ve noticed that many games disable the replay feature, and I think the first bug (freezing due to file operations) may have been the cause. Even though I’ve captured countless replays myself, I was slow to notice it. I apologize for any inconvenience caused, and I suggest that any games with the replay feature enabled should be updated to this version or have the replay feature disabled.


### v9.22β 2019/4/12
- **Game & Editor**: Fixed a bug in versions 9.20β and 9.21β where the game would crash immediately after saving a replay. Additionally, crashes that may have occurred outside of saving a replay have also been fixed.


### v9.21β 2019/4/2
- **Editor**: Fixed a bug in version 9.20β where the game would quit when completing a stage during solo stage test play.


### v9.20β 2019/4/1
- **Game**: Added "Auto Save" to the "Stage Clear" command.

  **Explanation from Help:**
  - With this option checked, you can save progress midway through a world composed of multiple stages. To use this, the "Auto Save ON" setting must be enabled in the Story Mode world map menu.
  - **Note**: If you try to resume from a later stage (Stage 2 and beyond) and the relevant files are deleted or renamed, the game will fail to load the stage, and progression through the world will be impossible. You also won’t be able to return to the world map. Be careful not to delete or rename stage files, especially if you are updating a game that has already been published online.

- **Game**: Added a system setting to Story Mode for "Auto Save After Each Stage Clear in Multi-Stage Worlds." When checked, auto-saving occurs after clearing any stage in the game, overriding the "Auto Save" setting in the "Stage Clear" command.

- **Game**: Marked "Return to Title" as not recommended in the world map event "Game Clear." The reason is that returning to the title prevents saving, and if auto-save is enabled for multi-stage worlds, this could result in being unable to return to the world map.

- **Game**: Fixed a bug where the exit confirmation dialog appeared even when the game ended due to an exception error.

- **Editor**: Added an auto-backup feature for "Edit Data" (the "data" and "e_data" folders). Backups are only created if data loading is successful after launching the editor. Backup settings can be adjusted in the main menu under "Project" > "Project Options."

- **Other**: Added two backup folders to the "Files to Remove Before Redistribution" section in "Secondary Distribution.html."

- **Other**: Renamed "Secondary Distribution.html" to "Game Distribution.html" for better clarity.

- **Other**: Fixed minor issues.

This update deals with game save data, and since bugs related to save data can cause major issues, I decided to release this as a beta version. While not too complex, we planned for the worst-case scenario.

### v9.14 2018/12/9
- **Editor**: Added clarification in the "Sound Effects" database about unsupported Wave file extensions and compression formats.

  **Explanation from Online Help**:
  - The editor supports only non-compressed PCM Wave files, not extended formats like ADPCM. If the game does not play a sound, simply convert the file format. Free software like "Audacity" can easily convert the file by importing it and saving it as a valid, non-compressed PCM Wave file.

