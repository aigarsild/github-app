import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css';
import underscore from 'vue-underscore';
import VueRouter from 'vue-router';
import Routes from './routes'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: Routes
});

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(underscore);

library.add(faStar, faStarHalf);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app');
