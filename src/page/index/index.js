/**
 * @Author: 王贺
 * @Date:   2018-10-22T16:20:16+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-11-30T17:49:28+08:00
 */
'use strict'
require('./index.css')
require('page/common/nav/index.js')
require('page/common/header/index.js')
require('util/slider/index.js')

var templateBanner = require('./banner.string')
var _mm = require('util/mm.js')

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
