import Vue from 'vue';

// 向上通知
Vue.prototype['dispatch'] = function (event, payload) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(event, payload);
    parent = parent.$parent;
  }
};
// 向下广播
Vue.prototype['broadcast'] = function (event, payload) {
  const broadcast = children => {
    children.forEach(child => {
      child.$emit(event, payload);
      if (child.$children) {
        broadcast(child.$children);
      }
    });
  };
  broadcast(this.$children);
};

function Entry (...args) {
  return new Promise((resolve) => {
    const vm = new Vue(...args);
    // do something ...
    resolve(vm);
  });
}

export default Entry;
