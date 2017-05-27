//2017.05.26
//Redirector说明页面: https://github.com/dupontjoy/userChrome.js-Collections-/tree/master/Redirector
//规则Github备份: https://github.com/dupontjoy/userChromeJS/blob/master/Local/_redirector.js
rules = [{
    //自带示例
    name: "about:haoutil",
    // 规则名称
    from: "about:haoutil",
    // 需要复位向的地址
    to: "https://haoutil.googlecode.com",
    // 目标地址
    state: true,
    //可选，true 表示启用此规则
    wildcard: false,
    // 可选，true 表示 from 是通配符
    regex: false,
    // 可选，true 表示 from 是正则表逹式
    resp: false,
    // 可选，true 表示替换 response body
    decode: false // 可选，true 表示尝试对 from 译码
},

/******************************************************************************************
 *指定网站
 *******************************************************************************************/
{
    //example: http://news.ifeng.com/a/ydzx/20150413/43541233_0.shtml
    name: "凤凰网 只显示首图修正",
    from: /^https?:\/\/(.*)\.ifeng\.com\/a\/(ydzx|)\/(.*)/i,
    to: "http://$1.ifeng.com/a/$3",
    regex: true
},
{
    //example: http://news.ifeng.com/coop/20150418/43579013_0.shtml?_zbs_baidu_pic&source=bdxsy#p=1
    name: "凤凰网 图片修正",
    from: /^https?:\/\/(.*)\.ifeng\.com\/(.+)?shtml.+?(#p=.)/,
    to: "http://$1.ifeng.com/$2shtml$3",
    regex: true
},
{
    //https://github.com/dupontjoy/userChrome.js-Collections-/tree/master/Redirector/link_direct
    name: "去跳转",
    from: /^https?:\/\/.*\.(?:jobui|google|so|)\.(?:com|org|)\/(.*(\?link|\?target|\?url|\?imgurl)=)?(http[^&]+).*/i,
    to: "$3",
    regex: true
},
{
    name: "豆瓣链接去跳转",
    from: /^https?:\/\/www\.douban\.com\/.*\?url=(http.*)/i,
    to: "$1",
    regex: true
},{
    name: "知乎链接去跳转",
    from: /^https?:\/\/(link|www)\.zhihu\.com\/(\?target=|question\/.*)(http.*)/i,
    to: "$3",
    regex: true
},{
    name: "WordPress博客外链去跳转",
    from: /^https?:\/\/.*\/go\.php\?url=(http.*)/i,
    to: "$1", 
    regex: true
},{
    name: "Pixiv外链去跳转",
    from: /^https?:\/\/www\.pixiv\.net\/jump\.php\?(http.*)/i,
    to: "$1", 
    regex: true
},
/*{
//example: http://jump.bdimg.com/safecheck/index?url=rN3wPs8te/r8jfr8YhogjfUWFoMgIRa8rnxRhNIP1MZkv85mrD3mrfBH9cklV0PSubgIOda11N9BTi8jFZ4zfOnTXMIUQocAy3ZfLjT7I7T8Z8hnpML7tfZ/FYbo73c9jcNsmBeL+X8//mWXn/4pWlPSyOAgib7OMDxm7iZ2BjQ=
name: "贴吧链接去跳转",
from: /^https?:\/\/jump\.bdimg\.com\/(.*)/i,
to: "http://tieba.baidu.com/$1",
regex: true
},*/
{
    //example: http://userscripts.org/
    name: "userscripts >> 镜像",
    from: /^https?:\/\/userscripts\.org(?:\:8080|)\/(.*)/i,
    to: "http://userscripts-mirror.org/$1",
    regex: true
},
{
    //在这样的页面点击，就直接弹下载窗口
    //example: http://sourceforge.net/projects/pcxfirefox/files/Release/Firefox/36.x/36.0.1/x86/sse2/pcxFirefox-36.0.1-zhTW-vc2013-x86-sse2-betterpgo-150309.7z/download
    name: "sourceforge下载 >> 镜像站点",
    from: /^https?:\/\/sourceforge\.net\/projects\/(((\w)\w).*)\/files\/(.*)\/download/i,
    //to: "http://jaist.dl.sourceforge.net/project/$1/$4",
    //to: "http://nchc.dl.sourceforge.net/project/$1/$4",
    to: "http://master.dl.sourceforge.net/project/$1/$4",
    //to: "http://softlayer-sng.dl.sourceforge.net/project/$1/$4",
    regex: true
},
{
    //测试: http://book.bfnn.org/article2/1630.htm
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
{
    name: "网易云播放页重定向",
    from: /^(http:\/\/music\.163\.com\/#\/song)(\/|\?id=)(\d*).*/,
    exclude: /\?id=\d+$/i,
    to: "$1?id=$3",
    regex: true
},
{
    name: "天涯论坛手机版跳转",
    from: /^(http:\/\/bbs\.tianya\.cn\/)m\/(.*)/i,
    to: "$1$2",
    regex: true
},{
    name: "百度百科手机版跳转",
    from: /^(http:\/\/)wap(baike\.baidu\.com\/.*)/i,
    to: "$1$2",
    regex: true
},
{
    name: "百度手机版跳转",
    from: /https?:\/\/m\.baidu\.com\/.*from=.*/i,
    to: function(r) {
          var pn = r[0].match(/pn=[^&]+/),word = r[0].match(/word=[^&]+/);
          return "https://www.baidu.com/s?" + word + (pn ? "&" + pn : "");
        },
    state: false,
    regex: true
},{
    name: "新浪微博手机版跳转",
    from: /^(http:\/\/)(m\.*)?weibo\.cn(\/u\/.*)/i,
    to: "$1weibo.com$3",
    regex: true
},{
    name: "微博文章转电脑版",
    from: /^https?:\/\/media\.weibo\.cn\/article(\?id=\d+).*/,
    to: "https://weibo.com/ttarticle/p/show$1",
    regex: true
},

/******************************************************************************************
 *Google相关
 *******************************************************************************************/
{
    //example: https://www.google.com.hk/#newwindow=1&safe=strict&q=tvc
    name: "google国家域名 >> google.com",
    from: /^https?:\/\/www\.google\.(?:co|com)\.(?:hk|jp|sg|kr)\/(?:s\?|search\?|webhp\?|.*\&safe=strict)(.*)/i,
    to: "https://www.google.com/search?$1",
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
    //详细说明: http://bbs.kafan.cn/thread-1769934-1-1.html
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
    name: "Discuz!X2转完整版",
    from: /^(https?:\/\/.*\/)archiver\/\?tid-(.*)\.html.*/i,
    to: "$1forum.php?mod=viewthread&tid=$2",
    regex: true
},{
    name: "Discuz!X3转完整版",
    from: /^(https?:\/\/.*\/)archiver\/tid-(.*)\.html.*/i,
    to: "$1thread-$2-1-1.html",
    regex: true
},
{
    //example: http://ding.youku.com/a/id_XMTY2NDYw.html
    //方法来源: http://bbs.csdn.net/topics/391051571
    //Note: 需配置ReferChage使用,将qpic.cn和qlogo.cn设置为"@Block"
    name: "微信图片 反盗链",
    from: /^https?:\/\/mmbiz\.(qpic|qlogo)\.cn\/(mmbiz(_png|_jpg)?)\/(.*)\/(.*)\?(wx|tp)(.*)/i,
    to: "http://mmbiz.qpic.cn/$2/$4/640",
    regex: true
},

/******************************************************************************************
 *TVC(个人用)
 *******************************************************************************************/
{
    //example: http://192.168.1.70:180/c/networking-c38845/
    name: "tvc测试",
    from: /^https?:\/\/192\.168\.1\.70\:180\/(c\/|t\/|details\/|search|List|ProductList)(.*)/i,
    to: "https://www.tvc-mall.com/$1$2",
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

];

