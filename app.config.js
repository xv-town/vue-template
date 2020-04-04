const path = require('path');
const networkInterfaces = require('os').networkInterfaces();
const projectConfig = require('./project.config.json');

function getIPAdress() {
  let IP;
  Object.keys(networkInterfaces).forEach(net => {
    networkInterfaces[net].forEach(alias => {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        IP = alias.address;
      }
    });
  });
  return IP || '127.0.0.1';
}

function timeformat(time) {
  return {
    time: `${time.getFullYear()}-${time.getMonth() +
      1}-${time.getDate()}(${time.getHours()}:${time.getMinutes()})`,
    timeValue: time.valueOf(),
  };
}

const IP = getIPAdress();
const PORT = 8010;
const BUILD_TIME = timeformat(new Date());
const IS_DEV = process.env.NODE_ENV === 'development';

const MICRO_PATH = projectConfig.micro_path;
const VUE_FOLDER = 'vue-2.6.10';

const CONFIG = {
  name: 'template-js',
  version: '0.0.1',
  author: 'xiaoYown',
  port: PORT,

  templateSuffix: 'html', // 未编译文件后缀
  templatePath: path.resolve(__dirname, `./src/htmls`),
  assetsFileDirectory: path.resolve(__dirname, `./static`), // 静态资源路径

  publicPath: '/', // 打包后路径资源前缀
  assetsJSFileDirectory: `static${MICRO_PATH}/js`, // js 文件生成路径
  assetsJSChunksFileDirectory: `static${MICRO_PATH}/js/chunks`, // js chunks 文件生成路径
  assetsCSSFileDirectory: `static${MICRO_PATH}/css`, // css 文件生成路径

  // 生产打包时生效
  externals: IS_DEV ? undefined : {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
  },
  // 生产打包时生效
  injectAssets: IS_DEV ? {} : {
    baseURL: `/static/js/libs/${VUE_FOLDER}`,
    rename: (type, name) => `${name}.min.js?${BUILD_TIME.time}`,
    htmls: {
      home: {
        js: ['vue', 'vue-router', 'vuex']
      }
    }
  },
  skeletons: require('./skeletons'),

  development: {
    IP,
    url: `http://${IP}:${PORT}${MICRO_PATH}/home`,
    port: PORT,
    templateFileSuffix: 'html', // 已编译模板后缀
    assetsPublicPath: '/static',
    assetsFileDirectory: path.resolve(__dirname, `./static`), // 静态资源存放路径
    rewrites: [
      { from: new RegExp(`${MICRO_PATH}\/home(\/|$)`), to: '/home.html' },
      { from: new RegExp(`${MICRO_PATH}\/login(\/|$)`), to: '/login.html' },
      { from: new RegExp(`${MICRO_PATH}\/mobile(\/|$)`), to: '/mobile.html' },
    ],
    proxy: {
      // 请求代理
      // '/api': {
      //   target: domain,
      //   pathRewrite:{
      //     '^/api': ''
      //   }
      // }
    },
  },

  production: {
    timeStamp: BUILD_TIME.time,
    templateFileSuffix: 'html', // 已编译模板后缀
    assetsRoot: path.resolve(__dirname, './dist'),

    copyFromDirectory: path.resolve(__dirname, './static'), // 拷贝静态资源 源路径
    copyDictDirectory: path.resolve(__dirname, './dist/static'), // 拷贝静态资源 目标路径
  },
};

module.exports = CONFIG;
