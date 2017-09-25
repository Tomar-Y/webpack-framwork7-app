const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rules = require("./rules");
const config = require("./config");

module.exports = {
    entry: ['./src/app/index.js'],//打包的入口文件
    output: {//打包完的输出文件
        path: __dirname,
        filename: 'js/bundle.js',
    },
    devtool: 'eval-source-map',
    devServer: config.dev,
    module: {
        rules
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: "index.temp.html",//new 一个这个插件的实例，并传入相关的参数
            filename: 'index.html',//多页面 可以index-[hash].html
            inject: 'body',//想把脚本文件放在哪个标签内，head/body
            title: '我是模板里面的title',
            minify: {//压缩html
                collapseInlineTagWhitespace: true,//去除空格
                removeComments: true//去除注释
            }
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css")
    ],
}