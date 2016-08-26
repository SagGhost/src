/*var sId = JSON.parse(GetQueryString("sId"));
var token = sId.token;
var code = sId.code;
var RemoteId = sId.RemoteId;
var MainPic = sId.MainPic;
var RemoteName = sId.RemoteName;
var nStar = 1;
var contentView = document.getElementById("comt_content");
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
	$scope.shopName = RemoteName;
	$scope.MainPic = MainPic;
	myToast.disAble(300);
	$scope.goBack = function() {
		history.go(-1);
	}
	$scope.addImg = function() {

	}
	$scope.putStar = function() {
		var e = arguments[0] || window.event;
		nStar = Math.ceil((e.pageX - 10) / 34);
		$scope.nWidth = nStar * 34 + "px";
	}
	$scope.comtSubmit = function() {
		$scope.nStar = nStar;
		var content = contentView.value;
		var attchmentids = "";
		var textToSave = {
			"token": Token,
			"attchmentids": attchmentids,
			"content": content,
			"code": code,
			"RemoteId": RemoteId,
			"RemoteName": RemoteName,
			"score": RemoteName,
			"parentid": ""
		}
		$http.post("http://commenting.cdchanghong.hfingo.com/api/comminting/inreviewtraceitem", textToSave).success(function(response) {
			myToast.haveTime("评论成功！");
		}).error(function() {
			myToast.noTime("评论失败！");
		});
	}
});*/
var id = GetQueryString("sId");
var code = 1;
var collectionType = 1;
var contentView = document.getElementById("comt_content");
var nStar = 1;
var app = angular.module('myApp', []);
var comtImgBtn=document.getElementById("comt_img");
app.controller('myCtrl', function($scope, $http) {
	isToken();
	$http.get(serverUrls.getShop + "?token=" + Token + "&shopid=" + id + "&IsCoupons=1").success(function(response) {
		$scope.shop = response.data;
		myToast.disAble();

	}).error(function(error) {
		myToast.noTime("获取店铺信息出错！");
	});
	$scope.goBack = function() {
		history.go(-1);
	}
	$scope.addImg = function() {

	}
	$scope.putStar = function() {
		var e = arguments[0] || window.event;
		nStar = Math.ceil((e.pageX - 10) / 34);
		$scope.nWidth = nStar * 34 + "px";
	}
	$scope.comtSubmit = function() {
		$scope.nStar = nStar;
		var content = contentView.value;
		if(content == "" || content.length < 5) {
			myToast.haveTime("评论内容不得少于5个字！");
			return;
		}
		var attchmentids = "";
		var textToSave = {
			"token": Token,
			"attchmentids": attchmentids,
			"content": content,
			"code": code,
			"RemoteId": id,
			"RemoteName": $scope.shop.Name,
			"score": $scope.nStar,
			"parentid": ""
		}
		$http.post(serverUrls.inreviewTraceitem, textToSave).success(function(response) {
			myToast.haveTime("评论成功！");
			setTimeout(function() {
				history.go(-1);
			}, 1000);
		}).error(function() {
			myToast.noTime("评论失败！");
		});
	}
});