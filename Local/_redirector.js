//2016.10.25

//Redirector說明頁面: https://github.com/dupontjoy/userChrome.js-Collections-/tree/master/Redirector
//規則Github備份: https://github.com/dupontjoy/userChromeJS/blob/master/Local/_redirector.js

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

/******************************************************************************************
 *指定網站
 *******************************************************************************************/
{
//example: https://zh.wikipedia.org/wiki/%E7%99%BB%E7%9B%9B
name: "Wiki中文 台湾正体",
from: /^https?:\/\/zh\.wikipedia\.org\/(zh|zh-cn|zh-sg|wiki)\/(.*)/i,
to: "https://zh.wikipedia.org/zh-tw/$2",
regex: true
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
//https://github.com/dupontjoy/userChrome.js-Collections-/tree/master/Redirector/link_direct
name: "去跳轉",
from:/^https?:\/\/.*\.(?:jobui|zhihu|douban|mozilla|google|so|)\.(?:com|org|)\/(.*(\?link|\?target|\?url|\?imgurl)=)?(http[^&]+).*/i,
to: "$3",
regex: true
},
{
//example: http://jump.bdimg.com/safecheck/index?url=rN3wPs8te/r8jfr8YhogjfUWFoMgIRa8rnxRhNIP1MZkv85mrD3mrfBH9cklV0PSubgIOda11N9BTi8jFZ4zfOnTXMIUQocAy3ZfLjT7I7T8Z8hnpML7tfZ/FYbo73c9jcNsmBeL+X8//mWXn/4pWlPSyOAgib7OMDxm7iZ2BjQ=
name: "贴吧链接去跳转",
from: /^https?:\/\/jump\.bdimg\.com\/(.*)/i,
to: "http://tieba.baidu.com/$1",
regex: true
},
{
//example: http://userscripts.org/
name: "userscripts >> 鏡像",
from: /^https?:\/\/userscripts\.org(?:\:8080|)\/(.*)/i,
to: "http://userscripts-mirror.org/$1",
regex: true
},
{
//在這樣的頁面點擊，就直接弹下載窗口
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
//測試: http://book.bfnn.org/article2/1630.htm
name: "般若文海article >> books",
from: /^https?:\/\/book\.bfnn\.org\/article([\d]?\/.*)/i,
to: "http://book.bfnn.org/books$1",
regex: true
},
{
//example: http://www.ftchinese.com/story/001069496
name: "FT中文网全文",
from: /^https?:\/\/www\.ftchinese\.com\/story\/([0-9]*)$/i,
to: "http://www.ftchinese.com/story/$1?full=y",
regex: true
},
{
//example: http://tieba.baidu.com/mo/m?kw=%E4%BB%93%E9%A2%89
name: "贴吧 手机版>>PC版",
from: /^https?:\/\/tieba\.baidu\.com\/mo\/m\?kw\=(.*)$/i,
to: "http://tieba.baidu.com/f?kw=$1",
regex: true
},


/******************************************************************************************
 *Google相关
 *******************************************************************************************/
{
//example: https://www.google.com.hk/#newwindow=1&safe=strict&q=tvc
name: "google国家域名 >> google.com",
from: /^https?:\/\/www\.google\.(?:co|com)\.(?:hk|jp|sg|kr)\/(?:s\?|search\?|webhp\?|.*\&safe=strict)(.*)/i,
to: "https://www.google.com/search?$1&hl=en-US&safe=off",
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
//詳細說明: http://bbs.kafan.cn/thread-1769934-1-1.html
name: "Google ajax >> 科大",
from: /^https?:\/\/(ajax|)\.googleapis\.com\/(.*)$/,
to: "https://$1.proxy.ustclug.org/$2",
regex: true
},
{
name: "Google themes >> 科大",
from: /^https?:\/\/themes\.googleusercontent\.com\/(.*)$/,
to: "https://google-themes.proxy.ustclug.org/$1",
regex: true
},
/*{
name: "Google fonts引用 >> 科大",
from: /^https?:\/\/fonts\.gstatic\.com\/(.*)$/,
to: "https://fonts-gstatic.proxy.ustclug.org/$1",
regex: true
},*/

/******************************************************************************************
 *通用网站
 *******************************************************************************************/
{
name: "bbs详细页面-1",
from: /^https?:\/\/(.*)\/simple\/\?t(.*)\.html/i,
to: "http://$1/read.php?tid=$2",
regex: true
},
{
//example: http://www.bathome.net/archiver/tid-6301.html
name: "bbs详细页面-2",
from: /(.*)\/archiver\/\??tid\-(\d+)(\-page\-(\d+))?\.html$/,
to: "$1/viewthread.php?tid=$2",
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

/******************************************************************************************
 *TVC(個人用)
 *******************************************************************************************/
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
from: /^(https?:\/\/ic\.sjlpj\.cn\/.*ProductNewCategory\/ProductNewCategoryManager)$/,
to: "$1?pageSize=100",
regex: true
},
{
//example: http://ic.sjlpj.cn/ProductNewCategory/ProductNewCategoryManager?quickParentId=97698
name: "ProductNewCategory型号页 每页100项",
from: /^(https?:\/\/ic\.sjlpj\.cn\/.*ProductNewCategory\/ProductNewCategoryManager\?quickParentId=[\d]+)$/,
to: "$1&pageSize=100",
regex: true
},
{
//example: http://ic.sjlpj.cn/ProductScore/CategoryList
name: "产品得分 默认全部",
from: /^(https?:\/\/ic\.sjlpj\.cn\/.*ProductScore\/CategoryList)$/,
to: "$1?CreateBeginDate=&CreateEndDate=&UpdateBeginDate=&UpdateEndDate=&IsFirstRequest=False",
regex: true
},
{
//example: http://ic.sjlpj.cn/BrandCategory/BrandCategoryList?brandCategoryId=1885
name: "品牌型号页 显示所有",
from: /^(https?:\/\/ic\.sjlpj\.cn\/.*BrandCategory\/BrandCategoryList\?brandCategoryId=[\d]+)$/,
to: "$1&seeAll=true",
regex: true
},

/******************************************************************************************
 *几个发行版快捷入口
 *******************************************************************************************/
{
name: "about:cing",
from: "about:cing",
to: "https://github.com/dupontjoy/userChrome.js-Collections-/tree/master/CingFox",
},
{
name: "about:sunbox",
from: "about:sb",
to: "http://sunbox.cc/",
},
{
name: "about:runningcheese",
from: "about:rc",
to: "http://www.runningcheese.com/",
},

];