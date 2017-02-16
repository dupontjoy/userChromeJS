// ==UserScript==
// @name            Toggle Container Tab
// @include         main
// @namespace       ToggleContainerTab@uc.js
// @compatibility	   FF51+
// @description     标签页左键切换容器标签, 中键复制并切换到容器标签。\n书签中左键在当前标签打开，中键在新容器标签中打开。
// @version         0.0.1
// ==/UserScript==

'use strict';

location == 'chrome://browser/content/browser.xul' && 'ContextualIdentityService' in window && (function () {
	let {classes: Cc, interfaces: Ci} = Components,
		sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService),
		ios = Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService),
		lang = (Cc['@mozilla.org/chrome/chrome-registry;1'].getService(Ci.nsIXULChromeRegistry).getSelectedLocale('browser').indexOf('zh') != -1),
		ss = (Cc['@mozilla.org/browser/sessionstore;1'] || Cc['@mozilla.org/suite/sessionstore;1']).getService(Ci.nsISessionStore),
		menu = document.createElement('menu'),
		menupopup = document.createElement('menupopup');

	sss.loadAndRegisterSheet(ios.newURI('data:text/css;base64,' + btoa(`
		.menu-iconic[data-usercontextid] > .menu-iconic-left > .menu-iconic-icon {
			background-image: var(--identity-icon);
			filter: url("chrome://global/skin/filters.svg#fill");
			fill: var(--identity-icon-color);
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center center;
		}
	`), null, null), sss.USER_SHEET);

	let onPopupshowing = event => {
		let menupopup = event.target;
		while (menupopup.firstChild)
			menupopup.firstChild.remove();

		let docfrag = document.createDocumentFragment();

		ContextualIdentityService.getIdentities().forEach(identity => {
			if (identity.userContextId == 0)
				return;
			let menuitem = document.createElement('menuitem');
			menuitem.setAttribute('data-usercontextid', identity.userContextId);
			menuitem.setAttribute('label', ContextualIdentityService.getUserContextLabel(identity.userContextId));
			menuitem.classList.add('menuitem-iconic');
			menuitem.setAttribute('data-identity-color', identity.color);
			menuitem.setAttribute('data-identity-icon', identity.icon);
			if (TabContextMenu.contextTab && TabContextMenu.contextTab.getAttribute('usercontextid') == identity.userContextId) {
				menuitem.setAttribute('type', 'checkbox');
				menuitem.setAttribute('checked', true);
			}
			docfrag.appendChild(menuitem);
		});
		menupopup.appendChild(docfrag);
	};
	let onMenupopupClick = event => {
		event.stopPropagation();
		if (event.button != 0 && event.button != 1) return;
		let target = event.target;
		if (target.localName != 'menuitem' || !target.hasAttribute('data-usercontextid')) return;
		let id = parseInt(target.getAttribute('data-usercontextid'), 10);
		if (document.popupNode.classList.contains('bookmark-item')) {
			//书签行为：
			//左键: event.button == 0 在当前标签打开，
			//中键: event.button == 1 在新容器标签中打开
			return openLinkInTab(id, event.button == 0);
		}
		if (parseInt(TabContextMenu.contextTab.getAttribute('usercontextid'), 10) == id) {
			id = 0;
		}
		Array.prototype.forEach.call(target.parentNode.children, menuitem => {
			if (parseInt(menuitem.getAttribute('data-usercontextid'), 10) == id) {
				menuitem.setAttribute('type', 'checkbox');
				menuitem.setAttribute('checked', true);
			} else {
				menuitem.removeAttribute('type');
				menuitem.removeAttribute('checked');
			}
		});
		updateContainerMenu(id);
		//标签页行为：
		//左键: event.button == 0 切换容器标签, 
		//中键: event.button == 1 复制并切换到容器标签。
		toggleContainerTab(id, event.button == 1);


		//中键强制关闭弹出菜单
		event.button == 1 && closeMenus(tabContextMenu);
	};
	menupopup.addEventListener('click', onMenupopupClick);
	menu.addEventListener('click', event => {
		//容器标签下点击菜单就还原到空白容器
		if (event.button != 0) return;
		let id = event.target.getAttribute('data-usercontextid');
		if (id) {
			updateContainerMenu(0);
			toggleContainerTab(0);
			//关闭标签右键菜单
			closeMenus(event.target.parentNode);
		}
	});
	menu.addEventListener('popupshowing', onPopupshowing);
	menu.classList.add('menu-iconic');
	menu.appendChild(menupopup);

	//复制菜单到书签右键
	let bmMenu = menu.cloneNode(true),
		placesContext = document.getElementById('placesContext');
	bmMenu.addEventListener('popupshowing', onPopupshowing);
	bmMenu.firstChild.addEventListener('click', onMenupopupClick);
	bmMenu.setAttribute('label', lang ? '在容器标签中打开' : 'Open in Container Tab');
	placesContext.insertBefore(bmMenu, document.getElementById('placesContext_open:newtab').nextSibling);
	placesContext.addEventListener('popupshowing', () => {
		bmMenu.hidden = (document.popupNode._placesNode || document.popupNode.node).type !== 0;
	});

	let tabContextMenu = document.getElementById('tabContextMenu'),
	updateContainerMenu = id => {
		let text = lang ? '切换容器标签' : 'Toggle Container Tab',
			text2 = lang ? '容器标签' : 'ContainerTab';
		if (!id) {
			menu.setAttribute('label', text);
			menu.removeAttribute('data-usercontextid');
			menu.removeAttribute('data-identity-color');
			menu.removeAttribute('data-identity-icon');
		} else {
			let identity = ContextualIdentityService.getIdentityFromId(id);
			menu.setAttribute('label', `${text2}: "${ContextualIdentityService.getUserContextLabel(identity.userContextId)}"`);
			menu.setAttribute('data-identity-color', identity.color);
			menu.setAttribute('data-identity-icon', identity.icon);
			menu.setAttribute('data-usercontextid', identity.userContextId);
		}
	};
	tabContextMenu.insertBefore(menu, document.getElementById('context_pinTab').nextSibling);
	tabContextMenu.addEventListener('popupshowing', () => {
		updateContainerMenu(TabContextMenu.contextTab.getAttribute('usercontextid'));
	});

	let toggleContainerTab = (id, isDuplicate = false, url) => {
		let tab = url ? gBrowser.mCurrentTab : TabContextMenu.contextTab,
			bPos = tab._tPos,
		t = gBrowser.addTab(url || gBrowser.getBrowserForTab(tab).currentURI.spec, {
			skipAnimation: true,
			userContextId: id
		});

		if (isDuplicate && !url) {
			bPos += 1;
		} else {
			tab.collapsed = true;
		}
		gBrowser.moveTabTo(t, bPos);

		let isRemoteTab = tab.linkedBrowser && tab.linkedBrowser.getAttribute('remote') == 'true';

		//还原历史会话
		if ((!url && !isRemoteTab && tab.linkedBrowser) || isRemoteTab) {
			let tabState = JSON.parse(ss.getTabState(tab));
			tabState.userContextId = id;
			ss.setTabState(t, JSON.stringify(tabState));
		}
		//打开书签覆盖当前页继承历史
		if (typeof url === 'string') {
			if (isRemoteTab) {
				t.linkedBrowser.loadURI(url);
			} else {
				let currentHistory = tab.linkedBrowser.docShell.sessionHistory;
				let newHistory = t.linkedBrowser.sessionHistory.QueryInterface(Ci.nsISHistoryInternal);
				for (let i = 0; i <= currentHistory.index; i++)
					newHistory.addEntry(currentHistory.getEntryAtIndex(i, false), true);
			}
		}

		if (tab == gBrowser.mCurrentTab) {
			gBrowser.selectedTab = t;
		}

		if (!isDuplicate || url) {
			//移除关闭标签历史
			tab.linkedBrowser && ss.setTabState(tab, '{"entries":[]}');
			gBrowser.removeTab(tab, {
				animate: false
			});
		}
	};
	
	let openLinkInTab = (id = '', isCurrentTab = false) => {
		let url = PlacesUtils.bookmarks.getBookmarkURI((document.popupNode._placesNode || document.popupNode.node).itemId).spec;
		if (url) {
			isCurrentTab ? toggleContainerTab(id, false, url) : gBrowser.addTab(url, {
				skipAnimation: gBrowser.tabContainer.getAttribute('overflow') == 'true' ||
						!Services.prefs.getBoolPref('browser.tabs.animate'),
				userContextId: id
			});
		}
	};
})();