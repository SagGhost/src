var comtDialogs = document.getElementsByClassName("pingj_dialog")[0];
var id = GetQueryString("RemoteId");
var code = 1;
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	$scope.sId = id;
	isToken();
	//获取店铺信息
	$http.get(serverUrls.getShop + "?token=" + Token + "&shopid=" + id + "&IsCoupons=1").success(function(response) {
		$scope.shop = response.data;
	}).error(function(error) {
		myToast.noTime("获取店铺信息出错！");
	});
	//获取店铺下面的评论
	$http.get(serverUrls.getReviewtraceitem + "?RemoteId=" + id + "&code=" + code + "&length=2&currentPage=1").success(function(response) {
		myToast.disAble();
		$scope.Commenting = response.data;
		$scope.length = $scope.Commenting.pagelist.length;
		if($scope.length == 0) {
			comtDialogs.style.display = "block";
			comtDialogs.innerHTML = "暂无评价";
		} else {
			comtDialogs.style.display = "none";
		}
	}).error(function(error) {
		myToast.noTime("获取评论失败！");
	});
	$scope.goBack = function() {
		history.go(-1);
	}
});