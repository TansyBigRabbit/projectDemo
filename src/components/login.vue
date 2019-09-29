<template>
	<el-container>
		<!--<el-header>
    <h2>XXX管理系统</h2></el-header>-->
		<el-main :style="note">
			<div class="loginBox" 
            v-loading="loading"
		    element-loading-text="登陆中..."
		    element-loading-spinner="el-icon-loading"
		    element-loading-background="rgba(0, 0, 0, 0.3)"
			style="background-color: #f5f7fa;">
				<el-row>
					<el-col :span="12">
						<el-row>
							<el-col>
								<img :src="logoUrl" style="max-width:60%;padding-top: 5%; padding-right: 20%;" />
							</el-col>
						</el-row>
						<el-row>
							<el-col>
								<div style="text-align: left; padding-left: 15%; padding-top: 10%;">
									<div style="color:#409eff;font-size: 36px; height: 40px;">
										欢迎使用
									</div>
									<div style=" font-size: 18px;color: #5b5d5f;">
										甘孜县政法委三中心综治平台
									</div>
								</div>
							</el-col>
						</el-row>
					</el-col>
					<el-col :span="12" style="padding-top: 5%;padding-left: 6%;">
						<div style="line-height:60px;padding-top: 30px; width: 90%;">
							<div>
								<el-row>
									<el-col>
										<el-input placeholder="请输入账户" v-model="userName" clearable>
											<template slot="prepend">帐号</template>
										</el-input>
									</el-col>
									<!--<el-col style="text-align: right;padding-left: 10px; ">
								<input placeholder="请输入账户" v-model="userName" clearable style="height: 30px;width: 200px;">
								</input>
							</el-col>-->
								</el-row>
								<el-row>
									<el-col>
										<el-input id="password" type="password" v-model="password" placeholder="请输入密码" show-password>
											<template slot="prepend">密码</template>
										</el-input>
									</el-col>
								</el-row>
								<el-row>
									<el-checkbox  v-model="check">下次自动登录</el-checkbox>
								</el-row>
								<el-row>
									<el-col style="opacity:0.7">
										<el-button id="login" @click="login" style="width:100%" type="primary">登录</el-button>
									</el-col>
								</el-row>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<div style="text-align: center; position: absolute; bottom: 0px; width: 100%; line-height: 20px; padding:0px;font-size: 12px;">
				<font>
					本系统由 四川水火未济信息科技有限公司 提供系统支持与维护服务
				</font>
				<br />
				<font>
					服务邮箱 735855926@QQ.COM
				</font>
				<br />
				<font>
					蜀ICP备00000000号
				</font>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				loading:false,
				userName: '',
				password: '',
				check:false,
				/*增加*/
				note: {
					backgroundImage: "url(" + require("../assets/images/bg.jpg") + ") ",
					backgroundPosition: "center center",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					padding:"0px",
				},
				logoUrl: require('../assets/images/shlogo.png')
			}
		},
		created(){
        //window.localStorage.clear();
        //判断是否通过注销而来
        if(this.$route.params.isLogout){ 
        	console.log("通过注销进入登录页面");
        }else{ 
         if(window.localStorage.getItem("check")=="true"){

         	console.log("自动登录");
         	this.userName = window.localStorage.getItem("account");
         	this.password = window.localStorage.getItem("password");
         	this.check = true;
            this.login("auto");
         } 
        }
		},
		methods: {
			login: function(type) {
				var _this = this;
				var obj = {};
				if(type=="auto"){
	                 obj={
						userId: window.localStorage.getItem("account"),
						password: window.localStorage.getItem("password")
					}
				}else{
					obj={
						userId: this.userName,
						password: this.password
					}
				}
				_this.loading=true;
				this.$http.post(this.$ports.login, obj).then(function(res) {
					console.log("登录者信息.....");
					console.log(res.data);
					if(res.data.code == 0) {
						_this.loading=false; 
						_this.$message({
				          message: '登录成功！',
				          type: 'success'
				        });
						loginInfoMain = res.data.data;
						window.localStorage.setItem('userId', res.data.data.userId);
						window.localStorage.setItem('idCard', res.data.data.idCard);
						window.localStorage.setItem('apiToken', res.data.token);
						var userInfo = JSON.stringify(res.data.data);
						window.localStorage.setItem('userInfo', userInfo);
						//本地存储账号密码和登录状态
						if(_this.check){
							window.localStorage.setItem("account",_this.userName);
							window.localStorage.setItem("password",_this.password);
							window.localStorage.setItem("check",true);
						}else{
							window.localStorage.setItem("check",false);
						}
						//
						_this.$store.state.login = true;
						_this.$router.push({
							name: 'home' 
						});
					} else {
						_this.loading=false;
						_this.$message.error(res.data.msg);
					}
				})
				/*https://171.223.100.47:8443/*/
				/*this.$http.post('http://118.24.128.185:8080/webrtc-conference/api/account/login',{
				  username:this.userName,
				  pwd:this.password
				}).then(function(response) {
				    if (response.status == 200) {
				       var login = response.data.data
				        ILiveSDK.loginInfo.identifier = login.username;
				        ILiveSDK.loginInfo.token = login.token;
				        console.log('token:   '+ILiveSDK.loginInfo.token)
				        _this.$store.state.login=true;
				        _this.$router.push({
				          name:'home'
				        });
				    } else { 
				    }
				  }).
				catch (function(error) { 
				});*/

			},
			 
		}
	}
</script>
<style scoped>
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 80px;
		height: 100vh;
	}
	
	body>.el-container {
		margin-bottom: 40px;
	}
	
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		text-align: left;
		height: 20vh;
	}
	/*修改*/
	
	.loginBox {
		width: 50%;
		height: 350px;
		/*-------------------+*/
		margin: 0 auto;
		position: relative;
		top: 20%;
		padding: 20px;
		border: 1px solid #B3C0D1;
		border-radius: 8px;
		/*----------------%*/
		box-shadow: 2px 2px 10px #ababab;
	}
</style>