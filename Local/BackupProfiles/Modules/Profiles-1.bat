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
cd /d %~dp0
::从批处理所在位置到配置文件夹（Profiles），共跨了4层
set BackDir=..\..\..\..
set TempFolder=..\..\..\..\Temp
set TempFolder1=..\..\..\..\Temp\1
set TempFolder2=..\..\..\..\Temp\2
set TempFolder3=..\..\..\..\Temp\3

::備份輸出地址
set TargetFolder="D:\My Documents\Baiduyun\Firefox\Profiles"

taskkill /im firefox.exe

rem 复制目标文件到臨時文件夾

::以下是文件夾
::adblockplus：ABP規則備份。
::xcopy "%BackDir%\adblockplus" %TempFolder%\Profiles\adblockplus\  /s /y /i
::autoproxy：Autoproxy規則備份。
xcopy "%BackDir%\autoproxy" %TempFolder%\Profiles\autoproxy\  /s /y /i
::browser-extension-data：Redirector擴展的數據文件
xcopy "%BackDir%\browser-extension-data" %TempFolder%\Profiles\browser-extension-data\ /s /y /i
::chrome：UC腳本。
xcopy "%BackDir%\chrome" %TempFolder%\Profiles\chrome\  /s /y /i
::extensions：安裝的擴展。
xcopy "%BackDir%\extensions" %TempFolder%\Profiles\extensions\ /s /y /i
::extension-data：uBlock的數據文件，包含設置。
xcopy "%BackDir%\extension-data" %TempFolder%\Profiles\extension-data\ /s /y /i
::gm_scripts：安裝的油猴腳本。
xcopy "%BackDir%\gm_scripts" %TempFolder%\Profiles\gm_scripts\ /s /y /i
::Plugins：便携版插件。
xcopy "%BackDir%\Plugins" %TempFolder%\Profiles\Plugins\ /s /y /i
::SimpleProxy：SimpleProxy代理列表。
xcopy "%BackDir%\SimpleProxy" %TempFolder%\Profiles\SimpleProxy\ /s /y /i

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


::其它刪除项
del %TempFolder%\Profiles\chrome\UserScriptLoader\require\  /s /q
del %TempFolder%\Profiles\extensions\userChromeJS@mozdev.org\content\myNewTab\bingImg\  /s /q

::以下是文件
::bookmarks.html：自動导出的书签備份。
xcopy "%BackDir%\bookmarks.html" %TempFolder%\Profiles\ /y
::cert_override.txt：储存使用者指定的例外证书(certification exceptions)。
xcopy "%BackDir%\cert_override.txt" %TempFolder%\Profiles\ /y
::cert8.db：安全证书。
xcopy "%BackDir%\cert8.db" %TempFolder%\Profiles\ /y
::extensions.json：扩展启用禁用状态
::xcopy "%BackDir%\extensions.json" %TempFolder%\Profiles\ /y
::FlashGot.exe：FlashGot的下载工具。
xcopy "%BackDir%\FlashGot.exe" %TempFolder%\Profiles\ /y
::foxyproxy.xml：FoxyProxy的設置及网址列表備份。
::xcopy "%BackDir%\foxyproxy.xml" %TempFolder%\Profiles\ /y
::mimeTypes.rdf：下载特定类型的档案時要执行的動作。 可刪掉来还原原来下载的設定。
xcopy "%BackDir%\mimeTypes.rdf" %TempFolder%\Profiles\ /y
::MyFirefox.7z：用於官方FX的便携設置。
xcopy "%BackDir%\MyFirefox.7z" %TempFolder%\Profiles\ /y
::patternSubscriptions.json：FoxyProxy的訂閱列表設置。
::xcopy "%BackDir%\patternSubscriptions.json" %TempFolder%\Profiles\ /y
::permissions.sqlite：存放特定网站是否可存取密码、cookies、弹出视窗、图片载入与附加元件……等权限的资料库。
xcopy "%BackDir%\permissions.sqlite" %TempFolder%\Profiles\ /y
::persdict.dat：个人的拼字字典。
xcopy "%BackDir%\persdict.dat" %TempFolder%\Profiles\ /y
::pluginreg.dat：用于plugin的MIME types。
xcopy "%BackDir%\pluginreg.dat" %TempFolder%\Profiles\ /y
::Portable.7z：PCXFirefox的便携設置。
xcopy "%BackDir%\Portable.7z" %TempFolder%\Profiles\ /y
::prefs.js：About:config中儲存的設定。
::xcopy "%BackDir%\prefs.js" %TempFolder%\Profiles\ /y
::readme.txt：个人配置修改说明。
xcopy "%BackDir%\readme.txt" %TempFolder%\Profiles\ /y
::stylish.sqlite：Stylish样式數据库。
xcopy "%BackDir%\stylish.sqlite" %TempFolder%\Profiles\ /y
::user.js：使用者自订的設定，在这里的設定覆盖默认設定。
xcopy "%BackDir%\user.js" %TempFolder%\Profiles\ /y
::xulstore.json：界面的一些状态。
xcopy "%BackDir%\xulstore.json" %TempFolder%\Profiles\ /y

::讀取版本號和日期及時間
::从批处理所在位置到Firefox程序文件夹（firefox），共跨了5层
for /f "usebackq eol=; tokens=1,2 delims==" %%i in ("..\..\..\..\..\Firefox\application.ini")do (if %%i==Version set ver=%%j)
