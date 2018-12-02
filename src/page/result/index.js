/**
 * @Author: 王贺
 * @Date:   2018-11-23T18:22:29+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-12-02T21:58:26+08:00
 */
'use strict'
require('./index.css')
require('page/common/nav-simple/index.js')
var _mm = require('util/mm.js')

$(function() {
    var type = _mm.getUrlParam('type') || 'default'
    var element = $('.' + type + '-success')
    element.show()
    console.log('debug 操作成功', type)
})
