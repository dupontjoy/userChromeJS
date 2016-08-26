// ==UserScript==
// @description  Tab Plus 标签页增强
// @description	 新标签打开（利用空白页）
// @include      chrome://browser/content/browser.xul
// @version      2016.08.24 修复滚轮切换标签

// ==/UserScript==

location == 'chrome://browser/content/browser.xul' && (function() {
    //地址栏新标签打开
    try {
        if (location.href == 'chrome://browser/content/browser.xul') {
            str = gURLBar.handleCommand.toString();
            str = str.replace('&& !isTabEmpty', '|| isTabEmpty');
            str = str.replace('|| altEnter', '|| !altEnter');
            eval('gURLBar.handleCommand = ' + str);
        }
    } catch(e) {};
    
   // 新标签打开:书签、历史、搜索栏
  /*try {
    eval('openLinkIn=' + openLinkIn.toString().replace('w.gBrowser.selectedTab.pinned', '(!w.isTabEmpty(w.gBrowser.selectedTab) || $&)').replace(/&&\s+w\.gBrowser\.currentURI\.host != uriObj\.host/, ''));
  } catch (e) {
  };*/
  
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

   
//新标签打开『查看图片』
location == "chrome://browser/content/browser.xul" && document.querySelector("#context-viewimage").setAttribute("oncommand", 'openUILinkIn(gContextMenu.imageURL,"tab")') & document.querySelector("#context-viewbgimage").setAttribute("oncommand", 'openUILinkIn(gContextMenu.bgImageURL,"tab")')

// 滚轮切换标签
gBrowser.mTabContainer.addEventListener("wheel", function(event) {
    gBrowser.tabContainer.advanceSelectedTab(event.deltaY > 0 ? +1 : -1, true);
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


//不聚焦地址栏 by skofkyo
//http://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&ptid=1865786&pid=38002012
(function() {
    window.CustomNewTab = {
        init: function() {
            gBrowser.tabContainer.addEventListener('TabOpen', CustomNewTab.newTabfocus, false);
        },
        newTabfocus: function() {
            if (/^(about|http|file|chrome)/.test(gBrowser.selectedBrowser.currentURI.spec)) {
                setTimeout(function() {
                    gBrowser.selectedBrowser.focus();
                }, 0);
            }
        }
    }
    CustomNewTab.init();
})();