/*
* @Author: Rosen
* @Date:   2017-05-30 16:51:25
 * @Last modified by:   王贺
 * @Last modified time: 2018-12-07T17:12:24+08:00
*/

'use strict'
require('./index.css')
require('page/common/header/index.js')
var nav             = require('page/common/nav/index.js')
var _mm             = require('util/mm.js')
var _cart           = require('service/cart-service.js')
var templateIndex   = require('./index.string')

var page = {
    renderCount: 0,
    data : {

    },
    init : function(){
        this.loadCart()
        this.bindEvent()
    },

    // 1.加载购物车信息
    loadCart : function(){
        // 发送http请求和绑定事件都会改变this的指向，所以先复制出来
        var _this = this
        // 获取购物车列表
        _cart.getCartList(function(res){
            console.log('这里的this怎么又出问题了？发送http请求和绑定事件都会改变this的指向',this, _this)
            _this.renderCart(res)
        }, function(errMsg){
            _this.showCartError()
        })
    },
    // 2.渲染购物车
    renderCart : function(data){
        this.renderCount += 1
        console.log('渲染页面次数', this.renderCount)
        this.filter(data)
        // 缓存购物车信息
        this.data.cartInfo = data
        // 生成HTML
        var cartHtml = _mm.renderHtml(templateIndex, data)
        $('.page-wrap').html(cartHtml)
        // 通知导航的购物车更新数量
        nav.loadCartCount()
    },
    // 3.删除指定商品，支持批量，productId用逗号分割
    deleteCartProduct : function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res)
        }, function(errMsg){
            _this.showCartError();
        })
    },
    // 4.数据匹配
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 5.显示错误信息
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    },
    // 6.绑定事件
    bindEvent : function(){
        var _this = this
        // 1.商品的选择 / 取消选择
        $('.w').on('click', '.cart-select', function(){
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id')
            // console.log('this and $this', this, $this, typeof this)
            // 选中
            if($this.is(':checked')){
                _cart.selectProduct(productId, function(res){
                    _this.renderCart(res)
                }, function(errMsg){
                    _this.showCartError()
                })
            }
            // 取消选中
            else{
                _cart.unselectProduct(productId, function(res){
                    _this.renderCart(res)
                }, function(errMsg){
                    _this.showCartError()
                })
            }
        })
        // 2.商品的全选 / 取消全选
        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this)
            // 全选
            if($this.is(':checked')){
                _cart.selectAllProduct(function(res){
                    _this.renderCart(res)
                }, function(errMsg){
                    _this.showCartError()
                })
            }
            // 取消全选
            else{
                _cart.unselectAllProduct(function(res){
                    _this.renderCart(res)
                }, function(errMsg){
                    _this.showCartError()
                })
            }
        })
        // 3.商品数量的变化
        $(document).on('click', '.count-btn', function(){
            var $this       = $(this),
                $pCount     = $this.siblings('.count-input'),
                currCount   = parseInt($pCount.val()),
                type        = $this.hasClass('plus') ? 'plus' : 'minus',
                productId   = $this.parents('.cart-table').data('product-id'),
                minCount    = 1,
                maxCount    = parseInt($pCount.data('max')),
                newCount    = 0
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount)
                currCount   = parseInt($pCount.val())
                console.log('商品数量', currCount)
                // if(currCount >= maxCount){
                //     _mm.errorTips('该商品数量已达到上限')
                //     return;
                // }
                // newCount = currCount + 1
            }else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount)
                currCount   = parseInt($pCount.val())
                console.log('商品数量', currCount)
                // if(currCount <= minCount){
                //     return
                // }
                // newCount = currCount - 1
            }
            // 更新购物车商品数量
            _cart.updateProduct({
                productId : productId,
                count : currCount
            }, function(res){
                _this.renderCart(res)
            }, function(errMsg){
                _this.showCartError()
            })
        })
        // 4.删除单个商品
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认要删除该商品？')){
                var productId = $(this).parents('.cart-table').data('product-id')
                _this.deleteCartProduct(productId)
            }
        })
        // 5.删除选中商品
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认要删除选中的商品？')){
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked')
                // 循环查找选中的productIds
                for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++){
                    arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','))
                }
                else{
                    _mm.errorTips('您还没有选中要删除的商品')
                }
            }
        });
        // 6.提交购物车
        $(document).on('click', '.btn-submit', function(){
            // 总价大于0，进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './confirm.html'
            }else{
                _mm.errorTips('请选择商品后再提交')
            }
        })
    }













};
$(function(){
    page.init();
})
