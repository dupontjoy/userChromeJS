// ==UserScript==
// @include  chrome://mozapps/content/downloads/unknownContentType.xul
// @include  chrome://browser/content/browser.xul
// ==/UserScript==
location == "chrome://mozapps/content/downloads/unknownContentType.xul" && (function (s) {
	var saveAndOpen = document.getAnonymousElementByAttribute(document.querySelector("*"), "dlgtype", "extra2");
	saveAndOpen.parentNode.insertBefore(saveAndOpen,document.documentElement.getButton("accept").nextSibling);
	saveAndOpen.setAttribute("hidden", "false");
	saveAndOpen.setAttribute("label", "\u4FDD\u5B58\u5E76\u6253\u5F00");
	saveAndOpen.setAttribute("oncommand", 'Components.classes["@mozilla.org/browser/browserglue;1"].getService(Components.interfaces.nsIBrowserGlue).getMostRecentBrowserWindow().saveAndOpen.urls.push(dialog.mLauncher.source.asciiSpec);document.querySelector("#save").click();document.documentElement.getButton("accept").disabled=0;document.documentElement.getButton("accept").click()')
})()

location == "chrome://browser/content/browser.xul" && (function () {
	Components.utils.import("resource://gre/modules/Downloads.jsm");
	saveAndOpen = {
		urls: [],
		init: function(){
			Downloads.getList(Downloads.ALL).then(list => {
				list.addView({
					onDownloadChanged: function(dl){
						if(dl.progress == 100 && saveAndOpen.urls.indexOf(dl.source.url)>-1){
							(new FileUtils.File(dl.target.path)).launch();
							saveAndOpen.urls[saveAndOpen.urls.indexOf(dl.source.url)] = "";
						}
					},
					onDownloadAdded:  function(){},
					onDownloadRemoved: function(){},
				});
			}).then(null, Cu.reportError);
		}

	}
	saveAndOpen.init();
})()