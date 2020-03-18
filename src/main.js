import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import underscore from 'vue-underscore';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export const eventBus = new Vue();

Vue.config.productionTip = false;
Vue.use(underscore);

library.add(faStar, faStarHalf);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  render: h => h(App),
}).$mount('#app');
