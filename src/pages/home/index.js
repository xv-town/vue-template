import App from './App';
import router from './router';
import store from './store';
import Entry from '@/utils/entry';

Entry({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
