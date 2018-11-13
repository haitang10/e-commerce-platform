/**
 * @Author: 王贺
 * @Date:   2018-10-22T16:20:16+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-11-13T16:40:26+08:00
 */
'use strict'
require('./index.css')
var _mm = require('util/mm.js')

// 1.测试ajax跨域
// _mm.request({
//     url: '/product/list.do?keyword=1',
//     success: function(res){
//       console.log(res)
//     },
//     error: function(err){
//         console.log(err)
//     }
// })
// 2.test getUrlParam
console.log('test getUrlParam', _mm.getUrlParam('test'))
// 3.test htmlTemplate
var htmlTemplate = '<div>{{data}}</div>'
var data = {data: 123}
console.log('test htmlTemplate', _mm.renderHtml(htmlTemplate, data))
