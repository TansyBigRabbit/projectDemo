//const hosturl = 'http://192.168.1.149:8080/webrtc_conference_war';//localhost:8080 threeCentreProject
//const hosturl = 'http://192.168.1.153:8080/threeCentreProject';
//const hosturl = 'http://47.102.139.17:9090/threeCentreProject';
const hosturl = '/api';
export default {
	department: hosturl + '/depart',
	userInfo: hosturl + '/userinfo',
	login: hosturl + '/userinfo/login',
	getToken: hosturl + '/api/account/getTonkenByIdCard',
	checkRoom: hosturl + '/petitionroominfo/queryListWithNoPage',
	submitContent: hosturl + '/appealrecord/insert',
	conference: {
		insert: hosturl + '/conferenceroom/insert',
		update: hosturl + '/conferenceroom/update',
		list: hosturl + 'conferenceroom/queryListWithPage',
	},
	//userInfo:"/threeCentreProject/userinfoextend",
	//login: 'api/threeCentreProject/api/account/login',
	hosturl: hosturl
}