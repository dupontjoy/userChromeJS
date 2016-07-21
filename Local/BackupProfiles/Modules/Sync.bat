::2016.07.20

:Sync
cls
echo.
echo  *** 同步一些軟件的設置文件 ***
echo.
echo  1. Foxmail過濾器：163.com, qq.com
echo  2. ProcessLaso設置
echo  3. PicPick設置
echo  4. 同步FastCopy-M設置
echo  5. 同步xmp設置
echo  6. 同步CCleaner設置
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
start "" "%dir1%\..\..\Tencent\Foxmail\Storage\..\foxmail.exe" /min

::同步ProcessLaso設置
taskkill /f /t /im ProcessGovernor.exe
taskkill /f /t /im ProcessLasso.exe
xcopy "%dir2%\ProcessLaso\prolasso.ini" "%dir1%\..\..\System Tools\ProcessLassoPortable\prolasso.ini"  /s /y /i
start "" "%dir1%\..\..\System Tools\ProcessLassoPortable\ProcessGovernor.exe" "/logfolder=%dir1%\..\..\System Tools\ProcessLassoPortable" "/configfolder=%dir1%\..\..\System Tools\ProcessLassoPortable"
start "" "%dir1%\..\..\System Tools\ProcessLassoPortable\ProcessLasso.exe" "/logfolder=%dir1%\..\..\System Tools\ProcessLassoPortable" "/configfolder=%dir1%\..\..\System Tools\ProcessLassoPortable"

::同步PicPick設置
taskkill /f /t /im picpick.exe
xcopy "%dir2%\PicPick\picpick.ini" "%dir1%\..\Software\Image\PicPick\picpick.ini"  /s /y /i
start "" "%dir1%\..\Software\Image\PicPick\picpick.exe"

::同步FastCopy-M設置
::xcopy "%dir2%\FastCopy-M\FastCopy2.ini" "%dir1%\..\..\FastCopy-M\FastCopy2.ini"  /s /y /i

::同步XMP設置
xcopy "%dir2%\Thunder\xmp.ini" "%dir1%\..\..\Thunder Network\Thunder\Program\xmp.ini"  /s /y /i

::同步CCleaner設置
xcopy "%dir2%\CCleaner\ccleaner.ini" "%dir1%\..\..\System Tools\CCleaner\ccleaner.ini" /s /y /i

::同步FeiruoNet自定义代理规则
::xcopy "%dir2%\Rules\Autoproxy\_FeiRuoNetProxy.json" "%dir1%\Chrome\lib\_FeiRuoNetProxy.json"  /s /y /i