//2016.06.17

//ProfD：配置文件夹
//UChrm：Chrome文件夹
//TmpD：系统temp文件夹

location == 'chrome://browser/content/browser.xul' && (function(){

//設置程序路徑
    var PATH1 = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\Notepad2\\Notepad2.exe";
    var PATH2 = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\chrome\\Local\\VimFx";
    
//一些看不懂的設置
    var handleRelativePath = function (path) {
        if (path) {
        path = path.replace(/\//g, '\\').toLocaleLowerCase();
        var ProfD = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties)
                .get("ProfD", Ci.nsILocalFile).path;
        if (/^(\\)/.test(path)) {
            return ProfD + path;
        } else {
            return path;
            }
        }
    };
    
//設置编辑器
    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
    file.initWithPath(handleRelativePath(PATH1));
    if (file.exists()) {
        gPrefService.setCharPref('view_source.editor.path', file.path);//自带全局编辑器
        gPrefService.setCharPref('extensions.greasemonkey.editor', file.path);//Greasemonkey編輯器   
    }
//设置VimFx配置文件
    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
    file.initWithPath(handleRelativePath(PATH2));
    if (file.exists()) {
        gPrefService.setCharPref('extensions.VimFx.config_file_directory', file.path);
    }       
})()