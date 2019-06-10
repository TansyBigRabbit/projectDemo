<template>
<el-container>
  <el-header style="text-align: right; font-size: 12px"> 
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
       <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided >退出登录</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
  <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu style="height: 100vh;" :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>信访中心系统</template>
        <el-menu-item-group> 
          <router-link :to="'/home/lettersVisit'">
          <el-menu-item index="1-1">
            开启信访
          </el-menu-item></router-link>
          <el-menu-item index="1-2">信访接访</el-menu-item>
          <el-menu-item index="1-3">信访处理</el-menu-item>
        </el-menu-item-group>  
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>党建中心系统</template>
        <el-menu-item-group> 
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>  
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>综治中心系统</template>
        <el-menu-item-group> 
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>  
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
        <el-menu-item-group> 
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
        </el-menu-item-group>  
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
        <el-menu-item-group> 
          <el-menu-item index="5-1">选项1</el-menu-item>
          <el-menu-item index="5-2">选项2</el-menu-item>
        </el-menu-item-group>  
      </el-submenu>
    </el-menu>
  </el-aside>
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
    </el-main> 
  </el-container>
</el-container>  
</template>
<style>
  .el-header {
    background-color: #1890F5;
    color: #333;
    line-height: 60px;
    height: 55px;
  }
  
  .el-aside {
    color: #ffffff;
    background-color: #001529
  }
  .el-menu{
    background-color: #001529
  }
  .el-submenu__title,.el-menu-item{
    color:#ffffff;
  }
  .el-menu-item:focus, .el-menu-item:hover ,
  .el-submenu__title:focus,.el-submenu__title:hover{
    outline: 0;
    background-color: #1890F5;
    color:#ffffff;
  }
  .el-menu-item-group__title {
    padding: 0;
    padding-left: 0px;
    line-height: normal;
    font-size: 12px; 
} 
</style>

<script>
  export default {
    data() {
      return {
          
      }
    },
    methods: { 
    },
    mounted() {
     
    }
  }

</script>