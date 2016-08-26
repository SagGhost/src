var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	//获取优惠券列表
	$http.get(serverUrls.getCoupons + "?length=12&currentPage=1").success(function(response) {
		myToast.disAble();
		$scope.lists = response.data;
	}).error(function(error) {
		myToast.noTime("数据获取失败！");
	});
	$scope.goBack = function() {
		history.go(-1);
	}
});
app.controller('introMapCtrl', ['$scope',
	function($scope) {
		$scope.mapState = {
			show: false
		};
		$scope.toggleMap = function() {
			$scope.mapState.show = !$scope.mapState.show;
		};
	}
])
var btn = document.getElementById('btn');
var obj = document.getElementById('intro-body');
var total_height = obj.scrollHeight; //文章总高度
var show_height = 100; //定义原始显示高度
if(total_height > show_height) {
	btn.style.display = 'block';
	btn.onclick = function() {
		obj.style.height = "auto";
		btn.style.display = 'none';
	}

}

function openNew() {
	//获取页面的高度和宽度
	var sWidth = document.body.scrollWidth;
	var sHeight = document.body.scrollHeight;

	//获取页面的可视区域高度和宽度
	var wHeight = document.documentElement.clientHeight;
	var oLogin = document.createElement("div");
	oLogin.id = "login";
	oLogin.innerHTML = "<div class='loginCon'><div id='close'>点击关闭</div></div>";
	document.body.appendChild(oLogin);

	//获取登陆框的宽和高
	var dHeight = oLogin.offsetHeight;
	var dWidth = oLogin.offsetWidth;
	//设置登陆框的left和top
	oLogin.style.left = sWidth / 2 - dWidth / 2 + "px";
	oLogin.style.top = wHeight / 2 - dHeight / 2 + "px";
	//点击关闭按钮
	var oClose = document.getElementById("close");

	//点击登陆框以外的区域也可以关闭登陆框
	oClose.onclick = function() {
		var oBtn = document.getElementById("btn-map");
		document.body.removeChild(oLogin);
		oBtn.style.display = '';
	};
};

window.onload = function() {
	var oBtn = document.getElementById("btn-map");
	//点击登录按钮
	oBtn.onclick = function() {
		openNew();
		oBtn.style.display = 'none';
		return false;
	}

}