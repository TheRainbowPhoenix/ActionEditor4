@echo off
setlocal

set ROOT=%~dp0..\..
pushd "%ROOT%"

set VCTK=C:\Program Files (x86)\Microsoft Visual C++ Toolkit 2003
set WIN81=C:\Program Files (x86)\Windows Kits\8.1
set OUT=work_aquedi\cpp_experiments

"%VCTK%\bin\cl.exe" /nologo /W3 /Od /GX /ML /GA ^
  /I "%VCTK%\include" ^
  /I "%WIN81%\Include\um" ^
  /I "%WIN81%\Include\shared" ^
  /Fo"%OUT%\winmain_probe.obj" ^
  "%OUT%\winmain_probe.cpp" ^
  /link /nologo /SUBSYSTEM:WINDOWS ^
  /LIBPATH:"%VCTK%\lib" ^
  /LIBPATH:"%WIN81%\Lib\winv6.3\um\x86" ^
  /OUT:"%OUT%\winmain_probe.exe" ^
  user32.lib kernel32.lib gdi32.lib d3d9.lib

set RC=%ERRORLEVEL%
popd
exit /b %RC%
