// ==UserScript==
// @name         网页自动化系列点击【Rules】
// @namespace    autoClick1by1.jasonshaw
// @version      0.3
// @description  匹配的任意url，顺序逐个点击设定的obj，任意不存在则彻底停止
// @include      *
// @require      https://github.com/jasonshaw/userscript/raw/master/autoClick1by1.user.js
// @note         允许自定义网站的点击延迟时间
// @note         允许自定义网站的是否在系列点击之后关闭网页
// @note         支持kds阻止相册自动翻页
// @note         支持睿派克、人大论坛自动等自动签到
// @note         支持卡饭、睿派克自动关闭侧栏
// @note         支持太平洋汽车本页展开全部内容
// @run-at       document-end
// @copyright    2014+, jasonshaw
// ==/UserScript==
	var prefs = {
		'kds': {
			startReg: /http:\/\/model\.kdslife\.com\/show\/photo\/\d+\.html/i,//定义href正则
			autoClose: true,//config中dom.allow_scripts_to_close_windows  需要为true, 存在风险，请谨慎使用
			elements: ['.bigp_nav2 > form > input[value="stop"]'],//所有参数为要点击的按钮的css3 selector
			delay: 500
		},
		'repaik': {
			startReg: /http:\/\/www\.repaik\.com\/forum\.php\?mod=viewthread&tid=\d+/i,
			elements: ['a.btn_s_close']
		},
		'pcauto': {
			startReg: /http:\/\/\w+\.pcauto\.com\.cn\/.+\.html/i,
			elements: ['div.pageViewGuidedd > a[rel="nofollow"]']
		},
		'pinggu': {
			startReg: /http:\/\/bbs\.pinggu\.org\/plugin\.php\?id=dsu_paulsign:sign/,
			elements: ['ul.qdsmile > li#fd','table[class="tfm qdtfm"] input[value="2"]','td.qdnewtd3 > a']
		},
		'repaik1': {
			startReg: /http:\/\/www\.repaik\.com\/plugin\.php\?id=dsu_paulsign:sign/,
			elements: ['ul.qdsmile > li#ch','table[class="tfm"] input[value="2"]','.tr3 > div:nth-child(2) > a > img']
		},
		'kafan': {
			startReg: /http:\/\/bbs\.kafan\.cn\/thread-\d+-\d+-\d+\.html/,
			elements: ['a.btn_s_close']
		},
		'sjlpj': {
			startReg: /http:\/\/ic\.sjlpj\.cn/,
			elements: ['m_030112']
		}
	};
