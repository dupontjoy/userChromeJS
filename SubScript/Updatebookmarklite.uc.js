// ==UserScript==
// @name           Updatebookmarklite.uc.js
// @description    書籤維護
// @author         danny -2016.07.05
// @include        main
// @compatibility  Firefox 11.0~47+
// @include        chrome://browser/content/places/places.xul
// @include        chrome://browser/content/bookmarks/bookmarksPanel.xul
// @charset        UTF-8
// ==/UserScript==
var updatebookmark = {
	init: function() {
		window.addEventListener("load", updatebookmark.onload, false);
		window.setTimeout("updatebookmark.onload();", 0);
	},

	uninit: function(event) {
		var plaMenu = document.getElementById("placesContext");
		var menubook1 = document.getElementById("updatebookmarkUpdateCurrentURLMenuItem");
		var menubook2 = document.getElementById("updatebookmarkUpdateCurrentTitleMenuItem");
		var menubook3 = document.getElementById("addnewbookmarkMenuItem");
		if (menubook1 && plaMenu) {
			plaMenu.removeChild(menubook1);
		}
		if (menubook2 && plaMenu) {
			plaMenu.removeChild(menubook2);
		}
		if (menubook3 && plaMenu) {
			plaMenu.removeChild(menubook3);
		}
		window.removeEventListener("load", updatebookmark.onload, false);
	},

	onload: function() {
		var placesContextMenu = document.getElementById("placesContext");
		var menuItem = document.createElement("menuitem");
		menuItem.setAttribute("id", "updatebookmarkUpdateCurrentURLMenuItem");
		menuItem.setAttribute("label", "更新為當前網址");
		menuItem.setAttribute("oncommand", "updatebookmark.updateURL();");
		menuItem.setAttribute("closemenu", "single");
		menuItem.setAttribute("selection", "link");
		menuItem.setAttribute('image', "");
		placesContextMenu.insertBefore(menuItem, placesContextMenu.childNodes[8]);
		menuItem = document.createElement("menuitem");
		menuItem.setAttribute("id", "updatebookmarkUpdateCurrentTitleMenuItem");
		menuItem.setAttribute("label", "更新為當前標題");
		menuItem.setAttribute("oncommand", "updatebookmark.updateTitle();");
		menuItem.setAttribute("closemenu", "single");
		menuItem.setAttribute("selection", "link");
		menuItem.setAttribute('image', "");
		placesContextMenu.insertBefore(menuItem, placesContextMenu.childNodes[9]);
		menuItem = document.createElement("menuitem");
		menuItem.setAttribute("id", "addnewbookmarkMenuItem");
		menuItem.setAttribute("label", "在此書籤後面添加新書簽");
		menuItem.setAttribute("oncommand", "updatebookmark.appendURL();");
		menuItem.setAttribute("closemenu", "single");
		menuItem.setAttribute("selection", "link");
		menuItem.setAttribute("disabled", "true");
		menuItem.setAttribute('image', "");
		placesContextMenu.insertBefore(menuItem, placesContextMenu.childNodes[10]);
		menuItem = document.createElement("menuitem");
		menuItem.setAttribute("id", "updatebookmarkMenuItem");
		menuItem.setAttribute("label", "更新當前書籤");
		menuItem.setAttribute("oncommand", "updatebookmark.updatebookreplace();");
		menuItem.setAttribute("closemenu", "single");
		menuItem.setAttribute("selection", "link");
		menuItem.setAttribute('image', "");
		placesContextMenu.insertBefore(menuItem, placesContextMenu.childNodes[11]);
		placesContextMenu.addEventListener("popupshowing", updatebookmark.onpopup, false);
	},

	onpopup: function(event) {
		// show only when single item is clicked and when item is link
		var node = document.popupNode;
		var isSingleLink = false;
		if ("node" in node) {
			node = node.node;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else
		if ("_placesNode" in node) {
			node = node._placesNode;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else {
			if ("view" in node.parentNode) {
				node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);
				isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
			}
		}

		var menubook1 = document.getElementById('updatebookmarkUpdateCurrentURLMenuItem');
		var menubook2 = document.getElementById('updatebookmarkUpdateCurrentTitleMenuItem');
		var menubook3 = document.getElementById('addnewbookmarkMenuItem');
		var menubook4 = document.getElementById('updatebookmarkMenuItem');
		var activeContent = top.window.document.getElementById("content");
		var activeBrowser = activeContent.selectedBrowser;
		var newurlValue = activeBrowser.currentURI.spec;
		if (newurlValue == "about:blank" || newurlValue == "about:home") {
			if (menubook1) menubook1.hidden = true;
			if (menubook2) menubook2.hidden = true;
			if (menubook3) menubook3.hidden = true;
			if (menubook4) menubook4.hidden = true;
		} else {
			if (isSingleLink) {
				var oldURI = PlacesUtils.bookmarks.getBookmarkURI(node.itemId);
				var oldurl = oldURI.spec;
				var oldtitleValue = PlacesUtils.bookmarks.getItemTitle(node.itemId);
				var newURI = Cc["@mozilla.org/network/io-service;1"].
				getService(Ci.nsIIOService).
				newURI(newurlValue, null, null);
				var newurl = newURI.spec;
				var newtitleValue = activeBrowser.contentTitle;

				//如果标题或地址与当前tab的符合,显示弹出菜单spec
				if (oldurl == newurl || oldtitleValue == newtitleValue) {
					if (menubook1) menubook1.hidden = false;
					if (menubook2) menubook2.hidden = false;
					if (menubook3) menubook3.hidden = true;
					if (menubook4) menubook4.hidden = true;
					return;
				} else {
					if (menubook1) menubook1.hidden = true;
					if (menubook2) menubook2.hidden = true;
					if (menubook3) {
						menubook3.hidden = false;
						menubook3.setAttribute("label", "在此書籤後面添加新書簽");
					}
					if (menubook4) menubook4.hidden = false;
					return;
				}
			} else {
				if (menubook1) menubook1.hidden = true;
				if (menubook2) menubook2.hidden = true;
				if (menubook3) {
					menubook3.hidden = false;
					menubook3.setAttribute("label", "在此資料夾添加新書簽");
					menubook3.removeAttribute("disabled");
				}
				if (menubook4) menubook4.hidden = true;
			}
		}
	},

	updateURL: function() {
		var node = document.popupNode;
		var isSingleLink = false;
		if ("node" in node) {
			node = node.node;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else
		if ("_placesNode" in node) {
			node = node._placesNode;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else {
			if ("view" in node.parentNode) {
				node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);
				isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
			}
		}
		try {
			var newValue;
			var activeContent = top.window.document.getElementById("content");
			var activeBrowser = activeContent.selectedBrowser;
			newValue = activeBrowser.currentURI.spec;
			var oldURI = PlacesUtils.bookmarks.getBookmarkURI(node.itemId);
			var newURI = Cc["@mozilla.org/network/io-service;1"].
			getService(Ci.nsIIOService).
			newURI(newValue, null, null);

			// add old tags onto new uri
			var oldValueTags = PlacesUtils.tagging.getTagsForURI(oldURI, {});
			PlacesUtils.tagging.tagURI(newURI, oldValueTags);
			PlacesUtils.bookmarks.changeBookmarkURI(node.itemId, newURI);
		} catch (ex) {
			alert("無法更新書籤. 無效的URL.");
		}
	},

	updateTitle: function() {
		var node = document.popupNode;
		var isSingleLink = false;
		if ("node" in node) {
			node = node.node;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else
		if ("_placesNode" in node) {
			node = node._placesNode;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else {
			if ("view" in node.parentNode) {
				node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);
				isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
			}
		}
		try {
			var newValue;
			var activeContent = top.window.document.getElementById("content");
			var activeBrowser = activeContent.selectedBrowser;
			newValue = activeBrowser.contentTitle;
			PlacesUtils.bookmarks.setItemTitle(node.itemId, newValue);
		} catch (ex) {
			alert(ex.message);
		}
	},

	updatebookreplace: function() {
		var node = document.popupNode;
		var isSingleLink = false;
		if ("node" in node) {
			node = node.node;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else
		if ("_placesNode" in node) {
			node = node._placesNode;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else {
			if ("view" in node.parentNode) {
				node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);
				isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
			}
		}
		try {
			var newValue;
			var activeContent = top.window.document.getElementById("content");
			var activeBrowser = activeContent.selectedBrowser;
			newValue = activeBrowser.currentURI.spec;
			var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
			var items = ["更新標題和網址", "僅更新網址", "僅更新標題"]; // list items  
			var uselected = {};
			var result = prompts.select(null, "Title", "What greeting do you want?", items.length, items, uselected);
			if (result) {
				var oldURI = PlacesUtils.bookmarks.getBookmarkURI(node.itemId);
				var newURI = Cc["@mozilla.org/network/io-service;1"].
				getService(Ci.nsIIOService).
				newURI(newValue, null, null);
				//add old tags onto new uri
				var newtitleValue = activeBrowser.contentTitle;
				if (uselected.value == 0 || uselected.value == 2)
					PlacesUtils.bookmarks.setItemTitle(node.itemId, newtitleValue);
				if (uselected.value == 0 || uselected.value == 1) {
					var oldValueTags = PlacesUtils.tagging.getTagsForURI(oldURI, {});
					PlacesUtils.tagging.tagURI(newURI, oldValueTags);
					PlacesUtils.bookmarks.changeBookmarkURI(node.itemId, newURI);
				}
			}
		} catch (ex) {
			alert("無法更新書籤. 無效的URL.");
		}
	},

	appendURL: function() {
		var node = document.popupNode;
		var isSingleLink = false;
		if ("node" in node) {
			node = node.node;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else
		if ("_placesNode" in node) {
			node = node._placesNode;
			isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
		} else {
			if ("view" in node.parentNode) {
				node = node.parentNode.view.nodeForTreeIndex(node.parentNode.view.selection.currentIndex);
				isSingleLink = node && PlacesUtils.nodeIsBookmark(node);
			}
		}
		try {
			var newValue;
			var activeContent = top.window.document.getElementById("content");
			var activeBrowser = activeContent.selectedBrowser;
			newValue = activeBrowser.currentURI.spec;
			var newtitle = activeBrowser.contentTitle;
			var newURI = Cc["@mozilla.org/network/io-service;1"].
			getService(Ci.nsIIOService).
			newURI(newValue, null, null);
			if (isSingleLink) {
				var pnodeid = PlacesUtils.bookmarks.getFolderIdForItem(node.itemId);
				PlacesUtils.bookmarks.insertBookmark(pnodeid, newURI, PlacesUtils.bookmarks.getItemIndex(node.itemId) + 1, newtitle);
			} else {
				var pnodeid = node.itemId;
				PlacesUtils.bookmarks.insertBookmark(pnodeid, newURI, 'DEFAULT_INDEX', newtitle);
			}
		} catch (ex) {
			alert(ex.message);
		}
	}
};
updatebookmark.init();
window.addEventListener("unload", function(event) {
	updatebookmark.uninit(event);
}, false);