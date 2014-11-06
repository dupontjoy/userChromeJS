//2014.11.06 21:55 調整Send to Gmail幾個菜單順序
//2014.11.02 09:10 調整搜圖順序

/*——————————选中文本右键——————————*/

//选取范围内复选框的 ON/OFF
 page({
label: "复选框的 ON/OFF",
class: "checkbox",
condition: "select",
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
 var imagesub = PageMenu({ label: "以图搜图",accesskey: "I",  condition: "image", where: "tab", insertBefore:"context-copyimage-contents", image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAE40lEQVRIiZWVbUxTZxTHD60tKJgYKpaEfoDhHFVeMtlU4gbMMhrMqA6l0YKY+MnFaOJwdb7LCgJDGRXmBEUIL+pQYQ20IDBnnZOwJRo1cVncxiAGjRIq9P3e3v73obe8aRRO8kuee/I//+fec/Och+jtIVBU9Us2tDyLyzKMrs0yjK7d0PIsTlHVLyEiwSzqXx8rslvEG9uerso1OYvyelnz9hvcwPYbXosPbiCvlzXndjmLNrY9XbUiu0U8J/OMc49lW42O0txubnhbrxc5PV5our3YwqPp9uW29XqR280NbzU6SjPOPZbNzvzC4HK10dWp6fJy6k4vNr8FdacXmi4vpza6OjMuDC5/o3ly5f2oTe3OnmwTh8+NcyPbxGFTu7MnufJ+1GvNpen7glVXrVVZ7R5kGqaT0epBWosP5TUPPjO8qsk0eJDV7oHqirVKmr4v+NW3r/43XdXKjKxv9SDjGouMayyUV1mkXWKxw8DihNmDklsefNHBIv0Si/Sr7ITOz/pWD1StzMgnPwwop7vLkuZ/2mg5r7zCQvEjM8G6ZgZFv3hw/R8OjQ851D/g0PU3h6o+D9IvMlg3RetHeYVFWpOllmRJ8yf8l+5ui1Y02R6lXmSQ3OTjowY3drYz6HzMYaeJQWozg5QmBtsMDNr/4nCo26fx6/2kNjNQNNkeLd3dFu33D4gvuKtIabBbkurcSKpzIanOhdW1LlT2sai4w2J1rQtr+PyqWhcO9TJovMciuW4yP4kbKQ12S3zBXQURBRARBcQWPVSvOe9kP6hxwk9itRPVv7Mo6GGQcGYyn3DWiZ0/uXH5AYuPa51InFLjZ/V5JxNb9FDt30AQc/yBZuVZBxf3vQN+YqscOHjdjYY/GHyotyOmwgG53oHYcjv0ZganzG7EV03qp5JY7fC8W3B/K/GjRBilva2Kr7TZ5HoH5Ho75Ho7YirsSK5xoPEuizO33Nh8zo4N1XYUX3fht/880N90I+6kDe99Z5+o8eFAfKXNFqW9rSIiIRHRvMWa+sSYcstgdLkd75yyTRB10oaUGjtKb7px+R6Dy/cYVPzqxpcdLhj/ZHGi0wV5iRVRZZM10eV2xJRbBhdr6hOJaB4RkZDCUsMjC4eNkWU2yEqs04gosSKy1IoEvQ3vn7Yh6lsrIoqtUDc7YHzEQmdyInqKPrLMhsjCYRNFpob7v0BARAske+7skhWPucILrQgvHJ+GtHAcUh3PlOdN9XaU/uyCvMwKqW4c4YVWyIrHXJI9d3YR0QKaMs7FlJC3bMmRJ71hunGEHh+bNeHfjEPCr8N041hy5EkvJeQtI6JpI1xIRCGB2Y2q0KPPBxYdG8PCw3Nj0dExhB59PhCY3agiohB/eyYOG7+jRLSlY0fIwRdDwYfHEPT1y1kRfHgMIYdeDAXldOwgIgnvFTBz3gUQURARhQkz69VB+UN9gQcsrHj/S4i1Foi/moHWAvH+lwg8YGGD8of6hJn1aiIK4z1eMfeHgBeEkjx3pSDPfEy0d6hfpB0ZFe23sCKtBSKtBb71yKho71C/IM98jOS5K4kolK996z3tb9dCIpJShDKB0k5nkdqUL8gx6wQ5Zh2pTfmUdjqLIpQJRCTlta9ty5s2ERJRIPl+2CK+t2E8Ej4XwmuEczGfGQLynUjxDObRLNrxP24V8y9C9aWjAAAAAElFTkSuQmCC",  });
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
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADbklEQVQ4jV3KT0xTdwDA8XfyZAw3IzEmEBJIZNnZgxdjOJg4No+GJcQlyw47kBATxWggWcOfDav8ebwf0PKsEjpo6SxStH9oaW1LCUIYBQyw/qd9fVIqcET97qBLtn2Tz+0r2R3P7y+txD7Mx7z4Yh58MTdLqzHiG1vENza/2GJpNYYv5sYX8zAf87K0Evtgdzy/Lzmdc8r04hB9LxsRnhv0zDZiDQ2RyxVJZbKkMllyuSLW0BA9s5+fvpeNTC8O4XTOKZLD8UKofgPj4TomIhU8mrtKLB4llyuQymRIZTLkcgVi8SiP5q4yEalgPFyH6jfgcLwQks3mFKq/nb5ABXJYQomcpv/VD6xs7hLfThHfTrK6uc3Aq1sokdPIYYm+QAWqvx2bzSkkq9UhzPMGumdvMOi/xm8RiV73N4wHl1BDCdRQmrHgDl3uJnojEoP+a3TP3sA8b8BqdQhJtYyLRDbJXkFjM/EXv860kV++yf6fPzO6eYiytsXw2jp9awV+melkK7HLXkEjkU2iWsaFZDKrQivqlEoHbKeL/PF6ncPln8hFfsS8UWDQ18qgu5nxnUOs4Qw7aY1S6QCtqGMyq0ISIyahFXXK78vsZjV+jySYyxxiTxxjWp6lZ+oruifrmVhzMRnNsJvVKL8voxV1xIhJSLIihK7vc3R0RCq/z1Q0iVc7YCa3j313kQH1OgPqdVzpZaYW06Tyn19d30dWhJAGZEWk91KUD8sktRzdM50oge8xv27GHL3FqPVbTNbvUELNdM90ktRylA/LpPdSDMiKkGTZJMa8XcjeFtRQK2rwMr2uJp74AzwLLPIsuMSThSC9ribU4GXUUCuyt4UxbxeybBJSf/+IMHnaUSOXMEfPoiycYSTQQkJ7R750TL50TEJ7x0igBWXhDOboWdTIJUyedvr7R4T02CjEsPsu4s0pTOsSHa4q3uZX+PQRTk5OODk54dNHeJtfocNVhWldQrw5xbD7Lo+NQkjGh7KYDBvp8J7H4D/HbWclztVR/p9zdZTbzkoM/nN0eM8zGTZifCgL6U7bg3s2p63w1G7RLTZVt9jHdIdrWvf4/LrHN/+FX3e4pnWLfUy32FT9qd2i25y2wp22B/ekyurqC7W1F6/U1X3d8I+amvqGqqqa/6ipqW/491Nbe/FKZXX1hb8BEJLejJQjP5wAAAAASUVORK5CYII="
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

//搜索选中文本
new function () {
var items = [
//打开方式(默认当前页面)，通过where 更改，具体tab(前台)、tabshifted(后台)、window(窗口)

{label:"Google搜索",accesskey: "G",url:"http://www.google.com/search?q=%s",image:"https://www.google.com/favicon.ico",where: 'tab'},

{label:"Baidu搜索",accesskey: "B",url:"http://www.baidu.com/baidu?wd=%s",image:"http://www.baidu.com/favicon.ico",where: 'tab'},

{label:"Bing搜索",accesskey: "M",url:"http://www.bing.com/search?q=%s",image:"http://cn.bing.com/s/a/bing_p.ico",where: 'tab'},
{},
{label:"Google地图",url:"http://maps.google.com/maps?q=%s&ie=utf-8",image:"http://maps.gstatic.com/favicon3.ico",where: 'tab'},
{label:"Baidu地图",url:"http://map.baidu.com/m?word=%s",image:"http://map.baidu.com/favicon.ico",where: 'tab'},
{},
{label:"Wiki-EN",url:"https://en.wikipedia.org/wiki/%s",image:"https://bits.wikimedia.org/favicon/wikipedia.ico",where: 'tab'},

{label:"Wiki-中文",url:"https://zh.wikipedia.org/wiki/%s",image:"https://bits.wikimedia.org/favicon/wikipedia.ico",where: 'tab'},
{},
{label:"汉典",url:"http://www.zdic.net/search?q=%s",image:"http://www.zdic.net/favicon.ico",where: 'tab'},

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
{label:"mail163~~~",input_text: "dupontjoy@163.com",accesskey: "1",image:" "},
{label:"Gmail~~~",input_text: "dupont2305@gmail.com",accesskey: "2",image:" "},
{label:"dupontjoy~~~",input_text: "dupontjoy",accesskey: "3",image:" "},
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


};

