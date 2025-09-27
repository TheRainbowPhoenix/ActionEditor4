---
title: Other > Bitmap Conversion Tool
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: Other > Bitmap Conversion Tool
    url: /menu_support/actioneditor4_help/menu_others_bmpconvert/
description: Online help for the action game creation software "Action Editor 4". "Other > Bitmap Conversion Tool" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## "Other" > "Bitmap Conversion Tool"

Bitmap Conversion Tool  
![](/menu_support/actioneditor4_help/menu_others_bmpconvert/BmpConvert.jpg)  
  
The Bitmap Conversion Tool allows you to convert any bitmap into a bitmap usable by Action Editor 4.  
**However, this "conversion" merely involves finding the closest color from Action Editor 4's dedicated color palette (※) for each dot and replacing the color, so satisfactory results are often not achieved...**  
*Strictly speaking, from color numbers 0 and 16-207 in "Palette2.bmp" located in the "bmp" > "plt" folder.  
  
Note that if you set "Bitmap Color Depth" to "16.77 million colors (24bit) without color palette" in the system settings, the game's graphics will no longer depend on a color palette, so this conversion process is not necessary.  
  
Now for the conversion procedure: First, specify one or more bitmaps in the listbox on the left side of the window using the "Add to List" button or drag-and-drop.  
Next, on the right side of the window, perform the necessary settings for conversion.  
The contents are as follows:  
  
● Input side (before conversion) transparency color  
The transparency color (background color) on the input side.  
If this is incorrect, the conversion will not be successful either.  
  
● Line color replacement  
Line color (outline) replacement settings.  
Since Action Editor 4's line colors (colors not changed by the game's "Color" option) are color numbers 10-15, it's recommended that output line colors be 10-15.  
If you don't mind the line (outline) color changing with "Color", or if you completely ignore "Color", it's a good idea to uncheck "Replace line color".  
In the first place, "Color" only functions in DirectDraw mode with an 8bit (256 color) screen, so I think **it's fine to ignore it.**  
  
● Output path  
The save destination path.  
  
  
Finally, click the "Convert" button, and if the conversion complete message appears, the conversion is finished.  

[Back to top of page](#TOP)

---

  

[To Next Topic](../worldmapchip/)

[To Help Table of Contents](../)