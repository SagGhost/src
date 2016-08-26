var fixScreen = document.getElementsByClassName("fix-screen")[0];
var fsText = document.getElementsByClassName("fs-text")[0];
var Token = localStorage.getItem("Token");
var myToast = {
	//正在加载..
	isLoading: function() {
		fixScreen.className = "fix-screen";
		fsText.style.display = "none";
	},
	//隐藏弹出层
	disAble: function(t) {
		if(t == null) {
			t = 300;
		}
		setTimeout(function() {
			fixScreen.className = "fs-disale";
		}, t)

	},
	//显示有时间限制的弹出层（没有时间，默认1s）
	haveTime: function(m, t) {
		fixScreen.className = "fix-screen";
		fsText.style.display = "block";
		fsText.innerHTML = m;
		if(t == null) {
			t = 1600;
		}
		setTimeout(function() {
			fsText.style.display = "none";
			fixScreen.className = "fs-disale";
		}, t);
	},
	//显示没有时间限制的弹出层（点击弹出层隐藏）
	noTime: function(m) {
		fixScreen.className = "fix-screen";
		fsText.style.display = "block";
		fsText.innerHTML = m;
		fixScreen.onclick = function() {
			fsText.style.display = "none";
			fixScreen.className = "fs-disale";
		}
	}
}
var isToken = function() {
	if(Token == undefined) {
		window.location.href = "login.html"
	}
}
var isMobile = function(s) {
	var re = /^1[0-9]{10}$/;
	return re.test(s);
};
var isYzcode = function(s) {
	var re = /^[0-9]{6}$/;
	return re.test(s);
};