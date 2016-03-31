//2016.03.28

//Redirector說明頁面：https://github.com/dupontjoy/userChrome.js-Collections-/tree/master/Redirector
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

{
//example: http://trunk.tvc-mall.com/c/hobbies-toys/
name: "trunk.tvc|seculife",
from: /^https?:\/\/trunk\.(tvc-mall|seculife)\.com\/(c\/|t\/|details\/|search)(.*)/i,
to: "http://www.$1.com/$2$3",
regex: true
},

//單獨網站
{
//example: http://bbs.pcbeta.com/viewthread-700327-1-1.html
name: "異次元 圖片外鏈修正",
from: /^https?:\/\/img\.iplaysoft\.com\/wp-content\/(.*)/i,
to: "http://ips.chotee.com/wp-content/$1",
regex: true,
resp: true,
decode: true
},
{
//example: http://news.ifeng.com/a/ydzx/20150413/43541233_0.shtml
name: "鳳凰網 只顯示首圖修正",
from: /^https?:\/\/(.*)\.ifeng\.com\/a\/(ydzx|)\/(.*)/i,
to: "http://$1.ifeng.com/a/$3",
regex: true
},
{
//example: http://news.ifeng.com/coop/20150418/43579013_0.shtml?_zbs_baidu_pic&source=bdxsy#p=1
name: "鳳凰網 圖片修正",
from: /^https?:\/\/(.*)\.ifeng\.com\/(.+)?shtml.+?(#p=.)/,
to: "http://$1.ifeng.com/$2shtml$3",
regex: true
},
{
//example：http://www.jobui.com/tips/redirect.php?link=http%3A%2F%2Fjobs.51job.com%2Fshenzhen-nsq%2F58889341.html
//example: https://link.zhihu.com/?target=https%3A//addons.mozilla.org/zh-cn/firefox/addon/linkchecker/%3Fsrc%3Dsearch
//example: https://www.douban.com/link2/?url=https%3A%2F%2Fcode.google.com%2Fp%2Fchromium%2Fissues%2Fdetail%3Fid%3D51084
name: "去跳轉",
from:/^https?:\/\/.*\.(jobui|zhihu|douban)\..*\/.*?(link|target|url)=(.*)/i,
to: "$3",
regex: true
},
{
//example: http://userscripts.org/
name: "userscripts >> webextender鏡像",
from: /^https?:\/\/userscripts\.org(?:\:8080|)\/(.*)/i,
to: "http://webextender.net/$1",
regex: true
},
{
//在這樣的頁面點擊，就直接弹下載窗口
//測試：http://sourceforge.net/projects/pcxfirefox/files/Release/Firefox/36.x/36.0.1/x86/sse2/
//example: http://sourceforge.net/projects/pcxfirefox/files/Release/Firefox/36.x/36.0.1/x86/sse2/pcxFirefox-36.0.1-zhTW-vc2013-x86-sse2-betterpgo-150309.7z/download
name: "sourceforge下載 >> 鏡像站點",
from: /^https?:\/\/sourceforge\.net\/projects\/(((\w)\w).*)\/files\/(.*)\/download/i,
to: "http://jaist.dl.sourceforge.net/project/$1/$4",//2015.09.04修正
//to: "http://nchc.dl.sourceforge.net/project/$1/$4",//2015.07.21修正
//to: "http://master.dl.sourceforge.net/project/$1/$4",
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


//Google系
{
//google.com.hk的搜索重定向到國際版google.com
//example: https://www.google.com.hk/#newwindow=1&safe=strict&q=tvc
name: "google.com.hk >> google.com慢速版",
from: /^https?:\/\/www\.google\.com\.hk\/(s\?|search\?|webhp\?|.*\&safe=strict)(.*)/i,
to: "https://www.google.com/search?$2&hl=en-US&safe=off",
regex: true
},
{
//防死循环教程: http://blog.sina.com.cn/s/blog_6df370b70100oqw5.html
name: "Google搜索 >> 关闭安全搜索",
from: /^https?:\/\/www\.google\.com\/(s\?|search\?|webhp\?)(.*)\f((?!hl=en-US|safe=off)\w)+\f/i,
to: "https://www.google.com/search?$2&hl=en-US&safe=off",
regex: true
},
{
//詳細說明：http://bbs.kafan.cn/thread-1769934-1-1.html
//example: https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
name: "ajax|fonts(https?) >> useso",
from: /^https?:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "http://$1.useso.com/$2",
regex: true
},

{
//example: http://www.utouuxy.com/controlRedirect
name:"%5C转义到/",
from:/%5C/g,
to:"/",
regex: true
},
{
name: "百度云HTTPS下载大文件",
from: /^http:\/\/((pan|yun)+\.baidu\.com\/.+)/i,
to: "https://$1",
regex: true
},
];