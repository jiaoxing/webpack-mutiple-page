const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const WebpackDevServer = require('webpack-dev-server');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlLayoutPlugin = require('html-layout-plugin');
const mpaWebpackConfig = require('./webpack.mpa.config');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

let config = {
  entry: mpaWebpackConfig.getEntry(),
  output: {
    path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    publicPath: '/', //模板、样式、脚本、图片等资源对应的server上的路径
    filename: 'js/[name].js', //每个页面对应的主js的生成配置
    chunkFilename: 'js/[id].chunk.js' //chunk生成的配置
  },
  module: {
    rules: [{
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: './index.html', //生成的html存放路径，相对于path
      template: './src/index.html', //html模板路径
      inject: 'head', //js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      chunks: ['common', 'index'], //需要引入的chunk，不配置就会引入所有页面的资源
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new HtmlLayoutPlugin(),
    new webpack.HotModuleReplacementPlugin() //热加载
  ]
};

//Webpack多页面插件支持
mpaWebpackConfig.mutiplePageView().forEach(page => {
  config.plugins.push(page)
});

module.exports = config;