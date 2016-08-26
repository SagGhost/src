var app = angular.module('myApp', []);
var passwardBtn = document.getElementById("passward");
var lgeyeBtn = document.getElementsByClassName("lg-eyeBtn")[0];
var phoneBtn = document.getElementById("phone");
var settingItems = document.getElementsByClassName("lv-item");
var bool1 = false,
	bool2 = false,
	bool3 = false;

app.controller('myCtrl', function($scope, $http) {
	myToast.disAble();
	$scope.goBack = function() {
		history.go(-1);
	}
	$scope.seeChange = function() {
		if(passwardBtn.type == "password") {
			passwardBtn.type = "text";
			lgeyeBtn.className = "lg-eyeBtn noSee";
		} else {
			passwardBtn.type = "password";
			lgeyeBtn.className = "lg-eyeBtn";
		}
	}
	$scope.isAll = function() {
		var n = settingItems.length;
		var isAll = true;
		for(var i = 0; i < n; i++) {
			if(settingItems[i].getAttribute("class") != "lv-item selected") {
				isAll = false;
			}
		}
		/*var isAll = false;
		if(bool1 && bool2 && bool3) {
			isAll = true;
		}*/
		return isAll;
	}

	$scope.lgSubmit = function() {
		if($scope.isAll()) {
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
				myToast.haveTime("登陆成功！", 4000);
				setTimeout(function() {
					//history.go(-1);
					window.location.href = "index.html";
				}, 3000);
			}).error(function() {
				myToast.noTime("登陆失败！");
			});
		} else {
			myToast.haveTime("请先允许APP使用权限！");
		}
	}

	$scope.isSelected = function(obj, s) {
		if(obj.className == "lv-item") {
			obj.className = "lv-item selected";
			s = true;
		} else {
			obj.className = "lv-item";
			s = false;
		}
	}
});
var isSelected = function(obj) {
	if(obj.className == "lv-item") {
		obj.className = "lv-item selected";
	} else {
		obj.className = "lv-item";
	}
	/*alert(bool1 + "," + bool2 + "," + bool3);*/
}