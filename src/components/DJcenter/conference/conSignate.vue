<!-- 会议签到-->
<template>
	<div>
		<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
</div> 
	<div class="table_title">
		<span>待签到会议列表</span>
	</div>
	<el-table
    v-loading="createlLoading"
	  class="table_body"
    :data="meetings"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="meetName"
      align="center"
      label="会议名称" >
    </el-table-column>
    <el-table-column
      :formatter="dateFormate"
      prop="startTime"
      align="center"
      label="会议开始时间" >
    </el-table-column>
    <el-table-column
      prop="creator"
      align="center"
      label="会议创建人" >
    </el-table-column>  
    <el-table-column 
      prop="status"
      align="center"
      label="会议状态" >
      <template slot-scope="scope">
    <span v-if="scope.row.status==4">已取消</span>
    <span v-if="scope.row.status==3">已过期</span>
    <span v-if="scope.row.status==2">已完成</span>
    <span v-if="scope.row.status==1">正在进行</span>
    <span v-if="scope.row.status==0">未开始</span>
    </template>
    </el-table-column>
    <el-table-column 
      label="操作" 
      align="center">
      <template slot-scope="scope">
        <el-button @click="signatureCon(scope.row)" type="primary" size="small">签到</el-button>
        <el-button v-if="scope.row.creator==userId&&scope.row.status==0"  @click="startMeeting(scope.row)" type="primary" size="small">开启会议</el-button> 
        <el-button v-if="scope.row.status==1" @click="enterMeeting(scope.row)" type="primary" size="small">加入会议</el-button>  
        
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="page" background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
	</div>
</template>

<script>
	export default{
		data(){
			return{
        userId:window.localStorage.getItem("userId"),
        createlLoading:false,
		    total: 0,
        currentPage: 1,
　　　　pageSize: 5,		
 		    meetings: []
			}
		},
		created(){
    this.getMySignMeeting(1,5);
		},
		methods:{
      getMySignMeeting(num,size){
        this.createlLoading=true;
          var _this = this;
           this.$http.get(this.$ports.conference.list,{
           'pageNum':num,
           'size':size,
           'joinUserName':window.localStorage.getItem('userId'),
           'statusList':'0,1'
           }).then(res=>{
          this.createlLoading=false
          console.log("获取我要签到的会议数据......");
          console.log(res.data); 
          _this.meetings = res.data.data;
          _this.pageTotal = res.data.page.total;
          _this.pageSize = size;
          _this.currentPage = num;
          });

      },
			signatureCon(row) {
       		 console.log(row);
       		 this.$router.push({
       		 	name:'ConSignate2',
       		 	params: {
                id: row.id
               }
       		 })
      		},
      		handleSizeChange(size){
            console.log("条数:"+size);
            this.myCreateMeeting.pageSize = size;
            this.getMySignMeeting(1,size); 
          },
          handleCurrentChange(currentPage){
            console.log("页数:"+currentPage);
            this.currentPage = currentPage;
            this.getMySignMeeting(this.myCreateMeeting.currentPage,this.myCreateMeeting.pageSize);
           },
      		dateFormate(val){
            var num = val.startTime.length;
             return val.startTime.slice(0,num-2)
      		},
          enterMeeting(row){
            console.log("加入会议房间......");
          if(row.creator== window.localStorage.getItem('userId')){
             this.$router.push({
            name:'ConRoom',
            params:{
              //会议创建者再次加入房间
              meetName:row.meetName,
              role:'LiveMaster',//房间创建者--主播
              type:'createJoin',
              conferenceId:row.id,
              roomName:row.roomName//会议房间名称
            }
          });
          }else{
            this.$router.push({
            name:'ConRoom',
            params:{
              meetName:row.meetName,
              role:'LiveGuest', 
              type:'meetJoin',
              conferenceId:row.id,
              roomName:row.roomName//会议房间名称
            }
          }); 
          }
          },
          startMeeting(row){
            console.log("创建会议房间......");
          this.$router.push({
            name:'ConRoom',
            params:{
              meetName:row.meetName,
              role:'LiveMaster',//房间创建者--主播
              type:'meetCreate',
              conferenceId:row.id,
              roomName:row.roomName//会议房间名称
            }
          });
          }
		}
	}
</script>

<style>
	/*.table_title{
		margin:25px 0;
	}
	.table_title>span{
		padding-left: 10px;
		border-left: 3px solid #409EFF
	}
	.table_body{
		margin:20px 0 40px 0;
	}
	.page{
		text-align: center;
	}*/
</style>