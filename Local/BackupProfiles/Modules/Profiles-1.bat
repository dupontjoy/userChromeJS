::2016.02.09

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
::清理Cache文件夹
rd /s /q %BackDir%\..\Cache\
::清理Firefox文件下的tmp文件
del /s /q %BackDir%\..\firefox\*.tmp

rem 复制目标文件到臨時文件夾

::以下是文件夾
xcopy "%BackDir%\adblockplus" %TempFolder%\Profiles\adblockplus\  /s /y /i
xcopy "%BackDir%\autoproxy" %TempFolder%\Profiles\autoproxy\  /s /y /i
xcopy "%BackDir%\chrome" %TempFolder%\Profiles\chrome\  /s /y /i
xcopy "%BackDir%\extensions" %TempFolder%\Profiles\extensions\ /s /y /i
xcopy "%BackDir%\gm_scripts" %TempFolder%\Profiles\gm_scripts\ /s /y /i
::browser-extension-data：Redirector擴展的數據文件
xcopy "%BackDir%\browser-extension-data" %TempFolder%\Profiles\browser-extension-data\ /s /y /i
xcopy "%BackDir%\iMacros" %TempFolder%\Profiles\iMacros\ /s /y /i

::以下是文件
xcopy "%BackDir%\bookmarks.html" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\cert8.db" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\FlashGot.exe" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\mimeTypes.rdf" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\permissions.sqlite" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\persdict.dat" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\pluginreg.dat" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\Portable.7z" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\stylish.sqlite" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\user.js" %TempFolder%\Profiles\ /y
xcopy "%BackDir%\xulstore.json" %TempFolder%\Profiles\ /y

::其它刪除项
del %TempFolder%\Profiles\chrome\UserScriptLoader\require\  /s /q
del %TempFolder%\Profiles\extensions\userChromeJS@mozdev.org\content\myNewTab\bingImg\  /s /q

::刪除Lastpass的一些项目
::（一）精简Platform
del %TempFolder%\Profiles\extensions\support@lastpass.com\platform\  /s /q
xcopy "%BackDir%\extensions\support@lastpass.com\platform\WINNT_x86_64-msvc" %TempFolder%\Profiles\extensions\support@lastpass.com\platform\WINNT_x86_64-msvc\ /s /y /i
::（二）精简lastpass.jar中的语言
%zip% x %TempFolder%\Profiles\extensions\support@lastpass.com\chrome\lastpass.jar -o%TempFolder1%\lastpass
del %TempFolder%\Profiles\extensions\support@lastpass.com\chrome\lastpass.jar  /s /q
xcopy "%TempFolder1%\lastpass\locale\en-US" %TempFolder2%\lastpass\locale\en-US\ /s /y /i
xcopy "%TempFolder1%\lastpass\locale\zh-CN" %TempFolder2%\lastpass\locale\zh-CN\ /s /y /i
xcopy "%TempFolder1%\lastpass\locale\zh-TW" %TempFolder2%\lastpass\locale\zh-TW\ /s /y /i
%zip% a -tzip -mx9 "%TempFolder1%\lastpass.jar" "%TempFolder1%\lastpass\content\" "%TempFolder1%\lastpass\icons\" "%TempFolder1%\lastpass\META-INF\" "%TempFolder1%\lastpass\skin\" "%TempFolder2%\lastpass\locale\"
xcopy "%TempFolder1%\lastpass.jar" %TempFolder%\Profiles\extensions\support@lastpass.com\chrome\ /s /y /i

::刪除Inspector的语言
del %TempFolder%\Profiles\extensions\inspector@mozilla.org\chrome\inspector\locale\  /s /q
xcopy "%BackDir%\extensions\inspector@mozilla.org\chrome\inspector\locale\en-US" %TempFolder%\Profiles\extensions\inspector@mozilla.org\chrome\inspector\locale\en-US\ /s /y /i

::刪除FlashGot語言
%zip% x %TempFolder%\Profiles\extensions\{19503e42-ca3c-4c27-b1e2-9cdb2170ee34}.xpi -o%TempFolder1%\flashgot
del %TempFolder%\Profiles\extensions\{19503e42-ca3c-4c27-b1e2-9cdb2170ee34}.xpi  /s /q
%zip% x %TempFolder1%\flashgot\chrome\flashgot.jar -o%TempFolder2%\flashgot
del %TempFolder1%\flashgot\chrome\flashgot.jar  /s /q
xcopy "%TempFolder2%\flashgot\locale\en-US" %TempFolder3%\flashgot\locale\en-US\ /s /y /i
xcopy "%TempFolder2%\flashgot\locale\zh-CN" %TempFolder3%\flashgot\locale\zh-CN\ /s /y /i
xcopy "%TempFolder2%\flashgot\locale\zh-TW" %TempFolder3%\flashgot\locale\zh-TW\ /s /y /i
%zip% a -tzip -mx9 "%TempFolder2%\flashgot.jar" "%TempFolder2%\flashgot\content\" "%TempFolder2%\flashgot\skin\" "%TempFolder3%\flashgot\locale\"
xcopy "%TempFolder2%\flashgot.jar" %TempFolder1%\flashgot\chrome\ /s /y /i
%zip% a -tzip -mx9 "%TempFolder1%\{19503e42-ca3c-4c27-b1e2-9cdb2170ee34}.xpi" "%TempFolder1%\flashgot\chrome\" "%TempFolder1%\flashgot\components\" "%TempFolder1%\flashgot\defaults\" "%TempFolder1%\flashgot\META-INF\" "%TempFolder1%\flashgot\chrome.manifest" "%TempFolder1%\flashgot\install.js" "%TempFolder1%\flashgot\install.rdf"
xcopy "%TempFolder1%\{19503e42-ca3c-4c27-b1e2-9cdb2170ee34}.xpi" %TempFolder%\Profiles\extensions\ /s /y /i

::刪除Stylish語言
%zip% x %TempFolder%\Profiles\extensions\{46551EC9-40F0-4e47-8E18-8E5CF550CFB8}.xpi -o%TempFolder1%\stylish
del %TempFolder%\Profiles\extensions\{46551EC9-40F0-4e47-8E18-8E5CF550CFB8}.xpi  /s /q
xcopy "%TempFolder1%\stylish\locale\en-US" %TempFolder2%\stylish\locale\en-US\ /s /y /i
xcopy "%TempFolder1%\stylish\locale\zh-CN" %TempFolder2%\stylish\locale\zh-CN\ /s /y /i
xcopy "%TempFolder1%\stylish\locale\zh-TW" %TempFolder2%\stylish\locale\zh-TW\ /s /y /i
%zip% a -tzip -mx9 "%TempFolder1%\{46551EC9-40F0-4e47-8E18-8E5CF550CFB8}.xpi" "%TempFolder1%\stylish\components\" "%TempFolder1%\stylish\content\" "%TempFolder1%\stylish\defaults\" "%TempFolder1%\stylish\idl\" "%TempFolder1%\stylish\META-INF\" "%TempFolder1%\stylish\skin\" "%TempFolder1%\stylish\chrome.manifest" "%TempFolder1%\stylish\generate_xpt" "%TempFolder1%\stylish\install.rdf" "%TempFolder2%\stylish\locale\"
xcopy "%TempFolder1%\{46551EC9-40F0-4e47-8E18-8E5CF550CFB8}.xpi" %TempFolder%\Profiles\extensions\ /s /y /i

::刪除ABP語言
%zip% x %TempFolder%\Profiles\extensions\{d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d}.xpi -o%TempFolder1%\abp
del %TempFolder%\Profiles\extensions\{d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d}.xpi  /s /q
xcopy "%TempFolder1%\abp\chrome\locale\en-US" %TempFolder2%\abp\chrome\locale\en-US\ /s /y /i
xcopy "%TempFolder1%\abp\chrome\locale\zh-CN" %TempFolder2%\abp\chrome\locale\zh-CN\ /s /y /i
xcopy "%TempFolder1%\abp\chrome\locale\zh-TW" %TempFolder2%\abp\chrome\locale\zh-TW\ /s /y /i
del "%TempFolder1%\abp\chrome\locale"  /s /q
xcopy "%TempFolder2%\abp\chrome\locale" %TempFolder1%\abp\chrome\locale\ /s /y /i
%zip% a -tzip -mx9 "%TempFolder1%\{d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d}.xpi" "%TempFolder1%\abp\chrome\" "%TempFolder1%\abp\defaults\" "%TempFolder1%\abp\lib\" "%TempFolder1%\abp\META-INF\" "%TempFolder1%\abp\bootstrap.js" "%TempFolder1%\abp\chrome.manifest" "%TempFolder1%\abp\icon.png" "%TempFolder1%\abp\icon64.png" "%TempFolder1%\abp\install.rdf"
xcopy "%TempFolder1%\{d10d0bf8-f5b5-c8b4-a8b2-2b9879e08c5d}.xpi" %TempFolder%\Profiles\extensions\ /s /y /i

::刪除EHH語言
%zip% x %TempFolder%\Profiles\extensions\elemhidehelper@adblockplus.org.xpi -o%TempFolder1%\ehh
del %TempFolder%\Profiles\extensions\elemhidehelper@adblockplus.org.xpi  /s /q
xcopy "%TempFolder1%\ehh\chrome\locale\en-US" %TempFolder2%\ehh\chrome\locale\en-US\ /s /y /i
xcopy "%TempFolder1%\ehh\chrome\locale\zh-CN" %TempFolder2%\ehh\chrome\locale\zh-CN\ /s /y /i
xcopy "%TempFolder1%\ehh\chrome\locale\zh-TW" %TempFolder2%\ehh\chrome\locale\zh-TW\ /s /y /i
del "%TempFolder1%\ehh\chrome\locale"  /s /q
xcopy "%TempFolder2%\ehh\chrome\locale" %TempFolder1%\ehh\chrome\locale\ /s /y /i
%zip% a -tzip -mx9 "%TempFolder1%\elemhidehelper@adblockplus.org.xpi" "%TempFolder1%\ehh\chrome\" "%TempFolder1%\ehh\defaults\" "%TempFolder1%\ehh\lib\" "%TempFolder1%\ehh\META-INF\" "%TempFolder1%\ehh\bootstrap.js" "%TempFolder1%\ehh\chrome.manifest" "%TempFolder1%\ehh\icon.png" "%TempFolder1%\ehh\icon64.png" "%TempFolder1%\ehh\install.rdf"
xcopy "%TempFolder1%\elemhidehelper@adblockplus.org.xpi" %TempFolder%\Profiles\extensions\ /s /y /i

::刪除Greasemonkey語言
%zip% x %TempFolder%\Profiles\extensions\{e4a8a97b-f2ed-450b-b12d-ee082ba24781}.xpi -o%TempFolder1%\gm
del %TempFolder%\Profiles\extensions\{e4a8a97b-f2ed-450b-b12d-ee082ba24781}.xpi  /s /q
xcopy "%TempFolder1%\gm\locale\en-US" %TempFolder2%\gm\locale\en-US\ /s /y /i
xcopy "%TempFolder1%\gm\locale\zh-CN" %TempFolder2%\gm\locale\zh-CN\ /s /y /i
xcopy "%TempFolder1%\gm\locale\zh-TW" %TempFolder2%\gm\locale\zh-TW\ /s /y /i
%zip% a -tzip -mx9 "%TempFolder1%\{e4a8a97b-f2ed-450b-b12d-ee082ba24781}.xpi" "%TempFolder1%\gm\components\" "%TempFolder1%\gm\content\" "%TempFolder1%\gm\defaults\" "%TempFolder1%\gm\META-INF\" "%TempFolder1%\gm\modules\" "%TempFolder1%\gm\skin\" "%TempFolder1%\gm\chrome.manifest" "%TempFolder1%\gm\CREDITS" "%TempFolder1%\gm\install.rdf" "%TempFolder1%\gm\LICENSE.bsd" "%TempFolder1%\gm\LICENSE.mit" "%TempFolder1%\gm\LICENSE.mpl" "%TempFolder2%\gm\locale\"
xcopy "%TempFolder1%\{e4a8a97b-f2ed-450b-b12d-ee082ba24781}.xpi" %TempFolder%\Profiles\extensions\ /s /y /i

::刪除DownThemAll!語言
%zip% x %TempFolder%\Profiles\extensions\{DDC359D1-844A-42a7-9AA1-88A850A938A8}.xpi -o%TempFolder1%\DTA
del %TempFolder%\Profiles\extensions\{DDC359D1-844A-42a7-9AA1-88A850A938A8}.xpi  /s /q
%zip% x %TempFolder1%\DTA\chrome\chrome.jar -o%TempFolder2%\DTA
del %TempFolder1%\DTA\chrome\chrome.jar  /s /q
xcopy "%TempFolder2%\DTA\locale\en-US" %TempFolder3%\DTA\locale\en-US\ /s /y /i
xcopy "%TempFolder2%\DTA\locale\zh-CN" %TempFolder3%\DTA\locale\zh-CN\ /s /y /i
xcopy "%TempFolder2%\DTA\locale\zh-TW" %TempFolder3%\DTA\locale\zh-TW\ /s /y /i
%zip% a -tzip -mx9 "%TempFolder2%\chrome.jar" "%TempFolder2%\DTA\content\" "%TempFolder3%\DTA\locale\"  "%TempFolder2%\DTA\public\"  "%TempFolder2%\DTA\skin\"
xcopy "%TempFolder2%\chrome.jar" %TempFolder1%\DTA\chrome\ /s /y /i
%zip% a -tzip -mx9 "%TempFolder1%\{DDC359D1-844A-42a7-9AA1-88A850A938A8}.xpi" "%TempFolder1%\DTA\chrome\" "%TempFolder1%\DTA\components\" "%TempFolder1%\DTA\defaults\" "%TempFolder1%\DTA\interfaces\" "%TempFolder1%\DTA\META-INF\" "%TempFolder1%\DTA\modules\" "%TempFolder1%\DTA\chrome.manifest" "%TempFolder1%\DTA\GPL" "%TempFolder1%\DTA\icon.png" "%TempFolder1%\DTA\install.rdf" "%TempFolder1%\DTA\LGPL" "%TempFolder1%\DTA\LICENSE" "%TempFolder1%\DTA\MPL"
xcopy "%TempFolder1%\{DDC359D1-844A-42a7-9AA1-88A850A938A8}.xpi" %TempFolder%\Profiles\extensions\ /s /y /i

::刪除Noscript語言
%zip% x %TempFolder%\Profiles\extensions\{73a6fe31-595d-460b-a920-fcc0f8843232}.xpi -o%TempFolder1%\Noscript
del %TempFolder%\Profiles\extensions\{73a6fe31-595d-460b-a920-fcc0f8843232}.xpi  /s /q
%zip% x %TempFolder1%\Noscript\chrome\noscript.jar -o%TempFolder2%\Noscript
del %TempFolder1%\Noscript\chrome\noscript.jar  /s /q
xcopy "%TempFolder2%\Noscript\locale\en-US" %TempFolder3%\Noscript\locale\en-US\ /s /y /i
xcopy "%TempFolder2%\Noscript\locale\zh-CN" %TempFolder3%\Noscript\locale\zh-CN\ /s /y /i
xcopy "%TempFolder2%\Noscript\locale\zh-TW" %TempFolder3%\Noscript\locale\zh-TW\ /s /y /i
%zip% a -tzip -mx9 "%TempFolder2%\noscript.jar" "%TempFolder2%\Noscript\content\" "%TempFolder3%\Noscript\locale\" "%TempFolder2%\Noscript\skin\"
xcopy "%TempFolder2%\noscript.jar" %TempFolder1%\Noscript\chrome\ /s /y /i
%zip% a -tzip -mx9 "%TempFolder1%\{73a6fe31-595d-460b-a920-fcc0f8843232}.xpi" "%TempFolder1%\Noscript\chrome\" "%TempFolder1%\Noscript\components\" "%TempFolder1%\Noscript\defaults\" "%TempFolder1%\Noscript\META-INF\" "%TempFolder1%\Noscript\chrome.manifest" "%TempFolder1%\Noscript\install.rdf" "%TempFolder1%\Noscript\mozilla.cfg"
xcopy "%TempFolder1%\{73a6fe31-595d-460b-a920-fcc0f8843232}.xpi" %TempFolder%\Profiles\extensions\ /s /y /i


::讀取版本號和日期及時間
::从批处理所在位置到Firefox程序文件夹（firefox），共跨了5层
for /f "usebackq eol=; tokens=1,2 delims==" %%i in ("..\..\..\..\..\Firefox\application.ini")do (if %%i==Version set ver=%%j)
