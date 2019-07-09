<!-- 活动列表 --> 
<template>
	<div>
    <div v-if="notDetail"> 
		<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>党建中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>党建活动</el-breadcrumb-item> 
  <el-breadcrumb-item>活动列表</el-breadcrumb-item> 
  </el-breadcrumb>
</div> 
 
  <el-card class="box-card">
      <div class="search_box">
        <el-input style="width: 20%" v-model="searchForm.name" placeholder="请输入活动名称"></el-input>
        <el-date-picker size="large" v-model="searchForm.activityStartTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-date-picker size="large" v-model="searchForm.activityEndTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        
        <el-button @click="searhActivity()" type="primary" size="small">查询</el-button> 
 
</div>
  <div class="table_title">
    <span>党建活动列表</span>
  </div>
  <el-table
   v-loading="acLoading"
    class="table_body"
    :data="activityList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      align="center"
      label="活动名称" >
    </el-table-column>
    <el-table-column 
      prop="eventLocation"
      align="center"
      label="活动地点" >
    </el-table-column>
    <el-table-column 
      prop="creator"
      align="center"
      label="发布人" > 
    </el-table-column>
    <el-table-column
     :formatter="dateFormate"
      prop="createTime"
      align="activityStartTime"
      label="活动开始时间" >
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
            @size-change="handleSizeChange($event)"
            @current-change="handleCurrentChange($event)"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination> 
  </el-card>
</div>

  <!-- 详情弹窗 -->

  <div v-else>
    <div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>党建中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>活动</el-breadcrumb-item> 
  <el-breadcrumb-item>活动列表</el-breadcrumb-item> 
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>  
  </el-breadcrumb>
</div>
<el-card class="box-card m_t_value">
<el-form :model="activityDetail"  ref="activityDetail" class="activity_form">
    <el-col :span="12"><el-form-item label="活动名称" prop="name">
      <span>{{activityDetail.name}}</span>
    </el-form-item></el-col>
    <el-col :span="12"><el-form-item label="活动地点" prop="eventLocation ">
      <span>{{activityDetail.eventLocation}}</span> 
    </el-form-item></el-col>
    <el-col :span="12"><el-form-item label="活动开始时间" prop="activityStartTime">
      <span>{{activityDetail.activityStartTime}}</span> 
    </el-form-item> </el-col>
    <el-col :span="12"><el-form-item label="活动结束时间" prop="activityEndTime">
      <span>{{activityDetail.activityEndTime}}</span>  
    </el-form-item> </el-col> 
    <el-col :span="24">
      <el-form-item prop="theme">
      
    <div  >
      <div><p>活动内容：</p></div>
      <div v-html="activityDetail.theme">{{activityDetail.theme}}</div>
    </div>
    </el-form-item>  
    </el-col>
    </el-form>
    </el-card>
    <div class="m_t_value btnBox01">
    <el-button type="warning" @click="notDetail=true">返回上一页</el-button> 
    </div>
  </div>

	</div>
</template>

<script>
	export default{
		data(){
			return{
    acLoading:false,
    acDetail:false,//弹窗
		total: 5,
    currentPage: 1,
　　　 pageSize: 10,	
    searchForm:{},
    activityList: [],
        //活动详情
    activityDetail:{},
    notDetail:true
		}
  },
		created(){
    this.getActivityList(1,5);
		},
		methods:{
      //获取活动列表
      getActivityList(num,size){
      var _this = this; 
      _this.acLoading=true;
      this.$http.get(this.$ports.activity.list,{
           'pageNum':num,
           'size':size
           }).then(res=>{
          console.log("获取活动列表数据......");
          console.log(res.data); 
          if(res.data.code==0){
          _this.activityList = res.data.data;
          _this.total = res.data.page.total;
          _this.pageSize = size;
          _this.currentPage = num;  
          }else{
            _this.$message.error("查询失败！");
          }
          _this.acLoading=false;
          });
      },
         //tab跳转
          tabTo(num){
            $(".is-active").removeClass("is-active");
            $("#tab-"+num).addClass("is-active");
          }, 
      		handleSizeChange(size){
            console.log("条数:"+size);
            this.pageSize = size;
            this.getActivityList(1,size); 
          },
          handleCurrentChange(currentPage){
            console.log("页数:"+currentPage);
            this.currentPage = currentPage;
            this.getActivityList(this.currentPage,this.pageSize);
          },
          //日期格式化
      		dateFormate(row, column, cellValue, index){ 
             return row.activityStartTime.slice(0,row.activityStartTime.length-2);
           }, 
          //活动记录查看详情
          checkDetail(obj){
            var _this = this;
            this.notDetail=false;
            this.$http.get(this.$ports.activity.findById,{ 
            'id':obj.id
           }).then(res=>{
          console.log("findbyId......");
          console.log(res.data); 
          if(res.data.code==0){
           _this.activityDetail = res.data.data; 
          }else{
           _this.$message.error(res.data.msg);
          }
         
          }); 

        }, 
        searhActivity(){
          if(typeof this.searchForm.activityEndTime=='undefined'&&typeof this.searchForm.activityStartTime=='string'){
            this.$message.error("请输入活动结束时间");
          }
          if(typeof this.searchForm.activityStartTime=='undefined'&&typeof this.searchForm.activityEndTime=='string'){
            this.$message.error("请输入活动开始时间");
          }
           var _this = this;
           this.$http.get(this.$ports.activity.list,{
           'pageNum':1,
           'size':_this.pageSize, 
           'name':_this.searchForm.name,
           'state':_this.searchForm.state,
           'activityStartTime':_this.searchForm.activityStartTime,
           'activityEndTime':_this.searchForm.activityEndTime
           }).then(res=>{
          console.log("查询活动数据......");
          console.log(res.data); 
          if(res.data.code==0){ 
          _this.activityList = res.data.data;
          _this.total = res.data.page.total; 
          _this.currentPage = 1;
        }else{
           _this.$message.error("查询失败，"+res.data.msg);
        }
          
          });
        }
		}
	}
</script>

<style scope>
	.table_title{
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
	}
  .el-form-item>label{
   text-align: left;
  }
  .search_box{
    margin-top:25px;
  }
  .tab_box{
    margin-top: 25px
  }
  .dialog{
    width: 600px;
  }
  .meeting_form .el-input{
    width: 60%
  }
  .meeting_form label{
    width: 20%;
    text-align: right;
  }
  .data_card{
    margin-top: 25px
  }
  .data_card .el-col{
    text-align: center;
  }
  .data_card p {
    cursor: pointer;

  }
</style>