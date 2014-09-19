// ==UserScript==
// @name           downloadPlus.uc.js
// @description    下载窗口（下载重命名 + 双击复制链接 + 另存为），自动关闭下载产生的空白标签
// @note           ywzhaiqi 修改整合（Alice0775、紫云飞）
// @include        chrome://browser/content/browser.xul
// @include        chrome://browser/content/places/places.xul
// @include        chrome://mozapps/content/downloads/unknownContentType.xul
// @include        chrome://mozapps/content/downloads/downloads.xul
// @charset        utf-8
// @homepageURL    https://github.com/ywzhaiqi/userChromeJS/blob/master/downloadPlus.uc.js
//2014.08.25 FixDownloadFileSize
//2014.08.13 删除保存并打开，已失效，应该删干净了
// ==/UserScript==

(function() {

    let { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;
    if (!window.Services) Cu.import("resource://gre/modules/Services.jsm");

    var ns = {
        get appVersion()  Services.appinfo.version.split(".")[0],
        get mainwin() Services.wm.getMostRecentWindow("navigator:browser"),

        init: function(){
            switch(location.href){
                case "chrome://browser/content/browser.xul":
                    ns.newDownload();                     // 下载按钮右键点击新建下载
                    ns.autoClose_blankTab();              // 自动关闭下载产生的空白标签
                    downloadSoundPlay();                  // 下载完成提示音
 
                    // 不完美？
                    // ns.downloadsPanel_removeFile();    // DownloadsPanel 右键新增移除下载文件功能
                    break;
                case "chrome://mozapps/content/downloads/unknownContentType.xul":
                    ns.download_dialog_changeName();      // 下载改名
                    ns.download_dialog_saveAs();          // 下载另存为
                    ns.download_dialog_showCompleteURL(); // 下载弹出窗口双击链接复制完整链接

                    break;
                case "chrome://browser/content/places/places.xul":
                    // newDownload_places();  // 书签窗口新增 "新建下载" 按钮
                    break;
            }
        },

        newDownload: function(){
            let parent = $('downloads-button').parentNode;

            parent.addEventListener('click', ns.downloadsBtn_clicked, false);
        },
        newDownload_on_places: function () {
            var button = $("placesToolbar").insertBefore(document.createElement("toolbarbutton"), $("clearDownloadsButton"));
            button.id = "createNewDownload";
            button.label = "新建下载";
            button.style.paddingRight = "9px";
            button.addEventListener("command", ns.open_newDownload_dialog, false);
            window.addEventListener("click", function(e) {
                button.style.display = ($("searchFilter").attributes.getNamedItem("collection").value == "downloads") ? "-moz-box" : "";
            }, false);
        },
        downloadsBtn_clicked: function(event){
            if(event.target.id == "downloads-button" || event.target.id == "downloads-indicator"){
                if(event.button == 2 && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey){
                    event.stopPropagation();
                    event.preventDefault();

                    ns.open_newDownload_dialog();
                }
            }
        },
        newDownloadDialogXUL: '<?xml version="1.0" encoding="utf-8"?>\
            <?xml-stylesheet href="chrome://global/skin/" type="text/css"?>\
            <window xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" width="500" height="300" title="新建下载任务">\
                <hbox align="center" tooltiptext="http://www.example.com/[1-100-3]  ([开始-结束-位数])">\
                    <label value="批量任务"></label>\
                    <textbox flex="1"/>\
                </hbox>\
                <textbox id="urls" multiline="true" flex="1"/>\
                <hbox dir="reverse">\
                    <button label="开始下载"/>\
                </hbox>\
                <script>\
                    <![CDATA[\
                    function ParseURLs() {\
                        var batchurl = document.querySelector("textbox").value;\
                        if (/\\[\\d+-\\d+(-\\d+)?\\]/.test(batchurl)) {\
                            for (let match = batchurl.match(/\\[(\\d+)-(\\d+)-?(\\d+)?\\]/), i = match[1], j = match[2], k = match[3], urls = []; i <= j; i++) {\
                                urls.push(batchurl.replace(/\\[\\d+-\\d+(-\\d+)?\\]/, (i + "").length < k ? (eval("10e" + (k - (i + "").length)) + "").slice(2) + i : i));\
                            }\
                            document.querySelector("#urls").value = urls.join("\\n");\
                        } else {\
                            document.querySelector("#urls").value = batchurl;\
                        }\
                    }\
                    document.querySelector("textbox").addEventListener("keyup", ParseURLs, false);\
                    document.querySelector("button").addEventListener("command", function () {\
                        document.querySelector("#urls").value.split("\\n").forEach(function (url) {\
                            opener.saveURL(url , null, null, null, true, null, document);\
                        });\
                        close()\
                    }, false);\
                    document.querySelector("textbox").value = (opener.opener || window.opener).readFromClipboard();\
                    ParseURLs();\
                    ]]>\
                </script>\
            </window>\
        ',
        open_newDownload_dialog: function(){
            window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8," + encodeURIComponent(ns.newDownloadDialogXUL),
                "name", "top=" + (window.screenY + 50) + ",left=" + (window.screenX + 50));
        },

        downloadsPanel_removeFile: function() {
            window.removeDownloadfile = {
                removeStatus: function() {
                    var RMBtn = $("removeDownload");
                    var state = $("downloadsListBox").selectedItems[0].getAttribute('state');
                    RMBtn.setAttribute("disabled", "true");
                    if (state != "0" && state != "4" && state != "5")
                        RMBtn.removeAttribute("disabled");
                },
                removeMenu: function() {
                    try {
                        this.removeStatus();
                    } catch (e) {};

                    let menuitem = $("removeDownload");
                    if (!menuitem){
                        menuitem = document.createElement("menuitem"),
                            rlm = document.querySelector('.downloadRemoveFromHistoryMenuItem');
                        menuitem.setAttribute("label", rlm.getAttribute("label").indexOf("History") != -1 ? "Delete File" : "从硬盘中删除");
                        menuitem.setAttribute("id", "removeDownload");
                        menuitem.onclick = function() {
                            var path = decodeURI(DownloadsView.richListBox.selectedItem.image)
                                .replace(/moz\-icon\:\/\/file\:\/\/\//, "").replace(/\?size\=32$/, "")
                                .replace(/\?size\=32\&state\=normal$/, "").replace(/\//g, "\\\\");
                            if (DownloadsView.richListBox.selectedItem.getAttribute('state') == "2") {
                                path = path + ".part";
                            }
                            var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
                            file.initWithPath(path);
                            file.exists() && file.remove(0);
                            new DownloadsViewItemController(DownloadsView.richListBox.selectedItem).doCommand("cmd_delete");
                        };
                        $("downloadsContextMenu").appendChild(rlm);
                        $("downloadsContextMenu").insertBefore(menuitem, rlm.nextSibling);
                    }

                    this.removeStatus();
                },
                Start: function() {
                    $("downloadsContextMenu").addEventListener("popupshowing", this.removeMenu, false);
                }
            }
            try {
                eval("DownloadsPanel.showPanel = " + DownloadsPanel.showPanel.toString()
                    .replace(/DownloadsPanel\.\_openPopupIfDataReady\(\)/, "{$&;removeDownloadfile\.Start\(\);}"));
            } catch (e) {}
        },
        autoClose_blankTab: function () {
            eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
                if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
                && aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank") {\
                aWebProgress.DOMWindow.setTimeout(function() {\
                !aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
                }, 100);\
                }\
            '));
        },

        // 作用于 main 窗口
        download_dialog_changeName: function () {
            if (location != "chrome://mozapps/content/downloads/unknownContentType.xul") return;

            let downLocation = $("location");
            let locationText = $("locationtext");

            $("mode").addEventListener("select", function() {
                if (dialog.dialogElement("save").selected) {
                    if (!locationText) {
                        locationText = downLocation.parentNode.insertBefore(document.createElement("textbox"), downLocation);
                        locationText.id = "locationtext";
                        locationText.setAttribute("style", "margin-top:-2px;margin-bottom:-3px");
                        locationText.value = downLocation.value;
                    }
                    downLocation.hidden = true;
                    locationText.hidden = false;
                } else {
                    locationText.hidden = true;
                    downLocation.hidden = false;
                }
            }, false)

            dialog.dialogElement("save").selected && dialog.dialogElement("save").click();

            window.addEventListener("dialogaccept", function() {
                if ((locationText.value != downLocation.value) && dialog.dialogElement("save").selected) {
                    if(ns.appVersion >= 23){
                        ns.mainwin.eval("(" + ns.mainwin.internalSave.toString()
                            .replace("let ", "")
                            .replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")
                            (dialog.mLauncher.source.asciiSpec, null, locationText.value, null, null, null, null, null, null,
                                ns.mainwin.document, Services.prefs.getBoolPref("browser.download.useDownloadDir"), null);
                    }else{
                        dialog.mLauncher.saveToDisk(dialog.promptForSaveToFile(dialog.mLauncher, window, locationText.value), 1);
                        dialog.onCancel = null;
                    }

                    document.documentElement.removeAttribute("ondialogaccept");
                }
            }, false);
        },
        download_dialog_saveAs: function () {
            var saveas = document.documentElement.getButton("extra1");
            saveas.setAttribute("hidden", "false");
            saveas.setAttribute("label", "另存为");

            saveas.addEventListener("command", function(event){
                let locationText = $("locationtext");

                if(ns.appVersion >= 23){
                    ns.mainwin.eval("(" + ns.mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")
                        (dialog.mLauncher.source.asciiSpec, null, (locationText ? locationText.value : dialog.mLauncher.suggestedFileName), null, null, null, null, null, null, ns.mainwin.document, 0, null);
                }else{
                    var file = (dialog.promptForSaveToFileAsync || dialog.promptForSaveToFile).call(dialog, dialog.mLauncher, window, dialog.mLauncher.suggestedFileName, "", true);
                    if (file) {
                        dialog.mLauncher.saveToDisk(file, 1);
                        dialog.onCancel = function() {};
                    }
                }
                close();

            }, false);
        },
        download_dialog_showCompleteURL: function () {
            var s = $("source");
            s.value = dialog.mLauncher.source.spec;
            s.setAttribute("crop", "center");
            s.setAttribute("tooltiptext", dialog.mLauncher.source.spec);
            s.addEventListener("dblclick", function() {
                Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper)
                    .copyString(dialog.mLauncher.source.spec)
            }, false);
        }
    };

    ns.init();

    // From downloadSoundPlay.uc.js By Alice0775
    function downloadSoundPlay(){
        if(window.downloadPlaySound){
            window.downloadPlaySound.uninit();
            delete window.downloadPlaySound;
        }

        window.downloadPlaySound = {
            DL_START: "",
            DL_DONE: "file:///C:/WINDOWS/Media/chimes.wav", //设置响铃
            DL_CANCEL: "",
            DL_FAILED: "",

            observerService: null,
            init: function sampleDownload_init() {
                window.addEventListener("unload", this, false);
                this.observerService = Components.classes["@mozilla.org/observer-service;1"]
                    .getService(Components.interfaces.nsIObserverService);
                this.observerService.addObserver(this, "dl-start", false);
                this.observerService.addObserver(this, "dl-done", false);
                this.observerService.addObserver(this, "dl-cancel", false);
                this.observerService.addObserver(this, "dl-failed", false);
            },

            uninit: function() {
                window.removeEventListener("unload", this, false);
                this.observerService.removeObserver(this, "dl-start");
                this.observerService.removeObserver(this, "dl-done");
                this.observerService.removeObserver(this, "dl-cancel");
                this.observerService.removeObserver(this, "dl-failed");
            },

            observe: function(subject, topic, state) {
                var oDownload = subject.QueryInterface(Components.interfaces.nsIDownload);
                var oFile = null;
                try {
                    oFile = oDownload.targetFile;
                } catch (e) {
                    oFile = oDownload.target;
                }

                if (topic == "dl-start") {
                    if (this.DL_START)
                        this.playSoundFile(this.DL_START);
                }

                if (topic == "dl-cancel") {
                    if (this.DL_CANCEL) this.playSoundFile(this.DL_CANCEL);
                } else if (topic == "dl-failed") {
                    if (this.DL_FAILED) this.playSoundFile(this.DL_FAILED);
                } else if (topic == "dl-done") {
                    if (this.DL_DONE) this.playSoundFile(this.DL_DONE);
                }
            },

            playSoundFile: function(aFilePath) {
                var ios = Components.classes["@mozilla.org/network/io-service;1"]
                    .createInstance(Components.interfaces["nsIIOService"]);
                try {
                    var uri = ios.newURI(aFilePath, "UTF-8", null);
                } catch (e) {
                    return;
                }
                var file = uri.QueryInterface(Components.interfaces.nsIFileURL).file;
                if (!file.exists()) return;
                this.play(uri);
            },

            play: function(aUri) {
                var sound = Components.classes["@mozilla.org/sound;1"]
                    .createInstance(Components.interfaces["nsISound"]);
                sound.play(aUri);
            },

            handleEvent: function(event) {
                switch (event.type) {
                    case "load":
                        this.init();
                        break;
                    case "unload":
                        this.uninit();
                        break;
                }
            }
        };
        window.downloadPlaySound.init();
    }

    function $(id, doc){
        doc = doc || document;
        return doc.getElementById(id);
    }

})();

//FixDownloadFileSize，按文件资源管理器去掉多余小数，而不是FX自带的四舍五入
location == "chrome://browser/content/browser.xul" && (DownloadUtils.convertByteUnits = 
function DU_convertByteUnits(aBytes) {
	let unitIndex = 0;
	while ((aBytes >= 999.5) && (unitIndex < 3)) {
		aBytes /= 1024;
		unitIndex++;
	}
	return [(aBytes > 0) && (aBytes < 100) && (unitIndex != 0) ? (aBytes < 10 ? (parseInt(aBytes * 100) / 100).toFixed(2) : (parseInt(aBytes * 10) / 10).toFixed(1)): parseInt(aBytes), ['bytes', 'KB', 'MB', 'GB'][unitIndex]];
});