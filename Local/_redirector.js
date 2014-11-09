//2014.11.09 20:10  新增B站外鏈
//2014.11.03 20:15  跟进AB站規則
//2014.11.02 21:47  加入500px原始大圖
//2014.10.31 22:30  加入google.com.hk >> google.com快速版
//2014.10.31 16:40  優化google.com.hk >> google.com慢速版
//2014.10.30 21:05  加入測試規則：反Google驗證，百度搜索防繁體字亂碼，Google搜索en-US,safe=off
//2014.10.29 09:30  跟进AB站規則
//2014.10.27 20:20  跟进AB站規則
//2014.10.25 23:20  跟进AB站規則
//2014.10.25 12:55  添加網易雲音樂輔助規則
//2014.10.23 13:20  添加TVC規則
//2014.10.20 20:30  分組規則，添加規則

rules = [
{
//自帶示例
name: "about:haoutil", // 规则名称
from: "about:haoutil", // 需要重定向的地址
to: "https://haoutil.googlecode.com", // 目标地址
state: true, //可选，true 表示启用此规则
wildcard: false, // 可选，true 表示 from 是通配符
regex: false, // 可选，true 表示 from 是正则表达式
resp: false // 可选，true 表示替换 response body
},


//Google服務轉國內鏡像
{
//Http走360，Https走科大
name: "ajax/fonts >> 360 useso",
from: /^http:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "http://$1.useso.com/$2",
regex: true
},
{
//https://servers.ustclug.org/index.php/2014/06/blog-googlefonts-speedup/
name: "ajax/fonts >> 科大博客提供",
from: /^https:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "https://$1.lug.ustc.edu.cn/$2",
regex: true
},
{
name: "themes >> 科大博客",
from: /^https?:\/\/themes\.googleusercontent\.com\/(.*)$/,
to: "http://google-themes.lug.ustc.edu.cn/$1",
regex: true
},
{
name: "fonts-gstatic >> 科大博客",
from: /^https?:\/\/fonts\.gstatic\.com\/(.*)$/,
to: "http://fonts-gstatic.lug.ustc.edu.cn/$1",
regex: true
},
{
name: "Gravatar头像 >> 多说",
from: /^https?:\/\/([0-9]?)\.gravatar\.com\/avatar\/(.*)$/,
to: "http://gravatar.duoshuo.com/avatar/$1",
regex: true
},
{
name: "Google统计脚本 >> mingto.tk",
from: /^https?:\/\/(.*?)google-analytics.com\/(.*)$/,
to: "http://code.minggo.tk/etc/$2",
regex: true
},
{
name: "Google Tag Services >> mingto.tk",
from: /^https?:\/\/(.*?)googletagservices\.com\/tag\/js\/(.*)$/i,
to: "http://www.minggo.tk/etc/$2",
regex: true
},

//原始大圖系列
{
name: "tradingfloor 原始大圖",
from: /^https?:\/\/www\.tradingfloor\.com\/images\/article\/max608w\/(.*)/i,
to: "https://www.tradingfloor.com/images/article/original/$1",
regex: true
},
{
name: "百度貼吧|百科 原始大圖",
from: /^http:\/\/(imgsrc|[\w]?\.hiphotos)\.baidu\.com\/(forum|baike)\/[\w].+\/sign=[^\/]+(\/.*).jpg/i,
to: "http://$1.baidu.com/$2/pic/item$3.jpg",
regex: true
},
{
name: "500px 原始大圖",
from: /^https?:\/\/gp1\.wac\.edgecastcdn\.net\/806614\/photos\/photos\.500px\.net\/(.*)\/(.*)\/[\d].jpg+(\/.*)?/i,
to: "https://gp1.wac.edgecastcdn.net/806614/photos/photos.500px.net/$1/$2/2048.jpg",
regex: true
},

//轉https
{
name: "【https】google",
from: /^http:\/\/(([^\.]+\.)?google\..+)/i,
exclude: /google\.cn/i, // 可选，排除例外规则
to: "https://$1",
regex: true
},
{
name: "【https】Wiki Media",
from: /^http:\/\/upload\.wikimedia\.org\/(.*)$/i,
to: "https://upload.wikimedia.org/$1",
regex: true
},
{
name: "【https】Google Code",
from: /^http:\/\/(.*?)googlecode\.com\/(.*)$/i,
to: "https://$1googlecode.com/$2",
regex: true
},
{
name: "【https】Google User Content",
from: /^http:\/\/(.*?)googleusercontent\.com\/(.*)$/i,
to: "https://$1googleusercontent.com/$2",
regex: true
},

//單獨網站
{
name: "google搜索结果禁止跳转",
from: /^https?:\/\/www\.google\.com\/url\?.*url=([^&]*).*/i,
to: "$1",
regex: true
},
{
name: "职友集去跳转",
from:/^http:\/\/www\.jobui\.com\/.*\link=(.*)/i,
to: "$1",
regex: true
},
{
name: "Google搜索en-US,Safe=off",
from: /^https?:\/\/www\.google\.com\/(s|search|webhp)(.*)/i,
to: "https://www.google.com/$1$2&hl=en-US&safe=off",
exclude: /^https:\/\/www\.google\.com\/.*\&hl=en-US&safe=off(.*)/i,
regex: true
},
{
name: "google.com.hk >> google.com慢速版",
from: /^https?:\/\/www\.google\.com\.hk\/search\?(.*)/i,
to: "https://www.google.com/ncr#$1&hl=en-US&safe=off",
exclude: /^https:\/\/www\.google\.com\/.*\&hl=en-US&safe=off(.*)/i,
regex: true
},
{
name: "google.com.hk >> google.com快速版",
from: /^https?:\/\/www\.google\.com\.hk\/url\?sa=p&hl=zh-CN&pref=hkredirect&pval=yes&q=https?:\/\/www\.google\.com\.hk\/search\?(.*)/i,
to: "https://www.google.com/ncr#$1&hl=en-US&safe=off",
exclude: /^https:\/\/www\.google\.com\/.*\&hl=en-US&safe=off(.*)/i,
regex: true
},
{
name: "百度搜索ie=utf-8防繁體字亂碼",
from: /^https?:\/\/www\.baidu\.com\/(s|baidu|search)(.*)/i,
to: "http://www.baidu.com/$1$2&ie=utf-8",
exclude: /^http:\/\/www\.baidu\.com\/.*\&ie=utf-8(.*)/i,
regex: true
},
{
name: "userscripts >> webextender鏡像",
from: /^https?:\/\/userscripts\.org(?:\:8080|)\/(.*)/i,
to: "http:\/\/webextender.net/$1",
regex: true
},
{
name:"Greasyfork >> zh-CN",
state:true,
from:/^https:\/\/greasyfork\.org\/scripts\/(.*)/,
to:"https://greasyfork.org/zh-CN/scripts/$1",
regex:true
},
{
// 包含手机版界面
name: "百度随心听音质320",
from: /^https?:\/\/music\.baidu\.com\/data\/music\/fmlink(.*[&\?])rate=[^3]\d+(.*)/i,
to: "http://music.baidu.com/data/music/fmlink$1rate=320$2",
regex: true
},
{
//重定向这个网址 http://s3.music.126.net/s/2/pt_index.js?49d138c4e4dfbd143dc16794a95a4856
name: "网易云音乐320k辅助",
from: /^http:\/\/.*\.music\.126\.net\/.*pt_index\.js/i,
to: "https://raw.githubusercontent.com/dupontjoy/customization/master/pt_index.js",
regex: true
},
{
name: "The Economist加/print",
from: /^https?:\/\/www\.economist\.com\/(.*)\/(.*)/i,
to: "http://www.economist.com/$1/$2/print",
exclude: /^http:\/\/www\.economist\.com\/.*\/print/i,
regex: true
},
{
name: "般若文海article >> books",
from: /^https?:\/\/book\.bfnn\.org\/article([\d]?\/.*)/i,
to: "http://book.bfnn.org/books$1",
regex: true
},
{
name: "贴吧mo >> f",
from: /^https?:\/\/tieba\.baidu\.com\/mo\/m(.*)/i,
to: "http://tieba.baidu.com/f$1",
regex: true
},
{
name: "tb >> taobao",
from: /^https?:\/\/(.*?)tb\.com\/(.*)$/,
to: "http://$1taobao.com/$2",
regex: true
},
{
name: "tm >> tmall",
from: /^https?:\/\/(.*?)tm\.com\/(.*)$/,
to: "http://$1tmall.com/$2",
regex: true
},
{
name: "TVC內網 去掉多餘的『http//』",
from: /^http:\/\/http\/\/(.*)/i,
to: "$1",
regex: true
},
{
name: "AcFun - ab",
from: /^http:\/\/www\.acfun\.tv\/v\/ab([\w]+)(#album=.*)?(#(fullscreen=1;)?autoplay=1)?/i,
exclude: /acfun\.tv\/v\/ab(.*)#txt-title-view/i,
to: "http://www.acfun.tv/v/ab$1#txt-title-view",
regex: true
},
{
name: "AcFun - ac",
from: /^http:\/\/www\.acfun\.tv\/(a|v)\/ac([\w]+)(#album=.*)?(#(fullscreen=1;)?autoplay=1)?/i,
exclude: /acfun\.tv\/(a|v)\/ac(.*)#txt-info-title/i,
to: "http://www.acfun.tv/$1/ac$2#txt-info-title", 
regex: true
},
{
name: "BiliBili",
from: /^http:\/\/www\.bilibili\.com\/video\/av([\d]+)\/([\w]+\.[\w]+)?(\?[\w]+)?(##alist)?/i,
exclude: /bilibili\.com\/video\/av([\d]+)\/([\w]+\.[\w]+)?#alist/i,
to: "http://www.bilibili.com/video/av$1/$2#alist",
regex: true
},
{
//測試地址：http://bbs.colg.cn/thread-3334951-1-1.html
name: "B站外鏈",
from: /^http:\/\/static\.hdslb\.com\/miniloader\.swf\?aid\=781381\&page\=1/,
to: "http://static.hdslb.com/miniloader.swf?aid=482215&page=1",
regex: true
},

//待測試
{
name: "反Google搜索验证码",
from: /^https?:\/\/ipv4\.google\.com\/sorry\/IndexRedirect\?continue=https?:\/\/www\.google\.com(?:\.hk|)\/search\?(.*)/i,
to: "https://www.google.com/ncr#$1",
regex: true
},


//以下为不启用
{
name: "爱奇艺",
from:/^http:\/\/afp\.qiyi\.com\/.*\url=([^&]*)(\?src=.*)/i,
to: "$1",
state: false,
regex: true
},
{
name: "百度盘下载地址替换",
from: /^https?:\/\/\d+\.\d+\.\d+\.\d+\/cdn\.baidupcs\.com\/file\/(.*)/i,
to: "http://www.baidupcs.com/$1",
state: false,
regex: true
},
{
name: "google.com|hk搜索 >> wen.lu",
from:  /^https?:\/\/www\.google\.com(?:\.hk|)\/(.*)/i,
to: "https://wen.lu/$1",
state: false,
regex: true
},

];