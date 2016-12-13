// ==UserScript==
// @name                 TabOpenBrowserAutoFocus.uc.js
// @description       打開新分頁自動聚焦瀏覽頁面
// @startup        window.CustomNewTab.onLoad();
// @shutdown       window.CustomNewTab.onUnload();
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              0.2
// @include              main
// @include              chrome://browser/content/browser.xul
// @note                   2016.7.17 0.2 修正新視窗無效的問題
// @note                   2016.7.16 0.1
// ==/UserScript==
(function() {
    if (window.CustomNewTab) {
        window.CustomNewTab.onUnload();
        delete window.CustomNewTab;
    }
    window.CustomNewTab = {
        newTabfocus: function() {
            if (/^(about|http|file|chrome)/.test(gBrowser.selectedBrowser.currentURI.spec)) {
                setTimeout(function() {
                    gBrowser.selectedBrowser.focus();
                }, 0);
            }
        },
        onLoad: function() {
            gBrowser.tabContainer.addEventListener('TabOpen', this.newTabfocus, false);
        },
        onUnload: function() {
            gBrowser.tabContainer.removeEventListener('TabOpen', this.newTabfocus, false);
        },
    }
    CustomNewTab.onLoad();
})();