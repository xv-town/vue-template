const ora =	require('ora');
const webpack =	require('webpack');

let webpackMerge = require('./conf.pro');
let spinner = ora('building for production...');
spinner.start();

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
