webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(124);


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

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-11-20T11:25:28+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-20T21:09:32+08:00
	 */
	'use strict'
	__webpack_require__(114)


/***/ }),

/***/ 114:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-11-07T19:26:49+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-25T17:39:24+08:00
	 */
	'use strict'
	__webpack_require__(125)
	__webpack_require__(113)
	var _mm = __webpack_require__(98)
	var _user   = __webpack_require__(102)


	// page逻辑部分
	var page = {
	    init: function() {
	        this.bindEvent()
	    },
	    // 绑定事件,点击登录或者回车提交表单
	    bindEvent: function() {
	        var _this = this
	        $('#submit').click(function(){
	            _this.submit()
	        })
	        $('.user-content').keyup(function(event){
	            // keyCode == 13 表示回车键
	            if(event.keyCode === 13){
	                _this.submit()
	            }
	        })
	    },
	    // 提交表单
	    submit: function(){
	        console.log('this',this)
	        // 获取输入框内容
	        var formData = {
	            username: $.trim($('#username').val()),
	            password: $.trim($('#password').val())
	        }
	        console.log('formDate', formData)
	        // 进行表单验证，是否为空
	        var validateResult = this.formValidate(formData)
	        console.log('validateResult', validateResult)
	        // 验证是否为空 成功和失败后的处理
	        if(validateResult.status){
	            // 不为空，调用login 接口发送数据到服务器验证用户名是否存在，和密码是否匹配等
	            _user.login(formData, function(res){
	                // 跳回原来地址或者首页
	                window.location.href = _mm.getUrlParam('redirect') || './index.html'
	            }, function(errMsg){
	                formError.show(errMsg)
	            })
	        }
	        else{
	            // 验证为空错误提示
	            formError.show(validateResult.msg)
	        }
	    },
	    // 表单字段验证, 只进行非空验证,if() 里面的一定要是true ，或是true的表达式
	    formValidate: function(formData) {
	        var result = {
	            status: false,
	            msg: ''
	        }
	        if(!_mm.validate('require', formData.username)) {
	            console.log('user-empty', _mm.validate('require', formData.username))
	            result.msg = '用户名不能为空'
	            return result
	        }
	        if(!_mm.validate('require', formData.password)) {
	            result.msg = '密码不能为空'
	            return result
	        }
	        // 通过验证，返回正确提示
	        result = {
	            status: true,
	            msg: '验证通过'
	        }
	        console.log('result', result)
	        return result
	    },
	}
	// 表单里的错误提示
	var formError = {
	    show : function(errMsg){
	        $('.error-item').show().find('.err-msg').text(errMsg)
	    },
	    hide : function(){
	        $('.error-item').hide().find('.err-msg').text('')
	    }
	}

	$(function() {
	    page.init()
	})


/***/ }),

/***/ 125:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});