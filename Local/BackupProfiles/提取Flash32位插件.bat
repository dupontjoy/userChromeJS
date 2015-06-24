
::2015.06.23 18:00  Create

echo off
Title 提取Flash32位插件
rem 設置備份路徑以及臨時文件夾
cd /d %~dp0
set BackDir=C:\Windows\SysWOW64\Macromed\Flash
set TempFolder=D:\Flash32

::複製插件到D盤
xcopy "%BackDir%\NPSWF32*.dll" %TempFolder%\  /s /y /i
xcopy "%BackDir%\FlashPlayerPlugin*.exe" %TempFolder%\  /s /y /i
xcopy "%BackDir%\plugin.vch" %TempFolder%\  /s /y /i

::壓縮包名稱
set ArchiveName=D:\Flash32.7z

rem 開始備份
7z.exe u -up1q3r2x2y2z2w2 %ArchiveName% "%TempFolder%"
@echo 備份完成！并刪除臨時文件夾！
rd "%TempFolder%" /s/q

ECHO.&ECHO.已打包完成，請按任意鍵退出，將跳轉到系統/控制面板/程序與功能！&PAUSE >NUL 2>NUL

::跳轉到系統/控制面板/程序與功能
appwiz.cpl
rundll32.exe shell32.dll,Control_RunDLL appwiz.cpl

@exit