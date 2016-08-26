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