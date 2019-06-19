<!-- 会议多人聊天室 -->
<template>
	<div> 
		<el-row>
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
        <!-- 
        <div id="room">
				<div id="participants"></div>
				<input type="button" id="button-leave" onmouseup="leaveRoom();"
					value="Leave room">
			</div>
         -->
        
       <div :class="mode == 'fixed' ? 'video-container p9 fixed' : 'video-container fluid'"> 
        <!--<div :class="'video-container p'+video_list.length">--> 
        <div v-for="item in video_list"  class="flex-item flex-watch-item"   :data-id="item.videoId"> 
         <video v-if="item.videoId == 'watchVideo'"  id="watchVideo"     class="video-item local-video " autoplay="autoplay" data-videotype="remote"></video> 
         <div id="button-container" > 
           
           <svg @click="toggleFullScreen(item.videoId)" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 1024 1024" :class="open.screen?'off':'on'"> 
           <circle cx="524" cy="524" r="530"> 
            <title>full</title> 
           </circle> 
      	    <path class="off"  id="svg_1" fill="#ffffff" d="m610.99945,368.88964l-211.33222,0c-19.37212,0 -35.22204,15.2417 -35.22204,33.87043l0,203.2226c0,18.62874 15.84992,33.87043 35.22204,33.87043l211.33222,0c19.37212,0 35.22204,-15.2417 35.22204,-33.87043l0,-203.2226c0,-18.62874 -15.84992,-33.87043 -35.22204,-33.87043zm-191.9601,27.09635l40.50534,38.951l22.89432,-22.01578l0,69.43439l-70.44407,0l22.89432,-23.7093l-40.50534,-38.951l24.65543,-23.7093zm63.39967,199.83556l-22.89432,-22.01578l-40.50534,38.951l-24.65543,-23.7093l40.50534,-38.951l-22.89432,-23.7093l70.44407,0l0,69.43439zm109.18831,16.93522l-40.50534,-38.951l-22.89432,22.01578l0,-69.43439l70.44407,0l-22.89432,23.7093l40.50534,38.951l-24.65543,23.7093zm-15.84992,-154.11047l22.89432,22.01578l-70.44407,0l0,-67.74087l22.89432,22.01578l40.50534,-38.951l24.65543,23.7093l-40.50534,38.951z"/>
     		<path class="on"  id="svg_1" fill="#ffffff" d="m593.97965,428.11583l-66.47625,67.74963l66.47625,67.74963l26.95303,-27.46932c3.62526,-3.93566 7.99922,-4.81918 13.12187,-2.69071c4.88622,2.16863 7.28993,5.90349 7.28993,11.28491l0,85.50027c0,3.29311 -1.18215,6.18461 -3.54645,8.55404c-2.3643,2.40959 -5.20146,3.61438 -8.39327,3.61438l-83.93267,0c-5.24087,0 -8.94494,-2.53007 -11.07281,-7.63037c-2.12787,-4.97982 -1.26096,-9.35724 2.64014,-13.17242l26.95303,-27.46932l-66.43685,-67.74963l-66.47625,67.74963l26.95303,27.46932c3.86169,3.81518 4.7286,8.15244 2.64014,13.17242c-2.12787,5.1003 -5.79254,7.63037 -11.07281,7.63037l-83.85386,0c-3.23121,0 -6.06837,-1.20479 -8.39327,-3.61438c-2.3643,-2.40959 -3.54645,-5.3011 -3.54645,-8.55404l0,-85.46011c0,-5.34126 2.48252,-9.11628 7.48695,-11.28491c4.88622,-2.16863 9.18137,-1.28511 12.92484,2.69071l26.95303,27.46932l66.43685,-67.78979l-66.51566,-67.74963l-26.95303,27.46932c-2.3643,2.40959 -5.20146,3.61438 -8.39327,3.61438c-1.49739,0 -2.99478,-0.32128 -4.49217,-0.96384c-5.00444,-2.16863 -7.48695,-5.90349 -7.48695,-11.28491l0,-85.41995c0,-3.29311 1.18215,-6.18461 3.54645,-8.55404c2.3643,-2.40959 5.16206,-3.61438 8.39327,-3.61438l83.89327,0c5.24087,0 8.94494,2.53007 11.07281,7.63037c2.12787,4.97982 1.26096,9.35724 -2.64014,13.17242l-26.95303,27.46932l66.47625,67.70947l66.47625,-67.74963l-26.95303,-27.46932c-3.86169,-3.81518 -4.76801,-8.15244 -2.64014,-13.17242c2.12787,-5.1003 5.79254,-7.63037 11.07281,-7.63037l83.89327,0c3.23121,0 6.06837,1.20479 8.39327,3.61438c2.3643,2.40959 3.54645,5.3011 3.54645,8.55404l0,85.50027c0,5.34126 -2.44311,9.11628 -7.28993,11.28491c-1.61561,0.64256 -3.19181,0.96384 -4.6892,0.96384c-3.23121,0 -6.06837,-1.20479 -8.39327,-3.61438l-26.99243,-27.50948z"/>  
    
          </svg> 
		  
          <svg v-if="item.videoId == 'watchVideo'" @click="toggleCamera(item.videoId)" xmlns="http://www.w3.org/2000/svg" viewbox="-10 -10 68 68" :class="open.video?'on':'off'"> 
           <circle cx="24" cy="24" r="34"> 
            <title>Mute video</title> 
           </circle> 
           <path class="off" transform="scale(0.6), translate(17,16)" d="M40 8H15.64l8 8H28v4.36l1.13 1.13L36 16v12.36l7.97 7.97L44 36V12c0-2.21-1.79-4-4-4zM4.55 2L2 4.55l4.01 4.01C4.81 9.24 4 10.52 4 12v24c0 2.21 1.79 4 4 4h29.45l4 4L44 41.46 4.55 2zM12 16h1.45L28 30.55V32H12V16z" fill="white" /> 
           <path class="on" transform="scale(0.6), translate(17,16)" d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm-4 24l-8-6.4V32H12V16h16v6.4l8-6.4v16z" fill="white" /> 
          </svg> 
          <svg v-if="item.videoId == 'watchVideo'" @click="toggleMic(item.videoId)" xmlns="http://www.w3.org/2000/svg" viewbox="-10 -10 68 68" :class="open.audio?'on':'off'"> 
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
          <br>用户：{{ item.username  }} 
         </div> 
        </div> 
        <div v-for="item in [0]" v-if="item >= video_list.length" class="flex-item flex-watch-item"> 
         <video class="video-item"  autoplay  id="watchVideos" data-videotype="remote"></video> 
         
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
       <input type="text" class="input-element" v-model="form.msg" placeholder="输入你想要回复的内容"> 
       <span v-on:click="handleMsgSend">发送</span> 
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
             id:this.$route.params.id,
             video_list:[{},{}],
             mode:'',
             open: {
		      audio: true,
		      video: true
		    },
		    chatList:[{
		    	who:'Tansy',
		    	content:'hi'
		    }],
		    form:{
		    	msg:''
		    },
             userList:[{
             	id:'Tansy',
             	name:'Tansy',
             	role:1,
             },{
             	id:'Tansy1',
             	name:'Tansy1',
             	role:2,
             },{
             	id:'Tansy2',
             	name:'Tansy2',
             	role:1,
             },{
             	id:'Tansy3',
             	name:'Tansy3',
             	role:1,
             },{
             	id:'Tansy4',
             	name:'Tansy4',
             	role:1,
             },{
             	id:'Tansy5',
             	name:'Tansy5',
             	role:1,
             }]
			}
		},
		methods:{
			handleMsgSend(){

			}
		}
	}
</script>

<style>
	.sidebar{
		background: #fff;
		height: 100vh;
		width: 100%;
	}
	.chat_box{
		border-left: 1px
	}
</style>