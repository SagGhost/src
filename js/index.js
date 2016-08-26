/*isToken(); */
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	//获取优惠券列表
	$http.get(serverUrls.getCoupons + "?length=12&currentPage=1").success(function(response) {
		myToast.disAble();
		$scope.lists = response.data;
	}).error(function(error) {
		myToast.noTime("数据获取失败！");
	});
	var mySwiper = new Swiper('.swiper-container',{
				loop: true,
				autoplay: 3000,
				pagination: '.swiper-pagination',
				paginationClickable :true
			});

});