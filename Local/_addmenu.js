
//2015.07.18 20:00 純粹加圖標的用CSS方式
//2015.07.16 19:00 加入鏈接右鍵雲播放
//2015.07.11 10:00 補齊黑白系圖標
//2015.07.09 18:00 加入閱讀模式
//2015.07.02 12:00 參考貼吧长丝绾月版加入新功能
//2015.07.01 21:00 終於折騰出了左中右三鍵
//2015.06.29 07:00 快捷回覆加入顏文字，換黑白圖標
//2015.06.10 16:00 調整選中文字搜索，加入OCR文字識別
//2015.05.05 17:00 調整一些菜單順序和添加圖標
//2015.04.29 21:00 貼上 二级菜單
//2015.03.31 21:00 升級FX36，調整加圖標方式
//2015.01.21 22:00 修正特殊符號，添加小書籤菜單
//2015.01.08 20:40 一些搜索項只在特定網站顯示
//2015.01.04 09:35 複製 二级菜單
//2014.12.20 19:40 圖片另存放到二級菜單
//2014.12.11 17:50 常用文字搜索橫排菜單
//2014.12.09 22:45 將菜單換成正體中文
//2014.12.07 12:40 四個複製圖片放到二级菜單，添加分割线
//2014.11.02 09:10 調整搜圖順序

/*——————————標簽頁右鍵————————————*/
//撤销关闭二级菜單 By feiruo
var undoMenu = TabMenu({
label: '撤銷關閉',
accesskey: "F",
insertBefore: "context_reloadTab",
tooltiptext: "右鍵显示所有历史记录",
onclick: "if (event.button == 2) {PlacesCommandHook.showPlacesOrganizer('History');}",
image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeklEQVQ4jeWRwQ2AIAxF39WbG7AJcQN2cQRmYxSm4FIPfhKjJXLWnzQN/fzfFuDTSEABTFFUm0IGqgSrIqmWZzpXie5YL8ZDvI3aV3sgKJs6Be+SOPPEDYgik86eiWuAxI1zRwO2wQTDFTppwD7gpx4xOrVFeeob/4YD1pEcog/2J/oAAAAASUVORK5CYII=",
onpopupshowing: function(e) {
var popup = e.target;
popup.setAttribute('id', 'addUndoMneun');
var items = popup.querySelectorAll('.bookmark-item');
[].forEach.call(items, function(item) {
item.parentNode.removeChild(item);
});
var undoItems = JSON.parse(Cc['@mozilla.org/browser/sessionstore;1'].getService(Ci.nsISessionStore).getClosedTabData(window));
if (undoItems.length == 0) {
popup.setAttribute('oncommand', 'this.parentNode._placesView._onCommand(event);');
if (!this.parentNode._placesView) new HistoryMenu(event);
} else {
undoItems.map(function(item, id) {
var m = document.createElement('menuitem');
m.setAttribute('label', item.title);
m.setAttribute('image', item.image ? 'moz-anno:favicon:' + item.image : '');
m.setAttribute('class', 'menuitem-iconic bookmark-item closedtab');
m.setAttribute('oncommand', 'undoCloseTab(' + id + ')');
m.setAttribute('type', 'unclose-menuitem');
popup.appendChild(m);
});
}
},
});

/*——————————圖片右鍵————————*/
//右鍵搜索圖片 以圖搜圖
var imagesub = PageMenu({
label: "以圖搜圖",
accesskey: "S",
condition: "image",
where: "tab",
insertBefore: "context-viewimage",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZElEQVQ4jWNgGMzAl4GB4T8a9iVWcwtUQxADAwMvFAdBxVqItVkQi5wgMS6B2YwLwFyCE3xhgDgZF+CluQEUe4HiQLRjQMQ7ydEI02wHtWUfkmH7iLXZDp8iXECaEs3IhtAfAAAJGiQnfMavIgAAAABJRU5ErkJggg==",
});
imagesub([{
label: 'Google',
url: 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
image: "https://www.google.com/favicon.ico",
where: 'tab',
accesskey: "G"
}, 
{
label: '360識圖',
url: 'http://st.so.com/stu?imgurl=%IMAGE_URL%',
image: "http://st.so.com/favicon.ico",
where: 'tab',
accesskey: "Q"
}, 
{}, 
{
label: 'Baidu',
url: 'http://image.baidu.com/n/pc_search?queryImageUrl=%IMAGE_URL%',
image: "http://www.baidu.com/favicon.ico",
where: 'tab'
}, 
{
label: 'Bing',
url: 'http://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=%IMAGE_URL%&mkt=en-US',
image: "http://cn.bing.com/s/a/bing_p.ico",
where: 'tab'
},

]);

//圖片右鍵 複製 二级菜單
new function() {
var items = [{
command: 'context-copyimage-contents',/*複製圖片*/
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII=",
},
{
command: 'context-copyimage',/*複製圖片地址*/
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC",
},  
{
label: "複製圖片Base64",
condition: "image",
accesskey: "B",
text: "%IMAGE_BASE64%",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVQ4jWNgGAzgPwUYbgC5FmMYcBTJdA8smo4yMDAo4zIgD4oZoIrQXZYHFcNpALLp6EAZKo/XBf+RbEH3AkwjUQbg8xpBA5ABsq3o0aeMzYCZaM7GFr14XQBTgGwLyQaQAlAMoCgpDywAAF13Uxwj2+klAAAAAElFTkSuQmCC",
},
{
label: "OCR文字識別",
accesskey: "A",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgGCzgPxZMSA2GJKkWEmXAfwYGBg9yDfBgYGCYCcXEWogCjjIwMChDaZIBssY8KCYJ5DGghjhJrlBmwPTjTKg4ToCsAVvAeaCJ0S8dkGQARUl54AAAWsMsNkwmkt8AAAAASUVORK5CYII=",
oncommand: function() {
//打開http://apistore.baidu.com/apiworks/servicedetail/146.html，填入apikey
var apikey = "5887465f000b887614bc3ad930fe1b15";
  
var base64str = img2base64(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL).replace("data:image/jpeg;base64,", "");
var xmlHttp = new XMLHttpRequest();
xmlHttp.open("POST", "http://apis.baidu.com/apistore/idlocr/ocr", true);
xmlHttp.setRequestHeader("apikey", apikey);
var formData = new FormData();
for(var d of ("fromdevice=pc&clientip=10.10.10.0&detecttype=LocateRecognize&languagetype=CHN_ENG&imagetype=1&image=" + base64str).split('&'))
formData.append.apply(formData, d.split('=', 2));
xmlHttp.send(formData);
xmlHttp.onload = function() {
if (xmlHttp.status == 200) {
var data = JSON.parse(xmlHttp.responseText);
if (data.errNum != 0)
alert("错误：" + data.errMsg);
else {
var str = "";
for (var i in data.retData) str += data.retData[i].word;
alert(str);
}
}
};
  
function img2base64(imgsrc) {
if (typeof imgsrc == 'undefined') return "";
  
const NSURI = "http://www.w3.org/1999/xhtml";
var img = new Image();
var that = this;
var canvas,
isCompleted = false;
img.onload = function() {
var width = this.naturalWidth,
height = this.naturalHeight;
canvas = document.createElementNS(NSURI, "canvas");
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");
ctx.drawImage(this, 0, 0);
isCompleted = true;
};
img.onerror = function() {
Components.utils.reportError("Count not load: " + imgsrc);
isCompleted = true;
};
img.src = imgsrc;
  
var thread = Cc['@mozilla.org/thread-manager;1'].getService().mainThread;
while (!isCompleted) {
thread.processNextEvent(true);
}
  
var data = canvas ? canvas.toDataURL("image/jpeg", 1) : "";
canvas = null;
return data;
}
}
},
];
var menu = PageMenu({
condition: 'image',
insertBefore: 'context-viewimage',
icon: 'image',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII=",
onpopupshowing: syncHidden
});
menu(items);
items.forEach(function(it) {
if (it.command)
css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
});
};

//圖片右鍵 保存等 二级菜單
new function() {
var items = [{
command: 'context-saveimage',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAv0lEQVR42mNkoBAwUssAByAOB2IOIvX9AeKNQLwFZsBzIJYk0fLXQCwKM+A/1DURQOwMxJ1AfIeAAfeBWBHdgN9AzALEa4A4FEkxDxBrAPEZQgYcB2ILIM4F4ilImrcDsQEQewLxEXwGgIAIEL9B02wD5X9BMgSnASDFyUBcCMSbkTQzIBmiCMSnsRlgA7URZPMHIBbAE/1YXfAZqpmY9IPVgP1EpgFHdAPeA7EgJQkJlIDcSTTgJBDPYBzw3AgApMktEXd8LEwAAAAASUVORK5CYII=",
},
{
label: "檢查所有圖片",
accesskey: "A",
oncommand: function() {
gBrowser.loadURI("javascript:outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images%5Bi%5D.src)==-1){outText+='<tr><td><img%20src='+document.images%5Bi%5D.src+'></td><td>'+document.images%5Bi%5D.height+'</td><td>'+document.images%5Bi%5D.width+'</td><td>'+document.images%5Bi%5D.src+'</td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write%20('<table%20border=1%20cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>'+outText+'</table>');imgWindow.document.close()}else{alert('No%20images!')}");
},
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWNgGDbgPwMDw3kGBob9ROLjUD0oBpBjKQangYGBYTsDA0MOFg0ixBjgA3WiBZKcAAMDw3yoGgdCBqADGQYGhuVQ+f8MDAzfGRgYeEgxoB1JMwyfJ8UADqghuxkYGD4zMDCsZ2Bg8MBlwHMGBob7UDyfARIOMOdqINmM1VJ0ZyLj6wwMDLeh7MMMeNIBOXg4AADwHkmSVhVYJQAAAABJRU5ErkJggg=="
},
// 替換 openImgRar.uc.js
{
label: "打開圖像RAR",
accesskey: "R",
condition: 'image',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVQ4jWNgGCwghoGB4Q8DA8N/IvEfBgYGT2QDPjIwMFijGfofB5sBqvYZLsXIYsgYmzxBA4iVp50BZHmBjZouoNgAor3wjIHCdOAJFSA2JT5jQEuJQxgAAFeqQ1dXIFWxAAAAAElFTkSuQmCC",
oncommand: function() {
var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
try {
var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
file.initWithPath(path);
} catch (e) {
var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
}
file.initWithPath(path);
Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
setTimeout(function() {
file.launch();
}, 100);
}
},

{command: 'context-sep-copyimage'},
{label:"重新載入圖片",
accesskey: "T",
oncommand:"gContextMenu.reloadImage();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVQ4jcWSyw2AIBAF5+rNDuyE2AG9WIK1UQpVeMHLEggKLCHRSQgH9u3vAR+wzYovwMwkMZLEjogs4IAgx8ut6uQUgQVWuQNwaCt7EULawa5t3fGcdciFkFWv0UzYS7BITJW3EXKiO82AfIk5K8mdJqWN0UovbyrKj9Qb7UdupJYfIj9YalkAAAAASUVORK5CYII="},
{command: 'context-viewimageinfo',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXklEQVQ4jaVTQQ4AMATzFq/y/49sFxIRoWiyU9eWDaIar+FLsBrwVCgqjEcmYku1Fqya0iSKvQFkgvRrJjiBBGUP5jnk3q2ClkCDzr+QmYzmIJqsJtFjvQsep22E8AGEZDOcIlQ9sgAAAABJRU5ErkJggg=="},
];
var menu = PageMenu({
condition: 'image',
insertBefore: 'context-viewimage',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAv0lEQVR42mNkoBAwUssAByAOB2IOIvX9AeKNQLwFZsBzIJYk0fLXQCwKM+A/1DURQOwMxJ1AfIeAAfeBWBHdgN9AzALEa4A4FEkxDxBrAPEZQgYcB2ILIM4F4ilImrcDsQEQewLxEXwGgIAIEL9B02wD5X9BMgSnASDFyUBcCMSbkTQzIBmiCMSnsRlgA7URZPMHIBbAE/1YXfAZqpmY9IPVgP1EpgFHdAPeA7EgJQkJlIDcSTTgJBDPYBzw3AgApMktEXd8LEwAAAAASUVORK5CYII=",
onpopupshowing: syncHidden
});
menu(items);
items.forEach(function(it) {
if (it.command)
css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
});
};

/*——————————选中文本右鍵——————————*/
//鏈接和选中文字(同时选中)的分割线
page({
label: 'separator',
insertAfter: "context-sep-copylink",
condition: 'link&select noimage',
})
//圖片和选中文字(同时选中)的分割线
page({
label: 'separator',
insertAfter: "context-viewimageinfo",
condition: 'image&select',
})

//搜索选中文本
new function() {
var menu = PageMenu({
condition: "select",
label: "搜索選中文本",
accesskey: "S",
insertBefore: "context-copy",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdklEQVQ4jc2SsQ3AIAwEbwGK1NmFDdIwE3OxCCOkZYAU+RSRMEFyIuUkN7Z5vwH4IxtQgKYoyk2RgQokICiScnlmcgWWTm1RbeikaJpFUo9J47RsEdTznYB7BfclwvgZGxCfBC4nvY8UgX1WxOJVkdUj4jp84wDU6yD4kZGU+wAAAABJRU5ErkJggg==",
onpopupshowing: function (event){
Array.slice(event.target.children).forEach(function(elem){
if(elem.id == "TVC-1"){
elem.hidden = !/ic.sjlpj.cn|tvc-mall.com|secu-star.com/.test(content.location.host)//可排除多個網站
}
else if(elem.id == "TVC-2"){
elem.hidden = !/ic.sjlpj.cn/.test(content.location.host)//可排除多個網站
}
});
}
});
var items = [
//打開方式(默认当前頁面)，通过where 更改，具体tab(前台)、tabshifted(后台)、window(窗口)
{label: "Google",
accesskey: "G",
url: "https://www.google.com/search?q=%s",
image: "https://www.google.com/favicon.ico",
where: 'tab'
}, 
{
label: "Baidu",
accesskey: "B",
url: "http://www.baidu.com/baidu?wd=%s&ie=utf-8",
image: "https://www.baidu.com/favicon.ico",
where: 'tab'
}, 
{
label: "雲播放",
accesskey: "C",
url:"http://vod.xunlei.com/iplay.html?uvs=luserid_5_lsessionid&from=vlist&url=%SEL%",
where: 'tab',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcklEQVQ4jd3SsQ2DMBBG4U9iAIagYQcKaiZhGpqswyDZwE2GMI1BVmQjFKRIyZOuu/9Zvjv+hgkBsVIh9ew0eOSCgOHkgSH1QIs1iQ/ie6JARIcnlk8FAXMpc0XwwljLXBXkc/r+FyJ6lSHeXuPtQ/phNpewMd4q2yEXAAAAAElFTkSuQmCC",
},
{},
{
label: "Ebay",
url: "http://www.ebay.com/sch/i.html?_nkw=%s",
image: "http://www.ebay.com/favicon.ico",
where: 'tab'
},
{
label: "Amazon",
url: "http://www.amazon.com/s/?url=field-keywords=%s",
image: "http://www.amazon.com/favicon.ico",
where: 'tab'
},
{
label: "Pandawill",
id: "TVC-2",
url: "http://www.pandawill.com/search/result/?c=&q=%s",
image: "http://pic.pandawill.com/skin/frontend/default/pandawill/favicon.ico",
where: 'tab'
},
{
label: "TVC-Mall",
id: "TVC-1",
url: "http://www.tvc-mall.com/search?q=%s",
image: "http://www.tvc-mall.com/images/favicon.ico",
where: 'tab'
},
{},
{
label: "產品—認領-SKU",
id: "TVC-2",
accesskey: "1",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditCollectList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—認領-品名",
id: "TVC-2",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditCollectList?Name=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—待編輯-SKU",
id: "TVC-2",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditList?Sku=%s&EditorId=0",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—待編輯-品名",
id: "TVC-2",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditList?Name=%s&EditorId=0",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—已編輯-SKU",
id: "TVC-2",
accesskey: "2",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditList?mode=processed&Sku=%s&EditorId=0",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—已編輯-品名",
id: "TVC-2",
accesskey: "3",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditList?mode=processed&Name=%s&EditorId=0",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—關聯SPU-所有列表",
id: "TVC-2",
url: "http://ic.sjlpj.cn/DevProduct/DevProductAssociatedSpuList?Sku=%s",
tooltiptext: "加顏色時在此關聯，一步到位！",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "運營—質檢-SKU",
id: "TVC-1",
accesskey: "4",
url: "http://ic.sjlpj.cn/Product/ProductCheckingList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—質檢-品名",
id: "TVC-2",
url: "http://ic.sjlpj.cn/Product/ProductCheckingList?KeyWord=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—正在編輯的產品列表-SKU",
id: "TVC-2",
url: "http://ic.sjlpj.cn/#/Product/OperationProductEditMgtList?Sku=%s&Mode=processed",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—審核-SKU",
id: "TVC-1",
accesskey: "5",
url: "http://ic.sjlpj.cn/Product/OperationProductEditAuditList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—審核-品名",
id: "TVC-2",
url: "http://ic.sjlpj.cn/Product/OperationProductEditAuditList?Keyword=%s&pageSize=100",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "運營—SPU管理列表",
id: "TVC-1",
accesskey: "6",
url: "http://ic.sjlpj.cn/ProductCorrect/ProductSpuList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—SPU關聯列表",
id: "TVC-2",
url: "http://ic.sjlpj.cn/Product/ProductAssociatedSpuList?Sku=%s&IsFirstRequest=true&BeginDate=2008-01-01",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—外網批量管理-SKU",
id: "TVC-1",
accesskey: "7",
url: "http://ic.sjlpj.cn/#/Product/BatchManagementProductList?Sku=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—外網批量管理-品名",
id: "TVC-2",
url: "http://ic.sjlpj.cn/#/Product/BatchManagementProductList?Sku=&KeyWord=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
];
menu(items);
};

//複製文本
new function () {
var items = [
{ command: 'context-copy',
  image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII=" },

{
label: "保存選中文本",
accesskey: "S",
condition: "select",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeElEQVQ4jWNgoBJYz8DA8J8Afs7AwNDOwMDAgs2A/1B6O5IGZHCZgYFBgoGB4ToDA8NqbIbANMzHYcB+KI3TEGINQDaEJBfcxqEeQyACqvg+Gr5MrAHEgkFsgBgDA8N7BkioY8NEGbAfXRKL+CA04DQD4cyEjqkDAH5+TabhljjtAAAAAElFTkSuQmCC",
oncommand: function() {
if (!window.NetUtil) Cu.import("resource://gre/modules/NetUtil.jsm");
if (!window.FileUtils) Cu.import("resource://gre/modules/FileUtils.jsm");

goDoCommand('cmd_copy');
var data = readFromClipboard();

var fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
fp.init(window, "另存爲", Ci.nsIFilePicker.modeSave);
fp.appendFilter("文本文件", "*.txt");
fp.defaultString = content.document.title + '.txt';

var res = fp.show();
if (res != Ci.nsIFilePicker.returnCancel) {
var aFile = fp.file;

var ostream = FileUtils.openSafeFileOutputStream(aFile);

var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
converter.charset = "gbk";
var istream = converter.convertToInputStream(data);

NetUtil.asyncCopy(istream, ostream, function(status) {
if (!Components.isSuccessCode(status)) {
// Handle error!
return;
}

aFile.launch();
});
}
}}
];

var menu = PageMenu({ condition:'select', insertBefore:'context-paste', onpopupshowing: syncHidden,image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII="  });
menu(items);
//page({ condition:'select', insertBefore:'context-sep-copylink' });
items.forEach(function(it){
if (it.command)
css('#contentAreaContextMenu[addMenu~="select"] #' + it.command + '{ display: none !important; }')
});
};

//选取范围内复选框的 ON/OFF
page({
label: "複選框的ON/OFF",
class: "checkbox",
condition: "select noinput nomailto nocanvas nomedia",
accesskey: "X",
insertBefore: "context-viewpartialsource-selection",
oncommand: function(event) {
var win = addMenu.focusedWindow;
var sel = win.getSelection();
Array.slice(win.document.querySelectorAll('input[type="checkbox"]:not(:disabled)')).forEach(function(e) {
if (sel.containsNode(e, true))
e.checked = !e.checked;
});
}
});

/*——————————輸入框右鍵——————————*/

//快捷回复，打造多級菜單
new function() {
var  QuickReplySub = PageMenu({
label: "快速回覆",
condition: "input noselect",
accesskey: "W",
insertBefore: "spell-undo-add-to-dictionary",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA6klEQVQ4jc2SIW7DQBBFBwRUWu16vf9VCiwIKGykHKWgRygsyAHCCnuEwgLDHKDABygMCAgMDAgscIktuc7WNcxIQ1b73oy+xuxqStIrcASaYUs6AGszsxDCoiiK1S8YWEvamdnyn54Be0nfKaXH/vRDCGExtqH3/l5SZWa3wFnSqb9BMwH+BGqgbiXPkwQ9+KPLpCzLp2EGWUEOTim9XHzMCVp4B5xH4b8EwJdzbg68dXCM8cHMbqYKGknvkqpuMrCPMd7lBEfn3HzwtgE2vcBmkk7eey4E7RXWNnJEkipgm82gtU865eurH5ZsTgQIYhNoAAAAAElFTkSuQmCC",
//跟进depft更新
oncommand: function(event) {
var input_text = event.target.getAttribute('input_text');
if (input_text) {
addMenu.copy(input_text);
setTimeout(function() {
goDoCommand("cmd_paste");
}, 100);
}
},
onpopupshowing: function (event){
Array.slice(event.target.children).forEach(function(elem){
if(elem.id == "Physics-Symbols"|elem.id == "Math-Symbols"){
elem.hidden = !/ic.sjlpj.cn/.test(content.location.host)//可排除多個網站
}
});
},

});
QuickReplySub([
{id: "QuickReply-sep", style: "display:none;"}
]);
var QuickReplySubMenu1 = PageMenu({
label: "顏文字",
accesskey: "A",
condition: "input",
insertBefore: "QuickReply-sep",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAD4+PghISERERExMTEUFBSVlZVPT08eHh4YGBi8vLyioqKBgYF4eHhJSUlBQUHg4ODR0dG1tbWamppzc3NgYGBXV1ft7e3i4uKvr6+oqKiPj4+JiYkoKCgkJCQICAgmMdadAAAAAXRSTlMAQObYZgAAAINJREFUGNNti1cSAyEMQwX20mGzJb3d/5YxJX+rGSw/IeNQJztp7eflz4ayAlSiPPij+qLc3vokPBIfZNqMmCpuT0QWnxT8F3WZ5IlrqfYjma4HQwMI4FsrcAPML6QC0dlirY2FJGSzlfcV7t5+GIi2GAW+oGn3j2qrGwwEJq1JBxzpB9l0A8JvhjyGAAAAAElFTkSuQmCC",
});
QuickReplySubMenu1([
{label: "^_^", input_text:"^_^"},
{label: "-_-|||", input_text:"-_-|||"},
{label: "Orz", input_text:"Orz"},
{label: "-_,-", input_text:"-_,-"},
{label: "╯﹏╰", input_text:"╯﹏╰"},
{label: "｡◕‿◕｡", input_text:"｡◕‿◕｡"},
{label: "、(￣.￣)", input_text:"、(￣.￣)"},
{label: "O(∩_∩)O~", input_text:"O(∩_∩)O~"},
{label: "o(╥﹏╥)o", input_text:"o(╥﹏╥)o"},
{label: "(￣３￣)", input_text:"(￣３￣)"},
{label: " o(>< )o", input_text:" o(>< )o"},
{label: "_(:з」∠)_", input_text:"_(:з」∠)_"},
{label: "(・(ｪ)・)", input_text:"(・(ｪ)・)"},
{label: "￣へ￣", input_text:"￣へ￣"},
{label: "╮(╯_╰)╭", input_text:"╮(╯_╰)╭"},
]);
var QuickReplySubMenu2 = PageMenu({
label: "物理符號",
id: "Physics-Symbols",
accesskey: "B",
condition: "input",
insertBefore: "QuickReply-sep",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABBElEQVQ4ja3SO0sDURAF4C9hRYtgSBMQEbUQCahgZecrlooRCxsbC/EBRrQMIvisVATxVShYiZVY+yP8SxZ7AyFsYFc8zWFgzrnnzgzpUcIhngOXMmjBPuoYDVzPIi7gBuVQl3GN3rQGES4xj3zgc3RlSVEJr14FrmQRN1HAYOD/Rx65vwi7URMP5QiTKTQRRjAHWzjFGGZwL3lAOfRhGRfiYa7BGwZaGlew01IXMYsGbrEXUvY0G9oNajjAOHbFB9QIJsWk/2ziOMSexjc+cYYnLCSJWtGPF/zgFRsYxioecSe+/46oYhsT4o3AIj4whXW8Y6iTQfvuI5wEg4eQ4gtLSeJfNhQkTGxVeLEAAAAASUVORK5CYII=",
});
QuickReplySubMenu2([
{label: "°", input_text:"°", accesskey: "1",},
{label: "°C", input_text:"°C", accesskey: "2",},
{label: "Ω", input_text:"Ω", accesskey: "3",},//ohm
{label: "Φ", input_text:"Φ", accesskey: "4",},//diameter
{label: "m²", input_text:"m²", accesskey: "5",},
{label: "cm²", input_text:"cm²", accesskey: "6",},
{label: "km²", input_text:"km²", accesskey: "7",},
]);
var QuickReplySubMenu3 = PageMenu({
label: "數學符號",
id: "Math-Symbols",
accesskey: "C",
condition: "input",
insertBefore: "QuickReply-sep",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABH0lEQVQ4jaXTvUoDURCG4cdoQCOohVUSEwkIprBLYWGhiGhtTLAQRMEmjRrw5y5sEkHbXIa912VxZs2SxCJ44OOwu2fenTnzDTziE8MJDTAKDWZ8/4xYH9hHFTXUYy+jFyrHu0zViPkQtJq0SrjEcjx3Q7NWLWINsYVNnEXKJ9hAJ7SIFg5CO5OAKnbxii88oYGLAJRwg3s84DRK/QVkJazhBavzlpABCljHwjyAkXTTnTic7W28hdo5WHamF7FTgO68gHwJk2uuNpbiTw2co2jcxhVcGRvr2B9duMM3rnMZdLAkOe8QR1LLpzIo4hnv6E8ASriVvN+XDFefBWhKNm5KrczuoIA9yY0tbOczyA9TJWAV08NUyaksN0z/Gucfql5K3J1MTKEAAAAASUVORK5CYII=",
});
QuickReplySubMenu3([
{label: "±", input_text:"±", accesskey: "1",},
{label: "≥", input_text:"≥", accesskey: "2",},
{label: "≤", input_text:"≤", accesskey: "3",},
{label: "×", input_text:"×", accesskey: "4",},
{label: "÷", input_text:"÷", accesskey: "5",},
{label: "≠", input_text:"≠", accesskey: "6",},//is not equal to
{label: "≈", input_text:"≈", accesskey: "7",},//is approximately equal to
{label: "√", input_text:"√", accesskey: "8",},
{label: "∞", input_text:"∞", accesskey: "9",},//infinity
]);

page({
label: "用戶名~~~",
input_text: "dupontjoy",
accesskey: "1",
insertBefore: "QuickReply-sep",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfUlEQVQ4jc2T0QnAIAwFb5IuUhco1C6ti5RS10h/FIIYqQWhgXxE8i7hYQACIIMZUCGA4324GiQDYj10KdopAA/cOXcDIEC0AKdqugxAuxgAdE08gJTTG4B5Jm55clkz5bcaYJqoxRpSA9pFQyydnh/9xJFjWqlM/HLOsdAehABlcm57OHUAAAAASUVORK5CYII=",
});
page({
label: "163mail~~~",
input_text: "dupontjoy@163.com",
accesskey: "2",
image: "http://email.163.com/favicon.ico ",
insertBefore: "QuickReply-sep",
});
page({
label: "QQmail~~~",
input_text: "dupontjoy@qq.com",
accesskey: "3",
image: "https://mail.qq.com/favicon.ico",
insertBefore: "QuickReply-sep",
});
page({
label: "Gmail~~~",
input_text: "dupont2305@gmail.com",
accesskey: "4",
image: "https://ssl.gstatic.com/ui/v1/icons/mail/images/2/unreadcountfavicon/0.png",
insertBefore: "QuickReply-sep",
});
page({
label: "字數補丁~~~",
accesskey: "5",
input_text: "~~~爲神馬要15字，『漢賊不兩立，王業不偏安』~~~",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jc2Quw2EMBBEX0ZEE9ThCsgp42LqIKYOQro5icDRVXCXDNay+GQLEfAkS/7szKwXbqQDvpWryxm8gLkiaFbtiQUYtP+XjGoWL26AD9BWdNCqtrGXPbAW0m0XqzSJCRgr0ndGaRIbEDNJFvsWpUlEIDhDew5OEKQ5uFt6CfbEN+7PXpNrucTDDPzQSvihnoZWWrmhXuMHem9Lmy9WtnwAAAAASUVORK5CYII=",
insertBefore: "QuickReply-sep",
});
page({
label: "当前日期 & 時間",
insertBefore: "QuickReply-sep",
oncommand: function() {
var localnow = new Date().toLocaleFormat("%Y.%m.%d & %H:%M:%S");
var localnowstr='【'+localnow+'】';
addMenu.copy(localnowstr);
goDoCommand("cmd_paste");
},
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApUlEQVQ4jbWT0Q3EIAxDPQvzsEJHYIROkEGyAN9VFsgAHYA5fD8FFSQqcdez5I8g5yWKBPCSDgBc9HEH1MexHj3LvwdYdQdY1R8ApRTu+84YI0WkBUSEMUbmnMc79IW7U0RqkGZGVWUIgapKADzPk1NAlbsTAN193IZm9gy4Aq1pCXCtdw8hpcRt21hKaVtNAdekZjOrDQTAlNLzERfV9fz8mb7WB4+6vw/JwEpiAAAAAElFTkSuQmCC"
});

};

//貼上 二級菜單
new function() {
var items = [{
command: 'context-paste',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbklEQVQ4jWNgoAFoZWBg+M7AwPAfir9DxUjSKIskLkusQX8YGBj48RjADzUEJ/gPpY8gOR+Gj6CpwWsAMh8bJskAdP51BgaGBkoMEMdnCDEG4PUKIQMIylFsACwdkG0AehIm2QBSFBFtAD5MHQAA8vtEFZXqsUkAAAAASUVORK5CYII=",
},
{
label: "標點符號置換(中轉英)",
condition: "input",
accesskey: "E",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+0lEQVQ4jcWSMUoEURBES9EVDIZh8DP9XyUGIoKGXsBEMBQ9gCZGXsTEyCsogiYmHkEMTAb2AsImHsBYk1kYVt3Z3cSCTrqriu6mpH/AMnAfEWlhh5zzse0mIjYlSba/xgV8RsTuhGbJ9nOX13JffrgD58AQWO/0Lm2/SlqRpIg4Aoa2t39dEbgDbiSprus94COltNWZ36aU4s8bq6oqcs4nktZsN7bPZnrOJGxf235YSAwcAu9FUVSLiDdsjyLiQNJg7hOAJ+BKksqyLG2Pcs777Xh6kHLOF8CbpMG4FxGnthtJqy1nepCAnUlj248zBWkW9AapD71Bmgff1GdAhwyuwRgAAAAASUVORK5CYII=",
oncommand: function() {
goDoCommand("cmd_copy");
var sel = getBrowserSelection();
var txt = addMenu.convertText('%p');
addMenu.copy(txt.replace(/(\s，\s|\s，|，\s|，)+/g, ", ")
.replace(/(\s。\s|\s。|。\s|。)+/g, ". ")
.replace(/(\s？\s|\s？|？\s|？)+/g, "? ")
.replace(/(\s！\s|\s！|！\s|！)+/g, "! ")
.replace(/(\s；\s|\s；|；\s|；)+/g, "; ")
.replace(/(\s：\s|\s：|：\s|：)+/g, ": ")
.replace(/(\s（\s|\s（|（\s|（)+/g, " (")
.replace(/(\s）\s|\s）|）\s|）)+/g, ") ")
.replace(/(\s—\s|\s—|—\s|—)+/g, " - ")
.replace(/(\s＆\s|\s＆|＆\s|＆)+/g, " & ")
.replace(/(\s…\s|\s…|…\s|…)+/g, "... ")
.replace(/(\s、\s|\s、|、\s|、)+/g, ", ")
.replace(/(\s’\s|\s’|’\s|’)+/g, "'")
);
if (sel) {goDoCommand("cmd_paste");}
},
},
{
label: "插入BBCode",
id: "BBCode",
condition: "input",
accesskey: "I",
insertAfter: "context-paste",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJ1BMVEUAAAAAAADd3d1EREQiIiKIiIh3d3czMzPMzMyqqqpVVVURERHu7u6A1ky6AAAAAXRSTlMAQObYZgAAADtJREFUCNdjwASCECDAIADhIzMYBQsMpRWADBaGCiO2ALCIg6EgRCTViHMBjLEILFVjKN2AxRyEFRgAAGitCNm3Ki02AAAAAElFTkSuQmCC",
oncommand: function() {
var str = addMenu.convertText('[code]%P[/code]');
addMenu.copy(str);
goDoCommand('cmd_paste');
},
},
];
var menu = PageMenu({
condition: 'input',
insertBefore: 'context-copy',
icon: 'input',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbklEQVQ4jWNgoAFoZWBg+M7AwPAfir9DxUjSKIskLkusQX8YGBj48RjADzUEJ/gPpY8gOR+Gj6CpwWsAMh8bJskAdP51BgaGBkoMEMdnCDEG4PUKIQMIylFsACwdkG0AehIm2QBSFBFtAD5MHQAA8vtEFZXqsUkAAAAASUVORK5CYII=",
onpopupshowing: function (event){
Array.slice(event.target.children).forEach(function(elem){
if(elem.id == "BBCode"){
elem.hidden = !/bbs.kafan.cn/.test(content.location.host)//可排除多個網站
}
});
},
});
menu(items);
items.forEach(function(it) {
if (it.command)
css('#contentAreaContextMenu[addMenu~="input"] #' + it.command + '{ display: none !important; }')
});
};

/*——————————鏈接右鍵——————————*/
page({
label: "雲播放",
accesskey: "C",
insertAfter: "context-copylink",
condition: "link",
url:"http://vod.xunlei.com/iplay.html?uvs=luserid_5_lsessionid&from=vlist&url=%RLINK_OR_URL%",
where: 'tab',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcklEQVQ4jd3SsQ2DMBBG4U9iAIagYQcKaiZhGpqswyDZwE2GMI1BVmQjFKRIyZOuu/9Zvjv+hgkBsVIh9ew0eOSCgOHkgSH1QIs1iQ/ie6JARIcnlk8FAXMpc0XwwljLXBXkc/r+FyJ6lSHeXuPtQ/phNpewMd4q2yEXAAAAAElFTkSuQmCC",
/*onshowing: function(menuitem) {
var isHidden = !/918ys.net/.test(content.location.host);//可排除多個網站
this.hidden = isHidden;
},*/
});

/*——————————頁面右鍵——————————*/
new function () {//多功能菜单
var items = [
{
label: "複製此頁標題+地址",
tooltiptext: "左鍵：標題+地址\n中鍵：Favicon地址\n右鍵：Favicon的Base64碼",
onclick: function(e) {
switch(e.button) {
case 0:
addMenu.copy(addMenu.convertText("%TITLE%") +"\n"+ addMenu.convertText("%RLINK_OR_URL%"));
closeMenus(this);
break;
case 1:
addMenu.copy(addMenu.convertText("%FAVICON%"));
closeMenus(this);
break;
case 2:
addMenu.copy(addMenu.convertText("%FAVICON_BASE64%"));
closeMenus(this);
break;
}
},
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="
},
{
label: "UTF-8 : Big5 : GBK",
tooltiptext: "左鍵：UTF-8\n中鍵：Big5\n右鍵：GBK",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlUlEQVQ4ja2TwQ2AIAxF3wau4QCuwCxcPTKMI7iBO7iCA3BiArxUJaSCik2a0NL/+1MK/Gg9MAMBiDcepKbXwB4Yga7QpJMan5PMcvHUnGBOC5XOmpKQJuILsIpJg5VraA7Y5OwBWyMYBHScYxb7JwSpAs1NiWDimq6RvE3ipabAiMyoKCnOoPkZmxepeZUPks+f6bPtGg1LLkKBszsAAAAASUVORK5CYII=",
onclick: "var code = ['UTF-8', 'Big5', 'GBK']; BrowserSetForcedCharacterSet(code[event.button]);closeMenus(this);"
},

{
//代碼來源：https://getpocket.com/welcome?b=Bookmarklet
label: "+ Pocket",
oncommand: function() {
gBrowser.loadURI("javascript:(function(){var%20e=function(t,n,r,i,s){var%20o=[2035120,3068561,4746347,4970120,6888016,4880111,6690539,6153817,4568836,2928202];var%20i=i||0,u=0,n=n||[],r=r||0,s=s||0;var%20a={'a':97,'b':98,'c':99,'d':100,'e':101,'f':102,'g':103,'h':104,'i':105,'j':106,'k':107,'l':108,'m':109,'n':110,'o':111,'p':112,'q':113,'r':114,'s':115,'t':116,'u':117,'v':118,'w':119,'x':120,'y':121,'z':122,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,'Y':89,'Z':90,'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,'\/':47,':':58,'?':63,'=':61,'-':45,'_':95,'&':38,'$':36,'!':33,'.':46};if(!s||s==0){t=o[0]+t}for(var%20f=0;f<t.length;f++){var%20l=function(e,t){return%20a[e[t]]?a[e[t]]:e.charCodeAt(t)}(t,f);if(!l*1)l=3;var%20c=l*(o[i]+l*o[u%o.length]);n[r]=(n[r]?n[r]+c:c)+s+u;var%20p=c%(50*1);if(n[p]){var%20d=n[r];n[r]=n[p];n[p]=d}u+=c;r=r==50?0:r+1;i=i==o.length-1?0:i+1}if(s==269){var%20v='';for(var%20f=0;f<n.length;f++){v+=String.fromCharCode(n[f]%(25*1)+97)}o=function(){};return%20v+'e8dd7f9d42'}else{return%20e(u+'',n,r,i,s+1)}};var%20t=document,n=t.location.href,r=t.title;var%20i=e(n);var%20s=t.createElement('script');s.type='text/javascript';s.src='https://getpocket.com/b/r4.js?h='+i+'&u='+encodeURIComponent(n)+'&t='+encodeURIComponent(r);e=i=function(){};var%20o=t.getElementsByTagName('head')[0]||t.documentElement;o.appendChild(s)})()");
},
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvElEQVQ4jcXSIXICQRCF4a+KqhWYOUE8Zs+A4hYcBBmzEoNGIlHY2NwhMi4mKmoliG4xbC3FhlCV30zVTM+b97qHJ9LjC2/YYPFbgXleWqHDJ96xfNTRDOsU2ucDD1FwSjflL252KXLTSY8PbN1u4EHEGaVBKybwbTx3ET2529iCoxhpMzhbiyiTOIrsNbN00U4RKOJzDYs7vA6LO/zkWrMRja1ZiXhX9DinSE0rplPzks4mOWhS/N7eP3EBkgkmEdZryUkAAAAASUVORK5CYII="
},
{label: '收藏到百度雲',
tooltiptext: "左鍵：收藏到百度云\n右鍵：收藏到百度相册",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB40lEQVQ4jXVSz4tPURT/TL68e9/k3de39333ns/BAgspi68miRJ/AAtRJMpGKUWz0NRQzAwzCWFBsrTwt1CUUiMjMgqzs7F+Fu6bufO+5qzuPed+fpxzD9AJkodIDrv5EMLeEMKxbn41iqLok3wBoAHQkLyYgE+1+SzLFuu69uvAInI+gh5XVbWV5J54f6Kqd+J5CMCSXLDW/hGRSwDGUBTFm7Isv4nIRKeVYasqIkfSmvd+X57nP6213yEiVwE0IYQDsb5JVScBNKo6qaqX4/kGgM0JwW9VvdmqHY9K16y1P4wxy977na1iv9/f1uv1fuV5vkLySmzpTHf6863lEMKgO+SyLMs8z1ci+Glay1T1eXQwoaoPI8kFAGMAoKqnY/0ZyaFz7ouqviSZQ1WnATR1Xe9K3OwH0BRF8cE59y6qHk7q22NuAQC2iMhsVDiXPDqBtZ04m3z5yZi7D8Cu9tE6McZ8VtW70cFr59zb+AuPSL5KwOuD5JSIPCA5Y4xZCiEMSE6RnC/LsjTGfCJ5j+TtOPARguvGmOWqqiQlTR9XVSXGmK8kb40QeO/HRWQu2p3Gv7VtCWzboojMee/HRwgS1R1Zln0E0Djn3jvnFuNslgaDwe4Ngf9xdBBri3V0o3d/AaQafE2/njBpAAAAAElFTkSuQmCC",
onclick: function(e){
switch(e.button){
case 0:
gBrowser.loadURI("javascript:void%20(function(d)%20{var%20e%20=%20d.createElement('script');e.byebj=true;e.src%20=%20'http://s.wenzhang.baidu.com/js/pjt/content_ex/page/bookmark.js?s=bm&t='%20+%20(+new%20Date());var%20b%20=%20d.getElementsByTagName('body')[0];b.firstChild%20?%20b.insertBefore(e,%20b.firstChild)%20:%20b.appendChild(e);}(document));")
break;
case 2:
gBrowser.loadURI("javascript:if(typeof%20yXzyxe58==typeof%20alert)yXzyxe58();void(function(g,d,m,s){if(g[m]){if(window._bdXC_loaded){g[m].reInit();}}else{s=d.createElement('script');s.setAttribute('charset','utf-8');s.src='http://xiangce.baidu.com/zt/collect/mark.js?'+(new%20Date()).getTime();d.body.appendChild(s);}}(window,document,'_bdXC'))")
break;
}
},
},
{},
{
label: "閱讀模式",
accesskey: "R",
insertBefore: "context-viewsource",
url:"about:reader?url=%u",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcElEQVQ4je3SsQnDMBCF4a9KoSaTuNM4GSIjeIE0qTWT2ozi0imkBGNsocqYkAcHx/3wuOLnLIl4IGOq88ITtwaLn4IZYz0EXOs+brCwYt+CvXSxf8HPFCTFsKVtqYOhaHrHgIti21BvU4PlxncH5Q0Y/znXzG7xKgAAAABJRU5ErkJggg=="
},
{
label:"在侧边栏中打開",
oncommand:"openWebPanel(content.document.title, content.location);",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4jWNgoBL4jwcTbQAp4kPUADsGBoZfUJpkA/zxaSZkgB0DEbFEUxfAgAM+Q4ZGNBI0gKK8MHAAANGVMRA9chdTAAAAAElFTkSuQmCC"
},
{
label:"在谷歌缓存打開",
url:"http://webcache.googleusercontent.com/search?q=cache:%u",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg=="
},
];

var menu = PageMenu({
label:'多功能菜單',
accesskey: "M",
image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAG0lEQVQ4jWNgGCzgP5l4EIFRLwwGMIScOvgAAMPmMc89jdNcAAAAAElFTkSuQmCC',/* data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQklEQVQ4jWNgoBI4wsDA8B8PPoJF3RFkA/4TsOA/Go2hZxgYQHEgUgzQXYDNRlyuwvQPA3Y/owO8gTgSDaA4FsgGAKDqU/mCtSo8AAAAAElFTkSuQmCC */
condition: 'normal', 
position:7,
onpopupshowing: syncHidden 
});
menu(items);
};

page({
label:"此頁拼寫檢查",
accesskey: "A",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZklEQVQ4je2Q0Q2AQAhD3y4uwzTsw0A31/nDmUowJvqpTfig0JY7+KFwYEg/gJl1xRtlEMAm/UJIiBUNpChy6E3SbExPiJvlldwamIiWWV32vNLlwiMkCmnJ6ROiiNpPfIz5sj6PHbYtNU5+tMktAAAAAElFTkSuQmCC",
insertBefore: "context-viewsource",
condition: 'normal',
tooltiptext: "拼寫檢查（當前窗口打開）！",
oncommand: "content.document.body.contentEditable = content.document.body.contentEditable == \"true\" ? \"false\" : \"true\";"
//oncommand: function() {document.onkeydown=ck;content.document.body.contentEditable=true;function ck(e){k=window.event?window.event.keyCode:e.keyCode;if(k==27){content.document.body.contentEditable=false}}},
})

/*
//from: http://kb.mozillazine.org/Spell_checking
Firefox和Chrome通用 拼寫檢查小書籤（Firefox不能实时生效）：
javascript:document.body.contentEditable='true'; document.designMode='on'; void 0
*/

/*——————————書籤右鍵——————————*/
/*爲書籤右鍵添加 移動 功能*/
page({
label: '移动...',
accesskey: "M",
insertAfter: "placesContext_newSeparator",
command: "placesCmd_moveBookmarks",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgGCrAjoGB4ReUptgQf3yK/hOJyXIJUS4gpNmBHM1k20aWP/0p0WzHQHws0MYFMOBADUOGEAAAtLMgYRGzlKoAAAAASUVORK5CYII=",
})


/*——————————移動圖標和菜單——————————*/
//移动圖標，代替Movebutton.uc.js，需配合RebuildWhenStart.uc.js，可惜對有的圖標還是無力
/*new function() {
//幾個擴展圖標
tab({
id: "flashgot-media-tbb",
insertBefore: "userChromebtnMenu",
clone: false,// 不克隆，直接改在原来的菜單上面
}
);

};
*/

/*————————————————————*/
//隱藏相同項。必須，不能刪除
function syncHidden(event) {
Array.slice(event.target.children).forEach(function(elem) {
var command = elem.getAttribute('command');
if (!command) return;
var original = document.getElementById(command);
if (!original) {
elem.hidden = true;
return;
};
elem.hidden = original.hidden;
elem.collapsed = original.collapsed;
elem.disabled = original.disabled;
});
};
