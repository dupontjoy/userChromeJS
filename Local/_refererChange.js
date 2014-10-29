//   @NORMAL：不改变referer
//   @FORGE：发送根站点referer
//   @ORIGINAL：发送打开站点referer
//   @BLOCK : 发送空referer
//2014.10.27

sites = {
    //自定义
    'about:blank': '@NORMAL',
    'jump.bdimg.com': '@NORMAL',
    'img.liufen.com': 'http://www.liufen.com.cn/',
    't4.mangafiles.com' : 'http://www.imanhua.com/',
    't5.mangafiles.com' : 'http://www.imanhua.com/',
    'laibafile.cn' : 'http://www.tianya.cn/',
    'zol.com.cn' : '@FORGE',
    'tmoke.com': '@BLOCK',
    '51img1.com' : '@FORGE',
    'zol-img.com.cn' : '@FORGE',
    
    // 
    'douban.com': 'http://www.douban.com',
    'yyets.com': 'http://www.yyets.com/',
    'img.cnbeta.com': '@FORGE',
     
    // baidu 相关网站
    'hiphotos.baidu.com': '@FORGE',
    'hiphotos.bdimg.com' : '@FORGE',
    'imgsrc.baidu.com': '@FORGE',
    'baidu-img.cn': 'http://www.baidu.com/',

    // sina
    'photo.sina.com.cn': '@BLOCK',
    'sinaimg.cn': 'http://blog.sina.com.cn/',
 
    'pixiv.net': '@FORGE',
    'ph.126.net' : '@FORGE',
    'isnowfy.com': '@FORGE',
    'image.itmedia.co.jp': '@FORGE',
    '2ch.net': '@FORGE',
    'imepita.jp': '@ORIGINAL',
    'tumblr.com': '@FORGE',
    'photo.store.qq.com': '@FORGE',
    'img.pconline.com.cn': '@FORGE',
    'fc2.com': '@BLOCK',
    'blogs.yahoo.co.jp': '@BLOCK',
    'hentaiverse.net': '@BLOCK',
    'qlogo.cn': '@BLOCK',
    'qpic.cn': '@BLOCK',
    'fmn.rrfmn.com': '@BLOCK',
    'postimage.org': '@FORGE',
 
    'bdstatic.com': 'http://tieba.baidu.com/',
    'space.wenxuecity.com': 'http://bbs.wenxuecity.com/',
    'www.autoimg.cn': 'http://club.autohome.com.cn/',
    'kkkmh.com': 'http://www.kkkmh.com/',
    'nonie.1ting.com': 'http://www.1ting.com/',
    'img.knb.im': 'http://www.kenengba.com/',
    'tianya.cn': 'http://bbs.tianya.cn/',
    'xici.net': 'http://www.xici.net/',
    'media.chinagate.com': 'http://www.wenxuecity.com/',
    'jdstatic.tankr.net': 'http://jandan.net/',
    'sankakustatic.com': 'http://chan.sankakucomplex.com/',
};