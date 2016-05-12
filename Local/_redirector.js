//2016.05.12

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
//TVC
{
//example: http://trunk.tvc-mall.com/c/hobbies-toys/
name: "trunk.tvc|seculife",
from: /^https?:\/\/trunk\.(tvc-mall|seculife)\.com\/(c\/|t\/|details\/|search|List)(.*)/i,
to: "http://www.$1.com/$2$3",
regex: true
},
{
//example: http://ic.sjlpj.cn/#/ProductNewCategory/ProductNewCategoryManager
name: "ProductNewCategory首页 每页100项",
from: /^https?:\/\/ic\.sjlpj\.cn\/.*ProductNewCategory\/ProductNewCategoryManager$/,
to: "http://ic.sjlpj.cn/ProductNewCategory/ProductNewCategoryManager?pageSize=100",
regex: true
},

//單獨網站
{
name: "工行不跳转提示页",
from: "http://www.icbc.com.cn/ICBC/网银系统/alert.htm",
to: "https://mybank.icbc.com.cn/icbc/perbank/index.jsp",
regex: false
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
//to: "http://jaist.dl.sourceforge.net/project/$1/$4",
//to: "http://nchc.dl.sourceforge.net/project/$1/$4",
to: "http://master.dl.sourceforge.net/project/$1/$4",
//to: "http://softlayer-sng.dl.sourceforge.net/project/$1/$4",
regex: true
},
{
//測試：http://book.bfnn.org/article2/1630.htm
name: "般若文海article >> books",
from: /^https?:\/\/book\.bfnn\.org\/article([\d]?\/.*)/i,
to: "http://book.bfnn.org/books$1",
regex: true
},
{
//example: http://ding.youku.com/a/id_XMTY2NDYw.html
//方法來源: http://bbs.csdn.net/topics/391051571
//Note: 需配置ReferChage使用,将qpic.cn和qlogo.cn设置为"@Block"
name: "微信圖片 反盜鏈",
from: /^https?:\/\/mmbiz\.(qpic|qlogo)\.cn\/mmbiz\/(.*)\/(.*)\?wx_fmt=(.*)/i,
to: "http://mmbiz.qpic.cn/mmbiz/$2/640",
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
name: "百度云HTTP下载大文件",
from: /^https:\/\/((pan|yun)+\.baidu\.com\/.+)/i,
to: "http://$1",
regex: true
},

{
name: "bbs详细页面",
from: /^https?:\/\/bbs\.(.*)\.(cn|com)\/simple\/\?t(.*)\.html/i,
to: "http://bbs.$1.$2/read.php?tid=$3",
regex: true
},
{
name: "about:newtab",
from: "about:newtab",
to: "chrome://userchromejs/content/myNewTab/index.html",
state: false,
regex: false
},
];