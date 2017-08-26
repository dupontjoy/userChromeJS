//2017.07.25

const EXPORTED_SYMBOLS = ['PREFS']

var PREFS = {
/******************************************************************************************
 *这里是个人设置。
 *******************************************************************************************/
 
//*==========多进程==========*//
/*'browser.tabs.remote.force-enable': true,
'extensions.e10sBlocksEnabling': false,//扩展禁用列表
'extensions.e10sBlockedByAddons': false,//扩展禁用列表
'dom.ipc.processCount': 4,//进程数(最大支持8)*/
'extensions.allow-non-mpc-extensions': true,//强制开启非多进程扩展

//*==========主页==========*//
'browser.startup.page': 1,//启动Firefox时显示主页
'browser.startup.homepage': "about:newtab",//首页
'browser.newtabpage.columns': 5,//新标签页列数
'browser.newtabpage.rows': 3,//新标签页行数
//标签页固定的网站
'browser.newtabpage.pinned': "[{\"url\":\"https://hbr.org/\",\"title\":\"HBR\"},{\"url\":\"http://www.economist.com/\",\"title\":\"Economist\"},{\"url\":\"http://www.cnn.com/\",\"title\":\"CNN\"},{\"url\":\"https://www.ft.com/\",\"title\":\"Financial Times\"},{\"url\":\"http://www.nytimes.com/\",\"title\":\"NYTimes\"},{\"url\":\"http://www.wsj.com/\",\"title\":\"WSJ\"},{\"url\":\"https://docs.google.com/spreadsheets/u/0/\",\"title\":\"Google Sheets\"},{\"url\":\"http://bbs.kafan.cn/forum-215-1.html\",\"title\":\"Kafan\"},{\"url\":\"http://www.cnbeta.com/\",\"title\":\"cnBeta\"},{\"url\":\"http://www.zhihu.com/explore\",\"title\":\" Zhihu\"},{\"url\":\"http://www.douban.com/\",\"title\":\"Douban\"},{\"url\":\"https://www.youtube.com/\",\"title\":\"Youtube\"},{\"url\":\"http://open.163.com/\",\"title\":\"Open.163\"},{\"url\":\"http://music.163.com/\",\"title\":\"Music\"},{\"url\":\"http://email.163.com/\",\"title\":\"Mail\"}]",
 
//*==========Firefox设置==========*//
'browser.shell.checkDefaultBrowser': false,//不检查是否为默认浏览器
'layers.acceleration.disabled': true,//禁用硬件加速MacType才生效
'signon.rememberSignons': false,//不保存密码
'dom.disable_open_during_load': false,//拦截弹出式窗口(否)

//证书
'security.default_personal_cert': "Select Automatically",//自动选择一个个人证书
'security.OCSP.enabled': 0,//禁用OCSP查询

//字体语言编码
'font.name.serif.zh-CN': "Arial",//衬线字体
'font.name.sans-serif.zh-CN': "Arial",//无衬线字体
'font.name.monospace.zh-CN': "Arial",//等宽字体

//书签相关
'browser.bookmarks.autoExportHTML': true,//关闭Firefox时自动生成HTML书签备份
'browser.bookmarks.max_backups': 0,//最大备份数目
'browser.places.smartBookmarksVersion': -1,//禁用智能书签

//平滑滚动参数
'general.smoothScroll.mouseWheel.durationMaxMS': 150,
'general.smoothScroll.mouseWheel.durationMinMS': 150,
'mousewheel.acceleration.factor': 15,
'mousewheel.acceleration.start': 3,
'mousewheel.default.delta_multiplier_y': 160,

//插件
'dom.ipc.plugins.unloadASAP': true, //网页不使用flash后自动关闭Plugin-container
'dom.ipc.plugins.enabled': false, //关闭插件的防崩溃保护
'dom.ipc.plugins.enabled.npctrl.dll': false,
'dom.ipc.plugins.enabled.npqtplugin.dll': false,
'dom.ipc.plugins.enabled.npswf32.dll': false,
'dom.ipc.plugins.enabled.nptest.dll': false,
'dom.ipc.plugins.flash.subprocess.crashreporter.enabled': false,//禁用火狐插件防崩溃功能
'plugins.click_to_play': false,//关闭点击才运行插件
'plugins.hide_infobar_for_missing_plugin': true,//隐藏信息栏缺失插件消息提醒
'plugins.hide_infobar_for_outdated_plugin': true,//过期插件不提示
'plugins.hide_infobar_for_blocked_plugin': true,//插件屏蔽选择不提示
'extensions.blocklist.enabled': false,//关闭flash版本过旧被屏蔽的提示

//Quantum Flow
'layers.gpu-process.dev.enabled': true,//强制启用Quantum Compositor
'layout.css.servo.enabled': true,//强制启用Stylo样式引擎

//*=隐私相关=*//
//其它隐私相关
'dom.webnotifications.enabled': false,//关闭 WEB 推送通知
'dom.webnotifications.serviceworker.enabled': false,//关闭 WEB 推送通知
'browser.polaris.enabled': false,//彻底关闭Tracking protection 跟踪保护
'privacy.trackingprotection.pbmode.enabled': false,//彻底关闭Tracking protection 跟踪保护
'browser.send_pings': false,//禁止Hyperlink Auditing/Beacon: Hyperlink Auditing 就是 ping 服务，Firefox 会把你点击过的链接及其时间发回给服务器，Hyperlink Beacon 是使用 navigator.sendBeacon()在你离开一个页面时将一些数据回传给服务器
'browser.newtabpage.directory.ping': "",//禁止新标签页面的建议磁贴和增强磁贴
'browser.urlbar.suggest.searches': false,//禁止地址栏搜索提供搜索建议
'media.mediasource.enabled': false,//关闭DASH,加载全部视频

//*=FX其它类=*/
/**
*会话相关
*/
'browser.sessionstore.resume_from_crash': false,//关闭Firefox会话恢复功能
'browser.sessionstore.max_tabs_undo': 10,//最近撤销标签历史最大数
'browser.sessionstore.interval': 600000,//防止向SSD写入大量数量: 重写recovery.js文件的默认数值为“15000ms”(间隔时间15s), 改为10分钟

//其它FX
'general.skins.selectedSkin': "simplewhitex",//使用SimpleWhite主题
'gfx.content.azure.backends': "direct2d1.1,cairo",//图形渲染;FX52默认的Skia不支持Mactype
'view_source.editor.external': true,//页面源代码——使用外部编辑器查看
'browser.backspace_action': 2,//禁止Backspace键返回上一页
'reader.parse-on-load.enabled': false,//禁用阅读模式
'browser.tabs.closeWindowWithLastTab': false,//关闭最后一个标签时不关闭Firefox
'browser.link.open_newwindow.restriction': 0,//单窗口模式(弹出窗口用标签打开)
'security.sandbox.content.level': 3,//沙盒级別

//*==========扩展设置==========*//

//Autoproxy
'extensions.autoproxy.customProxy': "Shadowsocks;;1080;socks$XX-Mini;;8087;$Lantern;;8787;$Psiphon;;8080;$Free%20Gate;;8580;",
'extensions.autoproxy.patternsbackups': 0,
'extensions.autoproxy.defaultstatusbaraction': 0,//点击图标时-快捷菜单
'extensions.autoproxy.defaulttoolbaraction': 0,//点击图标时-快捷菜单


//LastPass
'extensions.lastpass.hidecontextmenu': true,
'extensions.lastpass.showHomepageAfterLogin': false,//登入后不转到密码库
'extensions.lastpass.0a148091163b8a7de3368af449db2947c700bea1552b01964d4ae55f930562e0.toplevelmatchingsites': true,//将匹配网站移动到顶部菜单
'extensions.lastpass.0a148091163b8a7de3368af449db2947c700bea1552b01964d4ae55f930562e0.RepromptTime': 86400,//免验证24小时
'extensions.lastpass.loginpws': "",//不保存密码
'extensions.lastpass.prevHkKeyCode': 38,//上一个密码(方向键:上)
'extensions.lastpass.prevHkMods': "alt",//上一个密码(Alt)
'extensions.lastpass.nextHkKeyCode': 40,//下一个密码(方向键:下)
'extensions.lastpass.nextHkMods': "alt",//下一个密码(Alt)

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
'extensions.dta.conflictresolution': 0,//文档已存在时自动重命名
'extensions.dta.alertbox': 0,//下载完成后对话窗口提示
'extensions.dta.closedta': true,//辩识并列出Flash影片
'extensions.dta.ctxmenu': "0,0,0",//不显示右键菜单
'extensions.dta.confirmremove': false,//移除下载前不提示
'extensions.dta.loadendfirst': 4096,//先下载最后一段数据(KB)

//Greasemonkey
'extensions.greasemonkey.stats.prompted': true,//不弹改进建议提示
'extensions.greasemonkey.installDelay': 0,//安装时的倒计时

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

//SimpleProxy
'extensions.simpleproxy.address.0': "127.0.0.1",
'extensions.simpleproxy.address.1': "127.0.0.1",
'extensions.simpleproxy.list.0': "https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt",
'extensions.simpleproxy.list.1': "https://github.com/dupontjoy/customization/raw/master/Rules/Autoproxy/Aup-Cing-List.txt",
'extensions.simpleproxy.manage': 10,
'extensions.simpleproxy.number': 2,
'extensions.simpleproxy.port.0': 1080,
'extensions.simpleproxy.port.1': 1080,
'extensions.simpleproxy.protocol.0': "socks",
'extensions.simpleproxy.protocol.1': "socks",


//*==========脚本设置==========*//
//InspectElementModY
'userChromeJS.InspectElement.contentType': 2,//查看页面:Dom Inspector
'userChromeJS.InspectElement.mainWinType': 2,//查看窗口:Dom Inspector

//GrabScroll
'grabScroll.button': 1,//使用GrabScroll抓取的键位：中键
'grabScroll.clickable': false,//能够在链接上使用GrabScroll

//*=newDownloadPlus=*//
//主界面
'userChromeJS.downloadPlus.downloadSound_Play': true,//下载完成提示音
'userChromeJS.downloadPlus.downloadFileSize': true,//精确显示文件大小
'userChromeJS.downloadPlus.autoClose_blankTab': true,//自动关闭空白标签
'userChromeJS.downloadPlus.download_speed': true,//下载面皮显示下载速度
//下载界面
'userChromeJS.downloadPlus.download_dialog_saveas': true,//另存为
'userChromeJS.downloadPlus.download_dialog_saveTo': true,//保存到
'userChromeJS.downloadPlus.download_dialog_saveTo_suffix': 1,//保存到——后缀样式
'userChromeJS.downloadPlus.download_dialog_showCompleteURL': true,//双击复制完整地址
'userChromeJS.downloadPlus.download_dialog_doubleclicksaveL': false,//双击保存执行下载
'userChromeJS.downloadPlus.download_dialog_doubleclickanyW': false,//双击任意地方执行下载
//其他
'userChromeJS.downloadPlus.new_Download': true,//新建下载
'userChromeJS.downloadPlus.new_Download_popups': true,//新建下载——是否弹窗
'userChromeJS.downloadPlus.downloadsPanel_removeFile': true,//从硬盘删除
'userChromeJS.downloadPlus.download_checksum': true,//Hash计算
'userChromeJS.downloadPlus.save_And_Open': true,//保存并打开
'userChromeJS.downloadPlus.save_And_Open_RorL': 1,//保存并打开——打开文件
'userChromeJS.downloadPlus.download_dialog_changeName': true,//下载改名
'userChromeJS.downloadPlus.download_dialog_changeName_encodingConvert': true,//下载改名——是否开启下拉菜单

//FeiRuoNet
'userChromeJS.FeiRuoNet.EnableRefChanger': true,//Refer切换,破解反盗链
'userChromeJS.FeiRuoNet.EnableUAChanger': true,//UA切换
'userChromeJS.FeiRuoNet.ModifyHeader': true,//HTTP头信息
'userChromeJS.FeiRuoNet.UrlbarSafetyLevel': false,//HTTPS等级高亮
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
