
//2015.09.26 精簡
//2015.07.29 14:00 增加在線編碼工具
//2015.07.19 16:00 統一黑白系圖標
//2015.05.31 18:00 加入更新IP批處理
//2015.05.08 09:00 加入SumatraPDF
//2015.05.03 14:00 調整菜單順序，加入Win8.1優化批處理
//2015.04.27 09:00 加入GoGo Tester
//2015.03.29 20:00 Software和 Plugins分離出配置文件夾
//2015.03.26 12:00 加入ReRe，Winmaster
//2015.03.25 20:00 加入DnsJumper, FastStone Capture
//2015.03.06 15:00 修改快捷方式，把文字改爲繁體
//2015.02.09 20:00 添加清理垃圾緑色版
//2015.01.26 21:00 更新備份模塊

/**********************************************************************************
 *此處爲按鈕設置
 *************************************************************************************/
var anobtnset = {
//※必須設置按鈕放在哪個id之前，alltabs-button，back-button等
intags: "tabbrowser-tabs",

//※必須設置按鈕圖標，像素59x27（默認大小）
image: "data:image/png;base64,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",//背景（相濟茶）文字（白鼠）

//菜單彈出方向，不設置就默認,參考 https://developer.mozilla.org/en-US/docs/XUL/PopupGuide/Positioning
position: "",
};

/**********************************************************************************
 *child:[  ]内爲當前菜單的下一級菜單配置,支持多級
 *text 爲运行參数，如果无需參数，直接删除text属性
 *exec 爲打開路径，可以是任意文件和文件夹，支持相对路径，相对於配置文件夹；
 *【文件夹】不支持直接“\\”開头的相对路径，需要用【Services.dirsvc.get("ProfD", Ci.nsILocalFile).path】開头
 *oncommand 可以用function(){}；
 *小書簽可以用oncommand:function(){
gBrowser.loadURI("javascript:内容")
 }；
 *-------------------------------
 *除了以上属性外，可以自定义添加其他属性，如果快捷键accesskey等
 *-------------------------------
 *{}, 爲分隔条
 *-------------------------------
 *如果設置了id属性，会尝试获取此id并移動，如果在瀏覧器中没有找到此id，則创建此id
 *************************************************************************************/
 
//下面添加菜單
var anomenu = [{
label: "長期維護",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaElEQVQ4jX3Sz0vUURQF8M/MYDWRCS2arIgiIZEEXQQSSBFBm6BFC4kKIkjEQCmFaGUUGSoo9GNqkVNBm6AW0a6/I/p7WnzPyJcnduDC495zzn3vvkuFAXTQwDk8xTZ6+JR4gjP2wDV8wU28xlt0Y3YAJ3EbP8Jt1MUtvMQ3/MVHvMd3HCsaLeMPbqHZTx7CBkZxKTGSm1zH/prBqTynm5uAE9jCUNHtCn7iaC3XxDPciKYDd/CwEJ/FemZSYiHmc7gLm7hQIxzBm5AapRqLuIzJaG2rptxHBx9wP10WMJ7aAF6pfud4tHoYLrqM52n38Eu1FzCFtRgN9w26GCsMJvAVv7GE05gOdzKcMbyDx5gpDPZlBs/TcQMrMe5jJlrnM4zDdqOh2sSDaosT7ma0YD5RJ+2FZo2/g0G8wCza/xG38SDcwbI4hEeqN19VfWc70UluLZxya3fQwkWs4rNq73s5r6bWqgv+AYBxON0vXviZAAAAAElFTkSuQmCC",
child: [
{
label: "火狐範 首頁",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/')",
image: "http://www.firefoxfan.com/favicon.ico"
},
{
label: "火狐範 可用IP",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-gaogent/goagent-ip.html')",
image: "http://www.firefoxfan.com/favicon.ico"
},
{},
{
label: "CingFox 發佈頁",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://bbs.kafan.cn/thread-1792671-1-1.html')",
image: "http://bbs.kafan.cn/favicon.ico"
},
{
label: "淸 GitHub腳本備份",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('https://github.com/dupontjoy/userChromeJS')",
image: "https://assets-cdn.github.com/favicon.ico"
}, ]
},{},{
label: '批處理',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jc2Quw2EMBBEX0ZEE9ThCsgp42LqIKYOQro5icDRVXCXDNay+GQLEfAkS/7szKwXbqQDvpWryxm8gLkiaFbtiQUYtP+XjGoWL26AD9BWdNCqtrGXPbAW0m0XqzSJCRgr0ndGaRIbEDNJFvsWpUlEIDhDew5OEKQ5uFt6CfbEN+7PXpNrucTDDPzQSvihnoZWWrmhXuMHem9Lmy9WtnwAAAAASUVORK5CYII=",
child: [{
label: "備份批處理",
tooltiptext: "1. 備份Profiles\n2. CingFox製作\n3. 備份Plugins和Software文件夾\n4. 提取32位Flash插件\n5. 備份詞典和user.js到GitHub",
exec: Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\local\\BackupProfiles\\Backup_7z.bat",
},{},
{
label: "更新proxy.ini",
tooltiptext: "一鍵下載KT分享的IP",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\GFW\\IP-Update\\更新IP.bat",
},{},
{
label: "Notepad2.reg",
tooltiptext: "通過映象劫持以Notepad2替換自帶记事本",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\Notepad2\\Notepad2.reg",
},]
},{},{
label: '外部打開',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcUlEQVQ4jbXTvQmFQBBF4S+wCMNXgh1oRfZmblsiYqCBBr7FnxHZCxMt9+yZhSVDfliC8yn5AQV6DBgxJaU/wNN+NeZ9LgFnBsdyvVuEAWnZW4O0DF0UUNoerr0wCxlUd4UI4PZGNF8B8cMoIPvnOc0KNDA9zZlUdtUAAAAASUVORK5CYII=",
child: [
{
label: "在IE中打開",
text: "%u",
exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
},
{
label: "在Chrome中打開",
text: "%u",
exec: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
},]
},{},{
label: '軟件列表',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKElEQVQ4jWNgoBL4TwSmrQGDD7QRiWlnwMCBrQQw7Q0YOECxswfO3wBrBTGdpowsywAAAABJRU5ErkJggg==",
child: [{
label: 'GFW工具',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADIElEQVQ4jXXP3WtaZxwH8B9UyonnzJko6lHj8aVuiqWwiy0J8RiNMS9W43vBLHFksFAIo7AUBtvtdlcGvck2mrXp1pqk9eBrXezM2plubecoBLb78sChf8Z3F0kxg/WBLzzwwOf7fYiIaM1K2isBcqz7Sdo4yZvuG36SrgTIsWYlLZ2cM9fHNFfvhvmXu2GBbctD7KasZbthgd0J8WxrcojthgVWnhLY1uQQ25ni2d0w//L6mOZqgegMfe0n8XZIOHqY86BbeBfVBRGttAsPC1600i7cn7NgP+/Fz3kv9mYtaKSdaGbc+D7IH33hJ5GuuUjqrrzD/vnsPfz9aQDdkhv99Qs4uuzD01UPOstevPjEj/6qB62cHYcf+fF82YXKvIF96SeJrvlJqmdH2UHJjoMPRTQu2dBZdmE/Z0Q7a0ItJ6GdNqGdHEElbkIjZUNz9i3cCmlPABdJ+xmRdVZceHb5Al6s+fCk5EZ76Rz6H/vwZ8mNRtqG3ooPT4tO/JqxoZGSsDdvZhuvFyizOlbPimhfktBeHEEzaYCSsqN50YDWgh73Zg2oJ0TUpnko0zrsxSz4QRYGQDNpZn+tnkNvyYlWwY3nJS+eLblQT4h4XPTi94KE7qIVtYQDhzkneik7ypHhAbAb4dmDxAiqMR0qCStacQPqUQE7ET1qcRG1iIB7QQ47URPqET2UIIfvPjh7DHzlJ6k+b2CP8nY00k78UXTjSd6B6pwZB3kPemk7OnELlAUbehkJvy3aoESNuBkTBwvKspbVZnTYm7OgNq1DLSygPKWHMmNCJcjhvsyjPG2CEhKgyFrckXXYnBoZLFBiw+ww60AvY4cyY0I360EvZUMnbj7VbEUlasQvGTd6KRtuh/Vs/TWwPckxRdaiGjrWlagRlcn/b1aiRihBDt+OcQOgEh1myowJ3RP9v83Hfz79Vl2w48eY4Rj4PECOG+9r+ltj3KtyZFgtT5xVt8c16g1Zr5aDnPrThEbdHOfUWxG9uj2hUbfGNepm6O1X30xw/bUAOchMxBet5FsZpfNFBwVyp5J8Qy6O0vmklXxmIv5f9JS03spk0uoAAAAASUVORK5CYII=",
child: [
{
label: "GoA文件夾",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\GFW\\Goagent\\local\\",
},{},
{
label: "Goagent",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\GFW\\Goagent\\local\\goagent.exe",
},{},
{
label: "Shadowsocks",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\GFW\\Shadowsocks\\Shadowsocks.exe",
},{},
{
label: "Psiphon",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\GFW\\psiphon\\psiphon3.exe",
},
]
},
{
label: '其它軟件',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABwUlEQVQ4jZ3Tv08aYRwG8PdPabqbhmiiqO8dhNkF4sIRcMFBatJGFnFWF4emRq+hQ5uIwOCJcWEyOkBPoyWpkzFKXNSXE1G50+SbA58OtPaHR9Lrk3yG9/s868uYQyT13COpYt6nXi741MsFSRXzknrucdo6JpA2pgPLYo4viThfEvHAspgLpI1px3Fo+6Iv/KWWVHQxE9FFKlo2ZsPFq7PojqFFdmvJyG4tGd0xtHDx6ixaNmYjukgpuphRyrWp0PZFH4t9vdmfOLEfX5+28FOi2vrj7XSbOLEfYwc3FRarmJSoAolTl6pArGISU/ZMGj8C4i6NHwHKnklstGTR2CEw9s2lQ2C0ZBELblkU3gf+R3DLIjZStChYApyEyh3d+pGiRcy/2iB/zoTvBzlrQso0MfzpFv0frtGvXoN/voWUaULO/tr5cib8qw1icr5J/g0bTwodPPeAl2+P8eLNMYazD0/337dyvkmM5y2SN4G/SetteN438OpdA1xrP+vlTYDnLWLezD0NaoB37blBraNb583cExtaudN5wW5LGy24wQt2e2jlTme9i6JnIF2fHPhYT7mSrk/2Loqef/6h3fIdt9x6jwguSQ8AAAAASUVORK5CYII=",
child: [
{
label: "PicPick",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\Other\\PicPick\\PicPick.exe",
},{},{
label: "ScreenToGif",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\Other\\ScreenToGif.exe",
},]
},]
}, {},
{
label:"編碼工具",
image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlUlEQVQ4ja2TwQ2AIAxF3wau4QCuwCxcPTKMI7iBO7iCA3BiArxUJaSCik2a0NL/+1MK/Gg9MAMBiDcepKbXwB4Yga7QpJMan5PMcvHUnGBOC5XOmpKQJuILsIpJg5VraA7Y5OwBWyMYBHScYxb7JwSpAs1NiWDimq6RvE3ipabAiMyoKCnOoPkZmxepeZUPks+f6bPtGg1LLkKBszsAAAAASUVORK5CYII=",
child:[
{
label: "Javascript格式化",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaElEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcBAyBBCBqBjkgwgSi264Ewo7YFk60wcavEacBRNTJlUA/KgckfxqMVrAAzADCLoAnSnIyvOY0CECV4DkAOM7EDEB3AaQAqmDgAAtlxHLWMw/vEAAAAASUVORK5CYII=",
oncommand: 'gBrowser.selectedTab = gBrowser.addTab("http://tool.oschina.net/codeformat/js");',
},
{
label: "CSS格式化",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAhElEQVQ4jWNgQID/BDBBgE/RfwYGhgZiDfDAYut/BgaG64QMgWk4CqXzoIbB5MQJGQIzYCYeObyGoLvAA+oKmBzBQMUXBrjUEhYkx4CZUPZRHHyCBsAUKuPgEzQgjwE1DND5BA3QhdJbGRDpgIGBgeEkA2q6wGnAakpdQAzAaQApmDoAABPeUU+r3umtAAAAAElFTkSuQmCC",
oncommand: 'gBrowser.selectedTab = gBrowser.addTab("http://tool.oschina.net/codeformat/css");',
},
{
label: "文字Base64編/解碼",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAbElEQVQ4jWNgGAzgPwUYbgC5FmMYcBTJdA8smo4yMDAo4zIgD4oZoIrQXZYHFcNpALLp6EAZKo/XBf+RbEH3AkwjUQbg8xpBA5ABsq3o0aeMzYCZaM7GFr14XQBTgGwLyQaQAlAMoCgpDywAAF13Uxwj2+klAAAAAElFTkSuQmCC",
oncommand: 'gBrowser.selectedTab = gBrowser.addTab("http://tool.oschina.net/encrypt?type=3");',
},
{
label: "JavaScript壓縮",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3klEQVQ4jcWT3WoCQQxG5y0238mb1PWHKvVJ6qUtBd+00lfYdRF61eLV9saROJVVodDAQJhJTpKZb1L6CwPeJU3uiH8AtqcNM5sBnZnN8p67v4WEdfBHQCNpeUaVNAF2VVU9HgF9gH0ek2ugAZ4utiZpDLTAogTkAu4+vzZfDTQF4FCOeKn6s7v3Ye0DtIlnkl4Gu/gfk7QqRvjKZ+7+XYzwOgQaA21xiT3QAYtrXZy0UALcfT4Iycn5qUpASimZ2RTY/RJSkPI0JEUpb4JfA+2ZlIHtnZ9pBHzcGj9oP3TiU7Bc9Gx1AAAAAElFTkSuQmCC",
oncommand: 'gBrowser.selectedTab = gBrowser.addTab("http://closure-compiler.appspot.com/home");',
},
{
label: "CSS壓縮",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3klEQVQ4jcWT3WoCQQxG5y0238mb1PWHKvVJ6qUtBd+00lfYdRF61eLV9saROJVVodDAQJhJTpKZb1L6CwPeJU3uiH8AtqcNM5sBnZnN8p67v4WEdfBHQCNpeUaVNAF2VVU9HgF9gH0ek2ugAZ4utiZpDLTAogTkAu4+vzZfDTQF4FCOeKn6s7v3Ye0DtIlnkl4Gu/gfk7QqRvjKZ+7+XYzwOgQaA21xiT3QAYtrXZy0UALcfT4Iycn5qUpASimZ2RTY/RJSkPI0JEUpb4JfA+2ZlIHtnZ9pBHzcGj9oP3TiU7Bc9Gx1AAAAAElFTkSuQmCC",
oncommand: 'gBrowser.selectedTab = gBrowser.addTab("http://csscompressor.com/");',
},
]
}, {},
{
label:"常用功能",
image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAG0lEQVQ4jWNgGCzgP5l4EIFRLwwGMIScOvgAAMPmMc89jdNcAAAAAElFTkSuQmCC",
child:[
{
label : "证书管理",
oncommand: function () {
window.open('chrome://pippki/content/certManager.xul', 'mozilla:certmanager', 'chrome,resizable=yes,all,width=600,height=400');
},
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuklEQVQ4jcWSqw7CMBSG93y1yGZvMLHUV6Ga6YkmhHdoFkIHZqllQRAwMyMQxLJNcAnIH1fBEN0m9ifHHPHlOxfPmzyMMYwpjzGGoekADmWDUBqE0uBQNv0BVGgQrkC4AhW6P8CPUgvwo9T2kyTp1F9AXlSgQoMKjbyo+hlc6yeCOEP7+KC+vxFKg1v7cjcI4gyEKyz0EcvNCYQrhNK4G8zmKzv/7yKdDNa7c+cK2/3F3WBILGDUK0+eLwDMbVc5IMVkAAAAAElFTkSuQmCC"
//chrome://mozapps/skin/extensions/category-dictionaries.png
},{},
{
label: "瀏覽器控制台",
oncommand: "HUDService.openBrowserConsoleOrFocus();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABQ0lEQVQ4jX2TS05CQRBFi4FNrHPBffCRuA0W4tgpUbYADDBxD7ID4giXQMQFGAhjHQADcWC/l6b51LDfrVN976s2yyqE0AAGkhbABthI+gAGIYRGrj/odfcxsAZ6QNvMqmZWBTru3gfWkl7M7PqoGZhKmpjZTXEoaSZplujqkibAm5kFS4TPsbmSUiPgPRtWkTRx93EhagKrSM8nHlTyvQ4sJTUNGLp7/8LEkzeKOQ0tpt3Jxe7+eA4UAW1JCwO29p92Pm0PPFxgBGBbAnL/EfDr7vdncpCk79JC7l/SPkJ27t7NcwBugflBiLmFBLI8kUEPGJmkVhTUM8EyAayy/uI3toppR4vk7l1gBXylFiwukqTnPNGppFczqx0HXlbt5CoXkPQxxetdmRnufufuT5ceU1lxtUeSPoEd8APM41kr1/8BlhlfHqOqklEAAAAASUVORK5CYII="
},
{
label: "错误控制台",
oncommand: "toJavaScriptConsole();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXklEQVQ4jaWT0QnAIBBDs9dboUs5VQewe51fFim21ksgv48kEMkVUIFIugqIrIC4AUc5tzwFdKUBVgJ7A0khKQ/oGiEr4GuFv0mWCbYAsw2edUZ/VkglcADOmS77zQ2WT6Il/QiZvAAAAABJRU5ErkJggg=="
},
{
label:"代码速记",
oncommand: "Scratchpad.openScratchpad();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABCklEQVQ4ja2SvUrEQBSFL7KFlW1SpvINJpN7zgNoYacidoG7D+ArLCLsFrZ5BxG0mMLS0lTbrW+Ryk6LsUkkaNzEnwMHhoHv486PHC0e4tTKUP4sMLP4OSGEL3tm9j8CAFckXwAcfwhCCKM1s6iqFyQjyQjgFcDJ5Anquo7OuRTAcych+TZJUFVVLMsyisjMe5/0JWJm8bv24aZpIskbVT3tJABWgxfbBcASwNo5l5K8A3Dfrufe+70xeDUEA1gDuNwKq+piC7x97CzLdknOfwWLyA7JJ+99QvIMwO1PYMnzfL99no33PhGRWQsvR+H27Oe9T7JxzqWqejgJbgUHABqSjwCui6LgGPMOxkxvJUAHypcAAAAASUVORK5CYII="
},
{},
{
label: "关于about",
oncommand: "gBrowser.selectedTab = gBrowser.addTab('about:about');",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtElEQVQ4jd1TsQ2EMAzMHjRsBgv8BEzDHkjWN7SZIVToKaxI9rX+CvSEBJDo/qTrzpfYPjuXQERaAATAEpKItKl+AzPXquopRGuG2ap+2rEZZqMQTVU9M9e5Yn69P4fClN24mKryzkRVfTcuB/GKgonfeqYQs6+VDKp+MgrRRKR1ACjX8xWbYTYA5AAURWc/qPrJANifGBSHeGawDfHxGtcg5VJ4K0i/Uc6l8VaUHx/Tk3P+AlfnolljYUMNAAAAAElFTkSuQmCC"//chrome://global/skin/icons/information-16.png
},

]
},{},
{
label: "關於瀏覧器",
oncommand: "openAboutDialog();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABKUlEQVQ4jY3TS0qDQRAE4C+J0ZVuRXxeQVyLG0lOoCB4EkWiN4gHUEFFBRcKIm68h89tFHxeQMHF9C/JmAQLZjPTVT1TU00nBlHDMZ7wHesp9mpR0xWj2MYbbrGDNaxjF3d4RzNq/5DPg7yGcZTazkuYwAY+cNYuUg3VVyxlxAXMZ0Ir0agZXHW8ROd2cgUH2EM5E2lEwxrJnJu4Yo6xWDmmcY8jaEkmdUMdi132S3G7FnxJTucYwKVkbqXL+WZwewpUcYWLEOsp0JKMKmUF/QTKOCye0MvEfgIzeBAm1vGM5ayoIgXmVKcHZWxp+8YhyekJDGfd5jCbkVelNP4GqcAUriVzJnWGpxznW/iURbnAiDRM7/G+fSlxDenPH/UZpgLFOJ/45zj/ADriSwEdnrkgAAAAAElFTkSuQmCC"
}, {},{
label: "重啓瀏覧器",
oncommand: "Services.appinfo.invalidateCachesOnRestart() || Application.restart();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII="
},{}, {
id: "appmenu-quit",
label: "退出瀏覧器",
class: "menuitem-iconic",
oncommand: "Application.quit();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACtElEQVQ4jY2ST0gUYRjGn9m1Yb/d+WZ3/u/MzsqMMy4uC0ogDawEkuDBhCCQlAg9SBety4aXooiQPRh0bUnKQ38gKOlkFpGEWmQEJRsVKaXW6qpdlDp0mC4aW2L1Xj543uf3vu/3fh/w92gEcB5A9T98O6O5uTnEcdxkJBLxo9Fo4X85DcBZAPt6enpCyWTyhWmaK5Zl3drKtwMYAEB2kISQBCFkihDygxAymcvlZNd1p13XLafT6eGuri6ZEPKJEPKdEHLHMIxwJR+klN6RZbkcj8eXPc8rjI6OxhzHeeo4Trm2tvZaoVAINzQ03Nc07bMoil8ppRd/0ZIkHRZFcS2RSCy2tLTc3djYUFpbWyO2bT+3LKvsuu51AJidnU17nvfEMIwFQRCWFEXZu13ghqZp5bq6uuLY2Fj91hJjyWRyxjTNck1Nzc3tZoODgwcty/qoquqaJEkX0NTURGVZnlFVdbWxsfHqtnFgYIDquv5SEIRv1dXVt7d13/f3ZDKZcUVRVlVVvQfP80xZlouyLK+n0+nTlYvp7u4+lc1mp/r7+49U6qlUaliSpHVN0ybQ29urKYryShCEdcMw8pXGYrHIbm5uxn3fD/z21pp2SxCEdV3XH8D3/SrTNMcppSuxWOxxR0dHcLdPAgCZTCYei8WKlNKy4zhXAADZbPYMx3Gr4XB4mef5k38rwHHcpUgksszz/Ep7e/tRAMDIyIiTSCResyy7yLLsQiAQOAGA/YONVlVVDYZCoS8sy352XffR3Nxc9Fe2r6/vWDQaXQoEAgvBYLDEMMxDAOcA9APIA5gOBoPLDMMsqqr6Pp/PH9gxXi6XO67r+hsAJQAlhmFWAaxtnSWGYUq2bc8MDQ0d2vWOExMT+9va2i7btv2M5/l3lNIPoii+TaVSk52dnUPz8/P1lf6fdmi4VMHjbpAAAAAASUVORK5CYII="
},]