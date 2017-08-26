//2017.07.12

/*——————————标签页右键————————————*/
//撤销关闭二级菜单 By feiruo
/*var undoMenu = TabMenu({
label: '撤销关闭',
accesskey: "F",
insertBefore: "context_reloadTab",
tooltiptext: "右键显示所有历史记录",
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
});*/

/*——————————图片右键————————*/
//右键搜索图片 以图搜图
var imagesub = PageMenu({
    label: "以图搜图",
    accesskey: "S",
    condition: "image",
    where: "tab",
    insertBefore: "context-viewimage",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZElEQVQ4jWNgGMzAl4GB4T8a9iVWcwtUQxADAwMvFAdBxVqItVkQi5wgMS6B2YwLwFyCE3xhgDgZF+CluQEUe4HiQLRjQMQ7ydEI02wHtWUfkmH7iLXZDp8iXECaEs3IhtAfAAAJGiQnfMavIgAAAABJRU5ErkJggg==",
});
imagesub([{
    id: "imagesearch-sep",
    style: "display:none;"
},
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

//图片右键 复制 二级菜单
new
function() {
    var items = [{
        command: 'context-copyimage-contents',
        condition: 'image',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII=',
    },
    {
        command: 'context-copyimage',
        condition: 'image',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4jbWTLw6DMBjFfwaDmauq5QhY9C4wyQWQOA6whAtwBS6wO0xOzeKQO8REH6EUwsqWvaRpk37vT7+28AfYX8gZ8NIcIgf6GJESGAATpBqAc2ySFrgDCZACD6CKJU/oNW5Ad5SMnEdc9OQbgQp4SqA8QsyAWu6W+WZaoPhEblQ8sGxah+vFKKHdyFbFl0C4A064G6lDsmV+QIWc0o19G6xXDkbxffcJtdyNaht/0z/jKp6Hq2pWbyPDNSffIU8oJLT1X47jDR7gLDGf5CLwAAAAAElFTkSuQmCC',
    },
    {
        label: "复制图片Base64",
        accesskey: "B",
        text: "%IMAGE_BASE64%",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVQ4jWNgGAzgPwUYbgC5FmMYcBTJdA8smo4yMDAo4zIgD4oZoIrQXZYHFcNpALLp6EAZKo/XBf+RbEH3AkwjUQbg8xpBA5ABsq3o0aeMzYCZaM7GFr14XQBTgGwLyQaQAlAMoCgpDywAAF13Uxwj2+klAAAAAElFTkSuQmCC"
    },
    {
    label: "解析图片二维码",
    accesskey: "Q",
    condition: "image",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlklEQVQ4ja3NQQrCQBBE0XeDLAMuvGvuI0ECEkEIuHDhxgvkAF7DTQxDM3YULPhUTU9ND39Sh0PAh/ymKxf0YWFfmX/qgGPi2d2qIWwfKjnrOFVQeNZJdV7Y1GWhzOU5czAVnuUp9Dd1Xaidy7lbhfIuc3APP9+/9FWPxEtqHTCHhXOSY9ceI54BweNsXN5q0GL3Iy2aF4bCT+aPt4fEAAAAAElFTkSuQmCC",
    oncommand: function() {
        function getDataURLFromIMG(imgsrc) {
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
            var data = canvas ? canvas.toDataURL("image/gif", 1) : "";
            canvas = null;
            return data;
        };
        function getBlobFromDataURL(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        }
        function Deal(ffile){
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", "http://qring.org/decode", true);
            var formdata = new FormData();
            formdata.append("file", ffile);
            xmlHttp.send(formdata);
            xmlHttp.onload = function() {
                if (xmlHttp.status == 200) {
                    var data = JSON.parse(xmlHttp.responseText);
                    if (data.msg != "SUCCESS")
                        alert("错误：" + data.msg);
                    else {
                        var text=data.data.text;
                        if(text.indexOf("http") == 0){
                            addMenu.copy(text);
                            var message = confirm("识别内容:[ "+text+" ]~\n检查到为【链接】是否打开？")
                            if(message == true){
                                gBrowser.addTab(text);
                            }else{
                            }
                        }else{
                            addMenu.copy(text);
                            alert("识别内容:[ "+text+" ]\n结果已经复制到剪切板了~");
                        }
                    }
                }else if(xmlHttp.status == 500){
                    alert("错误：解析失败");
                }
            };
        }
        Deal(getBlobFromDataURL(getDataURLFromIMG(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL)));
    }
},
    {
        label: "批量复制图片URL",
        //by skofkyo
        accesskey: "P",
        condition: "select noinput",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWNgGDbgPwMDw3kGBob9ROLjUD0oBpBjKQangYGBYTsDA0MOFg0ixBjgA3WiBZKcAAMDw3yoGgdCBqADGQYGhuVQ+f8MDAzfGRgYeEgxoB1JMwyfJ8UADqghuxkYGD4zMDCsZ2Bg8MBlwHMGBob7UDyfARIOMOdqINmM1VJ0ZyLj6wwMDLeh7MMMeNIBOXg4AADwHkmSVhVYJQAAAABJRU5ErkJggg==",
        oncommand: function(event) {
            var urls = {};
            addMenu.$$('img', null, true).forEach(function(a) {
                urls[a.src] = true;
            });
            urls = Object.keys(urls);
            if (urls.length === 0) return;
            addMenu.copy(urls.join('\n'));
        },
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
        if (it.command) css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
    });
};

//图片右键 保存等 二级菜单
new
function() {
    var items = [{
        label: '保存图片',
        command: 'context-saveimage',
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAv0lEQVR42mNkoBAwUssAByAOB2IOIvX9AeKNQLwFZsBzIJYk0fLXQCwKM+A/1DURQOwMxJ1AfIeAAfeBWBHdgN9AzALEa4A4FEkxDxBrAPEZQgYcB2ILIM4F4ilImrcDsQEQewLxEXwGgIAIEL9B02wD5X9BMgSnASDFyUBcCMSbkTQzIBmiCMSnsRlgA7URZPMHIBbAE/1YXfAZqpmY9IPVgP1EpgFHdAPeA7EgJQkJlIDcSTTgJBDPYBzw3AgApMktEXd8LEwAAAAASUVORK5CYII=",
    },
    {
        label: "重载图片",
        accesskey: "R",
        oncommand: "gContextMenu.reloadImage();",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgElEQVQ4jcWSyw2AIBAF5+rNDuyE2AG9WIK1UQpVeMHLEggKLCHRSQgH9u3vAR+wzYovwMwkMZLEjogs4IAgx8ut6uQUgQVWuQNwaCt7EULawa5t3fGcdciFkFWv0UzYS7BITJW3EXKiO82AfIk5K8mdJqWN0UovbyrKj9Qb7UdupJYfIj9YalkAAAAASUVORK5CYII="
    },
    {
        command: 'context-viewimage',
        /*查看图像*/
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAgVBMVEUAAAD4+PgZGRlXV1f9/f3Z2dmfn5/09PTx8fHh4eHKysqzs7N0dHRgYGBHR0dDQ0MvLy8hISEeHh7Q0NC7u7uhoaGZmZmVlZWEhIRnZ2dTU1M/Pz8nJycSEhLp6eni4uLd3d3U1NTFxcWnp6eQkJCNjY2FhYWDg4NsbGxmZmY+Pj4UJ42CAAAAAXRSTlMAQObYZgAAAHxJREFUGNOdy8cNwzAUwFDqy3Kvcm/pff8Bo8BABjBv70D2Zp5ZNtR/RtqmrZ9Kcd7cyKAwJ9RtbX/25QJvkRHq6u5sDcSLUkvs5qonKwJIZpgTULnG03mAKqepVISF9sB7lYaw80PiKnV2devYHKNEyxW2Do+PlbwP2NcXHOgGBwDkvbYAAAAASUVORK5CYII="
    },
    {
        command: 'context-viewimageinfo',
        /*查看图像信息*/
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXklEQVQ4jaVTQQ4AMATzFq/y/49sFxIRoWiyU9eWDaIar+FLsBrwVCgqjEcmYku1Fqya0iSKvQFkgvRrJjiBBGUP5jnk3q2ClkCDzr+QmYzmIJqsJtFjvQsep22E8AGEZDOcIlQ9sgAAAABJRU5ErkJggg=="
    },
    ];
    var menu = PageMenu({
        label: "图像另存为",
        accesskey: "V",
        condition: 'image',
        insertBefore: 'context-viewimage',
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAv0lEQVR42mNkoBAwUssAByAOB2IOIvX9AeKNQLwFZsBzIJYk0fLXQCwKM+A/1DURQOwMxJ1AfIeAAfeBWBHdgN9AzALEa4A4FEkxDxBrAPEZQgYcB2ILIM4F4ilImrcDsQEQewLxEXwGgIAIEL9B02wD5X9BMgSnASDFyUBcCMSbkTQzIBmiCMSnsRlgA7URZPMHIBbAE/1YXfAZqpmY9IPVgP1EpgFHdAPeA7EgJQkJlIDcSTTgJBDPYBzw3AgApMktEXd8LEwAAAAASUVORK5CYII=",
        onpopupshowing: syncHidden
    });
    menu(items);
    items.forEach(function(it) {
        if (it.command) css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
    });
};

/*——————————选中文本右键——————————*/
//链接和选中文字(同时选中)的分割线
page({
    label: 'separator',
    insertAfter: "context-sep-copylink",
    condition: 'link&select noimage',
})
//图片和选中文字(同时选中)的分割线
page({
    label: 'separator',
    insertAfter: "context-viewimageinfo",
    condition: 'image&select',
})

//搜索选中文本
new
function() {
    var menu = PageMenu({
        condition: "select",
        label: "搜索: ...",
        accesskey: "S",
        insertBefore: "context-copy",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdklEQVQ4jc2SsQ3AIAwEbwGK1NmFDdIwE3OxCCOkZYAU+RSRMEFyIuUkN7Z5vwH4IxtQgKYoyk2RgQokICiScnlmcgWWTm1RbeikaJpFUo9J47RsEdTznYB7BfclwvgZGxCfBC4nvY8UgX1WxOJVkdUj4jp84wDU6yD4kZGU+wAAAABJRU5ErkJggg==",
        onpopupshowing: function(event) {
            var sel = getBrowserSelection(16);
            if (sel && sel.length > 15)
            sel = sel.substr(0,15) + "...";
            this.label = '搜索: ' +  sel;
            //以上4句动态显示搜索内容
            Array.slice(event.target.children).forEach(function(elem) {
                if (elem.id == "TVC-Universal") {
                    elem.hidden = !/ic.sjlpj.cn|bi.sjlpj.cn|tvc-mall.com|seculife.com|phonepartstore.com|cellzmate.com/.test(content.location.host) //可排除多个网站
                } else if (elem.id == "TVC-Back") {
                    elem.hidden = !/ic.sjlpj.cn/.test(content.location.host) //可排除多个网站
                }
            });
        }
    });
    var items = [
    //打开方式(默认当前页面)，通过where 更改，具体tab(前台)、tabshifted(后台)、window(窗口)
    {
        label: "Google",
        url: "https://www.google.com/search?newwindow=1&safe=off&hl=en-US&q=%s",
        image: "https://www.google.com/favicon.ico",
        where: 'tab'
    },
    {
        label: "Bing",
        url: "https://www.bing.com/search?q=%s",
        image: "https://www.bing.com/sa/simg/bing_p_rr_teal_min.ico",
        where: 'tab'
    },
    {
        label: "DuNiang",
        url: "https://www.baidu.com/baidu?wd=%s&ie=utf-8",
        image: "https://www.baidu.com/img/baidu.svg",
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
        label: "外网批量管理-SKU",
        id: "TVC-Universal",
        accesskey: "1",
        url: "http://ic.sjlpj.cn/Product/BatchManagementProductList?Sku=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true&IsFirstRequest=false",
        image: "http://ic.sjlpj.cn/favicon.ico",
        where: 'tab'
    },
    {
        label: "外网批量管理-品名",
        id: "TVC-Universal",
        url: "http://ic.sjlpj.cn/Product/BatchManagementProductList?Sku=&KeyWord=%s&IsNormal=true&IsDownShelf=true&IsLocked=true&IsForUpShelf=true&IsInPurchase=true&IsSupplyNormal=true&IsTemporaryOutStock=true&IsPermanentOutStock=true&IsFirstRequest=false",
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
        label: "查询/变更价格-SKU",
        id: "TVC-Universal",
        accesskey: "3",
        url: "http://ic.sjlpj.cn/PriceChangeRequest/UnChangedProductList?Sku=%s&IsFirstRequest=false",
        image: "http://ic.sjlpj.cn/favicon.ico",
        where: 'tab'
    },
    {
        label: "查询价格变更记录-SKU",
        id: "TVC-Universal",
        accesskey: "4",
        url: "http://ic.sjlpj.cn/PriceChangeRequest/PriceChangeRequestList?Sku=%s&ProductName=",
        image: "http://ic.sjlpj.cn/favicon.ico",
        where: 'tab'
    },
    {
        label: "产品分类列表得分-SKU",
        id: "TVC-Universal",
        accesskey: "5",
        url: "http://ic.sjlpj.cn/ProductScore/CategoryList?type=1&SiteId=1&Sku=%s&CreateBeginDate=&CreateEndDate=&UpdateBeginDate=&UpdateEndDate=&IsFirstRequest=False",
        image: "http://ic.sjlpj.cn/favicon.ico",
        where: 'tab'
    },
    {
        label: "产品日志管理-SKU",
        id: "TVC-Universal",
        url: "http://ic.sjlpj.cn/UserOperationLog/UserOperationLogList?ObjectCode=%s",
        image: "http://ic.sjlpj.cn/favicon.ico",
        where: 'tab'
    },
    {
        label: "关联SKU",
        id: "TVC-Universal",
        url: "http://ic.sjlpj.cn/Product/ProductAssociatedSpuList?SpuId=&Sku=%s&BeginDate=&EndDate=&IsFirstRequest=true",
        image: "http://ic.sjlpj.cn/favicon.ico",
        where: 'tab'
    },
    ];
    menu(items);
};

//复制文本
new
function() {
    var items = [{
        command: "context-copy",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII="
    },
    {
        label: "批量复制链接URL",
        //by skofkyo
        accesskey: "P",
        condition: "select noinput",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxklEQVQ4jbWTLw6DMBjFf2ZmZg5VyxGw6F0AyQWQOA6whAv0Clxgd5icmsUhd4iJPkLXEla27CVNm/R7f/q1hT/A/ELOgafmEAUwpIjUwAhkQaoROKcm6YEbcACOwB1oUskzBo0rYPeSkfOEi/4VGuAhgXoPMQdauRuWm+mB8hO5U/HIe9MsrheThDYjGxVXgbAFTrgbaUOyYXlApZzW9k2wjhwyxa+I0co9U23nb/pnjOJ5uKgmehs5rjnFBnlGKaG1/7IfLwdcLCL/I9hSAAAAAElFTkSuQmCC",
        oncommand: function(event) {
            var urls = {};
            addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
                urls[a.href] = true;
            });
            urls = Object.keys(urls);
            if (urls.length === 0) return;
            addMenu.copy(urls.join('\n'));
        }
    },

    ];

    var menu = PageMenu({
        condition: 'select',
        insertBefore: 'context-paste',
        onpopupshowing: syncHidden,
        onshowing: function(menuitem) {
        var sel = getBrowserSelection(16);
        if (sel && sel.length > 15)
            sel = sel.substr(0,15) + "...";
        this.label = '复制: ' +  sel;
    },
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII="
    });
    menu(items);
    //page({ condition:'select', insertBefore:'context-sep-copylink' });
    items.forEach(function(it) {
        if (it.command) css('#contentAreaContextMenu[addMenu~="select"] #' + it.command + '{ display: none !important; }')
    });
};

//选取范围内复选框的 ON/OFF
page({
    label: "复选框的ON/OFF",
    class: "checkbox",
    condition: "select noinput nomailto nocanvas nomedia",
    accesskey: "X",
    insertBefore: "context-viewpartialsource-selection",
    oncommand: function(event) {
        var win = addMenu.focusedWindow;
        var sel = win.getSelection();
        Array.slice(win.document.querySelectorAll('input[type="checkbox"]:not(:disabled)')).forEach(function(e) {
            if (sel.containsNode(e, true)) e.checked = !e.checked;
        });
    }
});

/*——————————输入框右键——————————*/

//快捷回复，打造多级菜单
new
function() {
    var QuickReplySub = PageMenu({
        label: "快速回复",
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
                },
                100);
            }
        },
        onpopupshowing: function(event) {
            Array.slice(event.target.children).forEach(function(elem) {
                if (elem.id == "Physics-Symbols" | elem.id == "Math-Symbols") {
                    elem.hidden = !/ic.sjlpj.cn/.test(content.location.host) //可排除多个网站
                }
            });
        },

    });
    QuickReplySub([{
        id: "QuickReply-sep",
        style: "display:none;"
    }]);
    page({
        label: "163|QQ|Gmail",
        tooltiptext: "左键: 163邮箱\n中键: QQ邮箱\n右键: Gmail邮箱",
        insertBefore: "QuickReply-sep",
        onclick: function(e) {
            switch (e.button) {
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
        label: "用户名",
        //input_text: "dupontjoy",
        onclick: function(e) {
            switch (e.button) {
            case 0:
                addMenu.copy(addMenu.convertText('dupontjoy'));
                goDoCommand('cmd_paste');
                closeMenus(this);
                break;
            }
        },
        insertBefore: "QuickReply-sep",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfUlEQVQ4jc2T0QnAIAwFb5IuUhco1C6ti5RS10h/FIIYqQWhgXxE8i7hYQACIIMZUCGA4324GiQDYj10KdopAA/cOXcDIEC0AKdqugxAuxgAdE08gJTTG4B5Jm55clkz5bcaYJqoxRpSA9pFQyydnh/9xJFjWqlM/HLOsdAehABlcm57OHUAAAAASUVORK5CYII=",
    });

    page({
        label: "常用回复~~~",
        tooltiptext: "左键: 感谢\n右键: 15字补丁",
        onclick: function(e) {
            switch (e.button) {
            case 0:
                addMenu.copy(addMenu.convertText('感谢楼主分享!'));
                goDoCommand('cmd_paste');
                closeMenus(this);
                break;
            case 2:
                addMenu.copy(addMenu.convertText('~~~为神马要15字，『汉贼不两立，王业不偏安』~~~'));
                goDoCommand('cmd_paste');
                closeMenus(this);
                break;
            }
        },
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jc2Quw2EMBBEX0ZEE9ThCsgp42LqIKYOQro5icDRVXCXDNay+GQLEfAkS/7szKwXbqQDvpWryxm8gLkiaFbtiQUYtP+XjGoWL26AD9BWdNCqtrGXPbAW0m0XqzSJCRgr0ndGaRIbEDNJFvsWpUlEIDhDew5OEKQ5uFt6CfbEN+7PXpNrucTDDPzQSvihnoZWWrmhXuMHem9Lmy9WtnwAAAAASUVORK5CYII=",
        insertBefore: "QuickReply-sep",
    });

};

//贴上 二级菜单
new
function() {
    var items = [{
        command: 'context-paste',
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbklEQVQ4jWNgoAFoZWBg+M7AwPAfir9DxUjSKIskLkusQX8YGBj48RjADzUEJ/gPpY8gOR+Gj6CpwWsAMh8bJskAdP51BgaGBkoMEMdnCDEG4PUKIQMIylFsACwdkG0AehIm2QBSFBFtAD5MHQAA8vtEFZXqsUkAAAAASUVORK5CYII=",
    },
    {
        label: "标点(中转英)",
        condition: "input",
        accesskey: "E",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAe0lEQVQ4ja2T0Q3AIAhE3y4u4zTu40DORT+ExFqtRXsJHxAPj0PhjggkDlGA4CHIIvKOiqDEz0qM0OZuLxLVxED1YQuZOrfLRJQgzc2zJkJV+SiOCEXr5kVUhcutzA5YfenPqoGZ/dqgHyfieFy5i1FT95qly48/3H+4AA6QJ51Bic5yAAAAAElFTkSuQmCC",
        oncommand: function() {
            goDoCommand("cmd_copy");
            var sel = getBrowserSelection();
            var txt = addMenu.convertText('%p');
            addMenu.copy(txt.replace(/(\s，\s|\s，|，\s|，)+/g, ", ").replace(/(\s。\s|\s。|。\s|。)+/g, ". ").replace(/(\s？\s|\s？|？\s|？)+/g, "? ").replace(/(\s！\s|\s！|！\s|！)+/g, "! ").replace(/(\s；\s|\s；|；\s|；)+/g, "; ").replace(/(\s: \s|\s: |: \s|: )+/g, ": ").replace(/(\s（\s|\s（|（\s|（)+/g, " (").replace(/(\s）\s|\s）|）\s|）)+/g, ") ").replace(/(\s—\s|\s—|—\s|—)+/g, " - ").replace(/(\s＆\s|\s＆|＆\s|＆)+/g, " & ").replace(/(\s…\s|\s…|…\s|…)+/g, "... ").replace(/(\s、\s|\s、|、\s|、)+/g, ", ").replace(/(\s’\s|\s’|’\s|’)+/g, "'").replace(/(\s“\s|\s“|“\s|“)+/g, addMenu.convertText(' "')).replace(/(\s”\s|\s”|”\s|”)+/g, addMenu.convertText('"')));
            goDoCommand("cmd_paste");
        },
    },
    {
        label: "插入BBCode",
        id: "BBCode",
        accesskey: "B",
        tooltiptext: "左键: 代码[code]\n中键: 链接[url]\n右键: 图片[img]",
        onclick: function(e) {
            switch (e.button) {
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
        insertAfter: 'context-copy',
        icon: 'input',
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbklEQVQ4jWNgoAFoZWBg+M7AwPAfir9DxUjSKIskLkusQX8YGBj48RjADzUEJ/gPpY8gOR+Gj6CpwWsAMh8bJskAdP51BgaGBkoMEMdnCDEG4PUKIQMIylFsACwdkG0AehIm2QBSFBFtAD5MHQAA8vtEFZXqsUkAAAAASUVORK5CYII=",
        onpopupshowing: function(event) {
            Array.slice(event.target.children).forEach(function(elem) {
                if (elem.id == "BBCode") {
                    elem.hidden = !/bbs.kafan.cn|firefox.net.cn/.test(content.location.host) //可排除多个网站
                }
            });
        },
    });
    menu(items);
    items.forEach(function(it) {
        if (it.command) css('#contentAreaContextMenu[addMenu~="input"] #' + it.command + '{ display: none !important; }')
    });
};

/*——————————链接右键——————————*/
page({
    label: "用新分页开启链接",
    condition: "link",
    position: 1,
    tooltiptext: "左键: 用新分页开启链接\n右键: 复制链接网址",
    onclick: function(e) {
        switch (e.button) {
        case 0:
            gBrowser.addTab(addMenu.convertText("%RLINK%"));
            closeMenus(this);
            break;
        case 2:
            addMenu.copy(addMenu.convertText("%RLINK%"));
            closeMenus(this);
            break;
        }
    },
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAZ0lEQVQ4jWNgGCyAjYGBYRIDA8NrBgaG/0Tg11D1bDADJjEwMOxmYGAQJ9JCcaj6VpjAaxI0IxvyGsb5j0chXjkmEm3FABQbwIJDHN3ZyHxGYjQQLTfwYUCMAVj9TDUXwEzHF1C0BQCpARnHXF2p+wAAAABJRU5ErkJggg=="
})

/*page({
    label: "VIP视频云解析",
    condition: "link",
    position: 2,
    tooltiptext: "左键: 紫狐\n中键: 无名小站\n右键: 迅雷",
    onclick: function(event) {
        var url = addMenu.convertText("%RLINK_OR_URL%");
        if (event.button === 0) gBrowser.selectedTab = gBrowser.addTab("http://yun.zihu.tv/play.html?url=" + url);
        if (event.button === 1) gBrowser.selectedTab = gBrowser.addTab("http://www.wmxz.wang/video.php?url=" + url);
        if (event.button === 2) gBrowser.selectedTab = gBrowser.addTab("http://vod.xunlei.com/iplay.html?uvs=luserid_5_lsessionid&from=vlist&url=" + url);
    },
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVQ4je3RIUzDQBjF8V9CMotEoTCYufopBBqLx1ZOYiZn0JVIVC0WXTuJm6mqmpmY6Dt2CYIESXjJ9a7/vn7fvTv+hJ6wRocPTNhnfg+fcMCA1/gfsIIjtmgLiC5SfIPrsCZsiz6F58cvNcInbgJKhBHPlXEd3xgPLLGTnPeBh2T7qh7tMz/GI76+VH+p4JBd1NHK+1A16Mzn5iod7n4KXGmVfy4LaALawAVus7s260W+tYn3reHS+Wom8wF1Gbtkn/AW77+iE6SaONczlmqVAAAAAElFTkSuQmCC"
})*/

/*——————————页面右键——————————*/
//多功能菜单
new
function() {
    var items = [{
        label: "复制标题&地址",
        accesskey: "C",
        onclick: function(e) {
            switch (e.button) {
            case 0:
                addMenu.copy(addMenu.convertText("%TITLE%") + "\n" + addMenu.convertText("%RLINK_OR_URL%"));
                closeMenus(this);
                break;
            }
        },
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoAH4jwc3EGsALvHr+AxBtgmXvDg+Q/6j0fgswKqGkAHY1OI1AFsgkmTAMHPBQnIMoMgFxGDiTCVFDdk2UwQArSlPm8iO15EAAAAASUVORK5CYII="
    },
    {
        label: "Favicon|Base64",
        tooltiptext: "左键: Favicon地址\n右键: Favicon的Base64码",
        onclick: function(e) {
            switch (e.button) {
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
        tooltiptext: "左键: UTF-8\n中键: Big5\n右键: GBK",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlUlEQVQ4ja2TwQ2AIAxF3wau4QCuwCxcPTKMI7iBO7iCA3BiArxUJaSCik2a0NL/+1MK/Gg9MAMBiDcepKbXwB4Yga7QpJMan5PMcvHUnGBOC5XOmpKQJuILsIpJg5VraA7Y5OwBWyMYBHScYxb7JwSpAs1NiWDimq6RvE3ipabAiMyoKCnOoPkZmxepeZUPks+f6bPtGg1LLkKBszsAAAAASUVORK5CYII=",
        onclick: "var code = ['UTF-8', 'Big5', 'GBK']; BrowserSetForcedCharacterSet(code[event.button]);closeMenus(this);"
    },

    ];
    var menu = PageMenu({
        label: "多功能菜单",
        accesskey: "M",
        condition: 'normal',
        insertBefore: 'context-openlinkincurrent',
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAABBJREFUCNdjgID6fxCaIBcAcUwEeC1dweYAAAAASUVORK5CYII="
    });
    menu(items);
};

/*——————————书签右键——————————*/
/*为书签右键添加 移动 功能*/
page({
    label: '移动...',
    accesskey: "M",
    insertAfter: "placesContext_newSeparator",
    command: "placesCmd_moveBookmarks",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPklEQVQ4jWNgGCrAjoGB4ReUptgQf3yK/hOJyXIJUS4gpNmBHM1k20aWP/0p0WzHQHws0MYFMOBADUOGEAAAtLMgYRGzlKoAAAAASUVORK5CYII=",
})

/*——————————移动图标和菜单——————————*/
//移动图标，代替Movebutton.uc.js，需配合RebuildWhenStart.uc.js，可惜对有的图标还是无力
new
function() {
    //几个扩展图标
    tab({
        id: "imageSearch",
        //黑螃蟹的UC脚本, 右键可上传再搜索
        label: "相似图片",
        condition: "image",
        accesskey: "Z",
        insertAfter: "context-sep-copylink",
        clone: false,
        // 不克隆，直接改在原来的菜单上面
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
