var app = angular.module('myApp', []);
var phoneBtn = document.getElementById("phone");
var yzCodeBtn = document.getElementById("yzCode");
var yzBtn = document.getElementsByClassName("yzBtn")[0];
var yzCode = "111111";
var unAble = false;
app.controller('myCtrl', function($scope, $http) {
	myToast.disAble(500);
	$scope.goBack = function() {
		history.go(-1);
	}
	yzBtn.onclick = function() {
		if(unAble) {
			return;
		}
		myToast.isLoading();
		var phone = phoneBtn.value;
		if(isMobile(phone)) {
			$http.get(serverUrls.sendCode + "?phone=" + phone).success(function(response) {
				var code = response.code;
				if(code == 0) {
					myToast.haveTime("发送成功，请注意查收！");
					yzBtn.className = "yzBtn yzDisable";
					var n = 61;
					unAble = true;
					var t = setInterval(function() {
						if(n == 1) {
							yzBtn.innerHTML = "重新获取验证码";
							yzBtn.className = "yzBtn";
							unAble = false;
							clearInterval(t);
						} else {
							n -= 1;
							yzBtn.innerHTML = n + "秒后重新发送";
						}
					}, 1000);
				} else {
					var message = response.message;
					myToast.noTime(message);
				}
			}).error(function(error) {
				myToast.noTime("获取验证码失败！");
			});
		} else {
			myToast.haveTime("手机号码错误，请重新输入！");
			phoneBtn.value = "";
			return;
		}
	}
	$scope.lgSubmit = function() {
		myToast.isLoading();
		var phone = phoneBtn.value;
		yzCode = yzCodeBtn.value;
		if(phone == "" || yzCode == "") {
			myToast.haveTime("用户名或者密码不能为空！");
			return;
		}
		myToast.haveTime("暂时没有这个接口！");
		/*$http.get("http://mall.cdchanghong.hfingo.com/api/apimall/gettoken?name=" + phone + "&psw=" + pwds).success(function(respose) {
			$scope.data = respose.data;
			var Token = $scope.data.Token;
			var RefreshToken = $scope.data.RefreshToken;
			//保存用户登录信息 	
			localStorage.clear();
			localStorage.setItem('Token', Token);
			localStorage.setItem('RefreshToken', RefreshToken);
			//登录成功跳转上一页
			myToast.haveTime("登陆成功！", 4000); 
			setTimeout(function() {
				window.location.href = "index.html";
			}, 3000);
		}).error(function() {
			myToast.noTime("登陆失败！");
		});*/
	}
});