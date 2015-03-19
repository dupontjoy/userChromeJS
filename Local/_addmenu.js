
//2015.03.19 15:00 調整選中文字搜索
//2015.03.10 15:00 調整一些菜單順序
//2015.01.21 22:00 修正特殊符號，添加小書籤菜單
//2015.01.20 10:00 更新TVC搜索項
//2015.01.16 23:00 更新TVC搜索項，加入特殊符號選單三級菜單
//2015.01.08 20:40 一些搜索項只在特定網站顯示
//2015.01.08 10:40 貼上 二级菜單
//2015.01.04 09:35 複製 二级菜單
//2015.01.03 12:00 新增幾個TVC搜索
//2014.12.22 18:50 選中文字搜索換回
//2014.12.20 19:40 圖片另存放到二級菜單
//2014.12.11 17:50 常用文字搜索橫排菜單
//2014.12.09 22:45 將菜單換成正體中文
//2014.12.07 12:40 四个複製圖片放到二级菜单，添加分割线
//2014.12.04 08:23 備份換用Keychanger
//2014.11.30 11:00 將圖標統一放到『圖標美化』css中
//2014.11.28 21:40 添加EHH元素隱藏
//2014.11.25 21:50 將圖標統一放到『圖標美化』css中
//2014.11.23 15:52 修正百度搜索，torrentkitty搜索，灌水圖标
//2014.11.13 21:50 新增『保存所有圖片到zip』和『横排菜单』，调整菜单顺序，调整幾個conditions
//2014.11.06 21:55 調整Send to Gmail幾個菜單順序
//2014.11.02 09:10 調整搜圖順序

/*——————————标签页右鍵————————————*/
//撤销关闭二级菜单 By feiruo
var undoMenu = TabMenu({
label: '撤銷關閉',
accesskey: "R",
insertBefore: "context_reloadTab",
tooltiptext: "右鍵显示所有历史记录",
onclick: "if (event.button == 2) {PlacesCommandHook.showPlacesOrganizer('History');}",
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
}, {
label: '360識圖',
url: 'http://st.so.com/stu?imgurl=%IMAGE_URL%',
image: "http://st.so.com/favicon.ico",
where: 'tab',
accesskey: "Q"
}, {}, {
label: 'Baidu識圖',
url: 'http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=%IMAGE_URL%',
image: "http://www.baidu.com/favicon.ico",
where: 'tab'
}, {
label: 'Baidu',
url: 'http://image.baidu.com/i?rainbow=1&ct=1&tn=shituresultpc&objurl=%IMAGE_URL%',
image: "http://www.baidu.com/favicon.ico",
where: 'tab'
}, {
label: 'Bing',
url: 'http://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=%IMAGE_URL%&mkt=en-US',
image: "http://cn.bing.com/s/a/bing_p.ico",
where: 'tab'
}, {
label: 'Sougou',
url: 'http://pic.sogou.com/ris?query=%IMAGE_URL%',
image: "http://logo.www.sogou.com/images/logo2014/new/favicon.ico",
where: 'tab'
}, {
label: 'TinEye',
url: 'http://www.tineye.com/search?url=%IMAGE_URL%',
image: "http://www.tineye.com/favicon.ico",
where: 'tab'
}, ]);

//圖片右鍵 複製 二级菜单
new function() {
var items = [{
command: 'context-copyimage-contents'
},
{
label: "複製GIF",
condition: "image",
insertBefore: 'context-saveimage',
image: "",
onclick: function(event) {
if (event.button === 0) {
var selection = content.getSelection();
var ranges = [];
for (var i = 0; i < selection.rangeCount; i++) ranges.push(selection.getRangeAt(i));
var range = document.createRange();
range.selectNode(document.popupNode);
selection.removeAllRanges();
selection.addRange(range);
goDoCommand("cmd_copy");
selection.removeAllRanges();
for (i in ranges) selection.addRange(ranges);
}
}
},

{
command: 'context-copyimage'
}, /*複製圖片地址*/ {
label: "複製圖片Base64",
condition: "image",
accesskey: "B",
text: "%IMAGE_BASE64%",
}];
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

//圖片右鍵 保存等 二级菜单
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
}, {
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
{command: 'context-viewimageinfo'},
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
if(elem.id == "TVC"){
elem.hidden = !/ic.sjlpj.cn|tvc-mall.com/.test(content.location.host)//可排除多個網站
}
});
}
});
var items = [
//打開方式(默认当前頁面)，通过where 更改，具体tab(前台)、tabshifted(后台)、window(窗口)
{
label: "Baidu",
accesskey: "B",
url: "http://www.baidu.com/baidu?wd=%s&ie=utf-8",
image: "https://www.baidu.com/favicon.ico",
where: 'tab'
}, 
{label: "Google",
accesskey: "G",
url: "http://www.google.com/search?q=%s",
image: "https://www.google.com/favicon.ico",
where: 'tab'
}, 
{},
{
label: "Amazon",
url: "http://www.amazon.com/s/?url=field-keywords=%s",
image: "http://www.amazon.com/favicon.ico",
where: 'tab'
},
{
label: "Ebay",
url: "http://www.ebay.com/sch/i.html?_nkw=%s",
image: "http://www.ebay.com/favicon.ico",
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
id: "TVC",
accesskey: "1",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditCollectList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—認領-品名",
id: "TVC",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditCollectList?Name=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—已編輯-SKU",
id: "TVC",
accesskey: "2",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditList?mode=processed&Sku=%s&EditorId=0",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "產品—已編輯-品名",
id: "TVC",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditList?mode=processed&Name=%s&EditorId=0",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "運營—質檢-SKU",
id: "TVC",
accesskey: "3",
url: "http://ic.sjlpj.cn/Product/ProductCheckingList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—質檢-品名",
id: "TVC",
url: "http://ic.sjlpj.cn/Product/ProductCheckingList?KeyWord=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—審核-SKU",
id: "TVC",
accesskey: "4",
url: "http://ic.sjlpj.cn/Product/OperationProductEditAuditList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—審核-品名",
id: "TVC",
url: "http://ic.sjlpj.cn/Product/OperationProductEditAuditList?Keyword=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "運營—SPU管理列表",
id: "TVC",
accesskey: "5",
url: "http://ic.sjlpj.cn/ProductCorrect/ProductSpuList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—SPU關聯列表",
id: "TVC",
url: "http://ic.sjlpj.cn/Product/ProductAssociatedSpuList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—外網運營查詢-SKU",
id: "TVC",
accesskey: "6",
url: "http://ic.sjlpj.cn/ProductOperationSearch/ProductOperationSearchList?Sku=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "運營—外網運營查詢-品名",
id: "TVC",
url: "http://ic.sjlpj.cn/ProductOperationSearch/ProductOperationSearchList?KeyWord=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "Baidu地圖",
url: "http://map.baidu.com/m?word=%s",
image: "http://map.baidu.com/favicon.ico",
where: 'tab'
}, {
label: "Google地圖",
url: "http://maps.google.com/maps?q=%s&ie=utf-8",
image: "http://maps.gstatic.com/favicon3.ico",
where: 'tab'
}, {}, {
label: "漢典",
url: "http://www.zdic.net/search?q=%s",
image: "http://www.zdic.net/favicon.ico",
where: 'tab'
}, {}, {
label: "BT天堂",
url: "http://www.bttiantang.com/s.php?q=%s",
image: "http://www.bttiantang.com/favicon.ico",
where: 'tab'
},
];
menu(items);
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

//特殊符號選單，打造三級菜單
var Punctuationsub = PageMenu({
label:"特殊符號",
accesskey: "S",
condition:"input",
insertBefore:"context-copy",
oncommand: function(event) {
var input_text = event.target.getAttribute('input_text');
if (input_text) {
addMenu.copy(input_text);
setTimeout(function() {
goDoCommand("cmd_paste");
}, 100);
}
}
});
Punctuationsub([
{id: "Punctuation-sep", style: "display:none;"}
]);
var PunctuationsubMenu1 = PageMenu({
label: "物理",
condition: "input",
insertBefore: "Punctuation-sep",
});
PunctuationsubMenu1([
{label: "°", input_text:"°"},
{label: "°C", input_text:"°C"},
{label: "m²", input_text:"m²"},
{label: "cm²", input_text:"cm²"},
{label: "km²", input_text:"km²"},
{label: "Ω", input_text:"Ω"},//ohm
{label: "Φ", input_text:"Φ"},//diameter
{label: "¢", input_text:"¢"},//another way of diameter
]);
var PunctuationsubMenu2 = PageMenu({
label: "數學",
condition: "input",
insertBefore: "Punctuation-sep",
});
PunctuationsubMenu2([
{label: "±", input_text:"±"},
{label: "×", input_text:"×"},
{label: "÷", input_text:"÷"},
{label: "≤", input_text:"≤"},
{label: "≥", input_text:"≥"},
/*{label: "≦", input_text:"≦"},//is less than or equal
{label: "≧", input_text:"≧"},*/
{label: "≠", input_text:"≠"},//is not equal to
{label: "≈", input_text:"≈"},//is approximately equal to
{label: "√", input_text:"√"},
{label: "∞", input_text:"∞"},//infinity
]);
var PunctuationsubMenu3 = PageMenu({
label: "其它",
condition: "input",
insertBefore: "Punctuation-sep",
});
PunctuationsubMenu3([
{label: "·", input_text:"·"},//placeholder,位于字母中间
]);

//快捷回复
new function() {
var menu = PageMenu({
label: "快速回覆",
condition: "input noselect",
accesskey: "W",
insertBefore: "spell-undo-add-to-dictionary",
//跟进depft更新
oncommand: function(event) {
var input_text = event.target.getAttribute('input_text');
if (input_text) {
addMenu.copy(input_text);
setTimeout(function() {
goDoCommand("cmd_paste");
}, 100);
}
}
});
var items = [
{
label: "用戶名~~~",
input_text: "dupontjoy",
accesskey: "1",
}, 
{}, 
{
label: "163mail~~~",
input_text: "dupontjoy@163.com",
accesskey: "2",
image: "http://email.163.com/favicon.ico "
}, 
{
label: "QQmail~~~",
input_text: "dupontjoy@qq.com",
accesskey: "3",
image: " https://mail.qq.com/favicon.ico"
}, 
{
label: "Gmail~~~",
input_text: "dupont2305@gmail.com",
accesskey: "4",
image: "https://ssl.gstatic.com/ui/v1/icons/mail/images/2/unreadcountfavicon/0.png "
}, 
{}, 
{
label: "字數補丁~~~",
input_text: "~~~為神馬要15字，好吧，漢賊不兩立，王業不偏安~~~",
image: " "
}
];
menu(items);
};

//貼上 二級菜單
new function() {
var items = [{
command: 'context-paste'
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
);
if (sel) {goDoCommand("cmd_paste");}
},
},
{
label: "插入code代碼",
condition: "input",
accesskey: "I",
insertAfter: "context-paste",
oncommand: function() {
var str = addMenu.convertText('[code]%P[/code]');
addMenu.copy(str);
goDoCommand('cmd_paste');
},
/*//限定只在kafan生效(此段代碼只適用一級菜單)
onshowing: function(menuitem) {
var isHidden = !(content.location.host == 'bbs.kafan.cn');
this.hidden = isHidden;
},*/
},
];
var menu = PageMenu({
condition: 'input',
insertBefore: 'context-copy',
icon: 'input',
onpopupshowing: syncHidden
});
menu(items);
items.forEach(function(it) {
if (it.command)
css('#contentAreaContextMenu[addMenu~="input"] #' + it.command + '{ display: none !important; }')
});
};

/*——————————頁面右鍵——————————*/
//Firefox 31+ 横排菜单，在鏈接上和非鏈接上不相同
var openMenu = GroupMenu({
label: '打開...',
condition: 'noinput noselect nomailto nocanvas nomedia noimage nolink',
position: 1,
insertBefore: 'context-sep-navigation'
});
openMenu([
{
label:"拼寫檢查",
tooltiptext: "拼寫檢查（當前窗口打開）！",
oncommand: function() {document.onkeydown=ck;content.document.body.contentEditable=true;function ck(e){k=window.event?window.event.keyCode:e.keyCode;if(k==27){content.document.body.contentEditable=false}}},
},
/*{
label: "拼寫檢查",
tooltiptext: "拼寫檢查（新窗口打開）！",
oncommand: function() {editableWindow=content.open(content.location.href);editableWindow.onload=function(){content.document.onkeydown=ck;content.document.body.contentEditable=true;function ck(e){k=window.event?window.event.keyCode:e.keyCode;if(k==27){content.document.body.contentEditable=false}}}},
},*/
{
label: "複製Favicon的URL",
text: "%FAVICON%",
}, 
{
label: "複製Favicon的Base64",
text: "%FAVICON_BASE64%",
},
/*{
label: "在IE中打開",
text: "%RLINK_OR_URL%",
exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
},
{
label: "BackupProfiles",
text: '%RLINK_OR_URL%',
exec: Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\BackupProfiles\\BackupProfiles_7z.bat",
},
{
label: "在 Chrome 中打開",
text: '%RLINK_OR_URL%',
exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe",
},*/
]);

/*——————————移動圖標和菜單——————————*/
//移动圖标，代替Movebutton.uc.js，需配合RebuildWhenStart.uc.js，可惜對有的圖標還是無力
new function() {
//几个扩展圖标
tab({
id: "flashgot-media-tbb",
insertBefore: "userChromebtnMenu",
clone: false,// 不克隆，直接改在原来的菜单上面
}
);
tab({
id: "lpt_lastpass-compact-btn",
insertBefore: "userChromebtnMenu",
clone: false,// 不克隆，直接改在原来的菜单上面
}
);
tab({
id: "foxyproxy-toolbar-icon",
insertBefore: "userChromebtnMenu",
clone: false,// 不克隆，直接改在原来的菜单上面
}
);
tab({
id: "ublock-button",
insertBefore: "userChromebtnMenu",
clone: false,// 不克隆，直接改在原来的菜单上面
}
);
tab({
id: "ghostery-button",
insertBefore: "userChromebtnMenu",
clone: false,// 不克隆，直接改在原来的菜单上面
}
);

//右鍵菜单
tab({
id: "yun-player-context",
insertAfter: "context-copylink",
clone: false, // 不克隆，直接改在原来的菜单上面
});
tab({
id: "frame", //本框架又不能直接隱藏，只好移動到一個安全的位置，嘿嘿
insertAfter: "charsetMenu",
clone: false, // 不克隆，直接改在原来的菜单上面
});

};

/*————————————————————*/
//隐藏相同项。必须，不能删除
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
