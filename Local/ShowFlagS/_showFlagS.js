
//2015.03.31 18:00 換用Flag，UA切換，ReferChange整合版

/******************************************************************************************
 *这是综合设置，具体下面有解释。
 *******************************************************************************************/
var Perfs = {
	//显示国旗图标位置  预设为identity-box
	showLocationPos: "", //如：urlbar-icons、TabsToolbar、nav-bar-customization-target等等。

	mLeft: "", //marginLeft 预设4xp
	mRight: "", //marginRight 预设2px
	heig: "", //图标高 无预设
	wid: "", //图标宽 无预设

	//毫秒,延迟时间，时间内未取得所选择查询源数据，就使用备用询源,预设3500毫秒。
	Inquiry_Delay: "",

	//旧版国旗图标库，相对路径，Chrome文件夹，脚本内已有预设：chrome\lib\countryflags.js 文件。	
	libIconPath: "local\\ShowFlagS\\countryflags.js", //支持Linux、WIndows格式。

	//本地PNG图标存放文件夹，相对路径，Chrome文件夹，预设： chrome\lib\LocalFlags 文件夹。	
	LocalFlags: "local\\ShowFlagS\\LocalFlags", //支持Linux、WIndows格式。

	//网络图标地址，预设'http://www.razerzone.com/asset/images/icons/flags/'。
	BAK_FLAG_PATH: "", //http://www.1108.hk/images/ext/ 、http://www.myip.cn/images/country_icons/ 等等。

	//等待时国旗图标，预设Firefox内部图标【chrome://branding/content/icon16.png】。
	DEFAULT_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACG0lEQVQ4ja2TwW7aQBRF+ZDku0q/qChds5mxkDG2iY3H9jyTBFAWLAgRG7CwCawQi6BEQhgEFkiAuF3VaVXaSlWvdBazuGfx5r1c7n/H9/1rIvpCAUWS5E6S3FFAkU9+wff967+VP1FA6fPzMwaDAcbjMQaDAabTKSggEFEqpcxfLEvp5huNxnmxWGC73SIMQ9Tv6gjqAbrdLqT0Ub+rg4jOUro/S4QQV57nbZMkwel0wvF4xGazQafTgeu5GY1GA8PhEMITqRDiKhM4jnPTbrdxOBxwOByQJAlcz4UQ4heiKILruXAc52smsGzrpd/v4/X1FcPhEBQQ7Jp9kVarhdlsBsu2Xj4E1u3x/v4eRATLuv0tQT3AdDrFcrmEZd2eMoFZNXdm1cSP2DUbZtUEEYECglk1MRqNkKYp3t/fYZjGPhPohh7rhg7d0PH09IQ4jjGbzdBsNtHr9SBcAd3QMZlMMJ/PEYYhdEOPM0G5Ur7RKhoeHx+xWq2wXq+xXq/x9vaGVqsFraJBq2jQDT17l8vljyFyzq9UVd2qqoooirBarTLCMIRds6GqKgzTgOPUoKpqyjn/+MZcLpdTFCVfKpXOlm1huVwiSRIkSYLFYgGzauLh4QHNZhNaRTsrinJ5GxljeUVRUil99Ho9dLtduJ4LKX0QERRFSTnnny+Wv6dYLF4zxgqMsZhzvuec7xljMWOsUCwW/3xM/5JvTakQArDW8fcAAAAASUVORK5CYII=",

	//未知的国旗图标，预设同上，如不喜欢内置默认，可以再这里修改。
	Unknown_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABwUlEQVQ4jZWRMahScRjFL40REW9ojqaGhoaGprg0eL3//3fkj0pCDrYp2hARmRItjk4ND0EuSFMgSEQIiuMjEjdnwUGIvLdF+bxc/j6ut8X3eM9X7z3P+vE7nPMdw9gRgPdEdCSlPJRS3t+9Xyrbtp8A4FqtFmQyGQbARHRERAXLsg6uNADwMZ1O83q9jpbLZdjtdnW5XPa3Rksi+iqEeA7g5j8NFosFu64bRjuaz+dhu93WhULBB8AAXCll3TTNO6fweDx+qLWOwvACf06TySR0HCdQSjGAt2fjKwA8m83+6zCdTsNWqxXkcjkG4Nq2/ezUgIg+ZbNZ3mw25yDP88JOp6NLpdLJL/4AaAkhnu4+cFyv14MoiiJmjvr9vq5Wq34ikeBt7+8AXpimeevC8+Lx+D0APBgMdK/X08lk8gT6KaV8HYvF7l46nxDiJQD2PC+sVCo+Ef0A8ODK3c/0/5zP5/0gCCKlFBPRu2vD2/6/ms1mMBqNjgGwEOLxtWEhxCMAPBwOjx3H0UT02zCMG/vEf6OU4tVqFRWLRZ+IvuwVn4g+pFIpbjQawXbnV3sZWJZ1IKU8BDAhom+2bd/eh/8LEFU+M9Rx2boAAAAASUVORK5CYII=",

	//本地文件图标，预设同上，如不喜欢内置默认，可以再这里修改。
	File_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAAB3ElEQVQ4jZ3QT2vTcBzH8YGPxpt4EHwmHoc+BRV8ADuu+8MG2w47DJINVkLHWDrFKXpYBtqmttl+JV3/Zk1/SX5pfklq09TCx8O0yLB/0g+8j9/X4bu09GB7ex9fHB8XqSgqVBQVKgj3iaJCj46+0f39r8Wtrezzh3czl0plXxUKLjj/BcuKYNv3MRbDMEKk0wWIonKTSp0+SwSvrmaXVdUGY33Uau64RsODrts4OVFhGH2I4tWPlZXTp4ngfN6C4/RBCEWp1IammSCEQtM6kKQcwnAEyxpCknLft7c/PJkbzuUoGIug6zYIoSiXKSoVB4RQCIICVTVAiAVFMbC7+/nq4ODL47lh141QrbrQdQeVioPbW4ZazYUsl5DJ5JHJqJDlIi4uGtjZ+fQuATxAvd5FtcrGNZscphnANAO02wE4j1Euc6ytya/nhj0vQqvlodHo/pM7rl53Yds9XF93k8IDGIaPVov/t2aTg7H+InCMdjvE3V0wMdeNksOcx+h0Qpjm5LrdwWKwZfVA6eQ8L4amLQDb9s+pcZ4QzucpfH8Ix+lPzfeHSV7x/mWhwBAEIzAWTy0IRiAkwMbG+duZ8OZmdjmdLoaHh5ehIFz2ZiVJWri+fvbmz/mjv85vk5TTd5np7HoAAAAASUVORK5CYII=",

	//Base64图标，预设同上，如不喜欢内置默认，可以再这里修改。
	Base64_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAYAAACgu+4kAAABC0lEQVQokZXTTSvEcRDA8Q/ZcvBQLlIeXoCDUl6Aq4tQzm7egHZtCoUk70EOXEjC3UEuDk4uHo8ODkIu2l27Djubv4e1a2qa38PMd2b6zQ92kUPpn5rHjlhcYREZpDETtpouRExO0JZ8SgN61JbliFVCNnExjhtM1ABkfwN04CTOztGdCGiN6v4ETOMZ63gI24ghHGOsGmAWnbjAAVqwgscI2g+/S/RXA6Qj+3A4dOEsKnkK4DWO0Kb8YiV4xyZusYFUosxRvGIbzZjEC+YxVwEUIsM9Bn2VFEbQF/smrEZrp5FcIUhr6pN2HKJYAeSjtwFM+Tl1mW+axlYkzlOe5yx6cae+f1DEG/Y+AKR8auXF6Pi+AAAAAElFTkSuQmCC",

	//LocalHOST【127.0.0.1】【::1】，预设同上，如不喜欢内置默认，可以再这里修改。
	LocahHost_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAABNklEQVQ4ja2UwUpCQRSGPwx9gyAfooVLF0GLXiFo5QsUlkHcUgjcCZVEqIueQGjlIqwWbXqAom2IVJu2Bobg4raYM93D8ard7IeBuf/85xtm7szApA6BUNq6eGfKC4GdmLq5CqS4It+nBurbdlJwFahL/0SBRkB7EfhKDDQENsU/WgRul79lxv8Er8+BepVNrvgf0Gnw/bjQeUKolz6eE/ALNTBMAPU6AMaKUQLYMzM2VMESkAHSBpQWP6W8O8PhWDpj4AuoqfAl0AeegWXxckBP/EBlO8BAgzNAAcgDL0BLhW/UpFnx1lRxU2UfgGtgg+jM/+jNgDsC+CS6OKvAI/AE7BrwrQV6vf4CPE0zwe9E7wTAlYAHuC2bpXvcD4xVH7fEAHc+e0T7WcNd5YppZcl+AF0P+gbk74HicL4aGwAAAABJRU5ErkJggg==",

	//局域网【192.168.xxx.xxx】【169.254.xxx.xxx】，预设同上，如不喜欢内置默认，可以再这里修改。
	LAN_Flag: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAQCAYAAAAS7Y8mAAABLklEQVQ4jeXUO0vcURAF8F8pxDqdAdFCZLUQ/ARiZ6f4AjWua2dhq4IaNEWKgNjFSi3ED2AhmEKxUXw3PrBQQwQbI6SSiJhiR1nwv6uwlXhguJc5cw4zl3svhTGIM1ziV8RvXGD4BW1BfMFDnvhejPEo7hJM7/HtfRlPJpg+xlQxxhlsYEv2dpxjG5sYKMb4Az6hHEMYQSXKUPpakxI0II0efEYnmtGCH5hBW+Q6curSaIxGnuGj7LmNoxt96A9RGnOYj1xvrBl0YQzTMd0TqlGLJsyiHTWoQkXs6zCBr6iPXGXUpNAa2pbgUrCCfRzhCofYwWJMsIZd2Wd8gT2sR4cLUXsY2pMc3h/J1+kUP/EvgbvHKo7zaG/JfipJ5AGWcJPA/cVydJekvX57xv8BD7eoP535NRkAAAAASUVORK5CYII=",

	//默认UA图标，预设同上，如不喜欢内置默认，可以再这里修改。
	DEFAULT_UA: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACKklEQVQ4jbWPT4gSURzHXzqDzr6ZgefD+fd0YJynjI62ghhqZApLdCnwkpAn87CXvO4SHTqKhw4JIl5aloiCIBChBTstHj10CXYpIRbSdXGLWDoG0ynZFSNY6Ae/y+/zPl++D4D/OBAAsHZZmfA8/7Lb7bKXskVRfCVJ0kQUxTbLsrssyz53uVxbAAD7n7IgCHcJIXPLsj7puj4lhEw0TZv6/f5TnuePGIZ5vFJkGOYGQui6JEm7lNJJPB4/jEaji7Us6yAUCn3GGJ95vd4ny74LQrgXDoergUBgn1I6Nk1zbJrmhFI6MQxjaprmOBKJ/AmZQAivLmxN03SE0FE2m70dCoXeKoryw7btj9Vq9VG9Xt8sl8sN27ZHuq6PDcM4VFX1FCG0tQgwDGMdY/w1nU7ngsHgu42NjdedTufa+Yq5XG5bVdUTXdcPFUU5lmW5tYCFQoH6fL4TVVU3W63WuuM4zPIfIYQNjPE3VVUP/H7/jBDydAF3dna8iqKMeJ7fd7vd95ZlSmkgkUi8CYfDQ4TQGCE0tyzr4YVHmUxmm+O4nyzLfgcA3D/P2u02P5/PBULIC0EQjjHGXyqVSuJCwHA4RJFI5D1CaFwoFBqWZeGlIh6O40Yej+csmUy2l1sCAADo9/t6Pp/fLZVKNx3HubKEH7jd7l+xWGyv1+vJKwMAAMBxHK7ZbGrnTi4I4S1Zlj8Ui8Vns9lM+qu8alKp1FqtVrszGAySq/hvbPGRIDMl+58AAAAASUVORK5CYII=",
};
/******************************************************************************************
 *这里是图标弹出TIP文字的自定义设置：
 *******************************************************************************************/
var TipShow = {
	tipArrHost: "网站域名：", //这里显示 域名
	tipArrIP: "网站IP：", //这里显示 IP
	tipArrSep0: "", //这里显示 分割线，留空就没有
	/*这里会显示 服务器信息	ServerInfo*/
	tipArrSep1: "", //这里显示 分割线，留空就没有
	/*这里会显示 网站IP信息*/
	tipArrSep2: "--------------------------------", //这里显示 分割线，留空就没有
	/*这里会显示 我的信息	MyInfo*/
	tipArrSep3: "--------------------------------", //这里显示 分割线，留空就没有
	/*这里会显示 网站SEO信息	SeoInfo*/
	tipArrSep4: "--------------------------------", //这里显示 分割线，留空就没有
	tipArrThanks: "Thx&From：", //这里显示 感谢：xxxxx 来自xxxx
};
/******************************************************************************************
 *这里是设置文字显示的，可以自定义多个，可以根据需要截取，只支持函数操作。
 *******************************************************************************************/
var ServerInfo = [{
	label: "服务器：",
	words: "Server"
}, {
	label: "网站编码：", //项目名
	words: "Content-Type", //http头信息关键字
	//截取或替换的函数，返回的是null就是在没有结果的时候自动隐藏该项
	regx: function(word) {
		if (word && word.match("=")) {
			word = word.substring(word.indexOf("charset="));
			word = word.substring(8, word.lenght).toUpperCase();
			//word = word.replace(/text\/html;| |charset=/ig, "").toUpperCase();
			return word;
		} else return null;
	}
}, {
	label: "网站程序：",
	words: "X-Generator"
}, {
	label: "网站语言：",
	words: "X-Powered-By"
}];
/******************************************************************************************
 *这里是UA自动切换规则列表 。
 *******************************************************************************************/
var UASites = [
//2015.03.31 11:00 新增115Browser
//2015.01.15 FX35下工行不支持10.0，新增20.0UA
//2014.12.11 調整圖標
{url : "https?://(?:mybank|mybank1?|b2c1)\\.icbc\\.com\\.cn/",label : "Firefox20.0"},//工商銀行
{url : "https?://(.*?)n\\.baidu\\.com/",label : "BaiduYunGuanJia"},//百度云
{url : "^http://115.com",label : "115Browser"},
{url : "http:\/\/vod\.kankan\.com/",label : "Safari - Mac"}, //直接可以看kankan视频，无需高清组件
{url : "http:\/\/wap\.*",label : "UCBrowser"}, //WAP用UC浏览器
{url : "http:\/\/browser\.qq\.com\/*",label : "Chrome - Win7"}, 
{url : "http://www\\.google\\.co\\.jp\\m/",label : "iPhone"},
{url : "http://wapp\\.baidu\\.com/",label : "iPhone"},
{url : "http://wappass\\.baidu\\.com/",label : "iPhone"},
{url : "http://wapbaike\\.baidu\\.com/",label : "iPhone"},
{url : "http://weibo\\.cn/",label : "iPhone"},
{url : "http://m\\.hao123\\.com/",label : "iPhone"},
{url : "http://m\\.mail\\.163\\.com/",label : "iPhone"},
{url : "http://w\\.mail\\.qq\\.com//",label : "iPhone"},
{url : "http:\/\/m\\.qzone\\.com/",label : "iPhone"},
{url : "http://wap\\.58\\.com/",label : "iPhone"},
{url : "http://i\\.jandan\\.net/",label : "iPhone"},
{url : "http://www\\.tianya\\.com\\m/",label : "iPhone"},
{url : "http://m\\.xianguo\\.com\\wap/",label : "iPhone"},
{url : "http:\/\/ti\\.3g\\.qq\\.com/",label : "iPhone"},
{url : "http:\/\/[a-zA-Z0-9]*\\.z\\.qq\\.com/",label : "iPhone"},

];
/******************************************************************************************
 *RefererChange，破解反外链
 *@NORMAL：不改变referer
 *@FORGE：发送根站点referer
 *@ORIGINAL：发送打开站点referer
 *@BLOCK : 发送空referer
 *******************************************************************************************/
var RefererChange = {
//2015.01.23 09:00 新增ft.com
//2015.01.18 08:00 新增economist.com
//2015.01.15 新增wsj.com
//2014.12.16 增加poco
//2014.11.25 增加chiphell,niunews
//2014.11.09 增加pconline和postimg
    //自定义
    'bimg.126.net': '@FORGE',
    'tankr.net': '@FORGE',
    '51cto.com': '@FORGE',
    'ft.com': 'https://www.google.com/',//免登陆或订阅看全文
    'economist.com': 'https://www.google.com/',//突破每週3篇限制 
    'wsj.com': 'https://www.google.com/',//免登陆或订阅看全文
    'pconline.com.cn': '@FORGE',
    'postimg.org': '@FORGE',
    'chiphell.com': '@FORGE',
    'niunews.cn': '@FORGE',
    'poco.cn': '@FORGE',
    'jump.bdimg.com': '@NORMAL',
    'img.liufen.com': 'http://www.liufen.com.cn/',
    't4.mangafiles.com' : 'http://www.imanhua.com/',
    't5.mangafiles.com' : 'http://www.imanhua.com/',
    'laibafile.cn' : 'http://www.tianya.cn/',
    'tmoke.com': '@BLOCK',
    '51img1.com' : '@FORGE',
    'zol-img.com.cn' : '@FORGE',
    
    // 
    'douban.com': 'http://www.douban.com',
    'yyets.com': 'http://www.yyets.com/',
    'img.cnbeta.com': '@FORGE',
     
    // baidu 相关网站
    'hiphotos.baidu.com': '@FORGE',
    'hiphotos.bdimg.com' : '@FORGE',
    'imgsrc.baidu.com': '@FORGE',
    'baidu-img.cn': 'http://www.baidu.com/',

    // sina
    'photo.sina.com.cn': '@BLOCK',
    'sinaimg.cn': 'http://blog.sina.com.cn/',
 
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
    'qlogo.cn': '@BLOCK',
    'qpic.cn': '@BLOCK',
    'fmn.rrfmn.com': '@BLOCK',
    'postimage.org': '@FORGE',
 
    'bdstatic.com': 'http://tieba.baidu.com/',
    'space.wenxuecity.com': 'http://bbs.wenxuecity.com/',
    'www.autoimg.cn': 'http://club.autohome.com.cn/',
    'kkkmh.com': 'http://www.kkkmh.com/',
    'nonie.1ting.com': 'http://www.1ting.com/',
    'img.knb.im': 'http://www.kenengba.com/',
    'tianya.cn': 'http://bbs.tianya.cn/',
    'xici.net': 'http://www.xici.net/',
    'media.chinagate.com': 'http://www.wenxuecity.com/',
    'jdstatic.tankr.net': 'http://jandan.net/',
    'sankakustatic.com': 'http://chan.sankakucomplex.com/',
};
/******************************************************************************************
child:[  ]内为当前菜单的下级菜单配置；
text 为运行参数，如果无需参数，直接删除text属性，目前只支持 %u 为当前网页完整地址；
exec 为打开路径，可以是任意文件和文件夹，支持相对路径，相对于配置文件；
除了以上属性外，可以自定义添加其他属性，如果快捷键accesskey等
=======================
{}, 为分隔条 
=======================
如果设置了id属性，会尝试获取此id并移动，如果在浏览器中没有找到此id，则创建此ID
=======================
自带命令函数：【showFlagS.command】-----形式类型：
1、是非常简单的POST,如：
showFlagS.command('Post'（类型声明）, this.tooltipText（提交的URL）, aPostData（提交的数据）); 就这么简单，其他东西一概没有。
--------------
2、通用的GET，默认就是这个了，不用声明类型，最终结果为，新标签打开  url+参数  形式的网页。
showFlagS.command("网址", "参数1", "参数2", "参数3", "参数4", "参数5"，"参数6")
网址可以是：tooltipText(编辑项的tooltiptext,方便查看)，可以是查询API或网址；
网址也可以使用以下参数,参数有（当前网页的）:
ip：IP地址；
host：域名；
basedomain：主域名；
url：完整地址；
-----------------
3、功能相对比较强大的动作模拟（感谢FlagFox!!），可以参考与FlagFox,
不过FlagFox有个缺点只能识别提交按钮的ID，本脚本增加识别按钮class类名，使用方法如下：
showFlagS.command('Action','http://ping.chinaz.com/', 'host', 'IP', null,'but')
			    	Action：	声明类型，如果要使用模拟提交功能必须先使用Action声明；
'http://ping.chinaz.com/'： 	目标网址，推荐写在tooltipText，用this.tooltipText代表，方便使用的时候查看
					 host： 	打开目标网页时填写你输入数据位置的ID，
					   IP： 	这个是你需要输入的数据，内置IP，host,basedomain,url，具体代表请参考第二条。
					 null： 	点击使你输入的数据生效或提交按钮的ID，遇到奇葩网站提交按钮没有ID的话可以填写null，用下面一条解决
					  but: 		点击使你输入的数据生效或提交按钮的类名（class）
-----------------
还有一些其他的，比如编辑文件
showFlagS.command("Edit", "文件路径，支持相对路径")
showFlagS.command("Copy", "函数或者字符串")
*******************************************************************************************/
var Menus = [{
	label: "地址IP",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAt0lEQVQ4jcXTsWoCQRSF4Q8SsNEitUnhM6RQUtjb+xixTRHIG+SFks7GVxBksbBPGVjWQpsjSNhdXUjIhb+4c5l/mMMMv1g93IfeWf8Qhhi0CcYowmMosAtbfGCO2zrBFGV4CiUOP/iK5GrBHu94wTqSz7rrNAnKzOAtgm0yuUpQ4RkzLCNY4a5LBlU4ZG3RJYOT4BsbvKLfRVDlxAlGuKnb3CY4D7G1/l/Q9JSLzC5W02c69X9TR6H4UVapsaP+AAAAAElFTkSuQmCC",
	child: [{
		label: "PingIP(aizhan)",
		tooltiptext: 'http://ping.aizhan.com/',
		oncommand: "showFlagS.command('Action',this.tooltipText, 'site','host', null,'btn02')",
		image: "http://www.aizhan.com/favicon.ico"
	}, {
		label: "PingIP(17ce)",
		tooltiptext: 'http://www.17ce.com/site/ping',
		oncommand: "showFlagS.command('Action',this.tooltipText, 'url','host', 'su')",
		image: "http://www.17ce.com/smedia/images/favicon.ico"
	}, {
		label: "PingIP(chinaz)",
		tooltiptext: 'http://ping.chinaz.com/',
		image: "http://seo.chinaz.com/Chinaz.ico",
		//oncommand: "showFlagS.command('Action',this.tooltipText, 'host', 'host', null,'but')",
		oncommand: function() {
			var aPostData = "host=" + content.window.document.location.host + "&alllinetype=全选&linetype=电信&linetype=多线&linetype=联通&linetype=移动&linetype=海外";
			showFlagS.command('Post', this.tooltipText, aPostData);
		}
	}, {
		label: "PingIP(CA)",
		tooltiptext: 'http://cloudmonitor.ca.com/zh_cn/ping.php?varghost=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://cloudmonitor.ca.com/assets/flavors/img/ca/favicon.png"
	}, {
		label: "IP地图位置",
		tooltiptext: 'http://www.264.cn/ip/',
		oncommand: 'showFlagS.command(this.tooltipText, "ip",".html");',
		image: "http://www.264.cn/favicon.ico"
	}, {
		label: "路由跟踪",
		tooltiptext: 'http://www.domaintools.com/research/traceroute/?query=',
		oncommand: 'showFlagS.command(this.tooltipText, "ip","&search=traceroute");',
		image: "http://whois.domaintools.com/favicon.png"
	}, {}, {
		label: "旁站(aizhan)",
		tooltiptext: 'http://dns.aizhan.com/?q=',
		oncommand: 'showFlagS.command(this.tooltipText, "ip");',
		image: "http://www.aizhan.com/favicon.ico"
	}, {
		label: "旁站(264.cn)",
		tooltiptext: 'http://www.264.cn/sameip/',
		oncommand: 'showFlagS.command(this.tooltipText, "ip",".html");',
		image: "http://www.264.cn/favicon.ico"
	}, {
		label: "旁站(114best)",
		tooltiptext: 'http://www.114best.com/ip/114.aspx?w=',
		oncommand: 'showFlagS.command(this.tooltipText, "ip");',
		image: "http://www.114best.com/favicon.ico"
	}, {
		label: "旁站(Bing)",
		tooltiptext: 'http://cn.bing.com/search?q=ip:',
		oncommand: 'showFlagS.command(this.tooltipText, "ip");',
		image: "http://cn.bing.com/s/a/bing_p.ico"
	}]
}, {
	label: "域名DNS",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABiElEQVQ4jXXTzUtVURQF8J+F9ugPKBTFbBAUNCl4GmE5LJI+Jn1IUP9Ck3DarEEIJVj2SKwg6AO0aNAgfZHRP1CaFVEPykGDnNekwd4XrpfngsvhHM7ae5291mUjunAMT9DCen4tPMMJbLMJdmISn/EQl3AEw7iIGaxiCt3tyPNYSsLWPO9Ff64HMIomXqKnIHdm5yUMVApfxzd8SGULGMv1dvGc4/iUcqu4id84j30pv5lKVnASHuNBSXYZk3iEjtzvzWZ13MUc/MDlNmS4hffYkfvT2XkgVf2EPxjJCzWcwg1cEXb+wxvM4guu5d3DwmLrOJqH4/iast/ir3Dnaqo5i+3VAi3hcx8+pjQp+x3ubPK8C8UTnuIeDooB7S9duo/pNuQtaOA5Ec8VYc2CsGqPGNha7qsYzGZniPxPYVGEpCkiu4zvmKiQe/E6FdSKw24Rz8VUVBdW7caukux6qnyVhTagR8RzVYTkHA5hSAy2IeLcaEcuUBPxnBcTLn7nX3iRc6mVCf8BM0VdfnCTBIgAAAAASUVORK5CYII=",
	child: [{
		label: "综合查询",
		tooltiptext: 'http://seo.chinaz.com/?q=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://seo.chinaz.com/Chinaz.ico"
	}, {
		label: "网站备案",
		tooltiptext: 'http://icp.aizhan.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "http://www.aizhan.com/favicon.ico"
	}, {}, {
		label: "Whois(Shosts)",
		tooltiptext: 'https://www.sugarhosts.com/members/whois.php?domain=',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "http://www.sugarhosts.com/templates/sh_christmas2009/favicon.ico"
	}, {
		label: "Whois(cndns)",
		tooltiptext: 'http://who.cndns.com/?d=',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "http://www.cndns.com/favicon.ico"
	}, {
		label: "Whois(aizhan)",
		tooltiptext: 'http://whois.aizhan.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://www.aizhan.com/favicon.ico"
	}, {
		label: "Whois(ChinaZ)",
		tooltiptext: 'http://whois.chinaz.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "http://whois.chinaz.com/Images/Chinaz.ico"
	}, {
		label: "Whois(Dtools)",
		tooltiptext: 'http://whois.domaintools.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "http://whois.domaintools.com/favicon.png"
	}, {
		label: "Whois(dnsw)",
		tooltiptext: 'http://dnsw.info/',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "http://dnsw.info/favicon.ico"
	}, {
		label: "DNS健康",
		tooltiptext: 'http://www.intodns.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain");',
		image: "http://www.intodns.com/static/images/favicon.ico"
	}, {
		label: "黑名单",
		tooltiptext: 'http://rbls.org/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://rbls.org/favicon.ico"
	}]
}, {
	label: "网站安全",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABd0lEQVQ4jYWTMUtcURSEj4u2YmGZSh5rsdzzfU3+gq0QLISFhFhom3R2lkLSpA4Ee22sJIaYNkIC1kkpaiF2wUZhk+a95bk+NxemOjNzhsPciI5XSlkCdtUr9QrYLaUsdXEfPHUhM9eBU/VO/VvjDjjNzHV14ZEwM5eBDfUQ+NMSPkA9OwQ2MnO50ffU/YmNXeJRO5G6HxG9iIgecNwifs3Ml8CLBuoQeAuctHjHjcEMsNcMMvNVk6whZOazwWDwHHjdMtiLiJnmBjvAqI75Rv2i/mzhB/C5TjECRpm50z7imnpfD7fV6447XAPb9ZL7zFwbGwAD4KKONtWg5lwAg7FBVVXz6kF9g3fACfB9At/U97XZQVVV85MlGqq3wK/M/Kh+aAP4pP5Wb9XhozL1+/1F9WhaF2oc9fv9xc4qAyvq5RTxJbDy5F+IiFlgS73pEN8AWxExO80gImJO3QTOW6U5VzcjYu5/4nGSUsoqcAaclVJWn9r8D9Ly4rUXRHEbAAAAAElFTkSuQmCC",
	child: [{
		label: "WOT",
		tooltiptext: 'https://www.mywot.com/en/scorecard/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "https://www.mywot.com/files/favicon.ico"
	}, {
		label: "安全扫描",
		tooltiptext: 'https://www.virustotal.com/#url',
		oncommand: "showFlagS.command('Action',this.tooltipText, 'url', content.window.document.location.host, 'btn-scan-url')",
		image: "https://www.virustotal.com/static/img/favicon.ico"
	}, {
		label: "安全评估",
		tooltiptext: 'https://www.siteadvisor.com/sites/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "https://www.siteadvisor.com/favicon.ico"
	}, {
		label: "钓鱼分析",
		tooltiptext: 'http://toolbar.netcraft.com/site_report?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://toolbar.netcraft.com/favicon.ico"
	}, {
		label: "安全查询",
		tooltiptext: 'http://webscan.360.cn/index/checkwebsite?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://www.360.cn/favicon.ico"
	}]
}, {
	label: "站点搜索",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAABHklEQVQokZ3TPyjFURwF8I8/r5fyUhZRUoqJ/Q0Gg0lGZbJgsxmUiSR5+TOIkWJQBhkUFvUGGZVRBsmCPMJkUIZ7vbxfnidn/J57zj3f+/1efkYKAzhAAR94wylGUF9GRyTn8IBzrGAi1vJ4wjZafhLXYgavmEVTgs9gDPfYQUPSIItHLMY2ymE0XjKeJHK4QfsvYkKbeaHFIlI4wmGF27+wgPfvhTROsI/qPxhMC9MpogobuEBjBXENdnGbJAaFeQ9XMMgKk1hNEhns4Rp9ZcRdOItJO5Ox6tCGY9xhORp1owdTuMIler+LU8K2bQnL0Yz5eLgQ4xaEnjejYRFpTOIFa0r3vDUmGEI/OoRtLUEOz1hS4ZOUw7rwmv8SfwIjnjkY6akXagAAAABJRU5ErkJggg==",
	child: [{
		label: "维基域名",
		tooltiptext: 'http://zh.wikipedia.org/wiki/Special:Search?search=',
		oncommand: 'showFlagS.command(this.tooltipText, "host","&go=Go&variant=zh-cn");',
		image: "http://bits.wikimedia.org/favicon/wikipedia.ico"
	}, {}, {
		label: "类似网站",
		tooltiptext: 'https://www.xmarks.com/site/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://www.xmarks.com/favicon.ico"
	}, {
		label: "类似网站",
		tooltiptext: 'http://www.similarsitesearch.com/cn/site/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://www.similarsitesearch.com/favicon.ico"
	}, {
		label: "相似页面",
		tooltiptext: 'http://www.google.com/search?q=related:',
		oncommand: 'showFlagS.command(this.tooltipText, "url");'
	}, {
		label: "反向链接",
		tooltiptext: 'http://www.google.com/search?q=link:',
		oncommand: 'showFlagS.command(this.tooltipText, "host");'
	}, {
		label: "反向链接2",
		tooltiptext: 'http://www.google.co.jp/search?q=link:',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain","+-site:","basedomain");'
	}, {
		label: "内部链接",
		tooltiptext: 'http://www.google.co.jp/search?q=link:',
		oncommand: 'showFlagS.command(this.tooltipText, "basedomain","+site:","basedomain");'
	}, {
		label: "Email搜索",
		tooltiptext: 'http://www.google.co.jp/search?q="*@',
		oncommand: function() {
			showFlagS.command(this.tooltipText, "basedomain", '"');
		}
	}]
}, {
	label: "开发审查",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGElEQVQ4jb3TOy/DURgG8F9dKjGowcRADUIwdHLpRCJG9RXEamBAY7H6AMQn0NnOQInbiJFJ7EYJYejbtP2njTB4kic5570973nPOfwD0ugPpn+bPIsSLoKlsLVEB/LYwh7uUMR4sIjbVkXasREB+zjEKlKJuG0coTNZII8bTMc+hba6dbXQJM5VZtKAnVBuhiWsheooHrBYdXZhJYy7YRvDQKwLeMUbFtCNTVxhDtZxGYF9yOERxyozeMEnDtBb11URJ0K5UOfIhe0L7/iIo/UkjjWBJ3jGSMI5hftQbpbcUCDZQRXT0WamiY/KdZ5Sm8EyhpENDmIomK1j9UFdY57aLZygjLMfWFZ50jPJljIJ1Vb806dqiW9kvzxuhp8KgQAAAABJRU5ErkJggg==",
	child: [{
		label: "BuiltWith",
		tooltiptext: 'http://builtwith.com/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://builtwith.com/favicon.ico"
	}, {
		label: "W3C Validator",
		tooltiptext: 'http://validator.w3.org/check?uri=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://www.w3.org/2008/site/images/favicon.ico"
	}, {
		label: "W3C CSS Validator",
		tooltiptext: 'http://jigsaw.w3.org/css-validator/validator?uri=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://jigsaw.w3.org/favicon.ico"
	}, {
		label: "Validate.nu",
		tooltiptext: 'http://validator.w3.org/nu/?doc=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://www.w3.org/2008/site/images/favicon.ico"
	}, {
		label: "WAVE a11y 检查",
		tooltiptext: 'http://wave.webaim.org/report#/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://wave.webaim.org/favicon.ico?v=1395952834"
	}, {
		label: "SSL 服务器测试",
		tooltiptext: 'https://www.ssllabs.com/ssltest/analyze.html?d=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "https://www.ssllabs.com/favicon.ico"
	}, {
		label: "SSL 检查器",
		tooltiptext: 'https://www.sslshopper.com/ssl-checker.html#hostname=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "https://www.sslshopper.com/favicon.ico"
	}, {
		label: "Header Check",
		tooltiptext: 'https://quixapp.com/headers/?r=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "https://quixapp.com/wp/wp-content/themes/quix-theme/images/favicon.png"
	}, {
		label: "URL 解析器",
		tooltiptext: 'http://urlparser.com/?linkFrom=flagf1&url=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "http://urlparser.com/favicon.ico"
	}, {
		label: "编辑页面",
		tooltiptext: 'http://www.printwhatyoulike.com/print?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "http://www.printwhatyoulike.com/editor/img/favicon.png"
	}]
}, {
	label: "镜像快照",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABSElEQVQ4jc3Tu0tcYRAF8N+GXVhWs+hGAiIi+Fh8gA+wyDZCEPf/MH0KNUXKZUmagNikSGETxEIb7S01uEUaQUQI2gRB7EQIQghrceeCXJSYLlN8MN89Z+6ZM/Pxv8Uz9GAIvcj/C3kYqzjGJX7gK2rI/Y08ie9o4wItnEW+h+4MvoaJNHmOnQCvo4oi+vAWcxnyaKjbDa46brCPF3E5J/EgjZd4jYrEo4Pg1GEl/t4I8Hv8xgYK0f9n/MGnwDSCsyyONprx8R1+RTv5KLCGW3wITDM4SzCPaxyG1BJmQ2oaFbxCOTCt4MxDB7ai4qZkImUMRjsLGROrOMF2cMEYvkWRKxzhp8fHOIORzJ1+fMRpyDvHF0x7wiJBV/S5KDH2jcSL0lPInZLNmpV4MI6pyAceUFBy753kJMtTiULp6AqRFzLkfKgtwh2F4z1a0Vqb4QAAAABJRU5ErkJggg==",
	child: [{
		label: "Google快照",
		tooltiptext: 'https://webcache.googleusercontent.com/search?q=cache:',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "https://webcache.googleusercontent.com/favicon.ico"
	}, {
		label: "Gigablast",
		tooltiptext: 'http://www.gigablast.com/search?q=',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://www.gigablast.com/favicon.ico"
	}, {
		label: "WebArchive",
		tooltiptext: 'http://web.archive.org/web/*/',
		oncommand: 'showFlagS.command(this.tooltipText, "host");',
		image: "http://archive.org/images/glogo.jpg"
	}, {
		label: "Google(限文字)",
		tooltiptext: 'https://webcache.googleusercontent.com/search?strip=1&q=cache:',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "https://webcache.googleusercontent.com/favicon.ico"
	}, {
		label: "Yahoo!快照",
		tooltiptext: 'http://search.yahoo.com/search?p=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "http://search.yahoo.com/favicon.ico"
	}]
}, {
	label: "便捷工具",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAiUlEQVQ4ja2NQQqDQBAE6+v+RyUIQkAQcsjBix/wAX4jl1WGZrY3gTQU3TPbzMKf1AG9QCVfdPHAKAfHZF/rAPAw7t5uTXJ9SrLrMCcQ3HWsnoWmlkLMcXYOwBrc5VX6Tb0K2Rz3vBPim3MANvl5+9Jv7cYjWQeAQw4eJmsXgAE4BcR1N2SHftYHOcZOEltHUS4AAAAASUVORK5CYII=",
	child: [{
	label: "翻译此页",
	tooltiptext: 'http://translate.google.cn/translate?u=',
	oncommand: 'showFlagS.command(this.tooltipText, "url");',
	image: "http://translate.google.cn/favicon.ico"
}, {
	label: "共享密码",
	tooltiptext: 'http://bugmenot.com/view/',
	oncommand: 'showFlagS.command(this.tooltipText, "host");',
	image: "http://bugmenot.com/favicon.ico"
}, {
		label: "视频解析",
		tooltiptext: 'http://www.flvxz.com/?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "http://www.flvxz.com/favicon.ico"
	}, {
	label: "存为PDF",
	tooltiptext: 'http://www.web2pdfconvert.com/engine?curl=',
	oncommand: 'showFlagS.command(this.tooltipText, "url");',
	image: "http://www.web2pdfconvert.com/favicon.ico"
}, {
	label: "整页截图",
	oncommand: function() {
		var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
		canvas.width = content.document.documentElement.scrollWidth;
		canvas.height = content.document.documentElement.scrollHeight;
		var ctx = canvas.getContext("2d");
		ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
		saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);
	},
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAm0lEQVQ4jbWTUQrDIBBEH9QcokjZe+T+ieQaJXiKfvSjIyyJRmzpwHzsuo47qwJMgIlBvIpPMGAFEnAXUyOOLYEEbG7D1oirAsEV3sQoltivdwWO6Ap4C7UWIwMzqBUY8BTtGwvDAmWIBjyAGcjirJypJhwt+HvfdWoGXmJWbgeW0tHPAoHzvQ9Z6KE7xL8LRD5+FxoPqYfL7/wGEBc4QhYRpZIAAAAASUVORK5CYII="
}, {
		label: "天涯脱水",
		tooltiptext: 'http://www.tianyatool.com/cgi-bin/bbs.pl?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "http://www.tianyatool.com/favicon.ico"
	}, {
		label: "TinyUrl",
		tooltiptext: 'http://tinyurl.com/create.php?url=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "http://tinyurl.com/siteresources/images/favicon.ico"
	}, {
		label: "is.gd",
		tooltiptext: 'http://is.gd/api.php?longurl=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "http://is.gd/isgd_favicon.ico"
	}, {
		label: "Goo.gl",
		tooltiptext: 'http://www.ruanyifeng.com/webapp/url_shortener_plugin.php?longUrl=',
		oncommand: 'showFlagS.command(this.tooltipText, "url");',
		image: "http://www.ruanyifeng.com/favicon.ico"
	}]
}];
/******************************************************************************************************************
 *这里是自定义UserAgent设置
 *******************************************************************************************************************/
var UAList = [
{name : "分隔线",},
{name: "IE8 - Win7",//此处文字显示在右键菜单上，中文字符请转换成javascript编码，否则乱码(推荐http://rishida.net/tools/conversion/)
ua: "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
label: "IE8 - Win7",//此处文字显示在状态栏上，如果你设置状态栏不显示图标
image :"data:image/png;base64,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"},

{  
name: "IE6 - XP",
ua: "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
label: "IE6 - XP",
image :"data:image/png;base64,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"},

{name: "分隔线",},

{name: "Chrome - Win7",
ua: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1623.0 Safari/537.36",
label: "Chrome - Win7",
image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEklEQVQ4ja2TfUzUBRzGv/MNj7sOma60tsw1p5tvG0YtyZZbTWjFfAEEvQt3HRcGviAVnRo4sNSJjB3GBJsEh4eeogc2RR0OcucQg3g5gWHE8KQz9DJI7gX58ekPN/+x+qvn7+ezPXv2PCL/t66tnldXGx0VqEhKpMJkwp76CVd1a8c6EyIbb4lM+3fwPU180ZL5yvnMnfx6xk6grYWJ3m7GulwM1l/hevG3XI77UBlYOSflGfjUelWC+fmZNOzNJlhyBH9mGr6P4vElb8C31Ugg/2senz9He0U5JzYl0Rv1Yu5TuKBAVDGGMKXKbKDzrUh6IpcylJfDHwf24T20H29hPg+LLQx9rGc4L5ufjxZje3cV98MkQkREtueH1xkLoznetBjHbC1t29Lx1DoIPrgPgP/3e3guXqD30EFa13xAT1I81elpXI2Y3S4iItHm8ODnNcvJa51Hw6VUblfZ8IxMUHp9nMIGBVuLwkMf4LaDKwfq38BlWY11zSuDIiKyzDiDLxtfJqd5LtV9O3jk9fBVzQg7Tvsx1wTI/iFAqTMIo/3QuRMuv8oD61wOL39hXEREFujCMDtfIvfGQhx9WYwGxok9eIv1FjeJx4bRHx/GUD4MEwp0mKBOy+Oa6TjjpoBdJstiQxjG6llkNc7hZHc6fwYG0ec3EZX1I2/vucmqXBcZlXfhUTd06OCC4LcJzRvlSYKV2zTB9wu1mBzh2FxbuPlbFf2eETbur2eJ6Swplmbuev0wcATadFArDBUIrk/lSQfJu0MvvpbxHHFlajaf1mLtSMV5p4yh0T4A7v3Vw1i/BVp14BA4K3RtFX4xS5GIiGRkiCrCpFHe3KUmtkRFklXDd80plLWY+L7VhLPFADd0YBc4Jbj3Cj/pxYddJj8dU/ruaRsWbdby+hehxBSFsK5URWJ5KPoTatyVk8AqUCkMmIWmBFH698g7z8w5MyskJtKoGV+WpiYqZzqJh6fyTclUgkWCd5/QlSq0GWTQvUuW/ucbdZ+F1K7Yog7UxQvXYoWmOFHak8XTu10O/JP/b0GL++9dNq8KAAAAAElFTkSuQmCC"},

{name: "分隔线",},

//伪装 Opera 10.60
{  name: "Opera",
ua: "Opera/9.80 (Windows NT 6.1; U) Presto/2.6.30 Version/10.60",
label: "Opera",
image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADU0lEQVQ4jW2Te0xTBxTGT2If3Esf9+ptKXBb6i1KW2zVltnqKBbBiWtFnTRZBUGLwwVnhtIAkSAYA1GiW3yGskTjIzJBokTjI2FlgywbooTEaLRGka0jkkHWtLiYLnr2h7lEiN+/33d+f5zzHYA56nPatc+KChvHfduGJ3wlsVdfbZ+e+GbX8PPSLxv7nHbt3PwsBbNt1pdbNgajO0rj0xXlGC4r+felrywaral+N11fGx+r8AUHXLnWjw5ftSwxh1wFg1GvB6MlXhwpyH/UtcxYfEm/yD1QkD8Qq/PjmwP1+MfXOwdvO2zmWcOVCpD86rB3TBa6MbplM44Vut5eNy/x8/5Fg8H1rLQ4Gq+vxde11ThStLmjSQGSGcBZPed+smZ1ZNK1DqcKXfgo3xm5tJjL4/1WRaLqt8/yRmLfVuIbfxWGy8siXSuWunlf2LPUGBjNzcHx/Fx8tW4t3vvUPhHgWBMfqAAgf85Z2T3l24axXeU45SvFYG52wAogBC8Ac9Nk6H+RbcdRx0occzpwIGv5X9+rVDMb9wCI7tgs58aLNuHUVg9ObvXgL87s/goABooJgr2awYUeZy3Hx59Y8InNir0m49h37ILUDwDzbi4zBZ6vz8PwhvUY3vA53rVZQjsJgoVigmAvc5rQkFGPQ5l6fGAy4i19+p/HUlLUPMAJIOjJ1Lc/dNjw6epVGHKuwhtm43uAVyplzqmT+3sXavAnToN9Oi32cGnjbSy7iAfsARBfM+gu/G4x4X2rGYcsZuwy6Pq9UmDACiA8nqwMdKqU2K1SYneyEn9kk/9uU6uzeMARhpF26tJu3c3gsDdDh3cyOPxBq3m/RACAJoZ2n6apSJtMgu2UFNuVC163pbFf8IB2jSbzvCYlfCVVhZ2pKrygVkUOJTEzZ4RKBUiaaVnH4cQEbEkQYauUxJNJyosBjpOfSE8XB9JSG04q6P9OzZfhGYbGo0lMhwc+KBIAwH6aNh+QkoN1IiHWCAXYQIqnW5V0z7Ek5nILJfvnYGICNktJbJkvH9xP07OrzKtaLrfWSIhglVAQ3y2Yh3tEAtwrEuI+kRBrSXG8gZIE6xj5x5+JVxVFaf0ysnFfIjlcSYhjuwlxzC8jh2soSWMVRWnn5v8H1UdFzNmdWS0AAAAASUVORK5CYII="},

{name: "分隔线",},

//伪装 Safari - Mac OS X
{  name: "Safari - Mac",
ua: "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; ja-jp) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
label: "Safari - Mac",
image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADWElEQVQ4jXVTW0ybBRj9zGZMXEh4MY43ZwwaNRpRBMma6EhMjGOTGegykazLplvFQpPBFkkpBWopBRmGFVqxTEvbWQq9rrS0/WsvdL1x35gbc7rJH9mg0DHGMhw5vuHU7Tydh++c5Hw5h+gfPPEQp6Kioh0CobC4Uig8UFFR8RYRbaHHgcPhZEUiEaNOp6vkcrmvXro41jEaDcxEQ76/4hEfYmHfn1PjMTPDMB8/0qCwsPBlm93OhoKh9dnp2HxwJIzWniFIlG40dg9DonRgwMng8sXExuWZSUMJj/fM/0y+PXWq/cbsNCTdFhxti0FtYaF1L8DgXUafOwVxzwwEzSZMTyUxFo949hw6lLEplkqlObNT0bk6lRVfyqLwjNxG//gD9DM3offcgi2chju2CoU5BZ7MikuTcVhMxpObz/O57GomGMKR7guw+G4iWVWLXlUEDd4HsCVWUK+dg9IyB1MgjZo+Fh16F877Xb+/m5u7nUoOHtzuthuvynU+yB0pKBNAlVCLZN5OmBr70HT2GgQ6FjXmBbTYb+FM4C5qzpyH02FGq0z2CVVVV+f4HMb7wp4QPtWkILItotR2D5LdfCx9kAeFwow9mutomViDKrGKRs9d7OscQ4AZRldHez3xjvALGKtu45h6BE/yWTxf+yvkzgW0nLuK1q+7cCd1A+1Dc+jS/4YDBhbblEt4QzaBZNiLb5qbZMTllmebf1AtNhv9IOki6CQLOnEFr7lXUGy+hgF3EncW0sj76gpIyYIcayjWjCJo70e9qLaCiGhbZ5ucCXideP3H6yD1fVB3CsTcBiecxvG+X/B5Zxz28Xk867qHrQNL0A4F8ZPm9Oo7nF1vExHRsS8Ehx36Xnzv8CDLsgIa3ACF1/C0dRkv9C+D1CnkGP7AS5ZFVDouIOqyQCQS2R6u/1NicYPHP2iAbvhnvOedR4Z3DRRcB/nXsSW0gSznEiTDo0i4rWhrkaff//CjN//VxPz8/Odq6+pGBnu/g99hRq8/jmpmEpW+aXQEJsD4GfhMerQ2y+b3lewvfuQmMjMzMz/j8+VSsZhVK2SwaVQY0mqg72yHoqkhLRAI7bkFBbmPXeVmnoyMF3fv3csrKytrKy8vP11auv94dvYrO4lo639v/wYCax87ws5wXwAAAABJRU5ErkJggg=="},

//伪装 iPhone，查询http://www.zytrax.com/tech/web/mobile_ids.html
{  name: "iPhone",
ua: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_2 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7D11 Safari/528.16",
label: "iPhone",
image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADLSURBVCiRddA/C0FRGMfxc4UyGdQNpQzIKzDhFViNZvKn7y5loow3Ay/AaLQpeQUMkkWhjBbFonQM13X9efRM5/l9zjlPj9Lqu4hSJeycfuMUKy5E/wB8TNEM3I4beTHxE+HIiBjBD4BBhSVH1lj0mbDlwJgMhlZKKzw00ULNMG2Q4yzEOxLPL2iL91uvGRiKoOSCjggsFxS5C+BCAY8NYizFN26UnT3URHAi74AAcwE03lZNkg0azZ4F168hnyRNjypxQmTpUsdr9x/STR736IkaIQAAAABJRU5ErkJggg=="},

//伪装 Apple iPad 2
{  name: "Apple iPad 2",
ua: "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
label: "Apple iPad 2",
image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADG0lEQVQ4jW3R708TdxwH8HPGB0fLj0TguN5dCxkLiUSDOrLExDAXf8RHOjKJmTEKrcUftKUdlLrVWQwI18QZ2Nwsa7vatBRaaHtnqdIqFIzgZtzOLtb4wGV/h7lv33uwLIuh7z/glc/7/aGof7Otq6vrF4NeX2rmeaVFEIoCpyt+fuJE0Ts5WbzmdhfdV13FEeeQ4rDbSy6XK+LxeD6g/ks8Ht8ucFyplmHR1L4bDR+1YeeHbdhz8FOM3boN9/gEnNc9sLu/Rb/FAqPR+Nbn8+14D+B1uj+Omy6VZ5Zy6mg0UZ7KyGVvMlWOrq2XpY2NsvT8RTn/8pU65vOXu0+eLG0BdCyrfNl/GbnlHAnML2JubgaR2D3IhSyevVhB/skaXhafk/Hb0/js0KHXWwCWZRXboAOp5QKJLspISmkkMzIyS6tYX/sN+fVNFH4tkQnRi086O7cCDMsqww47Ftb/JDG5gHQijGQ6hmxiBfn5x5BWn2Jh8y8yNjqKXe3tlQBGcdhHUHgYJXImguXlVeTyjyDJElL37yObXMTjWJhc99xAc7OhUgVGGfpqBIn4PJEWQ0iml5B9kMXcXByhcBSZRAKZoJ98/c018DxfeQPLgAW53ApJxFOQ0hLSqRRkWYaUlrCQTCFfeEJs1kFwlQCdTqcY+0y4e9dHfvj+DkKhewgGgwgEAggEgpiZ+Rmz0RgxGk2VL+A4Tunu/gI/3vmJTEyK8Hq9EEUvRFHEpOjFzfEJTE1Nk1OneqDX6ysDhw8fgcvpJDarDVaLBTabFTbbICwWKwasVjiGRsjRI8dgMFQYURAEZW9HBy5ZnaTn9Bn0mi7iXJ8ZvefPwnShD2dO92BooJ907N0HQ6UvcBz/+8cde9SLwdy73uFRdco/q96YDqk3x4dV8TuP6nGcU1dD5nf7Ow+oer3wagvQ0tLyRqvVoJFtAtPEgGEY8IIAXtBjZ0MjGpkGsLpGVFdXo7W19W+z2fw/QFEUpdVqr9TW1vo1VVV+mqbDNE1HampqonV1dRENTUdoWhOuqtL4NRqNv76+3k5R1DaKoqh/AOus3HSfnM0iAAAAAElFTkSuQmCC"},

{name: "iOS/微信浏览器",
ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X)AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B350MicroMessenger/4.5",
label: "iOS-WeChat",
image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAgAAAAIAAAl543UAAADwSURBVCjPtdFNK8MBAMDhZ5vkvV30D62m5fUiB681H0EpB19gpebiS3ARF3dxcOPgZlrIhYMrIVm0MKN5STGZg8+w3/m5/ah6EVNa5NFoxKhmRT+I6JWUUKZoU1hgw7N7L1a1IOVOwZNlpo1hwad53VZ8mxW4dGjQsH72Lepw4UAT4nJ29bm1rwPCRnRp0+bMBx7lxL1aNyZjTrTGPwv5BRUVlC24lLZkgE/bOuXsaUDMtax6EDjyFUZIXsa4Ge1SYnZUTEgI1Hrj3ZawLlklN0rWRCWcyXtwJx0yqeBERaukwJVjH+oM6VF26rz6r/wBo5JJ0SVt+rYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMDQtMDNUMTc6MTg6MDErMDg6MDDSRxDeAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTAyLTI4VDE5OjU0OjU1KzA4OjAwXI2twAAAAE10RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNi44LjgtNyBRMTYgeDg2XzY0IDIwMTQtMDItMjggaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmdZpF9/AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAA1MTKPjVOBAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUxMhx8A9wAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTM2MjA1MjQ5Nd0ggmMAAAATdEVYdFRodW1iOjpTaXplADEyLjdLQkJCclMLAAAAYnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS9mdHAvMTUyMC9lYXN5aWNvbi5jbi9lYXN5aWNvbi5jbi9jZG4taW1nLmVhc3lpY29uLmNuL3BuZy8xMDk3MS8xMDk3MTUwLnBuZ9oIJJMAAAAASUVORK5CYII="},

{name: "分隔线",},

{name: "UCBrowser",
ua: "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; Desktop) AppleWebKit/534.13 (KHTML, like Gecko) UCBrowser/8.9.0.251",
label: "UCBrowser",
image :"http://www.uc.cn/favicon.ico"},

{name: "115Browser",
ua: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36 115Browser/5.1.5",
label : "115Browser",
appVersion: true,
image :"http://www.115.com/favicon.ico"},

{name: "分隔线",},
{name : "BaiduYunGuanJia",
ua : "netdisk;4.4.0.6;PC;PC-Windows;6.2.9200;WindowsBaiduYunGuanJia",
label : "BaiduYunGuanJia",
image : "http://pan.baidu.com/res/static/images/favicon.ico"},

{name: "分隔线",},
// 伪装Firefox20.0
{  name: "Firefox20.0",
ua: "Mozilla/5.0 (Windows NT 6.2; Win64; x64;) Gecko/20100101 Firefox/20.0",
label: "Firefox20.0",
image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADlElEQVQ4jW2TfVDTdQCHv1dd2Da2cMCGbxgshqPmXvhtv7Ht9zZ5VVeC44CBCHdJJ5r4R4BRRp3eefSmeXVUd3qeCUhKBxmYbJIYbMPxolididoVeWd3HSrINpZ8+q/TO5//n+e/h5BHaG4mT93/SasODaW/FvKlHA0Niz2hoRhvyLf6RNiXvnNuUK3t7CRPkyfxoD9Tv/BjwnDowpLF8MUYRHzPIhIQIRIQIexfgn/9MUAgBpELS6+EvAbhcbk7WX+vT353pk8G+GKB4FKE/EkIX0pCdDQJ4RElRjteQN9nqZg5J8PigCQ617067/9AtE8+NHg4GU3bs3C5XYOugzq0f2wEJtWIjqchOqZCsD0NJYUCqt0OXG9TItIrn/q7M0NC5k+r6MXv4tCxNxVGSy4YLg86yoF9dTpcO2NAeMyAhaAOMwPpCB5ZhcoiE7YWc5jtSsT8adVmMtu+sjZ8Uo6GKjNoKw+WZcGwLKxMDpp2sJgdNiPiNyF80YB7vWp8uUcL3pGHX1pXINyxooU8OJZ8eLpViU3redgZDjzPw2rnUOEScLVNj7teGrPnacx7jHh4ToPWBjPYnCJ8sycFkbZlJ8nsF4offm5ZhnUCA44TYDJbYMnMwPf703G/R4fwWQpzZ4yY71mLv46/jB1lVlj4DTiyaw1CXyV6yD+HFP2T7ymQw1vAcgJMZjMoisK+GhOOvkVjd7UDgU9NeNipxshHOjhyN4LPLkDPmy9i5mCil9w+sLz19/flqM5/CbSNB8dxsNsZGIwU8q1aNBWrce2DVPx5SIV3KgzgswvgLt4EX70Cdw4oT5HpZkXdH3vj8XnZcuhNNnAcD5blwLEMGl0anN29EufrU7HVmQWThUGeswg7X9Xjt8Y4TL+b9Am51ajkbjTEw789Di57GtZSVthsNtgZBlZGQM46AYLDAdrKwsoKyM524Gt3Am7Wy3GzPrGCDHDkmald8Zcna+PQVfo8CukUaLQGaI0mUHQWKNqKTIsNmVkMchgzWjYoMPG6DFN18tu/1sbKCSGE3KiROa5sky0EqmTocUnwtpCAQloFgdJAoDLgtKzBG/wqHHNK4dsSi6vb4nC9Rlr+2A8TVdLc8UrpLX+5FF6XGF1OEU6sF+N4gRinnM+hf7MII+WxmNgSe2e8Uup+4pHBjUQ0USbhR0sk+y+VSr7tfUXsGSwSe0ZKJN1jpeIPx9yifL+bSB91/gMKvPB030hdHgAAAABJRU5ErkJggg=="},

// 伪装Firefox10.0
{  name: "Firefox10.0",
ua: "Mozilla/5.0 (Windows NT 6.1; rv:10.0.6) Gecko/20120716 Firefox/10.0.6",
label: "Firefox10.0",
image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAGYUlEQVRIiZWUeVDU9xmH3wUWMJ4okWhxOirRhtpoSrxG8agWkWhGrUdhTFRUWo+gScQIqPEskkYxoqJBYrBGI8ZojYIHiVHEA7V4hBBhWVjuhUWRe3d/v+/TP5xk4tTmeP5/n8+878z7Efk5+l/sbRx0McJ15PXdMv7GWRl7PdN12NUk44DsRdL/Yu+fnf9/GP0/G+o6PPtLWZDn6LKrmpfONxFyS2NmniI8t4XXThQyKjLD8ZuBO7N6jMgM/BXqdS7G33++XYJu4ZpQycsXnSywKDbVw85mxacozEqhKwVKUZefQe76Zbz1ysY9eWlp7j+pvnDhgpvH4K+/MIz7D7K5hL5nWpj8rWJ+kWJZqWKZRbGiUvFOpWJluUIpRVy1ollp6Lk7uT1/zuW69PROT5Xz6h8XThubkGUILEDetCCpjfQ9+pAp+wsZdk1jQo5G0A1FcI7GuGsaifWQ+FDRoBRnmhUFlfch633yFkVk/K88bEQIB+JV+N8P0y/6Es9GXaJr2HlsG5dwPeUQHoea8E2ro+fRejqm2hj5VSthd5x47rUx8kwTJ61wqEDBvShaLm7DErsy8okAR/TI8xX3r0NCPJzejXY4mbbUbXBqDsnnKvH4pBXPPTZ6Z7YQZlZMuOpAtlRg2F6FbLQgq4vwjavF9KgcMv9Cxa61Dxo+T+0mIiI1M6RD/ZLnrKWbxkN2PFyKheqt2I4NguB2PB9zD4lrpWuGhg1AKba2KeQtCxJdgqwpRaLu4rbsG+Yez4fsWOx7I2lcEfx4i+K54tkyz62mdYY3Ti8Dzo6C87cGHr0o6F8uou2+meTlb+MT/AlnUCgUJ3XwP/AQ4+oiZF4hMjWH+WeKqS3PxXFoEtxNpGXViNsiInIzQIzWVYE19pkv0CyCQ1xwiqAb3Snr5YIWHwXZg3Hm+zPui1aeyXQi0cVIeAH+CTW8nungmZhCXCP202o3weHxkLsIfWVvR8uCdr7SHOHdo2lfqOOBnzcNImjihiYGnC6CGt4OJhmpf607Q042YljgQKbeR/5mQpaakTnfIYuL+JcNrHopLdoJsG5GvReAFu5JaahMkbYI6ftwYX9V3d2bShGaxIDTVWBDADiyaajIoJcdgh7x+OYxZmRdBRJjwZjyAFlRhgSXk9R2HWXbBA0H0Od64Qx1wT5ZpkhjtN+zFaO82kwilIhQLkKtu0DtLrTqd+mwpRrFY9w/rUCi85GEUmRNMbLFgiyvQGaW8/q93ZA1F+wp6O8MREsMwT61wwAp3OHnYQrxtX7bUcjzFkxdhJI/CGqeG20Fm3Cbc4xcTVEPhOXUI+GXMMTdRbYVIGvzkZV1uCfeo/LyTChcB/YdqKxJaCmzHlb7SHsREWnb/Nwx02AjdyYIBRMF82TB2llQB4cyue4a7RNbMEzPJuCIiVVXbHTakcfvjlchEWW4xpex/mo03F4K2nHU19PQj3nj+GDI1R8ezZ7mM8s82wfzGKEk1IApRDAPE/Segn67Pf/8ajpdNxzBI8FKxyONWBQcdDjxP32WDR/7o92JgIbPoH4v+p3BOD7ywLFt3OIfAurjxKtkWc+GsinutK52oTTcQN1soW2+K5waA81rsJe+SNFlPz7a14tdyT7YHW+gZf0ZrsWAXgu1K0Clop3wxjmxWzMPznd+oi4qkwMitbOz0Da6o+/thpbcHdJGwOkw1Llp4LwB2gWw7If7KaAegWqEkhVgnoeqCkS3BUC4BzVXwpc8tVHb0id+2JQ0AD3eDdL7oU4Ph3OhOJJ80P/hicqZDcVvws3RYA5F3RmDyvVH2WPQ7nXEvsqIduiv/94bIManBmSNFK9vlvf7uGTtC3Z1cACc8Eff30VXxwNQ50ejvotVKneRrq6MVio/UKmqP0FZH4VpCOpWiP3Re0Enc0a16/VU+fdcGyqdijYFrq1KGlur313qUDdnOjjVo1mlubdwdWAj+YHNpLdr4lQ/u57S1em8FGxvzHy3rHbfhPVZr4jXT8q/52aAGKve9p1off+lo5bU6fllHwabyuP6FFdGuZRaY12KKyMNpuL4CcVF8a/eqNk6Orkk3Htsup94/CL5jzBYB4hP60Lv0c3bX55vTQ6Ksh0MXWXdPyPKtidocePq3tMdYV0GPegjndeJuPxa+RNBF8aIW94McS+eK56Fb4jHzQgx/lLpfwFdHJmbEgdyKQAAAABJRU5ErkJggg=="},

	];
/******************************************************************************************************************
 *这里是查询源设置，只支持"GET"方式获取，taobao为脚本内置,可以自行按照示例添加，不限定于IP，可以是其他相关的API，
 只要是你想要显示的都可以
 *******************************************************************************************************************/
//查询本地信息
var MyInfo = {
	inquireAPI: "http://whois.pconline.com.cn/", //查询接口API
	//regulation是截取函数,docum是一个XMLHttpRequest()的req.responseText，（具体可以百度	XMLHttpRequest()）。传回的obj为最终要显示的结果和样式等
	regulation: function(docum) {
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
				return MyInfos;
			} else return "查询失败";
		} else return null;
	}
};
//网站SEO信息
var SeoInfo = {
	//inquireAPI: "http://api.91cha.com/alexa?key=07e09460fd5c483699c8f515f19c4412&host=", //查询接口API
	inquireAPI: "http://seo.chinaz.com/?q=", //查询接口API
	//regulation是截取函数,docum是一个XMLHttpRequest()的req.responseText，（具体可以百度	XMLHttpRequest()）。传回的obj为最终要显示的结果和样式等
	regulation: function(docum) {
		if (docum) {
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

			var info;			
			if (quanzhong && quanzhong.length < 10)
				info = "百度权重：" + quanzhong;
			if (Rank && Rank.length < 3)
				info = info + '  ||  ' + "GoogleRank：" + Rank;
			if (sameip && sameip.length < 6)
				info = info + '\n' + "同IP网站：" + sameip;
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
			if (yasuo && yasuo.length == 1) {
				//info = info + '\n' + "网页是否压缩：" + yasuo;
				if (yuanshi && yuanshi.length < 10)
					info = info + '\n' + "网页大小：" + yuanshi + "KB";
				if (yasuohou && yasuohou.length < 10)
					info = info + '  ||  ' + "压缩后：" + yasuohou + "KB";
				if (yasuobi && yasuobi.length < 8)
					info = info + '  ||  ' + "压缩比：" + yasuobi;
			}



			/*var info = "百度权重：" + quanzhong + '\n' 
			+ "Google：" + Rank + '\n' 
			+ "同IP网站：" + sameip + '\n' 
			+ "域名年龄：" + domainage + '\n' 
			+ "创建于：" + start + '\n' 
			+ "过期时间为：" + lastage + '\n' 
			+ "备案号：" + beianhao + '\n' 
			+ "性质：" + xingzhi + '\n' 
			+ "名称：" + mingchen + '\n' 
			+ "审核时间：" + shenhe + '\n' 
			+ "百度流量预计：" + liuliang + '\n' 
			+ "关键词库：" + keydb + '\n' 
			+ "标题(" + TitleN + "个)：" + Title + '\n' 
			+ "标题(" + KeyWordsN + "个)：" + KeyWords + '\n' 
			+ "标题(" + DescriptionN + "个)：" + Description + '\n' 
			+ "网页是否压缩：" + yasuo + '\n' 
			+ "原网页大小：" + yuanshi + '\n' 
			+ "压缩后大小：" + yasuohou + '\n' 
			+ "压缩比：" + yasuobi;*/

			//return doc + "\n==============================================\n" + info;
			return info;

		} else return null;
	}
};
//查询网站IP信息等
var SourceAPI = [{
	label: "纯真 查询源", //菜单中显示的文字
	id: "CZ", //必须设定一个ID，以便脚本读取
	isFlag: false, //是否作为国旗图标的查询源,所有自定义项目中，只能有一个设为true，其余可删除该项或为false,当你没有设定的时候会使用脚本预设
	isJustFlag: false, //是否仅作为国旗图标的查询源,如果有此项，就不会创建此项的菜单，也不会作为信息查询源代使用。该项为false的时候可删除或注释掉
	inquireAPI: "http://www.cz88.net/ip/index.aspx?ip=", //查询的API，GET类型
	//返回“null”的时候便使用备用查询源；
	regulation: function(docum) {
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
			obj.SiteInfo = s_local || null; //※必须，此处为返回结果中你需要显示的信息;当前项仅为图标查询源的时候可以非必须。
			//以下两项非必须，在此项目不作为国旗图标查询源的时候可以不用
			obj.countryCode = null; //此处为返回结果的国家CODE。
			obj.countryName = null; //此处为返回结果的国家名称【中文，需要lib数据库支持】。

			return obj || null;
		} else return null; //如果没有传入值则返回空
	}
}, {
	label: "太平洋电脑",
	id: "pconline",
	inquireAPI: "http://whois.pconline.com.cn/ip.jsp?ip=",
	regulation: function(docum) {
		if (docum) {
			var docum = docum.replace(/\n/ig, "");

			var obj = {};
			obj.SiteInfo = docum || null;
			obj.countryCode = null;
			obj.countryName = null;
			return obj || null;
		} else return null;
	}
}, {
	label: "MyIP查询源",
	id: "myip",
	inquireAPI: "http://www.myip.cn/",
	regulation: function(docum) {
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
			obj.SiteInfo = myip_addr || null;
			obj.countryCode = null;
			obj.countryName = null;
			return obj || null;
		} else return null;
	}
}, {
	label: "新浪 查询源",
	id: "sina",
	inquireAPI: "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=",
	regulation: function(docum) {
		if (docum) {
			var doc = JSON.parse(docum);
			if (doc.ret == 1) {
				if (doc.isp !== '' || doc.type !== '' || doc.desc !== '')
					var addr = doc.country + doc.province + doc.city + doc.district + '\n' + doc.isp + doc.type + doc.desc;
				else
					var addr = doc.country + doc.province + doc.city + doc.district;

				var obj = {};
				obj.SiteInfo = addr || null;
				obj.countryCode = null;
				obj.countryName = doc.country || null;
				return obj || null;
			} else return null;
		} else return null;
	}
}, {
	label: "波士顿大学",
	id: "CZedu",
	inquireAPI: "http://phyxt8.bu.edu/iptool/qqwry.php?ip=",
	regulation: function(docum) {
		if (docum) {
			var s_local = docum;
			s_local = s_local.replace(/ +CZ88.NET ?/g, "");

			var obj = {};
			obj.SiteInfo = s_local || null;
			obj.countryCode = null;
			obj.countryName = null;
			return obj || null;
		} else return null;

	}
}, {
	label: "淘宝 查询源",
	id: "taobao",
	isFlag: true,
	inquireAPI: "http://ip.taobao.com/service/getIpInfo.php?ip=",
	regulation: function(docum) {
		if (docum && JSON.parse(docum).code == 0) {
			var doc = JSON.parse(docum);
			var country_id = doc.data.country_id.toLocaleLowerCase();
			var addr = doc.data.country + doc.data.area;
			if (doc.data.region || doc.data.city || doc.data.county || doc.data.isp)
				addr = addr + '\n' + doc.data.region + doc.data.city + doc.data.county + doc.data.isp;

			var obj = {};
			obj.SiteInfo = addr || null;
			obj.countryCode = country_id || null;
			obj.countryName = doc.data.country || null;
			return obj || null;
		} else return null;
	}
}]