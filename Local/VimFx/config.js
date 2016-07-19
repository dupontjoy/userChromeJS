//2016.07.18

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

//设置参数
Preferences.set({
  'devtools.chrome.enabled': true,
  'devtools.command-button-eyedropper.enabled': true,
  'devtools.command-button-rulers.enabled': true,
  'devtools.selfxss.count': 0,
  'privacy.donottrackheader.enabled': true,
})

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

// options选项
set('hint_chars', 'fjdkslaghrueiwoncmvqtxzypb')//Hint提示符(默认有19个字母, 新增最后7个字母)
//set('hint_chars', 'hjklasdfgyuiopqwertnmzxcvb')//Hint提示符(26个字母, 另一种排序, 来自AMO评论区)
set('prevent_autofocus', true)
set('hints_sleep', -1)
set('prev_patterns', v => `[上前]\\s*一?\\s*[页张个篇章頁] ${v}`)
set('next_patterns', v => `[下后]\\s*一?\\s*[页张个篇章頁] ${v}`)

// shortcuts快捷键
map('W', 'window_new')
map('w', 'tab_select_previous')
map('e', 'tab_select_next')

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

vimfx.addCommand({
    name: 'goto_history',
    description: '弹窗打开历史',
}, ({vim}) => {
    vim.window.PlacesCommandHook.showPlacesOrganizer('History')
})
map(',h', 'goto_history', true)

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

vimfx.addCommand({
    name: 'goto_redirector',
    description: '打开Redirector扩展设置',
    category: 'browsing',
}, ({vim}) => {
    vim.window.switchToTabHavingURI('resource://redirector-at-einaregilsson-dot-com/redirector.html', true)
})
map(',r', 'goto_redirector', true)

//群体重新载入，按顺序进行，遇到失效的将终止，所以请保证所有重载都是有效的。
vimfx.addCommand({
    name: 'goto_rebuild',
    description: '几个脚本设置重新载入',
}, ({vim}) => {
    vim.window.addMenu.rebuild();//AddmenuPlus
    vim.window.FeiRuoNet.Rebuild()//FeiRuoNet
    vim.window.MyMoveButton.delayRun();//Movebutton
    vim.window.Redirector.reload();//Redirector

    //vim.window.USL.rebuild();//UserScriptLoader
    //vim.window.UCL.rebuild();//UserCSSLoader
    //vim.window.anobtn.reload();//anobtn
})
map('.r', 'goto_rebuild', true)

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
    args.vim.window.gURLBar.value = '% '
})
map(',t', 'search_tabs', true)

vimfx.addCommand({
    name: 'tmt_toggle',
    description: 'TMT切换',
}, ({vim}) => {
    vim.window.Visibo.TMT.AutoHide.onToggle()
})
map(',T', 'tmt_toggle', true)

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

/*vimfx.addCommand({
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
map('zu', 'ublock_bootstrap', true)

let bootstrap = () => {
    // install addons
    let addons = [
        {id: 'VimFx@akhodakivskiy.github.com', url: 'vimfx'}
    ]
    addons.forEach((element) => {
        AddonManager.getAddonByID(element.id, (addon) => {
            if(!addon) {
                let url = element.url
                if(!url.startsWith('https://')) {
                    url = 'https://addons.mozilla.org/firefox/downloads/latest/' + url
                }
                AddonManager.getInstallForURL(url, (aInstall) => {
                    aInstall.install()
                }, 'application/x-xpinstall')
            }
        })
    })
    // list addons
    // AddonManager.getAllAddons((addons) => {
    //     console.log('List addons:')
    //     addons.forEach((element) => {
    //         console.log(JSON.stringify({name: element.name, id: element.id, disabled: element.userDisabled}))
    //     })
    // })
    // disable addons
    let disabled_addons = [
    //'firefox@getpocket.com',
    //'loop@mozilla.org',
    ]
    disabled_addons.forEach((element) => {
        AddonManager.getAddonByID(element, (addon) => {
            addon.userDisabled = true
        })
    })

    let bookmarks = PlacesUtils.bookmarks
    search_engines.forEach((element) => {
        let uri = NetUtil.newURI(element.url, null, null)
        if (!bookmarks.isBookmarked(uri)) {
            bookmarks.insertBookmark(
                bookmarks.unfiledBookmarksFolder,
                uri,
                bookmarks.DEFAULT_INDEX,
                element.title)
            PlacesUtils.keywords.insert(element)
        }
    })
    popup('Bootstrap succeeded.', {
        label: 'Open Addons',
        accessKey: 'A',
        callback: () => {
            nsIWindowWatcher.activeWindow.BrowserOpenAddonsMgr()
        }
    })
}
vimfx.addCommand({
    name: 'bootstrap',
    description: '引导程序',
}, ({vim}) => {
    try {
        bootstrap()
    } catch (error) {
        vim.notify('Bootstrap failed')
        console.error(error)
        return
    }
    vim.notify('Bootstrap succeeded')
})
map('zb', 'bootstrap', true)

/*————————————————————*/
//必須，不能刪除
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

