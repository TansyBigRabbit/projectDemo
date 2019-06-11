// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
	routes
} from './routes.js'
import http from './api/http.js'
import ports from './api/ports.js'
/*import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);*/
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$ports = ports;
Vue.use(Router);
Vue.use(ElementUI);
/* eslint-disable no-new */
const router = new Router({
	routes,
	mode: 'history'
})
new Vue({
	router,
	el: '#app',
	components: {
		App
	},
	template: '<App/>'
})