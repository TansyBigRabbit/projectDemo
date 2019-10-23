//const hosturl = 'http://192.168.1.149:8080/webrtc_conference_war';//localhost:8080 threeCentreProject
//const hosturl = 'http://192.168.1.153:8080/threeCentreProject';
//const hosturl = 'http://47.102.139.17:9090/threeCentreProject';

var hosturl = '';
process.env.NODE_ENV === 'development' ? hosturl = '/api' : hosturl = "http://47.102.139.17:9090/threeCentreProject";
export default {
	department: hosturl + '/depart/superiorDepart',
	userInfo: hosturl + '/userinfo',
	login: hosturl + '/userinfo/login',
	logout: hosturl + '/userinfo/logout',
	getToken: hosturl + '/api/account/getTonkenByIdCard',
	checkRoom: hosturl + '/petitionroominfo/queryListWithNoPage',
	submitContent: hosturl + '/appealrecord/insert',
	conference: {
		insert: hosturl + '/conferenceroom/insert',
		update: hosturl + '/conferenceroom/update',
		list: hosturl + '/conferenceroom/queryListWithPage',
		findById: hosturl + '/conferenceroom/queryOne',
	},
	meetsign: {
		sign: hosturl + '/meetsign/insert',
		list: hosturl + '/meetsign/queryListWithNoPage',
	},
	activity: {
		insert: hosturl + '/partybuilding/insert',
		list: hosturl + '/partybuilding/queryListWithPage',
		update: hosturl + '/partybuilding/update',
		findById: hosturl + '/partybuilding/queryOne',
		delete: hosturl + '/partybuilding/delete'
	},
	letters: {
		list: hosturl + '/petitionroominfo/queryListWithPage',
	},
	//信访统计接口
	letterStatistics: {
		topData: hosturl + '/peptionReport/fixedQuantityDisplay',
		barData: hosturl + '/peptionReport/histogram',
		terminalData: hosturl + '/peptionReport/petitionDepartProportion',
		typeData: hosturl + '/peptionReport/petitionTypeProportion'
	},
	//学宣视频接口
	studyVideoList: {
		list: hosturl + '/academicAdvocacyTotalController/queryListWithPage',
		insert: hosturl + '/academicAdvocacyTotalController/insert',
		delete: hosturl + '/academicAdvocacyTotalController/delete',
		update: hosturl + '/academicAdvocacyTotalController/update',
		findById: hosturl + '/academicAdvocacyTotalController/queryOne',
	},
	//学宣直播房间创建
	studyLiveCreate: hosturl + '/academicLiveBroadcastTotalController/insert',
	//学宣直播房间列表
	studyLiveRoomList: hosturl + '/academicLiveBroadcastTotalController/queryListWithPage',
	//视频类别
	videoType: hosturl + "/academicAdvocacy/academic-type/queryListWithNoPage",
	user: {
		list: hosturl + '/userinfo/queryListWithPage',
		insert: hosturl + '/userinfo/insert',
		update: hosturl + '/userinfo/update',
		delete: hosturl + '/userinfo/delete',
		findById: hosturl + '/userinfo/queryOne',
	},
	role: {
		list: hosturl + '/role/queryListWithPage',
		insert: hosturl + '/role/insert',
		update: hosturl + '/role/update',
		delete: hosturl + '/role/delete',
		findById: hosturl + '/role/queryListWithNoPage',
	},
	permission: {
		list: hosturl + '/permission/queryListWithPage',
	},
	roleAndUser: {
		insert: hosturl + '/userinforole/insert'
	},
	roleAndRight: {
		insert: hosturl + '/rolepermission/insert'
	},
	//身份证读卡信息
	userinfoextend: {
		insertList: hosturl + '/userinfoextend/insertList',
		list: hosturl + '/userinfoextend/queryListWithPage',
	},
	//信访类型
	petitionType: {
		list: hosturl + '/petitiontype/queryListWithNoPage'
	},
	//userInfo:"/threeCentreProject/userinfoextend",
	//login: 'api/threeCentreProject/api/account/login',
	hosturl: hosturl
}