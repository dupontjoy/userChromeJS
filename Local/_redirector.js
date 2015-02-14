
//2015.02.01 17:00 修复Linkedin 去跳轉，添加BT天堂 >> 備用下載，精簡
//2015.01.30 23:00 修复sourceforge規則
//2015.01.30 09:00 添加Linkedin 去跳轉
//2015.01.28 13:00 添加Business Insider 去跳轉
//2015.01.24 14:00 添加京東，天貓大圖規則
//2015.01.22 16:00 更新TVC規則
//2015.01.16 更新sourceforge規則
//2015.01.10 刪除一個有問題的規則
//2015.01.07 修正flickr >> 原始大圖

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
name: "反Google搜索驗證碼",
from: /^https?:\/\/ipv4\.google\.com\/sorry\/IndexRedirect\?continue=https?:\/\/www\.google\.com(?:\.hk|)\/search\?(.*q=.*)&q=.*/i,
to: "https://www.google.com/ncr#$1",
regex: true
},
{
name: "反百度搜索驗證碼",
from: /^https?:\/\/verify\.baidu\.com\/vcode\?http:\/\/www\.baidu\.com\/s\?wd=(.*)&(.*=.*)/i,
to: "http://www.baidu.com/s?wd=$1",
regex: true
},
{
name: "userscripts >> webextender鏡像",
from: /^https?:\/\/userscripts\.org(?:\:8080|)\/(.*)/i,
to: "http:\/\/webextender.net/$1",
regex: true
},
{
name: "sourceforge下載 >> ftp鏡像站點",
from: /^https?:\/\/sourceforge\.net\/projects\/(((\w)\w).*)\/files\/(.*)\/download/i,
/*to: "ftp://ftp.jaist.ac.jp/pub/sourceforge/$3/$2/$1/$4",*/
to: "http://softlayer-sng.dl.sourceforge.net/project/$1/$4",
regex: true
},
{
// 包含手机版界面
name: "百度隨心聽音質320",
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
{
name: "BT天堂 >> 備用下載",
from: /^https?:\/\/www\.bttiantang\.com\/download\.php\?(n\=.*)\&temp\=yes(.*)/i,
to: "http://www.bttiantang.com/download.php?temp=yes&down=d1$2",
regex: true
},
{
name: "noMoreArchiver",
from: /(.*)\/archiver\/(.*)tid-(.*)\.html/,
to: "$1/viewthread.php?tid=$3",
regex: true
},

//原始大圖系列
/*{
name: "tradingfloor 原始大圖",
from: /^https?:\/\/www\.tradingfloor\.com\/images\/article\/max608w\/(.*)/i,
to: "https://www.tradingfloor.com/images/article/original/$1",
regex: true
},
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
name: "designspiration >> 原始大圖",
from: /^https?:\/\/(.*)\.dspnimg\.com\/data\/g\/(.*)g\.jpg+(\/.*)?/i,
to: "http://$1.dspnimg.com/data/l/$2l.jpg",
regex: true
},
{
//http://bbs.kafan.cn/thread-1801036-1-1.html
name: "flickr >> 原始大圖",
from: /^(https?:\/\/c\d\.staticflickr\.com\/\d\/\d+\/\d+_[^\._]+)(_[a-z])?(\.jpg)$/,
exclude: /^(https?:\/\/c\d\.staticflickr\.com\/\d\/\d+\/\d+_\w+)_b(\.jpg)$/,
to: "$1_b$3",
regex: true
},*/
{
//测試：http://img11.360buyimg.com/n5/jfs/t700/22/552651328/263602/77209a24/54c05927N3820abe9.jpg
//方法來源：http://jingyan.baidu.com/article/3aed632e6e5f9f70108091e9.html
name: "京東 >> 原始大圖",
from: /^https?:\/\/(.*)\.360buyimg\.com\/(n1)\/(.*)\.jpg+(\/.*)?/i,
to: "http://$1.360buyimg.com/imgzone/$3.jpg",
regex: true
},

//待測試

//——————以下为不啟用——————
/*{
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
*/

];