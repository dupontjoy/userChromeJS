
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


/*——————————标签页右键————————————*/

//撤销关闭二级菜单 By feiruo
var undoMenu = TabMenu({
    label: '撤銷關閉',
    accesskey: "R",
    insertAfter: "context_undoCloseTab",
    tooltiptext: "右键显示所有历史记录",
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

/*——————————圖片右键————————*/

//右键搜索圖片 以圖搜圖
 var imagesub = PageMenu({ label: "以圖搜圖",accesskey: "I",  condition: "image", where: "tab", insertBefore:"context-copyimage-contents", });
imagesub([
      {label: 'Google Search',
      url : 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
      image:"https://www.google.com/favicon.ico",where: 'tab',accesskey: "G"
      },
      {label: '360識圖 Search',
      url: 'http://st.so.com/stu?imgurl=%IMAGE_URL%',
      image: "http://st.so.com/favicon.ico",where: 'tab',accesskey: "Q"
      },
      {},    
      {label: 'Baidu識圖 Search',
      url : 'http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=%IMAGE_URL%',
      image:"http://www.baidu.com/favicon.ico",where: 'tab'
      },
      {label: 'Baidu image Search',
      url : 'http://image.baidu.com/i?rainbow=1&ct=1&tn=shituresultpc&objurl=%IMAGE_URL%',
      image:"http://www.baidu.com/favicon.ico",where: 'tab'
      },  
      {label: 'Bing Search',
      url : 'http://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=%IMAGE_URL%&mkt=en-US',
      image:"http://cn.bing.com/s/a/bing_p.ico",where: 'tab'
      },
      {label: 'Sougou Search',
      url: 'http://pic.sogou.com/ris?query=%IMAGE_URL%',
      image: "http://logo.www.sogou.com/images/logo2014/new/favicon.ico",where: 'tab'
      },
      {label: 'TinEye Search',
      url : 'http://www.tineye.com/search?url=%IMAGE_URL%',
      image:"http://www.tineye.com/favicon.ico",where: 'tab'
      },
]);

//圖片右鍵 複製 二级菜单
new function () {
	var items = [
	{command: 'context-copyimage-contents'},
	{command: 'context-copygif'},
	{command: 'context-copyimage'},/*複製圖片地址*/
		{
label:"複製圖片Base64",
condition: "image",
accesskey: "B",
text:"%IMAGE_BASE64%",
	}
];
	
	var menu = PageMenu({ condition:'image', insertBefore:'context-saveimage', icon:'image', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};

// 替换 openImgRar.uc.js
page({
label: "打開圖像RAR",
accesskey: "R",
insertBefore:"context-saveimage",
condition: 'image',
oncommand: function(){
var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
try {
var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
file.initWithPath(path);
} catch (e) {
var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
}
file.initWithPath(path);
Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
setTimeout(function () {
file.launch();
}, 100);
}
});

/*——————————选中文本右键——————————*/
//鏈接和选中文字(同时选中)的分割线
page({
        label: 'separator',
        insertAfter: "context-sendlinktogmail",
        condition: 'link&select noimage',
})

//圖片和选中文字(同时选中)的分割线
page({
        label: 'separator',
        insertAfter: "context-viewimageinfo",
        condition: 'image&select',
})

//Firefox 31+ 横排菜单，在鏈接上和非鏈接上不相同
var openMenu = GroupMenu({
    label: '打開...',
    condition: 'noinput select nomailto nocanvas nomedia noimage',
    insertBefore: 'context-sep-navigation'
});
openMenu([
    {
        label:"Google搜索",
        accesskey: "G",
        url:"http://www.google.com/search?q=%s",
        image:"https://www.google.com/favicon.ico",
        where: 'tab'
    },
    {
        label:"Baidu搜索",
        accesskey: "B",
        url:"http://www.baidu.com/baidu?wd=%s&ie=utf-8",
        image:"http://www.baidu.com/favicon.ico",
        where: 'tab'
    },
    {
        label:"TVC搜索",
        accesskey: "T",
        url:"http://www.tvc-mall.com/search?q=%s",
        image:"http://www.tvc-mall.com/favicon.ico",
        where: 'tab'
    },
    /*{
        label: "BackupProfiles",
        text: '%RLINK_OR_URL%',
        exec: Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\Local\\BackupProfiles\\BackupProfiles_7z.bat",
    },
    {
        label: "在 Chrome 中打开",
        text: '%RLINK_OR_URL%',
        exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe",
    },*/

]);

//搜索选中文本
new function () {
var menu = PageMenu({
condition:"select nocanvas nomedia noimage",
label: "搜索選中文本",
accesskey: "S",
insertBefore: "context-copy",
});
var items = [
//打开方式(默认当前页面)，通过where 更改，具体tab(前台)、tabshifted(后台)、window(窗口)

{label:"Baidu地圖",url:"http://map.baidu.com/m?word=%s",image:"http://map.baidu.com/favicon.ico",where: 'tab'},

{label:"Google地圖",url:"http://maps.google.com/maps?q=%s&ie=utf-8",image:"http://maps.gstatic.com/favicon3.ico",where: 'tab'},
{},
{label:"漢典",url:"http://www.zdic.net/search?q=%s",image:"http://www.zdic.net/favicon.ico",where: 'tab'},
{},
{label:"torrentkitty",url:"http://www.torrentkitty.org/search/%s",image:"http://www.torrentkitty.org/favicon.ico",where: 'tab'},

{label:"Kickass",url:"http://kickass.so/usearch/?q=%s",image:"http://kastatic.com/images/favicon.ico",where: 'tab'},

];
menu(items);
};

//选取范围内复选框的 ON/OFF
 page({
label: "复选框的ON/OFF",
class: "checkbox",
condition: "select noinput nomailto nocanvas nomedia",
accesskey: "X",
insertAfter:"context-paste",
oncommand: function(event) {
var win = addMenu.focusedWindow;
var sel = win.getSelection();
Array.slice(win.document.querySelectorAll('input[type="checkbox"]:not(:disabled)')).forEach(function(e) {
if (sel.containsNode(e, true))
e.checked = !e.checked;
});
}
});

/*——————————输入框右键——————————*/

//插入code代码
page({
    label: "插入code代碼",
    condition: "input",
    accesskey: "I",
    insertAfter: "context-paste",
    oncommand: function() {
        var str = addMenu.convertText('[code]%P[/code]');
        addMenu.copy(str);
        goDoCommand('cmd_paste');
    },
//限定只在kafan生效
  onshowing: function(menuitem) {
    var isHidden = !(content.location.host == 'bbs.kafan.cn');
    this.hidden = isHidden;
},
});

//快捷回复
new function(){
var menu = PageMenu({
label:"快速回覆",
condition:"input",
accesskey: "W",
insertBefore: "context-copy",
//跟进depft更新
oncommand: function(event){
var input_text = event.target.getAttribute('input_text');
if(input_text) {
addMenu.copy(input_text);
setTimeout(function() {
goDoCommand("cmd_paste");
}, 100);
}
}
});
var items = [
{label:"用戶名(1)~~~",input_text: "dupontjoy",accesskey: "1",},
{},
{label:"163mail~~~",input_text: "dupontjoy@163.com",accesskey: "2",image:"http://email.163.com/favicon.ico "},
{label:"QQmail~~~",input_text: "dupontjoy@qq.com",accesskey: "3",image:" https://mail.qq.com/favicon.ico"},
{label:"Gmail~~~",input_text: "dupont2305@gmail.com",accesskey: "4",image:"https://ssl.gstatic.com/ui/v1/icons/mail/images/2/unreadcountfavicon/0.png "},

{},
{label:"谢谢你的解答~~~", input_text: "非常感谢你的解答！！！",image:" "},
{label:"看起来很不错~~~", input_text: "看起来很不错哦~~~\n谢谢啦！！！",image:" "},
{},
{label:"不明真相的~~~", input_text: "不明真相的围观群众~~~\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",image:" "},
{label:"不知LZ在说~~~", input_text: "不知道LZ在说什么\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",image:" "},
{label:"嘿嘿~~~", input_text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",image:" "},
{},
{label:"為神馬要15字~~~", input_text: "為神馬要15字，好吧，那就來標凖15字~~~",image:" "}
];
menu(items);
};

/*——————————页面右键——————————*/

//頁面右鍵分割線
page({
        label: 'separator',
        insertBefore: "context-viewsource",
        condition: 'noinput noselect nomailto nocanvas nomedia noimage nolink',
})

//EHH元素隱藏
page([{
    label: '選擇屏蔽內容',
    accesskey: "E",
    oncommand: "window._ehhWrapper.toggleSelection(); ",
    insertBefore: "context-sendpagetogmail",
    condition: "noinput noselect nomailto nocanvas nomedia noimage nolink",
},
]);

//保存所有圖片到zip
page({
    label: "保存所有圖片到zip",
    accesskey: "Z",
    insertAfter: "context-saveimage",
    condition: 'noinput noselect nomailto nocanvas nomedia noimage nolink',
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
})


//隐藏相同项。必须，不能删除
function syncHidden(event) {
Array.slice(event.target.children).forEach(function(elem){
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

//移动圖标，代替Movebutton.uc.js，需配合RebuildWhenStart.uc.js，可惜對有的圖標還是無力
new function(){

//几个扩展圖标
/*tab({
    id: "flashgot-media-tbb",
    insertBefore: "userChromebtnMenu",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);
tab({
    id: "lpt_lastpass-compact-btn",
    insertBefore: "userChromebtnMenu",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);
tab({
    id: "foxyproxy-toolbar-icon",
    insertBefore: "userChromebtnMenu",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);*/

//右键菜单
tab({
    id: "yun-player-context",
    insertAfter: "context-sendlinktogmail",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);

tab({
    id: "context-sendselecttogmail",
    insertBefore: "context-copy",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);

tab({
    id: "context-sendlinktogmail",
    insertAfter: "context-copylink",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);

tab({
    id: "context-sendimagetogmail",
    insertBefore: "context-saveimage",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);

tab({
    id: "context-sendpagetogmail",
    insertBefore: "context-viewsource",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);

tab({
    id: "frame", //本框架又不能直接隱藏，只好移動到一個安全的位置，嘿嘿
    insertAfter: "charsetMenu",
    clone: false,  // 不克隆，直接改在原来的菜单上面
});

};
