/**
 * @Author: 王贺
 * @Date:   2018-11-20T21:44:11+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-11-22T23:07:57+08:00
 */
'use strict'
require('./index.css')
var _mm     = require('util/mm.js')

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
