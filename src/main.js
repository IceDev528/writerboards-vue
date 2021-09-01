import Vue from 'vue'
import VeeValidate from 'vee-validate'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './components/App.vue'
import router from './routes'
import store from './store'
import './registerServiceWorker'
import CenteredLoader from './components/global/CenteredLoader'
import moment from 'moment'
import LodashForVue from 'lodash-for-vue'
import Snotify from 'vue-snotify';
// You also need to import the styles. If you're using webpack's css-loader, you can do so here:
import 'vue-snotify/styles/material.css'; // or dark.css or simple.css
require('@/services/Api')

Vue.use(LodashForVue);
Vue.use(Snotify);

// add these before Vue instantiation
// Global filter to format dates with momentjs
Vue.filter('timeAgo', date => moment(date).fromNow())
Vue.filter('joined', date => moment(date).format('MMMM YYYY'))
Vue.filter('dob', date => moment(date).format('MMMM Do YYYY'))

import './assets/style.scss'

// register vee validate plugin
Vue.use(VeeValidate)

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios)
Vue.component('centered-loader', CenteredLoader)
Vue.component('InfiniteLoading', require('vue-infinite-loading'));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
