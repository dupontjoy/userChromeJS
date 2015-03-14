
//2015.03.14 15:00 爲規則添加說明
//2015.03.13 20:00 修正百度盤搜索地址替換
//2015.03.10 09:00 新增百度盤搜索地址替換，重新分組
//2015.03.06 15:00 更新Google搜索
//2015.02.17 14:00 新增12306重定向JS
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
//個人用
name: "TVC內網-內網參考鏈接修正-1",
from: /^http:\/\/http\/\/(.*)/i,
to: "$1",
regex: true
},
{
//個人用
name: "TVC內網-內網參考鏈接修正-2",
from: /^http:\/\/ic\.sjlpj\.cn\/DevProduct\/www\.(.*)/i,
to: "www.$1",
regex: true
},
{
//個人用
name: "TVC內網 圖片 以圖搜圖",
from: /(.*(google|so|baidu|bing|sougou|tineye).*)\/ic\.sjlpj\.cn\/uploads(?:\/unlogo|)\/details\/(.*)/i,
to: "$1/img.tvc-mall.com/uploads/details/$3",
regex: true
},
{
//個人用
name: "TVC內網 滾動條置頂",
from: /^http:\/\/ic\.sjlpj\.cn\/#\/(.*)/i,
to: "http://ic.sjlpj.cn/$1",
regex: true
},
{
//測試：http://www.jobui.com/tips/redirect.php?link=http%3A%2F%2Fsearch.51job.com%2Fjob%2F65505572%2Cc.html
name: "职友集|inc 去跳转",
from:/^http:\/\/www\.(jobui|inc)\.com\/(.*)(link|destination)=(.*)/i,
to: "$4",
regex: true
},
{
//userscripts.org和userscripts.org:8080都跳轉到webextender.net
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
to: "ftp://ftp.jaist.ac.jp/pub/sourceforge/$3/$2/$1/$4",
//to: "http://softlayer-sng.dl.sourceforge.net/project/$1/$4",
regex: true
},
{
//Y大寫的隨心聽320K重定向
//現在失效了
name: "百度隨心聽音質320",
from: /^https?:\/\/music\.baidu\.com\/data\/music\/fmlink(.*[&\?])rate=[^3]\d+(.*)/i,
to: "http://music.baidu.com/data/music/fmlink$1rate=320$2",
regex: true
},
/*
{
//加/print可以無限看文章
//現在換用改referer的方式，還更好一些
name: "The Economist加/print",
from: /^https?:\/\/www\.economist\.com\/(.*)\/(.*)/i,
to: "http://www.economist.com/$1/$2/print",
exclude: /^http:\/\/www\.economist\.com\/.*\/print/i,
regex: true
},*/
{
//不用再經過一個跳轉頁面
//測試：http://book.bfnn.org/article2/1630.htm
name: "般若文海article >> books",
from: /^https?:\/\/book\.bfnn\.org\/article([\d]?\/.*)/i,
to: "http://book.bfnn.org/books$1",
regex: true
},
{
//在Google搜索時會出現某一種頁面，這個重定向用來直接跳到目標鏈接
name: "noMoreArchiver",
from: /(.*)\/archiver\/(.*)tid-(.*)\.html/,
to: "$1/viewthread.php?tid=$3",
regex: true
},
{
//重定向12306的JS到修改版，用來定時刷票，但驗證碼得手動輸入。
//方法來源：http://bbs.kafan.cn/thread-1809903-1-1.html
name: "12306重定向JS",
from: /(.*)kyfw\.12306\.cn\/otn\/resources\/merged\/queryLeftTicket_end_js.js(.*)/i,
to: "https://raw.githubusercontent.com/dupontjoy/customization/master/queryLeftTicket_end_js.js",
regex: true
},

//Google系
{
//設置Google搜索語言爲英文，關閉安全搜索功能，使用新版界面
name: "Google搜索en-US,safe=off,sclient=psy-ab",
from: /^https?:\/\/www\.google\.com\/(s\?|search\?|webhp\?)(.*)/i,
to: "https://www.google.com/$1$2&hl=en-US&safe=off&sclient=psy-ab",
exclude: /^https:\/\/www\.google\.com\/.*\&hl=en-US&safe=off&sclient=psy-ab(.*)/i,
regex: true
},
{
//google.com.hk的搜索重定向到國際版google.com
name: "google.com.hk >> google.com慢速版",
from: /^https?:\/\/www\.google\.com\.hk\/search\?(.*)/i,
to: "https://www.google.com/ncr#$1&hl=en-US&safe=off",
exclude: /^https:\/\/www\.google\.com\/.*\&hl=en-US&safe=off(.*)/i,
regex: true
},
{
//Google搜索時，中鍵點擊圖片，跳轉到原始鏈接。
//詳細說明：http://bbs.kafan.cn/thread-1799098-1-1.html
name: "Google搜圖去跳轉",
from:/^https?:\/\/www\.google\.com\/(.*)imgurl=(.*)&imgrefurl=(.*)\&h=(.*)/i,
to: "$3",
regex: true
},
{
//有時Google會要求塡驗證碼，此規則用以跳過
name: "反Google搜索驗證碼",
from: /^https?:\/\/ipv4\.google\.com\/sorry\/IndexRedirect\?continue=https?:\/\/www\.google\.com(?:\.hk|)\/search\?(.*q=.*)&q=.*/i,
to: "https://www.google.com/ncr#$1",
regex: true
},

//百度系
{
//參照『反Google搜索驗證碼』改的，很少遇到吶
name: "反百度搜索驗證碼",
from: /^https?:\/\/verify\.baidu\.com\/vcode\?http:\/\/www\.baidu\.com\/s\?wd=(.*)&(.*=.*)/i,
to: "http://www.baidu.com/s?wd=$1",
regex: true
},
{
//百度云盘分享页，手机版 重定向至 电脑版
//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
name: "百度盤wap/link >> share/link",
from: /^https?:\/\/\pan\.baidu\.com\/wap\/(link\?|shareview\?\&)(.*)/i,
to: 'http://yun.baidu.com/share/link?$2',
regex: true
},
{
//百度云盘分享页，手机版 重定向至 电脑版
//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
name: "百度盤wap/album/file >> pcloud/album/file",
from: /^https?:\/\/\pan\.baidu\.com\/wap\/album\/file(.*)/i,
to: 'http://yun.baidu.com/pcloud/album/file$1',
regex: true
},
{
//來源：http://bbs.kafan.cn/thread-1804863-1-1.html
name: "百度盤lx.cdn >> qd",
from:/^http:\/\/lx\.cdn\.baidupcs\.com\/file\/(.*)$/,
to: "http://qd.baidupcs.com/file/$1",
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
//重定向到无Logo的大圖
//测試：http://img11.360buyimg.com/n5/jfs/t700/22/552651328/263602/77209a24/54c05927N3820abe9.jpg
//方法來源：http://jingyan.baidu.com/article/3aed632e6e5f9f70108091e9.html
name: "京東 >> 原始大圖",
from: /^https?:\/\/(.*)\.360buyimg\.com\/(n1)\/(.*)\.jpg+(\/.*)?/i,
to: "http://$1.360buyimg.com/imgzone/$3.jpg",
regex: true
},

//Google服務轉國內鏡像
/*{
//重定向ajax|fonts到國內的360
name: "Google ajax|fonts >> useso",
from: /^https?:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "http://$1.useso.com/$2",
state: true,
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
},*/

//待測試
{
name: "NoRedirect",
from: /^https?:\/\/\\w[\\x21-\\x2e\\x30-\\x7e]+\\.(com|cn|org|net|info|tv)\/url?=(.+)/i,
to: "$1",
regex: true
},
{
name: "百度盤下載地址替換",
from: /^https?:\/\/\d+\.\d+\.\d+\.\d+\/cdn\.baidupcs\.com\/file\/(.*)/i,
to: 'http://www.baidupcs.com/$1',
regex: true
},

//——————以下为不啟用——————
/*{
//有人求的，練手之作
name: "tb >> taobao",
from: /^https?:\/\/(.*?)tb\.com\/(.*)$/,
to: "http://$1taobao.com/$2",
regex: true
},
{
//有人求的，練手之作
name: "tm >> tmall",
from: /^https?:\/\/(.*?)tm\.com\/(.*)$/,
to: "http://$1tmall.com/$2",
regex: true
},
{
//打開頁面後，自動滾動到某一位置
name: "BiliBili",
from: /^http:\/\/www\.bilibili\.com\/video\/av([\d]+)\/([\w]+\.html)?(.*)?/i,
to: "http://www.bilibili.com/video/av$1/$2#alist",
exclude: /bilibili\.com\/video\/av([\d]+)\/([\w]+\.html)?#alist$/i,
regex: true
},
*/

];
