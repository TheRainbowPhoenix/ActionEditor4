---
title: How to Make it English-friendly? | Action Editor 4 Help | Support | Omoshiro Game Shrine
h1: How to Make it English-friendly?
description: Online help for the action game creation software "Action Editor 4". "How to Make it English-friendly?" is a page within "Omoshiro Game Shrine".
layout: /src/layouts/Base.astro
breadcrumb:
- name: Support
  url: /menu_support/
- name: Action Editor 4 Help
  url: /menu_support/actioneditor4_help/
- name: How to Make it English-friendly?
  url: /menu_support/actioneditor4_help/english/
keywords: 
- Help
- Action Game
- Action Editor
- Creation Software
- Tool
- Fun
- Free
- Game
- Online
---

<a name="TOP"></a>

## How to Make it English-friendly?

This section explains the steps to make games created with Action Editor 4 compatible with English-speaking regions.  
Since Action Editor 4's program does not support Unicode character encoding, there are a few rules that must be followed.  
  
First, all characters used in the game in the editor must be half-width alphanumeric characters or half-width symbols.  
Since full-width characters and half-width Katakana cannot generally be handled correctly by overseas OSes, **do not use full-width characters or half-width Katakana.**  
If "Support symbol image display" is checked in the system settings, lowercase alphabets will be replaced by symbol images. If this is an issue, uncheck this option or use only uppercase alphabets.  
  
**Next, set "English=1" in the environment configuration file "System.ini".**  
This will change texts that cannot be modified in the editor (mainly dialog texts) to English.  
(However, some very limited texts, such as error messages, will remain in Japanese.)  
  
Furthermore, it's advisable to set the **"Font" in the editor's system settings to something like "Tahoma", which is the standard font for English Windows, instead of the default "MS P Gothic".**  
The font "MS P Gothic" is probably not standard on overseas computers (this doesn't cause garbled text, but rather it's replaced by "Tahoma" or similar).  
  
Now, it should be compatible with English-speaking regions.  
  
Finally, since you are distributing to English-speaking regions, you would want to confirm operation in an English-speaking environment.  
Even though it's an English-speaking environment, the hardware is mostly the same as in Japan, so it should work if it runs on an English-speaking OS (or with its settings).  
Therefore, set your Japanese OS to the same settings as an English-speaking OS.  
To do this, **for Windows 7, go to Control Panel > "Clock, Language, and Region" > "Region and Language" > "Administrative" tab, and click the "Change system locale" button within the "Language for non-Unicode programs" frame. Here, select "English (United States)" or similar.**  
*This setting may not be changeable depending on the Windows type or edition. Confirmed operation on Windows XP Professional and Windows 7 Professional.  
If no garbled characters or other issues occur with this setting, it should be fine to distribute it as an English-speaking game.  
**※If the launch path (absolute path of the game program) contains full-width characters, it will crash. For example, if it's placed on the "Desktop" or if the game program (exe) filename uses full-width characters, it cannot be launched. It's best to copy the file directly under the C drive or similar and test it.**  

[Back to top of page](#TOP)

---

  
[To Help Table of Contents](..)