/*2015.01.17 21:00*/

/**********************************************************************************
 *此处为按钮设置
 *************************************************************************************/
var anobtnset = {
	//※必须设置	按钮放在哪个id之前，alltabs-button，back-button等
	intags: "tabbrowser-tabs",

	//※必须设置	按钮图标
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAbCAYAAADCifeFAAADZElEQVRYhe2XXWhTZxjHvW7TJF2W0iU9OUnTnNa1jFrTNsfRdWOCFwG3yZDB5r6uXDcZnSIUdOhuLE0/Uk1jyxZsm8TaZVXKlmoLbtI5ImNdg1PEwi4yrIUqKqz1YnH97WIk5KNhMnVn1lz84fCe533f/+95nvfwnnWuggKeFK1T2kAeNg+bh83D3hdsX7GKU88Z6dUX55zQWaTCYyrFL+SO+b8qDdajKWRGNuC32+g3ldBZWJgW3KPTcsQqMG4XCZm1ipt/INjDGhWXmwyM11vw1pTTZzHgflpLt6YIj1GPt0qkV7Jw8UWRMfNjXtnDGhWRTQKfmYwcMgsMbbBy3F7B8Y1WAnYbR6tEPtEbmJLNjFl1ipt/IFi3WoW3wkBLSRkBewUhuYqRRomRRolRRyVfyRIHLCL7BCMDek3WYuGdW4lHfUktR7x4JCFtLB71EXTKLITb08bOH3gvuc5qcxLvlyNe5obaHgKsTsux2nKmX5A43bwef72UhA022BiVJS5sqSbwrMjR8tKcsKsZzzS4EG5nOeJd1VTmnLmhNuJRH75NNQ8PdqS5mt9cr/OD3cSZ5vUEGyROOCS+dPwNe/L5Kr5vMHPpHZkLe52KwmbulZqERHymlzTYmU+3cS+ym5lt1UzWmQk4KvHbbQTrbQzXS3ztsHGuoYwbJz9icayFPoNuVdiE5obasloyAZjZxkGnnLONlyNezu55Iw0qF2zQKROP+vip84PclR19qYbFU638ebmb22f2Mb7BSJfwDB1mEy6LQIfFhF/UMud6l3sxH3enWpl4pfY/qWyq7qeysdDBZJLCO7dmw4bffpWlqxP8EZuEu1Nc7d5B71NFdIhldFlF2tVqzr3lIH7zNCvXvyF+ZYCz77+sGGxqBRPPqfEeScg630nYLrWaE5ubWJz+gpX5MVYWhpna0USnTovbUMJwnYnfZ4/AnfMszXzOxJub6SnWKAabWsFY6GBWEuJRH7e+7Uk7Hll3476yUq7074FrAe786CLYaMVbUkQs1MrKzUnmJwcYrKv8V19DpZXzR2D649dYmnXz6+AuLh7aztIv/cy699Orf/wuE/8I6yoo4LsWJ/Ph/cRCu/nZ9aHiZh8pbL/VSGjLRo7VVjBYJylu9pHCrjXlYdeq8rBrVU8U7F9cpEwugKahCwAAAABJRU5ErkJggg==",

	//菜单弹出方向，不设置就默认,参考 https://developer.mozilla.org/en-US/docs/XUL/PopupGuide/Positioning
	position: "",
};

/**********************************************************************************
 *child:[  ]内为当前菜单的下一级菜单配置,支持多级
 *text 为运行参数，如果无需参数，直接删除text属性
 *exec 为打开路径，可以是任意文件和文件夹，支持相对路径，相对于配置文件夹；
 *【文件夹】不支持直接“\\”开头的相对路径，需要用【Services.dirsvc.get("ProfD", Ci.nsILocalFile).path】开头
 *oncommand 可以用function(){}；
 *小书签可以用oncommand:function(){
	gBrowser.loadURI("javascript:内容")
 }；
 *-------------------------------
 *除了以上属性外，可以自定义添加其他属性，如果快捷键accesskey等
 *-------------------------------
 *{}, 为分隔条
 *-------------------------------
 *如果设置了id属性，会尝试获取此id并移动，如果在浏览器中没有找到此id，则创建此id
 *************************************************************************************/
 
//下面添加菜单
var anomenu = [{
	label: "火狐范儿",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACvklEQVQ4jY2TW0iTYQCGv27qtgIh3e+/f/vd4VfE2XJzYpqKh0Koq7oIMyhJCIwOCIVopqKmlYcUxZRcuelEJ5WkeBo2s7SyJM8HnIqWppVNcW76dpFaskW98F693/PAB99HyGYGg6g4fSCnJv9IgZfQ/4mcr+9Tkf07hs8Rzhca/ViUHRIPaOSM1BFc5s0k5nkI0XuYN2k3zoRTMQMhfJTKWJTJWBS6M8lbW5GQEj3w4PflcALo5QxmI6iPdoLRcCqmM0CAW3wKOW40SjyF0CrE41qVpEN9UGQu5PhI4FFQe/IxHckfsBO8DRbEJAhcEbXPCRXeLHQqCapUEmiVYuhUUuiUYqQwNE7vdYIhgHlnJ6jwdotK4tGoD+Sg95dCoxBDq/yjvhI0HuFwj2Nxl6ab7ARDBSeT2hQidIdyqPGTQu3zG9YoJVD7iGEIdUenjEXHOeXIDrhPd3P3+nDuVP8Vf7SyLBqCOGh8paj2+9VKlRS1/lIY5CIYQzisGBNh6806vi1YbIiPXTXGY7XpIl4GS1Hn7oZiLxalmy30EKJKLkKzUIjx+6dg7c2EuT72KSGEkLm21OjF9jTTcmc28OU5pnSXoGVESD9AIc3VBRk0D8kuziiiWXRfDQEWmmHpuYPVtmsw18eeJctjrcdWTMZ2y4wR659agB8G9CQeRS4lQLbAFXkSGhkufDwL52A16YGlLtjGNbANFi+svk8P276GZaLhxtpoNTZmarE+qUHdCRmyeAxyXRiUSARYMKQCS29gHauBdfhhtaOXSlb6dArbWPnXjalKLHZk4pHMDfk0i6GSM9iYb8HatAFrQ5rzDuGtjIzk7bH2FzTaJh5joDAar6+HwTJchpVxg8ky1OjwjzjM91e3y7915cD8IX920ZhjIoTs+m+YEEI+t6eFz7Wmxs2/SImcN6Rc/tu5n3AjiZeW30teAAAAAElFTkSuQmCC",
	child: [{
		label: "网站首页",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMklEQVQ4jc2Tu2oCURRFdzIi4idMNf3AsPdu/IFU04ZACvuAFmqRR2Nhl4+wSWWZ1j/IVwhBrayCQURSmOZOmAz4SJcLBw7cs9Z9nQv8bVykaVoHcHlOcc1223YbQA0ASNL2q6TrU3BEsitpJWlFshsEN7b3kp7PgZckeyR7kpa27yTdnhL8wLYHkoaShiF/tz09JqjCI9tb21tJI5J92x+HBIfgfYhC0pP0KWkMICrDnSNwVdK3PSfZARBB0qPt+Qn4l8T2wPZc0hMkjcPWqvDM9luI2YHjvCBN0zrJ+wq8IZnHcdyM47hJMre9KUtsPyRJ0kCSJI3ieUqxzrKsVVxSlmUt2+tKzfSfCADUJE3Kk5J2oQuvQgwl7So1E4RPBpK5pEVlha+iE0NehhckcwD4BqeD7Zmx4aS4AAAAAElFTkSuQmCC"
	},{
		label: "火狐扩展",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-extension/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jZ1SsUoDURC8Io3/oJWFNnaCXCNPwcZ4b3dmwD6CoJVYif6BtY3WojaC+hU2CnYWtulDiCCoEAuTeJ65O8nCVjtvZnfmJUlJAdgC+EGqD2C/DDe2YoyLpPr5dpf+TUByukiQZZqvUeUygJa7RLJJqp0jeAGw6u6bAFoxcqV4705Rsb55lF/5egKCi9wGvBsM3use/iSjy/wJ22bKQggNgPcVqs9pmk6Zad1du2PNNLOFCoLmRBEOO8Y4V0sAYKOMwF17ZapnAE8BrJHqVZj4ZqaM5DHJk5yqbscZ5s5DAAeAHipjJHlTALRDCI3fp/Gp6h9cFbJ+/OvN6K8MMDofDc1sCVAXUJdUD2DHzGaGc3efJfX6jWGH1CfJmCRJ8gWPZifIwJ0eigAAAABJRU5ErkJggg=="
	},{
		label: "火狐主题",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-theme/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABlklEQVQ4jZWTsWvUQRCFJ1EjHFoLqwQCB4fssbPfC2ijBKtgJ1aCnQqWirb+EwreWSkGBDXFSQoLG1MIQSGFjaZKKRqJIBhjRDibDSw/7kwceMUOw8fOmxkDngA7kob/qS3grgE7wOec80OgB/RrSbrfyPeABWAT2LBCe2RmB2KMU9YISSfd/VwjfQh4AfwwSUOg3263DwN3JF1PKZ3odDpHgauS1nLO1xqASUnPasADM7Oc801JfyR9BJaBX8A3SbP7AkhqA+u1WcAHdz++L0AIoQW8ari9LWng7vMhhNZeLVyQ9H3EyLYlrUi6aGYTowC9GOO0pFVJv4Ev9W4A7yQlMzs47gc9dz8D3HL3eXePwFKBvS27slh5MbqFOoDzwHtJs8DjUvcypTRTDP83IMZ4BLgSQmh1u91jkgal9nVKqZNzviHp01hAgUwV0yzGOF1NaMXdTwGXdgELxaAJM5usVL939+RNgaymlM5auapNSQPg6ThJeg7cTimdLtMaSloz4J6kr5K29tBPYCPnfBmYA9aB/l9K2PjjXsR/3gAAAABJRU5ErkJggg=="
	},{
		label: "火狐插件",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-plugin/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jbWTsWpVQRCGtwspbQRjpaigtYin0SKIHM+5e/b75hUsoo3EJxJ8DwtLmyA2ESGJYlADiVFB5RpzLbLgFYLeG7AY2N1hvpnd/9/UNM0isKpuaRz8K8AfGhvq/bZtFxLEQ40vGpM5Y7+UuJc0Xp+geKIxgVhP4OHUwR74cQ7I1/S72DfAzWGI2+D72Sbw+x+AUsqy2oEf5gZojCHWNJ5rfINYB19qbEA8gnis8e6vE+Scr6rXIdZKKddyzhfULue8lFJK6t0q47GAzb7vz45Go3PgM+AScBriqfqk67pTwzBc0diZCdD3cRG4rLELbuacl7ouzoPbMwNqx93qvDP/BzBlpLc5e6OUsgy+GIa4o2aNfXAbuAX0029QjeRW3RzU5E6VdK8681Dj5xEoPtX1tJVZBT+f5DMBK6lpmsVS4sHRPWNcdR4fF1O5V8BK27YLvwCEF774kDAvMwAAAABJRU5ErkJggg=="
	},{
		label: "便携版本",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-portable/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB2ElEQVQ4jYWTP0jVURTHj6L20MXeEPKW7vC22+/e8/m+QXBzErJBGiJptjHNxaG18O0Nbg1tbxDCoZKgQgJxskUaXqC4FrxBaTNbbmXPPx04cLl8v1/On+8x64sYYx1YkfQFOAaOy3slxljvx/eTJyR1gC6w6u5z7j4HrAJdSZ0Y48Rl/GFgDdiV1DIzazQao41GY9TMTFIL2AXWzGz4HDulNAnsu/usmQ26+wKwA+y4+0L5mwX2U0qT5wSAZUnbKaWxnPM00CutdIFeznk6pTQmaRtYvkigDWyYmbn7InAC3C954u6LBbcBtP8hV1VVSXoPfAoh1HLOM8AR8LnkUc55ptlsXpO0BXyoqqr6PfkRYF3SKdBz9wcxxrq7LwF7wJ67L8UY6znne5K+F+x6jHHEQgg1SZvA67LCA0lbkh67+5S7TwGPgI/FE6cl34YQahZCqAHvJD0xs0FJLUnPSuld4AA4OUO8UuDsWm9Iegj0LiD/X6BM/GZp6XKBMtlN4FVK6dZZl10lALwJIdTMzAaA+WKQfUkdSXerqrp+icCPgp03s4E/5br7eM75DvBS0tdi4+eSvgE/JR26+wt3v+3u4+dP6W8MSUpAW9JhuY+nkpKZDfWDfwGcN9elzC4e2gAAAABJRU5ErkJggg=="
	},{
		label: "UC 脚本",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/uc-script/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAUElEQVQ4jWNgoAYwNDQ8YmRk9B8NHyZWngGL5H8jI6P/xMoPBwOwBZKhoeERYuUHAaBLOjAwMLCG8fX19W1IjgV0V9PfAGQvGBgYWA+edAAAYHvJ0ycnisoAAAAASUVORK5CYII="
	},{
		label: "油猴脚本",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/greasemonkey-scripts/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jaWSQUrEMBiFA15iBtfDTAhJ3nvgCcRFu/EArjyIzFzDjXiBgpvZC/UM4gkqsxqsu0Gpm7Z2alsRA4H8/P/38kKeMePrBMAlyXuSz5JKko8T89+L5LmkF0lVb18DSAGcjcIAriR9DMDtJnkzBC5IZpIOv8B7AIsjOISwJLmfAvsiIYRl896E5K7T3DrnZgAuJB1IfpJMrLVzkg+duR3JxEgquurW2nnjTNItgLumds7Nem4K07dXg7mkPMZISaGp697x/IhAe+7XQwLFPwReDYB0AMhJPk3UlaQKQPrjBgDriZCthxwaSW/ND0jaTGRg0/wEyfdWoE5gm4ExBzHGU5LbejZrG9771V+T6L1fHanXcc4klRNwSTJrY2yM+QKvMPkYe5i+ewAAAABJRU5ErkJggg=="
	},{
		label: "火狐样式",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-stylish/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABdklEQVQ4jZ2TsUuWURTGD1SIiA1+CFEfuLz0XXzhPef3tEp8QyQWDQ0tTQ0O/gUhYpDo1OQY1BAu/gONgRqN4SqISU5OGdQSErwO3uT101S+Cw+Xe8+5P55zONeKohiQ9AZYAzbyfpHWJX0G3qaUWiZpWVLdp7ZM0qakGvgEzALzV9QiMGvAhqQ6IqatnwWsZQfzPaHrwANgyt0nexURj9x94r+AlFLrsh4AB03Aq14A8CcnHwI/gO/AT0mH+X7nBCDptZlZVVVDZmZFUdyU9FdS7e6TZmZlWd4yM3P3p2cAEfEcGJP0C3hnZjeA35LqlFIrIp5J2gPGG+WdAjyWdO8kcAw4yA7uAO9z3ouyLEfOK+FltvcQuN3pdIb/NSsiuu12ezCXcg24fwYALDSbWFXVUETMRcSSu99txiQ9aQLWM2DmqrPj7mV+s2uSvubDh4jonjc0PQPUjYi57GDfgJV+PxPwxYBRYBXYBnYl7Vyib1kfJRVHnrYERrq2WucAAAAASUVORK5CYII="
	},{
		label: "图标壁纸",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-pic/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/klEQVQ4ja2QwUrDQBRFR2kE695qyLJVwoTJO3frRwnaRbe60P6Bf+GXuBaqiEsRcaUirUrcmBBCxTQ4cHbvnnnvujiO+2Z2KGnoujxgCtyGEPY7CSR9SnrI83yvq6BYQdBzzkVdBRFwBJzGcdz/S9D8KQKOgVdJC2BaSZoC7/2GmY2BkyRJNp1zvVq4kFQAc+A8hLDVFKyZ2VjSWzkETICXMlzjHbioBGY2yrJsAMxqQwtgviRcbvJVCSQN0zTdlXT3W2AZ/ycoT5B0BTxLempDs8R1Mxvlee7b4n7KeDSzgxDC9ipkWTYoN/gA7oFZS26Aa+DMrVJYg0vv/c43/6PjyunAK00AAAAASUVORK5CYII="
	},{
		label: "资源聚合",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-aggregation/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABGklEQVQ4jaWTvUqDQRBF0/oOeYZkznkBW20trATFImAjdiIIImJsEtFCBJEggopYBovgD9rYiI0GFMFKH0AFsRJtNoXkCwnJwoWBu3vYuczkcoMe9XcQ5YAyUAGqWYqI9Q5eBSjnIqIGHGXoFLgGboCrrDsRUevWwqN6rN51bEH9zDB2gF1gTR1TGx0AH20AYDsiltQGsNflh22AekTMpfoFWAHOewKkwIaBH+AkpfwMzAPLvQBegQNgWt1IGVSTt6mW1O+uGairQDM9nAEWU31YLBbHgbdugH+KiAVgNkHOgFH1IfnvvY5yXd1KkFt1RH1qzUFdvVQvspTCbUbEVERMJuCXWgL2+1m+CfW+UCjk+97gfD4/1Kr/ABLLJkkNyrUpAAAAAElFTkSuQmCC"
	},{
		label: "安卓火狐",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/android-firefox/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABfUlEQVQ4jb2TMWtUURCFJ7tZCIob61c9HpcsoryZ71jZJGWKdBaWptTW1IEUbkgRRf+AvTaKEFInBDZoGUS0EAkBEQJiLZq1uZFs8jZJ5YEpLnPOYWY41+wsOsAsULj7jLvPAAUwa2adBv4oyrKcApaAd5L2Je0D74GlsiynLtK3I2Ili19JGuZ6A2xHxIqZtceqAQe+Az8kfTk2AL5KOsw9PyOs6/pqSqnr7jcjog+sAWuSViWtHr8jol/X9a1er3etKIor/44m6bmkjYhYlLQHfBxTHyQ9kLQh6ZmZdayqqmlJu3nEx5J+ndj9dP0Gnkg6lLRbVdX0iEFE9P+/QUqpCwwuu4Kk9cwdpJS6ZmZtYBl4ATzMpEYD4I+kR5m7fDITk2bWcvd7mTRugiFw38xaWTMKSbeBrRykIfBZ0ifgSNJPSTvAnfOiPJFS6kp6nUV3I2IhH28zIq6b2cT5v8GsBbwEjtx9HpjLBm8bx25CjvA3wCXdAA6Ap03cv6K13pqqY+3SAAAAAElFTkSuQmCC"
	},{
		label: "火狐教程",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-tutorial/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB9UlEQVQ4jW1TsWpUQRS9L7vZJBhBm4DkJb7dfZvdx8zcuecUfoCdlZ0W/pBgI4iIYOsHWAUrQbC1S5VK9+0GUbSI2pm1cGZ5yF4YZuYO93LOPWeE5EOSvwEsOmtOcglg3smdxhgPSb5U1QPJQXJF8qmqDkMIs7x774/M7Ea6j1R1WNf1jqoeqOq1VF4Iya91Xe/Ihggh3NyUjzEeAvgA4LYAaFV1mt62RURUdQjgHMAXAOfe+7GISFmWewl1k5DXQnJpZlVq0HPODQBckXxLsgFwSvJzQrmVkM0ALMxsIgDaEMIsw/PejwGcOef2u3Nyzh3nu5lVJC9CCCMheUGyFhGpqmpXRHppiYgIgDcA2kyvQ2HpvR8LgHkIYbSeqkg/nbdIfiT5y8wmOZcojNYUSC5JNiIizrmBc26QzsdpgEe5OA/RzCbr2QFYZH6puKiqatc5N+gYpkjFRZLxBEAbYzwRkt86xlhL1TTNLQCvptPp9Q1W6AP4nhusSD5X1TK/OucGuVGeuplNVHWaPPIiKbMvMcYHAC4B/ADwOumdod4h+Sn9iwWANu0/zexRF1LPzO6TXHWkekJyBeCZmU2892OSjaoOu+gka16W5R6APwDuAXgH4EpV727gn6OQjjcKESkAPAZwSfL9fx9sW/55oFvUF5HeXxmgmngrw2ouAAAAAElFTkSuQmCC"
	},{
		label: "火狐翻墙",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-gaogent/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6klEQVQ4jYWSTYiOURiGz0SNvyY/ZfE1i1HvYvT2vvNc11p2lqLsLAnJkBQaC5SmpialxsK/YTL5KVlYmBSNlNHQpAiJ0kQWFqyUzWdzvvpm0Dybc87z3M997vs8J6V/BDACzAJvgNfAB/UFsO1f+L9CvRARu4qi6EoppaqqetUzahN4/FdDWZYrgB2NRmNZe77RaCzr7e1dM4/8pfqur69vQ0qpoyV5Wm22EsB+dRCYzA0PImKgrut1RVF0qU31c0ppcYvgDfAqpZQiYhNwQ30GfAHu5Ya7ETGWMVvUs0AjRcRWYCYXIoP71avAcXU3MB0R29WXwLU2Rx1JPa/eykpO5Ycaz+tz4Homva1OZKtzRjYJjGQFh7PkfvUJcFo9AswAR4GdwNOIWNlOcLMlCzik/gbOqb+AUfVkVnM5Iq4As/NnvkedygQb1WZEDKj3gaGIOKh+VPdkJQ8zdkgdTj09PUvUr1VVVdnGPuCi+ihP4U5WcEmdaLv4e0QMtA7D6o+24iAwCsyoU3k9q27Ot48D0/OtfI2IEymlVBRFZ1EUnSmlRer6uq6Xt3ARMaY2q6paNYegLMsVZVmunjehvREReX9A/Ql8q+t6bVoo1AvZ+yf1LfA+Io4t2NiK/OeHI2Jrd3f30v/h/gBRDLkczMjRXQAAAABJRU5ErkJggg=="
	},{
		label: "涨姿势了",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-knowledge/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB+klEQVQ4jYWTzUtWQRTGjx+tIqwsoQKtl9Arlztzfg9EUlGhEEW1rUVSBGJRGIrUonUL6w94MfvaRi4UiorAdi1auC3a9AdUuIjQVtmiuS+DCA0cmHPPPM+c5zxzzf6tDjOzqqp2VFVVmJk1Go0uSXPAY3ffnupFo9HoSphOyzbt7r4fWJG0HkI4LGlc0rqkdWDC3Y+k/bcQwgEza09hbWZmwIkMcAvYK2kN+F1VVeXud+t6jJF0+RZLLG1mZu7+FPjQ39+/qyzLXmBe0kIIoSeE0AN8BJq2YbWbWYekF5I+A4uSTgN/JK1JWgV+uftJ4DXwCXhe325mZmVZ9mbtv3H3yTrP4pqkpUzGvhaBpIPZwQV3v7EJwbikt3U+ODi4p0VQFEV3dvClu49tQjAKvKvzoii6a3xHGuD9JGEFOJO3CywCI5J+pm8P8iF2JhuP1wB3H4sxXsj0nkszWE/vZCi3sZ7D1YxgEpjIOrju7rczORc3WmmSplLxh6Rn7n5P0mqKO8AjSd/TmakWEJgFZtz9kLtfijGecvezwBNJr4B5YFbSeWAEuBxjLIEZoGnA18S67O433f0o0OfuV0IIQ+kfGAX6YozHksXLSdoXK8typ6SHm9j2v5gDdrekDAwMbAshDAPTQDM96feSlpKNTWA6hDAcQtha4/4CYDj1lRqiCrAAAAAASUVORK5CYII="
	},{
		label: "火狐新闻",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-news/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgUlEQVQ4jZWTP28TQRDF5w7HAZJPYDnExaXa093+3odISYWC8hmQ6JKKSFg0FPSg1KGIFAnyD5TaLsI3cA29yxQ0pmDHWU5CmJVGt3o7782buV2z36uXvoXvQwibkg5jjAej0ejh3/Ic7JlZORwOH5lZaWYm6UbSIsVJyl3r5JWu5mBhZtY0zYaku0zgp7vwvBBCPwnekxNodV1vZeSFpEUI4YnbDyH0q6paz1vIwSK1cOJk4KMnhxD6qVDhDqyqqvVcMca407btrqQJMAWexhh30nHZnVdvqWRmwFGq+r6u6y1gG/iQsCN3kciFD7FI5GeZ7R/AO+CtpO8Zvp+1vuaWvPpLSbeSJpJugTHwJu2nwLcY4wvrrLJt2z3gs6Qb4By4AL4AZ5I+AdeSLiVdAtfAhaTnSwVJV93f9q8Avjq/AF4B8/8gzyUd+uwsu32zFQRmg8HgcTbIP4Z4toLAaXeIPbt/QMcrCBxnF2r5Ist0AyMwlvQ6D8eAcdM0ygo/+AVCl8IXxRMolQAAAABJRU5ErkJggg=="
	},{
		label: "新版预报",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-version-forecast/')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAPCAYAAADphp8SAAABkElEQVQ4jY2TPWtUQRiFT1bidyE2wrLgBrZylpl5TmEso5WWIkiqNCI2oiAExN4fIDaClT/AIo2FWkSEiIJYaCNIBAsbkxiMiF/JWngX7g53V1+Yah6ed945M1KtgGPAHWAVuN/v949otKZyznPAku1N2z9tP0spnRwCLeCc7de2B7YHwLbty3UJMG/7w5CprZcKIewGrgAbJQA86PV6eyQpxmjbHxskA2BHtm/a/tYE2H4XY+xUY18AloDVBtFXAfeAWznnG8BWAX2JMZ6oTnRA0jQwD/woRCvqdDr7JLW63e5e4HEBbAML9du2fRr4XuN+55wXRyIBrgE7hey2pKkKmQbuFvtvYowzI6KUErbXCvBFzvlQ1ehMFXv9NFdrjf5Wu93eDzwqRFvV2zkKPC/2HoYQDqupgOsN6T0FnhSS9yml442SKp1Z4POY5zCUrKeUzo+VSFII4SCwPEG0afuSpNZEkSTlnBfHSD7lnC9K2vVPSTXeDPCqGOdtSumsyoT+Q3aq+sS/gOUY4+wk/g9OKvA8w/ixtQAAAABJRU5ErkJggg=="
	},{
		label: "评价一下",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://koubei.baidu.com/s/www.firefoxfan.com')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDUlEQVQ4ja2STWoCQRCF2yN4Ad2LZxDjToeZqp05gT/pV2tv5k5JAjmBuwhhxsUw9FStXSgkiygYdAIOPnirevVVUd1OQVsT/q5jBW1d3eazHw2gg4F2Bvqq8M6EDpUAFSoCaBx80ivB/UsHn/QCaKxCRTUAtDehDwWvVGj9x+DVb432/25Q+uS5BPcV8UARD8qX5Kn+BuCVgd5V+LPWDaqm3vsKV1Mf/A9AbyaUGTg1cKrCuYGPV2Hw8VRLDZyaUKbCry6bR83cj9q5H7XzSdyyKXUMvLwBWNqUOvkkbp3z2TxqulsqZlHXhDcXgE0xi7o3w1UKiIcqHFQ4BMTDu5pPaqinhXpaOOcaVaEf6AEi/gX3KqwAAAAASUVORK5CYII="
	}, ]
},{},{
		label: '自动更新',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACn0lEQVQ4jYWRW0jTYRjGHyQkRCHCTAmZGmV0sAOYiSYVFRSSSF110YWGZWU1t4mHqX9NyZpnzdNww2yuuYPb/tt0c266zXlankohD5kEEgbdRkS8XUQjbeZz+7y/3/t+fICPtHo+hqXpZ9IBAAzj52vmv0nTTB73L2R/JEjcDSmvJ24FP7dMpXR7bm4LZrCe4MDy3vWDdQO28GrrGLJVFCseZvdX21zIUpB/We9SjXMhyidsXvocgnzdOu7J6USzQxnZMOhGvo6QraZzUnftpc6xKmTKCQX6b+zy+oF/BLFNjl48VhLytRRTb1NHNgy6wdcQ8rQ/kzpGReFV1mkUsoSH3RRdafFsgPPMc3HIVhFKjQSBhq52jlRzRP2T4KnpjnE2CQCi6+09yNUSnpgIj7rpvn462Su43jVeBK6KINRTsMiy1jj8gbO3wvwug317+e9FoaL+VeRpCQINxbU4G73FPpFFCaGewFfTabFLBgBlA/Oczc882uSQIKeHwBgpoMRo8hbhlVY5CnQEgYYOvxjSbgYZ+9QuADjV5pIiR0MoNlBQmdHgHUiVjfLBVRGKWEIRS+rZVe9XMX1zu0NEVkemYfZiVL19EUI9gaemxFbnM6+g1bNyCILfZuRqKbDU9ImxzwUydvsOCNmvgcXslwvSkTbkagklRgJXRXWu5cQNZ6Z2jEqQISMwBvIrNnw//3KsKexp33twlRRaY51PELtkKNARHigovmXIAF+JqB0YR3onnW0flt5QeHjIUhAK9RRaY52PFztluNtFQeV9C561tQCfAgDg1NnawddQRJV1+kjzkAVcFe2pMC/GS9z6kMp+J2Nf2bkl/CdpupnoYy0OSaZp5kyyfIIBT0W3dW9itgW3ypVX47xr8omTvrpfYwtHv4Wx+FgAAAAASUVORK5CYII=",
		child: [{
			label: "自动更新 Goagent 最新可用 IP",
			tooltiptext: "由火狐范长期维护的 Goagent 最新可用 IP，如果你的 goagent 冒黄、冒红、速度奇慢，请点击更新一下，全程自动，三秒搞定，翻墙无忧。",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\update\\Update Goagent IP.bat",
		},{}, {
			label: "自动备份火狐配置",
			tooltiptext: "自动备份火狐常用配置文件，如果你有额外的文件或文件夹需要备份，请修改BackupProfiles_7z.bat文件。注意备份将关闭Firefox！",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\BackupProfiles\\BackupProfiles_7z.bat",
		}, {},{
			label: "自动更新 HOSTS",
			tooltiptext: "如果你是WIN8.1系统，可能会因为权限不足而导致不能自动替换HOSTS，请手动替换。",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\update",
		}, {},{
			label: "编辑 HOSTS 文件",
			tooltiptext: "",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\update\\EditHosts.bat",
		}, {},]
	},{},{
	label: "长期维护",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jaWToUstURDGB4Po32AQk+EG88WyVrl373y/4SGC5b0gCIIgBhFE0KBR8ILNavGBQZOYH++9ahXEYhcRvcE17K4uKxvUga/MnPmd+ThzzN3ngRuJ+88I4k6KdYMYQGRflUk8fQPwYBCPEFdS/C4FnAAn1dxH8Rfi0SAy91iySrRarWFJHfdYdI9lST+tFmnKDERmEJkU62Zm7XZ71N2TXo85YNPdE0lTknaB606nM1YCJP14AwAbZSEHcitpP0mSkTLvHisQg263O2Fmll9SA5TJUnVrEM/AQSMgHzVvluK0ZnuomO5fIwDYeZ+AHSlW3dkyM5udZbwAHDUC3D2pWpA4TtN0Mn8VziCyNGW6EZDb4E/R/CJxLMVesbqZxGV5rhFQWLmob121+QNA0q/6ovR6zEnRl+LQ3RfqdUntygTx353tzwg4Lz6T1r76maTovwLv6V7BBm3W0gAAAABJRU5ErkJggg==",
	child: [{
		label: "免翻墙 HOSTS",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-gaogent/hosts-ipv4-firefoxfan.html')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMklEQVQ4jc2Tu2oCURRFdzIi4idMNf3AsPdu/IFU04ZACvuAFmqRR2Nhl4+wSWWZ1j/IVwhBrayCQURSmOZOmAz4SJcLBw7cs9Z9nQv8bVykaVoHcHlOcc1223YbQA0ASNL2q6TrU3BEsitpJWlFshsEN7b3kp7PgZckeyR7kpa27yTdnhL8wLYHkoaShiF/tz09JqjCI9tb21tJI5J92x+HBIfgfYhC0pP0KWkMICrDnSNwVdK3PSfZARBB0qPt+Qn4l8T2wPZc0hMkjcPWqvDM9luI2YHjvCBN0zrJ+wq8IZnHcdyM47hJMre9KUtsPyRJ0kCSJI3ieUqxzrKsVVxSlmUt2+tKzfSfCADUJE3Kk5J2oQuvQgwl7So1E4RPBpK5pEVlha+iE0NehhckcwD4BqeD7Zmx4aS4AAAAAElFTkSuQmCC"
	},{
		label: "代理规则 gfwlist.txt",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-gaogent/gfwlist.html')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jZ1SsUoDURC8Io3/oJWFNnaCXCNPwcZ4b3dmwD6CoJVYif6BtY3WojaC+hU2CnYWtulDiCCoEAuTeJ65O8nCVjtvZnfmJUlJAdgC+EGqD2C/DDe2YoyLpPr5dpf+TUByukiQZZqvUeUygJa7RLJJqp0jeAGw6u6bAFoxcqV4705Rsb55lF/5egKCi9wGvBsM3use/iSjy/wJ22bKQggNgPcVqs9pmk6Zad1du2PNNLOFCoLmRBEOO8Y4V0sAYKOMwF17ZapnAE8BrJHqVZj4ZqaM5DHJk5yqbscZ5s5DAAeAHipjJHlTALRDCI3fp/Gp6h9cFbJ+/OvN6K8MMDofDc1sCVAXUJdUD2DHzGaGc3efJfX6jWGH1CfJmCRJ8gWPZifIwJ0eigAAAABJRU5ErkJggg=="
	},{
		label: "最新可用 Goagent IP",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-gaogent/goagent-ip.html')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABlklEQVQ4jZWTsWvUQRCFJ1EjHFoLqwQCB4fssbPfC2ijBKtgJ1aCnQqWirb+EwreWSkGBDXFSQoLG1MIQSGFjaZKKRqJIBhjRDibDSw/7kwceMUOw8fOmxkDngA7kob/qS3grgE7wOec80OgB/RrSbrfyPeABWAT2LBCe2RmB2KMU9YISSfd/VwjfQh4AfwwSUOg3263DwN3JF1PKZ3odDpHgauS1nLO1xqASUnPasADM7Oc801JfyR9BJaBX8A3SbP7AkhqA+u1WcAHdz++L0AIoQW8ari9LWng7vMhhNZeLVyQ9H3EyLYlrUi6aGYTowC9GOO0pFVJv4Ev9W4A7yQlMzs47gc9dz8D3HL3eXePwFKBvS27slh5MbqFOoDzwHtJs8DjUvcypTRTDP83IMZ4BLgSQmh1u91jkgal9nVKqZNzviHp01hAgUwV0yzGOF1NaMXdTwGXdgELxaAJM5usVL939+RNgaymlM5auapNSQPg6ThJeg7cTimdLtMaSloz4J6kr5K29tBPYCPnfBmYA9aB/l9K2PjjXsR/3gAAAABJRU5ErkJggg=="
	},{
		label: "Goagent 免配置包",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://www.firefoxfan.com/firefox-gaogent/firefox-goagent-free-package.html')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jbWTsWpVQRCGtwspbQRjpaigtYin0SKIHM+5e/b75hUsoo3EJxJ8DwtLmyA2ESGJYlADiVFB5RpzLbLgFYLeG7AY2N1hvpnd/9/UNM0isKpuaRz8K8AfGhvq/bZtFxLEQ40vGpM5Y7+UuJc0Xp+geKIxgVhP4OHUwR74cQ7I1/S72DfAzWGI2+D72Sbw+x+AUsqy2oEf5gZojCHWNJ5rfINYB19qbEA8gnis8e6vE+Scr6rXIdZKKddyzhfULue8lFJK6t0q47GAzb7vz45Go3PgM+AScBriqfqk67pTwzBc0diZCdD3cRG4rLELbuacl7ouzoPbMwNqx93qvDP/BzBlpLc5e6OUsgy+GIa4o2aNfXAbuAX0029QjeRW3RzU5E6VdK8681Dj5xEoPtX1tJVZBT+f5DMBK6lpmsVS4sHRPWNcdR4fF1O5V8BK27YLvwCEF774kDAvMwAAAABJRU5ErkJggg=="
	},{
		label: "一键加入本配置QQ交流群",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('http://shang.qq.com/wpa/qunwpa?idkey=cdf18e0c0a885d98890baf915573b71ae882c871f98c4686ccf00666132d3419')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jbWTsWpVQRCGtwspbQRjpaigtYin0SKIHM+5e/b75hUsoo3EJxJ8DwtLmyA2ESGJYlADiVFB5RpzLbLgFYLeG7AY2N1hvpnd/9/UNM0isKpuaRz8K8AfGhvq/bZtFxLEQ40vGpM5Y7+UuJc0Xp+geKIxgVhP4OHUwR74cQ7I1/S72DfAzWGI2+D72Sbw+x+AUsqy2oEf5gZojCHWNJ5rfINYB19qbEA8gnis8e6vE+Scr6rXIdZKKddyzhfULue8lFJK6t0q47GAzb7vz45Go3PgM+AScBriqfqk67pTwzBc0diZCdD3cRG4rLELbuacl7ouzoPbMwNqx93qvDP/BzBlpLc5e6OUsgy+GIa4o2aNfXAbuAX0029QjeRW3RzU5E6VdK8681Dj5xEoPtX1tJVZBT+f5DMBK6lpmsVS4sHRPWNcdR4fF1O5V8BK27YLvwCEF774kDAvMwAAAABJRU5ErkJggg=="
	},{
		label: "個人腳本備份",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('https://github.com/dupontjoy/userChromeJS')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABV0lEQVQ4jbWTsWpVQRCGtwspbQRjpaigtYin0SKIHM+5e/b75hUsoo3EJxJ8DwtLmyA2ESGJYlADiVFB5RpzLbLgFYLeG7AY2N1hvpnd/9/UNM0isKpuaRz8K8AfGhvq/bZtFxLEQ40vGpM5Y7+UuJc0Xp+geKIxgVhP4OHUwR74cQ7I1/S72DfAzWGI2+D72Sbw+x+AUsqy2oEf5gZojCHWNJ5rfINYB19qbEA8gnis8e6vE+Scr6rXIdZKKddyzhfULue8lFJK6t0q47GAzb7vz45Go3PgM+AScBriqfqk67pTwzBc0diZCdD3cRG4rLELbuacl7ouzoPbMwNqx93qvDP/BzBlpLc5e6OUsgy+GIa4o2aNfXAbuAX0029QjeRW3RzU5E6VdK8681Dj5xEoPtX1tJVZBT+f5DMBK6lpmsVS4sHRPWNcdR4fF1O5V8BK27YLvwCEF774kDAvMwAAAABJRU5ErkJggg=="
	}, ]
},{},{
	label: '外部打开',
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
	child: [
	{
label: "在IE中打开当前网址",
text: "%u",
exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
},
	{
		label: "在闪游浏览器中打开当前网址",
		tooltiptext: "闪游浏览器，IE浏览器内核，界面漂亮，体积小巧 【极个别情况下，首次点击无效，第二次点击之后就可以成功调用】",
		text: "%u",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Browser\\saayaa.exe",
	},
	]
},{},{
	label: '软件列表',
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
	child: [{
		label: '精品工具',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [
    {
			label: "Goagent",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Goagent\\local\\goagent.exe",
		},{},
		{
			label: "GoGo Tester",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\GoGo Tester\\GoGo Tester 2.3.9.2014.12.26.exe",
		},{},{
			label: "Hosts Editor",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Hosts Editor\\HostsEditor.exe",
		},{},{
			label: "FSCapture",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\FSCapture\\FSCapture.exe",
		},{},{
			label: "音乐间谍精简版",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\Music Spy\\音乐间谍精简版.exe",
		},{},]
	},{
		label: '系统工具',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		},{},{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		},{},{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		},{}, {
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		}, {}, {
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		}, {},{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		},{},{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		},{},  ]
	},{
		label: '工作相关',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		}, {},{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		}, {},{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		}, {},{
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		},{}, {
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		},{}, {
			label: "自行修改",
			exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\profile\\chrome\\local\\Soft\\文件夹\\文件.exe",
		}, {},]
	},{
		label: '办公软件',
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAbklEQVQ4je3TXwqAIAzAYe+VsP32pvc/QuQx7KmIAm39eYkGwz3IB24zhCdDRBIwmVn1JDCJSFqhK8gWW6HeZVWN+3Opzayehnr5HqSq8eyAmk/zTvuHPgV59ggYDtDNT1u2UAbKBWgEsrclzZgBLQgC98zNgUMAAAAASUVORK5CYII=",
		child: [{
			label: "Word 2013",
			exec: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Microsoft Office 2013\\Word 2013.lnk"
		},{},{
			label: "Excel 2013",
			exec: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Microsoft Office 2013\\Excel 2013.lnk"
		},{},{
			label: "Powerpoint 2013",
			exec: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Microsoft Office 2013\\Powerpoint 2013.lnk"
		}, {},]
	}, ]
}, {},{
	label: '他人配置',
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABTElEQVQ4jYXSP0jVURjG8Y/3yvUWOgSC5MXNEEQUCQwECYciEEQnZ3FyECQRHASdpMSWliZ1ChoiMDBaCkHM0UXxHyIoIoKmDk46OJxzQS+/e+8D73Ie3vN+z/MeHiuNPqzgBnc4whwalFEaIzjDP0xhFAs4xR80lrqgGxf4gtoH5ym8iSRfkU1qTmEe23heZMD7OOBlkvkU63FCMb3CFQaSzKwQ3A8hiyS9xjX6k8wKzAhhtSf4aXzGMV4UQ2wSMlhFZ6RKow4TuBQ2U4wQvBPWeIG/+Ikt3Ar51JRqbsE3Iahd/MaS8CfOsYdhPElq7sAmdjCEHDIRtzr6i0KIs6h62JzDGjbQWoIwizF8ihc8QxtM4z/elnpfpKmIVY/vOIB9LBdiFSiDj8I2mvELJxgkpD5eZnolJiPpYayevNkl7LqcsvggfKbe/OE9OXdCGta25zQAAAAASUVORK5CYII=",
	child: [ {
		label: "阳光盒子",
		text: "-no-remote -profile ..\\Myself\\Sunbox",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Firefox\\firefox.exe",
	}, {
		label: "RunningCheese",
		text: "-no-remote -profile ..\\Myself\\RunningCheese",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Firefox\\firefox.exe",
	},{
		label: "Kingtung",
		text: "-no-remote -profile ..\\Myself\\kingtung",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Firefox\\firefox.exe",
	},{
		label: "Dupontjoy",
		text: "-no-remote -profile ..\\Myself\\dupontjoy",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Firefox\\firefox.exe",
	},{
		label: "Fannyhenry",
		text: "-no-remote -profile ..\\Myself\\fannyhenry",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Firefox\\firefox.exe",
	},{
		label: "RunningCheese",
		text: "-no-remote -profile ..\\Myself\\RunningCheese",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Firefox\\firefox.exe",
	},{
		label: "zwt_1008",
		text: "-no-remote -profile ..\\Myself\\zwt_1008",
		exec: Services.dirsvc.get("ProfD", Ci.nsILocalFile).path + "\\..\\Firefox\\firefox.exe",
	}]
}, {},{
	label: "常用功能",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgUlEQVQ4jdVTwQ2AIAx0A0ZwFD/3Ilc6EqMxkiPow9SACphoTGxyj9K7a9rQYTgEGaKILlcgQzzyiwDgamLDSdQTdA1fMJBpgz1aXkPJO43SXFKLlxdEdBbROavt+TcGj0d4bPDzHdQOBoDLD817PxYEUtPd70tqqnTom5CaADjTrW77Ai0wH7nFAAAAAElFTkSuQmCC",
	child: [{
	label: "about:config",
	oncommand: "getBrowser().selectedTab = getBrowser().addTab ('About:config');",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABC0lEQVQ4jZWTTUrEUBCEc6DZyIC7pPurQVAh4F2EgAreRQKjSzE4Ki4H/J0jCAoeJC58Ay9vEuP0sruruqvozrKecPcJsJTUSmqBpbtP+no7AZwCdzE4JpG0AE6GwLcpaF3rIXtIwVUofJnZgaRLYBbVZ8AcOAQ+Qu95Fk1oJLVmVo7JNLO9QPC4YRhwNUYgqe4YmximaO0p8A6s8jzfjTYgNjZLDYsmvUaNq576L26IAHiONnsbJBiSUBTFjqQn4AWYrvPu7h0JiYnzMROBi43rBK4lte5+NEbg7vuB4D5OHofkt5mVkmozI1m7NrMS+AzDzlJTbv57ypIWQ/oqSc0fz9QA1ZjMrd75B1lk19vKzwu4AAAAAElFTkSuQmCC"
},{},{
	label: "about:about",
	oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:about');",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABC0lEQVQ4jZWTTUrEUBCEc6DZyIC7pPurQVAh4F2EgAreRQKjSzE4Ki4H/J0jCAoeJC58Ay9vEuP0sruruqvozrKecPcJsJTUSmqBpbtP+no7AZwCdzE4JpG0AE6GwLcpaF3rIXtIwVUofJnZgaRLYBbVZ8AcOAQ+Qu95Fk1oJLVmVo7JNLO9QPC4YRhwNUYgqe4YmximaO0p8A6s8jzfjTYgNjZLDYsmvUaNq576L26IAHiONnsbJBiSUBTFjqQn4AWYrvPu7h0JiYnzMROBi43rBK4lte5+NEbg7vuB4D5OHofkt5mVkmozI1m7NrMS+AzDzlJTbv57ypIWQ/oqSc0fz9QA1ZjMrd75B1lk19vKzwu4AAAAAElFTkSuQmCC"
},{},{
		label: "about:plugins",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:plugins')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzklEQVQ4jc1SyQnDMBDcDhSBtXqmBD8MtrQflWAICGlfLsUluASX5BJSgktwXgH5iBKCIRnQZ9kZaUYD8HeopBeEcSTkmTQvpHkh5JkwjpX0IktudGhXxO1Bnhsd2kOyUdyliwZjbwvvbOGdwdinwkZxlyXXGMrtBTWG8lCkxlCmzzQYewAAg7HPzUjzYgvvwOp43w0BYOsfAMAW3q12dbwDIU/fChDytPf2qYU0q1chVtILutyu2RBP+cZTivREJb2wKgzbKlsVhrdV/gkeMqXAlXes4XwAAAAASUVORK5CYII="
	},{},{
		label: "about:support",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:support')",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzklEQVQ4jc1SyQnDMBDcDhSBtXqmBD8MtrQflWAICGlfLsUluASX5BJSgktwXgH5iBKCIRnQZ9kZaUYD8HeopBeEcSTkmTQvpHkh5JkwjpX0IktudGhXxO1Bnhsd2kOyUdyliwZjbwvvbOGdwdinwkZxlyXXGMrtBTWG8lCkxlCmzzQYewAAg7HPzUjzYgvvwOp43w0BYOsfAMAW3q12dbwDIU/fChDytPf2qYU0q1chVtILutyu2RBP+cZTivREJb2wKgzbKlsVhrdV/gkeMqXAlXes4XwAAAAASUVORK5CYII="
	},{},{
		label: "about:telemetry",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:telemetry')",
		image: "chrome://browser/skin/Geolocation-16.png"
	}, {},{
		label: "隐私浏览",
		oncommand: "OpenBrowserWindow({private: true});",
		image: "chrome://browser/skin/Privacy-16.png"
	},{},{
		label: "权限管理",
		oncommand: "getBrowser().selectedTab = getBrowser().addTab ('about:permissions')",
		image: "chrome://mozapps/skin/passwordmgr/key.png"
	},{},{
		label: "安全模式",
		oncommand: "safeModeRestart();",
		image: "chrome://mozapps/skin/extensions/alerticon-warning.png",
	}, ]
}, {},{
	label: "书签管理",
	oncommand: "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABS0lEQVQ4jY1SzUoCURi9IL5CVJuEKAoShNk5ejnnPEQEQgQiGESrgt4gaC0qhSHVoh96ETe+SJt2peBt802MMlNz4YO55/vOz3cZ53KOpIGkYDXIm8s8ANYlBZILkgtJoV6vrxUWIDky5zeS7/Z9V9T9wNznjUZjF8Aeybmk4L3fzyO1SA5JTrP2Jnmb4CSnJIcAWqtxk/qSNGk2mxuJQBzHm5Imkr7TsyRHLiEB6AKoRVFUzlsviqIygBqArhmF3wQkn5xzpQLPVCL5kk6wJenTgP5/bJJ9S/0Rx/Gmc8457301tdd5HlnSRTLnva8uNQGcmUCvgPtpVvPGBC7/SHAlKQC4zmq+msChJaqQ7JPsAagYdmQzz1kJHqx5THJMcpZ6lxnJewAndh9nJeis/FBB0qPVEg6gnbdjx5J0JG0nuPd+B0Cb5HiV/AOStMNZrdTkSAAAAABJRU5ErkJggg=="
}, {},{
	label: "打开选项",
	oncommand: "openPreferences();",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABR0lEQVQ4jY2SP0sDQRDFr1UEUTRW+Q7iieGO7N57z8I/WJvSxlJrQS2sbSz9BulESGUEQRtbGwULrdKJaCEE03g2k3DGu1wWlllm5/dm9rFBMGIB2JPUIvkpqQVgd1T9YNVqtQWSbUlpzj4vFSB5JSkl+QKgUa/XZwDskPyRlAJYLBs7lfTqnJs3wU1JPcvf92Mcx5V/ApIurUsjk/u2iW4sPli8yBN4N4G5TG7gAcnnOI4rdn7Le/+HpDSKotkcgZ5zbimKogkT6P6BkySJMp2SIp+SJNmwuusi+LQIDsNwmuSj1R2Wws65FQBTYRhOAtiS9GR1d0EQBAGA5SIYwFHeZyJ5672v9k1r2sVZEUzyi2SXZBvAwbDrHUmp975K8tlcP+7DANaL/BieYN97X5V0MjZsAtsF71wrhbMiJJskOxZXx2V/AYbjyhDulDKPAAAAAElFTkSuQmCC"
}, {},{
	label: "附加组件",
	oncommand: "BrowserOpenAddonsMgr();",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAfElEQVQ4jc2SSwqFQAwE+14KSWWn1/YqosfwrRzEEeNv8RqyCZki3RnpSwFDRCwRsQBD1q+0Dq2V9SVJZtYB034oK2Ays05PHm8hZT13b69m5e5tsXPkq/J5klcFyEJMAa83uKo/BNw5I9AUwMuPNAvogfkBYAT6u9Yr/QBtWNOEJkNI4gAAAABJRU5ErkJggg=="
}, {},{
	label: "错误控制台",
	oncommand: "toJavaScriptConsole();",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA00lEQVQ4jZ3TMUoDURCH8V80oAQhNxGsUwombBlMmzaFJwimsLC2sPEKYmWZYDRNzpB+c4lAQGKxsxBB2bc78MHweP+PYWAoqo3zmrQjK8MrFpgnsohMBlscGrIVzXdDDrDHI4a4xSiBYWT2sEM/9tHBqbTqR9YON7jAM57QrSsoJ7jEGi8Jkj8FLTwgx1W8nR1xUiWYYKNYFIzxhU+scPefoNzBJPpWfOrhPpjhumqCOvVLMGggGJSCHO+YHo1bxTQyOcVBvGGJj0SWkcnKcRqf8w97emULqueg+gAAAABJRU5ErkJggg=="
}, {},{
	label: "关于浏览器",
	oncommand: "openAboutDialog();",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABKUlEQVQ4jY3TS0qDQRAE4C+J0ZVuRXxeQVyLG0lOoCB4EkWiN4gHUEFFBRcKIm68h89tFHxeQMHF9C/JmAQLZjPTVT1TU00nBlHDMZ7wHesp9mpR0xWj2MYbbrGDNaxjF3d4RzNq/5DPg7yGcZTazkuYwAY+cNYuUg3VVyxlxAXMZ0Ir0agZXHW8ROd2cgUH2EM5E2lEwxrJnJu4Yo6xWDmmcY8jaEkmdUMdi132S3G7FnxJTucYwKVkbqXL+WZwewpUcYWLEOsp0JKMKmUF/QTKOCye0MvEfgIzeBAm1vGM5ayoIgXmVKcHZWxp+8YhyekJDGfd5jCbkVelNP4GqcAUriVzJnWGpxznW/iURbnAiDRM7/G+fSlxDenPH/UZpgLFOJ/45zj/ADriSwEdnrkgAAAAAElFTkSuQmCC"
}, {},{
	label: "重启浏览器",
	oncommand: "Services.appinfo.invalidateCachesOnRestart() || Application.restart();",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII="
},{}, {
	id: "appmenu-quit",
	label: "退出浏览器",
	class: "menuitem-iconic",
	oncommand: "Application.quit();",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACtElEQVQ4jY2ST0gUYRjGn9m1Yb/d+WZ3/u/MzsqMMy4uC0ogDawEkuDBhCCQlAg9SBety4aXooiQPRh0bUnKQ38gKOlkFpGEWmQEJRsVKaXW6qpdlDp0mC4aW2L1Xj543uf3vu/3fh/w92gEcB5A9T98O6O5uTnEcdxkJBLxo9Fo4X85DcBZAPt6enpCyWTyhWmaK5Zl3drKtwMYAEB2kISQBCFkihDygxAymcvlZNd1p13XLafT6eGuri6ZEPKJEPKdEHLHMIxwJR+klN6RZbkcj8eXPc8rjI6OxhzHeeo4Trm2tvZaoVAINzQ03Nc07bMoil8ppRd/0ZIkHRZFcS2RSCy2tLTc3djYUFpbWyO2bT+3LKvsuu51AJidnU17nvfEMIwFQRCWFEXZu13ghqZp5bq6uuLY2Fj91hJjyWRyxjTNck1Nzc3tZoODgwcty/qoquqaJEkX0NTURGVZnlFVdbWxsfHqtnFgYIDquv5SEIRv1dXVt7d13/f3ZDKZcUVRVlVVvQfP80xZlouyLK+n0+nTlYvp7u4+lc1mp/r7+49U6qlUaliSpHVN0ybQ29urKYryShCEdcMw8pXGYrHIbm5uxn3fD/z21pp2SxCEdV3XH8D3/SrTNMcppSuxWOxxR0dHcLdPAgCZTCYei8WKlNKy4zhXAADZbPYMx3Gr4XB4mef5k38rwHHcpUgksszz/Ep7e/tRAMDIyIiTSCResyy7yLLsQiAQOAGA/YONVlVVDYZCoS8sy352XffR3Nxc9Fe2r6/vWDQaXQoEAgvBYLDEMMxDAOcA9APIA5gOBoPLDMMsqqr6Pp/PH9gxXi6XO67r+hsAJQAlhmFWAaxtnSWGYUq2bc8MDQ0d2vWOExMT+9va2i7btv2M5/l3lNIPoii+TaVSk52dnUPz8/P1lf6fdmi4VMHjbpAAAAAASUVORK5CYII="
},]