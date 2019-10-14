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
  <el-dropdown @command="handleCommand">
        <i class="el-icon-setting titleUser" style="margin-right: 15px">
          &nbsp;&nbsp;<span class="titleUser">你好，{{userInfo.userName}}</span>
        </i>
       <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">修改个人信息</el-dropdown-item>
            <el-dropdown-item command="changePwd" divided>修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" divided >退出登录</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      
</el-col>
    </el-row>
      
    </el-header>


<el-row id="menuRow">


<el-col id="menu" :span="isCollapse?2:4"><el-aside class="overflow_y">
<el-menu :default-active="$route.path"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu :index="''+index" v-for="(item,index) in submenuList">
    <template slot="title">
     <i class="el-icon-location"></i>
     <span slot="title">{{item.name}}</span>
   </template>
   <router-link v-if="item01.children.length==0" v-for="(item01,index01) in item.children" :to="item01.url">
    <el-menu-item :index="''+index+'-'+''+index01">{{item01.name}}</el-menu-item>
    </router-link>
    <el-submenu v-show="item01.children.length>0" :index="''+index+'-'+''+index01" v-for="(item01,index01) in item.children">
      <template slot="title">{{item01.name}}</template>
      <router-link v-for="(item02,index02) in item01.children" :to="item02.url">
         <el-menu-item :index="''+index+'-'+''+index01+'-'+''+index02">{{item02.name}}</el-menu-item>
         </router-link>
    </el-submenu>
  </el-submenu> 
 <!-- <el-submenu index="1">
  <template slot="title">
    <i class="el-icon-location"></i>
    <span slot="title">学宣</span>
  </template>  
         <router-link :to="'/home/StudyVideoList'">
         <el-menu-item index="1-1">视频列表</el-menu-item>
         </router-link>
         <router-link :to="'/home/StudyRoomList'">
         <el-menu-item index="1-2">房间列表</el-menu-item>
         </router-link>
   </el-submenu> 

<el-submenu index="2">
  <template slot="title">
    <i class="el-icon-location"></i>
    <span slot="title">综治</span>
  </template>  
         <router-link :to="'/home/zzRecords'">
         <el-menu-item index="2-1">综治记录</el-menu-item>
         </router-link>
         <router-link :to="'/home/zzRoomList'">
         <el-menu-item index="2-2">房间列表</el-menu-item>
         </router-link>
         <router-link :to="'/home/zzStatic'">
         <el-menu-item index="2-3">综治统计</el-menu-item>
         </router-link>
   </el-submenu> 

   <el-submenu index="3">
  <template slot="title">
    <i class="el-icon-location"></i>
    <span slot="title">面谈</span>
  </template>  
         <router-link :to="'/home/FaceRecords'">
         <el-menu-item index="3-1">面谈记录</el-menu-item>
         </router-link>
         <router-link :to="'/home/FaceRoomList'">
         <el-menu-item index="3-2">房间列表</el-menu-item>
         </router-link>
         <router-link :to="'/home/FaceStatic'">
         <el-menu-item index="3-3">面谈统计</el-menu-item>
         </router-link>
   </el-submenu> 

   <el-submenu index="4">
  <template slot="title">
    <i class="el-icon-location"></i>
    <span slot="title">统计</span>
  </template>  
         <router-link :to="'/home/LettersStatic'">
         <el-menu-item index="3-1">统计</el-menu-item>
         </router-link> 
   </el-submenu>  -->
<!-- <el-submenu index="2"> 
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
       <el-submenu index="2-3" disabled>
         <template slot="title"><div @click="kaifa()">面谈</div></template>
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
     </el-submenu>  -->
  <!-- <el-submenu index="3" disabled>
    <template slot="title">
    <i class="el-icon-document"></i>
    <span slot="title" @click="kaifa()">综治中心系统</span>
  </template>
  </el-submenu> -->
  <!-- <el-submenu index="4">
    <template slot="title">
    <i class="el-icon-setting"></i>
    <span slot="title">系统管理</span>
  </template>
  <el-menu-item-group> 
          <router-link :to="'/home/User'">
          <el-menu-item index="4-1">用户管理</el-menu-item>
          </router-link>
          <router-link :to="'/home/Role'">
          <el-menu-item index="4-2">角色管理</el-menu-item>
          </router-link> 
          
    </el-menu-item-group>  
  </el-submenu> --> 
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
      <el-form-item label="登录账号" prop="userId">
      <el-input disabled v-model="userInfoDetail.userId"></el-input>
    </el-form-item> 
      <el-form-item label="用户名" prop="userName">
      <el-input v-model="userInfoDetail.userName"></el-input>
    </el-form-item>  
      <el-form-item label="电话号码" prop="telePhone">
      <el-input v-model="userInfoDetail.telePhone"></el-input>
    </el-form-item>  
      <el-form-item label="所属部门" prop="departName">
      <el-input disabled v-model="userInfoDetail.depart.departName"></el-input>
    </el-form-item>    
  </el-form>
  <div slot="footer"  class="dialog-footer">
     <el-button @click="submitForm('userInfoDetail')">提交</el-button> 
    <el-button @click="closeForm('userInfoDetail')">关闭</el-button> 
  </div> 
</el-dialog>
<!-- 修改密码 -->
<el-dialog  title="修改密码"  :visible.sync="changpwdDialog">
  <el-form :model="pwdDetail" :rules="rules01" ref="pwdDetail" class="meeting_form"> 
      <el-form-item label="原密码" prop="password">
      <el-input type="password" v-model="pwdDetail.password"></el-input>
    </el-form-item> 
      <el-form-item label="新密码" prop="newPassword">
      <el-input type="password" v-model="pwdDetail.newPassword"></el-input>
    </el-form-item>  
      <el-form-item label="确认新密码" prop="newPassword01">
      <el-input type="password" v-model="pwdDetail.newPassword01"></el-input>
    </el-form-item>      
  </el-form>
  <div slot="footer"  class="dialog-footer">
     <el-button @click="submitForm('pwdDetail')">提交</el-button> 
    <el-button @click="closeForm('pwdDetail')">关闭</el-button> 
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
        userInfoDetail:{
          depart:{
            departName:''
          }
        },
        userInfoDialog:false,
        changpwdDialog:false, 
        pwdDetail:{},
        rules:{
          userName: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 1, max:10, message: '用户名称请控制在10字以内', trigger: 'blur' }
          ],  
        },
        rules01:{
          password: [
            { required: true, message: '请输入原密码', trigger: 'blur' },
            { min: 1, max:12, message: '请输入6-12位密码', trigger: 'blur' }
          ],  
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 1, max:12, message: '请输入6-12位密码', trigger: 'blur' }
          ],
          newPassword01: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 1, max:12, message: '请输入6-12位密码', trigger: 'blur' }
          ],
        },
        submenuList:[],
      };
    },
    created(){
      this.userInfo=JSON.parse(window.localStorage.getItem('userInfo'));
      console.log(this.userInfo);
      this.getUserRights(this.userInfo);
    },
    methods: {  
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
      this.getMyInfo();
      this.userInfoDialog=true;
      },
      closeForm(form){
      this.$refs[form].clearValidate();
      if(form=='userInfoDetail'){
      this.userInfoDialog=false;
      }else{
      this.changpwdDialog=false;
      }
       
      },
      //首页个人信息获取
      getMyInfo(){
        var _this = this;
      this.$http.get(this.$ports.user.findById,
       {
          userId:window.localStorage.getItem('userId')
      }).then(res=>{
        console.log("findById...")
        if(res.data.code==0){
            _this.userInfoDetail = res.data.data;
            var userInfo = res.data.data;
           window.localStorage.setItem('userInfo',JSON.stringify(userInfo)); 
        } 
      })
      },
      //提交代码
      submitForm(form){
      var _this = this;
      var param = {};
           this.$refs[form].validate((valid) => {
          if (valid) {
            if(form=='userInfoDetail'){
             //用户信息更新
            param = _this.userInfoDetail;
            console.log("修改个人信息...");
            }else{
             //密码修改
             if(_this.pwdDetail.newPassword!=_this.pwdDetail.newPassword01){
                _this.$message.error("两次输入的密码不一致！");
                return
             }
             console.log("修改密码...");
             param = {
              userId:window.localStorage.getItem('userId'),
              password:_this.pwdDetail.password,
              newPassword:_this.pwdDetail.newPassword

             }
            }
            this.$http.post(this.$ports.user.update,param).then(res=>{
            if(res.data.code==0){
              if(form=='userInfoDetail'){
                _this.userInfoDialog=false;
                //刷新顶部用户名称
                _this.userInfo.userName = _this.userInfoDetail.userName;
                _this.$message({
                message: '用户信息修改成功！',
                type: 'success'
                });
              }else{
                _this.changpwdDialog=false
                _this.$message({
                message: '密码修改成功，请重新登陆！',
                type: 'success'
                });
                  //跳转到登陆页面
                setTimeout(function(){
                _this.$store.state.login=false;
                 _this.$router.push({
                  name:'login'
                 })
                },200);
              }
               
            }else{
              _this.$message.error(res.data.msg)
            }
             
          });
          } else {
            return false;
          }
        });
      },
      //退出登录
      logout(){
       var _this = this;
           this.$confirm('确定退出？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$http.post(_this.$ports.logout).then(function(res){
            console.log(res);
            console.log("退出登陆...");
            if(res.data.code==0){
                  _this.$message({
                type: 'info',
                message: '退出成功'
              }); 
             _this.$store.state.login=false;
             _this.$router.push({
              name:'login',
              params:{
                isLogout:true
              }
             })
            }else{
              _this.$message({
            type: 'info',
            message: res.data.msg
          });
            }
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '退出失败'
          });       
        });
      },
      //修改密码
      changePwd(){
      this.changpwdDialog=true;
      },
      handleCommand(command){
        if(command=='userInfo'){
          this.editUserInfo();
        }else if(command=="changePwd"){
          this.changePwd();
        }else{
          this.logout();
        }
      },
      kaifa() { 
        this.$alert('功能正在开发中，请等待新版本更新功能！', '系统提示', {
          confirmButtonText: '确定'
        });
      },
      //用户权限去重&展示侧边菜单menu
      getUserRights(data){
         if(data.roles){
          var rights = [];
         for(let i=0;i<data.roles.length;i++){
          if(data.roles[i].permissions){
            for(let j=0;j<data.roles[i].permissions.length;j++){
              rights.push(data.roles[i].permissions[j]);
            }
          }
         }
         if(rights.length>1){
          //开始查重
           var hash=[];
            for (var m = 0; m < rights.length; m++) {
              for (var n = m+1; n < rights.length; n++) {
                if(rights[m].id==rights[n].id){
                  ++m;
                }
              }
                hash.push(rights[m]);
            }
            rights = hash; 
            console.log(rights);
            this.showSubar(rights);
         }else{
           this.$message.warning("您尚未添加权限，请联系管理员分配权限！");
         }
         
         }else{
           this.$message.warning("您尚未加入角色，请联系管理员分配角色！");
         }
      },
      showSubar(data){
       for(let i=0;i<data.length;i++){
        if(data[i].pid==0){
          var obj01 = {};
          obj01 = data[i];
          obj01.children=[];
          for(let j=0;j<data.length;j++){
            if(data[j].pid==data[i].id){
              var obj02 = {};
              obj02=data[j];
              obj02.children=[];
              for(let k=0;k<data.length;k++){
                if(data[k].pid==data[j].id){
                  obj02.children.push(data[k]);
                }
              } 
              obj01.children.push(obj02);
            }
          }
          this.submenuList.push(obj01);
        }
       }
      console.log(this.submenuList);
      },
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
 