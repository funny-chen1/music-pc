// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import md5 from 'js-md5'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import * as api from './api/config'
import store from './store/store'
import $ from 'jquery'
import AOS from "aos"
import "../node_modules/aos/dist/aos.css"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import  filter from './filter/filter'
import _ from 'lodash'
import utils from './util/public'


Vue.use(iview);
Vue.use(AOS);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;
Vue.prototype.api = api;
Vue.prototype.$store = store;
Vue.prototype._ = _;
Vue.prototype.utils = utils;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
