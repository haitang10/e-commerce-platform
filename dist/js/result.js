webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(110);


/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-11-23T18:22:29+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-23T21:39:00+08:00
	 */
	'use strict'
	__webpack_require__(111)
	__webpack_require__(113)
	var _mm = __webpack_require__(98)

	$(function() {
	    var type = _mm.getUrlParam('type') || 'default'
	    var element = $('.' + type + '-success')
	    element.show()
	    console.log('debug 操作成功', type)
	})


/***/ }),

/***/ 111:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @Author: 王贺
	 * @Date:   2018-11-20T11:25:28+08:00
	 * @Last modified by:   王贺
	 * @Last modified time: 2018-11-20T21:09:32+08:00
	 */
	'use strict'
	__webpack_require__(114)


/***/ }),

/***/ 114:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});