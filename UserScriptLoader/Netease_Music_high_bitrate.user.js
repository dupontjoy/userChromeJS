// ==UserScript==
// @name        Netease Music high bitrate
// @namespace   https://github.com/ywzhaiqi
// @description 网易云音乐增强器(Netease Music Enhancement)，提取自 chrome 扩展，需要重定向 pt_index.js 文件。
// @include     http://music.163.com/*
// @version     1.0
// @grant       none
// @require     http://upcdn.b0.upaiyun.com/libs/jquery/jquery-2.0.3.min.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/enc-base64-min.js
// ==/UserScript==

/*
  提取自网易云音乐增强器[Chrome]  https://chrome.google.com/webstore/detail/nmlhnfbdfkfebdofdfffnjmnkfmjcdgb
  需要重定向 pt_index.js 文件 
 */

// Check if is GM 2.x
if (typeof exportFunction == 'undefined') {
  // For GM 1.x backward compatibility, should work.
  var exportFunction = (function(foo, scope, defAs) {
    scope[defAs.defineAs] = foo;
  }).bind(unsafeWindow);
}

$.cookie = function(key, value) {
  if (!value) {
    return localStorage.getItem(key);
  } else {
    localStorage.setItem(key, value);
  }
};

addStyle('#g_player .play{width:450px}#g_player .play .m-pbar{width:350px}#g_player .play .m-pbar .barbg{width:350px}#g_player .music-info{position:absolute;margin-left:570px;padding-top:7px;-webkit-user-select:none}#g_player .music-info span{padding-left:.2em;color:#999}#g_player .music-info span.file-size{cursor:pointer}#g_player .bitrate-switch{position:absolute;right:30px;text-align:center;padding-top:18px;width:100px}#g_player .bitrate-switch:hover ul{display:block}#g_player .bitrate-switch ul{position:relative;top:-114px;border-radius:3px;border:1px solid black;border-bottom:0;display:none}#g_player .bitrate-switch ul li{background:#333;color:#AAA;padding:8px 10px 5px 10px;cursor:pointer}#g_player .bitrate-switch ul li:hover{background:#444;color:#FFF}#g_player .bitrate-switch span{cursor:pointer;color:#AAA;text-shadow:0 1px 1px #000}.u-btn2,.u-btn2 i,.u-btni,.u-btni i,.u-tag,.u-tag i,.u-btni-addply .ply{background:rgba(56,135,208,1)!important}a.u-btni.u-btni-add:before{content:' +';color:white;font-size:15px;padding-left:10px}a.u-btni.u-btni-add{border-left:1px solid white}.u-btni-addply{padding-left:10px!important}.u-btni-addply .ply{display:none}.m-info .btns a:hover,.m-info .btns a *:hover,.m-info .btns a:hover *{background:rgba(66,165,218,1)!important}.u-btni-share i,.u-btni-fav i,.u-btni-cmmt i{padding-right:10px!important;padding-left:10px!important;color:white!important}#cateToggleLink,#cateToggleLink i{background:#FFF!important}.u-tag{text-shadow:none!important;color:white!important}#index-banner{display:none}.m-playbar .updn{display:none!important}.m-playbar .bg{margin-right:0!important}.btm-lyric{top:-85px;position:absolute;width:100%;height:40px;background:#444;line-height:40px;text-align:center;color:#FFF;text-shadow:1px 1px 3px #000}.clock-show{color:white;height:100%;width:100%;background:rgba(0,0,0,0.7);position:fixed;top:0;left:0;display:none}.clock-show .clock-date-time{font-size:100px;font-family:"HelveticaNeue-Medium","Helvetica Neue Medium","Helvetica Neue",Helvetica,Arial,sans-serif;margin-top:-100px;position:absolute;height:100%;top:50%;left:50%;margin-left:-200px}.clock-show .clock-lyric{position:absolute;top:50%;width:600px;margin-top:50px;left:50%;margin-left:-300px;text-align:center}#g_player .clock-btns{position:absolute;color:#888;display:inline-block;cursor:pointer;right:0;text-align:center;padding-top:18px;width:50px}#g_player .clock-btns span{cursor:pointer}#g_player .clock-btns span:hover{color:#EEE}#g_iframe.blur{-webkit-filter:blur(8px)}');

function addStyle(css) {
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}


// music.js
$(function(){
  if(window.top !== window) { return; }

  if (window.M) { return; }

  var M = window.M = $({});

  exportFunction(window.M, unsafeWindow, {defineAs: "M"});

  var musicLevels = {
    Low: 'lMusic', 
    Fine: 'mMusic',
    High: 'hMusic' /*, 'bMusic' */ 
  };

  M.userConfig = {
    musicLevel : $.cookie('musicLevel') || 'High',
    autoShowClock: $.cookie('autoShowClock') === 'true'
  }

  M.setUserConfig = function(key, value) {
    M.userConfig[key] = value;
    $.cookie(key, value);
  }

  M.on('init', function(arg){
    M.trigger('change-bitrate');
    M.trigger('auto-show-clock');
  });

  //modify mp3URL
  M.on('play', function (event, song) {
    song.currentSong = song[musicLevels[M.userConfig.musicLevel]];
    if (song.currentSong){
      if (M.userConfig.musicLevel !== 'Fine') {
        song.mp3Url = getTrackURL(song.currentSong.dfsId);
      }
    } else {
      console.log('currentSong not found.');
      console.log(song);
    }
    
    M.currentSong = song;
  });

  M.on('change-bitrate', function(event, level){
    level = level || M.userConfig.musicLevel;
    if (level !== M.userConfig.musicLevel) {
      M.setUserConfig('musicLevel', level);
      M.currentSong && M.trigger('play', M.currentSong);
    }
  });

  //get lyric and store it.
  var lyricUrlTpl = 'http://music.163.com/api/song/media?id={id}&version=0';
  var lyricCache = {};

  M.on('play', function(event, song){
    var url = lyricUrlTpl.replace('{id}', song.id);
    var lyric = [];

    if(lyricCache[song.id]) {
      M.currentSong.lyric = lyricCache[song.id];
    } else {
      $.get(url).success(function(result){
        result = JSON.parse(result);

        if(result.nolyric) {
          lyric.push({ time: 0, content: "This song has no lyric." });
        } else {
          lyric = formatLyric(result.lyric);
        }

        lyricCache[song.id] = M.currentSong.lyric = lyric;
      });
    }
    
  });

  M.on('play-progress', function(event, state){
    var currentTime = state.currentTime;
    var song = M.currentSong;
    var lyric = song.lyric;

    if(!lyric) { return; }

    for(var i = 0, len = lyric.length; i < len; i++){
      var item = lyric[i];
      if(item.time >= currentTime){
        var showString = i > 0
          ? lyric[i-1].content 
          : (song.name + ' - ' + song.artists[0].name);

        M.trigger('show-lyric', showString);
        break;
      }
    }
  });

  function formatLyric(lyricStr) {
    var arr = lyricStr.split('\n');
    var retObj = [];

    arr.forEach(function(item) {
      matches = item.match(/^\[(\d+)\:(\d+)\.(\d+)\](.*)/);

      if(!matches || matches.length !== 5) { return; }

      timeStamp = +((parseInt(matches[1]) * 60 + parseInt(matches[2])) + '.' + matches[3]);

      retObj.push({ time: timeStamp, content: matches[4]});
    });

    return retObj;
  }

  function getTrackURL (dfsId) {
    var byte1 = '3' + 'g' + 'o' + '8' + '&' + '$' + '8' + '*' + '3' 
      + '*' + '3' + 'h' + '0' + 'k' + '(' + '2' + ')' + '2';
    var byte1Length = byte1.length;
    var byte2 = dfsId + '';
    var byte2Length = byte2.length;
    var byte3 = [];
    for (var i = 0; i < byte2Length; i++) {
      byte3[i] = byte2.charCodeAt(i) ^ byte1.charCodeAt(i % byte1Length);
    };

    byte3 = byte3.map(function(i) {
      return String.fromCharCode(i)
    }).join('');

    results = CryptoJS.MD5(byte3).toString(CryptoJS.enc.Base64);
    results = results.replace(/\//g, '_').replace(/\+/g, '-');

    var url = 'http://m1.music.126.net/' + results + '/' + byte2 + '.mp3';
    return url;
  }

});

// bitrate.js
$(function(){
  if(window.top !== window) { return; }

  var M = window.M;

  var bitrateTpl = 
    '<div class="bitrate-switch">' + 
    '<span>Quality</span>' +
    '<ul><li data-level="High">High-320K</li><li data-level="Fine">Fine-160K</li><li data-level="Low">Low-96K</li></ul>' +
    '</div>';

  var sizeBitrateTpl = '<div class="music-info"><span class="bitrate"></span><span>/</span><span class="file-size"></span></div>'
  
  var $player = $("#g_player")

  $player.append(bitrateTpl);
  $player.append(sizeBitrateTpl);

  var $bitrate = $player.find('.music-info .bitrate')
    , $fileSize = $player.find('.music-info .file-size')
    , $bitrateSwitch = $player.find('.bitrate-switch')
    ;

  $bitrateSwitch.find("ul li").click(function() {
    M.trigger('change-bitrate', $(this).attr('data-level'));
  });

  $fileSize.dblclick(function(){
    window.open($(this).attr('data-href'));
  });

  M.on('play', function(event, song){
    playing = song.currentSong;
    $bitrate.text(playing ? getBitrate(playing.bitrate) : '');
    $fileSize.attr('data-href', song.mp3Url);
    $fileSize.text(playing ? getSize(playing.size) : '');
  });

  M.on('change-bitrate', function(event, song){
    $bitrateSwitch.find(">span").html(M.userConfig.musicLevel);
  });

  function getSize(size) {
    return parseInt(size / 1024 / 1024 * 100) / 100 + 'M';
  }

  function getBitrate(bitrate) {
    return parseInt(bitrate / 10) / 100 + 'K';
  }

});


// lyric.js
$(function(){
  if(window.top !== window) { return; }

  var M = window.M;
  
  var lyricTpl = '<div class="btm-lyric"></div>';

  $('.g-btmbar').prepend(lyricTpl);
  var $lyric = $('.g-btmbar .btm-lyric');

  var lyricCache = {};

  var isOn = true;

  M.on('play', function(event, song){
    $lyric.text('');
  });

  M.on('show-clock', function(){
    $lyric.hide();
    isOn = false;
  });

  M.on('hide-clock', function(){
    $lyric.show();
    isOn = true;
  });

  M.on('show-lyric', function(event, lyricString){
    isOn && $lyric.text(lyricString);
  });

});


// clock.js
$(function(){

  if(window.top !== window) {
    $(window).scroll(function(){
      top.M.trigger('auto-show-clock');
    });
    return; 
  }

  var M = window.M;
  var clockTpl = 
    '<div class="clock-show">' + 
      '<div class="clock-date-time"></div>' + 
      '<div class="clock-lyric"></div>' + 
    '</div>';
  var btnTpl = '<div class="clock-btns"><span class="clock-btn">Clock</span>(<span class="clock-auto">auto:on</span>)</div>';
  var $player = $("#g_player");
  var $body = $('body');

  $player.append(btnTpl);
  $body.append(clockTpl);

  var $clock = $("body>.clock-show");
  var $g_iframe = $("#g_iframe");
  var $datetime = $clock.find('.clock-date-time');
  var $lyric = $clock.find('.clock-lyric');
  var $clockBtn = $player.find('.clock-btn');
  var $clockAutoBtn = $player.find('.clock-auto');

  var timeout;
  var isOn = false;

  $body.keyup(function(e){
    e.keyCode === 27 && M.trigger('hide-clock');
  });

  $body.click(function(){
    M.trigger('auto-show-clock');
  });

  $clock.click(function(){
    M.trigger('hide-clock');
  });

  $clockBtn.click(function(){
    isOn ? M.trigger('hide-clock') : M.trigger('show-clock');      
  });

  $clockAutoBtn.text(M.userConfig.autoShowClock ? 'auto:on' : 'auto:off');

  $clockAutoBtn.click(function(){
    $clockAutoBtn.text(M.userConfig.autoShowClock ? 'auto:off' : 'auto:on');

    M.setUserConfig('autoShowClock', !M.userConfig.autoShowClock);

    if(!M.userConfig.autoShowClock) {
      M.trigger('hide-clock');
      if(timeout) { clearTimeout(timeout); }
    } else {
      M.trigger('auto-show-clock');
    }
    
  });

  
  M.on('auto-show-clock', function(){
    if (timeout) { clearTimeout(timeout); }

    if(!M.userConfig.autoShowClock){ return; }

    timeout = setTimeout(function() {
      isOn || M.trigger('show-clock');
    }, 10000);
  });

  M.on('show-clock', function(){
    if (isOn) { return; }

    var interval = setInterval(function() {
      $datetime.text(formatDateTime(new Date, ' '));
    }, 1000);

    $clock.data('interval', interval);

    $clock.fadeIn(100);

    $g_iframe.addClass('blur');

    isOn = true;
  });

  M.on('hide-clock', function(){
    if (!isOn) { return; }

    clearInterval($clock.data('interval'));

    $g_iframe.removeClass('blur');

    $clock.fadeOut(100);

    isOn = false;
  });

  M.on('show-lyric', function(event, lyricString){
    isOn && $lyric.text(lyricString);
  });

  function formatDateTime(datetime, join){
    var hour = datetime.getHours();
    var minute = datetime.getMinutes();
    var sec = datetime.getSeconds();
    return [hour, minute, sec]
      .map(function(_int){
        return _int < 10 ? ('0' + _int) : _int;
      })
      .join(join);
  }

  M.trigger('init');

});