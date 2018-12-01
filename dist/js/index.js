webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(92);


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-10-22T16:20:16+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-30T17:49:28+08:00
	 */
	'use strict'
	__webpack_require__(93)
	__webpack_require__(95)
	__webpack_require__(103)
	__webpack_require__(106)

	var templateBanner = __webpack_require__(110)
	var _mm = __webpack_require__(98)

	// // 1.测试ajax跨域
	// // _mm.request({
	// //     url: '/product/list.do?keyword=1',
	// //     success: function(res){
	// //       console.log(res)
	// //     },
	// //     error: function(err){
	// //         console.log(err)
	// //     }
	// // })
	// // 2.test getUrlParam
	// console.log('test getUrlParam', _mm.getUrlParam('test'))
	// // 3.test htmlTemplate
	// var htmlTemplate = '<div>{{data}}</div>'
	// var data = {data: 123}
	// console.log('test htmlTemplate', _mm.renderHtml(htmlTemplate, data))

	// 11.20 更新
	// 11.30 update
	$(function() {
	    // 渲染banner的html
	    var bannerHtml  = _mm.renderHtml(templateBanner)
	    $('.banner-con').html(bannerHtml)
	    // 初始化banner
	    var $slider     = $('.banner').unslider({
	        dots: true
	    })
	    //前一张后一张操作的事件3绑定
	    $('.banner-con .banner-arrow').click(function(){
	        var button = $(this).hasClass('prev') ? 'prev' : 'next'
	        $slider.data('unslider')[button]()
	    })
	    // // 前一张和后一张操作的事件绑定
	    // $('.banner-con .banner-arrow').click(function(){
	    //     var forward = $(this).hasClass('prev') ? 'prev' : 'next'
	    //     $slider.data('unslider')[forward]()
	    // })
	})


/***/ }),

/***/ 93:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-11-20T21:08:46+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-27T12:55:24+08:00
	 */

	 'use strict'
	 __webpack_require__(96)
	 var _mm     = __webpack_require__(98)
	 var _user   = __webpack_require__(102)
	 // var _cart   = require('service/cart-service.js')
	 // 1.导航
	 var nav = {
	     init : function(){
	         this.bindEvent()
	         this.loadUserInfo()
	         // this.loadCartCount()
	         return this
	     },
	     // 2.绑定事件
	     bindEvent : function(){
	         // 1.登录点击事件
	         $('.js-login').click(function(){
	             _mm.doLogin()
	         });
	         // 2.注册点击事件
	         $('.js-register').click(function(){
	             window.location.href = './user-register.html'
	         });
	         // 3.退出点击事件
	         $('.js-logout').click(function(){
	             _user.logout(function(res){
	                 window.location.reload()
	             }, function(errMsg){
	                 _mm.errorTips(errMsg)
	             })
	         })
	     },
	     // 3.加载用户信息
	     loadUserInfo : function(){
	         _user.checkLogin(function(res){
	             $('.user.not-login').hide().siblings('.user.login').show()
	                 .find('.username').text(res.username)
	         }, function(errMsg){
	             // do nothing
	         })
	     },
	     // 4.加载购物车数量
	     // loadCartCount : function(){
	     //     _cart.getCartCount(function(res){
	     //         $('.nav .cart-count').text(res || 0)
	     //     }, function(errMsg){
	     //         $('.nav .cart-count').text(0)
	     //     })
	     // }
	 }

	 module.exports = nav.init()


/***/ }),

/***/ 96:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-11-25T16:04:33+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-26T19:59:04+08:00
	 */
	 'use strict';

	 var _mm = __webpack_require__(98);

	 var _user = {
	     // 1.用户登录
	     login : function(userInfo, resolve, reject){
	         _mm.request({
	             url     : _mm.getServerUrl('/user/login.do'),
	             data    : userInfo,
	             method  : 'POST',
	             success : resolve,
	             error   : reject
	         })
	     },
	     // 2.检查用户名
	     checkUsername : function(username, resolve, reject){
	         _mm.request({
	             url     : _mm.getServerUrl('/user/check_valid.do'),
	             data    : {
	                 type    : 'username',
	                 str     : username
	             },
	             method  : 'POST',
	             success : resolve,
	             error   : reject
	         })
	     },
	     // 3.用户注册
	     register : function(userInfo, resolve, reject){
	         _mm.request({
	             url     : _mm.getServerUrl('/user/register.do'),
	             data    : userInfo,
	             method  : 'POST',
	             success : resolve,
	             error   : reject
	         })
	     },
	     // 4.检查登录状态
	     checkLogin : function(resolve, reject){
	         _mm.request({
	             url     : _mm.getServerUrl('/user/get_user_info.do'),
	             method  : 'POST',
	             success : resolve,
	             error   : reject
	         })
	     },
	     // 5.获取用户密码提示问题
	     getQuestion : function(username, resolve, reject){
	         _mm.request({
	             url     : _mm.getServerUrl('/user/forget_get_question.do'),
	             data    : {
	                 username : username
	             },
	             method  : 'POST',
	             success : resolve,
	             error   : reject
	         })
	     },
	     // 6.检查密码提示问题答案
	     checkAnswer : function(userInfo, resolve, reject){
	         _mm.request({
	             url     : _mm.getServerUrl('/user/forget_check_answer.do'),
	             data    : userInfo,
	             method  : 'POST',
	             success : resolve,
	             error   : reject
	         })
	     },
	     // 7.重置密码
	     resetPassword : function(userInfo, resolve, reject){
	         _mm.request({
	             url     : _mm.getServerUrl('/user/forget_reset_password.do'),
	             data    : userInfo,
	             method  : 'POST',
	             success : resolve,
	             error   : reject
	         })
	     },
	     // 8.获取用户信息
	     getUserInfo : function(resolve, reject){
	         _mm.request({
	             url     : _mm.getServerUrl('/user/get_information.do'),
	             method  : 'POST',
	             success : resolve,
	             error   : reject
	         })
	     },
	     // 9.更新个人信息
	     updateUserInfo : function(userInfo, resolve, reject){
	         _mm.request({
	             url     : _mm.getServerUrl('/user/update_information.do'),
	             data    : userInfo,
	             method  : 'POST',
	             success : resolve,
	             error   : reject
	         })
	     },
	     // 10.登录状态下更新密码
	     updatePassword : function(userInfo, resolve, reject){
	         _mm.request({
	             url     : _mm.getServerUrl('/user/reset_password.do'),
	             data    : userInfo,
	             method  : 'POST',
	             success : resolve,
	             error   : reject
	         })
	     },
	     // 11.登出
	     logout : function(resolve, reject){
	         _mm.request({
	             url     : _mm.getServerUrl('/user/logout.do'),
	             method  : 'POST',
	             success : resolve,
	             error   : reject
	         })
	     }
	 }
	 module.exports = _user


/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-11-20T21:44:11+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-22T23:07:57+08:00
	 */
	'use strict'
	__webpack_require__(104)
	var _mm     = __webpack_require__(98)

	// 通用页面头部,三个功能，回填输入框，绑定点击事件，提交请求
	var header = {
	    init : function(){
	        this.onLoad()
	        this.bindEvent()
	    },
	    onLoad : function(){
	        var keyword = _mm.getUrlParam('keyword')
	        // keyword存在，则回填输入框
	        if(keyword){
	            $('#search-input').val(keyword)
	        }
	    },
	    bindEvent : function(){
	        // 事件响应里面的this 是元素,所以要在click事件响应前把this对象赋值出去
	        var _this = this
	        // 点击搜索按钮以后，做搜索提交
	        $('#search-btn').click(function(){
	            // console.log('event',event.target)
	            // console.log('this',this)
	            _this.searchSubmit()
	        });
	        // 输入车后，做搜索提交
	        $('#search-input').keyup(function(event){
	            // 13是回车键的keyCode
	            if(event.keyCode === 13){
	                _this.searchSubmit()
	            }
	        })
	    },
	    // 搜索的提交
	    searchSubmit : function(){
	        var keyword = $.trim($('#search-input').val())
	        // 如果提交的时候有keyword,正常跳转到list页
	        if(keyword){
	            window.location.href = './list.html?keyword=' + keyword
	        }
	        // 如果keyword为空，直接返回首页
	        else{
	            _mm.goHome()
	        }
	    }
	}
	header.init()


/***/ }),

/***/ 104:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-11-30T17:04:21+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-30T17:07:49+08:00
	 */
	 'use strict';

	 __webpack_require__(107);
	 __webpack_require__(109);


/***/ }),

/***/ 107:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 109:
/***/ (function(module, exports) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-11-30T17:03:57+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-30T18:10:43+08:00
	 */
	window.console && console.warn("This version of Unslider is due to be deprecated by December 1. Please visit unslider.com for details on how to upgrade."),
	    function(t, s) {
	        if (!t) return s
	        var i = function() {
	            this.el = s, this.items = s, this.sizes = [], this.max = [0, 0], this.current = 0, this.interval = s, this.opts = {
	                speed: 500,
	                delay: 3e3,
	                complete: s,
	                keys: !s,
	                dots: s,
	                fluid: s
	            }
	            var i = this
	            this.init = function(s, i) {
	                return this.el = s, this.ul = s.children("ul"), this.max = [s.outerWidth(), s.outerHeight()], this.items = this.ul.children("li").each(this.calculate), this.opts = t.extend(this.opts, i), this.setup(), this
	            }, this.calculate = function(s) {
	                var e = t(this),
	                    n = e.outerWidth(),
	                    h = e.outerHeight();
	                i.sizes[s] = [n, h], n > i.max[0] && (i.max[0] = n), h > i.max[1] && (i.max[1] = h)
	            }, this.setup = function() {
	                if (this.el.css({
	                        overflow: "hidden",
	                        width: i.max[0],
	                        height: this.items.first().outerHeight()
	                    }), this.ul.css({
	                        width: 100 * this.items.length + "%",
	                        position: "relative"
	                    }), this.items.css("width", 100 / this.items.length + "%"), this.opts.delay !== s && (this.start(), this.el.hover(this.stop, this.start)), this.opts.keys && t(document).keydown(this.keys), this.opts.dots && this.dots(), this.opts.fluid) {
	                    var e = function() {
	                        i.el.css("width", Math.min(Math.round(i.el.outerWidth() / i.el.parent().outerWidth() * 100), 100) + "%")
	                    };
	                    e(), t(window).resize(e)
	                }
	                this.opts.arrows && this.el.parent().append('<p class="arrows"><span class="prev">芒鈥犅�</span><span class="next">芒鈥犫€�</span></p>').find(".arrows span").click(function() {
	                    t.isFunction(i[this.className]) && i[this.className]()
	                }), t.event.swipe && this.el.on("swipeleft", i.prev).on("swiperight", i.next)
	            }, this.move = function(s, e) {
	                this.items.eq(s).length || (s = 0), 0 > s && (s = this.items.length - 1);
	                var n = this.items.eq(s),
	                    h = {
	                        height: n.outerHeight()
	                    },
	                    o = e ? 5 : this.opts.speed;
	                this.ul.is(":animated") || (i.el.find(".dot:eq(" + s + ")").addClass("active").siblings().removeClass("active"), this.el.animate(h, o) && this.ul.animate(t.extend({
	                    left: "-" + s + "00%"
	                }, h), o, function() {
	                    i.current = s, t.isFunction(i.opts.complete) && !e && i.opts.complete(i.el)
	                }))
	            }, this.start = function() {
	                i.interval = setInterval(function() {
	                    i.move(i.current + 1)
	                }, i.opts.delay)
	            }, this.stop = function() {
	                return i.interval = clearInterval(i.interval), i
	            }, this.keys = function(s) {
	                var e = s.which,
	                    n = {
	                        37: i.prev,
	                        39: i.next,
	                        27: i.stop
	                    };
	                t.isFunction(n[e]) && n[e]()
	            }, this.next = function() {
	                return i.stop().move(i.current + 1)
	            }, this.prev = function() {
	                return i.stop().move(i.current - 1)
	            }, this.dots = function() {
	                var s = '<ol class="dots">';
	                t.each(this.items, function(t) {
	                    s += '<li class="dot' + (1 > t ? " active" : "") + '">' + (t + 1) + "</li>"
	                }), s += "</ol>", this.el.addClass("has-dots").append(s).find(".dot").click(function() {
	                    i.move(t(this).index())
	                })
	            }
	        }
	        t.fn.unslider = function(s) {
	            var e = this.length;
	            return this.each(function(n) {
	                var h = t(this)
	                var o = (new i).init(h, s)
	                h.data("unslider" + (e > 1 ? "-" + (n + 1) : ""), o)
	            })
	        }
	    }(window.jQuery, !1);


/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"banner\">\n    <ul>\n        <li>\n            <a href=\"./list.html?categoryId=100021\" target=\"_blank\">\n                <img class=\"banner-img\" src=\"" + __webpack_require__(111) + "\" />\n            </a>\n        </li>\n        <li>\n            <a href=\"./list.html?categoryId=100030\" target=\"_blank\">\n                <img class=\"banner-img\" src=\"" + __webpack_require__(112) + "\" />\n            </a>\n        </li>\n        <li>\n            <a href=\"./list.html?categoryId=100016\" target=\"_blank\">\n                <img class=\"banner-img\" src=\"" + __webpack_require__(113) + "\" />\n            </a>\n        </li>\n        <li>\n            <a href=\"./list.html?categoryId=100001\" target=\"_blank\">\n                <img class=\"banner-img\" src=\"" + __webpack_require__(114) + "\" />\n            </a>\n        </li>\n        <li>\n            <a href=\"./list.html?categoryId=100021\" target=\"_blank\">\n                <img class=\"banner-img\" src=\"" + __webpack_require__(115) + "\" />\n            </a>\n        </li>\n    </ul>\n    <div class=\"banner-arrow prev\">\n        <i class=\"fa fa-angle-left\"></i>\n    </div>\n    <div class=\"banner-arrow next\">\n        <i class=\"fa fa-angle-right\"></i>\n    </div>\n</div>\n";

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner1.jpg";

/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner2.jpg";

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner3.jpg";

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner4.jpg";

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner5.jpg";

/***/ })

});