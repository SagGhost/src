//isToken(); 
var app = angular.module('myApp', []);
app.controller('setController', function($scope, $http) {
	//	myToast.disAble();
	$scope.cancelLation = function() {
		localStorage.clear();
		window.location.href = "index.html";
	};
	$scope.goBack = function() {
		history.go(-1);
	}

});