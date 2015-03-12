::2015.03.12
::Mod 2015.01.26搞定了时间问题

echo off
rem 设置备份路径以及临时文件夹
taskkill /im firefox.exe
@echo 关闭火狐浏览器后自动开始备份……
cd /d %~dp0
set BackDir=..\..\..
set TempFolder=..\..\..\Temp\Profile

rem 复制目标文件到临时文件夹
::需要删除的项
del %BackDir%\chrome\UserScriptLoader\require\  /s /q 

::以下是文件夹
xcopy "%BackDir%\adblockplus" %TempFolder%\adblockplus\  /s /y /i
xcopy "%BackDir%\chrome" %TempFolder%\chrome\  /s /y /i
xcopy "%BackDir%\extensions" %TempFolder%\extensions\ /s /y /i
xcopy "%BackDir%\extension-data" %TempFolder%\extension-data\ /s /y /i
xcopy "%BackDir%\gm_scripts" %TempFolder%\gm_scripts\ /s /y /i
xcopy "%BackDir%\Plugins" %TempFolder%\Plugins\ /s /y /i
 
::以下是文件
xcopy "%BackDir%\bookmarks.html" %TempFolder%\ /y
xcopy "%BackDir%\cert8.db" %TempFolder%\ /y
xcopy "%BackDir%\FlashGot.exe" %TempFolder%\ /y
xcopy "%BackDir%\foxyproxy.xml" %TempFolder%\ /y
xcopy "%BackDir%\localstore.rdf" %TempFolder%\ /y
xcopy "%BackDir%\MyFirefox.7z" %TempFolder%\ /y
xcopy "%BackDir%\persdict.dat" %TempFolder%\ /y
xcopy "%BackDir%\Portable.7z" %TempFolder%\ /y
xcopy "%BackDir%\readme.txt" %TempFolder%\ /y
xcopy "%BackDir%\user.js" %TempFolder%\ /y


::读取版本号和日期及时间
for /f "usebackq eol=; tokens=1,2 delims==" %%i in ("..\..\..\..\Firefox\application.ini")do (if %%i==Version set ver=%%j)
::设置备份文件路径以及文件名

::完整日期和时间
set tm1=%time:~0,2%
set tm2=%time:~3,2%
set tm3=%time:~6,2%
set tm4=%time:~0,8%
set da1=%date:~0,4%
set da2=%date:~5,2%
set da3=%date:~8,2%
set ArchiveName=D:\Profile_%da1%%da2%%da3%-%tm1%%tm2%%tm3%_%ver%.7z

::小时数小于10点时的修正
set /a tm1=%time:~0,2%*1
if %tm1% LSS 10 set tm1=0%tm1%
set ArchiveName=D:\Profile_%da1%%da2%%da3%-%tm1%%tm2%%tm3%_%ver%.7z

rem 开始备份
7z.exe u -up1q3r2x2y2z2w2 %ArchiveName% "%TempFolder%"
@echo 备份完成！删除临时文件夹
rd "%TempFolder%" /s/q
