::2017.05.27

::���

:Profiles-2
cls
::һЩ��չ���ô��, ����FXʱ��VimFx�Զ���װ���°�
::staged
move "%TempFolder%\Profiles\extensions\staged"  %TempFolder%
::playFlash
move "%TempFolder%\Profiles\extensions\playflash@xpi"  %TempFolder%
::Dom Inspector
move "%TempFolder%\Profiles\extensions\inspector@mozilla.org"  %TempFolder%
::Lastpass
::move "%TempFolder%\Profiles\extensions\support@lastpass.com"  %TempFolder%
::FoxyProxy
move "%TempFolder%\Profiles\extensions\foxyproxy@eric.h.jung"  %TempFolder%
::DTA
del %TempFolder%\Profiles\extensions\{DDC359D1-844A-42a7-9AA1-88A850A938A8}.xpi  /s /q
::FlashGot
del %TempFolder%\Profiles\extensions\{19503e42-ca3c-4c27-b1e2-9cdb2170ee34}.xpi  /s /q
::GreaseMonkey
::del %TempFolder%\Profiles\extensions\{e4a8a97b-f2ed-450b-b12d-ee082ba24781}.xpi  /s /q
::iMacros
del %TempFolder%\Profiles\extensions\{81BF1D23-5F17-408D-AC6B-BD6DF7CAF670}.xpi  /s /q
::Redirector
del %TempFolder%\Profiles\extensions\redirector@einaregilsson.com.xpi  /s /q
::uBlock
::del %TempFolder%\Profiles\extensions\uBlock0@raymondhill.net.xpi  /s /q
::uMatrix
::del %TempFolder%\Profiles\extensions\uMatrix@raymondhill.net.xpi  /s /q

::�������ں͕r�g
set YY=%date:~0,4%
set MON=%date:~5,2%
set DD=%date:~8,2%
set hh=%time:~0,2%
set mm=%time:~3,2%
set ss=%time:~6,2%

::ݔ���ļ���
set Name=Profiles_%ver%_%YY%%MON%%DD%-%hh%%mm%%ss%.7z

::С�r��С��10��r������
set /a hh=%time:~0,2%*1
if %hh% LSS 10 set hh=0%hh%
::ݔ���ļ���
set Name=Profiles_%ver%_%YY%%MON%%DD%-%hh%%mm%%ss%.7z

rem �_ʼ���
::-mx9����ѹ�� -mhc���������ļ�ͷѹ�� -r�ݹ鵽���е���Ŀ¼
%zip% -mx9 -mhc -r u -up1q3r2x2y2z2w2 %TargetFolder%\%Name% "%TempFolder%\Profiles"
move %TargetFolder%\%Name% %TargetFolder1%

@echo �����ɣ����h���R�r�ļ��A��
rd "%TempFolder%" /s/q