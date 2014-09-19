// ==UserScript==
// @name           OpenImgRaR.uc
// @description    打开图片中的RaR文件
// @include        chrome://browser/content/browser.xul
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function () {
	(function (m) {
		m.id = "openImgRar";
		m.addEventListener("command", function () {
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			try {
				var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
				file.initWithPath(path);
			} catch (e) {
				var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
			}
			file.initWithPath(path);
			Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL).replace(/w%3D580.*sign=.*?(?=\/)/,"pic/item"), null, null), null, null, null, null, file, null);
			setTimeout(function () {
				file.launch();
			}, 100);
		}, false);
		m.setAttribute("label", "\u6253\u5F00\u56FE\u7247rar");
		m.setAttribute("accesskey", "L");
		m.setAttribute("class", "menuitem-iconic");
		m.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACcUlEQVQ4jZXIXUtTARwH4L/iGEeGe0Eny3JTnMbU9qLMvZwdt7Gpw+bO2YLNedzUFR5qLRhmsJY2xGrY8VxmBIaRJdhV9gGK6CKLvtKvmxyCmHjx3DwkimJfIZ/fWJyfv5RCPr82G4+3U2xqaivF81itzWFNnsfa9okc1rdzWC5mkEokkE2n8aBUQjKRQIrnkeJ5TEQiSxQJh5Xi4xnsHiew+1NoeHucxPs/aXz4nUNBSuF+8R52dnYgJBKYid9EfHoawUBAIi4QUKLRIMIR9oxYwo9XX2fw7lcaez9y2D9ewu73Obz5lkF2MQa/xyORd2xMCQeDOM/0LS+kmh/ll1Gsv07i7gaL5Zof0UkW7pERiUZdLoX1+fA/fq8XoihClmVwLAu/1wvW54PTbpdoeHBQGXW5cJHZTAayLMPjdjfOZrNJNGC1KsNDQ7hIKplEvV6H0+FonNVqlcjS3a1Y+/pwHi7iQOFRCKtbKSj7RdyphLH4kMMNx3Vc6+qSyGQyKRazGT0Wyxl25wCefZpE/UsEtUMOTw85rB8GUD3ww+nrhclolKjdYFCCQj+ef46gfjSB+tFkw4ujCJ4csLCNXgHLBrCysoLOzk4Y9AYYOzqg1+sl0mg0ik6nxVjsKkLpHoQy/6R7EEpb0O8wQq/XY2FhAZubm3C73dBqtdBptdBoNBIxarXS2tqKEwzDgOM48DwPQRAgCAKy2SwqlQqq1SrK5TKSySTMZjPUarVELS0tikqlwmlqtRoMwzTodDqIoohSqYTx8XEwDAOVSoXm5maJiEgmIlykra0NdrsdTU1Np/82EZGHiPaJ6OMl7RFR718Ge5uCNFZveAAAAABJRU5ErkJggg==");
	})(document.getElementById("contentAreaContextMenu").insertBefore(document.createElement("menuitem"), document.getElementById("context-viewbgimage")));
	document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", function () {
		gContextMenu.showItem("openImgRar", gContextMenu.onImage);
	}, false);
})()
