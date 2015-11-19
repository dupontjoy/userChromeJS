
::2015.11.08  重新模塊化
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
::一次性设置7-zip程序地址
set zip="D:\Program Files\7-Zip\7z.exe"
::設置模塊路徑
::将当前目录保存到参数b中,等号前后不要有空格
set b=%cd%


:menu
cls
ECHO.
ECHO  備份批處理整合版                           
ECHO.
ECHO  01、備份Firefox配置文件夾
ECHO  02、CingFox完整包制作
ECHO  03、備份Plugins和Software文件夾
ECHO  04、提取Flash32位插件
ECHO  05、備份一些文件到GitHub
ECHO.
set /p a=请输入操作序号并回车（例如01）：
cls

if %a%==01 goto Profiles
if %a%==02 goto CingFox
if %a%==03 goto Plugins-n-Software
if %a%==04 goto Flash32
if %a%==05 goto GitHub
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
CALL "%b%\Modules\Plugins-n-Software-1.bat"
CALL "%b%\Modules\CingFox-3.bat"
@echo.
Goto end

:Plugins-n-Software
cls
@echo off
CALL "%b%\Modules\Plugins-n-Software-1.bat"
CALL "%b%\Modules\Plugins-n-Software-2.bat"
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

