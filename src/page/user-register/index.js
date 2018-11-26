/**
 * @Author: 王贺
 * @Date:   2018-11-25T20:17:42+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-11-26T14:59:38+08:00
 */
 // 注册页面逻辑
 'use strict'
 require('./index.css')
 require('page/common/nav-simple/index.js')
 var _mm = require('util/mm.js')
 var _user   = require('service/user-service.js')

 // 1.表单里的错误提示
 var formError = {
     show : function(errMsg){
         $('.error-item').show().find('.err-msg').text(errMsg)
     },
     hide : function(){
         $('.error-item').hide().find('.err-msg').text('')
     }
 }

 // 2.page逻辑部分
 var page = {
     init: function() {
         this.bindEvent()
     },
     // 1.绑定事件,点击注册或者回车提交表单
     bindEvent: function() {
         var _this = this
         // 1.验证username是否存在？
         $('#username').blur(function(){
                var username = $.trim($(this).val())
                // 如果用户名为空，我们不做验证
                if(!username){
                    return
                }
                // 异步验证用户名是否存在
                _user.checkUsername(username, function(res){
                    formError.hide()
                }, function(errMsg){
                    formError.show(errMsg)
                })
         })
         // 2.验证密码长度
         $('#password').blur(function(){
                var password = $.trim($(this).val())
                if(password.length < 8){
                    formError.show('密码长度不能少于6位')
                }
         })
         // 3. 验证两次密码输入是否一致？
         $('#password-confirm').blur(function(){
                var password = $.trim($('#password').val())
                var passwordConfirm = $.trim($('#password-confirm').val())
                console.log('密码是否一致',password, passwordConfirm)
                if(password !== passwordConfirm){
                    formError.show('两次输入的密码不一致')

                }
                else{
                    formError.hide()
                }

         })
         // 4. 验证电话和邮箱格式是否正确
         $('#phone').blur(function(){
                var phoneCon = $.trim($('#phone').val())
                var phoneRes = _mm.validate('phone', phoneCon)
                if(!phoneRes){
                    formError.show('请输入正确的手机号码格式')
                }
                else{
                    formError.hide()
                }
         })
         $('#email').blur(function(){
                var phoneCon = $.trim($('#email').val())
                var phoneRes = _mm.validate('email', phoneCon)
                if(!phoneRes){
                    formError.show('请输入正确的邮箱格式')
                }
                else{
                    formError.hide()
                }
         })

         // 5.点击提交按钮提交表单，输入回车也提交表单
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
     // 2.提交表单
     submit: function(){
         console.log('this',this)
         // 获取输入框内容
         var formData = {
             username        : $.trim($('#username').val()),
             password        : $.trim($('#password').val()),
             passwordConfirm : $.trim($('#password-confirm').val()),
             phone           : $.trim($('#phone').val()),
             email           : $.trim($('#email').val()),
             question        : $.trim($('#question').val()),
             answer          : $.trim($('#answer').val())

         }
         console.log('formDate', formData)
         // 进行表单验证，是否为空
         var validateResult = this.formValidate(formData)
         console.log('validateResult', validateResult)
         // 验证是否为空 成功和失败后的处理
         if(validateResult.status){
             // 不为空，调用register
             _user.register(formData, function(res){
                 // 跳回原来地址或者首页
                 window.location.href = './result.html?type=register'
             }, function(errMsg){
                 formError.show(errMsg)
             })
         }
         else{
             // 验证为空错误提示
             formError.show(validateResult.msg)
         }
     },

     // 3.表单字段验证, 进行用户名和密码非空验证和手机，email等格式验证,if() 里面的一定要是true ，或是true的表达式
     formValidate: function(formData) {
         var result = {
             status: false,
             msg: ''
         }
         if(!_mm.validate('require', formData.username)) {
             result.msg = '用户名不能为空'
             return result
         }
         if(!_mm.validate('require', formData.password)) {
             result.msg = '密码不能为空'
             return result
         }
         // 验证密码长度
        if(formData.password.length < 6){
            result.msg = '密码长度不能少于6位'
            return result
        }
        // 验证两次输入的密码是否一致
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致'
            return result;
        }
        // 验证手机号
        if(!_mm.validate( 'phone', formData.phone)){
            result.msg = '手机号格式不正确'
            return result;
        }
        // 验证邮箱格式
        if(!_mm.validate( 'email', formData.email)){
            result.msg = '邮箱格式不正确'
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validate( 'require', formData.question)){
            result.msg = '密码提示问题不能为空'
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validate('require', formData.answer)){
            result.msg = '密码提示问题答案不能为空'
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


 $(function() {
     page.init()
 })
