<template>
<el-container>

  <el-header class="main-header" id="header001" style="text-align: right; font-size: 12px"> 
    <el-row>
      <el-col :span="12" style="text-align: left;">
      <el-radio-group v-model="isCollapse" >
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
</el-col>
<el-col :span="11">
  <el-dropdown>
        <i class="el-icon-setting titleUser" style="margin-right: 15px">
          &nbsp;&nbsp;<span class="titleUser">你好，{{userInfo.userName}}</span>
        </i>
       <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="editUserInfo">修改个人信息</el-dropdown-item>
            <el-dropdown-item @click="changePwd" divided>修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout" divided >退出登录</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      
</el-col>
    </el-row>
      
    </el-header>


<el-row id="menuRow">


<el-col id="menu" :span="isCollapse?2:4"><el-aside class="overflow_y">
<el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">信访中心系统</span>
    </template>
    <el-menu-item-group> 
          <router-link :to="'/home/lettersVisit'">
          <el-menu-item index="1-1">开启信访</el-menu-item>
          </router-link>
          <router-link :to="'/home/VisitRoom'">
          <el-menu-item index="1-2">信访房间列表</el-menu-item>
          </router-link>
          <router-link :to="'/home/VisitRecord'">
          <el-menu-item index="1-3">信访记录</el-menu-item>
          </router-link>
    </el-menu-item-group>  
  </el-submenu>
  <el-submenu index="2"> 
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">党建中心系统</span>
    </template>
    <el-submenu index="2-1">
          <template slot="title">会议</template>
          <router-link :to="'/home/ConSignate'">
          <el-menu-item index="2-1-1">会议签到</el-menu-item>
          </router-link>
          <router-link :to="'/home/ConList'">
          <el-menu-item index="2-1-2">会议列表</el-menu-item>
          </router-link>
          <router-link :to="'/home/ConRecord'">
          <el-menu-item index="2-1-3">会议记录</el-menu-item>
          </router-link>
          <router-link :to="'/home/MyCon'">
          <el-menu-item index="2-1-4">我的会议</el-menu-item>
          </router-link>
        </el-submenu>
      <el-submenu index="2-2">
          <template slot="title">党建活动</template>
          <router-link :to="'/home/ActivityList'">
          <el-menu-item index="2-2-1">活动列表</el-menu-item>
          </router-link>
          <router-link :to="'/home/ActivityManage'">
          <el-menu-item index="2-2-2">活动管理</el-menu-item>
          </router-link>    
        </el-submenu>
        <el-submenu index="2-3">
          <template slot="title">面谈</template>
          <router-link :to="'/home/ConSignate'">
          <el-menu-item index="2-3-1">会议签到</el-menu-item>
          </router-link> 
          <router-link :to="'/home/ConSignate'">
          <el-menu-item index="2-3-2">会议签到</el-menu-item>
          </router-link> 
          <router-link :to="'/home/ConSignate'">
          <el-menu-item index="2-3-3">会议签到</el-menu-item>
          </router-link> 
        </el-submenu>
      </el-submenu> 
  </el-submenu>
  <el-submenu index="3" >
    <template slot="title">
    <i class="el-icon-document"></i>
    <span slot="title">综治中心系统</span>
  </template>
  </el-submenu>
  <el-submenu index="4">
    <template slot="title">
    <i class="el-icon-setting"></i>
    <span slot="title">用户管理</span>
  </template>
  </el-submenu>
  <el-submenu index="5">
    <template slot="title">
    <i class="el-icon-setting"></i>
    <span slot="title">系统管理</span>
  </template>
  </el-submenu>
</el-menu>
</el-aside></el-col>
 <el-col id="main" :span="isCollapse?22:20">  
  <el-main>
    <router-view></router-view>
      <!-- <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table> -->
    </el-main> </el-col>
</el-row> 
 <!-- 个人信息-->
  <el-dialog  title="修改个人信息"  :visible.sync="userInfoDialog">
  <el-form :model="userInfoDetail" :rules="rules" ref="userInfoDetail" class="meeting_form"> 
      <el-form-item label="登录账号" prop="userName">
      <el-input disabled v-model="userInfoDetail.userName"></el-input>
    </el-form-item> 
      <el-form-item label="用户名" prop="userName">
      <el-input v-model="userInfoDetail.userName"></el-input>
    </el-form-item>  
      <el-form-item label="电话号码" prop="userName">
      <el-input v-model="userInfoDetail.userName"></el-input>
    </el-form-item>  
      <el-form-item label="所属部门" prop="userName">
      <el-input v-model="userInfoDetail.userName"></el-input>
    </el-form-item>    
  </el-form>
<<<<<<< HEAD
  <div slot="footer"  class="dialog-footer">
=======
  <div slot="footer" v-if="showBtn" class="dialog-footer">
>>>>>>> 30f05ec2829b4c66d49b56ae3a0ded5037f5e4f9
     <el-button @click="submitForm('userInfoDetail')">提交</el-button> 
    <el-button @click="closeForm('userInfoDetail')">关闭</el-button> 
  </div> 
</el-dialog>
</el-container>
</template>

 <script>
  export default {
    data() {
      return {
        isCollapse: false, 
        userInfo:{},
        userInfoDetail:{},
        userInfoDialog:false,
        pwdDialog:false,
      };
    },
    created(){
      this.userInfo=JSON.parse(window.localStorage.getItem('userInfo'));
      console.log(this.userInfo);
    },
    methods: { 
      testInterface(){
      this.$http.get(this.$ports.department+'/queryOne',
       {
          departId:'111'
      }).then(res=>{
        console.log(res.data)
      })

      /*this.axios.get('/queryOne',{
        params:{
          departId:'111'
        }
      }).then((response) => {
      console.log(response.data)
      })*/
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath); 
        this.open=true 
      }, 
      handleClose(key, keyPath) {
        console.log(key, keyPath); 
        this.open=false
      },
      //编辑个人信息
      editUserInfo(){
      this.userInfoDialog=true;
      },
      closeForm(form){
      this.$refs[form].clearValidate();
      this.userInfoDialog=false; 
      },

      //退出登录
      logout(){
       var _this = this;
           this.$confirm('确定退出？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'info',
            message: '退出'
          }); 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });       
        });
      },
      //修改密码
      changePwd(){

      }
    }
  }
</script>

<style>
a{
  text-decoration: none;
}
  #menu{
    height:100vh;
   /* border-right:1px solid #e6e6e6;*/
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-main{
    padding: 35px 35px 
  }
    .main-header {
    background-color: #1890F5;
    color: #333;
    line-height: 60px;
    height: 55px;
  } 
  .el-aside ul[role="menubar"]{ 
  height: 100vh ;
  padding-top: 10px;
  } 
  .el-submenu__title,.el-menu-item{ 
  }
  .el-menu-item:focus, .el-menu-item:hover ,
  .el-submenu__title:focus,.el-submenu__title:hover{
    outline: 0; 
  }
  .el-menu-item-group__title {
    padding: 0;
    padding-left: 0px;
    line-height: normal;
    font-size: 12px; 
} 
.overflow_y{
  overflow-y: hidden;
}
.el-divider{
  margin: 0px
}
.overflow_y>ul{
  overflow-x: hidden;
  overflow-y: scroll;
}
@media screen and (max-width: 1400px) {
    #menuRow .el-col-4 {
        width: 15%
}
  #menuRow .el-col-20 {
        width: 85%
}
}
@media screen and (min-width: 1401px) {
    #menuRow .el-col-4 {
        width: 12.5%
}
  #menuRow .el-col-20 {
        width: 87.5%
}
}
.titleUser{
  font-size: 16px;
  color: #fff;
}
</style>
 