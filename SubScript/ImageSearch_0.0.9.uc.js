// ==UserScript==
// @name			ImageSearch
// @version			0.0.9
// @description		搜索相似图片
// @include			main
// @note			[20141005]通过压缩图片，改善bing大图出现空白页的问题。
// @note			[20141007]一些小改动。
// @note			[20150115]增加好搜。
// @note			[20150608]增加百度OCR，需要输入你百度apikey
// @note			[20150614]修正小错误
// @note			[20150716]增加kemuri-net.com
// @note			[20150815]图标文件夹修改为配置文件夹的chrome目录中
// @note			[20160406]好搜搜图地址变更,百度post修复
// ==/UserScript==

// 下面的字符串可以被用来与网站的特定的变量传递图像的信息

// {$URL}				-> 替换图像地址 - 对 GET 和 POST 有效
// {$IMGDATA}			-> 替换为被右击的图像的数据 - 对 POST 有效
// {$IMGBASE64[H]}		-> 替换为被右击的图像的Base64（末尾包含H表示完整base64编码）的数据 - 对 POST 有效

location == 'chrome://browser/content/browser.xul' && (function () {
	var imageSearch = {

		baiduApiKey: '', //在这里输入你的百度apikey, key获取地址http://apistore.baidu.com/apiworks/servicedetail/146.html

		bgImage: true, //是否对背景图起效

		get contextMenu() document.getElementById('contentAreaContextMenu'),

		zh: Cc['@mozilla.org/chrome/chrome-registry;1'].getService(Ci.nsIXULChromeRegistry).getSelectedLocale('browser').indexOf('zh') != -1,

		site: {
			//Google为一般模板，Bing和baidu相对特殊另外一些处理
			'Google': 		{
				disable: false,	//默认非禁用，可省略
				icon: true,		//true时默认会使用 配置目录\chrome\skin\imageSearch\Google.png 同名png文件作为菜单图标，可使用base64图片，注意要用引号引住【如 icon: 'data:image/jpeg;base64,xxxxxxxxxx==',】
				icon: 'https://www.google.com/favicon.ico',
				left:{ //左键，下面如果出现both则为左右键行为一致
					url:'https://www.google.com/searchbyimage', //搜图地址
					method: 'GET', //GET方法
					parameters:{
						qs: ['image_url={$URL}'] //查询字符串，
					}
				},right:{//右键，下面如果出现both则为左右键行为一致
					url:'https://www.google.com/searchbyimage/upload', 
					method: 'POST',//POST方法
					parameters:{
						qs: ['encoded_image={$IMGDATA}']
					}
				}},
			/*'Bing': 	{
				icon: true,
				left:{url:'http://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi', method: 'GET',
					parameters:{
						qs: ['imgurl={$URL}']
					}
				},right:{url:'http://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi', method: 'POST',
					parameters:{
						qs: ['imgurl=', 'cbir=sbi', 'imageBin={$IMGBASE64}'],
						whst:'sbifsz={$W}+x+{$H}+%c2%b7+{$S}+kB+%c2%b7+{$T}&sbifnm=upload.{$T}&thw={$W}&thh={$H}',//链接参数，W、H、S、T分别对应 宽、高、图片大小、类型
						octetStream: true, //octet-stream
						compress: 160, //压缩图片最长/宽为160px
					}
				}},*/
			'Baidu': 		{
				icon: true,
				icon: 'http://tu.baidu.com/favicon.ico',
				left:{url:'http://stu.baidu.com/i', method: 'GET',
					parameters:{
						qs: ['rt=0', 'rn=10', 'ct=1', 'tn=baiduimage', 'objurl={$URL}']
					}
				},right:{url:'http://image.baidu.com/n/image?fr=html5&target=pcSearchImage&needJson=true&id=WU_FILE_0', method: 'POST',
					parameters:{
						qs: ['dragimage={$IMGBASE64H}'], //完整base64图片字符串
						name: 'Baidu',
						whst:'&name=upload.{$T}&type=image%2F{$T}&lastModifiedDate=&size={$S}'
					}
				}},
			/*'BaiduOCR': 		{
				icon: true,
				both:{url:'http://apis.baidu.com/apistore/idlocr/ocr', method: 'POST',
					parameters:{
						qs: ['fromdevice=pc', 'clientip=10.10.10.0', 'detecttype=LocateRecognize', 'languagetype=CHN_ENG', 'imagetype=1', 'image={$IMGBASE64}'],
						name: 'BaiduOCR'
					}
				}},*/
			'HaoSou': 		{
				icon: true,
				icon: 'http://st.so.com/faviconso.ico',
				left:{url:'http://st.so.com/stu', method: 'POST',
					parameters:{
						qs: ['base64image=', 'submittype=imgurl', 'imgurl={$URL}', 'src=st']
					}
				},right:{url:'http://st.so.com/stu', method: 'POST',
					parameters:{
						qs: ['imgurl=', 'base64image={$IMGBASE64H}', 'submittype=drag', 'src=st'] //完整base64图片字符串
					},
					octetStream: true, //octet-stream
				}},
			'TinEye': 		{
				icon: true,
				icon: 'http://www.tineye.com/favicon.ico',
				left:{url:'http://www.tineye.com/search/', method: 'GET',
					parameters:{
						qs: ['url={$URL}']
					}
				},right:{url:'http://www.tineye.com/search/', method: 'POST',
					parameters:{
						qs: ['image={$IMGDATA}']
					}
				}},

		},

		init: function(){
			if(document.getElementById('imageSearch')) return;
			this.createMenu();
			var cM = this.contextMenu;
			cM.addEventListener('click', this, false);
			cM.addEventListener('popupshowing', this, false);
		},

		createMenu: function(){
			var cE = this.createElement,
				site = this.site,
				menu = cE('menu', {id: 'imageSearch', hidden: true, 
					label: this.zh ? '搜索相似图片' : 'Image Search'}, 
					[this.contextMenu, document.getElementById('context-saveimage')]),
				popup = cE('menupopup', null, menu);
			for(var i in site){
				if(site[i].disable) continue;
				let icon = site[i].icon,
					tip = [];
				('left' in site[i]) && tip.push((this.zh ? '左键：' : 'Left Click:') + site[i].left.method);
				('right' in site[i]) && tip.push((this.zh ?'右键：' : 'Right Click:') + site[i].right.method);
				('both' in site[i]) && tip.push((this.zh ?'左、右键：' : 'Left & Right Click:') + site[i].both.method);
				cE('menuitem', {
					class: 'menuitem-iconic image-search-engine', label: i, tooltiptext: tip.join('\n'),
					//src: (typeof icon == 'boolean') && icon ? 'chrome://userchromejs/content/skin/imageSearch/' + i.trim() +'.png' : (icon ? icon : '')
					src: (typeof icon == 'boolean') && icon ? Services.io.newFileURI(Services.dirsvc.get('UChrm', Ci.nsIFile)).spec + 'skin/imageSearch/' + i.trim() +'.png' : (icon ? icon : '')
				}, popup);
			}
			this.menu = menu;
		},

		createElement: function(name, attr, parent){
			var e = document.createElementNS(
					'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', name);
			if(attr) for (var i in attr) e.setAttribute(i, attr[i]);
			if(parent){
				if(parent instanceof Array){
					parent[0].insertBefore(e, parent[1]);
				}else{
					parent.appendChild(e);
				}
			}
			return e;
		},

		handleEvent: function(event){
			switch (event.type){
				case 'click':
					this.onClick(event);
					break;
				case 'popupshowing':
					this.onPopupShowing(event);
					break;
			}
		},

		onClick: function(event){
			var target = event.target,
				click = event.button == 2 ? 'right' : (event.button == 0 ? 'left' : null),
				imgURL = (gContextMenu && (gContextMenu.onImage && gContextMenu.imageURL) || 
					(this.bgImage && gContextMenu.hasBGImage && gContextMenu.bgImageURL)),
				site = this.site, name = null, rule = null;
			if(!click || !target.classList.contains('image-search-engine') || !this.menu.contains(target)) return;
			name = target.getAttribute('label');
			if(name in site){
				let engine = site[name],
					imgDataRequest = '', 
					dataParam = {},
					imgIndex = 0;
				dataParam.qs = [];
				rule = engine[click] ? engine[click] : engine.both;
				for(var j in rule.parameters){
					if(j != 'qs') dataParam[j] = rule.parameters[j];
				}

				let regx = /\{\$([A-Z]*(?:64(?:H)?)?)\}/;
				for(var i = 0; i<rule.parameters.qs.length; i++){
					let match = rule.parameters.qs[i].match(regx);
					if(match){
						imgDataRequest = match;
						if(match[1] == 'URL'){
							dataParam.qs.push(rule.parameters.qs[i]
								.replace(regx, rule.method == 'GET' ? encodeURIComponent(imgURL) : imgURL));
						}else{
							imgIndex = i;
							dataParam.qs.push(rule.parameters.qs[i]);
						}
					}else{
						dataParam.qs.push(rule.parameters.qs[i]);
					}
				}

				if(!imgDataRequest) return;

				if(rule.method == 'GET'){
					this.methodGetURL(rule.url, dataParam);
				}else if(rule.method == 'POST'){
					if(imgDataRequest[1] == 'URL'){
						this.methodPostURL(rule.url, dataParam);
					}else{
						this.methodPostData(imgURL, rule.url, dataParam, imgIndex);
					}
				}
			}
		},

		onPopupShowing: function(event){
			var target = event.target;
			if(target.id == 'contentAreaContextMenu' && this.menu){
				if(gContextMenu && (gContextMenu.onImage || (this.bgImage && gContextMenu.hasBGImage))){
					this.menu.removeAttribute('hidden');
				}else{
					this.menu.setAttribute('hidden', true);
				}
			}
		},

		imageCompress: function(n, t){
			var y, u = (n, t, i, r, u, f, e) => {
				n[t] += i * e, n[t + 1] += r * e, n[t + 2] += u * e, n[t + 3] += f * e
			};
			if (!(t < 1) || !(t > 0)) return n.toDataURL();
			var yt = t * t, rt = n.width, it = n.height, l = Math.ceil(rt * t), ht = Math.ceil(it * t),
				nt = 0, ot = 0, f = 0, k = 0, d = 0, lt = 0, i = 0, b = 0, g = 0, a = 0,
				s = 0, st = 0, ft = 0, ut = 0, et = 0, v = !1, w = !1, p;
			try {
				p = n.getContext('2d').getImageData(0, 0, rt, it).data
			} catch (pt) {
				return !1
			}
			var r = new Float32Array(4 * rt * it),
				h = 0, o = 0, c = 0, e = 0;
			for (ot = 0; ot < it; ot++) for (d = ot * t, g = 0 | d, lt = 4 * g * l, w = g != (0 | d + t), w && (ut = g + 1 - d, et = d + t - g - 1), nt = 0; nt < rt; nt++, f += 4) k = nt * t,
			b = 0 | k, i = lt + b * 4, v = b != (0 | k + t), v && (st = b + 1 - k, ft = k + t - b - 1),
			h = p[f], o = p[f + 1], c = p[f + 2], e = p[f + 3],
			v || w ? v && !w ? (a = st * t, u(r, i, h, o, c, e, a), s = ft * t, u(r, i + 4, h, o, c, e, s)) : w && !v ? (a = ut * t, u(r, i, h, o, c, e, a), s = et * t, u(r, i + 4 * l, h, o, c, e, s)) : (a = st * ut, u(r, i, h, o, c, e, a), s = ft * ut, u(r, i + 4, h, o, c, e, s), s = st * et, u(r, i + 4 * l, h, o, c, e, s), s = ft * et, u(r, i + 4 * l + 4, h, o, c, e, s)) : u(r, i, h, o, c, e, yt);
			y = content.document.createElement('canvas'), y.width = l, y.height = ht;
			var vt = y.getContext('2d'), at = vt.getImageData(0, 0, l, ht), tt = at.data, ct = 0;
			for (f = 0, i = 0; ct < l * ht; f += 4, i += 4, ct++) tt[i] = Math.ceil(r[f]),
			tt[i + 1] = Math.ceil(r[f + 1]),
			tt[i + 2] = Math.ceil(r[f + 2]),
			tt[i + 3] = Math.ceil(r[f + 3]);
			return vt.putImageData(at, 0, 0), y.toDataURL();
		},

		getImageType: function(ascii){
			var hex = Array.prototype.map.call(ascii.slice(0, 2), function(s){
				return s.charCodeAt(0).toString(16);
			}).join('');
			return ['jpeg', 'png', 'gif', 'bmp'][['ffd8', '8950', '4749', '424d'].indexOf(hex)] || 'png';
		},

		methodGetURL: function(siteURL, siteVars){
			siteVars = siteVars.qs;
			siteVars = siteVars.join('&');
			siteURL += (siteURL.indexOf('?') > 0 ? '&' : '?') + siteVars
			gBrowser.loadOneTab(siteURL, null, null, null, false, false);
		},

		methodPostURL: function(siteURL, siteVars) {
			siteVars = siteVars.qs;
			var separator = '-----------------------------8361219948688';
			var formData = '';
			for (var i = 0; i < (siteVars.length); i++) {
				var splitVar = siteVars[i].split('=', 2);
				formData += '--' + separator + '\r\n' + 'Content-Disposition: form-data; name="' + splitVar[0] + '"\r\n\r\n' + splitVar[1] + '\r\n';
			}
			formData += '--' + separator + '--\r\n'; //finish off request
			var postData = Cc['@mozilla.org/io/string-input-stream;1'].createInstance(Ci.nsIStringInputStream);
			formData = 'Content-Type: multipart/form-data; boundary=' + separator + '\n' + 'Content-Length: ' + formData.length + '\n\n' + formData;
			postData.setData(formData, formData.length);
			var flags = Ci.nsIWebNavigation.LOAD_FLAGS_NONE;
			gBrowser.selectedTab = gBrowser.addTab()
			gBrowser.loadURIWithFlags(siteURL, flags, Services.io.newURI(siteURL, null, null), null, postData);
		},

		methodPostData: function(imgURL, siteURL, siteVars, imgDataVar) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', imgURL, true);
			xhr.responseType = 'blob';
			xhr.onload = () => {
				var blob = xhr.response;
				if(!blob) return;
				var reader = new FileReader();
				reader.onloadend = () => {
					var result = reader.result;
					if(!result) return;
					var p = siteVars;
					siteVars = siteVars.qs;
					var match = siteVars[imgDataVar].match(/\{\$([A-Z]*(?:64(H)?)?)\}/);
					var base64 = match && match[1] && match[1].indexOf('IMGBASE64') == 0;

					//use post instead of get - tricky stuff here...
					var separator = '-----------------------------8361219948688';
					var cdfdname = '\r\nContent-Disposition: form-data; name="';
					var dataURL = '';
					var imageObj = null;
					var cpng = false;
					if(p.compress){
						cpng = true;
						imageObj = new Image();
						imageObj.src = imgURL;
						let e = p.compress / Math.max(imageObj.width, imageObj.height),
							t = content.document.createElement('canvas');
						(e <= 0 || e > 1) && (e = 1);
						t.width = imageObj.width, t.height = imageObj.height;
						t.getContext('2d').drawImage(imageObj, 0, 0, t.width, t.height);
						dataURL = this.imageCompress(t, e) || result;
					}else{
						dataURL = result;
					}
					var size = blob.size;
					dataURL = dataURL.split(',', 2)[1];
					var imageData = atob(dataURL);
					var mimetype = this.getImageType(imageData);
					dataURL = (base64 && match[2] == 'H' ? ('data:image/'+ (cpng ? 'png' : mimetype) +';base64,' + dataURL) : dataURL);
					var fileSpecifier = '';
					var formData = '';

					for (var i = 0; i < (siteVars.length); i++) {
						var splitVar = siteVars[i].split('=', 2);
						if (i == imgDataVar) {
							if(!base64){
								fileSpecifier = splitVar[0];
								formData += '--' + separator+ cdfdname + 'iso2"\r\n\r\nyoro~n\r\n';
							}else{
								formData += '--' + separator + cdfdname + splitVar[0] + '"\r\n\r\n' + dataURL + '\r\n';
							}
						} else {
							formData += '--' + separator + cdfdname + splitVar[0] + '"\r\n\r\n' + splitVar[1] + '\r\n';
						}
					}

					formData += '--' + separator + '--\r\n'; //finish off the string
					if(!base64){
						var suffixStringInputStream = Cc['@mozilla.org/io/string-input-stream;1'].createInstance(Ci.nsIStringInputStream);
						suffixStringInputStream.setData(formData, formData.length);
						//set up post form
						var prefixStringInputStream = Cc['@mozilla.org/io/string-input-stream;1'].createInstance(Ci.nsIStringInputStream);

						formData = '--' + separator + cdfdname + fileSpecifier + '"; filename="upload.'+ (cpng ? 'png' :mimetype.replace('jpeg', 'jpg')) + '"\r\n' + 'Content-Type: "image/'+ mimetype +'"\r\n\r\n';
						prefixStringInputStream.setData(formData, formData.length);
						//create storage stream
						var binaryOutStream = Cc['@mozilla.org/binaryoutputstream;1'].createInstance(Ci.nsIBinaryOutputStream);
						var storageStream = Cc['@mozilla.org/storagestream;1'].createInstance(Ci.nsIStorageStream);
						storageStream.init(4096, imageData.length, null);
						binaryOutStream.setOutputStream(storageStream.getOutputStream(0));
						binaryOutStream.writeBytes(imageData, imageData.length);
						binaryOutStream.close();
						//combine
						var combinedStream = Cc['@mozilla.org/io/multiplex-input-stream;1'].createInstance(Ci.nsIMultiplexInputStream);
						combinedStream.appendStream(prefixStringInputStream);
						combinedStream.appendStream(storageStream.newInputStream(0));
						combinedStream.appendStream(suffixStringInputStream);
						formData = 'Content-Type: multipart/form-data; boundary=' + separator + '\n' + 'Content-Length: ' + combinedStream.available() + '\n\n';
						var postData = Cc['@mozilla.org/io/multiplex-input-stream;1'].createInstance(Ci.nsIMultiplexInputStream);
						var postHeader = Cc['@mozilla.org/io/string-input-stream;1'].createInstance(Ci.nsIStringInputStream);

						postHeader.setData(formData, formData.length);
						postData.appendStream(postHeader);
						postData.appendStream(combinedStream);
					}else{
						if(p.octetStream) formData = '--' + separator + cdfdname +'image"; filename="" \r\n\r\nContent-Type: application/octet-stream \r\n' + formData;

						formData = 'Content-Type: multipart/form-data; boundary=' + separator + '\n' + 'Content-Length: ' + formData.length + '\n\n' + formData;

						var postData = Cc['@mozilla.org/io/string-input-stream;1'].createInstance(Ci.nsIStringInputStream);
						postData.setData(formData, formData.length);
					}

					if(p.name == 'BaiduOCR'){
						imageObj = null;
						let xhr1 = new XMLHttpRequest();
						xhr1.open('POST', siteURL, true);
						xhr1.setRequestHeader('apikey', this.baiduApiKey);
						xhr1.onload = () => {
							let str = JSON.parse(xhr1.responseText);
							if(str.errMsg === 'success'){
								let word = [];
								for(let i of str.retData)
									word.push(i.word);
								let converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
								converter.charset = 'UTF-8';
								gBrowser.loadOneTab('data:text/html;charset=UTF-8;base64,' + btoa('<textarea style="height:98%; width:100%">' + converter.ConvertFromUnicode(word.join('\n')) + '</textarea>'), null, null, null, false, false);
							}else{
								alert(str.errMsg);
							}
						}
						let data = new FormData();
						siteVars.forEach((a, b) =>{
							if(b == imgDataVar){
								if(mimetype !== 'jpeg'){
									let imageObj = new Image();
									imageObj.src = imgURL;
									let t = content.document.createElement('canvas');
									t.width = imageObj.width, t.height = imageObj.height;
									t.getContext('2d').drawImage(imageObj, 0, 0, t.width, t.height);
									dataURL = t.toDataURL('image/jpeg', 0.9).split(',', 2)[1];
									imageObj = null;
								}
								data.append(a.split('=')[0], dataURL);
							}else{
								data.append.apply(data, a.split('='))
							}
						});
						xhr1.send(data);
						return;
					}

					var flags = Ci.nsIWebNavigation.LOAD_FLAGS_NONE;
					gBrowser.selectedTab = gBrowser.addTab();
					if(p.whst){
						if(!imageObj){
							imageObj = new Image();
							imageObj.src = imgURL;
						}
						siteURL += (siteURL.indexOf('?') > 0 ? '&' : '?') + 
						p.whst.replace(/\{\$([WHST])\}/g, ($0, $1) => {
							if($1 == 'W') return imageObj.width;
							else if($1 == 'H') return imageObj.height;
							else if($1 == 'S') return p.name == 'Baidu' ? size : parseInt(size/1024);
							else if($1 == 'T') return mimetype;
						});
					}
					imageObj = null;
					if(p.name == 'Baidu'){
						let xhr2 = new XMLHttpRequest();
						xhr2.open('POST', siteURL, true);
						xhr2.onload = () => {
							let str;
							try{
								str = JSON.parse(xhr2.responseText);
							}catch(e){console.error(e)}
							if(str.errno === 0){
								siteURL = str.data && str.data.pageUrl || siteURL;
								gBrowser.loadOneTab(siteURL, null, null, null, false, false);
							}else{
								alert(str.errmsg);
							}
						}
						xhr2.send(blob);
					}else{
						gBrowser.loadURIWithFlags(siteURL, flags, Services.io.newURI(siteURL, null, null), null, postData);
					}
				};
				reader.readAsDataURL(blob);
			};
			xhr.send(null);
		},
	};

	imageSearch.init();
})();