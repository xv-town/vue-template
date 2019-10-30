import Vue from 'vue';

// 向上通知
Vue.prototype['$xv:dispatch'] = function (event: string, payload: any) {
  let parent = this.$parent;
  while (this.$parent) {
    parent.$emit(event, payload);
    parent = parent.parent;
  }
};
// 向下广播
Vue.prototype['$xv:broadcast'] = function (event: string, payload: any) {
  const broadcast = (children: Array<any>) => {
    children.forEach(child => {
      child.$emit(event, payload);
      if (child.$children) {
        broadcast(child.$children);
      }
    });
  };
  broadcast(this.children);
};

export default function (...args: any[]) {
  return new Vue(...args);
}
