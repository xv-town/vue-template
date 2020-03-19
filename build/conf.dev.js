const path =	require('path');
const webpack =	require('webpack');
const merge =	require('webpack-merge');
const HtmlWebpackPlugin =	require('html-webpack-plugin');
const baseWebpack =	require('./webpack.config');
const APP_CONFIG = require('../app.config');
const DashboardPlugin = require("webpack-dashboard/plugin");

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

let plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new DashboardPlugin()
];

Object.keys(baseWebpack.entry).forEach(function(name){
  let plugin = new HtmlWebpackPlugin({
    filename: name + `.${APP_CONFIG.development.templateFileSuffix}`,
    template: path.join(APP_CONFIG.templatePath, `${name}.${APP_CONFIG.templateSuffix}`), // page entries
    inject: true,
    chunks: [name],
    minify: false
  });
  plugins.push(plugin);
});

let newWebpack = merge(baseWebpack, {
  mode: 'development',
  output: {
    filename: path.posix.join(APP_CONFIG.assetsJSFileDirectory, '[name].js'),
    chunkFilename: path.posix.join(APP_CONFIG.assetsJSChunksFileDirectory, '[name].js'),
    publicPath: APP_CONFIG.publicPath
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: plugins,
});

module.exports = newWebpack;
