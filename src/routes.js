import Login from './components/login'
import Home from './components/Home'
export const routes = [{
	path: '/',
	name: 'login',
	component: Login
}, {
	path: '/home',
	name: 'home',
	component: Home
}];