// ==UserScript==
// @name           tiebaAllsign
// @description    贴吧集中签到
// @include        http://www.baidu.com/
// @include        http://www.baidu.com/?vit=1
// @include        http://www.baidu.com/index.php?tn=baiduhome_pg
// @include        http://tieba.baidu.com/f?kw=*
// @include        http://tieba.baidu.com/f?ie=gbk&kw=*
// @include        http://tieba.baidu.com/f?ie=utf-8&kw=*
// @include        http://tieba.baidu.com/f?tp=0&kw=*
// @updateURL      https://userscripts.org/scripts/source/141939.meta.js
// @downloadURL    https://userscripts.org/scripts/source/141939.user.js
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2013.7.17.0
// ==/UserScript==


//这里指明不签到的吧，吧名不要带最后的“吧”字，用小写的双引号括起来，再用小写的逗号隔开，就象下面一样
var undoList = ["贴吧一", "贴吧二", "贴吧三"];

//此处可修改屏幕允许显示的最大行数;
var maxLines = 20;

//这里指定最大签到数，9999为默认，即全签。
var maxSign = 9999;




//脚本应用式样
var signCSS = "";
signCSS += ".s-mod-nav{margin-right:10px}";
signCSS += "#headTd{border-bottom:1px solid grey; color:blue; padding:0px 0px 5px 0px !important;}";
signCSS += "#footTd{border-top:1px solid grey; color:blue; padding:6px 0px 0px 0px !important;}";
signCSS += ".signbaInfor{white-space:nowrap; padding:0px 6px 0px 6px;}";
signCSS += "#scrollDiv *{font-size:12px !important; line-height:18px !important;} #scrollDiv{max-height:" + (maxLines * 18) + "px; max-width:1200px;}";
signCSS += "#newbutn,#newbutn2,#newbutn3,#zhidaoDiv{float:right;}#useIdDiv,#thDiv{float:left;}";
signCSS += "#timerDiv{z-index:997; position:fixed;left:5px;top:5px;}";
signCSS += "#getDown,#allsign,#newbutn,#newbutn2,#newbutn3{background:rgba(228,228,228,0.4); cursor:pointer; margin:0px 1px 0px 0px; padding:0px 3px;color:black; border:2px ridge black;}";
signCSS += "#getDown:active,#allsign:active,#newbutn:active,#newbutn3:active{border:2px groove black;}";
signCSS += "#readyDiv,#messageWindow{z-index:998; padding:6px 10px 8px 10px;background-color:lightGrey;position:fixed;right:5px;bottom:5px;border:1px solid grey}";
GM_addStyle(signCSS);

//北京时间
var yuy = new Date();
re = yuy.getTime() + 28800000;
yuy.setTime(re);
var fulltime = yuy.getUTCFullYear() + "/" + (yuy.getUTCMonth() + 1) + "/" + yuy.getUTCDate();

//添加按钮
var newEm = document.createElement("span");
newEm.innerHTML = "全签到";
newEm.id = "allsign";
newEm.addEventListener('click', jjuds, true);
var autoSignbox = document.createElement("input");
autoSignbox.type = "checkbox";
autoSignbox.id = "autoSign";
autoSignbox.title = "选中此项，启动自动签到，否则，关闭自动签到";
autoSignbox.checked = GM_getValue('autoSignbox', true);
autoSignbox.addEventListener('click', function () {
	GM_setValue('autoSignbox', document.getElementById("autoSign").checked)
}, true);
if (window.location.href.indexOf("http://www.baidu.com/") != -1) {
	//百度首页添加按钮
	if (document.getElementById("s_mod_nav_titleBar") && document.getElementById("s_username_top")) {
		document.getElementById("s_mod_nav_titleBar").appendChild(newEm);
		document.getElementById("s_mod_nav_titleBar").appendChild(autoSignbox);
	}
	var userSignName = document.getElementById("s_username_top").innerHTML;
} else { //各贴吧添加按钮
	var userSignName = unsafeWindow.PageData.user.name;
	if (userSignName) {
		if (document.getElementById("add_post_btn")) {
			GM_addStyle("#getDown,#allsign{padding:0px 3px 2px 3px; color:#FFFFFF; position:relative;} #autoSign{margin:0px 0px 0px 3px; position:relative; top:10px;}");
			(document.getElementById("frs_old_version")) ? GM_addStyle("#getDown,#allsign{top:8px;}") : GM_addStyle("#getDown,#allsign{top:0px;}");
			var hhio = document.getElementById("add_post_btn");
		} else if (document.getElementsByClassName("j_nav_list") || document.getElementsByClassName("star_nav_good")) {
			GM_addStyle("#getDown{margin-left:30px} #getDown,#allsign{padding:2px 3px 2px 2px; color:#444444; position:relative; top:18px;} #autoSign{margin:0px 0px 0px 3px; position:relative; top:18px;}");
			var hhio = document.getElementsByClassName("j_nav_list")[0] || document.getElementsByClassName("star_nav_good")[0];
		}
		var getDown = document.createElement("span");
		getDown.id = "getDown";
		getDown.innerHTML = "↓";
		getDown.addEventListener('click', function () {
			window.scrollTo(0, 10000000);
			unsafeWindow.rich_postor._editor.execCommand("inserthtml", "");
		}, true);
		hhio.parentNode.appendChild(getDown);
		hhio.parentNode.appendChild(newEm);
		hhio.parentNode.appendChild(autoSignbox);
		if (document.getElementById("add_post_btn")) {
			hhio.parentNode.removeChild(document.getElementById("add_post_btn"));
		}
	}
}

//自动签到
if (GM_getValue('todaySign')) {
	GM_deleteValue("todaySign");
}
var todaySign = JSON.parse(GM_getValue('todaySigned', "{}"));
if (userSignName) {
	if (yuy.getUTCHours() > 0 && document.getElementById("autoSign").checked && (!todaySign.date || todaySign.date != fulltime || todaySign[userSignName] == undefined)) {
		jjuds();
	}
}

//获取签到贴吧名单
function jjuds() {
	var newsignCss = document.createElement("style");
	newsignCss.id = "newsignCss";
	newsignCss.type = "text/css";
	newsignCss.innerHTML = "#allsign{display:none}";
	document.head.appendChild(newsignCss); //签到过程中，隐藏签到按钮

	var readyDiv = document.createElement("div");
	readyDiv.id = "readyDiv";
	readyDiv.innerHTML = "开始签到准备，正在获取贴吧列表第1页";
	document.body.appendChild(readyDiv);
	var allAncs = []; //地址收集数组
	var baNameF = []; //吧名收集数组
	var heer = new Date();
	sed = heer.getTime() - 600000;

	function getTieba(nn, lp) { //获取第2-第n页的贴吧列表
		var addTail = "&pn=" + nn;
		var urll = "http://tieba.baidu.com/f/like/mylike?v=" + sed + addTail;
		setTimeout(function () { //延时操作以免度娘误会
			readyDiv.innerHTML = "开始签到准备，正在获取贴吧列表第" + nn + "页";
			GM_xmlhttpRequest({
				method : 'GET',
				synchronous : false,
				headers : { //添加http头信息，希望有用
					"cookie" : document.cookie
				},
				url : urll,
				onload : function (reText) {
					var reTextTxt = reText.responseText.replace(/[	]/g, "").replace(/<td>\r\n/g, "<td>").replace(/\r\n<\/td>/g, "</td>").replace(/<span.*?span>\r\n/g, "");
					var ww = reTextTxt.match(/<td><a[ ]href=".*?(?=<\/a>)/g);
					for (s = 0; s < ww.length; s++) {
						if (allAncs.length < maxSign) {
							qq = allAncs.push("http://tieba.baidu.com/mo/m?kw=" + ww[s].replace('<td><a href="/f?kw=', '').replace(/"[ ]title.*/, ""));
							dd = baNameF.push(ww[s].replace(/<td><a[ ]href=".*?">/, ""));
						} else {
							break;
						}
					}
					if (nn == lp) { //最后一页取完，开始执行签到
						gowork(allAncs, baNameF);
					} else {
						ns = nn + 1;
						getTieba(ns, lp); //自调用，顺序循环
					}
				}
			})
		}, 1000);
	}

	GM_xmlhttpRequest({ //从“我的贴吧”第1页获取列表
		method : 'GET',
		synchronous : false,
		url : "http://tieba.baidu.com/f/like/mylike?v=" + sed,
		headers : { //添加http头信息，希望有用
			"cookie" : document.cookie
		},
		onload : function (reDetails) {
			todaySign = JSON.parse(GM_getValue('todaySigned', "{}"));
			if (!todaySign.date || todaySign.date != fulltime) { //记录签到标记，当日不再签
				todaySign = {};
				todaySign.date = fulltime;
				todaySign[userSignName] = "done";
			} else {
				todaySign[userSignName] = "done";
			}
			GM_setValue('todaySigned', JSON.stringify(todaySign));
			var simTxt = reDetails.responseText.replace(/[	]/g, "").replace(/<td>\r\n/g, "<td>").replace(/\r\n<\/td>/g, "</td>").replace(/<span.*?span>\r\n/g, "");
			var ww = simTxt.match(/<td><a[ ]href=".*?(?=<\/a>)/g);
			for (s = 0; s < ww.length; s++) {
				if (allAncs.length < maxSign) {
					qq = allAncs.push("http://tieba.baidu.com/mo/m?kw=" + ww[s].replace('<td><a href="/f?kw=', '').replace(/"[ ]title.*/, ""));
					dd = baNameF.push(ww[s].replace(/<td><a[ ]href=".*?">/, ""));
				} else {
					break;
				}
			}
			var qqee = simTxt.match(/<a[ ]href=.*pn=\d+">尾页<\/a>/);
			if (qqee) { //检查是否分页，分页则继续获取贴吧名单
				var deho = Number(qqee[0].match(/&pn=\d+/)[0].replace("&pn=", ""));
				//deho = (deho < 10) ? deho : 10; //因为度娘限签200，所以，此处只取前10页 //2013.6.25听说度娘取消了签到数量限制，所以暂时屏蔽这一句
				if (Math.ceil(maxSign / 20) < deho) {
					deho = Math.ceil(maxSign / 20);
				}
				if (deho == 1) {
					gowork(allAncs, baNameF);
				} else {
					getTieba(2, deho);
				}
			} else { //不分页则直接开始签到
				gowork(allAncs, baNameF);
			}
		}
	})
}

//功能函数
function gowork(allAncs, baNameF) { //以获取的地址数组和吧名数组为参数
	document.body.removeChild(document.getElementById("readyDiv"));

	var yuye = new Date();
	ree = yuye.getTime() + 28800000;
	yuye.setTime(ree);
	var anotherTime = yuye.getUTCFullYear() + "/" + (yuye.getUTCMonth() + 1) + "/" + yuye.getUTCDate(); //当前时间

	//创建窗口
	if (document.getElementById("messageWindow")) {
		document.body.removeChild(document.getElementById("messageWindow"));
	}
	var newDiv = document.createElement("div");
	newDiv.id = "messageWindow";
	newDiv.align = "left";
	document.body.appendChild(newDiv);

	var tablee = document.createElement("table");
	newDiv.appendChild(tablee);

	var thh = document.createElement("th");
	thh.id = "headTd";
	var thDiv = document.createElement("span");
	thDiv.id = "thDiv";
	thh.appendChild(thDiv);
	tablee.appendChild(thh);

	var tr1 = document.createElement("tr");
	var tr2 = document.createElement("tr");

	tablee.appendChild(tr1);
	tablee.appendChild(tr2);

	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	td2.id = "footTd";

	tr1.appendChild(td1);
	tr2.appendChild(td2);

	var tibeNums = allAncs.length; //贴吧总数量
	var Tds = []; //各吧签到信息栏的空白数组

	var scrollDiv = document.createElement("div");
	scrollDiv.id = "scrollDiv";
	newTable = creaseTable(tibeNums); //根据贴吧数量创建列表
	scrollDiv.appendChild(newTable);
	td1.appendChild(scrollDiv);
	td2.innerHTML += anotherTime + " 共" + tibeNums + "个贴吧需要签到&nbsp;&nbsp;";

	zhidao(); //知道签到
	onebyone(0, "conti"); //这里开始启动逐一签到动作


	var newbutn = document.createElement("span"); //创建关窗按钮
	newbutn.id = "newbutn";
	newbutn.innerHTML = "关闭窗口";
	newbutn.addEventListener("click", function () {
		document.head.removeChild(document.getElementById("newsignCss"));
		document.body.removeChild(document.getElementById("messageWindow"));
	}, false);
	td2.appendChild(newbutn);

	var useIdDiv = document.createElement("span");
	useIdDiv.id = "useIdDiv";
	useIdDiv.innerHTML = "用户ID&nbsp;:&nbsp;" + userSignName;
	thDiv.appendChild(useIdDiv);

	//知道签到函数
	function zhidao() {
		var zhidaoDiv = document.createElement("span");
		zhidaoDiv.id = "zhidaoDiv";
		thh.appendChild(zhidaoDiv);
		var gtt = new Date();
		dataa = "cm=100509&t=" + gtt.getTime();
		GM_xmlhttpRequest({
			method : 'POST',
			synchronous : false,
			url : "http://zhidao.baidu.com/submit/user",
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded"
			},
			data : encodeURI(dataa),
			onload : function (response) {
				if (JSON.parse(response.responseText).status == 0) {
					var todayEx = JSON.parse(response.responseText).data.expToday;
					zhidaoDiv.innerHTML = "百度知道签到成功&nbsp;经验+" + todayEx.toString();
				} else if (JSON.parse(response.responseText).status == 2) {
					zhidaoDiv.innerHTML = "百度知道已签到";
				}
			}
		})
	}

	//列表创建函数
	function creaseTable(UrlLength) {
		var cons = (UrlLength <= maxLines * 2) ? 2 : 3;
		if (tibeNums > maxLines * cons) {
			GM_addStyle("#scrollDiv{overflow-x:auto; overflow-y:scroll; padding-right:15px}");
		}
		var tablepp = document.createElement("table");
		var trs = [];
		for (ly = 0; ly < Math.ceil(UrlLength / cons); ly++) {
			var tr = document.createElement("tr");
			mmd = trs.push(tr);
			tablepp.appendChild(tr);
		}
		for (ls = 0; ls < UrlLength; ls++) {
			var td = document.createElement("td")
				td.setAttribute("class", "signbaInfor");
			wq = Tds.push(td);
			trs[Math.floor(ls / cons)].appendChild(td);
		}
		return tablepp
	}

	//显示信息序号的函数
	function consNum(n) {
		if (tibeNums < 10) {
			var indexN = (n + 1).toString();
		} else if (tibeNums > 9 && tibeNums < 100) {
			if (n < 9) {
				var indexN = "0" + (n + 1);
			} else {
				var indexN = (n + 1).toString();
			}
		} else if (tibeNums > 99 && tibeNums < 1000) {
			if (n < 9) {
				var indexN = "00" + (n + 1);
			} else if (n >= 9 && n < 99) {
				var indexN = "0" + (n + 1);
			} else {
				var indexN = (n + 1).toString();
			}
		} else {
			if (n < 9) {
				var indexN = "000" + (n + 1);
			} else if (n >= 9 && n < 99) {
				var indexN = "00" + (n + 1);
			} else if (n >= 99 && n < 999) {
				var indexN = "0" + (n + 1);
			} else {
				var indexN = (n + 1).toString();
			}
		}
		return indexN;
	}

	function onebyone(gg, goorstop) { //这里的gg是从0开始的贴吧序号，goorstop用于判别是否递进执行。
		//吧名缩略显示
		String.prototype.reComLength = function () {
			var yn = 0;
			var kuu = "";
			for (w in this) {
				if (w < this.length) {
					if (/[a-zA-Z0-9]/.exec(this[w])) {
						yn += 1;
					} else {
						yn += 2;
					}
					if (yn < 11) {
						kuu += this[w];
					}
				}
			}
			var uui = yn > 13 ? kuu + "..." : this;
			return uui;
		}

		gg = Number(gg);
		var timeout = 500; //默认延时
		var tiebaname = "<a href='http://tieba.baidu.com/mo/m?kw=" + baNameF[gg] + "' title='" + baNameF[gg] + "吧' target='_blank'><font color='blue'>" + baNameF[gg].reComLength() + "吧</font></a>";
		if (undoList.indexOf(baNameF[gg]) != -1) {
			Tds[gg].innerHTML = consNum(gg) + ".&nbsp;" + tiebaname + " 用户指定不签到";
			if (gg + 1 < tibeNums && !Tds[gg + 1].innerHTML) {
				onebyone(gg + 1, "conti");
			}
		} else {
			Tds[gg].innerHTML = consNum(gg) + ".&nbsp;" + tiebaname + " 访问中......".blink();
			if (goorstop == "conti") {
				document.getElementById("scrollDiv").scrollTop = document.getElementById("scrollDiv").scrollHeight; //滚动时总显示最下一行
			}
			var ttss;
			var myRequest = GM_xmlhttpRequest({
					method : 'GET',
					synchronous : false,
					headers : {
						"cookie" : document.cookie,
						"Accept" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
						"User-Agent" : "Mozilla/5.0 (SymbianOS/9.3; Series60/3.2 NokiaE72-1/021.021; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/525 (KHTML, like Gecko) Version/3.0 BrowserNG/7.1.16352"
					},
					url : allAncs[gg],
					onload : function (responseDetails) {
						var wwdata = responseDetails.responseText;
						var rightPart = wwdata.match(/<td[ ]style="text-align:right;".*?<\/td>/);
						if (!rightPart || rightPart[0] == '<td style="text-align:right;"></td>') {
							Tds[gg].innerHTML = consNum(gg) + ".&nbsp;" + tiebaname + " 未开启签到功能".fontcolor("grey");
						} else {
							if (rightPart[0].indexOf("已签到") != -1) {
								Tds[gg].innerHTML = consNum(gg) + ".&nbsp;" + tiebaname + " 此前已签过到";
							} else {
								timeout = 2248;
								var km = gg; //把gg此时的值记录下来是必须的，因为gg值将发生变化，后面不便调用
								var cookies = document.cookie;
								if (cookies.indexOf("WIFI_SF") == -1) {
									cookies += ";" + "WIFI_SF=" + yuy.getTime().toString().substr(0, 10);
								}
								GM_xmlhttpRequest({
									method : 'GET',
									synchronous : false,
									url : "http://wapp.baidu.com" + rightPart[0].match(/href=".*(?=">)/)[0].replace('href="', '').replace(/&amp;/g, "&"),
									headers : { //添加http头信息，希望有用
										"User-Agent" : "Mozilla/5.0 (Linux; U; Android 2.3.4; zh-cn; W806 Build/GRJ22) AppleWebKit/530.17 (KHTML, like Gecko) FlyFlow/2.4 Version/4.0 Mobile Safari/530.17 baidubrowser/042_1.8.4.2_diordna_008_084/AIDIVN_01_4.3.2_608W/1000591a/9B673AC85965A58761CF435A48076629%7C880249110567268/1",
										"cookie" : cookies
									},
									onload : function (response) {
										var uhText = response.responseText;
										if (uhText[0] == "{") {
											var uhTextJS = JSON.parse(uhText);
											var backError = uhTextJS.error;
											if (backError == "4") {
												var BackRank = "" + uhTextJS.data.add_sign_data.uinfo.user_sign_rank;
												var expValue = (uhTextJS.data.add_sign_data.uinfo.cont_sign_num > 1) ? "6" : "4";
												Tds[km].innerHTML = consNum(km) + ".&nbsp;" + tiebaname + "&nbsp;第" + BackRank.fontcolor("blue") + "个签到，经验+" + expValue.fontcolor("blue");
											} else {
												var reSignAn = document.createElement("a");
												reSignAn.href = 'javascript:void(0);';
												reSignAn.innerHTML = "重签";
												reSignAn.setAttribute("sentValue", km);
												reSignAn.addEventListener('click', function (ee) {
													k = ee.target.getAttribute("sentValue");
													onebyone(k, "stop"); //带"stop"参数，避免递进执行。
												}, true);
												Tds[km].innerHTML = consNum(km) + ".&nbsp;" + tiebaname + " " + uhTextJS.match(/<span[ ]class="light"><span[ ]class="light">.*?(?=<\/span>)/)[0].replace('<span class="light"><span class="light">', '');
												Tds[km].appendChild(reSignAn);
											}
										} else {
											var callbackSpan = uhText.match(/<span[ ]class="light">签到成功，经验值上升<span[ ]class="light">\d(?=<\/span>)/);
											if (callbackSpan) {
												var expValue = "+" + callbackSpan[0].match(/\d/)[0];
												Tds[km].innerHTML = consNum(km) + ".&nbsp;" + tiebaname + "&nbsp;签到成功，经验" + expValue.fontcolor("blue");
											} else if (uhText.match(/<span class="light"><span class="light">.*?<\/span>/)) {
												var reSignAn = document.createElement("a");
												reSignAn.href = 'javascript:void(0);';
												reSignAn.innerHTML = "重签";
												reSignAn.setAttribute("sentValue", km);
												reSignAn.addEventListener('click', function (ee) {
													k = ee.target.getAttribute("sentValue");
													onebyone(k, "stop"); //带"stop"参数，避免递进执行。
												}, true);
												Tds[km].innerHTML = consNum(km) + ".&nbsp;" + tiebaname + " " + uhText.match(/<span[ ]class="light"><span[ ]class="light">.*?(?=<\/span>)/)[0].replace('<span class="light"><span class="light">', '');
												Tds[km].appendChild(reSignAn);
											} else if(uhText.match(/无弹窗阅读,最新章节/)){
												Tds[km].innerHTML = consNum(km) + ".&nbsp;" + tiebaname + " 签到成功，BS度娘广告";
											} else {
												Tds[km].innerHTML = consNum(km) + ".&nbsp;" + tiebaname + " 情况不明...";
											}
										}
									}
								});
							}
						}
						if (goorstop == "conti" && Tds[gg + 1] && !Tds[gg + 1].innerHTML) { //只有当参数为"conti"、下一表格存在且内容为空时，才继续下一个签到动作
							setTimeout(function () {
								onebyone(gg + 1, "conti"); //函数自调用，其实是另一种循环
							}, timeout);
						}
					},
					onreadystatechange : function (responseDe) { //访问超时应对
						if (responseDe.readyState == 1 && typeof ttss == 'undefined') {
							ttss = setTimeout(function () { //添加延时
									myRequest.abort(); //中止请求
									var oldStr = ["mo/m?kw=", "f?kw=", "m?kw=", "f?tp=0&kw=", "m?tp=0&kw="];
									var newStr = ["f?kw=", "m?kw=", "f?tp=0&kw=", "m?tp=0&kw=", "mo/m?kw="];
									var delayRetry = GM_getValue("delayRetry", 0);
									if (delayRetry < 5) {
										GM_log(baNameF[gg] + "吧 访问超时！微调访问地址，第" + (delayRetry + 1) + "次重试中...");
										GM_log("原地址：" + allAncs[gg]);
										GM_setValue("delayRetry", delayRetry + 1);
										allAncs[gg] = allAncs[gg].replace(oldStr[delayRetry], newStr[delayRetry]); //更改访问地址
										GM_log("新地址：" + allAncs[gg]);
										onebyone(gg, "conti"); //再请求
									} else {
										Tds[gg].innerHTML = consNum(gg) + ".&nbsp;" + tiebaname + " 暂时无法访问 ";
										Tds[gg].appendChild(pauseAc);
										GM_deleteValue("delayRetry");
									}
								}, 5000);
						} else if (responseDe.readyState == 2) { //如顺利，消除延时
							clearTimeout(ttss);
							GM_deleteValue("delayRetry");
						}
					}
				});
			//跳过功能
			var hii = gg;
			var pauseAc = document.createElement("a");
			pauseAc.href = 'javascript:void(0);';
			pauseAc.innerHTML = " 跳过";
			pauseAc.addEventListener('click', function () {
				myRequest.abort(); //中止请求
				clearTimeout(ttss); //取消延时块
				GM_deleteValue("delayRetry");
				var dnn = hii + 1;
				if (dnn < tibeNums && !Tds[dnn].innerHTML) {
					onebyone(dnn, "conti"); //进行下一个吧的签到
				}
				Tds[hii].innerHTML = consNum(hii) + ".&nbsp;" + tiebaname + " 已跳过 ";
				var reSignAn = document.createElement("a"); //添加重试按钮
				reSignAn.href = 'javascript:void(0);';
				reSignAn.innerHTML = "重试";
				reSignAn.addEventListener('click', function () {
					onebyone(hii, "stop"); //带"stop"参数，避免递进执行。
				}, true);
				Tds[hii].appendChild(reSignAn);
			}, true);
			Tds[gg].appendChild(pauseAc);
		}
	}
}