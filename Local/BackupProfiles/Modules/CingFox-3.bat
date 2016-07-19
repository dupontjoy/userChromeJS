::2016.07.15

:pcxFirefox
::複製PcxFirefox主程序
cls

::从批处理所在位置到Mozilla Firefox文件夹，共跨了5层
set BackDir=..\..\..\..\..

::清理Firefox文件下的tmp文件
del /s /q %BackDir%\firefox\*.tmp

::複製firefox到臨時文件夾
xcopy "%BackDir%\firefox" %TempFolder%\firefox\  /s /y /i

::解压便携模块tmemutil.ini到firefox主程序文件夹
%zip% x %TempFolder%\Software\run\portable.7z -o%TempFolder%\firefox /s /y /i

:CingFox-2
::需要刪除的项
del %TempFolder%\Software\GFW\goagent\  /s /q
del %TempFolder%\Software\GFW\IP-Update\  /s /q
del %TempFolder%\Software\GFW\Shadowsocks\  /s /q
del %TempFolder%\Software\GFW\psiphon\psiphon3.exe.orig  /s /q
del %TempFolder%\Profiles\iMacros\  /s /q
del %TempFolder%\Profiles\bookmarks.html  /s /q
del %TempFolder%\Profiles\prefs.js  /s /q
del %TempFolder%\Profiles\chrome\SubScript\SougouDeskPic.uc.js  /s /q

::給套一個主文件夾CingFox
xcopy "%TempFolder%\firefox" %TempFolder%\CingFox\firefox\ /s /y /i
xcopy "%TempFolder%\Profiles" %TempFolder%\CingFox\Profiles\ /s /y /i
xcopy "%TempFolder%\Plugins" %TempFolder%\CingFox\Plugins\ /s /y /i
xcopy "%TempFolder%\Software" %TempFolder%\CingFox\Software\ /s /y /i

::完整日期和時間
set tm1=%time:~0,2%
set tm2=%time:~3,2%
set tm3=%time:~6,2%
set tm4=%time:~0,8%
set da1=%date:~0,4%
set da2=%date:~5,2%
set da3=%date:~8,2%
::輸出文件名
set Name=CingFox_%ver%_%da1%%da2%%da3%-%tm1%%tm2%%tm3%.7z

::小時數小于10点時的修正
set /a tm1=%time:~0,2%*1
if %tm1% LSS 10 set tm1=0%tm1%
::輸出文件名
set Name=CingFox_%ver%_%da1%%da2%%da3%-%tm1%%tm2%%tm3%.7z
set Name1=Profiles_%ver%_%da1%%da2%%da3%-%tm1%%tm2%%tm3%.7z

rem 開始備份
::-mx9极限压缩 -mhc开启档案文件头压缩 -r递归到所有的子目录
%zip% -mx9 -mhc -r u -up1q3r2x2y2z2w2 %TargetFolder%\%Name% "%TempFolder%\CingFox\"
%zip% -mx9 -mhc -r u -up1q3r2x2y2z2w2 %TargetFolder%\%Name1% "%TempFolder%\CingFox\Profiles\"

::清空TargetFolder2文件夹下的所有文件, 但保留TargetFolder2文件夹
::del /s /f /q %TargetFolder2%
move %TargetFolder%\%Name% %TargetFolder2%\
move %TargetFolder%\%Name1% %TargetFolder2%\

@echo 備份完成！并刪除臨時文件夾！
rd "%TempFolder%" /s/q
