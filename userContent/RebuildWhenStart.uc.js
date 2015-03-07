//調時間  2015.03.05
//防止因加载延迟而没有显示(_addMenu.js的)菜单
//重复加载几次，防止第1次未加载成功

(function() {
setTimeout(function() {addMenu.rebuild(true);}, 2500);//2.5秒
setTimeout(function() {addMenu.rebuild(true);}, 4500);//4.5秒
setTimeout(function() {addMenu.rebuild(true);}, 60000);//60秒
})();