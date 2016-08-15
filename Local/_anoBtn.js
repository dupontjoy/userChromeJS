//2016.08.15

/**********************************************************************************
 *此處爲按鈕設置
 *************************************************************************************/
var anobtnset = {
//※必須設置按鈕放在哪個id之前，alltabs-button，back-button等
intags: "tabbrowser-tabs",

//※必須設置按鈕圖標，像素59x27（默認大小）
image: "data:image/png;base64,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",
//背景（相濟茶）: #373C38
//文字（白鼠）: #E6E6E6

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
var anomenu = [
{
label: "編輯user.js",
tooltiptext: "左键: 编辑user.js",
text: "\\user.js",
exec: "\\..\\Software\\Notepad2\\Notepad2.exe",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAaElEQVQ4jWNgoCL4TwA3EGMAPrnrhAwhZIA4IUMIGcBAyBBCBqBjkgwgSi264Ewo7YFk60wcavEacBRNTJlUA/KgckfxqMVrAAzADCLoAnSnIyvOY0CECV4DkAOM7EDEB3AaQAqmDgAAtlxHLWMw/vEAAAAASUVORK5CYII=",
}, 
{id: "addMenu-rebuild"},
{id: "anobtn_set"},
{id: "redirector-icon"}, 
{},
{
label: '批處理',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jc2Quw2EMBBEX0ZEE9ThCsgp42LqIKYOQro5icDRVXCXDNay+GQLEfAkS/7szKwXbqQDvpWryxm8gLkiaFbtiQUYtP+XjGoWL26AD9BWdNCqtrGXPbAW0m0XqzSJCRgr0ndGaRIbEDNJFvsWpUlEIDhDew5OEKQ5uFt6CfbEN+7PXpNrucTDDPzQSvihnoZWWrmhXuMHem9Lmy9WtnwAAAAASUVORK5CYII=",
child: [{
label: "備份批處理",
tooltiptext: "1. 備份Profiles\n2. CingFox製作\n3. 備份Plugins和Software文件夾\n4. 提取32位Flash插件\n5. 備份一些文件到GitHub",
exec: Services.dirsvc.get("UChrm", Ci.nsILocalFile).path + "\\local\\BackupProfiles\\Backup_7z.bat",
},{},
{
label: "重啟explorer.exe",
tooltiptext: "重啟explorer.exe",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\Other\\QT-Check\\explorer.bat",
},{},
{
label: "设置Notepad2为默认",
tooltiptext: "通過映象劫持以Notepad2替換自帶记事本",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\Notepad2\\Notepad2.bat",
},
]
},
{
label: '軟件列表',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsklEQVQ4jb3RIQ7CQBCF4S/B1SBR3KIeheAOeCySC1TWoJE9Aba2mitwABQKCWKnoYLSFAjPzCaz/9uZt/xJOdZYIRsDzlDjHPWO7RiDBkUYneLcajoELwOCHapOr8BhyGCLsmOwl/YvcOmY92rTeWUj5XALcC2t16tJjFz19I/ehNnCdYycYSGFlkev0fOdr+Amxr9GLcbCg2l/DfNM9SOYlGiF+ScwKeFaCqocuPtbPQAHPSy26m8ewQAAAABJRU5ErkJggg==",
child: [
{
label: "ShadowsocksR",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\GFW\\Shadowsocks\\ShadowsocksR-dotnet4.0.exe",
},
{
label: "XX-Mini",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\GFW\\XX-Mini\\goagent.exe",
},
{},
{
label: "PicPick",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\Image\\PicPick\\PicPick.exe",
},
{
label: "ScreenToGif2",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\Image\\ScreenToGif 2.exe",
},{},
{
label: "Adbyby",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\Other\\Adbyby\\Adbyby.exe",
},
],
}, 
{
label:"常用功能",
image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAG0lEQVQ4jWNgGCzgP5l4EIFRLwwGMIScOvgAAMPmMc89jdNcAAAAAElFTkSuQmCC",
child:[
{
label: "在IE中打開",
text: "%u",
exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
},
{},
{
label: "iMacros",
tooltiptext: "iMacros文件夾",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\iMacros",
},
{},
{
label : "证书管理",
oncommand: function () {
window.open('chrome://pippki/content/certManager.xul', 'mozilla:certmanager', 'chrome,resizable=yes,all,width=600,height=400');
},
image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuklEQVQ4jcWSqw7CMBSG93y1yGZvMLHUV6Ga6YkmhHdoFkIHZqllQRAwMyMQxLJNcAnIH1fBEN0m9ifHHPHlOxfPmzyMMYwpjzGGoekADmWDUBqE0uBQNv0BVGgQrkC4AhW6P8CPUgvwo9T2kyTp1F9AXlSgQoMKjbyo+hlc6yeCOEP7+KC+vxFKg1v7cjcI4gyEKyz0EcvNCYQrhNK4G8zmKzv/7yKdDNa7c+cK2/3F3WBILGDUK0+eLwDMbVc5IMVkAAAAAElFTkSuQmCC"
//chrome://mozapps/skin/extensions/category-dictionaries.png
},
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

]
},
{
label: "定製火狐",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaElEQVQ4jX3Sz0vUURQF8M/MYDWRCS2arIgiIZEEXQQSSBFBm6BFC4kKIkjEQCmFaGUUGSoo9GNqkVNBm6AW0a6/I/p7WnzPyJcnduDC495zzn3vvkuFAXTQwDk8xTZ6+JR4gjP2wDV8wU28xlt0Y3YAJ3EbP8Jt1MUtvMQ3/MVHvMd3HCsaLeMPbqHZTx7CBkZxKTGSm1zH/prBqTynm5uAE9jCUNHtCn7iaC3XxDPciKYDd/CwEJ/FemZSYiHmc7gLm7hQIxzBm5AapRqLuIzJaG2rptxHBx9wP10WMJ7aAF6pfud4tHoYLrqM52n38Eu1FzCFtRgN9w26GCsMJvAVv7GE05gOdzKcMbyDx5gpDPZlBs/TcQMrMe5jJlrnM4zDdqOh2sSDaosT7ma0YD5RJ+2FZo2/g0G8wCza/xG38SDcwbI4hEeqN19VfWc70UluLZxya3fQwkWs4rNq73s5r6bWqgv+AYBxON0vXviZAAAAAElFTkSuQmCC",
child: [
{
label: "CingFox",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('https://github.com/dupontjoy/userChrome.js-Collections-/tree/master/CingFox')",
image: "https://assets-cdn.github.com/favicon.ico"
},
{},
{
label: "RunningCheese",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.runningcheese.com/')",
image: "http://www.runningcheese.com/favicon.ico"
},
{},
{
label: "SunBox",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://sunbox.cc/')",
image: "http://sunbox.cc/wp-content/themes/begin/img/favicon.ico"
},
{},
{
label: "FirefoxFan",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.net/')",
image: "http://www.firefoxfan.net/favicon.ico"
},
 ]
},
/*{},
{
label: "重啟瀏覧器",
oncommand: "Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII="
},{}, 
{
id: "appmenu-quit",
label: "退出瀏覧器",
class: "menuitem-iconic",
oncommand: "Application.quit();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACtElEQVQ4jY2ST0gUYRjGn9m1Yb/d+WZ3/u/MzsqMMy4uC0ogDawEkuDBhCCQlAg9SBety4aXooiQPRh0bUnKQ38gKOlkFpGEWmQEJRsVKaXW6qpdlDp0mC4aW2L1Xj543uf3vu/3fh/w92gEcB5A9T98O6O5uTnEcdxkJBLxo9Fo4X85DcBZAPt6enpCyWTyhWmaK5Zl3drKtwMYAEB2kISQBCFkihDygxAymcvlZNd1p13XLafT6eGuri6ZEPKJEPKdEHLHMIxwJR+klN6RZbkcj8eXPc8rjI6OxhzHeeo4Trm2tvZaoVAINzQ03Nc07bMoil8ppRd/0ZIkHRZFcS2RSCy2tLTc3djYUFpbWyO2bT+3LKvsuu51AJidnU17nvfEMIwFQRCWFEXZu13ghqZp5bq6uuLY2Fj91hJjyWRyxjTNck1Nzc3tZoODgwcty/qoquqaJEkX0NTURGVZnlFVdbWxsfHqtnFgYIDquv5SEIRv1dXVt7d13/f3ZDKZcUVRVlVVvQfP80xZlouyLK+n0+nTlYvp7u4+lc1mp/r7+49U6qlUaliSpHVN0ybQ29urKYryShCEdcMw8pXGYrHIbm5uxn3fD/z21pp2SxCEdV3XH8D3/SrTNMcppSuxWOxxR0dHcLdPAgCZTCYei8WKlNKy4zhXAADZbPYMx3Gr4XB4mef5k38rwHHcpUgksszz/Ep7e/tRAMDIyIiTSCResyy7yLLsQiAQOAGA/YONVlVVDYZCoS8sy352XffR3Nxc9Fe2r6/vWDQaXQoEAgvBYLDEMMxDAOcA9APIA5gOBoPLDMMsqqr6Pp/PH9gxXi6XO67r+hsAJQAlhmFWAaxtnSWGYUq2bc8MDQ0d2vWOExMT+9va2i7btv2M5/l3lNIPoii+TaVSk52dnUPz8/P1lf6fdmi4VMHjbpAAAAAASUVORK5CYII="
},
{},*/
 
]