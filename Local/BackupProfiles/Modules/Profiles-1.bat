::2017.03.03

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

::等待3秒
@ping 127.0.0.1 -n 3 -w 1000 > nul

::運行speedyfox優化
set speedyfox=..\..\..\..\..\Software\run\speedyfox.exe
::Profiles路徑只能用絕對, 可惜
%speedyfox% /Firefox:"D:\Program Files\CingFox\Profiles"

rem 复制目标文件到臨時文件夾

::以下是文件夾
xcopy "%BackDir%\adblockplus" %TempFolder%\Profiles\adblockplus\  /s /y /i
xcopy "%BackDir%\autoproxy" %TempFolder%\Profiles\autoproxy\  /s /y /i
xcopy "%BackDir%\chrome" %TempFolder%\Profiles\chrome\  /s /y /i
xcopy "%BackDir%\extensions" %TempFolder%\Profiles\extensions\ /s /y /i
xcopy "%BackDir%\extension-data" %TempFolder%\Profiles\extension-data\ /s /y /i
::xcopy "%BackDir%\fireie" %TempFolder%\Profiles\fireie\ /s /y /i
xcopy "%BackDir%\gm_scripts" %TempFolder%\Profiles\gm_scripts\ /s /y /i
xcopy "%BackDir%\iMacros" %TempFolder%\Profiles\iMacros\ /s /y /i
xcopy "%BackDir%\searchplugins" %TempFolder%\Profiles\searchplugins\ /s /y /i

::/**以下是文件**/
::书签
xcopy "%BackDir%\bookmarks.html" %TempFolder%\Profiles\  /s /y /i
::安全证书设置
xcopy "%BackDir%\cert8.db" %TempFolder%\Profiles\  /s /y /i
xcopy "%BackDir%\cert_override.txt" %TempFolder%\Profiles\  /s /y /i
::Cookies: 保留着你曾访问过的网站信息，通常是你的网站首选项信息或登录状态
xcopy "%BackDir%\cookies.sqlite" %TempFolder%\Profiles\  /s /y /i
::自定义工具栏
xcopy "%BackDir%\localstore.rdf" %TempFolder%\Profiles\  /s /y /i
xcopy "%BackDir%\xulstore.json" %TempFolder%\Profiles\  /s /y /i
::下载活动: 设定的当某个文件类型打开时Firefox应该做的动作
xcopy "%BackDir%\mimeTypes.rdf" %TempFolder%\Profiles\  /s /y /i
::站点自定的首选项: 保存了许多针对站点的权限设置（比如，它保存着哪些网站被允许显示弹出窗口），或者针对站点的页面缩放级别
xcopy "%BackDir%\permissions.sqlite" %TempFolder%\Profiles\  /s /y /i
xcopy "%BackDir%\content-prefs.sqlite" %TempFolder%\Profiles\  /s /y /i
::用户字典
xcopy "%BackDir%\persdict.dat" %TempFolder%\Profiles\  /s /y /i
::书签和浏览历史
xcopy "%BackDir%\places.sqlite" %TempFolder%\Profiles\  /s /y /i
::插件 MIME 类型
xcopy "%BackDir%\pluginreg.dat" %TempFolder%\Profiles\  /s /y /i
::搜索引擎
xcopy "%BackDir%\search.json.mozlz4" %TempFolder%\Profiles\  /s /y /i
::Stylish样式
::xcopy "%BackDir%\stylish.sqlite" %TempFolder%\Profiles\  /s /y /i
::参数设置
xcopy "%BackDir%\user.js" %TempFolder%\Profiles\  /s /y /i
xcopy "%BackDir%\prefs.js" %TempFolder%\Profiles\  /s /y /i
::Readitlater
xcopy "%BackDir%\key3.db" %TempFolder%\Profiles\  /s /y /i
xcopy "%BackDir%\logins.json" %TempFolder%\Profiles\  /s /y /i
xcopy "%BackDir%\readItLater.sqlite" %TempFolder%\Profiles\  /s /y /i
::其它
xcopy "%BackDir%\readme.js" %TempFolder%\Profiles\  /s /y /i


::其它刪除项
del %TempFolder%\Profiles\chrome\UserScriptLoader\require\  /s /q
del %TempFolder%\Profiles\extensions\userChromeJS@mozdev.org\content\myNewTab\bingImg\  /s /q
del %TempFolder%\Profiles\autoproxy\patterns.ini-temp  /s /q
del %TempFolder%\Profiles\autoproxy\patterns-backup*.ini  /s /q
del %TempFolder%\Profiles\extension-data\dedao.sqlite  /s /q
::HostTools产生的备份文件
del %SystemRoot%\system32\drivers\etc\hosts.*.bak  /s /q


::刪除Lastpass的一些项目
::精简Platform
del %TempFolder%\Profiles\extensions\support@lastpass.com\platform\  /s /q
xcopy "%BackDir%\extensions\support@lastpass.com\platform\WINNT_x86_64-msvc" %TempFolder%\Profiles\extensions\support@lastpass.com\platform\WINNT_x86_64-msvc\ /s /y /i


::讀取版本號和日期及時間
::从批处理所在位置到Firefox程序文件夹（firefox），共跨了5层
for /f "usebackq eol=; tokens=1,2 delims==" %%i in ("..\..\..\..\..\Firefox\application.ini")do (if %%i==Version set ver=%%j)
