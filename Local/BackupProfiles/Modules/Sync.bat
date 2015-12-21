::2015.12.19

:Sync
cls
echo.
echo  *** 同步一些軟件的設置文件 ***
echo.
echo  1. Foxmail過濾器：163.com, qq.com
echo  2. ProcessLaso設置
echo  3. PicPick設置
echo.
echo  按任意键继续……
pause>nul
cls

rem 設置備份路徑以及臨時文件夾
cd /d %~dp0

::備份幾個Firefox文件
::从批处理所在位置到Profiles文件夹，共跨了4层
::set dir1=..\..\..\..
set dir2=D:\My Documents\GitHub\Customization
::set dir2=D:\My Documents\Baiduyun\Firefox\Settings

::同步Foxmail Filter
set dir3=D:\Program Files\Tencent\Foxmail\Storage
xcopy "%dir2%\Foxmail-Filter\163.com\1.fter" "%dir3%\dupontjoy@163.com\Filter\1.fter" /s /y /i
xcopy "%dir2%\Foxmail-Filter\qq.com\1.fter" "%dir3%\dupontjoy@qq.com\Filter\1.fter"  /s /y /i

::同步ProcessLaso設置
set dir4=D:\Program Files\System Tools\ProcessLassoPortable
xcopy "%dir2%\ProcessLaso\prolasso.ini" "%dir4%\prolasso.ini"  /s /y /i

::同步PicPick設置
set dir5=D:\Program Files\Mozilla Firefox\Software\Other\PicPick
xcopy "%dir2%\PicPick\picpick.ini" "%dir5%\picpick.ini"  /s /y /i
