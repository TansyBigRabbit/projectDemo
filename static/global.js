var PREFIX = "webrtc_conference"
var SVRDOMAIN = "";

var watchWebRtcPeer;

var ILiveSDK = {
	RoomNumber: null,
	Role: null,
	selSess: null,
	loginInfo: {
		'sdkAppId': null,
		'openid': null,
		'identifier': null,
		'userSig': null,
		'identifierNick': null,
		'headurl': null,
		'token': null
	}
};


var Constants = {
	View: {
		Login: 0,
		RoomList: 1,
		RoomDetail: 2
	}
};

//角色
var Role = {
	Guest: 0, //观众
	LiveMaster: 1, //主播
	LiveGuest: 2 //连麦观众
};