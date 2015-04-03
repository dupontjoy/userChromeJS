// ==UserScript==
// @name 			showFlagS.uc.js
// @description		显示国旗与IP
// @author			ywzhaiqi、feiruo
// @compatibility	Firefox 16
// @charset			UTF-8
// @include			chrome://browser/content/browser.xul
// @id 				[FE89584D]
// @inspect         window.showFlagS
// @startup         window.showFlagS.init();
// @shutdown        window.showFlagS.onDestroy();
// @optionsURL		about:config?filter=showFlagS.
// @config 			window.showFlagS.command('Edit');
// @reviewURL		http://bbs.kafan.cn/thread-1666483-1-1.html
// @reviewURL		http://www.firefoxfan.com/UC-Script/328.html
// @homepageURL		https://github.com/feiruo/userChromeJS/tree/master/showFlagS
// @downloadURL		https://github.com/feiruo/userChromeJS/raw/master/showFlagS/showFlagS.uc.js
// @note            Begin 2013-12-16
// @note            显示网站IP地址和所在国家国旗，帮助识别网站真实性。
// @note            左键点击图标复制信息，中间刷新信息，右键弹出菜单。
// @note            修改浏览器标识，破解反盗链，地址栏摘录语句，更多功能需要【_showFlagS.js】配置文件。
// @version         1.6.2.5 	2015.03.09 11:00	UA add appVersion example:115.com。
// @version         1.6.2.4.2 	2015.03.06 17:00	Fix e10s Window。
// @version         1.6.2.4.1 	2015.02.27 14:00	Fix page-proxy-favicon CSS。
// @version         1.6.2.4 	2015.02.25 19:00	Add RefererChange。
// @version         1.6.2.3 	2015.02.18 22:00	Add UserAgentChanger。
// @version         1.6.2.2 	2015.02.13 23:00	Fix exec。
// @version         1.6.2.1 	2014.09.18 19:00	Fix Path indexof '\\' or '//'。
// @version         1.6.2.0		2014.08.29 21:30	完善卸载，完善路径兼容。
// @version         1.6.1.2		2014.08.27 20:30	完善禁用和路径支持。
// @version         1.6.1.1		2014.08.24 22:00	错误页面显示。
// @version         1.6.1.0		2014.08.22 22:00	修复Linux和Windows路径问题。
// @version         1.6.0.4		2014.08.17 16:40	Fix。
// @version         1.6.0.3		2014.08.10 18:00	ReBuilding。
// @version         1.6.0.2		2014.08.08 21:00	ReBuilding。
// @version         1.6.0.1		2014.08.07 17:00	ReBuilding。
// @version         1.6.0.0		ReBuild。
// @version         1.5.8.3.4 	将存入perfs的选项移至脚本内，便于配置文件的理解,其他修复。
// @version         1.5.8.3.3 	修复因临时删除文件导致的错误。
// @version         1.5.8.3.2 	identity-box时错误页面智能隐藏，已查询到便显示，每查询到便隐藏。
// @version         1.5.8.3.1 	配置文件增加图标高度设置，identity-box时错误页面自动隐藏。
// @version         1.5.8.3 	修复图标切换错误的问题。
// @version         1.5.8.2 	修复FlagFox图标下，找不到图标就消失的问题，其他修改。
// @version         1.5.8.1 	配置文件加入一个图标大小的参数。
// @version         1.5.8 		修复菜单重复创建的BUG，查询源外置;可以丢弃旧版lib（不推荐）。
// @version         1.5.7		修改菜单和图标的创建方式，避免各种不显示，不弹出问题。
// @version         1.5.6 		将脚本设置也移到配置文件中，配置文件可以设置TIP显示条目，改变数据库文件等。
// @version         1.5.5 		增加flagfox扩展国旗图标库，相对路径profile\chrome\lib\isLocalFlags下，直接存放图标,支持实时切换。
// @version         1.5 		增体加右键菜单外部配置，配置方式和anoBtn一样，具请参考配置文件。
// @version         1.4 		增加几个详细信息；服务器没给出的就不显示。
// @version         1.3 		增加淘宝查询源，修复不显示图标，刷新、切换查询源时可能出现的图标提示消失等BUG
// @version         1.2.1 		修复identity-box时page-proxy-favicon的问题
// @version         1.2 		位置为identity-box时自动隐藏page-proxy-favicon，https显示
// @version         1.1 		设置延迟，增加本地文件图标。
// ==/UserScript==

/**
 * 参考 Show Location 扩展、Flagfox 扩展、http://files.cnblogs.com/ziyunfei/showFlag.uc.js
 */
location == "chrome://browser/content/browser.xul" && (function() {

	if (window.showFlagS) window.showFlagS.onDestroy();

	var showFlagS = {
		debug: true,
		def_uaIdx: 0,
		Current_idx: 0,
		UANameIdxHash: [],
		dnsCache: [],
		isReqHash: [],
		isReqHash_tooltip: [],
		showFlagHash: [],
		showFlagTooltipHash: [],
		PPFaviconVisibility: $("page-proxy-favicon").style.visibility,

		//等待时国旗图标
		DEFAULT_Flag: "chrome://branding/content/icon16.png",

		get dns() {
			return Cc["@mozilla.org/network/dns-service;1"]
				.getService(Components.interfaces.nsIDNSService);
		},
		get eventqueue() {
			return Cc["@mozilla.org/thread-manager;1"]
				.getService().mainThread;
		},
		get usingUA() {
			var prefs = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Ci.nsIPrefService).getBranch("");
			if (prefs.getPrefType("general.useragent.override") != 0)
				return prefs.getCharPref("general.useragent.override");
			return null;
		},
		get currentURI() {
			var windowMediator = Cc["@mozilla.org/appshell/window-mediator;1"]
				.getService(Ci.nsIWindowMediator);
			var topWindowOfType = windowMediator.getMostRecentWindow("navigator:browser");
			if (topWindowOfType)
				return topWindowOfType.document.getElementById("content").currentURI;
			return null;
		},
	};

	showFlagS.init = function() {
		this.makePopup();
		this.reload();
		this.progressListener = {
			onLocationChange: function() {
				showFlagS.onLocationChange();
			},
			onProgressChange: function() {},
			onSecurityChange: function() {},
			onStateChange: function() {},
			onStatusChange: function() {}
		};
		window.getBrowser().addProgressListener(showFlagS.progressListener);
		var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
		os.addObserver(this.observe, "http-on-modify-request", false);
		os.addObserver(this.onDocumentCreated, "content-document-global-created", false);

		window.addEventListener("unload", function() {
			showFlagS.onDestroy();
		}, false);
	};

	showFlagS.makePopup = function() {
		let xml = '\
				<menupopup id="showFlagS-popup">\
				<menuitem label="复制信息" id="showFlagS-copy" oncommand="showFlagS.command(\'Copy\');" />\
				<menuitem label="刷新信息" id="showFlagS-reload" oncommand="showFlagS.onLocationChange(\'Flags\');"/>\
				<menu label="UserAgent" id="showFlagS-UserAgent-config" class="showFlagS menu-iconic" hidden="true">\
				<menupopup  id="showFlagS-UserAgent-popup">\
				</menupopup>\
				</menu>\
				<menu label="脚本设置" id="showFlagS-set-config" class="showFlagS menu-iconic" hidden="true" image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAYAAADJqhx8AAABlElEQVQ4jaXUSWtUQRQF4M9hYTuEuDAmGl0Yp0QkcQBFRFEXQhB3ATf+gKziwrU/wr8RcK04EY04JuBSQXQRhziEhEDAdDe6qKqkuuiHAQsOvHte3Vv3nlPvwRLqaKCZofEP/jOGxKCJb5jJ8BW/2/BfYs4sjokVv+MS9mU4gze4XPCn8BE/UoFmPG2/1rULkzhc8F14167AwWJjbywwUPDdeL+WDnoqOthRdtCIwTCOZLiIaVwt+PP4lBeoC2q/xpMML7EgCJnzLwTrW1yYxdnYdsJxvIon5vwgPrTT4EAxa3Khv+C7qkT8bxf6io09eIpDBd/WhZ8YEW5ZwhW8xbWCHxau9Jyg04oLz/EQjyKeYV5QPecfC+LeT90lF05ie4aBmHw6xp3Zu050YEOuQenCbqsurENNxVqLCxtxC6PYWVWgdKFbq403BL2m4vNerE8a/MJ1XMgwEjeni3RU+G8sYgK3cQ7+RNSxnKEeE9LXuAl3cQfbsBVb4B4eVGAce7KxxnCz1KCGzRWopTnj6seJPPkvhrmYqehLVdcAAAAASUVORK5CYII=">\
				<menupopup  id="showFlagS-set-popup">\
					<menuseparator id="showFlagS-sepalator1"/>\
					<menuitem label="显示本机IP" id="showFlagS-set-MyInfo" type="checkbox" oncommand="showFlagS.setPerfs(\'MyInfo\')" />\
					<menuitem label="自动重获取" id="showFlagS-set-Reacquire" tooltiptext="如果查询不到IP信息则再次查询" type="checkbox"  oncommand="showFlagS.setPerfs(\'Reacquire\')" />\
					<menuitem label="网站SEO信息" id="showFlagS-set-SeoInfo" tooltiptext="SeoInfo" type="checkbox"  oncommand="showFlagS.setPerfs(\'SeoInfo\')" />\
					<menuitem label="破解反外链" id="showFlagS-set-RefChanger" tooltiptext="破解图片反盗链" type="checkbox"  oncommand="showFlagS.setPerfs(\'RefChanger\')" />\
					<menuitem label="浏览器标识" id="showFlagS-set-UAChanger" tooltiptext="修改浏览器UserAgent" type="checkbox"  oncommand="showFlagS.setPerfs(\'UAChanger\')" />\
					<menuitem label="脚本菜单配置" id="showFlagS-set-setMenu" tooltiptext="左键：重载配置\r\n右键：编辑配置" onclick="if(event.button == 0){showFlagS.reload(true);}else if (event.button == 2) {showFlagS.command(\'Edit\');}" class="showFlagS menuitem-iconic" image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABYElEQVQ4jY3TO0/VQRAF8F9yTUB6QMCCZ6KJBq4JNIQKCkoopAWMsabhC1ho5SOYaO2j0AQ+gYKPS/BeaDD0kPhJLP7nbzZA0ElOsjvnzOzOziyX2yjO8Ds4i++/bRgdzAUdjFwVMIkNDASP8QuDwXF8Nb+RGHAdb3GC72jhIxZxLViMbx/fon2XWKv4inHcx6OaQH8A3eFWot3DmmT8jImipF48y21aeI6+gp9IzA+Ywmu0k7mBF9jBDKaxjZfhxqN9k1hULepgLI90gHvFic34BqJtR6tM0D6XYKrgJ/FT1ZFa+3cu7mALR6mtkf2n3KKZ9auihMPs79aPuIvbxYn9SbIfbOFGwd/CF1XbPVC1ZARL2XdFOIihrLuwjuVod/EQevBeNXmt1P8BC6ohamA+moNojqPpqa/UxCZuBk8iKkf5abihaMsuXbBh1UvPBm3/+EznbRSnqm9c49Lv/AcsoU6W+qo3pgAAAABJRU5ErkJggg=="/>\
				</menupopup>\
				</menu>\
				<menuseparator hidden="true" id="showFlagS-sepalator2"/>\
				</menupopup>\
				';
		let range = document.createRange();
		range.selectNodeContents(document.getElementById("mainPopupSet"));
		range.collapse(false);
		range.insertNode(range.createContextualFragment(xml.replace(/\n|\t/g, "")));
		range.detach();
	};

	showFlagS.reload = function(isAlert) {
		this.removeMenu();
		var aFile, data, errMsg,
			FlagLibData,
			err = [];
		aFile = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
		aFile.appendRelativePath('local');
		aFile.appendRelativePath('ShowFlagS');
		aFile.appendRelativePath('_showFlagS.js');
		if (aFile && aFile.exists() && aFile.isFile()) {
			this.isConfigFile = true;
			this.configFile = aFile;
			data = this.loadFile(aFile);
		} else {
			this.isConfigFile = false;
			errMsg = '配置文件不存在';
			err.push(errMsg);
			log(errMsg);
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
			errMsg = 'Error: ' + e + "\n请重新检查配置文件第 " + line + " 行";
			err.push(errMsg);
			log(errMsg);
		}

		if (this.isConfigFile) this.removeMenu(this.Menus);

		this.Perfs = sandbox.Perfs || {};
		this.TipShow = sandbox.TipShow || {};
		this.Menus = sandbox.Menus || {};
		this.ServerInfo = sandbox.ServerInfo || {};
		this.SourceAPI = sandbox.SourceAPI || {};
		this.MyInfo = sandbox.MyInfo || {};
		this.SeoInfo = sandbox.SeoInfo || {};
		this.UASites = sandbox.UASites || [];
		this.UAList = sandbox.UAList || [];
		this.RefererChange = sandbox.RefererChange || {};

		this.Perfs.showLocationPos = this.Perfs.showLocationPos ? this.Perfs.showLocationPos : 'identity-box';
		this.Inquiry_Delay = this.Perfs.Inquiry_Delay ? this.Perfs.Inquiry_Delay : 3500;
		this.libIconPath = this.Perfs.libIconPath ? this.Perfs.libIconPath : "Local\\ShowFlagS\\countryflags.js";
		this.LocalFlags = this.Perfs.LocalFlags ? this.Perfs.LocalFlags : "Local\\ShowFlagS\\LocalFlags\\";
		this.BAK_FLAG_PATH = this.Perfs.BAK_FLAG_PATH ? this.Perfs.BAK_FLAG_PATH : 'http://www.razerzone.com/asset/images/icons/flags/';
		this.DEFAULT_Flag = this.Perfs.DEFAULT_Flag ? this.Perfs.DEFAULT_Flag : this.DEFAULT_Flag;
		this.Unknown_Flag = this.Perfs.Unknown_Flag ? this.Perfs.Unknown_Flag : this.DEFAULT_Flag;
		this.File_Flag = this.Perfs.File_Flag ? this.Perfs.File_Flag : this.DEFAULT_Flag;
		this.Base64_Flag = this.Perfs.Base64_Flag ? this.Perfs.Base64_Flag : this.File_Flag;
		this.LocahHost_Flag = this.Perfs.LocahHost_Flag ? this.Perfs.LocahHost_Flag : this.DEFAULT_Flag;
		this.LAN_Flag = this.Perfs.LAN_Flag ? this.Perfs.LAN_Flag : this.DEFAULT_Flag;

		FlagLibData = this.getData(this.libIconPath);
		if (FlagLibData) {
			try {
				var lineFinder = new Error();
				Cu.evalInSandbox(FlagLibData, sandbox, "1.8");
			} catch (e) {
				let line = e.lineNumber - lineFinder.lineNumber - 1;
				errMsg = 'Error: ' + e + "\n请重新检查Lib文件第 " + line + " 行";
				err.push(errMsg);
			}
			this.CountryNames = sandbox.CountryNames || [];
			this.CountryFlags = sandbox.CountryFlags || [];
		}

		var tmp = {};
		tmp.label = "Firefox" + Services.appinfo.version.split(".")[0];
		tmp.ua = "";
		tmp.image = this.Perfs.DEFAULT_UA ? this.Perfs.DEFAULT_UA : this.DEFAULT_Flag;
		this.UAList.unshift(tmp);

		this.getPrefs();
		this.buildSiteMenu(this.SourceAPI);
		this.buildUserAgentMenu(this.UAList);
		this.buildFreedomMenu(this.Menus);
		this.addIcon(this.Perfs);
		this.uaMenuStates();

		if (this.UAList.length > 1) {
			for (let i = 0; i < this.UAList.length; i++) {
				this.UANameIdxHash[this.UAList[i].label] = i;
			}
			for (let j = 0; j < this.UASites.length; j++) {
				if (this.UANameIdxHash[this.UASites[j].label])
					this.UASites[j].idx = this.UANameIdxHash[this.UASites[j].label];
				else
					this.UASites[j].idx = this.def_uaIdx;
			}
			$("showFlagS-UserAgent-config").hidden = false;
		} else
			this.UAState = false;

		$("showFlagS-set-Reacquire").setAttribute('checked', this.isReacquire);
		$("showFlagS-set-MyInfo").setAttribute('checked', this.isMyInfo);
		$("showFlagS-set-RefChanger").setAttribute('checked', this.RfCState);
		$("showFlagS-set-SeoInfo").setAttribute('checked', this.isSeoInfo);
		$("showFlagS-set-UAChanger").setAttribute('checked', this.UAState);
		$("showFlagS-set-config").hidden = $("showFlagS-sepalator2").hidden = !this.isConfigFile;

		if (this.SourceAPI[0] && this.apiSite)
			$("showFlagS-apiSite-" + this.apiSite).setAttribute('checked', true);

		for (var i = 0; i < this.UAList.length; i++) {
			if (this.UAList[i].ua || this.UAList[i].ua == "") {
				if (this.UAList[i].ua == this.usingUA || this.UAList[i].ua == "")
					this.UAPerfAppVersion = this.uaAppVersion(i);
				break;
			}
		}

		this.siteApi = this.siteRex = null;
		this.FlagApi = this.FlagRex = null;
		if (this.isConfigFile && this.SourceAPI) {
			for (var i = 0; i < this.SourceAPI.length; i++) {
				if (this.SourceAPI[i].isJustFlag) return;
				if (this.SourceAPI[i].id == this.apiSite) {
					this.siteApi = this.SourceAPI[i].inquireAPI;
					this.siteRex = this.SourceAPI[i].regulation;
				}
				if (this.SourceAPI[i].isFlag) {
					this.FlagApi = this.SourceAPI[i].inquireAPI;
					this.FlagRex = this.SourceAPI[i].regulation;
				}
			}
		}

		this.onLocationChange();

		if (isAlert) {
			if (!errMsg)
				this.alert('配置已经重新载入');
			else {
				var MSG = [];
				MSG.push("ReLoad Error: ");
				MSG.push(err.join('\n'));
				MSG.push('请重新检查配置文件');
				this.alert(MSG.join('\n'));
			}
		}
	};

	showFlagS.getData = function(path, isSave) {
		var afile, data;
		path = path.replace(/\//g, '\\');
		if (/(\\)$/.test(path))
			path.substring(path.lastIndexOf("\\") + 1)
		afile = FileUtils.getFile("UChrm", path.split('\\'));
		if (afile && afile.exists() && afile.isFile())
			data = this.loadFile(afile);
		if (isSave)
			return afile;
		return data;
	};

	showFlagS.removeMenu = function(menu) {
		if (menu) {
			try {
				for (i in menu) {
					$("main-menubar").insertBefore($(menu[i].id), $("main-menubar").childNodes[7]);
				}
				delete menu;
			} catch (e) {
				log(e);
			}
		}

		let sites = document.querySelectorAll("menuitem[id^='showFlagS-apiSite-']");
		for (let i = 0; i < sites.length; i++) {
			sites[i].parentNode.removeChild(sites[i]);
		}
		delete sites;

		let usList = document.querySelectorAll("menuitem[id^='showFlagS-UserAgent-']");
		for (let i = 0; i < usList.length; i++) {
			usList[i].parentNode.removeChild(usList[i]);
		}
		delete usList;

		let uamenuseparator = document.querySelectorAll("menuseparator[id^='showFlagS-UserAgent-']");
		for (let i = 0; i < uamenuseparator.length; i++) {
			uamenuseparator[i].parentNode.removeChild(uamenuseparator[i]);
		}
		delete uamenuseparator;

		let menuitems = document.querySelectorAll("menuitem[id^='showFlagS-item-']");
		if (menuitems) {
			for (let i = 0; i < menuitems.length; i++) {
				menuitems[i].parentNode.removeChild(menuitems[i]);
			}
			delete menuitems;
		}

		let menus = document.querySelectorAll("menu[id^='showFlagS-menu-']");
		if (menus) {
			for (let i = 0; i < menus.length; i++) {
				menus[i].parentNode.removeChild(menus[i]);
			}
			delete menus;
		}

		var icon = $("showFlagS-icon");
		if (icon) icon.parentNode.removeChild(icon);
		delete icon;

		if (this.CountryNames) delete this.CountryNames;
		if (this.CountryFlags) delete this.CountryFlags;
	};

	showFlagS.onDestroy = function() {
		this.removeMenu(this.Menus);
		var os = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
		try {
			os.removeObserver(showFlagS.observe, "http-on-modify-request", false);
			os.removeObserver(showFlagS.onDocumentCreated, "content-document-global-created", false);
			window.getBrowser().removeProgressListener(window.showFlagS.progressListener);
		} catch (e) {}

		if (this.Perfs.showLocationPos == "identity-box")
			$("page-proxy-favicon").style.visibility = this.PPFaviconVisibility;

		var popup = $("showFlagS-popup");
		if (popup) popup.parentNode.removeChild(popup);
		delete popup;

		if (this.UANameIdxHash) delete this.UANameIdxHash;
		if (this.dnsCache) delete this.dnsCache;
		if (this.isReqHash) delete this.isReqHash;
		if (this.isReqHash_tooltip) delete this.isReqHash_tooltip;
		if (this.showFlagHash) delete this.showFlagHash;
		if (this.showFlagTooltipHash) delete this.showFlagTooltipHash;

		delete window.showFlagS;
		Services.appinfo.invalidateCachesOnRestart();
	};

	showFlagS.getPrefs = function() {
		this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Ci.nsIPrefService);
		this._prefs = this.prefs.getBranch("userChromeJS.showFlagS.");
		this._prefs.QueryInterface(Ci.nsIPrefBranch2);

		if (!this._prefs.prefHasUserValue("SourceSite") || this._prefs.getPrefType("SourceSite") != Ci.nsIPrefBranch.PREF_STRING)
			this._prefs.setCharPref("SourceSite", (this.SourceAPI ? (this.SourceAPI[0] ? this.SourceAPI[0].id : "") : ""));

		if (!this._prefs.prefHasUserValue("MyInfo") || this._prefs.getPrefType("MyInfo") != Ci.nsIPrefBranch.PREF_BOOL)
			this._prefs.setBoolPref("MyInfo", false);

		if (!this._prefs.prefHasUserValue("SeoInfo") || this._prefs.getPrefType("SeoInfo") != Ci.nsIPrefBranch.PREF_BOOL)
			this._prefs.setBoolPref("SeoInfo", false);

		if (!this._prefs.prefHasUserValue("Reacquire") || this._prefs.getPrefType("Reacquire") != Ci.nsIPrefBranch.PREF_BOOL)
			this._prefs.setBoolPref("Reacquire", false);

		if (!this._prefs.prefHasUserValue("RefChanger") || this._prefs.getPrefType("RefChanger") != Ci.nsIPrefBranch.PREF_BOOL)
			this._prefs.setBoolPref("RefChanger", true);

		if (!this._prefs.prefHasUserValue("UAChanger") || this._prefs.getPrefType("UAChanger") != Ci.nsIPrefBranch.PREF_BOOL)
			this._prefs.setBoolPref("UAChanger", true);

		this.apiSite = this._prefs.getCharPref("SourceSite");
		this.isMyInfo = this._prefs.getBoolPref("MyInfo");
		this.isSeoInfo = this._prefs.getBoolPref("SeoInfo");
		this.isReacquire = this._prefs.getBoolPref("Reacquire");
		this.RfCState = this._prefs.getBoolPref("RefChanger");
		this.UAState = this._prefs.getBoolPref("UAChanger");
	};

	showFlagS.setPerfs = function(type, val) {
		if (type == "apiSite") {
			this.apiSite = val;
			this._prefs.setCharPref("SourceSite", this.apiSite);
			$("showFlagS-apiSite-" + this.apiSite).setAttribute('checked', true);
			this.onLocationChange('Flags');
			return;
		}
		if (type == "MyInfo") {
			this.isMyInfo = !this.isMyInfo;
			this._prefs.setBoolPref("MyInfo", this.isMyInfo);
			$("showFlagS-set-MyInfo").setAttribute('checked', this.isMyInfo);
			this.onLocationChange('Flags');
			return;
		}
		if (type == "SeoInfo") {
			this.isSeoInfo = !this.isSeoInfo;
			this._prefs.setBoolPref("SeoInfo", this.isSeoInfo);
			$("showFlagS-set-SeoInfo").setAttribute('checked', this.isSeoInfo);
			this.onLocationChange('Flags');
			return;
		}
		if (type == "Reacquire") {
			this.isReacquire = !this.isReacquire;
			this._prefs.setBoolPref("Reacquire", this.isReacquire);
			$("showFlagS-set-Reacquire").setAttribute('checked', this.isReacquire);
			return;
		}
		if (type == "RefChanger") {
			this.RfCState = !this.RfCState;
			this._prefs.setBoolPref("RefChanger", this.RfCState);
			$("showFlagS-set-RefChanger").setAttribute('checked', this.RfCState);
			return;
		}
		if (type == "UAChanger") {
			this.UAState = !this.UAState;
			this._prefs.setBoolPref("UAChanger", this.UAState);
			$("showFlagS-set-UAChanger").setAttribute('checked', this.UAState);
			$("showFlagS-UserAgent-config").hidden = !this.UAState;
			return;
		}
		if (type == "UA") {
			if (val == 0) {
				if (this.prefs.getBranch("").getPrefType("general.useragent.override") == 0 && this.prefs.getBranch("").getPrefType("general.platform.override") == 0) return;
				this.prefs.getBranch("").clearUserPref("general.useragent.override");
				this.prefs.getBranch("").clearUserPref("general.platform.override");
				this.UAPerfAppVersion = false;
			} else {
				this.prefs.getBranch("").setCharPref("general.useragent.override", this.UAList[val].ua);
				this.UAPerfAppVersion = this.uaAppVersion(val);

				var platform = this.getPlatformString(this.UAList[val].ua);
				if (platform && platform != "")
					this.prefs.getBranch("").setCharPref("general.platform.override", platform);
				else
					this.prefs.getBranch("").clearUserPref("general.platform.override");
			}
			this.def_uaIdx = val;
			this.uaMenuStates(val);
			return;
		}
	};

	showFlagS.uaMenuStates = function(idx) {
		var usingUAIdx;
		for (var j = 0; j < this.UAList.length; j++) {
			if (this.UAList[j].ua || this.UAList[j].ua == "") {
				if (this.UAList[j].ua == this.usingUA || this.UAList[j].ua == "")
					usingUAIdx = j;
				$("showFlagS-UserAgent-" + j).setAttribute("style", 'font-weight: normal;');
				$("showFlagS-UserAgent-" + j).style.color = 'black';
			}
		}
		if (idx || typeof(usingUAIdx) != 'undefined') {
			var i = idx || usingUAIdx;
			$("showFlagS-UserAgent-" + i).setAttribute("style", 'font-weight: bold;');
			$("showFlagS-UserAgent-" + i).style.color = 'brown';
			$("showFlagS-UserAgent-config").setAttribute("label", this.UAList[i].label);
			$("showFlagS-UserAgent-config").setAttribute("image", this.UAList[i].image);
			$("showFlagS-UserAgent-config").style.padding = "0px 2px";
			this.Current_idx = i;
		} else {
			$("showFlagS-UserAgent-config").setAttribute("label", "未知UserAgent");
			$("showFlagS-UserAgent-config").setAttribute("tooltiptext", this.usingUA);
			$("showFlagS-UserAgent-config").setAttribute("image", null);
		}
	};

	/*****************************************************************************************/
	showFlagS.observe = function(subject, topic, data) {
		var that = showFlagS,
			http = subject.QueryInterface(Ci.nsIHttpChannel);

		if (that.UAState) {
			var ua = that.adjustUA("userAgent", http);
			if (ua) http.setRequestHeader("User-Agent", ua, false);
		}

		if (!that.RfCState) return;

		for (var s = http.URI.host; s != ""; s = s.replace(/^.*?(\.|$)/, "")) {
			if (that.adjustRef(http, s))
				return;
		}

		if (http.referrer && http.referrer.host != http.originalURI.host)
			http.setRequestHeader('Referer', http.originalURI.spec.replace(/[^/]+$/, ''), false);
	};

	showFlagS.adjustUA = function(type, http) {
		var uri, val, userAgent, appVersion;
		if (type == "userAgent") {
			if (!http.URI) return;
			uri = http.URI.spec;
			for (var i = 0; i < this.UASites.length; i++) {
				if ((new RegExp(this.UASites[i].url)).test(uri)) {
					ua = this.UAList[this.UASites[i].idx].ua;
					return ua;
					break;
				}
			}
		}
		if (type == "appVersion") {
			if (!http.location) return;
			uri = http.location.href;
			for (var i = 0; i < this.UASites.length; i++) {
				if ((new RegExp(this.UASites[i].url)).test(uri)) {
					appVersion = this.uaAppVersion(this.UASites[i].idx);
					return appVersion;
					break;
				}
			}
		}
		return;
	};

	showFlagS.onDocumentCreated = function(aSubject, aTopic, aData) {
		var aChannel = aSubject.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIWebNavigation).QueryInterface(Ci.nsIDocShell).currentDocumentChannel;
		if (aChannel instanceof Ci.nsIHttpChannel) {
			var navigator = aSubject.navigator;
			try {
				var userAgent = aChannel.getRequestHeader('User-Agent');
			} catch (e) {}
			var that = showFlagS;
			if (userAgent && navigator.userAgent != userAgent) {
				Object.defineProperty(XPCNativeWrapper.unwrap(navigator), 'userAgent', {
					value: userAgent,
					enumerable: true
				});
				var platform = that.getPlatformString(userAgent);
				if (platform && platform != '') {
					Object.defineProperty(XPCNativeWrapper.unwrap(navigator), 'platform', {
						value: platform,
						enumerable: true
					});
				}
			}

			var appVersion = that.adjustUA("appVersion", aSubject);
			if (appVersion || that.UAPerfAppVersion) {
				var appVersion = appVersion || that.UAPerfAppVersion;
				Object.defineProperty(XPCNativeWrapper.unwrap(navigator), 'appVersion', {
					value: appVersion,
					enumerable: true
				});
			}
		}
	};

	showFlagS.getPlatformString = function(userAgent) {
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
	};

	showFlagS.uaAppVersion = function(idx) {
		if (!idx) return;
		var obj = this.UAList[idx],
			appVersion = false;
		if (obj.appVersion) {
			if (typeof(obj.appVersion) == 'boolean')
				appVersion = obj.ua.replace(/^Mozilla\//, '');
			else if (typeof(obj.appVersion) == 'string')
				appVersion = obj.appVersion;
			else appVersion = false;
		}
		return appVersion;
	};

	showFlagS.adjustRef = function(http, site) {
		try {
			var sRef;
			var refAction = undefined;
			for (var i in this.RefererChange) {
				if (site.indexOf(i) != -1) {
					refAction = this.RefererChange[i];
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
						sRef = http.URI.scheme + "://" + http.URI.hostPort + "/";
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
			http.setRequestHeader("Referer", sRef, false);
			if (http.referrer)
				http.referrer.spec = sRef;
			return true;
		} catch (e) {}
		return true;
	};

	/*****************************************************************************************/
	showFlagS.onLocationChange = function(forceRefresh) {
		var isUAChange;
		for (var i = 0; i < this.UASites.length; i++) {
			if ((new RegExp(this.UASites[i].url)).test(this.currentURI.spec)) {
				var idx = this.UASites[i].idx;
				isUAChange = idx;
				this.uaMenuStates(idx);
			}
		}
		if (!isUAChange) this.uaMenuStates(this.def_uaIdx);

		if (forceRefresh)
			this.forceRefresh = true;

		var aLocation = this.currentURI;
		try {
			if (this.Perfs.showLocationPos == 'identity-box') {
				if ((aLocation.scheme !== "about") && (aLocation.scheme !== "chrome"))
					$('page-proxy-favicon').style.visibility = 'collapse';
				else
					$('page-proxy-favicon').style.visibility = 'visible';
				this.icon.hidden = ((aLocation.scheme == "about") || (aLocation.scheme == "chrome"));
			}
			if (aLocation && /file/.test(aLocation.scheme)) {
				this.icon.src = this.icon.image = this.File_Flag;
				this.icon.tooltipText = '本地文件' + "\n" + aLocation.spec;
				return;
			}
			if (aLocation && /data/.test(aLocation.scheme)) {
				this.icon.src = this.icon.image = this.Base64_Flag;
				this.icon.tooltipText = 'Base64编码文件';
				return;
			}
			if (aLocation.host && /tp/.test(aLocation.scheme)) {
				this.updateState(aLocation);
				return;
			}
			this.resetState();
		} catch (e) {
			this.resetState();
		}
	};

	showFlagS.updateState = function(aLocation) {
		var host = aLocation.host;
		if (!this.forceRefresh && this.dnsCache[host]) {
			this.lookupIP(this.dnsCache[host], host);
			return;
		}
		if (aLocation.host == "127.0.0.1" || aLocation.host == "localhost") {
			var obj = {};
			showFlagS.serverInfoTip(function(inifo) {
				obj.ServerInfo = inifo;
				obj.SiteInfo = '回送地址:本机服务器';
				showFlagS.updateTooltipText("127.0.0.1", host, obj);
			});
			showFlagS.icon.src = showFlagS.icon.image = showFlagS.LocahHost_Flag;
			showFlagS.icon.hidden = false;
			if (showFlagS.Perfs.showLocationPos == 'identity-box') {
				if (aLocation.scheme !== 'https')
					$('page-proxy-favicon').style.visibility = 'collapse';
				else
					$('page-proxy-favicon').style.visibility = 'visible';
			}
			return;
		}
		var dns_listener = {
			onLookupComplete: function(request, nsrecord, status) {
				var s_ip;
				if (status != 0 || !nsrecord.hasMore())
					s_ip = "0";
				else
					s_ip = nsrecord.getNextAddrAsString();
				showFlagS.dnsCache[host] = s_ip;
				showFlagS.lookupIP(s_ip, host);
			}
		};
		try {
			this.dns.asyncResolve(host, 0, dns_listener, this.eventqueue);
		} catch (e) {}

		this.resetState();
	};

	showFlagS.resetState = function() {
		this.icon.src = this.icon.image = this.DEFAULT_Flag;
		this.icon.tooltipText = '';
		if (this.Perfs && this.Perfs.showLocationPos == 'identity-box') {
			this.icon.hidden = true;
			$('page-proxy-favicon').style.visibility = 'visible';
		}
	};

	/*****************************************************************************************/
	showFlagS.lookupIP = function(ip, host) {
		var self = showFlagS;
		if (ip == "0") {
			self.showFlagHash[host] = 'UnknownFlag';
			self.updateIcon(host, self.showFlagHash[host]);
			var doc = self.currentURI.spec;
			var obj = {};
			obj.SiteInfo = '错误类型：' + doc.substring(doc.indexOf("=") + 1, doc.indexOf("&")) + '\n' + '详细描述：' + decodeURI(doc.substring(doc.lastIndexOf("=") + 1));
			self.showFlagTooltipHash[host] = obj;
			self.updateTooltipText(ip, host, self.showFlagTooltipHash[host]);
			return;
		}
		if (/^192.168.|169.254./.test(ip) || ip == "127.0.0.1" || ip == "::1") {
			var src;
			if (/^192.168.|169.254./.test(ip))
				src = self.LAN_Flag;
			else
				src = self.LocahHost_Flag;
			self.icon.src = self.icon.image = src;
			self.icon.hidden = false;
			if (self.Perfs.showLocationPos == 'identity-box') {
				if (self.currentURI.scheme !== 'https')
					$('page-proxy-favicon').style.visibility = 'collapse';
				else
					$('page-proxy-favicon').style.visibility = 'visible';
			}
		}

		function flagFunc(checkCache, ip, host) {
			if (/^192.168.|169.254./.test(ip) || ip == "127.0.0.1" || ip == "::1") return;
			if (checkCache && self.showFlagHash[host]) {
				if (self.showFlagHash[host] == 'UnknownFlag' && self.isReacquire)
					self.isReqHash[host] = false;
				else {
					self.updateIcon(host, self.showFlagHash[host]);
					return;
				}
			}
			if (checkCache && self.isReqHash[host]) return;
			self.isReqHash[host] = true;
			if (self.FlagApi == self.siteApi) return;
			if (self.FlagApi)
				self.lookupIP_Flag(ip, host, self.FlagApi, self.FlagRex);
			else
				self.lookupIP_taobao(ip, host, null, "Flag");
		}

		function tooltipFunc(checkCache, ip, host) {
			if (checkCache && self.showFlagTooltipHash[host]) {
				if (self.showFlagTooltipHash[host].UnknownFlag && self.isReacquire)
					self.isReqHash_tooltip[host] = false;
				else {
					self.updateTooltipText(ip, host, self.showFlagTooltipHash[host]);
					return;
				}
			}
			if (checkCache && self.isReqHash_tooltip[host]) return;
			self.isReqHash_tooltip[host] = true;
			var obj = {};
			if (/^(about:neterror)/.test(self.currentURI.spec)) {
				var doc = self.currentURI.spec;
				obj.SiteInfo = '错误类型：' + doc.substring(doc.indexOf("=") + 1, doc.indexOf("&")) + '\n' + '详细描述：' + decodeURI(doc.substring(doc.lastIndexOf("=") + 1));
				self.showFlagTooltipHash[host] = obj;
				self.updateTooltipText(ip, host, self.showFlagTooltipHash[host]);
				return;
			}
			self.serverInfoTip(function(info) {
				obj.ServerInfo = info;
				if (/^192.168.|169.254./.test(ip) || ip == "127.0.0.1" || ip == "::1") {
					if (/^192.168.|169.254./.test(ip))
						obj.SiteInfo = '本地局域网服务器';
					else
						obj.SiteInfo = '回送地址：本机[服务器]';
					self.showFlagTooltipHash[host] = obj;
					self.updateTooltipText(ip, host, self.showFlagTooltipHash[host]);
					return;
				}

				function callback(info, Thx) {
					obj.SiteInfo = info;
					obj.SiteInfoThx = Thx;
					self.showFlagTooltipHash[host] = obj;


					function seoinfo(info, Thx) {
						obj.MyInfo = info;
						obj.MyInfoThx = Thx;
						self.showFlagTooltipHash[host] = obj;

						if (!self.SeoInfo.inquireAPI || !self.isSeoInfo) {
							self.updateTooltipText(ip, host, self.showFlagTooltipHash[host]);
							return;
						}

						self.lookup_SeoInfo(self.SeoInfo.inquireAPI, host, function(seoInfo, seoInfoThx) {
							self.showFlagTooltipHash[host].SeoInfo = seoInfo;
							if (seoInfoThx)
								self.showFlagTooltipHash[host].SeoInfoThx = seoInfoThx;
							self.updateTooltipText(ip, host, self.showFlagTooltipHash[host]);
						});
					}
					self.lookup_Myinfo(self.MyInfo.inquireAPI, host, seoinfo);
				}
				if (self.siteApi)
					self.lookupIP_SiteInfo(ip, host, self.siteApi, self.siteRex, callback);
				else
					self.lookupIP_taobao(ip, host, callback, "All");
			});
		}
		flagFunc(!self.forceRefresh, ip, host);
		tooltipFunc(!self.forceRefresh, ip, host);
		self.forceRefresh = false;
	};

	showFlagS.updateIcon = function(host, countryCode, countryName) {
		try {
			var currentURIhost = this.currentURI.host;
		} catch (e) {}
		if (!currentURIhost || host != currentURIhost) return this.resetState('Flags');

		this.icon.hidden = false;
		var src;
		if (countryCode === 'iana' || countryCode === 'UnknownFlag') {
			src = this.Unknown_Flag;
		} else {
			src = this.CountryFlags ? (this.getFlagFoxIconPath(countryCode) || this.CountryFlags[countryCode]) : this.getFlagFoxIconPath(countryCode);
			if (!src && this.CountryFlags && countryName) {
				contryCode = this.CountryNames && this.CountryNames[countryName];
				if (contryCode in this.CountryFlags) {
					src = this.CountryFlags[contryCode];
					this.showFlagHash[host] = contryCode;
				}
			}
			src = src || (this.BAK_FLAG_PATH + countryCode + ".gif") || this.Unknown_Flag;

		}
		this.icon.src = this.icon.image = src;
		if (this.Perfs.showLocationPos == 'identity-box') {
			if (this.currentURI.scheme !== 'https')
				$('page-proxy-favicon').style.visibility = 'collapse';
			else
				$('page-proxy-favicon').style.visibility = 'visible';
			if (src) $('page-proxy-favicon').style.visibility = 'collapse';
			else this.icon.hidden = true;
		}
	};

	showFlagS.updateTooltipText = function(ip, host, obj) {
		try {
			var currentURIhost = this.currentURI.host;
		} catch (e) {}
		if (!currentURIhost || host != currentURIhost) return this.resetState('Flags');

		var tipArrHost = this.TipShow.tipArrHost ? this.TipShow.tipArrHost : "Host：",
			tipArrIP = this.TipShow.tipArrIP ? this.TipShow.tipArrIP : "IP：",
			tipArrSep0 = this.TipShow.tipArrSep0 ? this.TipShow.tipArrSep0 : "",
			//服务器信息	ServerInfo
			tipArrSep1 = this.TipShow.tipArrSep1 ? this.TipShow.tipArrSep1 : "",
			//网站IP信息
			tipArrSep2 = this.TipShow.tipArrSep2 ? this.TipShow.tipArrSep2 : "",
			//我的信息	MyInfo
			tipArrSep3 = this.TipShow.tipArrSep3 ? this.TipShow.tipArrSep3 : "",
			//网站SEO信息 SeoInfo
			tipArrSep4 = this.TipShow.tipArrSep4 ? this.TipShow.tipArrSep4 : "",
			tipArrThanks = this.TipShow.tipArrThanks ? this.TipShow.tipArrThanks : "Thk：";

		var tooltipArr = [];
		obj || (obj = {});
		if (this.showFlagHash[host] && !obj.UnknownFlag && this.showFlagHash[host] !== 'UnknownFlag')
			obj.FlagThx = this.Thx(this.FlagApi) || this.Thx("http://ip.taobao.com/service/getIpInfo.php?ip=");

		if (obj.UnknownFlag && obj.UnknownFlag !== "") {
			tooltipArr.push(obj.UnknownFlag);
			tooltipArr.push(tipArrSep3);
		}

		tooltipArr.push(tipArrHost + host);
		tooltipArr.push(tipArrIP + ip);


		if (obj.ServerInfo && obj.ServerInfo !== "") {
			if (tipArrSep0) tooltipArr.push(tipArrSep0);
			tooltipArr.push(obj.ServerInfo);
		}


		if (obj.SiteInfo && obj.SiteInfo !== "") {
			if (tipArrSep1) tooltipArr.push(tipArrSep1);
			tooltipArr.push(obj.SiteInfo);
		}

		if (this.MyInfo && this.isMyInfo && obj.MyInfo) {
			if (tipArrSep2) tooltipArr.push(tipArrSep2);
			tooltipArr.push(obj.MyInfo);
		}

		if (this.SeoInfo && this.isSeoInfo && obj.SeoInfo) {
			if (tipArrSep3) tooltipArr.push(tipArrSep3);
			tooltipArr.push(obj.SeoInfo);
		}

		var thx = [];
		if (obj.SiteInfoThx)
			thx.push(obj.SiteInfoThx)
		if (obj.FlagThx && obj.FlagThx !== obj.SiteInfoThx)
			thx.push(obj.FlagThx)
		if (obj.MyInfoThx && obj.MyInfoThx !== obj.SiteInfoThx)
			thx.push(obj.MyInfoThx)
		if (obj.SeoInfoThx && obj.SeoInfoThx !== obj.SiteInfoThx)
			thx.push(obj.SeoInfoThx)
		if (thx.join('\n') !== "") {
			if (tipArrSep4) tooltipArr.push(tipArrSep4);
			tooltipArr.push(tipArrThanks + new String(thx));
		}

		this.icon.tooltipText = tooltipArr.join('\n');
	};

	/*****************************************************************************************/
	showFlagS.lookup_Myinfo = function(api, host, callback) {
		var self = showFlagS;
		var myinfo;

		if (!self.MyInfo.inquireAPI || !self.isMyInfo) {
			callback(myinfo);
			return;
		}

		var req = new XMLHttpRequest();
		req.open("GET", api, true);
		req.send(null);
		var onerror = function() {
			myinfo = null;
			callback(myinfo);
		};
		req.onerror = onerror;
		req.timeout = self.Inquiry_Delay;
		req.ontimeout = onerror;
		req.onload = function() {
			if (req.status == 200) {
				myinfo = self.MyInfo.regulation(req.responseText);
				if (myinfo) {
					callback(myinfo, self.Thx(api));
				} else {
					onerror();
				}
			} else {
				onerror();
			}
		};
	};

	showFlagS.lookup_SeoInfo = function(api, host, callback) {
		var self = showFlagS;
		var SeoInfo;
		var req = new XMLHttpRequest();
		req.open("GET", api + host, true);
		req.send(null);
		var onerror = function() {
			SeoInfo = null;
			callback(SeoInfo);
		};
		req.onerror = onerror;
		req.timeout = self.Inquiry_Delay;
		req.ontimeout = onerror;
		req.onload = function() {
			if (req.status == 200) {
				SeoInfo = self.SeoInfo.regulation(req.responseText);
				if (SeoInfo) {
					callback(SeoInfo, self.Thx(api));
				} else {
					onerror();
				}
			} else {
				onerror();
			}
		};
	};

	showFlagS.lookupIP_SiteInfo = function(ip, host, api, rex, callback) {
		var self = showFlagS;
		var req = new XMLHttpRequest();
		req.open("GET", api + ip, true);
		req.send(null);
		var onerror = function() {
			if (self.FlagApi == api)
				self.lookupIP_taobao(ip, host, callback, "All");
			else
				self.lookupIP_taobao(ip, host, callback, "Tip");
		};
		req.onerror = onerror;
		req.timeout = self.Inquiry_Delay;
		req.ontimeout = onerror;
		req.onload = function() {
			if (req.status == 200) {
				var info = rex(req.responseText);
				if (info) {
					if (self.FlagApi == api) {
						self.showFlagHash[host] = info.countryCode || null;
						self.updateIcon(host, info.countryCode, info.countryName);
					}
					callback(info.SiteInfo, self.Thx(api));
				} else {
					onerror();
				}
			} else {
				onerror();
			}
		};
	};

	showFlagS.lookupIP_Flag = function(ip, host, api, rex) {
		var self = showFlagS;
		var req = new XMLHttpRequest();
		req.open("GET", api + ip, true);
		req.send(null);
		var onerror = function() {
			self.lookupIP_taobao(ip, host, null, "Flag");
		};
		req.onerror = onerror;
		req.timeout = self.Inquiry_Delay;
		req.ontimeout = onerror;
		req.onload = function() {
			if (req.status == 200) {
				var info = rex(req.responseText);
				if (info) {
					self.showFlagHash[host] = info.countryCode;
					self.updateIcon(host, info.countryCode, info.countryName);
				} else {
					onerror();
				}
			} else {
				onerror();
			}
		};
	};

	showFlagS.lookupIP_taobao = function(ip, host, callback, other) {
		var self = showFlagS;
		var api = 'http://ip.taobao.com/service/getIpInfo.php?ip=';
		var req = new XMLHttpRequest();
		req.open("GET", api + ip, true);
		req.send(null);
		var onerror = function() {
			self.showFlagHash[host] = 'UnknownFlag';
			self.updateIcon(host, self.showFlagHash[host]);
			if (!self.showFlagTooltipHash[host]) self.showFlagTooltipHash[host] = {};
			self.showFlagTooltipHash[host].UnknownFlag = '无法获取国家代码，请刷新！';
			self.updateTooltipText(ip, host, self.showFlagTooltipHash[host]);
			return;
		};
		req.onerror = onerror;
		req.timeout = self.Inquiry_Delay;
		req.ontimeout = onerror;
		req.onload = function() {
			if (req.status == 200) {
				var responseObj = JSON.parse(req.responseText);
				if (responseObj.code == 0) {
					var country_id = responseObj.data.country_id.toLocaleLowerCase();
					var addr = responseObj.data.country + responseObj.data.area;
					if (responseObj.data.region || responseObj.data.city || responseObj.data.county || responseObj.data.isp)
						addr = addr + '\n' + responseObj.data.region + responseObj.data.city + responseObj.data.county + responseObj.data.isp;
					if (other == "Flag" || other == "All") {
						self.showFlagHash[host] = country_id;
						self.updateIcon(host, country_id, responseObj.data.country);
					}
					if (other == "Tip" || other == "All") {
						callback(addr, self.Thx(api));
					}
				} else {
					onerror();
				}
			}
		};
	};

	showFlagS.serverInfoTip = function(callback) {
		var sTip = [];
		for (var i = 0; i < this.ServerInfo.length; i++) {
			var tip = this.getServInformation(this.ServerInfo[i].words);
			if (this.ServerInfo[i].regx) tip = this.ServerInfo[i].regx(tip);

			if (tip)
				sTip.push(this.ServerInfo[i].label + tip);
		}
		callback(sTip.join('\n'));
	};

	/*****************************************************************************************/
	showFlagS.getServInformation = function(words) {
		var word;
		try {
			word = gBrowser.mCurrentBrowser.webNavigation.currentDocumentChannel.QueryInterface(Ci.nsIHttpChannel).getResponseHeader(words).split("\n", 1)[0];
		} catch (e) {}
		return word || null;
	};

	showFlagS.getFlagFoxIconPath = function(filename) {
		this.LocalFlags = this.LocalFlags.replace(/\//g, '\\');
		if (!/(\\)$/.test(this.LocalFlags))
			this.LocalFlags = this.LocalFlags + '\\';
		var file = FileUtils.getFile("UChrm", (this.LocalFlags + filename + ".png").split('\\'));
		if (file.exists()) return "file:///" + file.path;
	};

	showFlagS.Thx = function(api) {
		if (!api) return;
		var Service = Cc["@mozilla.org/network/effective-tld-service;1"].getService(Ci.nsIEffectiveTLDService);
		var uri = makeURI(api);
		var thx = Service.getBaseDomain(uri).replace(Service.getPublicSuffix(uri), "").replace('.', "");
		return thx || null;
	};

	/*****************************************************************************************/
	showFlagS.command = function(type, url, arg0, arg1, arg2, arg3, arg4) {
		if (type == "Post")
			this.postData(url, arg0, arg1);
		else if (type == "Action")
			this.openAction(url, arg0, arg1, arg2, arg3, arg4);
		else if (type == "Copy")
			this.copy(url);
		else if (type == "Edit")
			this.editFile(url);
		else
			this.openTab(type, url, arg0, arg1, arg2, arg3, arg4);
	};

	showFlagS.copy = function(str) {
		if (!str) str = this.icon.tooltipText;
		Cc['@mozilla.org/widget/clipboardhelper;1'].createInstance(Ci.nsIClipboardHelper).copyString(str);
	};

	showFlagS.openTab = function(url, urlt, arg0, arg1, arg2, arg3, arg4) {
		if (url)
			url = this.readOpenArg(url);
		else
			return;
		if (urlt = this.readOpenArg(urlt))
			url += urlt;

		if (arg0 = this.readOpenArg(arg0))
			url += arg0;

		if (arg1 = this.readOpenArg(arg1))
			url += arg1;

		if (arg2 = this.readOpenArg(arg2))
			url += arg2;

		if (arg3 = this.readOpenArg(arg3))
			url += arg3;

		if (arg4 = this.readOpenArg(arg4))
			url += arg4;

		gBrowser.selectedTab = gBrowser.addTab(url);
	};

	showFlagS.postData = function(aURI, aPostData) {

		var stringStream = Cc["@mozilla.org/io/string-input-stream;1"].
		createInstance(Ci.nsIStringInputStream);
		if ("data" in stringStream)
			stringStream.data = aPostData;
		else
			stringStream.setData(aPostData, aPostData.length);

		var postData = Cc["@mozilla.org/network/mime-input-stream;1"].
		createInstance(Ci.nsIMIMEInputStream);
		postData.addHeader("Content-Type", "application/x-www-form-urlencoded");
		postData.addContentLength = true;
		postData.setData(stringStream);

		gBrowser.loadOneTab(aURI, null, null, postData, false);
	};

	showFlagS.openAction = function(url, fId, val, bId, bClass) {
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

		var contentScript = wrap.getElement(fId) + ".value = " + wrap.quotes(this.readOpenArg(val)) + ";";
		if (bId)
			contentScript += wrap.delay(wrap.getElement(bId) + ".click();")
		else if (bClass)
			contentScript += wrap.delay(wrap.getElementC(bClass) + ".click();")
		contentScript = "data:text/javascript," + encodeURIComponent(wrap.doOnLoad(contentScript));

		var targetBrowser = openURL(url);
		targetBrowser.messageManager.loadFrameScript(contentScript, false);
	};

	showFlagS.readOpenArg = function(str) {
		var uri = this.currentURI,
			ip = this.dnsCache[uri.host];

		if (str == 'host')
			str = uri.host;

		if (str == 'ip' && ip)
			str = ip;

		if (str == "basedomain") {
			var eTLDService = Components.classes["@mozilla.org/network/effective-tld-service;1"].
			getService(Components.interfaces.nsIEffectiveTLDService);
			var basedomain = eTLDService.getBaseDomain(makeURI(uri.spec));
			str = basedomain;
		}

		if (str == 'url')
			str = uri.spec;

		return str;
	};

	showFlagS.editFile = function(file) {
		var aFile;
		if (file) {
			aFile = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIDirectoryService).QueryInterface(Ci.nsIProperties).get('UChrm', Ci.nsILocalFile);
			aFile.appendRelativePath(file);
		} else aFile = this.configFile;
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
	};

	/*****************************************************************************************/
	showFlagS.addIcon = function(iconPref) {
		if (iconPref.showLocationPos == 'identity-box' || iconPref.showLocationPos == 'urlbar-icons') {
			this.icon = $(iconPref.showLocationPos).appendChild($C('image' /*statusbarpanel*/ , {
				id: 'showFlagS-icon',
				//class:"statusbarpanel-iconic",
				context: 'showFlagS-popup'
			}));
		} else {
			this.icon = $(iconPref.showLocationPos).appendChild($C("toolbarbutton", {
				id: "showFlagS-icon",
				class: "toolbarbutton-1 chromeclass-toolbar-additional",
				removable: true,
				context: "showFlagS-popup",
			}));
		}

		this.icon.style.marginLeft = iconPref.mLeft || "4px";
		this.icon.style.marginRight = iconPref.mRight || "2px";

		if (iconPref.wid)
			this.icon.style.width = iconPref.wid;
		if (iconPref.heig)
			this.icon.style.height = iconPref.heig;

		this.icon.src = this.icon.image = this.DEFAULT_Flag;

		this.icon.addEventListener("click", function(event) {
			if (event.button == 0) {
				showFlagS.command('Copy');
			} else if (event.button == 1) {
				showFlagS.onLocationChange('Flags');
			}
		}, false);
	};

	showFlagS.buildSiteMenu = function(siteSource) {
		var menu = $("showFlagS-set-popup");
		for (var i = 0; i < siteSource.length; i++) {
			if (siteSource[i].isJustFlag) return;
			var menuitem = menu.appendChild($C("menuitem", {
				label: siteSource[i].label,
				id: "showFlagS-apiSite-" + siteSource[i].id,
				class: "showFlagS-apiSite-item",
				type: "radio",
				oncommand: "showFlagS.setPerfs('apiSite','" + siteSource[i].id + "');"
			}));
			menu.insertBefore(menuitem, $("showFlagS-sepalator1"));
		};
	};

	showFlagS.buildUserAgentMenu = function(UAList) {
		var menu = $("showFlagS-UserAgent-popup"),
			menuitem;
		for (var i = 0; i < UAList.length; i++) {
			if (UAList[i].label === "separator" || (!UAList[i].label && !UAList[i].id && !UAList[i].ua))
				menuitem = menu.appendChild($C("menuseparator", {
					id: "showFlagS-UserAgent-" + i,
					class: "showFlagS-UserAgent-menuseparator",
				}));
			else {
				menuitem = menu.appendChild($C("menuitem", {
					label: UAList[i].label,
					id: "showFlagS-UserAgent-" + i,
					class: "showFlagS-UserAgent-item",
					image: UAList[i].image,
					tooltiptext: UAList[i].ua,
					oncommand: "showFlagS.setPerfs('UA','" + i + "');"
				}));

				var cls = menuitem.classList;
				cls.add("showFlagS");
				cls.add("menuitem-iconic");
			}
			//menu.insertBefore(menuitem, $("showFlagS-sepalator3"));
			menu.appendChild(menuitem);
		};
	};

	showFlagS.buildFreedomMenu = function(menu) {
		var popup = $("showFlagS-popup");
		var obj, menuitem;
		for (var i = 0; i < menu.length; i++) {
			obj = menu[i];
			menuitem = $(obj.id);
			if (menuitem) {
				for (let [key, val] in Iterator(obj)) {
					if (typeof val == "function") obj[key] = val = "(" + val.toSource() + ").call(this, event);";
					menuitem.setAttribute(key, val);
				}
				menuitem.classList.add("showFlagS");
				menuitem.classList.add("menu-iconic");
			} else {
				menuitem = obj.child ? this.newMenu(obj, i) : this.newMenuitem(obj, i);
			}
			popup.appendChild(menuitem);
		}
	};

	showFlagS.newMenu = function(menuObj, i) {
		var menu = document.createElement("menu");
		var popup = menu.appendChild(document.createElement("menupopup"));
		for (let [key, val] in Iterator(menuObj)) {
			if (key === "child") continue;
			if (typeof val == "function") menuObj[key] = val = "(" + val.toSource() + ").call(this, event);"
			menu.setAttribute(key, val);
			menu.setAttribute("id", "showFlagS-menu-" + i);
		}

		menuObj.child.forEach(function(obj) {
			popup.appendChild(this.newMenuitem(obj));
		}, this);
		let cls = menu.classList;
		cls.add("showFlagS");
		cls.add("menu-iconic");
		return menu;
	};

	showFlagS.newMenuitem = function(obj, i) {
		var menuitem;
		if (obj.label === "separator" || (!obj.label && !obj.text && !obj.oncommand && !obj.command))
			menuitem = document.createElement("menuseparator");
		else
			menuitem = document.createElement("menuitem");

		if (!obj.label)
			obj.label = obj.exec || obj.text || "NoName" + i;

		if (obj.exec)
			obj.exec = this.handleRelativePath(obj.exec);

		for (let [key, val] in Iterator(obj)) {
			if (typeof val == "function") obj[key] = val = "(" + val.toSource() + ").call(this, event);";
			menuitem.setAttribute(key, val);
			menuitem.setAttribute("id", "showFlagS-item-" + i);
		}
		var cls = menuitem.classList;
		cls.add("showFlagS");
		cls.add("menuitem-iconic");

		if (obj.oncommand || obj.command) return menuitem;

		menuitem.setAttribute("oncommand", "showFlagS.onCommand(event);");
		this.setMenusIcon(menuitem, obj);
		return menuitem;
	};

	showFlagS.setMenusIcon = function(menu, obj) {
		if (menu.hasAttribute("src") || menu.hasAttribute("image") || menu.hasAttribute("icon")) return;
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
	};

	showFlagS.onCommand = function(event) {
		var menuitem = event.target;
		var text = menuitem.getAttribute("text") || "";
		var exec = menuitem.getAttribute("exec") || "";
		if (exec) this.exec(exec, this.convertText(text));
	};

	showFlagS.exec = function(path, arg) {
		var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
		var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
		try {
			var a;
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
		} catch (e) {}
	};

	showFlagS.convertText = function(text) {
		text = text.toLocaleLowerCase().replace("%u", content.location.href);
		return text;
	};

	showFlagS.handleRelativePath = function(path) {
		if (path) {
			path = path.replace(/\//g, '\\').toLocaleLowerCase();
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
	};

	/*****************************************************************************************/
	showFlagS.alert = function(aString, aTitle) {
		Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService).showAlertNotification("", aTitle || "showFlagS", aString, false, "", null);
	};

	showFlagS.loadFile = function(aFile) {
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
		return data;
	};

	function log(str) {
		if (showFlagS.debug) Application.console.log("[showFlagS] " + Array.slice(arguments));
	}

	function $(id) document.getElementById(id);

	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}

	showFlagS.init();
	window.showFlagS = showFlagS;
})()