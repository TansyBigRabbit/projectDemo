<!-- 会议多人聊天室 -->
<template>
	<div class="room"> 
		<el-row class="video_row">
			<!-- 用户列表 -->
			<el-col :span="4">
				<div class="user_box">
	<div class="sidebar"> 
     <h2>用户列表</h2> 
     <div class="sidebar-list-wrap"> 
      <ul class="sidebar-list"> 
       <li v-for="item in userList"> 
        <div class="item-info">  
         <p class="room-id">  
         	<span class="value-txt">{{ item.id }}</span> </p>  
        </div> 

		 <div v-if="item.role == 2" class="item-status label-txt">
        	观众
        </div>
        <div v-else-if="item.role == 1" class="item-status connected"> 连麦中
        </div>
         </li> 
      </ul> 
     </div> 
    </div> 
				</div>
			</el-col>
			<!-- 视频窗口 -->
			<el-col :span="12">
				<div class="vedio_box">
					 <div class="video-panel"> 
       <div class="tips-wrapper"> 
        <div v-for="item in apply_list" class="tips" style="margin-top: 10px;"> 
         <span>用户 {{ item.who }} 申请连麦</span> 
         <button type="button" class="accept-btn" :data-id="item.who" @click="applyAgree">同意</button> 
         <button type="button" class="decline-btn" :data-id="item.who" @click="applyReject">拒绝</button> 
        </div> 
       </div> 
        <!-- 
        <div id="room">
        <div id="participants"></div>
        <input type="button" id="button-leave" onmouseup="leaveRoom();"
          value="Leave room">
      </div>
         -->
        
       <div :class="mode == 'fixed' ? 'video-container p9 fixed' : 'video-container fluid'"> 
        <!--<div :class="'video-container p'+video_list.length">--> 
        <div v-for="item in video_list" :class="item.first ? 'flex-item first' : 'flex-item'" @click="unshiftThis" :data-id="item.videoId"> 
         <video v-if="item.videoId == 'local'" muted :id="item.videoId" class="video-item local-video " autoplay="autoplay" data-videotype="remote"></video> 
         <video v-else :id="item.videoId" class="video-item" autoplay="autoplay" data-videotype="remote"></video> 
         <div id="button-container" > 
           
           <svg @click="toggleFullScreen(item.videoId)" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 1024 1024" :class="open.screen?'off':'on'"> 
           <circle cx="524" cy="524" r="530"> 
            <title>full</title> 
           </circle> 
    
            <path class="off"  id="svg_1" fill="#ffffff" d="m610.99945,368.88964l-211.33222,0c-19.37212,0 -35.22204,15.2417 -35.22204,33.87043l0,203.2226c0,18.62874 15.84992,33.87043 35.22204,33.87043l211.33222,0c19.37212,0 35.22204,-15.2417 35.22204,-33.87043l0,-203.2226c0,-18.62874 -15.84992,-33.87043 -35.22204,-33.87043zm-191.9601,27.09635l40.50534,38.951l22.89432,-22.01578l0,69.43439l-70.44407,0l22.89432,-23.7093l-40.50534,-38.951l24.65543,-23.7093zm63.39967,199.83556l-22.89432,-22.01578l-40.50534,38.951l-24.65543,-23.7093l40.50534,-38.951l-22.89432,-23.7093l70.44407,0l0,69.43439zm109.18831,16.93522l-40.50534,-38.951l-22.89432,22.01578l0,-69.43439l70.44407,0l-22.89432,23.7093l40.50534,38.951l-24.65543,23.7093zm-15.84992,-154.11047l22.89432,22.01578l-70.44407,0l0,-67.74087l22.89432,22.01578l40.50534,-38.951l24.65543,23.7093l-40.50534,38.951z"/>
        <path class="on"  id="svg_1" fill="#ffffff" d="m593.97965,428.11583l-66.47625,67.74963l66.47625,67.74963l26.95303,-27.46932c3.62526,-3.93566 7.99922,-4.81918 13.12187,-2.69071c4.88622,2.16863 7.28993,5.90349 7.28993,11.28491l0,85.50027c0,3.29311 -1.18215,6.18461 -3.54645,8.55404c-2.3643,2.40959 -5.20146,3.61438 -8.39327,3.61438l-83.93267,0c-5.24087,0 -8.94494,-2.53007 -11.07281,-7.63037c-2.12787,-4.97982 -1.26096,-9.35724 2.64014,-13.17242l26.95303,-27.46932l-66.43685,-67.74963l-66.47625,67.74963l26.95303,27.46932c3.86169,3.81518 4.7286,8.15244 2.64014,13.17242c-2.12787,5.1003 -5.79254,7.63037 -11.07281,7.63037l-83.85386,0c-3.23121,0 -6.06837,-1.20479 -8.39327,-3.61438c-2.3643,-2.40959 -3.54645,-5.3011 -3.54645,-8.55404l0,-85.46011c0,-5.34126 2.48252,-9.11628 7.48695,-11.28491c4.88622,-2.16863 9.18137,-1.28511 12.92484,2.69071l26.95303,27.46932l66.43685,-67.78979l-66.51566,-67.74963l-26.95303,27.46932c-2.3643,2.40959 -5.20146,3.61438 -8.39327,3.61438c-1.49739,0 -2.99478,-0.32128 -4.49217,-0.96384c-5.00444,-2.16863 -7.48695,-5.90349 -7.48695,-11.28491l0,-85.41995c0,-3.29311 1.18215,-6.18461 3.54645,-8.55404c2.3643,-2.40959 5.16206,-3.61438 8.39327,-3.61438l83.89327,0c5.24087,0 8.94494,2.53007 11.07281,7.63037c2.12787,4.97982 1.26096,9.35724 -2.64014,13.17242l-26.95303,27.46932l66.47625,67.70947l66.47625,-67.74963l-26.95303,-27.46932c-3.86169,-3.81518 -4.76801,-8.15244 -2.64014,-13.17242c2.12787,-5.1003 5.79254,-7.63037 11.07281,-7.63037l83.89327,0c3.23121,0 6.06837,1.20479 8.39327,3.61438c2.3643,2.40959 3.54645,5.3011 3.54645,8.55404l0,85.50027c0,5.34126 -2.44311,9.11628 -7.28993,11.28491c-1.61561,0.64256 -3.19181,0.96384 -4.6892,0.96384c-3.23121,0 -6.06837,-1.20479 -8.39327,-3.61438l-26.99243,-27.50948z"/>  
          
    
          </svg> 
          
      
          <svg v-if="item.videoId == 'local'" @click="toggleCamera(item.videoId)" xmlns="http://www.w3.org/2000/svg" viewbox="-10 -10 68 68" :class="open.video?'on':'off'"> 
           <circle cx="24" cy="24" r="34"> 
            <title>Mute video</title> 
           </circle> 
           <path class="off" transform="scale(0.6), translate(17,16)" d="M40 8H15.64l8 8H28v4.36l1.13 1.13L36 16v12.36l7.97 7.97L44 36V12c0-2.21-1.79-4-4-4zM4.55 2L2 4.55l4.01 4.01C4.81 9.24 4 10.52 4 12v24c0 2.21 1.79 4 4 4h29.45l4 4L44 41.46 4.55 2zM12 16h1.45L28 30.55V32H12V16z" fill="white" /> 
           <path class="on" transform="scale(0.6), translate(17,16)" d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm-4 24l-8-6.4V32H12V16h16v6.4l8-6.4v16z" fill="white" /> 
          </svg> 
          <svg v-if="item.videoId == 'local'" @click="toggleMic(item.videoId)" xmlns="http://www.w3.org/2000/svg" viewbox="-10 -10 68 68" :class="open.audio?'on':'off'"> 
           <title>title</title> 
           <circle cx="24" cy="24" r="34"> 
            <title>Mute audio</title> 
           </circle> 
           <path class="off" transform="scale(0.6), translate(17,18)" d="M38 22h-3.4c0 1.49-.31 2.87-.87 4.1l2.46 2.46C37.33 26.61 38 24.38 38 22zm-8.03.33c0-.11.03-.22.03-.33V10c0-3.32-2.69-6-6-6s-6 2.68-6 6v.37l11.97 11.96zM8.55 6L6 8.55l12.02 12.02v1.44c0 3.31 2.67 6 5.98 6 .45 0 .88-.06 1.3-.15l3.32 3.32c-1.43.66-3 1.03-4.62 1.03-5.52 0-10.6-4.2-10.6-10.2H10c0 6.83 5.44 12.47 12 13.44V42h4v-6.56c1.81-.27 3.53-.9 5.08-1.81L39.45 42 42 39.46 8.55 6z" fill="white" /> 
           <path class="on" transform="scale(0.6), translate(17,18)" d="M24 28c3.31 0 5.98-2.69 5.98-6L30 10c0-3.32-2.68-6-6-6-3.31 0-6 2.68-6 6v12c0 3.31 2.69 6 6 6zm10.6-6c0 6-5.07 10.2-10.6 10.2-5.52 0-10.6-4.2-10.6-10.2H10c0 6.83 5.44 12.47 12 13.44V42h4v-6.56c6.56-.97 12-6.61 12-13.44h-3.4z" fill="white" /> 
          </svg> 
         </div> 
         <div :id="+'_extinfo'" class="extinfo"> 
          <span class="box"></span> 
          <br>{{ item.videoId | getSrcTinyId }} 
          <br>{{ item.videoId | getOpenId }} 
         </div> 
        </div> 
        <div v-for="item in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]" v-if="item >= video_list.length" class="flex-item"> 
         <video class="video-item" autoplay="autoplay" data-videotype="remote"></video> 
         
        </div> 
       </div> 
      </div> 
	      </div>
			</el-col>
			<!-- 聊天窗口 -->
			<el-col :span="8">
				<div class="chat_box">
					<div class="sub-panel chatroom chat"> 
      <div class="chatting-area"> 
       <ul v-for="item in chatList"> 
        <li v-if="item.isSystem" class="receiver-msg"> 
         <div class="msg-wrap"> 
          <p class="from">系统消息:</p> 
          <p class="msg">{{ item.content }}</p> 
         </div> </li> 
        <li v-else-if="item.isSelfSend" class="sender-msg"> 
         <div class="msg-wrap"> 
          <p class="msg">{{ item.content }}</p> 
          <p class="from">:我</p> 
         </div> </li> 
        <li v-else class="receiver-msg"> 
         <div class="msg-wrap"> 
          <p class="from">{{ item.who }}:</p> 
          <p class="msg">{{ item.content }}</p> 
         </div> </li> 
       </ul> 
      </div> 
      <div class="typing-area"> 
       <!-- <input type="text" class="input-element" v-model="form.msg" placeholder="输入你想要回复的内容"> --> 
       <textarea v-model="form.msg" placeholder="输入你想要回复的内容"></textarea> 
       <el-button @click="handleMsgSend" type="primary" size="small">发送</el-button> 
      </div> 
     </div> 
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>

	export default{
		data(){
			return{
        form: {
      msg: null,
      //username: store.get(PREFIX + "username") || null,
      //password: store.get(PREFIX + "password") || null
    },
    role: this.$route.params.role,
    onMic: 0,
    logined: false,
    view:  0,
    roomList: [],
    userList: [],
    chatList: [],
//    roomUsers: [],
    roomnum: this.$route.params.roonNum,
    loginInfo: null,
    entryType: 'join',
    selToID: null,
    joinRoomModal: false,
    createRoomModal: false,
    modalForm: {
      roomname: null,
      roomnum: null
    },
    applying: false,
    mode: 'fixed',
    video_list: [],
    video_map: {},
    apply_list: [],
    resolution: "auto",
    frameRate: "auto",
    configRole: "ed640",
//    selectWatch:'',
    open: {
      audio: true,
      video: true
    } 
			}
		},
    mounted(){ 
     
    },
    created(){
      //建立websocket链接
    this.initWebsocket()
    },
    beforeDestroy(){ 
      console.log("关闭websocket...");
      ws.close();
     },
		methods:{
   //建立websocket链接   
initWebsocket(){
   var app = this;
            
  if (ws != null && ws.readyState == 1) {
    return;
  } 
  var webSocketUrl = webUrlMain + ILiveSDK.loginInfo.token;
  //var webSocketUrl = "ws://118.24.128.185:8080/webrtc-conference/groupcall?"+ILiveSDK.loginInfo.token
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

      default:
        console.error('Unrecognized message', parsedMessage);
    }
  }
    ws.onopen = function (ev) { 
    console.log("WebSocket连接成功");
    //创建者开启会议
    if(app.role=='LiveMaster'){
      app.createRoom();
    }
    //参与者加入会议
    if(app.role=='LiveGuest'){
      app.joinRoom();
    } 
    } 

    ws.onclose = function(e) {
     console.log(e);
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
    createRoom(){
          var self = this;
          this.createRoomModel = false
          this.entryType = 'create';//进入类型 默认值是join  
          self.roomListFlag=false;
          self.renderRoom();
          self.initWebRTC();
      },
    joinRoom(){
         this.createRoomModel=true;
         this.role = 'LiveGuest';
         this.entryType = 'join';
         this.roomnum = String(e.currentTarget.getAttribute("data-roomnum"));
         //this.roomnum ="信访房间001";
         this.renderRoom();
         this.initWebRTC();
      },
    
    //对话列表清空
    renderRoom(){
    this.chatList = []; 
    },
    //初始化webRtc websocket发送消息
    initWebRTC(){
    name=ILiveSDK.loginInfo.identifier; 
          var message = {
              id : 'joinRoom',
              name : name,//用户名
              room : this.roomnum,//房间号
              
            }
    this.sendMessage(message);
    },
    //发消息
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
      //      mandatory : {
      //        maxWidth : 320,
      //        maxFrameRate : 15,
      //        minFrameRate : 15
      //      }
    }
  };
  //  console.log(name + " registered in room " + room);

  var participant = new app.Participant(name,app);

  participants[name] = participant;

  setTimeout(function() {
    var video = participant.getVideoElement();
    app.userList.push({
      id: name,
      role: 1
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
  this.receiveVideo(request.name);
},
receiveVideo(sender) {
  var app = this;
  var participant = new app.Participant(sender,app);
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

    app.userList.push({
      id: sender,
      role: 1
    });

    //    app.chatList.push({
    //          who: sender,
    //          content: "["+sender + "] 新增/更新了视频",
    //          isSelfSend: 0,
    //          isSystem: 1
    //        });



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
  var app = this;
  var msgData = data.data;
  console.log(msgData);


  app.chatList.push({
    who: msgData.fromUser == ILiveSDK.loginInfo.identifier ? '我' : msgData.fromUser,
    content: msgData.content,
    isSelfSend: msgData.fromUser == ILiveSDK.loginInfo.identifier ? 1 : 0,
    isSystem: msgData.isSystem != null
  });



  //$(".chatting-area").scrollTop(100000);


},
 handleMsgSend: function() {
      var self = this;
      var msgContent = self.form.msg;

      if (!msgContent) {
        return;
      }
      self.form.msg = '';
      
      // 通过websocket发布消息
      self.sendMessage({
        id : 'chat',
        type : 'groupChat',
        roomnum: this.roomnum,
        fromUser : ILiveSDK.loginInfo.identifier,
        content : msgContent
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
//获取房间列表数据
getRoomList: function(opts, succ, err) {

    this.sendMessage({
      "type": 1,
      "token": ILiveSDK.loginInfo.token,
      "index": 0,
      "size": 30,
      id: 'getRoomList'
    });

  },
  //退出房间
  quitRoom:function(){
  var self = this;
  self.roomListFlag=true;
    sendMessage({
        id: 'leaveRoom'
      });
    for (var key in participants) {
        participants[key].dispose();
      }

  }, 
    toggleCamera: function(videoId) {

      var video = document.getElementById(videoId);
      
      if (this.open.video) {
//        video.srcObject.getTracks().forEach(t => t.enabled = !t.enabled);
        video.srcObject.getVideoTracks().forEach(t => t.enabled = !t.enabled);
      } else {
        video.srcObject.getVideoTracks().forEach(t => t.enabled = !t.enabled);
      }
      
      this.open.video = !this.open.video
    },
    toggleFullScreen: function(videoId) {
      
      var isFullscreen=document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen;
      if (isFullscreen) {
        
        //退出全屏,三目运算符
        document.exitFullscreen?document.exitFullscreen():
        document.mozCancelFullScreen?document.mozCancelFullScreen():
        document.webkitExitFullscreen?document.webkitExitFullscreen():'';
         
      } else {
//          var el = document.getElementById("local").parentNode;   
          var el = document.getElementById(videoId);   
          //进入全屏,多重短路表达式
          (el.requestFullscreen&&el.requestFullscreen())||
          (el.mozRequestFullScreen&&el.mozRequestFullScreen())||
          (el.webkitRequestFullscreen&&el.webkitRequestFullscreen())||(el.msRequestFullscreen&&el.msRequestFullscreen());
          
      }
    },
  Participant(name,obj) {
  this.name = name; 
  var rtcPeer;
  var videoId=name+'-video';
  var first=false;

  if (name == ILiveSDK.loginInfo.identifier) {
    videoId='local';
  } 
  if (video_list.length == 0) {
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
    console.log('Invoking SDP offer callback function');
    var msg = {
      id: "receiveVideoFrom",
      sender: name,
      sdpOffer: offerSdp
    };
    this.sendMessage(msg);
  }


  this.onIceCandidate = function(candidate, wp) {
    console.log("Local candidate" + JSON.stringify(candidate));

    var message = {
      id: 'onIceCandidateRoom',
      candidate: candidate,
      name: name
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
    //    container.parentNode.removeChild(container);
    //this.onRemoteStreamRemove(this.name);
  };
}, 

    unshiftThis: function(event) {
      var videoId = $(event.currentTarget).data("id");
      var video_list = this.video_list;
      _.each(video_list, function(item) {
        if (item.first) {
          item.first = false;
        }
        if (item.videoId == videoId) {
          item.first = true;
        }
      });
      this.video_list = video_list;
    },
}
		}
	
</script>
<!-- <style src="../../../assets/css/common.css"></style> -->
<style scoped> 
@import '../../../assets/css/common.css'; 
.room{
  position: relative;
  bottom: 20px;
}
.video_row>.el-col{
padding: 10px;
} 
	.sidebar{
		background: #fff;
		height: 100vh;
		width: 100%;
	}
	.chat_box,.vedio_box,.user_box{
    border: 1px solid;
    height: 100vh
		
	}
   
  .chatting-area {
    position: static; 
    top: 0;
    bottom: 40px;
    width: auto;
    padding: 10px;
    overflow-y: auto;
    box-sizing: border-box;
    height: 70vh;}
    .typing-area {
    position: static; 
    display: table;
    width: 100%;
    height: 50px;
    left: 0;
    bottom: 0;
    padding: 10px;
    height: 30vh;
}
.typing-area textarea{
  width: 100%;
  height: 70%;
}
.typing-area .el-button{
  float: right;
}
</style>