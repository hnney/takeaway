// 筛选器

define(['jquery'], function($){

	function isInArray(value, arr){
		for(var i = 0,len = arr.length; i < len ; i++){
			if(arr[i] === value){
				return i;
			}
		}
		return -1;
	}


	function Sizer(){
		this.data = [];
	}

	/**
	 * 添加
	 * @数据标签 label
	 * @数据的值 value
	 */
	Sizer.prototype.add = function(value){
		var self = this;

		if($.isFunction(value)) return;

		for(var i = 0,len = value.length;  i < len ; i ++){
			self.data.push(value[i]);
		}
	};



	/**
	 * 获取
	 * @要获取的标签 labels { isHot : 1, flavor : "中式"}
	 * @returns {Array}
	 */
	Sizer.prototype.get = function(labelObject){
		var self = this,
			data = self.data,
			index;

		if(!$.isPlainObject(labelObject)) return;

		var result = {};

		for(var key in labelObject){
			result[key] = [];
		}

		for(var i = 0,len = self.data.length; i < len; i ++){
			var target = self.data[i];

			for(var name in labelObject) {

				if (target[name] == labelObject[name]) {
					result[name].push(target);
				}
			}

		}

		return result;
	};

	return new Sizer()
});