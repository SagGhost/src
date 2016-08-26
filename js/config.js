var webApi = {
	localUrls: {
		"getCoupons": "http://store.cdchanghong.hfingo.com/api/apistore/getcoupons", //优惠券接口
		"getToken": "http://mall.cdchanghong.hfingo.com/api/apimall/gettoken", //登陆获取token接口
		"sendCode": "http://mall.cdchanghong.hfingo.com/api/apimall/sendcode", //获取验证码接口
		"addaCcount": "http://mall.cdchanghong.hfingo.com/api/apimall/addaccount", //注册接口
		"getShop": "http://store.cdchanghong.hfingo.com/api/apistore/getshop", //店铺接口
		"inreviewTraceitem": "http://commenting.cdchanghong.hfingo.com/api/comminting/inreviewtraceitem", //评论接口		
		"incouponsRecord": "http://store.cdchanghong.hfingo.com/api/apistore/incouponsrecord", //领取优惠券
		"getBackpsw": "http://mall.cdchanghong.hfingo.com/api/apimall/getbackpsw", //修改密码接口
		"getShopiscollect": "http://collection.cdchanghong.hfingo.com/api/collection/getshopiscollect", //获取店铺是否被收藏
		"inCollection": "http://collection.cdchanghong.hfingo.com/api/collection/incollection", //收藏店铺
		"cancelCollect": "http://collection.cdchanghong.hfingo.com/api/collection/cancelcollect", //取消收藏
		"getReviewtraceitem": "http://commenting.cdchanghong.hfingo.com/api/comminting/getreviewtraceitem", //获取店铺下的评论
		"pointsByevents": "http://points.cdchanghong.hfingo.com/api/apipoints/pointsbyevents", //通过events赠送积分
		"getSign": "http://points.cdchanghong.hfingo.com/api/apipoints/getsign", //获取签到信息
		"getMypoints": "http://points.cdchanghong.hfingo.com/api/apipoints/getmypoints", //获取积分
		"getActivitybyidlist1": "http://store.cdchanghong.hfingo.com/api/apistore/getactivitybyidlist1", //通过id获取活动基本信息
		"getActivity": "http://store.cdchanghong.hfingo.com/api/apistore/getactivity", //获取活动信息

	},
	serverUrls: {
		"getCoupons": "http://store.cdchanghong.hfingo.com/api/apistore/getcoupons", //优惠券接口
		"getToken": "http://mall.cdchanghong.hfingo.com/api/apimall/gettoken", //登陆获取token接口
		"sendCode": "http://mall.cdchanghong.hfingo.com/api/apimall/sendcode", //获取验证码接口
		"addaCcount": "http://mall.cdchanghong.hfingo.com/api/apimall/addaccount", //注册接口
		"getShop": "http://store.cdchanghong.hfingo.com/api/apistore/getshop", //店铺接口
		"inreviewTraceitem": "http://commenting.cdchanghong.hfingo.com/api/comminting/inreviewtraceitem", //评论接口		
		"incouponsRecord": "http://store.cdchanghong.hfingo.com/api/apistore/incouponsrecord", //领取优惠券
		"getBackpsw": "http://mall.cdchanghong.hfingo.com/api/apimall/getbackpsw", //修改密码接口
		"getShopiscollect": "http://collection.cdchanghong.hfingo.com/api/collection/getshopiscollect", //获取店铺是否被收藏
		"inCollection": "http://collection.cdchanghong.hfingo.com/api/collection/incollection", //收藏店铺
		"cancelCollect": "http://collection.cdchanghong.hfingo.com/api/collection/cancelcollect", //取消收藏
		"getReviewtraceitem": "http://commenting.cdchanghong.hfingo.com/api/comminting/getreviewtraceitem", //获取店铺下的评论
		"pointsByevents": "http://points.cdchanghong.hfingo.com/api/apipoints/pointsbyevents", //通过events赠送积分
		"getSign": "http://points.cdchanghong.hfingo.com/api/apipoints/getsign", //获取签到信息
		"getMypoints": "http://points.cdchanghong.hfingo.com/api/apipoints/getmypoints", //获取积分
		"getActivitybyidlist1": "http://store.cdchanghong.hfingo.com/api/apistore/getactivitybyidlist1", //通过id获取活动基本信息
		"getActivity": "http://store.cdchanghong.hfingo.com/api/apistore/getactivity", //获取活动信息
	}
};
var serverUrls = webApi.localUrls;