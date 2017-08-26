// ==UserScript==
// @name	QR.uc.js
// @description	地址栏&工具栏二维码
// @author	Kelo
// @namespace	https://github.com/GH-Kelo/userChromeJS
// @include	main
// @charset	UTF-8
// @inspect	window.QRCreator
// @startup	window.QRCreator.init();
// @shutdown	window.QRCreator.onDestroy();
// @optionsURL	about:config?filter=userChromeJS.QR.
// @note	地址栏&工具栏二维码
// @version	2015.6.14 0.0.4 Update.增加下载图片功能
// @version	2015.6.05 0.0.3 Update.
// @version	2015.5.24 0.0.2 Update.完善界面
// @version	2015.5.23 0.0.1 Create.
// ==/UserScript==
(function() {
	let { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;
	if (!window.Services) Cu.import("resource://gre/modules/Services.jsm");
	if (window.QRCreator) {
		window.QRCreator.onDestroy();
		delete window.QRCreator;
	}

	var QRCreator = {
		get prefs() {
			delete this.prefs;
			return this.prefs = Services.prefs.getBranch("userChromeJS.QR.");
		},

		get Content() {
			var cont;
			if (!window.content) {
				function listener(message) {
					cont = message.objects.cont
				}
				gBrowser.selectedBrowser.messageManager.loadFrameScript("data:application/x-javascript;charset=UTF-8," + escape('sendAsyncMessage("QR:QR-e10s-content-message", {}, {cont: content,})'), true);
				gBrowser.selectedBrowser.messageManager.addMessageListener("QR:QR-e10s-content-message", listener);
			}
			try {
				cont = cont;
			} catch (e) {
				cont = gBrowser.selectedBrowser.contentWindowAsCPOW;
			}
			delete this.Content;
			return this.Content = window.content || cont || gBrowser.selectedBrowser._contentWindow;
		},

		init: function() {
			this.loadSetting();
			this.prefs.addObserver('', this, false);
			window.addEventListener("unload", function() {
				QRCreator.onDestroy();
			}, false);
		},

		onDestroy: function() {
			this.addIcon(false);
			this.prefs.removeObserver('', this, false);
			Services.obs.notifyObservers(null, "startupcache-invalidate", "");
		},

		observe: function (subject, topic, data) {
			//overlay
			if (topic == "xul-overlay-merged") {
				QRCreator.changeStatus();
				log("界面加载完毕");
			}
			//Prefobs
			if (topic == 'nsPref:changed') {
				switch (data) {
					case 'Icon_Pos':
					case 'QR_Type':
						QRCreator.loadSetting(data);
						break;
				}
			}
		},

		loadSetting: function(type) {
			if (!type || type === "Icon_Pos") {
				this.Icon_Pos = this.getPrefs(1, "Icon_Pos", 0);
				this.addIcon(true);
				this.changeStatus();
			}
			if (!type || type === "QR_Type") {
				this.QR_Type = this.getPrefs(1, "QR_Type", 0);
			}
		},

		getPrefs: function(type, name, val) {
			switch (type) {
				case 0:
					if (!this.prefs.prefHasUserValue(name) || this.prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_BOOL)
						this.prefs.setBoolPref(name, val ? val : false);
					return this.prefs.getBoolPref(name);
					break;
				case 1:
					if (!this.prefs.prefHasUserValue(name) || this.prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_INT)
						this.prefs.setIntPref(name, val ? val : 0);
					return this.prefs.getIntPref(name);
					break;
				case 2:
					if (!this.prefs.prefHasUserValue(name) || this.prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_STRING)
						this.prefs.setCharPref(name, val ? val : "");
					return this.prefs.getCharPref(name);
					break;
			}
		},

		setPrefs: function(type, name, val) {
			switch (type) {
				case 0:
					this.prefs.setBoolPref(name, val ? val : false);
					break;
				case 1:
					this.prefs.setIntPref(name, val ? val : 0);
					break;
				case 2:
					this.prefs.setCharPref(name, val ? val : "");
					break;
			}
		},


		//================================ 界面相关 ================================
		addIcon: function(isAlert) {
			if (this.icon) {
				this.icon.parentNode.removeChild(this.icon);
				$("QRCreator-popup").parentNode.removeChild($("QRCreator-popup"));
				$("QRCreator-panel").parentNode.removeChild($("QRCreator-panel"));
				$("QRCreator-panel-QRImage-context").parentNode.removeChild($("QRCreator-panel-QRImage-context"));
				delete this.icon;
			}
			if (this.style){
				this.style.parentNode.removeChild(this.style);
				delete this.style;
			}
			if (!isAlert) return;
			//================== 图标 ==================
			this.icon = $C("toolbarbutton", {
				id: "QRCreator-icon",
				class: "toolbarbutton-1 chromeclass-toolbar-additional",
				tooltiptext: "生成二维码\n左键：打开面板\n右键：打开功能&设置菜单",
				context: "QRCreator-popup",
				onclick: "if (event.button != 2) QRCreator.iconClick(event);",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqElEQVQ4ja1ObQuCMBi8XxsShCGMRBmJtiiSrCCQiP7q9Wkyn00d1MFxbzxjwD9g7h+GGLvjcHtTPup2Szvq64tWpQ917g0AoLr0tCp9qHNvAAD6/PS+6HZLO8rjgyHG7gPypmPedIzNHlTVUlUtY/OATJ8YotynMtLCeK+6XVoYzmVsdjWtSm+z3EdYqz2tSm+z3EdIMu2VbpdkmnMZq23JEOU+lX/CF5tmGfKU1HvcAAAAAElFTkSuQmCC",
			});
			if (this.Icon_Pos === 0)
				$('identity-box').appendChild(this.icon);
			else if (this.Icon_Pos === 1)
				$('urlbar-icons').appendChild(this.icon);
			else if (this.Icon_Pos === 2)
				ToolbarManager.addWidget(window, this.icon, true);

			//================== 右键菜单 & panel ==================
			var overlay = '\
			<overlay xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" \
				xmlns:html="http://www.w3.org/1999/xhtml">\
				<toolbarpalette id="mainPopupSet">\
					<menupopup id="QRCreator-popup" position="after_start">\
					<menuitem label="自定文字" tooltiptext="输入文字创建二维码" oncommand="QRCreator.run(2);"/>\
						<menu label="生成方式">\
							<menupopup id="QRCreator-QR_Type">\
								<menuitem type="radio" value="0" label="本地生成" name="QR_Type" oncommand="QRCreator.setPrefs(1, \'QR_Type\', this.value);"/>\
								<menuitem type="radio" value="1" label="在线生成" name="QR_Type" oncommand="QRCreator.setPrefs(1, \'QR_Type\', this.value);"/>\
							</menupopup>\
						</menu>\
						<menuseparator/>\
				 		<menu label="图标位置">\
							<menupopup id="QRCreator-Icon_Pos">\
								<menuitem type="radio" value="0" label="地址栏前端" name="Icon_Pos" oncommand="QRCreator.setPrefs(1, \'Icon_Pos\', this.value);"/>\
								<menuitem type="radio" value="1" label="地址栏后端" name="Icon_Pos" oncommand="QRCreator.setPrefs(1, \'Icon_Pos\', this.value);"/>\
								<menuitem type="radio" value="2" label="可移动按钮" name="Icon_Pos" oncommand="QRCreator.setPrefs(1, \'Icon_Pos\', this.value);"/>\
							</menupopup>\
						</menu>\
					</menupopup>\
					<menupopup id="QRCreator-panel-QRImage-context" position="after_start">\
						<menuitem label="下载图片" oncommand="QRCreator.saveImage();"/>\
					</menupopup>\
					<panel id="QRCreator-panel" type="arrow" flip="slide" consumeoutsideclicks="false" noautofocus="false" orient="vertical" align="center" level="top"/>\
				</toolbarpalette>\
			</overlay>';
			overlay = "data:application/vnd.mozilla.xul+xml;charset=utf-8," + encodeURI(overlay);
			window.userChrome_js.loadOverlay(overlay, this);

			//================== CSS ==================
			var css = '\
			#QRCreator-panel > image,\
			#QRCreator-panel > hbox {\
				margin: 5px 10px;\
			}\
			#QRCreator-panel label {\
				color: #333;\
				font-family:"微软雅黑";\
				word-break: normal;\
			}\
			#QRCreator-panel > hbox:first-of-type > label.QRCreator-panel-QRImage-label {\
				font-size: 18px;\
				color: #06c;\
			}\
			#QRCreator-panel #QRCreator-panel-loadingImage {\
				max-height: 18px;\
				max-width: 18px;\
			}\
			#QRCreator-panel-QRImage {\
				min-height:150px;\
				min-width:150px;\
				max-height:200px;\
				max-width:200px;\
			}';
			if (this.Icon_Pos === 0 || this.Icon_Pos === 1) {
				css += '\
				#QRCreator-icon {\
					-moz-appearance: none !important;\
					border-style: none !important;\
					border-radius: 0 !important;\
					padding: 0 3px !important;\
					margin: 0 !important;\
					background: transparent !important;\
					box-shadow: none !important;\
					-moz-box-align: center !important;\
					-moz-box-pack: center !important;\
					min-width: 18px !important;\
					min-height: 18px !important;\
				}\
				#QRCreator-icon > .toolbarbutton-icon {\
					max-width: 18px !important;\
					padding: 0 !important;\
					margin: 0 !important;\
				}\
				';
			}
			this.style = addStyle(css);
		},

		run: function(type) {
			this.openPanel();
			this.panelLoading();
			var cont = window.content || this.Content;
			var target_data = "", altText;		
			if (!type && type != 0) {
				if (cont.getSelection().toString().length != 0)
					var type = 1;
				else if ((cont.document.location == "about:blank" || cont.document.location == "about:newtab"))
					var type = 2;
				else
					var type = 0;
			}
			switch (type) {
				case 0:
					target_data = cont.document.location;
					altText = {type: 0, text: "QR码内容[网址]"};
					break;
				case 1:
					target_data = cont.getSelection().toString();
					altText = {type: 1, text: "QR码内容[文本]"};
					break;
				case 2:
					target_data = prompt("请输入文本创建一个QR码（长度不超过250字节）：", "");
					altText = {type: 1, text: "QR码内容[文本]"};
					break;
			}
			setTimeout(function(){ QRCreator.QRCommand(target_data, altText); }, 180);
		},

		iconClick: function(aEvent) {
			if(aEvent.target != aEvent.currentTarget) return;
			aEvent.stopPropagation();
			aEvent.preventDefault();
			if (aEvent.button == 0) this.run();
		},

		openPanel: function() {
			var panel = $("QRCreator-panel");
			//清除内容
			if(panel.hasChildNodes()) panel.innerHTML = "";
			panel.removeAttribute("width");
			panel.removeAttribute("height"); 
			panel.openPopup(this.icon, "bottomcenter topleft", 0, 0, false, null, null);
		},

		panelLoading: function() {
			//加载
			var panel = $("QRCreator-panel");

			var image = $C("image", {
				id: "QRCreator-panel-loadingImage",
				src: "data:image/png;base64,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",
			});
			var label  = $C("label", {
				id: "QRCreator-panel-loading",
				value: "加载中···",
				align: "center",
			});
			var hbox = $C("hbox", {});

			hbox.appendChild(image);
			hbox.appendChild(label);

			panel.appendChild(hbox);
		},

		showImage: function(src, target_data, altText) {
			//展示图片
			var panel = $("QRCreator-panel");
			
			if (!panel.getAttribute("panelopen")) this.openPanel();
			if(panel.hasChildNodes()) panel.innerHTML = "";
			var hbox, label, image;
			var image = $C("image", {
				id: "QRCreator-panel-QRImage",
				src: src,
				context: "QRCreator-panel-QRImage-context"
			});
			panel.appendChild(image);

			hbox = $C("hbox", {align: "center"});
			label  = $C("label", {
				class: "QRCreator-panel-QRImage-label",
				value: altText.text || "二维码",
				align: "center",
			});
			hbox.appendChild(label);
			panel.appendChild(hbox);

			hbox = $C("hbox", {align: "center"});
			label  = $C("label", {
				class: "QRCreator-panel-QRImage-label text-link",
				//截取前30位
				value: cutString(target_data.toString(), 30),
				href: altText.type === 0 ? target_data : "http://www.baidu.com/s?wd=" + target_data,
				tooltiptext: altText.type === 0 ? "打开网页" :  "搜索选取文字",
				align: "center",
			});
			hbox.appendChild(label);
			panel.appendChild(hbox);
		},

		changeStatus: function() {
			if($("QRCreator-Icon_Pos")) 
				$("QRCreator-Icon_Pos").childNodes[this.Icon_Pos].setAttribute('checked', 'true');
			if($("QRCreator-QR_Type")) 
				$("QRCreator-QR_Type").childNodes[this.QR_Type].setAttribute('checked', 'true');
		},

		saveImage: function(url) { 
			var url = url || $("QRCreator-panel-QRImage").src || "";
			if (!url) return alert("无下载地址");
			saveImageURL(url, "二维码图片",  null, null, null, null, window.document);
		},

		//================================ 主函数 ================================
		QRCommand: function(target_data, altText) {
			if (!this.QRcheckLength(target_data)) return;
			if (this.QR_Type === 0) 
				var src = this.QRcreateQrcode(target_data);
			else if (this.QR_Type === 1) 
				var src = this.generateAddress(target_data);

			this.showImage(src, target_data, altText)
			//log('二维码：' + src);
		},

		QRcheckLength: function(arg) {
			if (arg) {
				if (arg.length == 0) {
					alert("没有要转化为二维码的内容！");
					return false;
				} else if (arg.length > 250) {
					alert("要转化为二维码的数据超长了！(大于250字节)");
					return false;
				} else {
					return true;
				}
			} else {
				return false;
			}
		},

		QRcreateQrcode: function(text, typeNumber, errorCorrectLevel) {
			for (var type = 4; type <= 40; type += 1) {
				try {
					var qr = QRCode(type, 'L');
					qr.addData("" + this.QRconvertFromUnicode("UTF-8", text));
					qr.make();

					return qr.createImgTag();
				} catch (err) {}
			}

			return null;
		},

		QRconvertFromUnicode: function(charset, str) {
			try {
				var unicodeConverter = Components
					.classes["@mozilla.org/intl/scriptableunicodeconverter"]
					.createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
				unicodeConverter.charset = charset;
				str = unicodeConverter.ConvertFromUnicode(str);
				return str + unicodeConverter.Finish();
			} catch (ex) {
				return null;
			}
		},

		generateAddress: function(target_data) {
			//===== 放弃使用谷歌API =====
			//*** 以下为几个可用的API ***
			//http://chart.apis.google.com/chart?cht=qr&chs=350x350&chl=
			//http://qr.liantu.com/api.php?text=
			//http://tool.oschina.net/action/qrcode/generate?data=
			//http://api.kuaipai.cn/qr?chl=
			//http://s.jiathis.com/qrcode.php?url=
			//http://open.dmeng.net/qrcode.png?text=
			return 'http://open.dmeng.net/qrcode.png?text=' + encodeURIComponent(target_data);
		},
	};
	// 来自 User Agent Overrider 扩展
	const ToolbarManager = (function() {
		/**
		 * Remember the button position.
		 * This function Modity from addon-sdk file lib/sdk/widget.js, and
		 * function BrowserWindow.prototype._insertNodeInToolbar
		 */
		let layoutWidget = function(document, button, isFirstRun) {

			// Add to the customization palette
			let toolbox = document.getElementById('navigator-toolbox');
			toolbox.palette.appendChild(button);

			// Search for widget toolbar by reading toolbar's currentset attribute
			let container = null;
			let toolbars = document.getElementsByTagName('toolbar');
			let id = button.getAttribute('id');
			for (let i = 0; i < toolbars.length; i += 1) {
				let toolbar = toolbars[i];
				if (toolbar.getAttribute('currentset').indexOf(id) !== -1) {
					container = toolbar;
				}
			}

			// if widget isn't in any toolbar, default add it next to searchbar
			if (!container) {
				if (isFirstRun) {
					container = document.getElementById('nav-bar');
				} else {
					return;
				}
			}

			// Now retrieve a reference to the next toolbar item
			// by reading currentset attribute on the toolbar
			let nextNode = null;
			let currentSet = container.getAttribute('currentset');
			let ids = (currentSet === '__empty') ? [] : currentSet.split(',');
			let idx = ids.indexOf(id);
			if (idx !== -1) {
				for (let i = idx; i < ids.length; i += 1) {
					nextNode = document.getElementById(ids[i]);
					if (nextNode) {
						break;
					}
				}
			}

			// Finally insert our widget in the right toolbar and in the right position
			container.insertItem(id, nextNode, null, false);

			// Update DOM in order to save position
			// in this toolbar. But only do this the first time we add it to the toolbar
			if (ids.indexOf(id) === -1) {
				container.setAttribute('currentset', container.currentSet);
				document.persist(container.id, 'currentset');
			}
		};

		let addWidget = function(window, widget, isFirstRun) {
			try {
				layoutWidget(window.document, widget, isFirstRun);
			} catch (error) {
				console.log(error);
			}
		};

		let removeWidget = function(window, widgetId) {
			try {
				let widget = window.document.getElementById(widgetId);
				widget.parentNode.removeChild(widget);
			} catch (error) {
				console.log(error);
			}
		};

		let exports = {
			addWidget: addWidget,
			removeWidget: removeWidget,
		};
		return exports;
	})();

	//---------------------------------------------------------------------
	//
	// QR Code Generator for JavaScript
	//
	// Copyright (c) 2009 Kazuhiko Arase
	//
	// URL: http://www.d-project.com/
	//
	// Licensed under the MIT license:
	//	http://www.opensource.org/licenses/mit-license.php
	//
	// The word 'QR Code' is registered trademark of
	// DENSO WAVE INCORPORATED
	//	http://www.denso-wave.com/qrcode/faqpatent-e.html
	//
	//---------------------------------------------------------------------
	var QRCode = function() {
		//---------------------------------------------------------------------
		// qrcode
		//---------------------------------------------------------------------
		/**
		 * qrcode
		 * @param typeNumber 1 to 10
		 * @param errorCorrectLevel 'L','M','Q','H'
		 */
		var qrcode = function(typeNumber, errorCorrectLevel) {
			var PAD0 = 0xEC;
			var PAD1 = 0x11;
			var _typeNumber = typeNumber;
			var _errorCorrectLevel = QRErrorCorrectLevel[errorCorrectLevel];
			var _modules = null;
			var _moduleCount = 0;
			var _dataCache = null;
			var _dataList = new Array();
			var _this = {};
			var makeImpl = function(test, maskPattern) {
				_moduleCount = _typeNumber * 4 + 17;
				_modules = function(moduleCount) {
					var modules = new Array(moduleCount);
					for (var row = 0; row < moduleCount; row += 1) {
						modules[row] = new Array(moduleCount);
						for (var col = 0; col < moduleCount; col += 1) {
							modules[row][col] = null;
						}
					}
					return modules;
				}(_moduleCount);
				setupPositionProbePattern(0, 0);
				setupPositionProbePattern(_moduleCount - 7, 0);
				setupPositionProbePattern(0, _moduleCount - 7);
				setupPositionAdjustPattern();
				setupTimingPattern();
				setupTypeInfo(test, maskPattern);
				if (_typeNumber >= 7) {
					setupTypeNumber(test);
				}
				if (_dataCache == null) {
					_dataCache = createData(_typeNumber, _errorCorrectLevel, _dataList);
				}
				mapData(_dataCache, maskPattern);
			};
			var setupPositionProbePattern = function(row, col) {
				for (var r = -1; r <= 7; r += 1) {
					if (row + r <= -1 || _moduleCount <= row + r) continue;
					for (var c = -1; c <= 7; c += 1) {
						if (col + c <= -1 || _moduleCount <= col + c) continue;
						if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
							_modules[row + r][col + c] = true;
						} else {
							_modules[row + r][col + c] = false;
						}
					}
				}
			};
			var getBestMaskPattern = function() {
				var minLostPoint = 0;
				var pattern = 0;
				for (var i = 0; i < 8; i += 1) {
					makeImpl(true, i);
					var lostPoint = QRUtil.getLostPoint(_this);
					if (i == 0 || minLostPoint > lostPoint) {
						minLostPoint = lostPoint;
						pattern = i;
					}
				}
				return pattern;
			};
			var setupTimingPattern = function() {
				for (var r = 8; r < _moduleCount - 8; r += 1) {
					if (_modules[r][6] != null) {
						continue;
					}
					_modules[r][6] = (r % 2 == 0);
				}
				for (var c = 8; c < _moduleCount - 8; c += 1) {
					if (_modules[6][c] != null) {
						continue;
					}
					_modules[6][c] = (c % 2 == 0);
				}
			};
			var setupPositionAdjustPattern = function() {
				var pos = QRUtil.getPatternPosition(_typeNumber);
				for (var i = 0; i < pos.length; i += 1) {
					for (var j = 0; j < pos.length; j += 1) {
						var row = pos[i];
						var col = pos[j];
						if (_modules[row][col] != null) {
							continue;
						}
						for (var r = -2; r <= 2; r += 1) {
							for (var c = -2; c <= 2; c += 1) {
								if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
									_modules[row + r][col + c] = true;
								} else {
									_modules[row + r][col + c] = false;
								}
							}
						}
					}
				}
			};
			var setupTypeNumber = function(test) {
				var bits = QRUtil.getBCHTypeNumber(_typeNumber);
				for (var i = 0; i < 18; i += 1) {
					var mod = (!test && ((bits >> i) & 1) == 1);
					_modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
				}
				for (var i = 0; i < 18; i += 1) {
					var mod = (!test && ((bits >> i) & 1) == 1);
					_modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
				}
			};
			var setupTypeInfo = function(test, maskPattern) {
				var data = (_errorCorrectLevel << 3) | maskPattern;
				var bits = QRUtil.getBCHTypeInfo(data);
				// vertical
				for (var i = 0; i < 15; i += 1) {
					var mod = (!test && ((bits >> i) & 1) == 1);
					if (i < 6) {
						_modules[i][8] = mod;
					} else if (i < 8) {
						_modules[i + 1][8] = mod;
					} else {
						_modules[_moduleCount - 15 + i][8] = mod;
					}
				}
				// horizontal
				for (var i = 0; i < 15; i += 1) {
					var mod = (!test && ((bits >> i) & 1) == 1);
					if (i < 8) {
						_modules[8][_moduleCount - i - 1] = mod;
					} else if (i < 9) {
						_modules[8][15 - i - 1 + 1] = mod;
					} else {
						_modules[8][15 - i - 1] = mod;
					}
				}
				// fixed module
				_modules[_moduleCount - 8][8] = (!test);
			};
			var mapData = function(data, maskPattern) {
				var inc = -1;
				var row = _moduleCount - 1;
				var bitIndex = 7;
				var byteIndex = 0;
				var maskFunc = QRUtil.getMaskFunction(maskPattern);
				for (var col = _moduleCount - 1; col > 0; col -= 2) {
					if (col == 6) col -= 1;
					while (true) {
						for (var c = 0; c < 2; c += 1) {
							if (_modules[row][col - c] == null) {
								var dark = false;
								if (byteIndex < data.length) {
									dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
								}
								var mask = maskFunc(row, col - c);
								if (mask) {
									dark = !dark;
								}
								_modules[row][col - c] = dark;
								bitIndex -= 1;
								if (bitIndex == -1) {
									byteIndex += 1;
									bitIndex = 7;
								}
							}
						}
						row += inc;
						if (row < 0 || _moduleCount <= row) {
							row -= inc;
							inc = -inc;
							break;
						}
					}
				}
			};
			var createBytes = function(buffer, rsBlocks) {
				var offset = 0;
				var maxDcCount = 0;
				var maxEcCount = 0;
				var dcdata = new Array(rsBlocks.length);
				var ecdata = new Array(rsBlocks.length);
				for (var r = 0; r < rsBlocks.length; r += 1) {
					var dcCount = rsBlocks[r].dataCount;
					var ecCount = rsBlocks[r].totalCount - dcCount;
					maxDcCount = Math.max(maxDcCount, dcCount);
					maxEcCount = Math.max(maxEcCount, ecCount);
					dcdata[r] = new Array(dcCount);
					for (var i = 0; i < dcdata[r].length; i += 1) {
						dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
					}
					offset += dcCount;
					var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
					var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
					var modPoly = rawPoly.mod(rsPoly);
					ecdata[r] = new Array(rsPoly.getLength() - 1);
					for (var i = 0; i < ecdata[r].length; i += 1) {
						var modIndex = i + modPoly.getLength() - ecdata[r].length;
						ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
					}
				}
				var totalCodeCount = 0;
				for (var i = 0; i < rsBlocks.length; i += 1) {
					totalCodeCount += rsBlocks[i].totalCount;
				}
				var data = new Array(totalCodeCount);
				var index = 0;
				for (var i = 0; i < maxDcCount; i += 1) {
					for (var r = 0; r < rsBlocks.length; r += 1) {
						if (i < dcdata[r].length) {
							data[index] = dcdata[r][i];
							index += 1;
						}
					}
				}
				for (var i = 0; i < maxEcCount; i += 1) {
					for (var r = 0; r < rsBlocks.length; r += 1) {
						if (i < ecdata[r].length) {
							data[index] = ecdata[r][i];
							index += 1;
						}
					}
				}
				return data;
			};
			var createData = function(typeNumber, errorCorrectLevel, dataList) {
				var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
				var buffer = qrBitBuffer();
				for (var i = 0; i < dataList.length; i += 1) {
					var data = dataList[i];
					buffer.put(data.getMode(), 4);
					buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber));
					data.write(buffer);
				}
				// calc num max data.
				var totalDataCount = 0;
				for (var i = 0; i < rsBlocks.length; i += 1) {
					totalDataCount += rsBlocks[i].dataCount;
				}
				if (buffer.getLengthInBits() > totalDataCount * 8) {
					throw new Error('code length overflow. (' + buffer.getLengthInBits() + '>' + totalDataCount * 8 + ')');
				}
				// end code
				if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
					buffer.put(0, 4);
				}
				// padding
				while (buffer.getLengthInBits() % 8 != 0) {
					buffer.putBit(false);
				}
				// padding
				while (true) {
					if (buffer.getLengthInBits() >= totalDataCount * 8) {
						break;
					}
					buffer.put(PAD0, 8);
					if (buffer.getLengthInBits() >= totalDataCount * 8) {
						break;
					}
					buffer.put(PAD1, 8);
				}
				return createBytes(buffer, rsBlocks);
			};
			_this.addData = function(data) {
				var newData = qr8BitByte(data);
				_dataList.push(newData);
				_dataCache = null;
			};
			_this.isDark = function(row, col) {
				if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
					throw new Error(row + ',' + col);
				}
				return _modules[row][col];
			};
			_this.getModuleCount = function() {
				return _moduleCount;
			};
			_this.make = function() {
				makeImpl(false, getBestMaskPattern());
			};
			_this.createTableTag = function(cellSize, margin) {
				cellSize = cellSize || 2;
				margin = (typeof margin == 'undefined') ? cellSize * 4 : margin;
				var qrHtml = '';
				qrHtml += '<table style="';
				qrHtml += ' border-width: 0px; border-style: none;';
				qrHtml += ' border-collapse: collapse;';
				qrHtml += ' padding: 0px; margin: ' + margin + 'px;';
				qrHtml += '">';
				qrHtml += '<tbody>';
				for (var r = 0; r < _this.getModuleCount(); r += 1) {
					qrHtml += '<tr>';
					for (var c = 0; c < _this.getModuleCount(); c += 1) {
						qrHtml += '<td style="';
						qrHtml += ' border-width: 0px; border-style: none;';
						qrHtml += ' border-collapse: collapse;';
						qrHtml += ' padding: 0px; margin: 0px;';
						qrHtml += ' width: ' + cellSize + 'px;';
						qrHtml += ' height: ' + cellSize + 'px;';
						qrHtml += ' background-color: ';
						qrHtml += _this.isDark(r, c) ? '#000000' : '#ffffff';
						qrHtml += ';';
						qrHtml += '"/>';
					}
					qrHtml += '</tr>';
				}
				qrHtml += '</tbody>';
				qrHtml += '</table>';
				return qrHtml;
			};
			_this.createImgTag = function(cellSize, margin) {
				cellSize = cellSize || 4;
				margin = (typeof margin == 'undefined') ? cellSize * 4 : margin;
				var size = _this.getModuleCount() * cellSize + margin * 2;
				var min = margin;
				var max = size - margin;
				return createImgTag(size, size, function(x, y) {
					if (min <= x && x < max && min <= y && y < max) {
						var c = Math.floor((x - min) / cellSize);
						var r = Math.floor((y - min) / cellSize);
						return _this.isDark(r, c) ? 0 : 1;
					} else {
						return 1;
					}
				});
			};
			return _this;
		};
		//---------------------------------------------------------------------
		// qrcode.stringToBytes
		//---------------------------------------------------------------------
		qrcode.stringToBytes = function(s) {
			var bytes = new Array();
			for (var i = 0; i < s.length; i += 1) {
				var c = s.charCodeAt(i);
				bytes.push(c & 0xff);
			}
			return bytes;
		};
		//---------------------------------------------------------------------
		// qrcode.createStringToBytes
		//---------------------------------------------------------------------
		/**
		 * @param unicodeData base64 string of byte array.
		 * [16bit Unicode],[16bit Bytes], ...
		 * @param numChars
		 */
		qrcode.createStringToBytes = function(unicodeData, numChars) {
			// create conversion map.
			var unicodeMap = function() {
				var bin = base64DecodeInputStream(unicodeData);
				var read = function() {
					var b = bin.read();
					if (b == -1) throw new Error();
					return b;
				};
				var count = 0;
				var unicodeMap = {};
				while (true) {
					var b0 = bin.read();
					if (b0 == -1) break;
					var b1 = read();
					var b2 = read();
					var b3 = read();
					var k = String.fromCharCode((b0 << 8) | b1);
					var v = (b2 << 8) | b3;
					unicodeMap[k] = v;
					count += 1;
				}
				if (count != numChars) {
					throw new Error(count + ' != ' + numChars);
				}
				return unicodeMap;
			}();
			var unknownChar = '?'.charCodeAt(0);
			return function(s) {
				var bytes = new Array();
				for (var i = 0; i < s.length; i += 1) {
					var c = s.charCodeAt(i);
					if (c < 128) {
						bytes.push(c);
					} else {
						var b = unicodeMap[s.charAt(i)];
						if (typeof b == 'number') {
							if ((b & 0xff) == b) {
								// 1byte
								bytes.push(b);
							} else {
								// 2bytes
								bytes.push(b >>> 8);
								bytes.push(b & 0xff);
							}
						} else {
							bytes.push(unknownChar);
						}
					}
				}
				return bytes;
			};
		};
		//---------------------------------------------------------------------
		// QRMode
		//---------------------------------------------------------------------
		var QRMode = {
			MODE_NUMBER: 1 << 0,
			MODE_ALPHA_NUM: 1 << 1,
			MODE_8BIT_BYTE: 1 << 2,
			MODE_KANJI: 1 << 3
		};
		//---------------------------------------------------------------------
		// QRErrorCorrectLevel
		//---------------------------------------------------------------------
		var QRErrorCorrectLevel = {
			L: 1,
			M: 0,
			Q: 3,
			H: 2
		};
		//---------------------------------------------------------------------
		// QRMaskPattern
		//---------------------------------------------------------------------
		var QRMaskPattern = {
			PATTERN000: 0,
			PATTERN001: 1,
			PATTERN010: 2,
			PATTERN011: 3,
			PATTERN100: 4,
			PATTERN101: 5,
			PATTERN110: 6,
			PATTERN111: 7
		};
		//---------------------------------------------------------------------
		// QRUtil
		//---------------------------------------------------------------------
		var QRUtil = function() {
			var PATTERN_POSITION_TABLE = [
				[],
				[6, 18],
				[6, 22],
				[6, 26],
				[6, 30],
				[6, 34],
				[6, 22, 38],
				[6, 24, 42],
				[6, 26, 46],
				[6, 28, 50],
				[6, 30, 54],
				[6, 32, 58],
				[6, 34, 62],
				[6, 26, 46, 66],
				[6, 26, 48, 70],
				[6, 26, 50, 74],
				[6, 30, 54, 78],
				[6, 30, 56, 82],
				[6, 30, 58, 86],
				[6, 34, 62, 90],
				[6, 28, 50, 72, 94],
				[6, 26, 50, 74, 98],
				[6, 30, 54, 78, 102],
				[6, 28, 54, 80, 106],
				[6, 32, 58, 84, 110],
				[6, 30, 58, 86, 114],
				[6, 34, 62, 90, 118],
				[6, 26, 50, 74, 98, 122],
				[6, 30, 54, 78, 102, 126],
				[6, 26, 52, 78, 104, 130],
				[6, 30, 56, 82, 108, 134],
				[6, 34, 60, 86, 112, 138],
				[6, 30, 58, 86, 114, 142],
				[6, 34, 62, 90, 118, 146],
				[6, 30, 54, 78, 102, 126, 150],
				[6, 24, 50, 76, 102, 128, 154],
				[6, 28, 54, 80, 106, 132, 158],
				[6, 32, 58, 84, 110, 136, 162],
				[6, 26, 54, 82, 110, 138, 166],
				[6, 30, 58, 86, 114, 142, 170]
			];
			var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
			var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
			var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
			var _this = {};
			var getBCHDigit = function(data) {
				var digit = 0;
				while (data != 0) {
					digit += 1;
					data >>>= 1;
				}
				return digit;
			};
			_this.getBCHTypeInfo = function(data) {
				var d = data << 10;
				while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
					d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15)));
				}
				return ((data << 10) | d) ^ G15_MASK;
			};
			_this.getBCHTypeNumber = function(data) {
				var d = data << 12;
				while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
					d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18)));
				}
				return (data << 12) | d;
			};
			_this.getPatternPosition = function(typeNumber) {
				return PATTERN_POSITION_TABLE[typeNumber - 1];
			};
			_this.getMaskFunction = function(maskPattern) {
				switch (maskPattern) {
					case QRMaskPattern.PATTERN000:
						return function(i, j) {
							return (i + j) % 2 == 0;
						};
					case QRMaskPattern.PATTERN001:
						return function(i, j) {
							return i % 2 == 0;
						};
					case QRMaskPattern.PATTERN010:
						return function(i, j) {
							return j % 3 == 0;
						};
					case QRMaskPattern.PATTERN011:
						return function(i, j) {
							return (i + j) % 3 == 0;
						};
					case QRMaskPattern.PATTERN100:
						return function(i, j) {
							return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
						};
					case QRMaskPattern.PATTERN101:
						return function(i, j) {
							return (i * j) % 2 + (i * j) % 3 == 0;
						};
					case QRMaskPattern.PATTERN110:
						return function(i, j) {
							return ((i * j) % 2 + (i * j) % 3) % 2 == 0;
						};
					case QRMaskPattern.PATTERN111:
						return function(i, j) {
							return ((i * j) % 3 + (i + j) % 2) % 2 == 0;
						};
					default:
						throw new Error('bad maskPattern:' + maskPattern);
				}
			};
			_this.getErrorCorrectPolynomial = function(errorCorrectLength) {
				var a = qrPolynomial([1], 0);
				for (var i = 0; i < errorCorrectLength; i += 1) {
					a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
				}
				return a;
			};
			_this.getLengthInBits = function(mode, type) {
				if (1 <= type && type < 10) {
					// 1 - 9
					switch (mode) {
						case QRMode.MODE_NUMBER:
							return 10;
						case QRMode.MODE_ALPHA_NUM:
							return 9;
						case QRMode.MODE_8BIT_BYTE:
							return 8;
						case QRMode.MODE_KANJI:
							return 8;
						default:
							throw new Error('mode:' + mode);
					}
				} else if (type < 27) {
					// 10 - 26
					switch (mode) {
						case QRMode.MODE_NUMBER:
							return 12;
						case QRMode.MODE_ALPHA_NUM:
							return 11;
						case QRMode.MODE_8BIT_BYTE:
							return 16;
						case QRMode.MODE_KANJI:
							return 10;
						default:
							throw new Error('mode:' + mode);
					}
				} else if (type < 41) {
					// 27 - 40
					switch (mode) {
						case QRMode.MODE_NUMBER:
							return 14;
						case QRMode.MODE_ALPHA_NUM:
							return 13;
						case QRMode.MODE_8BIT_BYTE:
							return 16;
						case QRMode.MODE_KANJI:
							return 12;
						default:
							throw new Error('mode:' + mode);
					}
				} else {
					throw new Error('type:' + type);
				}
			};
			_this.getLostPoint = function(qrcode) {
				var moduleCount = qrcode.getModuleCount();
				var lostPoint = 0;
				// LEVEL1
				for (var row = 0; row < moduleCount; row += 1) {
					for (var col = 0; col < moduleCount; col += 1) {
						var sameCount = 0;
						var dark = qrcode.isDark(row, col);
						for (var r = -1; r <= 1; r += 1) {
							if (row + r < 0 || moduleCount <= row + r) {
								continue;
							}
							for (var c = -1; c <= 1; c += 1) {
								if (col + c < 0 || moduleCount <= col + c) {
									continue;
								}
								if (r == 0 && c == 0) {
									continue;
								}
								if (dark == qrcode.isDark(row + r, col + c)) {
									sameCount += 1;
								}
							}
						}
						if (sameCount > 5) {
							lostPoint += (3 + sameCount - 5);
						}
					}
				};
				// LEVEL2
				for (var row = 0; row < moduleCount - 1; row += 1) {
					for (var col = 0; col < moduleCount - 1; col += 1) {
						var count = 0;
						if (qrcode.isDark(row, col)) count += 1;
						if (qrcode.isDark(row + 1, col)) count += 1;
						if (qrcode.isDark(row, col + 1)) count += 1;
						if (qrcode.isDark(row + 1, col + 1)) count += 1;
						if (count == 0 || count == 4) {
							lostPoint += 3;
						}
					}
				}
				// LEVEL3
				for (var row = 0; row < moduleCount; row += 1) {
					for (var col = 0; col < moduleCount - 6; col += 1) {
						if (qrcode.isDark(row, col) && !qrcode.isDark(row, col + 1) && qrcode.isDark(row, col + 2) && qrcode.isDark(row, col + 3) && qrcode.isDark(row, col + 4) && !qrcode.isDark(row, col + 5) && qrcode.isDark(row, col + 6)) {
							lostPoint += 40;
						}
					}
				}
				for (var col = 0; col < moduleCount; col += 1) {
					for (var row = 0; row < moduleCount - 6; row += 1) {
						if (qrcode.isDark(row, col) && !qrcode.isDark(row + 1, col) && qrcode.isDark(row + 2, col) && qrcode.isDark(row + 3, col) && qrcode.isDark(row + 4, col) && !qrcode.isDark(row + 5, col) && qrcode.isDark(row + 6, col)) {
							lostPoint += 40;
						}
					}
				}
				// LEVEL4
				var darkCount = 0;
				for (var col = 0; col < moduleCount; col += 1) {
					for (var row = 0; row < moduleCount; row += 1) {
						if (qrcode.isDark(row, col)) {
							darkCount += 1;
						}
					}
				}
				var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
				lostPoint += ratio * 10;
				return lostPoint;
			};
			return _this;
		}();
		//---------------------------------------------------------------------
		// QRMath
		//---------------------------------------------------------------------
		var QRMath = function() {
			var EXP_TABLE = new Array(256);
			var LOG_TABLE = new Array(256);
			// initialize tables
			for (var i = 0; i < 8; i += 1) {
				EXP_TABLE[i] = 1 << i;
			}
			for (var i = 8; i < 256; i += 1) {
				EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
			}
			for (var i = 0; i < 255; i += 1) {
				LOG_TABLE[EXP_TABLE[i]] = i;
			}
			var _this = {};
			_this.glog = function(n) {
				if (n < 1) {
					throw new Error('glog(' + n + ')');
				}
				return LOG_TABLE[n];
			};
			_this.gexp = function(n) {
				while (n < 0) {
					n += 255;
				}
				while (n >= 256) {
					n -= 255;
				}
				return EXP_TABLE[n];
			};
			return _this;
		}();
		//---------------------------------------------------------------------
		// qrPolynomial
		//---------------------------------------------------------------------
		function qrPolynomial(num, shift) {
			if (typeof num.length == 'undefined') {
				throw new Error(num.length + '/' + shift);
			}
			var _num = function() {
				var offset = 0;
				while (offset < num.length && num[offset] == 0) {
					offset += 1;
				}
				var _num = new Array(num.length - offset + shift);
				for (var i = 0; i < num.length - offset; i += 1) {
					_num[i] = num[i + offset];
				}
				return _num;
			}();
			var _this = {};
			_this.get = function(index) {
				return _num[index];
			};
			_this.getLength = function() {
				return _num.length;
			};
			_this.multiply = function(e) {
				var num = new Array(_this.getLength() + e.getLength() - 1);
				for (var i = 0; i < _this.getLength(); i += 1) {
					for (var j = 0; j < e.getLength(); j += 1) {
						num[i + j] ^= QRMath.gexp(QRMath.glog(_this.get(i)) + QRMath.glog(e.get(j)));
					}
				}
				return qrPolynomial(num, 0);
			};
			_this.mod = function(e) {
				if (_this.getLength() - e.getLength() < 0) {
					return _this;
				}
				var ratio = QRMath.glog(_this.get(0)) - QRMath.glog(e.get(0));
				var num = new Array(_this.getLength());
				for (var i = 0; i < _this.getLength(); i += 1) {
					num[i] = _this.get(i);
				}
				for (var i = 0; i < e.getLength(); i += 1) {
					num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
				}
				// recursive call
				return qrPolynomial(num, 0).mod(e);
			};
			return _this;
		};
		//---------------------------------------------------------------------
		// QRRSBlock
		//---------------------------------------------------------------------
		var QRRSBlock = function() {
			var RS_BLOCK_TABLE = [
				// L
				// M
				// Q
				// H
				// 1
				[1, 26, 19],
				[1, 26, 16],
				[1, 26, 13],
				[1, 26, 9],
				// 2
				[1, 44, 34],
				[1, 44, 28],
				[1, 44, 22],
				[1, 44, 16],
				// 3
				[1, 70, 55],
				[1, 70, 44],
				[2, 35, 17],
				[2, 35, 13],
				// 4
				[1, 100, 80],
				[2, 50, 32],
				[2, 50, 24],
				[4, 25, 9],
				// 5
				[1, 134, 108],
				[2, 67, 43],
				[2, 33, 15, 2, 34, 16],
				[2, 33, 11, 2, 34, 12],
				// 6
				[2, 86, 68],
				[4, 43, 27],
				[4, 43, 19],
				[4, 43, 15],
				// 7
				[2, 98, 78],
				[4, 49, 31],
				[2, 32, 14, 4, 33, 15],
				[4, 39, 13, 1, 40, 14],
				// 8
				[2, 121, 97],
				[2, 60, 38, 2, 61, 39],
				[4, 40, 18, 2, 41, 19],
				[4, 40, 14, 2, 41, 15],
				// 9
				[2, 146, 116],
				[3, 58, 36, 2, 59, 37],
				[4, 36, 16, 4, 37, 17],
				[4, 36, 12, 4, 37, 13],
				// 10
				[2, 86, 68, 2, 87, 69],
				[4, 69, 43, 1, 70, 44],
				[6, 43, 19, 2, 44, 20],
				[6, 43, 15, 2, 44, 16],
				// 11
				[4, 101, 81],
				[1, 80, 50, 4, 81, 51],
				[4, 50, 22, 4, 51, 23],
				[3, 36, 12, 8, 37, 13],
				// 12
				[2, 116, 92, 2, 117, 93],
				[6, 58, 36, 2, 59, 37],
				[4, 46, 20, 6, 47, 21],
				[7, 42, 14, 4, 43, 15],
				// 13
				[4, 133, 107],
				[8, 59, 37, 1, 60, 38],
				[8, 44, 20, 4, 45, 21],
				[12, 33, 11, 4, 34, 12],
				// 14
				[3, 145, 115, 1, 146, 116],
				[4, 64, 40, 5, 65, 41],
				[11, 36, 16, 5, 37, 17],
				[11, 36, 12, 5, 37, 13],
				// 15
				[5, 109, 87, 1, 110, 88],
				[5, 65, 41, 5, 66, 42],
				[5, 54, 24, 7, 55, 25],
				[11, 36, 12],
				// 16
				[5, 122, 98, 1, 123, 99],
				[7, 73, 45, 3, 74, 46],
				[15, 43, 19, 2, 44, 20],
				[3, 45, 15, 13, 46, 16],
				// 17
				[1, 135, 107, 5, 136, 108],
				[10, 74, 46, 1, 75, 47],
				[1, 50, 22, 15, 51, 23],
				[2, 42, 14, 17, 43, 15],
				// 18
				[5, 150, 120, 1, 151, 121],
				[9, 69, 43, 4, 70, 44],
				[17, 50, 22, 1, 51, 23],
				[2, 42, 14, 19, 43, 15],
				// 19
				[3, 141, 113, 4, 142, 114],
				[3, 70, 44, 11, 71, 45],
				[17, 47, 21, 4, 48, 22],
				[9, 39, 13, 16, 40, 14],
				// 20
				[3, 135, 107, 5, 136, 108],
				[3, 67, 41, 13, 68, 42],
				[15, 54, 24, 5, 55, 25],
				[15, 43, 15, 10, 44, 16],
				// 21
				[4, 144, 116, 4, 145, 117],
				[17, 68, 42],
				[17, 50, 22, 6, 51, 23],
				[19, 46, 16, 6, 47, 17],
				// 22
				[2, 139, 111, 7, 140, 112],
				[17, 74, 46],
				[7, 54, 24, 16, 55, 25],
				[34, 37, 13],
				// 23
				[4, 151, 121, 5, 152, 122],
				[4, 75, 47, 14, 76, 48],
				[11, 54, 24, 14, 55, 25],
				[16, 45, 15, 14, 46, 16],
				// 24
				[6, 147, 117, 4, 148, 118],
				[6, 73, 45, 14, 74, 46],
				[11, 54, 24, 16, 55, 25],
				[30, 46, 16, 2, 47, 17],
				// 25
				[8, 132, 106, 4, 133, 107],
				[8, 75, 47, 13, 76, 48],
				[7, 54, 24, 22, 55, 25],
				[22, 45, 15, 13, 46, 16],
				// 26
				[10, 142, 114, 2, 143, 115],
				[19, 74, 46, 4, 75, 47],
				[28, 50, 22, 6, 51, 23],
				[33, 46, 16, 4, 47, 17],
				// 27
				[8, 152, 122, 4, 153, 123],
				[22, 73, 45, 3, 74, 46],
				[8, 53, 23, 26, 54, 24],
				[12, 45, 15, 28, 46, 16],
				// 28
				[3, 147, 117, 10, 148, 118],
				[3, 73, 45, 23, 74, 46],
				[4, 54, 24, 31, 55, 25],
				[11, 45, 15, 31, 46, 16],
				// 29
				[7, 146, 116, 7, 147, 117],
				[21, 73, 45, 7, 74, 46],
				[1, 53, 23, 37, 54, 24],
				[19, 45, 15, 26, 46, 16],
				// 30
				[5, 145, 115, 10, 146, 116],
				[19, 75, 47, 10, 76, 48],
				[15, 54, 24, 25, 55, 25],
				[23, 45, 15, 25, 46, 16],
				// 31
				[13, 145, 115, 3, 146, 116],
				[2, 74, 46, 29, 75, 47],
				[42, 54, 24, 1, 55, 25],
				[23, 45, 15, 28, 46, 16],
				// 32
				[17, 145, 115],
				[10, 74, 46, 23, 75, 47],
				[10, 54, 24, 35, 55, 25],
				[19, 45, 15, 35, 46, 16],
				// 33
				[17, 145, 115, 1, 146, 116],
				[14, 74, 46, 21, 75, 47],
				[29, 54, 24, 19, 55, 25],
				[11, 45, 15, 46, 46, 16],
				// 34
				[13, 145, 115, 6, 146, 116],
				[14, 74, 46, 23, 75, 47],
				[44, 54, 24, 7, 55, 25],
				[59, 46, 16, 1, 47, 17],
				// 35
				[12, 151, 121, 7, 152, 122],
				[12, 75, 47, 26, 76, 48],
				[39, 54, 24, 14, 55, 25],
				[22, 45, 15, 41, 46, 16],
				// 36
				[6, 151, 121, 14, 152, 122],
				[6, 75, 47, 34, 76, 48],
				[46, 54, 24, 10, 55, 25],
				[2, 45, 15, 64, 46, 16],
				// 37
				[17, 152, 122, 4, 153, 123],
				[29, 74, 46, 14, 75, 47],
				[49, 54, 24, 10, 55, 25],
				[24, 45, 15, 46, 46, 16],
				// 38
				[4, 152, 122, 18, 153, 123],
				[13, 74, 46, 32, 75, 47],
				[48, 54, 24, 14, 55, 25],
				[42, 45, 15, 32, 46, 16],
				// 39
				[20, 147, 117, 4, 148, 118],
				[40, 75, 47, 7, 76, 48],
				[43, 54, 24, 22, 55, 25],
				[10, 45, 15, 67, 46, 16],
				// 40
				[19, 148, 118, 6, 149, 119],
				[18, 75, 47, 31, 76, 48],
				[34, 54, 24, 34, 55, 25],
				[20, 45, 15, 61, 46, 16]
			];
			var qrRSBlock = function(totalCount, dataCount) {
				var _this = {};
				_this.totalCount = totalCount;
				_this.dataCount = dataCount;
				return _this;
			};
			var _this = {};
			var getRsBlockTable = function(typeNumber, errorCorrectLevel) {
				switch (errorCorrectLevel) {
					case QRErrorCorrectLevel.L:
						return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
					case QRErrorCorrectLevel.M:
						return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
					case QRErrorCorrectLevel.Q:
						return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
					case QRErrorCorrectLevel.H:
						return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
					default:
						return undefined;
				}
			};
			_this.getRSBlocks = function(typeNumber, errorCorrectLevel) {
				var rsBlock = getRsBlockTable(typeNumber, errorCorrectLevel);
				if (typeof rsBlock == 'undefined') {
					throw new Error('bad rs block @ typeNumber:' + typeNumber +
						'/errorCorrectLevel:' + errorCorrectLevel);
				}
				var length = rsBlock.length / 3;
				var list = new Array();
				for (var i = 0; i < length; i += 1) {
					var count = rsBlock[i * 3 + 0];
					var totalCount = rsBlock[i * 3 + 1];
					var dataCount = rsBlock[i * 3 + 2];
					for (var j = 0; j < count; j += 1) {
						list.push(qrRSBlock(totalCount, dataCount));
					}
				}
				return list;
			};
			return _this;
		}();
		//---------------------------------------------------------------------
		// qrBitBuffer
		//---------------------------------------------------------------------
		var qrBitBuffer = function() {
			var _buffer = new Array();
			var _length = 0;
			var _this = {};
			_this.getBuffer = function() {
				return _buffer;
			};
			_this.get = function(index) {
				var bufIndex = Math.floor(index / 8);
				return ((_buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1;
			};
			_this.put = function(num, length) {
				for (var i = 0; i < length; i += 1) {
					_this.putBit(((num >>> (length - i - 1)) & 1) == 1);
				}
			};
			_this.getLengthInBits = function() {
				return _length;
			};
			_this.putBit = function(bit) {
				var bufIndex = Math.floor(_length / 8);
				if (_buffer.length <= bufIndex) {
					_buffer.push(0);
				}
				if (bit) {
					_buffer[bufIndex] |= (0x80 >>> (_length % 8));
				}
				_length += 1;
			};
			return _this;
		};
		//---------------------------------------------------------------------
		// qr8BitByte
		//---------------------------------------------------------------------
		var qr8BitByte = function(data) {
			var _mode = QRMode.MODE_8BIT_BYTE;
			var _data = data;
			var _bytes = qrcode.stringToBytes(data);
			var _this = {};
			_this.getMode = function() {
				return _mode;
			};
			_this.getLength = function(buffer) {
				return _bytes.length;
			};
			_this.write = function(buffer) {
				for (var i = 0; i < _bytes.length; i += 1) {
					buffer.put(_bytes[i], 8);
				}
			};
			return _this;
		};
		//=====================================================================
		// GIF Support etc.
		//
		//---------------------------------------------------------------------
		// byteArrayOutputStream
		//---------------------------------------------------------------------
		var byteArrayOutputStream = function() {
			var _bytes = new Array();
			var _this = {};
			_this.writeByte = function(b) {
				_bytes.push(b & 0xff);
			};
			_this.writeShort = function(i) {
				_this.writeByte(i);
				_this.writeByte(i >>> 8);
			};
			_this.writeBytes = function(b, off, len) {
				off = off || 0;
				len = len || b.length;
				for (var i = 0; i < len; i += 1) {
					_this.writeByte(b[i + off]);
				}
			};
			_this.writeString = function(s) {
				for (var i = 0; i < s.length; i += 1) {
					_this.writeByte(s.charCodeAt(i));
				}
			};
			_this.toByteArray = function() {
				return _bytes;
			};
			_this.toString = function() {
				var s = '';
				s += '[';
				for (var i = 0; i < _bytes.length; i += 1) {
					if (i > 0) {
						s += ',';
					}
					s += _bytes[i];
				}
				s += ']';
				return s;
			};
			return _this;
		};
		//---------------------------------------------------------------------
		// base64EncodeOutputStream
		//---------------------------------------------------------------------
		var base64EncodeOutputStream = function() {
			var _buffer = 0;
			var _buflen = 0;
			var _length = 0;
			var _base64 = '';
			var _this = {};
			var writeEncoded = function(b) {
				_base64 += String.fromCharCode(encode(b & 0x3f));
			};
			var encode = function(n) {
				if (n < 0) {
					// error.
				} else if (n < 26) {
					return 0x41 + n;
				} else if (n < 52) {
					return 0x61 + (n - 26);
				} else if (n < 62) {
					return 0x30 + (n - 52);
				} else if (n == 62) {
					return 0x2b;
				} else if (n == 63) {
					return 0x2f;
				}
				throw new Error('n:' + n);
			};
			_this.writeByte = function(n) {
				_buffer = (_buffer << 8) | (n & 0xff);
				_buflen += 8;
				_length += 1;
				while (_buflen >= 6) {
					writeEncoded(_buffer >>> (_buflen - 6));
					_buflen -= 6;
				}
			};
			_this.flush = function() {
				if (_buflen > 0) {
					writeEncoded(_buffer << (6 - _buflen));
					_buffer = 0;
					_buflen = 0;
				}
				if (_length % 3 != 0) {
					// padding
					var padlen = 3 - _length % 3;
					for (var i = 0; i < padlen; i += 1) {
						_base64 += '=';
					}
				}
			};
			_this.toString = function() {
				return _base64;
			};
			return _this;
		};
		//---------------------------------------------------------------------
		// base64DecodeInputStream
		//---------------------------------------------------------------------
		var base64DecodeInputStream = function(str) {
			var _str = str;
			var _pos = 0;
			var _buffer = 0;
			var _buflen = 0;
			var _this = {};
			_this.read = function() {
				while (_buflen < 8) {
					if (_pos >= _str.length) {
						if (_buflen == 0) {
							return -1;
						}
						throw new Error('unexpected end of file./' + _buflen);
					}
					var c = _str.charAt(_pos);
					_pos += 1;
					if (c == '=') {
						_buflen = 0;
						return -1;
					} else if (c.match(/^\s$/)) {
						// ignore if whitespace.
						continue;
					}
					_buffer = (_buffer << 6) | decode(c.charCodeAt(0));
					_buflen += 6;
				}
				var n = (_buffer >>> (_buflen - 8)) & 0xff;
				_buflen -= 8;
				return n;
			};
			var decode = function(c) {
				if (0x41 <= c && c <= 0x5a) {
					return c - 0x41;
				} else if (0x61 <= c && c <= 0x7a) {
					return c - 0x61 + 26;
				} else if (0x30 <= c && c <= 0x39) {
					return c - 0x30 + 52;
				} else if (c == 0x2b) {
					return 62;
				} else if (c == 0x2f) {
					return 63;
				} else {
					throw new Error('c:' + c);
				}
			};
			return _this;
		};
		//---------------------------------------------------------------------
		// gifImage (B/W)
		//---------------------------------------------------------------------
		var gifImage = function(width, height) {
			var _width = width;
			var _height = height;
			var _data = new Array(width * height);
			var _this = {};
			_this.setPixel = function(x, y, pixel) {
				_data[y * _width + x] = pixel;
			};
			_this.write = function(out) {
				//---------------------------------
				// GIF Signature
				out.writeString('GIF87a');
				//---------------------------------
				// Screen Descriptor
				out.writeShort(_width);
				out.writeShort(_height);
				out.writeByte(0x80); // 2bit
				out.writeByte(0);
				out.writeByte(0);
				//---------------------------------
				// Global Color Map
				// black
				out.writeByte(0x00);
				out.writeByte(0x00);
				out.writeByte(0x00);
				// white
				out.writeByte(0xff);
				out.writeByte(0xff);
				out.writeByte(0xff);
				//---------------------------------
				// Image Descriptor
				out.writeString(',');
				out.writeShort(0);
				out.writeShort(0);
				out.writeShort(_width);
				out.writeShort(_height);
				out.writeByte(0);
				//---------------------------------
				// Local Color Map
				//---------------------------------
				// Raster Data
				var lzwMinCodeSize = 2;
				var raster = getLZWRaster(lzwMinCodeSize);
				out.writeByte(lzwMinCodeSize);
				var offset = 0;
				while (raster.length - offset > 255) {
					out.writeByte(255);
					out.writeBytes(raster, offset, 255);
					offset += 255;
				}
				out.writeByte(raster.length - offset);
				out.writeBytes(raster, offset, raster.length - offset);
				out.writeByte(0x00);
				//---------------------------------
				// GIF Terminator
				out.writeString(';');
			};
			var bitOutputStream = function(out) {
				var _out = out;
				var _bitLength = 0;
				var _bitBuffer = 0;
				var _this = {};
				_this.write = function(data, length) {
					if ((data >>> length) != 0) {
						throw new Error('length over');
					}
					while (_bitLength + length >= 8) {
						_out.writeByte(0xff & ((data << _bitLength) | _bitBuffer));
						length -= (8 - _bitLength);
						data >>>= (8 - _bitLength);
						_bitBuffer = 0;
						_bitLength = 0;
					}
					_bitBuffer = (data << _bitLength) | _bitBuffer;
					_bitLength = _bitLength + length;
				};
				_this.flush = function() {
					if (_bitLength > 0) {
						_out.writeByte(_bitBuffer);
					}
				};
				return _this;
			};
			var getLZWRaster = function(lzwMinCodeSize) {
				var clearCode = 1 << lzwMinCodeSize;
				var endCode = (1 << lzwMinCodeSize) + 1;
				var bitLength = lzwMinCodeSize + 1;
				// Setup LZWTable
				var table = lzwTable();
				for (var i = 0; i < clearCode; i += 1) {
					table.add(String.fromCharCode(i));
				}
				table.add(String.fromCharCode(clearCode));
				table.add(String.fromCharCode(endCode));
				var byteOut = byteArrayOutputStream();
				var bitOut = bitOutputStream(byteOut);
				// clear code
				bitOut.write(clearCode, bitLength);
				var dataIndex = 0;
				var s = String.fromCharCode(_data[dataIndex]);
				dataIndex += 1;
				while (dataIndex < _data.length) {
					var c = String.fromCharCode(_data[dataIndex]);
					dataIndex += 1;
					if (table.contains(s + c)) {
						s = s + c;
					} else {
						bitOut.write(table.indexOf(s), bitLength);
						if (table.size() < 0xfff) {
							if (table.size() == (1 << bitLength)) {
								bitLength += 1;
							}
							table.add(s + c);
						}
						s = c;
					}
				}
				bitOut.write(table.indexOf(s), bitLength);
				// end code
				bitOut.write(endCode, bitLength);
				bitOut.flush();
				return byteOut.toByteArray();
			};
			var lzwTable = function() {
				var _map = {};
				var _size = 0;
				var _this = {};
				_this.add = function(key) {
					if (_this.contains(key)) {
						throw new Error('dup key:' + key);
					}
					_map[key] = _size;
					_size += 1;
				};
				_this.size = function() {
					return _size;
				};
				_this.indexOf = function(key) {
					return _map[key];
				};
				_this.contains = function(key) {
					return typeof _map[key] != 'undefined';
				};
				return _this;
			};
			return _this;
		};
		var createImgTag = function(width, height, getPixel, alt) {
			var gif = gifImage(width, height);
			for (var y = 0; y < height; y += 1) {
				for (var x = 0; x < width; x += 1) {
					gif.setPixel(x, y, getPixel(x, y));
				}
			}
			var b = byteArrayOutputStream();
			gif.write(b);
			var base64 = base64EncodeOutputStream();
			var bytes = b.toByteArray();
			for (var i = 0; i < bytes.length; i += 1) {
				base64.writeByte(bytes[i]);
			}
			base64.flush();
			var img = '';
			img += 'data:image/gif;base64,';
			img += base64;

			return img;
		};
		//---------------------------------------------------------------------
		// returns qrcode function.
		return qrcode;
	}();

	function log(str) {
		Application.console.log("[QRCreator] " + Array.slice(arguments));
	}

	function $(id, doc) {
		doc = doc || document;
		return doc.getElementById(id);
	}

	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}

	function addStyle(css) {
		var pi = document.createProcessingInstruction(
			'xml-stylesheet',
			'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"');
		return document.insertBefore(pi, document.documentElement);
	}

	function alert(aString, aTitle) {
		Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService)
			.showAlertNotification("", aTitle || "QR", aString, false, "", null);
	}

	function cutString(str, len) {
		if (str.length > len) return str.substr(0, len) + "...";
		else return str;
	}

	QRCreator.init();
	window.QRCreator = QRCreator;
})();