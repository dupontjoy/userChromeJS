
::2015.06.01 20:00  更名爲Profiles，刪除一些不必要的項目
::2015.05.27 18:00  換用Autoproxy，不再備份Foxy數據
::2015.05.25 17:00  加入foxyproxy訂閱列表設置
::2015.04.21 09:00  更新說明
::2015.04.16 08:00  更新備份項，添加說明
::2015.04.06 07:00  更新備份項
::2015.01.26 12:00  搞定了时间问题

echo off
Title 備份Firefox配置文件夾
rem 设置备份路径以及临时文件夹
taskkill /im firefox.exe
@echo 关闭火狐浏览器后自动开始备份……
cd /d %~dp0
set BackDir=..\..\..
set TempFolder=..\..\..\Temp\Profiles

rem 复制目标文件到临时文件夹
::需要删除的项
del %BackDir%\chrome\UserScriptLoader\require\  /s /q 

::以下是文件夹
::adblockplus：ABP規則備份。
xcopy "%BackDir%\adblockplus" %TempFolder%\adblockplus\  /s /y /i
::autoproxy：Autoproxy規則備份。
xcopy "%BackDir%\autoproxy" %TempFolder%\autoproxy\  /s /y /i
::chrome：UC腳本。
xcopy "%BackDir%\chrome" %TempFolder%\chrome\  /s /y /i
::extensions：安裝的擴展。
xcopy "%BackDir%\extensions" %TempFolder%\extensions\ /s /y /i
::extension-data：uBlock的數據文件，包含設置。
xcopy "%BackDir%\extension-data" %TempFolder%\extension-data\ /s /y /i
::gm_scripts：安裝的油猴腳本。
xcopy "%BackDir%\gm_scripts" %TempFolder%\gm_scripts\ /s /y /i
::Plugins：便?版插件。
xcopy "%BackDir%\Plugins" %TempFolder%\Plugins\ /s /y /i
 
::以下是文件
::bookmarks.html：自动导出的书签备份。
xcopy "%BackDir%\bookmarks.html" %TempFolder%\ /y
::cert_override.txt：储存使用者指定的例外证书(certification exceptions)。
xcopy "%BackDir%\cert_override.txt" %TempFolder%\ /y
::cert8.db：安全证书。
xcopy "%BackDir%\cert8.db" %TempFolder%\ /y
::FlashGot.exe：FlashGot的下载工具。
xcopy "%BackDir%\FlashGot.exe" %TempFolder%\ /y
::foxyproxy.xml：FoxyProxy的设置及网址列表备份。
::xcopy "%BackDir%\foxyproxy.xml" %TempFolder%\ /y
::localstore.rdf：工具列与视窗大小／位置的设定，有时删掉可以解决一些介面上的问题。
xcopy "%BackDir%\localstore.rdf" %TempFolder%\ /y
::mimeTypes.rdf：下载特定类型的档案时要执行的动作。 可删掉来还原原来下载的设定。
xcopy "%BackDir%\mimeTypes.rdf" %TempFolder%\ /y
::MyFirefox.7z：用於官方FX的便携设置。
xcopy "%BackDir%\MyFirefox.7z" %TempFolder%\ /y
::patternSubscriptions.json：FoxyProxy的訂閱列表設置。
::xcopy "%BackDir%\patternSubscriptions.json" %TempFolder%\ /y
::permissions.sqlite：存放特定网站是否可存取密码、cookies、弹出视窗、图片载入与附加元件……等权限的资料库。
xcopy "%BackDir%\permissions.sqlite" %TempFolder%\ /y
::persdict.dat：个人的拼字字典。
xcopy "%BackDir%\persdict.dat" %TempFolder%\ /y
::pluginreg.dat：用于plugin的MIME types。
xcopy "%BackDir%\pluginreg.dat" %TempFolder%\ /y
::Portable.7z：PCXFirefox的便携设置。
xcopy "%BackDir%\Portable.7z" %TempFolder%\ /y
::readme.txt：个人配置修改说明。
xcopy "%BackDir%\readme.txt" %TempFolder%\ /y
::stylish.sqlite：Stylish样式数据库。
xcopy "%BackDir%\stylish.sqlite" %TempFolder%\ /y
::user.js：使用者自订的设定，在这里的设定覆盖prefs.js的设定。
xcopy "%BackDir%\user.js" %TempFolder%\ /y
::xulstore.json：界面的一些状态。
xcopy "%BackDir%\xulstore.json" %TempFolder%\ /y

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
set ArchiveName=D:\Profiles_%da1%%da2%%da3%-%tm1%%tm2%%tm3%_%ver%.7z

::小时数小于10点时的修正
set /a tm1=%time:~0,2%*1
if %tm1% LSS 10 set tm1=0%tm1%
set ArchiveName=D:\Profiles_%da1%%da2%%da3%-%tm1%%tm2%%tm3%_%ver%.7z

rem 开始备份
7z.exe u -up1q3r2x2y2z2w2 %ArchiveName% "%TempFolder%"
@echo 备份完成！删除临时文件夹
rd "%TempFolder%" /s/q

ECHO.&ECHO.Firefox配置已打包完成,请重启Firefox,并按任意键退出! &PAUSE >NUL 2>NUL
