
//2015.07.02 11:00 參考貼吧长丝绾月版加入新功能，補齊黑白系圖標
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
accesskey: "I",
condition: "image",
where: "tab",
insertBefore: "context-viewimage",
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
command: 'context-copyimage-contents',
},
{
command: 'context-copyimage',/*複製圖片地址*/
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
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOElEQVQ4jaXTsS6EURQE4I9lJYpNREdIVEo2EonH4Dk8AFES1WpXxRNsQrUkGqJSaKhFiEpJRSQUZve/Catxkyn+c2Ymc+9/DrzgAzeYVp0h1IOhoj4d7ke03rCFZYyigVXsoxvsp9YIZzmaN3FbiXsTJ7hHB9tBJ7WTcERz04s0ksYtjrGIWhG7ltpxOM1o+lduJOoRJlMbw1xQT20ynG40/bOGuyLeLA7xhHNMFdxmuGulQTv3rOWRDvEZXMVgJklq4bZ74noi7eR7Dg+FwTuucZmecLu9q43jFLsYxjweC4MeHtMbDvc0Wh08h3CGC7z+YvCa3lm4z9Fa9z0Ue4m2iY0B2AxnL5r18h1aOMCEwWcinJbq1/YHaUk1SAt+DtKCapCWFIP071EetExt1TK1/bFM/1rnL0aZaKARA/d3AAAAAElFTkSuQmCC",
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
command: 'context-saveimage'
},
{
label: "檢查所有圖片",
accesskey: "C",
oncommand: function() {
gBrowser.loadURI("javascript:outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images%5Bi%5D.src)==-1){outText+='<tr><td><img%20src='+document.images%5Bi%5D.src+'></td><td>'+document.images%5Bi%5D.height+'</td><td>'+document.images%5Bi%5D.width+'</td><td>'+document.images%5Bi%5D.src+'</td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write%20('<table%20border=1%20cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>'+outText+'</table>');imgWindow.document.close()}else{alert('No%20images!')}");
},
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAv0lEQVR42mNkoBAwUssAByAOB2IOIvX9AeKNQLwFZsBzIJYk0fLXQCwKM+A/1DURQOwMxJ1AfIeAAfeBWBHdgN9AzALEa4A4FEkxDxBrAPEZQgYcB2ILIM4F4ilImrcDsQEQewLxEXwGgIAIEL9B02wD5X9BMgSnASDFyUBcCMSbkTQzIBmiCMSnsRlgA7URZPMHIBbAE/1YXfAZqpmY9IPVgP1EpgFHdAPeA7EgJQkJlIDcSTTgJBDPYBzw3AgApMktEXd8LEwAAAAASUVORK5CYII="
},
// 替換 openImgRar.uc.js
{
label: "打開圖像RAR",
accesskey: "R",
condition: 'image',
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
{label:"重新載入圖片",oncommand:"gContextMenu.reloadImage();",image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVQ4jcWSyw2AIBAF5+rNDuyE2AG9WIK1UQpVeMHLEggKLCHRSQgH9u3vAR+wzYovwMwkMZLEjogs4IAgx8ut6uQUgQVWuQNwaCt7EULawa5t3fGcdciFkFWv0UzYS7BITJW3EXKiO82AfIk5K8mdJqWN0UovbyrKj9Qb7UdupJYfIj9YalkAAAAASUVORK5CYII="},
{command: 'context-viewimageinfo',},
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
  image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVQ4jbWQyw2DMBBEHxFNTA10kR6oB9JjelilCrjwsS17DbGYiw8jP80+aEwHIGnJdLOZfS5RUoCkRdJX0lT7+3K6NzDWIL3T/bZ3AIqnHA7MrEvLK268BQCE4A04SmKHeA5KidxUF2QSubkFyJxzLigIa4sH3bt/JEZpBlQlPuImzAon1SmKukhOFgAAAABJRU5ErkJggg==" },

{
label: "保存選中文本",
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

var menu = PageMenu({ condition:'select', insertBefore:'context-paste', onpopupshowing: syncHidden,image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVQ4jbWQyw2DMBBEHxFNTA10kR6oB9JjelilCrjwsS17DbGYiw8jP80+aEwHIGnJdLOZfS5RUoCkRdJX0lT7+3K6NzDWIL3T/bZ3AIqnHA7MrEvLK268BQCE4A04SmKHeA5KidxUF2QSubkFyJxzLigIa4sH3bt/JEZpBlQlPuImzAon1SmKukhOFgAAAABJRU5ErkJggg=="  });
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
image: "",
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
image: "",
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
image: "",
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
image: "",
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
image: " https://mail.qq.com/favicon.ico",
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
},
{
label: "標點符號置換(中轉英)",
condition: "input",
accesskey: "E",
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

/*——————————頁面右鍵——————————*/
new function () {//多功能菜单
var items = [
{
label: "複製此頁標題+地址",
tooltiptext: "左鍵：標題+地址\n中鍵：Favicon地址\n右鍵：Favicon的Base64碼",
onclick: function(event) {
var title = addMenu.convertText("%RLT_OR_UT%"),
url = addMenu.convertText("%RLINK_OR_URL%"),
favicon = addMenu.convertText("%FAVICON%"),
favicon_base64 = addMenu.convertText("%FAVICON_BASE64%");

// 简化下标题
// [/\s(·|::|-|\|)\s.*/i, /_[^\[\]【】]+$/].forEach(function(r){title = title.replace(r, "");});

var formats = [
title + "\n" + url + "",
favicon,
favicon_base64,
];

var str = formats[event.button];
addMenu.copy(str);

if (event.button === 1) { // 中鍵竟然不会自动关闭
var node = event.target;
while (node.localName != 'menupopup') {
node = node.parentNode;
}
node.hidePopup();
}
},
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="
},
{
label: "UTF-8 : Big5 : GBK",
tooltiptext: "左鍵：UTF-8\n中鍵：Big5\n右鍵：GBK",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlUlEQVQ4ja2TwQ2AIAxF3wau4QCuwCxcPTKMI7iBO7iCA3BiArxUJaSCik2a0NL/+1MK/Gg9MAMBiDcepKbXwB4Yga7QpJMan5PMcvHUnGBOC5XOmpKQJuILsIpJg5VraA7Y5OwBWyMYBHScYxb7JwSpAs1NiWDimq6RvE3ipabAiMyoKCnOoPkZmxepeZUPks+f6bPtGg1LLkKBszsAAAAASUVORK5CYII=",
onclick: "var code = ['UTF-8', 'Big5', 'GBK']; BrowserSetForcedCharacterSet(code[event.button]);"
},

{
label: "+ Pocket",
oncommand: function() {
gBrowser.loadURI("javascript:(function(){var%20e=function(t,n,r,i,s){var%20o=[8444021,4186837,9422079,3587501,1930633,2159150,1068322,4393503,2787864,3698723];var%20i=i||0,u=0,n=n||[],r=r||0,s=s||0;var%20a={'a':97,'b':98,'c':99,'d':100,'e':101,'f':102,'g':103,'h':104,'i':105,'j':106,'k':107,'l':108,'m':109,'n':110,'o':111,'p':112,'q':113,'r':114,'s':115,'t':116,'u':117,'v':118,'w':119,'x':120,'y':121,'z':122,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,'Y':89,'Z':90,'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,'\/':47,':':58,'?':63,'=':61,'-':45,'_':95,'&':38,'$':36,'!':33,'.':46};if(!s||s==0){t=o[0]+t}for(var%20f=0;f<t.length;f++){var%20l=function(e,t){return%20a[e[t]]?a[e[t]]:e.charCodeAt(t)}(t,f);if(!l*1)l=3;var%20c=l*(o[i]+l*o[u%o.length]);n[r]=(n[r]?n[r]+c:c)+s+u;var%20p=c%(50*1);if(n[p]){var%20d=n[r];n[r]=n[p];n[p]=d}u+=c;r=r==50?0:r+1;i=i==o.length-1?0:i+1}if(s==411){var%20v='';for(var%20f=0;f<n.length;f++){v+=String.fromCharCode(n[f]%(25*1)+97)}o=function(){};return%20v+'0374af0ddd'}else{return%20e(u+'',n,r,i,s+1)}};var%20t=document,n=t.location.href,r=t.title;var%20i=e(n);var%20s=t.createElement('script');s.type='text/javascript';s.src='https://getpocket.com/b/r4.js?h='+i+'&u='+encodeURIComponent(n)+'&t='+encodeURIComponent(r);e=i=function(){};var%20o=t.getElementsByTagName('head')[0]||t.documentElement;o.appendChild(s)})()");
},
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABAklEQVQ4jWN44Rz0nxLMQFUD3iTm/X+bX40Xv0nIxW7Ax67J/4kFH9onYBrwbcc+og34tnU3FgN27v///////3+ePv//+849DE2/bt39/+f5S4gB2/bgNuBj3/T/Lz3D//88cwGu+efp8/9feob//zRpNmED/n3+8v9tZinEkNMX4Jrf5pT///flKx4DkMIA2RB0zZAw2IVpwNc1m1H8/O/zl/9vs8r+v82pQNH8/////19WrMc04G1uJWZw//uHVextZin2hPR5zhIskYYKPs1YgD8pvytr/P/z0jVU2//9+//zwpX/70rqic8LL/1i/r9JL/7/Jq34/0vfaDplJnIwAOYABoVuT3JbAAAAAElFTkSuQmCC"
},
{label: '收藏到百度雲',
tooltiptext: "左鍵：收藏到百度云\n右鍵：收藏到百度相册",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABYElEQVRIiWPgbD78n5aYYXhaINh+9H/Yqmv/Ww4+/B+37sZ/hf6TGGokuo/D1YStuvZfsP0ocRboTD39/+KLL//Rwbprr/+Ldh77z9t65P/0U88w5B+8//7fes55/BYIth/9f+PNNwzNMHD00cf/m268wSn/4fvv/zK9J3BbULn7Hk7NxILpp57htmDXnXcUW3DjzTfcFnz++YdiC/7//4/bgg/ff9PWAnwRSCy4+OILbgsKd9yh2IL+409wWyDRffz/i88/yTb8+++//zUmn8af0ZI23CTbgsb9D4grKg4++ECy4VdffcVaXGC1QLTz2P+jjz4SbfiNN9+wlld4S1PRzmN4iw0YePH553+ViafIK64V+k9iLfhg4M7b7/8Npp0hvbhG9wm2/HHwwQeMgo0sC2C4du/9/7///vv//////91HH//nbT1ClD6SajTnBRf/+y27QrR6ki0gBw99CwCR55zq4ZIcmgAAAABJRU5ErkJggg==",
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
label:"在隱私窗口打開",
oncommand: "openLinkIn(content.location, 'window',{private:true});",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4je3RIUzDQBjF8V9CMotEoTCYufopBBqLx1ZOYiZn0JVIVC0WXTuJm6mqmpmY6Dt2CYIESXjJ9a7/vn7fvTv+hJ6wRocPTNhnfg+fcMCA1/gfsIIjtmgLiC5SfIPrsCZsiz6F58cvNcInbgJKhBHPlXEd3xgPLLGTnPeBh2T7qh7tMz/GI76+VH+p4JBd1NHK+1A16Mzn5iod7n4KXGmVfy4LaALawAVus7s260W+tYn3reHS+Wom8wF1Gbtkn/AW77+iE6SaONczlmqVAAAAAElFTkSuQmCC"
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
label:"拼寫檢查",
accesskey: "A",
insertBefore: "context-viewsource",
condition: 'noinput noselect nomailto nocanvas nomedia noimage nolink',
tooltiptext: "拼寫檢查（當前窗口打開）！",
oncommand: function() {document.onkeydown=ck;content.document.body.contentEditable=true;function ck(e){k=window.event?window.event.keyCode:e.keyCode;if(k==27){content.document.body.contentEditable=false}}},
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

/*——————————菜單加圖標系列——————————*/
//以app的形式加图标，如果腳本不在，undefined的菜單将会出现在左上角APP按钮中，至少不会影响正常视觉
//Addmenuplus菜單
app(
{ id: 'addMenu-rebuild', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAv9JREFUeNp0U01IVFEU/u59Y/5XOhJjaEapVDaLFlFRlBFIYYqLwoWbaBFtXLWIWrRoFeVO2mRGCwVN+tEUBLMspFIqHdMpHQVNLcvSaSZ/xnn3ns59mkTYg3l33nnnO+c73/keiAhKRWFOrTWuP/vmaWwbeEean0nBNnGTY5OT8+9PgpOkhAMWQmEHBQe7fF/2XLqMFPBrwXEoficV1rqkqQK4OEFC8fnW/2X9QkRj/4mPdYKxJi4ty8J/LimkC5qhpn5zq78mGLT5n0Zv/48CMKPHHSN0o/qVLcjCWhykuQklYMoMTYTKjh3InNYkMBsM48GTTxdu1b5Gc8cgqlq7c/+mYXiTGd+UVZbAg7axC+6UJIx2/cqLj7cgYMHX+7ni8+w8QvMReOLcfgNgSR00OZoJLiDN5IRgcKYiLXHdRMZB99mtmalcQONl3yhc5IKlYlBV320JscJBwBGemKnU3Knh7rR3JrgAEUeJLjV3OT05eWIxQpiLLPECotyJ8HUqhKa2oT7T888KHQaSpQ4nTvblbEmpL8zPTS06unND8fFtmeHFRbg3JSMpORaK29iuGDQ/D3jZFODGcNjwKLLpxQi9D8xi8lu0tPHp5EUTbGoPtA8OBZGRloB090YnWTCwp38K91omSgTpVTEFKbNsYQaClo51cLuul8an57C7/JDrFGlVdP4+Tc3MwOKEwvwcXCk/IlZHYCdgWOTEEp+mclW7L7emeYCtsIRQg8+urvdRamIMhM2ykmRfBFBZOZxhwGrZBxrZCESM6oaqx07o8WyKQ8bm9VBkw7aiOLxvGztyhTavL84THjc+sBjD/jGK8H4ZfOfmh6wWX3/CmbJdI8WH87KJBWaiuM9mPvm102569tFYF7UP/aCkse3nCkpG5LISpj8fqZHR0e8hjAWm801YMViy5Kf5i/N63Ve1Kcj9wpEI6GfWMIvCPhHLjr5W2UmPOj6YrwNdA6HxrLaBN8UFeXuNuI1PA3UNLf5SyY5lsrBYCxYaLq3ptwADADgQi9wCmSZlAAAAAElFTkSuQmCC"
});

//Anobtn圖標
app(
{ id: 'anobtn_set', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADnklEQVQ4jU3M3U9bdQDG8XPB/+CSLSgQGcNVjpSOFjinh3Pa4TnlFMpgbLKB6/KjlIGZyHgZbxUMbAJxiIBuEHCUlXalox3LFCQ5WliJBq+Mpou70C1RuZDx4u5+PF6MoBff5Mlz8WEEhkm4a06VI9Y0V1jWkbA9k4ROGUnojJmEKiwvOyOS0CmOhB0GEi5kSeTtdNesOVUWGCaB+XA4XZ4iuo1IdvJeWP8qDWen0EjeMbqQr6MPLJn0gVVPF0SWRrh0GjGm0nBWEo2cSN67fyFz4+5AlswMhlnyeeQNeq36FVxOOoT3XzuMxuQjaEpJRFNKIq7s78bkRDQkHcaVpEPwnzuCdX8e1YJmwgyGWDK+oqMd/mQIch4sFisKZBmKzQan04m6ujqoqgpZUWCxnkRxQR5WvSziyxLV/PvARFRHu/wpkGw8ZFmGqqooP12GR6ur+P23p6h1u6GqKhTFhlIbj9hMJuJLEtV8B0AG9QReh1UVoMgK7HY7qior8Tj+GFvPd9Da0oIiux2KrRCnVQExnx7xbywvgf4gS8ajGdQTSIOlUIDbVYPJiQnMBQP484+/sLP9D75++BDT01+iva0N5fZ8rN3JQnxxH7gWZMnNKEs7/WmQFB5+/yx2d15ge2sXm5tb2Pz7Oba3drC7+wLr6z/iQrmCNa8e8a8kqt3mCNMbZMnYdyxt8x2DUMChrvYSZrxeRMLzePLrEzx7+gxLi4vwz87C0+VBWSGPtalMxBdEqk1yhOkJsuRTjaXNM2ngJBNEUYQsy6iqrERsdQW//PwTWpqbYLPZIFmsKDppRGycRfyemWo3OcJ0+lkyuJxBG6aOIps3gON4iKKIEocDC/fvYe1RFK5qAkmSwJvNUPL1WB09jniAo9qIkTDtPpZcX8qgtbdS8Fb2mzBkGWAymcDzPCrPVcDtqoYo5iMnNweGE9mQTMcR/eQo4l4T1W4YCdPqY0l7iKdVA/VQSA/s1b1w1F5HaX0/SusHDiq59DGKavrgcPXgRq8bsVEz1QYNhKnoMZKa/n763tAyGkY0tHwRRedkDD3e79HnW0ff7Do+mvkBXVNraL21gg9Gv8XloSV0dXfTkQYjYcxOUbbVD20UN07vlTRP07KrPnq2I0DPe+ZoVfc8fbd7np73zNF3OgK07OodWtI0TYsab+8V13+2UV5eLDOMICTkOofl3ItjrhwyRnKc/8X9r4OfjJHci2OuXOewLAiehH8BvoYzQRRPJj8AAAAASUVORK5CYII="
});

//GrabScroll圖標
app(
{ id: 'GrabScroll_optionsMenu', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAATlBMVEUAAAAAAAC0tLQYGBjw8PBKSkoHBwf39/fW1tbMzMxdXV1HR0cQEBDt7e3c3NxoaGgxMTEfHx/Gxsa8vLyvr6+cnJyWlpaDg4N4eHhSUlIK+8xuAAAAAXRSTlMAQObYZgAAAGNJREFUGNN1zEkOgCAQRNGuFhnEAZy9/0WFgIkQ/azqJTT9tZdzJBR7kQG6FzAovklVAF3DWsORJpjh0YTyXevYajMKM7sEWl4txYaeUicSiAeUr4C42VT4MQXPGSsB2Qn66AYLXQJg+rPQRQAAAABJRU5ErkJggg=="
});

//InspectElementModY菜單
app(
{ id: 'InspectElement-menuitem', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjFJREFUeNqUkk2IUlEUx//6dPxOtHhp0ZCjpEgRFD4opSD6EHdCq5mdweBrM21atGsztG71ZBChRWHUSssksha10ZhIhEQaUfAjSZB0VNQ+7N7XOEyOE9MfzrvnnXPv755775GMx2NMFIlErpNhmdjZrdA6sbVAIPAUe0hCAaFQyE78FYvFwtvtdhiNRjHZarVQKBRQKpUE8rsaDAZr0wAZ/YxGoxW32807HA50Oh00Gg0xqdPp4PF4oNfr+UwmQ0M3pwGMRqNZtNls91wuFyqVirjrYDDAcDhEt9sVfZJHtVp1JZPJz2Sj3E6AlEzknU4n2u02rQQMw0Aul4tGfQrq9XrgOI76/K4jkB04lmXRbDahUChmXhQFGAwGWs2pWYA/jkwGqVQ6E0AroTkyl5kFyNRqNY/JZMIENi21Wo16vU7zH6dzUhIUUqmUOEmpVIrH2GkqlQpzc3OIxWIUIOwChMPhR+l0WkgkEtBqtSCvsr2Y+tTi8Tjy+fxX8lIP9+qD1Wg0imw2y/t8PlitVjFZLBZBweVyuSmRSL44zxvZW/evjgej/oXQ7XdvtztxIr/f7yUDfSpuK0S7R/B6vS++HXgN06F5HDt4Gk9erqE/6F56cPfDm78A/9LinZPj4wtHYGbnccLsxuPnArr9zmUp9qnNzua5T7kNFEo5vN94Bv+1G/j5/derfVdAdSXAcqQf0uYFI0yHj6JVGeK/AFQXl/RnyIWuyxUMRoMfS78FGAD3+u24CjYfQAAAAABJRU5ErkJggg=="
});

//KeyChanger腳本
app(
{ id: 'toolsbar_KeyChanger_rebuild', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAADSklEQVRIia2VS2hdVRSGj87sQNDYPMRXW1Io9Mmt93DPPWfv//sxaURjikhIfRQdqMWCYK1NMzBQp5Ymk6JoBQfqQLAWixQHwYEDLbZNbXBgJ9oqSC2odaBQgnXgTkluol5pF/zsNViPvf611t5Zdo0CPAN8Ua/XO6411iKRdJvt48AntVptWduOeZ53xRgHJe2Q9FhVVfVGo3FrlmU3zNlUVdVj+zXgoqSBtoPb7ge+tP2r7Qu2LwG/AKeBd23vt/2m7TO2f7D9VJZlN7YbvADOA5/HGAdDCGuApqRngUPAZ7a/tn0SeCPG2Jhf1b9Ko9G4yfZHtr8JIaxZyqZWqy2r1+sdeZ7f3HbgOQkh9AI/AWP/y/G/pCzLu9KoHQQuA+9IenEOtne3AnipBXtaYfvpEMKdGfBxatpeYI+kUdt72wUwNne26IdsH82AmWazeft1pSXLMkl3ADMZMF1V1fKqqtYDR4AXgO22j0oaSJR8ADSB14GDkjbbfj9V259st0raCRypqmp9nuddwPTVBEAEfk7LM277kqQngbdsXwAesn3K9vEYYx/wI/A2sB34TdJO2xMpRiiKovNqgjzPu1KSIdshxtiQtBWoSVoLbAkhrJO0OcbYV5bl6hhjA4ghhN4YIzHGeyWVwFBipGdBBbYL22fTop23fc72OWAYeM/2V+nmJ2wfBrYA3wL7EjXfJ7+ztosFFBVF0RlC2AQcA6YSPgWm0tNxwPaHMcaG7cO2J1NPpoDnbG+b53dM0sYFCfI870qcDUsasb1N0sb0dDxcluVKSQMxxvtt353oa5ZluVrSIwkjkkaA4UT5QookCfgd+DNhPO3HbHI8AXyXqLmYJudx27O2r8zz+0PSfYuaHEJYAbwMvJIQgaHE8VpJO4BdtldJGgUeTaO9L2HObzxV3N3ag17b+yWNxBixPZmmYtj2pO2JhMnUkwnbT6SLHLAdElWvLkqQpsi2Z9Nsj6Wyn097cGUp8Pf/sDvpu9IiXl60B1VVLa/X6x2SHgQ22F6VfrR7gA0xxsGlEELYVJblyqSvCCGsAx4oy/KWNEWnM2AmxthXVVVPURSdkroldbfqS+GfbNN32m/7TJZevmnbJ68ngGlJo38Bqdv+Kwn4dicAAAAASUVORK5CYII="
});

//Movebutton重載
app(
{ id: 'uc-movebutton', clone :false,image:
"chrome://browser/skin/syncProgress-toolbar-XPVista7.png"
});

//FlashGot
app(
{ id: 'flashgot-media-tbb', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAxlBMVEWLAYmLAomMA4qIAIaJAIeMAYqHAIWLCImVF5OUFpKLB4mjOKHnzebiweHjxOLiwuHnzeWiN6CNBYuDAIDasdm9cbyGAISPC42OCIyNBouQC46+cryCAICNBIuDAIHcttutUaulPKPKjMiKB4eMBIqtUqvdt9uxVa+FAIOnQab////w3++zXLGEAIKxVq+oQab9+/3DgMKoQqbdttyVG5OBAH+9cryPCo2RDo+KBYiKAoiQDI6+c7yjN6HhwODjw+LiweCUFZJMoq60AAAAAWJLR0QqU77UngAAAAlwSFlzAAALEwAACxMBAJqcGAAAAKVJREFUGNNtT9cSgjAQTIJEggYRMVhCsSGi2Hvn/3/K0BxnZB9uZvfm9nYBKAEskHMEpUoKCaKEy7iqkBSKimWxx7U6pVRriKE3MQJGy2wzq4O7PYv1TW4A23E9hw2GIz7mE9exheBPAzwL5wsYLf2vsArXG1AIrhcF293+kJ8I0yM7nS/Xm8XuiSnCD53S50uj7+ytCKYqMSExibNg/9F/2pU1Bx8P8hBG+xJljgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMy0wNC0wM1QxNzoxODowNyswODowMLGXJeQAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTItMDQtMTVUMDk6NDI6MTQrMDg6MDD/C5BxAAAATXRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC03IFExNiB4ODZfNjQgMjAxNC0wMi0yOCBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ1mkX38AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADUxMo+NU4EAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzM0NDU0MTM0w8m+AAAAABN0RVh0VGh1bWI6OlNpemUANi4zNUtCQsG4NN0AAABidEVYdFRodW1iOjpVUkkAZmlsZTovLy9ob21lL2Z0cC8xNTIwL2Vhc3lpY29uLmNuL2Vhc3lpY29uLmNuL2Nkbi1pbWcuZWFzeWljb24uY24vcG5nLzEwNjM5LzEwNjM5NTgucG5nlUN/9QAAAABJRU5ErkJggg=="
});

//Greasemonkey
app(
{ id: 'gm_general_menu', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEgAACxIB0t1+/AAAACx0RVh0Q3JlYXRpb24gVGltZQBTdW4gMzAgTWFyIDIwMDggMTc6MjI6NDcgLTA1MDDUnvhKAAAAB3RJTUUH2AQGETEsCzNv6AAAAk9JREFUOE9lU09Ik3EYfo91mtFhY2NtKxexQGOMMJU5sojoYGU3g1UyNUQ0Kvpjukozgmqm1iyyr4zMpBweyvCybh7NOgjq+mYUdeu449P7vl+bW/7g4ff+eZ6Hl9/7feT3+8nn85HH4yG3201Op5PsdnsB8QhVMjpPVlDqwHYyi3t6igt5sMDDSDDM9r2EQ+WEiFcRL+bpcTgcJfgnhKCpoiBEwy7ChWpKHy4nk3ObcDcYsGhBhInGLWgNEaJ7CM1BwvlqC40BNavL8/X0hKmhp45SvYzXXbuR+9wHLN/HwosmnUJuyaUufeEJX3Rq0F2/+c9YR1DJKl4ZBDKPgG9PYM5e1BuZJNeHuN+vPOGLTg2G24KYGTgCo2UHkxJKNiZPwxiPAWuvYLxp4fgMGz3m/gPlCV90lkFHDSYu1WC2LwysjgDmU0Q6IyirLQN+TK/HpqGTCe9tvB6iU4NYeKspBvPJo9bo2eegnQRyE/Dr43q8Nq5TzCePqYHo1IDXEr26fxNyi7cKBsbDs4wu4PccjOQ5GCPtbPBSDXKLAxC+6NSAH8Uma8PyPQx2H8eX9zeA7xM8/jvg5wxjmvNJfP1wE0PXTuhG5CHliy0Y5DeQTfei+WAlooFt6K8KYHRfAHf4jgU8aOV69tN15ZUYSMCFdOpKiN3v6rqQGdXHhPmMMWZtQB6YpxSe8P83kB/GlBUtTZ2y1rk6bInk5m9jaYpXy33hCb9g4HK5FFy0tYXo9uVaWuFYxyyG1KXPsS2vKTEoKnoZVYxIEST3buQS/QUCx7vn2Dh8TQAAAABJRU5ErkJggg=="
});

//頁面右鍵 添加到字典
app(
{ id: 'spell-add-to-dictionary', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC30lEQVQ4jYXR3U+TZxiA8f4PZI5kpxxsp8SMzM40ISOr1nSFtgZi3CrrViOhJpBauhBonM4PcCqslOEHocGPF4Kzaiz9QCBoqfQddJTaVCW1zjYNrBgb4T0Y49pBI4Usi09y5U6e5PndB48MwOfzYbVaEX/Vv7fEnXa2HhmA1WplOBDAPTmJd3qaqbk5fo/HiSeTvMxm+ev1a95KEuvr6wz5/f8FdDodev37t79ryO9nXBSLQE1NDXa7nSVPM+k75v9tydPMjFPHPxsbCD5fEdBoNLS1tfHK3cjTm0bi174l6jIwP1DoyeAhnt4w8srdSMihZWV1lQG3uwio1WpaW1tJ3TrCgsvAy4keWFncLJ8I8Ef/17wYOUKwu5rF5WX6BKEIqFQqbDYbz4TvSY518/dSgqCzlmBPLVOO/eRiXlaeeEnc+I6pCxr6BIH4wkIRUCqVWCwWoi4DUibG1C965oVjSJkYUibGRJcOKRMj6jIwce4r1kIhxF27eDM+XgCqqqpoampi7upB8qkIExdryKci+Do15FMRHpyvJp+KMHf1ILeOq/E4HGC381ChKACVlZWYzWbCl+rIPQ8TOKcm9zyM58y+bTPYV0lHowpJkjhaV0fa6y0ACoWChoYGHvfuJxsP4j2rYrq/gWw8SOT2abLxILO3zYz2foSUsfGNycTdrd8ol8sxmUw87tUTFtr5c36S+6eUeE4r8XfsJXDxM+45PkTK2LjcXsJi4gGXR0aKQEVFBUajkRmnlkDHHkLXW0nOjpGcHSP8W+PmY9eJHVz7YScrq6v0DQ8XgfLycurr6wk5qhnvVBI48yWjp6q4d1LO3e4dSBkb/cdL8P68G8HyBYvLy3QPDhaAdDpNWVkZBoOBGaeWR13qzYbtH8PbBAM/fsBop5wZp5ZLhz+n88oV+oeGWFtbQyaKIi0tLZSWlnL+wKfbkslkWLQl/FT7yeZdV/MBRFEkGo2Sy+X4F6/t89VS8NqbAAAAAElFTkSuQmCC"
});

//頁面右鍵 還原「新增到字典」
app(
{ id: 'spell-undo-add-to-dictionary', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAABDklEQVQ4jZ3SPShFcRjH8Q8JN2IgI4pJorxkMJDNYlE27AZWG4vBJoOymewMshtsdzHIQilKUl7SDde9hnNuTqdzLuc+9UzP8/2e/uf3kFyNWMVwyrxqNWEddxjPCuewiQJeMJYFbsU2PlDGM0b/C7dhF58hXA5FR9jDBhbQh/o43IV9FCNwUhdxgx30RwWHKP0BxzuPiYpgCbcZBWWco7cimcV1bKGEJzziPUHwja3oU2ZwFVl4xTwGMYUVHMdkl/EfOokLvzGOxOY5LOI+3CnEBQTHk8eb9ENaw1fYiTWEU+mn3C2I9CFNAD3oTJm1CFI4qSaoVu04w3KtggEcoKMWuA5zmK71682CeBvgB+93YAIjVuYDAAAAAElFTkSuQmCC"
});

//頁面右鍵 複製
app(
{ id: 'context-copy', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhUlEQVQ4jbWQyw2DMBBEHxFNTA10kR6oB9JjelilCrjwsS17DbGYiw8jP80+aEwHIGnJdLOZfS5RUoCkRdJX0lT7+3K6NzDWIL3T/bZ3AIqnHA7MrEvLK268BQCE4A04SmKHeA5KidxUF2QSubkFyJxzLigIa4sH3bt/JEZpBlQlPuImzAon1SmKukhOFgAAAABJRU5ErkJggg=="
});

//鏈接右鍵 用新分頁開啟鏈結
app(
{ id: 'context-openlinkintab', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVQ4jWNgGCyAjYGBYRIDA8NrBgaG/0Tg11D1bDADJjEwMOxmYGAQJ9JCcaj6VpjAaxI0IxvyGsb5j0chXjkmEm3FABQbwIJDHN3ZyHxGYjQQLTfwYUCMAVj9TDUXwEzHF1C0BQCpARnHXF2p+wAAAABJRU5ErkJggg=="
});

//鏈接右鍵 複製鏈接地址
app(
{ id: 'context-copylink', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"
});

//書簽右鍵 新建書籤
app(
{ id: 'placesContext_new:bookmark', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzklEQVQ4jZ2SMQ6CQBREX2LlYaChsbZRQy8VhYUmRis01hxEr2BotNLKcAljgQ2Fl8BmNm4UNuBLfvjMziw/u4CbSvUXO+AKXNR3pgKGqs5TrIHces+BVdtwqi+GlhZKS+sCGZ/DugEHIKnxJcBeHuPPULNoO57FXFl8NdMO4UgZ3wiehKhD2PteMJuMHeFJU9hwAmLHBjFwdo33BALHeiBPI/Yf1wc2wFZ9neeHh54zoACOqkKa7anlBZTAHRhY+kBaKU8jS9y3MJKnZ4Q3yE01m3i3zAUAAAAASUVORK5CYII="
});

//書簽右鍵 导出到HTML
app(
{ id: 'placesContext_ExportHTMLFolder', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQUlEQVQ4jWNgoBL4TwATZQA5cvQ3QJ4SW+wYGBh+QWmyDEA2xJ+QAYRi5T+6S6juAnyaHbBJ0jQW6JeQKMoLAwcAMTkwT1+aiGsAAAAASUVORK5CYII="
});

//書簽右鍵 複製書簽標題和網址
app(
{ id: 'copyBookmark_copyBoth', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVQ4jWNgoAaQlJT8j44lJCTqSTIAnS8hIXGFaEOwGSAuLi5GtCHYDEDGJBuAyyCcYYPPAHQ+Vm+RYgDWsCHFAKxhQ6wBOOWwBRahGKAodoaYAeSED0kAAOILU0uDB0+zAAAAAElFTkSuQmCC"
});

//書簽右鍵 刪除
app(
{ id: 'placesContext_delete', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaUlEQVQ4jc2SMQ6AMAwD72E8ow/h7x06mqkIRYakYgBLWVr5UieFP0mLZQErzfyhoAuaudwEvQJognGFTLNgTwERYsw5IECiuQyYnYeZSRrhfLabySPAZTaQdI0x8wkpRSjoFvDqK3+jA/GGavGQYz2lAAAAAElFTkSuQmCC"
});

//書簽右鍵 菜單属性
app(
{ id: 'placesContext_show:info', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABK0lEQVQ4jc2STytEYRTG70e4i7d73/N7NvMxlCJhKWJBU74HNljMNCsiG9mq2VnYzEaSomRhRyGEmCxl9jbv5fZyixVnd855zvOcf0nyL817XwPqwJyZzQN1733tJ4WDkg4kPQJtSU1JTaANPEvaz/O879viALwDpqsEQlf3wGJcvAIcAi4AHdCS9AR0A3k5dwosFazjwEUBCLEW0HHOmXPOgA6wXso74NZ7P5RIupQ0HLXadc5Z4QeS1zLGzCYlnSSSrs1sICJ4KRNkWZYDvQgzBpwlZjYFnJdHCDvZBVyapimwA2xFI9wAo0VgA9iLFrUGvAE9SZtR7lhSI77EqqQrYOLL/T6VZ8Kpl6sAI8CRpAdgW1IjfiSgv0rgw7z3NTObNbOFX73yn9g7LsdV8hjN95UAAAAASUVORK5CYII="
});

//書簽右鍵 在此书签后面添加新书签
app(
{ id: 'addnewbookmarkMenuItem', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVQ4jWNgGJbgP5GY9sCOgYHhF5Sm2BB/YhQT8jNZLiHJBbg0O5CjmSIweNLBEAEAYrkiHx2ihxkAAAAASUVORK5CYII="
});

//書簽右鍵 更新当前书签
app(
{ id: 'updatebookmarkMenuItem', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAt0lEQVQ4jc3SrQpCQRQE4A+LyWKxG3wBjWaDWI0+glmwWEw2qzbfw+hbGIUbfAVBwx5BuHfxD8SBZeEwO3OYHf4VbWxxwgVHrNF65fEABRYhVEMHq5j3YjaPu+RcoJ8RH8VWYxyqCLtQrsIM+zhHTHMOzYxA/cH54sU8csiZfIeGFOAG3U8EJiFwD2mZ4a2DW8JeSvYsfWOjgjOWvrGUQU1avY5hiCylAlUV6SnaUicKXL1Z5d/iBp0JJPp/6PADAAAAAElFTkSuQmCC"
});

//書簽右鍵 新增資料夾...
app(
{ id: 'placesContext_new:folder', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXUlEQVQ4jWNgGAzAk4GB4TkDA8N/EvFzqF6G5wwMDFZIBh5FU3gUh8VWUL0M/9EksNmGC/wfxgYcZYAE0lEs8gQNmIXGn0mqAaQA6hiAnpCIBfCERG5SfgLVO8AAAB6JToLY42+mAAAAAElFTkSuQmCC"
});

//標簽右鍵 重新載入分頁
app(
{ id: 'context_reloadTab', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVQ4jcWSyw2AIBAF5+rNDuyE2AG9WIK1UQpVeMHLEggKLCHRSQgH9u3vAR+wzYovwMwkMZLEjogs4IAgx8ut6uQUgQVWuQNwaCt7EULawa5t3fGcdciFkFWv0UzYS7BITJW3EXKiO82AfIk5K8mdJqWN0UovbyrKj9Qb7UdupJYfIj9YalkAAAAASUVORK5CYII="
});

//標簽右鍵 關閉分頁
app(
{ id: 'context_closeTab', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAS0lEQVQ4jWNgGJZAnkw5uIJfDAwMdljk7KByBA2BKbTDIuZASDM2Q0jWjG4IWZrRDcAWJkRpdmDAHiZEacYWiAQNoUo0UpSQhiAAAHnZFnHHYzvpAAAAAElFTkSuQmCC"
});

//標簽右鍵 關閉其它分頁
app(
{ id: 'context_closeOtherTabs', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAT0lEQVQ4jWNgGOzgPxQPBQP+MzDY/Wdg+PWfgcEOlwE41DAw/Gdg8McqgcUFSIb4Iwv8x4ZhBuCSh1tIkQuQJBxICAMHLMGIFQyldDB0AQCo5VQteVskeAAAAABJRU5ErkJggg=="
});


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
