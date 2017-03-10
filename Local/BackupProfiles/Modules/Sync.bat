::2017.03.09

:Sync
cls
echo.
echo  *** 同步一些軟件的設置文件 ***
echo.
echo  1. Foxmail過濾器：应用到所有邮箱
echo  2. ProcessLaso設置
echo  3. Listary設置
echo.
echo  按任意键继续……
pause>nul
cls

rem 設置備份路徑以及臨時文件夾
cd /d %~dp0

::設置文件所在位置
::从批处理所在位置到Profiles文件夹，共跨了4层
set dir1=..\..\..\..
set dir2=E:\My Documents\GitHub\Customization

::同步Foxmail Filter
taskkill /f /t /im foxmail.exe
xcopy "%dir2%\Foxmail-Filter\163.com\1.fter" "%dir1%\..\..\Tencent\Foxmail\Storage\dupontjoy@163.com\Filter\1.fter" /s /y /i
xcopy "%dir2%\Foxmail-Filter\163.com\1.fter" "%dir1%\..\..\Tencent\Foxmail\Storage\dupontjoy@qq.com\Filter\1.fter"  /s /y /i
xcopy "%dir2%\Foxmail-Filter\163.com\1.fter" "%dir1%\..\..\Tencent\Foxmail\Storage\dupont2305@gmail.com\Filter\1.fter"  /s /y /i
xcopy "%dir2%\Foxmail-Filter\163.com\1.fter" "%dir1%\..\..\Tencent\Foxmail\Storage\dupont@inc.tvc-tech.com\Filter\1.fter"  /s /y /i
start "" "%dir1%\..\..\Tencent\Foxmail\Storage\..\foxmail.exe" /min

::同步ProcessLaso設置
taskkill /f /t /im ProcessGovernor.exe
taskkill /f /t /im ProcessLasso.exe
xcopy "%dir2%\ProcessLaso\prolasso.ini" "%dir1%\..\..\System Tools\ProcessLassoPortable\prolasso.ini"  /s /y /i
start "" "%dir1%\..\..\System Tools\ProcessLassoPortable\ProcessGovernor.exe" "/logfolder=%dir1%\..\..\System Tools\ProcessLassoPortable" "/configfolder=%dir1%\..\..\System Tools\ProcessLassoPortable"
start "" "%dir1%\..\..\System Tools\ProcessLassoPortable\ProcessLasso.exe" "/logfolder=%dir1%\..\..\System Tools\ProcessLassoPortable" "/configfolder=%dir1%\..\..\System Tools\ProcessLassoPortable"

::同步Listary設置
taskkill /f /t /im Listary.exe
taskkill /f /t /im ListaryHelper64.exe
taskkill /f /t /im ListaryHookHelper32.exe
taskkill /f /t /im ListaryHookHelper64.exe
taskkill /f /t /im ListaryService.exe
del "%dir1%\..\Software\Listary Pro\UserData\DiskSearch.db"  /s /q
del "%dir1%\..\Software\Listary Pro\UserData\History_v2.sqlite"  /s /q
del "%dir1%\..\Software\Listary Pro\UserData\History_v2.sqlite-journal"  /s /q
del "%dir1%\..\Software\Listary Pro\UserData\listary_log.log"  /s /q
xcopy "%dir2%\Listary\Preferences.json" "%dir1%\..\Software\Listary Pro\UserData\Preferences.json"  /s /y /i
start "" "%dir1%\..\Software\Listary Pro\Listary.exe"