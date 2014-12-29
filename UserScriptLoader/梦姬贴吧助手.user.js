// ==UserScript==
// @name        梦姬贴吧助手
// @name:en     Yume Tieba Helper
// @name:zh-CN  梦姬贴吧助手
// @name:zh-TW  夢姬貼吧小幫手
// @namespace   org.jixun.tieba.ass
// @description:en    Just Another Tieba Helper
// @description:zh-tw 又一個貼吧助手
// @description:zh-cn 又一个贴吧助手
// @description       又一个贴吧助手
// @include     http://tieba.baidu.com/*
// @version     2.2.53
// @license     MIT License; https://raw.githubusercontent.com/JixunMoe/yume-tieba-helper/master/LICENSE


/// jQuery 留一份自己用
// @require     http://cdn.staticfile.org/jquery/2.1.1/jquery.min.js
// @require     http://cdn.staticfile.org/jquery-scrollTo/1.4.11/jquery.scrollTo.min.js

/// 配置界面 UI
// @require     http://cdn.staticfile.org/mustache.js/0.8.1/mustache.min.js
// @require     https://greasyfork.org/scripts/2657/code/tieba_ui.js

/// 非同步数组枚举回调
// @require https://greasyfork.org/scripts/3588/code/Interval_Looper.js

/// 兼容 GM 1.x, 2.x
// @require     https://greasyfork.org/scripts/2599/code/gm2_port_v103.js

// @supportURL https://github.com/JixunMoe/yume-tieba-helper/issues/new

// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       unsafeWindow
// ==/UserScript==


var w = unsafeWindow, _main;
jQuery(function ($) {
	var iv = setInterval(function () {
		if (w.jQuery && w.PageData && w.PageData.tbs) {
			clearInterval(iv);
			console.log('PageData loaded.');

			if (!w.bdShare) {
				w.bdShare = unsafeObject({
					ready: false
				});
			}

			w.PageData.games = unsafeObject([]);

			unsafeExec (function () {
				// 改进自 congxz6688 的 tieba_quote [#147]
				// 节取自 寂寞的原子 的  悬浮窗脚本 [#116]
				_.Module.use("common/widget/RichPoster", {},
					function (t) {
						t.init();
						t.unbindScrollEvent();
					});
			});

			_main ($, w.PageData);
		}
	}, 500);

	setTimeout (function () {
		// 15s later force kill waiting.
		clearInterval (iv);
	}, 15000);
});

var __type_floor   = 1,
	__type_lzl     = 2,
	__type_forum   = 4,
	__type_postact = 8;

var __mod_default  = 0,
	__mod_enable   = 1,
	__mod_disable  = 2;

_main = function ($, wPageData) {
	// 检查是否在贴吧
	if (!wPageData.forum) return ;
	var isThread = !!wPageData.thread;
	var _css  = $('<style>');
	var _cssH = $('<style>').text('.ads{display:none !important;}');


	//// Function Helper
	Object.defineProperty (Function.prototype, 'extract', {
		value: function () {
			return this.toString().match(/\/\*([\s\S]+)\*\//)[1];
		}
	});

	var _function = function (foo, proto) {
		foo.prototype = proto;
		return foo;
	};

	var $conf = new (_function (function () {}, {
		get: function (m, def) {
			var val = GM_getValue (m, null);
			if (!val) return def;

			try {
				return JSON.parse (val);
			} catch (e) {
				return def;
			}
		},
		set: function (m, val) {
			return GM_setValue (m, JSON.stringify (val));
		},
		rm: function () {
			[].forEach.call (arguments, GM_deleteValue);
		},
		ls: function () {
			return GM_listValues ();
		}
	})) ();

	var _hide = function () {
		_cssH.prepend (Array.prototype.join.call(arguments, ',') + ',');
	};


	var _run = function (foo, name) {
		console.groupCollapsed ('[贴吧助手]: ' + (name || '[未知区段]'));

		for (var args = [], i = 2, ret; i<arguments.length; i++)
			args.push (arguments[i]);

		try {
			ret = foo.apply (this, args);
			console.info ('Section returned: ', ret);
		} catch (err) {
			console.error ('Error at %s: %s', name || '[unknown]', err.message);
			console.error (err);
		}
		console.groupEnd ();

		return ret;
	};

	$.fn.getField = function () {
		// var $data = this.attr('data-field');
		var $data = this.data ('field');

		if ('string' == typeof $data[1])
			return JSON.parse($data.replace(/'/g, '"'));
		return $data;
	};

	$.goToEditor = function () {
		$('#ueditor_replace').focus ();
		$.scrollTo($('#tb_rich_poster_container'), 500);
	};
	$.create = function (ele, cls, attr) {
		var r = $(document.createElement (ele));

		if (cls)
			r.addClass (cls);
		if (attr)
			r.attr (attr);

		return r;
	};
	$.stamp = function () {
		return + new Date ();
	};
	$.toDateStr = function (d) {
		return d.toLocaleString();
	};

	var modules = {
		"ads_hide": {
	name: '广告隐藏、屏蔽',
	desc: '屏蔽无用、广告内容',
	flag: ~0,
	_init: function () {
		var $ads = [
			// 贴吧推广
			'.spreadad, .game_frs_step1, .BAIDU_CLB_AD, .dasense, .u9_head',
			
			'[data-daid]',
			
			// 直播
			'#game_live_list',

			// 10 年
			'#j_ten_years',

			// 1l 下方的广告
			'#sofa_post, .banner_post',

			// 贴吧顶部广告
			'#pb_adbanner',
			
			// 左右侧
			'.j_couplet',

			// 右侧
			'.right_section > *:not(#balv_mod)',
			'#aside > *:not(#balv_mod):not(#forumInfoPanel):not(#zyq):not(#adminModePanel)',

			// 客户端发贴 x 倍经验
			'.tb_poster_placeholder',

			// 语音按钮 (需要客户端)
			'.edui-btn-voice, .j_voice_ad_gif, .lzl_panel_voice',

			// 发帖请遵守 ....
			'.poster_head_surveillance',

			// 不水能死何弃疗！
			'.lzl_panel_wrapper > tbody > tr > td:first-child > p',

			// 会员相关广告
			'.doupiao_offline, .fMember_cnt',

			// 右上角
			'.u_tshow, .u_tbmall, .u_app, .u_wallet, .u_xiu8',
			'.u_mytbmall, .u_joinvip, .u_baiduPrivilege, .u_appcenterEntrance',

			// 右下角
			'#pop_frame, #__bdyx_tips, #__bdyx_tips_icon',

			// 猜拳
			'.add_guessing_btn, .guessing_watermark',
			
			// 帖子推荐
			'.thread_recommend',
			
			// 右下角广告
			'#__bdyx_tips, #__bdyx_tips_icon, .baidu-tuisong-wrap, .baidutuisong',

			// 打赏、分享
			'.reward_btn, .share_btn_wrapper',

			// 烟花
			'.firework_sender_wrap, .global_notice_wrap',

			'.tbui_fbar_share, .tbui_fbar_tsukkomi, .tbui_fbar_props, .tbui_fbar_square, .tbui_fbar_home',

			'#tshow_out_date_warn, #selectsearch-icon'
		].join(', ');

		$($ads).remove();
		$('<style>').text($ads + /* File: ads_hide.css */
(function () { /*
 {
display:none !important;
}

#com_userbar_message {
	right: 30px !important;
	top: 28px !important;
}

#com_userbar_message > .j_ui_triangle {
	left: 65px !important;
}
*/}).extract ()).appendTo (document.head);

		// 只保留 [看帖、图片、精品、视频] 四个选项
		$('.j_tbnav_tab').filter (function (i) { return i > 3; }).remove ();

		// 执行三次, 确保分隔符会消失
		for (var i = 3; i--; ) {
			setTimeout (function () {
				$('.split_text').next('.split_text').remove();
				$('.split').filter(function () {
					return this.nextElementSibling === null
						|| this.nextElementSibling.className == this.className
						|| !$(this.nextElementSibling).is(':visible');
				}).remove();
			}, 3000 * i);
		}
	}
}
,
"audio_download": {
	name: '贴吧语音下载',
	desc: '下载贴吧语音~ 啦啦啦~',
	flag: __type_floor | __type_lzl,
	_proc: function (floorType, args) {
		var _player = $('.voice_player:not(.parsed)', args._main);
		if (!_player.size()) return '找不到语音';

		var data = _player.parents('[data-field]').getField(),
			pid = data.spid || data.content.post_id;

		_player.addClass('parsed').after (
			$('<a>').addClass('ui_btn ui_btn_m')
				.attr({
					href: '/voice/index?tid=' + wPageData.thread.thread_id + '&pid=' + pid,
					download: '语音-' + (data.user_name || data.author.user_name) + '-' + pid + '.mp3'
				})
				.css ({
					marginLeft: '1em'
				})
				.append ($('<span>').text('下载'))
		).after($('<br>'));
	}
},
"block_post": {
	name: '贴吧贴子屏蔽',
	desc: '根据规则屏蔽指定贴子',
	flag: __type_floor | __type_forum | __type_lzl,

	// 辅助函数
	_match_type: function (_M) {
		switch (_M) {
			case this.__M_REGEX:
				return 'tp_regex';
			case this.__M_PLAIN:
				return 'tp_plain';
		}

		return 'undefined_' + _M;
	},
	// 辅助函数
	_range: function (old, min, max) {
		return Math.min (Math.max (min, old), max);
	},

	// 初始化样式表
	_init: function () {
		_css
			.append ('ul#jx_post_kword > li {margin-bottom: .2em}')
			.append ('.jx_word { padding: 0 .5em; width: 8em } span.regex::before, span.regex::after { content: "/"; color: #777 }')
			.append ('span.regex > .jx_word { border: 0; padding: 0 .2em }')
			.append ('.jx_modifier { width: 4em; border: 0; padding: 0 0 0 .2em }')

			.append ('.jx_post_block_stripe::before{content: "共隐藏 " attr(hide-count) " 个数据"}');


		$.extend (this, {
			// Action to take when match
			__ACT_BAR:  0,
			__ACT_OPA:  1,
			__ACT_HIDE: 2,

			// Keyword match method
			__M_REGEX:  0,
			__M_PLAIN:  1
		});

		this.config = $.extend ({
			onmatch: this.__ACT_OPA,
			opacity: 30,

			kword: [{
				type: this.__M_PLAIN,
				word: '泽火革'
			}],
			user: [
				'炮弹56',
				'炮弹52'
			]
		}, $conf.get (this.id));
		this._compileRegex ();

		this.$tplConfig = /* File: block_post.html */
(function () { /*
<div class="jx_autoflow">
	<h3>当匹配到时的操作</h3>
	<p>
	<select id="jx_post_match">
		<option value="0" {{#tp_bar}}selected{{/tp_bar}}>红条</option>
		<option value="1" {{#tp_opa}}selected{{/tp_opa}}>透明</option>
		<option value="2" {{#tp_hide}}selected{{/tp_hide}}>隐藏</option>
	</select>

	<label title="0 表示完全透明 (占位难看哦); 0~100"{{^tp_opa}} class="hide"{{/tp_opa}}>透明度
		<input type="number" id="jx_post_opa" class="text-center" value="{{opacity}}" style="width: 5em" />%
	</label>
	</p>
	<br />

	<h3>内容屏蔽规则</h3>
	<ul id="jx_post_kword">
	{{#kword}}
		<li>
	<select class="jx_word_type">
		<option value="0" {{#tp_regex}}selected{{/tp_regex}}>正则</option>
		<option value="1" {{#tp_plain}}selected{{/tp_plain}}>文本</option>
	</select>

	<span{{#tp_regex}} class="regex"{{/tp_regex}}><input class="jx_word" value="{{word}}" /></span><!--
 --><input class="jx_modifier{{^tp_regex}} hide{{/tp_regex}}" value="{{modi}}" />

	[ <a class="ptr jx-rm-key" >删除</a> ]
</li>
	{{/kword}}
	</ul>
	<p><a class="ui_btn ui_btn_m" data-btn="add"><span><em>添加</em></span></a></p>
	<br />

	<h3>用户屏蔽列表</h3>
	<p>用户列表，一行一个</p>
	<!-- Hackish solution -->
	<div style="padding-right: 10px;">
		<textarea id="jx_post_user" row=5 style="width: 100%; padding: .2em">{{user}}</textarea>
	</div>
	<br />

	<p class="text-center">
		<a class="ui_btn ui_btn_m" data-btn="save"><span><em>储存</em></span></a> &nbsp; 
		<a class="ui_btn ui_btn_m" data-btn="close"><span><em>放弃</em></span></a>
	</p>
</div>
*/}).extract ();
		this.$tplAddWord = /* File: block_post_kword.html */
(function () { /*
<li>
	<select class="jx_word_type">
		<option value="0" {{#tp_regex}}selected{{/tp_regex}}>正则</option>
		<option value="1" {{#tp_plain}}selected{{/tp_plain}}>文本</option>
	</select>

	<span{{#tp_regex}} class="regex"{{/tp_regex}}><input class="jx_word" value="{{word}}" /></span><!--
 --><input class="jx_modifier{{^tp_regex}} hide{{/tp_regex}}" value="{{modi}}" />

	[ <a class="ptr jx-rm-key" >删除</a> ]
</li>
*/}).extract ();
	
		this.css = $('<style>').appendTo (document.head);
		this._rebuildStyle ();
	},

	// 重构样式表
	_rebuildStyle: function () {
		var sBuilder = '.jx_post_block_act {';
		switch (this.config.onmatch) {
			case this.__ACT_BAR:
				sBuilder += 'display: none;';
				break;
			case this.__ACT_HIDE:
				sBuilder += [
						'display: none;',
					'}',

					'.jx_post_block_stripe {',
						'display: none'
					// , '}'
				].join ('');
				break;
			case this.__ACT_OPA:
				sBuilder += [
						'opacity: ' + (this.config.opacity / 100) + ';',
						'transition: opacity .5s;',
					'}',

					'.jx_post_block_act:hover {',
						'opacity: .9;',
					'}',

					'.jx_post_block_stripe {',
						'display: none'
					// , '}'
				].join ('');
				break;
		}

		sBuilder += '}';
		this.css.text(sBuilder);
	},
	// 编译正则匹配
	_compileRegex: function () {
		var that = this;
		this.config.kword.forEach (function (e) {
			try {
				if (e.type === that.__M_REGEX)
					e.regex = new RegExp (e.word, e.modi);
			} catch (err) {
				console.error ('编译正则表达式时出错!\n表达式: %s, 开关: %s', err.word, err.modi);
				err.regex = { test: function () { return false; } };
			}
		});
	},

	// 配置窗口回调
	_conf: function () {
		var $view = $.extend(true, {}, this.config);

		$view.tp_hide = $view.onmatch === this.__ACT_HIDE;
		$view.tp_opa  = $view.onmatch === this.__ACT_OPA;
		$view.tp_bar  = $view.onmatch === this.__ACT_BAR;

		for (var i = 0; i < $view.kword.length; i++)
			$view.kword[i][this._match_type($view.kword[i].type)] = true;
		$view.user = $view.user.join ('\n');

		var $tpl = $(Mustache.render (this.$tplConfig, $view));

		var $wndBlocker = $.dialog.open ($tpl, {
			title: '贴子关键字屏蔽',
			width:  300,
			height: 400
		});

		var that = this;
		$tpl.on ('click', 'a.jx-rm-key', function () {
			// 移除那一行
			$(this).parent ().remove ();
		}).on ('change', '.jx_word_type', function () {
			var isRegex = parseInt (this.value) === that.__M_REGEX;

			var line = $(this).parent ();
			line.find ('.jx_word').parent().toggleClass ('regex', isRegex);
			line.find ('.jx_modifier').toggleClass ('hide', !isRegex);
		}).on ('change', '#jx_post_match', function () {
			$('#jx_post_opa', $tpl).parent ().toggleClass ('hide', parseInt (this.value) !== that.__ACT_OPA);
		}).on ('click', '.ui_btn', function () {
			switch ($(this).data('btn')) {
				case 'add':
					var $tplAdd = $(that.$tplAddWord);
					$('#jx_post_kword', $tpl).append ($tplAdd);
					$tplAdd.find ('.tg_focus').removeClass ('.tg_focus').focus();
					break;
				case 'save':
					var newConf = {
						onmatch: parseInt ($('#jx_post_match', $tpl).val()),
						opacity: that._range (parseInt ($('#jx_post_opa', $tpl).val()), 0, 100),
						kword: [],
						user:  $('#jx_post_user', $tpl).val().split ('\n')
					};
					$('#jx_post_kword > li').each (function () {
						var rule = $(this);
						newConf.kword.push ({
							type: parseInt (rule.find ('select').val ()),
							word: rule.find ('.jx_word').val (),
							modi: rule.find ('.jx_modifier').val ()
						});
					});
					$conf.set (that.id, newConf);
					that.config = newConf;

					that._compileRegex ();
					that._rebuildStyle ();
					$wndBlocker.close ();
					break;
				case 'close':
					$wndBlocker.close ();
					break;
			}
		});
	},

	// 标记贴子为隐藏
	_hit: function (floor) {
		floor.addClass ('jx_post_block_act');

		if (floor.prev().is('script'))
			floor.prev().remove ();

		if (floor.prev().is('.jx_post_block_act')) {
			// 寻找横条
			var prev = floor.prev ();
			while (!prev.is ('.jx_post_block_stripe'))
				prev = prev.prev ();

			prev.attr ('hide-count', parseInt (prev.attr ('hide-count')) + 1);
		} else {
			$('<div>').addClass ('jx_post_block_stripe floor-stripe')
				.attr('hide-count', 1).insertBefore (floor);
		}
	},

	_getAuthor: function (f) {
		return f.user_name || f.author_name || f.author.user_name;
	},

	_proc: function (floorType, args) {
		// 首先检查用户名
		if (this.config.user.indexOf (this._getAuthor(args._main.getField ())) !== -1) {
			this._hit (args._main);
			return ;
		}

		var floorContent;
		switch (floorType) {
			case __type_forum:
				floorContent = $('.threadlist_text', args._main).text();
				break;
			case __type_floor:
				floorContent = $('.d_post_content', args._main).text();
				break;
			case __type_lzl:
				floorContent = $('.lzl_content_main', args._main).text();
				break;
		}

		// 然后循环检查关键字匹配
		for (var i = this.config.kword.length; i--; ) {
			switch (this.config.kword[i].type) {
				case this.__M_REGEX:
					if (this.config.kword[i].regex.test (floorContent))
						this._hit (args._main);
					break;

				case this.__M_PLAIN:
					if (floorContent.indexOf (this.config.kword[i].word) !== -1)
						this._hit (args._main);
					break;
			}
		}
	}
},
"hide_loops": {
	name: '3 天循环隐藏',
	desc: '3 天循环屏蔽指定用户的帖子, 统一封锁.',
	flag: __type_postact | __type_forum,

	_findUser: function (name) {
		if (0 === this.blockList.author.length)
			return -1;

		for (var i = this.blockList.author.length; i--; ) {
			if (this.blockList.author[i].name == name)
				return i;
		}

		return -1;
	},
	_userExist: function (user) {
		return -1 !== this._findUser(user);
	},

	_conf: function () {
		var that = this;


		var $tpl = $(Mustache.render(this.tplHideAuthor, {
			author: this.blockList.author.map (function (e, i) {
				return { name: e.name, time: e.time ? $.toDateStr (new Date(e.time)) : '尚未' };
			})
		}));

		var $wndHideUser = $.dialog.open ($tpl, {
			title: '3天循环隐藏模组配置 - 记得点一次 [全部封禁]',
			width: 370,
			height: 400
		});

		var $inp = $('#jx_new_id', $tpl);
		var cbAddName = function () {
			var user = $inp.val ().trim();
			that._updList ();

			if (0 === user.length || that._userExist(user))
				return ;

			$inp.val ('');

			$(Mustache.render (that.tplNewLine, {
				name: user,
				time: '尚未'
			})).insertBefore($('#jx_last_line_of_3day_block', $tpl));
			that.blockList.author.push ({
				name: user,
				time: 0
			});
			that._saveList ();
		};

		// 绑定事件
		$('#jx_add', $tpl).click(cbAddName);
		$inp.keypress(function (e) {
			if (e.which === 13)
				cbAddName ();
		});
		$tpl
			.on ('click', '.jx_man_hide, .jx_man_rm', function (e) {
				var $l = $(e.target);
				if ($l.hasClass ('text-disabled'))
					return ;
				$l.addClass ('text-disabled');


				var $un = $l.parent().data('name');
				that._updList();
				switch (true) {
					case $l.hasClass ('jx_man_hide'):
						that.blockList.author[that._findUser($un)].time = $.stamp();
						that._hide (function () {}, $un);
						break;
					case $l.hasClass ('jx_man_rm'):
						that.blockList.author.splice(that._findUser($un), 1);
						$l.parent().hide ();
						break;
				}
				that._saveList();
			});

		$('#jx_close', $tpl).click($wndHideUser.close.bind($wndHideUser));
		$('#jx_all', $tpl).click(function () {
			var hideStatus = $('#jx_hide_info', $tpl).show().text ('正在初始化…');

			that.hideQueue.onProgress = function (i, t) {
				hideStatus.text(Mustache.render('正在隐藏 {{i}} / {{t}}... 请勿关闭该窗口!', {i: i, t: t}));
			};
			that.hideQueue.onComplete = function () {
				that.hideQueue.onProgress = that.hideQueue.onComplete = null;
				hideStatus.text ('全部用户已成功隐藏!');
			};
			that.hideQueue.add.apply (
				that.hideQueue,
				Array.prototype.slice.call($('a.jx.jx_man_hide:not(.text-disabled)').addClass('text-disabled').map(function (i, e) {
					return $(e).parent().data('name');
				}))
			);
		});
		return $tpl;
	},

	_hide: function (cb, author) {
		// 检查是否在列表
		this._updList ();
		if (this._userExist (author)) {
			// 如果存在, 修正上次隐藏时间
			this.blockList.author[this._findUser(author)].time = $.stamp();
			this._saveList ();
		}
		console.info ('开始隐藏: %s', author);

		$.ajax ({
			url: '/tphide/add',
			type: 'POST',
			data: {
				type: 1,
				hide_un: author,
				ie: 'utf-8'
			},
			dataType: 'json'
		}).success (cb);
	},

	_init: function () {
		this.tplHideAuthor = /* File: hide_loops_config.html */
(function () { /*
<div class="jx_autoflow">
	<h2>3 天循环隐藏的列表</h2>

	<p class="text-center">请注意: 封禁时间不会自动刷新, 请关闭后重新开启该对话框。</p>

	<ol>
	{{#author}}
		<li data-name="{{name}}"><b>{{name}}</b>
[ 上次隐藏: <span class="text-red">{{time}}</span> | <a class="jx jx_man_hide">手动</a> | <a class="jx jx_man_rm">移除</a> ]</li>
	{{/author}}
	<li id="jx_last_line_of_3day_block">
		<input id="jx_new_id" placeholder="请输入新的需要自动封禁的 id" style="width: 20em;" />
		<br /><a class="ui_btn ui_btn_m" id="jx_add"><span><em>添加</em></span></a>
	</li>
	</ol>

	<p class="hide" id="jx_hide_info"></p>

	<div class="text-center">
	<a class="ui_btn ui_btn_m" id="jx_all"><span><em>全部封禁</em></span></a> &nbsp;
	<a class="ui_btn ui_btn_m" id="jx_close"><span><em>关闭</em></span></a>
	</div>
</div>
*/}).extract ();
		this.tplNewLine = /* File: hide_loops_author.html */
(function () { /*
<li data-name="{{name}}"><b>{{name}}</b>
[ 上次隐藏: <span class="text-red">{{time}}</span> | <a class="jx jx_man_hide">手动</a> | <a class="jx jx_man_rm">移除</a> ]</li>
*/}).extract ();
		this._updList ();

		var _hide = this._hide.bind (this);
		this.hideQueue = new IntervalLoop ([], _hide, 400).loop ();

		var curTime = $.stamp ();
		var t3Days  = 3 * 24 * 60 * 60;

		var that = this;
		this.blockList.author.forEach (function (e) {
			if (curTime - e.time > t3Days)
				that.hideQueue.add (e.name);
		});
	},

	_updList: function () {
		this.blockList = $.extend ({
			author: [
				// 格式如下
				//{
				//	name: '炮弹56',
				//	lastHide: 0
				//}
			]
		}, $conf.get (this.id, {}));
	},
	_saveList: function () {
		$conf.set (this.id, this.blockList);
	},

	_findNameAndHide: function (e) {
		var floorData = $(e.target).parents('.lzl_single_post,.l_post')
						  .first().getField();
		var author = floorData.user_name || floorData.author.user_name;
		if (this._userExist(author)) {
			$.dialog.alert (Mustache.render(/* File: hide_loops_already_in_list.html */
(function () { /*
用户 [<b>{{name}}</b>] 已存在于屏蔽列表!
*/}).extract (), {name: author}), {
				title: '3 天循环隐藏'
			});
			return ;
		}
		this._updList ();
		this.blockList.author.push ({
			name: author,
			time: $.stamp()
		});
		this._saveList ();
		this._hide (function (r) {
			$.dialog.alert (Mustache.render(/* File: hide_loop_result.html */
(function () { /*
对 <b>{{name}}</b> 的隐藏处理结果: {{msg}}({{no}})
*/}).extract (),
			$.extend ({name: author}, r)), {
				title: '3 天循环隐藏 (楼中楼无效)'
			});
		}, author);
	},

	_menu: function (floorType, args) {
		var $act = $('.user-hide-post-action', args._main);
		var $actHidePost = $.create('a', 'jx jx-post-action');

		$actHidePost
			.text ('加入 3 天循环隐藏列表')
			.appendTo ($act)
			.data ('jx', this.id)
			.data ('eve', args._main.getField().author.user_name)
			.click(this._findNameAndHide.bind(this));
	}
},
"icon_hide": {
	name: '隐藏用户图标',
	desc: '将用户名下方、右方的图标集藏起来。',
	def: false,
	flag: ~0,
	_init: function () {
		_hide ('.icon_wrap');
	}
},
"no_text_link": {
	name: '屏蔽帖子内文字推广链接',
	desc: '将帖子内的文字推广搜索链接替换为普通文本',
	flag: __type_lzl | __type_floor,
	_proc: function (floorType, args) {
		this.rmLinkText (args._main);
	},
	_init: function () {
		this.rmLinkText ();
	},
	rmLinkText: function (_p) {
		$(_p || 'body').find ('a.ps_cb').each(function () {
			$(this).after (document.createTextNode (this.textContent));
		}).remove();
	}
},
"orange": {
	name: '移除会员彩名',
	desc: '全部变成变成默认链接颜色。',
	flag: __type_floor | __type_lzl | __type_forum,

	clsList: ['sign_highlight', 'vip_red', 'fiesta_member', 'fiesta_member_red', 'member_thread_title_frs', 'sign_highlight'],

	rmOrange: function (target) {
		var $target = $(target);

		for (var i = 1; i < this.clsList.length; i++)
			$('.' + this.clsList[i], $target.removeClass (this.clsList[i])).removeClass(this.clsList[i]);
	},

	_init: function () {
		// 标题红名移除
		this.rmOrange ('body');
	},
	_proc: function (floorType, args) {
		this.rmOrange (args._main);
	}

},
"quote": {
	name: '引用楼层',
	desc: '引用某一层的内容',
	flag: __type_floor,
	_proc: function (floorType, args) {
		var $quote = $('<li>').addClass('pad-left').append(
			$('<a>').text('#引用').addClass('jx')
				.data('jx', 'quote').data('floor', args.floorNum)
		).prependTo($('.p_tail', args._main));
	},
	_click: function ($ele, $eve) {
		var $floor  = $ele.parents('.l_post');
		var $editor = $('#ueditor_replace');
		var $quote = $('<p>').appendTo($editor);

		$quote
			.append ('引用 ' + $ele.data('floor') + '楼 @' + $('.p_author_name', $floor).first().text() + ' 的发言：')
			.append ('<br>')
			.append ('——————————')
			.append ('<br>');

		$('.j_d_post_content', $floor).contents().each(function (i, ele) {
			if (ele.nodeType == 3) {
				if (ele.nodeValue.trim() !== '')
					$quote.append (ele.nodeValue);

				return ;
			}

			var $ele = $(ele);
			if ($ele.is('a')) {
				if ($ele.find('img').size()) {
					$quote.append ('[#图片]');
				} else {
					$quote.append ($ele.text());
				}
			} else if ($ele.is ('img')) {
				$quote.append ('[#表情]');
			} else if ($ele.is ('object,embed')) {
				$quote.append ('[#视频]');
			} else {
				$quote.append ($ele.clone());
			}
		});

		$quote.append ('<br>&gt; ');
		$.goToEditor();
	}
},
"quote_lzl": {
	name: '楼中楼帖子引用',
	desc: '引用楼中楼的回复',
	flag: __type_lzl,
	_proc: function (floorType, args) {
		$('<a>').text('引用').addClass('jx d_tail')
			.insertBefore($('.lzl_time', args._main))
			.after($('<span>').addClass('d_tail').text(' | '))
			.data('jx', 'quote_lzl');
	},
	_click: function ($ele, $eve) {
		var $editor = $('#ueditor_replace');
		var $cnt = $ele.parents('.lzl_cnt');
		$('<p>').appendTo($editor)
			.append ('引用 @' + $cnt.find('.j_user_card').attr('username') + ' 在楼中楼的发言：<br>')
			.append ($ele.parents('.lzl_cnt').find('.lzl_content_main').text())
			.append ('<br>')
			.append ('——————————')
			.append ('<br> &gt;<br>');

		$.goToEditor();
	}
},
"real_url": {
	name: '贴吧跳转链解除',
	desc: '将百度所谓安全链接改成直链。',
	flag: __type_floor | __type_lzl,
	_proc: function (floorType, args) {
		var $floor = $(args._main);
		$floor.find('a[href*="jump.bdimg.com/safecheck"]').each(function (i, ele) {
			var $ele = $(ele),
				$url = $ele.text();

			if ($url.indexOf('@') === 0) {
				// Do nothing.
			} else if (/^https?:\/\//.test($url)) {
				$ele.attr('href', $url);
			} else {
				GM_xmlhttpRequest ({
					method: 'HEAD',
					url: $url,
					headers: {
						// 去你的百度
						Referer: 'http://tieba.baidu.com/p/123456789'
					},
					onload: function (response) {
						if (response.finalUrl.indexOf('http') === 0) {
							$ele.attr('href', response.finalUrl);
						}
					}
				});
			}
		});
	}
},
"rmImgFav": {
	name: '移除图片的收藏工具栏',
	desc: '鼠标悬浮图片时出现的工具栏。',
	flag: 0,
	_init: function () {
		$('.fav-wrapper').remove();
	}
},
"rmSaveFace": {
	name: '隐藏挽尊卡提示',
	desc: '隐藏会员发帖的使用挽尊卡提示。',
	flag: 0,
	_init: function () {
		_hide ('.save_face_bg');
	}
},
"rm_img_view": {
	name: '看图模式屏蔽',
	desc: '还原旧版贴吧点图看大图功能',
	flag: __type_floor,

	rmImg: function ($root) {
		$('img.BDE_Image', $root).each(function () {
			var m = this.src.match(/\/sign=[a-z0-9]+\/(.+)/i);
			if (!m) return ;
			var imgLink = '//imgsrc.baidu.com/forum/pic/item/' + m[1];
			$('<a>')
				.attr('href', imgLink)
				.attr('target', '_blank')
				.append($('<img>').attr('src', imgLink).addClass('jx_no_overflow'))
				.insertAfter (this);
			$(this).remove();
		});
	},
	_init: function () {
		_css.append ('.jx_no_overflow { max-width: 100%; }');
		this.rmImg (document);
	},
	_proc: function (floorType, args) {
		this.rmImg (args._main);
	}
},
"save_face": {
	name: '挽尊卡隐藏',
	desc: '屏蔽挽尊卡，留下一个横条提示。',
	flag: __type_floor,
	_init: function () {
		_css.append ('.save_lz_face::before{content:attr(who) " 使用了挽尊卡"}');
	},
	_proc: function (floorType, args) {
		if ($('.save_face_post', args._main).size()) {
			// 发现挽尊卡
			$('<div>').addClass('floor-stripe save_lz_face')
				.attr ('who', $('.p_author_name', args._main).text())
				.insertBefore (args._main);

			args._main.addClass('savedFace').hide();
		}
	}
}
	};

	var _menu = (function () {
		var $template = /* File: main_config.html */
(function () { /*
<div style="height: 100%; overflow-y: auto">
	<h2>启用的模组</h2>
	<div id="jx_conf_modules">
		{{#modules}}
		<label title="{{desc}}">
			<input type="checkbox" data-module="{{id}}" {{#enable}}checked{{/enable}}/> {{name}}
		</label>{{#config}}[ <a data-config="{{id}}" class="jx_conf ptr">配置</a> ]{{/config}}
		<br />
		{{/modules}}
	</div>
	<br />

	<!-- 按钮区 -->
	<div class="text-center">
		<a class="ui_btn ui_btn_m" id="jx_save"><span><em>储存</em></span></a> &nbsp;
		<a class="ui_btn ui_btn_m" id="jx_close"><span><em>放弃</em></span></a>
	</div>
</div>
*/}).extract ();

		return _run.bind ({}, function () {
			var $view = {
				modules: []
			};
			for (var x in modules) {
				if (modules.hasOwnProperty(x)) {
					var isEnable = lMods.hasOwnProperty(x);
					$view.modules.push ({
						id: x,
						name: modules[x].name,
						desc: modules[x].desc,
						enable: isEnable,
						config: isEnable && !!modules[x]._conf
					});
				}
			}
			var $tpl = $(Mustache.render ($template, $view));

			var $wndConfig = $.dialog.open ($tpl, {
				title: '贴吧助手 - 配置窗口 (刷新后生效)',
				height: 200
			});

			$('.jx_conf', $tpl).click(function () {
				var x = $(this).data('config');
				if (lMods.hasOwnProperty(x))
					_run (lMods[x]._conf.bind (lMods[x]), '模组配置 [' + lMods[x].name + ' (' + x + ')]');
			});

			$('#jx_save', $tpl).click(function () {
				var newStatus = {};
				$('#jx_conf_modules>label>input', $tpl).each(function (i, inp) {
					newStatus[$(inp).data('module')] = inp.checked ? __mod_enable : __mod_disable;
				});
				$conf.set ('modules', newStatus);
				$wndConfig.close ();
			});
			$('#jx_close', $tpl).click($wndConfig.close.bind($wndConfig));
		}, '助手设定界面');
	})();

	// 未登录用户可以通过 GM 菜单激活配置项
	GM_registerMenuCommand ('梦姬贴吧助手模块配置', _menu);

	if (unsafeWindow.__YUME_DEBUG__) {
		GM_registerMenuCommand ('打印模组配置', function () {
			console.info ('梦姬模组配置: ');
			console.info ($conf.get ('modules'));
		});
	}

	_run (function () {
		var _callMenu = function ($parent) {
			console.info ('成功捕捉到菜单元素，传递至回调…');
			_run (function () {
				var $menuItem = $('<li>'),
					$menuLink = $('<a>' ).appendTo ($menuItem).addClass('jx').text('助手设置');
				$parent.find ('.u_tb_profile').before($menuItem);
				$menuLink.click (_menu);
			}, '菜单召唤');
		};
	
		var ma = new MutationObserver (function ($q) {
			try {
				$($q).each(function (i, $eve) {
					$($eve.addedNodes).each(function (i, $ele) {
						if ($ele.nodeType != 3 && $ele.className == 'u_ddl') {
							throw {ele: $($ele), name: 's'};
						}
					});
				});
			} catch (err) {
				if (err.ele) {
					ma.disconnect();

					_callMenu (err.ele);
					return ;
				}

				throw err;
			}
		});

		var _m = $('.u_setting>.u_ddl');
		if (_m.length) {
			_callMenu (_m);
		} else {
			ma.observe($('.u_setting')[0], {
				childList: true,
				subtree: true
			});
		}
	}, '捕捉设定');
	// console.log ($('li.u_setting .u_tb_profile'));

	var lMods = {};

	_run (function () {
		_css = $('<style>').appendTo(document.head);
		_css.append (/* File: tieba.css */
(function () { /*
.pull-right	{ float: right			}
a.jx, .ptr	{ cursor: pointer		}
.pad-left	{ padding-left: 0.5em	}

.floor-stripe {
	background-image:
		linear-gradient(45deg,rgba(255,255,255,.15) 25%,
		transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,
		rgba(255,255,255,0.15) 75%,
		transparent 75%, transparent);
	
	background-color: #d9534f;
	background-size: 40px 40px;
	text-align: center;
	border: 1px solid #ccc;
	margin: -1px;color: #fff;
	text-shadow: #000 0 0 .5em;
	padding: .5em 0
}

.hide { display: none }
.text-red { color: red }
.text-center { text-align: center }
.text-disabled { color: #666; text-decoration: line-through }

.user-hide-post-action > a.jx-post-action {
	display: block;
	padding: 3px 5px 5px;
	cursor: pointer;
	color: #222;
}

.user-hide-post-action a.jx-post-action:hover {
	background: #f2f2f2;
}

.jx_autoflow {
	height: 100%;
	overflow-y: auto;
}
*/}).extract ());
		_cssH.insertAfter(_css);
		
		// 配置项更新
		switch ($conf.get ('confVer', [0])[0]) {
			case 0:
				var $disabledMods = $conf.get ('modules', []);
				var $modsList = {};
				$disabledMods.forEach (function (e) {
					$modsList[e] = __mod_disable;
				});
				$conf.set ('modules', $modsList);
				break;

		}
		$conf.set ('confVer', [1]);

		var $mods = $conf.get ('modules', {});
		
		$.each (modules, function (mId, fMod) {
			if ($mods[mId] == __mod_disable
				|| ( ($mods[mId] == __mod_default || !$mods.hasOwnProperty(mId))
					&& fMod.def === false
				)
			) return ;

			lMods[mId] = fMod;
			lMods[mId].id = mId;
			if (lMods[mId]._init) {
				console.info ('初始化模组: %s[%s]', mId, lMods[mId].name);
				lMods[mId]._init.call (lMods[mId]);
			}

		});
	}, 'Init. modules');

	var _event = function (floorType, otherInfo, _proc) {
		var fooCB = _proc || '_proc';
		$.each (lMods, function (mId, m) {
			if (!m[fooCB] || !(m.flag & floorType))
				return;

			_run (m[fooCB].bind(m, floorType, otherInfo), m.name);
		});
	};

	var _procLzlContainer = function (i, tailer) {
		var $tailer = $(tailer),
			_main   = $tailer.parents('.l_post');

		// console.log ($tailer, _main);

		_event (__type_floor, {
			_main:    _main,
			floor:    _main,
			// 「'」is not standard, convert to 「"」 first.
			floorNum: parseInt($tailer.getField().floor_num),
			tail:     $('.p_tail', _main)
		});

		// 处理解析 lzl 帖子（…
		// $tailer.find('.lzl_single_post').each(_procLzlPost);
		return _main;
	};

	var _procThreadList = function (i, threadlist) {
		var $thread = $(threadlist);
		_event (__type_forum, {
			_main:  $thread,
			thread: $thread
		});
		return $thread;
	};

	var _procLzlPost = function (i, lzlPost) {
		var $lzl = $(lzlPost);
		_event (__type_lzl, {
			_main:  $lzl,
			lzl: $lzl
		});
		return $lzl;
	};

	if (isThread) {
		$('.j_lzl_container').each(_run.bind ({}, _procLzlContainer, '初始化帖子搜索'));
		$('.lzl_single_post').each(_run.bind ({}, _procLzlPost, '初始化楼中楼搜索'));
	} else {
		$('.j_thread_list').each(_run.bind ({}, _procThreadList  , '初始化贴吧页帖子搜索'));
	}
	var mo = new MutationObserver (function (eve) {
		_run (function () {
			$(eve).each(function (i, eve) {
				if (!eve.addedNodes.length) return ;

				$(eve.addedNodes).each(function (i, ele) {
					// Text node.
					if (ele.nodeType == 3) return ;

					var $ele = $(ele),
						_type = 0,
						$tmp;

					// 单贴处理
					if ($ele.hasClass ('j_lzl_container')) {
						// _type = __type_floor;
						$tmp = _procLzlContainer (i, $ele);
						$tmp.find('.lzl_single_post').each(_procLzlPost);
					} else if ($ele.hasClass ('j_thread_list')) {
						// 贴吧主页面
						_procThreadList (i, $ele);
					} else if ($ele.hasClass ('lzl_single_post')) {
						// 仅限翻页时触发
						_procLzlPost (i, $ele);
					} else if ($ele.hasClass ('user-hide-post-action') && !$ele.hasClass('jx_post')) {
						$ele.addClass('jx_post');
						_event (__type_postact, {
							_main: $ele.parents('.l_post'),
							_menu: $ele
						}, '_menu');
					}
				});
			});
		}, '页面元素插入');
	});

	$(document.body).on ('click', '.jx', function (eve) {
		var $eve  = $(eve.target);
		var $data = $eve.data ('jx');
		if (!$data || !lMods[$data] || !lMods[$data]._click) return ;

		_run.call (lMods[$data], lMods[$data]._click, '>> 单击助手功能: ' + $data, $eve, $eve.data('eve'));
	});

	mo.observe($('#j_p_postlist,#thread_list').get(0), {
		childList: true,
		subtree: true
	});
};