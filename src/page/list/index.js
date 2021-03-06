/*
* @Author: mmall
* @Date:   2017-05-27 17:57:49
 * @Last modified by:   王贺
 * @Last modified time: 2018-12-02T19:52:10+08:00
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
// var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

var page = {
    data: {
        listParam: {
            keyword     : _mm.getUrlParam('keyword') || '',
            categoryId  : _mm.getUrlParam('categoryId') || '',
            orderBy     : _mm.getUrlParam('orderBy')    || 'default',
            pageNum     : _mm.getUrlParam('pageNum')    || 1,
            pageSize    : _mm.getUrlParam('pageSize')   || 20
        }
    }
,
    init: function() {
        this.loadList()
        this.bindEvent()
    },
    //加载list数据
    loadList: function() {
        var _this = this
        var listHtml = ''
        var listParam = _this.data.listParam
        _product.getProductList(listParam, function(res){
            listHtml = _mm.renderHtml(templateIndex, {list: res.list})
            $('.p-list-con').html(listHtml)
            // _this.loadPagination(res.pageNum, res.pages)
        }, function(errMsg){
            _mm.errorTips(errMsg)
        })


    },
    // 加载分页信息
    loadPagination: function() {

    },
    bindEvent: function() {
        var _this = this
        // 点击排序按钮
        $('.sort-item').click(function(event){
            var $this = $(this)
            _this.data.listParam.pageNum = 1

            // 点击默认排序
            console.log('this', this, this.dataset, $(this), this.classList['active']=== null)
            if(this.dataset.type === 'default') {
                // 已经是active样式
               if($this.hasClass('active')) {
                   return;
               }
               // 其他
               else{
                   $this.addClass('active').siblings('.sort-item')
                       .removeClass('active asc desc');
                   _this.data.listParam.orderBy = 'default';
               }
            }
            // 点击价格排序
            if(this.dataset.type === 'price') {
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            _this.loadList()

        })
    }
}
$(function(){
    page.init()
})
