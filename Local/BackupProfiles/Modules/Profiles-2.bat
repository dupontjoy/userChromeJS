::2017.05.17

::打包

:Profiles-2
cls
::一些扩展不用打包, 运行FX时由VimFx自动安装最新版
::staged
move "%TempFolder%\Profiles\extensions\staged"  %TempFolder%
::playFlash
move "%TempFolder%\Profiles\extensions\playflash@xpi"  %TempFolder%
::Dom Inspector
move "%TempFolder%\Profiles\extensions\inspector@mozilla.org"  %TempFolder%
::DTA
del %TempFolder%\Profiles\extensions\{DDC359D1-844A-42a7-9AA1-88A850A938A8}.xpi  /s /q
::FlashGot
del %TempFolder%\Profiles\extensions\{19503e42-ca3c-4c27-b1e2-9cdb2170ee34}.xpi  /s /q
::iMacros
del %TempFolder%\Profiles\extensions\{81BF1D23-5F17-408D-AC6B-BD6DF7CAF670}.xpi  /s /q
::Redirector
del %TempFolder%\Profiles\extensions\redirector@einaregilsson.com.xpi  /s /q
::DisConnect
del %TempFolder%\Profiles\extensions\2.0@disconnect.me.xpi  /s /q

::完整日期和時間
set YY=%date:~0,4%
set MON=%date:~5,2%
set DD=%date:~8,2%
set hh=%time:~0,2%
set mm=%time:~3,2%
set ss=%time:~6,2%

::輸出文件名
set Name=Profiles_%ver%_%YY%%MON%%DD%-%hh%%mm%%ss%.7z

::小時數小于10点時的修正
set /a hh=%time:~0,2%*1
if %hh% LSS 10 set hh=0%hh%
::輸出文件名
set Name=Profiles_%ver%_%YY%%MON%%DD%-%hh%%mm%%ss%.7z

rem 開始備份
::-mx9极限压缩 -mhc开启档案文件头压缩 -r递归到所有的子目录
%zip% -mx9 -mhc -r u -up1q3r2x2y2z2w2 %TargetFolder%\%Name% "%TempFolder%\Profiles"
move %TargetFolder%\%Name% %TargetFolder1%

@echo 備份完成！并刪除臨時文件夾！
rd "%TempFolder%" /s/q