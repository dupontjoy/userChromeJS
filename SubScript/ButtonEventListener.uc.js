// ==UserScript==
// @name           ButtonEventListener.uc.js
// @namespace   runningcheese@qq.com
// @description    为工具栏图标增加点击功能
// @author          runningcheese
// @version         0.0.1
// @license          MIT License
// @compatibility  Firefox 29+
// @charset         UTF-8
// @reviewURL     http://www.runningcheese.com/firefox-v6
// ==/UserScript==


if (location == "chrome://browser/content/browser.xul") {

//右键  GM图标  切换  GM状态
(function (doc) {
        var greasemonkeyTBB = doc.getElementById('greasemonkey-tbb');
        if (!greasemonkeyTBB) return;
        var menupopup = greasemonkeyTBB.firstChild;
        greasemonkeyTBB.addEventListener("click", function (e) {
            if (e.button == 2) {
                e.preventDefault();
                GM_util.setEnabled(!GM_util.getEnabled()); GM_BrowserUI.refreshStatus();
            }
        }, false);
    })(document);


//右键  Pocket图标 弹出 网页版Pocket
(function (doc) {
        var Openpocketonlielist = doc.getElementById('pocket-button');
        if (!Openpocketonlielist) return;
        var menupopup = Openpocketonlielist.firstChild;
        Openpocketonlielist.addEventListener("click", function (e) {
            if (e.button == 2) {
               e.preventDefault();
               gBrowser.addTab('http://getpocket.com/goto?page=a');
            }
        }, false);
    })(document);



//右键  地址栏刷新图标 强制刷新页面（跳过缓存）
(function () {
var UndoClosedTabs = document.getElementById('urlbar-reload-button');
if (!UndoClosedTabs) return;
UndoClosedTabs.addEventListener("click", function (event) {
if (event.button == 2) {
event.preventDefault();
BrowserReloadSkipCache();
}
}, false);
})();

}


//中键点击地址栏自动复制网址
document.getElementById('urlbar').addEventListener('click', function(e){
	if(e.button == 1) goDoCommand('cmd_copy');
}, false);
