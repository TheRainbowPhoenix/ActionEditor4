---
title: Unfixable Bugs, aka Specifications
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Unfixable Bugs, aka Specifications
    url: /menu_support/actioneditor4_help/bug/
description: Online help for the action game creation software "Action Editor 4". "Unfixable Bugs, aka Specifications" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## Unfixable Bugs, aka Specifications Table of Contents

Below are unfixable bugs, or rather, specifications, in Action Editor 4.  
They could not be fixed due to the author's lack of ability or effort.  
I apologize.  
  

- [When running in DirectDraw mode with an 8-bit (256-color) screen on Windows 7, the replay file overwrite confirmation dialog is completely black and the text is invisible.](../bug/#SAVEREPLAY_DD)  

## When running in DirectDraw mode with an 8-bit (256-color) screen on Windows 7, the replay file overwrite confirmation dialog is completely black and the text is invisible.

<a name="SAVEREPLAY_DD"></a>

When running in DirectDraw mode with an 8-bit (256-color) screen on Windows 7 (or Windows 7 and later), the confirmation dialog for overwriting replay files appears completely black as shown below, making the text invisible.  
![](/menu_support/actioneditor4_help/bug/SaveDialog.jpg)  
  
From version 9.50, this issue has been resolved due to a change in the UI for manual replay saving (this dialog itself no longer appears). However, if "Use Explorer-style file selection dialog from versions 9.30 and earlier when selecting files in Free Mode and Replay Mode, and when manually saving replays" is checked in the system settings, this bug will still occur.  

[Back to top of page](#TOP)

---

  

[To Next Topic](../english/)

[To Help Table of Contents](../)