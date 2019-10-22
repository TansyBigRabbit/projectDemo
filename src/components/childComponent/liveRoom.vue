<!-- 学宣--直播间组件 -->
<template>
	<div> 
		<div style="display: flex;justify-content: space-between;">
		<div class="breadcrumb" style="margin-top: 15px">
			  <el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>综治中心系统</el-breadcrumb-item>
			  <el-breadcrumb-item>学宣中心</el-breadcrumb-item> 
			  <el-breadcrumb-item>房间号：{{liveRoomName}}</el-breadcrumb-item> 
			  </el-breadcrumb>
			</div>  
				<el-button type="primary" @click="">离开房间</el-button> 
			</div>
			<el-divider class="divider"></el-divider>
			<div class="live_conbox">
				<div style="flex: 1">
					<el-card>
						<span class="title">用户列表</span>
						<el-divider ></el-divider>
						<ul class="userUl">
							<li v-for="(item,index) in userList">
								<span>{{item.id}}</span>
								<span>{{item.role}}</span>
							</li>
						</ul>
					</el-card>
				</div>
				<div style="flex: 5">
					<el-card style="margin-bottom: 10px">
						<span class="title">主播窗口</span>
						<el-divider ></el-divider>
						<div>
							<video id="masterVideo" class="videoWin" autoplay="autoplay" data-videotype="remote"></video>
						</div>
					</el-card>
					<el-card>
						<span class="title">聊天窗口</span>
						<el-divider ></el-divider>
						<div>
							<div class="chat_box">
					<div class="sub-panel chatroom chat">
						<div class="chatting-area">
							<ul v-for="item in chatList">
								<li v-if="item.isSystem" class="receiver-msg">
									<div class="msg-wrap">
										<p class="from">系统消息:</p>
										<p class="msg">{{ item.content }}</p>
									</div>
								</li>
								<li v-else-if="item.isSelfSend" class="sender-msg">
									<div class="msg-wrap">
										<p class="msg">{{ item.content }}</p>
										<p class="from">:我</p>
									</div>
								</li>
								<li v-else class="receiver-msg">
									<div class="msg-wrap">
										<p class="from">{{ item.who }}:</p>
										<p class="msg">{{ item.content }}</p>
									</div>
								</li>
							</ul>
						</div>
						<div class="typing-area">
							<!-- <input type="text" class="input-element" v-model="form.msg" placeholder="输入你想要回复的内容"> -->
							<el-input
  							type="textarea" v-model="form.msg" placeholder="输入你想要回复的内容"></el-input>
							<el-button class="vedio_btn" @click="handleMsgSend" type="primary" size="small">发送</el-button>
						</div>
					</div>
				</div>
							<!-- <div class="chat_box">
								<ul v-for="item in chatList">
								<li v-if="item.isSystem" class="receiver-msg">
									<div class="msg-wrap">
										<p class="from">系统消息:</p>
										<p class="msg">{{ item.content }}</p>
									</div>
								</li>
								<li v-else-if="item.isSelfSend" class="sender-msg">
									<div class="msg-wrap">
										<p class="msg">{{ item.content }}</p>
										<p class="from">:我</p>
									</div>
								</li>
								<li v-else class="receiver-msg">
									<div class="msg-wrap">
										<p class="from">{{ item.who }}:</p>
										<p class="msg">{{ item.content }}</p>
									</div>
								</li>
							</ul>
							</div>
							<div class="reply_box"></div> -->
						</div>
					</el-card>
				</div>
			</div>
	</div>
</template>

<script>
	var that;
	export default{
		liveRoomName:"",
		props:{
			params01:Object
		},
		data(){
			return{
			//用户列表
            roomList: [],
		    userList: [],
		    chatList: [],
		     video_list: [],
		    resolution: "auto",
            form:{},
            loginInfo: {
		    'sdkAppId': null,
		    'openid': null,
		    'identifier': null,
		    'userSig': null,
		    'identifierNick': null,
		    'headurl': null,
		    'token': null
		  },
			}
		},
		created(){
        that = this;
        console.log("liveRoom onlounch");
        console.log(that.params01);
        if(that.params01.type=="create"){
        	console.log("主播创建房间");
        	that.liveRoomName = that.params01.roomName;
        	that.getToken("create");
        }else{
        	console.log("观众加入");
        	that.liveRoomName = that.params01.roomName;
        	that.getToken("watch");
        }
		},
		watch:{
			'params01.open':function open(){
				if(that.params01.open){
					console.log("liveRoom onlounch"); 
				}
			}
		},
		methods:{
		  getToken(type){
          console.log("getToken");
          var idNum = window.localStorage.getItem("idCard");
          that.$http.get(this.$ports.getToken,{
           idCard:idNum
	        }).then(res=>{ 
	          console.log(res.data);
	          if(res.data.errorCode==0){   
	           //全局变量存储token
	           ILiveSDK.loginInfo.token = res.data.data.token; 
	           name = res.data.data.userName;
	           that.initWebsocket(type); 
	           return;
	        }else{
	          that.$message.error(res.data.msg);
	        }
	        });
		  },
		  //初始化ws
	initWebsocket(type){
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
	var webSocketUrl = webUrlMain+ILiveSDK.loginInfo.token 
	console.log(webSocketUrl)
	ws = new WebSocket(webSocketUrl); 
    ws.onmessage = function(message) {
		
		var parsedMessage = JSON.parse(message.data);
		console.info('Received message: ' + message.data);

		switch (parsedMessage.id) {
			case 'existingParticipants': 
			    console.log("existingParticipants成员:");
			    console.log(parsedMessage);
				app.onExistingParticipants(parsedMessage);
				break;
			//返回的接访者的信息
			case 'interviewJoinUserInfo':
			    app.interviewJoinUserInfo(parsedMessage);
			//
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
			case 'refreshPage':
	        	app.refreshPage();
	        	break;

			default:
				console.error('Unrecognized message', parsedMessage);
		}
	}
		 	ws.onopen = function (ev) { 
		 	console.log("WebSocket连接成功......"); 

	       if(type=="create"){
	       	//主播创建房间
	       	that.createRoom();
	       }else{
	       	//观众观看房间
	       	that.watchRoom();
	       	that.startWatch();
	       } 
	 	 } 

			ws.onclose = function(e) {
		    //app.$root.$refs.toastr.e("连接已中断，请刷新页面！");
			app.$message("视频连接已中断...");
			app.chatList.push({
				who: '系统',
				content: "连接已中断，请刷新页面",
				isSelfSend: 0,
				isSystem: 1
			}); 
	};
 },
     //创建房间
     createRoom(){
     var message = {
		id : 'joinRoom',
		name : name,//用户名 
		type : 'academic',// 
		room:'',
		userId:window.localStorage.getItem("userId"),
		academicType:that.params01.videoType,
		academicName:that.params01.roomName
		}
	 that.sendMessage(message);
     },
     //观看房间
     watchRoom(){
		var message = {
		id : 'watchRoom',
		roomName:that.params01.roomName01,  
		}
	    that.sendMessage(message);
     },
     startWatch() {
	
	 //清除
    if (watchWebRtcPeer) {
		watchWebRtcPeer.dispose();
		watchWebRtcPeer = null;
	}
    
	
	setTimeout(function() {
	    
	 	
	 	var options = {
	 			remoteVideo : document.getElementById('masterVideo')
	 		}
	 		
			watchWebRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
					function(error) {
						if (error) {
							return console.error(error);
						}
						//回调
						this.generateOffer(function(error, offerSdp){
							
							if (error){
								return console.error('Error generating the offer');
							}
							
							console.info('Invoking SDP offer callback function ' + location.host);
							var message = {
								id : 'viewerRoom',
								roomName : that.params01.roomName01,
								username : that.params01.academicUserName,
								sdpOffer : offerSdp
							}
							
							sendMessage(message);
							
							
						});
					});
	 	
	 	
	 },10);
	
},
     initWebRTC: function(did,roleType) {
         //name=ILiveSDK.loginInfo.identifier; 
		      var message = {
		    			id : 'joinRoom',
		    			name : name,//用户名
		    			room : this.roomnum,//房间号
		    			type : roleType,//petitionCreate petitionJoin interviewJoin
		    			departId : did,
		    			sysUserId:window.localStorage.getItem("userId"),
		    			idCardList:this.$route.params.idCardList
		    		}
		      this.sendMessage(message);
       },
       //返回的接访者信息
	interviewJoinUserInfo(data){
    console.log("返回的接访者信息");
    console.log(data);
    if(data.interviewJoinUserInfoList.length>0){
      this.interviewList = data.interviewJoinUserInfoList;
    }
	},
       onExistingParticipants(msg) {
    var app = this;
	var defaultSetting = {
		maxWidth: 320,
		maxHeight: 240,
		maxFrameRate: 20,
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

	var participant = new app.Participant(name,app);

	participants[name] = participant;

	setTimeout(function() {
    var video = participant.getVideoElement();
    userList.push({
			id: name,
			role: 1
		});


				app.chatList.push({
			        who: name,
			        content: "["+name + "] 新增/更新了视频",
			        isSelfSend: 0,
			        isSystem: 1
			      });
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

		msg.data.forEach(app.receiveVideo);


	}, 5);
},
onNewParticipant(request) {
	this.$message.info(request.name+"进入房间");
	this.receiveVideo(request.name);

},
receiveVideo(sender) {
	var app = this;
	var participant = new app.Participant(sender,app);
	participants[sender] = participant;

	setTimeout(function() {

		var video = participant.getVideoElement();
		console.log("///////////////////6"); 

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

				app.chatList.push({
			        who: sender,
			        content: "["+sender + "] 新增/更新了视频",
			        isSelfSend: 0,
			        isSystem: 1
			      });



	}, 5); 

},
onParticipantLeft(request) {
	console.log('成员 ' + request.name + ' 离开');
	this.$message.info(request.name+"离开房间");
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
	console.log("tipRsp");
	console.log(data);
	if(data.errorCode==500){ 
		this.hasRoom = false;
	}
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
	/*app.roomList = _.filter(data.data.rooms || [], function(item) {
		// return item.info && item.info.title.indexOf("极速模式") != -1;
		return item.info;
	}) || [];*/
	app.roomList = data.data.rooms;
	this.hasRoom = true

},
getRoomUserRsp(data) {
	var app = this;
	userList = data.data.idlist;
},
chatRsp(data) {
	var app = this
	var msgData = data.data; 
	console.log("chatRsp!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log(msgData)
    if(msgData.id){
    	if(msgData.id=="interviewJoinUserInfo"){
    		this.interviewList = msgData.interviewJoinUserInfoList;
    	}
    }
	app.chatList.push({
		who: msgData.fromUser == app.loginInfo.identifier ? '我' : msgData.fromUser,
		content: msgData.content,
		isSelfSend: msgData.fromUser == app.loginInfo.identifier ? 1 : 0,
		isSystem: msgData.isSystem != null
	});
  
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
        //退出房间
	  quitRoom:function(e){ 
	  	var self = this;
	  	console.log("关闭信访")
	  	self.paramsObj={open:false,showDialog:false}
	    
	    window.clearInterval(self.myContent); 
		//self.roomListFlag=true;
	    sendMessage({
	        id: 'leaveRoom',
	        type:'interviewFinish',
	        petitionType:e
	      });
	    for (var key in participants) {
	        participants[key].dispose();
	      }
	   //window.location.reload();
	  },
	  refreshPage(){
	  this.$router.push({
	      name:'home' 
	    });
	  },
       //
       sendMessage(message) {
			var jsonMessage = JSON.stringify(message);
			if (ws == null || ws.readyState != 1) {
				return;
			}
			console.log('Senging message: ' + jsonMessage);
			ws.send(jsonMessage);
		},
		//
          handleMsgSend(){

          },
        Participant(senderName,obj) {
		console.log("创建成员姓名:"+senderName);
		this.name = name; 
		var rtcPeer; 
		var first = false;
	    //var videoId = senderName + '-video'; 
	    var videoId = "masterVideo";
		// if(name == senderName) {
		// videoId = 'local';
		// }
		// if (senderName == name) {
		// 	videoId = 'creator';
		// }else{
	   //        videoId = 'participant';
		// }

		if (obj.video_list.length == 0) {
			first = true;
		}

		obj.video_list.push({
			videoId: videoId,
			openId: videoId,
			first: first
		});



		this.getElement = function() {
			//视频ID
			return container; //vue.JS中写的 container=document.createElement('div')
		}

		this.getVideoElement = function() {
			var videoObj = document.getElementById(videoId)
			if (videoId == 'local') {
				videoObj.muted = true //播放时静音
			}

			return videoObj;
		}



		this.offerToReceiveVideo = function(error, offerSdp, wp) {
			if (error) return console.error("sdp offer error")
			//console.log('Invoking SDP offer callback function');
			var msg = {
				id: "receiveVideoFrom",
				sender: senderName,
				sdpOffer: offerSdp
			};
			this.sendMessage(msg);
		}


		this.onIceCandidate = function(candidate, wp) {
			//console.log("Local candidate" + JSON.stringify(candidate));

			var message = {
				id: 'onIceCandidateRoom',
				candidate: candidate,
				name: senderName
			};
			this.sendMessage(message);
		}

		Object.defineProperty(this, 'rtcPeer', {
			writable: true
		});
	    this.sendMessage=function(message) {
		var jsonMessage = JSON.stringify(message);
		if (ws == null || ws.readyState != 1) {
			return;
		}
		console.log('Senging message: ' + jsonMessage);
		ws.send(jsonMessage);

	    }
		this.dispose = function() {
			console.log('Disposing participant ' + this.name);
			this.rtcPeer.dispose();
			//		container.parentNode.removeChild(container);
			//this.onRemoteStreamRemove(this.name);
		};
	},
		}
	}
</script>
<style>
@import '../../assets/css/common.css';
	.el-divider{
		margin: 15px 0 0 0;
	}
	.live_conbox{
		display: flex;
	}
	.live_conbox>div{
		padding: 10px 10px 10px 0; 
		box-sizing: border-box;
	}
	.userUl{
		list-style: none;
		padding: 0;
	}
	.userUl>li{
		display: flex;
		justify-content: space-between;
		padding: 5px 0;
	}
	.title{
		padding: 10px 0;
		font-weight: bold;
	}
	.chatting-area{
       position: static;
	}
	.chatting-area li.receiver-msg .msg-wrap p {
    font-size: 16px;
    color: #000;
    }
    .chatting-area li.sender-msg .msg-wrap p{
    	font-size: 16px
    }
    .typing-area{
    	position: static;
    }
    .videoWin{
    	height: 300px;
    	width: 400px;
    }
    .chatting-area .msg-wrap {
    position: relative;
    max-width: 100%;
    }
</style>