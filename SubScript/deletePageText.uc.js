// ==UserScript==
// @name           deletePageText.uc.js
// @description    delete键删除网页内容，便于保存干净的网页。
// ==/UserScript==
location=="chrome://browser/content/browser.xul"&&window.addEventListener("keyup",function(e){e.keyCode==46&&content.getSelection().toString()&&content.getSelection().deleteFromDocument(0)},0)