/*isToken(); */
var app = angular.module('myApp', []);
app.controller('goodListController', function($scope, $http) {
	$scope.goBack=function(){
		history.go(-1);
	}
});