// ==UserScript==
// @include			main
// @version			0.2.1
// @note			[20141128]兼容E10S
// ==/UserScript==
location == "chrome://browser/content/browser.xul" && (function () {
	//Location Bar Enhancer5.1;Loading Bar0.3.0
	var loadingBar = {
		progress: new WeakMap(),
		init: function () {
			if(document.getElementById('UCloadingBar')) return;
			var cssStr = (function () {/*
				@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);
				@-moz-document url("chrome://browser/content/browser.xul"){
					@keyframes UCloadingBarPulse {
						0% {opacity:1}
						50% {opacity:0}
						100% {opacity:1}
					}
					#UCloadingBar[style="transform: translate3d(-100%, 0px, 0px);"], 
					#UCloadingBar:not([style]){
						display:none!important;
					}
					#UCloadingBar{
						transition: transform 400ms ease 0s;
						position: fixed;
						width:100%;
						background-image:-moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(254,178,53,1) 100%);
						transform: translate3d(-80%, 0px, 0px);
						border-left:2px transparent;
						border-right:2px transparent;
						pointer-events:none;
						overflow: hidden;
						background-size: 100% 2px;
						background-repeat: repeat-x;
						height: 10px;
					}
					#UCloadingBar::before{
						content:'';
						position: absolute;
						top:-10px;
						right: 0px;
						width: 100px;
						height: 100%;
						box-shadow: 0px 0px 10px 1px rgba(254,178,53,1), 0px 0px 5px 1px rgba(254,178,53,1);
						transform: rotate(3deg) translate(0px, -3px);
						animation:UCloadingBarPulse 2s ease-out 0s infinite;
					}
				}
			*/}).toString().replace(/^.+\s|.+$/g, "");
			var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService),
				ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
				sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
			var appcontent = document.getElementById('appcontent'),
				lb  = document.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'hbox');
			lb.id = 'UCloadingBar';
			appcontent.insertBefore(lb, appcontent.firstChild);
			this.progressBar = lb;
			gBrowser.tabContainer.addEventListener('TabSelect', this, false);
			gBrowser.addTabsProgressListener(this);
		},
		handleEvent: function (e) {
			if (e.type == "TabSelect") {
				this.onChangeTab();
			}
		},
		onChangeTab: function () {
			var cd = gBrowser.selectedBrowser,
				val = this.progress.get(cd);
			if (!val) {
				this.progress.set(cd, 0);
				val = 0;
			}
			if(!this.progressBar) return;
			if (val > 0.95) {
				this.progressBar.style.transform = 'translate3d(-'+ (val == 1 ? 100 : 0) + '%, 0, 0)';
			} else {
				this.progressBar.style.transform = 'translate3d('+((val * 100) - 100) + '%, 0, 0)';
			}
		},
		onProgressChange: function (aBrowser, webProgress, request, curSelfProgress, maxSelfProgress, curTotalProgress, maxTotalProgress) {
			if (/^about\:/.test(aBrowser[gMultiProcessBrowser ?'contentDocumentAsCPOW' : 'contentDocument'].URL)) return;
			var val = (curTotalProgress - 1) / (maxTotalProgress - 1);
			this.progress.set(aBrowser, val);
			if (this.progressBar && gBrowser.selectedBrowser === aBrowser) {
				this.progressBar.style.transform = 'translate3d('+((val * 100) - 100) + '%, 0, 0)';

				if (val > 0.9) this.timer(function(){
					if (val > 0.95) {
						this.progressBar.style.transform = 'translate3d(-'+ (val == 1 ? 100 : 0) + '%, 0, 0)';
					}
				}.bind(this), 500);
			}
		},
		onStateChange: function () {
			var aBrowser = arguments[0],
				val = this.progress.get(aBrowser);
			this.progress.set(aBrowser, val || 0);
			if (this.progress.get(aBrowser) > 0.95) {
				this.timer(function () {
					this.progressBar.style.transform = 'translate3d(-100%, 0, 0)';
				}.bind(this), 500);
			}
			if(arguments[3] & 16){
				this.progress.set(aBrowser, 1);
			}
		},
		timer: function (callback, delay) {
			delay = delay || 0;
			let timer = setTimeout(function () {
				stopTimer();
				callback();
			}, delay);

			function stopTimer() {
				if (timer == null) return;
				clearTimeout(timer);
				timer = null;
			}
		}
	};
	loadingBar.init();
})();