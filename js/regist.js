var passwordBtn = document.getElementById("passward");
var phoneBtn = document.getElementById("phone");
var yzCodeBtn = document.getElementById("yzCode");
var isAgree = document.getElementsByClassName("isAgree")[0];
var yzBtn = document.getElementsByClassName("yzBtn")[0];
var app = angular.module('myApp', []);
var agreeCode = true;
var yzCode = "111111";
var phone = "";
var password = "";
var unAble = false;
app.controller('myCtrl', function($scope, $http) {
	myToast.disAble(500);
	$scope.goBack = function() {
			history.go(-1);
		}
		/*$scope.getCode = function() {
			var phone = phoneBtn.value;
		}*/
	$scope.isAgree = function() {
		if(isAgree.className == "isAgree agreeed") {
			isAgree.className = "isAgree";
			agreeCode = false;
		} else {
			isAgree.className = "isAgree agreeed";
			agreeCode = true;
		}
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
		var phone = phoneBtn.value;
		yzCode = yzCodeBtn.value;
		password = passwordBtn.value;
		var textToSave = {
			"name": phone,
			"psw": password,
			"code": yzCode
		}
		if(!(isMobile(phone)) || !(isYzcode(yzCode)) || password == "" || agreeCode == false) {
			myToast.haveTime("信息填写有误，请重新输入！");
			//phoneBtn.value = "";
			return;
		} else {
			$http.post(serverUrls.addaCcount, textToSave).success(function(response) {
				var code = response.code;
				if(code == 0) {
					myToast.haveTime("注册成功！", 10000);
					setTimeout(function() {
						window.location.href = "login.html";
					}, 2000);
				} else {
					var message = response.message;
					myToast.haveTime(message+"!");
				}
			}).error(function(error) {
				myToast.noTime("注册失败！");
			});
		}		
	}

});