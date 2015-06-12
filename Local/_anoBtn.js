
//2015.06.11 11:00 調整文件夾結構
//2015.06.06 12:00 精簡並換一些圖標
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
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jaWToUstURDGB4Po32AQk+EG88WyVrl373y/4SGC5b0gCIIgBhFE0KBR8ILNavGBQZOYH++9ahXEYhcRvcE17K4uKxvUga/MnPmd+ThzzN3ngRuJ+88I4k6KdYMYQGRflUk8fQPwYBCPEFdS/C4FnAAn1dxH8Rfi0SAy91iySrRarWFJHfdYdI9lST+tFmnKDERmEJkU62Zm7XZ71N2TXo85YNPdE0lTknaB606nM1YCJP14AwAbZSEHcitpP0mSkTLvHisQg263O2Fmll9SA5TJUnVrEM/AQSMgHzVvluK0ZnuomO5fIwDYeZ+AHSlW3dkyM5udZbwAHDUC3D2pWpA4TtN0Mn8VziCyNGW6EZDb4E/R/CJxLMVesbqZxGV5rhFQWLmob121+QNA0q/6ovR6zEnRl+LQ3RfqdUntygTx353tzwg4Lz6T1r76maTovwLv6V7BBm3W0gAAAABJRU5ErkJggg==",
child: [
{
label: "火狐範 首頁",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/')",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACo0lEQVQ4jZWSW0iTYRjHv6sIwxIKmzsf3L45bcnC/Na0RZCZ2FVCh6sVwqALL0KhJPBDtzxkJ80TKyqnbX04Cc2MMROnaakYZdrAlVrNmCvzUM027d+FIY4l0h+eq+f9/Z4H3ocg/qb/oERnSyWziA1SqxRldVA8XVhj+hCr5OE+KcyUjF4PrkmQGO7tFsF3hF0Y1vRlsOkBrQCmxFjcVUnctfF8xerUeL7CtEvsvi4X45mGj28Z7JwwgSdTTPftF8Ig5KFSJsAtpXjRSskYK0Uyt5WSxRtSPgr5PPRrhfBmCs6FCUbSYukLfC6yo2Jwf08sGDUJKyWDlSLBqEk0qCTQbWWhSMSB56j4bJjgTqKYLuBy0ZoaB5tGDkuyLKSaU+SwaeSgeVwwcvapMMFw2fHqLhUfL9MTYKVkaNgrXYXNSVI8oEi8SlOgWyPBkOHY+RB4fpDeAZdxfvgMBUc8B4+0CljUJJo0cjRp5LCoSTw+oEBH3E68zT0MfCx/EyL48iQvP/giFwvNp+GkBGCUQlQliGFSrlSNUoJmBQe9aXLMOfMR6MnDj3Z9xgrcadTNdhfP+AcqgIUWTNTpYYregiJWDIr5HFzicWCMjkajaCu8rYXAbAv8PQXwO3LsK+tPPk/xf+pzBKZ6AN9TYK4ZvXotSiMicE0mRLmQh6uRmzFacgII9gKeNiy9NyM4Whl6TIvjbTkBNwP4bAi4bsKSSuLK9ihc3haJ9pNJgM+G39NOBMcaZwOjJirsFwiCIH6NMYrld/VT+GzGVPtF1LIiYUkWY2GoDMveDgQm7faREXrTP+G1WXLVMUF3HVzV2Riv1yP4oQk/Pf25G4Jr87XLaP/+usI1P1g6MdNXZfgvmCAIYrqzKH2msyTF5zSqvA5aud67Px4LdlWnQ6WmAAAAAElFTkSuQmCC"
},
{
label: "火狐範 可用IP",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-gaogent/goagent-ip.html')",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jZ1SsUoDURC8Io3/oJWFNnaCXCNPwcZ4b3dmwD6CoJVYif6BtY3WojaC+hU2CnYWtulDiCCoEAuTeJ65O8nCVjtvZnfmJUlJAdgC+EGqD2C/DDe2YoyLpPr5dpf+TUByukiQZZqvUeUygJa7RLJJqp0jeAGw6u6bAFoxcqV4705Rsb55lF/5egKCi9wGvBsM3use/iSjy/wJ22bKQggNgPcVqs9pmk6Zad1du2PNNLOFCoLmRBEOO8Y4V0sAYKOMwF17ZapnAE8BrJHqVZj4ZqaM5DHJk5yqbscZ5s5DAAeAHipjJHlTALRDCI3fp/Gp6h9cFbJ+/OvN6K8MMDofDc1sCVAXUJdUD2DHzGaGc3efJfX6jWGH1CfJmCRJ8gWPZifIwJ0eigAAAABJRU5ErkJggg=="
},
{
label: "淸 配置發佈頁",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://bbs.kafan.cn/thread-1792671-1-1.html')",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMklEQVQ4jc2Tu2oCURRFdzIi4idMNf3AsPdu/IFU04ZACvuAFmqRR2Nhl4+wSWWZ1j/IVwhBrayCQURSmOZOmAz4SJcLBw7cs9Z9nQv8bVykaVoHcHlOcc1223YbQA0ASNL2q6TrU3BEsitpJWlFshsEN7b3kp7PgZckeyR7kpa27yTdnhL8wLYHkoaShiF/tz09JqjCI9tb21tJI5J92x+HBIfgfYhC0pP0KWkMICrDnSNwVdK3PSfZARBB0qPt+Qn4l8T2wPZc0hMkjcPWqvDM9luI2YHjvCBN0zrJ+wq8IZnHcdyM47hJMre9KUtsPyRJ0kCSJI3ieUqxzrKsVVxSlmUt2+tKzfSfCADUJE3Kk5J2oQuvQgwl7So1E4RPBpK5pEVlha+iE0NehhckcwD4BqeD7Zmx4aS4AAAAAElFTkSuQmCC"
},
{
label: "淸 Github腳本備份",
oncommand: "getBrowser().selectedTab = getBrowser().addTab ('https://github.com/dupontjoy/userChromeJS')",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jbWTsWpVQRCGtwspbQRjpaigtYin0SKIHM+5e/b75hUsoo3EJxJ8DwtLmyA2ESGJYlADiVFB5RpzLbLgFYLeG7AY2N1hvpnd/9/UNM0isKpuaRz8K8AfGhvq/bZtFxLEQ40vGpM5Y7+UuJc0Xp+geKIxgVhP4OHUwR74cQ7I1/S72DfAzWGI2+D72Sbw+x+AUsqy2oEf5gZojCHWNJ5rfINYB19qbEA8gnis8e6vE+Scr6rXIdZKKddyzhfULue8lFJK6t0q47GAzb7vz45Go3PgM+AScBriqfqk67pTwzBc0diZCdD3cRG4rLELbuacl7ouzoPbMwNqx93qvDP/BzBlpLc5e6OUsgy+GIa4o2aNfXAbuAX0029QjeRW3RzU5E6VdK8681Dj5xEoPtX1tJVZBT+f5DMBK6lpmsVS4sHRPWNcdR4fF1O5V8BK27YLvwCEF774kDAvMwAAAABJRU5ErkJggg=="
}, ]
},{},{
label: '外部打開',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
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
image: "data:image/png;base64,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",
child: [{
label: 'GFW工具',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADIElEQVQ4jXXP3WtaZxwH8B9UyonnzJko6lHj8aVuiqWwiy0J8RiNMS9W43vBLHFksFAIo7AUBtvtdlcGvck2mrXp1pqk9eBrXezM2plubecoBLb78sChf8Z3F0kxg/WBLzzwwOf7fYiIaM1K2isBcqz7Sdo4yZvuG36SrgTIsWYlLZ2cM9fHNFfvhvmXu2GBbctD7KasZbthgd0J8WxrcojthgVWnhLY1uQQ25ni2d0w//L6mOZqgegMfe0n8XZIOHqY86BbeBfVBRGttAsPC1600i7cn7NgP+/Fz3kv9mYtaKSdaGbc+D7IH33hJ5GuuUjqrrzD/vnsPfz9aQDdkhv99Qs4uuzD01UPOstevPjEj/6qB62cHYcf+fF82YXKvIF96SeJrvlJqmdH2UHJjoMPRTQu2dBZdmE/Z0Q7a0ItJ6GdNqGdHEElbkIjZUNz9i3cCmlPABdJ+xmRdVZceHb5Al6s+fCk5EZ76Rz6H/vwZ8mNRtqG3ooPT4tO/JqxoZGSsDdvZhuvFyizOlbPimhfktBeHEEzaYCSsqN50YDWgh73Zg2oJ0TUpnko0zrsxSz4QRYGQDNpZn+tnkNvyYlWwY3nJS+eLblQT4h4XPTi94KE7qIVtYQDhzkneik7ypHhAbAb4dmDxAiqMR0qCStacQPqUQE7ET1qcRG1iIB7QQ47URPqET2UIIfvPjh7DHzlJ6k+b2CP8nY00k78UXTjSd6B6pwZB3kPemk7OnELlAUbehkJvy3aoESNuBkTBwvKspbVZnTYm7OgNq1DLSygPKWHMmNCJcjhvsyjPG2CEhKgyFrckXXYnBoZLFBiw+ww60AvY4cyY0I360EvZUMnbj7VbEUlasQvGTd6KRtuh/Vs/TWwPckxRdaiGjrWlagRlcn/b1aiRihBDt+OcQOgEh1myowJ3RP9v83Hfz79Vl2w48eY4Rj4PECOG+9r+ltj3KtyZFgtT5xVt8c16g1Zr5aDnPrThEbdHOfUWxG9uj2hUbfGNepm6O1X30xw/bUAOchMxBet5FsZpfNFBwVyp5J8Qy6O0vmklXxmIv5f9JS03spk0uoAAAAASUVORK5CYII=",
child: [
    {
label: "Goagent",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\GFW\\Goagent\\local\\goagent.exe",
},{},
{
label: "更新proxy.ini",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\GFW\\IP-Update\\更新IP.bat",
},{},
{
label: "打開Goagent文件夾",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\GFW\\Goagent\\local",
},{},
{
label: "GoGo Tester",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\GFW\\GoGo Tester\\GoGo Tester.exe",
},{},
{
label: "Shadowsocks",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\GFW\\Shadowsocks\\Shadowsocks.exe",
},{},
{
label: "Freegate",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\GFW\\Freegate\\fg.exe",
},{},
{
label: "Psiphon",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\GFW\\psiphon\\psiphon3.exe",
},
]
},{
label: '辦公軟件',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABwUlEQVQ4jZ3Tv08aYRwG8PdPabqbhmiiqO8dhNkF4sIRcMFBatJGFnFWF4emRq+hQ5uIwOCJcWEyOkBPoyWpkzFKXNSXE1G50+SbA58OtPaHR9Lrk3yG9/s868uYQyT13COpYt6nXi741MsFSRXzknrucdo6JpA2pgPLYo4viThfEvHAspgLpI1px3Fo+6Iv/KWWVHQxE9FFKlo2ZsPFq7PojqFFdmvJyG4tGd0xtHDx6ixaNmYjukgpuphRyrWp0PZFH4t9vdmfOLEfX5+28FOi2vrj7XSbOLEfYwc3FRarmJSoAolTl6pArGISU/ZMGj8C4i6NHwHKnklstGTR2CEw9s2lQ2C0ZBELblkU3gf+R3DLIjZStChYApyEyh3d+pGiRcy/2iB/zoTvBzlrQso0MfzpFv0frtGvXoN/voWUaULO/tr5cib8qw1icr5J/g0bTwodPPeAl2+P8eLNMYazD0/337dyvkmM5y2SN4G/SetteN438OpdA1xrP+vlTYDnLWLezD0NaoB37blBraNb583cExtaudN5wW5LGy24wQt2e2jlTme9i6JnIF2fHPhYT7mSrk/2Loqef/6h3fIdt9x6jwguSQ8AAAAASUVORK5CYII=",
child: [{
label: "ReRe定時",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\ReRe\\ReRe.exe",
},{},{
label: "SumatraPDF",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Plugins\\SumatraPDF.exe",
},{},{
label: "FastStone Capture",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\FastStone Capture\\FSCapture.exe",
},]
},{
label: '系統優化',
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACDklEQVQ4jZXOsUsyARzG8ecveDcH/whvuJcGQTgEoeWGaO6oSYcoKgxsuJCGKKGzDsqxhpaO1rCWDgfhEAcX4UJBEtySOGr/vos3Bb01fPlNz4efJGUlrUgq/6KVxU6StN7r9eK3tzd+Wq/XiyWtp8DmbDajUCiwvLz83wqFArPZDEmbKbA9nU4plUocHh6ytbX17S2VSkynUyRtp8DuZDLBsizK5TK1Wu3ba1kWk8kESbspsD8ej8nn8ziOw+XlJY7j0Gq1+Pz8pNFo4DgOV1dXOI5DPp9nPB4jaT8FDuI4xjRNfN8nSRKenp64v7/n4+OD29tbnp+feX9/5/z8HNM0ieMYSQcp4A6HQ3K5HLZt8/j4SJIkjEYjXl5eGI1GJEnCw8MDtm2Ty+UYDodIclPgaDAYYBgG1WoVz/OIooiTkxMsy+Ls7IwoivA8j2q1imEYDAYDJB2lwHG/3yeOY9rtNkEQcHd3h2EYGIaBaZoEQUAQBLTbbeI4pt/vI+k4BRpRFOG6LvP5nL29Per1OmtraywtLbGxsUG9XmdnZ4f5fI7rukRRhKRGCnjdbpdisUgYhtzc3LC6uvql6+trwjCkWCzS7XaR5KXARafTIZPJUKlU8H2fbDb7Jd/3qVQqZDIZOp0Oki5S4LTZbL6GYchPazabr5JOU8BevNP6Rd5iJ0n6I8mQ9PcXGYud/gF//OGff/Oi9wAAAABJRU5ErkJggg==",
child: [{
label: "打開System Tools文件夾",
tooltiptext: "打開System Tools文件夾。",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\System Tools",
}, {},
{
label: "WinASO Registry Optimizer",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\System Tools\\WinASO Registry Optimizer\\RegOpt.exe",
},{},
{
label: "ProcessLasso",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\System Tools\\ProcessLassoPortable\\ProcessLassoLauncher.exe",
},{},
{
label: "DnsJumper",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "..\\..\\Software\\System Tools\\DnsJumper\\DnsJumper.exe",
},]
}, ]
}, {},{
label: '一鍵備份',
tooltiptext: "自動备份火狐常用配置文件，如果你有额外的文件或文件夹需要备份，请修改BackupProfiles_7z.bat文件。注意备份将關闭Firefox！",
exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\chrome\\local\\BackupProfiles\\BackupProfiles_7z.bat",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACn0lEQVQ4jYWRW0jTYRjGHyQkRCHCTAmZGmV0sAOYiSYVFRSSSF110YWGZWU1t4mHqX9NyZpnzdNww2yuuYPb/tt0c266zXlankohD5kEEgbdRkS8XUQjbeZz+7y/3/t+fICPtHo+hqXpZ9IBAAzj52vmv0nTTB73L2R/JEjcDSmvJ24FP7dMpXR7bm4LZrCe4MDy3vWDdQO28GrrGLJVFCseZvdX21zIUpB/We9SjXMhyidsXvocgnzdOu7J6USzQxnZMOhGvo6QraZzUnftpc6xKmTKCQX6b+zy+oF/BLFNjl48VhLytRRTb1NHNgy6wdcQ8rQ/kzpGReFV1mkUsoSH3RRdafFsgPPMc3HIVhFKjQSBhq52jlRzRP2T4KnpjnE2CQCi6+09yNUSnpgIj7rpvn462Su43jVeBK6KINRTsMiy1jj8gbO3wvwug317+e9FoaL+VeRpCQINxbU4G73FPpFFCaGewFfTabFLBgBlA/Oczc882uSQIKeHwBgpoMRo8hbhlVY5CnQEgYYOvxjSbgYZ+9QuADjV5pIiR0MoNlBQmdHgHUiVjfLBVRGKWEIRS+rZVe9XMX1zu0NEVkemYfZiVL19EUI9gaemxFbnM6+g1bNyCILfZuRqKbDU9ImxzwUydvsOCNmvgcXslwvSkTbkagklRgJXRXWu5cQNZ6Z2jEqQISMwBvIrNnw//3KsKexp33twlRRaY51PELtkKNARHigovmXIAF+JqB0YR3onnW0flt5QeHjIUhAK9RRaY52PFztluNtFQeV9C561tQCfAgDg1NnawddQRJV1+kjzkAVcFe2pMC/GS9z6kMp+J2Nf2bkl/CdpupnoYy0OSaZp5kyyfIIBT0W3dW9itgW3ypVX47xr8omTvrpfYwtHv4Wx+FgAAAAASUVORK5CYII=",},{},{
label: "書簽管理",
oncommand: "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABS0lEQVQ4jY1SzUoCURi9IL5CVJuEKAoShNk5ejnnPEQEQgQiGESrgt4gaC0qhSHVoh96ETe+SJt2peBt802MMlNz4YO55/vOz3cZ53KOpIGkYDXIm8s8ANYlBZILkgtJoV6vrxUWIDky5zeS7/Z9V9T9wNznjUZjF8Aeybmk4L3fzyO1SA5JTrP2Jnmb4CSnJIcAWqtxk/qSNGk2mxuJQBzHm5Imkr7TsyRHLiEB6AKoRVFUzlsviqIygBqArhmF3wQkn5xzpQLPVCL5kk6wJenTgP5/bJJ9S/0Rx/Gmc8457301tdd5HlnSRTLnva8uNQGcmUCvgPtpVvPGBC7/SHAlKQC4zmq+msChJaqQ7JPsAagYdmQzz1kJHqx5THJMcpZ6lxnJewAndh9nJeis/FBB0qPVEg6gnbdjx5J0JG0nuPd+B0Cb5HiV/AOStMNZrdTkSAAAAABJRU5ErkJggg=="
}, {},{
label: "打開選項",
oncommand: "openPreferences();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABR0lEQVQ4jY2SP0sDQRDFr1UEUTRW+Q7iieGO7N57z8I/WJvSxlJrQS2sbSz9BulESGUEQRtbGwULrdKJaCEE03g2k3DGu1wWlllm5/dm9rFBMGIB2JPUIvkpqQVgd1T9YNVqtQWSbUlpzj4vFSB5JSkl+QKgUa/XZwDskPyRlAJYLBs7lfTqnJs3wU1JPcvf92Mcx5V/ApIurUsjk/u2iW4sPli8yBN4N4G5TG7gAcnnOI4rdn7Le/+HpDSKotkcgZ5zbimKogkT6P6BkySJMp2SIp+SJNmwuusi+LQIDsNwmuSj1R2Wws65FQBTYRhOAtiS9GR1d0EQBAGA5SIYwFHeZyJ5672v9k1r2sVZEUzyi2SXZBvAwbDrHUmp975K8tlcP+7DANaL/BieYN97X5V0MjZsAtsF71wrhbMiJJskOxZXx2V/AYbjyhDulDKPAAAAAElFTkSuQmCC"
}, {},{
label: "附加組件",
oncommand: "BrowserOpenAddonsMgr();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfElEQVQ4jc2SSwqFQAwE+14KSWWn1/YqosfwrRzEEeNv8RqyCZki3RnpSwFDRCwRsQBD1q+0Dq2V9SVJZtYB034oK2Ays05PHm8hZT13b69m5e5tsXPkq/J5klcFyEJMAa83uKo/BNw5I9AUwMuPNAvogfkBYAT6u9Yr/QBtWNOEJkNI4gAAAABJRU5ErkJggg=="
}, {},{
label: "錯誤控制台",
oncommand: "toJavaScriptConsole();",
image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA00lEQVQ4jZ3TMUoDURCH8V80oAQhNxGsUwombBlMmzaFJwimsLC2sPEKYmWZYDRNzpB+c4lAQGKxsxBB2bc78MHweP+PYWAoqo3zmrQjK8MrFpgnsohMBlscGrIVzXdDDrDHI4a4xSiBYWT2sEM/9tHBqbTqR9YON7jAM57QrSsoJ7jEGi8Jkj8FLTwgx1W8nR1xUiWYYKNYFIzxhU+scPefoNzBJPpWfOrhPpjhumqCOvVLMGggGJSCHO+YHo1bxTQyOcVBvGGJj0SWkcnKcRqf8w97emULqueg+gAAAABJRU5ErkJggg=="
}, {},{
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