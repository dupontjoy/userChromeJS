::Mod 2014.11.09-2

echo off
rem 设置备份路径以及临时文件夹
cd /d %~dp0
set BackDir=..\..\..
set TempFolder=..\..\..\Temp\Profile
 
rem 复制目标文件到临时文件夹
::需要删除的项
del %BackDir%\extensions\userChromeJS@mozdev.org\content\myNewTab\bingImg\  /s /q 
del %BackDir%\chrome\UserScriptLoader\require\  /s /q 
del %BackDir%\chrome\UserScriptLoader\temp\  /s /q

::以下是文件夹
xcopy "%BackDir%\adblockplus" %TempFolder%\adblockplus\  /s /y /i
xcopy "%BackDir%\chrome" %TempFolder%\chrome\  /s /y /i
xcopy "%BackDir%\extensions" %TempFolder%\extensions\ /s /y /i
xcopy "%BackDir%\gm_scripts" %TempFolder%\gm_scripts\ /s /y /i
 
::以下是文件
xcopy "%BackDir%\bookmarks.html" %TempFolder%\ /y
xcopy "%BackDir%\cert8.db" %TempFolder%\ /y
xcopy "%BackDir%\FlashGot.exe" %TempFolder%\ /y
xcopy "%BackDir%\foxyproxy.xml" %TempFolder%\ /y
xcopy "%BackDir%\localstore.rdf" %TempFolder%\ /y
xcopy "%BackDir%\MyFirefox.7z" %TempFolder%\ /y
xcopy "%BackDir%\Portable.7z" %TempFolder%\ /y
xcopy "%BackDir%\prefs.js" %TempFolder%\ /y
xcopy "%BackDir%\readme.txt" %TempFolder%\ /y
xcopy "%BackDir%\user.js" %TempFolder%\ /y


::读取版本号和日期及时间
for /f "usebackq eol=; tokens=1,2 delims==" %%i in ("..\..\..\..\mozilla firefox\application.ini")do (if %%i==Version set ver=%%j)
::set hour=%time:~,2%
::if "%time:~,1%"==" " set hour=0%time:~1,1%
::set backupTime=%date:~0,4%-%date:~5,2%-%date:~8,2%,%hour%-%time:~3,2%-%time:~6,2% 
::设置备份文件路径以及文件名
set ArchiveName=D:\Profile-%date:~0,4%%date:~5,2%%date:~8,2%-%ver%.7z
rem 开始备份
7z.exe u -up1q3r2x2y2z2w2 %ArchiveName% "%TempFolder%"
[url=home.php?mod=space&uid=331734]@echo[/url] 备份完成！删除临时文件夹
rd "%TempFolder%" /s/q

