// ==UserScript==
// @name           ButtonEventListener.uc.js
// @namespace      runningcheese@qq.com
// @description    为工具栏图标增加点击功能
// @author         runningcheese
// @version        0.0.1-2017.08.09
// @license        MIT License
// @compatibility  Firefox 29+
// @charset        UTF-8
// @reviewURL      http://www.runningcheese.com/firefox-v6
// ==/UserScript==
if (location == "chrome://browser/content/browser.xul") {

    //右键  GM图标  切换  GM状态
    (function(doc) {
        var greasemonkeyTBB = doc.getElementById('greasemonkey-tbb');
        if (!greasemonkeyTBB) return;
        var menupopup = greasemonkeyTBB.firstChild;
        greasemonkeyTBB.addEventListener("click",
        function(e) {
            if (e.button == 2) {
                e.preventDefault();
                GM_util.setEnabled(!GM_util.getEnabled());
                GM_BrowserUI.refreshStatus();
            }
        },
        false);
    })(document);

    //右键  自带Pocket图标 弹出 网页版Pocket
    (function(doc) {
        var Openpocketonlielist = doc.getElementById('pocket-button');
        if (!Openpocketonlielist) return;
        var menupopup = Openpocketonlielist.firstChild;
        Openpocketonlielist.addEventListener("click",
        function(e) {
            if (e.button == 2) {
                e.preventDefault();
                gBrowser.addTab('http://getpocket.com/goto?page=a');
            }
        },
        false);
    })(document);

    //右键  扩展版Pocket(Readitlater)图标 弹出 网页版Pocket
    (function(doc) {
        var OpenRILonlielist = doc.getElementById('RIL_toolbar_button');
        if (!OpenRILonlielist) return;
        var menupopup = OpenRILonlielist.firstChild;
        OpenRILonlielist.addEventListener("click",
        function(e) {
            if (e.button == 2) {
                e.preventDefault();
                gBrowser.addTab('http://getpocket.com/goto?page=a');
            }
        },
        false);
    })(document);

    //右键  地址栏刷新图标 强制刷新页面（跳过缓存）
    (function() {
        var ReloadButton = document.getElementById('urlbar-reload-button');
        if (!ReloadButton) return;
        ReloadButton.addEventListener("click",
        function(event) {
            if (event.button == 2) {
                event.preventDefault();
                BrowserReloadSkipCache();
            }
        },
        false);
    })();

}

//點擊頁面恢復原來的地址
gBrowser.addEventListener("DOMWindowCreated",
function() {
    window.content.document.addEventListener("click",
    function(e) {
        document.getElementById("urlbar").handleRevert();
    },
    false);
},
false);

//当地址栏失去焦点后恢复原来的地址
if (location == "chrome://browser/content/browser.xul") {
    var ub = document.getElementById("urlbar");
    ub.addEventListener("blur",
    function() {
        this.handleRevert();
    },
    false);
};

//当搜索栏失去焦点后清空
if (location == "chrome://browser/content/browser.xul") {
    var ub = document.getElementById("searchbar");
    ub.addEventListener("blur",
    function() {
        this.value = "";
    },
    false);
};

//中键点击地址栏自动复制网址
document.getElementById('urlbar').addEventListener('click',
function(e) {
    if (e.button == 1) goDoCommand('cmd_copy');
},
false);

/*书签下拉菜单中键不关闭*/
eval('BookmarksEventHandler.onClick = ' + BookmarksEventHandler.onClick.toString().replace(/if \(node\.localName \=\= \"menupopup"\)\n\s+node\.hidePopup\(\)\;\n\s+else/, ''));
eval('checkForMiddleClick = ' + checkForMiddleClick.toString().replace('closeMenus(event.target);', ''));

/*GM中键切换开关不关闭下拉菜单*/
eval('GM_popupClicked = ' + GM_popupClicked.toString().replace(/\'command\' \=\= aEvent\.type/, "$& \|\| aEvent\.button \=\= 1").replace(/\=\! script\.enabled\;\n/, "$&aEvent.target.setAttribute('checked',script.enabled);\n").replace(/closeMenus/, "if(aEvent\.button \!\= 1) $&"));

/*stylish中键切换开关不关闭下拉菜单和右键直接打开编辑*/
eval("stylishOverlay.popupShowing = " + stylishOverlay.popupShowing.toString().replace(/menuitem\.addEventListener.*/, '\
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
}, false);'));

/*显示下载速度*/
(function() {
    eval("DownloadsViewItem.prototype._updateProgress = " + DownloadsViewItem.prototype._updateProgress.toString().replace('status.text', 'status.tip'));
})()

/**
*ReloadPassCache.uc.js
*按Ctrl+F5所有frame跳过缓存刷新
*/

location == "chrome://browser/content/browser.xul" && addEventListener("keydown",
function(event) {
    if (event.which === 116 && event.ctrlKey) {
        event.preventDefault();
        event.stopPropagation(); (function(content) {
            gBrowser.mCurrentBrowser.addEventListener("DOMContentLoaded",
            function self() {
                this.removeEventListener("DOMContentLoaded", self, false);
                Array.prototype.slice.call(content.frames).forEach(function(win) {
                    win.location.reload(true);
                })
            },
            false);
            content.location.reload(true);
        })(content)
    }
},
true)

//移除按鈕收合的功能
["overflowable", "overflowbutton", "overflowtarget", "overflowpanel"].forEach(function(n) {
    $("nav-bar").removeAttribute(n);
});
function $(id) {
    return document.getElementById(id);
}

	//左键Identity-Box图标 弹出 EvernoteCleary
	(function(doc) {
		var Evernotcleary = doc.getElementById('identity-box');
		if (!Evernotcleary) return;
		var menupopup = Evernotcleary.firstChild;
		Evernotcleary.addEventListener("click", function(event) {
			if (event.button == 0) {
				event.preventDefault();
				ReaderParent.toggleReaderMode(event);
			}
		}, false);
	})(document);



