// ==UserScript==
// @name          QuickOpen.uc.js
// @description   QuickOpen 快速打开指定文件夹
// @author         Runningcheese
// @namespace   http://www.runningcheese.com
// @include        main
// @license         MIT License
// @compatibility  Firefox 29+
// @charset        UTF-8
// @version        v2016.01.05 
// @note            2016-01-05 版本V1.0
// @homepage    http://www.runningcheese.com/firefox-v7
// ==/UserScript==

//载入脚本
function jsonToDOM(json, doc, nodes) {

    var namespaces = {
        html: 'http://www.w3.org/1999/xhtml',
        xul: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'
    };
    var defaultNamespace = namespaces.html;

    function namespace(name) {
        var m = /^(?:(.*):)?(.*)$/.exec(name);        
        return [namespaces[m[1]], m[2]];
    }

    function tag(name, attr) {
        if (Array.isArray(name)) {
            var frag = doc.createDocumentFragment();
            Array.forEach(arguments, function (arg) {
                if (!Array.isArray(arg[0]))
                    frag.appendChild(tag.apply(null, arg));
                else
                    arg.forEach(function (arg) {
                        frag.appendChild(tag.apply(null, arg));
                    });
            });
            return frag;
        }

        var args = Array.slice(arguments, 2);
        var vals = namespace(name);
        var elem = doc.createElementNS(vals[0] || defaultNamespace, vals[1]);

        for (var key in attr) {
            var val = attr[key];
            if (nodes && key == 'id')
                nodes[val] = elem;

            vals = namespace(key);
            if (typeof val == 'function')
                elem.addEventListener(key.replace(/^on/, ''), val, false);
            else
                elem.setAttributeNS(vals[0] || '', vals[1], val);
        }
        args.forEach(function(e) {
            try {
                elem.appendChild(
                                    Object.prototype.toString.call(e) == '[object Array]'
                                    ?
                                        tag.apply(null, e)
                                    :
                                        e instanceof doc.defaultView.Node
                                        ?
                                            e
                                        :
                                            doc.createTextNode(e)
                                );
            } catch (ex) {
                elem.appendChild(doc.createTextNode(ex));
            }
        });
        return elem;
    }
    return tag.apply(null, json);
}


//定义按钮
CustomizableUI.createWidget({
    id: 'QuickOpen',
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: '快速打开',
    tooltiptext: '快速打开指定选项',
    onCreated: function(aNode) {
    aNode.setAttribute('type', 'menu');    
        
 //定义菜单      
        var myMenuJson = 
                                ['xul:menupopup', {id: 'QuickOpen_pop', position:'after_end'},
                                ['xul:menuitem', {label: '我的电脑',oncommand: 'QuickOpenMyComputer();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAApElEQVQ4jcWTIQ7CYAyF/0vgOQH6T/p9DskNCJ5wAySWC3CDSSQnwHCB+XkQc7ghRlAbWcIymlS99jXt60tpilBnagCbiDgAhXoDHp+inPMcWEbEVj0C55RSAmq16csEXNRnJ9hO721Wm6SWveAkBED1X4IxNL7/ukKvzkNV6PyBSQm+XngIwQJYATtbDxTAFahGkTHnPFcjItYRsVdPb/+UQP0CUEY7Z3H6hLEAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '搜索文件',oncommand: 'EverythingSearch();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHklEQVQ4jcXSv0qdQRCG8d9JUmghpBC2sNAIEqshl5D6kE7bkC5WFoJg5zVoAmntRbDJn5sIBEcQAhpIkcDBwkqMGNBmj24+j8Qm5IVlmZnnnZ2B5X+r1wYR8RSf8OQO/hv6mfl1mHjQAdY65kusY6XGs5W5PUFEPMZPjNfUL7zEexw0jc8wlZkn3QleNWZ4kZk7mMJekx+vLHhYX+9hC5MNOFFK+ZyZR6WU49aEmVLKu8FgcD3Bc8z7U8/wIyIW8aFTm6+e6wav3dYmVrGNsRH1JXhUg/4IYGNErlW/bfAbM5n5/S8mEBHT+MLNCvu4qMXL7t2eyp8jqf8gIt7iEG8ycwjd9XoPy5jLzOXhCrv4iI2IuM8Wp1i4D/jvdQWgm0n7Gn2U7gAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '音量控制',oncommand: 'QuickOpenVolume();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWUlEQVQ4jWNgoCFQZmBg+E+pZlwG4DUcJolNEbLByoQ0MyAZgFfjfzSsjCbHgEUcwwBy5EgyAN2VKAGMbAC6M4l2AUVhgAzIigV8hpCcDrApxCdPlEsGOQAAKY8zgtP7s6EAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '任务管理器',oncommand: 'QuickOpenTaskMGR();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlUlEQVQ4jWNgoAJYzsDAcB8H/o1Hbj/MgP9E0q/RaJg4w38i8Gso/R6Nz8DAwMCwnoGBQQEHtsEjNxlmwHEGBoYEHHg2HrnNMAPmM5AHGogxQANZITkGMDBAAuw01DCyDNjMAAnx7wwMDA7kGFADNeA6uS7QgOLzUMNINgDZoBxKDEAHcAM2M0AyBjb8Ho/cYTItRgUAX/dLM5/IfscAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '配置文件夹',oncommand: 'var canvas = Components.classes["@mozilla.org/file/directory_service;1"].	getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).launch();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '脚本文件夹',oncommand: 'var canvas = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '图像文件夹',oncommand: 'QuickOpenImages();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '火狐根目录',oncommand: 'QuickOpenApplication();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbUlEQVQ4je2Syw2AIBAFJ1ZjD1RgJbRhtVSBWS/rj2UjqEcn4fKSN7wQ4CMmIAFyOknzJhIQiixo3iwYK7k4x6zzBB5m3Wb1bqwtkFJQvsHdAiPoRQCGB8ULv+AQLEDs6EXt7MxApv0jZe28ZwV+VzP4VojXiwAAAABJRU5ErkJggg=='}],
                                ['xul:menuitem', {label: '管理所有书签',oncommand: "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');", class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATElEQVQ4jWNgGGzgPxZMkmZSxAnaTAzGsOEomoKjxLj6P5oAKWEwXA04ysDAYMWACFCSDJjFwMDADmWzQ/kkGUAqoI4BMAbZKZEiAAA7FFJDJW1v5AAAAABJRU5ErkJggg=='}],
                               ['xul:menuitem', {label: '清理浏览缓存',oncommand: 'Cc["@mozilla.org/browser/browserglue;1"].getService(Ci.nsIBrowserGlue).sanitize(window);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAb1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABt6r1GAAAAJHRSTlMAzVQUwp9BDPLTp3dwPDUsGPvn39vHtauPh35sZlxMJB736yg/5R5gAAAAhklEQVQY01WPVxLDMAhEJatb1b07TsL9z5goGmckPoB5DAuL7InKoE1VAkLBlESMsKKD8QzVMDagLpITaB3u/mIPCdJRExg+Eqjgyac1Tli/RRDaap5jcxIv02k9/WoY6J6WNPsmvyGLb92BI4H2HrsbvJWovegyF2a5XrhwpTS2hSW+pNc/dQcGVNn7bGYAAAAASUVORK5CYII='}],
                               ['xul:menu', {label:'常用快捷工具' ,class:'menu-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAWlBMVEUAAAAFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQWTkVvkAAAAHXRSTlMA6d9MO3AH5EYWx35UHfOrlIhbIw/SzcE2K7imaPunRqwAAACNSURBVBjTRc9bEoMwCAXQC+Qdo9a3bbP/bXY0Js1HgDPMALC9DaMYtJeNV3pnadAv169oqsAznCU5aX7gLSClCPHzQBwLGDoLJPJiSQA9FMBrX+5oOOf8vYXbhJm7Kxxhc3fdjWxRMh6u1k0fdWWTAb0uzv8vgHBCJNcgDZOKkFBBr5Q8db5HEwZcoPwDuwwFSyeXYhMAAAAASUVORK5CYII='},
                               ['xul:menupopup', {},
                               ['xul:menuitem', {label: '删除Cookies',oncommand: 'window.openDialog("chrome://browser/content/preferences/cookies.xul");',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2UlEQVQ4jbXTLVYDMRQF4E9VdANdQA1mXN0sg0VgkcgxyJpqloDCsodYJA5ThRqDQORNG6bJ8HMO95yIebm5k3vfC/+ADe6RMMZKGGJvEdc44oAe61h91I7BaR5+wy6+E65mnC44FyKbUO+K2hNuKj/qgvvFzoD9jHiHh8Zt93JOJyTZZ4kerw2BPs6cMGI1I62ivq0ITHuLAmRrI55x65zRGu8lsWZhwlYO87G49oWFQe7zT3EwC7HWxhaqbeQ8SEsizUEqRf48yhOmx/SCDzntFLVvH9Ov8QntGzLFRkqKRgAAAABJRU5ErkJggg=='}],
                               ['xul:menuitem', {label: 'About:about',oncommand: 'var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("about:about"), x); ',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcBAyJD/SDQyxiaG1TJ8LiBKLdUMIBSdtHcBxQbgczp9XECRAaRg6gAArMpGck8h/nAAAAAASUVORK5CYII='}],
                               ['xul:menuitem', {label: 'About:config',oncommand: 'var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("about:config"), x); ',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcBAyJD/SDQyxiaG1TJ8LiBKLdUMIBSdtHcBxQbgczp9XECRAaRg6gAArMpGck8h/nAAAAAASUVORK5CYII='}],
                               ['xul:menuitem', {label: 'User.js',oncommand: 'QuickOpenUserjs();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAR0lEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcBAyJD/SDQyxiaG1TJ8LiBKLdUMIBSdtHcBxQbgczp9XECRAaRg6gAArMpGck8h/nAAAAAASUVORK5CYII='}],
                               ['xul:menuitem', {label: '打开隐私窗口',oncommand: 'OpenBrowserWindow({private: true});',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAxUlEQVQ4je2SoRWDQBBEv4uKuRdHBTSApYHoayESi6UCGqCAeHSaoAQ0PpKImyX7TuSFxDLvnbiZ2d2bBTjwD4oLnPcW3YAWGIAJWN15iLf7DNzlj0DtG61ADzQSQjakcy+sxPXAqNp3o19iAEXe6CnymkXrnKdz/CRvCSy+kQk2Icq0ijO+lGZ8VLwNLSkzEmc3vdbxy47yDqS9bgiu6FtY85ALlYRGiz8pSquppbig+8fBJem/sRiLnj+QPojxo7wHduAFpJg+LUHrl0wAAAAASUVORK5CYII='}],
                               ['xul:menuitem', {label: '历史记录',oncommand: 'PlacesCommandHook.showPlacesOrganizer("History");',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgoDaQlZU9LCcn9x8XlpWVPYzXAKhCGxxyNnJycv8xJGRkZB7isxUXlpGReYhhOzHexKmOqgbAnIdOE20AjI1OjxpAggEUxwI+QDsDCOVEJHwEpgcAQdpq5UW7wZYAAAAASUVORK5CYII='}],
                               ['xul:menuitem', {label: '健康报告',oncommand: 'var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("about:healthreport"), x);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/UlEQVQ4jbXToU7DUBTG8R+EICAzICp4BSZIQM1heIAaHHZmHllTiRlPM8MjTJFMYUmWqQnSjCAQPYWuaztB+JKT5p77/U/vybmXf1CCHHMUEXNksbelw8Y6xSsGmOA8YoKz2Eu7/pziHdc9pxuGZ6dIglUYujRQtjYM71Y7GZ564BybKCK8ed0wx6gFvK/BdWAUzI8KHDfgxwCbsPAW+wp8RmyUE6jrBGt+x7jATcP0HN8Hu7rCWz2RYdpi7NJUtHUQiUR5SW5xtAf+wgsusazMS4wxwx0+OuDT8IyD2VGqvCRT5aguIkaRW+m5ypWqx7SI466VM8+1PKY/6xu4sjeUOdlxIAAAAABJRU5ErkJggg=='}],
                               ]
                               ],
                                ['xul:menuseparator', {}],
                                ['xul:menuitem', {label: '如何使用？',oncommand: 'event.stopPropagation(); var x = gBrowser.mCurrentTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("http://www.runningcheese.com/firefox-guide#interaction"), x);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8VMwGAAAAFnRSTlMA9VeHORGTMtgNdu7gjn4tGMxmXrtEk5FsbgAAAHtJREFUGNNtT1kOhSAQK8KwuaG+1/sfVQYzHyY2oZk2aVPwCfELmTcxPbkYSgmRk+lkx3BE9Y88BJdrALYVqLPI7IG1P+QAnN1UIywAqLkdlUmFGUg8Oxc+kY4jKoespeP0f+Wopc1d2jFyrj17KnZW1TaVNv39OS/4wg0/lwQ14TDpOwAAAABJRU5ErkJggg=='}]
                        ];
        aNode.appendChild(jsonToDOM(myMenuJson, aNode.ownerDocument, {}));
        aNode.setAttribute('menupopup', 'QuickOpen_pop');
    }
});


//定义图标
var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#QuickOpen[cui-areatype="toolbar"] .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2UlEQVQ4jbWRIRKDMBREn8NhOoPrDLoqtifgAnG9AUfgAJU9SS2uAoOt6gWqIiqjqlrBMhNChoLozjA/2ewu/yfwRxRAC3jVYmtAD5yBXLXfYj4BndZ71U78KtwAK9NLf7fiV8HLMLY9Bvg1ZgM8gSoKqMSbJXMFOOACZDKOI2TinXQzWB0eI76M9kfpbBzgf7UXwJC4j0+w3iXCjPiUfkI0DHM7htlbhud04pulgLsMJXBQmw/VUl8r3SzgDdTBPpdxDMqDs1r6CeLbh+HZvOoa/QwZcFVN4gv6nzt18jn5zAAAAABJRU5ErkJggg==)'
		 + '}}'
     + '#QuickOpen[cui-areatype="menu-panel"] .toolbarbutton-icon, toolbarpaletteitem[place="palette"]> #QuickOpen .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACOUlEQVRYhe2XIW/jQBCFVyowC1grnu9JhQUlRSHB/QWFJYUlpQUlBYUlYaGGJZFCgkvCwkMKQ8JMIoXfkfFpa7lq0tgnnXQjrWTvrue93Z15Ow7hX7QY4wCYSqqALTCNMQ7+Fn4GrCS9mVlhZoWkN2AVQsh6RwdegVlL/wyY9go+HA4vgK2ZFc0xMyuA7XA4vOiNgJ/781fjkp773IVMUtVYfRaSc/d4qEIfsWBm18CyfgdegB2wB16S/qWZXXdOAJgATyGEIOkeWNdZAKwl3fu8J2DSB4E/K5P0YWbjeszMxpI+/PnTTnVJYBdjHCTn/Mnq+HCR2nUKnjr1VNy0ENzUKViT7YyApBGwTsjsw+dIz4B9DeoxMeoEPM/zS2CT5jfwLukuIXgHvCfjJbDJ8/zyJHAzuwK2KZj3jyVVku68VWlQ+pxbV82rH4HHGM/dwe0X5MbAAlg0wZskYoznx+JnwBp4OPbDpgEPHj+Hq6OLTnkqeOKvPEqcWjT/JHO1PFwbJP3qCvxHPv8TaJvs51gCszaZdYWcAWVb/JxEoCiKG6+AX53E1jPlwdvE+0rgVVJVFMVNJwS88Nik2u4CNG20Mvl+5PL9cgqBzMvtZXNLgVUqsa6Kq3SOH9nSiWVHEwDegXloUTBgnkq03wdvLa4yYO6X19EEyhDC2Rfj98AiIbRoXliJnQHlUQS+K61jjANJVZ7nl35db8M3Wt95ue7F59zbY6fOD7RM0ocXo/3/E7YZ8Hjq6n8Drom0kObZsBkAAAAASUVORK5CYII=)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);




//定义函数

 function	QuickOpenImages() {var file = Services.dirsvc.get('ProfD', Ci.nsILocalFile); file.appendRelativePath("extensions\\userChromeJS_Mix@develop.com\\content\\images"); file.launch();};

 function	QuickOpenApplication() { var path ="..\\..\\..\\..\\";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));file.launch();};

 function	QuickOpenUserjs() { var file = Services.dirsvc.get('ProfD', Ci.nsILocalFile); file.appendRelativePath("user.js"); file.launch();};

 function	EverythingSearch() {	var path ="..\\..\\..\\Software\\Everything.exe"; var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile); file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path)); file.launch(); return file; };

 function QuickOpenMyComputer(event) {
			try {
				var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("WinD", Components.interfaces.nsILocalFile);
				file.append("explorer.exe");
				var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
				process.init(file);
				process.run(false, [","], 1);

			} catch (ex) {
				alert("打开我的电脑失败!")
			}
};


 function QuickOpenVolume(event) {
			try {
				var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsILocalFile);
				file.append(/6/.test(navigator.oscpu) ? "sndvol.exe" : "sndvol32.exe");
				var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
				process.init(file);
				process.run(false, ["-f"], 1);
			} catch (ex) {
				alert("打开音量控制器失败!")
			}
};


 function QuickOpenTaskMGR(event) {
			try {
				var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
				file.initWithPath(Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsILocalFile).path + "\\taskmgr.exe");
				file.launch();
			} catch (ex) {
				alert("打开任务管理器失败!")
			}
};







