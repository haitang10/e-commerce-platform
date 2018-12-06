/**
 * @Author: 王贺
 * @Date:   2018-11-20T21:08:46+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-12-06T21:51:33+08:00
 */

 'use strict'
 require('./index.css')
 var _mm     = require('util/mm.js')
 var _user   = require('service/user-service.js')
 var _cart   = require('service/cart-service.js')
 // 1.导航
 var nav = {
     init : function(){
         this.bindEvent()
         this.loadUserInfo()
         this.loadCartCount()
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
             console.log('检查用户是否登陆', res)
             $('.user.not-login').hide().siblings('.user.login').show()
                 .find('.username').text(res.username)
         }, function(errMsg){
             // do nothing
         })
     },
     // 4.加载购物车数量
     loadCartCount : function(){
         _cart.getCartCount(function(res){
             $('.nav .cart-count').text(res || 0)
         }, function(errMsg){
             $('.nav .cart-count').text(0)
         })
     }
 }

 module.exports = nav.init()
