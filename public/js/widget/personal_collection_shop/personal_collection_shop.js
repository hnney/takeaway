define([ "jquery" ], function($) {
    console.log("personal_colletion_goods loaded");
    var restaurant_column = $(".restaurant-column");
    // DBDBDDBDB
    $(".close_btn").on("click", function() {
        var restaurant_count = parseInt($(this).parents(".favor-restaurants").find(".restaurant_count").html()), self = this, shop_id = restaurant_column.data("shop_id");
        return $.post("/ajax_collection_shop", {
            shop_id: shop_id
        }).done(function() {
            $(self).parents(".favor-restaurants").find(".restaurant_count").html(restaurant_count - 1), 
            console.log($(self).parents(".favor-restaurants").find(".restaurant_count")), $(self).parents("tr").remove();
        }).fail(function() {
            alert("服务器错误!");
        }), !1;
    });
});