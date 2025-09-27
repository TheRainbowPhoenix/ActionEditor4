---
title: About Packaging (How to Use Enigma Virtual Box)
layout: /src/layouts/Base.astro
breadcrumb:
  - name: Support
    url: /menu_support/
  - name: Action Editor 4 Help
    url: /menu_support/actioneditor4_help/
  - name: About Packaging (How to Use Enigma Virtual Box)
    url: /menu_support/actioneditor4_help/packaging/
description: Online help for the action game creation software "Action Editor 4". "About Packaging (How to Use Enigma Virtual Box)" is a page within "Omoshiro Game Shrine".
---

<a name="TOP"></a>

## About Packaging (How to Use Enigma Virtual Box) Table of Contents

This section introduces how to package assets such as image files using free software called "Enigma Virtual Box."  
The packaging described here embeds and hides assets used in the game, such as image files (.bmp) and audio files (.wav), within the game program file "Game_v*.exe."  
This eliminates concerns about image files and others being directly viewed.  

*The version of "Enigma Virtual Box" used here is 9.30, the latest version as of September 2019. Procedures and button layouts may change with updates.  

- [Installing "Enigma Virtual Box"](#EVB_INSTALL)
- [Packaging Steps](#PACKAGING)

<a name="EVB_INSTALL"></a>

## Installing "Enigma Virtual Box"

Download the free software "Enigma Virtual Box" from the following site.  
[http://enigmaprotector.com/en/downloads.html](http://enigmaprotector.com/en/downloads.html)  

Run the downloaded file (enigmavb.exe) and follow the setup wizard to install.  
It's in English, but I don't think there will be any particular difficulties.  

[Back to top of page](#TOP)

<a name="PACKAGING"></a>

## Packaging Steps

#### 1. Create a game folder for distribution

As preparation, copy and paste the game folder to create two.  
Keep one as a development game folder, and make the other the distribution game folder.  
The name of the distribution folder can be anything, but here we will call it "Release".  
If packaging doesn't go well, copy and paste the development game folder again and start over.  

#### 2. Create a folder to consolidate files for packaging

Create a new empty folder at the same level as the two game folders.  
This folder will consolidate the files to be packaged.  
The folder name can be anything, but here we will call it "Packaging".  

[![](/menu_support/actioneditor4_help/packaging/02.jpg)](/menu_support/actioneditor4_help/packaging/02.jpg)

#### 3. Consolidate files for packaging

Move the files and folders to be packaged from the "Release" folder to the "Packaging" folder.  

Folders to package: bgm, bmp, wave, data  
Files to package: Vox.dll, GuruGuruSMF4.dll  

Leave items that are not to be packaged in the "Release" folder, and only move items to be packaged into the "Packaging" folder.  
*The "user_data" folder is not subject to packaging. Packaging the "user_data" folder will prevent saving in the game.  

[![](/menu_support/actioneditor4_help/packaging/03.jpg)](/menu_support/actioneditor4_help/packaging/03.jpg)

#### 4. Launch "Enigma Virtual Box"

Preparation is complete, so let's start packaging.  
First, launch "Enigma Virtual Box".  

#### 5. Specify the game program file before packaging

In the "Enter Input File Name:" field, specify the game program file (Game_v*.exe) from the "Release" folder.  
You can easily specify the file (Game_v*.exe) by dragging and dropping it.  

[![](/menu_support/actioneditor4_help/packaging/05.png)](/menu_support/actioneditor4_help/packaging/05.png)

#### 6. Specify the game program file after packaging

In the "Enter Output File Name:" field, enter the game program file (save destination) after packaging.  
The file name can be anything as long as it's not the same as the game program file before packaging.  

[![](/menu_support/actioneditor4_help/packaging/06.png)](/menu_support/actioneditor4_help/packaging/06.png)

#### 7. Add folders to be packaged

Click the "Add" button at the bottom of the window to open a menu, then select "Add Folder Recursive" from it.  

[![](/menu_support/actioneditor4_help/packaging/07-1.png)](/menu_support/actioneditor4_help/packaging/07-1.png)

A dialog for selecting a folder will appear, so select the "Packaging" folder, which is the target for packaging, and click the "OK" button.  

[![](/menu_support/actioneditor4_help/packaging/07-2.png)](/menu_support/actioneditor4_help/packaging/07-2.png)

Another dialog will appear, so click the "OK" button without making any changes.  

[![](/menu_support/actioneditor4_help/packaging/07-3.png)](/menu_support/actioneditor4_help/packaging/07-3.png)

#### 8. Execute packaging

Click the "Process" button to execute packaging.  

[![](/menu_support/actioneditor4_help/packaging/08-1.png)](/menu_support/actioneditor4_help/packaging/08-1.png)

If the last line of the dialog that appears during packaging execution says "File successfully save to ~", then it's a success.  
Close the dialog with "Close".  

[![](/menu_support/actioneditor4_help/packaging/08-2.png)](/menu_support/actioneditor4_help/packaging/08-2.png)

#### 9. Move the packaged file to the distribution game folder

The created file is saved in the location specified by "Enter Output File Name:", so move it to the "Release" folder.  
If you specified the "Release" folder as the save destination in "Enter Output File Name:", there's no need to move it.  

[![](/menu_support/actioneditor4_help/packaging/09.jpg)](/menu_support/actioneditor4_help/packaging/09.jpg)

#### 10. Operation check

Finally, test if the packaged game operates normally.  
Also test if game data can be saved properly (important).  
If there are no problems, the game program file before packaging and the "Packaging" folder are no longer needed, so delete them.  

This concludes the packaging explanation.  
Thank you for your hard work!  

[Back to top of page](#TOP)

---

  

[To Next Topic](/en/menu_support/actioneditor4_help/bug/)

[To Help Table of Contents](/en/menu_support/actioneditor4_help/)