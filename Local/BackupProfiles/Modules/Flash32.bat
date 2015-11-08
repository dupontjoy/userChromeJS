:Flash32
cls
ECHO.
ECHO  提取Flash32位插件
ECHO.
ECHO  1.执行
ECHO  2.返回
ECHO.
Choice /C 12 /N /M 选择（1、2）：
If ErrorLevel 1 If Not ErrorLevel 2 Goto Flash32-1
If ErrorLevel 2 If Not ErrorLevel 3 Goto menu

:Flash32-1
cls
echo.
echo  *** 提取Flash32位插件 ***
echo.
echo  1、到官方下载非IE版Flash插件安装后提取！
echo  2、已经安装非IE版Flash插件的直接提取！
echo  3、返回主菜單。
echo.
Choice /C 12 /N /M 选择（1、2、3）：
if "%id%"=="1" goto install
if "%id%"=="2" goto set
if "%id%"=="3" goto menu

:install
cls
echo.
echo  1、下載最新正式版！
echo  2、下載最新beta版！
echo  3、返回主菜單。
echo.
Choice /C 12 /N /M 选择（1、2、3）：
if "%id%"=="1" goto download1
if "%id%"=="2" goto download2
if "%id%"=="3" goto menu

:download1
cls
start "" http://www.adobe.com/in/products/flashplayer/distribution3.html
echo.
echo  *请暂时不要关闭该批处理……
echo.
echo  *如果您已安装完毕Adobe Flash Player插件，请按任意键继续……
pause>nul
goto set

:download2
cls
start "" http://labs.adobe.com/downloads/flashplayer.html
echo.
echo  *请暂时不要关闭该批处理……
echo.
echo  *如果您已安装完毕Adobe Flash Player插件，请按任意键继续……
pause>nul
goto set

:set
cd /d %~dp0
set BackDir=C:\Windows\SysWOW64\Macromed\Flash
set TempFolder=D:\Temp

::輸出地址
set TargetFolder="D:\My Documents\Baiduyun\Firefox\【FX共享】\Flash32位原版提取帶vch和exe"

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
%zip% -mx9 -mhc -r u -up1q3r2x2y2z2w2 %TargetFolder%\%Name% "%TempFolder%\NPSWF32*.dll" "%TempFolder%\FlashPlayerPlugin*.exe" "%TempFolder%\plugin.vch"

@echo 備份完成！并刪除臨時文件夾！
rd "%TempFolder%"  /s/q

ECHO.&ECHO.已打包完成，請按任意鍵退出，將跳轉到系統/控制面板/程序與功能！&PAUSE >NUL 2>NUL

::跳轉到系統/控制面板/程序與功能
appwiz.cpl
rundll32.exe shell32.dll,Control_RunDLL appwiz.cpl
