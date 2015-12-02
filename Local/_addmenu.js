
//2015.10.26 調整選中文字搜索
//2015.09.18 帶開關的解除右鍵限制
//2015.09.12 整合RC多功能菜單等
//2015.08.23 調整雲播放前臺新標籤打開
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
command: 'context-copygif',/*複製GIF*/
accesskey: "G",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII=",
},
{
label: "圖片地址|Base64",
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
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC"
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
{label:"重新載入圖片",
accesskey: "T",
oncommand:"gContextMenu.reloadImage();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVQ4jcWSyw2AIBAF5+rNDuyE2AG9WIK1UQpVeMHLEggKLCHRSQgH9u3vAR+wzYovwMwkMZLEjogs4IAgx8ut6uQUgQVWuQNwaCt7EULawa5t3fGcdciFkFWv0UzYS7BITJW3EXKiO82AfIk5K8mdJqWN0UovbyrKj9Qb7UdupJYfIj9YalkAAAAASUVORK5CYII="},
{command: 'context-viewimageinfo',image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXklEQVQ4jaVTQQ4AMATzFq/y/49sFxIRoWiyU9eWDaIar+FLsBrwVCgqjEcmYku1Fqya0iSKvQFkgvRrJjiBBGUP5jnk3q2ClkCDzr+QmYzmIJqsJtFjvQsep22E8AGEZDOcIlQ9sgAAAABJRU5ErkJggg=="},
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
elem.hidden = !/ic.sjlpj.cn|bi.sjlpj.cn|tvc-mall.com|seculife.com|phonepartstore.com/.test(content.location.host)//可排除多個網站
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
url: "http://www.baidu.com/s?wd=%s&ie=utf-8",
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
label: "外網批量管理-SKU",
id: "TVC-Universal",
accesskey: "1",
url: "http://ic.sjlpj.cn/#/Product/BatchManagementProductList?Sku=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "外網批量管理-品名",
id: "TVC-Universal",
url: "http://ic.sjlpj.cn/#/Product/BatchManagementProductList?Sku=&KeyWord=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "下架原因查詢-SKU",
id: "TVC-Universal",
accesskey: "2",
url: "http://ic.sjlpj.cn/DownShelf/DownShelfOperationAuditList?DownType=All&Sku=%s&Status=0&ApplyUserId=0&IsForProcessed=True",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "SPU關聯列表-SKU",
id: "TVC-Universal",
accesskey: "3",
url: "http://ic.sjlpj.cn/Product/ProductAssociatedSpuList?Sku=%s&IsFirstRequest=true&BeginDate=2008-01-01",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{
label: "SPU關聯列表-SpuID",
id: "TVC-Universal",
accesskey: "4",
url: "http://ic.sjlpj.cn/#/Product/ProductAssociatedSpuList?SpuId=%s&IsFirstRequest=true&BeginDate=2008-01-01",
image: "http://ic.sjlpj.cn/favicon.ico",
where: 'tab'
},
{},
{
label: "編輯管理-spID",
id: "TVC-Universal",
accesskey: "5",
url: "http://ic.sjlpj.cn/#/Product/ProductEditFromEditMgt?productId=%s",
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
page({
label: "163|QQ|Gmail",
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
label: "字數補丁~~~",
input_text: "~~~爲神馬要15字，『漢賊不兩立，王業不偏安』~~~",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jc2Quw2EMBBEX0ZEE9ThCsgp42LqIKYOQro5icDRVXCXDNay+GQLEfAkS/7szKwXbqQDvpWryxm8gLkiaFbtiQUYtP+XjGoWL26AD9BWdNCqtrGXPbAW0m0XqzSJCRgr0ndGaRIbEDNJFvsWpUlEIDhDew5OEKQ5uFt6CfbEN+7PXpNrucTDDPzQSvihnoZWWrmhXuMHem9Lmy9WtnwAAAAASUVORK5CYII=",
insertBefore: "QuickReply-sep",
});
page({
label: "當前日期&時間",
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
label: "開啟|複製|雲播鏈結",
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
label: "標題+地址|短網址",
tooltiptext: "左鍵：標題+地址\n右鍵：短網址",
onclick: function(e) {
switch(e.button) {
case 0:
addMenu.copy(addMenu.convertText("%TITLE%") +"\n"+ addMenu.convertText("%RLINK_OR_URL%"));
closeMenus(this);
break;
case 2:
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
closeMenus(this);
break;
}
},
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII="
},
{
label: "Favicon|Base64",
tooltiptext: "左鍵：Favicon地址\n右鍵：Favicon的Base64碼",
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
tooltiptext: "左鍵：UTF-8\n中鍵：Big5\n右鍵：GBK",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlUlEQVQ4ja2TwQ2AIAxF3wau4QCuwCxcPTKMI7iBO7iCA3BiArxUJaSCik2a0NL/+1MK/Gg9MAMBiDcepKbXwB4Yga7QpJMan5PMcvHUnGBOC5XOmpKQJuILsIpJg5VraA7Y5OwBWyMYBHScYxb7JwSpAs1NiWDimq6RvE3ipabAiMyoKCnOoPkZmxepeZUPks+f6bPtGg1LLkKBszsAAAAASUVORK5CYII=",
onclick: "var code = ['UTF-8', 'Big5', 'GBK']; BrowserSetForcedCharacterSet(code[event.button]);closeMenus(this);"
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
label: "編輯當前頁面",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAzklEQVQ4y73SIUuDYRAA4FMeNK9Pqz/B4mSbQ2Wg/8E2g+CPEctYXzcZrNaJQYMsj7kiBmHwhZULMsTt+8KuvO8dPPDevRexqUALL/jCHXbL4EvMcY09POC+DP7EIM8mapiXwYeZn2R+hY9S+Fd9mO20quAjzNCtghuJz6vgduKz/3AXP2gs1TuJ26uG9pqL8o6DrJ0mbq7C+5hiGz2Ms50Zjtf57xv0876DEb6X2/krthI9RsRbRNQi4iIixhFxWxTF87rrOsFTvqQem4wFTec0RRu9Et4AAAAASUVORK5CYII=",
oncommand: function() {document.onkeydown=ck;content.document.body.contentEditable=true;function ck(e){k=window.event?window.event.keyCode:e.keyCode;if(k==27){content.document.body.contentEditable=false}}}
},
{
label: '解除右鍵限制',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAIVBMVEUAAAAAAAC4uLjb29tmZmY6OjqRkZHr6+vIyMiurq6enp6fJmq8AAAAAXRSTlMAQObYZgAAAGVJREFUCNdjQAJMS5MawHSgoKAYiFEYwMBg6ABkhACxYhhQJgCIhQwNGFgTgAIKLAkMjAZAAQY2ByADKMDABGIABUAiLAlAAQZWoKCQEEg/EDsCBZhBHBYhY2MgBwgmCgoGIbkBAF+5CxbmrSXzAAAAAElFTkSuQmCC",
url: `javascript:function applyWin(a){if(typeof a.__nnANTImm__==="undefined"){a.__nnANTImm__={};a.__nnANTImm__.evts=["mousedown","mousemove","copy","contextmenu"];a.__nnANTImm__.initANTI=function(){a.__nnantiflag__=true;a.__nnANTImm__.evts.forEach(function(c,b,d){a.addEventListener(c,this.fnANTI,true)},a.__nnANTImm__)};a.__nnANTImm__.clearANTI=function(){delete a.__nnantiflag__;a.__nnANTImm__.evts.forEach(function(c,b,d){a.removeEventListener(c,this.fnANTI,true)},a.__nnANTImm__);delete a.__nnANTImm__};a.__nnANTImm__.fnANTI=function(b){b.stopPropagation();return true};a.addEventListener("unload",function(b){a.removeEventListener("unload",arguments.callee,false);if(a.__nnantiflag__===true){a.__nnANTImm__.clearANTI()}},false)}a.__nnantiflag__===true?a.__nnANTImm__.clearANTI():a.__nnANTImm__.initANTI()}applyWin(top);var fs=top.document.querySelectorAll("frame, iframe");for(var i=0,len=fs.length;i<len;i++){var win=fs[i].contentWindow;try{win.document}catch(ex){continue}applyWin(fs[i].contentWindow)};void 0;`
},
{
label:"夜間模式",
url:"javascript:(function(){var%20night=function(w){(function(d){var%20css='html{opacity:0.7!important;background:black!important;}body{background:white!important;}';var%20s=d.getElementsByTagName('style');for(var%20i=0,si;si=s[i];i++){if(si.innerHTML==css){si.parentNode.removeChild(si);return}};var%20heads=d.getElementsByTagName('head');if(heads.length){var%20node=d.createElement('style');node.type='text/css';node.appendChild(d.createTextNode(css));heads[0].appendChild(node)}})(w.document);%20for(var%20i=0,f;f=w.frames[i];i++){try{arguments.callee(f)}catch(e){}}};night(window)})();",
image:" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAY1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmaHTeAAAAIXRSTlMAxsDKvHPOw5pK97WmoYJ4bVtUQDAiCrCMimhhOCwbFwwUUO7SAAAAbUlEQVQY022OVw7AMAhDndl07z3vf8oqEapQFf/AAyOMqFJps5RxWUx2ZOwMqobxkAMCTPoGJOMAyX9QHPwEwKUI+orsZg68+zj56dvWls0qnH83KnKbDtsS7PqLRHla1YVaq4c2kxM6kaJGTC+MlANOz9LO6wAAAABJRU5ErkJggg=="
},
{
label: "字體查詢",
url: "javascript:(function(){var%20d=document,s=d.createElement('scr'+'ipt'),b=d.body,l=d.location;s.setAttribute('src','http://chengyinliu.com/wf.js?o='+encodeURIComponent(l.href)+'&t='+(new%20Date().getTime()));b.appendChild(s)})();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABNJREFUCNdjgAD5DwyMDAQREAAAK6kBHIC7lQ4AAAAASUVORK5CYII="
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


//翻譯當前頁面
new function () {
var items = [
{
label: "海詞劃詞翻譯",
url: "javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://dict.cn/hc/init.php');%20document.body.appendChild(element);})())",
image: "http://dict.cn/favicon.ico"
},
{
label: "愛詞霸劃詞翻譯",
url: "javascript:var%20ICIBA_HUAYI_ALLOW=1,iciba_huaci_url=%22http://open.iciba.com/huaci/%22;void%20function(){if(!document.getElementById(%22icIBahyI-yi%22)){var%20a=document.createElement(%22div%22);a.id=%22icIBahyI-yi%22,a.style.display=%22none%22,a.style.zIndex=%224294967295%22,document.body.insertBefore(a,document.body.firstChild);var%20i=document.createElement(%22div%22);i.id=%22icIBahyI-main_box%22,i.style.display=%22none%22,document.body.insertBefore(i,document.body.firstChild);var%20e='%3Clink%20type=%22text/css%22%20rel=%22stylesheet%22%20href=%22'+iciba_huaci_url+'mini.css%22%20/%3E%3Cobject%20style=%22height:0px;width:0px;overflow:hidden;%22%20classid=%22clsid:d27cdb6e-ae6d-11cf-96b8-444553540000%22%20codebase=%22http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab%23version=6,0,0,0%22%20width=%220%22%20height=%220%22%20id=%22asound_hanci%22%20align=%22absmiddle%22%3E%3Cparam%20name=%22allowScriptAccess%22%20value=%22always%22%20/%3E%3Cparam%20name=%22movie%22%20value=%22http://www.iciba.com/top/asound.swf%22%20/%3E%3Cparam%20name=%22quality%22%20value=%22high%22%20/%3E%3Cembed%20src=%22http://www.iciba.com/top/asound.swf%22%20quality=%22high%22%20width=%220%22%20height=%220%22%20name=%22asound_hanci%22%20align=%22absmiddle%22%20allowScriptAccess=%22always%22%20type=%22application/x-shockwave-flash%22%20pluginspage=%22http://www.macromedia.com/go/getflashplayer%22%20/%3E%3C/object%3E%3Cdiv%20class=%22icIBahyI-main_title%22%20id=%22icIBahyI-main_title%22%20%3E%3Ca%20href=%22javascript:;%22%20id=%22icIBahyI-gb%22%20class=%22icIBahyI-gb%22%20title=%22%E5%85%B3%E9%97%AD%22%3E%3C/a%3E%3Ca%20href=%22javascript:;%22%20id=%22icIBahyI-dq%22%20class=%22icIBahyI-dq2%22%20title=%22%E7%82%B9%E5%87%BB%E5%9B%BA%E5%AE%9A%E7%BB%93%E6%9E%9C%22%3E%3C/a%3E%E7%88%B1%E8%AF%8D%E9%9C%B8%20%E5%8D%B3%E5%88%92%E5%8D%B3%E8%AF%91%3Cdiv%20class=%22icIBahyI-sz_list%22%20id=%22icIBahyI-sz_list%22%3E%3Ca%20href=%22javascript:;%22%3E%E5%85%B3%E9%97%AD%E5%8D%B3%E5%88%92%E5%8D%B3%E8%AF%91%3C/a%3E%3Ca%20href=%22%23%22%20target=%22_blank%22%3E%E5%8F%8D%E9%A6%88%3C/a%3E%3Ca%20href=%22%23%22%20style=%22border:none;%22%20target=%22_blank%22%3E%E5%B8%AE%E5%8A%A9%3C/a%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-tl%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-tr%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-bl%22%3E%3C/span%3E%3Cspan%20class=%22icIBahyI-j%20icIBahyI-br%22%3E%3C/span%3E%3C/div%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-search%22%3E%3Cinput%20id=%22ICIBA_HUAYI_input%22%20name=%22%22%20type=%22text%22%20onkeydown=%22ICIBA_HUAYI_KEYDOWN(event);%22%3E%3Ca%20href=%22javascript:;%22%20class=%22icIBahyI-sear%22%20onclick=%22ICIBA_HUAYI_searchword()%22%20%3E%E6%9F%A5%20%E8%AF%8D%3C/a%3E%3C/div%3E%3Cspan%20class=%22icIBahyI-contTop%22%3E%3C/span%3E%3Cdiv%20class=%22icIBahyI-loading%22%20id=%22loading%22%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-main_cont%22%20id=%22icIBahyI-main_cont%22%3E%3C/div%3E%3Cdiv%20class=%22icIBahyI-CB%22%20id=%22icIBahyI-scbiframe%22%20style=%22display:none%22%3E%3C/div%3E%3Cdiv%20id=%22ICIBA_TOO_LONG%22%20style=%22height:150px%22%20class=%22icIBahyI-footer%22%3E%E6%82%A8%E5%88%92%E5%8F%96%E7%9A%84%E5%86%85%E5%AE%B9%E5%A4%AA%E9%95%BF%EF%BC%8C%E5%BB%BA%E8%AE%AE%E6%82%A8%E5%8E%BB%E7%88%B1%E8%AF%8D%E9%9C%B8%3Ca%20href=%22http://fy.iciba.com%22%3E%E7%BF%BB%E8%AF%91%3C/a%3E%E9%A1%B5%E9%9D%A2%E3%80%82%3C/div%3E%3Cspan%20class=%22icIBahyI-contB%22%3E%3C/span%3E';document.getElementById(%22icIBahyI-main_box%22).innerHTML=e;var%20c=document.createElement(%22script%22);c.setAttribute(%22src%22,iciba_huaci_url+%22dict.php%22),document.body.appendChild(c);var%20i=document.createElement(%22div%22);i.id=%22icIBahyI-USER_LOGIN%22,i.className=%22icIBahyI-USER_LOGIN%22,i.style.display=%22none%22,document.body.insertBefore(i,document.body.firstChild);var%20t=document.createElement(%22script%22);t.setAttribute(%22src%22,iciba_huaci_url+%22ICIBA_HUACI_COM.js%22),document.body.appendChild(t)}}();",
image: "http://res.iciba.com/dict/favicon.ico"
},
{
label: '必應劃詞翻譯',
subdir: '',
image: "http://global.bing.com/s/a/bing_p.ico",
oncommand: function() {
gBrowser.loadURI("javascript:(function(){script=document.createElement('script');script.src='http://dict.bing.com.cn/cloudwidget/Scripts/Generated/BingTranslate_Hover_Phrase_Selection_ShowIcon.js';script.onload=INIT;document.body.appendChild(script);})();function%20INIT(){BingCW.Init({MachineTranslation:true,WebDefinition:true});}");
}
},
{
label: "漢典查字劃詞解釋",
url: "javascript:void((function()%20{var%20element=document.createElement('script');%20element.setAttribute('src',%20'http://www.zdic.net/tools/zih.asp');%20document.body.appendChild(element);})())",
image: "http://www.zdic.net/favicon.ico"
},

];

var menu = PageMenu({
label: "翻譯當前頁面",
condition: 'normal',
insertBefore: 'context-openlinkincurrent',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7ElEQVR42mNkwATrgXg/EE9iIAIwYhETAOKDQFwOxDuIMeA/A3FgFhCnE+MCZBAMxI1ArEOMFw4AcTIQ30USOwrEcWhiOA2wBeIOILaG8j2AOAKIE0gJRJCmQCC+CsThQOwNxB9IMUAAGoXfiNGMbIA8EG+BBpYnEN8G4jtQORVoGChDxUKAeC22aFTBEViggLSCpg1WIOYEYiN80fgfjzjIkkXIMUOsAaD00ATE2kCcB8RuQOxDigEgb8wA4s1ArADE54FYEBTIuAwgJrm3A3EVIxF5YCaUbgPij1C2MxCvARlOjAG4AvUcKDYAi+YxEXgzorIAAAAASUVORK5CYII=",
onpopupshowing: syncHidden });
menu(items);
};

//分享當前頁面
new function () {
var items = [
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
label: '百度雲|百度相冊',
tooltiptext: "左鍵：收藏到百度雲\n右鍵：收藏到百度相冊",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4jcXSv0qdQRCG8d9JUmghpBC2sNAIEqshl5D6kE7bkC5WFoJg5zVoAmntRbDJn5sIBEcQAhpIkcDBwkqMGNBmj24+j8Qm5IVlmZnnnZ2B5X+r1wYR8RSf8OQO/hv6mfl1mHjQAdY65kusY6XGs5W5PUFEPMZPjNfUL7zEexw0jc8wlZkn3QleNWZ4kZk7mMJekx+vLHhYX+9hC5MNOFFK+ZyZR6WU49aEmVLKu8FgcD3Bc8z7U8/wIyIW8aFTm6+e6wav3dYmVrGNsRH1JXhUg/4IYGNErlW/bfAbM5n5/S8mEBHT+MLNCvu4qMXL7t2eyp8jqf8gIt7iEG8ycwjd9XoPy5jLzOXhCrv4iI2IuM8Wp1i4D/jvdQWgm0n7Gn2U7gAAAABJRU5ErkJggg==",
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

];

var menu = PageMenu({
label: "分享當前頁面",
condition: 'normal',
insertBefore: 'context-openlinkincurrent',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA50lEQVQ4y8XTrU5DQRQE4K9pgigJTQBbheEBcBVViApUE1Q9FokDg+QtkFVYLLW1VQQUhn8MioAZksvl0tuCYJPN7mbnzJkze5Z/Gvu4+k1gGyO84n3R4F6ynuNsEYIlHCd4gFt05iXYwEVkf8o/yF0twRA32Mu5j2kUzSRo4xQTbBbKmGK7gKsk6KbWk0ImkT0qYb8QNHEUyf0SsFMwrpKgFaMmMa08isb9qGCQt33OOowXWyXjvhE0KgzcwW4aZwVjXGe/ijWsZy43atr2CS84xCUecI9H3OFtVh80I7P7l1/XqgN8AN+8M6oUp8chAAAAAElFTkSuQmCC",
onpopupshowing: syncHidden });
menu(items);
};



//當前頁面
new function () {
var items = [
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

];

var menu = PageMenu({
label: "更多打開方式",
condition: 'normal',
insertBefore: 'context-openlinkincurrent',
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAcklEQVQ4y7XSuw2FMBBE0RO4CEJKoAOoiN7IaQuhpxeYxAGywBgBI222M7r74QO1iJX1SBGCDxUwY8GKX4Ydc5zSfD3+qU4Djgj25j5RVAfkZncJcjNMtQFNWtx4dcYSQVcy1O6g1DM8DfDKJ4abFO9rA1D9MeUVPKkRAAAAAElFTkSuQmCC",
onpopupshowing: syncHidden });
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
