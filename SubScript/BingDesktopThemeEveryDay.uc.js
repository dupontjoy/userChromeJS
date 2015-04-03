//2015.04.02 09:00 必应美图改到配置文件夹下

function  setBingTheme()
{

var now=getNow();
var history=getDate();
if(now>history)
	{
	init();
	
	
	}

function getNow()
	{
	var t=new Date();
	var y=t.getFullYear();
	var m=t.getMonth()+1;if(m<10) m='0'+m;
	var d=t.getDate();if(d<10) d='0'+d;
	n=parseInt(''+y+m+d);
	return n;
	}
function getDate()
	{
	
	var p=Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
	try
	{
	var d=p.getIntPref('userchromejs.data.BingDesktopTheme');
	return d;
	}
	catch(err)
	{
	p.setIntPref('userchromejs.data.BingDesktopTheme',0);
	return 0;
	}

	}
function init()
{
var xhr=new XMLHttpRequest();
xhr.open('GET','http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&nc='+new Date().getTime(),false);

xhr.onload=function()
			{
			var mes=JSON.parse(xhr.responseText);
			var enddate=parseInt(mes.images[0].enddate);
			var ddd=mes.images[0].url;
			var name=mes.images[0].copyright;
			var p=Components.classes["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
			p.setIntPref('userchromejs.data.BingDesktopTheme',enddate);
			var t=new Image();
			t.src=ddd;
			t.onload=function()
				{
				
				var shell=Cc["@mozilla.org/browser/shell-service;1"].getService(Ci.nsIShellService);
			shell.setDesktopBackground(t,Ci.nsIShellService["BACKGROUND_STRETCH"]);
				
				
				try{var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
				var path = /*Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path*/ Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\必应美图\\" + enddate+'-'+name.replace(/ \(.*?\)/g,'')+ ".jpg";
				file.initWithPath(path);
				file.create(Components.interfaces.nsIFile.NOMAL_FILE_TYPE, 0777)		
				Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(ddd.replace('1366x768','1920x1080'), null, null), null, null, null, null, null, file, null);
				}catch(err){alert(err)};
				
				}

				
			}
xhr.send();

}

};
setBingTheme();