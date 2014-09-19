// ==UserScript==
// @description  Tab Plus 标签页增强
// @include      chrome://browser/content/browser.xul
// 2014.09.06重新利用空白页
// 2014.08.31鼠标停留标签自动聚焦
// 2014.07.26點擊頁面恢復原來的地址
// 2014.05.27添加滚轮切换
// 2014.05.14修改激活左侧标签
// ==/UserScript==

 /* Open Bookmarks/History/Homepage/URL/Search in New Tab */
//地址栏、搜索栏、书签菜单、书签工具栏、历史菜单、主页按钮

(function() {
  
    /*open bookmark/history in new tab */
    try {
        eval("whereToOpenLink = " + whereToOpenLink.toString().replace(
            /var shift/,"var Class=e.target.getAttribute('class'); try "
            +"{ if (Class=='') Class=e.target.parentNode.getAttribute('"
            +"class');} catch(e) {} Browser=getTopWin().document.getEle"
            +"mentById('content'); if ((!IsBlankPage(Browser.currentURI"
            +".spec)|| Browser.webProgress.isLoadingDocument) && Class "
            +"&& (Class=='sidebar-placesTreechildren'||Class=='placesTr"
            +"ee'||Class.indexOf('bookmark-item')>=0)) return 'tab'; $&"
            ));
    }catch(e){}

    /*open url in new tab */
    try {
        try { // firefox 3.0.*
            eval("BrowserLoadURL = "+ BrowserLoadURL.toString().replace(
                /if \(aTriggeringEvent instanceof MouseEvent\) {/,
                "_LoadURL(aTriggeringEvent, aPostData); return; $&"));
        }
        catch(e) { // firefox 3.1+
            var urlbar = document.getElementById("urlbar");
            eval("urlbar.handleCommand="+ urlbar.handleCommand.toString(
                ).replace("aTriggeringEvent.altKey && ", "").replace(
                "altEnter && !isTabEmpty","!isMouseEvent && !isTabEmpty"
                ));
        }
    }catch(e){}

    /*open home in new tab */
    try {
        eval("BrowserGoHome = " + BrowserGoHome.toString().replace(
            /switch \(where\) {/, "where = (gBrowser.currentURI.spec!="
            +"'about:blank' || gBrowser.webProgress.isLoadingDocument"+
            ") ? 'tab' : 'current'; $&")); 
    }catch(e){}

    /*open search in new tab */
    try {
        var searchbar = document.getElementById("searchbar");
        eval("searchbar.handleSearchCommand="+searchbar.handleSearchCommand.
            toString().replace(/this.doSearch\(textValue, where\);/,
            "if (!gBrowser.webProgress.isLoadingDocument && gBrowser.curren"
            +"tURI.spec=='about:blank') where='current'; else where='tab'; "
            +"$&"));
    }catch(e){}

})();

function _LoadURL(aTriggeringEvent, aPostData)
{
    var where = (gBrowser.currentURI.spec!='about:blank' ||
        gBrowser.webProgress.isLoadingDocument) ? 'tab' :
        'current';
    if (gURLBar.value!='') openUILinkIn(gURLBar.value, where);
    return true;
}

function IsBlankPage(url)
{
    return url=="" || url=="about:blank" || url=="about:home"
        || url=="about:newtab";
}

//总在当前标签页打开Bookmarklet
eval("openLinkIn = " + openLinkIn.toString()
  .replace(/(?=if \(where == "save"\))/, 'if (url.substr(0, 11) == "javascript:") where = "current";')
  .replace(/(?=var loadInBackground)/, 'if (w.gBrowser.currentURI.spec == "about:blank" && !w.gBrowser.mCurrentTab.hasAttribute("busy")) where = "current";')
);

//书签、历史侧边栏
document.getElementById("sidebar-box").addEventListener("load", function(event) {
  var document = event.target;
  if (document.location == "chrome://browser/content/bookmarks/bookmarksPanel.xul"
      || document.location == "chrome://browser/content/history/history-panel.xul") {
    eval("document.defaultView.whereToOpenLink = " + document.defaultView.whereToOpenLink.toString()
      .replace(/return "current";/g, 'return "tab";')
    );
    eval("document.defaultView.openLinkIn = " + document.defaultView.openLinkIn.toString()
      .replace(/(?=if \(where == "save"\))/, 'if (url.substr(0, 11) == "javascript:") where = "current";')
      .replace(/(?=var loadInBackground)/, 'if (w.gBrowser.currentURI.spec == "about:blank" && !w.gBrowser.mCurrentTab.hasAttribute("busy")) where = "current";')
    );
  }
}, true);

//地址栏回车键在新标签页打开，Alt+回车键在当前标签页打开
eval("gURLBar.handleCommand = " + gURLBar.handleCommand.toString()
  .replace(/aTriggeringEvent\s*&&\s*aTriggeringEvent.altKey/, "!($&)")
  .replace("aTriggeringEvent.preventDefault();", "")
  .replace("aTriggeringEvent.stopPropagation();", "")
);

	// 标签上双击刷新
gBrowser.mTabContainer.addEventListener('dblclick', function (event){
if (event.target.localName == 'tab' && event.button == 0){
getBrowser().getBrowserForTab(event.target).reload();
}
}, false);



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

    //自动关闭下载产生的空白标签
    eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
      if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
          && aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank") {\
        aWebProgress.DOMWindow.setTimeout(function() {\
          !aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
        }, 100);\
      }\
    '));
    
/*// 滚轮切换标签
    gBrowser.mTabContainer.addEventListener("DOMMouseScroll", function(event){
        this.advanceSelectedTab(event.detail > 0 ? +1 : -1, true);
    }, true);
 */
    
	// 點擊頁面恢復原來的地址
gBrowser.addEventListener("DOMWindowCreated", function () {
window.content.document.addEventListener("click", function (e) {
document.getElementById("urlbar").handleRevert();
}, false);
}, false);
    
/*	//鼠标停留标签自动聚焦
     (document.getElementById("tabbrowser-tabs") || gBrowser.mTabBox).addEventListener('mouseover',
    function self(e) {
        if ((self.target = e.target).localName === 'tab') {
            if (!self.timeoutID) {
                this.addEventListener('mouseout',
                function() {
                    clearTimeout(self.timeoutID);
                },
                false);
            }
            self.timeoutID = setTimeout(function() {
                gBrowser.selectedTab = self.target;
            },
            50);
        }
    },
    false); 
*/

/* 重用空白页、新标签页，可自由添加 */
function _LoadURL(aTriggeringEvent, aPostData)
{
    var where = (gBrowser.currentURI.spec!='about:blank' ||
        gBrowser.webProgress.isLoadingDocument) ? 'tab' :
        'current';
    if (gURLBar.value!='') openUILinkIn(gURLBar.value, where);
    return true;
}
function IsBlankPage(url)
{
    return url==""||url=="about:blank"||url=="about:home"||url=="about:newtab"||url=="http://start.firefoxchina.cn/";
}