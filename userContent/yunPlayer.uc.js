// ==UserScript==
// @name           yunPlayer.uc.js
// @description    右键菜单调用云点播
// @namespace      https://github.com/ywzhaiqi
// @author         ywzhaiqi
// @include        main
// @charset        UTF-8
// @version        2013-12-3
// @homepageURL    https://github.com/ywzhaiqi/userChromeJS/blob/master/ExternalVideoPlayer/yunPlayer.uc.js
// ==/UserScript==

(function (){

    var API_URLS = {
        "迅雷云播": "http://vod.xunlei.com/iplay.html?uvs=luserid_5_lsessionid&from=vlist&url=",

    };

    var LINK_CLICKED_COLOR = "#666666";
    // var LINK_REGEXP = /.*/;
    var LINK_REGEXP = /^(?:thunder|ed2k|magnet|flashget|qqdl):|\.(?:mp4|flv|rm|rmvb|mkv|asf|wmv|avi|mpeg|mpg|mov|qt)$|^http:\/\/dl[^\/]+sendfile.vip.xunlei.com/i;

    if(window.yunPlayer){
        window.yunPlayer.uninit();
        delete window.yunPlayer;
    }

    const { classes: Cc, interfaces: Ci, utils: Cu } = Components;

    window.yunPlayer = {
        get focusedWindow() {
            return gContextMenu && gContextMenu.target ? gContextMenu.target.ownerDocument.defaultView : content;
        },

        init: function(){
            var contextMenu = $("contentAreaContextMenu");

            var playerMenu = $C("menu", {
                id: "yun-player-context",
                label: "云点播",
                class: "menu-iconic",
                hidden: true,

            });

            var menuPopup = playerMenu.appendChild($C("menupopup"));
            for(var name in API_URLS){
                let url = API_URLS[name];
                menuPopup.appendChild($C("menuitem", {
                    label: name,
                    oncommand: "yunPlayer.run(this.parentNode.parentNode.getAttribute('tooltiptext'), this.label)",
                }));
            }

            contextMenu.insertBefore(playerMenu, contextMenu.firstChild);
            contextMenu.addEventListener("popupshowing", this, false);
        },
        uninit: function(){
            var contextMenu = $("contentAreaContextMenu");

            var playerMenu = $("yun-player-context");
            if(playerMenu)
                contextMenu.removeChild(playerMenu);

            contextMenu.removeEventListener("popupshowing", this, false);
        },
        handleEvent: function(event){
            switch(event.type){
                case "popupshowing":
                    var playerMenu = $("yun-player-context");

                    var hidden = true;
                    if(gContextMenu.onLink){
                        var url = gContextMenu.linkURL;
                        if(LINK_REGEXP.test(url)){
                            playerMenu.setAttribute("tooltiptext", url);
                            hidden = false;
                        }
                    } else {
                        var selection = this.getSelection();
                        if(LINK_REGEXP.test(selection)){
                            playerMenu.setAttribute("tooltiptext", selection);
                            hidden = false;
                        }
                    }

                    playerMenu.hidden = hidden;
                    break;
            }
        },
        run: function(url, apiName){
            if(!url) return;
            if(!apiName){
                apiName = "快乐云点播";
            }

            if(gContextMenu.target){
                gContextMenu.target.style.color = LINK_CLICKED_COLOR;
            }

            // 迅雷云播磁力链接
            if (apiName == "迅雷云播" && url.startsWith("magnet:")) {
                url = encodeURIComponent(url);
            }

            url = API_URLS[apiName] + url;
            var nextTabIndex = gBrowser.mCurrentTab._tPos + 1;
            var tab = gBrowser.loadOneTab(url, null, null, null, false, false);
            gBrowser.moveTabTo(tab, nextTabIndex);
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
            }
            return res;
        },
        copy: function(str){
            Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper)
                .copyString(str);
        }
    };

    function $(id) document.getElementById(id)
    function $C(name, attr) {
        var el = document.createElement(name);
        if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
        return el;
    }
})();

window.yunPlayer.init();