// ==UserScript==
// @name           addMenuPlus.uc.js
// @description    通過配置文件增加修改菜單，修改版
// @namespace      http://d.hatena.ne.jp/Griever/
// @author         Griever
// @include        main
// @license        MIT License
// @compatibility  Firefox 40
// @charset        UTF-8
// @version        2015.8.15
// @version        0.1.1
// @startup        window.addMenu.init();
// @shutdown       window.addMenu.destroy();
// @config         window.addMenu.edit(addMenu.FILE);
// @homepageURL    https://github.com/ywzhaiqi/userChromeJS/tree/master/addmenuPlus
// @ohomepageURL   https://github.com/Griever/userChromeJS/tree/master/addMenu
// @reviewURL      http://bbs.kafan.cn/thread-1554431-1-1.html
// @downloadURL    https://github.com/ywzhaiqi/userChromeJS/raw/master/addmenuPlus/addMenuPlus.uc.js
// @note           0.1.1 Places keywords API を使うようにした
// @note           0.1.0 menugroup をとりあえず利用できるようにした
// @note           0.0.9 Firefox 29 の Firefox Button 廃止に伴いファイルメニューに追加するように変更
// @note           0.0.8 Firefox 25 の getShortcutOrURI 廃止に仮対応
// @note           0.0.7 Firefox 21 の Favicon 周りの変更に対応
// @note           0.0.6 Firefox 19 に合わせて修正
// @note           0.0.5 Remove E4X
// @note           0.0.4 設定ファイルから CSS を追加できるようにした
// @note           0.0.4 label の無い menu を splitmenu 風の動作にした
// @note           0.0.4 Vista でアイコンがズレる問題を修正…したかも
// @note           0.0.4 %SEL% の改行が消えてしまうのを修正
// @note           0.0.3 keyword の新しい書式で古い書式が動かない場合があったのを修正
// @note           %URL_HTMLIFIED%, %EOL_ENCODE% が変換できなかったミスを修正
// @note           %LINK_OR_URL% 変數を作成（リンク URL がなければページの URL を返す）
// @note           タブの右クリックメニューでは %URL% や %SEL% はそのタブのものを返すようにした
// @note           keyword で "g %URL%" のような記述を可能にした
// @note           ツールの再読み込みメニューの右クリックで設定ファイルを開くようにした
// ==/UserScript==


/***** 説明 *****

◆ 腳本說明 ◆
通過配置文件自定義菜單
在編寫的時候，參考了 Copy URL Lite+，得到了作者允許。
・http://www.code-404.net/articles/browsers/copy-url-lite


◆ 如何使用？ ◆
配置（_addmenu.js） 文件，請放在Chrome目錄下。
後綴名 .uc.js 可選。

啟動後，在瀏覽器中加載配置文件，並添加菜單。
可以從「工具」菜單重新讀取配置文件。


◆ 格式 ◆
page, tab, too, app 関數にメニューの素となるオブジェクトを渡す。
オブジェクトのプロパティがそのまま menuitem の屬性になります。

○exec
  啟動外部應用程序。
  パラメータは text プロパティを利用します。
  自動顯示該應用程序的圖標。

○keyword
  指定了關鍵字的書簽和搜索引擎。
  text プロパティがあればそれを利用して検索などをします。
  自動顯示搜索引擎的圖標。

○text（変數が利用可能）
  復制你想要的字符串到剪貼板。（Copy URL Lite+ 互換）
  keyword, exec があればそれらの補助に使われます。

○url（可用的變量）
  打開你想要的網址。
  內容によっては自動的にアイコンが付きます。

○where
  keyword, url でのページの開き方を指定できます（current, tab, tabshifted, window）
  省略するとブックマークのように左クリックと中クリックを使い分けられます。

○condition
  メニューを表示する條件を指定します。（Copy URL Lite+ 互換）
  省略すると url や text プロパティから自動的に表示/非表示が決まります。
  select, link, mailto, image, media, input, noselect, nolink, nomailto, noimage, nomedia, noinput から組み合わせて使います。

○oncommand, command
  これらがある時は condition 以外の特殊なプロパティは無視されます。


◆ サブメニュー ◆
PageMenu, TabMenu, ToolMenu, AppMenu 関數を使って自由に追加できます。


◆ 利用可能な変數 ◆
%EOL%            改行(\r\n)
%TITLE%          ページタイトル
%URL%            URI
%SEL%            選択範囲の文字列
%RLINK%          リンクアンカー先の URL
%IMAGE_URL%      畫像の URL
%IMAGE_ALT%      畫像の alt 屬性
%IMAGE_TITLE%    畫像の title 屬性
%LINK%           リンクアンカー先の URL
%LINK_TEXT%      リンクのテキスト
%RLINK_TEXT%     リンクのテキスト
%MEDIA_URL%      メディアの URL
%CLIPBOARD%      クリップボードの內容
%FAVICON%        Favicon の URL
%EMAIL%          リンク先の E-mail アドレス
%HOST%           ページのホスト(ドメイン)
%LINK_HOST%      リンクのホスト(ドメイン)
%RLINK_HOST%     リンクのホスト(ドメイン)
%LINK_OR_URL%    リンクの URL が取れなければページの URL
%RLINK_OR_URL%   リンクの URL が取れなければページの URL

%XXX_HTMLIFIED%  HTML エンコードされた上記変數（XXX → TITLE などに読み替える）
%XXX_HTML%       HTML エンコードされた上記変數
%XXX_ENCODE%     URI  エンコードされた上記変數

◇ 簡易的な変數 ◇
%h               ページのホスト(ドメイン)
%i               畫像の URL
%l               リンクの URL
%m               メディアの URL
%p               クリップボードの內容
%s               選択文字列
%t               ページのタイトル
%u               ページの URL

基本的に Copy URL Lite+ の変數はそのまま使えます。
大文字・小文字は區別しません。

*/

(function(css){

var useScraptchpad = true;  // 如果不存在編輯器，則使用代碼片段速記器，否則設置編輯器路徑
var enableFileRefreshing = true;  // 打開右鍵菜單時，檢查配置文件是否變化，可能會減慢速度

let { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;

if (window.addMenu) {
    window.addMenu.destroy();
    delete window.addMenu;
}

window.addMenu = {
    get prefs() {
        delete this.prefs;
        return this.prefs = Services.prefs.getBranch("addMenu.")
    },
    get FILE() {
        let aFile, path;
        try {
            // addMenu.FILE_PATH があればそれを使う
            path = this.prefs.getCharPref("FILE_PATH")
        } catch (e) {
            path = 'Local\\_addmenu.js';
        }

        aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
        aFile.appendRelativePath(path);

        if (!aFile.exists()) {
            saveFile(aFile, '// 這是一個 addMenuPlus 配置文件\n' +
                '// 請到 http://ywzhaiqi.github.io/addMenu_creator/ 生成配置文件' +
                '\n\n' +
                'tab({\n    label: "addMenuPlus 配置",\n    oncommand: "addMenu.edit(addMenu.FILE);"\n});');

            alert('目前 addMenuPlus 的配置文件為空，請在打開的鏈接中生成配置並放入配置文件。\n通過右鍵標簽打開配置文件。');

            var url = 'http://ywzhaiqi.github.io/addMenu_creator/';
            openUILinkIn(url, 'tab', false, null);
        }

        this._modifiedTime = aFile.lastModifiedTime;

        delete this.FILE;
        return this.FILE = aFile;
    },
    get focusedWindow() {
        return gContextMenu && gContextMenu.target ? gContextMenu.target.ownerDocument.defaultView : content;
    },
    init: function() {
		if (("isInitialized" in Services.search) && !Services.search.isInitialized) {
			Services.search.init(this.init.bind(this));
			return
		}
        let he = "(?:_HTML(?:IFIED)?|_ENCODE)?";
        let rTITLE     = "%TITLE"+ he +"%|%t\\b";
        let rTITLES    = "%TITLES"+ he +"%|%t\\b";
        let rURL       = "%(?:R?LINK_OR_)?URL"+ he +"%|%u\\b";
        let rHOST      = "%HOST"+ he +"%|%h\\b";
        let rSEL       = "%SEL"+ he +"%|%s\\b";
        let rLINK      = "%R?LINK(?:_TEXT|_HOST)?"+ he +"%|%l\\b";
        let rIMAGE     = "%IMAGE(?:_URL|_ALT|_TITLE)"+ he +"%|%i\\b";
        let rIMAGE_BASE64 = "%IMAGE_BASE64"+ he +"%|%i\\b";
        let rMEDIA     = "%MEDIA_URL"+ he +"%|%m\\b";
        let rCLIPBOARD = "%CLIPBOARD"+ he +"%|%p\\b";
        let rFAVICON   = "%FAVICON"+ he +"%";
        let rEMAIL     = "%EMAIL"+ he +"%";
        let rExt       = "%EOL"+ he +"%";

        let rFAVICON_BASE64 = "%FAVICON_BASE64"+ he +"%";
        let rRLT_OR_UT = "%RLT_OR_UT"+ he +"%";  // 鏈接文本或網頁標題

        this.rTITLE     = new RegExp(rTITLE, "i");
        this.rTITLES    = new RegExp(rTITLES, "i");
        this.rURL       = new RegExp(rURL, "i");
        this.rHOST      = new RegExp(rHOST, "i");
        this.rSEL       = new RegExp(rSEL, "i");
        this.rLINK      = new RegExp(rLINK, "i");
        this.rIMAGE     = new RegExp(rIMAGE, "i");
        this.rMEDIA     = new RegExp(rMEDIA, "i");
        this.rCLIPBOARD = new RegExp(rCLIPBOARD, "i");
        this.rFAVICON   = new RegExp(rFAVICON, "i");
        this.rEMAIL     = new RegExp(rEMAIL, "i");
        this.rExt       = new RegExp(rExt, "i");
        this.rFAVICON_BASE64 = new RegExp(rFAVICON_BASE64, "i");
        this.rIMAGE_BASE64 = new RegExp(rIMAGE_BASE64, "i");
        this.rRLT_OR_UT = new RegExp(rRLT_OR_UT, "i");

        this.regexp     = new RegExp(
            [rTITLE, rTITLES, rURL, rHOST, rSEL, rLINK, rIMAGE, rIMAGE_BASE64, rMEDIA, rCLIPBOARD, rFAVICON, rFAVICON_BASE64, rEMAIL, rExt, rRLT_OR_UT].join("|"), "ig");

        var ins;
        ins = $("context-viewinfo");
        ins.parentNode.insertBefore(
            $C("menuseparator", { id: "addMenu-page-insertpoint", class: "addMenu-insert-point" }), ins.nextSibling);
        ins = $("context_closeTab");
        ins.parentNode.insertBefore(
            $C("menuseparator", { id: "addMenu-tab-insertpoint", class: "addMenu-insert-point" }), ins.nextSibling);
        ins = $("prefSep") || $("webDeveloperMenu");
        ins.parentNode.insertBefore(
            $C("menuseparator", { id: "addMenu-tool-insertpoint", class: "addMenu-insert-point" }), ins.nextSibling);
        ins = $("appmenu-quit") || $("menu_FileQuitItem");
        ins.parentNode.insertBefore(
            $C("menuseparator", { id: "addMenu-app-insertpoint", class: "addMenu-insert-point" }), ins);
        ins = $("devToolsSeparator");
        ins.parentNode.insertBefore($C("menuitem", {
            id: "addMenu-rebuild",
            label: "AddMenuPlus",
            tooltiptext: "左鍵：重載配置\n右鍵：編輯配置",
            oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);",
            onclick: "if (event.button == 2) { event.preventDefault(); addMenu.edit(addMenu.FILE); }",
        }), ins);

        $("contentAreaContextMenu").addEventListener("popupshowing", this, false);
        $("tabContextMenu").addEventListener("popupshowing", this, false);
        $("menu_ToolsPopup").addEventListener("popupshowing", this, false);

        this.style = addStyle(css);
        this.rebuild();
    },
    uninit: function() {
        $("contentAreaContextMenu").removeEventListener("popupshowing", this, false);
        $("tabContextMenu").removeEventListener("popupshowing", this, false);
        $("menu_ToolsPopup").removeEventListener("popupshowing", this, false);
    },
    destroy: function() {
        this.uninit();
        this.removeMenuitem();
        $$('#addMenu-rebuild, .addMenu-insert-point').forEach(function(e) e.parentNode.removeChild(e));
        if (this.style && this.style.parentNode) this.style.parentNode.removeChild(this.style);
        if (this.style2 && this.style2.parentNode) this.style2.parentNode.removeChild(this.style2);
    },
    handleEvent: function(event) {
        switch(event.type){
            case "popupshowing":
                if (event.target != event.currentTarget) return;

                if (enableFileRefreshing) {
                    this.updateModifiedFile();
                }

                if (event.target.id == 'contentAreaContextMenu') {
                    var state = [];
                    if (gContextMenu.onTextInput)
                        state.push("input");
                    if (gContextMenu.isContentSelected || gContextMenu.isTextSelected)
                        state.push("select");
                    if (gContextMenu.onLink)
                        state.push(gContextMenu.onMailtoLink ? "mailto" : "link");
                    if (gContextMenu.onCanvas)
                        state.push("canvas image");
                    if (gContextMenu.onImage)
                        state.push("image");
                    if (gContextMenu.onVideo || gContextMenu.onAudio)
                        state.push("media");
                    event.currentTarget.setAttribute("addMenu", state.join(" "));

                    this.customShowings.forEach(function(obj){
                        var curItem = obj.item;
                        try {
                            eval('(' + obj.fnSource + ').call(curItem, curItem)');
                        } catch(ex) {
                            console.error('addMenuPlus 自定義顯示錯誤', obj.fnSource);
                        }
                    });
                }
                break;
        }
    },

    updateModifiedFile: function() {
        if (!this.FILE.exists()) return;

        if (this._modifiedTime != this.FILE.lastModifiedTime) {
            this._modifiedTime = this.FILE.lastModifiedTime;

            setTimeout(function(){ addMenu.rebuild(true); }, 10);
        }
    },

    onCommand: function(event) {
        var menuitem = event.target;
        var text     = menuitem.getAttribute("text") || "";
        var keyword  = menuitem.getAttribute("keyword") || "";
        var url      = menuitem.getAttribute("url") || "";
        var where    = menuitem.getAttribute("where") || "";
        var exec     = menuitem.getAttribute("exec") || "";

		if (keyword) {
			let param = (text ? (text = this.convertText(text)) : "");
			let engine = Services.search.getEngineByAlias(keyword);
			if (engine) {
				let submission = engine.getSubmission(param);
				this.openCommand(event, submission.uri.spec, where);
			} else {
				PlacesUtils.keywords.fetch(keyword||'').then(entry => {
					if (!entry) return;
					// 文字化けの心配が…
					let newurl = entry.url.href.replace('%s', encodeURIComponent(param));
					this.openCommand(event, newurl, where);
				});
			}
		}
        else if (url)
            this.openCommand(event, this.convertText(url), where);
        else if (exec)
            this.exec(exec, this.convertText(text));
        else if (text)
            this.copy(this.convertText(text));
    },
    openCommand: function(event, url, where, postData) {
        var uri;
        try {
            uri = Services.io.newURI(url, null, null);
        } catch (e) {
            return this.log(U("URL 不正確: ") + url);
        }
        if (uri.scheme === "javascript")
            loadURI(url);
        else if (where)
            openUILinkIn(uri.spec, where, false, postData || null);
        else if (event.button == 1)
            openNewTabWith(uri.spec);
        else openUILink(uri.spec, event);
    },
    exec: function(path, arg){
        var file    = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
        var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
		if (path.indexOf('\\') === 0)
				path = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + path;
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
        } catch(e) {
            this.log(e);
        }
    },
    handleRelativePath: function(path) {
        if (path) {
            path = path.replace(/\//g, '\\').toLocaleLowerCase();
            var ffdir = Cc['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).path;
            if (/^(\\)/.test(path)) {
                return ffdir + path;
            }else{
                return path;
            }
        }
    },
    rebuild: function(isAlert) {
        var aFile = this.FILE;
        if (!aFile || !aFile.exists() || !aFile.isFile()) {
            this.log(aFile? aFile.path : U("配置文件") +  U(" 不存在"));
            return;
        }

        var aiueo = [
            { current: "page", submenu: "PageMenu", insertId: "addMenu-page-insertpoint" },
            { current: "tab" , submenu: "TabMenu" , insertId: "addMenu-tab-insertpoint"  },
            { current: "tool", submenu: "ToolMenu", insertId: "addMenu-tool-insertpoint" },
            { current: "app" , submenu: "AppMenu" , insertId: "addMenu-app-insertpoint"  },
            { current: "group", submenu: "GroupMenu" , insertId: "addMenu-page-insertpoint"  },
        ];

        var data = loadText(aFile);
        var sandbox = new Cu.Sandbox( new XPCNativeWrapper(window) );
        sandbox.Components = Components;
        sandbox.Cc = Cc;
        sandbox.Ci = Ci;
        sandbox.Cr = Cr;
        sandbox.Cu = Cu;
        sandbox.Services = Services;
        sandbox.locale = Services.prefs.getCharPref("general.useragent.locale");

        var includeSrc = "";
        sandbox.include = function(aLeafName) {
            var data = loadFile(aLeafName);
            if (data)
                includeSrc += data + "\n";
        };
        sandbox._css = [];

		aiueo.forEach(function({ current, submenu }){
			sandbox["_" + current] = [];
			if (submenu != 'GroupMenu') {
				sandbox[current] = function(itemObj) {
					ps(itemObj, sandbox["_" + current]);
				}
			}
			sandbox[submenu] = function(menuObj) {
				if (!menuObj)
					menuObj = {};
				menuObj._items = [];
				if (submenu == 'GroupMenu')
					menuObj._group = true;
				sandbox["_" + current].push(menuObj);
				return function(itemObj) {
					ps(itemObj, menuObj._items);
				}
			}
		}, this);

        function ps(item, array) {
            ("join" in item && "unshift" in item) ?
                [].push.apply(array, item) :
                array.push(item);
        }

        try {
            var lineFinder = new Error();
            Cu.evalInSandbox("function css(code){ this._css.push(code+'') };\n" + data, sandbox, "1.8");
            Cu.evalInSandbox(includeSrc, sandbox, "1.8");
        } catch (e) {
            let line = e.lineNumber - lineFinder.lineNumber -1;
            this.alert(e + "\n請重新檢查配置文件第 " + line + " 行", null, function(){
                addMenu.edit(addMenu.FILE, line);
            });
            return this.log(e);
        }
        if (this.style2 && this.style2.parentNode)
            this.style2.parentNode.removeChild(this.style2);
        if (sandbox._css.length)
            this.style2 = addStyle(sandbox._css.join("\n"));

        this.removeMenuitem();

        this.customShowings = [];

        aiueo.forEach(function({ current, submenu, insertId }){
            if (!sandbox["_" + current] || sandbox["_" + current].length == 0) return;
            let insertPoint = $(insertId);
            this.createMenuitem(sandbox["_" + current], insertPoint);
        }, this);

        if (isAlert) this.alert(U("配置已經重新載入"));
    },
	newGroupMenu: function (menuObj) {
		var group = document.createElement('menugroup');
		Object.keys(menuObj).map(function(key) {
			var val = menuObj[key];
			if (key === "_items") return;
			if (key === "_group") return;
			if (typeof val == "function")
				menuObj[key] = val = "(" + val.toSource() + ").call(this, event);";
			group.setAttribute(key, val);
		}, this);
		let cls = group.classList;
		cls.add('addMenu');

		// 表示 / 非表示の設定
		if (menuObj.condition)
			this.setCondition(group, menuObj.condition);

		menuObj._items.forEach(function(obj) {
			group.appendChild(this.newMenuitem(obj, { isMenuGroup: true }));
		}, this);
		return group;
	},
	newMenu: function(menuObj) {
		if (menuObj._group) {
			return this.newGroupMenu(menuObj);
		}
		var menu = document.createElement("menu");
		var popup = menu.appendChild(document.createElement("menupopup"));
		for (let [key, val] in Iterator(menuObj)) {
			if (key === "_items") continue;

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
		cls.add("addMenu");
		cls.add("menu-iconic");

        // 表示 / 非表示の設定
        if (menuObj.condition)
            this.setCondition(menu, menuObj.condition);

		menuObj._items.forEach(function(obj) {
			popup.appendChild(this.newMenuitem(obj));
		}, this);

        // menu に label が無い場合、最初の menuitem の label 等を持ってくる
        // menu 部分をクリックで実行できるようにする(splitmenu みたいな感じ)
        if (!menu.hasAttribute('label')) {
            let firstItem = menu.querySelector('menuitem');
            if (firstItem) {
                let command = firstItem.getAttribute('command');
                if (command)
                    firstItem = document.getElementById(command) || firstItem;
                ['label','accesskey','image','icon'].forEach(function(n){
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
	newMenuitem: function(obj, opt) {
        opt || (opt = {});

		var menuitem;
		// label == separator か必要なプロパティが足りない場合は區切りとみなす
		if (obj.label === "separator" ||
		    (!obj.label && !obj.image && !obj.text && !obj.keyword && !obj.url && !obj.oncommand && !obj.command)) {
			menuitem = document.createElement("menuseparator");
		} else if (obj.oncommand || obj.command) {
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
			// property fix
			if (!obj.label)
				obj.label = obj.exec || obj.keyword || obj.url || obj.text;

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
                // 表示 / 非表示の自動設定
                let condition = "";
                if (this.rSEL.test(obj.url || obj.text))   condition += " select";
                if (this.rLINK.test(obj.url || obj.text))  condition += " link";
                if (this.rEMAIL.test(obj.url || obj.text)) condition += " mailto";
                if (this.rIMAGE.test(obj.url || obj.text)) condition += " image";
                if (this.rMEDIA.test(obj.url || obj.text)) condition += " media";
                if (condition)
                    obj.condition = condition;
            }

            if(obj.exec){
                obj.exec = this.handleRelativePath(obj.exec);
            }
        }

        // 右鍵第一層菜單添加 onpopupshowing 事件
        if (obj.onshowing) {
            this.customShowings.push({
                item: menuitem,
                fnSource: obj.onshowing.toSource()
            });
            delete obj.onshowing;
        }

		// obj を屬性にする
		for (let [key, val] in Iterator(obj)) {
			if (key === "command") continue;
			if (typeof val == "function")
				obj[key] = val = "(" + val.toSource() + ").call(this, event);";
			menuitem.setAttribute(key, val);
		}
		var cls = menuitem.classList;
		cls.add("addMenu");
		cls.add("menuitem-iconic");

        // 表示 / 非表示の設定
        if (obj.condition)
            this.setCondition(menuitem, obj.condition);

		// separator はここで終了
		if (menuitem.localName == "menuseparator")
			return menuitem;

        if (!obj.onclick)
            menuitem.setAttribute("onclick", "checkForMiddleClick(this, event)");

        // 給 MenuGroup 的菜單加上 tooltiptext
        if (opt.isMenuGroup && !obj.tooltiptext && obj.label) {
            menuitem.setAttribute('tooltiptext', obj.label);
        }

		// oncommand, command はここで終了
		if (obj.oncommand || obj.command)
			return menuitem;

        menuitem.setAttribute("oncommand", "addMenu.onCommand(event);");

        // 可能ならばアイコンを付ける
        this.setIcon(menuitem, obj);

        return menuitem;
    },
    createMenuitem: function(itemArray, insertPoint) {
        var chldren = $A(insertPoint.parentNode.children);
        for (let [, obj] in Iterator(itemArray)) {
            if (!obj) continue;
            let menuitem;
            // clone menuitem and set attribute
            if(obj.id && (menuitem = $(obj.id))){
                let dupMenuitem;
                let isDupMenu = (obj.clone != false);
                if (isDupMenu) {
                    dupMenuitem = menuitem.cloneNode(true);

                    // 隱藏原菜單
                    // menuitem.classList.add("addMenuHide");
                }else{
                    dupMenuitem = menuitem;
                }

                for (let [key, val] in Iterator(obj)) {
                    if (typeof val == "function")
                        obj[key] = val = "(" + val.toSource() + ").call(this, event);";

                    dupMenuitem.setAttribute(key, val);
                }

                // 如果沒有則添加 menuitem-iconic 或 menu-iconic，給菜單添加圖標用。
                let type = dupMenuitem.nodeName,
                    cls = dupMenuitem.classList;
                if (type == 'menuitem' || type == 'menu')
                    if (!cls.contains(type + '-iconic'))
                        cls.add(type + '-iconic');

                if (!cls.contains('addMenu'))
                    cls.add('addMenu');
                if (!isDupMenu && !cls.contains('addMenuNot'))
                    cls.add('addMenuNot');

                // // 沒有插入位置的默認放在原來那個菜單的後面
                // if(isDupMenu && !obj.insertAfter && !obj.insertBefore && !obj.position){
                //     obj.insertAfter = obj.id;
                // }
                let noMove = !isDupMenu;
                insertMenuItem(obj, dupMenuitem, noMove);

                continue;
            }

            menuitem = obj._items ? this.newMenu(obj) : this.newMenuitem(obj, { isTopMenuitem: true });
            insertMenuItem(obj, menuitem);

        }

        function insertMenuItem(obj, menuitem, noMove){
            let ins;
            if (obj.insertAfter && (ins = $(obj.insertAfter))) {
                ins.parentNode.insertBefore(menuitem, ins.nextSibling);
                return;
            }
            if (obj.insertBefore && (ins = $(obj.insertBefore))) {
                ins.parentNode.insertBefore(menuitem, ins);
                return;
            }
            if (obj.position && parseInt(obj.position, 10) > 0) {
                (ins = chldren[parseInt(obj.position, 10)-1]) ?
                    ins.parentNode.insertBefore(menuitem, ins):
                    insertPoint.parentNode.appendChild(menuitem);
                return;
            }
            if (!noMove) {
                insertPoint.parentNode.insertBefore(menuitem, insertPoint);
            }
        }
    },
    removeMenuitem: function() {
        var remove = function(e) {
            if (e.classList.contains('addMenuNot')) return;
            e.parentNode.removeChild(e);
        };

        $$('menu.addMenu, menugroup.addMenu').forEach(remove);
        $$('.addMenu').forEach(remove);
        // 恢復原隱藏菜單
        $$('.addMenuHide').forEach(function(e) { e.classList.remove('addMenuHide');} );
    },

    setIcon: function(menu, obj) {
        if (menu.hasAttribute("src") || menu.hasAttribute("image") || menu.hasAttribute("icon"))
            return;

        if (obj.exec) {
            var aFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
            try {
                aFile.initWithPath(obj.exec);
            } catch (e) {
                return;
            }
            // if (!aFile.exists() || !aFile.isExecutable()) {
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
			} catch (e) { }
			if (!uri) return;

			menu.setAttribute("scheme", uri.scheme);
			PlacesUtils.favicons.getFaviconDataForPage(uri, {
				onComplete: function(aURI, aDataLen, aData, aMimeType) {
					try {
						// javascript: URI の host にアクセスするとエラー
						menu.setAttribute("image", aURI && aURI.spec?
							"moz-anno:favicon:" + aURI.spec:
							"moz-anno:favicon:" + uri.scheme + "://" + uri.host + "/favicon.ico");
					} catch (e) { }
				}
			});
		}
		PlacesUtils.keywords.fetch(obj.keyword || '').then(entry => {
			let url;
			if (entry) {
				url = entry.url.href;
			} else {
				url = (obj.url+'').replace(this.regexp, "");
			}
			setIconCallback(url);
		}, e => {console.log(e) }).catch(e=>{});
    },
    setCondition: function(menu, condition) {
        if (/\bnormal\b/i.test(condition)) {
            menu.setAttribute("condition", "normal");
        } else {
            let match = condition.toLowerCase().match(/\b(?:no)?(?:select|link|mailto|image|canvas|media|input)\b/ig);
            if (!match || !match[0])
                return;
            match = match.filter(function(c,i,a) a.indexOf(c) === i);
            menu.setAttribute("condition", match.join(" "));
        }
    },
    convertText: function(text) {
        var that = this;
        var context = gContextMenu || { // とりあえずエラーにならないようにオブジェクトをでっち上げる
            link: { href: "", host: "" },
            target: { alt: "", title: "" },
            __noSuchMethod__: function(id, args) "",
        };
        var tab = document.popupNode && document.popupNode.localName == "tab" ? document.popupNode : null;
        var win = tab ? tab.linkedBrowser.contentWindow : this.focusedWindow;

        return text.replace(this.regexp, function(str){
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
            switch(str) {
                case "%T"            : return win.document.title;
                case "%TITLE%"       : return win.document.title;
                case "%TITLES%"      : return win.document.title.replace(/\s-\s.*/i,"").replace(/_[^\[\]【】]+$/,"");
                case "%U"            : return win.location.href;
                case "%URL%"         : return win.location.href;
                case "%H"            : return win.location.host;
                case "%HOST%"        : return win.location.host;
                case "%S"            : return that.getSelection(win) || "";
                case "%SEL%"         : return that.getSelection(win) || "";
                case "%L"            : return context.linkURL || "";
                case "%RLINK%"       : return context.linkURL || "";
                case "%RLINK_HOST%"  : return context.link.host || "";
                case "%RLINK_TEXT%"  : return context.linkText() || "";
                case "%RLINK_OR_URL%": return context.linkURL || win.location.href;
                case "%RLT_OR_UT%"   : return context.onLink && context.linkText() || win.document.title;  // 鏈接文本或網頁標題
                case "%IMAGE_ALT%"   : return context.target.alt || "";
                case "%IMAGE_TITLE%" : return context.target.title || "";
                case "%I"            : return context.imageURL || "";
                case "%IMAGE_URL%"   : return context.imageURL || "";
                case "%IMAGE_BASE64%": return img2base64(context.imageURL);
                case "%M"            : return context.mediaURL || "";
                case "%MEDIA_URL%"   : return context.mediaURL || "";
                case "%P"            : return readFromClipboard() || "";
                case "%CLIPBOARD%"   : return readFromClipboard() || "";
                case "%FAVICON%"     : return gBrowser.getIcon(tab ? tab : null) || "";
                case "%FAVICON_BASE64%" : return img2base64(gBrowser.getIcon(tab ? tab : null));
                case "%EMAIL%"       : return getEmailAddress() || "";
                case "%EOL%"         : return "\r\n";
            }
            return str;
        }
        function htmlEscape(s) {
            return (s+"").replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;");
        };

        function getEmailAddress() {
            var url = context.linkURL;
            if (!url || !/^mailto:([^?]+).*/i.test(url)) return "";
            var addresses = RegExp.$1;
            try {
                var characterSet = context.target.ownerDocument.characterSet;
                const textToSubURI = Cc['@mozilla.org/intl/texttosuburi;1'].getService(Ci.nsITextToSubURI);
                addresses = textToSubURI.unEscapeURIForUI(characterSet, addresses);
            } catch (ex) {
            }
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
    getSelection: function(win) {
        // from getBrowserSelection Fx19
        win || (win = this.focusedWindow);
        var selection  = this.getRangeAll(win).join(" ");
        if (!selection) {
            let element = document.commandDispatcher.focusedElement;
            let isOnTextInput = function (elem) {
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
    getRangeAll: function(win) {
        win || (win = this.focusedWindow);
        var sel = win.getSelection();
        var res = [];
        for (var i = 0; i < sel.rangeCount; i++) {
            res.push(sel.getRangeAt(i));
        };
        return res;
    },
    getInputSelection: function(elem) {
        if (elem instanceof HTMLTextAreaElement || elem instanceof HTMLInputElement && elem.mozIsTextField(false))
            return elem.value.substring(elem.selectionStart, elem.selectionEnd);
        return "";
    },
    edit: function(aFile, aLineNumber) {
    	if (!aFile || !aFile.exists() || !aFile.isFile()) return;
    	var editor = Services.prefs.getCharPref("view_source.editor.path");
    	if (!editor) {
    		if (useScraptchpad) {
    			this.openScriptInScratchpad(window, aFile);
    			return;
    		} else {
    			alert("請先設定文字編輯器的路徑!!!");
    			var fp = Cc['@mozilla.org/filepicker;1'].createInstance(Ci.nsIFilePicker);
    			fp.init(window, "設定全局腳本編輯器", fp.modeOpen);
    			fp.appendFilter("執行檔案", "*.exe");
    			if (fp.show() == fp.returnCancel || !fp.file)
    				return;
    			else {
    				editor = fp.file;
    				Services.prefs.setCharPref("view_source.editor.path", editor.path);
    			}
    			return;
    		}
    		return;
    	}
    	var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
    	var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
    	var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
    	UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "BIG5" : "UTF-8";
    	try {
    		var path = UI.ConvertFromUnicode(aFile.path);
    		var args = [path]
    		file.initWithPath(editor);
    		process.init(file);
    		process.run(false, args, args.length);
    	} catch (e) {}
    },
    openScriptInScratchpad: function(parentWindow, file) {
        let spWin = (parentWindow.Scratchpad || Services.wm.getMostRecentWindow("navigator:browser").Scratchpad)
            .openScratchpad();

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
    copy: function(aText) {
        Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(aText);
        XULBrowserWindow.statusTextField.label = "Copy: " + aText;
    },
    copyLink: function(copyURL, copyLabel) {
        // generate the Unicode and HTML versions of the Link
        var textUnicode = copyURL;
        var textHtml = ("<a href=\"" + copyURL + "\">" + copyLabel + "</a>");

        // make a copy of the Unicode
        var str = Components.classes["@mozilla.org/supports-string;1"].
        createInstance(Components.interfaces.nsISupportsString);
        if (!str) return false; // couldn't get string obj
        str.data = textUnicode; // unicode string?

        // make a copy of the HTML
        var htmlstring = Components.classes["@mozilla.org/supports-string;1"].
        createInstance(Components.interfaces.nsISupportsString);
        if (!htmlstring) return false; // couldn't get string obj
        htmlstring.data = textHtml;

        // add Unicode & HTML flavors to the transferable widget
        var trans = Components.classes["@mozilla.org/widget/transferable;1"].
        createInstance(Components.interfaces.nsITransferable);
        if (!trans) return false; //no transferable widget found

        trans.addDataFlavor("text/unicode");
        trans.setTransferData("text/unicode", str, textUnicode.length * 2); // *2 because it's unicode

        trans.addDataFlavor("text/html");
        trans.setTransferData("text/html", htmlstring, textHtml.length * 2); // *2 because it's unicode

        // copy the transferable widget!
        var clipboard = Components.classes["@mozilla.org/widget/clipboard;1"].
        getService(Components.interfaces.nsIClipboard);
        if (!clipboard) return false; // couldn't get the clipboard

        clipboard.setData(trans, null, Components.interfaces.nsIClipboard.kGlobalClipboard);
        return true;
    },
    alert: function (aMsg, aTitle, aCallback) {
        var callback = aCallback ? {
            observe : function (subject, topic, data) {
                if ("alertclickcallback" != topic)
                    return;
                aCallback.call(null);
            }
        } : null;
        var alertsService = Cc["@mozilla.org/alerts-service;1"].getService(Ci.nsIAlertsService);
        alertsService.showAlertNotification(
            "chrome://global/skin/icons/information-32.png", aTitle || "addMenu",
            aMsg + "", !!callback, "", callback);
    },
    $$: function(exp, context, aPartly) {
        context || (context = this.focusedWindow.document);
        var doc = context.ownerDocument || context;
        var elements = $$(exp, doc);
        if (arguments.length <= 2)
            return elements;
        var sel = doc.defaultView.getSelection();
        return elements.filter(function(q) sel.containsNode(q, aPartly));
    },
    log: log,
};

window.addMenu.init();

function $(id) { return document.getElementById(id); }
function $$(exp, doc) { return Array.prototype.slice.call((doc || document).querySelectorAll(exp)); }
function $A(args) { return Array.prototype.slice.call(args); }
function log() { Application.console.log(Array.slice(arguments)); }
function U(text) 1 < 'あ'.length ? decodeURIComponent(escape(text)) : text;
function $C(name, attr) {
    var el = document.createElement(name);
    if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
    return el;
}
function addStyle(css) {
    var pi = document.createProcessingInstruction(
        'xml-stylesheet',
        'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
    );
    return document.insertBefore(pi, document.documentElement);
}

function loadText(aFile) {
    var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
    var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
    fstream.init(aFile, -1, 0, 0);
    sstream.init(fstream);

    var data = sstream.read(sstream.available());
    try { data = decodeURIComponent(escape(data)); } catch(e) {}
    sstream.close();
    fstream.close();
    return data;
}
function loadFile(aLeafName) {
    var aFile = Cc["@mozilla.org/file/directory_service;1"]
        .getService(Ci.nsIDirectoryService)
        .QueryInterface(Ci.nsIProperties)
        .get('UChrm', Ci.nsILocalFile);
    aFile.appendRelativePath(aLeafName);
    if (!aFile.exists() || !aFile.isFile()) return null;
    var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
    var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
    fstream.init(aFile, -1, 0, 0);
    sstream.init(fstream);
    var data = sstream.read(sstream.available());
    try { data = decodeURIComponent(escape(data)); } catch(e) {}
    sstream.close();
    fstream.close();
    return data;
}

function saveFile(fileOrName, data) {
    var file;
    if(typeof fileOrName == "string"){
        file = Services.dirsvc.get('UChrm', Ci.nsILocalFile);
        file.appendRelativePath(fileOrName);
    }else{
        file = fileOrName;
    }

    var suConverter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
    suConverter.charset = 'UTF-8';
    data = suConverter.ConvertFromUnicode(data);

    var foStream = Cc['@mozilla.org/network/file-output-stream;1'].createInstance(Ci.nsIFileOutputStream);
    foStream.init(file, 0x02 | 0x08 | 0x20, 0664, 0);
    foStream.write(data, data.length);
    foStream.close();
}

})('\
.addMenuHide\
  { display: none !important; }\
\
#contentAreaContextMenu:not([addMenu~="select"]) .addMenu[condition~="select"],\
#contentAreaContextMenu:not([addMenu~="link"])   .addMenu[condition~="link"],\
#contentAreaContextMenu:not([addMenu~="mailto"]) .addMenu[condition~="mailto"],\
#contentAreaContextMenu:not([addMenu~="image"])  .addMenu[condition~="image"],\
#contentAreaContextMenu:not([addMenu~="canvas"])  .addMenu[condition~="canvas"],\
#contentAreaContextMenu:not([addMenu~="media"])  .addMenu[condition~="media"],\
#contentAreaContextMenu:not([addMenu~="input"])  .addMenu[condition~="input"],\
#contentAreaContextMenu[addMenu~="select"] .addMenu[condition~="noselect"],\
#contentAreaContextMenu[addMenu~="link"]   .addMenu[condition~="nolink"],\
#contentAreaContextMenu[addMenu~="mailto"] .addMenu[condition~="nomailto"],\
#contentAreaContextMenu[addMenu~="image"]  .addMenu[condition~="noimage"],\
#contentAreaContextMenu[addMenu~="canvas"]  .addMenu[condition~="nocanvas"],\
#contentAreaContextMenu[addMenu~="media"]  .addMenu[condition~="nomedia"],\
#contentAreaContextMenu[addMenu~="input"]  .addMenu[condition~="noinput"],\
#contentAreaContextMenu:not([addMenu=""])  .addMenu[condition~="normal"]\
  { display: none; }\
\
.addMenu-insert-point\
  { display: none !important; }\
\
\
.addMenu[url] {\
  list-style-image: url("chrome://mozapps/skin/places/defaultFavicon.png");\
}\
\
.addMenu.exec,\
.addMenu[exec] {\
  list-style-image: url("chrome://browser/skin/aboutSessionRestore-window-icon.png");\
}\
\
.addMenu.copy,\
menuitem.addMenu[text]:not([url]):not([keyword]):not([exec])\
{\
  list-style-image: url(data:image/png;base64,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);\
  -moz-image-region: rect(0pt, 32px, 16px, 16px);\
}\
\
.addMenu.checkbox .menu-iconic-icon {\
  -moz-appearance: checkbox;\
}\
\
.addMenu > .menu-iconic-left {\
  -moz-appearance: menuimage;\
}\
\
menugroup.addMenu {\
  background-color: menu;\
  padding-bottom: 4px;\
}\
menugroup.addMenu > .menuitem-iconic {\
  -moz-box-flex: 1;\
  -moz-box-pack: center;\
  -moz-box-align: center;\
}\
menugroup.addMenu > .menuitem-iconic > .menu-iconic-left {\
  -moz-appearance: none;\
}\
menugroup.addMenu > .menuitem-iconic > .menu-iconic-left > .menu-iconic-icon {\
  width: 16px;\
  height: 16px;\
  margin: 7px;\
}\
menugroup.addMenu > .menuitem-iconic > .menu-iconic-text,\
menugroup.addMenu > .menuitem-iconic > .menu-accel-container {\
  display: none;\
}\
');
