//2016.08.13

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
imagesub([
{id: "imagesearch-sep", style: "display:none;"},
{
label: 'Google',
url: 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
image: "https://www.google.com/favicon.ico",
where: 'tab',
}, 
{
label: 'Sou',
url: 'http://st.so.com/stu?imgurl=%IMAGE_URL%',
image: "http://st.so.com/favicon.ico",
where: 'tab',
}, 

]);

//圖片右鍵 複製 二级菜單
new function() {
var items = [
{
label:"复制GIF",
command: 'context-copyimage-contents',
tooltiptext: "左键: 复制静态&动态图\n右键: 复制动态图",
condition: 'image',
image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII=',
onclick: function (event) {
    if (event.button === 0) {
      var copyimage = document.querySelector('#context-copyimage-contents');
      copyimage.addEventListener('command', function () {
        var selection = content.getSelection();
        var ranges = [
        ];
        for (var i = 0; i < selection.rangeCount; i++)
        ranges.push(selection.getRangeAt(i));
        var range = document.createRange();
        range.selectNode(document.popupNode);
        selection.removeAllRanges();
        selection.addRange(range);
        goDoCommand('cmd_copy');
        selection.removeAllRanges();
        for (i in ranges)
        selection.addRange(ranges[i]);
      }, false);
    } 
      if (e.button == 2) {
			var Cc = Components.classes;
			var Ci = Components.interfaces;
			var trans = Cc["@mozilla.org/widget/transferable;1"].createInstance(Ci.nsITransferable);
			var str = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
			var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
			var partialPath = "\\" + (+new Date) + ".gif";
			try {
				var completePath = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + partialPath;
			} catch (e) {
				var completePath = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties).get("ProfLD", Ci.nsILocalFile).path + partialPath;
			}
			//alert(completePath);
			var x = gContextMenu.mediaURL || gContextMenu.linkURL;
            //alert(x);
			file.initWithPath(completePath);
			Cc["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Ci.nsIWebBrowserPersist).saveURI(Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI(x, null, null), null, null, null, null, null, file, null);
			setTimeout(function () {
				str.data = '<img src="file:///' + completePath + '">';
                trans.setTransferData("text/html", str, str.data.length * 2);
                Cc["@mozilla.org/widget/clipboard;1"].createInstance(Ci.nsIClipboard).setData(trans, null, 1);
			}, 200);
      }
  }
},
{
label: "圖片地址|Base64",
tooltiptext: "左鍵: 複製圖片地址\n右鍵: 複製圖片Base64碼",
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
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"
},

];
var menu = PageMenu({
condition: 'image',
insertBefore: 'context-viewimage',
icon: 'image',
accesskey: 'C',
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
var items = [
{
label: '保存圖片',
command: 'context-saveimage',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAv0lEQVR42mNkoBAwUssAByAOB2IOIvX9AeKNQLwFZsBzIJYk0fLXQCwKM+A/1DURQOwMxJ1AfIeAAfeBWBHdgN9AzALEa4A4FEkxDxBrAPEZQgYcB2ILIM4F4ilImrcDsQEQewLxEXwGgIAIEL9B02wD5X9BMgSnASDFyUBcCMSbkTQzIBmiCMSnsRlgA7URZPMHIBbAE/1YXfAZqpmY9IPVgP1EpgFHdAPeA7EgJQkJlIDcSTTgJBDPYBzw3AgApMktEXd8LEwAAAAASUVORK5CYII=",
},
{label:"重新載入圖片",
accesskey: "T",
oncommand:"gContextMenu.reloadImage();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVQ4jcWSyw2AIBAF5+rNDuyE2AG9WIK1UQpVeMHLEggKLCHRSQgH9u3vAR+wzYovwMwkMZLEjogs4IAgx8ut6uQUgQVWuQNwaCt7EULawa5t3fGcdciFkFWv0UzYS7BITJW3EXKiO82AfIk5K8mdJqWN0UovbyrKj9Qb7UdupJYfIj9YalkAAAAASUVORK5CYII="},
{command: 'context-viewimage',/*查看图像*/
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAgVBMVEUAAAD4+PgZGRlXV1f9/f3Z2dmfn5/09PTx8fHh4eHKysqzs7N0dHRgYGBHR0dDQ0MvLy8hISEeHh7Q0NC7u7uhoaGZmZmVlZWEhIRnZ2dTU1M/Pz8nJycSEhLp6eni4uLd3d3U1NTFxcWnp6eQkJCNjY2FhYWDg4NsbGxmZmY+Pj4UJ42CAAAAAXRSTlMAQObYZgAAAHxJREFUGNOdy8cNwzAUwFDqy3Kvcm/pff8Bo8BABjBv70D2Zp5ZNtR/RtqmrZ9Kcd7cyKAwJ9RtbX/25QJvkRHq6u5sDcSLUkvs5qonKwJIZpgTULnG03mAKqepVISF9sB7lYaw80PiKnV2devYHKNEyxW2Do+PlbwP2NcXHOgGBwDkvbYAAAAASUVORK5CYII="},
{command: 'context-viewimageinfo',/*查看图像信息*/
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXklEQVQ4jaVTQQ4AMATzFq/y/49sFxIRoWiyU9eWDaIar+FLsBrwVCgqjEcmYku1Fqya0iSKvQFkgvRrJjiBBGUP5jnk3q2ClkCDzr+QmYzmIJqsJtFjvQsep22E8AGEZDOcIlQ9sgAAAABJRU5ErkJggg=="},
];
var menu = PageMenu({
label:"圖像另存爲",
accesskey: "V",
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
elem.hidden = !/ic.sjlpj.cn|bi.sjlpj.cn|tvc-mall.com|seculife.com|phonepartstore.com|cellzmate.com/.test(content.location.host)//可排除多個網站
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
url: "https://www.google.com/search?newwindow=1&safe=off&hl=en-US&q=%s",
image: "https://www.google.com/favicon.ico",
where: 'tab'
}, 
{label: "Bing",
url: "https://www.bing.com/search?q=%s",
image: "https://www.bing.com/sa/simg/bing_p_rr_teal_min.ico",
where: 'tab'
},
{
label: "Sou",
url: "http://www.so.com/s?ie=utf-8&q=%s",
image: "http://www.haosou.com/favicon.ico",
where: 'tab'
}, 
{},
{
label: "外網批量管理-SKU",
id: "TVC-Universal",
accesskey: "1",
url: "http://ic.sjlpj.cn/Product/BatchManagementProductList?Sku=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "外網批量管理-品名",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/Product/BatchManagementProductList?Sku=&KeyWord=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "下架原因/重新上架-SKU",
id: "TVC-Universal",
accesskey: "2",
url: "http://ic.sjlpj.cn/DownShelf/DownShelfOperationMgtList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "查詢/變更價格-SKU",
id: "TVC-Universal",
accesskey: "3",
url: "http://ic.sjlpj.cn/PriceChangeRequest/UnChangedProductList?Sku=%s&IsFirstRequest=false",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "产品得分-SKU",
id: "TVC-Universal",
accesskey: "4",
url: "http://ic.sjlpj.cn/ProductScore/CategoryList?type=1&SiteId=1&Sku=%s&CreateBeginDate=&CreateEndDate=&UpdateBeginDate=&UpdateEndDate=&IsFirstRequest=False",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "管理SPU列表-SKU",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/ProductCorrect/ProductSpuList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "關聯SPU列表-SKU",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/Product/ProductAssociatedSpuList?Sku=%s&IsFirstRequest=true&BeginDate=2008-01-01",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "關聯SPU列表-SpuID",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/Product/ProductAssociatedSpuList?SpuId=%s&IsFirstRequest=true&BeginDate=2008-01-01",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "編輯管理-spID",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/Product/ProductEditFromEditMgt?productId=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "編輯質檢-SKU",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/Product/ProductCheckingList?Sku=%s",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "待編輯-SKU",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditList?Sku=%s&EditorId=0",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "已編輯-SKU",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/DevProduct/DevProductEditList?Sku=%s&Mode=processed&EditorId=0",
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
page({
label: "163|QQ|Gmail",
tooltiptext: "左鍵: 163郵箱\n中鍵: QQ郵箱\n右鍵: Gmail郵箱",
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
label: "用戶名",
//input_text: "dupontjoy",
onclick: function(e) {
switch(e.button) {
case 0:
addMenu.copy(addMenu.convertText('dupontjoy'));
goDoCommand('cmd_paste');
closeMenus(this);
break;
}
},
insertBefore: "QuickReply-sep",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfUlEQVQ4jc2T0QnAIAwFb5IuUhco1C6ti5RS10h/FIIYqQWhgXxE8i7hYQACIIMZUCGA4324GiQDYj10KdopAA/cOXcDIEC0AKdqugxAuxgAdE08gJTTG4B5Jm55clkz5bcaYJqoxRpSA9pFQyydnh/9xJFjWqlM/HLOsdAehABlcm57OHUAAAAASUVORK5CYII=",
});

page({
label: "常用回覆~~~",
tooltiptext: "左鍵: 感謝\n右鍵: 15字補丁",
onclick: function(e) {
switch(e.button) {
case 0:
addMenu.copy(addMenu.convertText('感謝樓主分享!'));
goDoCommand('cmd_paste');
closeMenus(this);
break;
case 2:
addMenu.copy(addMenu.convertText('~~~爲神馬要15字，『漢賊不兩立，王業不偏安』~~~'));
goDoCommand('cmd_paste');
closeMenus(this);
break;
}
},
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jc2Quw2EMBBEX0ZEE9ThCsgp42LqIKYOQro5icDRVXCXDNay+GQLEfAkS/7szKwXbqQDvpWryxm8gLkiaFbtiQUYtP+XjGoWL26AD9BWdNCqtrGXPbAW0m0XqzSJCRgr0ndGaRIbEDNJFvsWpUlEIDhDew5OEKQ5uFt6CfbEN+7PXpNrucTDDPzQSvihnoZWWrmhXuMHem9Lmy9WtnwAAAAASUVORK5CYII=",
insertBefore: "QuickReply-sep",
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
.replace(/(\s: \s|\s: |: \s|: )+/g, ": ")
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
tooltiptext: "左鍵: 代碼[code]\n中鍵: 鏈接[url]\n右鍵: 圖片[img]",
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
elem.hidden = !/bbs.kafan.cn|firefox.net.cn/.test(content.location.host)//可排除多個網站
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
condition: "link",
position: 1,
tooltiptext: "左鍵: 用新分頁開啟鏈結\n中鍵: 迅雷雲播放\n右鍵: 複製鏈接網址",
onclick: function(e) {
switch(e.button) {
case 0:
gBrowser.addTab(addMenu.convertText("%RLINK%"));
closeMenus(this);
break;
case 1:
gBrowser.selectedTab = gBrowser.addTab("http://vod.xunlei.com/iplay.html?uvs=luserid_5_lsessionid&from=vlist&url=" + addMenu.convertText("%RLINK_OR_URL%"));/*前臺新標籤*/
/*gBrowser.addTab("http://vod.xunlei.com/iplay.html?uvs=luserid_5_lsessionid&from=vlist&url=" + addMenu.convertText("%RLINK_OR_URL%"));/*後臺新標籤*/
closeMenus(this);
break;
case 2:
addMenu.copy(addMenu.convertText("%RLINK%"));
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
label: "複製標題&地址",
accesskey: "C",
onclick: function(e) {
switch(e.button) {
case 0:
addMenu.copy(addMenu.convertText("%TITLE%") +"\n"+ addMenu.convertText("%RLINK_OR_URL%"));
closeMenus(this);
break;
}
},
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII="
},
{
label: "海詞劃詞翻譯",
accesskey: "D",
url: "javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://dict.cn/hc/init.php');%20document.body.appendChild(element);})())",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtUlEQVQ4jZ2SsQ3DMAwEbwRt4MILZIH07lVnBY+RHdRlgzQZwI1aB0GSeZRCFGAolE37AQLCi0+RT8E/7sCo8GY44AUMVkEyRjjSjQc+1uQJ6CsuKlwTZxEUDMDNKl6KAnkLkWzoLjjgeUTcAW+y2wN57uJ+8aBwvhbXiTWi3E9ynre6SSt8j2EzWgEPfOU8Ao+9BSJwIRt7kpymyfUX1rgEXNe6WCJIdPKqI4/U8krtSMMM8AO1kDmDDy8CTAAAAABJRU5ErkJggg=="
},
{
label: "Favicon|Base64",
tooltiptext: "左鍵: Favicon地址\n右鍵: Favicon的Base64碼",
onclick: function(e) {
switch(e.button) {
case 0:
addMenu.copy(addMenu.convertText("%FAVICON%"));
closeMenus(this);
break;
case 2:
addMenu.copy(addMenu.convertText("%FAVICON_BASE64%"));
closeMenus(this);
break;
}
},
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2UlEQVQ4jb2SvUpDYRBE9ynuN3umFEQklURTBUtJtLKyFKz0HXy75AkklY0ikng7O1NdGxWJ/1/AgWnPnIWNWDfA1HZXU2AStrvacdvd/wEkjYBHSeNvAZk5zMzhJ4DxjwDbR0ALzDPz4E8nZOYx8FBKGUjaAxaSRr8CACfAHNh5p7wLtJIOIyJKKT3b18DFB4Dt+1JKb3UhM/tAa/sSWNg+B26As1WDra80M7Nv+0rSfkRE0zQbwK3t0+o/sL1p+26tR5K0/QpY1gBeTJ4CmNle1hSY1o6/5Rn8GGw2HC8ubAAAAABJRU5ErkJggg=="
},
{
label: "UTF-8|Big5|GBK",
tooltiptext: "左鍵: UTF-8\n中鍵: Big5\n右鍵: GBK",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlUlEQVQ4ja2TwQ2AIAxF3wau4QCuwCxcPTKMI7iBO7iCA3BiArxUJaSCik2a0NL/+1MK/Gg9MAMBiDcepKbXwB4Yga7QpJMan5PMcvHUnGBOC5XOmpKQJuILsIpJg5VraA7Y5OwBWyMYBHScYxb7JwSpAs1NiWDimq6RvE3ipabAiMyoKCnOoPkZmxepeZUPks+f6bPtGg1LLkKBszsAAAAASUVORK5CYII=",
onclick: "var code = ['UTF-8', 'Big5', 'GBK']; BrowserSetForcedCharacterSet(code[event.button]);closeMenus(this);"
},

];
var menu = PageMenu({
label: "多功能菜單",
accesskey: "M",
condition: 'normal',
insertBefore: 'context-openlinkincurrent',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABBJREFUCNdjgID6fxCaIBcAcUwEeC1dweYAAAAASUVORK5CYII="
});
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
new function() {
//幾個擴展圖標
/*tab({
id: "imageSearch",//黑螃蟹的UC脚本, 右键可上传再搜索
label: "相似圖片",
condition: "image",
accesskey: "S",
insertAfter: "context-sep-copylink",
clone: false,// 不克隆，直接改在原来的菜單上面
}
);*/

};


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
