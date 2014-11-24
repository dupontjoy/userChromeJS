//2014.11.24 22:25 調整圖標
//2014.11.23 15:52 修正百度搜索，torrentkitty搜索，灌水图标
//2014.11.13 21:50 新增『保存所有图片到zip』和『横排菜单』，调整菜单顺序，调整幾個conditions
//2014.11.06 21:55 調整Send to Gmail幾個菜單順序
//2014.11.02 09:10 調整搜圖順序


/*——————————标签页右键————————————*/

//撤销关闭二级菜单 By feiruo
var undoMenu = TabMenu({
    label: '撤销关闭',
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
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAABDklEQVQ4jZ3SPShFcRjH8Q8JN2IgI4pJorxkMJDNYlE27AZWG4vBJoOymewMshtsdzHIQilKUl7SDde9hnNuTqdzLuc+9UzP8/2e/uf3kFyNWMVwyrxqNWEddxjPCuewiQJeMJYFbsU2PlDGM0b/C7dhF58hXA5FR9jDBhbQh/o43IV9FCNwUhdxgx30RwWHKP0BxzuPiYpgCbcZBWWco7cimcV1bKGEJzziPUHwja3oU2ZwFVl4xTwGMYUVHMdkl/EfOokLvzGOxOY5LOI+3CnEBQTHk8eb9ENaw1fYiTWEU+mn3C2I9CFNAD3oTJm1CFI4qSaoVu04w3KtggEcoKMWuA5zmK71682CeBvgB+93YAIjVuYDAAAAAElFTkSuQmCC"
});

/*——————————图片右键————————*/

//右键搜索图片 以图搜图
 var imagesub = PageMenu({ label: "以图搜图",accesskey: "I",  condition: "image", where: "tab", insertBefore:"context-copyimage-contents", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAClklEQVQ4jZ3LXUhTcRzG8R/SzcCX1cwdJxUU1lGptWNyYBcymuxicaBtChnVTdSWppkmglAo+NIL3aUURtOQypBALUJKV5oscn85etrmTjkcnAXuxluh9OkiERMp6gufu+chj8cjVVRUXPwfHo9HIrfb7U2lUkgmk/8klUrB7XZ7yeVy+TRNw+hDE8YeZa/bjTH/L+P+HIz35iDQa0Sgz4h3fUaM9e6FpmlwuVw+kiSpKpFIYLLfhM/DuVuYEB4xIfIqb0N4xITgs31IJBKQJKmKnE5ndTwex4PrZkw+LsLCm/0b4m8PYDGQDy1YiG/sCLRgIRYD+ZCHecTjcTidzmpyOBw1qqqiXBRxtrQU/W3HoE0UQJsoQPJDEZaYgJXlcqytnsfKcjmWmIDo6FGoqgqHw1FDdru9NhqNwpqXByfPo1IsQVeDgBd3i/HpeQkSH49jbbUJwDWsrV7FcqQUXwMliEajsNvttWSz2eoURcElZwauSDrUn0zHjTMcWs6Z0H5hD3paDkL7cgI/vp9GcuEUhu6bMdx9CIqiwGaz1ZHVaq2XZRkvu7Mx0av/XZ8eU/16sCED5t8bwYYMmOrXY7QnF7Isw2q11pMoig2MMbR5DWj3ZqDDm4kOXyY6fVm4WZWF2zV6DNzbhddPszHQZcCd2p24dZkDYwyiKDaQIAiNoVAI09PTmJmZwdzcHMLhMObn5xGLxaCqKmKxGCKRCBRFgSzLYIyBMQZBEBrJYrFUms3mpq38fj82225jsVgqabt4nm8eHBzEZjzPN2873i6O41qDwSBmZ2cRDocRCoXAcVzrnz47iMhIREVEVKzT6TrLysqebKbT6TqJqJiIDhMRt/7ZKI2I0okoh4hMf2Fc36YREf0EAAD4l7KonoMAAAAASUVORK5CYII=",  });
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

//复制图片Base64
page({
label:"复制图片Base64",
condition: "image",
accesskey: "B",
text:"%IMAGE_BASE64%",
insertAfter:"context-copyimage",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaElEQVQ4jaXSMWvCQBgGYP+Oo3/AJTiImxBcXJwcXMQ1f0A3XTPomul06aQFtwpmUTFQSjPESJBETAg5CNf6dig5c0mt0H7wDkl4n/sCV8AfppAeANg7PsjuiNnmAG1tQl0aUJcG+tMV+tMVlMkCymSB3pCgNyQiAgBkd8Te8WF7EdyACrG9SMhg7qHRHd0QAJhtDnADipfDNZfn90+eM71iMPdEBAC0tYmQxr+WE+BMrwhpjHpLuQHq0ngIPL1+8DwE2mML7bHFy8kzMRiIwfJAf7riQLacnJq817bfQFXu5IF0Ob0yMRi0LePfbS8SAWWygBtQYd17ZVVnsL0IUq35M5D952xZ1Rmsky8CvSHhQPbkJElZ1RlM54JyRRaBkMZ3gXRZ1RncgIpAozvC/s1GSOPc9bVOPo/pXOAGFGt9g2JJEjdodEc89ZaCektBVe6gKncg1ZqQak2UKzLKFRnFkiTeg//MFydmWVqZ/5x7AAAAAElFTkSuQmCC"
});

// 替换 openImgRar.uc.js。 打开图像RAR
page({
label: "打开图像RAR",
accesskey: "R",
insertBefore:"context-saveimage",
condition: 'image',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACcUlEQVQ4jZXIXUtTARwH4L/iGEeGe0Eny3JTnMbU9qLMvZwdt7Gpw+bO2YLNedzUFR5qLRhmsJY2xGrY8VxmBIaRJdhV9gGK6CKLvtKvmxyCmHjx3DwkimJfIZ/fWJyfv5RCPr82G4+3U2xqaivF81itzWFNnsfa9okc1rdzWC5mkEokkE2n8aBUQjKRQIrnkeJ5TEQiSxQJh5Xi4xnsHiew+1NoeHucxPs/aXz4nUNBSuF+8R52dnYgJBKYid9EfHoawUBAIi4QUKLRIMIR9oxYwo9XX2fw7lcaez9y2D9ewu73Obz5lkF2MQa/xyORd2xMCQeDOM/0LS+kmh/ll1Gsv07i7gaL5Zof0UkW7pERiUZdLoX1+fA/fq8XoihClmVwLAu/1wvW54PTbpdoeHBQGXW5cJHZTAayLMPjdjfOZrNJNGC1KsNDQ7hIKplEvV6H0+FonNVqlcjS3a1Y+/pwHi7iQOFRCKtbKSj7RdyphLH4kMMNx3Vc6+qSyGQyKRazGT0Wyxl25wCefZpE/UsEtUMOTw85rB8GUD3ww+nrhclolKjdYFCCQj+ef46gfjSB+tFkw4ujCJ4csLCNXgHLBrCysoLOzk4Y9AYYOzqg1+sl0mg0ik6nxVjsKkLpHoQy/6R7EEpb0O8wQq/XY2FhAZubm3C73dBqtdBptdBoNBIxarXS2tqKEwzDgOM48DwPQRAgCAKy2SwqlQqq1SrK5TKSySTMZjPUarVELS0tikqlwmlqtRoMwzTodDqIoohSqYTx8XEwDAOVSoXm5maJiEgmIlykra0NdrsdTU1Np/82EZGHiPaJ6OMl7RFR718Ge5uCNFZveAAAAABJRU5ErkJggg==",
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

//选取范围内复选框的 ON/OFF
 page({
label: "复选框的 ON/OFF",
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

//搜索选中文本
new function () {
var items = [
//打开方式(默认当前页面)，通过where 更改，具体tab(前台)、tabshifted(后台)、window(窗口)

{label:"Google搜索",accesskey: "G",url:"http://www.google.com/search?q=%s",image:"https://www.google.com/favicon.ico",where: 'tab'},

{label:"Baidu搜索",accesskey: "B",url:"http://www.baidu.com/baidu?wd=%s&ie=utf-8",image:"http://www.baidu.com/favicon.ico",where: 'tab'},

{label:"Bing搜索",accesskey: "M",url:"http://www.bing.com/search?q=%s",image:"http://cn.bing.com/s/a/bing_p.ico",where: 'tab'},
{},
{label:"Google地图",url:"http://maps.google.com/maps?q=%s&ie=utf-8",image:"http://maps.gstatic.com/favicon3.ico",where: 'tab'},

{label:"Baidu地图",url:"http://map.baidu.com/m?word=%s",image:"http://map.baidu.com/favicon.ico",where: 'tab'},
{},
{label:"汉典",url:"http://www.zdic.net/search?q=%s",image:"http://www.zdic.net/favicon.ico",where: 'tab'},
{},
{label:"torrentkitty",url:"http://www.torrentkitty.org/search/%s",image:"http://www.torrentkitty.org/favicon.ico",where: 'tab'},
{label:"Kickass",url:"http://kickass.so/usearch/?q=%s",image:"http://kastatic.com/images/favicon.ico",where: 'tab'},

];
var menu = PageMenu({
condition:"select",
label: "搜索选中文本",
accesskey: "S",
insertBefore: "context-copy",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC"
});
menu(items);
};

/*——————————输入框右键——————————*/

//插入code代码
page({
    label: "插入code代码",
    condition: "input",
    accesskey: "I",
    insertAfter: "context-paste",
    oncommand: function() {
        var str = addMenu.convertText('[code]%P[/code]');
        addMenu.copy(str);
        goDoCommand('cmd_paste');
    },
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACS0lEQVQ4jZXR30tTcRjH8f07IgRB0EUXYYgkSYapF91E0I03XhzIOJKaw4tgGEKHE7RpLH/BtNl0Q9fWkgwKJgqHGYohgo35azvn7MzNc87k3YW6H6hBDzwXz/OFFzyfr8NxVm29Mbm9b5F/dVtvTHZcVa09MfZ1mz3dYlezSKkWKdUkmTntP2mT1p4YD198uRxp6Y5yoNtEEzphRSO0qhFYVvHH0/h+HpLMmLT3LdLSHaVFjFxEmrvCHGZtFn9liSR0FhSN4KrGp2WVj/E068l86ZTmrjD3ny1UI01CiLRhs7RhXIpspApVeTQJIe4JwTLS2DlLxrD58Tt3KbKZKiAOKzz3KAyMrzEwlqCxc5YS0NDhR80ViW8dXYmcn3OeSUOHvwx0vxrH6/USjHwnvnVEILyE1+vFP//tAuKPp0lmTO489Z0Cbrdb9ng8FItFPB4PK9t5Kuep4NcqJLCsklJNbj+ewCFJkixJEqZpIkkSM6EYys4x03NRKvcTM5ESElrVSKkWtx59wOFyuSgUCrhcLkLzn1lPmawlTZSdYyb981S+n2cSVjR2NYubbSM4+vv7ZafTiaZpOJ1OJqfnWE+ZjE3NUbkfmQyUgo0mdPZ0ixsP3p1mIIqiLIoihmEgiiKbexaVs2d0+sLv7Os215veln+h/clLBEHg/biPrQOL4VEfgiDg9vpQdo5Z2c5XIQe6zbW7b8pAbf0QucIJxllnCyfo+RP0fBHtqIh6VETNFckYNmnD5jBrU1s/VAZq6gblmrrX/F8Pyn8BzRewGKfber0AAAAASUVORK5CYII=",
//限定只在kafan生效
  onshowing: function(menuitem) {
    var isHidden = !(content.location.host == 'bbs.kafan.cn');
    this.hidden = isHidden;
},
});

//快捷回复
new function(){
var items = [
{label:"用戶名(1)~~~",input_text: "dupontjoy",accesskey: "1",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABbElEQVRIia3Wv0scQRjG8Y+Q2CSNokmZQhTT6B+hfYiQ1mAjkYhWAdtgp7UYIQkR9H+QBAMpbFLlCtMIGvwZEJPOoBfOFDN7mGW525u7B55qZ5/v7rwz7wzNdR+T2MJB9Baex2dtqQdvcImbnC+xht7U8C68Rq0gPHMNi3FsyxrAfoPwzD8wmAKYQLUE4C+epQBmS4Rnnk8BvGwBMJcCeILrEuFVYTpb1iAOSwCOMJQCuIONEoBN3E0BwBh+NQj/jfHUcMJfLCnebDUsxzFtqQ9fCgA76G83nNAG1gsAHyS2iNt6gCmcFAD28FRis3uEBXzDVUF45j/4ilfxnaa6h2nsatxFiwr+HTManBH9eNfki5v5WqjXw3x4N1baCM57LWbWNYzTDgLOYmZdo7joIOAiZtbVi+0OAj4rWL7DeItj5U6yvKvCfnmPx/nwTN0YEZbqKj6iIpzNZziP/ilcXyr4JNw8XsRp+a+4/wCW1xLWbMWACgAAAABJRU5ErkJggg== "},
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
var menu = PageMenu({
label:"快速回复",
condition:"input",
accesskey: "W",
insertBefore: "context-copy",
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASZQTFRFq2MmrGUpxZNqyJNP+e/P////wIlcUFBQnp6eoaGhoZmSrY51sJN6UFBQVFRUWFhYXl5eY2NjampqcHBwd3d3fX19hISEioqKkJCQlZWVmpqanF8mnpmWnp6eoaGht3k6uH5MuoFRwY5kwpJpw4tGxI9gxY1JxZRlxpFNx5NWx5dryJNRypZWyptwy5hRy51szJlSzJpRzJ51zp9ezqF5zqR8zqqL0qd/17uk37iD5NfM5eXl5rgl5rgn5rs/5ubm5+fn6L046Ojo6enp6uLc6urq6+vr7Ozs7e3t7u7u7+/v8NSm8PDw8fHx8sMA8vHx8vLy88so89BC9NBE9Nmf9eTI9ebV9uHA9u/o+OrC+OvC+eO8+ePL+unX/Pv6/f39/vz5////ByadbwAAAA10Uk5TAAAAAAAAG5aWlqHFxQD6C4kAAADMSURBVBgZBcFNS8NAFIbR595MaqEbrQa6UgSFFhVCdy7Fvy3uFUQQBHEruAmkNqHkg8y8nmN5KACAagAInD0AAM/VCAQiPwlNXG1UjwlHmLvlgeXqZm4WEJ5w0vC97tNX7wjLPLPV57qbFudZQBhQfJRd3LUzOcLMlu9lF+v9tEmOcDt523axbuLtE45wey3HWDfj3ZFwhP0Vi3l76MsdwhHZdBHttN3uDREQVJd1/XvfGIiA0PiSFdcHJ6EUkB8/GgDgkuU+AwAAxuEflNBc+frSdwMAAAAASUVORK5CYII=",
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
menu(items);
};

/*——————————页面右键——————————*/

//保存所有图片到zip
page({
    label: "保存所有图片到zip",
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
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABvklEQVQ4ja2TX0/TABRH74day7rus2yMKYxtPsGA+W9jY30TBLds+kkkilajQQiMCdEYozHEQMZYltq0abasHB8khpqYEuNN7uM593eTe0X+Vxm34tTycWp5nZWcTjWnU83qVLIxrgX/OHqCdfgYEWHQadE/aHHebnK236Sc0f4uuTpZRAAQESrZGMuzMcoZjVJGozSjcX86yr3pKHdvRrlzY+KXtJaPc3Fxge/7AYHnebiui+M42LaNZVkMBgP6/T69Xo9ut0sxrSK1vI7v+ww6rYCgu9fkdLfByU6D7+/qHG/X+fb2EV/fbPDl9QafX61TnFKRlZzOeDymf9DCNE1EBNM0Q+FPL9dZSqlINaczGo04bzcREQzDQERC4Y8vHrKYUpBqVmc4HHK238Q0TQzDwDTNUPjD1hoLkwpSycbwPI/uXjBBGHz0fI1CUkGWZ2O4rsvpbiOQIAw+fLZKIRlByhkNx3E42WkEEoTB7zdXmU9EkFJGw7bt3zsbhnEtuLP5gLlEBCnNaFiWxfF2PZAgDG4/vRSIiFw9z9vpCYppleKUylJKZTGlsDCpUEgqFJIR5hMR5i773972j/oJpN863VzIDcsAAAAASUVORK5CYII="
})

//Firefox 31+ 横排菜单，在链接上和非链接上不相同
var openMenu = GroupMenu({
    label: '打开...',
    condition: 'noinput noselect nomailto nocanvas nomedia',
    insertBefore: 'context-sep-navigation'
});
openMenu([
    {
        label:"复制文本+链接",
        text:"%RLT_OR_UT%\n%RLINK_OR_URL%",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABlSURBVDhP5Y5BCsAgEAP3i/1AP+D/zxUlwWBXXQueOhAQzQStcN3p2UmVFK80C7QGH1aEBniOBPqhgRnsQB8P8KzRe+i/+YHCO+htQNPjdaB/G4D6hoWekFzQohfUxngSg4pglgGUsQ0ZR4jGSwAAAABJRU5ErkJggg=="
    },
    {
        label:"在隐私窗打开",
        oncommand: "openLinkIn(addMenu.convertText('%RLINK_OR_URL%'), 'window',{private:true});",
        image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKDSURBVDhPpY/PT5IBGMffWl76ceiS62/wlrc6uLmZM81MZ3noQik4NAWRVwXlVSbKDyEFcgoCyoshIvgCBpgS/siUhbnWDJrKVnaouS5tuTaX3wSxVrfGZ3sO3+/zPN89D5Ex7+dYWDLmIC1TsNnDWfcE1nNpeaS9Z5NeWv5NG4/aPgmorNSfr3s4LpHLmB2VwrdHSdzzkg7XnFw2tddNORL1XCtVWjpyIbVI4FRVlekOIWoxf9OrbTutLVN+Ra/747RrEevRGOKxBCJrb7EQjiL8PAqvZxljRgbdEttuC98alIrpN8Imy1dCKuRtzljb4PFE4A+sYdL5Cl7fOywuJ7C1vYf1jV3Q9ig02gUo+2ZgMc2ANnvAOLzoEo1uEWTTSCjgCYHqdO1z6wyb1dVKe3XNwCdZz1OsvExgdi6G+kYbbpdLP5RXiO13q+TxRsHYvscRAMk3LxKcmpHBee8c+Pwh6/FvBEFR1GkuVxN1Tm2AtkXAYqlepFspamuVTveoDZwHRjnRyeM8spscUPe5v3d1jTvb2x1ikcjWIBQ+DtH0KsasyyBJc0AgsDaQJH3UM3mUPU9+aLqNP0tKNFeIyMR1yNuaj35aQv/AM6jVfgz0B6HRzIJhXqdKqz32FQpfynfRDBo4en/qnN1wGZrvV3iFvNGVCQsDxrWEadcaBnU+hIIRzPtXYTYEwbgjmJ4MY9xgB9nYHyss1Fz+HWAWZyM3l53FZg2ppGLDZ73Scqjo0B1IWofjEnI4rujQHuh6DYedpPZLDUurLi7uvZhaTnISkJZEQYHqUlmJquhmkfJaXh51Jlm3bsivJr38fFl2euwP/wb8NxkH+HU5mQVkBkH8AgvRfy93EDdrAAAAAElFTkSuQmCC"
    },
    {
        label: "在 IE 中打开",
        text: "%RLINK_OR_URL%",
        exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
    },
    {
        label: "在 Chrome 中打开",
        text: '%RLINK_OR_URL%',
        exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe",
    },
    // {
    //     label: "在 Opera 中打开",
    //     text : "%RLINK_OR_URL%",
    //     exec : "D:\\Program Files\\Opera\\opera.exe",
    // },

]);


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

//移动图标，代替Movebutton.uc.js，需配合RebuildWhenStart.uc.js
new function(){

//几个扩展图标
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
    insertBefore: "context-copyimage-contents",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);

tab({
    id: "context-sendpagetogmail",
    insertBefore: "context-viewsource",
    clone: false,  // 不克隆，直接改在原来的菜单上面
}
);


};

