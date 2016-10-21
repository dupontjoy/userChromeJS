// ==UserScript==
// @name            videos_skipAd.uc
// @description     视频站去广告
// @include         main
// @author          xinggsf
// @version         2016.10.15
// @homepage        http://bbs.kafan.cn/thread-2048252-1-1.html
// @downloadUrl     https://raw.githubusercontent.com/xinggsf/uc/master/videos_skipAd.uc.js
// @startup         videos_skipAd.startup();
// @shutdown        videos_skipAd.shutdown();
// ==/UserScript

/* 为去黑屏，请在ABP之类的过滤工具中添加免过滤规则：
@@|http://v.aty.sohu.com/v$object-subrequest
*/
if (!String.prototype.includes) {
	String.prototype.includes = function(s) {
		return -1 !== this.indexOf(s);
	};
}
String.prototype.mixMatchUrl = function(ml) {//正则或ABP规则匹配网址
	if (ml instanceof RegExp)
		return ml.test(this);
	if (ml.startsWith('||')) {//ml: '||.cn/xxxxx'
		let i = this.indexOf('/', 11)-3, //4: g.cn; 11:7+4
		j = this.indexOf(ml.slice(2), 7);
		return -1 !== j && j < i;
	}
	if (ml[0] === '|')
		return this.startsWith(ml.slice(1));
	if (ml[ml.length-1] === '|')
		return this.endsWith(ml.slice(0, ml.length-1));
	return this.includes(ml);
};

(function() {
    Cu.import("resource://gre/modules/XPCOMUtils.jsm");
	Cu.import("resource://gre/modules/Services.jsm");

	const DIRECT_FILTERS = [//flash请求广告地址
		'|http://sax.sina.com.cn/',
		'|http://de.as.pptv.com/',
		'||.gtimg.com/qqlive/', //qq pause
		'/vmind.qqvideo.tc.qq.com/',
		/^http:\/\/v\.163\.com\/special\/.+\.xml/,
		'||.letvimg.com/',
		//^http:\/\/(\d+\.){3}\d+\/(\d{1,3}\/){3}letv-gug\/\d{1,3}\/ver.+\.mp4\?/,
		/^http:\/\/www\.iqiyi\.com\/common\/flashplayer\/201\d{5}\/\w{32}\.swf/,//pause
		//^http:\/\/pic\d\.qiyipic\.com\/common\/201\d{5}\/\w{32}\.jpg$/,//pause ||qiyipic.com/common/201*.jpg|$object-subrequest
		//http://59.63.201.15/videos/v0/20161010/63/38/2406cf2ed648e41eceb4954a604b3e79.f4v?
		//^http:\/\/(\d+\.){3}\d+\/videos\/v\d\/201\d{5}\/.+\/\w{32}\.(f4v|hml)\?/
		'|http://www.iqiyi.com/player/cupid/common/icon_exclusive.swf',
	],
	FILTERS = [
		{
			'id': 'youku',
			'player': [
				//^http:\/\/static\.youku\.com\/v.+(?:play|load)er.*\.swf/,
				'|http://player.youku.com/player.php/sid/',
				'|http://cdn.aixifan.com/player/cooperation/acfunxyouku.swf',
			],
			'url': /^http:\/\/val[fcopb]\.atm\.youku\.com\/v[fcopb]/,
			'secured': true
		},{
			'id': 'tudou',
			'player': /^http:\/\/js\.tudouui\.com\/.+player.+\.swf/,
			'url': /^http:\/\/val[fcopb]\.atm\.youku\.com\/v[fcopb]/
		},{
			'id': 'iqiyi',
			'player': /^http:\/\/www\.iqiyi\.com\/.+player.+\.swf/,
			'cover': '|http://cache.video.qiyi.com/vms?',
			'url': /^http:\/\/(\w+\.){3}\w+\/videos\/other\/\d+\/.+\.(f4v|hml)/
		},{
			'id': 'sohu',
			'player': [
				/^http:\/\/tv\.sohu\.com\/upload\/swf\/.+\/main\.swf/,
				/^http:\/\/(\d{1,3}\.){3}\d{1,3}\/wp8player\/main\.swf/,
				'|http://static.hdslb.com/sohu.swf',
			],
			'url': '|http://v.aty.sohu.com/v',
			'secured': true
		},
	],
	HTML5_FILTERS = [
		{//音悦台MV去黑屏
			// 'id': 'yinyuetai',
			// 'url': '|http://hc.yinyuetai.com/partner/yyt/'
		},
	],
	swfWhiteList = [//gpu加速白名单
		'||.pdim.gs/static/',//熊猫直播
		'|http://v.6.cn/apple/player/',
		'||.plures.net/pts/swfbin/player/live.swf',//龙珠直播
		'|http://www.gaoxiaovod.com/ck/player.swf',
		'|http://assets.dwstatic.com/video/',
	],
	//注意：此处上下二个名单的地址必须是小写字母
	swfBlockList = [//免gpu加速名单
		'upload.swf',
		/clipboard\d*\.swf$/,
		//'|http://static92cc.db-cache.com/swf/',
		'||staticlive.douyucdn.cn/',
		'||static.hdslb.com/live-static/swf/liveplayer',
	],

	Utils = {
		getWindow: function(node) {
			if ("ownerDocument" in node && node.ownerDocument)
				node = node.ownerDocument;
			if ("defaultView" in node)
				return node.defaultView;
			return null;
		},
		block: function(http, secured) {
			if (secured) http.suspend();
			else http.cancel(Cr.NS_BINDING_ABORTED);
		},
		openFlashGPU: function(p, data) {
			if (!data.isPlayer && !this.isPlayer(p, data.url))
				return;
			(p instanceof Ci.nsIDOMHTMLEmbedElement) ? p.setAttribute('wmode', 'gpu')
				: this.setFlashParam(p, 'wmode', 'gpu');
			//this.refreshElem(p);
			//p.parentNode.replaceChild(p.cloneNode(true), p);
		},
		isPlayer: function(p, url) {
			if (swfWhiteList.some(x => url.mixMatchUrl(x))) return !0;
			if (swfBlockList.some(x => url.mixMatchUrl(x))) return !1;
			if (!p.width) return !1;
			if (p.width.endsWith('%')) return !0;
			if (parseInt(p.width) < 233 || parseInt(p.height) < 53) return !1;
			if (p instanceof Ci.nsIDOMHTMLEmbedElement)
				return p.matches('[allowFullScreen]');
			return /"allowfullscreen"/i.test(p.innerHTML);
		},
		refreshElem: function(o) {
			let s = o.style.display;
			o.style.display = 'none';
			setTimeout(() => {
				s ? o.style.display = s : o.style.removeProperty('display');
				if ('' === o.getAttribute('style'))
					o.removeAttribute('style');
			}, 9);
		},
		setFlashParam: function(p, name, v) {
			let e = p.querySelector('embed');
			e && e.setAttribute(name, v);
			p.hasAttribute(name) && p.setAttribute(name, v);
			name = name.toLowerCase();
			for (let o of p.childNodes) {
				if (o.name && o.name.toLowerCase() === name) {
					o.value = v;
					return;
				}
			}
			e = p.ownerDocument.createElement('param');
			e.name = name;
			e.value = v;
			p.appendChild(e);
		},
		unwrapURL : function(url) {
			if (url instanceof Ci.nsINestedURI)
				return url.innermostURI;
			if (url instanceof Ci.nsIURI)
				return url;
			return this.makeURI(url);
		},
		makeURI : function (url) {
			try {
				return Services.io.newURI(url, null, null);
			} catch (e) {
				return null;
			}
		}
	};

	if (window.videos_skipAd) {
		window.videos_skipAd.shutdown();
		delete window.videos_skipAd;
	}
	window.videos_skipAd = {
        classDescription: "videos_skipAd content policy",
        classID: Components.ID("{F3D5E46E-C9E6-4642-9A71-82ECDBACED35}"),
        contractID: "@xinggsf.org/videos_skipAd/policy;1",
        xpcom_categories: ["content-policy"],
        // nsIFactory interface implementation
        createInstance: function(outer, iid) {
            if (outer) throw Cr.NS_ERROR_NO_AGGREGATION;
            return this.QueryInterface(iid);
        },
        // nsISupports interface implementation
        QueryInterface: XPCOMUtils.generateQI([Ci.nsIContentPolicy,
			Ci.nsIObserver, Ci.nsIFactory, Ci.nsISupports]),

		directFilter: function(url) {
			return DIRECT_FILTERS.some(k => url.mixMatchUrl(k));
		},
		matchPlayer: function(filterItem, url) {
			let m = filterItem.player;
			return (m instanceof Array) ?
					m.some(i => url.mixMatchUrl(i)) :
					url.mixMatchUrl(m);
		},
		doPlayer: function(url, node) {
			for (let i of FILTERS) {
				if (this.matchPlayer(i, url)) {
					this.nodeMap.set(node, 0);
					Utils.openFlashGPU(node, {'isPlayer': 1});
					return;
				}
			}
			Utils.openFlashGPU(node, {'url': url});
		},
		filter: function(http) {
			//log(http.contentType);
			let s = http.URI.spec.toLowerCase();
			if (s in this.blockUrls) {
				let i = this.blockUrls[s];
				Utils.block(http, i.secured);
				log('已过滤： ' +s);
				delete this.blockUrls[s];
			}
		},
		preFilter: function(node, url) {
			if (!this.nodeMap.has(node)) return;
			//log(node, url);
			for (let i of FILTERS) {
				if (i.cover && url.mixMatchUrl(i.cover)) {
					this.nodeMap.set(node, 0);
					return;
				}
				if (url.mixMatchUrl(i.url)) {
					if (!i.filter || i.filter(node))
						this.blockUrls[url] = i;
					return;
				}
			}
		},
		html5Filter: function(http) {
			let s = http.URI.spec.toLowerCase();
			for (let i of HTML5_FILTERS) {
				if (s.mixMatchUrl(i.url)) {
					Utils.block(http, i.secured);
					return;
				}
			}
		},
		setReferer: function(http) {
			http.setRequestHeader('Referer', 'http://www.youku.com/', !1);
		},
        // nsIContentPolicy interface implementation
		// @contentType: TYPE_IMAGE=3, TYPE_OBJECT=5, TYPE_DOCUMENT =6, TYPE_SUBDOCUMENT =7, TYPE_OBJECT_SUBREQUEST =12, TYPE_MEDIA =15, TYPE_OTHER =1
		//@contentLocation 请求地址URI, @requestOrigin 页面地址URI
        shouldLoad: function(contentType, contentLocation, requestOrigin, node, mimeTypeGuess, extra) {
			// Ignore requests without context and top-level documents
			if (!node || contentType == 6)
				return Ci.nsIContentPolicy.ACCEPT;

			let wnd = Utils.getWindow(node);
			if (!wnd) return Ci.nsIContentPolicy.ACCEPT;

			let url = Utils.unwrapURL(contentLocation).spec.toLowerCase();
			/* if (node instanceof Ci.nsIDOMHTMLObjectElement) {
				log(node, "contentType:", contentType, url);
			} */
			if (contentType !==5 && contentType !==12 && (node instanceof Ci.nsIDOMHTMLObjectElement || node instanceof Ci.nsIDOMHTMLEmbedElement))
			{
				//Fix type for object_subrequest misrepresented as media/images/other ..etc
				if (!/\.swf(?:$|\?)/.test(url))
					contentType = 12;
				//Fix type for objects misrepresented as frames or images
				else if (contentType ===3 || contentType ===7)
					contentType = 5;
			}

			if (contentType === 5) {//objects
				//log(contentType, url);
				this.doPlayer(url, node);
			}
			else if (contentType === 12) {//object_subrequest
				this.preFilter(node, url);
				if (this.directFilter(url))
					return Ci.nsIContentPolicy.REJECT_REQUEST;
			}
			return Ci.nsIContentPolicy.ACCEPT;
        },
        shouldProcess: function(contentType, contentLocation, requestOrigin, node, mimeTypeGuess, extra) {
            return Ci.nsIContentPolicy.ACCEPT;
        },
        observe: function(aSubject, aTopic, aData) {
            let http = aSubject.QueryInterface(Ci.nsIHttpChannel);
            switch (aTopic) {
				case 'http-on-examine-response':
					this.filter(http);
					this.html5Filter(http);
					break;
				//case 'http-on-modify-request':
					//this.setReferer(http);
					//break;
			}
        },
        startup: function() {
            let registrar = Components.manager.QueryInterface(Ci.nsIComponentRegistrar);
            if (!registrar.isCIDRegistered(this.classID)) {
                registrar.registerFactory(this.classID, this.classDescription, this.contractID, this);
                let catMan = XPCOMUtils.categoryManager;
                for (let category of this.xpcom_categories)
                    catMan.addCategoryEntry(category, this.contractID, this.contractID, false, true);
                //Services.obs.addObserver(this, "http-on-modify-request", false);
                Services.obs.addObserver(this, "http-on-examine-response", false);
            }
			this.nodeMap = new WeakMap();
			let item = FILTERS.find(k => k.id === 'iqiyi');
			item.filter = node => {
				let i = this.nodeMap.get(node) +1;
				this.nodeMap.set(node, i);
				return 2 !== i;
			};
			this.blockUrls = {};
        },
        shutdown: function() {
            let registrar = Components.manager.QueryInterface(Ci.nsIComponentRegistrar);
            if (registrar.isCIDRegistered(this.classID)) {
                registrar.unregisterFactory(this.classID, this);
                let catMan = XPCOMUtils.categoryManager;
                for (let category of this.xpcom_categories)
                    catMan.deleteCategoryEntry(category, this.contractID, false);
                //Services.obs.removeObserver(this, "http-on-modify-request");
                Services.obs.removeObserver(this, "http-on-examine-response");
            }
			this.blockUrls = null;
        }
    };
	function log(...a) {
		Cu.reportError(a.join(', '));
	}

	videos_skipAd.startup();
})();
