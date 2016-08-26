var id = GetQueryString("RemoteId");
var code = 1;
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	$scope.sId = id;
	$scope.goBack=function(){
		history.go(-1);
	}
	//获取店铺下面的评论
	$http.get(serverUrls.getReviewtraceitem + "?RemoteId=" + id + "&code=" + code + "&length=1&currentPage=1").success(function(response) {
		myToast.disAble();
		$scope.Commenting = response.data;
	}).error(function(error) {
		myToast.noTime("获取评论失败！");
	});
});