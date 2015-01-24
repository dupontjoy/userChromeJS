
//2015.01.23 22:00 添加京東，天貓大圖規則
//2015.01.22 16:00 更新TVC規則
//2015.01.16 更新sourceforge規則
//2015.01.10 刪除一個有問題的規則
//2015.01.07 修正flickr >> 原始大图

rules = [
{
//自帶示例
name: "about:haoutil", // 规则名称
from: "about:haoutil", // 需要重定向的地址
to: "https://haoutil.googlecode.com", // 目标地址
state: true, //可选，true 表示启用此规则
wildcard: false, // 可选，true 表示 from 是通配符
regex: false, // 可选，true 表示 from 是正则表达式
resp: false, // 可选，true 表示替换 response body
decode: false // 可选，true 表示尝试对 from 解码
},


//單獨網站
{
name: "TVC內網-內網參考鏈接修正-1",
from: /^http:\/\/http\/\/(.*)/i,
to: "$1",
regex: true
},
{
name: "TVC內網-內網參考鏈接修正-2",
from: /^http:\/\/ic\.sjlpj\.cn\/DevProduct\/www\.(.*)/i,
to: "www.$1",
regex: true
},
{
name: "TVC內網 圖片 以圖搜圖",
from: /(.*(google|so|baidu|bing|sougou|tineye).*)\/ic\.sjlpj\.cn\/uploads(?:\/unlogo|)\/details\/(.*)/i,
to: "$1/img.tvc-mall.com/uploads/details/$3",
regex: true
},
{
name: "TVC內網 滾動條置頂",
from: /^http:\/\/ic\.sjlpj\.cn\/#\/(.*)/i,
to: "http://ic.sjlpj.cn/$1",
regex: true
},
{
name: "Google搜索en-US,safe=off",
from: /^https?:\/\/www\.google\.com\/(s\?|search\?|webhp\?)(.*)/i,
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
name: "反Google搜索验证码",
from: /^https?:\/\/ipv4\.google\.com\/sorry\/IndexRedirect\?continue=https?:\/\/www\.google\.com(?:\.hk|)\/search\?(.*q=.*)&q=.*/i,
to: "https://www.google.com/ncr#$1",
regex: true
},
{
name: "Google搜圖去跳轉",
from:/^https?:\/\/www\.google\.com\/(.*)imgurl=(.*)&imgrefurl=(.*)\&h=(.*)/i,
to: "$3",
regex: true
},
{
name: "反百度搜索验证码",
from: /^https?:\/\/verify\.baidu\.com\/vcode\?http:\/\/www\.baidu\.com\/s\?wd=(.*)&(.*=.*)/i,
to: "http://www.baidu.com/s?wd=$1",
regex: true
},
{
name: "职友集|inc 去跳转",
from:/^http:\/\/www\.(jobui|inc)\.com\/(.*)(link|destination)=(.*)/i,
to: "$4",
regex: true
},

{
name: "userscripts >> webextender鏡像",
from: /^https?:\/\/userscripts\.org(?:\:8080|)\/(.*)/i,
to: "http:\/\/webextender.net/$1",
regex: true
},
{
name: "sourceforge下载 >> ftp镜像站点",
from: /^https?:\/\/sourceforge\.net\/projects\/(((\w)\w).*)\/files\/(.*)\/download/i,
/*to: "ftp://ftp.jaist.ac.jp/pub/sourceforge/$3/$2/$1/$4",*/
to: "http://nchc.dl.sourceforge.net/project/$1/$4",
regex: true
},
{
// 包含手机版界面
name: "百度随心听音质320",
from: /^https?:\/\/music\.baidu\.com\/data\/music\/fmlink(.*[&\?])rate=[^3]\d+(.*)/i,
to: "http://music.baidu.com/data/music/fmlink$1rate=320$2",
regex: true
},
/*{
name: "The Economist加/print",
from: /^https?:\/\/www\.economist\.com\/(.*)\/(.*)/i,
to: "http://www.economist.com/$1/$2/print",
exclude: /^http:\/\/www\.economist\.com\/.*\/print/i,
regex: true
},*/
{
name: "般若文海article >> books",
from: /^https?:\/\/book\.bfnn\.org\/article([\d]?\/.*)/i,
to: "http://book.bfnn.org/books$1",
regex: true
},

//原始大圖系列
/*{
name: "tradingfloor 原始大圖",
from: /^https?:\/\/www\.tradingfloor\.com\/images\/article\/max608w\/(.*)/i,
to: "https://www.tradingfloor.com/images/article/original/$1",
regex: true
},*/
{
name: "百度貼吧|百科 >> 原始大圖",
from: /^http:\/\/(imgsrc|[\w]?\.hiphotos)\.baidu\.com\/(forum|baike)\/[\w].+\/sign=[^\/]+(\/.*).jpg/i,
to: "http://$1.baidu.com/$2/pic/item$3.jpg",
regex: true
},
{
name: "500px >> 原始大圖",
from: /^https?:\/\/(.*)\.(edgecastcdn|500px)\.(net|org)\/(.*)\/[\d].jpg(.*)?/i,
to: "https://$1.$2.$3/$4/2048.jpg",
exclude: /^https?:\/\/(.*)\.(edgecastcdn|500px)\.(net|org)\/(.*)\/(1|2).jpg(.*)?/i,//排除頭像縮略圖
regex: true
},
{
//測試：http://i11.topit.me/m/201103/12/12998645416093.jpg, http://f8.topit.me/8/69/94/11889296294ef94698m.jpg
name: "topit.me >> 原始大圖",
from: /^https?:\/\/(.*)\.topit\.me\/(.*)?m(.*)?\.jpg$/,
to: "http://$1.topit.me/$2l$3.jpg",
regex: true
},
{
name: "designspiration >> 原始大图",
from: /^https?:\/\/(.*)\.dspnimg\.com\/data\/g\/(.*)g\.jpg+(\/.*)?/i,
to: "http://$1.dspnimg.com/data/l/$2l.jpg",
regex: true
},
{
//http://bbs.kafan.cn/thread-1801036-1-1.html
name: "flickr >> 原始大图",
from: /^(https?:\/\/c\d\.staticflickr\.com\/\d\/\d+\/\d+_[^\._]+)(_[a-z])?(\.jpg)$/,
exclude: /^(https?:\/\/c\d\.staticflickr\.com\/\d\/\d+\/\d+_\w+)_b(\.jpg)$/,
to: "$1_b$3",
regex: true
},
{
//测试：http://img11.360buyimg.com/n5/jfs/t700/22/552651328/263602/77209a24/54c05927N3820abe9.jpg
name: "京東 >> 原始大图",
from: /^https?:\/\/(.*)\.360buyimg\.com\/n(1|2|3|4|5)\/(.*)\.jpg+(\/.*)?/i,
to: "http://$1.360buyimg.com/n0/$3.jpg",
regex: true
},
{
//测试：http://gi2.md.alicdn.com/imgextra/i2/713805254/TB2PvqMbXXXXXaSXXXXXXXXXXXX_!!713805254.jpg_60x60q90.jpg
name: "天貓 >> 原始大图",
from: /^https?:\/\/(.*)\.(md\.alicdn|)\.com\/(imgextra|)\/(.*)\.jpg\_(.*)\.jpg/i,
to: "http://$1.$2.com/$3/$4.jpg",
regex: true
},

//Google服務轉國內鏡像
{
//https://servers.ustclug.org/index.php/2014/06/blog-googlefonts-speedup/
name: "ajax/fonts >> 科大博客提供",
from: /^https?:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
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
name: "Google统计和tag >> mingto.tk",
from: /^https?:\/\/(.*?)(google-analytics|googletagmanager|googletagservices|googleadservices)\.com\/([\w]+\/)*([\w]+(\.[\w]+)?)/i,
to: "http://minggo.coding.io/cdn/google/$4",
regex: true
},

//待測試
{
name: "noMoreArchiver",
from: /(.*)\/archiver\/(.*)tid-(.*)\.html/,
to: "$1/viewthread.php?tid=$3",
regex: true
},


//——————以下为不启用——————
/*{
name: "爱奇艺",
from:/^http:\/\/afp\.qiyi\.com\/.*\url=([^&]*)(\?src=.*)/i,
to: "$1",
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
{
name: "BiliBili",
from: /^http:\/\/www\.bilibili\.com\/video\/av([\d]+)\/([\w]+\.html)?(.*)?/i,
to: "http://www.bilibili.com/video/av$1/$2#alist",
exclude: /bilibili\.com\/video\/av([\d]+)\/([\w]+\.html)?#alist$/i,
regex: true
},
{
name: "优酷收费视频 >> id97免费看",
from: /^http:\/\/v\.youku\.com\/v_show\/([\w]{16})(_ev_[\d]+)?\.html(\?.*)?$/i,
to: "http://www.id97.com/videos/play/$1.html",
regex: true,
},
*/

];