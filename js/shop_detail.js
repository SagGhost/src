var id = GetQueryString("id");
var code = 1;
/*var Token = localStorage.getItem("Token");*/
var collectionType = 1;
var collectionStus = false;
var shopDialogs = document.getElementsByClassName("other_dialog")[0];
var scangIcon = document.getElementsByClassName("icon-scang")[0];
var comtDialogs = document.getElementsByClassName("pingj_dialog")[0];
var comtMore = document.getElementsByClassName("parts-more")[1];
var app = angular.module('myApp', []);
var shopName = "";
var MainPic = "";
app.controller('myCtrl', function($scope, $http) {
	isToken();
	var IsCoupons = 1;
	var IsActivity = 1;
	//获取店铺详细信息
	$http.get(serverUrls.getShop + "?token=" + Token + "&shopid=1&IsCoupons=1&IsActivity=1").success(function(response) {
		$scope.shop = response.data;
		shopName = encodeURI($scope.shop.Name);
		MainPic = $scope.shop.MainPic;
		$scope.CouponsList = $scope.shop.CouponsList;
		$scope.ActivityList = $scope.shop.ActivityList;
		if($scope.CouponsList.length == 0 && $scope.ActivityList.length) {
			shopDialogs.style.display = "block";
			shopDialogs.innerHTML = "暂无优惠券";
		}
		myToast.disAble();
	}).error(function(error) {
		myToast.noTime("获取店铺信息出错！");
	});
	$scope.sId = id;
	$scope.goComment = function(fUrl) {
			isToken();
			var Nurl = "comment.html?sId=" + fUrl;
			return Nurl;
		}
		//方法：取消店铺收藏
	$scope.cancelCollection = function() {
			isToken()
			$http.get(serverUrls.cancelCollect + "?token=" + Token + "&objectid=" + id + "&type=" + collectionType).success(function(response) {
				myToast.haveTime("取消成功！");
				collectionStus = false;
				scangIcon.className = "icon-scang";
			}).error(function(error) {
				myToast.noTime("取消收藏失败！");
			});
		}
		//方法：收藏店铺
	$scope.goCollection = function() {
			isToken();
			var textToSave = {
				"token": Token,
				"ObjectId": id,
				"Type": collectionType
			}
			$http.post(serverUrls.inCollection, textToSave).success(function(response) {
				myToast.haveTime("收藏成功！");
				collectionStus = true;
				scangIcon.className = "icon-scang scang-selected";
			}).error(function() {
				myToast.noTime("收藏失败！");
			});
		}
		//获取优惠券收藏状态，设置收藏状态
	$http.get(serverUrls.getShopiscollect + "?token=" + Token + "&shopid=" + id).success(function(response) {
		collectionStus = response;
		if(collectionStus) {
			scangIcon.className = "icon-scang scang-selected";
		} else {
			scangIcon.className = "icon-scang";
		};
	}).error(function(error) {
		myToast.noTime("获取收藏状态失败！");
	});

	$scope.goBack = function() {
			history.go(-1);
		}
		//方法：收藏/取消收藏
	$scope.isCollection = function() {
			if(collectionStus) {
				$scope.cancelCollection();
			} else {
				$scope.goCollection();
			}			
		}
		//评分转化为星星
	$scope.scoreToStar = function(m) {
			var w;
			switch(m) {
				case 1:
					w = "21px";
					break;
				case 2:
					w = "42px";
					break;
				case 3:
					w = "63px";
					break;
				case 4:
					w = "84px";
					break;
				case 5:
					w = "105px";
					break;
				default:
					w = 0;
					break;
			}
			return w;
		}
		//判断图片是否存在
	$scope.isPic = function(s) {
			var w;
			var ImgObj = new Image(); //判断图片是否存在  
			ImgObj.src = s;
			//没有图片，则返回-1  
			if(ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
				w = s;
			} else {
				w = "temp/icon_food.png";
			}
			return w;
		}
		//点击评价

	//获取店铺下面的评论
	$http.get(serverUrls.getReviewtraceitem + "?RemoteId=" + id + "&code=" + code + "&length=2&currentPage=1").success(function(response) {
		$scope.Commenting = response.data;
		$scope.length = $scope.Commenting.pagelist.length;
		if($scope.length == 0) {
			comtDialogs.style.display = "block";
			comtDialogs.innerHTML = "暂无评价";
			comtMore.style.display = "none";
		} else if($scope.length <= 2) {
			comtMore.style.display = "none";
		} else {
			comtDialogs.style.display = "none";
			comtMore.style.display = "block";
		}
	}).error(function(error) {
		myToast.noTime("获取评论失败！");
	});

});