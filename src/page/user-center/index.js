/**
 * @Author: 王贺
 * @Date:   2018-11-26T19:37:28+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-11-27T15:43:52+08:00
 */

 'use strict'
 require('./index.css')
 require('page/common/nav/index.js')
 require('page/common/header/index.js')
 var navSide         = require('page/common/nav-side/index.js')
 var _mm             = require('util/mm.js')
 var _user           = require('service/user-service.js')
 var templateIndex   = require('./index.string')

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
