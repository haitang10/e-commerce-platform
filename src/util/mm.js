/**
 * @Author: 王贺
 * @Date:   2018-11-11T14:57:07+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-11-11T17:54:32+08:00
 */
'use strict'
var _mm = {
    // 发送网络请求
    request: function(param) {
        var _this = this
        $.ajax({
            type    : param.method  || 'get',
            url     : param.url     || '',
            dataType: param.type    || 'json',
            data    : param.data    || '',
            success : function(res) { 
                // 请求成功
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
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },
    // 统一处理登录
    doLogin: function() {
        //强制转向登录页面，登录完之后重定向回原页面
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)

    }
}

module.exports = _mm
