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
			          <el-button v-if='item.info.memsize<6' type="text" @click="joinRoom(item.info.roomnum)">加入房间</el-button>
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
  <el-breadcrumb-item>房间号:{{roomnum}}</el-breadcrumb-item> 
  
  </el-breadcrumb> 
</div> 
		<el-row class="container">
			<el-col :span="13">
				<div class="boxFlex">
					<div v-for="item in video_list" :class="'boxItem'+(item.first ? ' flex-item first' : ' flex-item')" @click="unshiftThis" :data-id="item.videoId">
								<video v-if="item.videoId == 'local'" muted :id="item.videoId" class="video-item local-video " autoplay="autoplay" data-videotype="remote"></video>
								<video v-else :id="item.videoId" class="video-item" autoplay="autoplay" data-videotype="remote"></video>
								<div id="button-container">

									<svg @click="toggleFullScreen(item.videoId)" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 1024 1024" :class="open.screen?'off':'on'">
										<circle cx="524" cy="524" r="530">
											<title>full</title>
										</circle>

										<path class="off" id="svg_1" fill="#ffffff" d="m610.99945,368.88964l-211.33222,0c-19.37212,0 -35.22204,15.2417 -35.22204,33.87043l0,203.2226c0,18.62874 15.84992,33.87043 35.22204,33.87043l211.33222,0c19.37212,0 35.22204,-15.2417 35.22204,-33.87043l0,-203.2226c0,-18.62874 -15.84992,-33.87043 -35.22204,-33.87043zm-191.9601,27.09635l40.50534,38.951l22.89432,-22.01578l0,69.43439l-70.44407,0l22.89432,-23.7093l-40.50534,-38.951l24.65543,-23.7093zm63.39967,199.83556l-22.89432,-22.01578l-40.50534,38.951l-24.65543,-23.7093l40.50534,-38.951l-22.89432,-23.7093l70.44407,0l0,69.43439zm109.18831,16.93522l-40.50534,-38.951l-22.89432,22.01578l0,-69.43439l70.44407,0l-22.89432,23.7093l40.50534,38.951l-24.65543,23.7093zm-15.84992,-154.11047l22.89432,22.01578l-70.44407,0l0,-67.74087l22.89432,22.01578l40.50534,-38.951l24.65543,23.7093l-40.50534,38.951z" />
										<path class="on" id="svg_1" fill="#ffffff" d="m593.97965,428.11583l-66.47625,67.74963l66.47625,67.74963l26.95303,-27.46932c3.62526,-3.93566 7.99922,-4.81918 13.12187,-2.69071c4.88622,2.16863 7.28993,5.90349 7.28993,11.28491l0,85.50027c0,3.29311 -1.18215,6.18461 -3.54645,8.55404c-2.3643,2.40959 -5.20146,3.61438 -8.39327,3.61438l-83.93267,0c-5.24087,0 -8.94494,-2.53007 -11.07281,-7.63037c-2.12787,-4.97982 -1.26096,-9.35724 2.64014,-13.17242l26.95303,-27.46932l-66.43685,-67.74963l-66.47625,67.74963l26.95303,27.46932c3.86169,3.81518 4.7286,8.15244 2.64014,13.17242c-2.12787,5.1003 -5.79254,7.63037 -11.07281,7.63037l-83.85386,0c-3.23121,0 -6.06837,-1.20479 -8.39327,-3.61438c-2.3643,-2.40959 -3.54645,-5.3011 -3.54645,-8.55404l0,-85.46011c0,-5.34126 2.48252,-9.11628 7.48695,-11.28491c4.88622,-2.16863 9.18137,-1.28511 12.92484,2.69071l26.95303,27.46932l66.43685,-67.78979l-66.51566,-67.74963l-26.95303,27.46932c-2.3643,2.40959 -5.20146,3.61438 -8.39327,3.61438c-1.49739,0 -2.99478,-0.32128 -4.49217,-0.96384c-5.00444,-2.16863 -7.48695,-5.90349 -7.48695,-11.28491l0,-85.41995c0,-3.29311 1.18215,-6.18461 3.54645,-8.55404c2.3643,-2.40959 5.16206,-3.61438 8.39327,-3.61438l83.89327,0c5.24087,0 8.94494,2.53007 11.07281,7.63037c2.12787,4.97982 1.26096,9.35724 -2.64014,13.17242l-26.95303,27.46932l66.47625,67.70947l66.47625,-67.74963l-26.95303,-27.46932c-3.86169,-3.81518 -4.76801,-8.15244 -2.64014,-13.17242c2.12787,-5.1003 5.79254,-7.63037 11.07281,-7.63037l83.89327,0c3.23121,0 6.06837,1.20479 8.39327,3.61438c2.3643,2.40959 3.54645,5.3011 3.54645,8.55404l0,85.50027c0,5.34126 -2.44311,9.11628 -7.28993,11.28491c-1.61561,0.64256 -3.19181,0.96384 -4.6892,0.96384c-3.23121,0 -6.06837,-1.20479 -8.39327,-3.61438l-26.99243,-27.50948z" />

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
									<br>{{ item.videoId }}
									<br>{{ item.videoId }}
								</div>
							</div>
							<div v-for="item in [0,1,2,3,4,5]" v-if="item >= video_list.length" class="flex-item boxItem">
								<video class="video-item" autoplay="autoplay" data-videotype="remote"></video>

							</div>
				</div>
				<!-- <div class="box_1"> 
					<video class="vedioBox" id="creator" autoplay="autoplay" data-videotype="remote"></video> 
				</div>
				<div class="box_1">
					<video class="vedioBox" id="participant" autoplay="autoplay" data-videotype="remote"></video> 
				</div> -->
			</el-col> 
			<el-col :span="7" style="margin-left: 5vw">
				<div>
					<!-- <el-row class="infoList">
						<p>房间信息：</p> 
						<el-col :span="12">
							房间号：<span>{{roomInfo.number}}</span>
						</el-col>
						<el-col :span="12">
							接访时间：<span id="mytime">{{roomInfo.startTime}}</span>
						</el-col> 
					</el-row>
					 <el-divider class="divider"></el-divider> -->
				     <el-row class="infoList">
						<p class="userTitle">上访人员信息</p>
						<div style="display: flex;">
							<div style="flex: 1">
							<img :src="petition.picturePath">	
							</div>
							<div style="flex: 2;display: flex;flex-direction: column;justify-content: space-around;">
								<span>姓名：{{petition.userName}}</span>
								<span>身份证号：{{petition.idCard}}</span>
							</div>
						</div>
					</el-row>
					 <el-divider class="divider"></el-divider>
					<el-row class="infoList">
						<p class="userTitle">接访访人员信息</p>
						<ul class="interviewList">
						 <li style="display: flex;justify-content: space-between;" v-for="item in interviewList">
						 	<span style="flex: 2">姓名：{{item.userName}}</span>
						 	<span style="flex: 2">工号：{{item.userId}}</span>
						 	<span style="flex: 1"></span>
						 </li>
						</ul>
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
		    //上访者
		    petition:{
         
		    },
		    //接访者列表
		    interviewList:[
		    {
             userName:"1111",
             userId:123
		    },
		    ]
		     
            
    ///////////////////////////////////////////////////////////////////////  
			}
		},
		created(){   
			//接访者
	 	if(this.pageToData.pageToRole!='petitionJoin'&&this.pageToData.pageToRole!='petitionCreate'){
	 		console.log("接访者加入...");
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
        //0924 查询上访者基本信息（照片 部门 姓名）
        getPetitionInfo(idNum){
        var _this = this;
        _this.$http.get(_this.$ports.userinfoextend.list,{
        	pageNum:1,
        	size:5,
        	idCard:idNum
        }).then(res=>{
        	console.log("查询上访者的基本信息");
        	if(res.data.code==0){
            console.log(res.data.data);
            _this.petition = res.data.data[0];
        	}else{
        	_this.$message.error("上访者信息查询失败！")
        	}
        })
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
      //this.renderRoom();
      //查询上访者信息
	  this.getPetitionInfo(this.$route.params.idCardList[0]);
      this.initWebRTC(this.pageToData.departId,"petitionJoin"); 
    },
    createRoom(){ 
      this.createRoomModel = false
	  this.entryType = 'create';//进入类型 默认值是join
	  this.role = 'LiveMaster';//主播 
	  this.roomListFlag=false; 
	  //self.renderRoom();
	  //查询上访者信息
	  this.getPetitionInfo(this.$route.params.idCardList[0]);
	  this.initWebRTC(this.pageToData.departId,"petitionCreate");

        },
       //初始化会议界面
		    renderRoom: function() {
		      this.view = 2;
		      this.chatList = []; 

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
    //初始化websocket
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
			    console.log("existingParticipants成员:");
			    console.log(parsedMessage);
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
	 		console.log("上访者创建房间")
			app.createRoom();
			//上访者异常退出加入房间
         }else if(app.pageToData.pageToRole=='petitionJoin'){
         	console.log("上访者异常退出加入房间")
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

	var participant = new app.Participant(name,app);

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
Participant(senderName,obj) {
	console.log("创建成员姓名:"+senderName);
	this.name = name; 
	var rtcPeer; 
	var first = false;
    var videoId = senderName + '-video'; 
    
	if(name == senderName) {
	videoId = 'local';
	}
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

			toggleCamera: function(videoId) {

				var video = document.getElementById(videoId);

				if(this.open.video) {

					//        video.srcObject.getTracks().forEach(t => t.enabled = !t.enabled);
					video.srcObject.getVideoTracks().forEach(t => t.enabled = !t.enabled);
				} else {
					video.srcObject.getVideoTracks().forEach(t => t.enabled = !t.enabled);
				}

				this.open.video = !this.open.video
			},
			toggleFullScreen: function(videoId) {

				var isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
				if(isFullscreen) {

					//退出全屏,三目运算符
					document.exitFullscreen ? document.exitFullscreen() :
						document.mozCancelFullScreen ? document.mozCancelFullScreen() :
						document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';

				} else {
					//          var el = document.getElementById("local").parentNode;   
					var el = document.getElementById(videoId);
					//进入全屏,多重短路表达式
					(el.requestFullscreen && el.requestFullscreen()) ||
					(el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
					(el.webkitRequestFullscreen && el.webkitRequestFullscreen()) || (el.msRequestFullscreen && el.msRequestFullscreen());

				}
			},
			toggleMic: function(videoId) {

				console.log(this.videoId);

				var video = document.getElementById(videoId);

				if(this.open.audio) {
					//        document.getElementById(videoId).muted = true;
					video.srcObject.getAudioTracks().forEach(t => t.enabled = !t.enabled);
				} else {
					//        document.getElementById(videoId).muted = false;
					video.srcObject.getAudioTracks().forEach(t => t.enabled = !t.enabled);
				}

				this.open.audio = !this.open.audio
			},
			unshiftThis: function(event) {
				var videoId = $(event.currentTarget).data("id");
				var video_list = this.video_list;
				$.each(video_list, function(item) {
					if(item.first) {
						item.first = false;
					}
					if(item.videoId == videoId) {
						item.first = true;
					}
				});
				this.video_list = video_list;
			},
		}
	}
</script>

<style> 

@import '../../assets/css/common.css';
/*覆盖*/
	.container {
    position: static;
    left: 0;
    top: 60px;
    right: 0;
    bottom: 0;
    background-color: #fff;
   }
    /**/
	.room {
		position: relative;
		bottom: 20px;
	}
	
	.video_row>.el-col {
		padding: 10px;
	}
	
	.sidebar {
		background: #fff;
		height: 100vh;
		width: 100%;
	}
	
	.chat_box,
	.vedio_box,
	.user_box {
		height: 100vh;
		border: 1px solid #EBEEF5;
		background-color: #FFF;
		color: #303133;
		-webkit-transition: .3s;
		transition: .3s;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
	}
	
	.chatting-area {
		position: static;
		top: 0;
		bottom: 40px;
		width: auto;
		padding: 10px;
		overflow-y: auto;
		box-sizing: border-box;
		height: 70vh;
	}
	
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
	
	.typing-area textarea {
		width: 100%;
		height: 70%;
	}
	
	.typing-area .el-button {
		float: right;
	}
	
	.vedioCard {
		height: 100vh;
	}
	
	.fixed .video-item {
		background: #333333;
	}
	
	.vedio_btn {
		padding: 10px;
		margin: auto;
		border: none;
	}
	/**/
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

	.boxFlex{ 
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: flex-start;
		height: 100vh; 
	}
	.boxItem{
		height: 30vh;
		width: calc(50% - 2px); 
		box-sizing: border-box;
		margin-bottom: 5px;
		background-color: #ddd;
		border-radius: 10px;
	}
	.userTitle{
		font-size: 18px;
		padding: 15px 0;
		color: #1890F5;
		font-weight: bold;
	}
</style>






