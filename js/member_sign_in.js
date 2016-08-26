var nStar = 1;
var app = angular.module('myApp', []);
app.controller('memberSignInController', function($scope, $http) {
	$scope.isShow = false;
	$scope.isSign = false;
	$scope.signText = "签到";
	$scope.score = 0;
	isToken();
	//获取积分
	$scope.getScore = function() {
			$http.get(serverUrls.getMypoints + "?token=" + Token).success(function(response) {
				myToast.disAble();
				$scope.score = response.data;
			}).error(function(error) {
				myToast.noTime("获取积分失败！");
			});
		}
		//获取签到详情
	$http.get(serverUrls.getSign + "?token=" + Token).success(function(response) {
		$scope.isSign = response.data.issign;
		if($scope.isSign) {
			$scope.signText = "已签到";
		} else {
			$scope.signText = "签到";
		}

	}).error(function(error) {
		myToast.noTime("获取签到信息失败！");
	});
	$scope.getScore();
	$scope.goBack = function() {
		history.go(-1);
	}
	$scope.goSign = function() {
		if($scope.isSign) {
			return;
		} else {
			myToast.isLoading();
			var strJson = {
				"code": "1",
				"token": Token,
				"SignPerDay": "1"
			}
			$http.get(serverUrls.pointsByevents + "?strjson=%7B%22code%22%3A%22" + strJson.code + "%22%2C%22token%22%3A%22" + strJson.token + "%22%2C%22SignPerDay%22%3A%22" + strJson.SignPerDay + "%22%7D").success(function(response) {
				var code = response.code;
				if(code == 0) {
					myToast.disAble();
					myToast.haveTime("签到成功！");
					$scope.signText = "已签到";
					$scope.getScore();
				} else {
					myToast.haveTime(response.message, 3000);
				}
			}).error(function(error) {
				myToast.noTime("获取积分失败！");
			});
		}
	}
	$scope.putStar = function() {
		var e = arguments[0] || window.event;
		//		console.log(e)
		nStar = Math.ceil((e.pageX - 10) / 40);
		$scope.nWidth = nStar * 40 + "px";
		//		console.log(nStar);
		//		$scope.n=nStar;
	}

	$scope.memberRule = function() {
		$scope.isShow = !$scope.isShow;
	}

});