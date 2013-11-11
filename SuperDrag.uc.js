// ==UserScript==
// @name           SuperDrag
// @description    拖拽手势
// ==/UserScript==
location == "chrome://browser/content/browser.xul" && (function(event) {
	var self = arguments.callee;
	if (!event) {
		self.GESTURES = {
			image: {
				R: {
					//新标签打开图片(前台)
					name: "\u65b0\u6807\u7b7e\u6253\u5f00\u56fe\u7247(\u524d\u53f0)",
					cmd: function(event, self) {
						gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("application/x-moz-file-promise-url"));
					}
				},
				D: {
					//下载图片
					name: "\u4e0b\u8f7d\u56fe\u7247",
					cmd: function(event, self) {
						saveImageURL(event.dataTransfer.getData("application/x-moz-file-promise-url"), null, null, null, null, null, document);
					}
				},
				DU: {
					//复制图片地址
					name: "\u590d\u5236\u56fe\u7247\u5730\u5740",
					cmd: function(event, self) {
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("application/x-moz-file-promise-url"));
					}
				},
				LD: {
					//搜索相似图片(全部引擎)
					name: "\u641c\u7d22\u76f8\u4f3c\u56fe\u7247(\u5168\u90e8\u5f15\u64ce)",
					cmd: function(event, self) {
						gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
						gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
						gBrowser.addTab('http://www.google.com/searchbyimage?image_url=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
						gBrowser.addTab('http://pic.sogou.com/ris?query=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
					}
				},
			},
			link: {
				R: {
					//新标签打开链接(前台)
					name: "\u65b0\u6807\u7b7e\u6253\u5f00\u94fe\u63a5(\u524d\u53f0)",
					cmd: function(event, self) {
						gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
					}
				},
				D: {
					//下载链接
					name: "\u4e0b\u8f7d\u94fe\u63a5",
					cmd: function(event, self) {
						saveImageURL(event.dataTransfer.getData("text/x-moz-url").split("\n")[0], null, null, null, null, null, document);
					}
				},
				DU: {
					//复制链接
					name: "\u590d\u5236\u94fe\u63a5",
					cmd: function(event, self) {
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
					}
				},
			},
			text: {
				U: {
					//Google搜索选中文字(前台)[识别URL并打开]
					name: "Google\u641c\u7d22\u9009\u4e2d\u6587\u5b57(\u524d\u53f0)[\u8bc6\u522bURL\u5e76\u6253\u5f00]",
					cmd: function(event, self) {
						(/^\s*(?:(?:(?:ht|f)tps?:\/\/)?(?:(?:\w+?)(?:\.(?:[\w-]+?))*(?:\.(?:[a-zA-Z]{2,5}))|(?:(?:\d+)(?:\.\d+){3}))(?::\d{2,5})?(?:\/\S*|$)|data:text\/[\u0025-\u007a]+)\s*$/.test(event.dataTransfer.getData("text/unicode")) && (gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/unicode")))) || (gBrowser.selectedTab = gBrowser.addTab('http://www.google.com/search?q=' + encodeURIComponent(event.dataTransfer.getData("text/unicode"))));
					}
				},
				D: {
					//baidu搜索选中文字(前台)[识别URL并打开]
					name: "baidu\u641c\u7d22\u9009\u4e2d\u6587\u5b57(\u524d\u53f0)[\u8bc6\u522bURL\u5e76\u6253\u5f00]",
					cmd: function(event, self) {
						(/^\s*(?:(?:(?:ht|f)tps?:\/\/)?(?:(?:\w+?)(?:\.(?:[\w-]+?))*(?:\.(?:[a-zA-Z]{2,5}))|(?:(?:\d+)(?:\.\d+){3}))(?::\d{2,5})?(?:\/\S*|$)|data:text\/[\u0025-\u007a]+)\s*$/.test(event.dataTransfer.getData("text/unicode")) && (gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/unicode")))) || (gBrowser.selectedTab = gBrowser.addTab('http://www.baidu.com/s?wd=' + event.dataTransfer.getData("text/unicode")));
					}
				},
				R: {
					//新标签打开文字链接(前台)
					name: "\u65b0\u6807\u7b7e\u6253\u5f00\u6587\u5b57\u94fe\u63a5(\u524d\u53f0)",
					cmd: function(event, self) {
						gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/unicode").split("\n")[0]);
					}
				},
       DU: {
					//复制文本
					name: "\u590d\u5236\u6587\u672c",
					cmd: function(event, self) {
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/unicode"));
					}
				},				
			},
		};
		["dragstart", "dragover", "drop"].forEach(function(type) {
			gBrowser.mPanelContainer.addEventListener(type, self, false);
		});
		window.addEventListener("unload", function() {
			["dragstart", "dragover", "drop"].forEach(function(type) {
				gBrowser.mPanelContainer.removeEventListener(type, self, false);
			});
		}, false);
		return;
	}
	switch (event.type) {
	case "dragstart":
		{
			self.lastPoint = [event.screenX, event.screenY];
			self.sourceNode = event.target;
			self.directionChain = "";
			event.target.localName == "img" && event.dataTransfer.setData("application/x-moz-file-promise-url", event.target.src);
			if (event.dataTransfer.types.contains("application/x-moz-file-promise-url")) {
				self.type = "image";
			} else if (event.dataTransfer.types.contains("text/x-moz-url")) {
				self.type = "link";
			} else {
				self.type = "text";
			}
			break;
		}
	case "dragover":
		{
			if (!self.lastPoint) return;
			Components.classes["@mozilla.org/widget/dragservice;1"].getService(Components.interfaces.nsIDragService).getCurrentSession().canDrop = true;
			var [subX, subY] = [event.screenX - self.lastPoint[0], event.screenY - self.lastPoint[1]];
			var [distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
			var direction;
			if (distX < 10 && distY < 10) return;
			if (distX > distY) direction = subX < 0 ? "L" : "R";
			else direction = subY < 0 ? "U" : "D";
			if (direction != self.directionChain.charAt(self.directionChain.length - 1)) {
				self.directionChain += direction;
				XULBrowserWindow.statusTextField.label = self.GESTURES[self.type][self.directionChain] ? "\u624b\u52bf: " + self.directionChain + " " + self.GESTURES[self.type][self.directionChain].name : "\u672a\u77e5\u624b\u52bf:" + self.directionChain;
				self.cmd = self.GESTURES[self.type][self.directionChain] ? self.GESTURES[self.type][self.directionChain].cmd : "";
			}
			self.lastPoint = [event.screenX, event.screenY];
			break;
		}
	case "drop":
		{
			if (self.lastPoint && event.target.localName != "textarea" && (!(event.target.localName == "input" && (event.target.type == "text" || event.target.type == "password"))) && event.target.contentEditable != "true") {
				event.preventDefault();
				event.stopPropagation();
				self.lastPoint = XULBrowserWindow.statusTextField.label = "";
				self.cmd && self.cmd(event, self);
			}
		}
	}
})()
