/**
 * @Author: 王贺
 * @Date:   2018-12-02T21:25:31+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-12-04T23:14:00+08:00
 */
 'use strict'
 require('./index.css')
 require('page/common/nav/index.js')
 require('page/common/header/index.js')
 var _mm             = require('util/mm.js')
 var _product        = require('service/product-service.js')
 var _cart           = require('service/cart-service.js')
 var templateIndex   = require('./index.string')

 var page = {
     data : {
         productId : _mm.getUrlParam('productId') || '',
     },
     init : function(){
             console.log('this.data',this.data)
         this.onLoad()
         this.bindEvent()

     },
     onLoad : function(){
         // 如果没有传productId, 自动跳回首页
         if(!this.data.productId){
             _mm.goHome()
         }
         this.loadDetail()
     },
     bindEvent : function(){
         var _this = this
         // 1.图片预览
         $(document).on('mouseenter', '.p-img-item', function(){
             var imageUrl   = $(this).find('.p-img').attr('src')
             $('.main-img').attr('src', imageUrl);
         });
         // 2.count的操作
         $(document).on('click', '.p-count-btn', function(){
             var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                 $pCount     = $('.p-count'),
                 currCount   = parseInt($pCount.val()),
                 minCount    = 1,
                 maxCount    = _this.data.detailInfo.stock || 1;
             if(type === 'plus'){
                 $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
             }
             else if(type === 'minus'){
                 $pCount.val(currCount > minCount ? currCount - 1 : minCount);
             }
         })
         // 3 加入购物车
         $(document).on('click', '.cart-add', function(){
             _cart.addToCart({
                 productId   : _this.data.productId,
                 count       : $('.p-count').val()
             }, function(res){
                 window.location.href = './result.html?type=cart-add';
             }, function(errMsg){
                 _mm.errorTips(errMsg);
             });
         });
     },

     // 加载商品详情的数据
     loadDetail : function(){
         var _this       = this,
             html        = '',
             $pageWrap   = $('.page-wrap')
         // 1.加载 loading
         $pageWrap.html('<div class="loading"></div>')
         // 2.请求detail信息
         _product.getProductDetail(this.data.productId, function(res){
             console.log('响应',res)
             // 过滤一下响应，因为subImages 是以逗号分隔的4张图片地址
             _this.filter(res)
             // 缓存住detail的数据
             _this.data.detailInfo = res
             // render
             html = _mm.renderHtml(templateIndex, res)
             $pageWrap.html(html)
         }, function(errMsg){
             $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>')
         })
     },
     // 数据匹配
     filter : function(data){
         data.subImages = data.subImages.split(',')
     }
 };
 $(function(){
     page.init()
 })
