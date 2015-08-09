
//2015.08.06

//F功能鍵
keys['F5'] = "BrowserReloadSkipCache();";//跳过缓存刷新页面

//数字
keys['1'] = "gBrowser.selectedTab = gBrowser.addTab('https://www.google.com/ncr');";//Google    
keys['2'] = "gBrowser.selectedTab = gBrowser.addTab('http://www.baidu.com/');";//百度
keys['3'] = "gBrowser.selectedTab = gBrowser.addTab('http://www.ebay.com/');";//Ebay
keys['4'] = "gBrowser.selectedTab = gBrowser.addTab('http://www.amazon.com/');";//Amazon
keys['5'] = function(){var newtabs=["http://ic.sjlpj.cn/UpShelf/OperationManageList","http://www.tvc-mall.com/"];var i=0;while(i<=newtabs.length-1){gBrowser.selectedTab=gBrowser.addTab(newtabs[i]);i=i+1;}};//一键打开标签组 

//字母
keys['A'] = "gBrowser.selectedTab = gBrowser.addTab('about:config');";//参数设置

keys['G'] = "var s = prompt('站内搜索——请输入待搜索字符串', '');if (s.length > 0) gBrowser.addTab('http://www.google.com/search?q=site:' + encodeURIComponent(content.location.host) + ' ' + encodeURIComponent(s));";//Google站内搜索

keys['J'] = "BrowserDownloadsUI();";//下载

keys['F'] = "BrowserOpenAddonsMgr();";//附加组件

keys['H'] = "PlacesCommandHook.showPlacesOrganizer('History');";//我的足迹（历史）

keys['P'] = "openPreferences();";//选项

keys['R'] = function() {
KeyChanger.makeKeyset(true);//KeyChanger
Redirector.reload();//Redirector
UCL.rebuild();//UserCSSLoader
anobtn.reload(true);//anobtn
addMenu.rebuild(true);//AddmenuPlus
MyMoveButton.delayRun();//Movebutton
showFlagS.rebuild(true);//showFlagS
};//群体重新载入，按顺序进行，遇到失效的将终止，所以请保证所有重载都是有效的。

keys['S'] = "BrowserStop();";//停止载入当前页

keys['U'] = function() {
Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();
};//Chrome文件夹

//組合鍵
keys['Alt+A'] = "XULBrowserWindow.statusTextField.label = 'Adblock Plus 條件偏好設定'; gBrowser.selectedTab = gBrowser.addTab('chrome://adblockplus/content/ui/filters.xul');";

keys["Alt+R"] = "Services.appinfo.invalidateCachesOnRestart() || Application.restart();"; //删除启动缓存并重启

keys['Alt+W'] = "gWHT.addWord();";//WordHighlight添加詞

keys['Alt+X'] = "gWHT.destroyToolbar();";//WordHighlight取消工具栏

keys['Alt+F1'] = "window._ehhWrapper.toggleSelection();";//EHH快捷键


//keys['Ctrl+F'] = function() {var path = addMenu.handleRelativePath('\\chrome\\local\\FSCapture\\FSCapture.exe');addMenu.exec(path, []);};//启动FSCapture
