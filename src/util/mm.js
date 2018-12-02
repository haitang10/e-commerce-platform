/**
 * @Author: 王贺
 * @Date:   2018-11-11T14:57:07+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-12-02T22:07:55+08:00
 */
'use strict'
var Hogan = require('hogan.js')
var conf = {
    serverHost: ''
}
var _mm = {
    // 1.发送网络请求
    request: function(param) {
        var _this = this
        $.ajax({
            type    : param.method  || 'get',
            url     : param.url     || '',
            dataType: param.type    || 'json',
            data    : param.data    || '',
            success : function(res) {
                console.log('// 请求成功res', res)

                if(res.status === 0){
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                // 没有登录状态，需要强制登录
                else if(res.status === 10){
                    _this.doLogin()
                }
                // 请求数据错误
                else if(res.status === 1){
                    typeof param.error === 'function' && param.error(res.msg)
                }

            },
            error   : function(err) {
                console.log('// 请求失败err', err)
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },

    // 2.统一处理登录    回到首页
    doLogin : function() {
        //强制转向登录页面，登录完之后重定向回原页面
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)

    },
    goHome  : function() {
        window.loaction.href = './index.html'
    },

    // 3.获取服务器地址,现在是www.happymmall以后可能改成api.mmall，所以用conf.serverHost + path
    getServerUrl: function(path) {
        return conf.serverHost + path
    },
    // 4.获取URL参数
    getUrlParam: function(name) {
        var reg = new RegExp('(^|&)' + name + '=(.*?)(&|$)')
        // (^|&)表示以&开头或者以name开头，([^&]*)表示
        // (&|$) 表示以&结尾或者直接结尾
        // .*? 非贪婪模式

        var result = window.location.search.substr(1).match(reg)
        // console.log('reg', typeof(reg), reg)
        // console.log('result', result)
        return result ? decodeURIComponent(result[2]) : null

    },

    // 5.渲染HTML模板,使用hogan,先编译，再渲染,data 是一个对象
    renderHtml: function(htmlTemplate, data) {
        return Hogan.compile(htmlTemplate).render(data)
    },

    // 6.成功提示
    successTips: function(msg) {
        alert(msg || '恭喜您操作成功！！！')
    },
    // 7.失败提示
    errorTips: function(msg) {
        alert(msg || '好像出了点小问题~~~')
    },

    // 8.字段表单验证，支持非空，手机邮箱的判断
    validate: function(type, value) {
        var value = $.trim(value) // 用trim函数去掉输入内容前后的空格以及把value转成字符串
        //非空验证
        if(type === 'require'){
            return !!value //如果value为空字符串，那么!value true， !!value false
            console.log('value', !!value)
        }
        //电话验证
        if(type === 'phone'){
            return /^1\d{10}$/.test(value)
        }
        //邮箱验证
        if(type === 'email'){
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
        }
    },

}

module.exports = _mm
