var PREFIX = "webrtc_conference"
var SVRDOMAIN = "";

var watchWebRtcPeer;
//系统登录者的信息
var loginInfoMain = {};
//创建者\加入者type 
//petitionCreate\meetCreate\petitionJoin\meetJoin
var roleType = '';
var deparId = '';
//webRtc登陆者的信息
var ILiveSDK = {
	RoomNumber: null,
	Role: null,
	selSess: null,
	loginInfo: {
		'sdkAppId': '',
		'openid': '',
		'identifier': '',
		'userSig': '',
		'identifierNick': '',
		'headurl': '',
		'token': '',
		'roleType': '',
		'departId': '',
	}
};
var webUrlMain = "ws:192.168.1.151:8081/threeCentreProject/groupcall?";
//var webUrlMain = "ws:weipan.51vip.biz/threeCentreProject/groupcall?";
var video_list = [];
var userList = [];

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

function onRemoteStreamRemove(videoId) {
	// _.remove(this.video_list, function(o) {
	//   return o.videoId == videoId
	// })
	videoId = videoId + '-video';
	console.debug('onRemoteStreamRemove', videoId)

	//重置视频列表
	var newArr = [];
	var needResetFirst = false;
	_.each(video_list, function(o) {
		if (o.videoId != videoId) {
			newArr.push(o);
		} else if (o.first) {
			needResetFirst = true;
		}
	});
	console.debug(needResetFirst);
	if (needResetFirst && newArr[0]) {
		newArr[0].first = true;
	}
	console.debug('newArr', newArr);
	video_list = newArr;
	//      this.restoreVideo(videoId);

	var openid = videoId.split('-')[0];

	for (var i = 0; i < userList.length; i++) {
		if (userList[i].id == openid) {
			userList.splice(i, 1);
			break;
		}
	}

	//插入聊天信息
	//      this.chatList.push({
	//        who: openid,
	//        content: openid + "断开了视频连接",
	//        isSelfSend: 0,
	//        isSystem: 1
	//      });


}