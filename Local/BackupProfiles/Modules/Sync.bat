::2015.12.31

:Sync
cls
echo.
echo  *** 同步一些軟件的設置文件 ***
echo.
echo  1. Foxmail過濾器：163.com, qq.com
echo  2. ProcessLaso設置
echo  3. PicPick設置
echo  4. 同步FastCopy-M設置
echo  5. 同步Flashplayer設置mms.cfg
echo.
echo  按任意键继续……
pause>nul
cls

rem 設置備份路徑以及臨時文件夾
cd /d %~dp0

::設置文件所在位置
set dir2=D:\My Documents\GitHub\Customization

::同步Foxmail Filter
set dir3=D:\Program Files\Tencent\Foxmail\Storage
taskkill /f /t /im foxmail.exe
xcopy "%dir2%\Foxmail-Filter\163.com\1.fter" "%dir3%\dupontjoy@163.com\Filter\1.fter" /s /y /i
xcopy "%dir2%\Foxmail-Filter\qq.com\1.fter" "%dir3%\dupontjoy@qq.com\Filter\1.fter"  /s /y /i
start "" "%dir3%\..\foxmail.exe"

::同步ProcessLaso設置
set dir4=D:\Program Files\System Tools\ProcessLassoPortable
taskkill /f /t /im ProcessGovernor.exe
taskkill /f /t /im ProcessLasso.exe
xcopy "%dir2%\ProcessLaso\prolasso.ini" "%dir4%\prolasso.ini"  /s /y /i
start "" "%dir4%\ProcessGovernor.exe" "/logfolder=%dir4%" "/configfolder=%dir4%"
start "" "%dir4%\ProcessLasso.exe" "/logfolder=%dir4%" "/configfolder=%dir4%"

::同步PicPick設置
set dir5=D:\Program Files\Mozilla Firefox\Software\Image\PicPick
taskkill /f /t /im picpick.exe
xcopy "%dir2%\PicPick\picpick.ini" "%dir5%\picpick.ini"  /s /y /i
start "" "%dir5%\picpick.exe"

::同步FastCopy-M設置
set dir6=D:\Program Files\FastCopy-M
xcopy "%dir2%\FastCopy-M\FastCopy2.ini" "%dir6%\FastCopy2.ini"  /s /y /i

::同步Flashplayer設置
set dir7=c:\Windows\SysWOW64\Macromed\Flash
xcopy "%dir2%\Flashplayer\mms.cfg" "%dir7%\mms.cfg"  /s /y /i