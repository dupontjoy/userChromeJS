rules = [
{
name: "about:haoutil", // 规则名称
from: "about:haoutil", // 需要重定向的地址
to: "https://haoutil.googlecode.com", // 目标地址
state: true, //可选，true 表示启用此规则
wildcard: false, // 可选，true 表示 from 是通配符
regex: false, // 可选，true 表示 from 是正则表达式
resp: false // 可选，true 表示替换 response body
},
{
name: "userscripts >> mirror",
from: /^https?:\/\/userscripts\.org\/(.*)/i,
to: "http:\/\/webextender.net/$1",
regex: true
},
{
name: "userscripts:8080 >> mirror",
from: /^https?:\/\/userscripts\.org:8080\/(.*)/i,
to: "http:\/\/webextender.net/$1",
regex: true
},
{
// 包含手机版界面
name: "百度随心听音质320",
from: /^https?:\/\/music\.baidu\.com\/data\/music\/fmlink(.*[&\?])rate=[^3]\d+(.*)/i,
to: "http://music.baidu.com/data/music/fmlink$1rate=320$2",
regex: true
},
{
//Http走360，Https走科大
name: "googleapis >> useso",
from: /^http:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "http://$1.useso.com/$2",
regex: true
},
{
//https://servers.ustclug.org/index.php/2014/06/blog-googlefonts-speedup/
name: "科大博客提供 Google Fonts 加速-1",
from: /^https:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/,
to: "https://$1.lug.ustc.edu.cn/$2",
regex: true
},
{
//https://servers.ustclug.org/index.php/2014/06/blog-googlefonts-speedup/
name: "科大博客提供 Google Fonts 加速-2",
from: /^https?:\/\/themes\.googleusercontent\.com\/(.*)$/,
to: "http://google-themes.lug.ustc.edu.cn/$1",
regex: true
},
{
name: "Gravatar头像>>多说",
from: /^https?:\/\/([0-9]?)\.gravatar\.com\/avatar\/(.*)$/,
to: "http://gravatar.duoshuo.com/avatar/$1",
regex: true
},
{
name: "Google统计脚本",
from: /^https?:\/\/(.*?)google-analytics.com\/(.*)$/,
to: "http://code.minggo.tk/etc/$2",
regex: true
},
{
name: "The Economist add /print",
from: /^https?:\/\/www\.economist\.com\/(.*)\/(.*)/i,
to: "http://www.economist.com/$1/$2/print",
exclude: /^http:\/\/www\.economist\.com\/.*\/print/i,
regex: true
},
{
name: "般若文海 article >> books",
from: /^https?:\/\/book\.bfnn\.org\/article([\d]?\/.*)/i,
to: "http://book.bfnn.org/books$1",
regex: true
},
{
name: "职友集去跳转",
from:/^http:\/\/www\.jobui\.com\/.*\link=(.*)/i,
to: "$1",
regex: true
},

//以下为不启用
{
name: "NoRedirect",
from: /^https?:\/\/\\w[\\x21-\\x2e\\x30-\\x7e]+\\.(com|cn|org|net|info|tv)\/url?=(.+)/i,
to: "$1",
state: false,
regex: true
},
{
name: "斗鱼TV add ?cdn=lx——数字ID",
from: /^https?:\/\/www\.douyutv\.com\/(\d+)/i,
to: "http://www.douyutv.com/$1?cdn=lx",
exclude: /^http:\/\/www\.douyutv\.com\/.*\?cdn=lx/i,
state: false,
regex: true
},
{
name: "game2233 del Flashget",
from: /^https?:\/\/www\.game2233\.com\/(.*?)&union=flashget(.*)/i,
to: "http://www.game2233.com/$1",
state: false,
regex: true
},
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
name: "贴吧mo >>f",
from: /^https?:\/\/tieba\.baidu\.com\/mo\/m(.*)/i,
to: "http://tieba.baidu.com/f$1",
state: false,
regex: true
},
{
name: "tb >> taobao",
from: /^https?:\/\/(.*?)tb\.com\/(.*)$/,
to: "http://$1taobao.com/$2",
state: false,
regex: true
},
{
name: "tm >> tmall",
from: /^https?:\/\/(.*?)tm\.com\/(.*)$/,
to: "http://$1tmall.com/$2",
state: false,
regex: true
},
{
name: "tradingfloor origianl image",
from: /^https?:\/\/www\.tradingfloor\.com\/images\/article\/max608w\/(.*)/i,
to: "https://www.tradingfloor.com/images/article/original/$1",
state: false,
regex: true
},
{
name: "云播磁力链 = >> %3D",
from: /^(http:\/\/vod\.xunlei\.com\/.*url=magnet:\?xt)=(.*)=(.*)=(.*)/i,
to: "$1%3D$2", 
state: false,
regex: true
},
];