import Vue from 'vue';
import Router from 'vue-router';
import Micro from '@/utils/micro';
import ProjectConfig from '../../../project.config.json';

const { micro, micro_path, } = ProjectConfig;

Vue.use(Micro({
  micro,
  micro_path,
}));
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: `${micro_path}/home`,
      name: 'home',
      component: () => import(/* webpackChunkName: "home-view-index", webpackPrefetch: true */ './views/Home'),
    },
    {
      path: `${micro_path}/home/about`,
      name: 'about',
      component: () => import(/* webpackChunkName: "home-view-about", webpackPrefetch: true */ './views/About'),
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "home-view-docs", webpackPrefetch: true */ '@/components/404'),
    },
  ],
});
