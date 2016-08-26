var passwardBtn = document.getElementById("passward");
var phoneBtn = document.getElementById("phone");
var lgeyeBtn = document.getElementsByClassName("lg-eyeBtn")[0];
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	myToast.disAble(500);
	$scope.seeChange = function() {
		if(passwardBtn.type == "password") {
			passwardBtn.type = "text";
			lgeyeBtn.className = "lg-eyeBtn noSee";
		} else {
			passwardBtn.type = "password";
			lgeyeBtn.className = "lg-eyeBtn";
		}
	}
	$scope.goBack = function() {
			history.go(-1);
		}
		//用户登录
	$scope.lgSubmit = function() {
		myToast.isLoading();
		var phone = phoneBtn.value;
		var pwds = passwardBtn.value;
		if(phone == "" || pwds == "") {
			myToast.haveTime("用户名或者密码不能为空！");
			return;
		}
		$http.get(serverUrls.getToken + "?name=" + phone + "&psw=" + pwds).success(function(respose) {
			$scope.data = respose.data;
			var Token = $scope.data.Token;
			var RefreshToken = $scope.data.RefreshToken;
			//保存用户登录信息 	
			localStorage.clear();
			localStorage.setItem('Token', Token);
			localStorage.setItem('RefreshToken', RefreshToken);
			//登录成功跳转上一页
			myToast.haveTime("登陆成功！", 1500);
			setTimeout(function() {
				window.location.href = "index.html";
			}, 1000);
		}).error(function() {
			myToast.noTime("登陆失败！");
		});
	}
});