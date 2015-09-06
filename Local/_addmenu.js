
//2015.09.06 整合RC多功能菜單等
//2015.08.23 調整雲播放前臺新標籤打開
//2015.08.18 調整選中文字搜索
//2015.07.25 21:00 Email地址左中右三鍵，修正中轉英，插入BBCode左中右三鍵，用新分頁開啟鏈結左中右三鍵
//2015.07.24 22:00 複製圖片地址左右鍵
//2015.07.20 15:00 純粹加圖標的用CSS方式
//2015.07.16 19:00 加入鏈接右鍵雲播放
//2015.07.11 10:00 補齊黑白系圖標
//2015.07.09 18:00 加入閱讀模式
//2015.07.02 12:00 參考貼吧长丝绾月版加入新功能
//2015.07.01 21:00 終於折騰出了左中右三鍵
//2015.06.29 07:00 快捷回覆加入顏文字，換黑白圖標
//2015.06.10 16:00 加入OCR文字識別
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
//撤销關闭二级菜單 By feiruo
var undoMenu = TabMenu({
label: '撤銷關閉',
accesskey: "F",
insertBefore: "context_reloadTab",
tooltiptext: "右鍵显示所有历史记录",
onclick: "if (event.button == 2) {PlacesCommandHook.showPlacesOrganizer('History');}",
image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5ElEQVQ4jaXTr0oFQRTH8c8yIBgWBMFg2ifwBa5oEsRguWCxGQwGq+9hMvgItxgEww0Gg+m+w02bBYtJw8zCsO64q35hYObMnN+cPzN8Z2fANpljtNj6j/PsL87beMdnYbzhCecIJZF5imAvs52gThfM8YqlH1LsRLoDL9jP9gNuk0gxkiab3+Fq4MwSlyWBnOsk0ucoRTfKIVbY7NlrsbCj1FhgjbOe/WOKQMcMN9l6cgolnkMIF0MbDe7FEIcIYlGLbez6vBbb12ADu+IrXFVV9WjCXzkQi9eKT7nFA07HHH/NFwrNKkyQLvLzAAAAAElFTkSuQmCC",
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
}, 
{
label: '360識圖',
url: 'http://st.so.com/stu?imgurl=%IMAGE_URL%',
image: "http://st.so.com/favicon.ico",
where: 'tab',
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
var items = [
{
command: 'context-copyimage-contents',/*複製圖片*/
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII=",
},
{
label: "複製圖片地址",
tooltiptext: "左鍵：複製圖片地址\n右鍵：複製圖片Base64碼",
onclick: function(e) {
switch(e.button) {
case 0:
addMenu.copy(addMenu.convertText("%IMAGE_URL%"));/*複製圖片地址*/
closeMenus(this);
break;
case 2:
addMenu.copy(addMenu.convertText("%IMAGE_BASE64%"));
closeMenus(this);
break;
}
},
accesskey: "O",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"
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
if(elem.id == "TVC-Universal"){
elem.hidden = !/ic.sjlpj.cn|tvc-mall.com|seculife.com|phonepartstore.com/.test(content.location.host)//可排除多個網站
}
else if(elem.id == "TVC-Back"){
elem.hidden = !/ic.sjlpj.cn/.test(content.location.host)//可排除多個網站
}
});
}
});
var items = [
//打開方式(默认當前頁面)，通过where 更改，具體tab(前台)、tabshifted(后台)、window(窗口)
{label: "Google",
url: "https://www.google.com/search?q=%s",
image: "https://www.google.com/favicon.ico",
where: 'tab'
}, 
{
label: "Baidu",
url: "http://www.baidu.com/baidu?wd=%s&ie=utf-8",
image: "https://www.baidu.com/favicon.ico",
where: 'tab'
}, 
{
label: "Thunder",
url:"http://vod.xunlei.com/iplay.html?uvs=luserid_5_lsessionid&from=vlist&url=%SEL%",
where: 'tab',
image: "http://vod.xunlei.com/favicon.ico",
},
{},
{
label: "Ebay",
id: "TVC-Universal",
url: "http://www.ebay.com/sch/i.html?_nkw=%s",
image: "http://www.ebay.com/favicon.ico",
where: 'tab'
},
{
label: "Amazon",
id: "TVC-Universal",
url: "http://www.amazon.com/s/?url=field-keywords=%s",
image: "http://www.amazon.com/favicon.ico",
where: 'tab'
},
{
label: "TVC-Mall",
id: "TVC-Universal",
url: "http://www.tvc-mall.com/search?q=%s",
image: "http://www.tvc-mall.com/images/favicon.ico",
where: 'tab'
},
{},
{
label: "運營—價格變更-SKU",
id: "TVC-Universal",
accesskey: "1",
url: "http://ic.sjlpj.cn/PriceChangeRequest/UnChangedProductList?Sku=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—價格變更審核-SKU",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/PriceChangeRequest/OperationAuditList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—外網批量管理-SKU",
id: "TVC-Universal",
accesskey: "2",
url: "http://ic.sjlpj.cn/#/Product/BatchManagementProductList?Sku=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—外網批量管理-品名",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/#/Product/BatchManagementProductList?Sku=&KeyWord=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—SPU管理-SpuId",
id: "TVC-Universal",
accesskey: "3",
url: "http://ic.sjlpj.cn/ProductCorrect/ProductSpuList?SpuId=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—SPU管理-SKU",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/ProductCorrect/ProductSpuList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "運營—質檢-SKU",
id: "TVC-Universal",
accesskey: "4",
url: "http://ic.sjlpj.cn/Product/ProductCheckingList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—質檢-品名",
id: "TVC-Back",
url: "http://ic.sjlpj.cn/Product/ProductCheckingList?KeyWord=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—審核-SKU",
id: "TVC-Universal",
accesskey: "5",
url: "http://ic.sjlpj.cn/Product/OperationProductEditAuditList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—審核-品名",
id: "TVC-Back",
url: "http://ic.sjlpj.cn/Product/OperationProductEditAuditList?Keyword=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—認領-SKU",
id: "TVC-Back",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditCollectList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—認領-品名",
id: "TVC-Back",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditCollectList?Name=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—已編輯-SKU",
id: "TVC-Back",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditList?mode=processed&Sku=%s&EditorId=0",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—已編輯-品名",
id: "TVC-Back",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditList?mode=processed&Name=%s&EditorId=0",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—關聯SPU-所有列表",
id: "TVC-Back",
url: "http://ic.sjlpj.cn/DevProduct/DevProductAssociatedSpuList?Sku=%s",
tooltiptext: "加顏色時在此關聯，一步到位！",
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

//选取范围內复选框的 ON/OFF
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
label: "Email地址",
accesskey: "E",
tooltiptext: "左鍵：163郵箱\n中鍵：QQ郵箱\n右鍵：Gmail郵箱",
insertBefore: "QuickReply-sep",
onclick: function(e) {
switch(e.button) {
case 0:
addMenu.copy(addMenu.convertText('dupontjoy@163.com'));
goDoCommand('cmd_paste');
closeMenus(this);
break;
case 1:
addMenu.copy(addMenu.convertText('dupontjoy@qq.com'));
goDoCommand('cmd_paste');
closeMenus(this);
break;
case 2:
addMenu.copy(addMenu.convertText('dupont2305@gmail.com'));
goDoCommand('cmd_paste');
closeMenus(this);
break;
}
},
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuElEQVQ4jc3SIQ7CQBCF4S8hQWCQKBQah+sJENwAj0UiuQAGjeQEWCwai8RhUPgmRXRICpRCMTDJbHY2+/55mV3+IcZIkdXMFEO4RHZrNJ3giJOgTXFA5wPxKIS90OYL5tijXSHu44xB1HcAWGKLVom4G7ZHhbMnAKyxQaNw1gp3s4e7pYBmANZRN6JelrgqBdw67rAK0PbB0VsA+TAXka8GWwn4JDLyN02+ECehNYxN3a98Cu2P4wq1e0SOXg0ncwAAAABJRU5ErkJggg=="
});

page({
label: "用戶名~~~",
input_text: "dupontjoy",
insertBefore: "QuickReply-sep",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfUlEQVQ4jc2T0QnAIAwFb5IuUhco1C6ti5RS10h/FIIYqQWhgXxE8i7hYQACIIMZUCGA4324GiQDYj10KdopAA/cOXcDIEC0AKdqugxAuxgAdE08gJTTG4B5Jm55clkz5bcaYJqoxRpSA9pFQyydnh/9xJFjWqlM/HLOsdAehABlcm57OHUAAAAASUVORK5CYII=",
});

page({
label: "字數補丁~~~",
input_text: "~~~爲神馬要15字，『漢賊不兩立，王業不偏安』~~~",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jc2Quw2EMBBEX0ZEE9ThCsgp42LqIKYOQro5icDRVXCXDNay+GQLEfAkS/7szKwXbqQDvpWryxm8gLkiaFbtiQUYtP+XjGoWL26AD9BWdNCqtrGXPbAW0m0XqzSJCRgr0ndGaRIbEDNJFvsWpUlEIDhDew5OEKQ5uFt6CfbEN+7PXpNrucTDDPzQSvihnoZWWrmhXuMHem9Lmy9WtnwAAAAASUVORK5CYII=",
insertBefore: "QuickReply-sep",
});
page({
label: "當前日期 & 時間",
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
label: "標點(中轉英)",
condition: "input",
accesskey: "E",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAe0lEQVQ4ja2T0Q3AIAhE3y4u4zTu40DORT+ExFqtRXsJHxAPj0PhjggkDlGA4CHIIvKOiqDEz0qM0OZuLxLVxED1YQuZOrfLRJQgzc2zJkJV+SiOCEXr5kVUhcutzA5YfenPqoGZ/dqgHyfieFy5i1FT95qly48/3H+4AA6QJ51Bic5yAAAAAElFTkSuQmCC",
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
.replace(/(\s“\s|\s“|“\s|“)+/g, addMenu.convertText(' "'))
.replace(/(\s”\s|\s”|”\s|”)+/g, addMenu.convertText('"'))
);
goDoCommand("cmd_paste");
},
},
{
label: "插入BBCode",
id: "BBCode",
accesskey: "B",
tooltiptext: "左鍵：代碼[code]\n中鍵：鏈接[url]\n右鍵：圖片[img]",
onclick: function(e) {
switch(e.button) {
case 0:
addMenu.copy(addMenu.convertText('[code]%P[/code]'));
goDoCommand('cmd_paste');
closeMenus(this);
break;
case 1:
addMenu.copy(addMenu.convertText('[url]%P[/url]'));
goDoCommand('cmd_paste');
closeMenus(this);
break;
case 2:
addMenu.copy(addMenu.convertText('[img]%P[/img]'));
goDoCommand('cmd_paste');
closeMenus(this);
break;
}
},
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJ1BMVEUAAAAAAADd3d1EREQiIiKIiIh3d3czMzPMzMyqqqpVVVURERHu7u6A1ky6AAAAAXRSTlMAQObYZgAAADtJREFUCNdjwASCECDAIADhIzMYBQsMpRWADBaGCiO2ALCIg6EgRCTViHMBjLEILFVjKN2AxRyEFRgAAGitCNm3Ki02AAAAAElFTkSuQmCC"
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
page(
{
label: "用新分頁開啟鏈結",
accesskey: "T",
condition: "link",
position: 1,
tooltiptext: "左鍵：用新分頁開啟鏈結\n中鍵：複製鏈接網址\n右鍵：迅雷雲播放",
onclick: function(e) {
switch(e.button) {
case 0:
gBrowser.addTab(addMenu.convertText("%RLINK%"));
closeMenus(this);
break;
case 1:
addMenu.copy(addMenu.convertText("%RLINK%"));
closeMenus(this);
break;
case 2:
gBrowser.selectedTab = gBrowser.addTab("http://vod.xunlei.com/iplay.html?uvs=luserid_5_lsessionid&from=vlist&url=" + addMenu.convertText("%RLINK_OR_URL%"));/*前臺新標籤*/
/*gBrowser.addTab("http://vod.xunlei.com/iplay.html?uvs=luserid_5_lsessionid&from=vlist&url=" + addMenu.convertText("%RLINK_OR_URL%"));/*後臺新標籤*/
closeMenus(this);
break;
}
},
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVQ4jWNgGCyAjYGBYRIDA8NrBgaG/0Tg11D1bDADJjEwMOxmYGAQJ9JCcaj6VpjAaxI0IxvyGsb5j0chXjkmEm3FABQbwIJDHN3ZyHxGYjQQLTfwYUCMAVj9TDUXwEzHF1C0BQCpARnHXF2p+wAAAABJRU5ErkJggg=="
}
)

/*——————————頁面右鍵——————————*/
//多功能菜單
new function () {
var items = [
{
label: "複製標題+地址",
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
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII="
},
{
label: "UTF-8|Big5|GBK",
tooltiptext: "左鍵：UTF-8\n中鍵：Big5\n右鍵：GBK",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlUlEQVQ4ja2TwQ2AIAxF3wau4QCuwCxcPTKMI7iBO7iCA3BiArxUJaSCik2a0NL/+1MK/Gg9MAMBiDcepKbXwB4Yga7QpJMan5PMcvHUnGBOC5XOmpKQJuILsIpJg5VraA7Y5OwBWyMYBHScYxb7JwSpAs1NiWDimq6RvE3ipabAiMyoKCnOoPkZmxepeZUPks+f6bPtGg1LLkKBszsAAAAASUVORK5CYII=",
onclick: "var code = ['UTF-8', 'Big5', 'GBK']; BrowserSetForcedCharacterSet(code[event.button]);closeMenus(this);"
},
{
label: "短網址",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAe0lEQVQ4je2QuxGAIBAFV1uxGTqwA0M6MLIK7MBC6IDMYjQ59Q3K6BizMwTsHfcBKooHotwjsNkpeddKoAcS0Ilr7CRpMokfj8QOCICzpLzTJu6R8JLsrfitQGuBQcaazeWswCITnk1CJp05XSFkj85PLK30mYZr58pPdhnlJMaUDTKQAAAAAElFTkSuQmCC",
oncommand: function() {
var url = addMenu.convertText("%RLINK_OR_URL%");
var form = new FormData();
form.append('url', url);
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://dwz.cn/create.php", true);
xhr.onload = function() {
var obj = JSON.parse(xhr.responseText);
addMenu.copy(obj.tinyurl);
}
xhr.send(form);
}
},  

{
label:"URL向上一層",
url: "javascript:if%20(location.pathname%20==%20%22/%22);%20else%20if%20(location.pathname.charAt(location.pathname.length-1)%20==%20%22/%22)%20location%20=%20%22..%22;%20else%20location%20=%20%22.%22;%20void%200",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABHRSTlMAPvpPlVb7NgAAACJJREFUCNdjwAdcQMABTVBIAEIzK0IFRECKECIINZjmEAYAb6UE1ZoIrJYAAAAASUVORK5CYII="
},
{
label: "購物比價工具",
oncommand: function() {
gBrowser.loadURI("javascript:(function(){var%20s;s=document.createElement(%22script%22);s.type=%22text/javascript%22;s.charset=%22utf-8%22;s.src=%22http://www.gwdang.com/get.js?f=/js/gwdang_extension.js%22;document.body.appendChild(s);})();");
},
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzUlEQVQ4y6WTPQrCQBCFX1ghyHcEC9EL2CXYWthYeAuFiJWNJ7GzTecFvIBgJWinjbV1ChGMzQohxM2PD7aYnZnHe7szHrCU1JH0krRLkuSkmkizB/DVFMAdGNfpaeXiraSJpH1TBUPg+Y+Co6S3fY9SGGMeRZc3YFah+Qysi2zMjTHXEqvG/li/KNmzSc9BMCqzmQIDh/wLsHJJ3PwqyMjvugim+QnNTeuhbB7a+hdAAETf3QB8Gwe1lgyILMEiY6OSgtgShDYObRxn6z4vdzQsAV2dpAAAAABJRU5ErkJggg=="
},

];
var menu = PageMenu({
label: "多功能菜單",
condition: 'normal',
insertBefore: 'context-openlinkincurrent',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABBJREFUCNdjgID6fxCaIBcAcUwEeC1dweYAAAAASUVORK5CYII="
});
menu(items);
};


//閱讀輔助工具
new function () {
var items = [
{
label:"自動翻頁",
url:"javascript:(function(){if(window['pgzp']){_pgzpToggleBookmarklet();}else{window._page_zipper_is_bookmarklet=true;window._page_zipper=document.createElement('script');window._page_zipper.type='text/javascript';window._page_zipper.src='http://www.printwhatyoulike.com/static/pagezipper/pagezipper_10.js';document.getElementsByTagName('head')[0].appendChild(window._page_zipper);}})();",
image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYUlEQVQ4jWNgoBAwovH/U6ifJAP+MzAwMLDgkyTGVlwGYDgNF0A3AJtGdNcQNNyOgYHhF5TGB/CGF8wQfzya/iMz8GFcLqGeC3BpdsBnA8wAYqILVyz8x6Z/GKREQrZjAACcgyBE8VS2qwAAAABJRU5ErkJggg=="
},{
label:"夜間模式",
url:"javascript:(function(){var%20night=function(w){(function(d){var%20css='html{opacity:0.7!important;background:black!important;}body{background:white!important;}';var%20s=d.getElementsByTagName('style');for(var%20i=0,si;si=s[i];i++){if(si.innerHTML==css){si.parentNode.removeChild(si);return}};var%20heads=d.getElementsByTagName('head');if(heads.length){var%20node=d.createElement('style');node.type='text/css';node.appendChild(d.createTextNode(css));heads[0].appendChild(node)}})(w.document);%20for(var%20i=0,f;f=w.frames[i];i++){try{arguments.callee(f)}catch(e){}}};night(window)})();",
image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmaHTeAAAAIXRSTlMAxsDKvHPOw5pK97WmoYJ4bVtUQDAiCrCMimhhOCwbFwwUUO7SAAAAbUlEQVQY022OVw7AMAhDndl07z3vf8oqEapQFf/AAyOMqFJps5RxWUx2ZOwMqobxkAMCTPoGJOMAyX9QHPwEwKUI+orsZg68+zj56dvWls0qnH83KnKbDtsS7PqLRHla1YVaq4c2kxM6kaJGTC+MlANOz9LO6wAAAABJRU5ErkJggg=="
},
{
label:"Readability",
url:"javascript:(function(){x=document.createElement('SCRIPT');x.type='text/javascript';x.src='http://brettterpstra.com/share/readability.js?x='+(Math.random());document.getElementsByTagName('head')%5B0%5D.appendChild(x);y=document.createElement('LINK');y.rel='stylesheet';y.href='http://brettterpstra.com/share/readability.css?x='+(Math.random());y.type='text/css';y.media='screen';document.getElementsByTagName('head')%5B0%5D.appendChild(y);})();",
image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAaVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnbPKNAAAAI3RSTlMA+O/0xi/p4ZeFUUEI49HMcGhGPigUDurVubi0qomBdFosGkgxKCAAAABlSURBVBjTrYvHDcQwEMS4ypJzvOjYf5GGXIP5ITAY8gxnl26XqZuyo3jlLAzqVUkLhfTw93PpAuwyYj75LaZRAM2X+gegbX8PxlBoC8GBirk/IEhd6QGS9m9ZAGxs5+xpW0ce4QLyDgO0EbBIEQAAAABJRU5ErkJggg=="
},
{
label:"關鍵詞密度查詢",
url:"javascript:(function(){var%20T=%7B%7D,W=%5B%5D,C=0,s,i;%20function%20F(n)%7Bvar%20i,x,a,w,t=n.tagName;if(n.nodeType==3)%7Ba=n.data.toLowerCase().split(/%5B\s\(\)\:\,\.;\<\>\&\'\%22%5D/),i;for(i%20in%20a)if(w=a%5Bi%5D)%7Bw=%22%20%22+w;T%5Bw%5D=T%5Bw%5D?T%5Bw%5D+1:1;++C;%7D%7Dif(t!=%22SCRIPT%22&&t!=%22STYLE%22)for(i=0;x=n.childNodes%5Bi%5D;++i)F(x)%7DF(document);for(i%20in%20T)W.push(%5BT%5Bi%5D,i%5D);W.sort(function(a,b)%7Bvar%20x=b%5B0%5D-a%5B0%5D;return%20x?x:((b%5B1%5D<a%5B1%5D)?1:-1)%7D);%20s=%22<h3>%22+C+%22%20words</h3>%22;for(i%20in%20W)s+=W%5Bi%5D%5B0%5D+%22:%22+W%5Bi%5D%5B1%5D+%22<br>%22;with(open().document)%7Bwrite(s);close()%7D})()",
image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdUlEQVQ4jWNgGGjACKX/45FjwKGGEZ8kIQBXz0SEQg98CvAZ4MHAwDCLgYEhkGh3oYGjDAwMylCaZBcoQ+m7DAwMKxkYGPJItT2PAeJ/GMbrCmy2o8fKTCRXYQXIGmZCMTLwQBPDiHaapQOCgAWPKwgl5UECACwQGGYj5F3pAAAAAElFTkSuQmCC"
},

];

var menu = PageMenu({
label: "閱讀輔助工具",
condition: 'normal',
insertBefore: 'context-openlinkincurrent',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiklEQVQ4je3SIQ7CcAzF4Y8Fj5hBYpEkOBSXWIKY5VQoOAYaw8QMB9gJMBgcCLpkIeEPyQQInmn7fknzmpRvaxB1jhWWmIbXYI8jZi/YNgujwgVr5BijxBm7J5Z3WNUmuSVSJlmWgB/pv+AXFgw7/QYLTGJucHjH2gQ1Tigw8vi2IrxrgtV9L+ivO97LHdW2qVgKAAAAAElFTkSuQmCC"
});
menu(items);
};

//編輯當前頁面
new function () {
var items = [
{
label: "編輯當前頁面",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzklEQVQ4y73SIUuDYRAA4FMeNK9Pqz/B4mSbQ2Wg/8E2g+CPEctYXzcZrNaJQYMsj7kiBmHwhZULMsTt+8KuvO8dPPDevRexqUALL/jCHXbL4EvMcY09POC+DP7EIM8mapiXwYeZn2R+hY9S+Fd9mO20quAjzNCtghuJz6vgduKz/3AXP2gs1TuJ26uG9pqL8o6DrJ0mbq7C+5hiGz2Ms50Zjtf57xv0876DEb6X2/krthI9RsRbRNQi4iIixhFxWxTF87rrOsFTvqQem4wFTec0RRu9Et4AAAAASUVORK5CYII=",
oncommand: function() {document.onkeydown=ck;content.document.body.contentEditable=true;function ck(e){k=window.event?window.event.keyCode:e.keyCode;if(k==27){content.document.body.contentEditable=false}}}
},
{
label: '解除右鍵限制',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIVBMVEUAAAAAAAC4uLjb29tmZmY6OjqRkZHr6+vIyMiurq6enp6fJmq8AAAAAXRSTlMAQObYZgAAAGVJREFUCNdjQAJMS5MawHSgoKAYiFEYwMBg6ABkhACxYhhQJgCIhQwNGFgTgAIKLAkMjAZAAQY2ByADKMDABGIABUAiLAlAAQZWoKCQEEg/EDsCBZhBHBYhY2MgBwgmCgoGIbkBAF+5CxbmrSXzAAAAAElFTkSuQmCC",
oncommand: function() {
gBrowser.loadURI("javascript:alert(document.body.oncontextmenu=document.body.onmouseup=document.body.onmousemove=document.body.onclick=document.body.onselectstart%20=document.body.oncopy=document.onmousedown%20=%20document.onkeydown%20=null)");
}
},  
{
label : '地形圖查看',
image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAvVBMVEUAAABqampqamoFAQEFAAEFAQIEAQFtbW0EBwUTwVYFAAFra2sFAgJqamoGCwhxcXFwcHBtbW0HBQUFBAQTw1YFDggJNRmAgIB8fHxqamoHAAMGAAIGEgoFAAAHEgtubm4EAgIKFA4HDgkGBAQCAgIEBAQUzlxqamoOkUANaDBxcXFubm53d3eAgIBvb2+EhIQHAAQGAAIFAABsbGwJNhljY2MKNhoGAAEGCQcFBwQPfDkOZS8TxFcOZS9qamrBNwEKAAAAPnRSTlMA8g2ttZ2vpAoEuqinoBLy6pxXTxcXBffz5822srGuoKCSal1JRRoYFg39/fTs6unYxLy2srCvkV9fHxwSCRMA9p8AAAC9SURBVBjTPYtVtsJQFENzvbdCSw13HvLcDZn/sEhZwP45J3slaLgz2tqBKXDB6HkFVHMd1yD12/cW8OXe/3/2A4qf8cdLmmZR4ibJcMp9iM6RgLQPYYHpLx6ZhaRwyBV0Cw+3xibQUPCZEKK3llJGK1iKMuK/7tE+ezSTMgFpZvfAAPEfHLMUFF0sLZbv2/a10YHNATNMJs5FWdp9+prFAIL+eFdvVp7v7LVCY9Ro0eIp4hHPmdyESoVmAXICpIIRwKR2BIMAAAAASUVORK5CYII=",
url: "javascript:(function(){function%20crawl(e,%20r){if%20(e.nodeType!=1)return;var%20ch%20=%20e.firstChild;while%20(ch!=null){crawl(ch,%20r+1);ch=%20ch.nextSibling;}var%20c%20='#'+r.toString()+r.toString()+r.toString();%20if(r>9)%20c='#FCC';e.style.color='white';e.style.background='none';e.style.backgroundColor=c;e.style.borderColor=c;}crawl(document.getElementsByTagName('body')[0],%200);})()"
},
{
label: "屏幕尺子",
url: "javascript:void('http://centricle.com/tools/favelets/');marqueeColor=prompt('Marquee%20Color:','red');initMarquee=document.createElement('div');marquee=document.body.appendChild(initMarquee);marquee.style.position='absolute';marquee.style.border='dashed%201px%20red';initControls=document.createElement('div');controls=document.body.appendChild(initControls);controls.style.position='absolute';controls.style.top='-300px';controls.style.left='-300px';controls.style.width='85px';controls.style.background='%23eee';controls.style.padding='5px';controls.style.border='solid%201px%20%23ccc';controls.style.font='10px%20verdana,sans-serif';controls.style.width='85px';controls.style.zIndex='99';controls.innerHTML='%3Cb%3ECurrent:%3C/b%3E%3Cbr%3E%20x:%3Cspan%20id=%22currentX%22%3E0%3C/span%3E%20y:%3Cspan%20id=%22currentY%22%3E0%3C/span%3E%3Cbr%3E%3Cb%3EBegin:%3C/b%3E%3Cbr%3E%20x:%3Cspan%20id=%22beginX%22%3E0%3C/span%3E%20y:%3Cspan%20id=%22beginY%22%3E0%3C/span%3E%3Cbr%3E%3Cb%3EEnd:%3C/b%3E%3Cbr%3E%20x:%3Cspan%20id=%22endX%22%3E0%3C/span%3E%20y:%3Cspan%20id%20=%22endY%22%3E0%3C/span%3E%3Cbr%3E%3Cb%3EDimensions:%3C/b%3E%3Cbr%3E%20w:%3Cspan%20id=%22dimX%22%3E0%3C/span%3E%20h:%3Cspan%20id=%22dimY%22%3E0%3C/span%3E';document.onmousemove=follow;document.onmousedown=beginDrag;document.onmouseup=endDrag;currentX=document.getElementById('currentX');currentY=document.getElementById('currentY');beginX=document.getElementById('beginX');beginY=document.getElementById('beginY');endX=document.getElementById('endX');endY=document.getElementById('endY');dimX=document.getElementById('dimX');dimY=document.getElementById('dimY');var%20marqueeLeft=0;var%20marqueeTop=0;dragging=false;void(document.body.style.cursor='crosshair');function%20follow(e){x=e.pageX;y=e.pageY;controls.style.left=x+15+'px';controls.style.top=y+15+'px';currentX.innerHTML=x;currentY.innerHTML=y;if(dragging){marquee.style.width=x-dragstartX+'px';dimX.innerHTML=Math.abs(x-dragstartX);marquee.style.height=y-dragstartY+'px';dimY.innerHTML=Math.abs(y-dragstartY);}return%20true;};function%20beginDrag(e){marquee.style.width=0;marquee.style.height=0;marquee.style.borderColor=marqueeColor;dragging=true;x=e.pageX;y=e.pageY;marquee.style.visibility='visible';marquee.style.left=x+'px';marquee.style.top=y+'px';dragstartX=x;dragstartY=y;beginX.innerHTML=x;beginY.innerHTML=y;return%20true;}function%20endDrag(e){dragging=false;x=e.pageX;y=e.pageY;endX.innerHTML=x;endY.innerHTML=y;return%20true;}",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADnRSTlMA4TXpZ0khzVpSgS8RD5pd+0MAAABRSURBVAjXY0AB6hIQmslS0QHMUF5zWgQsYMqYsLEBJBDAInZJACLgeLMAIsCwWIGBoRIowGoEVCIEFAhWADIaoQIMEAEQcNQ0gtjAIQ4SwAQAZj4N5nxaYsgAAAAASUVORK5CYII="
},{
label: "字體查詢",
url: "javascript:(function(){var%20d=document,s=d.createElement('scr'+'ipt'),b=d.body,l=d.location;s.setAttribute('src','http://chengyinliu.com/wf.js?o='+encodeURIComponent(l.href)+'&t='+(new%20Date().getTime()));b.appendChild(s)})();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABNJREFUCNdjgAD5DwyMDAQREAAAK6kBHIC7lQ4AAAAASUVORK5CYII="
},
{
label: "W3C綜合檢測",
url: "javascript:if%20(0)%20void('Multivalidator%20script%20(c)2002%20Tantek%20Celik%20-%20last%20modified%202002.03.15');var%20p27=String.fromCharCode(37)+'27',d=document.location,ft='%3Cframe%20',fs=ft+'src=',fe='%5C'%20scrolling=%5C'auto%5C'%3E',fc=ft+'style=%5C'border:2px%20solid%20#ff0%5C'%20src=%5C'http://',fm='%3C/frameset%3E';var%20h=fs+'%5C'javascript:document.write('+p27+'%3C!DOCTYPE%20HTML%20PUBLIC%20%22-//W3C//DTD%20HTML%204.0//EN%22%3E%3Cbody%20style%3D%22margin:0;padding:2px%206px%22%3E';var%20h1='%3Ch1%20style%3D%22display:inline;font-size:18px;margin:0;%22%3E';var%20e='%3E%3C/body%3E'+p27+')%5C'%20scrolling=%5C'no%5C'%20noresize%3E';var%20q=String.fromCharCode(34);var%20r='%20results',v='%20validator'+r,w='validator.w3.org/check';var%20ds='%3C!DOCTYPE%20HTML%20PUBLIC%20'+q+'-//W3C//DTD%20HTML%204.0%20Frameset//EN'+q+'%3E%3Chtml%3E%3Chead%3E%3Ctitle%3EMultivalidator%3C/title%3E%3C/head%3E%3Cframeset%20cols=%5C'50%25,50%25%5C'%3E%3Cframeset%20rows=%5C'24,*%5C'%3E';ds+=h+'%3Cdiv%3E'+h1+'Page:%3C/h1%3E'+d+'%3C/div'+e;e='%3C/h1'+e;h+='%3Ch1%20style%3D%22display:inline;font-size:18px;margin:0;%22%3E';ds+=h+'%3Cscript%3Edocument.location=%22'+d+'%22%3C/script%3E'+e+fm+'%3Cframeset%20rows=%5C'24,*,24,*,24,*%5C'%3E';ds+=h+'HTML'+v+'%3Ca%20title%3D%22Refresh%20to%20remultivalidate.%20Click%20for%20more%20info%20on%20favelets.%20-Tantek%22%20href%3Dhttp://favelets.com/%20target%3Dhelp%20style%3D%22float:right;padding:1px;width:1em;font:10px%20Avant%20Garde,Chicago,Times,Arial,serif;text-decoration:none%22%3E@%3C/a%3E'+e;ds+=fc+w+'?uri='+d+fe;ds+=h+'CSS'+v+e;ds+=fc+'jigsaw.w3.org/css-validator/validator?uri='+d+fe;ds+=h+'HREF%20checker'+r+e;ds+=fc+w+'link?url='+d+fe;ds+=fm+fm+'%3C/html%3E';document.open();document.write(ds);document.close();void(20020315);",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVQ4ja2SwQ2AIAxFP8YdHMCr7uE0zOAajGA8O4IHJ3AcPNiqkJZq4k8IlF9emlKHWxFlOcMvAiKA8S1goHPMvN2C8IOVdk8w9hoLwoBQ8IqQvIKBqmAvXypA6oGWa19agEowAyWsSpyoFu46nEPTKrEJmB4lOiFWxUk97QvuOQCADelcqIAZ6S94yJOpAt7oys178AXyjw6rSDbByl+p4wAAAABJRU5ErkJggg=="
},
{
label: "FireBugLite",
url: "javascript:(function(F,i,r,e,b,u,g,L,I,T,E){if(F.getElementById(b))return;E=F[i+'NS']&&F.documentElement.namespaceURI;E=E?F[i+'NS'](E,'script'):F[i]('script');E[r]('id',b);E[r]('src',I+g+T);E[r](b,u);(F[e]('head')[0]||F[e]('body')[0]).appendChild(E);E=new%20Image;E[r]('src',I+L);})(document,'createElement','setAttribute','getElementsByTagName','FirebugLite','4','firebug-lite.js','releases/lite/latest/skin/xp/sprite.png','https://getfirebug.com/','#startOpened');",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeBAMAAAAiKQiSAAAAMFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABaPxwLAAAAD3RSTlMAEM/vgL9QQGAsr5/fj3CUF5PQAAABAUlEQVQY04XQz0oCQRwH8O8uYmLEbEu3TnrqFpQIStCy0tl6AusJ3Eu3QKNTp+zQWXqC6gnsDeoNypNHl8UFReTnzndn8ODB72G+85k/MAywN4aJM9Fj8bxv/FRnHacD9tvSA/PA9eJFZO+NfgH8fcGmtAT259jk5ROjvkUaoSAyA+7jTKwDkRU3mBiuSKLbWomI9XZLT3R61sgdwWYqokT+jfy0TV8lHl9f9Tr0tV/J2AorMHaqrQBHZ4fPl3Tj0a/pG+WG0IsmGDfIHYe51Z1xN/fw1Xg4oLv4ob/VLR2iTQduwH9twtVOUK5ndD7e4XQy33CKgl4snaoTfbSGXVkDbzyE9+jnkBkAAAAASUVORK5CYII="
},

];

var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzklEQVQ4y73SIUuDYRAA4FMeNK9Pqz/B4mSbQ2Wg/8E2g+CPEctYXzcZrNaJQYMsj7kiBmHwhZULMsTt+8KuvO8dPPDevRexqUALL/jCHXbL4EvMcY09POC+DP7EIM8mapiXwYeZn2R+hY9S+Fd9mO20quAjzNCtghuJz6vgduKz/3AXP2gs1TuJ26uG9pqL8o6DrJ0mbq7C+5hiGz2Ms50Zjtf57xv0876DEb6X2/krthI9RsRbRNQi4iIixhFxWxTF87rrOsFTvqQem4wFTec0RRu9Et4AAAAASUVORK5CYII=", onpopupshowing: syncHidden });
menu(items);
};



//翻譯當前頁面
new function () {
var items = [
{
label : '有道網頁翻譯',
image:"http://shared.ydstatic.com/images/favicon.ico",
oncommand :
function() {
gBrowser.loadURI("javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())");
},
}, 
{
label : '谷歌全文翻譯',
image : "https://translate.google.com/favicon.ico",
oncommand :
function ()
{
gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200")
},
},
{
label: "谷歌全文翻譯(新標籤)",
url: "javascript:(function(){var%20t=((window.getSelection&&window.getSelection())||(document.getSelection&&document.getSelection())||(document.selection&&document.selection.createRange&&document.selection.createRange().text));var%20e=(document.charset||document.characterSet);if(t!=''){window.open('http://translate.google.cn/translate_t?hl=zh-CN#auto|zh-CN|'+t);}else{window.open('http://translate.google.cn/translate?u='+escape(location.href)+'&hl=zh-CN&ie='+e+'&sl=auto&tl=zh-CN');};})();",
image: "https://translate.google.com/favicon.ico"
},
{
label: "百度全文翻譯",
url: "javascript:(function(){window.open('http://fanyi.baidu.com/transpage?query='+escape(document.location.href)+'&from=auto&to=zh&source=url&render=1')})();",
image: "https://www.baidu.com/favicon.ico"
},{
label: '必應劃詞翻譯',
subdir: '',
image: "http://global.bing.com/s/a/bing_p.ico",
oncommand: function() 
{gBrowser.loadURI("javascript:(function(){script=document.createElement('script');script.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js';script.onload=INIT;document.body.appendChild(script);})();function%20INIT(){BingCW.Init({MachineTranslation:true,WebDefinition:true});}");
}
},
{
label: "海詞劃詞翻譯",
url: "javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://dict.cn/hc/init.php');%20document.body.appendChild(element);})())",
image: "http://dict.cn/favicon.ico"
},{
label: "愛詞霸劃詞翻譯",
url: "javascript:var%20ICIBA_HUAYI_ALLOW=1,iciba_huaci_url=%22http://open.iciba.com/huaci/%22;void%20function(){if(!document.getElementById(%22icIBahyI-yi%22)){var%20a=document.createElement(%22div%22);a.id=%22icIBahyI-yi%22,a.style.display=%22none%22,a.style.zIndex=%224294967295%22,document.body.insertBefore(a,document.body.firstChild);var%20i=document.createElement(%22div%22);i.id=%22icIBahyI-main_box%22,i.style.display=%22none%22,document.body.insertBefore(i,document.body.firstChild);var%20e='%3Clink%20type=%22text/css%22%20rel=%22stylesheet%22%20href=%22'+iciba_huaci_url+'mini.css%22%20/%3E%3Cobject%20style=%22height:0px;width:0px;overflow:hidden;%22%20classid=%22clsid:d27cdb6e-ae6d-11cf-96b8-444553540000%22%20codebase=%22http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab%23version=6,0,0,0%22%20width=%220%22%20height=%220%22%20id=%22asound_hanci%22%20align=%22absmiddle%22%3E%3Cparam%20name=%22allowScriptAccess%22%20value=%22always%22%20/%3E%3Cparam%20name=%22movie%22%20value=%22http://www.iciba.com/top/asound.swf%22%20/%3E%3Cparam%20name=%22quality%22%20value=%22high%22%20/%3E%3Cembed%20src=%22http://www.iciba.com/top/asound.swf%22%20quality=%22high%22%20width=%220%22%20height=%220%22%20name=%22asound_hanci%22%20align=%22absmiddle%22%20allowScriptAccess=%22always%22%20type=%22application/x-shockwave-flash%22%20pluginspage=%22http://www.macromedia.com/go/getflashplayer%22%20/%3E%3C/object%3E%3Cdiv%20class=%22icIBahyI-main_title%22%20id=%22icIBahyI-main_title%22%20%3E%3Ca%20href=%22javascript:;%22%20id=%22icIBahyI-gb%22%20class=%22icIBahyI-gb%22%20title=%22%E5%85%B3%E9%97%AD%22%3E%3C/a%3E%3Ca%20href=%22javascript:;%22%20id=%22icIBahyI-dq%22%20class=%22icIBahyI-dq2%22%20title=%22%E7%82%B9%E5%87%BB%E5%9B%BA%E5%AE%9A%E7%BB%93%E6%9E%9C%22%3E%3C/a%3E%E7%88%B1%E8%AF%8D%E9%9C%B8%20%E5%8D%B3%E5%88%92%E5%8D%B3%E8%AF%91%3Cdiv%20class=%22icIBahyI-sz_list%22%20id=%22icIBahyI-sz_list%22%3E%3Ca%20href=%22javascript:;%22%3E%E5%85%B3%E9%97%AD%E5%8D%B3%E5%88%92%E5%8D%B3%E8%AF%91%3C/a%3E%3Ca%20href=%22%23%22%20target=%22_blank%22%3E%E5%8F%8D%E9%A6%88%3C/a%3E%3Ca%20href=%22%23%22%20style=%22border:none;%22%20target=%22_blank%22%3E%E5%B8%AE%E5%8A%A9%3C/a%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-tl%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-tr%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-bl%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-br%22%3E%3C/span%3E%3C/div%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-search%22%3E%3Cinput%20id=%22ICIBA_HUAYI_input%22%20name=%22%22%20type=%22text%22%20onkeydown=%22ICIBA_HUAYI_KEYDOWN(event);%22%3E%3Ca%20href=%22javascript:;%22%20class=%22icIBahyI-sear%22%20onclick=%22ICIBA_HUAYI_searchword()%22%20%3E%E6%9F%A5%20%E8%AF%8D%3C/a%3E%3C/div%3E%3Cspan%20class=%22icIBahyI-contTop%22%3E%3C/span%3E%3Cdiv%20class=%22icIBahyI-loading%22%20id=%22loading%22%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-main_cont%22%20id=%22icIBahyI-main_cont%22%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-CB%22%20id=%22icIBahyI-scbiframe%22%20style=%22display:none%22%3E%3C/div%3E%3Cdiv%20id=%22ICIBA_TOO_LONG%22%20style=%22height:150px%22%20class=%22icIBahyI-footer%22%3E%E6%82%A8%E5%88%92%E5%8F%96%E7%9A%84%E5%86%85%E5%AE%B9%E5%A4%AA%E9%95%BF%EF%BC%8C%E5%BB%BA%E8%AE%AE%E6%82%A8%E5%8E%BB%E7%88%B1%E8%AF%8D%E9%9C%B8%3Ca%20href=%22http://fy.iciba.com%22%3E%E7%BF%BB%E8%AF%91%3C/a%3E%E9%A1%B5%E9%9D%A2%E3%80%82%3C/div%3E%3Cspan%20class=%22icIBahyI-contB%22%3E%3C/span%3E';document.getElementById(%22icIBahyI-main_box%22).innerHTML=e;var%20c=document.createElement(%22script%22);c.setAttribute(%22src%22,iciba_huaci_url+%22dict.php%22),document.body.appendChild(c);var%20i=document.createElement(%22div%22);i.id=%22icIBahyI-USER_LOGIN%22,i.className=%22icIBahyI-USER_LOGIN%22,i.style.display=%22none%22,document.body.insertBefore(i,document.body.firstChild);var%20t=document.createElement(%22script%22);t.setAttribute(%22src%22,iciba_huaci_url+%22ICIBA_HUACI_COM.js%22),document.body.appendChild(t)}}();",
image: "http://res.iciba.com/dict/favicon.ico"
},
{
label: "漢典查字劃詞解釋",
url: "javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://www.zdic.net/tools/zih.asp');%20document.body.appendChild(element);})())",
image: "http://www.zdic.net/favicon.ico"
}

];

var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVR42mNkwATrgXg/EE9iIAIwYhETAOKDQFwOxDuIMeA/A3FgFhCnE+MCZBAMxI1ArEOMFw4AcTIQ30USOwrEcWhiOA2wBeIOILaG8j2AOAKIE0gJRJCmQCC+CsThQOwNxB9IMUAAGoXfiNGMbIA8EG+BBpYnEN8G4jtQORVoGChDxUKAeC22aFTBEViggLSCpg1WIOYEYiN80fgfjzjIkkXIMUOsAaD00ATE2kCcB8RuQOxDigEgb8wA4s1ArADE54FYEBTIuAwgJrm3A3EVIxF5YCaUbgPij1C2MxCvARlOjAG4AvUcKDYAi+YxEXgzorIAAAAASUVORK5CYII=", onpopupshowing: syncHidden });
menu(items);
};

//分享當前頁面
new function () {
var items = [
{
label : '分享當前頁面',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC",
oncommand :
function() {SocialShare.sharePage();},
}, {
label: "一鍵分享按鈕",
url: "javascript:(function(){var%20w=window,d=document,s;if(!w.jiathis){w.jiathis=1;s=d.createElement('script');s.src='http://www.jiathis.com/code/j.js';d.getElementsByTagName('head')[0].appendChild(s);s=null}else{$CKE.center()}})()",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC"
},
{
label: "發送到EverNote",
url: "javascript:(function(){EN_CLIP_HOST='http://www.evernote.com';try{var%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new%20Date().getTime()/100000);document.getElementsByTagName('head')[0].appendChild(x);}catch(e){location.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);}})();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC"
},
{
label:"發送到OneNote",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB4ElEQVQ4jXWRvWtUQRTFTxI3vhnWmccD3eKnKfxCBIuVFEFBFGstxIBBDIhgIRaihUWsFDWC+AUa1FLEVgv/ABvBoEFBiKAIKqMG4bEQwiJ+rM08HB6bqe6cc8+Ze89ItQPsANp98K3AnjqeNhTAfUk9ST3gaMIdrPAsy+aBVl18JIpuAquALfF+C7gY6zZggGlr7RJwHBiQ9342z/NPwGjNtJ1Ms6vGbbPWfjPGfBlsNpsPO53OiKTBSA4Bp0MIc8AZ4EQI4RlwDmgkPqYoinuV47740iljzFdjzGdgffLi2kaj8d1auwCcjL2H6jlcTkZe3Sfk3Fq7EPk7KbESuBuJUeBarCeBgdgzHrEZoJ3n+UfgAWAFTEVyQ2K6XVLPe//Wez8X+Z0Jvy5i0wKGgQsROJw07U9WmkjwAxG7Cph0lSlJPWPMB+BSnOCF9/5VFNwAHlXiSrciyelP3H+pLMsJYI2kY5J8s9ncW5blbFEUj4HzkoYr0WBi8Lcsy3FJM91ud1MI4UdFhBA63W53s6TrZVlOSvpZcUNV4Zx7bYxxIYQnwG/n3EtJY5Iy59xz59zZEMLTVqt1W9KVxcXFX/WvrrIYybLsXczgTZ7n8zGb98DGvqJljMb0/xd2L9f3D0Qbo6wQfg5rAAAAAElFTkSuQmCC",
oncommand: function(){
var onenotePath = "C:\\Program Files\\Microsoft Office\\Office15\\Onenote.exe";
var focusedWindow = document.commandDispatcher.focusedWindow;
var selection = new String(focusedWindow.getSelection());
if (selection.length == 0) {
goDoCommand('cmd_selectAll');
var allSelection = new String(focusedWindow.getSelection());
if (allSelection.length == 0)return;
goDoCommand('cmd_copy');
goDoCommand('cmd_selectNone');
}
else
{
goDoCommand('cmd_copy');
}
var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
file.initWithPath(onenotePath);
var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
process.init(file);
var args = ["/sidenote", "/paste"];
process.run(false, args, args.length);
}
},
{
//代碼來源：https://getpocket.com/welcome?b=Bookmarklet
label: "+Pocket",
accesskey: "P",
oncommand: function() {
gBrowser.loadURI("javascript:(function(){var%20e=function(t,n,r,i,s){var%20o=[2035120,3068561,4746347,4970120,6888016,4880111,6690539,6153817,4568836,2928202];var%20i=i||0,u=0,n=n||[],r=r||0,s=s||0;var%20a={'a':97,'b':98,'c':99,'d':100,'e':101,'f':102,'g':103,'h':104,'i':105,'j':106,'k':107,'l':108,'m':109,'n':110,'o':111,'p':112,'q':113,'r':114,'s':115,'t':116,'u':117,'v':118,'w':119,'x':120,'y':121,'z':122,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,'Y':89,'Z':90,'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,'\/':47,':':58,'?':63,'=':61,'-':45,'_':95,'&':38,'$':36,'!':33,'.':46};if(!s||s==0){t=o[0]+t}for(var%20f=0;f<t.length;f++){var%20l=function(e,t){return%20a[e[t]]?a[e[t]]:e.charCodeAt(t)}(t,f);if(!l*1)l=3;var%20c=l*(o[i]+l*o[u%o.length]);n[r]=(n[r]?n[r]+c:c)+s+u;var%20p=c%(50*1);if(n[p]){var%20d=n[r];n[r]=n[p];n[p]=d}u+=c;r=r==50?0:r+1;i=i==o.length-1?0:i+1}if(s==269){var%20v='';for(var%20f=0;f<n.length;f++){v+=String.fromCharCode(n[f]%(25*1)+97)}o=function(){};return%20v+'e8dd7f9d42'}else{return%20e(u+'',n,r,i,s+1)}};var%20t=document,n=t.location.href,r=t.title;var%20i=e(n);var%20s=t.createElement('script');s.type='text/javascript';s.src='https://getpocket.com/b/r4.js?h='+i+'&u='+encodeURIComponent(n)+'&t='+encodeURIComponent(r);e=i=function(){};var%20o=t.getElementsByTagName('head')[0]||t.documentElement;o.appendChild(s)})()");
},
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvElEQVQ4jcXSIXICQRCF4a+KqhWYOUE8Zs+A4hYcBBmzEoNGIlHY2NwhMi4mKmoliG4xbC3FhlCV30zVTM+b97qHJ9LjC2/YYPFbgXleWqHDJ96xfNTRDOsU2ucDD1FwSjflL252KXLTSY8PbN1u4EHEGaVBKybwbTx3ET2529iCoxhpMzhbiyiTOIrsNbN00U4RKOJzDYs7vA6LO/zkWrMRja1ZiXhX9DinSE0rplPzks4mOWhS/N7eP3EBkgkmEdZryUkAAAAASUVORK5CYII="
},
{//代碼來源：http://yun.baidu.com/tools
label: "收藏到百度雲",
url: "javascript:void%20(function(d)%20{var%20e%20=%20d.createElement('script');e.byebj=true;e.src%20=%20'http://s.wenzhang.baidu.com/js/pjt/content_ex/page/bookmark.js?s=bm&t='%20+%20(+new%20Date());var%20b%20=%20d.getElementsByTagName('body')[0];b.firstChild%20?%20b.insertBefore(e,%20b.firstChild)%20:%20b.appendChild(e);}(document));",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4jcXSv0qdQRCG8d9JUmghpBC2sNAIEqshl5D6kE7bkC5WFoJg5zVoAmntRbDJn5sIBEcQAhpIkcDBwkqMGNBmj24+j8Qm5IVlmZnnnZ2B5X+r1wYR8RSf8OQO/hv6mfl1mHjQAdY65kusY6XGs5W5PUFEPMZPjNfUL7zEexw0jc8wlZkn3QleNWZ4kZk7mMJekx+vLHhYX+9hC5MNOFFK+ZyZR6WU49aEmVLKu8FgcD3Bc8z7U8/wIyIW8aFTm6+e6wav3dYmVrGNsRH1JXhUg/4IYGNErlW/bfAbM5n5/S8mEBHT+MLNCvu4qMXL7t2eyp8jqf8gIt7iEG8ycwjd9XoPy5jLzOXhCrv4iI2IuM8Wp1i4D/jvdQWgm0n7Gn2U7gAAAABJRU5ErkJggg=="
},
{
label: "收藏到百度相冊",
url: "javascript:if(typeof%20yXzyxe58==typeof%20alert)yXzyxe58();void(function(g,d,m,s){if(g[m]){if(window._bdXC_loaded){g[m].reInit();}}else{s=d.createElement('script');s.setAttribute('charset','utf-8');s.src='http://xiangce.baidu.com/zt/collect/mark.js?'+(new%20Date()).getTime();d.body.appendChild(s);}}(window,document,'_bdXC'))",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4jcXSv0qdQRCG8d9JUmghpBC2sNAIEqshl5D6kE7bkC5WFoJg5zVoAmntRbDJn5sIBEcQAhpIkcDBwkqMGNBmj24+j8Qm5IVlmZnnnZ2B5X+r1wYR8RSf8OQO/hv6mfl1mHjQAdY65kusY6XGs5W5PUFEPMZPjNfUL7zEexw0jc8wlZkn3QleNWZ4kZk7mMJekx+vLHhYX+9hC5MNOFFK+ZyZR6WU49aEmVLKu8FgcD3Bc8z7U8/wIyIW8aFTm6+e6wav3dYmVrGNsRH1JXhUg/4IYGNErlW/bfAbM5n5/S8mEBHT+MLNCvu4qMXL7t2eyp8jqf8gIt7iEG8ycwjd9XoPy5jLzOXhCrv4iI2IuM8Wp1i4D/jvdQWgm0n7Gn2U7gAAAABJRU5ErkJggg=="
},

];

var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC", onpopupshowing: syncHidden });
menu(items);
};



//當前頁面
new function () {
var items = [
{
label:"IE瀏覽器中打開",
text:"%u",
exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jWNgoAJYzsDAcB8H/o1Hbj/MgP9E0q/RaJg4w38i8Gso/R6Nz8DAwMCwnoGBQQEHtsEjNxlmwHEGBoYEHHg2HrnNMAPmM5AHGogxQAGqkIVcAxgYIAF2moGBQYNcAzYzQEL8OwMDgwM5BtRADbjOgOoVog3QgOLzUMNINgDZoBxKDEAHcAM2M0AyBjb8Ho/cYTItRgUAXItLMzITnmsAAAAASUVORK5CYII="
},
{
label:"在隱私窗口打開",
oncommand: "openLinkIn(content.location, 'window',{private:true});",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4je3RIUzDQBjF8V9CMotEoTCYufopBBqLx1ZOYiZn0JVIVC0WXTuJm6mqmpmY6Dt2CYIESXjJ9a7/vn7fvTv+hJ6wRocPTNhnfg+fcMCA1/gfsIIjtmgLiC5SfIPrsCZsiz6F58cvNcInbgJKhBHPlXEd3xgPLLGTnPeBh2T7qh7tMz/GI76+VH+p4JBd1NHK+1A16Mzn5iod7n4KXGmVfy4LaALawAVus7s260W+tYn3reHS+Wom8wF1Gbtkn/AW77+iE6SaONczlmqVAAAAAElFTkSuQmCC"
},
{
label:"在側邊欄中打開",
oncommand:"openWebPanel(content.document.title, content.location);",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPElEQVQ4jWNgoBL4jwcTbQAp4kPUADsGBoZfUJpkA/zxaSZkgB0DEbFEUxfAgAM+Q4ZGNBI0gKK8MHAAANGVMRA9chdTAAAAAElFTkSuQmCC"
},
{
label:"在谷歌快取打開",
url:"https://webcache.googleusercontent.com/search?q=cache:%u",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg=="
},
{},
{
label : '谷歌站內搜索',
image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
oncommand :function () {
gBrowser.loadURI("javascript:var%20Bar=location.host+%22%22;q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22\u8BF7\u8F93\u5165\u641C\u7D22\u7684\u5173\u952E\u8BCD:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.google.com/search?num=30&hl=zh-CN&newwindow=1&q='+q+'&sitesearch='+Bar+'');window.open(qlocation);}%20void%200");
}
},{
label : '百度站內搜索',
image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKE86IAAAADXRSTlMADfPbvlJNPuuEILMzPXScigAAAEhJREFUCNdjQAW8IILNSRvCmBwow3v3LlDAECrFEgBlMAmA5KEMRgWoFKsDA0SxcAJEu6hRAcRAlfR2mBUVBVAGexdMaAHCAQDU2wqQMtL8zwAAAABJRU5ErkJggg==",
oncommand :function () {
gBrowser.loadURI("javascript:var%20Bar=location.host+%22%22;q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22\u8BF7\u8F93\u5165\u641C\u7D22\u7684\u5173\u952E\u8BCD:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.baidu.com/s?&ie=UTF-8&oe=UTF-8&cl=3&rn=100&wd=%20%20'+q+'%20%20%20site:%20'+Bar+'');window.open(qlocation);}%20void%200");
}
},
{
label: "查找相似頁面",
oncommand: function() {
gBrowser.loadURI(
"javascript:(function(){%20document.location.href='http://www.google.com/search?q=related:'+escape(document.location.href)%20})();");},
condition: "noselect nolink nomailto noimage nomedia noinput",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmklEQVQ4jaWRwQ2DMAxFX8oo6aUSg2QDtmCfjMC9K7ABR1iDK1zcNEVOFNMvfUX6sr+/HbDhAEIudIbmAOzAC3gbBwMwA17ehIdSeCial3cDJmCsTdIMRtE/nJWaooFXtJilSk0lRmGOoGjFBFVoR9QQL6nSEVsNAJ6AEw41A9dgttxJsPJdIeHuCj3yjRaDKzarQb7C9MfgX5wVmydVGUgXkQAAAABJRU5ErkJggg==",
},
{
label:"查找反向鏈接",
url: "javascript:(function(){%20document.location.href='http://www.google.com/search?q=link:'+escape(document.location.href)%20})();",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGUlEQVQ4jb2SsUoDQRRFz66mSTGFKAi3sbC0EcUvUCGW2lqksjGFP2BnJ2hjm2ATMWipYCFYBuwD/sAF7YQVO41FVlyjsyEWXhgYmHvPY9578N+SlEo6lzQDMDEuIMuyfgjhDWiFEG6SnNoveF6BFdu9QtUEuAZqQ7xuCmA7+TxAA+hIqhaMu8AUUMk9G0APqMf+eSbpJL8vSHqSNF94b0uaBUgigACsAVfAPXBs+zTWl6gkHUm6KPNMloTXgS1gsQyQRsLTQItBk14k1ccCAE2gbfsOqAIHkpZz+LdF+gGQtAMI2Aew/QzsAU1JFdvvQAe4lTQXW6Ql2w9D4EsGPSmq++sYR0lSDTgENqNTGKFtYNX24x/zX/oA5V9RBLhEY9sAAAAASUVORK5CYII="
}, 
{
label:"此頁網站樣式",
oncommand: "stylishOverlay.findStyle(event)",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA8klEQVQ4y6XSoUpEQRiG4WdhwSIIFpNeg2AUJmw0LAajRbDtFjFq8gJMmhTvQRBNli+axKyCNpvJYrEc5aBz1kX/doZ5H84wQ8eUUpZLKSO/TK8SXuIRm5jDVZK1qYAmnsFKE39OJ9JrxUMc4gmDyt4q0gZm8II9HHX88Q/k+xGO8IBXnHUg50nWu4BVHCdZLqVsTYPUbuEeG0luSynbOJmE1IADzCcZN9+TkHENWMINFpO8T0DesNrreIW32E9y0VprI28YJrnuV+IdzOKuvZ7ktJQCY+wmua7dwg5GGCR5NsX0/hNDv4lHf4m/ACz8JYYPtRRoOaKFRHoAAAAASUVORK5CYII="
},
{
label:"此頁油猴腳本",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAflBMVEUAAAAzMzNNTU2bm5s+Pj4uLi4qKirq6urZ2dm0tLR4eHhxcXFdXV1DQ0M7Ozv8/PzAwMCwsLCnp6eCgoJHR0dGRkY3NzceHh4HBwfk5OTg4ODR0dHPz8/FxcWqqqqenp6UlJSOjo58fHxsbGxmZmZYWFg6OjomJiYkJCQYGBhoja3FAAAAAXRSTlMAQObYZgAAAINJREFUGNNNjlcSwyAMRFf0YMB24pbe2/0vmHHADO9HehpptEg8wsBR4AKOonBLgKZ99qvSgK+yt3QARsq+mi6AZ2yNRBieunNo3qc0INjJzpufNg66qt7EWzr/ay2jA/KeGhVDivx4J+cPjGHBqNHAFdHllrPbC8h4DvVFQSP63qT+B7shBQwlpDJKAAAAAElFTkSuQmCC",
oncommand: function () {
var domain = content.location.hostname;
gBrowser.selectedTab = gBrowser.addTab('https://www.google.com/search?q=site:userscripts-mirror.org%20' + domain);
gBrowser.selectedTab = gBrowser.addTab('https://www.google.com/search?q=site:greasyfork.org%20' + domain);
}
},
{
label: "WOT信譽檢測",
url: "javascript:(function%28%29%7Bvar%20f%3Ddocument.getElementById%28%27wot-bookmarklet%27%29%3Bif%28f%29%7Bf.parentNode.removeChild%28f%29%3Breturn%3B%7Dvar%20l%3Dlocation.hostname%3Bif%28l%26%26l.length%29%7Bf%3Ddocument.createElement%28%27iframe%27%29%3Bif%28f%29%7Bf.setAttribute%28%27id%27%2C%27wot-bookmarklet%27%29%3Bf.setAttribute%28%27src%27%2C%27http%3A//www.mywot.com/bookmarklet/%27+encodeURIComponent%28location.hostname%29%29%3Bf.setAttribute%28%27frameborder%27%2C0%29%3Bf.setAttribute%28%27scrolling%27%2C%27no%27%29%3Bf.setAttribute%28%27style%27%2C%27position%3Afixed%3Btop%3A10px%3Bleft%3A10px%3B%27+%27width%3A135px%3Bheight%3A235px%3Bborder%3A0%3Bmargin%3A0%3Bpadding%3A0%3Bz-index%3A10487575%3B%27%29%3Bif%28document.body%29%7Bdocument.body.appendChild%28f%29%3B%7D%7D%7D%7D)()",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABkklEQVQ4jX2Tu2pUURSGvzMYSYqMH/EJjJfEy1uIYNAuttEm9p5yGgsfQC0MsbAQLCyCZSAQbcwriBoHgnaCFitOETLNsTjrxM1k8IcN+6z1/+us266YgHoNWAdWgAtpPgB2gFcR8bnk9wrhWfUFsAv8ApYB81xN2676Up3rdFUnBraBEfAgIkZqExGdv4mISp0HXmfQlYgYdxk8S/FqRIwmy+qQvnvAIfAUoFKvAx+AKxHxJ/94GfiWRIBz6R+mv5/+m71s2GYhvgTsATVwMU8N7GVgkrsJrFfql2xYiToinpcG9VGWWuIr6rE6WxAP1YXJ+tXzahTfs+pxb5L4HzTk1AqMe7RLcqQ2agP0gbUpAe4D/YJ3BPw4Q7thbyPiSaa2BHxM0psUrwEDYDki9pP3GFio1Bu027c0ZYzdTsxzeoz7wK2uIRvqO/Wkxsxg2r1K7gb8ewt11r6V0acifVu0q1yfBIiIMXAH+AkM1UEKZtSZvA+AIfAbuJuaU2MhV/shcBtYBMbAd+A97XP+VPL/Ai+xk5pD13LFAAAAAElFTkSuQmCC"
},
];

var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcklEQVQ4y7XSuw2FMBBE0RO4CEJKoAOoiN7IaQuhpxeYxAGywBgBI222M7r74QO1iJX1SBGCDxUwY8GKX4Ydc5zSfD3+qU4Djgj25j5RVAfkZncJcjNMtQFNWtx4dcYSQVcy1O6g1DM8DfDKJ4abFO9rA1D9MeUVPKkRAAAAAElFTkSuQmCC", onpopupshowing: syncHidden });
menu(items);
};


/*——————————書籤右鍵——————————*/
/*爲書籤右鍵添加 移動 功能*/
page({
label: '移動...',
accesskey: "M",
insertAfter: "placesContext_newSeparator",
command: "placesCmd_moveBookmarks",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgGCrAjoGB4ReUptgQf3yK/hOJyXIJUS4gpNmBHM1k20aWP/0p0WzHQHws0MYFMOBADUOGEAAAtLMgYRGzlKoAAAAASUVORK5CYII=",
})


/*——————————移動圖標和菜單——————————*/
//移動圖標，代替Movebutton.uc.js，需配合RebuildWhenStart.uc.js，可惜對有的圖標還是無力
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
