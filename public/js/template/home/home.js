require.config({baseUrl:"js/lib/",shim:{underscore:{exports:"_"}},paths:{home:"../template/home",ads:"../widget/ads",footer:"../widget/footer",more_shops:"../widget/more_shops",my_collection:"../widget/my_collection",nav:"../widget/nav",shop_list:"../widget/shop_list",shop_sec:"../widget/shop_sec",shop_uncollected:"../widget/shop_uncollected",swipe:"../widget/swipe",userBar:"../widget/userBar",shop_info:"../widget/shop_info",tool:"../tools"}}),define(["userBar/userBar","nav/nav","ads/ads","my_collection/my_collection","footer/footer","more_shops/more_shops","shop_list/shop_list","swipe/swipe","nav/nav","shop_sec/shop_sec","shop_uncollected/shop_uncollected","shop_info/shop_info"],function(){console.log("init")});