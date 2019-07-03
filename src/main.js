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
import $ from 'jquery'
import store from './vuex/store.js'

import './assets/css/conference.css';

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$ports = ports;
Vue.use(Router);
Vue.use(ElementUI); 
/* eslint-disable no-new */
const router = new Router({
	routes,
	mode: 'history'
});
/*router.beforeEach((to, from, next) => {
	if (to.path != '/') {
		//判断登陆状态
		console.log(router);
		if (store.state.login) {
			next();
		} else {
			alert("请先登录！");
			next('/');
		}
	} else {
		next();
	}
});*/
new Vue({
	router,
	store,
	el: '#app',
	components: {
		App
	},
	template: '<App/>'
})