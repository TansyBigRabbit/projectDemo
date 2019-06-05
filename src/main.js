// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import {
	routes
} from './routes.js'
Vue.config.productionTip = false
Vue.use(Router)
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