:Plugins&Software-1
cls

rem 設置備份路徑以及臨時文件夾
cd /d %~dp0
::从批处理所在位置到Plugins和Software文件夾，跨了5层
set BackDir2=..\..\..\..\..\

rem 复制目标文件到臨時文件夾

::以下是文件夾
::Plugins：外置便携插件
xcopy "%BackDir2%\Plugins" %TempFolder%\Plugins\  /s /y /i
::Software：常用軟件
xcopy "%BackDir2%\Software" %TempFolder%\Software\  /s /y /i

::需要刪除的项
del %TempFolder%\Plugins\sumatrapdfcache\  /s /q 
del %TempFolder%\Software\GFW\psiphon\psiphon3.exe.orig  /s /q 
del %TempFolder%\Software\GFW\GoGoTester\gogo_cache  /s /q 