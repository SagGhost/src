/*isToken(); */
var app = angular.module('myApp', []);
app.controller('goodDetailController', function($scope, $http) {
	$scope.goBack=function(){
		history.go(-1);
	}
	var mySwiper = new Swiper('.swiper-container',{
		    loop: true,
			autoplay: 3000,
			pagination: '.swiper-pagination',
			paginationClickable :true
	    });

});