// ==UserScript==
// @name           Ctrl And Right Click Picture
// @version        0.0.6
// @include        main
// @description    使用Ctrl + 右键，破解某些禁止右键图片另存为的站点
// @description    使用Ctrl + Atl + 右键，简单地获取背景图片
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function(){
	var ctrlAndRightClickPicture ={
		image: null,
		createImage: function(oArg){
			var image = oArg.doc.createElement("img");
			image.style.cssText = 'width:' + oArg.width + ';'
								+ 'height:' + oArg.height + ';'
								+ 'top:' + oArg.top +'px;'
								+ 'left:' + oArg.left +'px;'
								+ 'cursor:' + oArg.cursor + ';'
								+ 'position: fixed;'
								+ 'z-index:100000000;'
								+ 'opacity: 0;';
			image.src = oArg.url;
			oArg.doc.body.appendChild(image);
			return image;
		},
		getPicture: function(event){
			try{
				this.image && this.image.remove();
			}catch(e){}
			var target = event.target;
			if(target.localName == "img" && (target.naturalWidth > 4 || target.naturalHeight > 4)){
				return null;
			}
			var targetStyle = getComputedStyle(target),
				imgs = event.view.document.querySelectorAll("img[src]"),
				x = event.clientX,
				y = event.clientY;
			if(event.altKey){
				var targetNode = target,
					targetNodeStyle = null;
				while(targetNode != null){
					if(targetNode.nodeType != 1) continue;
					targetNodeStyle = getComputedStyle(targetNode, null);
					if(targetNodeStyle.backgroundImage != "none"){
						var targetNodeBg = targetNodeStyle.backgroundImage.match(/(?:http|data\:image)[^"')]+/);
						if(targetNodeBg){
							var rectBg = targetNode.getBoundingClientRect();
							return this.createImage({
								doc    :event.view.document,
								width  :targetNodeStyle.width,
								height :targetNodeStyle.height,
								top    :(rectBg.height - targetNode.height) / 2 + rectBg.top,
								left   :(rectBg.width - targetNode.width) / 2 + rectBg.left,
								cursor :targetStyle.cursor,
								url    :targetNodeBg[0]
							});
						}
					}
					if(targetNode.localName == "html") break;
					targetNode = targetNode.parentNode;
				}
			}
			for(var img of imgs){
				var rect = img.getBoundingClientRect(),
					bh = (rect.height - img.height) / 2,
					bw = (rect.width - img.width) / 2,
					hasBgImg = /url\s*?\(/.test(targetStyle.backgroundImage);
				let tsH = parseInt(targetStyle.height),
					tsW = parseInt(targetStyle.width);
				if((img.naturalWidth > 4 && img.naturalHeight > 4 || hasBgImg) 
					&& rect.left < x && rect.left + rect.width + bw > x 
					&& rect.top < y && rect.top + rect.height + bh > y
					&& (Math.abs(tsH - img.height) / tsH <=0.07
					|| Math.abs(tsW - img.width) / tsW <= 0.07)
				){
					var imgurl;
					if(hasBgImg){
						var imgurl_match = targetStyle.backgroundImage.match(/(?:http|data\:image)[^"')]+/);
						if(img.naturalWidth > 4 && img.naturalHeight > 4 && !imgurl_match) continue;
						if(img.naturalWidth*img.naturalHeight > tsH*tsW)
							imgurl = img.src;
						else
							imgurl = imgurl_match[0];
					}else{
						if(img.naturalWidth < 5 && img.naturalHeight < 5) continue;
						imgurl = img.src;
					}
					return this.createImage({
						doc    :event.view.document,
						width  :targetStyle.width,
						height :targetStyle.height,
						top    :bh + rect.top,
						left   :bw + rect.left,
						cursor :targetStyle.cursor,
						url    :imgurl
					});
				}
			}
			return null;
		},
		init: function(){
			gBrowser.addEventListener("mousedown", this, true);
			gBrowser.addEventListener("click", this, true);
			gBrowser.addEventListener("contextmenu", this, true);
			document.getElementById("contentAreaContextMenu").addEventListener("popuphiding", this, true);
		},
		handleEvent: function(event){
			if(event.type == 'mousedown' && event.button == 2 && event.ctrlKey){
				event.stopPropagation();
				event.preventDefault();
				this.image = this.getPicture(event);
				var contextmenuEvent = document.createEvent("MouseEvents");
				contextmenuEvent.initMouseEvent("contextmenu", true, false, null, true, event.screenX, event.screenY, event.screenX, event.screenY, false, false, false, false, 2, null);
				(this.image || event.target).dispatchEvent(contextmenuEvent);
			}else if((event.type == 'click' || event.type == 'contextmenu') && event.button == 2 && event.ctrlKey){
				event.stopPropagation();
				event.preventDefault();
			}else if(event.type == "popuphiding"){
				try{
					this.image && this.image.remove();
				}catch(e){}
			}
		}
	};

	ctrlAndRightClickPicture.init();
})();