import App from './App';
import router from './router';
import store from './store';
import Entry from '@/utils/entry';

Entry({
  router,
  store,
  render: h => h(App),
}).then(vm => {
  vm.$mount('#app');
}).catch(vm => {
  // with some error warning
  vm.$mount('#app');
});
