//const hosturl = 'http://192.168.1.149:8080/webrtc_conference_war';//localhost:8080 threeCentreProject
const hosturl = 'http://192.168.1.153:8080/threeCentreProject';
export default {
	department: hosturl+'/depart',
	userInfo: hosturl+'/userinfoextend',
	login: hosturl+'/userinfo/login',
	getToken:hosturl+'/api/account/getTonkenByIdCard',
	checkRoom:hosturl+'/petitionroominfo/queryListWithNoPage',
	submitContent:hosturl+'/appealrecord/insert',
	//userInfo:"/threeCentreProject/userinfoextend",
	//login: 'api/threeCentreProject/api/account/login',
	hosturl: hosturl
}