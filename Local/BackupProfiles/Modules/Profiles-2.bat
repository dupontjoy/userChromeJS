::2017.02.05

::打包

:Profiles-2
cls

::extensions文件夹单独打包
move "%TempFolder%\Profiles\extensions" %TempFolder%

::完整日期和時間
set YY=%date:~0,4%
set MON=%date:~5,2%
set DD=%date:~8,2%
set hh=%time:~0,2%
set mm=%time:~3,2%
set ss=%time:~6,2%

::輸出文件名
set Name=Profiles_%ver%_%YY%%MON%%DD%-%hh%%mm%%ss%.7z
set Name1=Extensions_%ver%.7z

::小時數小于10点時的修正
set /a hh=%time:~0,2%*1
if %hh% LSS 10 set hh=0%hh%
::輸出文件名
set Name=Profiles_%ver%_%YY%%MON%%DD%-%hh%%mm%%ss%.7z
set Name1=Extensions_%ver%.7z

rem 開始備份
::-mx9极限压缩 -mhc开启档案文件头压缩 -r递归到所有的子目录
%zip% -mx9 -mhc -r u -up1q3r2x2y2z2w2 %TargetFolder%\%Name% "%TempFolder%\Profiles"
%zip% -mx9 -mhc -r u -up1q3r2x2y2z2w2 %TargetFolder%\%Name1% "%TempFolder%\extensions"
move %TargetFolder%\%Name% %TargetFolder1%
move %TargetFolder%\%Name1% %TargetFolder1%

@echo 備份完成！并刪除臨時文件夾！
rd "%TempFolder%" /s/q