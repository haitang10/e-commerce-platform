/**
 * @Author: 王贺
 * @Date:   2018-11-07T16:45:52+08:00
 * @Last modified by:   王贺
 * @Last modified time: 2018-11-08T21:13:59+08:00
 */
var webpack = require('webpack')
var Ex = require('extract-text-webpack-plugin')
var Ht = require('html-webpack-plugin')

//环境变量配置 区分是开发环境还是线上环境 dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
console.log(WEBPACK_ENV)

//获取html-webpack-plugin 参数的方法
var getHtmlConfig = function(name) {
    return {
        template: './src/view/' + name +'.html',
        filename: 'view/' + name +'.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],

    },
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery',
    },
    module: {
        loaders: [
          { test: /\.css$/, loader: Ex.extract('style-loader', 'css-loader','less-loader')},
          { test: /\.(jpg|gif|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=10000$name=resource/[name].ext'},
       ]
    },
    plugins: [
        // 独立通用模块打包到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        // css单独打包
        new Ex("css/[name].css"),
        // HTML模板的处理
        new Ht(getHtmlConfig('index')),
        new Ht(getHtmlConfig('login')),
    ]

}
//如果是开发环境，在config 的 entry里增加webpack-dev-server
if(WEBPACK_ENV === 'dev') {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config
