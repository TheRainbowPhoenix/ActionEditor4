# Aquedi4 Mod Loader

Only with version 1020 !!
Uses ASI and MinHook

## What to copy into the game

Copy the entire `dist` directory into the game folder next to `Game_v1020.exe`.  
After copying, the game folder must contain:
- `d3d9.dll` (the proxy that loads ASI plugins)
- `d3d9Hooked.dll` (the proxy backend)
- `scripts\` directory with your `.asi` files and any dependent DLLs

When the game launches, the loader scans its `scripts\` (later called `GameFolder\scripts\`) and automatically loads every `.asi` module it finds.

## Shipping your own plugins

Write your plugin as a standard Windows DLL and export `DllMain`.  
Rename the compiled DLL to `.asi` and place it in `GameFolder\scripts\`.

If your plugin depends on other DLLs (e.g., MinHook runtime), place those DLLs in the same `scripts` directory next to your `.asi` file.  
Example:
- `scripts\my_feature.asi`
- `scripts\minhook.x32.dll` (if your plugin links against the MinHook DLL variant)

On next launch, the loader will auto-load `my_feature.asi` and hook as configured by your code.

## Demo plugin

`src\dllmain.cpp` is a minimal demo plugin (`asi_minhook_test.asi`) that:
- Installs a proof-of-life hook (TextOutA) to show the loader is working.
- Demonstrates a game RVA hook and a simple “font width swap” tweak.

Build it and copy the generated `.asi` plus any dependent DLLs into `scripts\`.  
Inspect `src\dllmain.cpp` for the exact MinHook setup and the address calculation pattern.

## Recommended workflow

1. Prototype with Frida or a similar dynamic instrumentation tool to quickly test offsets and logic at runtime.
2. Once a hook works reliably, port it into a native ASI plugin with MinHook for performance and stability.
3. Keep reverse-engineering notes on structures, calling conventions, and field offsets to avoid regressions.

## Notes

- This setup assumes a fixed executable (`Game_v1020.exe`) and stable RVAs.
- If the module is not present at plugin load time, use delayed initialization (e.g., wait for the module handle before creating the hook).
- Always test on a copy of the game.
