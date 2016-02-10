// ==UserScript==
// @name            FeiRuoNet.uc.js
// @description     网络交互信息定义
// @author          feiruo
// @License			Version: MPL 2.0/GPL 3.0/LGPL 2.1
// @compatibility   Firefox 16
// @charset         UTF-8
// @include         chrome://browser/content/browser.xul
// @id              [9AA866B3]
// @inspect         window.FeiRuoNet
// @startup         window.FeiRuoNet.init();
// @shutdown        window.FeiRuoNet.uninit();
// @optionsURL      about:config?filter=FeiRuoNet.
// @config          window.FeiRuoNet.OpenPref(0);
// @homepageURL     https://www.feiruo.pw/UserChromeJS/FeiRuoNet.html
// @homepageURL     https://github.com/feiruo/userChromeJS/tree/master/FeiRuoNet
// @downloadURL     https://github.com/feiruo/userChromeJS/raw/master/FeiRuoNet/FeiRuoNet.uc.js
// @note            Begin 2015-10-15
// @note            网络交互信息定义，查看、自定义与网站之间的交互信息。
// @note            显示网站IP地址和所在国家国旗，支持IPV6，标示https安全等级，帮助识别网站真实性。
// @note            修改浏览器标识(UA)、Cookies、Referer，伪装IP，等Http头信息。
// @note            破解反盗链,破解限制等，酌情善用。
// @note            左键点击图标复制当前网站IP，中键打刷新，右键弹出菜单。
// @note            更多功能需要【_FeiRuoNet.js】、【_FeiRuoNetMenu.js】、【FeiRuoNetLib.js】、【QQWry.dat】、【ip4.cdb】、【ip6.cdb】配置文件。
// @note            仅供个人测试、研究，不得用于商业或非法用途，作者不承担因使用此脚本对自己和他人造成任何形式的损失或伤害之任何责任。
// @version         0.0.1     2015.11.25 20:00    Mod 1。
// @version         0.0.0     2015.10.20 17:00    Building。
// ==/UserScript==
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 2.0/GPL 3.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is the userChromeJS utilities.
 *
 * The Initial Developer of the Original Code is
 * feiruo <feiruosama@gmail.com>
 *
 * Portions created by the Initial Developer are Copyright (C) 2015
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 3 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
location == "chrome://browser/content/browser.xul" && (function(CSS) {
	let {
		classes: Cc,
		interfaces: Ci,
		utils: Cu,
		results: Cr
	} = Components;
	if (!window.Services) Cu.import("resource://gre/modules/Services.jsm");
	if (!window.AddonManager) Cu.import("resource://gre/modules/AddonManager.jsm");
	if (!window.UserAgentOverrides) Cu.import("resource://gre/modules/UserAgentOverrides.jsm");
	if (!window.FileUtils) Cu.import("resource://gre/modules/FileUtils.jsm");
	if (!window.XPCOMUtils) Cu.import("resource://gre/modules/XPCOMUtils.jsm");
	if (!window.Promise) Cu.import("resource://gre/modules/Promise.jsm");
	if (!window.NetUtil) Cu.import("resource://gre/modules/NetUtil.jsm");

	if (window.FeiRuoNet) {
		window.FeiRuoNet.onDestroy();
		delete window.FeiRuoNet;
	}

	var FeiRuoNet = {
		Prefs: Services.prefs.getBranch("userChromeJS.FeiRuoNet."),
		DEFAULT_FlagS: "chrome://branding/content/icon16.png",
		DBAK_FLAG_PATH: "http://www.razerzone.com/asset/images/icons/flags/",
		DefaultFaviconVisibility: $("page-proxy-favicon") ? $("page-proxy-favicon").style.visibility : "visible",

		get MenuFile() {
			let aFile = FileUtils.getFile("UChrm", ["Local", "FeiRuoNet", '_FeiRuoNetMenu.js']);
			try {
				this.MenuFile_ModifiedTime = aFile.lastModifiedTime;
			} catch (e) {}
			delete this.MenuFile;
			return this.MenuFile = aFile;
		},
		get ConfFile() {
			let aFile = FileUtils.getFile("UChrm", ["Local", "FeiRuoNet", '_FeiRuoNet.js']);
			try {
				this.ConfFile_ModifiedTime = aFile.lastModifiedTime;
			} catch (e) {}
			delete this.ConfFile;
			return this.ConfFile = aFile;
		},
		get IsUsingUA() {
			if (gPrefService.getPrefType("general.useragent.override") != 0)
				return gPrefService.getCharPref("general.useragent.override");
			return null;
		},
		get CurrentURI() {
			var windowMediator = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
			var topWindowOfType = windowMediator.getMostRecentWindow("navigator:browser");
			if (topWindowOfType)
				return topWindowOfType.document.getElementById("content").currentURI;
			return null;
		},
		get IsNetError() {
			var url;
			if (window.content)
				url = window.content.document.URL;
			else
				url = gBrowser.selectedBrowser.contentDocumentAsCPOW.URL;

			if (/^about:(neterror|certerror|blank)/i.test(url))
				return true;
			else
				return false;
		},

		Initialization: function() {
			var StartupTime = new Date();
			this.Debug = this.GetPrefs(0, "Debug", false);
			FeiRuoNet_IPDate.Initialization();
			FeiRuoNet_Menu.Initialization();
			FeiRuoNet_Flag.Initialization();
			this.init();
			FeiRuoNet_Services.Initialization();
			window.addEventListener("unload", function() {
				FeiRuoNet.onDestroy();
			}, false);
		},

		init: function() {
			this.CreatePopup(true);
			this.LoadSetting();
			this.Rebuild();
		},

		uninit: function() {
			FeiRuoNet_Flag.Initialization();
			FeiRuoNet_IPDate.uninit();
			FeiRuoNet_Menu.uninit();
			FeiRuoNet_Services.uninit();
			this.Rebuild_UAChanger();
			this.CreatePopup();
			this.CreateIcon();
			if (this.GetWindow(0)) this.GetWindow(0).close();
			if (this.GetWindow(1)) this.GetWindow(1).close();
			this.UrlbarSafetyLevel = false;
			this.UrlbarSL();
		},

		onDestroy: function() {
			this.MutationObs.disconnect();
			this.uninit();
			Services.appinfo.invalidateCachesOnRestart();
			Services.obs.notifyObservers(null, "startupcache-invalidate", "");
		},

		/*****************************************************************************************/
		MenuItemClick: function(event) {
			if (event.target != event.currentTarget) return;
			event.stopPropagation();
			event.preventDefault();
			if (event.button == 0)
				FeiRuoNet.OpenPref(0);
			else if (event.button == 1)
				FeiRuoNet.Rebuild(true);
			if (event.button == 2)
				this.EditFile(0);
		},

		CreateIcon: function(IconPos) {
			if (this.Icon_Pos === IconPos) return;
			var icon = $("FeiRuoNet_icon");
			if (icon) icon.parentNode.removeChild(icon);
			delete icon;
			if (this.Icon_Pos === 0 && $("page-proxy-favicon"))
				$("page-proxy-favicon").style.visibility = this.DefaultFaviconVisibility;

			if (typeof IconPos == 'undefined')
				return false;

			if (typeof IconPos == "number")
				this.Icon_Pos = IconPos;

			var IconType = this.IconSstatusBarPanel ? 'statusbarpanel' : 'image';

			if (this.Icon_Pos === 0) {
				this.icon = $C(IconType, {});
				$('identity-box').appendChild(this.icon);
			} else if (this.Icon_Pos === 1) {
				this.icon = $C(IconType, {});
				$('urlbar-icons').appendChild(this.icon);
			} else if (this.Icon_Pos === 2) {
				this.icon = $C('toolbarbutton', {
					class: 'toolbarbutton-1 chromeclass-toolbar-additional',
					type: 'menu',
					removable: true,
					id: "FeiRuoNet_icon",
				});
				ToolbarManager.addWidget(window, this.icon, true);
			}

			this.icon.setAttribute('id', 'FeiRuoNet_icon');
			this.icon.setAttribute('context', 'FeiRuoNet_Popup');
			this.icon.setAttribute('onclick', 'if (event.button != 2) FeiRuoNet.IconClick(event);');

			if (this.IconSstatusBarPanel)
				this.icon.setAttribute('class', 'statusbarpanel-iconic');

			return true;
		},

		IconClick: function(event) {
			if (event.target != this.icon) return;
			if (event.target != event.currentTarget) return;
			if (event.button == 0) {
				this.Copy();
				event.stopPropagation();
				event.preventDefault();
			} else if (event.button == 1) {
				FeiRuoNet_Services.onLocationChange(true);
			}
			if (event.button == 2) {
				//$("FeiRuoNet_Popup").showPopup();
				//event.stopPropagation();
				//event.preventDefault();
			}
		},

		/*****************************************************************************************/
		Rebuild: function(isAlert) {
			var MenuData = this.LoadFile(this.MenuFile, isAlert);
			this.Icons = MenuData.Icons || {};
			this.TipShow = MenuData.TipShow || {};
			this.Menus = MenuData.Menus || {};
			FeiRuoNet_Menu.init(this.Menus);

			this.DEFAULT_Flag = this.Icons.DEFAULT_Flag ? this.Icons.DEFAULT_Flag : this.DEFAULT_FlagS;
			this.Unknown_Flag = this.Icons.Unknown_Flag ? this.Icons.Unknown_Flag : this.DEFAULT_Flag;
			this.File_Flag = this.Icons.File_Flag ? this.Icons.File_Flag : this.DEFAULT_Flag;
			this.Base64_Flag = this.Icons.Base64_Flag ? this.Icons.Base64_Flag : this.File_Flag;
			this.LocahHost_Flag = this.Icons.LocahHost_Flag ? this.Icons.LocahHost_Flag : this.DEFAULT_Flag;
			this.LAN_Flag = this.Icons.LAN_Flag ? this.Icons.LAN_Flag : this.DEFAULT_Flag;
			this.Unknown_UAImage = this.Icons.Unknown_UAImage ? this.Icons.Unknown_UAImage : this.DEFAULT_Flag;

			var ConfData = this.LoadFile(this.ConfFile, isAlert);
			FeiRuoNet_Flag.ServerInfo = ConfData.ServerInfo || [];
			this.HeadRules = ConfData.HeadRules || {};
			this.UASites = ConfData.UASites || {};
			this.UAList = ConfData.UAList || [];
			this.RefererChange = ConfData.RefererChange || [];
			this.CustomInfos = ConfData.CustomInfos || [];
			this.Interfaces = ConfData.Interfaces || [];
			this.FeiRuoFunc = ConfData.FeiRuoFunc || function() {};

			FeiRuoNet_Flag.init(true);
			this.Rebuild_UAChanger(true);
			FeiRuoNet_Services.onLocationChange();

			if (isAlert)
				alert('配置已经重新载入！');
		},

		Rebuild_UAChanger: function(isAlert) {
			if (!this.UAList || !this.UAChangerState || (this.UAList && this.UAList.length == 0)) return;

			$$("menuitem[id^='FeiRuoNet_UserAgent_']").forEach(e => {
				e.parentNode.removeChild(e);
			});
			$$("menuseparator[id^='FeiRuoNet_UserAgent_']").forEach(e => {
				e.parentNode.removeChild(e);
			});

			if (!isAlert) return;
			this.UAList.unshift('{}');
			var tmp = {};
			tmp.label = Services.appinfo.name + Services.appinfo.version /*.split(".")[0] */ ;
			tmp.ua = "";
			tmp.image = this.Icons.DEFAULT_UA ? this.Icons.DEFAULT_UA : this.DEFAULT_Flag;
			this.UAList.unshift(tmp);

			var UANameIdxHash = [],
				UAList = this.UAList,
				menu = $("FeiRuoNet_UserAgent_Popup"),
				InList = false,
				menuitem;
			if (UAList.length >= 2) {
				for (let i = 0; i < UAList.length; i++) {
					UANameIdxHash[UAList[i].label] = i;
					if (UAList[i].label === "separator" || (!UAList[i].label && !UAList[i].id && !UAList[i].ua)) {
						menuitem = menu.appendChild($C("menuseparator", {
							id: "FeiRuoNet_UserAgent_" + i,
							class: "FeiRuoNet_UserAgent_menuseparator",
						}));
					} else {
						menuitem = menu.appendChild($C("menuitem", {
							label: UAList[i].label || ("UA_" + i),
							id: "FeiRuoNet_UserAgent_" + i,
							image: UAList[i].image || this.Unknown_UAImage,
							tooltiptext: UAList[i].ua || "",
							oncommand: "FeiRuoNet_Services.SetUserAgent('" + i + "');"
						}));
						menuitem.setAttribute("style", 'font-weight: normal;');
						menuitem.style.color = 'black';
						var cls = menuitem.classList;
						cls.add("FeiRuoNet_UserAgent_item");
						cls.add("menuitem-iconic");

						if (UAList[i].ua == this.IsUsingUA || UAList[i].ua == "") {
							FeiRuoNet_Services.UAPerfAppVersion = FeiRuoNet_Services.UaAppVersion(i);
							FeiRuoNet_Services.Default_UAIdx = i;
							InList = true;
							cls.add("FeiRuoNet_UsingUA");
						}
					}
					menu.appendChild(menuitem);
				}
				FeiRuoNet_Services.UARules = {};
				for (var j in this.UASites) {
					FeiRuoNet_Services.UARules[j] = UANameIdxHash[this.UASites[j]] ? UANameIdxHash[this.UASites[j]] : FeiRuoNet_Services.Default_UAIdx;
				}
				$("FeiRuoNet_UserAgent_Config").hidden = false;
			} else {
				this.UAChangerState = false;
				$("FeiRuoNet_UserAgent_Config").hidden = true;
			}
			if (!InList) this.UAMenuitemStates();
		},

		/*****************************************************************************************/
		CreatePopup: function(enable) {
			var Popup = $("FeiRuoNet_Popup");
			if (Popup) Popup.parentNode.removeChild(Popup);
			delete Popup;
			if (!enable) return;
			this.Popup = $C("menupopup", {
				id: "FeiRuoNet_Popup",
				// position: "after_start",
				position: "bottomcenter topright",
				//onpopupshowing: "FeiRuoNet.OnPopupShowing(event);"
			});
			this.Popup.appendChild($C("menuitem", {
				id: "FeiRuoNet_Copy",
				label: "复制信息",
				oncommand: "FeiRuoNet.Copy();",
			}));
			this.Popup.appendChild($C("menuitem", {
				id: "FeiRuoNet_Rebuild",
				label: "刷新信息",
				oncommand: "FeiRuoNet.onLocationChange(true);",
			}));
			//this.Popup.appendChild($C("menuitem", {
			//id: "FeiRuoNet_POSTGET",
			//label: "POSTGET",
			//oncommand: "FeiRuoNet.OpenPref(1);",
			//}));
			var menu = $C("menu", {
				id: "FeiRuoNet_UserAgent_Config",
				label: "UserAgent",
				class: "FeiRuoNet menu-iconic",
				hidden: "true",
			});
			menu.appendChild($C("menupopup", {
				id: "FeiRuoNet_UserAgent_Popup",
			}));
			this.Popup.appendChild(menu);
			this.Popup.appendChild($C("menuitem", {
				id: "FeiRuoNet_SetPref",
				label: "脚本设置",
				class: "FeiRuoNet menuitem-iconic",
				onclick: "FeiRuoNet.MenuItemClick(event);",
				tooltiptext: "左键：打开设置窗口。\n中键：重载配置和菜单。\n右键：编辑配置。",
			}));
			this.Popup.appendChild($C("menuseparator", {
				id: "FeiRuoNet_Sepalator2",
				hidden: "true",
			}));

			$('mainPopupSet').appendChild(this.Popup);
			this.style = addStyle(CSS);
		},

		LoadSetting: function(type) {
			if (!type || type === "Icon_Pos")
				this.CreateIcon(this.GetPrefs(1, "Icon_Pos")) && type && FeiRuoNet_Services.onLocationChange();

			if (!type || type === "IconSstatusBarPanel") {
				var IconSstatusBarPanel = this.GetPrefs(0, "IconSstatusBarPanel");
				if (this.IconSstatusBarPanel != IconSstatusBarPanel) {
					this.IconSstatusBarPanel = IconSstatusBarPanel;
					this.CreateIcon(true);
					if (type) FeiRuoNet_Services.onLocationChange();
				}
			}

			if (!type || type === "ApiIdx")
				FeiRuoNet_Flag.init(this.GetPrefs(1, "ApiIdx")) && type && FeiRuoNet_Services.onLocationChange('Flags');

			if (!type || type === "Inquiry_Delay")
				this.Inquiry_Delay = this.GetPrefs(1, "Inquiry_Delay", 1000);

			if (!type || type === "BAK_FLAG_PATH")
				this.BAK_FLAG_PATH = this.GetPrefs(2, "BAK_FLAG_PATH", this.DBAK_FLAG_PATH);

			if (!type || type === "ModifyHeader")
				this.ModifyHeader = this.GetPrefs(0, "ModifyHeader", true);

			if (!type || type === "Debug")
				this.Debug = this.GetPrefs(0, "Debug");

			if (!type || type === "RefChanger")
				this.RefChanger = this.GetPrefs(0, "RefChanger", true);

			if (!type || type === "CustomQueue")
				this.CustomQueue = this.GetPrefs(1, "CustomQueue", 0);

			if (!type || type === "UrlbarSafetyLevel")
				this.UrlbarSafetyLevel = this.GetPrefs(0, "UrlbarSafetyLevel", true);

			if (!type || type === "UAChangerState")
				this.UAChangerState = this.GetPrefs(0, "UAChangerState", true);

			if (!type || type === "ProxyTimer")
				this.ProxyTimer = this.GetPrefs(1, "ProxyTimer", 3500);

			// if (!type || type === "ProxyPath") {
			// 	var ProxyPath = this.GetPrefs(2, "ProxyPath", "[UChrm]Tools/ShadowsocksR.exe");
			// 	if (!ProxyPath) return;
			// 	if (/^\[/.test(ProxyPath))
			// 		this.ProxyPath = this.GetPrefs(4, "ProxyPath");
			// 	else
			// 		this.ProxyPath = this.GetPrefs(3, "ProxyPath");
			// }

			if (!type || type === "ProxyMode")
				this.ProxyMode = this.GetPrefs(1, "ProxyMode", 1);

			// if (!type || type === "ProxyServers") {
			// 	var ProxyServers = unescape(this.GetPrefs(2, "ProxyServers", "ShadowSocks|127.0.0.1|1080|socks|1;GoAgent|127.0.0.1|8087|http|1")).split(";");
			// 	if (!ProxyServers[0]) return;
			// 	this.ProxyServers = [];
			// 	for (var i in ProxyServers) {
			// 		var arr = ProxyServers[i].split("|"),
			// 			obj = {};
			// 		obj.name = arr[0];
			// 		obj.host = arr[1];
			// 		obj.port = arr[2];
			// 		obj.type = arr[3];
			// 		obj.remoteDNS = arr[4] ? arr[4] : 0;
			// 		obj.ProxyServer = FeiRuoNet_Services.ProxySrv.newProxyInfo(obj.type, obj.host, obj.port, obj.remoteDNS, this.ProxyTimer, null);
			// 		this.ProxyServers.push(obj);
			// 	}
			// }

			if (!type || type === "DefaultProxy")
				this.DefaultProxy = this.GetPrefs(1, "DefaultProxy", 0);
		},

		GetPrefs: function(type, name, val) {
			switch (type) { //https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Preferences
				case 0:
					if (!this.Prefs.prefHasUserValue(name) || this.Prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_BOOL)
						this.Prefs.setBoolPref(name, val ? val : false);
					return this.Prefs.getBoolPref(name);
				case 1:
					if (!this.Prefs.prefHasUserValue(name) || this.Prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_INT)
						this.Prefs.setIntPref(name, val ? val : 0);
					return this.Prefs.getIntPref(name);
				case 2:
					if (!this.Prefs.prefHasUserValue(name) || this.Prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_STRING)
						this.Prefs.setCharPref(name, val ? val : "");
					return this.Prefs.getCharPref(name);
				case 3:
					if (!this.Prefs.prefHasUserValue(name) || this.Prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_STRING)
						this.Prefs.setComplexValue(name, Ci.nsILocalFile, makeURI(val).QueryInterface(Ci.nsIFileURL).file);
					return this.Prefs.getComplexValue(name, Ci.nsILocalFile);
				case 4:
					if (!this.Prefs.prefHasUserValue(name) || this.Prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_STRING) {
						var aFile = Cc["@mozilla.org/pref-relativefile;1"].createInstance(Ci.nsIRelativeFilePref);
						aFile.relativeToKey = "UChrm";
						var path = Services.io.newFileURI(FileUtils.getDir("UChrm", '')).spec + val.replace(/^(\/\/|\\)/i, '').replace(/\\/ig, '/');
						aFile.file = makeURI(path).QueryInterface(Ci.nsIFileURL).file;
						this.Prefs.setComplexValue(name, Ci.nsIRelativeFilePref, aFile || this[name]);
					}
					return this.Prefs.getComplexValue(name, Ci.nsIRelativeFilePref).file;
				default:
					break;
			}
		},

		GetWindow: function(num) {
			var windowsMediator = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
			if (num === 0)
				return windowsMediator.getMostRecentWindow("FeiRuoNet:Preferences");
			if (num === 1)
				return windowsMediator.getMostRecentWindow("FeiRuoNet:POSTGET");
		},

		LoadFile: function(aFile, isAlert) {
			if (!aFile || !aFile.exists() || !aFile.isFile())
				return null;
			var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
			var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
			fstream.init(aFile, -1, 0, 0);
			sstream.init(fstream);
			var data = sstream.read(sstream.available());
			try {
				data = decodeURIComponent(escape(data));
			} catch (e) {}
			sstream.close();
			fstream.close();
			if (!data) {
				var errmsg = "Rebuild Error:【" + aFile.leafName + "】文件不存在";
				log(errmsg);
				if (isAlert)
					alert(errmsg);
				return null;
			}
			var sandbox = new Cu.Sandbox(new XPCNativeWrapper(window));
			sandbox.Components = Components;
			sandbox.Cc = Cc;
			sandbox.Ci = Ci;
			sandbox.Cr = Cr;
			sandbox.Cu = Cu;
			sandbox.Services = Services;
			sandbox.locale = Services.prefs.getCharPref("general.useragent.locale");
			try {
				var lineFinder = new Error();
				Cu.evalInSandbox(data, sandbox, "1.8");
			} catch (e) {
				let line = e.lineNumber - lineFinder.lineNumber - 1;
				var errmsg = 'Error: ' + e + "\n请重新检查【" + aFile.leafName + "】文件第 " + line + " 行";
				log(errmsg);
				if (isAlert)
					alert(errmsg);
			}
			return sandbox || null;
		},

		XRequest: function(obj) {
			return new Promise(function(resolve, reject) {
				var request = new XMLHttpRequest();
				request.open(obj.method || 'GET', obj.url, obj.async || true, obj.bstrUser || null, obj.bstrPassword || null);
				if (obj.responseType) //返回类型
					request.responseType = obj.responseType;
				request.timeout = obj.timeout || FeiRuoNet.Inquiry_Delay; //延迟时间，毫秒
				request.ontimeout = onerror;
				if (obj.onreadystatechange)
					request.onreadystatechange = obj.onreadystatechange; //存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。
				if (obj.overrideMimeType)
					request.overrideMimeType = obj.overrideMimeType; //覆盖发送给服务器的头部，强制 overrideMimeType 作为 mime-type。
				if (obj.setRequestHeader) { //自定义HTTP头部信息。需在open()方法之后和send()之前调用，才能成功发送请求头部信息。
					for (let [key, val] in Iterator(obj.setRequestHeader)) {
						request.setRequestHeader(key, val);
					}
				}
				request.onload = function() {
					resolve(request);
				};
				request.onerror = function(event) {
					reject(event);
				};
				request.send(obj.SendString || null); //将请求发送到服务器。参数string仅用于POST请求；对于GET请求的参数写在url后面，所以string参数传递null。
				if (obj.getResponseHeader && obj.getResponseHeader.length > 0) { //获取指定的相应头部信息
					if (obj.getResponseHeader[0] == "All")
						request.getAllResponseHeaders();
					else {
						var hdarry = [];
						obj.getResponseHeader.forEach(hd => {
							hdarry.push(request.getResponseHeader(hd));
						})
					}
				}
			});
		},

		UpdateFile: function() {
			var NeedRebuild = false;
			if ((this.MenuFile && this.MenuFile.exists() && this.MenuFile.isFile()) && (this.MenuFile_ModifiedTime != this.MenuFile.lastModifiedTime)) {
				this.MenuFile_ModifiedTime = this.MenuFile.lastModifiedTime;
				NeedRebuild = true;
			}
			if ((this.ConfFile && this.ConfFile.exists() && this.ConfFile.isFile()) && (this.ConfFile_ModifiedTime != this.ConfFile.lastModifiedTime)) {
				this.ConfFile_ModifiedTime = this.ConfFile.lastModifiedTime;
				NeedRebuild = true;
			}
			if (NeedRebuild) {
				setTimeout(function() {
					this.Rebuild(true);
				}, 10);
			}
		},

		EditFile: function(aFile) {
			if (aFile == 0)
				aFile = this.ConfFile;
			else if (aFile == 1 || !aFile)
				aFile = this.MenuFile;
			else if (typeof(aFile) == "string") {
				if (/^file:\/\//.test(aFile))
					aFile = aFile.QueryInterface(Components.interfaces.nsIFileURL).file;
				else {
					var File = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
					aFile = File.initWithPath(aFile);
				}
			} else return;

			if (!aFile || !aFile.exists() || !aFile.isFile())
				return alert("文件不存在:\n" + aFile.path);

			var editor;
			try {
				editor = gPrefService.getCharPref("view_source.editor.path");
			} catch (e) {
				log("编辑器路径读取错误  >>  " + e);
			}

			if (!editor) {
				this.OpenScriptInScratchpad(window, aFile);
				alert("请先设置编辑器的路径!!!\nview_source.editor.path");
				return;
			}

			var UI = Cc['@mozilla.org/intl/scriptableunicodeconverter'].createInstance(Ci.nsIScriptableUnicodeConverter);
			var platform = window.navigator.platform.toLowerCase();
			if (platform.indexOf('win') > -1)
				UI.charset = 'GB2312';
			else
				UI.charset = 'UTF-8';

			var path = UI.ConvertFromUnicode(aFile.path);

			var appfile = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
			appfile.initWithPath(editor);
			var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
			process.init(appfile);
			process.run(false, [path], 1, {});
		},

		Copy: function(str) {
			if (!str) str = FeiRuoNet_Flag.QueryHash[FeiRuoNet.CurrentURI.host].IP; //this.icon.tooltipText;
			Cc['@mozilla.org/widget/clipboardhelper;1'].createInstance(Ci.nsIClipboardHelper).copyString(str);
			StatusLable = "已复制: " + str;
		},

		OpenScriptInScratchpad: function(parentWindow, file) {
			let spWin = (parentWindow.Scratchpad || Services.wm.getMostRecentWindow("navigator:browser").Scratchpad).openScratchpad();

			spWin.addEventListener("load", function spWinLoaded() {
				spWin.removeEventListener("load", spWinLoaded, false);

				let Scratchpad = spWin.Scratchpad;
				Scratchpad.setFilename(file.path);
				Scratchpad.addObserver({
					onReady: function() {
						Scratchpad.removeObserver(this);
						Scratchpad.importFromFile.call(Scratchpad, file);
					}
				});
			}, false);
		},

		OpenPref: function(i) {
			if (this.GetWindow(i))
				this.GetWindow(i).focus();
			else {
				var OpenWin = (i == 0) ? this.OptionWin() : this.POSTGET();
				window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8," + OpenWin, '', 'chrome,titlebar,toolbar,centerscreen,dialog=no');
			}
		},
	};

	window.FeiRuoNet_Services = {
		//ProxySrv: Cc['@mozilla.org/network/protocol-proxy-service;1'].getService(Ci.nsIProtocolProxyService),
		//ProxySrv: Cc['@mozilla.org/network/protocol-proxy-service;1'].getService(),
		progressListener: {
			onLocationChange: function() {
				FeiRuoNet_Services.onLocationChange();
			},
			onProgressChange: function() {},
			onSecurityChange: function() {},
			onStateChange: function() {},
			onStatusChange: function() {}
		},

		Initialization: function() {
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			if (!this.MutationObs)
				this.MutationObs = new MutationObserver(FeiRuoNet_Services.UrlbarSL);
			this.MutationObs.observe($('identity-box'), {
				attributes: true,
				attributeFilter: ["class"]
			});
			this.uninit();
			this.init();
		},

		uninit: function() {
			this.Default_UAIdx = 0;
			FeiRuoNet.Prefs.removeObserver('', this, false);
			window.getBrowser().removeProgressListener(FeiRuoNet_Services.progressListener);
			try {
				["http-on-modify-request", "document-element-inserted", "content-document-loaded", "content-document-global-created", "http-on-examine-response", "http-on-examine-cached-response", "http-on-examine-merged-response"].forEach(obs => {
					Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService).removeObserver(this, obs, false);
				});
				// this.ProxySrv.uninit();
			} catch (e) {}
		},

		init: function() {
			["http-on-modify-request", "document-element-inserted", "content-document-loaded", "content-document-global-created", "http-on-examine-response", "http-on-examine-cached-response", "http-on-examine-merged-response"].forEach(obs => {
				Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService).addObserver(this, obs, false);
			});
			FeiRuoNet.Prefs.addObserver('', this, false);
			// this.ProxySrv.registerFilter(this.ProxyFilter, 0);
			window.getBrowser().addProgressListener(FeiRuoNet_Services.progressListener);
		},

		observe: function(subject, topic, data) {
			switch (topic.toLowerCase()) {
				case "http-on-modify-request":
					var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
					if (FeiRuoNet.RefChanger) {
						for (var s = httpChannel.URI.host; s != ""; s = s.replace(/^.*?(\.|$)/, "")) {
							this.adjustRef(httpChannel, s);
						}
						if (httpChannel.referrer && httpChannel.referrer.host != httpChannel.originalURI.host)
							httpChannel.setRequestHeader('Referer', httpChannel.originalURI.spec.replace(/[^/]+$/, ''), false);
					}
					this.SetRequestHeader(httpChannel);
					break;
				case "document-element-inserted":
				case "content-document-loaded":
				case "content-document-global-created":
					var aSubject;
					if (subject.defaultView)
						aSubject = subject.defaultView;
					if (subject.QueryInterface && subject.document)
						aSubject = subject;
					if (aSubject)
						this.AdjustUserAgent(aSubject);
					break;
				case "http-on-examine-response":
				case "http-on-examine-cached-response":
				case "http-on-examine-merged-response":
					var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
					var uri = httpChannel.URI.spec.replace(/#.*$/, '');
					//see http://tool.oschina.net/commons
					if (httpChannel.contentType === 'text/html') {
						if (typeof FeiRuoNet_Flag.HeadersCache[uri] === 'undefined')
							FeiRuoNet_Flag.HeadersCache[httpChannel.URI.asciiHostPort || httpChannel.URI.hostPort] = {};

						httpChannel.visitResponseHeaders(function(header, value) {
							FeiRuoNet_Flag.HeadersCache[httpChannel.URI.asciiHostPort || httpChannel.URI.hostPort][header.toLowerCase()] = value;
						});
					}
					//Set response header
					break;
				case "nspref:changed":
					switch (data) {
						case 'Icon_Pos':
						case 'IconSstatusBarPanel':
						case 'Inquiry_Delay':
						case 'ApiIdx':
						case 'BAK_FLAG_PATH':
						case 'RefChanger':
						case 'UAChangerState':
						case 'UrlbarSafetyLevel':
						case 'ModifyHeader':
						case 'ProxyServers':
						case 'DefaultProxy':
						case 'ProxyMode':
						case 'ProxyPath':
						case 'ProxyTimer':
							FeiRuoNet.LoadSetting(data);
							break;
					}
					break;
			}
		},

		onLocationChange: function(forceRefresh) {
			$("FeiRuoNet_UserAgent_Config").hidden = !FeiRuoNet.UAChangerState;

			if (this.UARules) {
				var isUAChange;
				isUAChange = this.UAIndex(FeiRuoNet.CurrentURI.spec);
				this.UAMenuitemStates(isUAChange ? isUAChange : this.Default_UAIdx);
			}

			if (forceRefresh)
				FeiRuoNet.forceRefresh = true;

			var aLocation = FeiRuoNet.CurrentURI;

			if (!aLocation || !aLocation.scheme)
				return FeiRuoNet_Flag.ChangeIcon();

			switch (aLocation.scheme) {
				case "file":
					FeiRuoNet.icon.tooltipText = '本地文件' + "\n" + aLocation.spec;
					FeiRuoNet_Flag.ChangeIcon(null, FeiRuoNet.File_Flag);
					break;
				case "data":
					FeiRuoNet.icon.tooltipText = 'Base64编码文件';
					FeiRuoNet_Flag.ChangeIcon(null, FeiRuoNet.Base64_Flag);
					break;
				case "ftp":
				case "wss":
				case "http":
				case "https":
					if (aLocation.asciiHost)
						FeiRuoNet_Flag.UpdateInfos(aLocation);
					else
						FeiRuoNet_Flag.ChangeIcon();
					break;
				case "chrome":
				case "about":
				case "resource":
				case "feed":
				default:
					FeiRuoNet_Flag.ChangeIcon();
					break;
			}
		},

		UrlbarSL: function(records) {
			gURLBar.classList.remove('FeiRuoNetSSLhigh');
			gURLBar.classList.remove('FeiRuoNetSSLmid');
			gURLBar.classList.remove('FeiRuoNetSSLlow');
			gURLBar.classList.remove('FeiRuoNetSSLbroken');
			if (!records || !FeiRuoNet.UrlbarSafetyLevel)
				return;
			var className = records[0].target.className;
			if (className.match(/mixed/))
				return gURLBar.classList.add('FeiRuoNetSSLbroken');
			if (className.match(/weakCipher/))
				return gURLBar.classList.add('FeiRuoNetSSLlow');
			else if (className == "verifiedDomain")
				return gURLBar.classList.add('FeiRuoNetSSLmid');
			else if (className == "verifiedIdentity")
				return gURLBar.classList.add('FeiRuoNetSSLhigh');
		},

		SetRequestHeader: function(httpChannel) {
			var Rules = {};
			if (FeiRuoNet.ModifyHeader && FeiRuoNet.HeadRules) {
				for (var i in FeiRuoNet.HeadRules) {
					if (new RegExp(i).test(httpChannel.URI.spec))
						Rules = FeiRuoNet.HeadRules[i];
				}
			}
			var idx = this.UAIndex(httpChannel.URI.spec);
			if (idx && FeiRuoNet.UAList[idx] && FeiRuoNet.UAList[idx].ua)
				Rules['User-Agent'] = FeiRuoNet.UAList[idx].ua;

			if (!Rules) return;
			for (var l in Rules) {
				var rule = Rules[l];
				httpChannel.setRequestHeader(l, rule, false);
			}
		},

		AdjustUserAgent: function(aSubject) {
			var aChannel = aSubject.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIWebNavigation).QueryInterface(Ci.nsIDocShell).currentDocumentChannel;
			if (!aChannel || !(aChannel instanceof Ci.nsIHttpChannel)) return;
			var navigator = aSubject.navigator;
			var userAgent = aChannel.getRequestHeader('User-Agent') || null;
			if (userAgent && navigator.userAgent != userAgent) {
				Object.defineProperty(XPCNativeWrapper.unwrap(navigator), 'userAgent', {
					value: userAgent,
					enumerable: true
				});
				var platform = this.getPlatformString(userAgent);
				if (platform && platform != '') {
					Object.defineProperty(XPCNativeWrapper.unwrap(navigator), 'platform', {
						value: platform,
						enumerable: true
					});
				}
			}
			var appVersion = this.UaAppVersion(this.UAIndex(aSubject.location.href)) || this.UAPerfAppVersion;
			if (appVersion) {
				Object.defineProperty(XPCNativeWrapper.unwrap(navigator), 'appVersion', {
					value: appVersion,
					enumerable: true
				});
			}
		},

		UAIndex: function(url) {
			if (!FeiRuoNet.UAChangerState || !url || !this.UARules) return;
			for (var i in this.UARules) {
				if ((new RegExp(i, "i")).test(url)) return this.UARules[i];
			}
			return;
		},

		SetUserAgent: function(val) {
			if (val == 0) {
				if (gPrefService.getPrefType("general.useragent.override") == 0 && gPrefService.getPrefType("general.platform.override") == 0)
					return;
				gPrefService.clearUserPref("general.useragent.override");
				gPrefService.clearUserPref("general.platform.override");
				this.UAPerfAppVersion = false;
			} else {
				gPrefService.setCharPref("general.useragent.override", FeiRuoNet.UAList[val].ua);
				this.UAPerfAppVersion = this.UaAppVersion(val);

				var platform = this.getPlatformString(FeiRuoNet.UAList[val].ua);
				if (platform && platform != "")
					gPrefService.setCharPref("general.platform.override", platform);
				else
					gPrefService.clearUserPref("general.platform.override");
			}
			StatusLable("浏览器标识(UserAgent)已切换至 [" + FeiRuoNet.UAList[val].label + "]");
			this.UAMenuitemStates(val);
			this.Default_UAIdx = val;
			return;
		},

		adjustRef: function(httpChannel, site) {
			try {
				var sRef;
				var refAction = undefined;
				for (var i in FeiRuoNet.RefererChange) {
					if (site.indexOf(i) != -1) {
						refAction = FeiRuoNet.RefererChange[i];
						break;
					}
				}

				if (refAction == undefined)
					return true;
				if (refAction.charAt(0) == '@') {
					switch (refAction) {
						case '@NORMAL':
							return true;
							break;
						case '@FORGE':
							sRef = httpChannel.URI.scheme + "://" + httpChannel.URI.hostPort + "/";
							break;
						case '@BLOCK':
							sRef = "";
							break;
						case '@AUTO':
							return false;
						case '@ORIGINAL':
							sRef = window.content.document.location.href;
							break;
						default:
							break;
					}
				} else if (refAction.length == 0) {
					return true;
				} else {
					sRef = refAction;
				}
				httpChannel.setRequestHeader("Referer", sRef, false);
				if (httpChannel.referrer)
					httpChannel.referrer.spec = sRef;
				return true;
			} catch (e) {}
			return true;
		},

		UaAppVersion: function(idx) {
			if (!idx) return;
			var obj = FeiRuoNet.UAList[idx],
				appVersion = false;
			if (obj.appVersion) {
				if (typeof(obj.appVersion) == 'boolean')
					appVersion = obj.ua.replace(/^Mozilla\//, '');
				else if (typeof(obj.appVersion) == 'string')
					appVersion = obj.appVersion;
				else appVersion = false;
			}
			return appVersion;
		},

		UAMenuitemStates: function(idx) {
			let UAitmss = document.querySelectorAll("menuitem[id^='FeiRuoNet_UserAgent_']");
			for (let i = 0; i < UAitmss.length; i++) {
				UAitmss[i].classList.remove("FeiRuoNet_UsingUA");
			}
			if (typeof idx != 'undefined') {
				$("FeiRuoNet_UserAgent_" + idx).classList.add("FeiRuoNet_UsingUA");
				$("FeiRuoNet_UserAgent_Config").setAttribute("label", FeiRuoNet.UAList[idx].label);
				$("FeiRuoNet_UserAgent_Config").setAttribute("image", FeiRuoNet.UAList[idx].image);
				$("FeiRuoNet_UserAgent_Config").style.padding = "0px 2px";
				return;
			} else {
				if (FeiRuoNet.UAList[i].ua == FeiRuoNet.IsUsingUA || FeiRuoNet.UAList[i].ua == "")
					return this.UAMenuitemStates(0);
				$("FeiRuoNet_UserAgent_Config").setAttribute("label", "未知UserAgent");
				$("FeiRuoNet_UserAgent_Config").setAttribute("tooltiptext", FeiRuoNet.IsUsingUA);
				$("FeiRuoNet_UserAgent_Config").setAttribute("image", FeiRuoNet.Unknown_UAImage);
			}
		},

		getPlatformString: function(userAgent) {
			if (!userAgent) return;
			var platform = "";
			var lowerUserAgent = userAgent.toLowerCase();
			if (lowerUserAgent.indexOf("windows") > -1) platform = "Win32";
			else if (lowerUserAgent.indexOf("android") > -1) platform = "Linux armv7l";
			else if (lowerUserAgent.indexOf("linux") > -1) platform = "Linux i686";
			else if (lowerUserAgent.indexOf("iphone") > -1) platform = "iPhone";
			else if (lowerUserAgent.indexOf("ipad") > -1) platform = "iPad";
			else if (lowerUserAgent.indexOf("mac os x") > -1) platform = "MacIntel";
			return platform;
		},
	};

	window.FeiRuoNet_Flag = {
		Unknown: 'Unknown',
		DnsService: Cc["@mozilla.org/network/dns-service;1"].createInstance(Ci.nsIDNSService),
		EventQueue: Cc["@mozilla.org/thread-manager;1"].getService(Ci.nsIThreadManager).currentThread,

		Initialization: function() {
			this.DNSCahe = {};
			this.Onece = {};
			this.QueryHash = {};
			this.IPInfos = {};
			this.HostInfos = {};
			this.HeadersCache = {};
			this.uninit();
		},

		init: function(ApiIdx) {
			var isApiIdx = (typeof ApiIdx == "number") ? true : false;
			if (isApiIdx && FeiRuoNet.ApiIdx === ApiIdx) return;
			this.uninit();
			if (isApiIdx)
				FeiRuoNet.ApiIdx = ApiIdx;
			var Interfaces = FeiRuoNet.Interfaces;
			if (!Interfaces || !Interfaces[0] || (!isApiIdx && !ApiIdx)) return;
			Interfaces.forEach(function(api) {
				if (api.isFlag) {
					FeiRuoNet.FlagApi = api.Api;
					FeiRuoNet.FlagFunc = api.Func;
				}
			})
			var API = Interfaces[FeiRuoNet.ApiIdx] ? Interfaces[FeiRuoNet.ApiIdx] : Interfaces[0];
			if (API && !API.isJustFlag) {
				this.InfoApi = API.Api;
				this.InfoFunc = API.Func;
			}
			return true;
		},

		uninit: function() {
			this.InfoApi = null;
			this.InfoFunc = null;
			this.FlagApi = null;
			this.FlagFunc = null;
		},

		UpdateInfos: function(aLocation) {
			var host = aLocation.asciiHostPort || aLocation.hostPort;
			this.QueryHash[host] || (this.QueryHash[host] = {});
			this.QueryHash[host].Host = aLocation.asciiHost;
			this.QueryHash[host].Port = aLocation.port;
			this.QueryHash[host].Scheme = aLocation.scheme;

			if (/^(https?:\/\/)?(127\.0\.0\.1)/i.test(host) || /^(https?:\/\/)?localhost:/i.test(host) || host == "::1" || (!FeiRuoNet.forceRefresh && this.DNSCahe[aLocation.asciiHost]))
				return this.LookUp(host, this.DNSCahe[aLocation.asciiHost] || null);

			var DnsListener = {
				onLookupComplete: function(request, nsrecord, status) {
					var s_ip;
					if (status != 0 || !nsrecord.hasMore())
						s_ip = "0";
					else
						s_ip = nsrecord.getNextAddrAsString();
					FeiRuoNet_Flag.DNSCahe[aLocation.asciiHost] = s_ip;
					FeiRuoNet_Flag.LookUp(host, s_ip);
				}
			};
			try {
				this.DnsService.asyncResolve(aLocation.asciiHost, 0, DnsListener, this.EventQueue);
			} catch (e) {
				log(e)
			}
			this.ChangeIcon();
		},

		LookUp: function(host, ip) {
			this.QueryHash[host].IP = ip || "127.0.0.1";
			this.SameIPHandle(host);
			this.SameHostHandle(host);
			this.IPInfos[this.QueryHash[host].IP] || (this.IPInfos[this.QueryHash[host].IP] = {});
			this.HostInfos[this.QueryHash[host].Host] || (this.HostInfos[this.QueryHash[host].Host] = {});

			if (!ip || ip == "::1" || ip == "0" || /^(192\.168\.|169\.254\.)/i.test(ip) || /^(127\.0\.0\.1)/i.test(ip))
				return this.InternalHandle(host, ip);

			if (FeiRuoNet.IsNetError)
				return this.NeterroHandle(host);

			this.LookUp_Flag(!FeiRuoNet.forceRefresh, host);
			this.LookUp_Tooltip(!FeiRuoNet.forceRefresh, host);
			this.LookUp_Custom(!FeiRuoNet.forceRefresh, host);
			FeiRuoNet.forceRefresh = false;
		},

		InternalHandle: function(host, ip) {
			var src = FeiRuoNet.LocahHost_Flag;
			if (!ip)
				this.QueryHash[host].IPAddrInfo = '回送地址:本机服务器';
			else if (ip == "0")
				return this.NeterroHandle(host);
			else if (ip == "127.0.0.1" || ip == "::1")
				this.QueryHash[host].IPAddrInfo = '回送地址：本机[服务器]';
			else if (/^(192\.168\.|169\.254\.)/i.test(ip)) {
				src = FeiRuoNet.LAN_Flag;
				this.QueryHash[host].IPAddrInfo = '本地局域网服务器';
			}
			if (!FeiRuoNet.IsNetError)
				this.UpdateTooltipText(host);
			else
				this.NeterroHandle(host);
			this.ChangeIcon(host, src, false);
		},

		NeterroHandle: function(host) {
			var url = window.content ? window.content.document.URL : gBrowser.selectedBrowser.contentDocumentAsCPOW.URL;
			var ErrorStr = "";
			if (url && url !== "about:blank") {
				var type = url.substring(url.indexOf("=") + 1, url.indexOf("&"));
				switch (type) {
					case "nssBadCert": //此连接不受信任
					case "deniedPortAccess": //端口受限
					case "fileNotFound": //无法加载此文件
					case "netOffline": //离线模式
					case "protocolNotFound": //这个协议没有被确认
						break;
					case "redirectLoop": //不正确的页面重定向
					case "nssFailure2": //安全连接失败   载入页面时到服务器的连接被重置。
					case "proxyConnectFailure": //代理拒绝链接
					case "unknownSocketType": //服务器意外响应
					case "proxyResolveFailure": //无法找到代理服务器
					case "connectionFailure": //无法连接到地址
					case "dnsNotFound": //找不到服务器
					case "generic": //无法完成请求
					case "malformedURI": //该地址无效
					case "netInterrupt": //中断连接
					case "netReset": //重置连接
					case "netTimeout": //连接超时
						// this.AutoProxy(type);
						break;
				}
				ErrorStr = '错误类型：' + type + '\n' + '详细描述：' + decodeURI(url.substring(url.lastIndexOf("=") + 1));
			} else
				ErrorStr = '页面载入错误';
			this.QueryHash[host].ErrorStr = ErrorStr;
			if (this.QueryHash[host].IP) {
				var ip = this.QueryHash[host].IP;
				if (ip && ip != "::1" && ip != "0" && !/^(192\.168\.|169\.254\.)/i.test(ip) && !/^(127\.0\.0\.1)/i.test(ip))
					this.LookUp_Tooltip(!FeiRuoNet.forceRefresh, host);
			}
			this.LookUp_Flag(!FeiRuoNet.forceRefresh, host);
			this.UpdateTooltipText(host);
		},

		SameHostHandle: function(host) {
			var Host = this.QueryHash[host].Host;
			if (!this.HostInfos[Host])
				return false;
			else {
				this.QueryHash[host].CustomInfo = this.HostInfos[Host].CustomInfo;
				return true;
			}
		},

		SameIPHandle: function(host) {
			var IP = this.QueryHash[host].IP;
			if (!this.IPInfos[IP])
				return false;
			else {
				this.QueryHash[host].FlagHash = this.IPInfos[IP].FlagHash;
				this.QueryHash[host].IPAddrInfo = this.IPInfos[IP].IPAddrInfo;
				this.QueryHash[host].IPAddrInfoHash = this.IPInfos[IP].IPAddrInfoHash;
				return true;
			}
		},

		AutoProxy: function(type) {
			// if (!this.ProxyProcess && FeiRuoNet.ProxyPath.exists() && FeiRuoNet.ProxyPath.isFile()) {
			// 	if (FeiRuoNet.ProxyPath.isExecutable()) {
			// 		this.ProxyProcess = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
			// 		this.ProxyProcess.init(FeiRuoNet.ProxyPath);
			// 		this.ProxyProcess.runw(true, "", 0);
			// 	} else
			// 		FeiRuoNet.ProxyPath.launch();
			// }
			// FeiRuoNet.NeedProxy[FeiRuoNet.CurrentURI.asciiHostPort || FeiRuoNet.CurrentURI.hostPort] = FeiRuoNet.ProxyServers[FeiRuoNet.DefaultProxy];
			// return $("Browser:ReloadSkipCache").doCommand();
		},

		/*****************************************************************************************/
		LookUp_Flag: function(checkCache, host) {
			if (checkCache && this.QueryHash[host].FlagHash)
				return this.UpdateIcon(host);

			if (FeiRuoNet_IPDate.IPv4DB.rangeCodes && FeiRuoNet_IPDate.IPv4DB.rangeIPs && FeiRuoNet_IPDate.IPv6DB.rangeCodes && FeiRuoNet_IPDate.IPv6DB.rangeIPs)
				return this.UpdateIcon(host, FeiRuoNet_IPDate.LookupIPCDB(this.QueryHash[host].IP));

			if (this.FlagApi == this.InfoApi)
				return;

			if (!this.FlagApi)
				return this.LookupIP_taobao(host, "Flag");

			FeiRuoNet.XRequest({
				url: this.FlagApi + this.QueryHash[host].IP,
			}).then(request => {
				if (request.status === 200)
					var info = this.FlagFunc(request.response);
				if (info)
					this.UpdateIcon(host, info.CountryCode, info.CountryName);
				else
					this.LookupIP_taobao(host, "Flag");
			}, error => {
				this.LookupIP_taobao(host, "Flag");
			});
		},

		LookUp_Tooltip: function(checkCache, host) {
			if (checkCache && this.QueryHash[host].IPAddrInfoHash)
				return this.UpdateTooltipText(host);

			if (FeiRuoNet_IPDate.QQwryDate) {
				this.QueryHash[host].IPAddrInfo = FeiRuoNet_IPDate.SearchIP(this.QueryHash[host].IP);
				return this.UpdateTooltipText(host);
			}

			if (!this.InfoApi)
				return this.LookupIP_taobao(host, "All");

			FeiRuoNet.XRequest({
				url: this.InfoApi + this.QueryHash[host].IP,
			}).then(request => {
				if (request.status === 200)
					var info = this.InfoFunc(request.response);
				if (info) {
					if (this.FlagApi == this.InfoApi)
						this.UpdateIcon(host, info.CountryCode, info.CountryName);
					this.QueryHash[host].IPAddrInfo = info.IPAddrInfo || null;
					this.QueryHash[host].IPAddrInfoThx = this.Thx(this.InfoApi);
					this.UpdateTooltipText(host);
				} else
					this.LookupIP_taobao(host, "Tip")
			}, error => {
				var type = (this.FlagApi == this.InfoApi) ? 'All' : 'Tip';
				this.LookupIP_taobao(host, type);
			});
			this.QueryHash[host].ErrorStr = "";
		},

		LookUp_Custom: function(checkCache, host) {
			if (!FeiRuoNet.CustomInfos || FeiRuoNet.CustomInfos.length == 0) return;

			if (!this.QueryHash[host].CustomInfo)
				this.QueryHash[host].CustomInfo = {};
			switch (FeiRuoNet.CustomQueue) {
				case 0:
					this.LookUp_Custom_Queue_Add(checkCache, host);
					break;
				case 1:
					this.LookUp_Custom_Queue_Delay(checkCache, host);
					break;
			}
		},

		LookUp_Custom_Queue_Add: function(checkCache, host) {
			var i = 0;
			var Customs = FeiRuoNet.CustomInfos;
			while (i < Customs.length) {
				var Custom = Customs[i];

				if (!Custom.Enable) {
					i = i + 1;
					continue;
				}
				var CusInfo = FeiRuoNet_Flag.QueryHash[host].CustomInfo[Custom.Api],
					nPort = FeiRuoNet_Flag.QueryHash[host].Port;
				if (checkCache && ((Custom.Times == 1 && FeiRuoNet_Flag.Onece[Custom.Api]) || (!Custom.DifPort && CusInfo) || (Custom.DifPort && (nPort in CusInfo.Port)))) {
					i = i + 1;
					continue;
				}
				Custom.url = FeiRuoNet_Menu.ConvertText(Custom.Api);
				FeiRuoNet_Flag.LookUp_Custom_Func(Custom, host, nPort);
				i = i + 1;
			}
		},

		LookUp_Custom_Queue_Delay: function(checkCache, host) {
			var Customs = FeiRuoNet.CustomInfos;
			for (var i in Customs) {
				var Custom = Customs[i];
				if (!Custom.Enable) continue;

				var CusInfo = FeiRuoNet_Flag.QueryHash[host].CustomInfo[Custom.Api],
					nPort = FeiRuoNet.CurrentURI.port;

				if (checkCache && ((Custom.Times == 1 && FeiRuoNet_Flag.Onece[Custom.Api]) || (!Custom.DifPort && CusInfo) || (Custom.DifPort && (nPort in CusInfo.Port)))) continue;

				Custom.url = FeiRuoNet_Menu.ConvertText(Custom.Api);

				(function(i, Custom, host, nPort) {
					FeiRuoNet_Flag["LookupIP_CustomInfo_" + i] = function() {
						FeiRuoNet_Flag.LookUp_Custom_Func(Custom, host, nPort);
					};
				})(i, Custom, host, nPort);
				FeiRuoNet_Flag["LookupIP_CustomInfo_" + i]();
			}
		},

		LookUp_Custom_Func: function(Custom, host, nPort) {
			FeiRuoNet.XRequest(Custom).then(request => {
				if (request.status === 200) {
					var funstr = Custom.Func.toString().replace(/^function.*{|}$/g, "");
					var CustomInfo = (new Function("docum", funstr))(request.response);
					if (Custom.Times == 1)
						this.Onece[Custom.Api] = CustomInfo;
					else if (Custom.DifPort) {
						this.QueryHash[host].CustomInfo[Custom.Api].Port || (this.QueryHash[host].CustomInfo[Custom.Api].Port = {});
						this.QueryHash[host].CustomInfo[Custom.Api].Port[nPort] = CustomInfo;
					} else
						this.QueryHash[host].CustomInfo[Custom.Api] = CustomInfo;
					this.UpdateTooltipText(host);
				}
			}, error => {
				log(error)
			});
		},

		LookupIP_taobao: function(host, type) {
			FeiRuoNet.XRequest({
				url: 'http://ip.taobao.com/service/getIpInfo.php?ip=' + this.QueryHash[host].IP,
			}).then(request => {
				if (request.status === 200)
					var responseObj = JSON.parse(request.response);
				if (responseObj && responseObj.code == 0)
					resolve(responseObj);
				else
					reject();
			}).then(responseObj => {
				var country_id = responseObj.data.country_id.toLocaleLowerCase();
				var addr = responseObj.data.country + responseObj.data.area;
				if (responseObj.data.region || responseObj.data.city || responseObj.data.county || responseObj.data.isp)
					addr = addr + '\n' + responseObj.data.region + responseObj.data.city + responseObj.data.county + responseObj.data.isp;
				if (type == "Flag" || type == "All")
					this.UpdateIcon(host, country_id, responseObj.data.country);

				if (type == "Tip" || type == "All") {
					this.QueryHash[host].IPAddrInfo = addr;
					this.QueryHash[host].IPAddrInfoThx = this.Thx('http://ip.taobao.com/service/getIpInfo.php?ip=');
					this.UpdateTooltipText(host);
				}
			}, error => {
				if (type == "Flag" || type == "All")
					this.UpdateIcon(host, this.Unknown);
				this.QueryHash[host].Unknown = '无法获取国家代码，请刷新！';
				this.UpdateTooltipText(host);
			});
		},

		/*****************************************************************************************/
		UpdateTooltipText: function(host) {
			if (!host) return;

			var TipShow = FeiRuoNet.TipShow ? FeiRuoNet.TipShow : {};
			var tipArrHost = TipShow.tipArrHost ? TipShow.tipArrHost : "Host：",
				tipArrIP = TipShow.tipArrIP ? TipShow.tipArrIP : "IP：",
				tipArrSepC = TipShow.tipArrSepC ? TipShow.tipArrSepC : "",
				tipArrSepEnd = TipShow.tipArrSepEnd ? TipShow.tipArrSepEnd : "",
				tipArrThanks = TipShow.tipArrThanks ? TipShow.tipArrThanks : "Thk：";

			var tooltipArr = [];
			this.QueryHash[host] || (this.QueryHash[host] = {});

			var obj = this.QueryHash[host];

			if (obj.Unknown && obj.Unknown !== "")
				tooltipArr.push(obj.Unknown);

			tooltipArr.push(tipArrHost + host);
			tooltipArr.push(tipArrIP + obj.IP);

			var ServerInfo;
			try {
				ServerInfo = this.LookupIP_ServerInfo(FeiRuoNet.CurrentURI.asciiHostPort || FeiRuoNet.CurrentURI.hostPort);
			} catch (e) {}
			if (ServerInfo && ServerInfo != "")
				tooltipArr.push(ServerInfo);

			if (obj.IPAddrInfo && obj.IPAddrInfo !== "") {
				this.IPInfos[obj.IP].IPAddrInfo = obj.IPAddrInfo;
				this.IPInfos[obj.IP].IPAddrInfoHash = true;
				this.QueryHash[host].IPAddrInfoHash = true;
				tooltipArr.push(obj.IPAddrInfo);
			}

			if (FeiRuoNet.IsNetError && obj.ErrorStr && obj.ErrorStr != "") {
				if (tipArrSepC)
					tooltipArr.push(tipArrSepC);
				tooltipArr.push(obj.ErrorStr);
			}

			var thx = [];
			if (obj.IPAddrInfoThx)
				thx.push(obj.IPAddrInfoThx)
			if (obj.FlagThx && obj.FlagThx !== obj.IPAddrInfoThx)
				thx.push(obj.FlagThx)

			if (FeiRuoNet.CustomInfos && obj.CustomInfo) {
				this.HostInfos[obj.Host].CustomInfo = obj.CustomInfo;
				for (var i in obj.CustomInfo) {
					thx.push(this.Thx(i));
					if (tipArrSepC)
						tooltipArr.push(tipArrSepC);
					if (typeof obj.CustomInfo[i] == 'string')
						tooltipArr.push(obj.CustomInfo[i]);
					else {
						tooltipArr.push(obj.CustomInfo[i].Port[FeiRuoNet.CurrentURI.Port]);
					}
				}
			}

			if (this.Onece) {
				for (var i in this.Onece) {
					thx.push(this.Thx(i));
					if (tipArrSepC) tooltipArr.push(tipArrSepC);
					tooltipArr.push(this.Onece[i]);
				}
			}

			if (thx.join('\n') !== "") {
				if (tipArrSepEnd) tooltipArr.push(tipArrSepEnd);
				tooltipArr.push(tipArrThanks + new String(thx));
			}

			FeiRuoNet.icon.tooltipText = tooltipArr.join('\n');
		},

		UpdateIcon: function(host, CountryCode, CountryName) {
			if (!host) return;
			if (FeiRuoNet_IPDate.IsIPV6) {
				this.QueryHash[host].IPAddrInfo = CountryCode;
				this.UpdateTooltipText(host);
			}

			var src;
			if (CountryCode == this.Unknown)
				src = FeiRuoNet.Unknown_Flag;

			CountryCode = CountryCode ? CountryCode.toLowerCase() : (this.QueryHash[host].FlagHash ? this.QueryHash[host].FlagHash : this.Unknown);

			if (CountryCode == 'iana' || CountryCode == "-??" || CountryCode == "-a" || CountryCode == "-b" || CountryCode == "-c" || CountryCode == "-l")
				src = FeiRuoNet.Unknown_Flag;

			if (CountryName && FeiRuoNet_IPDate.CountryName)
				CountryCode = (CountryName in this.CountryName) ? FeiRuoNet_IPDate.CountryName[CountryName] : this.Unknown;

			if (!src && CountryCode != this.Unknown) {
				src = this.GetFlagFoxIconPath(CountryCode) || (FeiRuoNet_IPDate.CountryFlag && (CountryCode in FeiRuoNet_IPDate.CountryFlag) ? FeiRuoNet_IPDate.CountryFlag[CountryCode] : null);

				if (!src) {
					src = FeiRuoNet.BAK_FLAG_PATH + CountryCode + ".gif";
					var img = new Image();
					img.src = FeiRuoNet.BAK_FLAG_PATH + CountryCode + ".gif";
					if (img.height == 100 && img.height == img.height) {
						src = null;
						CountryCode = this.Unknown;
					} else
						src = img.src;
				}
			}
			this.ChangeIcon(host, src, CountryCode);
		},

		ChangeIcon: function(host, src, CountryCode) {
			if (CountryCode && (!src || CountryCode == this.Unknown)) {
				src = FeiRuoNet.Unknown_Flag;
				CountryCode = this.Unknown;
			}

			FeiRuoNet.icon.src = src;
			FeiRuoNet.icon.image = src;

			if (host && typeof host == "string") {
				FeiRuoNet.icon.hidden = false;
				this.QueryHash[host].FlagHash = CountryCode;
				this.IPInfos[this.QueryHash[host].IP].FlagHash = CountryCode;
			}

			if (!src && !host) {
				FeiRuoNet.icon.src = FeiRuoNet.DEFAULT_Flag;
				FeiRuoNet.icon.image = FeiRuoNet.DEFAULT_Flag;
				FeiRuoNet.icon.tooltipText = 'FeiRuoNet';
			}

			if (FeiRuoNet.Icon_Pos === 0) {
				var scheme = FeiRuoNet.CurrentURI.scheme;
				var IconHide = (scheme == "about") || (scheme == "chrome") || (scheme == "resource");
				FeiRuoNet.icon.hidden = IconHide ? IconHide : !src;
				$('page-proxy-favicon') && ($('page-proxy-favicon').style.visibility = IconHide ? "visible" : "collapse");
				if (scheme == 'https' && $('page-proxy-favicon'))
					$('page-proxy-favicon').style.visibility = FeiRuoNet.IsNetError ? "collapse" : 'visible'
			}
		},

		LookupIP_ServerInfo: function() {
			if (!this.ServerInfo || !this.HeadersCache[FeiRuoNet.CurrentURI.asciiHostPort || FeiRuoNet.CurrentURI.hostPort]) return;
			var ServerInfo = [];
			if (this.ServerInfo[0].All) {
				var AllFilter = (typeof this.ServerInfo[0].AllFilter == 'string') ? (new RegExp(this.ServerInfo[0].AllFilter)) : this.ServerInfo[0].AllFilter;
				for (var p in this.HeadersCache[FeiRuoNet.CurrentURI.asciiHostPort || FeiRuoNet.CurrentURI.hostPort]) {
					if (!AllFilter.test(p))
						ServerInfo.push(p + '：' + this.HeadersCache[FeiRuoNet.CurrentURI.asciiHostPort || FeiRuoNet.CurrentURI.hostPort][p]);
				}
			} else {
				for (var i = 0; i < this.ServerInfo.length; i++) {
					var info = this.HeadersCache[FeiRuoNet.CurrentURI.asciiHostPort || FeiRuoNet.CurrentURI.hostPort][this.ServerInfo[i].words.toLowerCase()];
					if (this.ServerInfo[i].Func)
						info = this.ServerInfo[i].Func(info);
					if (info)
						ServerInfo.push(this.ServerInfo[i].label + info);
				}
			}
			return ServerInfo.join('\n');
		},

		GetFlagFoxIconPath: function(filename) {
			var FlagPath = FeiRuoNet_IPDate.LocalFlag + filename.toUpperCase() + '.png';
			var Flag = makeURI(FlagPath).QueryInterface(Ci.nsIFileURL).file;
			if (Flag.exists())
				return FlagPath;
			else
				return false;
		},

		GetDomain: function(url) {
			if (!url || !/^http:/.test(url)) return;
			var eTLDService = Cc["@mozilla.org/network/effective-tld-service;1"].getService(Ci.nsIEffectiveTLDService);
			var basedomain = eTLDService.getBaseDomain(makeURI(url));
			return basedomain;
		},

		Thx: function(Api) {
			if (!Api) return;
			var Service = Cc["@mozilla.org/network/effective-tld-service;1"].getService(Ci.nsIEffectiveTLDService);
			var uri = makeURI(Api);
			var thx = Service.getBaseDomain(uri).replace(Service.getPublicSuffix(uri), "").replace('.', "");
			return thx || null;
		},
	};

	window.FeiRuoNet_Menu = {
		get FocusedWindow() {
			return gContextMenu && gContextMenu.target ? gContextMenu.target.ownerDocument.defaultView : (content ? content : gBrowser.selectedBrowser.contentWindowAsCPOW);
		},

		Initialization: function() {
			let he = "(?:_HTML(?:IFIED)?|_ENCODE)?";
			let rTITLE = "%TITLE" + he + "%|%t\\b";
			let rTITLES = "%TITLES" + he + "%|%t\\b";
			let rURL = "%(?:R?LINK_OR_)?URL" + he + "%|%u\\b";
			let rHOST = "%HOST" + he + "%|%h\\b";
			let rIP = "%IP" + he + "%|%h\\b";
			let rBASEDOMAIN = "%BASEDOMAIN" + he + "%|%h\\b";
			let rSEL = "%SEL" + he + "%|%s\\b";
			let rLINK = "%R?LINK(?:_TEXT|_HOST)?" + he + "%|%l\\b";
			let rIMAGE = "%IMAGE(?:_URL|_ALT|_TITLE)" + he + "%|%i\\b";
			let rIMAGE_BASE64 = "%IMAGE_BASE64" + he + "%|%i\\b";
			let rMEDIA = "%MEDIA_URL" + he + "%|%m\\b";
			let rCLIPBOARD = "%CLIPBOARD" + he + "%|%p\\b";
			let rFAVICON = "%FAVICON" + he + "%";
			let rEMAIL = "%EMAIL" + he + "%";
			let rExt = "%EOL" + he + "%";

			let rFAVICON_BASE64 = "%FAVICON_BASE64" + he + "%";
			let rRLT_OR_UT = "%RLT_OR_UT" + he + "%"; // 链接文本或网页标题

			this.rTITLE = new RegExp(rTITLE, "i");
			this.rTITLES = new RegExp(rTITLES, "i");
			this.rURL = new RegExp(rURL, "i");
			this.rIP = new RegExp(rIP, "i");
			this.rHOST = new RegExp(rHOST, "i");
			this.rBASEDOMAIN = new RegExp(rBASEDOMAIN, "i");
			this.rSEL = new RegExp(rSEL, "i");
			this.rLINK = new RegExp(rLINK, "i");
			this.rIMAGE = new RegExp(rIMAGE, "i");
			this.rMEDIA = new RegExp(rMEDIA, "i");
			this.rCLIPBOARD = new RegExp(rCLIPBOARD, "i");
			this.rFAVICON = new RegExp(rFAVICON, "i");
			this.rEMAIL = new RegExp(rEMAIL, "i");
			this.rExt = new RegExp(rExt, "i");
			this.rFAVICON_BASE64 = new RegExp(rFAVICON_BASE64, "i");
			this.rIMAGE_BASE64 = new RegExp(rIMAGE_BASE64, "i");
			this.rRLT_OR_UT = new RegExp(rRLT_OR_UT, "i");
			this.regexp = new RegExp([rTITLE, rTITLES, rURL, rHOST, rBASEDOMAIN, rIP, rSEL, rLINK, rIMAGE, rIMAGE_BASE64, rMEDIA, rCLIPBOARD, rFAVICON, rFAVICON_BASE64, rEMAIL, rExt, rRLT_OR_UT].join("|"), "ig");
		},

		init: function(Menus) {
			if (!Menus) return;
			this.uninit();
			this.CustomShowings = [];
			$("FeiRuoNet_Sepalator2").hidden = false;
			var Popup = $("FeiRuoNet_Popup");

			for (let [, obj] in Iterator(Menus)) {
				if (!obj) continue;
				let menuitem;
				if (obj.id && (menuitem = $(obj.id))) {
					let dupMenuitem;
					let isDupMenu = (obj.clone != false);
					if (isDupMenu)
						dupMenuitem = menuitem.cloneNode(true);
					else
						dupMenuitem = menuitem;

					for (let [key, val] in Iterator(obj)) {
						if (typeof val == "function")
							obj[key] = val = "(" + val.toSource() + ").call(this, event);";
						dupMenuitem.setAttribute(key, val);
					}

					let type = dupMenuitem.nodeName,
						cls = dupMenuitem.classList;
					if (type == 'menuitem' || type == 'menu')
						if (!cls.contains(type + '-iconic'))
							cls.add(type + '-iconic');

					if (!cls.contains('FeiRuoNet_CustomMenu'))
						cls.add('FeiRuoNet_CustomMenu');
					if (!isDupMenu && !cls.contains('FeiRuoNet_MenuNot'))
						cls.add('FeiRuoNet_MenuNot');

					let noMove = !isDupMenu;
					Popup.appendChild(menuitem);
					continue;
				}
				menuitem = obj.child ? this.BuildMenu(obj) : this.BuildMenuitem(obj, {
					isTopMenuitem: true
				});
				Popup.appendChild(menuitem);
			}
		},

		uninit: function() {
			var remove = function(e) {
				if (e.classList.contains('FeiRuoNet_MenuNot')) return;
				e.parentNode.removeChild(e);
			};
			try {
				$("FeiRuoNet_Sepalator2").hidden = true;
				for (i in this.Menus) {
					$("main-menubar").insertBefore($(this.Menus[i].id), $("main-menubar").childNodes[7]);
				}
				$$('.FeiRuoNet_CustomMenu').forEach(remove);
			} catch (e) {}
		},

		RemoveMenu: function(type) {
			var remove = function(e) {
				if (e.classList.contains('FeiRuoNet_MenuNot')) return;
				e.parentNode.removeChild(e);
			};
			if (!type || type == "Custom_Menus") {
				try {
					$("FeiRuoNet_Sepalator2").hidden = true;
					for (i in this.Menus) {
						$("main-menubar").insertBefore($(this.Menus[i].id), $("main-menubar").childNodes[7]);
					}
				} catch (e) {}
				$$('.FeiRuoNet_CustomMenu').forEach(remove);

			}
			if (!type || type == "UserAgent_Menus") {
				$$("menuitem[id^='FeiRuoNet_UserAgent_']").forEach(remove);
				$$("menuseparator[id^='FeiRuoNet_UserAgent_']").forEach(remove);
			}
		},

		BuildMenu: function(menuObj, i) {
			var menu = document.createElement("menu");
			var Popup = menu.appendChild(document.createElement("menupopup"));
			if (menuObj.MapFolder)
				menuObj = this.EnumerateFolder(menuObj);

			for (let [key, val] in Iterator(menuObj)) {
				if (key === "child" || key === "MapFolder" || key === "Sort" || key === "Filter" || key === "Exclude" || key === "Directories" || key === "FilterDirs" || key === "ExcludeDirs") continue;
				if (key === 'onshowing') {
					this.customShowings.push({
						item: menu,
						fnSource: menuObj.onshowing.toSource()
					});
					delete menuObj.onshowing;
					continue;
				}
				if (typeof val == "function")
					menuObj[key] = val = "(" + val.toSource() + ").call(this, event);"
				menu.setAttribute(key, val);
			}

			let cls = menu.classList;
			cls.add("FeiRuoNet_CustomMenu");
			cls.add("menu-iconic");
			if (menuObj.condition)
				this.SetCondition(menu, menuObj.condition);

			menuObj.child.forEach(function(obj) {
				Popup.appendChild(this.BuildMenuitem(obj));
			}, this);

			if (!menu.hasAttribute('label')) {
				let firstItem = menu.querySelector('menuitem');
				if (firstItem) {
					let command = firstItem.getAttribute('command');
					if (command)
						firstItem = document.getElementById(command) || firstItem;
					['label', 'accesskey', 'image', 'icon'].forEach(function(n) {
						if (!menu.hasAttribute(n) && firstItem.hasAttribute(n))
							menu.setAttribute(n, firstItem.getAttribute(n));
					}, this);
					menu.setAttribute('onclick', "\
                    if (event.target != event.currentTarget) return;\
                    var firstItem = event.currentTarget.querySelector('menuitem');\
                    if (!firstItem) return;\
                    if (event.button === 1) {\
                        checkForMiddleClick(firstItem, event);\
                    } else {\
                        firstItem.doCommand();\
                        closeMenus(event.currentTarget);\
                    }\
                ");
				}
			}
			return menu;
		},

		BuildMenuitem: function(obj, opt) {
			opt || (opt = {});
			if (obj.MapFolder)
				return this.BuildMenu(this.EnumerateFolder(obj));

			if (obj.child)
				return this.BuildMenu(obj);
			var menuitem;
			if (obj.label === "separator" || (!obj.label && !obj.image && !obj.text && !obj.keyword && !obj.url && !obj.oncommand && !obj.command))
				menuitem = document.createElement("menuseparator");
			else if (obj.oncommand || obj.command) {
				let org = obj.command ? document.getElementById(obj.command) : null;
				if (org && org.localName === "menuseparator") {
					menuitem = document.createElement("menuseparator");
				} else {
					menuitem = document.createElement("menuitem");
					if (obj.command)
						menuitem.setAttribute("command", obj.command);
					if (!obj.label)
						obj.label = obj.command || obj.oncommand;
				}
			} else {
				menuitem = document.createElement("menuitem");

				if (!obj.label)
					obj.label = obj.exec || obj.keyword || obj.url || obj.text || "NoName" + i;

				if (obj.keyword && !obj.text) {
					let index = obj.keyword.search(/\s+/);
					if (index > 0) {
						obj.text = obj.keyword.substr(index).trim();
						obj.keyword = obj.keyword.substr(0, index);
					}
				}

				if (obj.where && /\b(tab|tabshifted|window|current)\b/i.test(obj.where))
					obj.where = RegExp.$1.toLowerCase();

				if (obj.where && !("acceltext" in obj))
					obj.acceltext = obj.where;

				if (!obj.condition && (obj.url || obj.text)) {
					let condition = "";
					if (this.rSEL.test(obj.url || obj.text)) condition += " select";
					if (this.rLINK.test(obj.url || obj.text)) condition += " link";
					if (this.rEMAIL.test(obj.url || obj.text)) condition += " mailto";
					if (this.rIMAGE.test(obj.url || obj.text)) condition += " image";
					if (this.rMEDIA.test(obj.url || obj.text)) condition += " media";
					if (condition)
						obj.condition = condition;
				}

				if (obj.exec)
					obj.exec = this.handleRelativePath(obj.exec);
			}

			if (opt.isTopMenuitem && obj.onshowing) {
				this.CustomShowings.push({
					item: menuitem,
					fnSource: obj.onshowing.toSource()
				});
				delete obj.onshowing;
			}

			for (let [key, val] in Iterator(obj)) {
				if (key === "command" || key === "MapFolder" || key === "Filter" || key === "Sort" || key === "ExcludeDir") continue;
				if (typeof val == "function")
					obj[key] = val = "(" + val.toSource() + ").call(this, event);";
				menuitem.setAttribute(key, val);
			}
			var cls = menuitem.classList;
			cls.add("FeiRuoNet_CustomMenu");
			cls.add("menuitem-iconic");

			if (obj.condition)
				this.SetCondition(menuitem, obj.condition);

			this.SetMenusIcon(menuitem, obj);

			if (menuitem.localName == "menuseparator")
				return menuitem;

			if (!obj.onclick)
				menuitem.setAttribute("onclick", "checkForMiddleClick(this, event)");

			if (obj.oncommand || obj.command)
				return menuitem;

			menuitem.setAttribute("oncommand", "FeiRuoNet_Menu.onCommand(event);");
			return menuitem;
		},

		EnumerateFolder: function(obj) {
			obj || (obj = {});
			var path = this.handleRelativePath(obj.MapFolder);
			var dir = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
			dir.initWithPath(path);
			if (!dir.exists() || !dir.isDirectory())
				return obj;
			var Entries = dir.directoryEntries;
			var Exclude = obj.Exclude ? ((typeof obj.Exclude == "string") ? (new RegExp(obj.Exclude)) : obj.Exclude) : null;
			var Filter = obj.Filter ? ((typeof obj.Filter == "string") ? (new RegExp(obj.Filter)) : obj.Filter) : null;
			var ExcludeDirs = obj.ExcludeDirs ? ((typeof obj.ExcludeDirs == "string") ? (new RegExp(obj.ExcludeDirs)) : obj.ExcludeDirs) : null;
			var FilterDirs = obj.FilterDirs ? ((typeof obj.FilterDirs == "string") ? (new RegExp(obj.FilterDirs)) : obj.FilterDirs) : null;
			obj.child || (obj.child = []);
			if (obj.child.length > 0 && obj.child[obj.child.length - 1].label != "separator") {
				obj.child.push({
					label: 'separator',
				});
			}
			while (Entries.hasMoreElements()) {
				var Entry = Entries.getNext();
				Entry.QueryInterface(Components.interfaces.nsIFile);
				if (Entry.isDirectory() && (typeof obj.Directories === 'number') && (obj.Directories > 0)) {
					if (ExcludeDirs && ExcludeDirs.test(Entry.leafName)) continue;
					if (FilterDirs && !FilterDirs.test(Entry.leafName)) continue;
					obj.child.push(FeiRuoNet_Menu.EnumerateFolder({
						label: Entry.leafName,
						MapFolder: Entry.path,
						exec: Entry.path,
						Directories: obj.Directories - 1,
						Filter: obj.Filter,
						Exclude: obj.Exclude,
						FilterDirs: obj.FilterDirs,
						ExcludeDirs: obj.ExcludeDirs,
						onclick: "FeiRuoNet_Menu.onCommand(event);",
						Sort: 0,
						image: "moz-icon://" + Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(Entry) + "?size=16",
					}))
					continue;
				}
				if (!Entry.isFile()) continue;
				if (Exclude && Exclude.test(Entry.leafName)) continue;
				if (Filter && !Filter.test(Entry.leafName)) continue;
				obj.child.push({
					label: Entry.leafName.substr(0, Entry.leafName.lastIndexOf(".")),
					exec: Entry.path,
					tooltiptext: Entry.path,
					Sort: 1,
				});
			}
			obj.MapFolder = false;
			obj.child.sort(function(a, b) {
				return a.Sort - b.Sort;
			});
			return obj;
		},

		SetCondition: function(menu, condition) {
			if (/\bnormal\b/i.test(condition)) {
				menu.setAttribute("condition", "normal");
			} else {
				let match = condition.toLowerCase().match(/\b(?:no)?(?:select|link|mailto|image|canvas|media|input)\b/ig);
				if (!match || !match[0])
					return;
				match = match.filter(function(c, i, a) a.indexOf(c) === i);
				menu.setAttribute("condition", match.join(" "));
			}
		},

		SetMenusIcon: function(menu, obj) {
			if (menu.hasAttribute("src") || menu.hasAttribute("image") || menu.hasAttribute("icon"))
				return;

			if (obj.exec) {
				var aFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
				try {
					aFile.initWithPath(obj.exec);
				} catch (e) {
					return;
				}
				if (!aFile.exists()) {
					menu.setAttribute("disabled", "true");
				} else {
					let fileURL = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(aFile);
					menu.setAttribute("image", "moz-icon://" + fileURL + "?size=16");
				}
				return;
			}

			if (obj.keyword) {
				let engine = Services.search.getEngineByAlias(obj.keyword);
				if (engine && engine.iconURI) {
					menu.setAttribute("image", engine.iconURI.spec);
					return;
				}
			}
			var setIconCallback = function(url) {
				let uri, iconURI;
				try {
					uri = Services.io.newURI(url, null, null);
				} catch (e) {}
				if (!uri) return;

				menu.setAttribute("scheme", uri.scheme);
				PlacesUtils.favicons.getFaviconDataForPage(uri, {
					onComplete: function(aURI, aDataLen, aData, aMimeType) {
						try {
							menu.setAttribute("image", aURI && aURI.spec ?
								"moz-anno:favicon:" + aURI.spec :
								"moz-anno:favicon:" + uri.scheme + "://" + uri.host + "/favicon.ico");
						} catch (e) {}
					}
				});
			}
			PlacesUtils.keywords.fetch(obj.keyword || '').then(entry => {
				let url;
				if (entry) {
					url = entry.url.href;
				} else {
					url = (obj.url + '').replace(this.regexp, "");
				}
				setIconCallback(url);
			}, e => {
				log(e)
			}).catch(e => {});
		},

		onCommand: function(event) {
			if (event.target != event.currentTarget) return;
			var menuitem = event.target;
			var text = menuitem.getAttribute("text") || "";
			var keyword = menuitem.getAttribute("keyword") || "";
			var url = menuitem.getAttribute("url") || "";
			var where = menuitem.getAttribute("where") || "";
			var exec = menuitem.getAttribute("exec") || "";
			var Post = menuitem.getAttribute("Post") || "";
			var Action = menuitem.getAttribute("Action") || "";

			if (Post)
				return this.PostData(this.ConvertText(url), this.ConvertText(Post));

			if (keyword) {
				let param = (text ? (text = this.ConvertText(text)) : "");
				let engine = Services.search.getEngineByAlias(keyword);
				if (engine) {
					let submission = engine.getSubmission(param);
					this.OpenCommand(event, submission.uri.spec, where);
				} else {
					PlacesUtils.keywords.fetch(keyword || '').then(entry => {
						if (!entry) return;
						let newurl = entry.url.href.replace('%s', encodeURIComponent(param));
						this.OpenCommand(event, newurl, where);
					});
				}
			} else if (url)
				this.OpenCommand(event, this.ConvertText(url), where || "tab");
			else if (exec)
				this.Exec(exec, this.ConvertText(text));
			else if (text)
				FeiRuoNet.Copy(this.ConvertText(text));
			else if (Action)
				this.OpenAction(Action);
		},

		OpenCommand: function(event, url, where, postData) {
			var uri;
			try {
				uri = Services.io.newURI(url, null, null);
			} catch (e) {
				return log(U("URL 不正确: ") + url);
			}
			if (uri.scheme === "javascript")
				loadURI(url);
			else if (where)
				openUILinkIn(uri.spec, where, false, postData || null);
			else if (event.button == 1)
				openNewTabWith(uri.spec);
			else
				openUILink(uri.spec, event);
		},

		Exec: function(path, arg) {
			var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
			var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
			try {
				var a, arg = arg || "";
				if (typeof arg == 'string' || arg instanceof String) {
					a = arg.split(/\s+/)
				} else if (Array.isArray(arg)) {
					a = arg;
				} else {
					a = [arg];
				}

				file.initWithPath(path);
				if (!file.exists()) {
					Cu.reportError('File Not Found: ' + path);
					return;
				}

				if (file.isExecutable()) {
					process.init(file);
					process.runw(false, a, a.length);
				} else {
					file.launch();
				}
			} catch (e) {
				log(e);
			}
		},

		ConvertText: function(text) {
			var that = this;
			var context = gContextMenu || {
				link: {
					href: "",
					host: ""
				},
				target: {
					alt: "",
					title: ""
				},
				__noSuchMethod__: function(id, args)
				"",
			};
			var tab = document.popupNode && document.popupNode.localName == "tab" ? document.popupNode : null;
			var win = tab ? tab.linkedBrowser.contentWindow : this.FocusedWindow;

			return text.replace(this.regexp, function(str) {
				str = str.toUpperCase().replace("%LINK", "%RLINK");
				if (str.indexOf("_HTMLIFIED") >= 0)
					return htmlEscape(convert(str.replace("_HTMLIFIED", "")));
				if (str.indexOf("_HTML") >= 0)
					return htmlEscape(convert(str.replace("_HTML", "")));
				if (str.indexOf("_ENCODE") >= 0)
					return encodeURIComponent(convert(str.replace("_ENCODE", "")));
				return convert(str);
			});

			function convert(str) {
				switch (str) {
					case "%T":
						return win.document.title;
					case "%TITLE%":
						return win.document.title;
					case "%TITLES%":
						return win.document.title.replace(/\s-\s.*/i, "").replace(/_[^\[\]【】]+$/, "");
					case "%U":
						return win.location.href;
					case "%URL%":
						return win.location.href;
					case "%H":
						return win.location.host;
					case "%HOST%":
						return win.location.host;
					case "%S":
						return that.getSelection(win) || "";
					case "%SEL%":
						return that.getSelection(win) || "";
					case "%L":
						return context.linkURL || "";
					case "%RLINK%":
						return context.linkURL || "";
					case "%RLINK_HOST%":
						return context.link.host || "";
					case "%RLINK_TEXT%":
						return context.linkText() || "";
					case "%RLINK_OR_URL%":
						return context.linkURL || win.location.href;
					case "%RLT_OR_UT%":
						return context.onLink && context.linkText() || win.document.title; // 链接文本或网页标题
					case "%IMAGE_ALT%":
						return context.target.alt || "";
					case "%IMAGE_TITLE%":
						return context.target.title || "";
					case "%I":
						return context.imageURL || "";
					case "%IMAGE_URL%":
						return context.imageURL || "";
					case "%IMAGE_BASE64%":
						return img2base64(context.imageURL);
					case "%M":
						return context.mediaURL || "";
					case "%MEDIA_URL%":
						return context.mediaURL || "";
					case "%P":
						return readFromClipboard() || "";
					case "%CLIPBOARD%":
						return readFromClipboard() || "";
					case "%FAVICON%":
						return gBrowser.getIcon(tab ? tab : null) || "";
					case "%FAVICON_BASE64%":
						return img2base64(gBrowser.getIcon(tab ? tab : null));
					case "%EMAIL%":
						return getEmailAddress() || "";
					case "%IP%":
						return FeiRuoNet_Flag.QueryHash[FeiRuoNet.CurrentURI.host].IP;
					case "%BASEDOMAIN%":
						var eTLDService = Cc["@mozilla.org/network/effective-tld-service;1"].getService(Ci.nsIEffectiveTLDService);
						return eTLDService.getBaseDomain(makeURI(FeiRuoNet.CurrentURI.spec));
					case "%EOL%":
						return "\r\n";
					case "%EOL%":
						return "\r\n";
				}
				return str;
			}

			function htmlEscape(s) {
				return (s + "").replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;");
			};

			function getEmailAddress() {
				var url = context.linkURL;
				if (!url || !/^mailto:([^?]+).*/i.test(url)) return "";
				var addresses = RegExp.$1;
				try {
					var characterSet = context.target.ownerDocument.characterSet;
					const textToSubURI = Cc['@mozilla.org/intl/texttosuburi;1'].getService(Ci.nsITextToSubURI);
					addresses = textToSubURI.unEscapeURIForUI(characterSet, addresses);
				} catch (ex) {}
				return addresses;
			}

			function img2base64(imgsrc) {
				if (typeof imgsrc == 'undefined') return "";

				const NSURI = "http://www.w3.org/1999/xhtml";
				var img = new Image();
				var that = this;
				var canvas,
					isCompleted = false;
				img.onload = function() {
					var width = this.naturalWidth,
						height = this.naturalHeight;
					canvas = document.createElementNS(NSURI, "canvas");
					canvas.width = width;
					canvas.height = height;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(this, 0, 0);
					isCompleted = true;
				};
				img.onerror = function() {
					Components.utils.reportError("Count not load: " + imgsrc);
					isCompleted = true;
				};
				img.src = imgsrc;

				var thread = Cc['@mozilla.org/thread-manager;1'].getService().mainThread;
				while (!isCompleted) {
					thread.processNextEvent(true);
				}

				var data = canvas ? canvas.toDataURL("image/png") : "";
				canvas = null;
				return data;
			}
		},

		handleRelativePath: function(path) {
			if (path) {
				//path = path.replace(/\//g, '\\').toLocaleLowerCase();
				path = path.replace(/\//g, '\\');
				var profD = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties).get("ProfD", Ci.nsILocalFile);
				if (/^(\\)/.test(path)) {
					if (path.startsWith('\\..\\')) {
						return profD.parent.path + path.replace('\\..', '');
					}
					return profD.path + path;
				} else {
					return path;
				}
			}
		},

		PostData: function(aURI, aPostData) {
			var stringStream = Cc["@mozilla.org/io/string-input-stream;1"].createInstance(Ci.nsIStringInputStream);
			if ("data" in stringStream)
				stringStream.data = aPostData;
			else
				stringStream.setData(aPostData, aPostData.length);

			var PostData = Cc["@mozilla.org/network/mime-input-stream;1"].createInstance(Ci.nsIMIMEInputStream);
			PostData.addHeader("Content-Type", "application/x-www-form-urlencoded");
			PostData.addContentLength = true;
			PostData.setData(stringStream);

			gBrowser.loadOneTab(aURI, null, null, PostData, false);
		},

		OpenAction: function(url, fId, val, bId, bClass) {
			var wrap = {
				try: function(js) {
					return "try{" + js + "}catch(e){}";
				},
				delay: function(js) {
					return wrap.try("content.window.setTimeout(function(){" + wrap.try(js) + "},100);");
				},
				doOnLoad: function(js) {
					return wrap.try("let onLoad = function(){" +
						"removeEventListener('load',onLoad,true);" +
						wrap.try(js) +
						"};" +
						"addEventListener('load',onLoad,true);");
				},
				quotes: function(str) {
					return "\"" + str + "\"";
				},
				getElement: function(id) {
					const selector = "form #" + id;
					return "content.window.document.querySelector(" + wrap.quotes(selector) + ")";
				},
				getElementC: function(id) {
					const selector = "form ." + id;
					return "content.window.document.querySelector(" + wrap.quotes(selector) + ")";
				}
			};

			function openURL(url) {
				var browser = window.getBrowser();
				try {
					window.TreeStyleTabService.readyToOpenChildTab(browser.selectedTab);
				} catch (e) {}
				var newTab = browser.addTab(url, {
					ownerTab: browser.selectedTab,
					relatedToCurrent: true
				});
				browser.selectedTab = newTab;
				return browser.getBrowserForTab(newTab);
			}

			var contentScript = wrap.getElement(fId) + ".value = " + wrap.quotes(this.ConvertText(val)) + ";";
			if (bId)
				contentScript += wrap.delay(wrap.getElement(bId) + ".click();")
			else if (bClass)
				contentScript += wrap.delay(wrap.getElementC(bClass) + ".click();")
			contentScript = "data:text/javascript," + encodeURIComponent(wrap.doOnLoad(contentScript));

			var targetBrowser = openURL(url);
			targetBrowser.messageManager.loadFrameScript(contentScript, false);
		},

		getSelection: function(win) {
			win || (win = this.FocusedWindow);
			var selection = this.GetRangeAll(win).join(" ");
			if (!selection) {
				let element = document.commandDispatcher.focusedElement;
				let isOnTextInput = function(elem) {
					return elem instanceof HTMLTextAreaElement ||
						(elem instanceof HTMLInputElement && elem.mozIsTextField(true));
				};

				if (isOnTextInput(element)) {
					selection = element.QueryInterface(Ci.nsIDOMNSEditableElement)
						.editor.selection.toString();
				}
			}

			if (selection) {
				selection = selection.replace(/^\s+/, "")
					.replace(/\s+$/, "")
					.replace(/\s+/g, " ");
			}
			return selection;
		},

		GetRangeAll: function(win) {
			win || (win = this.FocusedWindow);
			var sel = win.getSelection();
			var res = [];
			for (var i = 0; i < sel.rangeCount; i++) {
				res.push(sel.getRangeAt(i));
			};
			return res;
		},
	};

	window.FeiRuoNet_Proxy = {};

	window.FeiRuoNet_IPDate = {
		Initialization: function() {
			this.uninit();
			this.init();
		},

		uninit: function() {
			if (this.LocalFlag) delete this.LocalFlag;
			if (this.QQwryDate) delete this.QQwryDate;
			if (this.CountryName) delete this.CountryName;
			if (this.CountryFlag) delete this.CountryFlag;
			if (this.QQwryGBKCode) delete this.QQwryGBKCode;
			if (this.IPDBmetadata) delete this.IPDBmetadata;
			if (this.IPv4DB) delete this.IPv4DB;
			if (this.IPv6DB) delete this.IPv6DB;
		},

		init: function() {
			this.LocalFlag = Services.io.newFileURI(FileUtils.getDir("UChrm", ["Local", "FeiRuoNet", 'LocalFlags'])).spec;

			var QQWryDat = FileUtils.getFile("UChrm", ["Local", "FeiRuoNet", 'QQWry.dat']);
			if (QQWryDat && QQWryDat.exists() && QQWryDat.isFile()) {
				FeiRuoNet_Flag.Loading_QQWryDat = true;

				function readAsArrayBuffer(file, callback) {
					var reader = new FileReader();
					reader.readAsArrayBuffer(file);
					reader.onload = function(f) {
						callback(reader.result);
					}
				}
				var QQWryDatFile = new File(QQWryDat);
				readAsArrayBuffer(QQWryDatFile, function(data) {
					var ipFileBufferD, Uint8A, ipBegin, ipEnd;
					ipFileBufferD = new DataView(data);
					Uint8A = new Uint8Array(data);
					ipBegin = ipFileBufferD.getUint32(0, true);
					ipEnd = ipFileBufferD.getUint32(4, true);
					FeiRuoNet_IPDate.QQwryDate = {
						"ipFileBufferD": ipFileBufferD,
						"Uint8A": Uint8A,
						"ipBegin": ipBegin,
						"ipEnd": ipEnd
					};
					FeiRuoNet_Flag.Loading_QQWryDat = false;
				});
			}
			var LibData = FeiRuoNet.LoadFile(FileUtils.getFile("UChrm", ["Local", "FeiRuoNet", 'FeiRuoNetLib.js']));
			this.CountryName = LibData.CountryName || {};
			this.CountryFlag = LibData.CountryFlag || {};
			this.QQwryGBKCode = LibData.QQwryGBKCode || {};
			this.IPDBmetadata = LibData.IPDBmetadata || {};
			if (!this.IPDBmetadata) return;
			this.IPDBmetadata.countryIDs = this.IPDBmetadata.countryIDs.match(new RegExp(".{1," + 2 + "}", "g"));
			var DbDir = Services.io.newFileURI(FileUtils.getDir("UChrm", ["Local", "FeiRuoNet"])).spec;
			this.IPv4DB = {
				type: "IPv4",
				filename: "ip4.cdb",
				bytesPerInt: 4
			};
			FeiRuoNet.XRequest({
				url: DbDir + this.IPv4DB.filename,
				responseType: "arraybuffer",
			}).then(request => {
				if (request.status === 200)
					this.loadCompressedIPDBdata(this.IPv4DB, request.response);
			}, error => {
				log(error)
			});
			this.IPv6DB = {
				type: "IPv6",
				filename: "ip6.cdb",
				bytesPerInt: 6
			};
			FeiRuoNet.XRequest({
				url: DbDir + this.IPv6DB.filename,
				responseType: "arraybuffer",
			}).then(request => {
				if (request.status === 200)
					this.loadCompressedIPDBdata(this.IPv6DB, request.response);
			}, error => {
				log(error)
			});
		},

		/*****************************************************************************************/
		LookupIPCDB: function(ipString) {
			try {
				if (!ipString)
					return null;
				if (ipString.indexOf(":") == -1)
					return this.SearchDB(this.IPv4DB, this.IpToInt(ipString));
				if (ipString == "::1")
					return "-L";
				if (ipString.indexOf(".") != -1)
					return this.SearchDB(this.IPv4DB, this.IpToInt(ipString.substr(ipString.lastIndexOf(":") + 1)));

				function expandIPv6String(ipString) {
					var blocks = ipString.toLowerCase().split(":");
					for (let i = 0; i < blocks.length; i++) {
						if (blocks[i].length == 0) {
							blocks[i] = "0000";
							while (blocks.length < 8)
								blocks.splice(i, 0, "0000");
						} else
							while (blocks[i].length < 4)
								blocks[i] = "0" + blocks[i];
					}
					var expanded = blocks.join("");
					if (blocks.length != 8 || expanded.length != 32)
						throw "Attempted to parse invalid IPv6 address string!";
					return expanded;
				}

				var longIPv6String = expandIPv6String(ipString);

				function hexStringToInteger(string) {
					return parseInt(string, 16);
				}
				const IPv4inIPv6rules = [{
					prefix: "00000000000000000000",
					extractIPv4Integer: function(ipString) {
						var block6 = ipString.substr(20, 4);
						if (block6 == "ffff" || block6 == "0000")
							return hexStringToInteger(ipString.substr(24, 8));
						return null;
					}
				}, {
					prefix: "2002",
					extractIPv4Integer: function(ipString) {
						return hexStringToInteger(ipString.substr(4, 8));
					}
				}, {
					prefix: "20010000",
					extractIPv4Integer: function(ipString) {
						return ~hexStringToInteger(ipString.substr(24, 8));
					}
				}];
				for (let rule of IPv4inIPv6rules)
					if (longIPv6String.startsWith(rule.prefix))
						return this.SearchDB(this.IPv4DB, rule.extractIPv4Integer(longIPv6String));
				this.IsIPV6 = true;
				return this.SearchDB(this.IPv6DB, hexStringToInteger(longIPv6String.substr(0, 12)));
			} catch (e) {
				return null;
			}
		},

		SearchDB: function(db, int) {
			if (!Number.isInteger(int) || int < 0)
				return null;

			function CountryCode8toString(code8) {
				return code8 ? FeiRuoNet_IPDate.IPDBmetadata.countryIDs[code8] : null;
			}

			var min = 0;
			var max = db.entryCount - 1;
			var mid;
			while (min <= max) {
				mid = Math.floor((min + max) / 2);
				if (int < db.rangeIPs[mid])
					max = mid - 1;
				else if (int >= db.rangeIPs[mid + 1])
					min = mid + 1;
				else
					return CountryCode8toString(db.rangeCodes[mid]);
			}
			return null;
		},

		loadCompressedIPDBdata: function(db, data) {
			var pos = 0;

			function newFastDataView(length, intbytes) {
				var size = (intbytes > 1) ? length * intbytes : length;
				var view = new FastDataViewUBE(data, pos, size, intbytes);
				pos += size;
				return view;
			}

			var header = newFastDataView(6);
			var entries = header.getUint32(0);
			var rangewidthsdictlength = header.getUint16(4);
			var rangewidthsdict = newFastDataView(rangewidthsdictlength, db.bytesPerInt);
			var rangewidthIDs = newFastDataView(entries, 2);
			var codeIDs = newFastDataView(entries, 1);
			if (pos != data.byteLength)
				throw "file read error (got " + data.byteLength + " bytes from file but data is " + pos + " bytes)";

			var rangeIPs = new(db.bytesPerInt == 4 ? Uint32Array : Float64Array)(entries);

			var rangeCodes = new Uint8Array(codeIDs.bytes);


			(function() {
				var lastIP = 0;
				for (let i = 0; i < entries; i++)
					rangeIPs[i] = (lastIP += rangewidthsdict.get(rangewidthIDs.get(i)));
			})();
			db.entryCount = entries;
			db.rangeIPs = rangeIPs;
			db.rangeCodes = rangeCodes;
		},

		/*****************************************************************************************/
		SearchIP: function(IP, isAlert) {
			if (this.IsIPV6) return;
			//uninfo && getuninfo();
			var ip = this.IpToInt(IP),
				g = this.LocateIP(ip),
				loc = {};
			if (!ip) return ("IP地址不正确 >> " + IP);

			if (g == -1)
				return this.Unknown;

			var add = this.setIPLocation(g);
			loc.ip = this.IntToIP(ip);
			if (!loc.ip) return ("IP地址不正确 >> " + INT);
			loc.Country = add.Country;
			loc.Area = add.Area;
			return (loc.Country + '\n' + loc.Area).replace(/ +CZ88.NET ?/g, "");
		},

		IpToInt: function(IP) {
			var result = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.exec(IP),
				ip;
			if (result) {
				var ip_Arr = result.slice(1);
				ip = (parseInt(ip_Arr[0]) << 24 | parseInt(ip_Arr[1]) << 16 | parseInt(ip_Arr[2]) << 8 | parseInt(ip_Arr[3])) >>> 0;
			} else if (/^\d+$/.test(IP) && (ip = parseInt(IP)) >= 0 && ip <= 0xFFFFFFFF) {
				ip = +IP
			} else {
				return;
			}
			return ip;
		},

		IntToIP: function(INT) {
			if (INT < 0 || INT > 0xFFFFFFFF) {
				return;
			};
			return (INT >>> 24) + "." + (INT >>> 16 & 0xFF) + "." + (INT >>> 8 & 0xFF) + "." + (INT >>> 0 & 0xFF);
		},

		LocateIP: function(ip) {
			var g, temp;

			function GetMiddleOffset(begin, end, recordLength) {
				var records = ((end - begin) / recordLength >> 1) * recordLength + begin;
				return records ^ begin ? records : records + recordLength;
			}

			for (var b = FeiRuoNet_IPDate.QQwryDate.ipBegin, e = FeiRuoNet_IPDate.QQwryDate.ipEnd; b < e;) {
				g = GetMiddleOffset(b, e, 7);
				temp = FeiRuoNet_IPDate.QQwryDate.ipFileBufferD.getUint32(g, true);
				if (ip > temp) {
					b = g;
				} else if (ip < temp) {
					if (g == e) {
						g -= 7;
						break;
					}
					e = g;
				} else {
					break;
				}
			}
			return g;
		},

		setBuffer3: function(n) {
			var i = n || 0,
				arr = [];
			var NewAB = new ArrayBuffer(4);
			var NewABU8 = new Uint8Array(NewAB);
			for (var k = 0; k < 3; k++) {
				arr.push(FeiRuoNet_IPDate.QQwryDate.Uint8A[i + k] || 0);
			}
			arr[3] = 0;
			NewABU8[0] = arr[3];
			NewABU8[1] = arr[2];
			NewABU8[2] = arr[1];
			NewABU8[3] = arr[0];
			var NewABU8D = new DataView(NewABU8.buffer);
			return NewABU8D.getUint32(0);
		},

		setIPLocation: function(g) {
			var ipwz = this.setBuffer3(g + 4) + 4;
			var lx = FeiRuoNet_IPDate.QQwryDate.ipFileBufferD.getUint8(ipwz),
				loc = {};
			if (lx == 1) {
				ipwz = this.setBuffer3(ipwz + 1);
				lx = FeiRuoNet_IPDate.QQwryDate.ipFileBufferD.getUint8(ipwz);
				var Gjbut;
				if (lx == 2) {
					Gjbut = this.setIpFileString(this.setBuffer3(ipwz + 1));
					loc.Country = this.QQwryToGBK(Gjbut);
					ipwz = ipwz + 4;
				} else {
					Gjbut = this.setIpFileString(ipwz)
					loc.Country = this.QQwryToGBK(Gjbut);
					ipwz += Gjbut.length + 1;
				}
				loc.Area = this.ReadArea(ipwz);
			} else if (lx == 2) {
				var Gjbut = this.setIpFileString(this.setBuffer3(ipwz + 1));
				loc.Country = this.QQwryToGBK(Gjbut);
				loc.Area = this.ReadArea(ipwz + 4);
			} else {
				var Gjbut = this.setIpFileString(ipwz);
				ipwz += Gjbut.length + 1;
				loc.Country = this.QQwryToGBK(Gjbut);
				loc.Area = this.ReadArea(ipwz);
			}
			return loc;
		},

		setIpFileString: function(Begin) {
			var B = Begin || 0,
				toarr = [],
				M = FeiRuoNet_IPDate.QQwryDate.Uint8A.length;
			B = B < 0 ? 0 : B;
			for (var i = B; i < M; i++) {
				if (FeiRuoNet_IPDate.QQwryDate.Uint8A[i] == 0) {
					return toarr;
				}
				toarr.push(FeiRuoNet_IPDate.QQwryDate.Uint8A[i]);
			}
			return toarr;
		},

		ReadArea: function(offset) {
			var one = FeiRuoNet_IPDate.QQwryDate.ipFileBufferD.getUint8(offset);
			if (one == 1 || one == 2) {
				var areaOffset = this.setBuffer3(offset + 1);
				if (areaOffset == 0)
					return this.Unknown;
				else {
					return this.QQwryToGBK(this.setIpFileString(areaOffset));
				}
			} else {
				return this.QQwryToGBK(this.setIpFileString(offset));
			}
		},

		QQwryToGBK: function(arr) {
			var kb = '',
				str = "";
			for (var n = 0, max = arr.length; n < max; n++) {
				var Code = arr[n];
				if (Code & 0x80) {
					str += String.fromCharCode(this.QQwryGBKCode[Code << 8 | arr[++n]]);
				} else {
					str += String.fromCharCode(Code);
				}
			}
			return str;
		},
	};

	FeiRuoNet.OptionScript = {
		init: function() {
			// this.ProxyRows = _$("ProxyRows");
			// this.BuildProxyTree();
			this.BuildInfoApiPopup();

			// _$("DefaultProxy1").selectedIndex = FeiRuoNet.DefaultProxy;
			_$("ApiIdx1").selectedIndex = FeiRuoNet.ApiIdx;
			this.AddCSS();
			var QQwrtVer = FeiRuoNet_IPDate.SearchIP('255.255.255.255');
			if (QQwrtVer) {
				_$("QQwrtVer").value = "纯真数据库版本：" + QQwrtVer.replace(/纯真网络|\n|IP|数据/ig, "");
				FeiRuoNet.GetWindow(0).sizeToContent();
			} else {
				_$("QQwrtVer").value = "无【QQWry.dat】本地纯真数据库！";
				FeiRuoNet.GetWindow(0).sizeToContent();
			}

			this.ChangeStatus();
			setTimeout(function() {
				FeiRuoNet.GetWindow(0).sizeToContent();
			}, 500);
		},

		BuildProxyTree: function() {
			// let row = this.ProxyRows.firstChild.nextSibling;
			// while (row) {
			// 	let temp = row;
			// 	row = row.nextSibling;
			// 	this.ProxyRows.removeChild(temp);
			// 	FeiRuoNet.GetWindow(0).sizeToContent();
			// }
			// FeiRuoNet.LoadSetting("ProxyServers");
			// for (var i = 0; i < FeiRuoNet.ProxyServers.length; i++)
			// 	this.CreateBlankRow(FeiRuoNet.ProxyServers[i], i);

			// for (i in FeiRuoNet.ProxyServers)
			// 	_$("DefaultProxy1").appendItem(FeiRuoNet.ProxyServers[i].name, i);
		},

		BuildInfoApiPopup: function() {
			for (var i in FeiRuoNet.Interfaces)
				if (!FeiRuoNet.Interfaces[i].isJustFlag) _$("ApiIdx1").appendItem(FeiRuoNet.Interfaces[i].label, i);
		},

		Resets: function() {
			// this.BuildProxyTree();
			this.BuildInfoApiPopup();
			// _$("warning").hidden = _$("note").hidden = _$("tip").hidden = true;

			_$("BAK_FLAG_PATH").value = FeiRuoNet.DBAK_FLAG_PATH;
			_$("CustomQueue").value = 0;
			// _$("DefaultProxy1").selectedIndex = 0;
			_$("Icon_Pos").value = 0;
			_$("ApiIdx1").selectedIndex = 0;
			_$("Inquiry_Delay").value = 1000;
			// _$("ProxyMode").value = 0;
			// _$("ProxyPath").value = "";
			// _$("ProxyTimer").value = 3500;
			_$("RefChanger").value = false;
			_$("ModifyHeader").value = false;
			_$("UrlbarSafetyLevel").value = false;
			_$("UAChangerState").value = false;
			this.ChangeStatus();
		},

		Save: function() {
			FeiRuoNet.Prefs.setCharPref("BAK_FLAG_PATH", _$("BAK_FLAG_PATH").value);
			// FeiRuoNet.Prefs.setCharPref("ProxyPath", _$("ProxyPath").value);
			FeiRuoNet.Prefs.setIntPref("CustomQueue", _$("CustomQueue").value);
			// FeiRuoNet.Prefs.setIntPref("DefaultProxy", _$("DefaultProxy1").value);
			FeiRuoNet.Prefs.setIntPref("Icon_Pos", _$("Icon_Pos").value);
			FeiRuoNet.Prefs.setIntPref("ApiIdx", _$("ApiIdx1").value);
			FeiRuoNet.Prefs.setIntPref("Inquiry_Delay", _$("Inquiry_Delay").value);
			// FeiRuoNet.Prefs.setIntPref("ProxyMode", _$("ProxyMode").value);
			// FeiRuoNet.Prefs.setIntPref("ProxyTimer", _$("ProxyTimer").value);
			FeiRuoNet.Prefs.setBoolPref("ModifyHeader", _$("ModifyHeader").value);
			FeiRuoNet.Prefs.setBoolPref("UrlbarSafetyLevel", _$("UrlbarSafetyLevel").value);
			FeiRuoNet.Prefs.setBoolPref("RefChanger", _$("RefChanger").value);
			FeiRuoNet.Prefs.setBoolPref("UAChangerState", _$("UAChangerState").value);
			this.TreeSave();
		},

		TreeSave: function() {
			// var ProxySrvers = new Array();
			// for (let row = this.ProxyRows.firstChild.nextSibling; row; row = row.nextSibling) {
			// 	var temp = {
			// 		name: "",
			// 		host: "127.0.0.1",
			// 		port: "",
			// 		type: "http",
			// 		remoteDNS: 0
			// 	};
			// 	var pDs = row.firstChild;
			// 	for (var i = 0; i <= 2; i++) {
			// 		if (i == 0) {
			// 			if (pDs.value == "") {
			// 				pDs.value = "Unnamed";
			// 			}
			// 			temp.name = pDs.value;
			// 		}
			// 		if (i == 1) {
			// 			if (pDs.value == "") {
			// 				pDs.value = "127.0.0.1";
			// 			}
			// 			temp.host = pDs.value;
			// 		}
			// 		if (i == 2) {
			// 			temp.port = pDs.value;
			// 		}
			// 		pDs = pDs.nextSibling;
			// 	}

			// 	pDst = pDs.firstChild;
			// 	if (pDst.selected) {
			// 		temp.type = "http";
			// 	} else if (pDst.nextSibling.selected) {
			// 		temp.type = "https";
			// 	} else if (pDst.nextSibling.nextSibling.selected) {
			// 		temp.type = "socks4";
			// 	} else {
			// 		temp.type = "socks";
			// 	}

			// 	pDs = pDs.nextSibling;
			// 	if (pDs.checked) {
			// 		temp.remoteDNS = 1;
			// 	}
			// 	var ProxySrver = [];
			// 	ProxySrver.push(temp.name);
			// 	ProxySrver.push(temp.host);
			// 	ProxySrver.push(temp.port);
			// 	ProxySrver.push(temp.type);
			// 	ProxySrver.push(temp.remoteDNS);
			// 	ProxySrvers.push(ProxySrver.join('|'));
			// }
			// FeiRuoNet.Prefs.setCharPref('ProxyServers', escape(ProxySrvers.join(';')));
		},

		AddNewRow: function() {
			this.CreateBlankRow();
			_$("warning").hidden = _$("note").hidden = _$("tip").hidden = true;
			FeiRuoNet.GetWindow(0).sizeToContent();
		},

		DelSelectedRow: function() {
			this.Show("warning");
			let row = this.ProxyRows.firstChild.nextSibling;
			while (row) {
				var temp = row;
				row = row.nextSibling;
				if (temp.lastChild.checked) {
					this.ProxyRows.removeChild(temp);
					FeiRuoNet.GetWindow(0).sizeToContent();
				} else this.Hide("warning");
			}

			if (!_$("warning").hidden)
				this.Hide("note");
			if (_$("warning").hidden && _$("note").hidden)
				this.Hide("tip");
			else this.Show("tip");
		},

		CreateBlankRow: function(proxy, i) {
			var proxyRow = _$C("row");
			var proxyName = _$C("textbox");
			var proxyHost = _$C("textbox");
			var proxyPort = _$C("textbox");
			var proxyType = _$C("radiogroup");
			var proxyRemote = _$C("checkbox");
			var proxyDele = _$C("checkbox");
			proxyName.setAttribute("class", "proxyName");
			proxyHost.setAttribute("class", "proxyHost");
			proxyPort.setAttribute("class", "proxyPort");
			proxyRemote.setAttribute("class", "remoteBox");
			proxyDele.setAttribute("class", "deleBox");
			proxyType.setAttribute("orient", "horizontal");

			var http = _$C("radio"),
				https = _$C("radio"),
				socks = _$C("radio"),
				socks4 = _$C("radio");
			http.setAttribute("class", "proxyHttp");
			https.setAttribute("class", "proxyHttps");
			socks.setAttribute("class", "proxySocks5");
			socks4.setAttribute("class", "proxySocks4");

			http.setAttribute("selected", proxy && proxy.type == "http");
			https.setAttribute("selected", proxy && proxy.type == "https");
			socks.setAttribute("selected", proxy && proxy.type == "socks");
			socks4.setAttribute("selected", proxy && proxy.type == "socks4");

			if (proxy) {
				proxyName.setAttribute("value", proxy.name);
				proxyHost.setAttribute("value", proxy.host);
				proxyPort.setAttribute("value", proxy.port);
				proxyRemote.setAttribute("checked", proxy && proxy.remoteDNS == 1);
			}

			proxyType.appendChild(http);
			proxyType.appendChild(https);
			proxyType.appendChild(socks4);
			proxyType.appendChild(socks);
			proxyRow.appendChild(proxyName);
			proxyRow.appendChild(proxyHost);
			proxyRow.appendChild(proxyPort);
			proxyRow.appendChild(proxyType);
			proxyRow.appendChild(proxyRemote);
			proxyRow.appendChild(proxyDele);
			proxyRow.id = "ProxyRow_" + i;
			this.ProxyRows.appendChild(proxyRow);
		},

		Show: function(id) {
			if (_$(id).hidden) {
				_$(id).hidden = false;
				FeiRuoNet.GetWindow(0).sizeToContent();
			}
		},

		Hide: function(id) {
			if (!_$(id).hidden) {
				_$(id).hidden = true;
				FeiRuoNet.GetWindow(0).sizeToContent();
			}
		},

		ChouseFile: function() {
			var nsIFilePicker = Components.interfaces.nsIFilePicker;
			var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
			fp.init(window, "选择代理软件", nsIFilePicker.modeOpen);
			fp.appendFilters(nsIFilePicker.filterApps);

			var rv = fp.show();
			if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
				var path = fp.file.path;
				_$('ProxyPath').value = decodeURIComponent(path);
			}
			FeiRuoNet.GetWindow(0).focus();
		},

		AddCSS: function() {
			// var css = ('\
			// menuseparator{margin-top:10px;}\
			// textbox.proxyName{width:100px;}\
			// .proxyHost{width:100px;}\
			// .proxyPort{width:50px;}\
			// #note,#warning{color:red;}\
			// #tip{color:green;}\
			// #tip,#note,#warning{font-weight:bold;margin-top:20px;}\
			// '.replace(/\n|\t/g, ''));
			// var pi = FeiRuoNet.GetWindow(0).document.createProcessingInstruction(
			// 	'xml-stylesheet',
			// 	'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
			// );
			// FeiRuoNet.GetWindow(0).document.insertBefore(pi, FeiRuoNet.GetWindow(0).document.documentElement);
		},

		ChangeStatus: function(event) {
			var aDisable = !FeiRuoNet.ConfFile;
			_$("RefChanger").disabled = aDisable;
			_$("UAChangerState").disabled = aDisable;
			_$("ApiIdx").disabled = aDisable;

			FeiRuoNet.GetWindow(0).sizeToContent();
		},
	};

	FeiRuoNet.OptionWin = function() {
		var xul = '<?xml version="1.0"?><?xml-stylesheet href="chrome://global/skin/" type="text/css"?>\
					<prefwindow xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"\
					id="FeiRuoNet_Settings"\
					ignorekeys="true"\
					title="FeiRuoNet 设置"\
					onload="opener.FeiRuoNet.OptionScript.init();"\
					onunload="opener.FeiRuoNet.UpdateFile();"\
					buttons="accept,cancel,extra1,extra2"\
					ondialogextra1="opener.FeiRuoNet.EditFile(0);"\
					ondialogextra2="opener.FeiRuoNet.EditFile(1);"\
					ondialogaccept="opener.FeiRuoNet.OptionScript.Save();"\
					windowtype="FeiRuoNet:Preferences">\
					<prefpane id="main" flex="1">\
						<preferences>\
							<preference id="BAK_FLAG_PATH" type="string" name="userChromeJS.FeiRuoNet.BAK_FLAG_PATH"/>\
							<preference id="CustomQueue" type="int" name="userChromeJS.FeiRuoNet.CustomQueue"/>\
							<preference id="DefaultProxy" type="int" name="userChromeJS.FeiRuoNet.DefaultProxy"/>\
							<preference id="Icon_Pos" type="int" name="userChromeJS.FeiRuoNet.Icon_Pos"/>\
							<preference id="ApiIdx" type="int" name="userChromeJS.FeiRuoNet.ApiIdx"/>\
							<preference id="Inquiry_Delay" type="int" name="userChromeJS.FeiRuoNet.Inquiry_Delay"/>\
							<preference id="UrlbarSafetyLevel" type="bool" name="userChromeJS.FeiRuoNet.UrlbarSafetyLevel"/>\
							<preference id="ModifyHeader" type="bool" name="userChromeJS.FeiRuoNet.ModifyHeader"/>\
							<preference id="ProxyMode" type="int" name="userChromeJS.FeiRuoNet.ProxyMode"/>\
							<preference id="ProxyPath" type="string" name="userChromeJS.FeiRuoNet.ProxyPath"/>\
							<preference id="ProxyTimer" type="int" name="userChromeJS.FeiRuoNet.ProxyTimer"/>\
							<preference id="RefChanger" type="bool" name="userChromeJS.FeiRuoNet.RefChanger"/>\
							<preference id="UAChangerState" type="bool" name="userChromeJS.FeiRuoNet.UAChangerState"/>\
						</preferences>\
						<script>\
							function Change(event) {\
								opener.FeiRuoNet.OptionScript.ChangeStatus(event);\
							}\
						</script>\
						<vbox>\
							<row>\
								<groupbox style="width:500px">\
									<caption label="Tip" />\
										<grid>\
											<rows>\
												<row align="center">\
													<label id="QQwrtVer"/>\
												</row>\
											</rows>\
										</grid>\
								</groupbox>\
							</row>\
							<rows style="width:500px">\
								<row>\
									<groupbox style="width:248px">\
										<caption label="功能开关(需要配置文件支持)" />\
											<grid>\
												<rows>\
													<row align="center">\
														<checkbox id="RefChanger" label="破解反盗链" preference="RefChanger" />\
													</row>\
													<row align="center">\
														<checkbox id="UAChangerState" label="修改浏览器标识" preference="UAChangerState" />\
													</row>\
													<row align="center">\
														<checkbox id="ModifyHeader" label="修改HTTP头信息" preference="ModifyHeader" />\
													</row>\
													<row align="center">\
														<checkbox id="UrlbarSafetyLevel" label="HTTPS等级高亮" preference="UrlbarSafetyLevel" />\
													</row>\
													<row hidden="true" align="center">\
														<label value="代理模式选择：" />\
														<menulist preference="ProxyMode" id="ProxyMode" style="width:100px">\
															<menupopup id="ProxyMode_Popup">\
																<menuitem label="禁用代理" value="0"/>\
																<menuitem label="智能代理" value="1"/>\
																<menuitem label="全局代理" value="2"/>\
															</menupopup>\
														</menulist>\
													</row>\
												</rows>\
											</grid>\
									</groupbox>\
									<groupbox style="width:248px">\
										<caption label="一般设置" />\
											<grid>\
												<rows>\
													<row align="center">\
														<label value="查询延时："/>\
														<textbox id="Inquiry_Delay" style="width:140px;" type="number" preference="Inquiry_Delay" placeholder="3500毫秒" tooltiptext="延迟时间，时间内未取得所选择查询源数据，就使用备用询源。"/>\
													</row>\
													<row align="center">\
														<label value="图标的位置：" />\
														<menulist preference="Icon_Pos" id="Icon_Pos">\
															<menupopup id="Icon_Pos_Popup">\
																<menuitem label="地址栏左边" value="0"/>\
																<menuitem label="地址栏图标" value="1"/>\
																<menuitem label="可移动按钮" value="2"/>\
															</menupopup>\
														</menulist>\
													</row>\
													<row align="center">\
														<label value="查询显示顺序：" />\
														<menulist preference="CustomQueue" style="width:110px" id="CustomQueue">\
															<menupopup id="CustomQueue_Popup">\
																<menuitem label="添加顺序" value="0"/>\
																<menuitem label="响应速度" value="1"/>\
															</menupopup>\
														</menulist>\
													</row>\
													<row align="center">\
														<label value="在线查询源：" tooltiptext="优先使用本地数据库"/>\
														<menulist preference="ApiIdx" id="ApiIdx1"/>\
													</row>\
												</rows>\
												</grid>\
									</groupbox>\
								</row>\
							</rows>\
							<groupbox style="width:500px">\
								<caption label="自定义设置" />\
									<rows>\
										<row align="center">\
											<label value="网络图标地址："/>\
											<textbox id="BAK_FLAG_PATH" placeholder="图标优先级：png→lib→网络图标" preference="BAK_FLAG_PATH" style="width:395px" tooltiptext="http://www.1108.hk/images/ext/ \n http://www.myip.cn/images/country_icons/ 等等。"/>\
										</row>\
									</rows>\
									<rows hidden="true">\
										<row align="center">\
											<label value="代理软件路径："/>\
											<textbox id="ProxyPath" placeholder="在触发代理条件下，如果代理软件尚未启动，则启动之" tooltiptext="支持相对路径, 正反双斜杠开头，相对于chrome文件夹" style="width:310px" preference="ProxyPath"/>\
											<button label="浏览" tooltiptext="支持相对路径" oncommand="opener.FeiRuoNet.OptionScript.ChouseFile();"/>\
										</row>\
									</rows>\
							</groupbox>\
							<groupbox hidden="true" style="width:500px">\
								<caption label="代理服务器设置(请勿包含“|”或“;”)"/>\
									<grid>\
										<rows id="ProxyRows">\
											<row id="discription">\
												<label value="名称"/>\
												<label value="地址"/>\
												<label value="端口"/>\
												<hbox>\
													<label value="Http"/>\
													<label value="Https" style="margin-left:-1px;"/>\
													<label value="Socks4" style="margin-left:-2px;"/>\
													<label value="Socks5" style="margin-left:-3px;"/>\
												</hbox>\
												<label value="远程DNS" style="margin-left:-2px;"/>\
												<label value="删除"/>\
											</row>\
										</rows>\
									</grid>\
									<description id="warning" hidden="true">警告: 删除所有代理后请添加一个代理，否则代理将无法工作。</description>\
									<description id="note" hidden="true">注意: 删除默认代理后请选择一个新的默认代理(通过图标右键菜单项 "默认代理" 选择), 否则代理可能无法工作。</description>\
									<description id="tip" hidden="true">提示: 点击"取消" 按钮能撤销之前的操作。</description>\
									<menuseparator/>\
									<hbox style="width:495px">\
										<row align="center">\
											<label value="默认："/>\
											<menulist preference="DefaultProxy" id="DefaultProxy1" style="width:100px;"/>\
										</row>\
										<row align="center">\
											<label value="切换延时："/>\
											<textbox id="ProxyTimer" type="number" preference="ProxyTimer" style="width:75px;" placeholder="3500毫秒" tooltiptext="时间内代理服务器无响应，就切换到另下个代理服务器。"/>\
										</row>\
										<spacer flex="1" />\
										<button id="ProxyRowsBtn1" label="添加代理" oncommand="opener.FeiRuoNet.OptionScript.AddNewRow();"/>\
										<button id="ProxyRowsBtn2" label="删除代理" oncommand="opener.FeiRuoNet.OptionScript.DelSelectedRow();"/>\
									</hbox>\
							</groupbox>\
						</vbox>\
						<hbox flex="1">\
							<button dlgtype="extra1" label="编辑规则"/>\
							<button dlgtype="extra2" label="编辑菜单"/>\
							<spacer flex="1" />\
							<button label="重置" oncommand="opener.FeiRuoNet.OptionScript.Resets();"/>\
							<button label="应用" oncommand="opener.FeiRuoNet.OptionScript.Save();"/>\
							<button dlgtype="accept"/>\
							<button dlgtype="cancel"/>\
						</hbox>\
					</prefpane>\
					</prefwindow>\
					';
		return encodeURIComponent(xul);
	};
	/*****************************************************************************************/
	/*  NOTE:
	 *  The type-specific arrays (e.g. Uint32Array) are native-endian only and require alignment in the buffer. DataView can work with either endianness from any point in a buffer.
	 *  However, the performance of DataView is currently horrible. (see Mozilla bug 1065894) The below shouldn't be ideal, but it's actually much faster than the built-in DataView.
	 *  Implementing it like this also makes it easier to add support for 48-bit integers and a better Api for reading. (JS Proxy() is too slow to add '[]' syntax, though)
	 *  As optimizations for use here, only unsigned big-endian getters are implemented. (for little-endian, reverse 'abcdef' to 'fedcba' when assembling)
	 *  Note that you would think a Uint16Array or Uint32Array on a system with endianness matching the file would be faster than the byte fiddling below. It is not.
	 */
	function FastDataViewUBE(buffer, offset, size, bytesPerInt) {
		this.bytes = new Uint8Array(buffer, offset, size);
		switch (bytesPerInt) {
			case 2:
				this.get = function(i) {
					return this.getUint16(i * 2);
				};
				return;
			case 4:
				this.get = function(i) {
					return this.getUint32(i * 4);
				};
				return;
			case 6:
				this.get = function(i) {
					return this.getUint48(i * 6);
				};
				return;
		}
	}

	FastDataViewUBE.prototype = {
		getUint8: function(offset) {
			return this.bytes[offset];
		},
		getUint16: function(offset) {
			var bytes = this.bytes;
			var a = bytes[offset];
			var b = bytes[offset + 1];
			return ((a << 8) | b);
		},
		getUint32: function(offset) {
			var bytes = this.bytes;
			var a = bytes[offset];
			var b = bytes[offset + 1];
			var c = bytes[offset + 2];
			var d = bytes[offset + 3];
			return ((a << 24) | (b << 16) | (c << 8) | d) >>> 0; // '>>> 0' forces read as unsigned; left shifts >31 bits alter the sign (JS has no '<<<')
		},
		getUint48: function(offset) {
			return this.getUint16(offset) * 0x100000000 + this.getUint32(offset + 2); // JS cannot bitshift past 32 bits; read in two chunks and combine
		}
	};

	/*****************************************************************************************/
	// 来自 User Agent Overrider 扩展
	const ToolbarManager = (function() {

		/**
		 * Remember the button position.
		 * This function Modity from addon-sdk file lib/sdk/widget.js, and
		 * function BrowserWindow.prototype._insertNodeInToolbar
		 */
		let layoutWidget = function(document, button, isFirstRun) {

			// Add to the customization palette
			let toolbox = document.getElementById('navigator-toolbox');
			toolbox.palette.appendChild(button);

			// Search for widget toolbar by reading toolbar's currentset attribute
			let container = null;
			let toolbars = document.getElementsByTagName('toolbar');
			let id = button.getAttribute('id');
			for (let i = 0; i < toolbars.length; i += 1) {
				let toolbar = toolbars[i];
				if (toolbar.getAttribute('currentset').indexOf(id) !== -1) {
					container = toolbar;
				}
			}

			// if widget isn't in any toolbar, default add it next to searchbar
			if (!container) {
				if (isFirstRun) {
					container = document.getElementById('nav-bar');
				} else {
					return;
				}
			}

			// Now retrieve a reference to the next toolbar item
			// by reading currentset attribute on the toolbar
			let nextNode = null;
			let currentSet = container.getAttribute('currentset');
			let ids = (currentSet === '__empty') ? [] : currentSet.split(',');
			let idx = ids.indexOf(id);
			if (idx !== -1) {
				for (let i = idx; i < ids.length; i += 1) {
					nextNode = document.getElementById(ids[i]);
					if (nextNode) {
						break;
					}
				}
			}

			// Finally insert our widget in the right toolbar and in the right position
			container.insertItem(id, nextNode, null, false);

			// Update DOM in order to save position
			// in this toolbar. But only do this the first time we add it to the toolbar
			if (ids.indexOf(id) === -1) {
				container.setAttribute('currentset', container.currentSet);
				document.persist(container.id, 'currentset');
			}
		};

		let addWidget = function(window, widget, isFirstRun) {
			try {
				layoutWidget(window.document, widget, isFirstRun);
			} catch (error) {
				log(error);
			}
		};

		let removeWidget = function(window, widgetId) {
			try {
				let widget = window.document.getElementById(widgetId);
				widget.parentNode.removeChild(widget);
			} catch (error) {
				log(error);
			}
		};

		let exports = {
			addWidget: addWidget,
			removeWidget: removeWidget,
		};
		return exports;
	})();

	function log(str) {
		if (FeiRuoNet.Debug) console.log("[FeiRuoNet Debug] ", arguments);
	}

	function U(text) 1 < 'あ'.length ? decodeURIComponent(escape(text)) : text;

	function StatusLable(str) {
		XULBrowserWindow.statusTextField.label = '[FeiRuoNet]' + str;
		setTimeout(function() {
			XULBrowserWindow.statusTextField.label = '';
		}, 2000)
	}

	function alert(aString, aTitle) {
		Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService)
			.showAlertNotification("", aTitle || "FeiRuoNet", aString, false, "", null);
	}

	function addStyle(css) {
		var pi = document.createProcessingInstruction(
			'xml-stylesheet',
			'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
		);
		return document.insertBefore(pi, document.documentElement);
	}

	function _$P(id) {
		return FeiRuoNet.GetWindow(1).document.getElementById(id);
	}

	function _$(id) {
		return FeiRuoNet.GetWindow(0).document.getElementById(id);
	}

	function _$C(name, attr) {
		var el = FeiRuoNet.GetWindow(0).document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}

	function $(id) document.getElementById(id);

	function $$(exp, doc) {
		return Array.prototype.slice.call((doc || document).querySelectorAll(exp));
	}

	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}

	window.FeiRuoNet = FeiRuoNet;
	FeiRuoNet.Initialization();
})('\
#urlbar.FeiRuoNetSSLhigh,\
#urlbar.FeiRuoNetSSLhigh > .autocomplete-textbox-container {\
    background-color: #88f788 !important;\
}\
#urlbar.FeiRuoNetSSLmid,\
#urlbar.FeiRuoNetSSLmid > .autocomplete-textbox-container {\
    background-color: #BBFFBB !important;\
}\
#urlbar.FeiRuoNetSSLlow,\
#urlbar.FeiRuoNetSSLlow > .autocomplete-textbox-container {\
    background-color: #DDF9CC !important;\
}\
#urlbar.FeiRuoNetSSLbroken,\
#urlbar.FeiRuoNetSSLbroken > .autocomplete-textbox-container {\
    background-color: #F7DFDF !important;\
}\
.FeiRuoNet_UsingUA {\
    font-weight: bold!important;\
    color: brown!important;\
}\
#FeiRuoNet_Disable {\
    filter: grayscale(100%) !important;\
}\
'.replace(/\n|\t/g, ''));