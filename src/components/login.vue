<template>
  <el-container>
  <el-header>
    <h2>XXX管理系统</h2></el-header>
  <el-main> 
    <div class="loginBox">
    <el-row>
  <el-col>
    <el-input placeholder="请输入内容" v-model="userName" clearable>
      <template slot="prepend">帐号</template>
    </el-input> 
  </el-col>
 </el-row>
 <el-row>
  <el-col>
    <el-input id="password" type="password" v-model="password" placeholder="请输入密码" show-password>
      <template slot="prepend">密码</template>
    </el-input>
  </el-col>
 </el-row>
 <el-row>
  <el-col>
    <el-button id="login" @click="login" style="width:100%" type="primary">登录</el-button>
  </el-col>
 </el-row> 
</div>
  </el-main>
</el-container>
</template> 

<script>
export default {
  name: 'login',
  data () {
    return {
      userName:'',
      password:''
    }
  },
  methods:{
    login:function(){
      var _this = this; 
      this.$http.post(this.$ports.login,{
        userId:this.userName,
        password:this.password
      }).then(function(res){
        console.log("登录者信息.....");
        console.log(res.data);
        if(res.data.code==0){
          loginInfoMain = res.data.data;
          window.localStorage.setItem('userId',res.data.data.userId);
          _this.$store.state.login=true;
              _this.$router.push({
                name:'home'
              });
        }else{
          alert(res.data.msg);
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
     
    }
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
   body > .el-container {
    margin-bottom: 40px;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: left; 
    height: 20vh;
  } 
  .loginBox{
    width: 30%;
    margin: 0 auto;
    position: relative;
    top: 20%;
    padding:20px;
    border: 1px solid #B3C0D1;
    border-radius: 18px;
    box-shadow: 2px 2px 10px #ababab;
  }
</style>
