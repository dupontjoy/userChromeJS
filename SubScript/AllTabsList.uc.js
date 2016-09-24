// ==UserScript==
// @Name       标签页计数下拉列表中直接操作标签页 AllTabsList.uc.js
// @description  标签页计数下拉列表中直接操作标签页，右键/中键点击关闭标签页+左键点击刷新标签页+鼠标悬停自动聚焦标签页。整理自：http://bbs.kafan.cn/forum.php?mod=redirect&goto=findpost&pid=32866742&ptid=1739599
// @author       Drager-oos
// @include       main
// @version       1.0
// ==/UserScript==

(function() {
    function $(id) document.getElementById(id);
 
    $("alltabs-popup").addEventListener('click', function(e) {
        var tab = e.target.tab;
        if (tab) {
            if (e.button == 2) { // 右键点击关闭标签页
                gBrowser.removeTab(tab);
            }
            else if (e.button == 1) { // 中键点击复制标签页
                gBrowser.duplicateTab(tab);
                this.hidePopup();
                this.openPopup($("alltabs-button"));
            }
            else if (e.button == 0) { // 左键点击强制刷新标签页
                gBrowser.selectedTab = tab;
                BrowserReloadSkipCache();
            }
        }
        e.preventDefault();
        e.stopPropagation();
    }, false);
 
    $("alltabs-popup").addEventListener('mouseover', function(e) {
        e.originalTarget.setAttribute('closemenu', 'none'); // 不关闭菜单
        var tab = e.target.tab;
        if (tab) {
            var focusDelay = setTimeout(function() { // 鼠标悬停自动聚焦标签页
                gBrowser.selectedTab = tab;
            }, 500);
            if (focusDelay) {
                this.addEventListener('mouseout', function() {
                    clearTimeout(focusDelay);
                    focusDelay = null;
                }, false);
            }
        }
    }, false);
})();