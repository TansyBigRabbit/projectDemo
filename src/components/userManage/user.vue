<!-- 会议列表 --> 
<template>
	<div>
		<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>系统管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>  
  </el-breadcrumb>
</div> 
 
    <el-card class="box-card">
      <div class="search_box">
      <el-input style="width: 15%" v-model="userlist.searchForm.userName" placeholder="请输入用户名称"></el-input>
      <el-input style="width: 15%" v-model="userlist.searchForm.userId" placeholder="请输入登陆账号"></el-input>
        <el-date-picker style="width: 20%" size="large" v-model="userlist.searchForm.createTime" type="datetime" placeholder="选择创建时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>  
        <el-select style="width: 15%" v-model="userlist.searchForm.state" placeholder="请选择状态">
        <el-option  v-for="item in state" :label='item.text' :value="item.value"></el-option> 
        </el-select> 
        <el-button @click="searchUser()" type="primary" size="large">查询</el-button> 
        <el-button @click="showModel('add')" type="warning" size="large">新增用户</el-button> 
 
</div> 
  <div class="table_title">
    <span>用户列表</span>
  </div>
 <el-table
  v-loading="createLoading"
  class="table_body"
    :data="userlist.userlistTable"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="userName"
      align="center"
      label="用户名称" >
      <template slot-scope="scope">
    <span class="meetName" @click="showModel('check',scope.row)">{{ scope.row.userName }}</span>
    </template>
    </el-table-column>
    <el-table-column 
      prop="userId"
      align="center"
      label="登陆账号" >
    </el-table-column>
    <el-table-column 
      prop="idCard"
      align="center"
      label="身份证号码" >
    </el-table-column>
    <el-table-column
      :formatter="dateFormate"
      prop="createTime"
      align="center"
      label="创建时间" >
    </el-table-column>
    <el-table-column 
      prop="state"
      align="center"
      label="用户状态" >
      <template slot-scope="scope">
    <span v-if="scope.row.state==0" style="color: #1890F5">正常</span> 
    <span v-if="scope.row.state==1" style="color: red">已注销</span>
    </template>
    </el-table-column>  
    <el-table-column 
      label="操作" 
      align="center">
      <template slot-scope="scope">
        <el-button @click="showModel('edit',scope.row)" type="primary" size="small">编辑</el-button>  
      </template> 
    </el-table-column>
  </el-table>
  <el-pagination class="page" background
            @size-change="handleSizeChange($event)"
            @current-change="handleCurrentChange($event)"
            :current-page="userlist.currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="userlist.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userlist.total">
        </el-pagination>  
  </el-card>
  <!-- 详情弹窗 -->
  <el-dialog  :title="dialogTitle" :visible.sync="conDetail">
  <el-form :model="userDetail" :rules="rules" ref="userDetail" class="meeting_form">
    <el-form-item label="用户名称" prop="userName">
      <el-input v-model="userDetail.userName" ></el-input>
    </el-form-item>
    <el-form-item label="登陆账号" prop="userId">
      <el-input class="notEdit" v-model="userDetail.userId" ></el-input>
    </el-form-item>
    <div v-if="add">
    <el-form-item label="登陆密码" prop="password">
      <el-input type="password" v-model="userDetail.password" ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password01">
      <el-input type="password" v-model="userDetail.password01" ></el-input>
    </el-form-item>
    </div>
    <el-form-item label="身份证号码" prop="idCard">
      <el-input class="notEdit" v-model="userDetail.idCard" ></el-input>
    </el-form-item>  
    <el-form-item label="电话号码" prop="telePhone ">
      <el-input class="notEdit" v-model="userDetail.telePhone " ></el-input>
    </el-form-item>  
    <el-form-item label="所属部门" prop="departName">
      <el-input class="notEdit" v-model="userDetail.depart.departName" ></el-input>
    </el-form-item>  
    <el-form-item label="状态" prop="state">
      <el-select style="width: 25%" v-model="userDetail.state" placeholder="请选择状态">
        <el-option v-for="item in stateList" :label='item.name' :value='item.id'></el-option>  
        </el-select> 
    </el-form-item>  
  </el-form>
  <div slot="footer" v-if="showBtn" class="dialog-footer">
  	<el-button @click="submitUserInfo('userDetail')">提交</el-button> 
    <el-button @click="conDetail = false">关闭</el-button> 
  </div>
</el-dialog>

	</div>
</template>

<script>
	export default{
		data(){
		return{
    add:false,//输入密码框是否要显示
    createLoading:true,
    monthLoading:true,
    conDetail:false,//弹窗
    dialogTitle:'',
    userlist:{
    totalNum:0,
    pageSize:10,
    total:0,
    currentPage:1,
    userlistTable:[],
    searchForm:{},
    detail:{}
    },  
    showBtn:false,
    state:[ 
    {text:'全部',value:''},{text:'正常',value:0},{text:'已注销',value:1}
    ], 
    stateList:[{name:'正常',id:0},{name:'注销',id:1}],  
    userDetail:{
    depart:{}
    },
    rules:{
          userName: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 1, max: 60, message: '用户名称请控制在30字以内', trigger: 'blur' }
          ], 
          userId : [
            { required: true, message: '请输入登陆账号', trigger: 'change' },{pattern: /^\d{6,20}$/,message: '只能输入数字', trigger: 'blur'}
          ],
          password : [
            {  required: true, message: '请输入密码', trigger: 'change'},
            { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'blur' }
          ],
          password01: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'blur' } 
          ],
          state: [
            { required: true, message: '请选择状态', trigger: 'blur' }, 
          ],
          telePhone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' }, 
          ],
          idCard: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' }, 
          ]  
			}
    }
		},
		created(){
        this.getUserList(1,10);
		},
		methods:{ 
        getUserList(num,size){
        this.createLoading=true;
          var _this = this;
           this.$http.get(this.$ports.user.list,{
           'pageNum':num,
           'size':size, 
           }).then(res=>{
          this.createLoading=false
          console.log("获取用户列表......");
          console.log(res.data);  
          _this.userlist.userlistTable = res.data.data;
          _this.userlist.total = res.data.page.total; 
          _this.userlist.pageSize = size;
          _this.userlist.currentPage = num;
          });
      },
      showModel(type,obj){ //type:add,edit
          
          var _this = this;
          $("input").removeAttr('disabled'); 
         if(type=='add'){
            this.showBtn=true;
            this.add=true;
            _this.dialogTitle="新增用户信息";
            _this.userDetail={
              depart:{}
            };
         }else{
            this.add=false;
            if (type=='edit') {
              $(".notEdit input").attr('disabled');
              _this.dialogTitle="编辑用户信息";
              _this.showBtn=true;
              
            }else{
               _this.showBtn=false;
               $("input").attr('disabled');
               _this.dialogTitle="用户信息详情";
            }
            //查询单条数据v
           this.$http.get(this.$ports.user.findById,{ 
            'userId':obj.userId
           }).then(res=>{
          console.log("findbyId......");
          console.log(res.data); 
          _this.userDetail = res.data.data; 
          }); 
         } 
         this.conDetail=true;
        },  
        //新增 修改
        submitUserInfo(form){ 
        	var _this = this;
           this.$refs[form].validate((valid) => {
          if (valid) {
            _this.userDetail.departId = '1';
            if(_this.add){
              if(_this.userDetail.password01!=_this.userDetail.password){
                _this.$message.error("两次输入的密码不一致!");
                return
              }
              delete _this.userDetail.password01;
             //新增  
             _this.operateData('add');
             }else{
              //修改
              delete _this.userDetail.password01;
             _this.operateData('edit');
            } 
          } else {
            return false;
          }
        });
         },
         operateData(type){
          var url ;
          var _this = this;
         if(type=='add'){
          url = this.$ports.user.insert;
          console.log("新增用户......");
         }else{
          url = this.$ports.user.update;
          console.log("修改用户......");
         }
          this.$http.post(url,_this.userDetail).then(res=>{
            console.log(res.data);
             if(res.data.code==0){
              _this.$message({
              message: '操作成功！',
              type: 'success'
            });
              _this.getUserList(1,5)
              //操作成功刷新页面退出弹窗
              _this.conDetail=false;
             }else{
              _this.$message.error(res.data.msg);
             }
             });
         },
          searchUser(){
          var params={}  
          params={
            'pageNum':1,
            'size':5,
            'userName':this.userlist.searchForm.userName,
            'userId':this.userlist.searchForm.userId,
            'state':this.userlist.searchForm.state,
            'createTime':this.userlist.searchForm.createTime,
           }
          
          var _this = this;
           this.$http.get(this.$ports.user.list,params).then(res=>{
          console.log("查询用户数据......");
          console.log(res.data); 
          _this.userlist.userlistTable = res.data.data;
          _this.userlist.total = res.data.page.total;
          });
          },
      		handleSizeChange(size){
            console.log("条数:"+size);
            this.userlist.pageSize = size;
            this.getUserList(1,size); 
          },
          handleCurrentChange(currentPage){
            console.log("页数:"+currentPage);
            this.userlist.currentPage = currentPage;
            this.getUserList(this.userlist.currentPage,this.userlist.pageSize);
          },  
          //日期格式化
      		dateFormate(row, column, cellValue, index){
          var num =  row.createTime.length;
             return row.createTime.slice(0,num-2);
           }, 
          //会议记录查看详情
          checkDetail(row){
             //查询单条数据v
             var _this=this;
           this.$http.get(this.$ports.conference.findById,{ 
            'id':row.id
           }).then(res=>{
          console.log("findbyId......");
          console.log(res.data); 
          _this.userdetAil = res.data.data; 
          }); 
          this.conDetail=true;

        }, 
		}
	}
</script>

<style> 
</style>