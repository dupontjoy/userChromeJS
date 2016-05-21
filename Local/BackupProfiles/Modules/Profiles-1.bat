::2016.05.19

:Profiles-1
cls
echo.
echo  需要關閉Firefox程序，請保存必要的資料!
echo.
echo  按任意键继续……
pause>nul
cls

rem 設置備份路徑以及臨時文件夾
@echo 關閉火狐瀏覽器后自動開始備份……
taskkill /im firefox.exe
cd /d %~dp0
::从批处理所在位置到配置文件夹（Profiles），共跨了4层
set BackDir=..\..\..\..

::設置臨時文件夾
set TempFolder1="%TempFolder%\1"
set TempFolder2="%TempFolder%\2"
set TempFolder3="%TempFolder%\3"

::多運行一次防止第一次未能終止
taskkill /im firefox.exe

rem 复制目标文件到臨時文件夾

::以下是文件夾
xcopy "%BackDir%\adblockplus" %TempFolder%\Profiles\adblockplus\  /s /y /i
xcopy "%BackDir%\autoproxy" %TempFolder%\Profiles\autoproxy\  /s /y /i
xcopy "%BackDir%\chrome" %TempFolder%\Profiles\chrome\  /s /y /i
xcopy "%BackDir%\extensions" %TempFolder%\Profiles\extensions\ /s /y /i
xcopy "%BackDir%\fireie" %TempFolder%\Profiles\fireie\ /s /y /i
xcopy "%BackDir%\gm_scripts" %TempFolder%\Profiles\gm_scripts\ /s /y /i
xcopy "%BackDir%\browser-extension-data" %TempFolder%\Profiles\browser-extension-data\ /s /y /i
xcopy "%BackDir%\iMacros" %TempFolder%\Profiles\iMacros\ /s /y /i

::以下是文件
xcopy "%BackDir%\bookmarks.html" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\cert8.db" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\FlashGot.exe" %TempFolder%\Profiles\ /y
::xcopy "%BackDir%\foxyproxy.xml" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\mimeTypes.rdf" %TempFolder%\Profiles\ /y
::xcopy "%BackDir%\patternSubscriptions.json" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\permissions.sqlite" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\persdict.dat" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\pluginreg.dat" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\Portable.7z" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\stylish.sqlite" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\user.js" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\prefs.js" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\xulstore.json" %TempFolder%\Profiles\ /y

::其它刪除项
del %TempFolder%\Profiles\chrome\UserScriptLoader\require\  /s /q
del %TempFolder%\Profiles\extensions\userChromeJS@mozdev.org\content\myNewTab\bingImg\  /s /q

::刪除Lastpass的一些项目
::精简Platform
del %TempFolder%\Profiles\extensions\support@lastpass.com\platform\  /s /q
xcopy "%BackDir%\extensions\support@lastpass.com\platform\WINNT_x86_64-msvc" %TempFolder%\Profiles\extensions\support@lastpass.com\platform\WINNT_x86_64-msvc\ /s /y /i


::讀取版本號和日期及時間
::从批处理所在位置到Firefox程序文件夹（firefox），共跨了5层
for /f "usebackq eol=; tokens=1,2 delims==" %%i in ("..\..\..\..\..\Firefox\application.ini")do (if %%i==Version set ver=%%j)
