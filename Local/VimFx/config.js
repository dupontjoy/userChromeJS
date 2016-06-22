//2016.06.22

// example: https://github.com/azuwis/.vimfx/blob/master/config.js

const {classes: Cc, interfaces: Ci, utils: Cu} = Components
const nsIEnvironment = Cc["@mozilla.org/process/environment;1"].getService(Ci.nsIEnvironment)
const nsIStyleSheetService = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService)
const nsIWindowWatcher = Cc["@mozilla.org/embedcomp/window-watcher;1"].getService(Ci.nsIWindowWatcher)
const nsIXULRuntime = Cc['@mozilla.org/xre/app-info;1'].getService(Ci.nsIXULRuntime)
const {OS} = Cu.import('resource://gre/modules/osfile.jsm')

Cu.import('resource://gre/modules/XPCOMUtils.jsm')
XPCOMUtils.defineLazyModuleGetter(this, 'AddonManager', 'resource://gre/modules/AddonManager.jsm')
XPCOMUtils.defineLazyModuleGetter(this, 'NetUtil', 'resource://gre/modules/NetUtil.jsm')
XPCOMUtils.defineLazyModuleGetter(this, 'PlacesUtils', 'resource://gre/modules/PlacesUtils.jsm')
XPCOMUtils.defineLazyModuleGetter(this, 'PopupNotifications', 'resource://gre/modules/PopupNotifications.jsm')
XPCOMUtils.defineLazyModuleGetter(this, 'Preferences', 'resource://gre/modules/Preferences.jsm')

// helper functions
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

// options
set('prevent_autofocus', true)
set('hints_sleep', -1)
set('prev_patterns', v => `[上前]\\s*一?\\s*[页张个篇章頁] ${v}`)
set('next_patterns', v => `[下后]\\s*一?\\s*[页张个篇章頁] ${v}`)

// shortcuts
map('', 'window_new')
map('w', 'tab_select_previous')
map('e', 'tab_select_next')

// commands
vimfx.addCommand({
    name: 'goto_addons',
    description: 'about:addons',
}, ({vim}) => {
    vim.window.BrowserOpenAddonsMgr()
})
map(',a', 'goto_addons', true)

vimfx.addCommand({
    name: 'goto_config',
    description: 'about:config',
}, ({vim}) => {
    vim.window.switchToTabHavingURI('about:config', true)
})
map(',c', 'goto_config', true)

vimfx.addCommand({
    name: 'goto_downloads',
    description: 'Downloads',
}, ({vim}) => {
    vim.window.DownloadsPanel.showDownloadsHistory()
    //vim.window.switchToTabHavingURI('about:downloads', true)
})
map(',d', 'goto_downloads', true)

vimfx.addCommand({
    name: 'goto_history',
    description: 'History',
}, ({vim}) => {
    vim.window.PlacesCommandHook.showPlacesOrganizer('History')
})
map(',h', 'goto_history', true)

//WordHighlight添加詞
vimfx.addCommand({
    name: 'goto_wordhilight',
    description: 'WordHilight',
}, ({vim}) => {
    vim.window.gWHT.addWord()
})
map(',w', 'goto_wordhilight', true)

//关闭WordHighlight查找栏
vimfx.addCommand({
    name: 'goto_wordhilight_close',
    description: 'Close WordHilight Bar',
}, ({vim}) => {
    vim.window.gWHT.destroyToolbar()
})
map(',x', 'goto_wordhilight_close', true)

//几个脚本设置Rebuild
//群体重新载入，按顺序进行，遇到失效的将终止，所以请保证所有重载都是有效的。
vimfx.addCommand({
    name: 'goto_rebuild',
    description: 'Rebuild',
}, ({vim}) => {
    vim.window.Redirector.reload();//Redirector
    vim.window.UCL.rebuild();//UserCSSLoader
    vim.window.USL.rebuild();//UserScriptLoader
    //vim.window.anobtn.reload();//anobtn
    vim.window.addMenu.rebuild();//AddmenuPlus
    vim.window.MyMoveButton.delayRun();//Movebutton
    vim.window.FeiRuoNet.Rebuild()//FeiRuoNet
})
map('.r', 'goto_rebuild', true)

vimfx.addCommand({
    name: 'goto_preferences',
    description: 'Preferences',
}, ({vim}) => {
    vim.window.openPreferences()
})
map(',s', 'goto_preferences', true)

vimfx.addCommand({
    name: 'goto_redirector',
    description: 'Redirector',
}, ({vim}) => {
    vim.window.switchToTabHavingURI('resource://redirector-at-einaregilsson-dot-com/redirector.html', true)
})
map(',r', 'goto_redirector', true)

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
map(',m', 'mpv_current_tab', true)

vimfx.addCommand({
    name: 'search_tabs',
    description: 'Search tabs',
    category: 'location',
    order: commands.focus_location_bar.order + 1,
}, (args) => {
    commands.focus_location_bar.run(args)
    args.vim.window.gURLBar.value = '% '
})
map(',t', 'search_tabs', true)

vimfx.addCommand({
    name: 'toggle_https',
    description: 'Toggle HTTPS',
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
    name: 'org_capture',
    description: 'Capture the selected text using org-protocol'
}, ({vim}) => {
    vimfx.send(vim, 'orgCapture', null, ({title, selection}) => {
        let url = vim.window.gBrowser.selectedBrowser.currentURI.spec
        let org_url = `org-protocol://capture://b/${encodeURIComponent(url)}/${encodeURIComponent(title)}/${encodeURIComponent(selection)}`
        exec('emacsclient', [org_url])
    })
})
map(',b', 'org_capture', true)

//配合gh-Kelo的QR.uc.js (https://github.com/ghKelo/userChromeJS/tree/master/QR)
let qrcode = (text) => {
    exec('sh', ['-c', `qrencode -o- '${text}' | pqiv -i -`])
}
vimfx.addCommand({
    name: 'qrcode',
    description: 'QRcode'
}, ({vim}) => {
    vim.window.QRCreator.run()
})
map(',q', 'qrcode', true)

vimfx.addCommand({
    name: 'restart',
    description: 'Restart',
}, ({vim}) => {
    Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit)
})
map(',R', 'restart', true)

let ublockBootstrap = (document) => {
    let filters = {
        'assets/ublock/experimental.txt': 'enable',
        'https://easylist-downloads.adblockplus.org/easylist_noelemhide.txt': 'enable',
        // 'https://easylist-downloads.adblockplus.org/fanboy-annoyance.txt': 'enable',
        'https://raw.githubusercontent.com/cjx82630/cjxlist/master/cjx-annoyance.txt': 'enable',
        'https://raw.githubusercontent.com/cjx82630/cjxlist/master/cjxlist.txt': 'enable',
        'https://easylist-downloads.adblockplus.org/easylistchina.txt': 'enable',
        'assets/thirdparties/easylist-downloads.adblockplus.org/easylist.txt': 'disable',
        'assets/thirdparties/mirror1.malwaredomains.com/files/justdomains': 'disable'
    }
    let customFilters = [
        'https://github.com/azuwis/org/raw/master/adblock-filters.txt'
    ]
    let lists = document.querySelectorAll('#lists li.listEntry')
    for (let item of lists) {
        let key = item.querySelector('a[data-listkey]').getAttribute('data-listkey')
        let value = filters[key]
        if (value) {
            let checkbox = item.querySelector('input[type="checkbox"]')
            if ((value === 'enable' && !checkbox.checked) || (value === 'disable' && checkbox.checked))
                checkbox.click()
        }
    }
    let externalLists = document.querySelector('textarea#externalLists')
    let customFiltersString = customFilters.join("\n")
    if (externalLists.value !== customFiltersString) {
        externalLists.value = customFiltersString
        let button = document.querySelector('button#externalListsApply')
        button.disabled = false
        button.click()
    }
    button = document.querySelector('button#buttonApply:not(.disabled)')
    if (button)
        button.click()
    button = document.querySelector('button#buttonUpdate')
    button.click()
}
vimfx.addCommand({
    name: 'ublock_bootstrap',
    description: 'uBlock Bootstrap',
}, ({vim}) => {
    let gBrowser = vim.window.gBrowser
    let url = gBrowser.selectedBrowser.currentURI.spec
    let ublockUrl = 'chrome://ublock0/content/dashboard.html#3p-filters.html'
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
        'gmp-gmpopenh264',
        'loop@mozilla.org',
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
    description: 'Bootstrap',
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
