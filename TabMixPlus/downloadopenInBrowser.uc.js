// ==UserScript==
// @include chrome://mozapps/content/downloads/unknownContentType.xul
// ==/UserScript==

/*
同类扩展
https://addons.mozilla.org/zh-cn/firefox/addon/open-in-browser/
*/

(function () {
	if (location != "chrome://mozapps/content/downloads/unknownContentType.xul") return;
	var openInFirefox = {
		Components: Components,
		observe: function (aSubject, aTopic, aData) {
			var channel = aSubject.QueryInterface(this.Components.interfaces.nsIHttpChannel);
			if (channel.originalURI.spec != openInFirefox.url) return
			channel.contentType = openInFirefox.mime;
			channel.loadFlags &= ~this.Components.interfaces.nsIChannel.LOAD_CALL_CONTENT_SNIFFERS;
			channel.setResponseHeader("Content-Disposition", "", false);
			var observerService = this.Components.classes["@mozilla.org/observer-service;1"].getService(this.Components.interfaces.nsIObserverService);
			observerService.removeObserver(openInFirefox, "http-on-examine-response", false);
			observerService.removeObserver(openInFirefox, "http-on-examine-merged-response", false);
		}
	}
	document.querySelector("#save").parentNode.insertBefore(document.createElement("hbox"), document.querySelector("#save")).appendChild(document.createElement("radio")).id = "openInBrowser";
	document.querySelector("#openInBrowser").setAttribute("width", "93");
	document.querySelector("#openInBrowser").setAttribute("label", "Firefox\u6253\u5F00");
	document.querySelector("#openInBrowser").parentNode.appendChild(document.createElement("vbox")).appendChild(document.createElement("menulist")).id = "MIMETypes";
	var menupopup = document.querySelector("#MIMETypes").appendChild(document.createElement("menupopup"));
	menupopup.setAttribute("flex", "1");
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "\u7F51\u9875");//网页
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "\u7EAF\u6587\u672C");//纯文本
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "\u56FE\u7247");//图片
	menupopup.appendChild(document.createElement("menuitem")).setAttribute("label", "XML");
	document.querySelector("#MIMETypes").selectedIndex = 0;
	//addEventListener("DOMNodeInserted", window.sizeToContent, true)
	//addEventListener("mouseover", window.sizeToContent, true)
	addEventListener("dialogaccept", function () {
		if (document.querySelector("#mode").selectedItem.id == "openInBrowser") {
			document.documentElement.removeAttribute("ondialogaccept");
			openInFirefox.url = dialog.mLauncher.source.asciiSpec;
			openInFirefox.mime = ["text/html", "text/plain", "image/png", "text/xml"][document.querySelector("#MIMETypes").selectedIndex]
			var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
			observerService.addObserver(openInFirefox, "http-on-examine-response", false);
			observerService.addObserver(openInFirefox, "http-on-examine-merged-response", false);
			var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
			(mainwin.content.location == "about:blank") ? (mainwin.gBrowser.mCurrentBrowser.loadURIWithFlags(openInFirefox.url, 256)) : (mainwin.gBrowser.loadOneTab("", {
				inBackground: false
			}) && mainwin.gBrowser.mCurrentBrowser.loadURIWithFlags(openInFirefox.url, 256));
		}
	}, false);
})()