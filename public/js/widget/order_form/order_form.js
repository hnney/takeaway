define(["jquery"],function(a){console.log("order form loaded"),a.fn.serializeObject=function(){var b={},c=this.serializeArray();return a.each(c,function(){void 0!=b[this.name]?(b[this.name].push||(b[this.name]=[b[this.name]]),b[this.name].push(this.value||"")):b[this.name]=this.value||""}),b},a(".order_radio").on("change",function(){a(this).parents(".order_content").children(".order_comment").css("display","block")}),a(".order_comment_cancel").on("click",function(){a(this).parent().css("display","none"),a(this).parents(".order_content").find(".order_content_form")[0].reset()}),a(".order_comment_save").on("click",function(){var b=document.createElement("p"),c=a(this).parent().parent(),d=c.find(".shop_id").val(),e=c.find(".deal_id").val(),f=c.find(".text").val(),g=c.find(".order_content_form").serializeObject()["service-rate"];switch(console.log(g),g){case"1":b.innerHTML="已点评，不满意";break;case"2":b.innerHTML="已点评，一般般";break;default:b.innerHTML="已点评，满意"}a.ajax({url:"####qwertyui###",type:"POST",data:{shop_id:d,deal_id:e,deal_satisfied:g,deal_satisfied_comment:f},success:function(a){"true"==a.success?(c.css("display","none"),c.parent().append(b)):alert("评论失败，请重新评论!")}})}),a(".rating_comment .comment div").on("click",function(){var b=a(this).parents(".rating_comment"),c=b.find(".shop_id").val(),d=b.find(".deal_id").val(),e=b.find(".goods_id").val(),f=this.innerText[0],g=a(this);return a.ajax({url:"####qwertyui###",type:"POST",data:{shop_id:c,deal_id:d,goods_id:e,goods_level:f},success:function(a){"true"==a.success?g.parents(".rating_comment").removeClass("rating_comment"):alert("评论失败，请重新评论!")}}),!1}).on("mouseover",star=function(){a(this).parents(".comment").find("div").removeClass("mouseover"),a(this).addClass("mouseover");var b=a(this).parents(".rating_comment").find(".rating_text");switch(this.innerText[0]){case"1":b.html("差评");break;case"2":b.html("差点意思");break;case"3":b.html("一般般");break;case"4":b.html("有点滋味");break;default:b.html("我的最爱")}return!1})});