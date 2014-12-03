::2014.12.03跟進ACVAA的SWF

@echo off 
cd /d %~dp0
::更新视频播放器
set dd= -N -P ..\swf\

set urlC=noads.aliapp.com/swf/
set urlD=no_ads.jd-app.com/
set urlP=127.0.0.1:8087
::需要代理时，在wget後加入此段『-N -t 3 -e "http_proxy=http://%urlP%"』 

::youku
wget %dd% http://%urlC%loader.swf
wget %dd% http://%urlC%player.swf
::ku6
wget %dd% http://%urlC%ku6.swf
wget %dd% http://%urlC%ku6_out.swf
::iqiyi
wget %dd% http://%urlC%iqiyi_out.swf
wget %dd% http://%urlC%iqiyi5.swf
wget %dd% http://%urlC%iqiyi.swf
::tudou
wget %dd% http://%urlD%tudou.swf
wget %dd% http://%urlC%olc_8.swf
wget %dd% http://%urlC%sp.swf
::letv
wget %dd% http://%urlC%letv.swf
wget %dd% http://%urlD%letvlive.swf
wget %dd% http://player.letvcdn.com/p/201407/24/15/newplayer/1/SSLetvPlayer.swf
::pptv
wget %dd% http://%urlC%pptv.in.Ikan.swf
wget %dd% http://%urlC%pptv.in.Live.swf
::sohu
wget %dd% http://%urlC%sohu.swf
wget %dd% http://%urlC%sohu_live.swf
::pps
wget %dd% http://%urlD%pps.swf
wget %dd% http://www.iqiyi.com/player/20140613210124/livePlayer.swf
::wanhenda
wget %dd% http://yuntv.letv.com/bcloud.swf
::17173
wget %dd% http://%urlC%17173.in.Vod.swf
wget %dd% http://%urlC%17173.out.Vod.swf
wget %dd% http://%urlC%17173.in.Live.swf
wget %dd% http://%urlC%17173.out.Live.swf
::baiduAD
wget %dd% http://%urlC%baidu.call.swf
exit
