const express =	require('express');
const path = require('path');
const webpack =	require('webpack');
const WebpackDevServer = require('webpack-dev-server');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 打钉影响插件执行顺序, 导致 骨架屏 插件出错
const webpackMerge = require('./conf.dev');
const APP_CONFIG = require('../app.config');
// const smp = new SpeedMeasurePlugin(); // 构建打点

// var compiler = webpack(smp.wrap(webpackMerge));
var compiler = webpack(webpackMerge);

const server = new WebpackDevServer(compiler, {
  stats: 'minimal',
  contentBase: path.resolve('./'),
  compress: false,
  overlay: true,
  hot: true,
  inline: true,
  sockHost: APP_CONFIG.development.IP,
  historyApiFallback: {
    rewrites: APP_CONFIG.development.rewrites
  },
  proxy: APP_CONFIG.development.proxy,
})

server.use(APP_CONFIG.development.assetsPublicPath, express.static(APP_CONFIG.development.assetsFileDirectory));

server.listen(APP_CONFIG.port, APP_CONFIG.development.IP, () => {
  console.log(`\nStarting server ...\n`);
});

compiler.plugin("done", params => {
  console.log(`open your browser: ${APP_CONFIG.development.url}\n`);
});
