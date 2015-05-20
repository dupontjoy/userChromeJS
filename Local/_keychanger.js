
//2015.05.18 13:00

//F功能鍵

//数字       
keys['1'] = "gBrowser.selectedTab = gBrowser.addTab('http://www.baidu.com/');";//百度
keys['2'] = "gBrowser.selectedTab = gBrowser.addTab('https://www.google.com/ncr');";//Google
keys['3'] = "gBrowser.selectedTab = gBrowser.addTab('http://www.amazon.com/');";//Amazon
keys['4'] = "gBrowser.selectedTab = gBrowser.addTab('http://www.ebay.com/');";//Ebay
keys['5'] = function(){var newtabs=["http://ic.sjlpj.cn/DevProduct/DevProductEditCollectList","http://www.tvc-mall.com/"];var i=0;while(i<=newtabs.length-1){gBrowser.selectedTab=gBrowser.addTab(newtabs[i]);i=i+1;}};//一键打开标签组 

//字母
keys['A'] = "gBrowser.selectedTab = gBrowser.addTab('about:config');";//参数设置

keys['B'] = "gBrowser.selectedTab = gBrowser.addTab('https://www.google.com/search?q=site:pan.baidu.com%20&hl=en-US&safe=off&sclient=psy-ab');";//百度盤文件搜索

keys['G'] = "var s = prompt('站内搜索——请输入待搜索字符串', '');if (s.length > 0) gBrowser.addTab('http://www.google.com/search?q=site:' + encodeURIComponent(content.location.host) + ' ' + encodeURIComponent(s));";//Google站内搜索

keys['J'] = "BrowserDownloadsUI();";//下载

keys['F'] = "BrowserOpenAddonsMgr();";//附加组件

keys['H'] = "PlacesCommandHook.showPlacesOrganizer('History');";//我的足迹（历史）

keys['I'] = function() {
try {
var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
file.append("Internet Explorer");
file.append("iexplore.exe");
var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
process.init(file);
process.run(false, [content.location.href], 1);
} catch (ex) {
alert("\u6253\u5f00IE\u5931\u8d25!")
}
};//用IE打开当前页

keys['P'] = "openPreferences();";//选项

keys['R'] = function() {
KeyChanger.makeKeyset(true);//KeyChanger
UCL.rebuild();//UserCSSLoader
addMenu.rebuild(true);//AddmenuPlus
anobtn.reload(true);//anobtn
Redirector.reload();//Redirector
showFlagS.rebuild(true);//showFlagS
MyMoveButton.delayRun();//Movebutton
};//群体重新载入，按顺序进行，遇到失效的将终止，所以请保证所有重载都是有效的。

keys['S'] = "BrowserStop();";//停止载入当前页

keys['T'] = "BrowserOpenTab()";//打开新标签

keys['U'] = function() {
Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();
};//Chrome文件夹

//組合鍵
keys['Alt+A'] = "XULBrowserWindow.statusTextField.label = 'Adblock Plus 條件偏好設定'; gBrowser.selectedTab = gBrowser.addTab('chrome://adblockplus/content/ui/filters.xul');";

keys["Alt+R"] = "Services.appinfo.invalidateCachesOnRestart() || Application.restart();"; //删除启动缓存并重启

keys['Alt+W'] = "gWHT.addWord();";//WordHighlight添加詞

keys['Alt+X'] = function() {
gWHT.destroyToolbar();//WordHighlight取消工具栏
ucjsDownloadsStatusModoki.toggleDownloadsStatusModokiBar();//ucjsDownloadsStatusModoki底部狀態欄
};

keys['Alt+F1'] = "window._ehhWrapper.toggleSelection();";//EHH快捷键



//keys['Ctrl+F'] = function() {var path = addMenu.handleRelativePath('\\chrome\\local\\FSCapture\\FSCapture.exe');addMenu.exec(path, []);};//启动FSCapture
