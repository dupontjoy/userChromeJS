
//2016.02.16

//ProfD：配置文件夹
//UChrm：Chrome文件夹
//TmpD：系统temp文件夹

location == 'chrome://browser/content/browser.xul' && (function(){

//設置程序路徑
    var PATH1 = Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\Notepad2\\Notepad2.exe"; 
    
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
    
//設置pref參數
    var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
    file.initWithPath(handleRelativePath(PATH1));
    if (file.exists()) {
        gPrefService.setCharPref('view_source.editor.path', file.path);//自带全局编辑器
        gPrefService.setCharPref('extensions.greasemonkey.editor', file.path);//Greasemonkey編輯器
        
    }
        
})()