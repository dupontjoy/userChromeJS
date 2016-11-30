::2016.11.30

:GitHub
cls
echo.
echo  *** 備份一些文件到GitHub ***
echo.
echo  1. Firefox文件：user.js, persdict.dat, stylish.sqlite, _FeiRuoNetProxy.json
echo  2. Foxmail過濾器
echo  3. ProcessLaso設置
echo  4. PicPick設置
echo  5. CCleaner設置
echo  6. TC設置
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

::備份幾個Firefox文件
xcopy "%dir1%\persdict.dat" "%dir2%\Firefox\persdict.dat"  /s /y /i
xcopy "%dir1%\stylish.sqlite" "%dir2%\Firefox\stylish.sqlite"  /s /y /i
xcopy "%dir1%\user.js" "%dir2%\Firefox\user.js"  /s /y /i
xcopy "%dir1%\Chrome\Local\_user.js" "%dir2%\Firefox\_user.js"  /s /y /i
::xcopy "%dir1%\Chrome\lib\_FeiRuoNetProxy.json" "%dir2%\Rules\Autoproxy\_FeiRuoNetProxy.json"  /s /y /i

::備份Foxmail Filter
xcopy "%dir1%\..\..\Tencent\Foxmail\Storage\dupontjoy@163.com\Filter\1.fter" "%dir2%\Foxmail-Filter\163.com\1.fter"  /s /y /i

::備份ProcessLaso設置
xcopy "%dir1%\..\..\System Tools\ProcessLassoPortable\prolasso.ini" "%dir2%\ProcessLaso\prolasso.ini"  /s /y /i

::備份PicPick設置
xcopy "%dir1%\..\Software\Image\PicPick\picpick.ini" "%dir2%\PicPick\picpick.ini"  /s /y /i

::備份FastCopy-M設置
::xcopy "%dir1%\..\..\FastCopy-M\FastCopy2.ini" "%dir2%\FastCopy-M\FastCopy2.ini"  /s /y /i

::備份CCleaner設置
xcopy "%dir1%\..\..\System Tools\CCleaner\ccleaner.ini" "%dir2%\CCleaner\ccleaner.ini"  /s /y /i

::備份Total Commander設置
xcopy "%dir1%\..\Software\totalcmd\wincmd.ini" "%dir2%\TC\wincmd.ini"  /s /y /i
xcopy "%dir1%\..\Software\totalcmd\user\user.ini" "%dir2%\TC\user.ini"  /s /y /i