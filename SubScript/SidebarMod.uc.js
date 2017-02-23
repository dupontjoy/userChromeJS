// ==UserScript==
// @name            SidebarPlus.uc.js
// @description     侧边栏按钮以及功能增强
// @include         chrome://browser/content/browser.xul
// @charset         UTF-8
// @note            v2016.01.11 添加双击标题栏使侧边栏靠右及呼出侧边栏按钮, 精选国内国外流行网站 by runningcheese
// @note            v2015.08.05 添加双击页面空白处隐藏侧边栏
// @note            v2013.07.30 添加几个小书签脚本
// @note            v2013.07.26 添加侧栏前进、后退、刷新按钮
// @note            v2013.07.15 侧栏激活挂在主页按钮
// ==/UserScript==
/* *********************使用说明*********************
	此脚本从lastdream2013的SidebarMod.uc.js修改而来，原作者是NightsoN，感谢他们
	去除了某些我用不到的站点以及Splitter，开关直接使用FF自带的按钮或快捷键吧ctrl+B或ctrl+H
	添加侧栏前进、后退以及刷新的3合1按钮
*/


//------------侧边栏按钮------------
(function(){
CustomizableUI.createWidget({
id: "Sidebar-button",
defaultArea: CustomizableUI.AREA_NAVBAR,
label: "侧边栏",
tooltiptext: "左键：历史侧边栏\n右键：书签侧边栏",
onClick: function(event){
switch (event.button) {
case 0:
// 左键：历史侧边栏
SidebarUI.toggle("viewHistorySidebar");
break;
case 1:
// 中键：样式侧边栏
break;
case 2:
// 右键：书签侧边栏
event.preventDefault();
SidebarUI.toggle("viewBookmarksSidebar");
break;
}
}
});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#Sidebar-button[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAAAAAAPCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADm16n4AAAAC3RSTlMA7AoynI1/byniVqVdBlsAAAA4SURBVAjXY8AEzIG7RZdKbwxm4E5WMttmpJzNwA0U3cAApChlOO4W2SK90ZuBs0KpfXuTRiWm5QCyBRE/SPD7PAAAAABJRU5ErkJggg==)'
		 + '}}'
     + '#Sidebar-button[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #Sidebar-button .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEUAAAAZGRkZGRkZGRkZGRkZGRkZGRkaGhoZGRkZGRlLIIzdAAAACXRSTlMA8q0nEW7ownaT3dFpAAAAS0lEQVQoz2MgDJgVZyIBIQMGsxBkaddkBlVkfjlDE4MIqoAjwwRUIzkxBWaiAZAKZFWcowJoAiKoAo4MqqgCTeCImoAUUZhRSRAAADDWNJrdq5jnAAAAAElFTkSuQmCC)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();



//右键  三道杠 弹出 侧边栏
(function (doc) {
        var ViewHistorySidebar = doc.getElementById('PanelUI-menu-button');
        if (!ViewHistorySidebar) return;
        var menupopup = ViewHistorySidebar.firstChild;
        ViewHistorySidebar.addEventListener("click", function (e) {
            if (e.button == 2) {
               e.preventDefault();
                (function(){
         var id = [13]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = 1;
            style.save();
        }
    })();
             SidebarUI.toggle("viewHistorySidebar"); 
            }
        }, false);
    })(document);


//双击标题栏使侧边栏靠右
(function (doc) {
        var Sidebarfloatright = doc.getElementById('sidebar-title');
        if (!Sidebarfloatright) return;
        var menupopup = Sidebarfloatright.firstChild;
        Sidebarfloatright.addEventListener("dblclick", function (e) {
            if (e.button == 0) {
               (function(){
        var id = [13]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
    })(); 
            }
        }, false);
    })(document);


(function () {

if (!document.getElementById('sidebar-box')) return;
if (!window.SidebarMod) {
	window.SidebarMod = {
		operaLikeToggler: true,//Opera Style
		sitelist:[
			{
				name: '书签',
				url: 'chrome://browser/content/bookmarks/bookmarksPanel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAAAAAAAAAAAAAAAHBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACqim21AAAAFXRSTlMAj1RtD9/Xq38owriYeDMHhR4XSjowWlNmAAAAcElEQVQY022PSw6EMAxDHactbekHmOH+V53FJBIIvIj1LFmKYVoW3FRq3W+BkHLlkIAUHAb7qoDWzO8ByNk6xwRmocopQLuURfw6P9wU/5ac99W+LRZ8Nsy8BWRa0MmkGsnsw6IcQJBoVciwhQ0v+gFTkgJxFZPPfQAAAABJRU5ErkJggg=='
			},{
				name: '历史',
				url: 'chrome://browser/content/history/history-panel.xul',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAPFBMVEUAAAAAAAAaDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnTjqAAAAAE3RSTlMAOgmRUhfX9e2FM38r37Ygc2eeqdJPywAAAHVJREFUGNNtj0sOxDAIQyEp5NukHe5/1wFUFpX6Fg5Yghj4hNopwoOiP0rGlDDL8fS1A28tenWHSgdYt5Wz2NTIKtcPjNxUGFWwuoGniiSVJBv8CQOGrGua4SPGvhcDciw1YimVCY5/G8GcXiOqRPT3cY3giz/gegN1WNJGDQAAAABJRU5ErkJggg=='
			},{
				name: '拓展',
				url: 'about:addons',
				favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMzdu6AAAAEnRSTlMAfzpDTCEK38+9s6iFeGqNVjKYYQrKAAAAcElEQVQY02WOWw6FIAxEp7wRQe3+F3t7sUUTz8cknNBOMUmNS8SLURNtb7ETfLGH5z84JPwU7KA4vgUWKpiWKDXKx5iDii30rB1Gkqk++LKRozbJ5mGCRtLVbj+flnkcZVrCyfoTke2wwELHJSn1X34e5wRDvcBIqAAAAABJRU5ErkJggg=='
			},

{name: '常用网站',
	favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdUlEQVQ4jeWSuxGAIBAFNyKwAQqgDCqgElugGMuxBzsgsQhNzhl/HMiQ+WZetG/2koPOCUACtkyTbLJJgFe4l80l9yulqPtaQRv8qWCQNgkcsEjdV0EAVmCUnj+wKIg8P/L4wFgjmAH7wqwwVTABRuFGNv2yA9EcMeSFWETqAAAAAElFTkSuQmCC',
	childs: [
{
		 name: '稍后阅读',
		 url: 'https://getpocket.com/a/queue/list/',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAUVBMVEUAAADuQlfwQlfhQFDvQVftQVbuQFbwQljvQljuQlfvQVjrQlbvQVfuQlbsQVXnQVTvQVfqQFTrQFTuQlbmQVPsQVboQFDxQljuQVbuQlfwQliievgtAAAAGXRSTlMA8uk79ycf8uHJopyQhntrUUtEODIWBeIWpoZvsgAAAHtJREFUGNNtjksShDAIRDsQ4/j/OwP3P+gEdKGlb5PmpasAD5oyXCgbqNxQhLsIr6IbyTKN3SkWFJ88F1hMRJEv40eUXEdrqDBSAke1RmW7lAFWzbHCoGZkmsTDgJ0Oo/7QDqx5MlyvyLB3/J/hbG3wI9sNOJn7uu5nj3++qw7oi6qhaQAAAABJRU5ErkJggg=='
			},{
      name: '新浪微博',
      url: 'http://m.weibo.cn/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABTVBMVEUAAAAAAADjHyW4uLhgYmLhExfvkADiJyjeGxzdGCbgKSTeGRvjUBffYBH6///t////9/j/8fLL4uH/2NnQ0NC+y8uLpqXyn6D9jI93i4t4ionsbG9XWVnnRklDQ0MkJCQUFxfiIyj9mADgFBj+ogDdAwfgEhbxlAD5mADxP0PlKSreESvwkwDiDRDxlADhGSfgIyb4mgDWgADiFy3EgQDxlwHfCg/ylAD9lQHzJirgGynfFiX6LTHjKSzliQDaHiHjDA/GAADkEhbxlADynQCQWADZnwDfISPclgDwkwC/fgDOEhLbHyPxlAD2mgDoDBDvAC7rjgDsjwDMdAD////lJCjgDBDgBgviHCDhFRn/kpTqVlnmOz/kKCzhEBXeAAT2mAD/3d6yxcX7nqD0nZ9/mpn0j5Lwi47miYv6f4I9Xl3oOT0bOzvkLzPiGCoKOc6VAAAAVHRSTlMA/tL+/qaMZ2JKNRkJBf7+/v7+/v7+/v7+/v7+/v7+/v78+/r49/Dq5OLi4ODU0crKyr63trSzsrGqqKWgnZeShYFya2FZWFVTUE5NREM7NzYxJhObZE0TAAAAxElEQVQY033Ixa4CQRRF0VON23N3d3fB3fVWC+4O/z8EEiYkhDXa2VjA8/Qdmxnah+tyaNp6hwGweNPacgpjUYHzO8D8eZN5ewWg41yWBf3/u/Hnw3cBBApKSZTPJXH4F/fbz2A6lQo76yuV+qH0DISDsEm51aWt3TWiffE+CeAqT8snjDEV0UARAJRapD5WHTE1Ub74AuArR3sHG4xt0rbIDQBMjx1q9LtVahYVHSYsrttsu5btXWqMmEq4rb8aZ8SMuUY5GiMfE/vy4wAAAABJRU5ErkJggg=='
       },{
			name: 'Twitter',
			url: 'https://mobile.twitter.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAqFBMVEUAAABNnNZSpeNUquw7eqtOn9pMn9tSpuVTqulWrfBRod9UquxTqupRod5ImtVNoN1QqetVqelLnNhKoONVrO9fwP9UqutTpeZSpONOouFVq+1KlchFltVQqORSo99TqOdQo+IugcdVrvJRo+RVq+pQpudLnNk0lL1Gn+UtWXlXsfRZtPQHDBhVrO5WrfBVrO9Wr/FUq+xbu/tYretTqelXsfRasPBSpeTa/vOqAAAALXRSTlMABLq5NCoh9dPMqKeilFZDNDAQCfbw7+3j0rukopyYkod3dG1kX1ozLSwnFg1mfTAtAAAAm0lEQVQY03WPRw7CQAxFnd47vfdueyYJcP+boRkIG8Rbfb1vWTb8YHQhNc0DHF1w16DJPCm9ZHaCrAnVUDUUxCT7Nrj0GKcGlEiIWE9vAEsSzShZICNybQM4Zo+IUMNtAVC2pCIrIQZqXR5gB8WgiOgrCi1W948Rc3hzsVj3gb76erZ3PiMTW5WunfApVe/vu+fyTWxNoq0Df3gBlY4VuZsJdXYAAAAASUVORK5CYII='
						},{
			name: 'Instagram',
			url: 'https://www.instagram.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACQFBMVEUAAACAZ1R7YE5yW0qKb2CVb1x7ZViOZVdiP0I6JiGAZVVsVUgrARM3EQg4kcRpT0BkRD55XUtpU4OFaVx8U0lvVUQjEw8nBgunjX+PeXGPe22AdG2PdWWAamKIa150XlKEW06LUDFuUkVbRDg/FSRDHxNkSTldOzRTPjGVey2CWlSSRU41HBYnGhIAAAH////g0b/ayrbYxKzSwavOuqE3LCwCDxD58u//+Owqu+r07N3u5tfp3dHi1L/dzrvVx7PNv6nSvaTHs5iyno6nlIdoS3mQeG9kXVs8Qk6UYkhRPjgXKCZAKyRFKyNEIBgCDxgMFxD9+/IUsu37+Ovv6+j78eX28OLo4dz16Nji3tXs4s/n2svl2cnf1MnJycnq38jg1MLe1MHe073Xx7DNvbDQxK3Tw62wq6fVv6W9t6PSup/AsZ7Gtp3NtpzKr5Q6fJO4oZFBdJBmco7Bq42ckIyVjYpibIe5n4ItYIG3nIBrh35zd3mSf3ZUMHWFc2pJYmqKdWhMRmN2Z2GWa16PcFyxeVsrUVc0UFebc1SaZ1RLSVSrcFMiSFOYbVBwWVBHUFB9YU81Uk+paU2VakycXUpGKkpBJkoYOEiPYkeaYEU0LUSUYUNhSkPn5UKRXkEjQUEmKEGRi0CRVD9vTT3h1zs7PTglLzc5MTSbMDRBNDP3LjEbLS/RLCwQICuHPypJNCqgUSkiGCjn5SYyJib/IiZXLiUzJiQnDyOXSiINFiBLJx4lHx4dFRQLDAQOCASBJQBcifjvAAAALnRSTlMA7e3u7e3t7V5e9vb29vLy8vDu7u7u7u7t7e3t7e3t7e3t5OTk5NDQ0NBgYGBgmit8wwAAARtJREFUGNMFwQNiAwEQAMCNk9q2eRfbdlLbtm3btm27/VpnAGKjHVyCSQQCKcjNKTIGgHx9zFO9r8+ML218IuwvMoRd7vBU97rdLd2iEdk/DQe758fEnr/lkanDWzNy82QPnucHDSsT3a2N6qEXk8nsAT6dA0cVXZb2OraGk5yW4Qte1LLcFsSy0DeGNKMo1xvw6Sh6hlg3Vyf3TjgJWf7gJ0rlshDrw9v36JwwiUoEPFWQMoiwf34NBk0Ov4gIAWIhX8n6WJu+eu3NLGQEgistX1A8e6HVsvRVeSVMHNjQaQXZiu07o14pkkjlthBSU0oTS+rV/QoGQ1rdFgqU4drKcjqdyZTJ5E0d8xSAuAhnLBaDwWBx7o5R8fAPkv5TRaxPYM0AAAAASUVORK5CYII='
						},{
			name: 'Youtube',
			url: 'https://www.youtube.com/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAz1BMVEUAAAD////lLSfAFx3spKTOAADPJCXvs7PUIyPRISLYJSPdKCTJHCDAFx3lLSfAFx3lLSbFGB7JIh3HBwfIAADfREHRLy/45OTzvr3WODfw1tXbUVDOHyHOHyHbKCXKHSDIHCDdJyTlLSflLSfAFx2/Fx3qMCngLia/ExbeJB6uFBm+ERO0FBnbIxzjKybbJyXEGh7KHR/HHB/eKSXYJCLUIiLRICHOHiDGGyDoLirgKyffKyfLISPGGBvOFRbUExLUBALEAAHdIBzcGhbGCw51TfyoAAAALnRSTlMA/qmp/P79/PT08OHhpKOfkIxE/v78/Pv7+/r68fDo58zIm5qXl4B+eWdiXFZMi05ZjAAAAJVJREFUGNONz8UCgkAUQNE3inTb3R3IDCod6v9/kw9XLDmru71Qg70313oD6StzZwNcg1tFcIRlyBiLPu+IlUIFFKfU9XLnbwayh/JBf9zKHCwZxAdqcYSMhhmWCNITdQRCuF6KJcH0hdqcwBcpjzUB1UWxW3xjtzSHBfUppUlCEaYKZ/9e4R8ALtbW0JpIMzbWqcbrD0iZHNqhgn5zAAAAAElFTkSuQmCC'
						},{
			name: '知乎日报',
			url: 'http://zhihudaily.me/',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAw1BMVEVi0f8wwf0tv/wrvfgDmc0NodcHnNEWp+IUpd8Qottl0//l9/4hs+4dsOkJndQEm88aq+cQpdwKn9UFls0Bl8sDlcv0/f8+xf2v4fap3vQjtvEeruwUo94KmtEBlMnr+v8oufQZrOUYquT4/f/c8/zS8PzK7fs0wPuo4vp61fq35fl20fYouvUouvQkt/Eis/Ass+0gqN4Qndbf9fu/6fgoufWj2vIwt/GQ0++Ez+5fwedhwuVbvuMpquNHsNwWotATkrsPqyMnAAAAuklEQVQY003HVxKCQBBF0VYHGBlAJ0gSJJhzznH/q7KBssrz0f0umKYJP1V4tT8edr00Hlffg0ZhOuz3h9NywnJxTCcu833mTtJ0sYRVGM7d2Xm93vjuPAxXYFnWiG266LkfYYBt20nQLhinBAOyPEsCoxC9rnmegUHpYbCNKKXRDq8BnDdvLNg2S5xz0IS2u7BBcNcqIBwnjh8z5jtICAG63iJSyjjWK0AI6SApCWkV4KOU6qGOUgS9v3y4Ew0x8HFQAAAAAElFTkSuQmCC'
						},{
      name: 'ONE一个',
      url: 'http://wufazhuce.com/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA9klEQVQ4je3RMUvDYBDG8TeCoIvWwQ5B3QSpo+DqqpPfQMHR7oJTQUFwKeL3aGo0DUYUBXGoUlQklLq7NfemaU0Qh79DhCLp5lLQ4eGe6Qd3p4yq8Juof+AnMGkH5J20T9j9OXUqmI4wWg1QlTaqEmSBlZuQ0kuX4mOPrYceztsHixchJT/mqJWweR8x52qWLjUFT2eBg2bMiJXKh82Yfb+f49eE3acus65m7VpT8MIssHobsfP8zkY9YrsRsefHmDVNvf1JuZWwftchdyYsX3UwBq1gWMKMq5k/T/v09y3yjmDWhAVPM2YL4yeCsgYBQ/HGPwp8AZZWrx7eI2yVAAAAAElFTkSuQmCC'
       },{
		 name: '扇贝单词',
		 url: 'http://www.shanbay.com/bdc/review/',
		 favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAwFBMVEUgnoUjoIcWmoAgnoUenYQRl30zppALlXlDrZgloIgAj3IfnoUBkHQhn4YRl32w3dSj18xIsJsanIITmX4KlXlvwLAXmoFYtqQNlnsAhGTD5d6z3taEybt9x7hqv685qZMvpY0Afl3w+Pfe8O3T7Oe94tu44Nis2tGl2M6a08iW0cWS0MOMzcBguqhTtKFFrZg+rJYzp5ArpIwmoYkEknYAimvq9fPM6OOe1MqPzL+Hy714xLV3xLRywrNduaYGk3dggsZ3AAAAC3RSTlPy8vLm8vLy8vLy8t/oGk4AAADKSURBVBjTLcvVcgJBFEXR2yMhSbuOG+5OPPD/f8VQzX47q+pACI9QEKAoBugnxlQpqhOpWb13WkEvR+fOy9WlmRxJ+9IDS0RKKpGV8247fYBKP5fZlpOZ3I3kAJAxph3uHJfCjhuCIKhqkv2P2Opr/bsnFCBOxnnT8YUtT4ZRDABEL4bfjJcsxX0Ab5R0uCjWyY16eC34vG7/+ME8AWQl+ET8WI09RMxcMrXJP2zqAbCWYpoLe1AeMGab2fV0Jo76Twgofh8EEfjCO+PoE9YCHLonAAAAAElFTkSuQmCC'
			},{
      name: '知乎网',
      url: 'http://m.zhihu.com/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACW0lEQVRYhc2XS2gTURSGhwpduRCkIIpbs3EhFPcKXVgoFFfiRtyIuLKb0gaNLaWIpYv6oi1UsNCKgihCBQUVW1AJdSNBaSdx0jwa0yZp0iQmTSYz+VwMGZLOtJ1AkvHAvzn3cb45d+499wpCn6db6F8NCwMiLVX/aljo83QLtgSvhrAteEX/NUDvVJCf6ztceRpuPcDJYR/pvEI8U+LQoA0ZuPNmA4Dn7pQ9S+CWchxkilqm62GAoy7vgX0rZgnAMSqhqmVLEzpfRxsPMP4+BsA7T4Z2p0i7UyQQLwLQMxnUfe1OrX81wPEhn0GOUck6QNugSHhLBuDq7LruDyc1X9eDgGGSagCzD9q3fbfj+nwERS3z6GOixr+xrQGcm1hrLsD5iTVOjUqGjolsCYCz4/7mAuyldF4BwGEC1xKAgqwC0OHyNRfg2JCPaEo230MmtriSbSzA4Kuo5eAAqZzS/CW48DgIwHpSrj9AIwBuvogA4P6dswdg/lsSgJmlreb/hGYKJWQ9A/FMic4xqXUAvVPa+hdklc8rWQD8sSInhn2tAfj0KwPA0mqWDpcPb7SgZ6NyUWkawMXpIOWyVpZvPIsgDIh0jkmkctqpeP9D3BAA4Mw9ictPQnpRqzbLAEdue5FiWgkOJoq0VV3LLs2EUNSyvit2A4h/dgyB6wZ4+yOtD7o2FzG0jyxs8kX8W+M7fMtLsaQd2dt5Rc/avjJzzn5N6sFfft/ec3DPZNDgW/bnWPbnOH3XWLQsAUwvJijIKt5ogZGFzZrUW5HZfaHuDLRU9gPY/ji1+Xn+DzW1nLHMXLKeAAAAAElFTkSuQmCC'
       },{
      name: '豆瓣网',
      url: 'http://m.douban.com',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABGElEQVRYhWNgKOfzZCgXfMZQLvifzvgZQzmfJ8MAWY5wxABaDsGDzgEP3j36Tyvw4N2jUQcMgTQwaBxw4dllqgX9hWeXh7gDbry6/b9hdwdJ+Mar29RzwIarW0mO2w1Xt446YBg5YMATIaVgaDoAhnfc3As36NGHJ/8VOvTx4kcfnsDV77i5l3B6IaQgZU0eim/Ue0xxqlXvMUVRm7Imj3IHyLRpoxhasLkKp9qCzVUoamXatCl3AEO54P9Lz6/CDd15ax9OdTtv7YOru/T8KnFZlhhFnQcmwg3+8fvHf64aKQw1XDVS/3/8/gFX13lgInkOoDUYdQBZaYCmeNQBDAPZOS0TfM7AUMrnxVAm+HwAHPCEoZTPCwCpFBoqmuUyPAAAAABJRU5ErkJggg=='
       },{
      name: '果壳网',
      url: 'http://m.guokr.com/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4klEQVQ4jZXRoQ6DMBAGYB5iZpnBoCdHZjA8wOYa/BSCDINAkBBmcAjkknksdhq3JwCFm+INbuq6o/Q6dknlfX/b39rcDrDmBI8jlJ0HZefB+bKTx1oL4HLWunPAaYa/0rXAtgqNQNa6Erje90vAdAuaXnYeiNiWyyLxvwCHmIAiDeaA7il0WW2gzqM5oCJqOgVE4usB+hT6eWoDRRrwwLYKtem0gTqPeMBpBkifJxYQsf0b6KdxAWADeH0WyF5vAIAFggAus0A/jYCja8AIYDod2gDWxwI0HaefRgnQ99d5BB+ezV767XUN9QAAAABJRU5ErkJggg=='
       },     
{
			name: '内涵段子',
			url: 'http://m.neihanshequ.com/?skip_guidence=1#',
			favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABoVBMVEUAAADis34yCwMAAAAYCQKheVqikn9UIw6qe04oEAU8GA6Qa1h1NSFeKRSAa0yshmkfCQKTYDkVCAOETyRkTTxLQThFKxdxUzVuNCRAJhNJFxBhLRoYDQahSzg1IBAlGA1IFg0nEAUPBgEWDAZNOy1THBkDAwM5EAP9w4f+woADAAD/6ab/6KHmxaH/15n/5Zb/z5TlyZH/1o3/yIzUrYDmqm/BkmqgZzxXOiZZLhNAFQUZAAD//83/87b/yaX/taP/36L/v6D/w5//657/zpz1wZP/4JHQspG0pZHnvJD/047yw4750435zYz/zon/rIn2uYjpmYj8o4fzu4b/X4b1v4X/cIX3voTMqoTpxIDZq32dgXv1t3rxs3j/vnf/vHT8uXSxnXSfeW7QnGugemr/uWn8rWbYm2POmGO6kGLOo2GrlWHNjmD4pl/CkV+cfl7Yk1fAhlWqflPPX1O4fFDFhU+gd0zfdkyMYkiia0XeR0R0VUCXZD9nQD2pZjqSYTmwXDd2UTW0UjPQSS5oOx5qMh5RKBRbJhJPIA8tDAAlBQBxpIPKAAAAJ3RSTlMA/o5PMO7r6t3a1Mq+t7KtqqScl5CQiYV9d2ppaGNiWFdORjgwGg2YmS65AAAA0klEQVQY02MAA2keXnYmBgRgaW/tsOoUQAgwdVmrW7apWylC+RJmZjWh2pp16upKYL6Cu422Tl6Fp7O5NSdYgCvfwFjTpNpCz6hFiwUkwGaboBEQraupoW+uxQwS4E5ycQiuTXQzjq/XkgHyhStTdA18nML8DT0sG0vlGBgEXe2j0iPtQoIMI4pMTMWBSvgdM7NLTPV9w1MLWUXUgAIqOcWBVQ1e3hq5QlCH8ZU3N2Xo+aWJwVyuyphlpBNTIInwi6xFWXJsnDySd6WYRRk5lMFMAC2EKlCeRWrCAAAAAElFTkSuQmCC'
						},{
      name: '青年图摘',
      url: 'http://www.qingniantuzhai.com/home',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAB3VBMVEX////9/f39///m6e3AwMb7//7//v/9/P///vn49vj39PPf3t/a19nOzdLLycz+/v72+Pzz9fbw9PX39fPy7vL89/Hr6enp5eba4OTo5uLX3d3FyM7DyMrAw8n+/f///vf////1///6///b8v202utfpNIacrj9///0/f/y/f/n9v/k+P3//vrz9fjE5/Ww3fTi7PKu0+ik0Ofk5OSYxOHh3+AdjNzX2dgji9cliNQWgtMjhs7Gx8tTmMcLeMa7wcMRdr46gbowgLkpernu///u/P/O8P7z+Pvg8Pn5+Pj49PjT8vju9vb59vXd7vX19PTs8vTt8fPM6vPX6fPe6PLz8vHn7PD68+/v7++k1+/F4uvi5efO2+S81eSOy+R9veOoyeKbxuFjuOHX3uCkyt+90968y96EvNubx9p9udlTn9jc29fP09eoytePvdeTvNaPu9WAttXHy9OEudMahdMmidEuitAsiNBWnc9MmM9+ss45kM4Wgc5opctnnstKkss7jctcnMoMeMnJyMdEjsclfsfBxMZansQifMQqg8MXe8PCxMIefsIIdMIogcBFir8xgb1Vkbwhe7sAaboAZ7cTbbM2fbEWcq8odK4AYakjcKgZaahUhacWZJ8RWooFPSyqAAAAIHRSTlPv/e/v7/vv7+/v7+/v7+/g7+/v7+/v7+/v7+/v7+/g4LIH5V0AAAEISURBVBjTHcjTdgMBEADQSbJJ49TGLGPbqm3btm3b/tae5j5eUIkgM08pEwiylfkCEBeBEN3hLkywh93IA5i6IpG2Djj6a7HidAgg9aiGGg7eHay/zqvRGEiBXDvORfesOrrHsdmJThnkIBPbtyFJ4eznQzkvCyTa3ZNJvaHMiOat+DimA5iiaxt6Q1sldqyeT5BJAOZHz8UCieqmoJdb+o/G2PLKLdvbd+z3fM1gMmQUs08u73Xk0u8KnZEtUpBWm96fQ9s+3+FNZLDUkgZ8Z33VTpx74e7Zt4/fERFA3bSFohkbQ1NjP98NfOBhe2CxVaMt0TV3j2pQCCoAiZwgFIoCQi4GfuEfTMs8p+k60I8AAAAASUVORK5CYII='
       },{
      name: '博海拾贝',
      url: 'http://bohaishibei.com/post/category/main/',
      favicon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVQ4jWNgz/n6lyPn639cmCf1Lk7MnXL3DwM+zYQM4Em9+582Bjx9/ggrptgAbIYQNIAn9S5lBiBj4cwhGwbI4UB/F5BlQOi0d3Ac1Hv7v3QevZMySQaw53z9RkF2/gcAyESn8EKXSckAAAAASUVORK5CYII='
       },    

	]
	},
],

		makeButton: function (sitelist, parent) {
			var i,
				len = sitelist.length,
				item,
				btn,
				menu,
				menupopup,
				menuitem,
				frag = document.createDocumentFragment();
				insertpoint = document.querySelector('#sidebar-header .close-icon');
			for (i = 0; i < len; i++) {
				item = sitelist[i];
				if (item.childs) {
					if (!parent) {
						btn = frag.appendChild(document.createElement('toolbarbutton'));
						btn.setAttribute('tooltiptext', item.name);
						btn.setAttribute('type', 'menu');
						btn.setAttribute('style', getIconStyle(item));
						menupopup = btn.appendChild(document.createElement('menupopup'));
						SidebarMod.makeButton(item.childs, menupopup);
					} else {
						if (item === 'sep') {
							parent.appendChild(document.createElement('menuseparator'));
						} else {
							menu = parent.appendChild(document.createElement('menu'));
							menu.setAttribute('label', item.name);
							menu.setAttribute('class', 'menu-iconic');
							menu.setAttribute('style', getIconStyle(item));
							menupopup = menu.appendChild(document.createElement('menupopup'));
							SidebarMod.makeButton(item.childs, menupopup);
						}
					}
				} else if (parent) {
					if (item === 'sep') {
						parent.appendChild(document.createElement('menuseparator'));
					} else {
						menuitem = parent.appendChild(document.createElement('menuitem'));
						menuitem.setAttribute('label', item.name);
						menuitem.setAttribute('tooltiptext', item.name);
						menuitem.setAttribute('url', item.url);
						menuitem.setAttribute('class', 'menuitem-iconic');
						// menuitem.setAttribute('src', item.favicon);
                        menuitem.setAttribute('style', getIconStyle(item));
						menuitem.setAttribute('oncommand', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
                        menuitem.setAttribute('onclick', 'SidebarMod.itemClicked(event, this.getAttribute("url"));');
					}
				} else {
					btn = frag.appendChild(document.createElement('toolbarbutton'));
					btn.setAttribute('tooltiptext', item.name);
					btn.setAttribute('style', getIconStyle(item));
					btn.setAttribute('url', item.url);
					btn.setAttribute('onclick', 'openWebPanel(this.getAttribute("tooltiptext"), this.getAttribute("url"))');
				}
			}
			insertpoint.parentNode.insertBefore(frag, insertpoint);

            function getIconStyle(item){
                if(item.style){
                    return item.style;
                }else{
                    if(!item.favicon){
                        return item.childs && getIconStyle(item.childs[0]);
                    }
                    return 'list-style-image: url("' + item.favicon + '")';
                }
            }
		},
		makeSplitter: function () {
			var sidebarBox = document.getElementById('sidebar-box'),
				splitter = sidebarBox.parentNode.insertBefore(document.createElement('splitter'), sidebarBox),
				sidebarBoxArrow;
			splitter.setAttribute('id', 'sidebar-box-splitter');
			splitter.setAttribute('onclick', 'toggleSidebar();');
			sidebarBoxArrow = splitter.appendChild(document.createElement('div'));
			sidebarBoxArrow.id = 'sidebar-box-arrow';
			sidebarBoxArrow.className = sidebarBox.hidden ? 'right' : '';
			//sidebarBoxArrow.className = sidebarBox.collapsed ? 'right' : '';
		},

//添加侧栏前进、后退、刷新按钮
			addControlBtn: function(){
				var SHBtn = document.getElementById("sidebar-header");
				if(SHBtn) {
					var _sidebarBtn = document.createElement('toolbarbutton');
					_sidebarBtn.setAttribute('type', 'button');
					_sidebarBtn.setAttribute("tooltiptext","左键：后退\n中键：刷新\n右键：前进");
					_sidebarBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
					_sidebarBtn.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABHRSTlMAPvpPlVb7NgAAAChJREFUCNdjwAIYFaEMIwGogAsYwEQQaggDIbgGZSABMUcAJoJQAwcAPGIElu34obcAAAAASUVORK5CYII=");
					_sidebarBtn.addEventListener("click",
					function(event) {
						var webPanel = document.getElementById('sidebar').contentDocument.getElementById("web-panels-browser");
						if (event.button == 2) {
							event.preventDefault();
							event.stopPropagation();
							webPanel.contentWindow.history.forward();
						} else if (event.button == 1){
							webPanel.contentWindow.location.reload();
						} else {
							webPanel.contentWindow.history.back();
						}
					},
					false);
					SHBtn.insertBefore(_sidebarBtn, SHBtn.childNodes[2]);
				}
			},

//添加侧边栏靠右按钮
			addControlBtnFloat: function(){
				var FloatBtn = document.getElementById("sidebar-header");
				if(FloatBtn) {
					var _sidebarBtn = document.createElement('toolbarbutton');
					_sidebarBtn.setAttribute('type', 'button');
					_sidebarBtn.setAttribute("tooltiptext","侧边栏靠右");
					_sidebarBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
					_sidebarBtn.setAttribute("image","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABXRSTlMA5kk7xO6PR4sAAAArSURBVAjXY4ADxVAwEGIQBnNZDBkCIBKsDKFQABFhBUIKGcIQhiHCUhgAAFbeCsH/RTXUAAAAAElFTkSuQmCC");
					_sidebarBtn.addEventListener("click",
					function(event) {
						var webPanel = document.getElementById('sidebar').contentDocument.getElementById("web-panels-browser");
						var id = [13]
        var service = Components.classes["@userstyles.org/style;1"].getService(Components.interfaces.stylishStyle)
        for (var i=0; i < id.length; i++){
            var style = service.find(id[i], service.REGISTER_STYLE_ON_CHANGE);
            style.enabled = !style.enabled;
            style.save();
        }
					},
					false);
					FloatBtn.insertBefore(_sidebarBtn, FloatBtn.childNodes[3]);
				}
			},

			toggleSidebar: function (commandID, forceOpen) {
				var sidebarBox = document.getElementById("sidebar-box"),
				sidebar = document.getElementById("sidebar"),
				sidebarTitle = document.getElementById("sidebar-title"),
				sidebarBoxArrow = document.getElementById('sidebar-box-arrow'),
				lastcommand = commandID || sidebarBox.getAttribute('sidebarcommand') || sidebarBox.getAttribute('sidebarlastcommand') || 'viewHistorySidebar';
				
				if (!commandID && sidebarBox.hidden) {
					if (sidebarBox.getAttribute('sidebarcommand') === '') {
						toggleSidebar(lastcommand, true);
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
					} else {
						sidebarBox.hidden = false;
						if (sidebarBoxArrow) sidebarBoxArrow.className = '';
					}
					return;
				}
				
				if (!commandID) commandID = sidebarBox.getAttribute("sidebarcommand");
				let sidebarBroadcaster = document.getElementById(commandID);
				
				if (sidebarBroadcaster.getAttribute("checked") == "true") {
					if (!forceOpen) {
						if (sidebarBox.getAttribute('sidebarcommand') !== 'viewWebPanelsSidebar') {
							sidebar.setAttribute("src", "about:blank");
							sidebar.docShell.createAboutBlankContentViewer(null);
							sidebarBox.setAttribute("sidebarcommand", "");
							sidebarTitle.value = "";
							sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						}
						sidebarBox.setAttribute("sidebarcommand", "");
						sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
						sidebarBroadcaster.removeAttribute("checked");
						sidebarBox.hidden = true;
						if (sidebarBoxArrow) sidebarBoxArrow.className = 'right';
						gBrowser.selectedBrowser.focus();
					} else {
						fireSidebarFocusedEvent();
					}
					return;
				}
				
				var broadcasters = document.getElementsByAttribute("group", "sidebar");
				for (let broadcaster of broadcasters) {
					if (broadcaster.localName != "broadcaster") continue;
					if (broadcaster != sidebarBroadcaster) broadcaster.removeAttribute("checked");
					else sidebarBroadcaster.setAttribute("checked", "true");
				}
				
				sidebarBox.hidden = false;
				if (sidebarBoxArrow)sidebarBoxArrow.className = '';
				
				var url = sidebarBroadcaster.getAttribute("sidebarurl");
				var title = sidebarBroadcaster.getAttribute("sidebartitle");
				if (!title) title = sidebarBroadcaster.getAttribute("label");
				sidebar.setAttribute("src", url);
				sidebarBox.setAttribute("sidebarcommand", sidebarBroadcaster.id);
				if ( title &&  title !== '') sidebarTitle.value = title;
				sidebarBox.setAttribute("src", url);
				sidebarBox.setAttribute('sidebarlastcommand', lastcommand);
				
				if (sidebar.contentDocument.location.href != url) sidebar.addEventListener("load", sidebarOnLoad, true);
				else fireSidebarFocusedEvent();
			},

			modifySidebarClickBehaviour: function () {
				var sidebar = document.getElementById('sidebar');
				sidebar.addEventListener('DOMContentLoaded', function(){
					if (sidebar.contentDocument){
						sidebar.removeEventListener('DOMContentLoaded', arguments.callee, false);
						var wpb = sidebar.contentDocument.getElementById('web-panels-browser');
						if (wpb) {
							wpb.onclick = null;
						}
					}
				}, false);
				
				eval("window.asyncOpenWebPanel = " + window.asyncOpenWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
				
				eval("window.openWebPanel = " + window.openWebPanel.toString().slice(0, -1) + 
					'var wpb = sidebar.contentDocument.getElementById("web-panels-browser");' +
					'if (wpb) wpb.onclick = null;' + '}'
				);
			},

			init: function() {
				window.toggleSidebar = this.toggleSidebar;
				this.makeButton(this.sitelist);
				this.addControlBtn();
				this.addControlBtnFloat();
				this.modifySidebarClickBehaviour();
			}
		};
		
		SidebarMod.init();
	}
})();
