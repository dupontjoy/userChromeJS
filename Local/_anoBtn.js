//2016.06.01

/**********************************************************************************
 *此處爲按鈕設置
 *************************************************************************************/
var anobtnset = {
//※必須設置按鈕放在哪個id之前，alltabs-button，back-button等
intags: "tabbrowser-tabs",

//※必須設置按鈕圖標，像素59x27（默認大小）
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAbCAYAAADCifeFAAAGu0lEQVRYhe2X63NV1RnG/YMqkLP3Xve99zlJGEMQ9QMXSQItFRQRSUi4tFVq25laxHYAm0AvonVKyA0vU3FGLQRIRpCbQEKu5xai/8evH8hePaH9kPilMzYf1uyz1z77Xc/zvs+z3rWfkE7x/zKe+F8DWCG7QnaF7ArZFbIrZB8bxlmU0djYIbVCW0OcJhhnkVqhnEUYjY4d0hoirbBpgjAa5SzGaZSRSC0wThPJEJc8mpdaoK3Bxg5tDcZZhJJoa/yaNk0IlSQnInTsEEYTaYVJYoTR2LxDWElkBCrWREb4+1BHyyfb0tbKpcvDVOaqzJaKnHn/PXJhwNt/+D237931AKQ1fvg5LVBGkhYSbGw8SaEijNP09p2jXK340T84QJwmRFKgjEYYTVzI+2sgBSaJ/RqrwzXYvEM6hYq1J2xSi4r18sne/uYOF4cvoYxm05bNfHX9Gq3b2tALCwZSoJz1AHIiwqYJNk0wTnuSyki0VQRRjkJDHqEiPvrkY/oG+lFGY5zFJTFCSVwSP1JS7IgWFCStQcfOV9imCSa12Lwj1BGREbhCjIo1wsrlk33tyOvcHx9j3fpmbOy8fF0S076/g9lKmc0tWzFJzOTsDJ9f/CeluSoPpqfY29GOjQ3aKnr7zlKulihViszNV+ntO4u2ir/3nqV/cODftjCauiDHvo52ro6OMFspU5qrcrKnm1BJtu34CeNTk7R3dfLU+mbGpx+w/1AnaWOeQIWL5GxSuzyy3ad6uDo6Ql2QW+Qt4yz7uzqZLRVp3daGUJJiucTnX36BS2L+ceFTPv3sAkJF7N7zEjPFaba2Ps++jlcZnxhj/YZmbGwYGBpkenaGcrXCw2/n6Tl9CpfEDF+5zNCH59HWcOSNX1KqlGlpa8U4yx97url7/x7vvneGC198RkNTI6vDNb6i0imElf73ksmeeOckF4cvLSKZFvIEUUjXwQPMFGc9iGK5xM9+8XOMsxw/eYKroyPEqeOnO3cw/91DNm3ZyIFDXZQqRZqanyIUAb195xj68DxpIc/qujUYZ2lqXsf8d9/ywq6dGGfR1vD1zRscPfYW2hqefmYDN2/folgusaXtee9bm3f/1atLJvur3/yasQfjpIU8kRQYZwlFRJJPOXDoIOVqhbbt24ikYG7+IXv2voK2hlN/Os2du99gnGbTlo3MFKeZmpmkXC3Rc7obl1hcYukb6Odcfx9BFJKvLyCU5JnnnuXB5AQvv7LHS/vu/Xu8efR3aGtoal7Hg8kJytUK7Qc6PMlVwWov3+9V2ean1zMxNUlv3zls7Ghpa+Xq6AgdnfvpPNBFsVxi4+ZN1Dc2MD07w8HDh7Cxo+f0KW7duY0ykiNvvM7V0Svev9oqvxv3Dw4wMDS4qMXZ2HHj1k36BwewsePosbeYnp2hpa0VbQ2D54f46JOPef+DvzE8ehmdGKRTJA2pJ5h5d1lkIyPY+fIuLo0MU56vUJ6v0P3nHlwh5tXOfRTnSjy78Tnyawvcm7hP5+EudGI43n2C67e/RlvFi7t3MT4xRrlaYqY4zeT0BB2d7SgjGfrkPO9+cAZXiD1AYSUv7d3NtVvXma0WmanMcuz424Q64tBrhxmbGmfr9haaNqxjbGqc3x57k7QxT04GXsahjnwSlkw2e0HFmjqRw6QWk1qezK3ymYzrE1YFq2loaiRQ4aOWtdAStFW8032SS5cv+vZzZeQyfz3zF1xiCXVEfm2BnAxIG/MIKwl1RKDCR+8nxlco1BGhjmhct5Yf1T2JK8TYvCNQITkZoBPje+73qmxGOMt4qCNUrHGF2C+eJSRQIToxxPWJB6yMZOeLL3D9xjWqDyuUqyVGvxrhxzu2E0Q53y6ytXIyIK5PfLwMeNZDhZWsiepIGlICFfp+muGr9Wlt3CWTjYxAJ2aRLGrnak8uWUIyYDoxCCu9TLO5OpFbtHua1C6KGRlB0pD6q3SKNVGdf2ZS65ORHQ9rsT1OdElks4zpxPhMZicWFWsvtyx4LYhMeia1nnSWnNrmHxmBzTsvu9pntfe1cs7JYNFpqdZyoY58gpe9QUmnfB+rTUJGLpNztjFk8xlAFetFCdGJIScDH7/2IJ8lJfNippDa+HF94uM/XsEsRq0Nlkw2A1kncv8BLKtUBqTW45nchFPUyYDQCMKFexlrQiPQC4AzWWfxauPUiZyXeWaFQIXe67VVz/aJLM6yj4uZP7JPKZ0Yn+3HJZYBy3bGyAhUYjB5h3AKlRhkrBFOYfKOcAFsBiqzRe2hIHtW6/fsv7VKyHDU/n/Zn3g/pLFC9oc6/gUI0lFRyLjhMAAAAABJRU5ErkJggg==",//背景（相濟茶）文字（白鼠）

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
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.cc/')",
image: "http://www.firefoxfan.cc/favicon.ico"
},
 ]
},{},
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
label: "设置Cingfox为默认",
tooltiptext: "批处理注入注册表",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\run\\default.bat",
},{},
{
label: "设置Notepad2为默认",
tooltiptext: "通過映象劫持以Notepad2替換自帶记事本",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\Notepad2\\Notepad2.bat",
},
]
},{},
{
label: '軟件列表',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKElEQVQ4jWNgoBL4TwSmrQGDD7QRiWlnwMCBrQQw7Q0YOECxswfO3wBrBTGdpowsywAAAABJRU5ErkJggg==",
child: [
{
label: "Shadowsocks",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\GFW\\Shadowsocks\\Shadowsocks.exe",
},
{
label: "ShadowsocksR",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\GFW\\Shadowsocks\\ShadowsocksR-dotnet4.0.exe",
},
{
label: "SScap64",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\GFW\\Shadowsocks\\SSCap64\\SSCap.exe",
},
{
label: "Lantern",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\GFW\\Lantern\\lantern.exe",
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
{
label: "SpeedyFox",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Software\\run\\speedyfox.exe",
},
],
}, {},
{
label:"常用功能",
image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAG0lEQVQ4jWNgGCzgP5l4EIFRLwwGMIScOvgAAMPmMc89jdNcAAAAAElFTkSuQmCC",
child:[
{
label: "iMacros",
tooltiptext: "iMacros文件夾",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\iMacros\\Macros",
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
},{},
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
{
label: "GIF壓縮",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3klEQVQ4jcWT3WoCQQxG5y0238mb1PWHKvVJ6qUtBd+00lfYdRF61eLV9saROJVVodDAQJhJTpKZb1L6CwPeJU3uiH8AtqcNM5sBnZnN8p67v4WEdfBHQCNpeUaVNAF2VVU9HgF9gH0ek2ugAZ4utiZpDLTAogTkAu4+vzZfDTQF4FCOeKn6s7v3Ye0DtIlnkl4Gu/gfk7QqRvjKZ+7+XYzwOgQaA21xiT3QAYtrXZy0UALcfT4Iycn5qUpASimZ2RTY/RJSkPI0JEUpb4JfA+2ZlIHtnZ9pBHzcGj9oP3TiU7Bc9Gx1AAAAAElFTkSuQmCC",
oncommand: 'gBrowser.selectedTab = gBrowser.addTab("http://ezgif.com/optimize/");',
},
]
}, {},
{
label: "重啟瀏覧器",
oncommand: "Services.appinfo.invalidateCachesOnRestart() || Application.restart();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII="
},{}, 
{
id: "appmenu-quit",
label: "退出瀏覧器",
class: "menuitem-iconic",
oncommand: "Application.quit();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACtElEQVQ4jY2ST0gUYRjGn9m1Yb/d+WZ3/u/MzsqMMy4uC0ogDawEkuDBhCCQlAg9SBety4aXooiQPRh0bUnKQ38gKOlkFpGEWmQEJRsVKaXW6qpdlDp0mC4aW2L1Xj543uf3vu/3fh/w92gEcB5A9T98O6O5uTnEcdxkJBLxo9Fo4X85DcBZAPt6enpCyWTyhWmaK5Zl3drKtwMYAEB2kISQBCFkihDygxAymcvlZNd1p13XLafT6eGuri6ZEPKJEPKdEHLHMIxwJR+klN6RZbkcj8eXPc8rjI6OxhzHeeo4Trm2tvZaoVAINzQ03Nc07bMoil8ppRd/0ZIkHRZFcS2RSCy2tLTc3djYUFpbWyO2bT+3LKvsuu51AJidnU17nvfEMIwFQRCWFEXZu13ghqZp5bq6uuLY2Fj91hJjyWRyxjTNck1Nzc3tZoODgwcty/qoquqaJEkX0NTURGVZnlFVdbWxsfHqtnFgYIDquv5SEIRv1dXVt7d13/f3ZDKZcUVRVlVVvQfP80xZlouyLK+n0+nTlYvp7u4+lc1mp/r7+49U6qlUaliSpHVN0ybQ29urKYryShCEdcMw8pXGYrHIbm5uxn3fD/z21pp2SxCEdV3XH8D3/SrTNMcppSuxWOxxR0dHcLdPAgCZTCYei8WKlNKy4zhXAADZbPYMx3Gr4XB4mef5k38rwHHcpUgksszz/Ep7e/tRAMDIyIiTSCResyy7yLLsQiAQOAGA/YONVlVVDYZCoS8sy352XffR3Nxc9Fe2r6/vWDQaXQoEAgvBYLDEMMxDAOcA9APIA5gOBoPLDMMsqqr6Pp/PH9gxXi6XO67r+hsAJQAlhmFWAaxtnSWGYUq2bc8MDQ0d2vWOExMT+9va2i7btv2M5/l3lNIPoii+TaVSk52dnUPz8/P1lf6fdmi4VMHjbpAAAAAASUVORK5CYII="
},]