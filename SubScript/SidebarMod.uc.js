// ==UserScript==
// @name            SidebarPlus.uc.js
// @description     侧边栏按钮以及功能增强
// @include         chrome://browser/content/browser.xul
// @charset         UTF-8
// @note            v2017.02.11 增加一些侧边栏按钮及精选国内国外网站 by runningcheese
// @note            v2015.08.05 添加双击页面空白处隐藏侧边栏
// @note            v2013.07.30 添加几个小书签脚本
// @note            v2013.07.26 添加侧栏前进、后退、刷新按钮
// @note            v2013.07.15 侧栏激活挂在主页按钮
// ==/UserScript==
/* *********************使用说明*********************
	此脚本从lastdream2013的SidebarMod.uc.js修改而来，原作者是NightsoN，感谢他们
	去除了某些我用不到的站点以及Splitter，开关直接使用FF自带的按钮或快捷键吧ctrl+B或ctrl+H
	添加侧栏前进、后退以及刷新的3合1按钮
*/


//------------侧边栏按钮------------
(function(){
CustomizableUI.createWidget({
id: "Sidebar-button",
defaultArea: CustomizableUI.AREA_NAVBAR,
label: "侧边栏",
tooltiptext: "左键：历史侧边栏\n右键：书签侧边栏",
onClick: function(event){
switch (event.button) {
case 0:
// 左键：历史侧边栏
SidebarUI.toggle("viewHistorySidebar");
break;
case 1:
// 中键：样式侧边栏
break;
case 2:
// 右键：书签侧边栏
event.preventDefault();
SidebarUI.toggle("viewBookmarksSidebar");
break;
}
}
});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#Sidebar-button[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAAAAAAPCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADm16n4AAAAC3RSTlMA7AoynI1/byniVqVdBlsAAAA4SURBVAjXY8AEzIG7RZdKbwxm4E5WMttmpJzNwA0U3cAApChlOO4W2SK90ZuBs0KpfXuTRiWm5QCyBRE/SPD7PAAAAABJRU5ErkJggg==)'
		 + '}}'
     + '#Sidebar-button[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #Sidebar-button .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEUAAAAZGRkZGRkZGRkZGRkZGRkZGRkaGhoZGRkZGRlLIIzdAAAACXRSTlMA8q0nEW7ownaT3dFpAAAAS0lEQVQoz2MgDJgVZyIBIQMGsxBkaddkBlVkfjlDE4MIqoAjwwRUIzkxBWaiAZAKZFWcowJoAiKoAo4MqqgCTeCImoAUUZhRSRAAADDWNJrdq5jnAAAAAElFTkSuQmCC)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();



//右键  三道杠 弹出 侧边栏
(function (doc) {
        var ViewHistorySidebar = doc.getElementById('PanelUI-menu-button');
        if (!ViewHistorySidebar) return;
        var menupopup = ViewHistorySidebar.firstChild;
        ViewHistorySidebar.addEventListener("click", function (e) {
            if (e.button == 2) {
               e.preventDefault();
                (function(){
         var id = [15]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 1;
            style.save();
        }
    })();
             SidebarUI.toggle("viewHistorySidebar"); 
            }
        }, false);
    })(document);



(function () {

if (!document.getElementById('sidebar-box')) return;
if (!window.SidebarMod) {
	window.SidebarMod = {
		operaLikeToggler: true,//Opera Style
		sitelist:[
		

{name: '常用选项',
	favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMzdu6AAAAEnRSTlMAfzpDTCEK38+9s6iFeGqNVjKYYQrKAAAAcElEQVQY02WOWw6FIAxEp7wRQe3+F3t7sUUTz8cknNBOMUmNS8SLURNtb7ETfLGH5z84JPwU7KA4vgUWKpiWKDXKx5iDii30rB1Gkqk++LKRozbJ5mGCRtLVbj+flnkcZVrCyfoTke2wwELHJSn1X34e5wRDvcBIqAAAAABJRU5ErkJggg==',
	childs: [
{
				name: '书签',
				url: 'chrome://browser/content/bookmarks/bookmarksPanel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAAAAAAAAAAAAAAAHBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqim21AAAAFXRSTlMAj1RtD9/Xq38owriYeDMHhR4XSjowWlNmAAAAcElEQVQY022PSw6EMAxDHactbekHmOH+V53FJBIIvIj1LFmKYVoW3FRq3W+BkHLlkIAUHAb7qoDWzO8ByNk6xwRmocopQLuURfw6P9wU/5ac99W+LRZ8Nsy8BWRa0MmkGsnsw6IcQJBoVciwhQ0v+gFTkgJxFZPPfQAAAABJRU5ErkJggg=='
			},
{
				name: '历史',
				url: 'chrome://browser/content/history/history-panel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAAAAAAAaDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnTjqAAAAAE3RSTlMAOgmRUhfX9e2FM38r37Ygc2eeqdJPywAAAHVJREFUGNNtj0sOxDAIQyEp5NukHe5/1wFUFpX6Fg5Yghj4hNopwoOiP0rGlDDL8fS1A28tenWHSgdYt5Wz2NTIKtcPjNxUGFWwuoGniiSVJBv8CQOGrGua4SPGvhcDciw1YimVCY5/G8GcXiOqRPT3cY3giz/gegN1WNJGDQAAAABJRU5ErkJggg=='
			},
{
				name: '拓展',
				url: 'about:addons',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMzdu6AAAAEnRSTlMAfzpDTCEK38+9s6iFeGqNVjKYYQrKAAAAcElEQVQY02WOWw6FIAxEp7wRQe3+F3t7sUUTz8cknNBOMUmNS8SLURNtb7ETfLGH5z84JPwU7KA4vgUWKpiWKDXKx5iDii30rB1Gkqk++LKRozbJ5mGCRtLVbj+flnkcZVrCyfoTke2wwELHJSn1X34e5wRDvcBIqAAAAABJRU5ErkJggg=='
			},
{
			name: '下载',
			url: 'about:downloads',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbklEQVQ4jWNgoDH4PzQNkMVhgCy6QmxAmYGB4TUDA4M9mgH2UHFlYgyBKbaHGoDMJxrANP0nRzMMBEMNCCZHMwyYEKvQk4GB4RnURkL4GVQ9CnjGwMBgTaRl1lD1KIBQgvmPpgZDPcUuoDgMyAYA/mQv97JO38EAAAAASUVORK5CYII='
						},
{
		 name: '笔记本',
		 url: 'chrome://quicknote/content/quicknote.xul',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtUlEQVQ4jb2RMQ7CMAwAT0kslkpIHbuw8xV+wAf4BSsLC3N2vsZQqWOXDDBgSkgbaEDCkqU4yl1iB/4dzrkjEIALsC6CReSsYC0iO10XwwvdavQlAFwn8h1cAa1zbh8L0lhl4CXQioiPD08JcnBnjDmlZ0eCT3AqSXv2CVwDnX7hQ/bCxEXNfbpVBp68dCistVug17JR+JC2mBVo771miL9qlgAIIuKttRueMygSzI2R4Jv8PW6f+kbf/4vUFwAAAABJRU5ErkJggg=='
			},
{
		 name: '手机标签',
		 url: 'chrome://browser/content/syncedtabs/sidebar.xhtml',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAT0lEQVQ4jWNgoAaQl5d/Ly8v/59UjGzAfzzm47J0gA3AbRpuNdjC6T0pBmCogYsNDgMIxTdZBpDiArwpkaABxABiXEmUAbj4xBiAOyFRAgBPbmsFfCHniwAAAABJRU5ErkJggg=='
			},
{
		 name: '稍后阅读',
		 url: 'chrome://isreaditlater/content/list.xul',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAc0lEQVQ4je2SsQ2AMBADr0rBAhkgY2SCTMIKGYZx2IEN0jBEaB4JCf4JKHRYcmXr5MLQWQkoQFVcpKOqANHIo3RU1YaVZucHfAAYxK8AAVjE4SkgASswio8PvAVkzo/cH5hbADPgLzIvmQmYAGfkTjr9tAHhASvq4nOsZwAAAABJRU5ErkJggg=='
			},
{
		 name: '显示地址',
		 url: "javascript:%20void(prompt('link%20to%20this%20page',%20location.href));",
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII='
			},{
		 name: '自动刷新',
		 url: "javascript:(function(p){open('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3EForce%3C/a%3E%3Cscript%3Efunction%20i(n){return%20d.getElementById(n)}function%20z(){c+=0.2;if(c%3E=t){c=0;e.location=u;r++}x()}function%20x(){s=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0||c/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22Reloads:%20%22+r;i(3).innerHTML=%22Time:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)}c=r=0;d=document;e=opener.top;u=prompt(%22URL%22,e.location.href);t=u?prompt(%22Seconds%22,60):0;setInterval(%22z()%22,200);if(!t){window.close()}%3C/script%3E%3C/body%3E')})('status=0,scrollbars=0,width=100,height=115,left=1,top=1')",
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsklEQVQ4jaXTvRGDMAyG4WeBdOmpabNDVmAFD0HNFhmAFRghLUtkBEpSoIJ/nMvX+E6nV/4syeSpxCszd6s7N/Soc5kCDd74xNlgxPMKrjEgoYjbi4iPET+Fu4DmKgOuzuAHhh1YgKcwtFf2Zkro1sHR9NYcFZG/LHBgf6PI2xb410Hntx606+B6QXY7H/YH09QOVYXFcgfuXKx0Cri23MQUN1/+h2cU2PsLuU1Wo88Z6xfYZCqNojAzKgAAAABJRU5ErkJggg=='
			},{
		 name: '解除限制',
		 url: 'javascript:(function(bookmarklets)%7Bfor(var%20i=0;i%3Cbookmarklets.length;i++)%7Bvar%20code=bookmarklets%5Bi%5D.url;if(code.indexOf(%22javascript:%22)!=-1)%7Bcode=code.replace(%22javascript:%22,%22%22);eval(code)%7Delse%7Bcode=code.replace(/%5Es+%7Cs+$/g,%22%22);if(code.length%3E0)%7Bwindow.open(code)%7D%7D%7D%7D)(%5B%7Btitle:%22%E7%A0%B4%E9%99%A4%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95%E9%99%90%E5%88%B6%22,url:%22javascript:function%20applyWin(a)%7Bif(typeof%20a.__nnANTImm__===%5Cx22undefined%5Cx22)%7Ba.__nnANTImm__=%7B%7D;a.__nnANTImm__.evts=%5B%5Cx22mousedown%5Cx22,%5Cx22mousemove%5Cx22,%5Cx22copy%5Cx22,%5Cx22contextmenu%5Cx22%5D;a.__nnANTImm__.initANTI=function()%7Ba.__nnantiflag__=true;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.addEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__)%7D;a.__nnANTImm__.clearANTI=function()%7Bdelete%20a.__nnantiflag__;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.removeEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__);delete%20a.__nnANTImm__%7D;a.__nnANTImm__.fnANTI=function(b)%7Bb.stopPropagation();return%20true%7D;a.addEventListener(%5Cx22unload%5Cx22,function(b)%7Ba.removeEventListener(%5Cx22unload%5Cx22,arguments.callee,false);if(a.__nnantiflag__===true)%7Ba.__nnANTImm__.clearANTI()%7D%7D,false)%7Da.__nnantiflag__===true?a.__nnANTImm__.clearANTI():a.__nnANTImm__.initANTI()%7DapplyWin(top);var%20fs=top.document.querySelectorAll(%5Cx22frame,%20iframe%5Cx22);for(var%20i=0,len=fs.length;i%3Clen;i++)%7Bvar%20win=fs%5Bi%5D.contentWindow;try%7Bwin.document%7Dcatch(ex)%7Bcontinue%7DapplyWin(fs%5Bi%5D.contentWindow)%7D;void%200;%22%7D,%7Btitle:%22%E7%A0%B4%E9%99%A4%E9%80%89%E6%8B%A9%E5%A4%8D%E5%88%B6%E9%99%90%E5%88%B6%22,url:%22javascript:(function()%7Bvar%20doc=document;var%20bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function%20()%7Breturn%20true;%7D;with(document.wrappedJSObject%7C%7Cdocument)%7Bonmouseup=null;onmousedown=null;oncontextmenu=null;%7Dvar%20arAllElements=document.getElementsByTagName(%5Cx27*%5Cx27);for(var%20i=arAllElements.length-1;i%3E=0;i--)%7Bvar%20elmOne=arAllElements;with(elmOne.wrappedJSObject%7C%7CelmOne)%7Bonmouseup=null;onmousedown=null;%7D%7Dvar%20head=document.getElementsByTagName(%5Cx27head%5Cx27)%5B0%5D;if(head)%7Bvar%20style=document.createElement(%5Cx27style%5Cx27);style.type=%5Cx27text/css%5Cx27;style.innerHTML=%5Cx22html,*%7B-moz-user-select:auto!important;%7D%5Cx22;head.appendChild(style);%7Dvoid(0);%7D)();%22%7D%5D)',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVQ4jbWTwQ0EIQhFf10URD80YAmeKcEeKMEi2MMOGV3UncMuiTER3uejEfhHqKqXUpyIXERcVb215o9AInIAyyUie5HeuwMIgRRm5gCcmdciRLRPXu6iQXIyWD/Cqurh5Nrv7rv5RjjOmDnVz4oHGABEJI2bBHZw5I4CJ3jpYJzpGwy872zKf0BHOGpS4rJ0hOMJtzWjiJlN60kDAECtdfkP0ty/iheIvOXe3xfsVQAAAABJRU5ErkJggg=='
			},
{
		 name: '显示图片',
		 url: "javascript:outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images%5Bi%5D.src)==-1){outText+='<tr><td><img%20src='+document.images%5Bi%5D.src+'></td><td>'+document.images%5Bi%5D.height+'</td><td>'+document.images%5Bi%5D.width+'</td><td>'+document.images%5Bi%5D.src+'</td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write%20('<table%20border=1%20cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>'+outText+'</table>');imgWindow.document.close()}else{alert('No%20images!')}",
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsklEQVQ4jc3SvQ2DQAyGYZY4yd/rmoqWlgEQXZZgimwXNqBOjegoU5HmiCDkBxJFiiV358f23SXJXwTQuPu4J4HTDXD3cW/TRc0WwMxKYDCz8iUgqZBUfASYWQX0QDcd3LyCpAPQScol5e+QFQAMkvLZKjnQm1kVp8uAs6T6GdDdd5kQdz/G6eoJWQEhhPTRqBFpp4sNIaQR3feM8wC6rwAzyxY1QBu/6GVjjkCzp+nv4goaQ1+Hc93jJgAAAABJRU5ErkJggg=='
			},
{
		 name: '页内打开',
		 url: "javascript:function%20kZRjr(o){var%20a%20=%20document.links,i=a.length;while(i--){a[i].target='_self';}i=o.length;while(i--){kZRjr(o[i]);}}kZRjr(top);",
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAUElEQVQ4jWNgGCyAjYGBYRIDA8NrBgaG/0Tg11D1bDADJjEwMOxmYGAQJ9JCcaj6VpjAaxI0IxvyGsb5T6JmDH2DzwB8MUAfF4xUA8jFlAEAeaY4lePz57gAAAAASUVORK5CYII='
			},
{
		 name: '高亮关键词',
		 url: "javascript:%20(%20function%20()%7B%20var%20count=0,%20text,%20dv;text=prompt%20(%20%22%E8%AF%B7%E8%BE%93%E5%85%A5%E9%AB%98%E4%BA%AE%E5%85%B3%E9%94%AE%E8%AF%8D:%22,%20%22%22%20)%20;if%20(%20text==null%20%20%7C%7C%20%20text.length==0%20)%20return;dv=document.defaultView;function%20searchWithinNode%20(%20node,%20te,%20len%20)%7B%20var%20pos,%20skip,%20spannode,%20middlebit,%20endbit,%20middleclone;skip=0;if%20(%20%20node.nodeType==3%20%20)%7B%20pos=node.data.toUpperCase%20()%20.indexOf%20(%20te%20)%20;if%20(%20pos%3E=0%20)%7B%20spannode=document.createElement%20(%20%22SPAN%22%20)%20;spannode.style.backgroundColor=%22yellow%22;middlebit=node.splitText%20(%20pos%20)%20;endbit=middlebit.splitText%20(%20len%20)%20;middleclone=middlebit.cloneNode%20(%20true%20)%20;spannode.appendChild%20(%20middleclone%20)%20;middlebit.parentNode.replaceChild%20(%20spannode,middlebit%20)%20;++count;skip=1;%20%7D%7D%20else%20if%20(%20%20node.nodeType==1&&%20node.childNodes%20&&%20node.tagName.toUpperCase%20()%20!=%22SCRIPT%22%20&&%20node.tagName.toUpperCase!=%22STYLE%22%20)%7B%20for%20%20(%20var%20child=0;%20child%20%3C%20%20node.childNodes.length;%20++child%20)%7B%20child=child+searchWithinNode%20(%20node.childNodes%5Bchild%5D,%20te,%20len%20)%20;%20%7D%7D%20return%20skip;%20%7D%20window.status=%22Searching%20for%20'%22+text+%22'...%22;searchWithinNode%20(%20document.body,%20text.toUpperCase%20()%20,%20text.length%20)%20;window.status=%22Found%20%22+count+%22%20occurrence%22+%20(%20count==1?%22%22:%22s%22%20)%20+%22%20of%20'%22+text+%22'.%22;%20%7D)()%20;",
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJUlEQVQ4jZWSMUpDQRRFryF8fecaJK2oO9B1hKzAMkX6tKYxmEJ7iSiiTbAJ2KQQsQ6K2AluQCslIIhZgM1PEfPz/V6YYubNPe8xc6V5lWw3gBHwna6R7YakUsb9GSXAEHiwXZNUkVSxXQPugaGkZKEb6NkeSCpnlMu2B8BxpjkiNm2PJVVzJqzaHkfERlb3ZkT0c8zTRn2gmQXoAgd/AYAO0M0it4DTAoBeRLTmCkmSbAOvyntlaRV4S5JkZxH9GjiTtJRRXgFugIu8CdeAR+DkF2QZuLN9pewvnlEFeIqI3elBmsxbFUji1NAGziWFJIBL2+1C5hSwZ/sDmAAT2+8RcfQvAHA43acZ6RQGAHXbL8B6RGzZfgbqhQEpZN/2p+2vvO4/qg0zQkGEWXwAAAAASUVORK5CYII='
			},

	]
	},


{name: '国外网站',
	favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABEklEQVQ4ja3SoU+CYRDH8U9gc0YLyY3RaGwEM8VisVAIRJP/gJsRs4VoJZkoBqOVxkYjsml5g8X0Bg136Cu8YtDv9oTnnrt77nd3/BMne96amOIVBSZpu8QQuigxqAluYJFBR2jjHu95rmSWOdYbQ4UBnmqSzjPBFPppaKfzEhc4xg2utxKcpv8jDqVjkQ9whllqLjGukXaH0eYyynLWqbPKcZ5tHiofauEts05qnOsoxCQ+GYtud3HwS3A/fb/REzIK0YN9zESTd5j7WpKfOMdKdn+bZmYvxLK0tt47eFaztR2hfShmu1LpcDLAS1aww1ToL3ErRtkQizUSy7Wo+7lKT+hfipGWYi9mWVljX/Cf+ADPsD6Jpy6mewAAAABJRU5ErkJggg==',
 id:'sidebarpage',
	childs: [
{
			name: 'Twitter',
			url: 'https://mobile.twitter.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAqFBMVEUAAABNnNZSpeNUquw7eqtOn9pMn9tSpuVTqulWrfBRod9UquxTqupRod5ImtVNoN1QqetVqelLnNhKoONVrO9fwP9UqutTpeZSpONOouFVq+1KlchFltVQqORSo99TqOdQo+IugcdVrvJRo+RVq+pQpudLnNk0lL1Gn+UtWXlXsfRZtPQHDBhVrO5WrfBVrO9Wr/FUq+xbu/tYretTqelXsfRasPBSpeTa/vOqAAAALXRSTlMABLq5NCoh9dPMqKeilFZDNDAQCfbw7+3j0rukopyYkod3dG1kX1ozLSwnFg1mfTAtAAAAm0lEQVQY03WPRw7CQAxFnd47vfdueyYJcP+boRkIG8Rbfb1vWTb8YHQhNc0DHF1w16DJPCm9ZHaCrAnVUDUUxCT7Nrj0GKcGlEiIWE9vAEsSzShZICNybQM4Zo+IUMNtAVC2pCIrIQZqXR5gB8WgiOgrCi1W948Rc3hzsVj3gb76erZ3PiMTW5WunfApVe/vu+fyTWxNoq0Df3gBlY4VuZsJdXYAAAAASUVORK5CYII='
						},{
			name: 'Instagram',
			url: 'https://www.instagram.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACQFBMVEUAAACAZ1R7YE5yW0qKb2CVb1x7ZViOZVdiP0I6JiGAZVVsVUgrARM3EQg4kcRpT0BkRD55XUtpU4OFaVx8U0lvVUQjEw8nBgunjX+PeXGPe22AdG2PdWWAamKIa150XlKEW06LUDFuUkVbRDg/FSRDHxNkSTldOzRTPjGVey2CWlSSRU41HBYnGhIAAAH////g0b/ayrbYxKzSwavOuqE3LCwCDxD58u//+Owqu+r07N3u5tfp3dHi1L/dzrvVx7PNv6nSvaTHs5iyno6nlIdoS3mQeG9kXVs8Qk6UYkhRPjgXKCZAKyRFKyNEIBgCDxgMFxD9+/IUsu37+Ovv6+j78eX28OLo4dz16Nji3tXs4s/n2svl2cnf1MnJycnq38jg1MLe1MHe073Xx7DNvbDQxK3Tw62wq6fVv6W9t6PSup/AsZ7Gtp3NtpzKr5Q6fJO4oZFBdJBmco7Bq42ckIyVjYpibIe5n4ItYIG3nIBrh35zd3mSf3ZUMHWFc2pJYmqKdWhMRmN2Z2GWa16PcFyxeVsrUVc0UFebc1SaZ1RLSVSrcFMiSFOYbVBwWVBHUFB9YU81Uk+paU2VakycXUpGKkpBJkoYOEiPYkeaYEU0LUSUYUNhSkPn5UKRXkEjQUEmKEGRi0CRVD9vTT3h1zs7PTglLzc5MTSbMDRBNDP3LjEbLS/RLCwQICuHPypJNCqgUSkiGCjn5SYyJib/IiZXLiUzJiQnDyOXSiINFiBLJx4lHx4dFRQLDAQOCASBJQBcifjvAAAALnRSTlMA7e3u7e3t7V5e9vb29vLy8vDu7u7u7u7t7e3t7e3t7e3t5OTk5NDQ0NBgYGBgmit8wwAAARtJREFUGNMFwQNiAwEQAMCNk9q2eRfbdlLbtm3btm27/VpnAGKjHVyCSQQCKcjNKTIGgHx9zFO9r8+ML218IuwvMoRd7vBU97rdLd2iEdk/DQe758fEnr/lkanDWzNy82QPnucHDSsT3a2N6qEXk8nsAT6dA0cVXZb2OraGk5yW4Qte1LLcFsSy0DeGNKMo1xvw6Sh6hlg3Vyf3TjgJWf7gJ0rlshDrw9v36JwwiUoEPFWQMoiwf34NBk0Ov4gIAWIhX8n6WJu+eu3NLGQEgistX1A8e6HVsvRVeSVMHNjQaQXZiu07o14pkkjlthBSU0oTS+rV/QoGQ1rdFgqU4drKcjqdyZTJ5E0d8xSAuAhnLBaDwWBx7o5R8fAPkv5TRaxPYM0AAAAASUVORK5CYII='
						},
{
			name: 'Facebook',
			url: 'https://m.facebook.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWNgoAYw86k/bOXX9J8UbOZTfxhugEvs7P8eSYtJwi6xs//DDcCnMCx31f9j5x79//X7z//3H7//v3H3NVyOKAP2n7j3Hx2QZMDXbz///////39+3RK4/0kyAAZcYmdhyOE1ABd4/PwjZQYsWXecOANg/oUBGN8hYhJ5YYBNbjgZ4BK/4DCpBrjFLzxCZF7FDwAGzvrijJjlXgAAAABJRU5ErkJggg=='
						},{
			name: 'Youtube',
			url: 'https://www.youtube.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAz1BMVEUAAAD////lLSfAFx3spKTOAADPJCXvs7PUIyPRISLYJSPdKCTJHCDAFx3lLSfAFx3lLSbFGB7JIh3HBwfIAADfREHRLy/45OTzvr3WODfw1tXbUVDOHyHOHyHbKCXKHSDIHCDdJyTlLSflLSfAFx2/Fx3qMCngLia/ExbeJB6uFBm+ERO0FBnbIxzjKybbJyXEGh7KHR/HHB/eKSXYJCLUIiLRICHOHiDGGyDoLirgKyffKyfLISPGGBvOFRbUExLUBALEAAHdIBzcGhbGCw51TfyoAAAALnRSTlMA/qmp/P79/PT08OHhpKOfkIxE/v78/Pv7+/r68fDo58zIm5qXl4B+eWdiXFZMi05ZjAAAAJVJREFUGNONz8UCgkAUQNE3inTb3R3IDCod6v9/kw9XLDmru71Qg70313oD6StzZwNcg1tFcIRlyBiLPu+IlUIFFKfU9XLnbwayh/JBf9zKHCwZxAdqcYSMhhmWCNITdQRCuF6KJcH0hdqcwBcpjzUB1UWxW3xjtzSHBfUppUlCEaYKZ/9e4R8ALtbW0JpIMzbWqcbrD0iZHNqhgn5zAAAAAElFTkSuQmCC'
						},{
			name: 'Google+',
			url: 'https://plus.google.com/collections/featured',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACu0lEQVQ4jX3TTWgTaRzH8QEvHoogyiIiiNZtRakB25CZTsikk0ziZJq0VKOIIB7Egx5ExUvZ28JaFivoyYsnFRUPRStUBPGl0mBoqw02fck8mbZSahEDfUwuLfjdg21icfXwPf4/v+fyKN4xZ76YdqRI21J0xdfXYUrRYUo31Var3ahWsIPzinc0gXc0QTFtUzwcX19nlGJnFJEyayXDCMfATYRwEyEUkbZlMW2zlkiZiJiGiGk/A8nwOqBg61IRXXG5tl4IHkDENGZOdlHsjDLtb0Q4Rg35JXA4zrS/Ee/SWZbmZlgBKsvLLDy48/04plUB1/TjHtIRjrEKpG057W/E677ACrAEvOt7yOdSiU/f4KXThmv6me1oqy57TuiHF8RbZbEzSrlS4Yv8yqMj7dzdupEnzXsZMAP01f/BiKUxa6lMNe1kMZth/PwZ8rs2U0yFpTLV0iA/9v7DCjDY8zf3NihMdF9kMZthrr+PhcEXZM+dZiRhUHr1nCVgYdZjovsiUy0NUpls/rMG/HWZexsU8td6KAOfSyUAPty6yYBvNx9u3aQMzL0bZejUMXKBfVJxwy1y+niKCvDJEzxp3kv/9jr6t9eR670CwOiNqzzbsYmhhm2I+7cZOtFFZtcWxp2QVESHKaeadlK4/i8rq6u53iuI+7cB+Dg5yYAZIKv7GLODDPrqyeo+xhMh8hFVKm6qTc7YQSYO7iF/rYfFcoUyUAbcN694bLQw6KtnzA4yGtN5b2nkLI1xS10F2g0pUiZryGszwNOkydOkyYBvN2/U/YwkDEZj+m8Ax0Akw3hOiFlLJav7eK418TYSYDjWWu3/gdVPsZbnhJixg4zZQTJWKxnr+/GIpdWOo2o1pWAH5wu2Ln/MtXXp2bp8H2uVmYgmh6OqHI6qMhcJyFwkIPMRVeYjqpyI+Of/A4TBjlExAm4fAAAAAElFTkSuQmCC'
						},
{
			name: '9GAG',
			url: 'https://m.9gag.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxUlEQVQ4jZWTsRGDMAxF2cDvT8Ai3oM1GIGOJbJDVmAQ+pR0abgjacydEZJz0Z0bW/qS/v/uuiAkzcAO7JLmKO8WKaUB2CR96gNsKaUhLAR6YLWFDtAK9LZ4Ag4neQEW5/4Apnpf2+ktKVfvudxd8loAZ/e+nNsUFiBLejkgpwouHx6RY6vArtFSZKlJLaQ97botO3SScpHsIlsIUPkgdJ2k2QVwRt6sjJ47Q4C/jWRW+GnlerpbtD4TMDaZt4SdRgIeUd4Xoa6rOttLlsoAAAAASUVORK5CYII='
						},
{
			name: 'TED',
			url: 'http://www.ted.com',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdElEQVQ4jWNgoBZ4qi376Jm23Adi8FNt2UcYBjzTlvtPCqa+AU+1ZOc91ZZd8VRbdsUzbdm1mJpk18Lkn2rJziMYJlD/wgz4QFKA3lYR4kM34LaKEN+oAUPKgPsKAgLoCem+goAASS5AzlxPtWUfkeQCUgAAdv/PDbvrDVgAAAAASUVORK5CYII='
						},
{
			name: 'Wikihow',
			url: 'http://zh.m.wikihow.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVElEQVQ4jY2T30uaYRiG/Wuik514EoNJsVVEsDUiwlifUJnS0CQzv2k19jEQ3eYmWkqJxdaIwaQwLTUIi8rSkSxHEMQEiRzBCPqCoKNrBy1HPxa9cMP7HDzXez/3w6vwzJtL4yuiPLU1LIfSdjmUtssfvw2V71Nbw/L4iih7Yv2yN265ov6SIrhqw+bXojG3YHJpMDoEuofUGB0CJpcGjbkFm19LcNWGL2G5JkUobZctng4qKpU0qhvokdqoqFSiMbfQPaSmolKJ6OtiYsN+rdkbt8gKb9wiT2YGadU30ahuwJewUFWtwuTSYHJpaNU38Sk7fOPrlwCirwtVfQ3PepupfVpLXXMdDx8/wubXMpkZvB0wtiziS1hQ1ddQVa3C5teirLqPqr6GwJKVwJL1dsBIcoCxZRGLpwOjQyC4aqNHakPnfIJroRMpLPB+vhdnRIcUFpDCAm+jz/EnxXPABXFiw87Ehh13zMDX728oHm+TK6TY2c8wkw2wuZcgV0iRL66TzE/jmO28DLiQO2ZgJDnA4fE+AKdnJ4wuWtncS3BxZrKB/wNGkgNIYYEv6Q8AJPPT6IMPcEZ0APw8/IEUFv5lcFNAjtkuorlQ2cHBUYHf8q8ywBnR4Vnouxvg4KjA2u4c+eL63QCji9ZLI0RzIdpH7iGFhbuN4I4ZGF20li2fnp0QXHpJrpAqhxjNhc5DvMm+O2ZgMvWanf0Mm3sJ8sV1ZrIB1nbnyqtMbH/GGdGh8Mb7S1e/qT8pyp6FPlkKt8uv/upd1Cg7ZjvLtSuil/3JF6U/ttTKA0K+IGEAAAAASUVORK5CYII='
						},
{
			name: 'Wikipedia',
			url: 'https://zh.m.wikipedia.org/wiki/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABjklEQVQ4jaWToYrDQBCGx0RGR1dVxdfGxOQN6iIjSk1MXQ8iDkpFVWQeISa2qqpQ6gJXFQIxLSsSCDW57Hfmmru2HBx3Aytm2P323392RESk7/tXrfUbUP9maa3f+r5/lc/DL/wx+r5/EeDyVwBwkbqu3/M8B0ApRVVVFEVxlyulaJpGl2VJWZY0TaOLoqCu63c5n8/1bDbDsixc1+VwOJAkCZZl4fs+eZ4ThiGj0YjtdsvxeGQ8HjOdTlFK1fJpDCKCbduDNtM0h3y5XDKfzwHoug7P8yjLEuALkKYpIkJVVQDs93tEhCRJiKKIrusAiOOY1Wp1u+cLAGAYBp7nDSocx0FEOJ1OQy0IAm6ePQGiKEJEaNuW76pupmZZRhiG37twD+i6DhFhsVgAkCQJhmHgOA4AYRiy2+1+BgD4vo9pmmRZRpqmgxfr9ZrNZsNDPAOUUogIlmVxvV4BsG377il3AK11/1h1XZcgCIY8jmMmk8njNrTWvWitn75y27ZD227e3Ix9AFz+P0z/HecPSANlwPFAIAUAAAAASUVORK5CYII='
						},
{
			name: 'Translate',
			url: 'https://translate.google.com/m/translate',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVQ4jY3TzU4TURwF8PEBeAiew4WBBBQ6lBaQmhhduWKhMUYSIyYqIbadaacWhSA1GgOGREiMVCrqQiUBIVhipnbu5E4/cL6IkrTQe9fHRduRABEXZ/k7/3MXVxhMMPV8gmMgwdGf4OhTOIIKRyDO4Q/vjgI49a8IHjyEe+McPZEKPbHAw4cLYhx+meHG9HZHuVxuPS6EkBahCQ9f741x+GMc8qufcBwXOzs7cF0XjuPAtm3Ytg3TNE0h2IBBhSOUZHB/VTC5vA9/o+BS8jfyeR2u63pxHMcrEgLx+tVAnCPxdh+LG3tQi1X4Yxw9MocoMSx91mAYhgcPrhB6D0zO0ipG5mpYJ1XcnK1BlDlEiWN0xsD6ZhbR1AyWV9aQ1yl0o9AoiNXxtec1lO0KVvNVZGkVmW97ECUOn8Qhjm1jRJnG3fGnuKVM4Wr4MVLz6XpB860La3tQ0vsQZY6gwlCwKriQZPBJHN2RGu5PpbHydQMTs/OYS7+HZVmwLAtCj8whyhyXJxmCCoMo1WdffMQQiDN0Rxm6ogxDDzdxPTyOYXkCRNdRLBZhmiaEJmjG10h39C/uijAMSA6G7im4nXiCPCEoFAoolUoQfFHmoSOwgc9FGM6Ga5jLZDHzegl3kilopL5C6Hqw6x5BDfgXM3SGGcZelkCIjsUPn7wVwulh0tI5QlqPy5krHzvaQhm0hd6hPZTB9Ow6NI2AUgpKab3gpM/S3v+GdgwuIfViFar6A4QQ6LoOSikMw/iPgr6F0alnX7C19R2qqiKXy0HTNBBCkMvltD/vDPwyHNhJmwAAAABJRU5ErkJggg=='
						},
{
		 name: 'Dictionay',
		 url: 'http://m.iciba.com/',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACr0lEQVQ4jX2QT2iTdxjHH95NKNhCxDrnlkJp172ZDmQw6qFTQRDnRfHiZbDt4ElExhA8DFf357DROiNNZ8A2qSytpqYpTdNIN5BaRBxodSBoW6lOD8ZfkjZ5875pTJp8dnjftVrRw4fn8nw/fPmKHjd79LGC4UlYaT1hqg/GiqppbEnpCfO1eBJWWh8rGHrc7BE9bvE/7hjURsEdAz1u8d6wxTtRi6aRlZ/VSEvMTHtiJrVRO3xp6isGbhxkTQg+TpTY8ZdFXdikLmyixy1aRl8gZqaleTiv6ofKfDTyL9dv74QnwvStDXRNQ7ECAA/yFdrGLd7uN/DETJpG7FbNw3klmyJFtTbMcrh6R8DswarAFxN5dsWz3Eo/B8ATs5s0RvM0RvM0RAwlGwZLam0Ypu58CjMCDz08B1ovlxF/Bq03i/gzqMISo0/KaL1Z3BETd8S0BesvFNWakNNgRiC5j8cFkGAJVyiHO2Ii3gxDcwUe5CtovVk2DhhsHDDYdNFQUnt+UWl9MHlzO8wI1dkGAPZfqSKdacRrt1CFJU7cLCD+zLKg/o/sKsGcvUFRfQdAx90SR68VSDpjto0aSGeadf05XKGcLXjrXF7JuRUBc8LE7Lvs/Qf+BKaAbx/DsUeQrDjbBIq4gvO4AvOOwA8TN3bCUwGEZx2b+UH/Fe/Wn+hrPckJ/Xt+/vAo1UAcgPYvw2jd89QEc47AV7UbIJR+bKIsB0C2gXzyEoZ8Blv3M97WjgxWbYH4jJT4qtzLNUCHgHwOst0RrKaRadnDOn8GrX+Rmm7lCLoW6br/NX8f2s3V948z2XKEK/o3LzHZcoTxLYdp+OUhMlhFO5O0BZovheZLIadKyNkyErAciq+g9WHfM0mWc3L6aVC8ypDfFlLiM1Ly+8Kb8SYdlCGnnwX/A4YTvOyIJIL8AAAAAElFTkSuQmCC'
			},     
	]
	},

{name: '国内网站',
	favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDElEQVQ4jb3ToW4CURAF0GMRKBSuBoVGYXArSCUfwAdgalbwBfxAg+ofNEFXVuCqMBgMYkWxDY6k4g3tY7sNxXSSSd7unTtz985b/ine8IEtntC7tUEXrSCWeMf4lgZ3mKAfz4No0qhkhGe8ZoQHrLDHIt6V0udcxCKKpkF6qeHtwPuhap+DjzG1kylZR6M1dphFjqJmcibPsIkJ5+hIrq+CUOJUqyHkHFxfzUbyplsHlpjHuUAVWdTqBpJpB9znwC6bXmEYWf2ipAg1X3HKzn9pMJZMvVAwyMBKWk/TTetF/QU2CcJMMrTucjtkL6XbN22SNZQM2uIYWUk/0DEkz33fkavRktb1Y+f1+AQEET4cDdInTwAAAABJRU5ErkJggg==',
	childs: [
{
      name: '新浪微博',
      url: 'http://m.weibo.cn/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABTVBMVEUAAAAAAADjHyW4uLhgYmLhExfvkADiJyjeGxzdGCbgKSTeGRvjUBffYBH6///t////9/j/8fLL4uH/2NnQ0NC+y8uLpqXyn6D9jI93i4t4ionsbG9XWVnnRklDQ0MkJCQUFxfiIyj9mADgFBj+ogDdAwfgEhbxlAD5mADxP0PlKSreESvwkwDiDRDxlADhGSfgIyb4mgDWgADiFy3EgQDxlwHfCg/ylAD9lQHzJirgGynfFiX6LTHjKSzliQDaHiHjDA/GAADkEhbxlADynQCQWADZnwDfISPclgDwkwC/fgDOEhLbHyPxlAD2mgDoDBDvAC7rjgDsjwDMdAD////lJCjgDBDgBgviHCDhFRn/kpTqVlnmOz/kKCzhEBXeAAT2mAD/3d6yxcX7nqD0nZ9/mpn0j5Lwi47miYv6f4I9Xl3oOT0bOzvkLzPiGCoKOc6VAAAAVHRSTlMA/tL+/qaMZ2JKNRkJBf7+/v7+/v7+/v7+/v7+/v7+/v78+/r49/Dq5OLi4ODU0crKyr63trSzsrGqqKWgnZeShYFya2FZWFVTUE5NREM7NzYxJhObZE0TAAAAxElEQVQY033Ixa4CQRRF0VON23N3d3fB3fVWC+4O/z8EEiYkhDXa2VjA8/Qdmxnah+tyaNp6hwGweNPacgpjUYHzO8D8eZN5ewWg41yWBf3/u/Hnw3cBBApKSZTPJXH4F/fbz2A6lQo76yuV+qH0DISDsEm51aWt3TWiffE+CeAqT8snjDEV0UARAJRapD5WHTE1Ub74AuArR3sHG4xt0rbIDQBMjx1q9LtVahYVHSYsrttsu5btXWqMmEq4rb8aZ8SMuUY5GiMfE/vy4wAAAABJRU5ErkJggg=='
       },{
		 name: '头条新闻',
		 url: 'http://m.toutiao.com/',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6ElEQVQ4jY2TMUjjYBTHP0ihi5Bu3RyE4ObSqYvg4uTqKoKrdHJ1KwgWN0GHiggOTh10cigIIggdhK5XB5WeaXLJJd8lXiA0vxteUltPjwv8+R557/147/veU8AQ0J9pPB5/qTxmqMi/OIomSpKEJEnwfB/P9wm0Js4ynDjmNQwJx+MiDZWTGALfcg0BHxjl9giIs4xRmvIahgRBAGEILy9a8fCgs24X9+QE++CAYH+fZHubaHOTeGuLX6ur/J6fJ6tWSUsl0lIJymUwTTAMrVBKoxT/1NoaLC+Ldndhfb3wTQEsC66uYGEBbm9hb0+C2m0pt9mEXk8aLwCGoRWGIYBajazbhcVFGAwmgKxaheNj6HTg+Rk2Nt4rmwGYJrRa4uj3YWdH7KUlAdzfw8WFqNH40EK5LAlnZxIAAqnX3/8PBlLB9fWHFpTSmKYknp9L8tOTnJYlyZ2OVNBoyD0VFcwAWi25sKKNZhNqNXmBel3sonfL+uQV/kNppUIyN0daqQhwZUUrjo407TbJ4SHx6Slvl5e83dwQ3d3h93p4/T4/Hx+JHQfHtvnuedOjrCej7E6NbSE3P/18lH+kKU4c/wUAIAgCbNvGdd0ZOY6D5/vEUYTruti2LbswtUzDYnXTNP1S0/7pdf4DuhchZvJmk2cAAAAASUVORK5CYII='
			},{
			name: '知乎日报',
			url: 'http://zhihudaily.me/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAw1BMVEVi0f8wwf0tv/wrvfgDmc0NodcHnNEWp+IUpd8Qottl0//l9/4hs+4dsOkJndQEm88aq+cQpdwKn9UFls0Bl8sDlcv0/f8+xf2v4fap3vQjtvEeruwUo94KmtEBlMnr+v8oufQZrOUYquT4/f/c8/zS8PzK7fs0wPuo4vp61fq35fl20fYouvUouvQkt/Eis/Ass+0gqN4Qndbf9fu/6fgoufWj2vIwt/GQ0++Ez+5fwedhwuVbvuMpquNHsNwWotATkrsPqyMnAAAAuklEQVQY003HVxKCQBBF0VYHGBlAJ0gSJJhzznH/q7KBssrz0f0umKYJP1V4tT8edr00Hlffg0ZhOuz3h9NywnJxTCcu833mTtJ0sYRVGM7d2Xm93vjuPAxXYFnWiG266LkfYYBt20nQLhinBAOyPEsCoxC9rnmegUHpYbCNKKXRDq8BnDdvLNg2S5xz0IS2u7BBcNcqIBwnjh8z5jtICAG63iJSyjjWK0AI6SApCWkV4KOU6qGOUgS9v3y4Ew0x8HFQAAAAAElFTkSuQmCC'
						},{
      name: 'ONE一个',
      url: 'http://wufazhuce.com/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA9klEQVQ4je3RMUvDYBDG8TeCoIvWwQ5B3QSpo+DqqpPfQMHR7oJTQUFwKeL3aGo0DUYUBXGoUlQklLq7NfemaU0Qh79DhCLp5lLQ4eGe6Qd3p4yq8Juof+AnMGkH5J20T9j9OXUqmI4wWg1QlTaqEmSBlZuQ0kuX4mOPrYceztsHixchJT/mqJWweR8x52qWLjUFT2eBg2bMiJXKh82Yfb+f49eE3acus65m7VpT8MIssHobsfP8zkY9YrsRsefHmDVNvf1JuZWwftchdyYsX3UwBq1gWMKMq5k/T/v09y3yjmDWhAVPM2YL4yeCsgYBQ/HGPwp8AZZWrx7eI2yVAAAAAElFTkSuQmCC'
       },{
      name: '青年图摘',
      url: 'http://www.qingniantuzhai.com/home',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAB3VBMVEX////9/f39///m6e3AwMb7//7//v/9/P///vn49vj39PPf3t/a19nOzdLLycz+/v72+Pzz9fbw9PX39fPy7vL89/Hr6enp5eba4OTo5uLX3d3FyM7DyMrAw8n+/f///vf////1///6///b8v202utfpNIacrj9///0/f/y/f/n9v/k+P3//vrz9fjE5/Ww3fTi7PKu0+ik0Ofk5OSYxOHh3+AdjNzX2dgji9cliNQWgtMjhs7Gx8tTmMcLeMa7wcMRdr46gbowgLkpernu///u/P/O8P7z+Pvg8Pn5+Pj49PjT8vju9vb59vXd7vX19PTs8vTt8fPM6vPX6fPe6PLz8vHn7PD68+/v7++k1+/F4uvi5efO2+S81eSOy+R9veOoyeKbxuFjuOHX3uCkyt+90968y96EvNubx9p9udlTn9jc29fP09eoytePvdeTvNaPu9WAttXHy9OEudMahdMmidEuitAsiNBWnc9MmM9+ss45kM4Wgc5opctnnstKkss7jctcnMoMeMnJyMdEjsclfsfBxMZansQifMQqg8MXe8PCxMIefsIIdMIogcBFir8xgb1Vkbwhe7sAaboAZ7cTbbM2fbEWcq8odK4AYakjcKgZaahUhacWZJ8RWooFPSyqAAAAIHRSTlPv/e/v7/vv7+/v7+/v7+/g7+/v7+/v7+/v7+/v7+/g4LIH5V0AAAEISURBVBjTHcjTdgMBEADQSbJJ49TGLGPbqm3btm3b/tae5j5eUIkgM08pEwiylfkCEBeBEN3hLkywh93IA5i6IpG2Djj6a7HidAgg9aiGGg7eHay/zqvRGEiBXDvORfesOrrHsdmJThnkIBPbtyFJ4eznQzkvCyTa3ZNJvaHMiOat+DimA5iiaxt6Q1sldqyeT5BJAOZHz8UCieqmoJdb+o/G2PLKLdvbd+z3fM1gMmQUs08u73Xk0u8KnZEtUpBWm96fQ9s+3+FNZLDUkgZ8Z33VTpx74e7Zt4/fERFA3bSFohkbQ1NjP98NfOBhe2CxVaMt0TV3j2pQCCoAiZwgFIoCQi4GfuEfTMs8p+k60I8AAAAASUVORK5CYII='
       },{
      name: '博海拾贝',
      url: 'http://bohaishibei.com/post/category/main/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVQ4jWNgz/n6lyPn639cmCf1Lk7MnXL3DwM+zYQM4Em9+582Bjx9/ggrptgAbIYQNIAn9S5lBiBj4cwhGwbI4UB/F5BlQOi0d3Ac1Hv7v3QevZMySQaw53z9RkF2/gcAyESn8EKXSckAAAAASUVORK5CYII='
       }, 
{
			name: '内涵段子',
			url: 'http://m.neihanshequ.com/?skip_guidence=1#',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABoVBMVEUAAADis34yCwMAAAAYCQKheVqikn9UIw6qe04oEAU8GA6Qa1h1NSFeKRSAa0yshmkfCQKTYDkVCAOETyRkTTxLQThFKxdxUzVuNCRAJhNJFxBhLRoYDQahSzg1IBAlGA1IFg0nEAUPBgEWDAZNOy1THBkDAwM5EAP9w4f+woADAAD/6ab/6KHmxaH/15n/5Zb/z5TlyZH/1o3/yIzUrYDmqm/BkmqgZzxXOiZZLhNAFQUZAAD//83/87b/yaX/taP/36L/v6D/w5//657/zpz1wZP/4JHQspG0pZHnvJD/047yw4750435zYz/zon/rIn2uYjpmYj8o4fzu4b/X4b1v4X/cIX3voTMqoTpxIDZq32dgXv1t3rxs3j/vnf/vHT8uXSxnXSfeW7QnGugemr/uWn8rWbYm2POmGO6kGLOo2GrlWHNjmD4pl/CkV+cfl7Yk1fAhlWqflPPX1O4fFDFhU+gd0zfdkyMYkiia0XeR0R0VUCXZD9nQD2pZjqSYTmwXDd2UTW0UjPQSS5oOx5qMh5RKBRbJhJPIA8tDAAlBQBxpIPKAAAAJ3RSTlMA/o5PMO7r6t3a1Mq+t7KtqqScl5CQiYV9d2ppaGNiWFdORjgwGg2YmS65AAAA0klEQVQY02MAA2keXnYmBgRgaW/tsOoUQAgwdVmrW7apWylC+RJmZjWh2pp16upKYL6Cu422Tl6Fp7O5NSdYgCvfwFjTpNpCz6hFiwUkwGaboBEQraupoW+uxQwS4E5ycQiuTXQzjq/XkgHyhStTdA18nML8DT0sG0vlGBgEXe2j0iPtQoIMI4pMTMWBSvgdM7NLTPV9w1MLWUXUgAIqOcWBVQ1e3hq5QlCH8ZU3N2Xo+aWJwVyuyphlpBNTIInwi6xFWXJsnDySd6WYRRk5lMFMAC2EKlCeRWrCAAAAAElFTkSuQmCC'
						},{
      name: '知乎网',
      url: 'http://m.zhihu.com/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACN0lEQVQ4jY2TsUtbYRTFr6Obg2SpuLm4908oLi6CS0FIEUIDIVDxGU0zWAKtxKlLl4JTaB10kFCkYmmH4lAxGuN7vufrSxC0khir8XupD2Pw1+HFaC2ow+Hj3g8O99x7joi2vSgxS0nMUqJZroyaqlXfB217UWTCRsZ3fERN2hM2bfEbvbswYSMSs5SM7yDPdcYyZRKfDpGBDSSYR4a3kBHLf4P5awxv+QRxy5Xm6EjYwK01qHoNXmcOSWdPSecUvdNFogtl0jnFvO6Szilefq74U46ayicI6Tx5vwdAerUKQG7f4+PKcau/Ujxjbl2xUjwDIJB0kKipRDTLlbDBkumSWj5Cgnl2K+d0JR2kb43uqQKVWgPRLKQ/i4zvUFIXdE8VmgQxS7UnbDoStq89YlA6qft13xqdkw5Vr8GjNwUkpNOTKlKpNesrAokYDM7skc6eMq+7ePVLlkyXuXVFdKFMbt+7g0CzXImaRBfKLY1e/ZIPm4q5dcVY5j6CmKXa4jYSMZD+LI/f7lI6qfvn6lsjkHyIhCtjDOV59/0YgC+Gi4R0AkmHkrrw/wc2EM36f4ltcRsJG3QkbACezR5g/PKY113am73g7AGDM3t8Ldw+Y8xSMuIbyamc49UvkaE8nZMOP37+IZB0eLV8BEDppE56tXrLSJrlSsQg9e03lVqD3ukiEjZaubhp866kgzzd9PfTsnJTf0+q6DcjxnWYRqzr4IR0JGr+G7QJG2nF+YXp46FRbsb5L1YsqexjT2C1AAAAAElFTkSuQmCC'
       },{
      name: '豆瓣网',
      url: 'http://m.douban.com',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABGElEQVRYhWNgKOfzZCgXfMZQLvifzvgZQzmfJ8MAWY5wxABaDsGDzgEP3j36Tyvw4N2jUQcMgTQwaBxw4dllqgX9hWeXh7gDbry6/b9hdwdJ+Mar29RzwIarW0mO2w1Xt446YBg5YMATIaVgaDoAhnfc3As36NGHJ/8VOvTx4kcfnsDV77i5l3B6IaQgZU0eim/Ue0xxqlXvMUVRm7Imj3IHyLRpoxhasLkKp9qCzVUoamXatCl3AEO54P9Lz6/CDd15ax9OdTtv7YOru/T8KnFZlhhFnQcmwg3+8fvHf64aKQw1XDVS/3/8/gFX13lgInkOoDUYdQBZaYCmeNQBDAPZOS0TfM7AUMrnxVAm+HwAHPCEoZTPCwCpFBoqmuUyPAAAAABJRU5ErkJggg=='
       },{
      name: '果壳网',
      url: 'http://m.guokr.com/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4klEQVQ4jZXRoQ6DMBAGYB5iZpnBoCdHZjA8wOYa/BSCDINAkBBmcAjkknksdhq3JwCFm+INbuq6o/Q6dknlfX/b39rcDrDmBI8jlJ0HZefB+bKTx1oL4HLWunPAaYa/0rXAtgqNQNa6Erje90vAdAuaXnYeiNiWyyLxvwCHmIAiDeaA7il0WW2gzqM5oCJqOgVE4usB+hT6eWoDRRrwwLYKtem0gTqPeMBpBkifJxYQsf0b6KdxAWADeH0WyF5vAIAFggAus0A/jYCja8AIYDod2gDWxwI0HaefRgnQ99d5BB+ezV767XUN9QAAAABJRU5ErkJggg=='
       }, {
		 name: '句子迷',
		 url: 'http://m.juzimi.com/',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABgFBMVEUAAADhaQDyewbzfQfjbADfVwD1ggviagDgYwDhZQD1gQveaQH1gw31fwrjbADgXQDhYADfWABQ5kRO6EX1hA5R5kTsdAT3ggjjbQDgWgA3/FD0fQXhagDhaAD2bQDzfwniawDjZgDoUAA1+k1G6UDibADiagBF6kT0ggzxggv////4gwD/6s72fALjZgD81q37tWH3iBP3hRD4hgX3gAP1cQDiYwDhYADhWADfUQD//f354Mr41rn92rD90qD905z6ypr4sGr6sVrslkn+rz7ofyLneBT1dgD1bQDkawD1agDhXAD/+vT89vL78uv+9er87uH/7dL75dD84sf52b7827f3z6j91ab1zJ/1xZn8zJX8yZL7yZH5v4TxtYD5tXv3uHr9w3L5sWr7t2jup2ftpWX8uGH/jVn6q1I8+E/smU/+tUtM50JL50H3mjz5oDv4mTD3lCr2jSX7nSL/pCDxdB/6kxbvgBb9mhT6kAi6hgf/Xwa5ewDQaQD1YgDmXgAGZ/1OAAAAKnRSTlMADfLo6OiwsLBJRTj4+Pj48vLv7enn59fX18C1tbWrpKSkpKNCQkIyDgyvW7uYAAAA7klEQVQY0yXPxWKDABBF0Wm8Sd3d9RGgOMRd6+7u7i6/XghnN3c1jyzVg20Oh7PfT7YqX+6NlUVBED0TlbszO82X8owkMXL7pBl6jA3MJXg+Gl2L3XUTjRo5IATbEesnnxbGbUF6fcpkFjDFeMi9Duxsx+Lxq+egGVqo/iSyCMvBuxnkGqor68sQlE2cfgRxztaSSy2HIZa2kGKCuGed5OXUCCwpZQkPSh+Ncdo8VhP7h/nCLB5/A0S93PGu/pdM7q0AX5/j5usduqFxMwBCZz/Xw9YYb7GoZi/T6Zfvm4tWe/6Aq6HRPRQY6Wpq/geaODHRno1+SgAAAABJRU5ErkJggg=='
			},   
{
		 name: '煎蛋网',
		 url: 'http://i.jandan.net/',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABkklEQVQ4jX2Tu0sDQRDGRxuxsJH4QLSy9W/Qyl4QrARrEazsLKwES0EEQWwURGx8NGIjCEEtBAslaBGMj/gIPpa5GBNj9mdxe/ES7xz4uN2Zb7+ZuZ0VIAtoFL6SD2rfo2MOWSHObApvfIDPxQmwmViaOKWQ3UNxGlTACPZOQFt8H1/157VWwKZAe3x3qQ5GwBvwE8QKfAyCET5zwtutQF5A3do4FCdjBMwH3DRBRcicC3sbAgi23MjehhOpCKQT4ZQhAW8YnhuqWakIrHbDZqe/VlfRcwPoVEjA5hRv+Jdg3Lci/uHdtl8BE+IUJ4GyCuWkVgNBMCDjEPYVQjxrVPg+VtSVFm4hCvk6njUqWKPYA7joh7S7shgBW26ElMDlCNgD10LwE19v/xfIu/JT4t9Y5BzczfgiQe9BO8H+SuBp6Z9BAtBZjrZa8S674DEBLwmuT9o53e2A9/XIUa6xbM6SaO5lYW4eSgUoFRgdGqOnvQ+vVM/2a6t5zjeZrC6vrOlh8qzq297Z1+WVNTVG/zznH3wYY1UC31I3AAAAAElFTkSuQmCC'
			},         
	]
	},


],

		makeButton: function (sitelist, parent) {
			var i,
				len = sitelist.length,
				item,
				btn,
				menu,
				menupopup,
				menuitem,
				frag = document.createDocumentFragment();
				insertpoint = document.querySelector('#sidebar-header .close-icon');
			for (i = 0; i < len; i++) {
				item = sitelist[i];
				if (item.childs) {
					if (!parent) {
						btn = frag.appendChild(document.createElement('toolbarbutton'));
						btn.setAttribute('tooltiptext', item.name);
						btn.setAttribute('type', 'menu');
						btn.setAttribute('style', getIconStyle(item));
						menupopup = btn.appendChild(document.createElement('menupopup'));
						SidebarMod.makeButton(item.childs, menupopup);
					} else {
						if (item === 'sep') {
							parent.appendChild(document.createElement('menuseparator'));
						} else {
							menu = parent.appendChild(document.createElement('menu'));
							menu.setAttribute('id', item.name);
							menu.setAttribute('label', item.name);
							menu.setAttribute('class', 'menu-iconic');
							menu.setAttribute('style', getIconStyle(item));
							menupopup = menu.appendChild(document.createElement('menupopup'));
							SidebarMod.makeButton(item.childs, menupopup);
						}
					}
				} else if (parent) {
					if (item === 'sep') {
						parent.appendChild(document.createElement('menuseparator'));
					} else {
						menuitem = parent.appendChild(document.createElement('menuitem'));
						menuitem.setAttribute('label', item.name);
						menuitem.setAttribute('tooltiptext', item.name);
						menuitem.setAttribute('url', item.url);
						menuitem.setAttribute('class', 'menuitem-iconic');
						// menuitem.setAttribute('src', item.favicon);
                        menuitem.setAttribute('style', getIconStyle(item));
						menuitem.setAttribute('oncommand', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
                        menuitem.setAttribute('onclick', 'SidebarMod.itemClicked(event, this.getAttribute("url"));');
					}
				} else {
					btn = frag.appendChild(document.createElement('toolbarbutton'));
					btn.setAttribute('tooltiptext', item.name);
					btn.setAttribute('style', getIconStyle(item));
					btn.setAttribute('url', item.url);
					btn.setAttribute('onclick', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
				}
			}
			insertpoint.parentNode.insertBefore(frag, insertpoint);

            function getIconStyle(item){
                if(item.style){
                    return item.style;
                }else{
                    if(!item.favicon){
                        return item.childs && getIconStyle(item.childs[0]);
                    }
                    return 'list-style-image: url("' + item.favicon + '")';
                }
            }
		},
		makeSplitter: function () {
			var sidebarBox = document.getElementById('sidebar-box'),
				splitter = sidebarBox.parentNode.insertBefore(document.createElement('splitter'), sidebarBox),
				sidebarBoxArrow;
			splitter.setAttribute('id', 'sidebar-box-splitter');
			splitter.setAttribute('onclick', 'toggleSidebar();');
			sidebarBoxArrow = splitter.appendChild(document.createElement('div'));
			sidebarBoxArrow.id = 'sidebar-box-arrow';
			sidebarBoxArrow.className = sidebarBox.hidden ? 'right' : '';
			//sidebarBoxArrow.className = sidebarBox.collapsed ? 'right' : '';
		},

//添加侧栏前进、后退、刷新按钮
			addControlBtn: function(){
				var SHBtn = document.getElementById("sidebar-header");
				if(SHBtn) {
					var _sidebarBtn = document.createElement('toolbarbutton');
					_sidebarBtn.setAttribute('type', 'button');
					_sidebarBtn.setAttribute("tooltiptext","左键：后退\n中键：刷新\n右键：前进");
					_sidebarBtn.setAttribute("class", "toolbarbutton-icon");
					_sidebarBtn.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAAAbUlEQVQ4jWNgGK5Ajpbq7RgYGH4xMDAoEKleAarejhTDiVJMqj5yDSdKP6WG4zUnhEjDWxkYGL5AaWIsCYEJ/GdgYCghwnW/oGq/EKG2BKqWgYGBDj5AFqRJHFDLEpomVZL00TQnwwBNyyKqAgAC4Cdg6UykrwAAAABJRU5ErkJggg==");
					_sidebarBtn.addEventListener("click",
					function(event) {
						var webPanel = document.getElementById('sidebar').contentDocument.getElementById("web-panels-browser");
						if (event.button == 2) {
							event.preventDefault();
							event.stopPropagation();
							webPanel.contentWindow.history.forward();
						} else if (event.button == 1){
							webPanel.contentWindow.location.reload();
						} else {
							webPanel.contentWindow.history.back();
						}
					},
					false);
					SHBtn.insertBefore(_sidebarBtn, SHBtn.childNodes[2]);
				}
			},

//添加侧边栏自动隐藏
			addControlBtnAutoHide: function(){
				var AutoHideBtn = document.getElementById("sidebar-header");
				if(AutoHideBtn) {
					var _sidebarBtn = document.createElement('toolbarbutton');
					_sidebarBtn.setAttribute('type', 'button');
					_sidebarBtn.setAttribute("tooltiptext","切换侧边栏自动隐藏");
					_sidebarBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
					_sidebarBtn.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATUlEQVQ4jWNgoCL4TyTGawAxltDXAHk0fj8pBtgxMDD8gtIwIESsAf5YNBMEMAPsGMiMDaq5AAYcsBhCdBjAAEWxQLIaqhhAUV4YGAAA3l8zjx3CRDcAAAAASUVORK5CYII=");
					_sidebarBtn.addEventListener("click",
					function(event) {
						var webPanel = document.getElementById('sidebar').contentDocument.getElementById("web-panels-browser");
						var id = [16]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
					},
					false);
					AutoHideBtn.insertBefore(_sidebarBtn, AutoHideBtn.childNodes[3]);
				}
			},


//添加侧边栏靠右按钮
			addControlBtnFloat: function(){
				var FloatBtn = document.getElementById("sidebar-header");
				if(FloatBtn) {
					var _sidebarBtn = document.createElement('toolbarbutton');
					_sidebarBtn.setAttribute('type', 'button');
					_sidebarBtn.setAttribute("tooltiptext","切换侧边栏停靠位置");
					_sidebarBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
					_sidebarBtn.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoDH4D8UjyQAPBgaGPDwG5EHVYAUzoZiQC7CpgyskFaOAPBJckMeAA1AUBtjAEEwHVDeA9gAASBEtJY6crfkAAAAASUVORK5CYII=");
					_sidebarBtn.addEventListener("click",
					function(event) {
						var webPanel = document.getElementById('sidebar').contentDocument.getElementById("web-panels-browser");
						var id = [15]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
					},
					false);
					FloatBtn.insertBefore(_sidebarBtn, FloatBtn.childNodes[3]);
				}
			},


			toggleSidebar: function (commandID, forceOpen) {
				var sidebarBox = document.getElementById("sidebar-box"),
				sidebar = document.getElementById("sidebar"),
				sidebarTitle = document.getElementById("sidebar-title"),
				sidebarBoxArrow = document.getElementById('sidebar-box-arrow'),
				lastcommand = commandID || sidebarBox.getAttribute('sidebarcommand') || sidebarBox.getAttribute('sidebarlastcommand') || 'viewHistorySidebar';
				
				if (!commandID && sidebarBox.hidden) {
					if (sidebarBox.getAttribute('sidebarcommand') === '') {
						toggleSidebar(lastcommand, true);
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
					} else {
						sidebarBox.hidden = false;
						if (sidebarBoxArrow) sidebarBoxArrow.className = '';
					}
					return;
				}
				
				if (!commandID) commandID = sidebarBox.getAttribute("sidebarcommand");
				let sidebarBroadcaster = document.getElementById(commandID);
				
				if (sidebarBroadcaster.getAttribute("checked") == "true") {
					if (!forceOpen) {
						if (sidebarBox.getAttribute('sidebarcommand') !== 'viewWebPanelsSidebar') {
							sidebar.setAttribute("src", "about:blank");
							sidebar.docShell.createAboutBlankContentViewer(null);
							sidebarBox.setAttribute("sidebarcommand", "");
							sidebarTitle.value = "";
							sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						}
						sidebarBox.setAttribute("sidebarcommand", "");
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						sidebarBroadcaster.removeAttribute("checked");
						sidebarBox.hidden = true;
						if (sidebarBoxArrow) sidebarBoxArrow.className = 'right';
						gBrowser.selectedBrowser.focus();
					} else {
						fireSidebarFocusedEvent();
					}
					return;
				}
				
				var broadcasters = document.getElementsByAttribute("group", "sidebar");
				for (let broadcaster of broadcasters) {
					if (broadcaster.localName != "broadcaster") continue;
					if (broadcaster != sidebarBroadcaster) broadcaster.removeAttribute("checked");
					else sidebarBroadcaster.setAttribute("checked", "true");
				}
				
				sidebarBox.hidden = false;
				if (sidebarBoxArrow)sidebarBoxArrow.className = '';
				
				var url = sidebarBroadcaster.getAttribute("sidebarurl");
				var title = sidebarBroadcaster.getAttribute("sidebartitle");
				if (!title) title = sidebarBroadcaster.getAttribute("label");
				sidebar.setAttribute("src", url);
				sidebarBox.setAttribute("sidebarcommand", sidebarBroadcaster.id);
				if ( title &&  title !== '') sidebarTitle.value = title;
				sidebarBox.setAttribute("src", url);
				sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
				
				if (sidebar.contentDocument.location.href != url) sidebar.addEventListener("load", sidebarOnLoad, true);
				else fireSidebarFocusedEvent();
			},

			modifySidebarClickBehaviour: function () {
				var sidebar = document.getElementById('sidebar');
				sidebar.addEventListener('DOMContentLoaded', function(){
					if (sidebar.contentDocument){
						sidebar.removeEventListener('DOMContentLoaded', arguments.callee, false);
						var wpb = sidebar.contentDocument.getElementById('web-panels-browser');
						if (wpb) {
							wpb.onclick = null;
						}
					}
				}, false);
				
				eval("window.asyncOpenWebPanel = " + window.asyncOpenWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
				
				eval("window.openWebPanel = " + window.openWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
			},

			init: function() {
				window.toggleSidebar = this.toggleSidebar;
				this.makeButton(this.sitelist);
				this.addControlBtn();
				this.addControlBtnFloat();
				this.addControlBtnAutoHide();
				this.modifySidebarClickBehaviour();
			}
		};
		
		SidebarMod.init();
	}
})();




