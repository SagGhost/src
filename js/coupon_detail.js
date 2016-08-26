var id = GetQueryString("id");
var bool;
var app = angular.module('myApp', []);
/*var Token = localStorage.getItem("Token");*/
app.controller('myCtrl', function($scope, $http) {
	$scope.bools = function() {
			if(bool) {
				document.getElementsByClassName("detailBtn")[0].style.backgroundImage = "url(img/bg_lq2.png)";
			} else {
				return;
			}
		}
		//获取优惠券信息
	$http.get(serverUrls.getCoupons + "?couponsid=" + id + "&IsShop=1").success(function(response) {
		myToast.disAble();
		$scope.detail = response.data;
		$scope.surplusNum = $scope.detail.Num - $scope.detail.SendNum;
		bool = ($scope.surplusNum == 0) || false;
		$scope.bools();
	}).error(function(error) {
		myToast.noTime("获取优惠券出错！");
	});
	$scope.goBack = function() {
			history.go(-1);
		}
		//领取优惠券
	$scope.getCoupon = function(i) {
		if(bool) {
			myToast.haveTime("对不起，没有优惠券了！");
			return;
		}
		isToken();
		var textToSave = {
			"couponsid": i,
			"token": Token
		};
		$http.post(serverUrls.incouponsRecord, textToSave).success(function(response) {
			var message = response.message;
			if(message == "success") {
				$scope.surplusNum -= 1;
				bool = ($scope.surplusNum == 0) || false;
				$scope.bools();
				myToast.haveTime("领取成功！", 1000);
			}
		}).error(function() {
			myToast.noTime("领取优惠券出错！");
		});
	};
});