::2016.09.13

::打包

::完整日期和時間
set YY=%date:~0,4%
set MON=%date:~5,2%
set DD=%date:~8,2%
set hh=%time:~0,2%
set mm=%time:~3,2%
set ss=%time:~6,2%

::輸出文件名
set Name=CingFox_%ver%_%YY%%MON%%DD%-%hh%%mm%%ss%.7z

::小時數小于10点時的修正
set /a tm1=%time:~0,2%*1
if %tm1% LSS 10 set tm1=0%tm1%
::輸出文件名
set Name=CingFox_Full_%ver%_%YY%%MON%%DD%-%hh%%mm%%ss%.7z
set Name1=CingFox_Profiles_%ver%_%YY%%MON%%DD%-%hh%%mm%%ss%.7z
set Name2=CingFox_Advanced_%ver%_%YY%%MON%%DD%-%hh%%mm%%ss%.7z

rem 開始備份
::-mx9极限压缩 -mhc开启档案文件头压缩 -r递归到所有的子目录
%zip% -mx9 -mhc -r u -up1q3r2x2y2z2w2 %TargetFolder%\%Name% "%TempFolder%\CingFox\"
%zip% -mx9 -mhc -r u -up1q3r2x2y2z2w2 %TargetFolder%\%Name1% "%TempFolder%\CingFox\Profiles\"
%zip% -mx9 -mhc -r u -up1q3r2x2y2z2w2 %TargetFolder%\%Name2% "%TempFolder%\Advanced\"

::清空TargetFolder2文件夹下的所有文件, 但保留TargetFolder2文件夹
::del /s /f /q %TargetFolder2%
move %TargetFolder%\%Name% %TargetFolder2%\
move %TargetFolder%\%Name1% %TargetFolder2%\
move %TargetFolder%\%Name2% %TargetFolder2%\

@echo 備份完成！并刪除臨時文件夾！
rd "%TempFolder%" /s/q
