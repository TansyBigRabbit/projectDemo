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
        <el-button @click="searchMeeting('all')" type="primary" size="small">查询</el-button> 
 
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
    <span v-if="scope.row.state==0">正常</span> 
    <span v-if="scope.row.state==1">已注销</span>
    </template>
    </el-table-column>  
    <el-table-column 
      label="操作" 
      align="center">
      <template slot-scope="scope">
        <el-button @click="checkDetail(scope.row)" type="primary" size="small">详情</el-button> 
      </template> 
    </el-table-column>
  </el-table>
  <el-pagination class="page" background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="userlist.currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="userlist.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userlist.total">
        </el-pagination>  
  </el-card>
  <!-- 详情弹窗 -->
  <el-dialog  title="用户信息详情" :visible.sync="conDetail">
  <el-form :model="userDetail" class="meeting_form">
    <el-form-item label="用户名称">
      <el-input v-model="userDetail.userName" ></el-input>
    </el-form-item>
    <el-form-item label="登陆账号">
      <el-input v-model="userDetail.userId" ></el-input>
    </el-form-item>
    <el-form-item label="身份证号码">
      <el-input v-model="userDetail.idCard" ></el-input>
    </el-form-item>  
    <el-form-item label="所属部门">
      <el-input v-model="userDetail.depart.departName" ></el-input>
    </el-form-item>  
    <el-form-item label="状态">
      <el-select style="width: 25%" v-model="userDetail.state" placeholder="请选择状态">
        <el-option  label='正常' value='0'></el-option> 
        <el-option  label='已注销' value='1'></el-option> 
        </el-select> 
    </el-form-item>  
  </el-form>
  <div slot="footer" class="dialog-footer">
  	<el-button @click="submitUserInfo()">提交</el-button> 
    <el-button @click="conDetail = false">关闭</el-button> 
  </div>
</el-dialog>

	</div>
</template>

<script>
	export default{
		data(){
		return{
    createLoading:true,
    monthLoading:true,
    conDetail:false,//弹窗

    userlist:{
    totalNum:0,
    pageSize:10,
    total:0,
    currentPage:1,
    userlistTable:[],
    searchForm:{},
    detail:{}
    },  
 
    state:[ 
    {text:'全部',value:''},{text:'正常',value:0},{text:'已注销',value:1}
    ],   
        userDetail:{
        	depart:{}
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
          this.conDetail=true;
          var _this = this;
          $("input").removeAttr('disabled'); 
         if(type=='add'){
            this.showBtn=true;
            _this.dialogTitle="创建会议";
            _this.userDetail={};
         }else{
            if (type=='edit') {
              _this.showBtn=true;
              $(".notEdit input").attr('disabled',true);
            _this.dialogTitle="编辑会议信息";
            }else{
               _this.showBtn=false;
               $("input").attr('disabled',true);
            _this.dialogTitle="会议详情";
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
         
        },  
        //新增 修改
        submitUserInfo(){ 
        	var _this = this;
           this.$refs[form].validate((valid) => {
          if (valid) {
            if(typeof(this.meetingDetail.id)=='undefined'){
             //新增
             _this.meetingDetail.status=0;
             _this.meetingDetail.creator=window.localStorage.getItem('userId');
             _this.operateData('add');
             }else{
              //修改
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
          url = this.$ports.conference.insert;
          console.log("新增会议......");
         }else{
          url = this.$ports.conference.update;
          console.log("修改会议......");
         }
          this.$http.post(url,_this.meetingDetail).then(res=>{
            console.log(res.data);
             if(res.data.code==0){
              _this.$message({
              message: '操作成功！',
              type: 'success'
            });
              _this.refreshTable()
              //操作成功刷新页面退出弹窗
              _this.conDetail=false;
             } 
            _this.$message.error(res.data.msg);

            });
         },
          searchMeeting(type){
          var params={}
          if(type=='all'){
          if(typeof this.userlist.searchForm.endTime=='undefined'&&typeof this.userlist.searchForm.startTime=='string'){
            alert("请输入会议结束时间");
            return
          }
          if(typeof this.userlist.searchForm.startTime=='undefined'&&typeof this.userlist.searchForm.endTime=='string'){
            alert("请输入会议开始时间");
            return
          }
          params={
            'pageNum':1,
            'size':5,
            'meetName':this.userlist.searchForm.conName,
            'startTime':this.userlist.searchForm.startTime,
            'endTime':this.userlist.searchForm.endTime,
            'status':this.userlist.searchForm.status,
           }
          }else{
          if(typeof this.monthMeeting.searchForm.endTime=='undefined'&&typeof this.monthMeeting.searchForm.startTime=='string'){
            alert("请输入会议结束时间");
            return
          }
          if(typeof this.monthMeeting.searchForm.startTime=='undefined'&&typeof this.monthMeeting.searchForm.endTime=='string'){
            alert("请输入会议开始时间");
            return
          }
          params={
            'pageNum':1,
            'size':5,
            'meetName':this.monthMeeting.searchForm.conName,
            'startTime':this.monthMeeting.searchForm.startTime,
            'endTime':this.monthMeeting.searchForm.endTime,
            'status':this.monthMeeting.searchForm.status,
           }

          }
          var _this = this;
           this.$http.get(this.$ports.conference.list,params).then(res=>{
          console.log("查询会议数据......");
          console.log(res.data); 
          if(type=='all'){
          _this.userlist.meetingList = res.data.data;
          _this.userlist.total = res.data.page.total;
          }else{
          _this.monthMeeting.meetingList = res.data.data;
          _this.monthMeeting.total = res.data.page.total;
          }
          
          });
          },
      		handleSizeChange(size){
            console.log("条数:"+size);
            this.userlist.pageSize = size;
            this.getMeetingList(1,size); 
          },
          handleCurrentChange(currentPage){
            console.log("页数:"+currentPage);
            this.userlist.currentPage = currentPage;
            this.getMeetingList(this.userlist.currentPage,this.userlist.pageSize);
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