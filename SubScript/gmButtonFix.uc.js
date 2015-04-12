// ==UserScript==
// @name           gmButtonFix.uc.js
// @description    去除Greasemonkey图标下拉三角并增加右键打开菜单
// @author         mouwen
// @namespace      gmButtonFix@mouwen
// @include        main
// @charset        UTF-8
// @version        2014.06.19
// @note           精简修改自moveButton.uc.js@ywzhaiqi

location == "chrome://browser/content/browser.xul" && (function(){
document.getElementById("greasemonkey-tbb").setAttribute("type", "");
document.getElementById("greasemonkey-tbb").setAttribute("context", "greasemonkey-popup");

document.querySelector("#greasemonkey-tbb > menupopup").setAttribute("id", "greasemonkey-popup");
})();