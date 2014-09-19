// ==UserScript==
// @name           Bing Search Better Privacy
// @description    Delete unnecessary params and add useful params on Bing Search.
// @version        0.0.1
// @include        http*://*.bing.com/search?*
// @author         nodaguti
// @Mod            Dupont
// @license        MIT License
// @run-at         document-start
// @namespace      https://greasyfork.org/users/1453
// ==/UserScript==

(function(){

//--- Config ---
//Bing Search Parameters: 

var addParams = [

];

var deleteParams = [
    //--- 多余后缀 ---
'go',
'qs',
'form',
'FORM',
'pq',
'sc',
'sp',
'cvid',
'sk',

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