<template>
	<div >  
	 <div v-if="roomListFlag">
	 	<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>信访中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>房间列表</el-breadcrumb-item> 
  </el-breadcrumb>
</div> 
		<div> 
			<h3>信访房间列表</h3>
		</div>
		<el-divider class="divider"></el-divider>
		<!-- <el-button type="primary" style="width: 150px" @click="createRoomModel=true">创建房间</el-button> -->
        <div>
			<el-row style="padding-top: 15px;">
				<el-col v-if="roomList.length>0" v-for="(item,index) in roomList" :data-roomnum="item.info.roomnum" :key="index" class="margin_r" :span="5">
				 <el-card :body-style="{ padding: '5px' }">
			      <img :src="imgUrl" class="image">
			      <div style="padding: 14px;">
			        <span>{{item.info.roomnum}}</span>
			        <div class="bottom clearfix">
			          <el-button v-if='item.info.memsize<2' type="text" @click="joinRoom(item.info.roomnum)">加入房间</el-button>
			          <span v-else>房间满员，无法加入</span>
			        </div>
			      </div>
			    </el-card>	
				</el-col>  
				<el-card v-else class="letterCard">
					暂无信访房间!
				</el-card>  
			</el-row>
		</div>
	</div>
		<div v-else>
		<!-- <el-button type="primary" style="width: 150px" @click="quitRoom">退出房间</el-button> -->
		<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>信访中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>信访视频房间</el-breadcrumb-item> 
  </el-breadcrumb>
</div> 
		<el-row class="container">
			<el-col :span="9">
				<div class="box_1">
					<!-- v-if="item.videoId == 'local'" muted :id="item.videoId"  -->
					<video class="vedioBox" id="creator" autoplay="autoplay" data-videotype="remote"></video> 
				</div>
				<div class="box_1">
					<video class="vedioBox" id="participant" autoplay="autoplay" data-videotype="remote"></video> 
				</div>
			</el-col> 
			<el-col :span="11" style="margin-left: 5vw">
				<div>
					<el-row class="infoList">
						<p>房间信息：</p>
						<el-col :span="12">
							房间号：<span>{{roomInfo.number}}</span>
						</el-col>
						<el-col :span="12">
							接访时间：<span id="mytime">{{roomInfo.startTime}}</span>
						</el-col> 
					</el-row>
					 <el-divider class="divider"></el-divider>
				     <el-row class="infoList">
						<p>上访人员信息：</p>
						<el-col :span="6">
							姓名：<span>{{interview.name}}</span>
						</el-col>
						<el-col :span="6">
							性别：<span>{{interview.sex}}</span>
						</el-col>
						<el-col :span="12">
							身份证号：<span>{{interview.idNum}}</span>
						</el-col>
					</el-row>
					 <el-divider class="divider"></el-divider>
					<el-row class="infoList">
						<p>接访访人员信息：</p>
						<el-col :span="12">
							姓名：<span>{{petition.name}}</span>
						</el-col>
						<el-col :span="12">
							工号：<span>{{petition.workNum}}</span>
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
					  placeholder="请记录上访内容"
					  v-model="submitConInfo.content"
					  style="margin:30px 0" >
					</el-input>
					<div style=" width:80%;margin: 0 auto">
					 <el-button type="primary" @click="submitContent(1)" style="width: 150px">提交</el-button>
					 <el-button type="primary" @click="quitRoom" style="width: 150px">结束上访</el-button>
				    </div>
				</div> 
			</el-col>
        </el-row>
        
       </div> 
   </div>
</template>

<script>
	export default{
		data(){
			return{ 
			//默认页面是房间列表
			  roomListFlag:true,
			  imgUrl:require('../../assets/images/room_bg.png'),
              isRole:true,
              //接访者记录的信息
              submitConInfo:{
              content:'',
              idCard:'',
              roomId:'',
              petitionDuration:0,
              type:1,
              },
               myTime:'',
               myContent:'',
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
		    roomnum: '',
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
		    createRoomModel: false,
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
		    }, 
		    //从上访页面传来的数据 角色类型、部门ID
		    pageToData:{
		    	pageToRole:this.$route.params.roleType,
		    	pageToDepart:this.$route.params.departId,
		    	pageToRoom:this.$route.params.roomNum,
		    	departId:this.$route.params.departId,
		    },
		    //接访者信息
		    petition:{

		    },
		    //上访者信息
		    interview:{

		    },
			roomInfo:{
				
			}

    ///////////////////////////////////////////////////////////////////////  
			}
		},
		created(){   
			//接访者
	 	if(this.pageToData.pageToRole!='petitionJoin'&&this.pageToData.pageToRole!='petitionCreate'){
			this.roomListFlag=true;
			this.isRole=true;
			//获取自身token 
			var _this = this;
			this.pageToData.pageToRole="petition";
			console.log("获取接访者的token并且初始化websocket......");
            this.getToken(loginInfoMain.idCard); 

        //上访者异常退出加入房间
        /*}else if(this.pageToData.pageToRole=='petitionJoin'){
            this.isRole=false;
        	this.roomListFlag=false;
        */
        }else{
        	this.isRole=false;
        	this.roomListFlag=false;
        	this.initWebsocket();  
        }
		
        },
		mounted(){  
	    }, 
		beforeDestroy(){
           // clearInterval(this.myTime); 
        //if (ws.readyState == 1) 
            console.log("关闭websocket...");
			ws.close();
		
		}, 
		methods:{

			two_char:function(n) {
            return n >= 10 ? n : "0" + n;
            },
        	time_fun:function(){
        	var app = this;
            var sec=0;
             app.myTime = window.setInterval(function () {
                sec++;
                var date = new Date(0, 0)
                date.setSeconds(sec);
                var h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
                document.getElementById("mytime").innerText = app.two_char(h) + ":" + app.two_char(m) + ":" + app.two_char(s);
            }, 1000);
        },
        //提交记录内容
        submitContent(p){
        var _this = this;
        //_this.submitConInfo.timePeriod = $("#mytime").text();
        this.$http.post(this.$ports.submitContent,
         _this.submitConInfo
        ).then(res=>{
          console.log("提交接访的上访记录......");
          console.log(res.data);
          if(res.data.code==0){   
            if(p==1){
            	_this.$message({
		          message: "保存成功!",
		          type: 'success'
		        }); 
            } else{
            	console.log("定时任务，保存上访记录......");
            }
        }else{
          _this.$message.error(res.data.msg);
        }
        });
          
        }, 
    joinRoom: function(roomNum) { 
      var app = this;
      this.role = 'LiveGuest';
      this.entryType = 'join';
      this.roomnum = roomNum;
      //
      this.submitConInfo.roomId = roomNum;
      this.submitConInfo.idCard = loginInfoMain.idCard;
      //
      this.roomListFlag=false;
      this.renderRoom();
      this.initWebRTC(loginInfoMain.depart.departId,"interviewJoin"); 
      //开启计时器，开始定时任务
      //this.time_fun();
      app.myContent = window.setInterval(function () {
                app.submitContent();
            }, 60000);
    },
    petitionJoinRoom(){
      this.roomnum = this.pageToData.pageToRoom; 
      this.roomListFlag=false;
      this.renderRoom();
      this.initWebRTC(this.pageToData.departId,"petitionJoin"); 
    },
    createRoom(){
      var self = this;
      this.createRoomModel = false
	  this.entryType = 'create';//进入类型 默认值是join
	  this.role = 'LiveMaster';//主播
		 //输入框中输入的值
		 //self.roomnum ="信访房间001";
	  self.roomListFlag=false;
	  self.renderRoom();
	  self.initWebRTC(this.pageToData.departId,"petitionCreate");

        },
       //初始化会议界面
		    renderRoom: function() {
		      this.view = 2;
		      this.chatList = []; 

		    },
       //初始化websocket
       initWebRTC: function(did,roleType) {
         //name=ILiveSDK.loginInfo.identifier; 
		      var message = {
		    			id : 'joinRoom',
		    			name : name,//用户名
		    			room : this.roomnum,//房间号
		    			type : roleType,
		    			departId : did,
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

	//var webSocketUrl = wsProtocol + "://" + url + '/webrtc-conference/groupcall?' + ILiveSDK.loginInfo.token; 
	/*var webSocketUrl = "ws://118.24.128.185:8080/webrtc_conference_war/groupcall?"+ILiveSDK.loginInfo.token*/
	//"ws:192.168.1.153:8080/threeCentreProject/groupcall?"
	var webSocketUrl = webUrlMain+ILiveSDK.loginInfo.token 
	console.log(webSocketUrl)
	ws = new WebSocket(webSocketUrl); 
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
			case 'refreshPage':
	        	app.refreshPage();
	        	break;

			default:
				console.error('Unrecognized message', parsedMessage);
		}
	}
	 	ws.onopen = function (ev) { 
	 	console.log("WebSocket连接成功......"); 

	   //如果是上访者->创建房间
	 	if(app.pageToData.pageToRole=='petitionCreate'){ 
			app.createRoom();
			//上访者异常退出加入房间
         }else if(app.pageToData.pageToRole=='petitionJoin'){
            app.petitionJoinRoom();
         }else{//如果是接访者->获取房间列表 
         	 app.getRoomList();	
         }
	 	
       } 

			ws.onclose = function(e) {
				console.log(e);
		//app.$root.$refs.toastr.e("连接已中断，请刷新页面！");
			app.$message("视频连接已中断...");
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

	var participant = new app.Participant(name);

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

		msg.data.forEach(app.receiveVideo);


	}, 5);
},
onNewParticipant(request) {
	this.receiveVideo(request.name);
},
receiveVideo(sender) {
	var app = this;
	var participant = new app.Participant(sender);
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
	/*app.roomList = _.filter(data.data.rooms || [], function(item) {
		// return item.info && item.info.title.indexOf("极速模式") != -1;
		return item.info;
	}) || [];*/
	app.roomList = data.data.rooms;

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
//获取房间列表数据
getRoomList: function(opts, succ, err) {

    this.sendMessage({
      "type": 'petition',
      "departId":loginInfoMain.depart.departId,
      "token": ILiveSDK.loginInfo.token,
      "index": 0,
      "size": 30,
      id: 'getRoomList'
    });

  },
  //退出房间
  quitRoom:function(){
    var self = this;
    clearInterval(this.myContent); 
	self.roomListFlag=true;
    sendMessage({
        id: 'leaveRoom',
        type:'petition',
      });
    for (var key in participants) {
        participants[key].dispose();
      }

  },
  refreshPage(){
  this.$router.push({
      name:'home' 
    });
  },
  //获取对应token并且初始化websocket
  getToken(idNum){
  	var _this = this;
  	 this.$http.get(this.$ports.getToken,{
           idCard:idNum
        }).then(res=>{ 
          console.log(res.data);
          if(res.data.errorCode==0){   
           //全局变量存储token
           ILiveSDK.loginInfo.token = res.data.data.token; 
           name = res.data.data.userName;
           _this.initWebsocket(); 
           return;
        }else{
          _this.$message.error(res.data.msg);
        }
        });
  },
Participant(senderName) {
	this.name = name; 
	var rtcPeer;


	var videoId = '';
	var first = false;

	if (senderName == name) {
		videoId = 'creator';
	}else{
        videoId = 'participant';
	}

	if (video_list.length == 0) {
		first = true;
	}

	video_list.push({
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
		console.log('Invoking SDP offer callback function');
		var msg = {
			id: "receiveVideoFrom",
			sender: senderName,
			sdpOffer: offerSdp
		};
		this.sendMessage(msg);
	}


	this.onIceCandidate = function(candidate, wp) {
		console.log("Local candidate" + JSON.stringify(candidate));

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
 .letterCard{
 	margin-top: 30px; 
 }
 .margin_r{
    margin-right: 25px;
    margin-bottom: 25px;
   	}
	 .bottom { 
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
    .container{
    	padding-top:25px;
    	overflow: hidden;
    	height: 100vh;
    }
    .container>div{
    	height: 80vh
    }
	.box_1{
		height: 50%;
		width: 100%;
		border:1px solid; 
		margin-bottom:25px;
	}
	.divider{
		margin: 20px 0 0 0;
	}
	.vedioBox{
		width: 100%;
		height: 100%;
	}
</style>






