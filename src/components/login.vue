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
    <el-input id="password"type="password" placeholder="请输入密码" show-password>
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
      this.$router.push({
        name:'home'
      })
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
