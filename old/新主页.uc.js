// ==UserScript==
// @name                  toolbarbuttonEX.uc.js
// @namespace        toolbarbuttonEX.uc.js
// @description        添加常用工具列按鈕
// @include               main
// @compatibility     Firefox 4.0+
// @author                skofkyo
// @homepage         http://g.mozest.com/thread-42543-1-1 , https://g.mozest.com/thread-42543-1-1
// @version              1.0.1 2012.10.27
// @updateURL         
// @update
// @note                   
// @include              chrome://browser/content/browser.xul
// ==/UserScript==

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: Home :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */

(function Homebutton() {
// 添加按鈕：
    function createBtn() {
        var navigator = document.getElementById("navigator-toolbox");
		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette") return;
		var HomeBtn = document.createElement("toolbarbutton");
		HomeBtn.id = "Home-button";
		HomeBtn.setAttribute("type", "button");
		HomeBtn.setAttribute("onclick", "HomeBtn.onClick(event);");
		HomeBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
		HomeBtn.setAttribute("removable", "true");
		HomeBtn.setAttribute("context", "_child");
		HomeBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACY0lEQVQ4jYWSXUiTYRiG7/f7nfg5/NzcckQFkdKIpZhkVJoWiKx24EEWaXUgFBFiUQR1IJ4EUYRIRGkHmfQLBYWyiDIUBosKbYmkRxWx2Pyb27dN2fyeDtSR8+85eZ/35r6v9+HlYViliMgAIGfhOskYm1nNu1LYSES2guLyjoLi8g4ishGRcSUvt0LY1Ofxmu0lFe2SJDdIktxgL6lo7/N4zURkSveztLD1QedT0822e4+ULGNR2d7S+wDQ7/Ge0SLhgcuNZ082nDo+wRgLLAMQka3pSvMW94f+x6qq5riqD932fhm0A0DprsLhN+73F6empiarD5adaL3R8pMx5k8BiMh27PS5Qt/wSFduriVeW+O89ar7XZ0+N1cMABzPD9Ycqep8/rL70thYMMNhL6h/9vDuIGPMz4jIVnn4qDMwHmrbvGnj6IF9e5687e2/kGEwWI2KAgCIaFHE4rGxqsr9rX2eT7W/fv/Jt5qzG3u7X/Sw3ZWua6FItKVo546eDRbLyNCP0SYlUxGNxixIkgQASCQSCIfD0LRoYnv+1rbg+Pi2gW9DzuyszGZGRA4AeQAmKlx1n61WCxRFgSiKS347mUwiomkIBIL4+LqrBIAJwF+BMeYjou8A8mSDAaqqgud5JJNJxGdmAQAZBhmyLEMQBIRC0wDgB/CVMUbC/68IoghRlgEA0YiGrjvXqwGg/vxVt6pmgxMECGmTLQFwHAee5+cB0RgA+BZ7s9mU8qwB4MHz85Ku6yld1/WUznH8WgCWmoDj2Lr6MkAsPovQdCTVr6cDaasMwIGl5Vs4l+mLq/wPSgHx6qqiTssAAAAASUVORK5CYII=)";
		HomeBtn.setAttribute("label","\u65B0\u9996\u9801");
		HomeBtn.setAttribute("tooltiptext","\u5DE6\u9375\uFF1A\u539F\u59CB\u9996\u9801\n\u4E2D\u9375\uFF1A\u767E\u5EA6\n\u53F3\u9375\uFF1AGoogle");
		navigator.palette.appendChild(HomeBtn);
    }

		HomeBtn = {
			onClick: function(event) {
				switch(event.button) {
					case 0:
					// Left click
					// 左鍵：原始首頁
					BrowserGoHome(event);
					break;
					case 1:
					// Middle click
					// 中鍵：百度
					gBrowser.selectedTab = gBrowser.addTab("http://www.baidu.com/");
					break;
					case 2:
					// Right click
					// 右鍵：Google
					gBrowser.selectedTab = gBrowser.addTab("https://www.google.com/ncr");
					break;
				}
			}
		}

    function updateToolbar() {
    var toolbars = document.querySelectorAll("toolbar");
    Array.slice(toolbars).forEach(function (toolbar) {
        var currentset = toolbar.getAttribute("currentset");
        if (currentset.split(",").indexOf("Home-button") < 0) return;
        toolbar.currentSet = currentset;
        try {
            BrowserToolboxCustomizeDone(true);
        } catch (ex) {
        }
    });
    }

    createBtn();
    updateToolbar();

})();

/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 以下為運行命令 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: */


function closeAllTabsRestartFirefox() {
  var len = gBrowser.mPanelContainer.childNodes.length;
  var mlabel = gBrowser.mCurrentTab.label;
  if (len == 1 && (mlabel == "Super Start"  || mlabel == "Speed Dial" || mlabel == "\u9644\u52a0\u7ec4\u4ef6\u7ba1\u7406\u5668" || mlabel == "\u65b0\u5efa\u6807\u7b7e\u9875")) {  // 加速重启避免重复关闭某些标签
    Application.restart();
  }
  else {
    gBrowser.removeAllTabsBut(gBrowser.addTab("about:blank"));  // 指定关闭全部标签后打开的页面，在引号内自定义地址
    setTimeout(function() { Application.restart(); }, 300);
}}


function InternetExplorerOpen() {
						try {
						var file = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
						file.append("Internet Explorer");
						file.append("iexplore.exe");
						var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
						process.init(file);
						process.run(false, [content.location.href], 1);
					} catch (ex) {
						alert("\u6253\u958BInternetExplorer\u5931\u6557\uFF01");
					}
}

function GoogleChromeOpen() {
						try {
						var args = [content.location.href]
						var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
						file.initWithPath("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe");
						var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
						process.init(file);
						process.run(false, args, args.length);
					} catch (ex) {
						alert("\u6253\u958BGoogleChrome\u5931\u6557\uFF01");
					}
}

function OperaOpen() {
						try {
						var args = [content.location.href]
						var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
						file.initWithPath("C:\\Program Files (x86)\\Opera\\opera.exe");
						var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
						process.init(file);
						process.run(false, args, args.length);
					} catch (ex) {
						alert("\u6253\u958BOpera\u5931\u6557\uFF01");
					}
}

function PageScreen() {
						var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
						canvas.width = content.innerWidth;
						canvas.height = content.innerHeight;
						var ctx = canvas.getContext("2d");
						ctx.drawWindow(content, content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
						saveImageURL(canvas.toDataURL(), content.document.title + ".png");
}

function PageFullScreen() {
						var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
						canvas.width = content.document.width || content.document.body.scrollWidth;
						canvas.height = content.document.body.scrollHeight;
						var ctx = canvas.getContext("2d");
						ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
						saveImageURL(canvas.toDataURL(), content.document.title + ".png");
}

function FirefoxFullScreen() {
						var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
						canvas.width = innerWidth;
						canvas.height = innerHeight;
						var ctx = canvas.getContext("2d");
						ctx.drawWindow(window, window.pageXOffset, window.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
						saveImageURL(canvas.toDataURL(), "Firefox.png");
}

function copyextensionsList() {
						Application.extensions ? Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(Application.extensions.all.map(function(item, id) {
						return id + 1 + ": " + item._item.name;
						}).join("\n")) : Application.getExtensions(function(extensions) {
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(extensions.all.map(function(item, id) {
						return id + 1 + ": " + item._item.name;
						}).join("\n"));
						});
}

function hideFirefox() {  
    Components.utils.import("resource://gre/modules/ctypes.jsm");
    var user32 = ctypes.open("user32.dll");
    with(ctypes) {
        var findWindow = user32.declare("FindWindowW", winapi_abi, uint32_t, jschar.ptr, jschar.ptr);
        var getWindowLong = user32.declare("GetWindowLongW", winapi_abi, uint32_t, uint32_t, int32_t);
        var setWindowLong = user32.declare("SetWindowLongW", winapi_abi, uint32_t, uint32_t, int32_t, uint32_t);
        var showWindow = user32.declare("ShowWindow", winapi_abi, bool, uint32_t, uint32_t);
    }
    var windowHandler = findWindow("MozillaWindowClass", document.getElementById("main-window").getAttribute("title"));
    var lStyle = getWindowLong(windowHandler, -20);
    showWindow(windowHandler, 0);
    setWindowLong(windowHandler, -20, 0x80 | lStyle)
    showWindow(windowHandler, 6);
    setTimeout(function () {
         setWindowLong(windowHandler, -20, ~0x80 & lStyle)
         showWindow(windowHandler, 6);
         user32.close();
}, 1000);}

function closeAllTabsExitFirefox() {
  var len = gBrowser.mPanelContainer.childNodes.length;
  var mlabel = gBrowser.mCurrentTab.label;
  if (len == 1 && (mlabel == "Super Start"  || mlabel == "Speed Dial" || mlabel == "\u9644\u52a0\u7ec4\u4ef6\u7ba1\u7406\u5668" || mlabel == "\u65b0\u5efa\u6807\u7b7e\u9875")) {
    goQuitApplication();
  }
  else {
    gBrowser.removeAllTabsBut(gBrowser.addTab("chrome://superstart/content/index.html"));
    setTimeout(function() { goQuitApplication(); }, 300);
}}
