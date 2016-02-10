/******************************************************************************************
 *这里是自定义服务器信息显示，可以根据需要截取(只支持函数操作)。
 *******************************************************************************************/
var ServerInfo = [ //在图标提示显示的 服务器信息
	{
		All: false, //是否显示所有信息，此项目有在第一个objiect内设置才生效，切之后的自定义项目不生效。不推荐，会显示cookies等隐私信息；
		//当显示所有http头信息时的排除项目，ALL设置为true时生效，注意：需要放到ALL同一个Object内，只支持正则！ test()
		AllFilter: /set-cookie|date|connection|vary|proxy-connection/i,
		label: "服务器：",
		words: "Server"
	}, {
		label: "网站编码：", //项目名
		words: "Content-Type", //http头信息关键字
		//截取或替换的函数，返回的是null就是在没有结果的时候自动隐藏该项
		Func: function(word) {
			if (word && word.match("=")) {
				word = word.substring(word.indexOf("charset="));
				word = word.substring(8, word.length).toUpperCase();
				return word;
			} else return null;
		}
	}, {
		label: "网站程序：",
		words: "X-Generator"
	}, {
		label: "网站语言：",
		words: "X-Powered-By"
	}
];
/******************************************************************************************
 *这里是自定义httpheader规则列表。
 *******************************************************************************************/
var HeadRules = { //Http Head Rules
	"/^https?://([a-zA-Z]+)\\.?myip.cn.*$/": {
		"X-Forwarded-For": "8.8.8.8",
	},
};
/******************************************************************************************
 *这里是UA自动切换规则列表。
 *******************************************************************************************/
var UASites = { //UA自动规则列表
//2015.05.11 13:00 更新工行規則
//2015.03.31 11:00 新增115Browser
//2015.01.15 FX35工行不支持10.0，新增20.0UA
//2014.12.11 調整圖標
"^http://www\\.apple\\.com/": "Chrome - Win7",
"^https?://(?:mybank.*|b2c.*)\\.icbc\\.com\\.cn/": "Firefox20.0",//工商銀行
"^https?://([a-zA-Z]+)\\.?kankan.com.*$": "Safari-Mac", //直接可以看kankan视频，无需高清组件
"^https?://wap.*": "UCBrowser", //WAP用UC浏览器
"^https?://([a-zA-Z]+)\\.?uc.cn.*$": "UCBrowser", //WAP用UC浏览器
"^https?://([a-zA-Z]+).qq.com.*$": "Chrome-Win7",
"^https?://(pcs\\.baidu\\.com|baidupcs\\.com).*$": "BaiduYunGuanJia",
"^https?://([a-zA-Z]+)\\.115\\.com.*$": "115Browser",
"^https?://([a-zA-Z]+)\\.myip\\.cn.*$": "Chrome-Win7",
};
/******************************************************************************************
 *RefererChange，来源伪造，一般破解反外链。
//@NORMAL: 不改变referer
//@FORGE: 发送根站点referer
//@ORIGINAL: 发送打开站点referer
//@BLOCK: 发送空referer
 *******************************************************************************************/
var RefererChange = { //RefererChange 来源伪造 
//2015.01.18 08:00 新增economist.com
//2015.01.15 新增wsj.com
//2014.12.16 增加poco
//2014.11.25 增加chiphell,niunews
//2014.11.09 增加pconline和postimg

 //目标网址类
'economist.com': 'https://www.google.com/',//突破每週3篇限制
'wsj.com': 'https://www.google.com/',//免登陆或订阅看全文
'img.liufen.com': 'http://www.liufen.com.cn/',
'mangafiles.com' : 'http://www.imanhua.com/',
'douban.com': 'http://www.douban.com',
'yyets.com': 'http://www.yyets.com/',
'space.wenxuecity.com': 'http://bbs.wenxuecity.com/',
'www.autoimg.cn': 'http://club.autohome.com.cn/',
'kkkmh.com': 'http://www.kkkmh.com/',
'nonie.1ting.com': 'http://www.1ting.com/',
'img.knb.im': 'http://www.kenengba.com/',
'xici.net': 'http://www.xici.net/',
'media.chinagate.com': 'http://www.wenxuecity.com/',
'jdstatic.tankr.net': 'http://jandan.net/',
'sankakustatic.com': 'http://chan.sankakucomplex.com/',

// baidu 相关网站
'hiphotos.baidu.com': '@FORGE',
'hiphotos.bdimg.com' : '@FORGE',
'imgsrc.baidu.com': '@FORGE',
'baidu-img.cn': 'http://www.baidu.com/',
'bdstatic.com': 'http://tieba.baidu.com/',

// sina
'photo.sina.com.cn': '@BLOCK',
'sinaimg.cn': 'http://blog.sina.com.cn/',

//天涯
'tianya.cn': 'http://bbs.tianya.cn/',
'laibafile.cn' : 'http://www.tianya.cn/',

//其它
'bjguahao.gov.cn': '@BLOCK',//从其它网址跳转打不开
'bimg.126.net': '@FORGE',
'tankr.net': '@FORGE',
'51cto.com': '@FORGE',
'pconline.com.cn': '@FORGE',
'postimg.org': '@FORGE',
'chiphell.com': '@FORGE',
'niunews.cn': '@FORGE',
'poco.cn': '@FORGE',
'jump.bdimg.com': '@NORMAL',
'tmoke.com': '@BLOCK',
'51img1.com' : '@FORGE',
'zol-img.com.cn' : '@FORGE',
'img.cnbeta.com': '@FORGE',
'pixiv.net': '@FORGE',
'ph.126.net' : '@FORGE',
'isnowfy.com': '@FORGE',
'image.itmedia.co.jp': '@FORGE',
'2ch.net': '@FORGE',
'imepita.jp': '@ORIGINAL',
'tumblr.com': '@FORGE',
'photo.store.qq.com': '@FORGE',
'img.pconline.com.cn': '@FORGE',
'fc2.com': '@BLOCK',
'blogs.yahoo.co.jp': '@BLOCK',
'hentaiverse.net': '@BLOCK',
'fmn.rrfmn.com': '@BLOCK',
'qpic.cn': '@BLOCK',//微信平台图片
'qlogo.cn': '@BLOCK',//微信平台图片
'postimage.org': '@FORGE',
};
/******************************************************************************************************************
 *这里是自定义浏览器标识UserAgent设置
 *******************************************************************************************************************/
var UAList = [ //自定义UA列表
{name: "IE8 - Win7",//此处文字显示在右键菜单上，中文字符请转换成javascript编码，否则乱码(推荐http://rishida.net/tools/conversion/)
ua: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
label: "IE8 - Win7",//此处文字显示在状态栏上，如果你设置状态栏不显示图标
image :"http://www.easyicon.net/api/resizeApi.php?id=581132&size=16"},

{name: "分隔线",},

{name: "Chrome - Win7",
ua: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1623.0 Safari/537.36",
label: "Chrome - Win7",
image :"http://www.easyicon.net/api/resizeApi.php?id=528802&size=16"},

{name: "分隔线",},

//伪装 Opera 10.60
{  name: "Opera",
ua: "Opera/9.80 (Windows NT 6.1; U) Presto/2.6.30 Version/10.60",
label: "Opera",
image :"http://www.opera.com/favicon.ico"},

{name: "分隔线",},

//伪装 Safari - Mac OS X
{  name: "Safari - Mac",
ua: "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; ja-jp) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
label: "Safari - Mac",
image :"http://www.easyicon.net/api/resizeApi.php?id=1092562&size=16"},

//伪装 iPhone，查询http://www.zytrax.com/tech/web/mobile_ids.html
{  name: "iPhone",
ua: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_2 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7D11 Safari/528.16",
label: "iPhone",
image :"http://www.easyicon.net/api/resizeApi.php?id=1172525&size=16"},

//伪装 Apple iPad 2
{  name: "Apple iPad 2",
ua: "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
label: "Apple iPad 2",
image :"http://www.easyicon.net/api/resizeApi.php?id=584472&size=16"},

{name: "分隔线",},

{name: "iOS/微信浏览器",
ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X)AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B350MicroMessenger/4.5",
label: "iOS - WeChat",
image :"https://res.wx.qq.com/zh_CN/htmledition/v2/images/favicon27fe59.ico"},

{name: "分隔线",},

{name: "UCBrowser",
ua: "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; Desktop) AppleWebKit/534.13 (KHTML, like Gecko) UCBrowser/8.9.0.251",
label: "UCBrowser",
image :"http://www.uc.cn/favicon.ico"},

{name: "分隔线",},

// 伪装Firefox20.0
{  name: "Firefox20.0",
ua: "Mozilla/5.0 (Windows NT 6.2; Win64; x64;) Gecko/20100101 Firefox/20.0",
label: "Firefox20.0",
image :"http://www.easyicon.net/api/resizeApi.php?id=1123569&size=16"},

// 伪装Firefox10.0
{  name: "Firefox10.0",
ua: "Mozilla/5.0 (Windows NT 6.1; rv:10.0.6) Gecko/20120716 Firefox/10.0.6",
label: "Firefox10.0",
image :"http://www.easyicon.net/api/resizeApi.php?id=1123570&size=16"},
];
/******************************************************************************************************************
 *这里是查询源设置，taobao为脚本内置,可以自行按照示例添加。
 *不限定于IP，可以是其他相关的API，只要是你想要显示的都可以。
 *******************************************************************************************************************/
//自定义查询信息
var CustomInfos = [
	//本地IP查询
	{
		Enable: false, //是否启用
		DifPort: false, //是否针对当前网站的不同端口也发送请求
		Times: 0, //脚本当次运行期间请求次数，0为每次请求。
		timeout: '1000', //延迟，毫秒 默认1000
		method: 'GET', //请求的类型，默认 GET；例如：POST、GET、PUT及PROPFIND。大小写不敏感。
		Api: "http://whois.pconline.com.cn/", //查询接口API，此处可用变量参数 %HOST%、%IP%、%URL%等（仅用于GET）具体请参照；https://github.com/ywzhaiqi/userChromeJS/tree/master/addmenuPlus
		responseType: null, //请求返回类型
		bstrUser: null, //用户名
		bstrPassword: null, //密码
		SendString: null, //发送的内容，字符串，仅method为POST时有效
		onreadystatechange: null, //onreadystatechange
		overrideMimeType: null, //overrideMimeType
		getResponseHeader: ['Server', 'Content-Type'], //数组，回应头
		setRequestHeader: { // 请求头
			apikey: '1234564556465',
			apikey1: '123456654789',
		},

		//截取函数,传入内容 docum 是XMLHttpRequest()的req.responseText，（具体可以百度	XMLHttpRequest()）。下同
		Func: function(docum) {
			if (docum) {
				docum = docum.substring(docum.indexOf("位置"));
				docum = docum.substring(0, docum.indexOf("<h3>接口列表"));

				var addr = docum.substring(3, docum.indexOf("\n"));

				var ip = docum.substring(docum.indexOf("为:"));
				ip = ip.substring(2, ip.indexOf("\n"));

				var RemoteAddr = docum.substring(docum.indexOf("RemoteAddr"));
				RemoteAddr = RemoteAddr.substring(11, RemoteAddr.indexOf("<br/>"));
				if (addr || ip || RemoteAddr) {
					var MyInfos = "我的IP：" + ip + '\n' + "我的地址：" + addr + '\n' + "RemoteAddr：" + RemoteAddr;
					return MyInfos; //此处为传回值，为字符串
				} else return null;
			} else return null;
		}
	},
	//天气查询
	{
		Enable: false,
		Times: 1,
		Api: "http://apis.baidu.com/apistore/weatherservice/cityname?cityname=东莞",
		setRequestHeader: {
			apikey: '1234567890',
		},
		Func: function(docum) {
			if (!docum) return;
			var doc;
			try {
				doc = JSON.parse(docum);
			} catch (ex) {
				return;
			}
			if (!doc || doc.errNum != 0 || doc.errMsg != "success") return;
			var data = doc.retData;
			//var world = "城市：" + data.city + "\n" + "城市拼音：" + data.pinyin + "\n" + "城市编码：" + data.citycode + "\n" + "日期：" + data.date + "\n" + "发布时间：" + data.time + "\n" + "邮编：" + data.postCode + "\n" + "经度：" + data.longitude + "\n" + "维度：" + data.latitude + "\n" + "海拔：" + data.altitude + "\n" + "天气情况：" + data.weather + "\n" + "气温：" + data.temp + "\n" + "最低气温：" + data.l_tmp + "\n" + "最高气温：" + data.h_tmp + "\n" + "风向：" + data.WD + "\n" + "风力：" + data.WS + "\n" + "日出时间：" + data.sunrise + "\n" + "日落时间：" + data.sunset;
			var world = data.city + "[" + data.postCode + "]\n" + data.weather + "\n" + data.temp + "℃(" + data.l_tmp + "℃~" + data.h_tmp + "℃)";
			return world || null;
		}
	},
	//网站SEO信息
	{
		Enable: false,
		method: 'GET',
		timeout: 2000, //延迟时间 单位毫秒
		Api: "http://seo.chinaz.com/?q=%HOST%",
		Func: function(docum) {
			if (docum) {
				if (docum.indexOf("正在请求数据请稍候"))
					return "正在请求数据;\n可加大本项延迟时间;\n也可能是chinaz无此站点数据。";
				var doc = docum;
				docum = docum.substring(docum.indexOf("baiduapp/"));
				var quanzhong = docum.substring(9, docum.indexOf(".gif"));

				docum = docum.substring(docum.indexOf("Rank_"));
				var Rank = docum.substring(5, docum.indexOf(".gif"));

				docum = docum.substring(docum.indexOf("blue>"));
				var sameip = docum.substring(5, docum.indexOf("<"));

				docum = docum.substring(docum.indexOf("域名年龄"));
				docum = docum.substring(docum.indexOf("blue>"));
				var domainage = docum.substring(5, docum.indexOf("<"));

				docum = docum.substring(docum.indexOf("创建于"));
				docum = docum.substring(docum.indexOf("blue>"));
				var start = docum.substring(5, docum.indexOf("<"));

				docum = docum.substring(docum.indexOf("过期时间为"));
				docum = docum.substring(docum.indexOf("blue>"));
				var lastage = docum.substring(5, docum.indexOf("<"));

				docum = docum.substring(docum.indexOf("备案号"));
				docum = docum.substring(docum.indexOf("</font>"));
				var beianhao = docum.substring(7, docum.indexOf("&nbsp;&nbsp;"));

				docum = docum.substring(docum.indexOf("性质"));
				docum = docum.substring(docum.indexOf("</font>"));
				var xingzhi = docum.substring(7, docum.indexOf("&nbsp;&nbsp;"));

				docum = docum.substring(docum.indexOf("名称"));
				docum = docum.substring(docum.indexOf("</font>"));
				var mingchen = docum.substring(7, docum.indexOf("&nbsp;&nbsp;"));

				docum = docum.substring(docum.indexOf("审核时间"));
				docum = docum.substring(docum.indexOf("</font>"));
				var shenhe = docum.substring(7, docum.indexOf("</td>"));

				docum = docum.substring(docum.indexOf("百度流量预计"));
				docum = docum.substring(docum.indexOf('_blank">'));
				var liuliang = docum.substring(8, docum.indexOf("</a>"));

				docum = docum.substring(docum.indexOf('库">'));
				var keydb = docum.substring(3, docum.indexOf("</a>"));

				docum = docum.substring(docum.indexOf('标题（Title）'));
				docum = docum.substring(docum.indexOf('red">'));
				var TitleN = docum.substring(5, docum.indexOf("</font>"));
				docum = docum.substring(docum.indexOf('10px;">'));
				var Title = docum.substring(7, docum.indexOf("</td>"));

				docum = docum.substring(docum.indexOf('red">'));
				var KeyWordsN = docum.substring(5, docum.indexOf("</font>"));
				docum = docum.substring(docum.indexOf('10px;">'));
				var KeyWords = docum.substring(7, docum.indexOf("</td>"));

				docum = docum.substring(docum.indexOf('red">'));
				var DescriptionN = docum.substring(5, docum.indexOf("</font>"));
				docum = docum.substring(docum.indexOf('10px;">'));
				var Description = docum.substring(7, docum.indexOf("</td>"));

				docum = docum.substring(docum.indexOf("30px"));

				docum = docum.substring(docum.indexOf('blue">'));
				var yasuo = docum.substring(6, docum.indexOf("</font>"));

				docum = docum.substring(docum.indexOf('原网页大小'));
				docum = docum.substring(docum.indexOf('blue">'));
				var yuanshi = docum.substring(6, docum.indexOf("</font>"));

				docum = docum.substring(docum.indexOf('压缩后大小'));
				docum = docum.substring(docum.indexOf('blue">'));
				var yasuohou = docum.substring(6, docum.indexOf("</font>"));

				docum = docum.substring(docum.indexOf('压缩比'));
				docum = docum.substring(docum.indexOf('blue">'));
				var yasuobi = docum.substring(6, docum.indexOf("</font>"));

				var info, infos;
				if (quanzhong && quanzhong.length < 3)
					info = "百度权重：" + quanzhong;
				if (Rank && Rank.length < 3)
					info = info + '  ||  ' + "GoogleRank：" + Rank;
				if (sameip && sameip.length < 6)
					info = info + '\n' + "同IP网站：" + sameip;
				if (sameip == "<!D") info = "暂时无法获取SEO信息 \n请稍后重试";
				if (domainage && domainage.length < 7)
					info = info + '\n' + "域名年龄：" + domainage;
				if (start && start.length == 11)
					info = info + '\n' + "创建于：" + start;
				if (lastage && lastage.length == 11)
					info = info + '\n' + "过期时间为：" + lastage;
				if (beianhao && beianhao.beianhao == 16)
					info = info + '\n' + "备案号：" + beianhao;
				if (xingzhi && xingzhi.length < 20)
					info = info + '\n' + "性质：" + xingzhi;
				if (mingchen && mingchen.length < 50)
					info = info + '\n' + "名称：" + mingchen;
				if (shenhe && shenhe.length == 10)
					info = info + '\n' + "审核时间：" + shenhe;
				if (liuliang && liuliang.length < 10)
					info = info + '\n' + "百度流量预计：" + liuliang;
				if (keydb && keydb.length < 10)
					info = info + '\n' + "关键词库：" + keydb;
				if (yasuo && yasuo.length == 1) {
					if (yuanshi && yuanshi.length < 10)
						info = info + '\n' + "网页大小：" + yuanshi + "KB";
					if (yasuohou && yasuohou.length < 10)
						info = info + '  ||  ' + "压缩后：" + yasuohou + "KB";
					if (yasuobi && yasuobi.length < 8)
						info = info + '  ||  ' + "压缩比：" + yasuobi;
				}
				if (Title) {
					if (TitleN && TitleN.length < 10)
						info = info + '\n' + "标题(" + TitleN + "个)：" + Title;
				} else {
					if (TitleN && TitleN.length < 10)
						info = info + '\n' + "标题：" + TitleN + "个";
				}
				if (KeyWords) {
					if (KeyWordsN && KeyWordsN.length < 10)
						info = info + '\n' + "关键词(" + KeyWordsN + "个)：" + KeyWords;
				} else {
					if (KeyWordsN && KeyWordsN.length < 10)
						info = info + '\n' + "关键词：" + KeyWordsN + "个";
				}
				if (Description) {
					if (DescriptionN && DescriptionN.length < 10)
						info = info + '\n' + "描述(" + DescriptionN + "个)：" + Description;
				} else {
					if (DescriptionN && DescriptionN.length < 10)
						info = info + '\n' + "描述：" + DescriptionN + "个";
				}
				return info; //此处为传回值，为字符串
			} else return null;
		}
	}
];

var Interfaces = [ //网站IP信息查询源
	{
		label: "纯真 查询源", //菜单中显示的文字
		isFlag: false, //是否作为国旗图标的查询源,所有自定义项目中，只能有一个设为true，其余可删除该项或为false,当你没有设定的时候会使用脚本预设
		isJustFlag: false, //是否仅作为国旗图标的查询源,如果有此项，就不会创建此项的菜单，也不会作为信息查询源使用。该项为false的时候可删除或注释掉
		Api: "http://www.cz88.net/ip/index.aspx?ip=",
		Func: function(docum) {
			if (docum) { //判断是否有传入值

				var s_local, myip, myAddr;
				var addr_pos = docum.indexOf("AddrMessage");
				s_local = docum.substring(addr_pos + 13);
				s_local = s_local.substring(0, s_local.indexOf("<"));
				s_local = s_local.replace(/ +CZ88.NET ?/g, "");

				var myip_pos = docum.indexOf("cz_ip");
				myip = docum.substring(myip_pos + 7);
				myip = myip.substring(0, myip.indexOf("<"));

				var myAddr_pos = docum.indexOf("cz_addr");
				myAddr = docum.substring(myAddr_pos + 9);
				myAddr = myAddr.substring(0, myAddr.indexOf("<"));


				var obj = {}; //※必须，返回结果必须为object类型，此处为声明。
				if (myip) s_local = s_local + '\n' + '--------------------------------' + '\n' + '我的IP：' + myip; //可以显示自己的IP，可以关闭“查询本地信息”以节省资源
				if (myAddr) s_local = s_local + '\n' + '我的地址：' + myAddr; //加上自己的地址，可以关闭“查询本地信息”以节省资源
				obj.IPAddrInfo = s_local || null; //※必须，此处为返回结果中你需要显示的信息;当前项仅为图标查询源的时候可以非必须。
				//以下两项非必须，在此项目不作为国旗图标查询源的时候可以不用
				obj.CountryCode = null; //此处为返回结果的国家CODE。
				obj.CountryName = null; //此处为返回结果的国家名称【中文，需要lib数据库支持】。

				return obj || null; //返回“null”的时候便使用备用查询源；
			} else return null; //如果没有传入值则返回空
		}
	}, {
		label: "太平洋电脑",
		Api: "http://whois.pconline.com.cn/ip.jsp?ip=",
		Func: function(docum) {
			if (docum) {
				var docum = docum.replace(/\n/ig, "");

				var obj = {};
				obj.IPAddrInfo = docum || null;
				obj.CountryCode = null;
				obj.CountryName = null;
				return obj || null;
			} else return null;
		}
	}, {
		label: "MyIP查询源",
		Api: "http://www.myip.cn/",
		Func: function(docum) {
			if (docum) {
				var myip_addr, myip_flag;
				var addr_pos = docum.indexOf("来自");
				myip_addr = docum.substring(addr_pos + 4);
				myip_addr = myip_addr.substring(0, myip_addr.indexOf("."));
				if (myip_addr.indexOf("&nbsp;") !== -1)
					myip_addr = myip_addr.substring(0, myip_addr.indexOf("&nbsp;"));
				if (myip_addr.indexOf("<") !== -1)
					myip_addr = myip_addr.substring(0, myip_addr.indexOf("<"));
				if (myip_addr.indexOf("\r\n\t\t") !== -1)
					myip_addr = myip_addr.substring(0, myip_addr.indexOf("\r\n\t\t"));

				var obj = {};
				obj.IPAddrInfo = myip_addr || null;
				obj.CountryCode = null;
				obj.CountryName = null;
				return obj || null;
			} else return null;
		}
	}, {
		label: "新浪 查询源",
		Api: "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=",
		Func: function(docum) {
			if (docum) {
				var doc = JSON.parse(docum);
				if (doc.ret == 1) {
					if (doc.isp !== '' || doc.type !== '' || doc.desc !== '')
						var addr = doc.country + doc.province + doc.city + doc.district + '\n' + doc.isp + doc.type + doc.desc;
					else
						var addr = doc.country + doc.province + doc.city + doc.district;

					var obj = {};
					obj.IPAddrInfo = addr || null;
					obj.CountryCode = null;
					obj.CountryName = doc.country || null;
					return obj || null;
				} else return null;
			} else return null;
		}
	}, {
		label: "波士顿大学",
		Api: "http://phyxt8.bu.edu/iptool/qqwry.php?ip=",
		Func: function(docum) {
			if (docum) {
				var s_local = docum;
				s_local = s_local.replace(/ +CZ88.NET ?/g, "");

				var obj = {};
				obj.IPAddrInfo = s_local || null;
				obj.CountryCode = null;
				obj.CountryName = null;
				return obj || null;
			} else return null;

		}
	}, {
		label: "淘宝 查询源",
		isFlag: true,
		Api: "http://ip.taobao.com/service/getIpInfo.php?ip=",
		Func: function(docum) {
			if (docum && JSON.parse(docum).code == 0) {
				var doc = JSON.parse(docum);
				var country_id = doc.data.country_id.toLocaleLowerCase();
				var addr = doc.data.country + doc.data.area;
				if (doc.data.region || doc.data.city || doc.data.county || doc.data.isp)
					addr = addr + '\n' + doc.data.region + doc.data.city + doc.data.county + doc.data.isp;

				var obj = {};
				obj.IPAddrInfo = addr || null;
				obj.CountryCode = country_id || null;
				obj.CountryName = doc.data.country || null;
				return obj || null;
			} else return null;
		}
	}
];