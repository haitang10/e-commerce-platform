/**
 * @Author: 王贺
 * @Date:   2018-10-22T16:20:16+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-11-12T23:28:43+08:00
 */
'use strict'
require('./index.css')
var _mm = require('util/mm.js')

_mm.request({
    url: '/product/list.do?keyword=1',
    success: function(res){
      console.log(res)
    },
    error: function(err){
        console.log(err)
    }
})
console.log('hahaha')
