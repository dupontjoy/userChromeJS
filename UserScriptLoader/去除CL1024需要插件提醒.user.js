// ==UserScript==
// @name        去除CL1024需要插件提醒
// @namespace   times.eu.org
// @description 去除1024论坛 播放在线视频需要安装插件的提示
// @include http*://wo.yao.cl/
// @include http*://*t66y*
// @include http*://*184*
// @include http*://*shenyingwang*
// @include http*://*cl*
// @include http*://*c1*
// @include http*://*1024*

// 自定義
// @exclude http*://*cntv*

// @version     1.0

// @grant       none
// ==/UserScript==
(function (embedList) {
  [
  ].forEach.call(embedList, function (i) {
    var iframe = document.createElement('iframe');
    iframe.src = i.src,
    iframe.width = i.width,
    iframe.height = i.height;
    i.parentNode.replaceChild(iframe, i);
  });
}) (document.querySelectorAll('embed'));
