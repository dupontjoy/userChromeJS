// ==UserScript==
// @name UserAgentChangeModLite.uc.js
// @namespace http://www.sephiroth-j.de/mozilla/
// @charset     utf-8
// @note  modify by lastdream2013 at 20130616 mino fix
// @note  modify by lastdream2013 at 20130409 sitelist : change SITELIST idx to Name
// @note  modify by lastdream2013 for navigator.userAgent https://g.mozest.com/thread-43428-1-2
// @include chrome://browser/content/browser.xul
// ==/UserScript==
var ucjs_UAChanger = {
	//现有版本firefox的图标
	NOW_UA_IMG: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADRUlEQVQ4jXWTb0zUdQDGvx3HddNoLBwFbrE6NoG1JZ14i1405IpFiEkKOdiQu2QR0cRo60SMlNlSxx+FkZ6DNv8wBMpuWUQpdAT+4VD09BCuEzGO40/jDtEOuLvfpxeNrdF8Xj+f583zPEIsEyAHYoAcoAwoBbIAFRC03L8cVs37qHF5AyPj3oUF16KEyycx6ZO8Hr9k9wWoACIfB2tm3TP93/7Yx5kjh+nouYB5LkD3nB/TzDy1djcm64Tk9Xo7gdjlcPTi9Fi/sz6f33NjaNet42urnRaPjzaPj4MjD9jeNc7m41exWNuB2V+AZ5dgWcC3WDXdWIotXc7tdxVczVxFb/lmzjTXs//uHAb7Q/IsHhKNNj6r2Y/f870EGJYCYrzD/Y7h7Oe5oQ3CmqHEsTOazsqPKTjaxpaOKVJbRtDU3iSq+DxpBXuZ6tXDwth1IEIAOTPnjQvWlGBupCvpywjF/Gki2w6cZm39MAl1t4guNvHcNiOhadV8caAIT2cykvs3D6AVQJmr4XOsaXLMyQqaVDIy3ikkorid1YZuogxdhOtbCNF+iUKzh5pDW/Fficc/ccr36JF/hwB2/3m8XBrYqKBXK+fya4Jz769D96GBko+KOFauJ6WoiuD1e3jmlXx+qNYw3xGF127033GM7hRA5v3WBu+lDUpuZSm5u1XGtU3BXNwUys9bwilN38Cat/YiVLtITnqTycZwZk+twm377u+mNtN2Abw4Y7t5p/11FVdSlQzpQhjUh1CZpCI+JgMRqeeJsHTiX9LSXBLLzFEFfxkTuHf78r33cvIS/20iENhnOVhBqyqIvo0rsOU9zWBBGKbsKA5pIziRqmQgX46rXIFz30rc5mPS2dbW00KIsKUqVz+cmrr4a+EOWl6Q0ZMkx5q1gqFcJX/kKbDnynHoZIztXsmDznIsl8w2tXr928vXGDs3OXnh+pHD0k9JcXS9qmAgVcZQpgyHTsF4RQKebqPU19s9mPxGSqEQ4qn//eH+9HSk0+n8aqTfMuo417QwerIy4GqpDkx0nfXar/U4GxoaTWvi4rKFEKGPfaRarQ4uMZRpqurqSo0N35ysqatvLtr1Se3L8eoPhBBrhRBP/tf/D+rmNuGIuaVRAAAAAElFTkSuQmCC",
	//firefox3.6的图标
	EXT_FX_LIST_IMG: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABYElEQVQ4ja2Rv2vCQBTH/RN07yBk6FJwbAYhwVacFDpkkeBUROgiOEjp6lDS2YIkuGQVnFwMFIf+GKQQBIeCo0MGbyzCXci3Q7nXqNEs/cKDd3d8P++9e5nMfykMQ4RhCHnGnlLNnqHAMxQAoDw/yCLXXiLXXhKIc45Ec+S7ZJT5+vsDr+sZzAlDrr1EfpCFZyi7EAnY9ouIfBeR7wLDEsHMCYM5YdCdAPefN3RPEAnYPF5C2BowLAHDEr6eTHiGAt0J0JndoTltoDOvHgesugVs+0UIW6MRnq/PoDsBmtMGeos6mu9X8AwFzFL/IHEAs1QIW6MquhNAdwL0FnV05tV0gLA1AoxaFYrauIzauAz74YIKnexARuS7GLUqtMqX+jmYpWLVLez+gxDioIv4KJ6h4O32922nulQcsN9FPBKrJ0H2QcxST5ulOOfUsgTJONj/MXHOEQfFjanmJFCa8QcdAxOC15SfpwAAAABJRU5ErkJggg==",

	UANameIdxHash: [],

	// ----- 下面设置开始 -----
	// defautl: ステータスバーの右端に表示する
	TARGET: null,
	// 定义一个target，用来调整状态栏顺序,null为空
	ADD_OTHER_FX: true,
	// true:自动添加其他版本firefox的ua  false:不添加
	//2种版本firefox，下面请勿修改
	EXT_FX_LIST: [{
		name: "Firefox4.0",
		ua: "Mozilla/5.0 (Windows; Windows NT 6.1; rv:2.0b2) Gecko/20100720 Firefox/4.0b2",
		label: "Fx4.0",
		img: ""
	}, {
		name: "Firefox3.6",
		ua: "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8",
		label: "Fx3.6",
		img: ""
	}, ],
	// ----------------------
	// UA リストのインデックス
	def_idx: 0,
	Current_idx: 0,

	// 初期化
	init: function() {
		this.reload();
		this.mkData(); // UA データ(UA_LIST)を作る
		var menu = document.createElement("menu");
		menu.setAttribute("id", "ucjs_UserAgentChanger");
		menu.setAttribute('class', 'menu-iconic');
		menu.setAttribute("label", "UserAgentChange");
		menu.setAttribute("image", this.UA_LIST[this.def_idx].img);
		var insPos = document.getElementById('devToolsSeparator');
		insPos.parentNode.insertBefore(menu, insPos);
		this.mkPanel(); // パネルとメニューを作る
		this.setSiteIdx();
		// Observer 登録
		var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
		os.addObserver(this, "http-on-modify-request", false);
		os.addObserver(this.onDocumentCreated, "content-document-global-created", false);
		// イベント登録
		var contentArea = document.getElementById("appcontent");
		contentArea.addEventListener("load", this, true);
		contentArea.addEventListener("select", this, false);
		var contentBrowser = this.getContentBrowser();
		contentBrowser.tabContainer.addEventListener("TabClose", this, false);
		window.addEventListener("unload", this, false);
	},
	reload: function(isAlert) {
		var data = this.importUserAgentChange();
		if (!data) return this.alert('Load Error: 配置文件不存在');
		var sandbox = new Cu.Sandbox(new XPCNativeWrapper(window));
		try {
			Cu.evalInSandbox(data, sandbox, "1.8");
		} catch (e) {
			this.alert('Error: ' + e + '\n请重新检查配置文件');
			return;
		}
		this.DISPLAY_TYPE = sandbox.DISPLAY_TYPE
		this.SITE_LIST = sandbox.SITE_LIST
		this.UA_LIST = sandbox.UA_LIST;
		try{
			document.getElementById("ucjs_UserAgentChanger").removeChild(document.getElementById("uac_popup"));
			this.mkData();
			this.mkPanel();
			
		}catch(e){}
		if (isAlert) this.alert('配置已经重新载入');
	},
	alert: function(aString, aTitle) {
		Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", aTitle || "UserAgentChanger", aString, false, "", null);
	},

	userAgentChangeFile: function() {
		var aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
		aFile.appendRelativePath("Local");
		aFile.appendRelativePath("_userAgentChange.js");
		if (!aFile.exists() || !aFile.isFile()) return null;
		delete this.file;
		return this.file = aFile;
	},

	importUserAgentChange: function() {
		var file = this.userAgentChangeFile();
		var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
		var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
		fstream.init(file, -1, 0, 0);
		sstream.init(fstream);
		var data = sstream.read(sstream.available());
		try {
			data = decodeURIComponent(escape(data));
		} catch (e) {}
		sstream.close();
		fstream.close();
		return data;
	},

	edit: function() {
		var aFile = this.userAgentChangeFile();
		if (!aFile || !aFile.exists() || !aFile.isFile()) return;
		var editor;
		try {
			editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsILocalFile);
		} catch (e) {
			this.alert("请设置编辑器的路径。\nview_source.editor.path");
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
			this.alert("编辑器不正确！")
		}
	},


	onDocumentCreated: function(aSubject, aTopic, aData) {
		var aChannel = aSubject.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIWebNavigation).QueryInterface(Ci.nsIDocShell).currentDocumentChannel;
		if (aChannel instanceof Ci.nsIHttpChannel) {
			var navigator = aSubject.navigator;
			var userAgent = aChannel.getRequestHeader("User-Agent");
			if (navigator.userAgent != userAgent) Object.defineProperty(XPCNativeWrapper.unwrap(navigator), "userAgent", {
				value: userAgent,
				enumerable: true
			});
		}
	},

	// UA データを作る
	mkData: function() {
		var ver = this.getVer(); // 現在使っている Firefox のバージョン
		// 現在使っている Firefox のデータを作る
		var tmp = [];
		tmp.name = "Firefox" + ver;
		tmp.ua = "";
		tmp.img = this.NOW_UA_IMG;
		tmp.label = "Fx" + (this.ADD_OTHER_FX ? ver : "");
		this.UA_LIST.unshift(tmp);
		// Fx のバージョンを見て UA を追加する
		if (this.ADD_OTHER_FX) {
			if (ver == 3.6) { // Fx3.6 の場合 Fx4 を追加する
				this.EXT_FX_LIST[0].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[0]);
			} else { // Fx3.6 以外では Fx3.6 を追加する
				this.EXT_FX_LIST[1].img = this.EXT_FX_LIST_IMG;
				this.UA_LIST.push(this.EXT_FX_LIST[1]);
			}
		}
		// 起動時の UA を 初期化 (general.useragent.override の値が有るかチェック 07/03/02)
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (preferencesService.getPrefType("general.useragent.override") != 0) {
			for (var i = 0; i < this.UA_LIST.length; i++) {
				if (preferencesService.getCharPref("general.useragent.override") == this.UA_LIST[i].ua) {
					this.def_idx = i;
					break;
				}
			}
		}
	},
	// UA パネルを作る
	mkPanel: function() {
		// UA パネルのコンテクストメニューを作る
		var PopupMenu = document.createElement("menupopup");
		PopupMenu.setAttribute("id", "uac_popup");
		for (var i = 0; i < this.UA_LIST.length; i++) {
			if (this.UA_LIST[i].name == "分隔线") {
				var mi = document.createElement("menuseparator");
				PopupMenu.appendChild(mi);
			} else {
				var mi = document.createElement("menuitem");

				mi.setAttribute('label', this.UA_LIST[i].name);
				mi.setAttribute('tooltiptext', this.UA_LIST[i].ua);
				mi.setAttribute('oncommand', "ucjs_UAChanger.setUA(" + i + ");");

				if (this.DISPLAY_TYPE) {
					mi.setAttribute('class', 'menuitem-iconic');
					mi.setAttribute('image', this.UA_LIST[i].img);
				} else {
					mi.setAttribute("type", "radio");
					mi.setAttribute("checked", i == this.def_idx);
				}
				if (i == this.def_idx) {
					mi.setAttribute("style", 'font-weight: bold;');
					mi.style.color = 'red';
				} else {
					mi.setAttribute("style", 'font-weight: normal;');
					mi.style.color = 'black';
				}
				mi.setAttribute("uac-generated", true);
				PopupMenu.appendChild(mi);
			}
		}
		// パネルの変更を可能にする
		var mi = document.createElement("menuseparator");
		PopupMenu.appendChild(mi);
		var mi = document.createElement("menuitem");
		mi.setAttribute('id', 'ucjs_UAChangerConfig');
		mi.setAttribute('label', '重载UA配置');
		mi.setAttribute("tooltiptext", '左键重载；右键编辑');
		mi.setAttribute('oncommand', 'event.preventDefault(); ucjs_UAChanger.reload(true);');
		mi.setAttribute('onclick', 'if (event.button == 2) {event.preventDefault(); closeMenus(event.currentTarget); ucjs_UAChanger.edit(); }');
		PopupMenu.appendChild(mi);
		var menu = document.getElementById("ucjs_UserAgentChanger");
		menu.addEventListener("popupshowing", this, false);
		menu.appendChild(PopupMenu);

	},
	// URL 指定で User-Agent の書き換え(UserAgentSwitcher.uc.js より)
	observe: function(subject, topic, data) {
		if (topic != "http-on-modify-request") return;
		var http = subject.QueryInterface(Ci.nsIHttpChannel);
		for (var i = 0; i < this.SITE_LIST.length; i++) {
			if (http.URI && (new RegExp(this.SITE_LIST[i].url)).test(http.URI.spec)) {
				var idx = this.SITE_LIST[i].idx;
				http.setRequestHeader("User-Agent", this.UA_LIST[idx].ua, false);
			}
		}
	},
	// イベント・ハンドラ
	handleEvent: function(aEvent) {
		var contentBrowser = this.getContentBrowser();
		var menu = document.getElementById("ucjs_UserAgentChanger");
		var uacMenu = document.getElementById("uac_popup");
		switch (aEvent.type) {
		case "popupshowing":
			// コンテクスト・メニュー・ポップアップ時にチェック・マークを更新する
			var menu = aEvent.target;
			for (var i = 0; i < menu.childNodes.length; i++) {
				if (i == ucjs_UAChanger.Current_idx) {
					menu.childNodes[i].setAttribute("style", 'font-weight: bold;');
					menu.childNodes[i].style.color = 'red';
					if (!this.DISPLAY_TYPE) menu.childNodes[i].setAttribute("checked", true);
				} else {
					menu.childNodes[i].setAttribute("style", 'font-weight: normal;');
					menu.childNodes[i].style.color = 'black';
				}
			}
			break;
		case "load":
			// SITE_LIST に登録された URL の場合
		case "select":
		case "TabClose":
			for (var i = 0; i < ucjs_UAChanger.SITE_LIST.length; i++) {
				if ((new RegExp(this.SITE_LIST[i].url)).test(contentBrowser.currentURI.spec)) {
					var idx = this.SITE_LIST[i].idx;
					this.setImage(idx);
					return;
				}
			}
			this.setImage(this.def_idx);

			break;
		case "unload":
			// 終了処理
			var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
			os.removeObserver(this, "http-on-modify-request");
			os.removeObserver(this.onDocumentCreated, "content-document-global-created");
			var contentArea = document.getElementById("appcontent");
			contentArea.removeEventListener("load", this, true);
			contentArea.removeEventListener("select", this, false);
			if (contentBrowser) contentBrowser.tabContainer.removeEventListener("TabClose", this, false);
			uacMenu.removeEventListener("popupshowing", this, false);
			window.removeEventListener("unload", this, false);
			break;
		}
	},
	// 番号を指定して UA を設定
	setUA: function(i) {
		var preferencesService = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
		if (i == 0) { // オリジナル UA にする場合
			// 既にオリジナル UA の場合は何もしない
			if (preferencesService.getPrefType("general.useragent.override") == 0) return;
			preferencesService.clearUserPref("general.useragent.override");
		} else { // 指定した UA にする場合
			preferencesService.setCharPref("general.useragent.override", this.UA_LIST[i].ua);
		}
		this.def_idx = i;
		this.setImage(i);
	},
	// UA パネル画像とツールチップを設定
	setImage: function(i) {
		var menu = document.getElementById("ucjs_UserAgentChanger");

		menu.setAttribute("image", this.UA_LIST[i].img);
		menu.style.padding = "0px 2px";

		this.Current_idx = i;
	},
	// アプリケーションのバージョンを取得する(Alice0775 氏のスクリプトから頂きました。)
	getVer: function() {
		var info = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULAppInfo);
		var ver = parseInt(info.version.substr(0, 3) * 10, 10) / 10;
		return ver;
	},
	setSiteIdx: function() {
		for (let i = 0; i < this.UA_LIST.length; i++) {
			this.UANameIdxHash[this.UA_LIST[i].name] = i;
		}
		for (let j = 0; j < this.SITE_LIST.length; j++) {
			var uaName = this.SITE_LIST[j].Name;
			if (this.UANameIdxHash[uaName]) {
				this.SITE_LIST[j].idx = this.UANameIdxHash[uaName];

			} else {
				this.SITE_LIST[j].idx = this.def_idx;

			}
		}
	},
	// 現在のブラウザオブジェクトを得る。
	getContentBrowser: function() {
		var windowMediator = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
		var topWindowOfType = windowMediator.getMostRecentWindow("navigator:browser");
		if (topWindowOfType) return topWindowOfType.document.getElementById("content");
		return null;
	}
}
ucjs_UAChanger.init();