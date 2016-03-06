// ==UserScript==
// @name           ButtonEventListener.uc.js
// @namespace      runningcheese@qq.com
// @description    为工具栏图标增加点击功能
// @author         runningcheese
// @version        0.0.1-20160305
// @license        MIT License
// @compatibility  Firefox 29+
// @charset        UTF-8
// @reviewURL      http://www.runningcheese.com/firefox-v6

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

//點擊頁面恢復原來的地址
gBrowser.addEventListener("DOMWindowCreated", function () {
window.content.document.addEventListener("click", function (e) {
document.getElementById("urlbar").handleRevert();
}, false);
}, false);

//当地址栏失去焦点后恢复原来的地址
if (location == "chrome://browser/content/browser.xul") {
var ub = document.getElementById("urlbar");
ub.addEventListener("blur", function () {
this.handleRevert();
}, false);
};

//中键点击地址栏自动复制网址
document.getElementById('urlbar').addEventListener('click', function(e){
	if(e.button == 1) goDoCommand('cmd_copy');
}, false);

//右击新建标签按钮访问剪切板内容
location=="chrome://browser/content/browser.xul" &&
window.addEventListener("click", function(e) {
    if (e.button === 2 && e.originalTarget.className === "tabs-newtab-button") {
        let url = readFromClipboard();
        //原正则 /^(https?:\/\/)?\w+(\.\w+)+\/\S*/
        if (!/^(https?:\/\/)?([\w\-]+\.)+\w+(\:\d+)?[\w\-\/\|\?\.#%&=]*$/.test(url))
        //url = 'https://www.baidu.com/s?wd='+ encodeURIComponent(url);
        url = 'about:config';
        gBrowser.loadOneTab(url, {inBackground:false});
        e.preventDefault();
        e.stopPropagation();
    }
});

//移动添加书签图标到地址栏
location == 'chrome://browser/content/browser.xul' && (function () {
	var uIcon = document.getElementById('urlbar-icons'),
		bmbtn = document.getElementById('bookmarks-menu-button');
	if (!bmbtn) return;
uIcon.appendChild(bmbtn);
})();

// 失出焦点自动关闭查找栏
(function(){
function closeFindbar(e){
        if(!gFindBar.hidden)
        {
                if(e.target.id != "FindToolbar"){
                        gFindBar.close();
                }
        }
}
addEventListener('blur', closeFindbar, false);
})();

/*书签下拉菜单中键不关闭*/
eval('BookmarksEventHandler.onClick = ' + BookmarksEventHandler.onClick.toString()
.replace(/if \(node\.localName \=\= \"menupopup"\)\n\s+node\.hidePopup\(\)\;\n\s+else/,''));
eval('checkForMiddleClick = ' + checkForMiddleClick.toString()
.replace('closeMenus(event.target);',''));

/*GM中键切换开关不关闭下拉菜单*/
eval('GM_popupClicked = ' + GM_popupClicked.toString()
.replace(/\'command\' \=\= aEvent\.type/,"$& \|\| aEvent\.button \=\= 1")
.replace(/\=\! script\.enabled\;\n/,"$&aEvent.target.setAttribute('checked',script.enabled);\n")
.replace(/closeMenus/,"if(aEvent\.button \!\= 1) $&"));

/*stylish中键切换开关不关闭下拉菜单和右键直接打开编辑*/
eval("stylishOverlay.popupShowing = "+ stylishOverlay.popupShowing.toString()
.replace(/menuitem\.addEventListener.*/,'\
menuitem.addEventListener("click", function(event) {\
if(event.button != 2) {\
stylishOverlay.toggleStyle(this.stylishStyle);\
event.target.setAttribute("checked",this.stylishStyle.enabled);\
event.stopPropagation();\
}else{\
stylishCommon.openEditForStyle(this.stylishStyle);\
closeMenus(this);\
event.preventDefault();\
}\
}, false);'
)
); 

/*显示下载速度*/
(function(){
   eval("DownloadsViewItem.prototype._updateProgress = " +
      DownloadsViewItem.prototype._updateProgress.toString().replace('status.text', 'status.tip'));
})()