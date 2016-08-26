var phoneBtn = document.getElementById("phone");
var yzCodeBtn = document.getElementById("yzCode");
var newPwdBtn = document.getElementById("newPwd");
var surePwdBtn = document.getElementById("surePwd");
var yzBtn = document.getElementsByClassName("yzBtn")[0];
var yzCode = "111111";
var app = angular.module('myApp', []);
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
		var newPwd = newPwdBtn.value;
		var surePwd = surePwdBtn.value;
		var phone = phoneBtn.value;
		yzCode = yzCodeBtn.value;
		if(phone == "" || yzCode == "" || newPwd == "" || surePwd != newPwd) {
			myToast.haveTime("信息填写有误，请重新输入！");
		} else {
			var textToSave = {
				"phone": phone,
				"newpsw": newPwd,
				"code": yzCode
			}
			$http.post(serverUrls.getBackpsw, textToSave).success(function(response) {
				var code = response.code;
				if(code == 0) {
					myToast.haveTime("密码修改成功！", 10000);
					localStorage.clear();
					setTimeout(function() {
						window.location.href = "index.html";
					}, 2000);
				} else {
					var message = response.message;
					myToast.haveTime(message);
				}
			}).error(function(error) {
				myToast.haveTime(error);
			});
		}
	}
});