import Vue from 'vue';

// 向上通知
Vue.prototype['$xv:dispatch'] = function (event, payload) {
  let parent = this.$parent;
  while (this.$parent) {
    parent.$emit(event, payload);
    parent = parent.parent;
  }
};
// 向下广播
Vue.prototype['$xv:broadcast'] = function (event, payload) {
  const broadcast = children => {
    children.forEach(child => {
      child.$emit(event, payload);
      if (child.$children) {
        broadcast(child.$children);
      }
    });
  };
  broadcast(this.children);
};

function Entry (...args) {
  return new Promise((resolve) => {
    const vm = new Vue(...args);
    // do something ...
    resolve(vm);
  });
}

export default Entry;
