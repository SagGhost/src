var app = angular.module('myApp', []);
var id = GetQueryString("id");
app.controller('myCtrl', function($scope, $http) {
	$scope.goBack = function() {
			history.go(-1);
		}
		//日期为单位数，不全为2位数
	$scope.tens = function(s) {
			s = s < 10 ? "0" + s : s
			return s;
		}
		//获取当前日期
	$scope.nowDate = function() {
		var dates = new Date();
		var y = dates.getFullYear();
		var m = dates.getMonth() + 1;
		var d = dates.getDate();
		var nowDate = y + $scope.tens(m) + $scope.tens(d);
		return nowDate;
	}
	$scope.overDue = false;
	$http.get(serverUrls.getActivity + "?activityid=1&IsShop=1").success(function(response) {
		$scope.Activity = response.data;
		$scope.isDue = $scope.Activity.EndAt.substring(0, 10).replace(/-/g, "");
		if($scope.nowDate() > $scope.isDue) {
			$scope.overDue = !$scope.overDue;
		}
		myToast.disAble();
	}).error(function(error) {
		myToast.noTime("获取活动信息失败！");
	});
});