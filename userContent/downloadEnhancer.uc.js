// ==UserScript==
// @id             downloadEnhancer
// @name           Download Dialog Enhancer
// @version        1.6.8
// @namespace      simon
// @author         Simon Chan
// @description    Add copying link, saving as, encoding conversion and renaming functions to download dialog.
// @include        chrome://browser/content/browser.xul
// @include        chrome://mozapps/content/downloads/unknownContentType.xul
// @run-at         document-end
// @grant          none
// ==/UserScript==

(function () {
    "use strict;"

    var donnotBlur = true
    var copyLink = true
    var saveAs = true
    var rename = true
    var encodingConvert = true

    if (document.location == "chrome://browser/content/browser.xul" && encodingConvert) {
        const obsService = Cc['@mozilla.org/observer-service;1'].getService(Ci.nsIObserverService);
        const RESPONSE_TOPIC = 'http-on-examine-response';

        var respObserver = {
            observing: false,
            observe: function (subject, topic, data) {
                try {
                    let channel = subject.QueryInterface(Ci.nsIHttpChannel);
                    let header = channel.contentDispositionHeader;
                    let associatedWindow = channel.notificationCallbacks
                                            .getInterface(Components.interfaces.nsILoadContext)
                                            .associatedWindow;
                    associatedWindow.localStorage.setItem(channel.URI.spec, header.split("=")[1]);
                } catch (ex) { }
            },
            start: function () {
                if (!this.observing) {
                    obsService.addObserver(this, RESPONSE_TOPIC, false);
                    this.observing = true;
                }
            },
            stop: function () {
                if (this.observing) {
                    obsService.removeObserver(this, RESPONSE_TOPIC, false);
                    this.observing = false;
                }
            }
        };

        respObserver.start();
        addEventListener("beforeunload", function () {
            respObserver.stop();
        })
    }
    else if (document.location == "chrome://mozapps/content/downloads/unknownContentType.xul") {
        if (donnotBlur)
            dialog.onBlur = function () { };

        var saveButton = document.documentElement.getButton("accept");

        if (copyLink) {
            var copyButton = document.createElement("button");
            copyButton.className = "dialog-button";
            copyButton.setAttribute("label", "Copy Link");
            copyButton.addEventListener("click", function () {
                Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper)
                    .copyString(dialog.mLauncher.source.spec);
            });
            saveButton.parentNode.insertBefore(copyButton, saveButton.nextSibling);
        }

        var prefs = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefService);
        prefs = prefs.getBranch("browser.download.");

        if (saveAs && prefs.getBoolPref("useDownloadDir")) {
            var saveAsButton = document.createElement("button");
            saveAsButton.className = "dialog-button";
            saveAsButton.setAttribute("label", "Save as...");
            saveAsButton.addEventListener("click", function () {
                var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                    .getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
                mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "")
                    .replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")
                    (dialog.mLauncher.source.asciiSpec, null, document.querySelector("#locationtext").value, null, null,
                    null, null, null, null, mainwin.document, false, null);
                close();
            });
            saveButton.parentNode.insertBefore(saveAsButton, saveButton.nextSibling);
        }

        if (rename || encodingConvert) {
            if (encodingConvert) {
                var orginalString = (opener.localStorage.getItem(dialog.mLauncher.source.spec) ||
                    dialog.mLauncher.source.asciiSpec.substring(dialog.mLauncher.source.asciiSpec.lastIndexOf("/"))).replace(/[\/:*?"<>|]/g, "");
                opener.localStorage.removeItem(dialog.mLauncher.source.spec);
            }
            var locationLabel = document.querySelector("#location");
            if (encodingConvert)
                var locationText = document.createElement("menulist");
            else
                var locationText = document.createElement("textbox");
            locationLabel.parentNode.insertBefore(locationText, locationLabel);
            locationText.id = "locationtext";
            if (rename && encodingConvert)
                locationText.setAttribute("editable", "true");
            locationText.setAttribute("style", "margin-top:-2px;margin-bottom:-3px");
            if (rename)
                locationText.value = dialog.mLauncher.suggestedFileName;
            if (encodingConvert) {
                locationText.addEventListener("command", function (e) {
                    if (rename)
                        locationText.value = e.target.value;
                    document.title = "Opening " + e.target.value;
                });

                let menupopup = locationText.appendChild(document.createElement("menupopup"));
                let menuitem = menupopup.appendChild(document.createElement("menuitem"));
                menuitem.value = dialog.mLauncher.suggestedFileName;
                menuitem.label = "Original: " + menuitem.value;
                if (!rename)
                    locationText.value = menuitem.value;

                let converter = Components.classes['@mozilla.org/intl/scriptableunicodeconverter']
                                .getService(Components.interfaces.nsIScriptableUnicodeConverter);

                function createMenuitem(encoding) {
                    converter.charset = encoding;
                    let menuitem = menupopup.appendChild(document.createElement("menuitem"));
                    menuitem.value = converter.ConvertToUnicode(orginalString).replace(/^"(.+)"$/, "$1");
                    menuitem.label = encoding + ": " + menuitem.value;
                    //黒仪大螃蟹：http://tieba.baidu.com/p/2743684143?pn=2（43樓）
                    locationText.setAttribute("tooltiptext","Ctrl+\u70B9\u51FB\u8F6C\u6362url\u7F16\u7801\n\u5DE6\u952E\u003AUNICODE\n\u53F3\u952E\u003AGB2312");
locationText.addEventListener("click",function(e){
if(e.ctrlKey){
if(e.button==0)
this.value = decodeURIComponent(this.value);
if(e.button==2){
e.preventDefault();
converter.charset = "GB2312";
this.value = converter.ConvertToUnicode(unescape(this.value));
}
}
},false);
                }
                ["GB18030", "BIG5", "Shift-JIS"].forEach(function (item) { createMenuitem(item) });
            }

            function toggleState() {
                if (dialog.dialogElement("save").selected) {
                    locationLabel.hidden = true;
                    locationText.hidden = false;
                } else {
                    locationLabel.hidden = false;
                    locationText.hidden = true;
                }
            }
            document.querySelector("#mode").addEventListener("select", toggleState, false);
            toggleState();

            window.addEventListener("dialogaccept", function () {
                if (dialog.dialogElement("save").selected) {
                    var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                        .getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
                    mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "")
                        .replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")
                        (dialog.mLauncher.source.asciiSpec, null, document.querySelector("#locationtext").value, null, null, null,
                        null, null, null, mainwin.document, prefs.getBoolPref("useDownloadDir"), null);
                    document.documentElement.removeAttribute("ondialogaccept");
                }
            });
        }
    }
})();