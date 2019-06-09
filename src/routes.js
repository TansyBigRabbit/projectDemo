import Login from './components/login'
import Home from './components/Home'
import LettersVisit from './components/lettersVisit/lettersVisit'
export const routes = [{
	path: '/',
	name: 'login',
	component: Login
}, {
	path: '/home',
	name: 'home',
	component: Home,
	children: [{
		path: '/home/lettersVisit',
		name: 'lettersVisit',
		component: LettersVisit,
		/*meta: {
		  bcrumd: ['首页'],
		  activePath: "/menu/home"
		}*/
	}, ]
}];