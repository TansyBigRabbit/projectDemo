<!-- 学宣--直播间组件 -->
<template>
	<div> 
		<div style="display: flex;justify-content: space-between;">
		<div class="breadcrumb" style="margin-top: 15px">
			  <el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>综治中心系统</el-breadcrumb-item>
			  <el-breadcrumb-item>学宣中心</el-breadcrumb-item> 
			  <el-breadcrumb-item>房间号：</el-breadcrumb-item> 
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
								<span>{{item.name}}</span>
								<span>{{item.type}}</span>
							</li>
						</ul>
					</el-card>
				</div>
				<div style="flex: 5">
					<el-card style="margin-bottom: 10px">
						<span class="title">主播窗口</span>
						<el-divider ></el-divider>
						<div>
							<video></video>
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
	export default{
		name:"liveRoom",
		props:{
			params01:Object
		},
		data(){
			return{
			//用户列表
            userList:[{
            name:"Tansy",
            type:"主播"
            },{
         	name:"Harry",
            type:"观众"}],
            //对话列表
            chatList:[{
            	isSelfSend:false,
            	isSystem:true,
            	content:"CCC加入房间"
            },
            {
            	isSelfSend:true,
            	isSystem:false,
            	content:"你好"
            },
            {
            	isSelfSend:false,
            	isSystem:false,
            	who:"CCC",
            	content:"hhaha"
            }],
            form:{

            },
			}
		},
		watch:{
			params01(obj){

			}
		},
		methods:{
          handleMsgSend(){

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
</style>