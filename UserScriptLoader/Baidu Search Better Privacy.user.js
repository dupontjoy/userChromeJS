// ==UserScript==
// @name           Baidu Search Better Privacy
// @description    Delete unnecessary params and add useful params on Baidu Search.
// @version        0.0.8
// @include        http://www.baidu.com/baidu?*
// @include        http://www.baidu.com/s?*
// @author         nodaguti
// @Mod            Dupont
// @license        MIT License
// @run-at         document-start
// @namespace      https://greasyfork.org/users/1453
// ==/UserScript==

(function(){

//--- Config ---
//Baidu Search Parameters: http://chineseseoshifu.com/blog/complete-list-of-baidu-search-url-parameters.html

var addParams = [
    'ie=utf-8', //防止繁体字搜索乱码
    //'lm=5110',    //period filter for results by the day. For example lm=7 means results of the past seven days;
    //'ct=0',        //languages, with 0 for all languages, 1 for simplified Chinese, and 2 for traditional Chinese；
    //'tn=baidulocal', //无竞价结果
];

var deleteParams = [
    //--- 多余后缀 ---
    'tn',      //this is a referral tag. “baiduhome_pg” means Baidu homepage; “sitehao123” means the referrer is hao123.com;
    'rsv_spt', //login status. “1” means the search is conducted by a logged-in user; “3” means the searcher doesn’t log in;
    'rsv_bp', //where you do the search. “0” means it is done from Baidu’s homepage; “1” means from top search box of the result page; “2” means from the bottom search box of the result page;
    'inputT', //input time by the millisecond;
    //'ie',    //query encoding. The default value is gb2312;
    'bs',     //previous search query;
    'cl',    //search type, with 3 representing web search, 2 for image search and news search；
    'oq',    //original search query for related searches. For example you searched “SEO” then clicked on one of the related searches like “SEO services”, then the value of “oq” is “SEO”;
    'issp',
    'usm',
    'rsv_cq',
    'rsv_dl',
    'vcookief_tf',
    'rsv_sug',
    'rsv_sug1',
    'rsv_sug2',
    'rsv_sug3',
    'rsv_sug4',
    'rsv_sug5',
    'rsv_sug6',
    'rsv_sug7',
    'rsv_sug8',
    'rsv_sug9',
    'rsv_page',
    'rsp',
    'rsv_ers',
    'rs_src',
    'vecode_Search',
    'ch',
    'bar',
    'rsv_enter',
    'f',     //search type. f=8 means a normal search (input and search), f=3 for the dropdown suggestion list of the search box and f=1 means a related search.
    //'rsp',  //ordinal number of the suggested queries for related search, starting from 0;
    //'pn',     //pagination of the result page, starting from 0;
    //'rn',     //number of results per page, with the default value of 10;
    //---贴吧、百科
    'fr',
    'type',
    'fromtitle',
    'from_id',
    'fromid',
    
];
// --- /Config ---

var delParamReg = new RegExp('&(?:' + deleteParams.join('=[^&#]*|') + '=[^&#]*)', 'g');
var overwriteParamReg = new RegExp('&(?:' + addParams.map(function(i){return i.split('=')[0];}).join('=[^&#]*|') + '=[^&#]*)', 'g');


//Delete and add params
function urlFix(url){
    var _url = url;

    //delete params
    _url = url.replace(delParamReg, '');

    //overwrite and add params
    _url = _url.replace(overwriteParamReg, '').replace(/&$/, '');
    _url += '&' + addParams.join('&') + '&urlfixed=1';

    return _url;
}

//Reload page when hash is changed (when search from textbox on result page)
function hashChange(){
    //Exclude Image Search
    if(location.search.indexOf('tbm=isch') !== -1) return;

    var newURL = ('https://' +
               location.host + '/search' +
               location.search + '&' +
               location.hash.substr(1));

    newURL = urlFix(newURL);

    location.replace(newURL);
}


if(location.href.indexOf('urlfixed=1') === -1){
    location.replace(urlFix(location.href));
}

window.addEventListener('hashchange', hashChange, false);

})();