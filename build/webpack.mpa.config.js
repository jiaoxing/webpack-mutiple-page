/*
WebPack4 多页面配置
参考: https://blog.csdn.net/rth362147773/article/details/71076354
@author zhangpeng
@date 2018-06-01
*/
'use strict'
const path = require('path');
const glob = require('glob');
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntry() {
  let files = glob.sync(config.build.entryPath);
  let entries = {};
  files.forEach(file => {
    entries[path.basename(file, path.extname(file))] = './' + file;
  });
  return entries;
}

function mutiplePageView() {
  let files = glob.sync(config.build.htmlSrcPath);
  let htmlDirectory = config.build.htmlDirectory;
  let entries = {};
  files.forEach(file => {
    let basename = path.basename(file, path.extname(file));
    let pathname = path.join(path.dirname(file), basename);
    pathname = htmlDirectory ? pathname.replace(new RegExp('^' + htmlDirectory), '') : pathname;
    entries[pathname] = basename;
  });
  return viewConfig(entries);
}

function viewConfig(viewsObj) {
  let configs = [];
  let pages = Object.keys(viewsObj);
  pages.forEach(pathname => {
    let htmlName = viewsObj[pathname]
    let conf = {
      filename: './view/' + htmlName + '.html', //生成的html存放路径，相对于path
      template: './src/view/' + htmlName + '.html', //html模板路径
      layout: config.build.layoutPath,
      inject: 'body', //js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      chunks: ['common', htmlName], //需要引入的chunk，不配置就会引入所有页面的资源
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    };
    configs.push(new HtmlWebpackPlugin(conf));
  });
  return configs;
}

exports.getEntry = getEntry;
exports.mutiplePageView = mutiplePageView;