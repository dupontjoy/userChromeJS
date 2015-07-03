
//2015.06.22 11:00 科大恢復
//2015.06.05 07:00 簡化ajax(https) >> github
//2015.06.04 21:00 http走useso，https走github
//2015.06.03 18:00 完成ajax >> github，重新分組12306的js文件
//2015.05.27 22:00 找回Google服務轉國內鏡像
//2015.04.25 08:00 新增Google搜天氣時 圖標
//2015.04.19 10:00 新增鳳凰網 圖片修正
//2015.04.14 13:00 新增鳳凰網 只顯示首圖修正
//2015.04.06 21:00 修正百度盤搜索地址替換
//2015.03.25 10:00 修复sourceforge規則
//2015.03.20 13:00 修正百度盤搜索地址替換
//2015.03.14 15:00 爲規則添加說明
//2015.02.17 14:00 新增12306重定向JS
//2015.01.24 14:00 添加京東，天貓大圖規則


//規則Github備份：https://github.com/dupontjoy/userChromeJS/blob/master/Local/_redirector.js

rules = [
{
//自帶示例
name: "about:haoutil", // 規則名称
from: "about:haoutil", // 需要重定向的地址
to: "https://haoutil.googlecode.com", // 目标地址
state: true, //可選，true 表示啟用此規則
wildcard: false, // 可選，true 表示 from 是通配符
regex: false, // 可選，true 表示 from 是正則表逹式
resp: false, // 可選，true 表示替換 response body
decode: false // 可選，true 表示尝試對 from 解碼
},

//單獨網站
{
//個人用
name: "TVC內網-內網參考鏈接修正-1",
from: /^http:\/\/http\/\/(.*)/i,
to: "$1",
regex: true
},
{
//個人用
name: "TVC內網-內網參考鏈接修正-2",
from: /^http:\/\/ic\.sjlpj\.cn(?:\/DevProduct|)\/www\.(.*)/i,
to: "www.$1",
regex: true
},
{
//個人用
name: "TVC內網 滾動條置頂",
from: /^http:\/\/ic\.sjlpj\.cn\/#\/DevProduct\/(Copy|)?DevProduct(EditDetail|EditList)(.*)/i,
to: "http://ic.sjlpj.cn/DevProduct/$1DevProduct$2$3",
regex: true
},
{
//個人用
name: "TVC內網 圖片以圖搜圖",
from: /(.*(google|so|baidu|bing|sougou|tineye).*)\/ic\.sjlpj\.cn\/Product\/ViewImage\?id=\/uploads(?:\/unlogo|)\/details\/(.*)/i,
to: "$1/img.tvc-mall.com/uploads/details/$3",
regex: true
},
{
//方法來源：http://tieba.baidu.com/p/3699558655
name: "鳳凰網 只顯示首圖修正",
from: /^https?:\/\/(.*)\.ifeng\.com\/a\/(ydzx|)\/(.*)/i,
to: "http://$1.ifeng.com/a/$3",
regex: true
},
{
//方法來源：http://tieba.baidu.com/p/3708648047
name: "鳳凰網 圖片修正",
from: /^https?:\/\/(.*)\.ifeng\.com\/(.+)?shtml.+?(#p=.)/,
to: "http://$1.ifeng.com/$2shtml",
regex: true
},
{
//測試：http://www.jobui.com/tips/redirect.php?link=http%3A%2F%2Fsearch.51job.com%2Fjob%2F65505572%2Cc.html
name: "職友集 去跳轉",
from:/^https?:\/\/www\.(jobui|)\.com\/(.*)(link|)=(.*)/i,
to: "$4",
regex: true
},
{
//userscripts.org和userscripts.org:8080都重定向到webextender.net
name: "userscripts >> webextender鏡像",
from: /^https?:\/\/userscripts\.org(?:\:8080|)\/(.*)/i,
to: "http:\/\/webextender.net/$1",
regex: true
},
{
//在這樣的頁面點擊，就直接弹下載窗口
//測試：http://sourceforge.net/projects/pcxfirefox/files/Release/Firefox/36.x/36.0.1/x86/sse2/
name: "sourceforge下載 >> ftp鏡像站點",
from: /^https?:\/\/sourceforge\.net\/projects\/(((\w)\w).*)\/files\/(.*)\/download/i,
to: "http://master.dl.sourceforge.net/project/$1/$4",//這個源速度眞快
//to: "ftp://ftp.jaist.ac.jp/pub/sourceforge/$3/$2/$1/$4",
//to: "http://softlayer-sng.dl.sourceforge.net/project/$1/$4",
regex: true
},
{
//不用再經過一個跳轉頁面
//測試：http://book.bfnn.org/article2/1630.htm
name: "般若文海article >> books",
from: /^https?:\/\/book\.bfnn\.org\/article([\d]?\/.*)/i,
to: "http://book.bfnn.org/books$1",
regex: true
},
{
//重定向12306的js到修改版，用來定時刷票，但驗證碼得手動輸入。
//方法來源：http://bbs.kafan.cn/thread-1809903-1-1.html
name: "12306重定向JS",
from: /(.*)kyfw\.12306\.cn\/otn\/resources\/merged\/queryLeftTicket_end_js.js(.*)/i,
to: "https://raw.githubusercontent.com/dupontjoy/customization/master/12306/queryLeftTicket_end_js.js",
regex: true
},


//Google系
{
//設置Google搜索語言爲英文，關閉安全搜索功能，使用新版界面
name: "Google搜索en-US,safe=off,sclient=psy-ab",
from: /^https?:\/\/www\.google\.com\/(s\?|search\?|webhp\?)(.*)/i,
to: "https://www.google.com/$1$2&hl=en-US&safe=off&sclient=psy-ab",
exclude: /^https?:\/\/www\.google\.com\/.*\&hl=en-US&safe=off&sclient=psy-ab(.*)/i,
regex: true
},
{
//google.com.hk的搜索重定向到國際版google.com
name: "google.com.hk >> google.com慢速版",
from: /^https?:\/\/www\.google\.com\.hk\/(s\?|search\?|webhp\?)(.*)/i,
to: "https://www.google.com/ncr#$2",
regex: true
},
{
//來源：http://bbs.kafan.cn/thread-1824493-1-1.html
name: "Google搜天氣時 圖標",
from: /^https?:\/\/www\.gstatic\.cn\/onebox\/weather\/(.*)/i,
to: "https://ssl.gstatic.com/onebox/weather/$1",
regex: true
},


//百度系
{
//百度云盘分享页，手机版 重定向至 电脑版
//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
name: "百度盤wap/link >> share/link",
from: /^https?:\/\/(pan|yun)\.baidu\.com\/(wap\/link)(.*)/i,
to: 'http://pan.baidu.com/share/link$3',
regex: true
},
{
//百度云盘分享页，手机版 重定向至 电脑版
//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
name: "百度盤wap/album/file >> pcloud/album/file",
from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/album\/file(.*)/i,
to: 'http://pan.baidu.com/pcloud/album/file$2',
regex: true
},
{
//百度云盘分享页，手机版 重定向至 电脑版
//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
name: "百度盤wap/share/home >> share/home",
from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/share\/(home\?|)(.*)/i,
to: 'http://pan.baidu.com/share/home?$3',
regex: true
},

//原始大圖系列
{
//重定向到无Logo的大圖
//测試：http://img11.360buyimg.com/n5/jfs/t700/22/552651328/263602/77209a24/54c05927N3820abe9.jpg
//方法來源：http://jingyan.baidu.com/article/3aed632e6e5f9f70108091e9.html
name: "京東 >> 原始大圖",
from: /^https?:\/\/(.*)\.360buyimg\.com\/(n1)\/(.*)\.jpg+(\/.*)?/i,
to: "http://$1.360buyimg.com/imgzone/$3.jpg",
regex: true
},

//Google服務轉國內鏡像
{
name: "ajax|fonts(http) >> useso",
from: /^http:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "http://$1.useso.com/$2",
regex: true
},
{
//参考：https://servers.ustclug.org/2014/06/blog-googlefonts-speedup/
name: "ajax|fonts(https) >> 科大",
from: /^https:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "https://$1.lug.ustc.edu.cn/$2",
regex: true
},
{
name: "themes >> 科大",
from: /^https?:\/\/themes\.googleusercontent\.com\/(.*)$/,
to: "https://google-themes.lug.ustc.edu.cn/$1",
regex: true
},
{
name: "fonts-gstatic >> 科大",
from: /^https?:\/\/fonts\.gstatic\.com\/(.*)$/,
to: "https://fonts-gstatic.lug.ustc.edu.cn/$1",
regex: true
},
/*{
//自制。參考https://developers.google.com/speed/libraries/
name: "ajax(https) >> github",
from: /^https:\/\/ajax\.googleapis\.com\/ajax\/libs\/(jquery|angularjs|angular_material|dojo|ext-core|jquerymobile|jqueryui|mootools|prototype|scriptaculous|spf|swfobject|threejs|webfont|)(\/.*)\/(jquery\.min.\js|angular\.min.\js|angular-material\.min.\js|dojo.\js|ext-core.\js|jquery\.mobile\.min.\js|jquery-ui.css|jquery-ui\.min.\js|mootools-yui-compressed.\js|prototype.\js|scriptaculous.\js|spf.\js|swfobject.\js|three\.min.\js|webfont.\js|)(.*)/i,
to: "https://raw.githubusercontent.com/dupontjoy/customization/master/google/ajax/libs/$1/$3",
regex: true
},*/
//參考https://github.com/jiacai2050/gooreplacer
{
name: "twitter.com/widgets.js >> github",
from: /^https?:\/\/platform\.twitter\.com\/widgets.js(.*)/i,
to: "https://raw.githubusercontent.com/dupontjoy/customization/master/twitter/widgets.js",
regex: true
},
{
name: "apis.google.com/js/api.js和plusone.js >> github",
from: /^https?:\/\/apis\.google\.com\/js\/(api\.js|plusone\.js)(.*)/i,
to: "https://raw.githubusercontent.com/dupontjoy/customization/master/google/apis/$1",
regex: true
},
//搬運
{
name: "Google统计和tag >> mingto.tk",
from: /^https?:\/\/(.*?)(google-analytics|googletagmanager|googletagservices|googleadservices)\.com\/([\w]+\/)*([\w]+(\.[\w]+)?)/i,
to: "http://minggo.coding.io/cdn/google/$4",
regex: true
},
{
name: "Gravatar头像 >> 多说",
from: /^https?:\/\/([0-9]?)\.gravatar\.com\/avatar\/(.*)$/,
to: "http://gravatar.duoshuo.com/avatar/$1",
regex: true
},

];