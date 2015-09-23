// ==UserScript==
// @description  Tab Plus 标签页增强
// @description	 新标签打开（利用空白页）
// @include      chrome://browser/content/browser.xul

// 2015.09.21  換用新版新標籤打開
// 2015.09.20  加入中键书签，GM不关闭菜单
// 2015.04.21  加入滾輪切換
// 2015.01.23  新标签打开『查看图片』
// 2014.07.26  點擊頁面恢復原來的地址
// 2014.05.14  修改激活左侧标签
// ==/UserScript==

(function() {
    //新标签打开:书签、历史、搜索栏
    try {
        str = openLinkIn.toString();
        str = str.replace('w.gBrowser.selectedTab.pinned', '(!w.isTabEmpty(w.gBrowser.selectedTab) || $&)');
        str = str.replace(/ &&\s+w\.gBrowser\.currentURI\.host != uriObj\.host/, '');
        str = str.replace(/loadInBackground = false;/g, 'loadInBackground = aInBackground;');
        eval('openLinkIn = ' + str);
    } catch(e) {}
    //地址栏新标签打开
    try {
        if (location.href == 'chrome://browser/content/browser.xul') {
            str = gURLBar.handleCommand.toString();
            str = str.replace('&& !isTabEmpty', '|| isTabEmpty');
            str = str.replace('|| altEnter', '|| !altEnter');
            eval('gURLBar.handleCommand = ' + str);
        }
    } catch(e) {}
	//总在当前标签页打开Bookmarklet
    eval("openLinkIn = " + openLinkIn.toString().replace(/(?=if \(where == "save"\))/, 'if (url.substr(0, 11) == "javascript:") where = "current";').replace(/(?=var loadInBackground)/, 'if (w.gBrowser.currentURI.spec == "about:blank" && !w.gBrowser.mCurrentTab.hasAttribute("busy")) where = "current";'));
})();

/*=====以下爲另外收集整合的腳本=====*/

//紧邻当前标签新建标签页
(function() {
    try {
        if(!gBrowser) return;
    }catch(e) {
        return;
    }
    
    gBrowser.tabContainer.addEventListener("TabOpen", tabOpenHandler, false);

    function tabOpenHandler(event) {
        var tab = event.target;
        gBrowser.moveTabTo(tab, gBrowser.mCurrentTab._tPos + 1);
    }

})();

// 关闭当前标签页回到左边标签
/*try {
eval("gBrowser._blurTab = " + gBrowser._blurTab.toString().replace('this.selectedTab = tab;', "this.selectedTab = aTab.previousSibling? aTab.previousSibling : tab;"));
}catch(e){};*/

//标签页关闭后激活左侧标签页
(function() {
    try {
        if(!gBrowser) return;
    }catch(e) {
        return;
    }

    gBrowser.tabContainer.addEventListener("TabClose", tabCloseHandler, false);

    function tabCloseHandler(event) {
        var tab = event.target;
                // 如果是因下载而产生的空白页
                if (tab.linkedBrowser.contentDocument.URL == 'about:blank') return;
                if (tab._tPos <= gBrowser.mTabContainer.selectedIndex){
                        if (tab.previousSibling) {
                                gBrowser.mTabContainer.selectedIndex--;
                        }
                }
    }

})();

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
    
//新标签打开『查看图片』
location == "chrome://browser/content/browser.xul" && document.querySelector("#context-viewimage").setAttribute("oncommand", 'openUILinkIn(gContextMenu.imageURL,"tab")') & document.querySelector("#context-viewbgimage").setAttribute("oncommand", 'openUILinkIn(gContextMenu.bgImageURL,"tab")')

//滚轮切换标签
    gBrowser.mTabContainer.addEventListener("DOMMouseScroll", function(event){
        this.advanceSelectedTab(event.detail > 0 ? +1 : -1, true);
    }, true);

//自动关闭下载产生的空白标签
eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
&& aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank") {\
aWebProgress.DOMWindow.setTimeout(function() {\
!aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
}, 100);\
}\
'));

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
