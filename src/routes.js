import Login from './components/login'
import Home from './components/Home'

import LettersVisit from './components/lettersVisit/lettersVisit'
import VisitRoom from './components/lettersVisit/VisitRoom'
import RoomList from './components/lettersVisit/roomList'


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
	}, {
		path: '/home/VisitRoom',
		name: 'VisitRoom',
		component: VisitRoom,
	}, {
		path: '/home/RoomList',
		name: 'RoomList',
		component: RoomList,
	}]
}];