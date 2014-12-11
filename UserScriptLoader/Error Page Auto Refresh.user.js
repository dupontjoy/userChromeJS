// ==UserScript==
// @name           Error Page Auto Refresh
// @description    Refresh on failed page loading & Gateway problems
// @author         aireca
// @Mod            Dupont|添加一些中文关键词
// @copyright      http://userscripts.org/scripts/show/112519
// @version        0.0.16
// @include        *
// @grant          none
// @namespace      https://greasyfork.org/zh-CN/users/363
// ==/UserScript==

var time = 10000; //原脚本时间设置：默认为10秒，单位以毫秒计

(function () 
{
//from: hsyh 2014.09.25
if (document.getElementsByTagName('div') [0].getAttribute('id') == 'errorPageContainer')
{
//setTimeout(f: fn(), ms: number) -> number
setTimeout(function () {
window.location.reload(true);
}, 10000);
} 

//感谢feiruo
  if (/^(about:neterror)/.test(document.URL))
    {setTimeout(function() {window.location.reload(true);}, time);}

//原腳本自帶
	if (document.title == '502 Bad Gateway' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.title == '504 Gateway Time-out' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.title == 'Problem loading page' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.title == '503 Service Temporarily Unavailable' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.title == 'Service Unavailable' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.title == '500 Internal Server Error' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.title == 'Database error' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.title == 'FastCGI Error' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.title == 'The connection has timed out' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.title == 'Problemas al cargar la página' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.title == 'Error 502 (Server Error)!!1' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == '502 Bad Gateway')
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == 'Service Unavailable')
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == 'Error 503 Service Unavailable')
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == '404 Not Found')
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == '504 Gateway Time-out')
		{setTimeout(function() {window.location.reload(true);}, time);}

//以下为自定义添加		
	else if (document.getElementsByTagName('h1')[0].innerHTML == '连接被重置' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == '代理服务器拒绝连接' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == '找不到服务器' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == '页面载入出错' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == '数据库错误' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == '服务器拒绝连接' )
		{setTimeout(function() {window.location.reload(true);}, time);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == 'Error 404: Not Found' )
		{setTimeout(function() {window.location.reload(true);}, time);}		
	else if (document.getElementsByTagName('h1')[0].innerHTML == '无法找到该网页' )
		{setTimeout(function() {window.location.reload(true);}, time);}		
	else if (document.getElementsByTagName('h1')[0].innerHTML == '此页面不能正确地重定向' )
		{setTimeout(function() {window.location.reload(true);}, time);}	
	else if (document.getElementsByTagName('h1')[0].innerHTML == '连接超时' )
		{setTimeout(function() {window.location.reload(true);}, time);}	
	else if (document.getElementsByTagName('h1')[0].innerHTML == 'Discuz! Database Error' )
		{setTimeout(function() {window.location.reload(true);}, time);}	
	else if (document.getElementsByTagName('h1')[0].innerHTML == '无法连接' )
		{setTimeout(function() {window.location.reload(true);}, time);}	
	else if (document.getElementsByTagName('h1')[0].innerHTML == '安全连接失败' )
		{setTimeout(function() {window.location.reload(true);}, time);}	
		
})();