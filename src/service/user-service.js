/**
 * @Author: 王贺
 * @Date:   2018-11-25T16:04:33+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-11-26T19:59:04+08:00
 */
 'use strict';

 var _mm = require('util/mm.js');

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
