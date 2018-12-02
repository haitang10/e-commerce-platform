/**
 * @Author: 王贺
 * @Date:   2018-11-07T16:45:52+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-12-02T22:20:49+08:00
 */
var webpack = require('webpack')
var Ex = require('extract-text-webpack-plugin')
var Ht = require('html-webpack-plugin')

//环境变量配置 区分是开发环境还是线上环境 dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
console.log(WEBPACK_ENV)

//获取html-webpack-plugin 参数的方法
var getHtmlConfig = function(name, title) {
    return {
        template : './src/view/' + name +'.html',
        filename : 'view/' + name +'.html',
        title    : title,
        inject   : true,
        hash     : true,
        chunks   : ['common', name]
    }
}
var config = {
    entry : {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'result'            : ['./src/page/result/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        'list'              : ['./src/page/list/index.js'],
        'detail'            : ['./src/page/detail/index.js'],
        // 'cart'              : ['./src/page/cart/index.js'],

    },
    output: {
        path        : './dist',
        publicPath  : '/dist/',
        filename    : 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery',
    },
    module: {
        loaders: [
          { test: /\.css$/, loader: Ex.extract('style-loader', 'css-loader','less-loader')},
          { test: /\.(jpg|gif|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
          { test: /\.string$/, loader: 'html-loader'}
       ]
    },
    resolve : {
        alias: {
            node_modules: __dirname + '/node_modules',
            util    : __dirname + '/src/util',
            page    : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image   : __dirname + '/src/image',
        }
    },
    plugins : [
        // 独立通用模块打包到js/base.j
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // css单独打包
        new Ex("css/[name].css"),

        // HTML模板的处理
        new Ht(getHtmlConfig('index', '首页')),
        new Ht(getHtmlConfig('result', '操作结果')),
        new Ht(getHtmlConfig('user-login', '用户登录')),
        new Ht(getHtmlConfig('user-register', '用户注册')),
        new Ht(getHtmlConfig('user-pass-reset', '找回密码')),
        new Ht(getHtmlConfig('user-center', '用户中心')),
        new Ht(getHtmlConfig('user-center-update', '个人信息修改')),
        new Ht(getHtmlConfig('user-pass-update', '修改密码')),
        new Ht(getHtmlConfig('list', '商品列表页')),
        new Ht(getHtmlConfig('detail', '商品详情页')),
        // new Ht(getHtmlConfig('cart', '购物车')),
    ],


}
//如果是开发环境，在config 的 entry里增加webpack-dev-server
if(WEBPACK_ENV === 'dev') {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config
