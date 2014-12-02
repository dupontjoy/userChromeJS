//2014.11.22.20:46

keys['F1'] = "window._ehhWrapper.toggleSelection();";//EHH快捷键
keys['F5'] = "BrowserReloadSkipCache();";//强制刷新页面（跳过缓存）
keys['A'] = "gBrowser.selectedTab = gBrowser.addTab('about:config');";//参数设置
keys['B'] = "var s = prompt('百度站内搜索——请输入待搜索字符串', '');if (s.length > 0) gBrowser.addTab('http://www.baidu.com/baidu?wd=site:' + encodeURIComponent(content.location.host) + ' ' + encodeURIComponent(s));";//Baidu站内搜索
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
keys['N'] = "BrowserOpenTab()";//打开新标签
keys['O'] = function() {
					Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("UChrm", Components.interfaces.nsILocalFile).reveal();
				};//Chrome文件夹
keys['P'] = "openPreferences();";//选项
keys['S'] = "BrowserStop();";//停止载入当前页
keys['U'] = "undoCloseTab();";//恢复关闭的标签
keys['W'] = function(){var newtabs=["https://www.google.com/webhp?&complete=0","http://ic.sjlpj.cn/","http://www.tvc-mall.com/","http://www.amazon.com/"];var i=0;while(i<=newtabs.length-1){gBrowser.selectedTab=gBrowser.addTab(newtabs[i]);i=i+1;}};//一键打开标签组
keys["Alt+X"] = "Services.appinfo.invalidateCachesOnRestart() || Application.restart();"; //删除启动缓存并重启


//keys['Ctrl+F'] = function() {var path = addMenu.handleRelativePath('\\chrome\\local\\FSCapture\\FSCapture.exe');addMenu.exec(path, []);};//启动FSCapture
//keys['W'] = "gWHT.addWord();";//WordHighlight添加词
//keys['X'] = "gWHT.destroyToolbar();";//WordHighlight取消工具栏