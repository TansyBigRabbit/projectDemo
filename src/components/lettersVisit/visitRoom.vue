<template>
	<div> 
		<el-row class="container">
			<el-col :span="11">
				<div class="box_1">
					<!-- v-if="item.videoId == 'local'" muted :id="item.videoId"  -->
					<video class=" " autoplay="autoplay" data-videotype="remote"></video> 
				</div>
				<div class="box_1"></div>
			</el-col>
			<el-col :span="11">
				<div>
					<el-row class="infoList">
						<p>房间信息：</p>
						<el-col :span="12">
							房间号：<span>12022152777</span>
						</el-col>
						<el-col :span="12">
							接访时间：<span id="mytime"></span>
						</el-col> 
					</el-row>
					 <el-divider class="divider"></el-divider>
				     <el-row class="infoList">
						<p>信访人员信息：</p>
						<el-col :span="6">
							姓名：<span>陈大颖</span>
						</el-col>
						<el-col :span="6">
							性别：<span>女</span>
						</el-col>
						<el-col :span="12">
							身份证号：<span>510723199401180043</span>
						</el-col>
					</el-row>
					 <el-divider class="divider"></el-divider>
					<el-row class="infoList">
						<p>信访人员信息：</p>
						<el-col :span="12">
							姓名：<span>陈小颖</span>
						</el-col>
						<el-col :span="12">
							工号：<span>10086</span>
						</el-col>
						<!-- <el-col :span="12">
							身份证号：<span>510723199401180043</span>
						</el-col> -->
					</el-row>
				</div>
				<div v-if="isRole">
					<el-input
					  type="textarea"
					  :rows="12"
					  placeholder="请记录上访内容内容"
					  v-model="textarea"
					  style="margin:30px 0" >
					</el-input>
					<div style="width: 20%;margin: 0 auto">
					 <el-button type="primary" style="width: 150px">提交</el-button>
				    </div>
				</div>
				<div v-if="!isRole"> 
					<div style="width: 20%;margin: 40px auto">
					 <el-button type="primary" style="width: 150px">结束上访</el-button>
				    </div>
				</div>
			</el-col>
        </el-row>
        <el-button type="primary" style="width: 150px" @click="createRoom">创建房间</el-button>
       </div>
</template>

<script>
	export default{
		data(){
			return{
              isRole:true,
              textarea:'',
              myVar:'',
              ////////////////////////////////////////////////
              form: {
		      msg: null,
		      //username: store.get(PREFIX + "username") || null,
		     // password: store.get(PREFIX + "password") || null
		    },
		    role: BomQuery('role'),
		    onMic: 0,
		    logined: false,
		    //view: store.get(PREFIX + "roomview") || 0,
		    roomList: [],
		    userList: [],
		    chatList: [],
		//    roomUsers: [],
		    roomnum: null,
		    loginInfo: {
		    'sdkAppId': null,
		    'openid': null,
		    'identifier': null,
		    'userSig': null,
		    'identifierNick': null,
		    'headurl': null,
		    'token': null
		  },
		    entryType: 'join',
		    selToID: null,
		    joinRoomModal: false,
		    createRoomModal: false,
		    modalForm: {
		      roomname: null,
		      roomnum: null
		    },
		    applying: false,
		    //mode: store.get(PREFIX + "mode") || 'fixed',
		    video_list: [],
		    video_map: {},
		    apply_list: [],
		    resolution: "auto",
		    //resolution: store.get(PREFIX + "resolution") || "auto",
		    //frameRate: store.get(PREFIX + "frameRate") || "auto",
		    //configRole: store.get(PREFIX + "configRole") || "ed640",
		//    selectWatch:'',
		    open: {
		      audio: true,
		      video: true
		    }
    ///////////////////////////////////////////////////////////////////////
			}
		},
		created(){
		this.initWebsocket();	
        },
		mounted(){
		/*	if (ws != null && ws.readyState == 1) {
		this.createRoom(); 
	}*/
			document.getElementById("mytime").innerText="";
			this.time_fun(); 
            
	    },
		beforeDestroy(){
            clearInterval(this.myVar);
		}, 
		methods:{

			two_char:function(n) {
            return n >= 10 ? n : "0" + n;
            },
        	time_fun:function(){
        	var app = this;
            var sec=0;
             app.myVar = window.setInterval(function () {
                sec++;
                var date = new Date(0, 0)
                date.setSeconds(sec);
                var h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
                document.getElementById("mytime").innerText = app.two_char(h) + ":" + app.two_char(m) + ":" + app.two_char(s);
            }, 1000);
        },
        /////////////////////////////////////////////////////////////////////
        createRoom(){
        	  var self = this;
		      this.entryType = 'create';//进入类型 默认值是join
		      this.role = 'LiveMaster';//主播
		      //输入框中输入的值
		      self.roomnum ="信访房间001";
		      
		      self.renderRoom();
		      self.initWebRTC();

        },
       //初始化会议界面
		    renderRoom: function() {
		      this.view = 2;
		      this.chatList = []; 

		    },

            initWebRTC: function() {
     
		      name='陈虹颖'; 
		      var message = {
		    			id : 'joinRoom',
		    			name : name,//用户名
		    			room : this.roomnum//房间号
		    		}
		      this.sendMessage(message);
       },

       initWebsocket(){
       	    var app = this;
            
	if (ws != null && ws.readyState == 1) {
		return;
	}

	//当前域名或ip（包括ip和端口）
	var url = window.location.host;
	//console.log(url);

	//ws还是wss
	var wsProtocol = 'https:' == document.location.protocol ? 'wss' : 'ws';

	var pathName = window.document.location.pathname;
	//获取带"/"的项目名，如：/webrtc
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);

	//var webSocketUrl = wsProtocol + "://" + url + projectName + "/groupcall?" + ILiveSDK.loginInfo.token;
	//var webSocketUrl = 'ws://118.24.128.185:8080/webrtc-conference/groupcall?eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ5ZTExIiwiaWF0IjoxNTYwMzQ3MDk4LCJzdWIiOiJ4eHh4QDE2My5jb20iLCJpc3MiOiJ3d3cueHh4eC5jb20iLCJleHAiOjE1NjAzNDk3NzZ9.XJPD3_1AjHAsTOOo5ZLuonWV9drGTaiOH45J1sstEV8'
	var webSocketUrl = "ws://118.24.128.185:8080/webrtc-conference/groupcall?eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjaGVuaG9uZ3lpbmciLCJpYXQiOjE1NjA1MDMyMzUsInN1YiI6Inh4eHhAMTYzLmNvbSIsImlzcyI6Ind3dy54eHh4LmNvbSIsImV4cCI6MTU2MDUwNTkxNH0.Xfjd7meiO1R_mEYSwZ1GvQz4j6d_-e0GtjnBRzPXjpE"

	console.log(webSocketUrl)
	ws = new WebSocket(webSocketUrl);


	window.onbeforeunload = function() {
		if (ws.readyState == 1) {
			ws.close();
		}
	};

	ws.onclose = function() {
		//app.$root.$refs.toastr.e("连接已中断，请刷新页面！");
		alert("连接已中断，请刷新页面！")
		app.chatList.push({
			who: '系统',
			content: "连接已中断，请刷新页面",
			isSelfSend: 0,
			isSystem: 1
		});
	};

	ws.onmessage = function(message) {
		
		var parsedMessage = JSON.parse(message.data);
		console.info('Received message: ' + message.data);

		switch (parsedMessage.id) {
			case 'existingParticipants':
				app.onExistingParticipants(parsedMessage);
				break;
			case 'newParticipantArrived':
				app.onNewParticipant(parsedMessage);
				break;
			case 'participantLeft':
				app.onParticipantLeft(parsedMessage);
				break;
			case 'receiveVideoAnswer':
				app.receiveVideoResponse(parsedMessage);
				break;
			case 'iceCandidateRoom':
				participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function(error) {
					if (error) {
						console.error("Error adding candidate: " + error);
						return;
					}
				});
				break;
			case 'tipRsp':
				app.tipRsp(parsedMessage);
				break;
			case 'getRoomListRsp':
				app.getRoomListRsp(parsedMessage);
				break;
			case 'getRoomUserRsp':
				app.getRoomUserRsp(parsedMessage);
				break;
			case 'chatRsp':
				app.chatRsp(parsedMessage);
				break;

				//观看模式
			case 'viewerResponse':
				app.viewerResponse(parsedMessage);
				break;
			case 'iceCandidate':
				watchWebRtcPeer.addIceCandidate(parsedMessage.candidate, function(error) {
					if (error)
						return console.error('Error adding candidate: ' + error);
				});
				break;
			case 'stopCommunication':
				dispose();
				break;

			default:
				console.error('Unrecognized message', parsedMessage);
		}
	}
			ws.onclose = function() {
		//app.$root.$refs.toastr.e("连接已中断，请刷新页面！");
			alert("连接已中断，请刷新页面！")
			app.chatList.push({
				who: '系统',
				content: "连接已中断，请刷新页面",
				isSelfSend: 0,
				isSystem: 1
			});
		console.log(app.chatList[0].who)
	};

	
       },
       sendMessage(message) {
	var jsonMessage = JSON.stringify(message);
	if (ws == null || ws.readyState != 1) {
		return;
	}
	console.log('Senging message: ' + jsonMessage);
	ws.send(jsonMessage);
},
       onExistingParticipants(msg) {
    var app = this;
	var defaultSetting = {
		maxWidth: 320,
		maxHeight: 240,
		maxFrameRate: 15,
		minFrameRate: 15
	};

	var resolution = app.resolution;
	if (resolution != "auto") {
		var opts = resolution.split("x");
		defaultSetting.maxWidth = parseInt(opts[0]);
		defaultSetting.maxHeight = parseInt(opts[1]);
	}

	var frameRate = app.frameRate;
	if (frameRate != "auto") {
		defaultSetting.maxFrameRate = parseInt(frameRate);
	}


	//定义视频和音频的质量
	var constraints = {
		audio: true,
		video: {
			mandatory: defaultSetting
			//			mandatory : {
			//				maxWidth : 320,
			//				maxFrameRate : 15,
			//				minFrameRate : 15
			//			}
		}
	};
	//	console.log(name + " registered in room " + room);

	var participant = new Participant(name);

	participants[name] = participant;

	setTimeout(function() {
    var video = participant.getVideoElement();
    userList.push({
			id: name,
			role: 1
		});


		//		app.chatList.push({
		//	        who: name,
		//	        content: "["+name + "] 新增/更新了视频",
		//	        isSelfSend: 0,
		//	        isSystem: 1
		//	      });
    var options = {
			localVideo: video, //本地流应用程序中的视频标记
			mediaConstraints: constraints,
			onicecandidate: participant.onIceCandidate.bind(participant)
		}

		participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
			function(error) {
				if (error) {
					return console.error(error);
				}
				this.generateOffer(participant.offerToReceiveVideo.bind(participant));
			});

		msg.data.forEach(receiveVideo);


	}, 5);
},
onNewParticipant(request) {
	this.receiveVideo(request.name);
},
receiveVideo(sender) {
	var app = this;
	var participant = new Participant(sender);
	participants[sender] = participant;

	setTimeout(function() {

		var video = participant.getVideoElement();
		console.log("///////////////////6");
		console.log(video);

		var options = {
			remoteVideo: video,
			onicecandidate: participant.onIceCandidate.bind(participant)
		}
		//创建新加入的用户点
		participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
			function(error) {
				if (error) {
					return console.error(error);
				}
				this.generateOffer(participant.offerToReceiveVideo.bind(participant));
			});

		userList.push({
			id: sender,
			role: 1
		});

		//		app.chatList.push({
		//	        who: sender,
		//	        content: "["+sender + "] 新增/更新了视频",
		//	        isSelfSend: 0,
		//	        isSystem: 1
		//	      });



	}, 5);

},
onParticipantLeft(request) {
	console.log('Participant ' + request.name + ' left');
	var participant = participants[request.name];
	participant.dispose();
	delete participants[request.name];
},
receiveVideoResponse(result) {
	participants[result.name].rtcPeer.processAnswer(result.sdpAnswer, function(error) {
		if (error) return console.error(error);
	});
},

tipRsp(data) {
	var app = this;
	/*if (data && data.errorCode === 0) {
		app.$root.$refs.toastr.s(data.errorInfo);
	} else {
		app.$root.$refs.toastr.e(data.errorInfo);
		console.error(data)
		if (data.errorCode === 401) {
			app.logout();
		}

	}*/
},
getRoomListRsp(data) {
    var app=this;
	app.roomList = _.filter(data.data.rooms || [], function(item) {
		// return item.info && item.info.title.indexOf("极速模式") != -1;
		return item.info;
	}) || [];

},
getRoomUserRsp(data) {
	var app = this;
	userList = data.data.idlist;
},
chatRsp(data) {
	var app = this
	var msgData = data.data;
	console.log(msgData);


	app.chatList.push({
		who: msgData.fromUser == app.loginInfo.identifier ? '我' : msgData.fromUser,
		content: msgData.content,
		isSelfSend: msgData.fromUser == app.loginInfo.identifier ? 1 : 0,
		isSystem: msgData.isSystem != null
	});



	//$(".chatting-area").scrollTop(100000);


},
viewerResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		console.info('Call not accepted for the following reason: ' + errorMsg);
	} else {
		watchWebRtcPeer.processAnswer(message.sdpAnswer, function(error) {
			if (error) {
				return console.error(error);
			}
		});
	}
},
		}
	}
</script>

<style> 
    .container{
    	padding-top:25px;
    }
	.box_1{
		height: 300px;
		width: 450px;
		border:1px solid; 
		margin-bottom:25px;
	}
	.divider{
		margin: 20px 0 0 0;
	}
</style>






