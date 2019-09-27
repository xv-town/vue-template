require('shelljs/global'); // can replace unix shell scripts on nodejs

const APP_CONFIG = require('../app.config');
const ora =	require('ora');
const webpack =	require('webpack');

let webpackMerge = require('./conf.pro');
let spinner = ora('building for production...');
spinner.start();

rm('-rf', APP_CONFIG.production.assetsRoot);
mkdir('-p', APP_CONFIG.production.assetsRoot);
mkdir('-p', APP_CONFIG.production.copyDictDirectory);
cp('-R', APP_CONFIG.production.copyFromDirectory + '/', APP_CONFIG.production.copyDictDirectory);

webpack(webpackMerge, function (err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
});
