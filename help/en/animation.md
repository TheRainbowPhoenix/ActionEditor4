---
title: Character Animation
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Character Animation
    url: /menu_support/actioneditor4_help/animation/
description: Online help for the action game creation software "Action Editor 4". "Character Animation" is a page within "Omoshiro Game Shrine".
---

## Character Animation

● Creating and Setting Animations  
First, create the character's idle and movement animations in the database "Basic Animation Set", and action animations for shots etc. in the database "Animation".  
Then, specify the created data in the character's "Basic Animation Set" or in movement commands, action commands, etc.  

● Notes on Database "Animation" (Animations not in Basic Animation Set)  
When specifying an animation created in the database "Animation" for movement or action commands, **only the single "Frame" checked as "Execute Command" in the database "Animation" will be continuously displayed while the command is executing.**  
**To display frames before "Execute Command", such as preparatory actions like "bracing before firing a shot", you need to set a command (e.g., "Wait") before the relevant command for a duration longer than or equal to the preparatory action time.**  
> For details, refer to ["Project" > "Database" "Animation"](../menu_project_database/#ANIM).  

● When multiple animations are executed simultaneously  
If a movement command, action command, or "Execute Animation" command with animation set is executed simultaneously, all animations are processed in parallel internally by the program.  
However, only one animation (frame) is actually displayed on the screen, following the priority order below.  
  
**1. Animations specified in "Other" of movement commands and action commands (database "Animation")  
　Furthermore, priority order if there are multiple such animations.  
　1-1. Animations during and after command execution. If multiple, prioritize the animation with longer elapsed time since command execution.  
　1-2. Animations before command execution (preparatory actions). If multiple, prioritize the animation with shorter time from current time to command execution.  
　  
2. Animations specified by "Execute Animation" command (database "Animation")  
　If multiple such animations exist, prioritize the one executed first.  
　  
3. "Move Animation" by movement commands (basic animation set)  
  
4. Still Animation (basic animation set)  
**

[Back to top of page](#TOP)

---

  

[To Next Topic](../menu/)

[To Help Table of Contents](../)