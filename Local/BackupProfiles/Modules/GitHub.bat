::2016.01.25

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
echo  6. Shadowsocks-Pac設置
echo.
echo  按任意键继续……
pause>nul
cls

rem 設置備份路徑以及臨時文件夾
cd /d %~dp0

::設置文件所在位置
set dir1=D:\Program Files
set dir2=D:\My Documents\GitHub\Customization

::備份幾個Firefox文件
::从批处理所在位置到Profiles文件夹，共跨了4层
set dir3=..\..\..\..
xcopy "%dir3%\persdict.dat" "%dir2%\Firefox\persdict.dat"  /s /y /i
xcopy "%dir3%\stylish.sqlite" "%dir2%\Firefox\stylish.sqlite"  /s /y /i
xcopy "%dir3%\user.js" "%dir2%\Firefox\user.js"  /s /y /i

::備份Foxmail Filter
xcopy "%dir1%\Tencent\Foxmail\Storage\dupontjoy@163.com\Filter\1.fter" "%dir2%\Foxmail-Filter\163.com\1.fter"  /s /y /i
xcopy "%dir1%\Tencent\Foxmail\Storage\dupontjoy@qq.com\Filter\1.fter" "%dir2%\Foxmail-Filter\qq.com\1.fter"  /s /y /i

::備份ProcessLaso設置
xcopy "%dir1%\System Tools\ProcessLassoPortable\prolasso.ini" "%dir2%\ProcessLaso\prolasso.ini"  /s /y /i

::備份PicPick設置
xcopy "%dir1%\Mozilla Firefox\Software\Image\PicPick\picpick.ini" "%dir2%\PicPick\picpick.ini"  /s /y /i

::備份FastCopy-M設置
xcopy "%dir1%\FastCopy-M\FastCopy2.ini" "%dir2%\FastCopy-M\FastCopy2.ini"  /s /y /i

::備份Shadowsocks-Pac設置
xcopy "%dir1%\Mozilla Firefox\Software\GFW\Shadowsocks\pac.txt" "%dir2%\Rules\Shadowsocks\pac.txt"  /s /y /i
xcopy "%dir1%\Mozilla Firefox\Software\GFW\Shadowsocks\user-rule.txt" "%dir2%\Rules\Shadowsocks\user-rule.txt"  /s /y /i
