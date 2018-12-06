/**
 * @Author: 王贺
 * @Date:   2018-11-07T19:26:49+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-12-06T21:46:40+08:00
 */
'use strict'
require('./index.css')
require('page/common/nav-simple/index.js')
var _mm = require('util/mm.js')
var _user   = require('service/user-service.js')


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
                console.log('user-res', res)
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
