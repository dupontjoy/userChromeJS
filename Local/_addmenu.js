
//2015.06.19 18:00 快捷回覆加入顏文字，換黑白圖標
//2015.06.10 16:00 調整選中文字搜索，加入OCR文字識別
//2015.06.01 17:00 精簡搜索
//2015.05.05 17:00 調整一些菜單順序和添加圖標
//2015.04.29 21:00 貼上 二级菜單
//2015.03.31 21:00 升級FX36，調整加圖標方式
//2015.01.21 22:00 修正特殊符號，添加小書籤菜單
//2015.01.08 20:40 一些搜索項只在特定網站顯示
//2015.01.04 09:35 複製 二级菜單
//2014.12.22 18:50 選中文字搜索換回
//2014.12.20 19:40 圖片另存放到二級菜單
//2014.12.11 17:50 常用文字搜索橫排菜單
//2014.12.09 22:45 將菜單換成正體中文
//2014.12.07 12:40 四個複製圖片放到二级菜單，添加分割线
//2014.12.04 08:23 備份換用Keychanger
//2014.11.30 11:00 將圖標統一放到『圖標美化』css中
//2014.11.13 21:50 新增『保存所有圖片到zip』和『横排菜單』，调整菜單顺序，调整幾個conditions
//2014.11.06 21:55 調整Send to Gmail幾個菜單順序
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
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAABDklEQVQ4jZ3SPShFcRjH8Q8JN2IgI4pJorxkMJDNYlE27AZWG4vBJoOymewMshtsdzHIQilKUl7SDde9hnNuTqdzLuc+9UzP8/2e/uf3kFyNWMVwyrxqNWEddxjPCuewiQJeMJYFbsU2PlDGM0b/C7dhF58hXA5FR9jDBhbQh/o43IV9FCNwUhdxgx30RwWHKP0BxzuPiYpgCbcZBWWco7cimcV1bKGEJzziPUHwja3oU2ZwFVl4xTwGMYUVHMdkl/EfOokLvzGOxOY5LOI+3CnEBQTHk8eb9ENaw1fYiTWEU+mn3C2I9CFNAD3oTJm1CFI4qSaoVu04w3KtggEcoKMWuA5zmK71682CeBvgB+93YAIjVuYDAAAAAElFTkSuQmCC",
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
//保存所有圖片到zip
{
label: "保存所有圖片到zip",
accesskey: "Z",
insertAfter: "context-saveimage",
condition: 'image',
oncommand: function() {
// 保存ディレクトリのパスがない場合は毎回ダイアログで決める
//var path = "C:\\Users\\azu\\Downloads"; // エスケープしたディレクトリのパス
var path = "";
if (!path) {
// ファイル保存ダイアログ
var nsIFilePicker = Ci.nsIFilePicker;
var FP = Cc['@mozilla.org/filepicker;1'].createInstance(nsIFilePicker);
FP.init(window, 'Choose save folder.', nsIFilePicker.modeGetFolder);
// ダイアログ表示
if (FP.show() == nsIFilePicker.returnOK) {
path = FP.file.path;
} else {
return false;
}
}
// ダウンロードしたページを表示するために URI オブジェクト生成
var hostURL = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService).newURI(location.href, null, null);
// ページに貼り付けられた画像を保存する
var links = content.document.images;
var pack = [];
for (var i = 0, length = links.length; i < length; i++) {
// JPEG と PNG を保存する
if (links[i].src.match(/\.jpe?g|\.png|img\.blogs\.yahoo(.*)folder[^thumb]/i)) {
pack.push([links[i].src.split("/").pop(), links[i].src]);
}
}
zipDeKure(pack, path);

function zipDeKure(urls, savePath) {
const ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
const zipWriter = Components.Constructor("@mozilla.org/zipwriter;1", "nsIZipWriter");
var uri = content.window.location.href;
var fileName = uri.substring(uri.lastIndexOf('://') + 3, uri.length);
fileName = fileName.split(".").join("_");
fileName = fileName.split("/").join("_");
fileName = fileName.split("?").join("_");
var path = savePath + "\\" + fileName + ".zip";
var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
file.initWithPath(path);
var zipW = new zipWriter();
var ioFlag = 0x04 | 0x08 | 0x20;
zipW.open(file, ioFlag);
for (var i = 0, len = urls.length; i < len; i++) {
var [name, url] = urls[i];
var ch = ioService.newChannel(url, "UTF-8", null);
var stream = ch.open();
zipW.addEntryStream(name, Date.now() * 1000, Ci.nsIZipWriter.COMPRESS_DEFAULT, stream, false);
}
zipW.close();
}
},
}, 
{
command: 'context-sendimagetogmail'
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
{command: 'context-viewimageinfo',},
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
elem.hidden = !/tvc-mall.com|ic.sjlpj.cn/.test(content.location.host)//可排除多個網站
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
label: "TVC-Mall",
id: "TVC",
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
image: " ",
insertBefore: "QuickReply-sep",
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

//当前頁面
new function () {
var items = [
{
label:"複製此頁標題+地址",
text:"%TITLES%\n%URL%",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII="
},
{
label:"複製此頁Favicon地址",
text:"%FAVICON%",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"
},
{
label:"複製此頁Favicon Base64碼",
text:"%FAVICON_BASE64%",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVQ4jWNgGAzgPwUYbgC5FmMYcBTJdA8smo4yMDAo4zIgD4oZoIrQXZYHFcNpALLp6EAZKo/XBf+RbEH3AkwjUQbg8xpBA5ABsq3o0aeMzYCZaM7GFr14XQBTgGwLyQaQAlAMoCgpDywAAF13Uxwj2+klAAAAAElFTkSuQmCC"
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

var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgoCL4TyQWwGcAIQtgNFZDiDUAp1piDEDGBA3A6VdCBhAKRIIGEAOGqAuINoBiFwysAaRg6gAAE7tI6EZZDKkAAAAASUVORK5CYII=", onpopupshowing: syncHidden });
menu(items);
};

/*——————————書籤右鍵——————————*/
/*爲書籤右鍵添加 移動 功能*/
page({
label: '移动...',
accesskey: "M",
insertAfter: "placesContext_newSeparator",
command: "placesCmd_moveBookmarks",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgUlEQVQ4jcXST0vCcBzH8T2EorL806hd8tAziOgQgSBIghCE0PPoUgRJVKKryENBwQopkgRByRhJRkFlUVhhTuaPtaA8qAiKRX46CA6ZxS7RF96MDb4vfvwYRf31dKw+ks61J7RKE9DOPtA6NkmYg3cMnn010q08aAMoiqLaF67pbs9dYYCvwByrwhyrosd7rwBOXuad/Ct+amj3GTSXBRMtgYkUwURLMLhvFGDyWMb2B1o2FZdh2kjBePgG45aAPncCxm0BpsUrBZg4esFmGarxxiUY1pPQ7dWfTl7CeIig13VOaNeFAjjCEnzF5mX2lEDP3qKNE6Bnb+GJEfiKgCMswTB7TPfPxUkDsIcI2JyynC9/YNhzgS42gR73JbwnYh3NAfYQUd++LZjFktx8ArlQwcjyGVg+0/i2JAO2YFYNWAMi5kXgE83lK59N7/MiYA2IasCyn8FMqoZSDb82k6rBsp9RA2N+AdPJqqbG/IIaGOXSkdGdNDTFpSOt/tb/m2/dZssonB/5IgAAAABJRU5ErkJggg==",
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
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABjElEQVQ4jaXSP4vCMBgGcD+Lmzi5dDlwKQ7iIAjFxcVZEQe3foNCB6G4uri4iOLhVhAEqYPoEREXQSEcpRakIkHi8NxQmprz5ODuhWdJyC9v/iTwh0o8FgBsXYYBoaj3NiLFDhFRDIKWNRKREAAYEIqty1DsEGxdJrKkNyzpDYpBMHPWoKcrTNtDudmOkQjwgxh463yKOPsAaX0K6/0DF8Zh2p6MAEBvfsSFcSgGwZLeJGC84xLgBwwXxlGq6r8DikHQXcXAeMcx3vFnINIVg8DZBxJgLTiSjaEA+uT+GkjrU4x3XCxWDALT9gTQJ3cB5LXaayDaWTEI6hP2BNDTVQbqvQ38gAmguwrbrk+YAEzbQ3cVztHTFWqhEgMtayQBycYQvflRIN+Bg3v+GUg2hmJxdGHRmGl7sBYc1iIEsjlNBi4s3Dl6qui80XEeAT9gMlButuHsA/FR6Okq5eCeRfyAYeaskcqocgflZlukVNVRqurIazXktRrUQgVqoYJsTkM2pyGVUeV/8J/6AnpxKp2jT3arAAAAAElFTkSuQmCC"
});

//書簽右鍵 导出到HTML
app(
{ id: 'placesContext_ExportHTMLFolder', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVQ4jdWTS0jTAQDG/9SpUw/NpEJ6EBWdJKSXZSBFHioqQqzoscgsSQ3GhmkyNUl76CxzmjSdS1OnOHA+sCIb5aMxFQ9imuk2mzZt5t7W1q9DUB061LEPvst3+B0+vk8Q/n/JNDb+5PTaKaSPraRUmEksMyNSmIiTj3L09lticobYIxskQjqAINPYaO13/mYHTb1zaA2fqe+ZpabTjlr/CWXHNKVPbRS1TlGgs5KnnWB9kvEXoLZzlupXs1Tq7ShfzFDybJr7bR/J102Rq7WSWW8h7YkZsXqcJOV7ZHVmVop6fgCa+xzYXX7KX8zwyfkVly+AyxvA6fXTM+IiXzfJsNVLdoOFwQkPIsUIEvUYoXGvEFKfWNEaPuP2BShpt+HyBbjTNInbF0BWZ+GDfR6d0U5KdRQXysOZ83iILRjiinKUkEMdCEkVZmq67PgD33B6A/i+fCOz3oLL60esHscyM8+04wuXKneQ2XSC2JJNHMzrI750mOXRzxFEChOqlzM4vX5uNHzA4fEjfWwiuWo3V9TbSaiMQPQonPTG49QZChFrDrOvIJRTRf0ERbYiHMsfofSpDYfHT2q1iTm3n8RHoySqt6HtLabBWESdoZAagxz5MzGqrlskVO0n4uYigndqEKJvDCJvnvzZ7sWH7zj7YITz5eE0GIvIb08mry2RnJZ4ZE3nyGq+SIk+m1MVkWzIWIAQIR3gZuMEmRoLaTUmJOoxrqrec7JsM7Vv5FR130XVeQvl61xyWi6j0GcRX3WADRnLCN57D2F9kpFVF3pYebab0LhOVhzTE3KogyOKdcQUria6IIRdt5dwunwnxS9liNT7CZMsJSiqmGVbdfz15LdkCe4zqmjCrgkTwRJh4z9/Zs11wR2WtpDFYmHt7/l3n1IKtqUJ1EcAAAAASUVORK5CYII="
});

//書簽右鍵 複製書簽標題和網址
app(
{ id: 'copyBookmark_copyBoth', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACL0lEQVQ4jY3O/0sTcRzH8ftzFgj+4g/+IOEgpSyYVJ6F+0Ehkn7wh+oHi8WWhFA/KCQINYiBUAlJxTCnTu0UEcJMp27SpHkl+WVz230+593n7j53vPohZnie4QveP76fPATBNTEiPWsJS1QMS5bHzVwPSy3un2O7FpqhRZWjeMhRVDkOKEeBcuwTC7ldDcEnc7gammo9NQAAZY1jboNiOk0wkVIw+q2MREpBnnKIEQltjz8j8GD8ljc5IuFmzyxu9Mzi7uASXo7/RGJFwdQawVbegBiRIEYktD5K4vK90e4zkV+MyZheJ5ALJh6+WkXv6zTCsRQudcVlobl7wjgL+fnHTSRWFMSXyvjwtYR9YqGhc8QWrtwfY4pmY2FThZShSK6TU8lP36aRWFHwaVlBnlio7xhmwsWuOCO6jcWchvnsv4gXuTU0ieQ6weQqQYFYqAsOMeFC5wijzMayrOPLj+MRN7nxzntIGYrpDMEBtVArxphQ3zHMVGZjbZthacs7UiE33H6H+ayKuQ2KospRE4gyoS44xA6Zg8yOidQv70iF7G9/g8WchoVNFSWVo7pp0BBqxRjTDAfZPQvp396RCvl82xCIxqFoHAfURFXjQEmoCUSZZjrIFSx83/WOHJGbowAAn79PP+fvK/n8/b1CddOgoZsO5CJHrmAhu2chs2NibZthWdZPkt2rahwoqTqHZjrQDAeHzIbKbFDdBtH5SbJ7Pn9/719On/6/OyK79gc8Kc0L/8SbiQAAAABJRU5ErkJggg=="
});

//書簽右鍵 刪除
app(
{ id: 'placesContext_delete', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACO0lEQVQ4jX2TS2saURiGD8X+jll4ImNM1HE8EyEbGQ0akpmQy8pFCCQQRYUQMP6E0ELvoSHUTQpCtUpLG2guDW0XLbQk0pqWamgtpC0hYca0/oG3Cx3RaP22h+fhfOd9DyGN8RJiejE4eDfL8yL5z6QoFfI22zVCyJW2Ay8hpl2HI/t1YgJvPB69myRFqbAtitqBz4eczfawKWnCk5M4iURwFg7jtcejp1skBnysqjgKBlEYGcEjq7Uu2R4YuF0cG0N5bg7fw2GcLi1Bj0axPzSkp3leTFEq7LjdWmV6GgW/HweyjKNgEB98PqR5/gbZpFR4xZj2Y3YWlYagmkjgIhbDniTpu4xpP0MhfFEUHPp8OJBllBUFz1yu2rrZPEwIIWSTUmGfMe33wkJdsLKCv8kkqtEozubnUQmF8Hl8HAW/vxNu3fMlY9p5OIxqIoE/ySSqy8s4XVxEpXGDY1XtDrdK9hjTqvF4h6AyM9MbNgS7PQRPnE79vtncvScpSoUdxrSzHiuUVRU5h6NTYsC/Lj3iRSzW8YglRUHWbtfvGJIUpcK2261VLscYj2NLkmpPRVE/aYnxUJZRUhRkDEnOar15ODraXqRYDFuSVFs3m4dvcZwr73Tq36ammkUqBgJ4J8vYsFjWiJcQ0+P+/swnVa1XORJpwsaK1znOlbXb9ZKqohgI4L3fjwd9fXmRkKvN/5CxWjMfFQXPGesa1SrHCRm7XXsry+2wMV5CTGmev9cr51WOEzYslrVW+B8ZJIysfs47nAAAAABJRU5ErkJggg=="
});

//書簽右鍵 菜單属性
app(
{ id: 'placesContext_show:info', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlBJREFUeNpi/P//PwMy8KvcJwikEoHYGIgNgZgJiC9A8ZxN7U5vkNUzIhvgU7angYOdpVhXXYxVXISbWVSYm4kRqOb1u29/X7/99vfijZe/v//4PWFLl0sthgFexTt7FGQEspxsVDhefv7L+OHbX4ZP3/8ygGT5OJkZ+IFYio/l/6GT937cvv92xrZe9yK4Ae7522qV5YUqTU2VOS88+sbw+y/E0GvPn4JpLUlpMM0CdI++HBfDxQv3v9+8+6Z350SvWkanrI1SHOysN7089LkvPv3BiBwks5OUwHTqvHso4aQvw/l/955LX798/anO9Pf3n2RdDQm2C4+/Mf789Zfh128EhgFkMRA+//Aro4ayGBtIL8uf33/c/7Jxsnz58ocBHVg1HwLT8oJiKOK/QAQfF0ivL8ufX3803v5gYPr16y+GAfsqrMF09OQbGHIvvzAzAfUqAU35/fv1+x///zMyMjLgAD9/YbruF1AMqJcB5Iy7379+E2Nk48BjAKbr/v/69Q+o9wnICzv/vP9g+l9QlA2XAdi8x/jx4x+g3j1MQFPmvn/y7NfPn7//o4c2KEpBGF0c5Px3jx7/AuqdA05Iqo4Tm9mFhUvY5RQ5GIgAPx4//PHrzetJt/fnl8OTsqJtbx+rkEgmu6wCOyMTE/bw+PeP4cfTRz9+v3k1/f7h4iKMzCRn2dXMxMpawCImycbCL8TCxM7OBAmwn//+fHz/5/erF7///fo56dHxsiqsuREEZMzaZYBUChAHALESVPghEG8GZecnpypR0jVAgAEAzPVNyh34CewAAAAASUVORK5CYII="
});

//書簽右鍵 在此书签后面添加新书签
app(
{ id: 'addnewbookmarkMenuItem', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoElEQVQ4jX3MX0hTYRzG8Z8UZYJFRl40CoICISEXoQVb5Z+mG26gEERg4szNbbp0zQnD5R92MUG8EIKGiUxS0C6kyNQrLQgJJpGaiEY15xgYNtp21O2c9zzd2AiP9cCX9+b3foj2LUjUuUH04k9Bos79Nwfu8eiotmNszLAgk83D7Qba2wG3Gwsy2XzH2Jhhrwv/BNpGRowcYwhVVAAuF0S7HXC5ENDpEIhG8W5xEW0jI8aW4eGLBwKtPp8xnkxiXaeD6HRCaG6G6HRiTaPBUiiEN3NzAIBWn8/YMjgoRR4NDNRzPI/vWi2YwwG+sRHM4cCqWo3lcBjPJyZSXa2qapYATV6vaZvn8bW8HILNhoTJBMFmw6pajS+bm1gOh7EUCiEQjaLJ6zVJAEtfn2lXELCm0YC3WrFdVwfeasWKWo1gJJJCAtEoLH19UqC2t9ecYAwrajWSZjPiNTVIms1YLivDZiyWQoKxGGp7e80SoNrjsSQZw+fSUiQMBkSrqpAwGLCgUmErHk8hYY5DtcdjkQD3uroaeFHEJ5UKgtGIXb0egtGIjyUliHActuJx3J+zIm+6COcGrr2XAJVOZyMTRcwXFwP19anXX1SEXzs7iHAcLr8uxIOfLUgfPLsuAbR2u5WJImaVSswqFFjp7saMQoEZhQI1b63IG7+FvPGbuPPDgPSnsnV6luWn/pPeFHC7oeEhALwqKEBwagpJQUBgchIv8/MhH72BwnClJHpywp8Cruv1TQAgiiKYKEJgDElBQILnUTvdCPmQEvIhJXLXlTjiOR2knuN+6sn0EhFlEFH2eZXKjr/G9iBeFJFkDAnGcKVfgTPfLuGQKytIRNl7fymLiHIzcnIMmXJ56/86fPfUhzT9sY208qNTRJRLRFm/AYwr7+SwM3+WAAAAAElFTkSuQmCC"
});

//書簽右鍵 更新当前书签
app(
{ id: 'updatebookmarkMenuItem', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACrklEQVQ4jXXQT0jTcRjH8ecsdNBDIF4KCgwkEgIRpojZL3/DSXUJIokWbm7OpTYVR9YKD0bgwS4JWQglaYWRaSJBfyy8JJGWf1Naa0mCSHNzut+fdwdrWKsHPnzh4ft5HR6RvyYkcvmryP3fCYlc/vvPP+dib68t0NfnmMjKGqe1FS5dgtZWJrKyxgN9fY5f2fNf4EJPjzNmGISPHYOWFkyfD1paCJaXE4xEeDU5yYWeHmfD3bt7/wk0dXc7o4kEX8rLMf1+9Lo6TL+feauVD+EwQ2NjADR1dzsbbt9ORc53dVXFNI3PNhtGYyNaTQ1GYyNzqsrU0hJ3BgeTOVhRUZcC1HZ2utY1jcWyMvT6ejZdLvT6euZUlU/Ly0wtLfEhHCYYiVDb2elKAao7Olwbus681Yrm9bJeWYnm9TKjqoRWV5NIMBKhuqMjFTjb3u7eNAxmVJWE2030zBkSbjdTpaUsr60lkdDaGm2VldcWRPpHRYqSwOm2tuqEYfDxyBE2HQ4iFRVsOhxMKAor0WgSeb+wgNdmGyAQ4JHIyyRw8soVj2aavFcUdKeTDbsd3enkXUkJq7EYK9Eoi4vD3OvvJx6PU5KZ2d4loiSB435/jWGajB86BFVVyfdtcTE/4nGCwRFeDpQS/9bMgcLCwfT09P1/3MDm83kN0+RFQQEvLBZmrl7lucXCc4uFr1+eMTqgEv/WzINbRZyqKbuecsTDHs85gMd5eYSGh0noOsGnTxk4uo/XT6xb5ZtFzM6McNjjOZcC5NvttQCmaWKYJrphsPJ9mjeDW+WHXUVMfxwipmnk2+2127tpIrJzt6L42DaGaTI2FIDoLP23ilmYHWFD19kwDHYrik9Edv7qSoaI5KRlZzt25OY2bY+IcEJNm8ix7LqxfZ+Wne0QkRwRyfgJ/WP7KVCw7+QAAAAASUVORK5CYII="
});

//書簽右鍵 新增資料夾...
app(
{ id: 'placesContext_new:folder', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHElEQVQ4ja3TP2sCMRzGcd9N9pa+gzj1H51dOlinW7raEioIAYdyUCRIKWlvcOiBoAbFwVJcvEFBTsFBcOlwL6BNz+3pUHr1mnSwNvAhQ8g3vyWZzH8u6nD8tNFFJhXCSCeYVKAOx+HZFQ4KJewXSvY4dTjCSONp9mJosSoe9k5wv3sMuXOEFqsijPR3wDb2ul6uiFgNET8+I1ZD9HLF9BRfr/+mkc1jJbt4v/axkl00svnkLBVoj5dWglDosofX8xvosgdBKNrjpRnwg4WVLeAHCzPgDeZWtoA3mJuBWn9qJQiFrtTxdnELXalDEIpaf2oG3M7EShCK+E6ldrczMQO8ObJyTy8/L63tvDkyA8wPNmIE/iIJbGPrH/wB1oFX2e+MUlUAAAAASUVORK5CYII="
});

//標簽右鍵 重新載入分頁
app(
{ id: 'context_reloadTab', clone :false,image:
"chrome://browser/skin/syncProgress-toolbar-XPVista7.png"
});

//標簽右鍵 關閉分頁
app(
{ id: 'context_closeTab', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACTElEQVQ4jcWSS08TARSFJzEaWBmdtspMO0NoBxYokUQTY/wBJq75ES7dQlESKVAsEfogljckhqQYYitNecijQ6FARAatM4FiH2kFw7TyKgJaOS5EzCSNbkw8u7P4vtzcewniX0fVvFxC2sU+0i7GVQ4JpENKknZp4ILt7dW/wqRVvKe2iV/0L9IonfqKslmg1P8NBvdnqGzvj9Q2sYqocJ3JCatb3lXR3VFcbl8D3ROHYWgbpdNZ6F9ugeqJgeqOQdsbg9oasuUcW9O8nC2whRBcP4A3sgf9UxGFg5vgnBKGoxl4I3ugOj+Abg9DbRFuKwQFTUIH258E5VzBeDyD9OExxuMZXO+UwCf2TzvlXAE7sIGCpqVnCgFtWQwzbhlMfwIlVgH+E8mn/e9IHx7DH8+gxCqA6U+A9aRAWxaTSoF5Pkt5ZFAeGXRfBDdbhVN4PZPFDccS6L4IKI8Myr0JbcPCkULA1Ae3Nc8/gupaRZllDoH4LtKHx5APfkr46C6uPA6C6g7jkisJXd2scgK2NjCk6VoBYw6Cj+6cQDu49eR3H1/bAtM4B02HBPbRtHIHhTWTd7SWBTDmWXhFGT4phXLTFDStyyg3TcEnpeCTUmDNM9A1zqOoZlJ5BYIgiKKaiVateQZsHQ/WxIN0CMjvXQXpEMCaeLAmP3QNM9A/nHDmfCTtfVc+V/1qUFsfwHn7G+S1hXC2U0ReWwgXW17DUD2W5R6M1RIVrnM5Bb/CVQ7f5Yyjbq5qZLPYOIpi48gGZxwZ4CpHr/0R/G/5ARhDiVfbkE/lAAAAAElFTkSuQmCC"
});

//標簽右鍵 關閉其它分頁
app(
{ id: 'context_closeOtherTabs', clone :false,image:
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaUlEQVQ4ja1S0UtTcRS+IAwiQkzv3XXLu029y/6TXvY4rg9SVIjPokYwq5UPjZlb08EedoXNmq2JUZaIGQomg8aMO6fyK7erm2i1jdBWNqv59XAlbVs9dV4O/L7f951zvnMo6n9GjS1a/c8P5lAVZQ5VVcROu1bO0+6VfJ17ldQ6JG0pftK+wta5Vwk9tCpXD8UMZZXpweU8/3wHhrGPYAbj8nER2h5haVecGMY+wDCeAeNaTlHWkOpIwRpSMc6lNV1wG2fnCtAFt6G+F5NrHZKWtkdYxhkjuuDWIbYFxhkjZaPUOiQtOyDJ3Ogmmma+gAtsgh2Q5HqHRLhA+vAtjXqHRGh7hK3og8YW5TT9Ubnh/gZ0UzvgnmbBPclCN7WDhpF1aPqjfycfiSxwWlskpRl/D81EFtrgJvR9r9B0aXTPKAzv861imBe8FqPZU2a0Yph1juXuhIk6mAYbWIf+6hRMvgQ6UkXY80BHqgiTLwFeEANlInrrHKvvWyCsJ46aR2mcuTkLkz8J91fgytufaGnzoT1RxOMCYPInwQteyx9kw+15onZLOBWQoXZLaL74YK8zc4DuHAAAd/NKvrULdGUBvlUMK2xzqKrROksY1yJO+N+BcS2i0TpLjMLw/vx3oKXNh4mCQn62D5y7MIJcEeAFsfBboPnGzFqdMwLa8Rr89ZdE3zPJ8q1iuDNzgMtLPwAAb5SE9mSxpAOKonS90wa+90XK2DtN9D2TLEVRFC94LSZ/ErbPQHdO6eTaJ+DhtwoeHHaiOn5hRrNHywtiwORPoisL7B4osyvkCluoFIqI16LsXyyU3sEvFqyTjwg/d5sAAAAASUVORK5CYII="
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
