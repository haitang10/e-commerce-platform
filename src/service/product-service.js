/**
 * @Author: 王贺
 * @Date:   2018-11-30T21:54:12+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-12-02T16:21:37+08:00
 */
 'use strict';

 var _mm = require('util/mm.js');

 var _product = {
     // 1.获取商品列表
     getProductList : function(listParam, resolve, reject){
         _mm.request({
             url     : _mm.getServerUrl('/product/list.do'),
             data    : listParam,
             success : resolve,
             error   : reject
         });
     },
     // 2.获取商品详细信息
     getProductDetail : function(productId, resolve, reject){
         _mm.request({
             url     : _mm.getServerUrl('/product/detail.do'),
             data    : {
                 productId : productId
             },
             success : resolve,
             error   : reject
         });
     }
 }
 module.exports = _product;
