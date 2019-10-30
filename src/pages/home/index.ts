import App from './App.vue';
import router from './router';
import store from './store';
import Entry from '@/utils/entry';

Entry({
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app');

if (module.hot) {
  module.hot.accept();
}
