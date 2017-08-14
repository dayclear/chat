var webpack = require('webpack');
var path =require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/main.js',
    flexible: './src/js/flexible.js',
  },
  output: {
    path: __dirname + '/build',
    filename: 'js/[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/,
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: 'head',
      title: '聊天室', // 传参数
      minify: {
        removeComments: true, // 删注释
        collapseWhitespace: true, //删空格
      },
    }),

    new extractTextWebpackPlugin({
      filename: '[name].css',
    })
  ],

}