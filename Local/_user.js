//2017.03.01

const EXPORTED_SYMBOLS = ['PREFS']

var PREFS = {
/******************************************************************************************
 *这里是个人设置。
 *******************************************************************************************/
 
//*==========多进程==========*//
/*'browser.tabs.remote.force-enable': true,
'extensions.e10sBlockedByAddons': false,//扩展禁用列表*/

//*==========主页==========*//
'browser.startup.page': 1,//启动Firefox时显示主页
'browser.startup.homepage': "about:newtab",//首頁
'browser.newtabpage.columns': 5,//新标签页列数
'browser.newtabpage.rows': 3,//新标签页行数
//标签页固定的网站
'browser.newtabpage.pinned': "[{\"url\":\"https://hbr.org/\",\"title\":\"HBR\"},{\"url\":\"http://www.economist.com/\",\"title\":\"Economist\"},{\"url\":\"http://www.cnn.com/\",\"title\":\"CNN\"},{\"url\":\"https://www.ft.com/\",\"title\":\"Financial Times\"},{\"url\":\"http://www.nytimes.com/\",\"title\":\"NYTimes\"},{\"url\":\"http://www.wsj.com/\",\"title\":\"WSJ\"},{\"url\":\"https://docs.google.com/spreadsheets/u/0/\",\"title\":\"Google Sheets\"},{\"url\":\"http://bbs.kafan.cn/forum-215-1.html\",\"title\":\"Kafan\"},{\"url\":\"http://www.cnbeta.com/\",\"title\":\"cnBeta\"},{\"url\":\"http://www.zhihu.com/explore\",\"title\":\" Zhihu\"},{\"url\":\"http://www.douban.com/\",\"title\":\"Douban\"},{\"url\":\"https://www.youtube.com/\",\"title\":\"Youtube\"},{\"url\":\"http://open.163.com/\",\"title\":\"Open.163\"},{\"url\":\"http://music.163.com/\",\"title\":\"Music\"},{\"url\":\"http://email.163.com/\",\"title\":\"Mail\"}]",
 
//*==========Firefox设置==========*//
'layers.acceleration.disabled': true,//禁用硬件加速MacType才生效
'signon.rememberSignons': false,//不保存密码
'accessibility.blockautorefresh': false,//当网站试图重定向或重新载入时警告(否)
//字體語言編碼
'font.name.serif.zh-CN': "Arial",//衬線字體
'font.name.sans-serif.zh-CN': "Arial",//無衬線字體
'font.name.monospace.zh-CN': "Arial",//等寬字體
//書籤相關
'browser.bookmarks.autoExportHTML': true,//關閉Firefox时自動生成HTML書籤備份
'browser.bookmarks.max_backups': 0,//最大备份数目
'browser.places.smartBookmarksVersion': -1,//禁用智能书签

//*=插件=*//
'plugins.navigator.hidden_ctp_plugin': "Shockwave Flash",//神奇参数，52以上有效，配合flash询问激活，一些澳门赌场上线啦的网站实现H5播放，类似navigator.plugins spoofing脚本，53、54乱弹flash提示

//*=網路相關=*//
//网络设定
'nglayout.initialpaint.delay': 0,
'network.http.pipelining': true,
'network.http.proxy.pipelining': true,
//平滑滾動
'general.smoothScroll.durationToIntervalRatio': 500,
'mousewheel.min_line_scroll_amount': 35,

//*=隐私相关=*//
//其它隐私相关
'browser.polaris.enabled': false,//彻底关闭Tracking protection 跟踪保护
'privacy.trackingprotection.pbmode.enabled': false,//彻底关闭Tracking protection 跟踪保护
'browser.send_pings': false,//禁止Hyperlink Auditing/Beacon: Hyperlink Auditing 就是 ping 服务，Firefox 会把你点击过的链接及其时间发回给服务器，Hyperlink Beacon 是使用 navigator.sendBeacon()在你离开一个页面时将一些数据回传给服务器
'browser.newtabpage.directory.ping': "",//禁止新标签页面的建议磁贴和增强磁贴
'browser.urlbar.suggest.searches': false,//禁止地址栏搜索提供搜索建议

//*=FX其它类=*/
/**
*会话相关
*/
'browser.sessionstore.resume_from_crash': false,//关闭Firefox会话恢复功能
'browser.sessionstore.max_tabs_undo': 10,//最近撤销标签历史最大数
'browser.sessionstore.interval': 600000,//防止向SSD写入大量数量: 重写recovery.js文件的默认数值为“15000ms”(间隔时间15s), 改为10分钟
//其它FX
'general.skins.selectedSkin': "simplewhitex",//使用SimpleWhite主題
'gfx.content.azure.backends': "direct2d1.1,cairo",//图形渲染;FX52默认的Skia不支持Mactype
'view_source.editor.external': true,//页面源代码——使用外部編輯器查看
'browser.backspace_action': 2,//禁止Backspace键返回上一页
'dom.battery.enabled': false,//禁止电池状态API, 防止信息泄露
'reader.parse-on-load.enabled': false,//禁用阅读模式
'browser.tabs.closeWindowWithLastTab': false,//关闭最后一个标签时不关闭Firefox


//*==========扩展设置==========*//
//adblockplus
'extensions.adblockplus.patternsbackups': 0,
'extensions.adblockplus.frameobjects': false,//在Java和Flash上显示标签 - 否
'extensions.adblockplus.subscriptions_antiadblockurl': "https://github.com/reek/anti-adblock-killer/raw/master/anti-adblock-killer-filters.txt",//原反-反ADP列表
//-非侵入式广告地址換成个人ABP规则
'extensions.adblockplus.subscriptions_exceptionscheckbox': true,//非入侵式广告勾选框
'extensions.adblockplus.subscriptions_exceptionsurl': "https://github.com/dupontjoy/customization/raw/master/Rules/ABP/Floating-n-Porn-Ads-Filter.txt",//原非入侵式广告订阅网址

//Autoproxy
'extensions.autoproxy.customProxy': "Shadowsocks;;1080;socks$XX-Mini;;8087;$Lantern;;8787;$Psiphon;;8080;$Free%20Gate;;8580;",
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
'extensions.dta.confirmremove': false,//移除下載前不提示
'extensions.dta.loadendfirst': 4096,//先下载最后一段数据(KB)

//Greasemonkey
'extensions.greasemonkey.stats.prompted': true,//不弹改进建议提示
'extensions.greasemonkey.installDelay': 0,//安裝時的倒計時

//Stylish
'extensions.stylish.firstRun': 3,//重建配置不弹歡迎頁

//iMacros
'extensions.imacros.delay': 1000,//播放速度中等
'extensions.imacros.noloopwarning': true,//运行的提示(否)

//Pocket(Readitlater)
'extensions.isreaditlater.open': "tab",//新标签打开项目
'extensions.isreaditlater.show-count': true,//显示未读计数
'extensions.isreaditlater.show-date': true,//显示日期
'extensions.isreaditlater.list-place': "sidebar",//在(侧边栏)打开列表
'extensions.isreaditlater.showStatusIconClick': "hide",
'extensions.isreaditlater.showStatusIconShare': "hide",
'extensions.isreaditlater.showStatusIconText': "hide",
'extensions.isreaditlater.autoOffline': false,//自动离线(否)

//All Tabs Helper
'extensions.alltabshelper@alltabshelper.org.showUndoInTabContextMenu': false,//在标签页键显示Unload菜单(否)
'extensions.alltabshelper@alltabshelper.org.showDontAutoUnloadItem': false,//在标签页键显示Don't Auto Unload菜单(否)
'extensions.alltabshelper@alltabshelper.org.tabUnloadTimerValue': 0,//(分钟)0表示禁用

//Tab Groups
'extensions.tabgroups.groupTitleInButton': false,//按钮-显示当前分组名称(否)
'extensions.tabgroups.noWarningsAboutSession': true,//重启时保持标签页分组(否)

//*==========脚本设置==========*//
//UC管理器取消延迟加载
'userChrome.EXPERIMENT': true,

//InspectElementModY
'userChromeJS.InspectElement.contentType': 2,//查看页面:Dom Inspector
'userChromeJS.InspectElement.mainWinType': 2,//查看窗口:Dom Inspector

//GrabScroll
'grabScroll.button': 1,//使用GrabScroll抓取的键位：中键
'grabScroll.clickable': false,//能够在链接上使用GrabScroll

//*=newDownloadPlus=*//
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

//FeiRuoTabplus
'userChromeJS.FeiRuoTabplus.UndoBtn': false,//撤销关闭按钮(否)
'userChromeJS.FeiRuoTabplus.TabFocus': false,//悬停自动聚焦(否)
'userChromeJS.FeiRuoTabplus.NewTabUrlbar_SH': false,//域名相同在当前页打开(否)
'userChromeJS.FeiRuoTabplus.SideBarNewTab_SH': false,//域名相同在当前页打开(否)
'userChromeJS.FeiRuoTabplus.NewTabNear': 2,//新建标签在(当前右边)
'userChromeJS.FeiRuoTabplus.ColseToNearTab': 1,//关闭标签转到(当前左边)
'userChromeJS.FeiRuoTabplus.NewTabExcludeUrl': "^(javascript:)\n^(imacros:)",//URL在当前页打开

//FeiRuoMouse


}