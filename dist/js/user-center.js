webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(122);


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

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-11-26T19:37:28+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-27T15:43:52+08:00
	 */

	 'use strict'
	 __webpack_require__(123)
	 __webpack_require__(95)
	 __webpack_require__(103)
	 var navSide         = __webpack_require__(125)
	 var _mm             = __webpack_require__(98)
	 var _user           = __webpack_require__(102)
	 var templateIndex   = __webpack_require__(129)

	 // page 逻辑部分
	 var page = {
	     init: function(){
	         this.loadUserInfo()
	     },
	     // 加载用户信息
	     loadUserInfo : function(){
	         // 初始化左侧菜单
	         navSide.init({ name: 'user-center' })
	         var userHtml = ''
	         _user.getUserInfo(function(res){
	             // 渲染nav-side 部分
	             userHtml = _mm.renderHtml(templateIndex, res)
	             $('.panel-body').html(userHtml)
	         }, function(errMsg){
	             _mm.errorTips(errMsg)
	         })
	     }
	 }
	 $(function(){
	     page.init()
	 })


/***/ }),

/***/ 123:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-11-22T22:20:56+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-22T23:00:37+08:00
	 */
	'use strict'
	__webpack_require__(126)
	var _mm = __webpack_require__(98)
	var templateIndex   = __webpack_require__(128);

	// 侧边导航
	var navSide = {
	    option: {
	        name: '',
	        navList: [
	            {name: 'user-center', desc:'个人中心', href:'./user-center.html'},
	            {name : 'order-list', desc : '我的订单', href: './order-list.html'},
	            {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
	            {name : 'about', desc : '关于MMall', href: './about.html'}
	        ]
	    },
	    init: function(option) {
	        // 合并选项
	        $.extend(this.option, option)
	        this.renderNav()
	    },
	    // 渲染导航菜单
	    renderNav: function() {
	        // 计算active数据
	        var iLength = this.option.navList.length
	        for(var i = 0; i < iLength; i++){
	            if(this.option.navList[i].name === this.option.name){
	                this.option.navList[i].isActive = true
	            }
	        }

	        // 渲染list数据
	        var navHtml = _mm.renderHtml(templateIndex, {navList : this.option.navList})

	        // 把HTML放入容器
	        $('.nav-side').html(navHtml)
	    }
	}
	module.exports = navSide


/***/ }),

/***/ 126:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

	module.exports = "{{#navList}}\r\n{{#isActive}}\r\n<li class=\"nav-item active\">\r\n{{/isActive}}\r\n{{^isActive}}\r\n<li class=\"nav-item\">\r\n{{/isActive}}\r\n    <a class=\"link\" href=\"{{href}}\">{{desc}}</a>\r\n</li>\r\n{{/navList}} \r\n";

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

	module.exports = "<div class=\"user-info\">\r\n    <div class=\"form-line\">\r\n        <span class=\"label\">用户名：</span>\r\n        <span class=\"text\">{{username}}</span>\r\n    </div>\r\n    <div class=\"form-line\">\r\n        <span class=\"label\">电 话：</span>\r\n        <span class=\"text\">{{phone}}</span>\r\n    </div>\r\n    <div class=\"form-line\">\r\n        <span class=\"label\">邮 箱：</span>\r\n        <span class=\"text\">{{email}}</span>\r\n    </div>\r\n    <div class=\"form-line\">\r\n        <span class=\"label\">问 题：</span>\r\n        <span class=\"text\">{{question}}</span>\r\n    </div>\r\n    <div class=\"form-line\">\r\n        <span class=\"label\">答 案：</span>\r\n        <span class=\"text\">{{answer}}</span>\r\n    </div>\r\n    <a class=\"btn btn-submit\" href=\"./user-center-update.html\">编辑</a>\r\n</div>\r\n";

/***/ })

});