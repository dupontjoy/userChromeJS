::2015.12.28

:GitHub
cls
echo.
echo  *** 備份一些文件到GitHub ***
echo.
echo  1. Firefox文件：user.js, persdict.dat, stylish.sqlite
echo  2. Foxmail過濾器：163.com, qq.com
echo  3. ProcessLaso設置
echo  4. PicPick設置
echo  5. FastCopy-M設置
echo.
echo  按任意键继续……
pause>nul
cls

rem 設置備份路徑以及臨時文件夾
cd /d %~dp0

::備份幾個Firefox文件
::从批处理所在位置到Profiles文件夹，共跨了4层
set dir1=..\..\..\..
set dir2=D:\My Documents\GitHub\Customization
::set dir2=D:\My Documents\Baiduyun\Firefox\Settings

xcopy "%dir1%\persdict.dat" "%dir2%\persdict.dat"  /s /y /i
xcopy "%dir1%\stylish.sqlite" "%dir2%\stylish.sqlite"  /s /y /i
xcopy "%dir1%\user.js" "%dir2%\user.js"  /s /y /i

::備份Foxmail Filter
set dir3=D:\Program Files\Tencent\Foxmail\Storage
xcopy "%dir3%\dupontjoy@163.com\Filter\1.fter" "%dir2%\Foxmail-Filter\163.com\1.fter"  /s /y /i
xcopy "%dir3%\dupontjoy@qq.com\Filter\1.fter" "%dir2%\Foxmail-Filter\qq.com\1.fter"  /s /y /i

::備份ProcessLaso設置
set dir4=D:\Program Files\System Tools\ProcessLassoPortable
xcopy "%dir4%\prolasso.ini" "%dir2%\ProcessLaso\prolasso.ini"  /s /y /i

::備份PicPick設置
set dir5=D:\Program Files\Mozilla Firefox\Software\Other\PicPick
xcopy "%dir5%\picpick.ini" "%dir2%\PicPick\picpick.ini"  /s /y /i

::備份FastCopy-M設置
set dir6=D:\Program Files\FastCopy-M
xcopy "%dir6%\FastCopy2.ini" "%dir2%\FastCopy-M\FastCopy2.ini"  /s /y /i
