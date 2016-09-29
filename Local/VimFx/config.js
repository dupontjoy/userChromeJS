//2016.09.29

/******************************************************************************************
快捷键分类:
地址栏: location
滚动: scrolling
标签页: tabs
浏览: browsing
查找: find
杂项: misc
光标模式: caret
Hint模式: hints
忽略模式: ignore

参照配置:
https://github.com/azuwis/.vimfx/blob/master/config.js
https://github.com/lydell/dotfiles/blob/master/.vimfx/config.js
 *******************************************************************************************/

/******************************************************************************************
 *这里是一些必要的设置, 载入库, 接入API等等, 请不要隨意更改它们.
 *******************************************************************************************/
const {classes: Cc, interfaces: Ci, utils: Cu} = Components
const nsIEnvironment = Cc["@mozilla.org/process/environment;1"].getService(Ci.nsIEnvironment)
const nsIStyleSheetService = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService)
const nsIWindowWatcher = Cc["@mozilla.org/embedcomp/window-watcher;1"].getService(Ci.nsIWindowWatcher)
const nsIXULRuntime = Cc['@mozilla.org/xre/app-info;1'].getService(Ci.nsIXULRuntime)
const {OS} = Cu.import('resource://gre/modules/osfile.jsm')

const globalMessageManager = Cc['@mozilla.org/globalmessagemanager;1']
  .getService(Ci.nsIMessageListenerManager)

Cu.import('resource://gre/modules/XPCOMUtils.jsm')
XPCOMUtils.defineLazyModuleGetter(this, 'AddonManager', 'resource://gre/modules/AddonManager.jsm')
XPCOMUtils.defineLazyModuleGetter(this, 'NetUtil', 'resource://gre/modules/NetUtil.jsm')
XPCOMUtils.defineLazyModuleGetter(this, 'PlacesUtils', 'resource://gre/modules/PlacesUtils.jsm')
XPCOMUtils.defineLazyModuleGetter(this, 'PopupNotifications', 'resource://gre/modules/PopupNotifications.jsm')
XPCOMUtils.defineLazyModuleGetter(this, 'Preferences', 'resource://gre/modules/Preferences.jsm')
//let {Preferences} = Cu.import('resource://gre/modules/Preferences.jsm', {})

// helper functions
let getWindowAttribute = (window, name) => {
  return window.document.documentElement.getAttribute(`vimfx-config-${name}`)
}

let setWindowAttribute = (window, name, value) => {
  window.document.documentElement.setAttribute(`vimfx-config-${name}`, value)
}
let {commands} = vimfx.modes.normal

let popup = (message, options) => {
    let window = nsIWindowWatcher.activeWindow
    if(!window)
        return
    let notify  = new PopupNotifications(window.gBrowser,
                                         window.document.getElementById('notification-popup'),
                                         window.document.getElementById('notification-popup-box'))
    let notification =  notify.show(window.gBrowser.selectedBrowser, 'notify',
                                    message, null, options, null, {
                                        popupIconURL: 'chrome://branding/content/icon128.png'
                                    })
    window.setTimeout(() => {
        notification.remove()
    }, 5000)
}

let set = (pref, valueOrFunction) => {
    let value = typeof valueOrFunction === 'function'
        ? valueOrFunction(vimfx.getDefault(pref))
        : valueOrFunction
    vimfx.set(pref, value)
}

let toggleCss = (uriString) => {
    let uri = Services.io.newURI(uriString, null, null)
    let method = nsIStyleSheetService.AUTHOR_SHEET
    if (nsIStyleSheetService.sheetRegistered(uri, method)) {
        nsIStyleSheetService.unregisterSheet(uri, method)
    } else {
        nsIStyleSheetService.loadAndRegisterSheet(uri, method)
    }
    // vimfx.on('shutdown', () => {
    //     nsIStyleSheetService.unregisterSheet(uri, method)
    // })
}

let map = (shortcuts, command, custom=false) => {
    vimfx.set(`${custom ? 'custom.' : ''}mode.normal.${command}`, shortcuts)
}

let pathSearch = (bin) => {
    if (OS.Path.split(bin).absolute)
        return bin
    let pathListSep = (nsIXULRuntime.OS == 'WINNT') ? ';' : ':'
    let dirs = nsIEnvironment.get("PATH").split(pathListSep)
    let file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsIFile)
    for (let dir of dirs) {
        let path = OS.Path.join(dir, bin)
        file.initWithPath(path)
        if (file.exists() && file.isFile() && file.isExecutable())
            return path
    }
    return null
}

let exec = (cmd, args, observer) => {
    let file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsIFile)
    file.initWithPath(pathSearch(cmd))
    let process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess)
    process.init(file)
    process.runAsync(args, args.length, observer)
}

let loadCss = (uriString) => {
  let uri = Services.io.newURI(uriString, null, null)
  let method = nsIStyleSheetService.AUTHOR_SHEET
  if (!nsIStyleSheetService.sheetRegistered(uri, method)) {
    nsIStyleSheetService.loadAndRegisterSheet(uri, method)
  }
  vimfx.on('shutdown', () => {
    nsIStyleSheetService.unregisterSheet(uri, method)
  })
}

/******************************************************************************************
 *这里是自定义设置, 你可以根据自己的需要来调整它们. 参照已有设置的格式, 动手将自己的想法变成现实吧.
 *******************************************************************************************/

// options选项
set('hints.chars', 'fdsagrueiwcvqtxzjklhonmypb')//Hint提示符(改了排序)
set('hints.sleep', -1)
set('prev_patterns', v => `[上前]\\s*一?\\s*[页张个篇章頁] ${v}`)
set('next_patterns', v => `[下后]\\s*一?\\s*[页张个篇章頁] ${v}`)

// shortcuts快捷键
map('W', 'window_new')//新建窗口
map('w', 'tab_select_previous')//上一个标签
map('e', 'tab_select_next')//下一个标签
map('M', 'mark_scroll_position')//标记滾动位置
map('gt', 'follow_in_focused_tab')//新的前台标签打开此链接
map('gW', 'follow_in_window')//新的窗口打开此链接
map('gf', 'follow_focus')//聚焦/选中元素
map('gb', 'click_browser_element')//点击浏览元素


// commands命令
vimfx.addCommand({
    name: 'goto_addons',
    description: '新标签打开about:addons',
    category: 'browsing',
}, ({vim}) => {
    vim.window.BrowserOpenAddonsMgr()
})
map(',a', 'goto_addons', true)

vimfx.addCommand({
    name: 'goto_config',
    description: '新标签打开about:config',
    category: 'browsing',
}, ({vim}) => {
    vim.window.switchToTabHavingURI('about:config', true)
})
map(',c', 'goto_config', true)

vimfx.addCommand({
    name: 'goto_downloads',
    description: '弹窗打开下载',
}, ({vim}) => {
    vim.window.DownloadsPanel.showDownloadsHistory()
    //vim.window.switchToTabHavingURI('about:downloads', true)
})
map(',d', 'goto_downloads', true)

/*vimfx.addCommand({
    name: 'goto_ehh',
    description: 'EHH元素隐藏',
}, ({vim}) => {
    vim.window._ehhWrapper.toggleSelection();
})
map(',e', 'goto_ehh', true)*/

vimfx.addCommand({
    name: 'goto_history',
    description: '弹窗打开历史',
}, ({vim}) => {
    vim.window.PlacesCommandHook.showPlacesOrganizer('History')
})
map(',h', 'goto_history', true)

vimfx.addCommand({
    name: 'goto_sougoupic',
    description: '下一张壁纸',
    category: 'misc',
}, ({vim}) => {
    vim.window.sougouPIC.setRileGou()
})
map(',p', 'goto_sougoupic', true)

//配合gh-Kelo的QR.uc.js (https://github.com/ghKelo/userChromeJS/tree/master/QR)
let qrcode = (text) => {
    exec('sh', ['-c', `qrencode -o- '${text}' | pqiv -i -`])
}
vimfx.addCommand({
    name: 'qrcode',
    description: '生成二维码'
}, ({vim}) => {
    vim.window.QRCreator.run()
})
map(',q', 'qrcode', true)

//群体重新载入，按顺序进行，遇到失效的将终止，所以请保证所有重载都是有效的。
vimfx.addCommand({
    name: 'goto_rebuild',
    description: '几个脚本设置重新载入',
}, ({vim}) => {
    vim.window.addMenu.rebuild();//AddmenuPlus
    vim.window.FeiRuoNet.Rebuild()//FeiRuoNet
    vim.window.MyMoveButton.delayRun();//Movebutton
    vim.window.Redirector.reload();//Redirector
    vim.window.anobtn.reload();//anobtn
    
    //vim.window.USL.rebuild();//UserScriptLoader
    //vim.window.UCL.rebuild();//UserCSSLoader

})
map(',r', 'goto_rebuild', true)

vimfx.addCommand({
    name: 'restart',
    description: '重启Firefox',
}, ({vim}) => {
    Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit)
})
map(',R', 'restart', true)

vimfx.addCommand({
    name: 'goto_preferences',
    description: '新标签打开选项',
    category: 'browsing',
}, ({vim}) => {
    vim.window.openPreferences()
})
map(',s', 'goto_preferences', true)

vimfx.addCommand({
    name: 'search_tabs',
    description: '搜索标签',
    category: 'location',
    order: commands.focus_location_bar.order + 1,
}, (args) => {
    commands.focus_location_bar.run(args)
    args.vim.window.gURLBar.value = '%'
})
map(',t', 'search_tabs', true)

vimfx.addCommand({
    name: 'goto_wordhilight',
    description: 'WordHighlight添加詞',
    category: 'find',
}, ({vim}) => {
    vim.window.gWHT.addWord()
})
map(',w', 'goto_wordhilight', true)

vimfx.addCommand({
    name: 'goto_wordhilight_close',
    description: '关闭WordHighlight查找栏',
    category: 'find',
}, ({vim}) => {
    vim.window.gWHT.destroyToolbar()
})
map(',x', 'goto_wordhilight_close', true)

/*
vimfx.addCommand({
    name: 'pocket',
    description: 'Save to Pocket',
}, ({vim}) => {
    vim.window.document.getElementById('pocket-button').click();
});
vimfx.set('custom.mode.normal.pocket', 's');

vimfx.addCommand({
    name: 'mpv_current_href',
    description: 'Mpv play focused href',
}, ({vim}) => {
    let mpv_observer = {
        observe: (subject, topic) => {
            if (subject.exitValue !== 0)
                vim.notify('Mpv: No video')
        }
    }
    vimfx.send(vim, 'getFocusedHref', null, href => {
        if (href && href.match('^https?://')) {
            let args = ['--profile=pseudo-gui', '--cache=no', '--fs', href]
            exec('mpv', args, mpv_observer)
            vim.notify(`Mpv: ${href}`)
        } else {
            vim.notify('Mpv: No link')
        }
    })
})
map('b', 'mpv_current_href', true)

vimfx.addCommand({
    name: 'mpv_current_tab',
    description: 'Mpv play current tab',
}, ({vim}) => {
    let url = vim.window.gBrowser.selectedBrowser.currentURI.spec
    let args = ['--profile=pseudo-gui', '--cache=no', '--fs', url]
    exec('mpv', args)
    vim.notify(`Mpv: ${url}`)
})
map(',m', 'mpv_current_tab', true)*/

vimfx.addCommand({
    name: 'toggle_https',
    description: 'HTTP/HTTPS切换',
    category: 'location',
}, ({vim}) => {
    let url = vim.window.gBrowser.selectedBrowser.currentURI.spec
    if (url.startsWith('http://')) {
        url = url.replace(/^http:\/\//, 'https://')
    } else if (url.startsWith('https://')) {
        url = url.replace(/^https:\/\//, 'http://')
    }
    vim.window.gBrowser.loadURI(url)
})
map('gs', 'toggle_https', true)


vimfx.addCommand({
    name: 'ublock_bootstrap',
    description: 'uBlock自定义规则',
}, ({vim}) => {
    let gBrowser = vim.window.gBrowser
    let url = gBrowser.selectedBrowser.currentURI.spec
    let ublockUrl = 'chrome://ublock0/content/dashboard.html#dyna-rules.html'
    if (url === ublockUrl) {
        ublockBootstrap(gBrowser.contentDocument)
    } else {
        let ublockTab = gBrowser.addTab(ublockUrl)
        gBrowser.selectedTab = ublockTab
    }
})
map('zb', 'ublock_bootstrap', true)

vimfx.addCommand({
    name: 'goto_redirector',
    description: '打开Redirector扩展设置',
    category: 'misc',
}, ({vim}) => {
    vim.window.switchToTabHavingURI('moz-extension://b8ae88e1-0cd2-4e77-8851-f8f60336ef60/redirector.html', true)
})
map('zr', 'goto_redirector', true)

vimfx.addCommand({
    name: 'umatrix_bootstrap',
    description: 'uMatrix自定义规则',
    category: 'misc',
}, ({vim}) => {
    vim.window.switchToTabHavingURI('chrome://umatrix/content/dashboard.html#user-rules', true)
})
map('zu', 'umatrix_bootstrap', true)

/******************************************************************************************
 *加载CSS和部分User.js.
 *******************************************************************************************/
//加载CSS
loadCss(`${__dirname}/UserCSSLoader/userChrome.css`)
loadCss(`${__dirname}/UserCSSLoader/Theme-Yosetime.css`)
loadCss(`${__dirname}/UserCSSLoader/UI-New Tab-FX42.css`)
loadCss(`${__dirname}/UserCSSLoader/01-UI-01——UI调整.css`)
loadCss(`${__dirname}/UserCSSLoader/01-UI-02——附加組件.css`)
loadCss(`${__dirname}/UserCSSLoader/02-微調-01——頁面.css`)
loadCss(`${__dirname}/UserCSSLoader/02-微調-02——字體.css`)
loadCss(`${__dirname}/UserCSSLoader/02-微調-03-1——圖標替換.css`)
loadCss(`${__dirname}/UserCSSLoader/02-微調-03-2——圖標效果&排序.css`)
loadCss(`${__dirname}/UserCSSLoader/02-微調-04——隱藏項.css`)
loadCss(`${__dirname}/UserCSSLoader/03-其他-01——Cursors for hyperlinks.css`)
loadCss(`${__dirname}/UserCSSLoader/03-其他-02——GPU Mode.css`)
loadCss(`${__dirname}/UserCSSLoader/03-其他-99——網站修正.css`)

//设置参数
Preferences.set({
'devtools.chrome.enabled': true,//VimFx必要
'devtools.command-button-eyedropper.enabled': true,
'devtools.command-button-rulers.enabled': true,
'devtools.selfxss.count': 0,
'privacy.donottrackheader.enabled': true,
//VimFx
'extensions.VimFx.prevent_autofocus': true,//阻止自动聚焦输入框
'extensions.VimFx.ignore_keyboard_layout': true,//忽略键盘布局
  /******************************************************************************************
 *这里是个人设置。
 *******************************************************************************************/
//*==========扩展设置==========*//
//adblockplus
'extensions.adblockplus.patternsbackups': 0,
'extensions.adblockplus.frameobjects': false,//在Java和Flash上显示标签 - 否
'extensions.adblockplus.subscriptions_antiadblockurl': "https://github.com/reek/anti-adblock-killer/raw/master/anti-adblock-killer-filters.txt",//原反-反ADP列表
//-非侵入式广告地址換成个人ABP规则
'extensions.adblockplus.subscriptions_exceptionscheckbox': true,//非入侵式广告勾选框
'extensions.adblockplus.subscriptions_exceptionsurl': "https://github.com/dupontjoy/customization/raw/master/Rules/ABP/Floating-n-Porn-Ads-Filter.txt",//原非入侵式广告订阅网址

//Autoproxy
'extensions.autoproxy.customProxy': "Shadowsocks;;1080;socks$GoAgent;;8087;$Lantern;;8787;$Psiphon;;8080;$Free%20Gate;;8580;",
'extensions.autoproxy.patternsbackups': 0,
'extensions.autoproxy.defaultstatusbaraction': 0,//点击图标时-快捷菜单
'extensions.autoproxy.defaulttoolbaraction': 0,//点击图标时-快捷菜单

//LastPass
'extensions.lastpass.hidecontextmenu': true,
'extensions.lastpass.showHomepageAfterLogin': false,//登入後不轉到密码库
'extensions.lastpass.0a148091163b8a7de3368af449db2947c700bea1552b01964d4ae55f930562e0.toplevelmatchingsites': true,//将匹配网站移动到顶部菜单
'extensions.lastpass.loginpws': "",//不保存密码

//FlashGot
'flashgot.hide-all': true,
'flashgot.hide-buildGallery': true,
'flashgot.hide-icons': true,
'flashgot.hide-it': true,
'flashgot.hide-media': true,
'flashgot.hide-options': true,
'flashgot.hide-sel': true,
'flashgot.omitCookies': true,//不发送Cookie
'flashgot.firstRunRedirection': false,//重建配置不弹FlashGot首页

//DownThemAll！
'extensions.dta.conflictresolution': 0,//文檔已存在時自動重命名
'extensions.dta.alertbox': 0,//下載完成後對話視窗提示
'extensions.dta.closedta': true,//辯識並列出Flash影片
'extensions.dta.ctxmenu': "0,0,0",//不顯示右鍵菜單
'extensions.dta.removecanceled': true,//從清單中移除中斷及錯誤的下載
'extensions.dta.confirmremove': false,//移除下載前不提示

//Greasemonkey
'extensions.greasemonkey.stats.prompted': true,//不弹改进建议提示
'extensions.greasemonkey.installDelay': 0,//安裝時的倒計時

//Stylish
'extensions.stylish.firstRun': 3,//重建配置不弹歡迎頁

//iMacros
'extensions.imacros.delay': 1000,//播放速度中等

//Pocket(Readitlater)
'extensions.isreaditlater.open': "tab",//新标签打开项目

//*==========脚本设置==========*//
//UC管理器取消延迟加载
'userChrome.EXPERIMENT': true,

//UserCSSLoader引导器
'UserCSSLoader.innereditor': false,//使用外部编辑器
'UserCSSLoader.showtoolbutton': false,//显示为菜单

//InspectElementModY
'userChromeJS.InspectElement.contentType': 2,//查看页面:Dom Inspector
'userChromeJS.InspectElement.mainWinType': 2,//查看窗口:Dom Inspector

//GrabScroll
'grabScroll.button': 1,//使用GrabScroll抓取的键位：中键
'grabScroll.clickable': false,//能够在链接上使用GrabScroll

//newDownloadPlus
//主界面
'userChromeJS.downloadPlus.downloadSound_Play': true,//下載完成提示音
'userChromeJS.downloadPlus.downloadFileSize': true,//精確顯示文件大小
'userChromeJS.downloadPlus.autoClose_blankTab': true,//自動關閉空白標籤
'userChromeJS.downloadPlus.download_speed': true,//下載面皮顯示下載速度
//下載界面
'userChromeJS.downloadPlus.download_dialog_saveas': true,//另存爲
'userChromeJS.downloadPlus.download_dialog_saveTo': true,//保存到
'userChromeJS.downloadPlus.download_dialog_saveTo_suffix': 1,//保存到——後綴樣式
'userChromeJS.downloadPlus.download_dialog_showCompleteURL': true,//双擊複製完整地址
'userChromeJS.downloadPlus.download_dialog_doubleclicksaveL': false,//双击保存執行下載
'userChromeJS.downloadPlus.download_dialog_doubleclickanyW': false,//双击任意地方執行下載
//其他
'userChromeJS.downloadPlus.new_Download': true,//新建下載
'userChromeJS.downloadPlus.new_Download_popups': true,//新建下載——是否彈窗
'userChromeJS.downloadPlus.downloadsPanel_removeFile': true,//從硬盤刪除
'userChromeJS.downloadPlus.download_checksum': true,//Hash計算
'userChromeJS.downloadPlus.save_And_Open': true,//保存并打開
'userChromeJS.downloadPlus.save_And_Open_RorL': 1,//保存并打開——打開文件
'userChromeJS.downloadPlus.download_dialog_changeName': true,//下載改名
'userChromeJS.downloadPlus.download_dialog_changeName_encodingConvert': true,//下載改名——是否開啟下拉菜單

//FeiRuoNet
'userChromeJS.FeiRuoNet.EnableRefChanger': true,//Refer切換,破解反盗链
'userChromeJS.FeiRuoNet.EnableUAChanger': true,//UA切換
'userChromeJS.FeiRuoNet.ModifyHeader': true,//HTTP头信息
'userChromeJS.FeiRuoNet.UrlbarSafetyLevel': false,//HTTPS等級高亮
'userChromeJS.FeiRuoNet.EnableProxyByError': false,//网络错误时代理
'userChromeJS.FeiRuoNet.ProxyMode': 0,//代理模式: 禁用代理

})


/*————————————————————*/
//必須，不要刪除
let bootstrapIfNeeded = () => {
    let bootstrapFile = OS.Path.fromFileURI(`${__dirname}/config.js`)
    let bootstrapPref = "extensions.VimFx.bootstrapTime"
    let file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsIFile)
    file.initWithPath(bootstrapFile)
    if (file.exists() && file.isFile() && file.isReadable()) {
        let mtime = Math.floor(file.lastModifiedTime / 1000)
        let btime = Preferences.get(bootstrapPref)
        if (!btime || mtime > btime) {
            bootstrap()
            Preferences.set(bootstrapPref, Math.floor(Date.now() / 1000))
        }
    }
}
bootstrapIfNeeded()

