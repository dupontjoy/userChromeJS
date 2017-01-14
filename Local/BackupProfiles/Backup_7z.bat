::2017.01.04

@echo off

::自动以管理员身份运行bat文件
::cd /d %~dp0
::%1 start "" mshta vbscript:createobject("shell.application").shellexecute("""%~0""","::",,"runas",1)(window.close)&exit

::备份部分开始
Title 備份批處理整合版 by Cing
::界面大小，Cols为宽，Lines为高
MODE con: COLS=80 LINES=25
cd /d %~dp0
::設置模塊路徑
::将当前目录保存到参数b中,等号前后不要有空格
set b=%cd%

::一次性设置7-zip程序地址
::set zip="%b%\7za.exe"
set zip="D:\Program Files\7-Zip\7z.exe"

::設置臨時文件夾
set TempFolder="E:\Temp"

::設置輸出文件夾
set TargetFolder="E:"

::設置Profiles上傳地址
set TargetFolder1="E:\My Documents\Baiduyun\Cing同步\Firefox\Profiles\"
::設置CingFox上傳地址
set TargetFolder2="E:\My Documents\Baiduyun\Cing同步\Firefox\FX共享\CingFox\"
::設置Plugins和Software上傳地址
set TargetFolder3="E:\My Documents\Baiduyun\Cing同步\Firefox\Plugins&Software\"
::設置Flash32上傳地址
set TargetFolder4="E:\My Documents\Baiduyun\Cing同步\Firefox\插件\Flash\"

:menu
cls
ECHO.
ECHO  備份批處理整合版                           
ECHO.
ECHO  1、備份Firefox配置文件夾
ECHO  2、CingFox完整包制作
ECHO  3、備份Plugins和Software文件夾
ECHO  4、提取Flash32位插件
ECHO  5、備份一些文件到GitHub
ECHO  6、同步GitHub設置文件到本地
ECHO.
set /p a=请输入操作序号并回车（1、2）：
cls

if %a%==1 goto Profiles
if %a%==2 goto CingFox
if %a%==3 goto Plugins&Software
if %a%==4 goto Flash32
if %a%==5 goto GitHub
if %a%==6 goto Sync

:Profiles
cls
@echo off
CALL "%b%\Modules\Profiles-1.bat"
CALL "%b%\Modules\Profiles-2.bat"
@echo.
Goto end

:CingFox
cls
@echo off
CALL "%b%\Modules\Profiles-1.bat"
CALL "%b%\Modules\Plugins&Software-1.bat"
CALL "%b%\Modules\CingFox-3.bat"
CALL "%b%\Modules\CingFox-4.bat"
@echo.
Goto end

:Plugins&Software
cls
@echo off
CALL "%b%\Modules\Plugins&Software-1.bat"
CALL "%b%\Modules\Plugins&Software-2.bat"
@echo.
Goto end

:Flash32
cls
@echo off
CALL "%b%\Modules\Flash32.bat"
@echo.
Goto end

:GitHub
cls
@echo off
CALL "%b%\Modules\GitHub.bat"
@echo.
Goto end

:Sync
cls
@echo off
CALL "%b%\Modules\Sync.bat"
@echo.
Goto end

:end
cls
ECHO.&ECHO.已完成! 按任意鍵返回菜单！&PAUSE >NUL 2>NUL
goto menu

