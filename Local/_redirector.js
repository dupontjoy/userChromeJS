
//2016.02.15

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
name: "trunk.tvc",
from: /^https?:\/\/trunk\.tvc-mall\.com\/(c|t|details)\/(.*)/i,
to: "http://www.tvc-mall.com/$1/$2",
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
//example：http://www.jobui.com/tips/redirect.php?link=http%3A%2F%2Fsearch.51job.com%2Fjob%2F65505572%2Cc.html
name: "職友集 去跳轉",
from:/^https?:\/\/www\.jobui\.com\/tips\/redirect\.php\?link=(.*)/i,
to: "$1",
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
{
//重定向12306的js到修改版，用來定時刷票，但驗證碼得手動輸入。
//方法來源：http://bbs.kafan.cn/thread-1809903-1-1.html
//example: https://kyfw.12306.cn/otn/resources/merged/queryLeftTicket_end_js.js
name: "12306重定向JS",
from: /(.*)kyfw\.12306\.cn\/otn\/resources\/merged\/queryLeftTicket_end_js.js(.*)/i,
to: "https://raw.githubusercontent.com/dupontjoy/customization/master/12306/queryLeftTicket_end_js.js",
regex: true
},
{
//example: http://bbs.kafan.cn/forum.php?mod=viewthread&tid=1480897&highlight=noscript
//example: http://www.zasq.net/forum.php?mod=viewthread&tid=102909&highlight=极品家丁
name:"去除URL的highlight，防止卡死",
from: /^(http:\/\/.*\.(com|cn|net)\/.*?)&highlight=(.*)/,
to: "$1",
regex: true
},

//Google系
{
//google.com.hk的搜索重定向到國際版google.com
//example: https://www.google.com.hk/#newwindow=1&safe=strict&q=tvc
name: "google.com.hk >> google.com慢速版",
from: /^https?:\/\/www\.google\.com\.hk\/(s\?|search\?|webhp\?|)(.*)/i,
to: "https://www.google.com/ncr#$2",
regex: true
},

//百度系
{
//百度云盘分享页，手机版 重定向至 电脑版
//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
//example: http://pan.baidu.com/wap/link?uk=1429459134&shareid=2632372014&third=4
name: "百度盤wap/link >> share/link",
from: /^https?:\/\/(pan|yun)\.baidu\.com\/(wap\/link)(.*)/i,
to: 'http://pan.baidu.com/share/link$3',
regex: true
},
{
//百度云盘分享页，手机版 重定向至 电脑版
//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
//example: http://pan.baidu.com/wap/album/file?uk=2469870276&album_id=8356718462803856700&fsid=1135635585
name: "百度盤wap/album/file >> pcloud/album/file",
from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/album\/file(.*)/i,
to: 'http://pan.baidu.com/pcloud/album/file$2',
regex: true
},
{
//百度云盘分享页，手机版 重定向至 电脑版
//詳細說明：http://bbs.kafan.cn/thread-1814510-1-1.html
//example: http://pan.baidu.com/wap/share/home?uk=3008368389&third=4
name: "百度盤wap/share/home >> share/home",
from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/share\/(home\?|)(.*)/i,
to: 'http://pan.baidu.com/share/home?$3',
regex: true
},

//Google服務轉國內鏡像
{
//詳細說明：http://bbs.kafan.cn/thread-1769934-1-1.html
//example: https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
name: "ajax|fonts(https?) >> useso",
from: /^https?:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "http://$1.useso.com/$2",
regex: true
},


];