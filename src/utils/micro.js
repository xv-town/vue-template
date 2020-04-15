import Vue from 'vue';

const createInstaller = function ({ micro, micro_path, }) {
  return function () {
    if (!Vue.prototype.$project) {
      Vue.prototype.$project = {
        micro,
        micro_path: micro_path,
      };
    } else {
      Vue.prototype.$project.micro = micro;
    }
  };
};

export default function (options) {
  return {
    install: createInstaller(options),
  };
}
