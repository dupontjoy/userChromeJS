::2016.03.22  输出換到E盘
::2016.01.02  優化輸出與臨時文件夾地址
::2015.12.19  重新模塊化
::2015.10.30  添加刪除DTA語言
::2015.10.23  添加一个Firefox备份文件
::2015.10.10  精簡說明展示方式
::2015.10.04  模塊化每個備份項目，然後再組合，方便修攺維護
::2015.10.02  精簡擴展語言
::2015.10.01  優化輸出地址
::2015.09.26  開啟7zip極限壓縮

@echo off
Title 備份批處理整合版 by Cing
::界面大小，Cols为宽，Lines为高
MODE con: COLS=80 LINES=25
cd /d %~dp0
::設置模塊路徑
::将当前目录保存到参数b中,等号前后不要有空格
set b=%cd%

::一次性设置7-zip程序地址
set zip="%b%\7za.exe"

::設置臨時文件夾
set TempFolder="E:\Temp"

::設置輸出文件夾
set TargetFolder="E:"

::設置Profiles上傳地址
set TargetFolder1="E:\My Documents\Baiduyun\Firefox\Profiles"
::設置CingFox上傳地址
set TargetFolder2="E:\My Documents\Baiduyun\Firefox\【FX共享】\CingFox-完整包"
::設置Plugins和Software上傳地址
set TargetFolder3="E:\My Documents\Baiduyun\Firefox\Plugins&Software"
::設置Flash32上傳地址
set TargetFolder4="E:\My Documents\Baiduyun\Firefox\【FX共享】\Flash32位原版提取帶vch和exe"

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
goto cho

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
ECHO  已完成！下一步？
ECHO.
ECHO  1.返回主菜單
ECHO  2.退出
ECHO.
Choice /C 12 /N /M 选择（1、2）：
If ErrorLevel 1 If Not ErrorLevel 2 Goto menu
If ErrorLevel 2 If Not ErrorLevel 3 Goto exit

