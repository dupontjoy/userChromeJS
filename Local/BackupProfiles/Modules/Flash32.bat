::2016.01.27

:Flash32
cls
ECHO.
ECHO  提取Flash32位插件
ECHO.
ECHO  1.执行
ECHO  2.返回
ECHO.
Choice /C 12 /N /M 选择（1、2）：
If ErrorLevel 1 If Not ErrorLevel 2 Goto download
If ErrorLevel 2 If Not ErrorLevel 3 Goto menu

:download
cls
echo  *下載到D:\Temp文件夹
::Beta版頁面：http://labs.adobe.com/downloads/flashplayer.html
::start "" https://fpdownload.macromedia.com/pub/labs/flashruntimes/flashplayer/install_flash_player.exe

wget --ca-certificate=ca-bundle.crt -c -N -P %TempFolder% https://fpdownload.macromedia.com/pub/labs/flashruntimes/flashplayer/install_flash_player.exe
goto install

:install
start "" %TempFolder%\install_flash_player.exe

echo.
echo  *请暂时不要关闭该批处理……
echo.
echo  *如果已安装完毕，请按任意键继续……
pause>nul
goto set

:set
cd /d %~dp0
set BackDir=C:\Windows\SysWOW64\Macromed\Flash

::複製插件到臨時文件夾
xcopy "%BackDir%\NPSWF32*.dll" %TempFolder%\  /s /y /i
xcopy "%BackDir%\FlashPlayerPlugin*.exe" %TempFolder%\  /s /y /i
xcopy "%BackDir%\plugin.vch" %TempFolder%\  /s /y /i

::讀取版本號
::找了好久，妙終於在這個回答找到了答案：http://zhidao.baidu.com/question/289963233.html
for /f "delims=" %%i in ('dir /a-d /b "%BackDir%\NPSWF32*.dll"') do (set ver=%%i)
echo %ver%

::完整日期和時間
set tm1=%time:~0,2%
set tm2=%time:~3,2%
set tm3=%time:~6,2%
set tm4=%time:~0,8%
set da1=%date:~0,4%
set da2=%date:~5,2%
set da3=%date:~8,2%
set Name=%ver%_%da1%%da2%%da3%-%tm1%%tm2%%tm3%.7z

::小時數小于10点時的修正
set /a tm1=%time:~0,2%*1
if %tm1% LSS 10 set tm1=0%tm1%
set Name=%ver%_%da1%%da2%%da3%-%tm1%%tm2%%tm3%.7z

rem 開始備份
::-mx9极限压缩 -mhc开启档案文件头压缩 -r递归到所有的子目录
%zip% -mx9 -mhc -r u -up1q3r2x2y2z2w2 %TargetFolder4%\%Name% "%TempFolder%\NPSWF32*.dll" "%TempFolder%\FlashPlayerPlugin*.exe" "%TempFolder%\plugin.vch"
move %TargetFolder%\%Name% %TargetFolder4%

@echo 備份完成！并刪除臨時文件夾！
rd "%TempFolder%"  /s/q

ECHO.&ECHO.已打包完成，請按任意鍵退出，將跳轉到系統/控制面板/程序與功能！&PAUSE >NUL 2>NUL

::跳轉到系統/控制面板/程序與功能
appwiz.cpl
rundll32.exe shell32.dll,Control_RunDLL appwiz.cpl
