define(['jquery', "tools/Sizer"], function($, Sizer){
	var drop_button = $(".drop_button"),
		drop_list = $(".drop_list"),
		activitiesBtn = $('.activities-btn'),
		shops_func = $('.shops_func'),
		choice_click = $(".choice_click");

	drop_button.on('click', function(e){
		drop_list.toggle();
	});

	(function(){
		var target = $(".shop_container .more_shops-row-book");

		var result = [];

		target.each(function(index, value){

			var target = $(this),
				place_id = target.data("place_id"),
				shop_id = target.data("shop_id"),
				flavor  = target.data("flavor"),
				issupportpay = target.data('issupportpay'),
				isonline = target.data('isonline'),
				ishot   = target.data('ishot'),
				support_activity = target.data('support_activity').split(","),
				storage = {};

			storage['place_id'] = place_id;
			storage['shop_id']  = shop_id;
			storage['flavor']   = flavor;
			storage['issupportpay'] = issupportpay;
			storage['isonline'] = isonline;
			storage['ishot']  = ishot;
			storage['support_activity'] = support_activity;
			storage['shop_id'] = shop_id;


			result.push(storage);

		});

		Sizer.add(result);

	})();

	choice_click.on('click', function(ev){

		var target = ev.currentTarget,
			input  = $(target).find("input"),
			b      = $(target).find("b");

		var checked = input[0].checked;
		var value   = b.html();





	});



	drop_list.on('click', "li", function(ev){
		var target = ev.currentTarget,
			type = target.innerHTML;

		drop_list.toggle();
	});


});