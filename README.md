Chrome文件夾
----------------
目前配置中，正在使用的腳本

***1. Local：***

 一些腳本的配置文件，[設置Notepad2爲默認編輯器][1]和[備份批處理][8]

*_addmenu.js：*[Addmenuplus][2]配置，圖標外置，統一整合在[CSS][3]文件中

*_keychanger.js：*鍵盘快捷操作

*_redirector.js：* [Redirector.uc.js][4]規則

***2. SubScript：***
一般功能性腳本

***3. TabMixPlus：***
與Firefox界面相關腳本

***4. UCJSFiles：***
配置外置的腳本+庫

***5. userContent：***
自己有一些小修攺的腳本

***6. UserCSSLoader：***
CSS文件集，使用[userCSSLoader.uc.js][5]引導

***7. xul：***
UC管理器文件

神級腳本[LockMark][6]：記住浏览位置，以坐标方式保存在prefs.js中

神級腳本[ucjsPermission2][7]：利用自带permissions.sqlite管理第三方腳本等。個人[第三方腳本白名單][9]。

***8. userChrome.css：***
優先級較高的CSS文件，作用於于Firefox界面框，優先啓動防界面抖動

***9. userChrome.js：***
引導腳本

  [1]: https://github.com/dupontjoy/userChromeJS/blob/master/userContent/setRelativeEditPath.uc.js
  [2]: https://github.com/ywzhaiqi/userChromeJS/tree/master/addmenuPlus
  [3]: https://github.com/dupontjoy/userChromeJS/blob/master/UserCSSLoader/%E5%BE%AE%E8%AA%BF%E2%80%94%E2%80%94%E5%9C%96%E6%A8%99%20%E7%BE%8E%E5%8C%96.css
  [4]: https://github.com/Drager-oos/userChrome/blob/master/MainScript/Redirector.uc.js
  [5]: https://github.com/dupontjoy/userChromeJS/blob/master/UCJSFiles/UserCSSLoader_ModOos.uc.js
  [6]: https://github.com/dupontjoy/userChromeJS/blob/master/xul/localMark_0.6.1.uc.xul
  [7]: https://github.com/dupontjoy/userChrome.js-Collections-/tree/master/ucjsPermission2.uc.xul
  [8]: https://github.com/dupontjoy/userChromeJS/tree/master/Local/BackupProfiles
  [9]: https://github.com/dupontjoy/customization/blob/master/Rules/ucjsPermission-Whitelist.txt