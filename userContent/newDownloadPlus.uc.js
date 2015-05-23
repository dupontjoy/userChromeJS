// ==UserScript==
// @name	newDownloadPlus.uc.js
// @description	从硬盘中删除+下载重命名并可转码+双击复制链接+另存为+保存并打开+完成下载提示音+自动关闭下载产生的空白标签。
// @author	Kelo 再次修改整合  (w13998686967、ywzhaiqi、黒仪大螃蟹、Alice0775、紫云飞)
// @charset	UTF-8
// @include	chrome://browser/content/browser.xul
// @include	chrome://browser/content/places/places.xul
// @include	chrome://mozapps/content/downloads/unknownContentType.xul
// @include	chrome://mozapps/content/downloads/downloads.xul
// @inspect	window.downloadPlus
// @startup	window.downloadPlus.init();
// @shutdown	window.downloadPlus.onDestroy();
// @optionsURL	about:config?filter=userChromeJS.downloadPlus.
// @config	window.downloadPlus.openPref();
// @version	2015.05.09 优化代码，新增"Hash 计算功能"
// @version	2015.05.07 使用黒仪大螃蟹的最新"从硬盘中删除"代码  增加"下载面板显示下载速度"功能
// @version	2015.05.03 修复一些Bug，脚本开关无需重启了
// @version	2015.05.02 修复多个功能，完美支持FFV38，完善UI设置界面。增加N个功能
// @version	2015.05.01 修复多个功能，增加UI设置界面
// @version	2014.11.02 增加多个功能
// @version	2014.06.06 add delay to fix for new userChrome.js
// @note	设置菜单在菜单栏里，id为downloadPlus_set。
// ==/UserScript==
(function() {
	let { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;
	if (window.downloadPlus) {
		window.downloadPlus.onDestroy();
		delete window.downloadPlus;
	}
	if (!window.Services) Cu.import("resource://gre/modules/Services.jsm");
	if (!window.DownloadUtils) Cu.import("resource://gre/modules/DownloadUtils.jsm");

	var downloadPlus = {
		get prefs() {
			delete this.prefs;
			return this.prefs = Services.prefs.getBranch("userChromeJS.downloadPlus.");
		},
		get Window() Services.wm.getMostRecentWindow("downloadPlus:Preferences"),
		get mainwin() Services.wm.getMostRecentWindow("navigator:browser"),
		get appVersion() Services.appinfo.version.split(".")[0],

		init: function() {
			if (location.href == "chrome://browser/content/browser.xul") {
				var ins = $("devToolsSeparator", this.mainwin.document);
				ins.parentNode.insertBefore($C("menuitem", {
					id: "downloadPlus_set",
					label: "downloadPlus 配置",
					oncommand: "downloadPlus.openPref();",
					class: "menuitem-iconic",
				}), ins);
				this.prefs.addObserver('', this.PrefsObs, false);
				this.loadDefault();
			}
			this.loadSetting();
			window.addEventListener("unload", function() {
				downloadPlus.onDestroy();
			}, false);
		},

		onDestroy: function() {
			if ($("downloadPlus_set")) $("downloadPlus_set").parentNode.removeChild($("downloadPlus_set"));
			this.prefs.removeObserver('', this.PrefsObs, false);
			if (this.Window) this.Window.close();
			Services.obs.notifyObservers(null, "startupcache-invalidate", "");
		},

		PrefsObs: function(subject, topic, data) {
			if (topic == 'nsPref:changed') {
				switch (data) {
					case 'new_Download':
					case 'new_Download_popups':
					case 'downloadsPanel_removeFile':
					case 'downloadSound_Play':
					case 'downloadFileSize':
					case 'autoClose_blankTab':
					case 'save_And_Open':
					case 'save_And_Open_RorL':
					case 'download_speed':
					case 'download_checksum':
					case 'download_dialog_changeName':
					case 'download_dialog_changeName_encodingConvert':
					case 'download_dialog_changeName_locking':
					case 'download_dialog_saveas':
					case 'download_dialog_saveas_dir':
					case 'download_dialog_saveTo':
					case 'download_dialog_saveTo_suffix':
					case 'download_dialog_showCompleteURL':
					case 'download_dialog_doubleclicksaveL':
					case 'download_dialog_doubleclickanyW':
						downloadPlus.loadSetting(data);
						break;
				}
			}
		},

		loadDefault: function() {
			this.Default_DownloadUtils_convertByteUnits = DownloadUtils.convertByteUnits;
			this.Default_gBrowser_mTabProgressListener = gBrowser.mTabProgressListener.toString();
			this.Default_DownloadsViewItem_prototype_update = (DownloadsViewItem.prototype._updateStatusLine || DownloadsViewItem.prototype._updateProgress).toString();
		},

		loadSetting: function(type) {
			var self = this;
			if (!type || type === "new_Download_popups") {
				this.new_Download_popups = self.getPrefs(0, "new_Download_popups", false);
			}
			if (!type || type === "download_dialog_changeName_encodingConvert") {
				this.download_dialog_changeName_encodingConvert = self.getPrefs(0, "download_dialog_changeName_encodingConvert", false);
			}
			if (!type || type === "download_dialog_changeName_locking") {
				this.download_dialog_changeName_locking = self.getPrefs(0, "download_dialog_changeName_locking", false);
			}
			if (!type || type === "download_dialog_doubleclickanyW") {
				this.download_dialog_doubleclickanyW = self.getPrefs(0, "download_dialog_doubleclickanyW", false);
			}
			if (!type || type === "download_dialog_saveTo_suffix") {
				this.download_dialog_saveTo_suffix = self.getPrefs(1, "download_dialog_saveTo_suffix", 0);
			}
			if (!type || type === "save_And_Open_RorL") {
				this.save_And_Open_RorL = self.getPrefs(1, "save_And_Open_RorL", 0);
			}
			if (!type || type === "download_dialog_saveas_dir") {
				// this.PrefStrTrim("download_dialog_saveas_dir", "['C:\\Users\\Administrator\\Downloads\\压缩', '压缩'], ['F:\\软件相关', '软件'], ['C:\\Users\\Administrator\\Downloads\\文档', '文档'], ['C:\\Users\\Administrator\\Downloads\\音乐', '歌曲'],['C:\\Users\\Administrator\\Downloads\\其他', '其他']");
			}

			switch (location.href) {
				case "chrome://browser/content/browser.xul":
					setTimeout(function() {
						if (!type || type === "new_Download") {
							self.new_Download(self.getPrefs(0, "new_Download", false));
						}
						if (!type || type === "downloadsPanel_removeFile") {
							self.downloadsPanel_removeFile(self.getPrefs(0, "downloadsPanel_removeFile", false))
						}
						if (!type || type === "downloadSound_Play") {
							self.downloadSound_Play(self.getPrefs(0, "downloadSound_Play", false));
						}
						if (!type || type === "downloadFileSize") {
							self.downloadFileSize(self.getPrefs(0, "downloadFileSize", false));
						}
						if (!type || type === "autoClose_blankTab") {
							self.autoClose_blankTab(self.getPrefs(0, "autoClose_blankTab", false));
						}
						if (!type || type === "save_And_Open") {
							self.saveAndOpen_on_main(self.getPrefs(0, "save_And_Open", false));
						}
						if (!type || type === "download_dialog_changeName") {
							self.download_dialog_changeName_on_main(self.getPrefs(0, "download_dialog_changeName", false));
						}
						if (!type || type === "download_speed") {
							self.download_speed(self.getPrefs(0, "download_speed", false));
						}
						if (!type || type === "download_checksum") {
							self.download_checksum(self.getPrefs(0, "download_checksum", false));
						}
					}, 200);
					break;
				case "chrome://mozapps/content/downloads/unknownContentType.xul":
					setTimeout(function() {
						if (!type || type === "save_And_Open") {
							self.save_And_Open(self.getPrefs(0, "save_And_Open", false));
						}
						if (!type || type === "download_dialog_changeName") {
							self.download_dialog_changeName(self.getPrefs(0, "download_dialog_changeName", false));
						}
						if (!type || type === "download_dialog_saveas") {
							self.download_dialog_saveas(self.getPrefs(0, "download_dialog_saveas", false));
						}
						if (!type || type === "download_dialog_saveTo") {
							self.download_dialog_saveTo(self.getPrefs(0, "download_dialog_saveTo", false));
						}
						if (!type || type === "download_dialog_showCompleteURL") {
							self.download_dialog_showCompleteURL(self.getPrefs(0, "download_dialog_showCompleteURL", false));
						}
						if (!type || type === "download_dialog_doubleclicksaveL") {
							self.download_dialog_doubleclicksaveL(self.getPrefs(0, "download_dialog_doubleclicksaveL", false));
						}
						window.sizeToContent(); // 下载弹出窗口大小自适应(确保在添加的按钮之后加载)
					}, 200);
					break;
				case "chrome://browser/content/places/places.xul":
					setTimeout(function() {
						if (!type || type === "new_Download") {
							self.new_Download(self.getPrefs(0, "new_Download", false));
						}
						if (!type || type === "downloadsPanel_removeFile") {
							self.downloadsPanel_removeFile(self.getPrefs(0, "downloadsPanel_removeFile", false));
						}
						if (!type || type === "download_checksum") {
							self.download_checksum(self.getPrefs(0, "download_checksum", false));
						}
					}, 200);
					break;
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

		openPref: function() {
			if (this.Window)
				this.Window.focus();
			else {
				var option = this.option();
				window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8," + option, '', 'chrome,titlebar,toolbar,centerscreen,dialog=no');
			}
		},

		option: function() {
			xul = '<?xml version="1.0"?><?xml-stylesheet href="chrome://global/skin/" type="text/css"?>\
					<prefwindow xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"\
					id="downloadPlus_Settings"\
					ignorekeys="true"\
					title="downloadPlus 配置"\
					onload="changeStatus();"\
					buttons="accept,cancel,extra1,extra2"\
					ondialogextra1="Resets(false);"\
					ondialogextra2="Resets(true);"\
					windowtype="downloadPlus:Preferences">\
					<prefpane id="main" flex="1">\
						<preferences>\
							<preference id="new_Download" type="bool" name="userChromeJS.downloadPlus.new_Download"/>\
							<preference id="new_Download_popups" type="bool" name="userChromeJS.downloadPlus.new_Download_popups"/>\
							<preference id="downloadsPanel_removeFile" type="bool" name="userChromeJS.downloadPlus.downloadsPanel_removeFile"/>\
							<preference id="downloadSound_Play" type="bool" name="userChromeJS.downloadPlus.downloadSound_Play"/>\
							<preference id="downloadFileSize" type="bool" name="userChromeJS.downloadPlus.downloadFileSize"/>\
							<preference id="autoClose_blankTab" type="bool" name="userChromeJS.downloadPlus.autoClose_blankTab"/>\
							<preference id="save_And_Open" type="bool" name="userChromeJS.downloadPlus.save_And_Open"/>\
							<preference id="save_And_Open_RorL" type="int" name="userChromeJS.downloadPlus.save_And_Open_RorL"/>\
							<preference id="download_speed" type="bool" name="userChromeJS.downloadPlus.download_speed"/>\
							<preference id="download_checksum" type="bool" name="userChromeJS.downloadPlus.download_checksum"/>\
							<preference id="download_dialog_changeName" type="bool" name="userChromeJS.downloadPlus.download_dialog_changeName"/>\
							<preference id="download_dialog_changeName_encodingConvert" type="bool" name="userChromeJS.downloadPlus.download_dialog_changeName_encodingConvert"/>\
							<preference id="download_dialog_changeName_locking" type="bool" name="userChromeJS.downloadPlus.download_dialog_changeName_locking"/>\
							<preference id="download_dialog_saveas" type="bool" name="userChromeJS.downloadPlus.download_dialog_saveas"/>\
							<preference id="download_dialog_saveTo" type="bool" name="userChromeJS.downloadPlus.download_dialog_saveTo"/>\
							<preference id="download_dialog_saveTo_suffix" type="int" name="userChromeJS.downloadPlus.download_dialog_saveTo_suffix"/>\
							<preference id="download_dialog_showCompleteURL" type="bool" name="userChromeJS.downloadPlus.download_dialog_showCompleteURL"/>\
							<preference id="download_dialog_doubleclicksaveL" type="bool" name="userChromeJS.downloadPlus.download_dialog_doubleclicksaveL"/>\
							<preference id="download_dialog_doubleclickanyW" type="bool" name="userChromeJS.downloadPlus.download_dialog_doubleclickanyW"/>\
						</preferences>\
						<script>\
							function Resets(aBool) {\
								$("new_Download").value = aBool;\
								$("new_Download_popups").value = aBool;\
								$("downloadsPanel_removeFile").value = aBool;\
								$("downloadSound_Play").value = aBool;\
								$("downloadFileSize").value = aBool;\
								$("autoClose_blankTab").value = aBool;\
								$("save_And_Open").value = aBool;\
								$("save_And_Open_RorL").value = aBool ? 1 : 0;\
								$("download_speed").value = aBool;\
								$("download_checksum").value = aBool;\
								$("download_dialog_changeName").value = aBool;\
								$("download_dialog_changeName_encodingConvert").value = aBool;\
								$("download_dialog_changeName_locking").value = aBool;\
								$("download_dialog_saveas").value = aBool;\
								$("download_dialog_saveTo").value = aBool;\
								$("download_dialog_saveTo_suffix").value = aBool ? 1 : 0;\
								$("download_dialog_showCompleteURL").value = aBool;\
								$("download_dialog_doubleclicksaveL").value = aBool;\
								$("download_dialog_doubleclickanyW").value = aBool;\
							}\
							function changeStatus() {\
								$("new_Download_popups").disabled = !($("new_Download").value);\
								$("download_dialog_changeName_encodingConvert").disabled = $("download_dialog_changeName_locking").disabled = !($("download_dialog_changeName").value);\
								$("download_dialog_saveTo_suffix").disabled = !($("download_dialog_saveTo").value);\
								$("save_And_Open_RorL").disabled =  !($("save_And_Open").value);\
							}\
							function _changeStatus(event) {\
								switch(event.target.id){\
									case "new_Download": \
									$("new_Download_popups").disabled = ($("new_Download").value);\
									break;\
									case "download_dialog_changeName":\
									$("download_dialog_changeName_encodingConvert").disabled = $("download_dialog_changeName_locking").disabled = ($("download_dialog_changeName").value);\
									break;\
									case "download_dialog_saveTo":\
									$("download_dialog_saveTo_suffix").disabled = ($("download_dialog_saveTo").value);\
									break;\
									case "save_And_Open":\
									$("save_And_Open_RorL").disabled = ($("save_And_Open").value);\
									break;\
								}\
							}\
							function $(id) document.getElementById(id);\
						</script>\
						<groupbox>\
							<caption label="主界面"/>\
							<checkbox id="downloadSound_Play" label="下载完成提示音" preference="downloadSound_Play"/>\
							<checkbox id="downloadFileSize" label="精确显示文件大小" preference="downloadFileSize"/>\
							<checkbox id="autoClose_blankTab" label="自动关闭下载产生的空白标签" preference="autoClose_blankTab"/>\
							<checkbox id="download_speed" label="下载面板显示下载速度" preference="download_speed"/>\
						</groupbox>\
						<groupbox>\
							<caption label="下载界面"/>\
							<checkbox id="download_dialog_saveas" label="另存为" preference="download_dialog_saveas"/>\
							<hbox align="center">\
							            <checkbox id="download_dialog_saveTo" label="保存到" oncommand="_changeStatus(event)" preference="download_dialog_saveTo"/>\
							            <label value="后缀样式："/>\
							            <menulist preference="download_dialog_saveTo_suffix" id="download_dialog_saveTo_suffix" style="width:220px">\
								            <menupopup>\
									            <menuitem label="样式：如downloadPlus.uc.js(1).7z" value="0"/>\
									            <menuitem label="样式：如downloadPlus.uc.js-1.7z" value="1"/>\
								            </menupopup>\
							            </menulist>\
							</hbox>\
							<checkbox id="download_dialog_showCompleteURL" label="下载弹出窗口双击链接复制完整链接" preference="download_dialog_showCompleteURL"/>\
							<checkbox id="download_dialog_doubleclicksaveL" label="下载弹出窗口双击保存文件项执行下载" preference="download_dialog_doubleclicksaveL"/>\
						            <checkbox id="download_dialog_doubleclickanyW" label="下载弹出窗口任何地方双击执行下载" preference="download_dialog_doubleclickanyW"/>\
						</groupbox>\
						<groupbox>\
							<caption label="其他"/>\
							<checkbox id="new_Download" label="新建下载 （主界面、我的足迹）"  tooltiptext="修改暂时需重启生效，很快会更新" oncommand="_changeStatus(event)" preference="new_Download"/>\
							<hbox align="center" class="indent">\
							            <checkbox align="center" id="new_Download_popups" label="是否弹窗"  preference="new_Download_popups"/>\
							</hbox>\
							<checkbox id="downloadsPanel_removeFile" label="从硬盘中删除 （主界面、我的足迹）" tooltiptext="修改暂时需重启生效，很快会更新" preference="downloadsPanel_removeFile"/>\
							<checkbox id="download_checksum" label="Hash 计算（主界面、我的足迹）" preference="download_checksum"/>\
							<hbox align="center">\
							            <checkbox id="save_And_Open" label="保存并打开（主界面、下载界面）" tooltiptext="修改暂时需重启生效，很快会更新" oncommand="_changeStatus(event)" preference="save_And_Open"/>\
							            <label value="打开方式："/>\
							            <menulist preference="save_And_Open_RorL" id="save_And_Open_RorL" style="width:120px">\
								            <menupopup>\
									            <menuitem label="打开所在文件夹" value="0"/>\
									            <menuitem label="打开文件" value="1"/>\
								            </menupopup>\
							            </menulist>\
							</hbox>\
							<checkbox id="download_dialog_changeName" label="下载改名（主界面、下载界面）" oncommand="_changeStatus(event)" preference="download_dialog_changeName"/>\
							<hbox align="center" class="indent">\
							            <checkbox align="center" id="download_dialog_changeName_encodingConvert" label="是否开启下拉菜单"  preference="download_dialog_changeName_encodingConvert"/>\
							            <checkbox align="center" id="download_dialog_changeName_locking" label="锁定保存文件按钮"  preference="download_dialog_changeName_locking"/>\
							</hbox>\
						</groupbox>\
						<hbox flex="1">\
							<button dlgtype="extra1" label="还原默认值" />\
							<button dlgtype="extra2" label="全选" />\
							<spacer flex="1" />\
							<button dlgtype="accept"/>\
							<button dlgtype="cancel"/>\
						</hbox>\
					</prefpane>\
					</prefwindow>\
			';
			return encodeURIComponent(xul);
		},

		// 下载完成提示音
		downloadSound_Play: function(enable) {
			if (!enable) {
				downloadPlaySound && downloadPlaySound.uninit();
				return;
			}
			var downloadPlaySound = {

				DL_START: null,
				DL_DONE: "file:///C:/WINDOWS/Media/chimes.wav",
				DL_CANCEL: null,
				DL_FAILED: null,

				get _enable() {
					var _enable = downloadPlus.getPrefs(0, "downloadSound_Play", false);
					return _enable;
				},

				_list: null,
				init: function sampleDownload_init() {
					XPCOMUtils.defineLazyModuleGetter(window, "Downloads",
						"resource://gre/modules/Downloads.jsm");


					window.addEventListener("unload", this, false);

					//**** 监视下载
					if (!this._list) {
						Downloads.getList(Downloads.ALL).then(list => {
							this._list = list;
							return this._list.addView(this);
						}).then(null, Cu.reportError);
					}
				},

				uninit: function() {
					window.removeEventListener("unload", this, false);
					if (this._list) {
						this._list.removeView(this);
					}
				},

				onDownloadAdded: function(aDownload) {
					//**** 开始下载
					if (this.DL_START && this._enable);
					this.playSoundFile(this.DL_START);
				},

				onDownloadChanged: function(aDownload) {
					//**** 取消下载
					if (aDownload.canceled && this.DL_CANCEL && this._enable)
						this.playSoundFile(this.DL_CANCEL)
						//**** 下载失败
					if (aDownload.error && this.DL_FAILED && this._enable)
						this.playSoundFile(this.DL_FAILED)
						//**** 完成下载
					if (aDownload.succeeded && this.DL_DONE && this._enable)
						this.playSoundFile(this.DL_DONE)
				},

				playSoundFile: function(aFilePath) {
					if (!aFilePath)
						return;
					var ios = Components.classes["@mozilla.org/network/io-service;1"]
						.createInstance(Components.interfaces["nsIIOService"]);
					try {
						var uri = ios.newURI(aFilePath, "UTF-8", null);
					} catch (e) {
						return;
					}
					var file = uri.QueryInterface(Components.interfaces.nsIFileURL).file;
					if (!file.exists())
						return;

					this.play(uri);
				},

				play: function(aUri) {
					var sound = Components.classes["@mozilla.org/sound;1"]
						.createInstance(Components.interfaces["nsISound"]);
					sound.play(aUri);
				},

				handleEvent: function(event) {
					switch (event.type) {
						case "unload":
							this.uninit();
							break;
					}
				}
			}

			downloadPlaySound.init();
		},

		//新建下载
		new_Download: function(enable) {
			if (!enable) return;
			var createDownloadDialog = function() {
				if (downloadPlus.new_Download_popups)
					window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPD94bWwtc3R5bGVzaGVldCBocmVmPSJjaHJvbWU6Ly9nbG9iYWwvc2tpbi8iIHR5cGU9InRleHQvY3NzIj8+Cjx3aW5kb3cgeG1sbnM9Imh0dHA6Ly93d3cubW96aWxsYS5vcmcva2V5bWFzdGVyL2dhdGVrZWVwZXIvdGhlcmUuaXMub25seS54dWwiIHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiB0aXRsZT0i5paw5bu65LiL6L295Lu75YqhIj4KCTxoYm94IGFsaWduPSJjZW50ZXIiIHRvb2x0aXB0ZXh0PSJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1sxLTEwMC0zXSAgKFvlvIDlp4st57uT5p2fLeS9jeaVsF0pIj4KCQk8bGFiZWwgdmFsdWU9IuaJuemHj+S7u+WKoSI+PC9sYWJlbD4KCQk8dGV4dGJveCBmbGV4PSIxIi8+Cgk8L2hib3g+Cgk8dGV4dGJveCBpZD0idXJscyIgbXVsdGlsaW5lPSJ0cnVlIiBmbGV4PSIxIi8+Cgk8aGJveCBkaXI9InJldmVyc2UiPgoJCTxidXR0b24gbGFiZWw9IuW8gOWni+S4i+i9vSIvPgoJPC9oYm94PgoJPHNjcmlwdD4KCQk8IVtDREFUQVsKCQlmdW5jdGlvbiBQYXJzZVVSTHMoKSB7CgkJCXZhciBiYXRjaHVybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS52YWx1ZTsKCQkJaWYgKC9cW1xkKy1cZCsoLVxkKyk/XF0vLnRlc3QoYmF0Y2h1cmwpKSB7CgkJCQlmb3IgKHZhciBtYXRjaCA9IGJhdGNodXJsLm1hdGNoKC9cWyhcZCspLShcZCspLT8oXGQrKT9cXS8pLCBpID0gbWF0Y2hbMV0sIGogPSBtYXRjaFsyXSwgayA9IG1hdGNoWzNdLCB1cmxzID0gW107IGkgPD0gajsgaSsrKSB7CgkJCQkJdXJscy5wdXNoKGJhdGNodXJsLnJlcGxhY2UoL1xbXGQrLVxkKygtXGQrKT9cXS8sIChpICsgIiIpLmxlbmd0aCA8IGsgPyAoZXZhbCgiMTBlIiArIChrIC0gKGkgKyAiIikubGVuZ3RoKSkgKyAiIikuc2xpY2UoMikgKyBpIDogaSkpOwoJCQkJfQoJCQkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiI3VybHMiKS52YWx1ZSA9IHVybHMuam9pbigiXG4iKTsKCQkJfSBlbHNlIHsKCQkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUgPSBiYXRjaHVybDsKCQkJfQoJCX0KCQl2YXIgb3duZXIgPSB3aW5kb3cub3BlbmVyOwoJCXdoaWxlKG93bmVyLm9wZW5lciAmJiBvd25lci5sb2NhdGlvbiAhPSAiY2hyb21lOi8vYnJvd3Nlci9jb250ZW50L2Jyb3dzZXIueHVsIil7CgkJCW93bmVyID0gb3duZXIub3BlbmVyOwoJCX0KdmFyIG1haW53aW4gPSBDb21wb25lbnRzLmNsYXNzZXNbIkBtb3ppbGxhLm9yZy9hcHBzaGVsbC93aW5kb3ctbWVkaWF0b3I7MSJdLmdldFNlcnZpY2UoQ29tcG9uZW50cy5pbnRlcmZhY2VzLm5zSVdpbmRvd01lZGlhdG9yKS5nZXRNb3N0UmVjZW50V2luZG93KCJuYXZpZ2F0b3I6YnJvd3NlciIpOwkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS5hZGRFdmVudExpc3RlbmVyKCJrZXl1cCIsIFBhcnNlVVJMcywgZmFsc2UpOwoJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJ1dHRvbiIpLmFkZEV2ZW50TGlzdGVuZXIoImNvbW1hbmQiLCBmdW5jdGlvbiAoKSB7CQlkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjdXJscyIpLnZhbHVlLnNwbGl0KCJcbiIpLmZvckVhY2goZnVuY3Rpb24gKHVybCkgewoJCQkJb3duZXIuc2F2ZVVSTCh1cmwgLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBudWxsLCBtYWlud2luLmRvY3VtZW50KTsKCQkJfSk7CgkJCWNsb3NlKCkKCQl9LCBmYWxzZSk7CgkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigidGV4dGJveCIpLnZhbHVlID0gb3duZXIucmVhZEZyb21DbGlwYm9hcmQoKTsKCQlQYXJzZVVSTHMoKTsKCQldXT4KCTwvc2NyaXB0Pgo8L3dpbmRvdz4=", "name", "top=" + (window.screenY + window.innerHeight / 4 - 50) + ",left=" + (window.screenX + window.innerWidth / 2 - 250));
				else
					window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPD94bWwtc3R5bGVzaGVldCBocmVmPSJjaHJvbWU6Ly9nbG9iYWwvc2tpbi8iIHR5cGU9InRleHQvY3NzIj8+Cjx3aW5kb3cgeG1sbnM9Imh0dHA6Ly93d3cubW96aWxsYS5vcmcva2V5bWFzdGVyL2dhdGVrZWVwZXIvdGhlcmUuaXMub25seS54dWwiIHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiB0aXRsZT0i5paw5bu65LiL6L295Lu75YqhIj4KCTxoYm94IGFsaWduPSJjZW50ZXIiIHRvb2x0aXB0ZXh0PSJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1sxLTEwMC0zXSAgKFvlvIDlp4st57uT5p2fLeS9jeaVsF0pIj4KCQk8bGFiZWwgdmFsdWU9IuaJuemHj+S7u+WKoSI+PC9sYWJlbD4KCQk8dGV4dGJveCBmbGV4PSIxIi8+Cgk8L2hib3g+Cgk8dGV4dGJveCBpZD0idXJscyIgbXVsdGlsaW5lPSJ0cnVlIiBmbGV4PSIxIi8+Cgk8aGJveCBkaXI9InJldmVyc2UiPgoJCTxidXR0b24gbGFiZWw9IuW8gOWni+S4i+i9vSIvPgoJPC9oYm94PgoJPHNjcmlwdD4KCQk8IVtDREFUQVsKCQlmdW5jdGlvbiBQYXJzZVVSTHMoKSB7CgkJCXZhciBiYXRjaHVybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS52YWx1ZTsKCQkJaWYgKC9cW1xkKy1cZCsoLVxkKyk/XF0vLnRlc3QoYmF0Y2h1cmwpKSB7CgkJCQlmb3IgKHZhciBtYXRjaCA9IGJhdGNodXJsLm1hdGNoKC9cWyhcZCspLShcZCspLT8oXGQrKT9cXS8pLCBpID0gbWF0Y2hbMV0sIGogPSBtYXRjaFsyXSwgayA9IG1hdGNoWzNdLCB1cmxzID0gW107IGkgPD0gajsgaSsrKSB7CgkJCQkJdXJscy5wdXNoKGJhdGNodXJsLnJlcGxhY2UoL1xbXGQrLVxkKygtXGQrKT9cXS8sIChpICsgIiIpLmxlbmd0aCA8IGsgPyAoZXZhbCgiMTBlIiArIChrIC0gKGkgKyAiIikubGVuZ3RoKSkgKyAiIikuc2xpY2UoMikgKyBpIDogaSkpOwoJCQkJfQoJCQkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiI3VybHMiKS52YWx1ZSA9IHVybHMuam9pbigiXG4iKTsKCQkJfSBlbHNlIHsKCQkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiN1cmxzIikudmFsdWUgPSBiYXRjaHVybDsKCQkJfQoJCX0KCQl2YXIgb3duZXIgPSB3aW5kb3cub3BlbmVyOwoJCXdoaWxlKG93bmVyLm9wZW5lciAmJiBvd25lci5sb2NhdGlvbiAhPSAiY2hyb21lOi8vYnJvd3Nlci9jb250ZW50L2Jyb3dzZXIueHVsIil7CgkJCW93bmVyID0gb3duZXIub3BlbmVyOwoJCX0KdmFyIG1haW53aW4gPSBDb21wb25lbnRzLmNsYXNzZXNbIkBtb3ppbGxhLm9yZy9hcHBzaGVsbC93aW5kb3ctbWVkaWF0b3I7MSJdLmdldFNlcnZpY2UoQ29tcG9uZW50cy5pbnRlcmZhY2VzLm5zSVdpbmRvd01lZGlhdG9yKS5nZXRNb3N0UmVjZW50V2luZG93KCJuYXZpZ2F0b3I6YnJvd3NlciIpOwkJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoInRleHRib3giKS5hZGRFdmVudExpc3RlbmVyKCJrZXl1cCIsIFBhcnNlVVJMcywgZmFsc2UpOwoJCWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoImJ1dHRvbiIpLmFkZEV2ZW50TGlzdGVuZXIoImNvbW1hbmQiLCBmdW5jdGlvbiAoKSB7CQlkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjdXJscyIpLnZhbHVlLnNwbGl0KCJcbiIpLmZvckVhY2goZnVuY3Rpb24gKHVybCkgewoJCQkJb3duZXIuc2F2ZVVSTCh1cmwgLCBudWxsLCBudWxsLCBudWxsLCB0cnVlLCBudWxsLCBtYWlud2luLmRvY3VtZW50KTsKCQkJfSk7CgkJCWNsb3NlKCkKCQl9LCBmYWxzZSk7CgkJZG9jdW1lbnQucXVlcnlTZWxlY3RvcigidGV4dGJveCIpLnZhbHVlID0gb3duZXIucmVhZEZyb21DbGlwYm9hcmQoKTsKCQlQYXJzZVVSTHMoKTsKCQldXT4KCTwvc2NyaXB0Pgo8L3dpbmRvdz4=", "name", "top=" + (window.screenY + window.innerHeight / 4 - 50) + ",left=" + (window.screenX + window.innerWidth / 2 - 250));
			}

			location == "chrome://browser/content/browser.xul" && (function() {
				document.getElementById('downloads-button').parentNode.addEventListener('click', function(e) {
					if (e.target.id == "downloads-button" || e.target.id == "downloads-indicator") {
						if (e.button == 2) {
							if (!(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)) {
								createDownloadDialog();
								e.stopPropagation();
								e.preventDefault();
							}
						}
					}
				}, false);
			})();

			location == "chrome://browser/content/places/places.xul" && (function() {
				var button = document.querySelector("#placesToolbar").insertBefore(document.createElement("toolbarbutton"), document.querySelector("#clearDownloadsButton"));
				button.id = "createNewDownload";
				button.label = "新建下载";
				button.style.paddingRight = "9px";
				button.addEventListener("command", createDownloadDialog, false);
				window.addEventListener("mouseover", function(e) {
					button.style.display = (document.getElementById("searchFilter").attributes.getNamedItem("collection").value == "downloads") ? "-moz-box" : "none";
				}, false);
			})();
		},
		// 从硬盘中删除
		downloadsPanel_removeFile: function(enable) {
			if (!enable) return;
			this.removeDownloadfile = {
				removeStatus: function() {
					var RMBtn = document.querySelector("#removeDownload"),
						listbox = document.querySelector("#downloadsListBox") || document.querySelector("#downloadsRichListBox"),
						state = listbox.selectedItems[0].getAttribute('state');
					RMBtn.setAttribute("disabled", "true");
					if (state != "0" && state != "4" && state != "5")
						RMBtn.removeAttribute("disabled");
				},
				removeMenu: function() {
					try {downloadPlus.removeDownloadfile.removeStatus();} catch (e) {};
					if (document.querySelector("#removeDownload")) return;
					var menuitem = document.createElement("menuitem"),
						rlm = document.querySelector('.downloadRemoveFromHistoryMenuItem');
					menuitem.setAttribute("label", rlm.getAttribute("label").indexOf("History") != -1 ? "Delete File" : "\u4ECE\u786C\u76D8\u4E2D\u5220\u9664");
					menuitem.setAttribute("id", "removeDownload");

					menuitem.onclick = function(e) {
						if (e.target.disabled) return;
						var path = "";
						if (typeof DownloadsViewItemController != "undefined") {
							let selectedItem = DownloadsView.richListBox.selectedItem;
							if (DownloadsView.controllerForElement) {
								//FF38
								path = DownloadsView.controllerForElement(selectedItem).download.target.path;
							} else {
								//FF37
								path = (new DownloadsViewItemController(selectedItem)).dataItem.file;
							}
						} else {
							DownloadsView = document.getElementById("downloadsRichListBox")._placesView;
							let selectedItemsShell = DownloadsView._richlistbox.selectedItems[0]._shell;
							if (!(selectedItemsShell._metaData && selectedItemsShell._metaData.filePath)) {
								//FF38
								path = (selectedItemsShell._sessionDownload || selectedItemsShell._historyDownload).target.path;
							} else {
								//FF37
								path = selectedItemsShell._metaData.filePath;
							}
						}

						var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
						try {
							file.initWithPath(path);
						} catch (e) {
							var fileUrl = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService)
								.getProtocolHandler('file').QueryInterface(Components.interfaces.nsIFileProtocolHandler)
								.getFileFromURLSpec(path).path;
							file.initWithPath(fileUrl);
						}
						if (!file.exists()) {
							if (/\..{0,10}(\.part)$/.test(file.path))
								file.initWithPath(file.path.replace(".part", ""));
							else
								file.initWithPath(file.path + ".part");
						}
						if (file.exists()) {
							file.permissions |= 0666;
							file.remove(0);
						}

						if (typeof DownloadsViewItemController != "undefined") {
							let selectedItem = DownloadsView.richListBox.selectedItem;
							if (DownloadsView.controllerForElement) {
								//FF38
								DownloadsView.controllerForElement(selectedItem).doCommand("cmd_delete");
							} else {
								//FF37
								(new DownloadsViewItemController(selectedItem)).doCommand("cmd_delete");
							}
						} else {
							DownloadsView.doCommand("cmd_delete");
						}
					};

					document.querySelector("#downloadsContextMenu").insertBefore(menuitem, rlm.nextSibling);
					downloadPlus.removeDownloadfile.removeStatus();
				},

				init: function() {
					document.querySelector("#downloadsContextMenu").addEventListener("popupshowing", this.removeMenu, false);
				}
			}
			if (location != "chrome://browser/content/places/places.xul") {
				try {
					eval("DownloadsPanel.showPanel =" + DownloadsPanel.showPanel.toString()
						.replace(/(?:this|DownloadsPanel)\.\_openPopupIfDataReady\(\), 0\);/, "$&setTimeout\(\(\)=>downloadPlus\.removeDownloadfile\.init\(\), 0\);"));
				} catch (e) {
					//Components.utils.reportError(e);
				}
			} else {
				downloadPlus.removeDownloadfile.init();
			}
		},

		//精确显示文件大小
		downloadFileSize: function(enable) {
			if (!enable) {
				location == "chrome://browser/content/browser.xul" && (DownloadUtils.convertByteUnits = downloadPlus.Default_DownloadUtils_convertByteUnits);
				return;
			}
			location == "chrome://browser/content/browser.xul" && (DownloadUtils.convertByteUnits =
				function DU_convertByteUnits(aBytes) {
					let unitIndex = 0;
					while ((aBytes >= 999.5) && (unitIndex < 3)) {
						aBytes /= 1024;
						unitIndex++;
					}
					return [(aBytes > 0) && (aBytes < 100) && (unitIndex != 0) ? (aBytes < 10 ? (parseInt(aBytes * 100) / 100).toFixed(2) : (parseInt(aBytes * 10) / 10).toFixed(1)) : parseInt(aBytes), ['bytes', 'KB', 'MB', 'GB'][unitIndex]];
				});
		},

		// 自动关闭下载产生的空白标签
		autoClose_blankTab: function(enable) {
			if (!enable) {
				location == "chrome://browser/content/browser.xul" && eval("gBrowser.mTabProgressListener=" + downloadPlus.Default_gBrowser_mTabProgressListener);
				return
			};
			eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
				if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
                         			&& aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank" && aStatus == 0) {\
				aWebProgress.DOMWindow.setTimeout(function() {\
				!aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
				}, 100);\
				}\
			'));
		},

		// 保存并打开
		save_And_Open: function(enable) {
			if (!enable) return;
			var saveAndOpen = document.getAnonymousElementByAttribute(document.querySelector("*"), "dlgtype", "extra2");
			saveAndOpen.parentNode.insertBefore(saveAndOpen, document.documentElement.getButton("accept").nextSibling);
			saveAndOpen.setAttribute("hidden", "false");
			saveAndOpen.setAttribute("label", "\u4FDD\u5B58\u5E76\u6253\u5F00");
			saveAndOpen.setAttribute("oncommand", 'Components.classes["@mozilla.org/browser/browserglue;1"].getService(Components.interfaces.nsIBrowserGlue).getMostRecentBrowserWindow().saveAndOpen.urls.push(dialog.mLauncher.source.asciiSpec);document.querySelector("#save").click();document.documentElement.getButton("accept").disabled=0;document.documentElement.getButton("accept").click()')
		},
		//作用于 main 窗口
		saveAndOpen_on_main: function(enable) {
			if (!enable) return;
			Components.utils.import("resource://gre/modules/Downloads.jsm");
			saveAndOpen = {
				urls: [],
				init: function() {
					Downloads.getList(Downloads.ALL).then(list => {
						list.addView({
							onDownloadChanged: function(dl) {
								if (downloadPlus.appVersion < 29) {
									if (dl.progress == 100 && saveAndOpen.urls.indexOf(dl.source.url) > -1) {
										downloadPlus.save_And_Open_RorL == 0 && dl.reveal();
										downloadPlus.save_And_Open_RorL == 1 && dl.launch();
										saveAndOpen.urls[saveAndOpen.urls.indexOf(dl.source.url)] = "";
									}
								} else if (downloadPlus.appVersion >= 29) {
									if (dl.progress == 100 && saveAndOpen.urls.indexOf(dl.source.url) > -1) {
										downloadPlus.save_And_Open_RorL == 0 && (new FileUtils.File(dl.target.path)).reveal();
										downloadPlus.save_And_Open_RorL == 1 && (new FileUtils.File(dl.target.path)).launch();
										saveAndOpen.urls[saveAndOpen.urls.indexOf(dl.source.url)] = "";
									}
								}
							},
							onDownloadAdded: function() {},
							onDownloadRemoved: function() {},
						});
					}).then(null, Cu.reportError);
				}

			}
			saveAndOpen.init();
		},

		// 下载改名
		download_dialog_changeName: function(enable) {
			//注:同时关闭改名和下拉菜单会导致下载文件的文件名不显示(非要关闭请默认在28行最前面加//来注释掉该功能)
			if (!enable) return;
			if (location != "chrome://mozapps/content/downloads/unknownContentType.xul") return;
			document.querySelector("#mode").addEventListener("select", function() {
				if (dialog.dialogElement("save").selected) {
					if (!document.querySelector("#locationtext")) {
						if (enable || downloadPlus.download_dialog_changeName_encodingConvert) {
							var orginalString = "";
							if (downloadPlus.download_dialog_changeName_encodingConvert) {
								try {
									orginalString = (opener.localStorage.getItem(dialog.mLauncher.source.spec) ||
										dialog.mLauncher.source.asciiSpec.substring(dialog.mLauncher.source.asciiSpec.lastIndexOf("/"))).replace(/[\/:*?"<>|]/g, "");
									opener.localStorage.removeItem(dialog.mLauncher.source.spec)
								} catch (e) {
									orginalString = dialog.mLauncher.suggestedFileName;
								}
							}
							if (downloadPlus.download_dialog_changeName_encodingConvert)
								var locationtext = document.querySelector("#location").parentNode.insertBefore(document.createElement("menulist"), document.querySelector("#location"));
							else
								var locationtext = document.querySelector("#location").parentNode.insertBefore(document.createElement("textbox"), document.querySelector("#location"));
							locationtext.id = "locationtext";
							if (enable && downloadPlus.download_dialog_changeName_encodingConvert)
								locationtext.setAttribute("editable", "true");
							locationtext.setAttribute("style", "margin-top:-2px;margin-bottom:-3px");
							locationtext.setAttribute("tooltiptext", "Ctrl+\u70B9\u51FB\u8F6C\u6362url\u7F16\u7801\n\u5DE6\u952E\u003AUNICODE\n\u53F3\u952E\u003AGB2312");
							locationtext.addEventListener("click", function(e) {
								if (e.ctrlKey) {
									if (e.button == 0)
										this.value = decodeURIComponent(this.value);
									if (e.button == 2) {
										e.preventDefault();
										converter.charset = "GB2312";
										this.value = converter.ConvertToUnicode(unescape(this.value));
									}
								}
							}, false);
							if (enable)
								locationtext.value = dialog.mLauncher.suggestedFileName;
							if (downloadPlus.download_dialog_changeName_encodingConvert) {
								locationtext.addEventListener("command", function(e) {
									if (enable)
										locationtext.value = e.target.value;
									document.title = "Opening " + e.target.value;
								});
								let menupopup = locationtext.appendChild(document.createElement("menupopup"));
								let menuitem = menupopup.appendChild(document.createElement("menuitem"));
								menuitem.value = dialog.mLauncher.suggestedFileName;
								menuitem.label = "Original: " + menuitem.value;
								if (!enable)
									locationtext.value = menuitem.value;
								let converter = Components.classes['@mozilla.org/intl/scriptableunicodeconverter']
									.getService(Components.interfaces.nsIScriptableUnicodeConverter);

								function createMenuitem(encoding) {
										converter.charset = encoding;
										let menuitem = menupopup.appendChild(document.createElement("menuitem"));
										menuitem.value = converter.ConvertToUnicode(orginalString).replace(/^"(.+)"$/, "$1");
										menuitem.label = encoding + ": " + menuitem.value;
									}
									["GB18030", "BIG5", "Shift-JIS"].forEach(function(item) {
										createMenuitem(item)
									});
							}
						}
					}
					document.querySelector("#location").hidden = true;
					document.querySelector("#locationtext").hidden = false;
				} else {
					document.querySelector("#locationtext").hidden = true;
					document.querySelector("#location").hidden = false;
				}
			}, false)
			if (downloadPlus.download_dialog_changeName_locking)
				dialog.dialogElement("save").click();
			else
				dialog.dialogElement("save").selected && dialog.dialogElement("save").click();
			window.addEventListener("dialogaccept", function() {
				if ((document.querySelector("#locationtext").value != dialog.mLauncher.suggestedFileName) && dialog.dialogElement("save").selected) {
					var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
					mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")(dialog.mLauncher.source.asciiSpec, null, document.querySelector("#locationtext").value, null, null, null, null, null, null, mainwin.document, Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch).getBoolPref("browser.download.useDownloadDir"), null);
					document.documentElement.removeAttribute("ondialogaccept");
				}
			}, false);
		},
		//作用于 main 窗口
		download_dialog_changeName_on_main: function(enable) {
			if (!enable) return;
			const obsService = Cc['@mozilla.org/observer-service;1'].getService(Ci.nsIObserverService);
			const RESPONSE_TOPIC = 'http-on-examine-response';

			var respObserver = {
				observing: false,
				observe: function(subject, topic, data) {
					try {
						let channel = subject.QueryInterface(Ci.nsIHttpChannel);
						let header = channel.contentDispositionHeader;
						let associatedWindow = channel.notificationCallbacks
							.getInterface(Components.interfaces.nsILoadContext)
							.associatedWindow;
						associatedWindow.localStorage.setItem(channel.URI.spec, header.split("=")[1]);
					} catch (ex) {}
				},
				start: function() {
					if (!this.observing) {
						obsService.addObserver(this, RESPONSE_TOPIC, false);
						this.observing = true;
					}
				},
				stop: function() {
					if (this.observing) {
						obsService.removeObserver(this, RESPONSE_TOPIC, false);
						this.observing = false;
					}
				}
			};

			respObserver.start();
			addEventListener("beforeunload", function() {
				respObserver.stop();
			})
		},


		// 另存为...
		download_dialog_saveas: function(enable) {
			if (!enable) return;
			var saveas = document.documentElement.getButton("extra1");
			saveas.setAttribute("hidden", "false");
			saveas.setAttribute("label", "\u53E6\u5B58\u4E3A");
			saveas.setAttribute("oncommand", 'var mainwin = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser"); mainwin.eval("(" + mainwin.internalSave.toString().replace("let ", "").replace("var fpParams", "fileInfo.fileExt=null;fileInfo.fileName=aDefaultFileName;var fpParams") + ")")(dialog.mLauncher.source.asciiSpec, null, (document.querySelector("#locationtext") ? document.querySelector("#locationtext").value : dialog.mLauncher.suggestedFileName), null, null, null, null, null, null, mainwin.document, 0, null);close()');
		},

		// 保存到...
		download_dialog_saveTo: function(enable) {
			//目录路径的反斜杠\要双写\\
			//第一次使用要修改路径，否则无法下载
			//如果使用Firefox3.6 + userChromeJS v1.2,则路径中的汉字要转义为\u6C49\u5B57编码类型,否则会出现乱码
			if (!enable) return;
			var cssStr = (function() {
				/*
				        button[label="\4FDD\5B58\5230"] .dropmarker-icon{
				                display:none;
				        }
				        button[label="\4FDD\5B58\5230"]::after{
				                content:"";
				                display:-moz-box;
				                width:8px;
				                height:19px;
				                margin-left:-20px;
				                -moz-appearance: menulist-button;
				        }
				        button[label="\4FDD\5B58\5230"][disabled]::after{
				                opacity:.3;
				        }
				        */
			}).toString().replace(/^.+\s|.+$/g, "");
			var style = document.createProcessingInstruction("xml-stylesheet", "type=\"text/css\"" + " href=\"data:text/css;base64," + btoa(cssStr) + "\"");
			document.insertBefore(style, document.firstChild);
			var dir = [
		["C:\\Users\\Administrator\\Desktop", "桌面"],
		["D:\\Download", "Download"],
		["E:\\Syuan的軟件", "Syuan的軟件"],
			];
			var saveTo = document.documentElement._buttons.cancel.parentNode.insertBefore(document.createElement("button"), document.documentElement._buttons.cancel);
			var saveToMenu = saveTo.appendChild(document.createElement("menupopup"));
			saveTo.classList.toggle("dialog-button");
			saveTo.label = "\u4FDD\u5B58\u5230";
			saveTo.type = "menu";
			dir.forEach(function(dir) {
				var [name, dir] = [dir[1], dir[0]];
				var item = saveToMenu.appendChild(document.createElement("menuitem"));
				item.setAttribute("label", (name || (dir.match(/[^\\/]+$/) || [dir])[0]));
				item.setAttribute("image", "moz-icon:file:///" + dir + "\\");
				item.setAttribute("class", "menuitem-iconic");
				item.onclick = function() {
					var filename = (document.querySelector("#locationtext") ? document.querySelector("#locationtext").value.trim() : document.querySelector("#location").value);
					var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
					file.initWithPath(dir + "\\" + filename);
					if (downloadPlus.download_dialog_saveTo_suffix == 0)
						while (file.exists()) {
							let index = filename.match(/\((\d+)\)(?:\.[^\.]+)?$/);
							if (index && index[1]) {
								filename = filename.replace(/\d+(?=\)(?:\.[^\.]+)?$)/, parseInt(index[1]) + 1);
							} else {
								filename = filename.replace(/(?=(\.[^\.]+)?$)/, "(1)");
							}
							file.initWithPath(dir + "\\" + filename);
						} else
					if (file.exists()) file.createUnique(0, 0644);
					dialog.mLauncher.saveToDisk(file, 1);
					dialog.onCancel = function() {};
					close();
				};
			})
		},

		// 下载弹出窗口双击链接复制完整链接
		download_dialog_showCompleteURL: function(enable) {
			if (!enable) return;
			var s = document.querySelector("#source");
			s.value = dialog.mLauncher.source.spec;
			s.setAttribute("crop", "center");
			s.setAttribute("tooltiptext", dialog.mLauncher.source.spec);
			s.setAttribute("ondblclick", 'Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(dialog.mLauncher.source.spec)');
		},

		// 下载弹出窗口双击文件项执行下载
		download_dialog_doubleclicksaveL: function(enable) {
			if (!enable) return;
			addEventListener("dblclick", function(event) {
				downloadPlus.download_dialog_doubleclickanyW && document.documentElement.getButton("accept").click();
				event.target.nodeName === "radio" && document.documentElement.getButton("accept").click();
			}, false);
		},

		download_speed: function(enable) {
			if (!enable) {
				if (downloadPlus.appVersion >= 38) {
					eval("DownloadsViewItem.prototype._updateProgress = " +
						downloadPlus.Default_DownloadsViewItem_prototype_update);
				} else if (downloadPlus.appVersion < 38) {
					eval("DownloadsViewItem.prototype._updateStatusLine = " +
						downloadPlus.Default_DownloadsViewItem_prototype_update);
				}
				return;
			}
			if (downloadPlus.appVersion >= 38) {
				eval("DownloadsViewItem.prototype._updateProgress = " +
					DownloadsViewItem.prototype._updateProgress.toString().replace('status.text', 'status.tip'));
			} else if (downloadPlus.appVersion < 38) {
				eval("DownloadsViewItem.prototype._updateStatusLine = " +
					DownloadsViewItem.prototype._updateStatusLine.toString().replace('[statusTip', '[status'));
			}
		},

		download_checksum: function(enable) {
			if (!enable){
				this.checksum && this.checksum.uninit();
				return;
			}
			this.checksum = {
				init: function() {
					document.querySelector("#downloadsContextMenu").addEventListener("popupshowing", this.checksumMenu, false);
				},

				uninit: function(){
					document.querySelector("#downloadsContextMenu").removeEventListener("popupshowing", this.checksumMenu, false);
					if ($("checksumMenu")) $("checksumMenu").parentNode.removeChild($("checksumMenu"));
					eval("DownloadsPanel.showPanel =" + DownloadsPanel.showPanel.toString()
						.replace(/setTimeout\(\(\)=>downloadPlus\.checksum\.init\(\), 0\);/, ""));
				},

				checksumState: function() {
					var CKMtn = document.querySelector("#checksumMenu"),
						listbox = document.querySelector("#downloadsListBox") || document.querySelector("#downloadsRichListBox"),
						state = listbox.selectedItems[0].getAttribute('state');
					CKMtn.setAttribute("disabled", "true");
					if (state != "0" && state != "3" && state != "4" && state != "5") CKMtn.removeAttribute("disabled");
				},

				checksumMenu: function() {
					try {downloadPlus.checksum.checksumState();} catch (e) {};
					if (document.querySelector("#checksumMenu")) return;
					var menuitem = document.createElement("menuitem"),
						rlm = document.querySelector('.downloadRemoveFromHistoryMenuItem');
					menuitem.setAttribute("label", "Hash 计算");
					menuitem.setAttribute("id", "checksumMenu");
					menuitem.onclick = function(e) {
						if (e.target.disabled) return;

						var path = "";
						if (typeof DownloadsViewItemController != "undefined") {
							let selectedItem = DownloadsView.richListBox.selectedItem;
							if (DownloadsView.controllerForElement) {
								//FF38
								path = DownloadsView.controllerForElement(selectedItem).download.target.path;
							} else {
								//FF37
								path = (new DownloadsViewItemController(selectedItem)).dataItem.file;
							}
						} else {
							DownloadsView = document.getElementById("downloadsRichListBox")._placesView;
							let selectedItemsShell = DownloadsView._richlistbox.selectedItems[0]._shell;
							if (!(selectedItemsShell._metaData && selectedItemsShell._metaData.filePath)) {
								//FF38
								path = (selectedItemsShell._sessionDownload || selectedItemsShell._historyDownload).target.path;
							} else {
								//FF37
								path = selectedItemsShell._metaData.filePath;
							}
						}

						var result = "";
						var algorithm_i = 0;
						var algorithm_arr = ["MD5", "SHA1"];

						//来自 https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsICryptoHash#Computing_the_Hash_of_a_File
						var clcltHashld = function() {
							var algorithm = algorithm_arr[algorithm_i];
							var delay = file.fileSize / 1024 / 1024 * 5;
							var istream = Cc['@mozilla.org/network/file-input-stream;1'].createInstance(Ci.nsIFileInputStream);
							istream.init(file, 0x01, 0444, 0);
							var ch = Cc['@mozilla.org/security/hash;1'].createInstance(Ci.nsICryptoHash);
							ch.init(ch[algorithm]);
							const PR_UINT32_MAX = 0xffffffff;
							ch.updateFromStream(istream, PR_UINT32_MAX);
							var hash = ch.finish(false);

							function toHexString(charCode) {
								return ('0' + charCode.toString(16)).slice(-2);
							}
							var s = [toHexString(hash.charCodeAt(i)) for (i in hash)].join('');
							result += algorithm + "：" + s + "\n";
							algorithm_i ++;
							var timer = Cc["@mozilla.org/timer;1"].createInstance(Ci.nsITimer);
						 	timer.initWithCallback(interval, delay, Ci.nsITimer.TYPE_ONE_SHOT);
						};

						var interval = function(timer){
						 	if(algorithm_i == algorithm_arr.length){
						 		prompts(result);
						 		return;
						 	}
						 	setTimeout(function(){ clcltHashld() }, 0);
						 };

						var prompts = function(result){
						 	var prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
							var flags = prompts.BUTTON_POS_0 * prompts.BUTTON_TITLE_OK + prompts.BUTTON_POS_1 * prompts.BUTTON_TITLE_CANCEL + prompts.BUTTON_POS_2 * prompts.BUTTON_TITLE_IS_STRING;
							var button = prompts.confirmEx(null, "Hash 计算", result, flags, "", "", "复制", null, {value: false});
							if (button == 2) copy(result);
						 };

						var copy = function(aText) {
							Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(aText);
							XULBrowserWindow.statusTextField.label = "Copy: " + aText;
						};

						var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
						file.initWithPath(path);
						if (!file.exists()) {
							result = "出错了，检查文件是否删除\n文件地址：" + path;
						 	prompts(result);
						 	return;
						} 
						if (file.fileSize >= 104857600)
							Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService)
								.showAlertNotification('', 'downloadPlus', '当前文件过大，计算需要较长时间，建议使用专用软件。\n确定要继续吗，确定请点击。', true, '', {observe: function(subject, topic, data) {if(topic == 'alertclickcallback') interval(); }}, '');
						else interval();
					};
					document.querySelector("#downloadsContextMenu").insertBefore(menuitem, rlm.nextSibling);
					downloadPlus.checksum.checksumState();
				},
			};
			if (location != "chrome://browser/content/places/places.xul") {
				try {
					eval("DownloadsPanel.showPanel =" + DownloadsPanel.showPanel.toString()
						.replace(/(?:this|DownloadsPanel)\.\_openPopupIfDataReady\(\), 0\);/, "$&setTimeout\(\(\)=>downloadPlus\.checksum\.init\(\), 0\);"));
				} catch (e) {
					//Components.utils.reportError(e);
				}
			} else {
				downloadPlus.checksum.init();
			}
		},
	};

	function $(id, doc) {
		doc = doc || document;
		return doc.getElementById(id);
	}

	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}

	downloadPlus.init();
	window.downloadPlus = downloadPlus;
})();