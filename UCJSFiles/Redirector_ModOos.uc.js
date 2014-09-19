// ==UserScript==
// @name            redirector_ui.uc.js
// @namespace       redirector@haoutil.com
// @description     Redirect your requests.
// @include         chrome://browser/content/browser.xul
// @author          harv.c
// @homepage        http://haoutil.com
// @homepageURL     https://github.com/Harv/userChromeJS/blob/master/redirector_ui.uc.js
// @version         1.4.5
// ==/UserScript==
(function() {
	Cu.import("resource://gre/modules/XPCOMUtils.jsm");
	Cu.import("resource://gre/modules/Services.jsm");
	Cu.import("resource://gre/modules/NetUtil.jsm");
	function Redirector() {
		this.addIcon = true;					// 是否添加按钮
		this.type = 2;							// 0:按钮 2:工具菜单
		this.state = true;						// 是否启用脚本
		this.rulesFile = "local\\_redirector.js";
		this.rules = [];
		this.enableIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+ElEQVQ4jaWTIa7DMBBEDUMNixeGGgauFBAYUClsURRStqTE2DfoDXqCnsAX6AV6A99hippvN+5X1IIBlqznmdm1McbgRxnA+69UAB6nE6IILsOAwIxj26Ingm2a9TWyFueuQ1ItAUkVt2lCT7TLtjsckFTrEfZCLsNQB+SWo0hxzpU9ZGrFgKwFvEdgrgKObbsFRJFNznPXVQHXcdwCbtO0K//i3HaM/9nNbV/Hsb4H8B6Lc0VJ93leS7RNg8D8eZHeR9gTAd4XkFe5LxcF4N0+WbtuXA2S3f9zkFQRRRCYsTiHxTlEESRV9EQIzLjP8+cIX3+mX/QEXma7NDsegmEAAAAASUVORK5CYII=";
		this.disableIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4klEQVQ4jaWTQREDIQxFMYACFKyDGEBBFCAgAhDAHQE5c14BkRBPv6duly7t7LSHf2CGefz/E0IIAX8qwN1/0gTY9x2qilorRAQ5ZxARYozHaykllFJgZjPAzNB7BxHdsr1tG8xsHeEupNa6Bpwtq+p0Puv0UFgVg5QS3B0isgTknK8AVb3kLKUsAa21K6D3fis/M1/H+M3u2XZrbb0H7g5mnkoaYxwlxhghIp8X6X2ERAR3nyDPcp8uJsC7/ZTSsXEryOn+y4GZQVUhImBmMDNUFWYGIoKIYIzxOcLPn+kfPQAVduEGEMliqAAAAABJRU5ErkJggg==";
	}
	Redirector.prototype = {
		_cache: {
			redirectUrl: {},
			clickUrl: {}
		},
		classDescription: "Redirector content policy",
		classID: Components.ID("{1d5903f0-6b5b-4229-8673-76b4048c6675}"),
		contractID: "@haoutil.com/redirector/policy;1",
		xpcom_categories: ["content-policy", "net-channel-event-sinks"],
		init: function() {
			this.loadRule();
			this.drawUI();
			if (!this.state) return;
			window.addEventListener("click", this, false);
			let registrar = Components.manager.QueryInterface(Ci.nsIComponentRegistrar);
			registrar.registerFactory(this.classID, this.classDescription, this.contractID, this);
			let catMan = Cc["@mozilla.org/categorymanager;1"].getService(Ci.nsICategoryManager);
			for each (let category in this.xpcom_categories)
				catMan.addCategoryEntry(category, this.classDescription, this.contractID, false, true);
			Services.obs.addObserver(this, "http-on-modify-request", false);
			Services.obs.addObserver(this, "http-on-examine-response", false);
		},
		destroy: function() {
			if (this.state) return;
			window.removeEventListener("click", this, false);
			let registrar = Components.manager.QueryInterface(Ci.nsIComponentRegistrar);
			registrar.unregisterFactory(this.classID, this);
			let catMan = Cc["@mozilla.org/categorymanager;1"].getService(Ci.nsICategoryManager);
			for each (let category in this.xpcom_categories)
				catMan.deleteCategoryEntry(category, this.classDescription, false);
			Services.obs.removeObserver(this, "http-on-modify-request", false);
			Services.obs.removeObserver(this, "http-on-examine-response", false);
		},
		clearCache: function() {
			// clear cache
			this._cache = {
				redirectUrl: {},
				clickUrl: {}
			};
		},
		reload: function() {
			this.clearCache();
			this.loadRule();
			this.clearItems();
			this.buildItems();
//			XULBrowserWindow.statusTextField.label = "Redirector 规则已重新载入";
			Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", "Redirector", "规则已重新载入", false, "", null);
		},
		edit: function() {
			let aFile = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIDirectoryService).QueryInterface(Ci.nsIProperties).get('UChrm', Ci.nsILocalFile);
			aFile.appendRelativePath(this.rulesFile);
			if (!aFile || !aFile.exists() || !aFile.isFile()) return;
			var editor;
			try {
				editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsILocalFile);
			} catch (e) {
				alert("请设置编辑器的路径。\nview_source.editor.path");
				toOpenWindowByType('pref:pref', 'about:config?filter=view_source.editor.path');
				return;
			}
			var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
			UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "gbk" : "UTF-8";
			var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
			try {
				var path = UI.ConvertFromUnicode(aFile.path);
				var args = [path];
				process.init(editor);
				process.run(false, args, args.length);
			} catch (e) {
				alert("编辑器不正确！")
			}
		},
		toggle: function(i) {
			if (i) {
				this.rules[i].state = !this.rules[i].state;
				// update checkbox state
				let item = document.getElementById("redirector-item-" + i);
				if (item) item.setAttribute("checked", this.rules[i].state);
				// clear cache
				this.clearCache();
			} else {
				let menuitems = document.querySelectorAll("menuitem[id^='redirector-item-']");
				this.state = !this.state;
				if (this.state) {
					this.init();
					Object.keys(menuitems).forEach(function(n) menuitems[n].setAttribute("disabled", false));
				} else {
					this.destroy();
					Object.keys(menuitems).forEach(function(n) menuitems[n].setAttribute("disabled", true));
				}
				// update checkbox state
				let toggle = document.getElementById("redirector-toggle");
				if (toggle) {
					toggle.setAttribute("checked", this.state);
					toggle.label = "重定向已" + (this.state ? "启" : "停") + "用";
				}
				// update icon state
				let icon = document.getElementById("redirector-icon");
				if (icon) {
					icon.style.listStyleImage = "url(" + (this.state ? this.enableIcon : this.disableIcon) + ")";
				}
			}
		},
		drawUI: function() {
			if (this.addIcon && !document.getElementById("redirector-icon")) {
				// add icon
				let icon;
				if (this.type == 0) {
					icon = document.getElementById("urlbar-icons").appendChild(document.createElement("toolbarbutton"));
					icon.setAttribute('class', 'toolbarbutton-1');
					icon.setAttribute('type', 'menu');
					icon.setAttribute("onclick", "Redirector.iconClick(event);");
					icon.setAttribute("onDOMMouseScroll", "document.getElementById('redirector-toggle').doCommand();");
					icon.setAttribute("tooltiptext", "左键：Redirector 菜单\n中键：重载规则\n右键：编辑规则\n滚动：启用 / 禁用");
				}
				else if (this.type == 2) {
					icon = document.createElement("menu");
					icon.setAttribute("label", "Redirector");
					icon.setAttribute("class", "menu-iconic");
					var insPos = document.getElementById('devToolsSeparator');
						insPos.parentNode.insertBefore(icon, insPos);
				}
				icon.setAttribute("id", "redirector-icon");
				icon.setAttribute("style", "padding: 0px; list-style-image: url(" + (this.state ? this.enableIcon : this.disableIcon) + ")");
				// add menu
				let xml = '\
					<menupopup id="redirector-menupopup" onclick="event.preventDefault(); event.stopPropagation();">\
						<menuitem label="重定向已启用" id="redirector-toggle" type="checkbox" autocheck="false" key="redirector-toggle-key" checked="' + this.state + '" oncommand="Redirector.toggle();" onclick="if (event.button !== 0) {Redirector.toggle();}" />\
						<menuitem label="重载规则" id="redirector-reload" oncommand="Redirector.reload();"/>\
						<menuitem label="编辑规则" id="redirector-edit" oncommand="Redirector.edit();"/>\
						<menuseparator id="redirector-sepalator"/>\
					</menupopup>\
				';
				let range = document.createRange();
				range.selectNodeContents(document.getElementById("redirector-icon"));
				range.collapse(false);
				range.insertNode(range.createContextualFragment(xml.replace(/\n|\t/g, "")));
				range.detach();
				// add rule items
				this.buildItems();
			}
			if (!document.getElementById("redirector-toggle-key")) {
				// add shortcuts
				let key = document.getElementById("mainKeyset").appendChild(document.createElement("key"));
				key.setAttribute("id", "redirector-toggle-key");
				key.setAttribute("oncommand", "Redirector.toggle();");
				key.setAttribute("key", "r");
				key.setAttribute("modifiers", "shift");
			}
		},
		iconClick: function(event) {
			switch(event.button) {
				case 1:
					this.reload();
					break;
				case 2:
					this.edit();
					break;
			}
			event.preventDefault();
		},
		loadRule: function() {
			var aFile = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIDirectoryService).QueryInterface(Ci.nsIProperties).get('UChrm', Ci.nsILocalFile);
			aFile.appendRelativePath(this.rulesFile);
			if (!aFile.exists() || !aFile.isFile()) return null;
			var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
			var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
			fstream.init(aFile, -1, 0, 0);
			sstream.init(fstream);
			var data = sstream.read(sstream.available());
			try {
				data = decodeURIComponent(escape(data));
			} catch (e) {}
			sstream.close();
			fstream.close();if (!data) return;
			var sandbox = new Cu.Sandbox(new XPCNativeWrapper(window));
			try {
				Cu.evalInSandbox(data, sandbox, "1.8");
			} catch (e) {
				return;
			}
			this.rules = sandbox.rules;
		},
		clearItems: function() {
			let menu = document.getElementById("redirector-menupopup");
			let menuitems = document.querySelectorAll("menuitem[id^='redirector-item-']");
			if (!menu || !menuitems) return;
			for (let i = 0; i < menuitems.length; i++) {
				menu.removeChild(menuitems[i]);
			}
		},
		buildItems: function() {
			let menu = document.getElementById("redirector-menupopup");
			if (!menu) return;
			for(let i = 0; i < this.rules.length; i++) {
				let menuitem = menu.appendChild(document.createElement("menuitem"));
				menuitem.setAttribute("label", this.rules[i].name);
				menuitem.setAttribute("id", "redirector-item-" + i);
				menuitem.setAttribute("class", "redirector-item");
				menuitem.setAttribute("type", "checkbox");
				menuitem.setAttribute("autocheck", "false");
				menuitem.setAttribute("checked", this.rules[i].state != null ? this.rules[i].state : true);
				menuitem.setAttribute("oncommand", "Redirector.toggle('"+ i +"');");
				menuitem.setAttribute("onclick", "if (event.button !== 0) {Redirector.toggle('"+ i +"');}");
				menuitem.setAttribute("disabled", !this.state);
			}
		},
		getRedirectUrl: function(originUrl) {
			let url;
			try {
				url = decodeURIComponent(originUrl);
			} catch(e) {
				url = originUrl;
			}
			let redirectUrl = this._cache.redirectUrl[url];
			if(typeof redirectUrl != "undefined")
				return redirectUrl;
			redirectUrl = null;
			for each (let rule in this.rules) {
				if (rule.state == null) rule.state = true;
				if (!rule.state) continue;
				let regex, from, to, exclude;
				if (rule.computed) {
					regex = rule.computed.regex; from = rule.computed.from; to = rule.computed.to; exclude = rule.computed.exclude;
				} else {
					regex = false; from = rule.from; to = rule.to; exclude = rule.exclude;
					if (rule.wildcard) {
						regex = true;
						from = this.wildcardToRegex(rule.from);
						exclude = this.wildcardToRegex(rule.exclude);
					} else if (rule.regex) {
						regex = true;
					}
					rule.computed = {regex: regex, from: from, to: to, exclude: exclude};
				}
				let redirect = regex
					? from.test(url) ? !(exclude && exclude.test(url)) : false
					: from == url ? !(exclude && exclude == url) : false;
				if (redirect) {
					redirectUrl = {
						url : typeof to == "function"
							? regex ? to(url.match(from)) : to(from)
							: regex ? url.replace(from, to) : to,
						resp: rule.resp
					};
					break;
				}
			}
			this._cache.redirectUrl[url] = redirectUrl;
			return redirectUrl;
		},
		wildcardToRegex: function(wildcard) {
			return new RegExp((wildcard + "").replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]", "g"), "\\$&").replace(/\\\*/g, "(.*)").replace(/\\\?/g, "."), "i");
		},
		getTarget: function(redirectUrl, callback) {
			NetUtil.asyncFetch(redirectUrl.url, function(inputStream, status) {
				let binaryOutputStream = Cc['@mozilla.org/binaryoutputstream;1'].createInstance(Ci['nsIBinaryOutputStream']);
				let storageStream = Cc['@mozilla.org/storagestream;1'].createInstance(Ci['nsIStorageStream']);
				let count = inputStream.available();
				let data = NetUtil.readInputStreamToString(inputStream, count);
				storageStream.init(512, count, null);
				binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));
				binaryOutputStream.writeBytes(data, count);
				redirectUrl.storageStream = storageStream;
				redirectUrl.count = count;
				if (typeof callback === 'function')
					callback();
			});
		},
		// nsIDOMEventListener interface implementation
		handleEvent: function(event) {
			if (!event.ctrlKey && "click" === event.type && 1 === event.which) {
				let target = event.target;
				while(target) {
					if (target.tagName && "BODY" === target.tagName.toUpperCase()) break;
					if (target.tagName && "A" === target.tagName.toUpperCase()
						&& target.target && "_BLANK" === target.target.toUpperCase()
						&& target.href) {
						this._cache.clickUrl[target.href] = true;
						break;
					}
					target = target.parentNode;
				}
			}
		},
		// nsIContentPolicy interface implementation
		shouldLoad: function(contentType, contentLocation, requestOrigin, context, mimeTypeGuess, extra) {
			// don't redirect clicking links with "_blank" target attribute
			// cause links will be loaded in current tab/window
			if (this._cache.clickUrl[contentLocation.spec]) {
				delete this._cache.clickUrl[contentLocation.spec];
				return Ci.nsIContentPolicy.ACCEPT;
			}
			// only redirect documents
			if (contentType != Ci.nsIContentPolicy.TYPE_DOCUMENT)
				return Ci.nsIContentPolicy.ACCEPT;
			if (!context || !context.loadURI)
				return Ci.nsIContentPolicy.ACCEPT;
			let redirectUrl = this.getRedirectUrl(contentLocation.spec);
			if (redirectUrl && !redirectUrl.resp) {
				context.loadURI(redirectUrl.url, requestOrigin, null);
				return Ci.nsIContentPolicy.REJECT_REQUEST;
			}
			return Ci.nsIContentPolicy.ACCEPT;
		},
		shouldProcess: function(contentType, contentLocation, requestOrigin, context, mimeTypeGuess, extra) {
			return Ci.nsIContentPolicy.ACCEPT;
		},
		// nsIChannelEventSink interface implementation
		asyncOnChannelRedirect: function(oldChannel, newChannel, flags, redirectCallback) {
			this.onChannelRedirect(oldChannel, newChannel, flags);
			redirectCallback.onRedirectVerifyCallback(Cr.NS_OK);
		},
		onChannelRedirect: function(oldChannel, newChannel, flags) {
			// only redirect documents
			if (!(newChannel.loadFlags & Ci.nsIChannel.LOAD_DOCUMENT_URI))
				return;
			let newLocation = newChannel.URI.spec;
			if (!newLocation)
				return;
			let callbacks = [];
			if (newChannel.notificationCallbacks)
				callbacks.push(newChannel.notificationCallbacks);
			if (newChannel.loadGroup && newChannel.loadGroup.notificationCallbacks)
				callbacks.push(newChannel.loadGroup.notificationCallbacks);
			let win, webNav;
			for each (let callback in callbacks) {
				try {
					win = callback.getInterface(Ci.nsILoadContext).associatedWindow;
					webNav = win.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIWebNavigation);
					break;
				} catch(e) {}
			}
			if (!webNav)
				return;
			let redirectUrl = this.getRedirectUrl(newLocation);
			if (redirectUrl && !redirectUrl.resp) {
				webNav.loadURI(redirectUrl.url, null, null, null, null);
			}
		},
		// nsIObserver interface implementation
		observe: function(subject, topic, data, additional) {
			switch (topic) {
				case "http-on-modify-request": {
					let http = subject.QueryInterface(Ci.nsIHttpChannel);
					let redirectUrl = this.getRedirectUrl(http.URI.spec);
					if (redirectUrl && !redirectUrl.resp)
						if(http.redirectTo)
							// firefox 20+
							http.redirectTo(Services.io.newURI(redirectUrl.url, null, null));
						else
							// others replace response body
							redirectUrl.resp = true;
					break;
				}
				case "http-on-examine-response": {
					let http = subject.QueryInterface(Ci.nsIHttpChannel);
					let redirectUrl = this.getRedirectUrl(http.URI.spec);
					if (redirectUrl && redirectUrl.resp) {
						if(!http.redirectTo)
							redirectUrl.resp = false;
						if (!redirectUrl.storageStream || !redirectUrl.count) {
							http.suspend();
							this.getTarget(redirectUrl, function() {
								http.resume();
							});
						}
						let newListener = new TrackingListener();
						subject.QueryInterface(Ci.nsITraceableChannel);
						newListener.originalListener = subject.setNewListener(newListener);
						newListener.redirectUrl = redirectUrl;
					}
					break;
				}
			}
		},
		// nsIFactory interface implementation
		createInstance: function(outer, iid) {
			if (outer)
				throw Cr.NS_ERROR_NO_AGGREGATION;
			return this.QueryInterface(iid);
		},
		// nsISupports interface implementation
		QueryInterface: XPCOMUtils.generateQI([Ci.nsIContentPolicy, Ci.nsIChannelEventSink, Ci.nsIObserver, Ci.nsIFactory, Ci.nsISupports])
	};
	function TrackingListener() {
		this.originalListener = null;
		this.redirectUrl = null;
	}
	TrackingListener.prototype = {
		// nsITraceableChannel interface implementation
		onStartRequest: function(request, context) {
			this.originalListener.onStartRequest(request, context);
		},
		onStopRequest: function(request, context) {
			this.originalListener.onStopRequest(request, context, Cr.NS_OK);
		},
		onDataAvailable: function(request, context) {
			this.originalListener.onDataAvailable(request, context, this.redirectUrl.storageStream.newInputStream(0), 0, this.redirectUrl.count);
		},
		// nsISupports interface implementation
		QueryInterface: XPCOMUtils.generateQI([Ci.nsIStreamListener, Ci.nsISupports])
	};
	
	window.Redirector = null;
	if(location == 'chrome://browser/content/browser.xul') {
		if (!window.Redirector) window.Redirector = new Redirector();
		window.Redirector.init();
	}
	window.addEventListener('unload', function() {
		if(location == 'chrome://browser/content/browser.xul') {
			if (window.Redirector) window.Redirector.destroy();
		}
	});
})();