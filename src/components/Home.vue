<template>
<el-container>

  <el-header class="main-header" id="header001" style="text-align: right; font-size: 12px"> 
    <el-row>
      <el-col :span="12" style="text-align: left;">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
</el-col>
<el-col :span="11">
  <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
       <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided >退出登录</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
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
          <el-menu-item index="1-2">信访接访</el-menu-item>
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
    <el-menu-item-group> 
          <router-link :to="'/home/ConSignate'">
          <el-menu-item index="2-1">会议签到</el-menu-item>
          </router-link>
          <router-link :to="'/home/ConList'">
          <el-menu-item index="2-2">会议列表</el-menu-item>
          </router-link>
          <router-link :to="'/home/ConRecord'">
          <el-menu-item index="2-3">会议记录</el-menu-item>
          </router-link>
          <router-link :to="'/home/MyCon'">
          <el-menu-item index="2-4">我的会议</el-menu-item>
          </router-link>
    </el-menu-item-group>  
    <!-- <i class="el-icon-menu"></i>
    <span slot="title">党建中心系统</span> -->
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
 
</el-container>
</template>

 <script>
  export default {
    data() {
      return {
        isCollapse: false, 
      };
    },
    created(){
      //this.testInterface();
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
@media screen and (max-width: 1400px) {
    #menuRow .el-col-4 {
        width: 15%
}
}
@media screen and (min-width: 1401px) {
    #menuRow .el-col-4 {
        width: 12.5%
}
}
</style>
 