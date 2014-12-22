// ==UserScript==
// @name nolazyload
// @namespace https://greasyfork.org/scripts/791-nolazyload/
// @version    5.7
// @description  将lazyload图片提前读进缓存,提高加载速度 preload all lazyload pictures at once
// @include *
// @copyright  反馈和建议E-mail: nolazyload@foxmail.com
// ==/UserScript==

var time_interval = 300; //运行间隔(毫秒)

var lazypic = ["data-ks-lazyload","data-ks-lazyload-custom","data-lazy-load-src","data-lazyload","original","file","data-src","data-cover","data-original","data-thumb","real_src","src2","data-imageurl","data-defer-src","data-placeholder","origin-src","data-actualsrc","org_src","data-lazyload-src"];
var nolazypic = new Array();

//直接加载
var dipic = ["item.taobao.com","detail.tmall.com","www.youtube.com","detail.1688.com","www.zhihu.com"]; 


//白名单
var wlist = ["search.taobao.com","list.tmall.com","s.taobao.com"];
function nolazyload4()
{
    try
    {
        var hostn = location.hostname;
        for(var iii=0;iii<wlist.length;iii++)
        {
            if(hostn.indexOf(wlist[iii])>-1) //检测白名单
            {
                //alert("wlist");
                return;
            }
        }
    
        var imgs = document.images;
        for(var i=0;i<imgs.length;i++)
        {
            for(var j=0;j<lazypic.length;j++)
            {
                for(var p=0;p<imgs[i].attributes.length;p++)
                {
                    if(imgs[i].attributes[p].nodeName == lazypic[j])
                    {
                        //alert(imgs[i].attributes[p].nodeName);
                        preload(imgs[i].attributes[p].nodeValue, lazypic[j], i);
                    }
                }
            }
        }
    setTimeout(nolazyload4,time_interval);
    }catch(e)
    {
        //alert("error"+e);
    }
    //alert(atv); //测试用
}

function preload(x,y,z)
{
    var loaded = false;
    for(var l = 0;l<nolazypic.length;l++)
    {
        if(x == nolazypic[l])
        {
            loaded = true;
            break;
        }
    }
    if(loaded)
    {
        return;
    }
    else
    {
        loading(x,y,z);
    }
    
}
//var atv = "";//测试用
function loading(x,y,z)
{
    if(di_check(y))
    {
        //atv+=y+"|"+z+"|"+x+"\n"; //测试用
        //alert(location.hostname);
        document.images[z].src=x;
        document.images[z].removeAttribute(y);
    }
    else
    {
        new Image().src = x;
    }
    nolazypic.push(x)
}

function di_check(y)
{
    var hn = location.hostname;
    for(var i=0;i<dipic.length;i++)
    {
        if(hn.indexOf(dipic[i])>-1) //检测页面hostname里是否包含直接加载域名
        {
            return true;
        }
    }
    return false;
}

nolazyload4();