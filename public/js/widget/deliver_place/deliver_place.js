define([ "jquery", "order/port" ], function($, port) {
    //验证必填项
    function checkForm() {
        var $modifyAdress = $(".js-adress-modify"), $telInput = $modifyAdress.find(".tel"), $nameInput = $modifyAdress.find(".name"), $addrInput = $modifyAdress.find(".addr"), $bkTel = $modifyAdress.find(".bk");
        $modifyAdress.find("input").on("focus", function() {
            $(this).css("border-color", "#bbb");
        });
        var flag = !0, regTel = /^[\d]{11}$/, //验证手机电话
        regBkTel = /^[\d]{6,15}/, //验证固定电话
        regMust = /^[\S\s]+$/i;
        //必填
        //验证姓名
        //添加姓名
        //验证电话
        //验证地址
        //添加地址
        //添加固定电话
        return regMust.test($nameInput.val()) ? ($nameInput.css("border-color", "#bbb"), 
        $reallyForm.find(".user-name").val($nameInput.val()), authInfo.name = $nameInput.val()) : ($nameInput.css("border-color", "red"), 
        flag = !1), regTel.test($telInput.val()) ? ($telInput.css("border-color", "#bbb"), 
        authInfo.phone = $telInput.val(), $reallyForm.find(".user-tel").val($telInput.val())) : ($telInput.css("border-color", "red"), 
        flag = !1), regMust.test($addrInput.val()) ? ($addrInput.css("border-color", "#bbb"), 
        $reallyForm.find(".user-addr").val($addrInput.val()), authInfo.addr = $addrInput.val()) : ($addrInput.css("border-color", "red"), 
        flag = !1), regBkTel.test($bkTel.val()) && ($reallyForm.find(".user-bkTel").val($bkTel.val()), 
        authInfo.bkTel = $bkTel.val()), flag ? ($(".u-mask").hide(), $(".js-cmodal-wrapper").hide(), 
        !0) : !1;
    }
    //发送ajax
    function uRequestAuthAjax(callback) {
        authAjax(port.orderAuth, //地址
        {
            type: "sms",
            phone: authInfo.phone,
            csrf_token: authInfo.csrf_token
        }, callback);
    }
    //验证码ajax
    function authAjax(url, data, callback) {
        $.post(url, data, function(res) {
            if ("object" != typeof res) try {
                res = $.parseJSON(res);
            } catch (err) {
                return void alert("服务器数据错误！！！");
            }
            "true" == res.success ? //成功
            callback.sccuess(res) : //失败
            callback.failed(res);
        });
    }
    /*
	 * @include "修改地址"
	*/
    //打开编辑地址
    $(".js-open-edit").on("click", function() {
        $(".u-mask").show(), $(".js-cmodal-wrapper").show();
    }), $(".js-exit-edit").on("click", function() {
        $(".u-mask").hide(), $(".js-cmodal-wrapper").hide();
    }), //选择时间
    //切换支付方式
    $(".cpayment-choice").on("click", function() {
        var $this = $(this);
        $this.hasClass("ui_disabled") || $this.hasClass("ui_selected") || ($(".cpayment-choice").removeClass("ui_selected"), 
        $this.addClass("ui_selected"), $reallyForm.find(".order-way").val($this.attr("data-pay-way")));
    });
    var $authWrapper = $(".js-sms-auth-wrapper"), $uMask = $(".u-mask"), $reallyForm = $(".js-save-bottom");
    //短信验证关闭
    $(".js-exit-auth").on("click", function() {
        $authWrapper.hide(), $uMask.hide();
    });
    var authInfo = {
        csrf_token: $reallyForm.find('input[name="_token"]').val()
    };
    //验证发送附带信息
    //保存
    $(".js-save-edit").on("click", function(ev) {
        checkForm() ? ($(".js-show-addr-info").find(".current_addr").text(authInfo.addr).end().find(".current_name").css({
            "font-weight": "bold",
            "margin-right": "4px"
        }).text(authInfo.name).end().find(".current_tel").text(authInfo.phone).css({
            "font-weight": "bold",
            "margin-right": "4px"
        }).end().find(".current_bkTel").text(authInfo.bkTel).css({
            "font-weight": "bold",
            "margin-right": "4px"
        }), $(".u-mask").hide$(".js-cmodal-wrapper").hide()) : ev.preventDefault();
    }), //短信验证框打开
    //,发送验证码请求到服务器
    $reallyForm.on("submit", function(ev) {
        return ev.preventDefault(), checkForm() ? void uRequestAuthAjax({
            success: function(res) {
                $authWrapper.show(), $uMask.show(), $reallyForm.find(".user-auth").val(res.auth);
            },
            failed: function(res) {
                res.errMsg ? (//失败且有错误信息
                $authWrapper.hide(), $uMask.hide(), alert(res.Msg)) : //默认错误信息
                alert("验证码发送失败, 请重试！！");
            }
        }) : ($(".js-cmodal-wrapper").show(), $(".u-mask").show(), !1);
    }), //重复发送ajax
    $(".js-repeat-send-auth").on("click", function() {
        var $this = $(this);
        uRequestAuthAjax({
            success: function(res) {
                $reallyForm.find(".user-auth").val(res.auth), //计时禁止短时间内请求验证码
                $this.attr("disabled", "disabled");
                var count = 60, disabledTimer = setInterval(function() {
                    $this.text(count-- + "秒后可重新发送"), 0 > count && (clearInterval(disabledTimer), $this.text("重新发送"), 
                    $this.removeAttribute("disabled"));
                }, 1e3);
            },
            failed: function(res) {
                //失败且有错误信息
                alert(res.errMsg ? res.Msg : "验证码发送失败, 请重试！！");
            }
        });
    }), //发送用户所填短信验证码
    $(".js-send-confirm-auth").on("click", function() {
        authAjax(port.confirmAuth, //地址
        {
            auth: $(".js-confirm-auth").val(),
            csrf_token: authInfo.csrf_token
        }, {
            success: function(res) {
                alert(//验证码正确
                res.successMsg ? res.successMsg : "验证码正确，稍后会为您送来!!!"), $authWrapper.hide(), $uMask.hide(), 
                $reallyForm[0].submit();
            },
            failed: function(res) {
                //验证码错误
                alert(res.errMsg ? errMsg : "验证码错误!!!!,请重填!!");
            }
        });
    });
});