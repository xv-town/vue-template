const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const APP_CONFIG = require('../app.config');
const baseWebpack = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isMinify = !process.env.build_test;
const isAnalysis = process.env.build_analysis;
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production';

const BANNER =
  `[name].js v ${APP_CONFIG.version}
Date: ${APP_CONFIG.production.timeStamp}
Author: ${APP_CONFIG.author}`;


let plugins = [
  new webpack.BannerPlugin({
    banner: BANNER
  }),
  // new webpack.optimize.ModuleConcatenationPlugin(), TODO: Scope Hoisting 暂不生效, 后续研究原因
  new MiniCssExtractPlugin({
    filename: path.posix.join(APP_CONFIG.assetsCSSFileDirectory, `[name].css?t=${APP_CONFIG.production.timeStamp}`),
    chunkFilename: path.posix.join(APP_CONFIG.assetsCSSFileDirectory, `chunks/[id].css?t=${APP_CONFIG.production.timeStamp}`)
  }),
  new CopyWebpackPlugin([
    {
      from: APP_CONFIG.production.copyFromDirectory,
      to: APP_CONFIG.production.copyDictDirectory
    }
  ]),
  new CleanWebpackPlugin({
    cleanBeforeEveryBuildPatterns: [APP_CONFIG.production.assetsRoot]
  }),
  new CompressionPlugin({
    filename: '[path].gz[query]', // 目标文件名
    algorithm: 'gzip', // 使用gzip压缩
    // test: new RegExp('\\.(js|css)$'),  // 压缩 js 与 css
    threshold: 10240, // 资源文件大于10240B=10kB时会被压缩
    minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
  })
];

if (isAnalysis) {
  plugins.push(new BundleAnalyzerPlugin());
}

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
  optimization: {
    minimize: isMinify,
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        devtool: 'cheap-module-source-map',
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true
          }
        }
      }),
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ],
  },
  // devtool: 'cheap-module-source-map',
  plugins: plugins
});

module.exports = newWebpack;