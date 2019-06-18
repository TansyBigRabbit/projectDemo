import Login from './components/login'
import Home from './components/Home'
//信访
import LettersVisit from './components/lettersVisit/lettersVisit'
import VisitRoom from './components/lettersVisit/VisitRoom'
import VisitRecord from './components/lettersVisit/visitRecord'
//会议
import ConList from './components/DJcenter/conList'
import ConRecord from './components/DJcenter/conRecord'
import ConRoom from './components/DJcenter/conRoom'
import ConSignate from './components/DJcenter/conSignate'
import ConSignate2 from './components/DJcenter/conSignate2'
import MyCon from './components/DJcenter/myCon'

export const routes = [{
	path: '/',
	name: 'login',
	component: Login
}, {
	path: '/home',
	name: 'home',
	component: Home,
	children: [{
			//信访部分
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
			path: '/home/VisitRecord',
			name: 'visitRecord',
			component: VisitRecord,
		},
		//会议部分
		{
			path: '/home/ConList',
			name: 'ConList',
			component: ConList,
		}, {
			path: '/home/ConRecord',
			name: 'ConRecord',
			component: ConRecord,
		}, {
			path: '/home/ConRoom',
			name: 'ConRoom',
			component: VisitRecord,
		}, {
			path: '/home/ConSignate',
			name: 'ConSignate',
			component: ConSignate,
		}, {
			path: '/home/ConSignate2',
			name: 'ConSignate2',
			component: ConSignate2,
		}, {
			path: '/home/MyCon',
			name: 'MyCon',
			component: MyCon,
		}
	]
}];