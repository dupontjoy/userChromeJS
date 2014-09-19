@echo off 
cd /d %~dp0
::更新视频播放器
set dd= -N -P ..\swf\

set urlC=haoutil.googlecode.com/svn/trunk/player/testmod/
set urlD=haoutil.googlecode.com/svn/trunk/player/
set urlE=haoutil.googlecode.com/svn/trunk/youku/
set urlP=127.0.0.1:8087

::iqiyi
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlC%iqiyi.swf
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlC%iqiyi_out.swf
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlC%iqiyi5.swf
::letv
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlC%letv.swf
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://player.letvcdn.com/p/201403/05/1456/newplayer/1/SLetvPlayer.swf
::youku
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlC%player.swf
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlC%loader.swf
::tudou
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlC%tudou.swf
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlC%olc_8.swf
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlC%sp.swf
::ku6
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlD%ku6.swf
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlD%ku6_out.swf
::pplive
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlD%pplive.swf
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlD%pplive_live.swf
::sohu
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlC%sohu.swf
::pps
wget -N -t 3 -e "http_proxy=http://%urlP%" %dd% http://%urlC%pps.swf
::17173
wget --no-check-certificate %dd% https://raw.githubusercontent.com/ywzhaiqi/userChromeJS/master/YoukuantiadsModY/swf/17173_Player_file.swf
wget --no-check-certificate %dd% https://raw.githubusercontent.com/ywzhaiqi/userChromeJS/master/YoukuantiadsModY/swf/17173_Player_stream.swf
wget --no-check-certificate %dd% https://raw.githubusercontent.com/ywzhaiqi/userChromeJS/master/YoukuantiadsModY/swf/17173_Player_file_out.swf

exit
