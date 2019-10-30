const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const APP_CONFIG = require('../app.config');
const baseWebpack = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';

const BANNER =
`[name].js v ${APP_CONFIG.version}
Date: ${APP_CONFIG.production.timeStamp}
Author: ${APP_CONFIG.author}`;


let plugins = [
  new webpack.BannerPlugin({
    banner: BANNER
  }),
  new MiniCssExtractPlugin({
    filename: path.posix.join(APP_CONFIG.assetsCSSFileDirectory, `[name].css?t=${APP_CONFIG.production.timeStamp}`),
    chunkFilename: path.posix.join(APP_CONFIG.assetsCSSFileDirectory, `chunks/[id].css?t=${APP_CONFIG.production.timeStamp}`)
  }),
  new ManifestPlugin(),
  // new BundleAnalyzerPlugin()
];

Object.keys(baseWebpack.entry).forEach(name => {
  let plugin = new HtmlWebpackPlugin({
    filename: path.resolve(APP_CONFIG.production.assetsRoot, `${name}.${APP_CONFIG.production.templateFileSuffix}`),
    template: path.resolve(APP_CONFIG.templatePath, `${name}.${APP_CONFIG.templateSuffix}`),
    inject: true,
    chunks: ['vendor', name], 		// 多文件打包引入
    chunksSortMode: 'dependency',
    // chunksSortMode: 'auto'
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  });
  plugins.push(plugin);
});

let newWebpack = merge(baseWebpack, {
  mode: 'production',
  output: {
    path: APP_CONFIG.production.assetsRoot,
    filename: path.posix.join(APP_CONFIG.assetsJSFileDirectory, `[name].js?t=${APP_CONFIG.production.timeStamp}`),
    chunkFilename: path.posix.join(APP_CONFIG.assetsJSChunksFileDirectory, `[name].js?t=${APP_CONFIG.production.timeStamp}`),
    publicPath: APP_CONFIG.publicPath
  },
  devtool: 'cheap-module-source-map',
  plugins: plugins,
});

module.exports = newWebpack;