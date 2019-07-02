<!-- 活动列表 --> 
<template>
	<div>
		<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>党建中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>活动</el-breadcrumb-item> 
  <el-breadcrumb-item>活动列表</el-breadcrumb-item> 
  </el-breadcrumb>
</div> 

<!-- <el-card class="box-card data_card">
 <el-row>
    <el-col style="text-align: center;" :span="8">
      <p>党建活动总场数</p>
      <p @click="tabTo(0)">132场</p>
    </el-col>
    <el-col style="text-align: center;" :span="8">
      <p>本月党建活动总场数</p>
      <p @click="tabTo(1)">7场</p>
    </el-col> 
  </el-row> 
</el-card> -->

<el-tabs class="tab_box" type="border-card" @tab-click="">
    <el-tab-pane label="所有活动">
      <div class="search_box">
  <el-form :model="searchForm"  ref="searchForm" label-width="30%" class="demo-searchForm ">
     <el-row>
      <el-col :span="6">
        <el-form-item style="width: 90%" label="活动名称">
      <el-input v-model="searchForm.acName" ></el-input>
    </el-form-item>
      </el-col> 
      <el-col :span="6">
        <el-form-item style="width: 90%" label="活动主题">
      <el-input v-model="searchForm.theme" ></el-input>
    </el-form-item>
      </el-col> 
      <el-col :span="6">
        <el-form-item style="width: 90%" label="发布时间">
       <el-date-picker  style="width: 90%" size="large" v-model="searchForm.createTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"> </el-date-picker> 
    </el-form-item>
      </el-col> 
      <el-col :span="6">
        <el-form-item style="width: 80%" label="发布人">
      <el-input v-model="searchForm.creator" ></el-input>
    </el-form-item>
      </el-col>  
     </el-row> 
    
  </el-form>  
</div> 
  <div class="table_title">
    <span>党建活动列表</span>
  </div>
  <el-table
  class="table_body"
    :data="activityList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="acName"
      align="center"
      label="活动名称" >
    </el-table-column>
    <el-table-column 
      prop="theme"
      align="center"
      label="活动主题" >
    </el-table-column>
    <el-table-column 
      prop="creator"
      align="center"
      label="发布人" > 
    </el-table-column>
    <el-table-column
      prop="createTime"
      align="center"
      label="发布时间" >
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
            :current-page="currentPage"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </el-tab-pane> 
 
</el-tabs>
  
  <!-- 详情弹窗 -->
  <el-dialog  title="活动详情" :visible.sync="acDetail">
  <el-form :model="activityDetail" class="meeting_form">
    <el-form-item label="活动名称">
      <el-input v-model="activityDetail.name" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="活动主题">
      <el-input v-model="activityDetail.theme" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="活动创建人">
      <el-input v-model="activityDetail.creator" :readonly="true"></el-input>
    </el-form-item>   
    <el-form-item label="活动开始时间">
      <el-input v-model="activityDetail.startTime" :readonly="true"></el-input>
    </el-form-item> 
    <el-form-item label="活动结束时间">
      <el-input v-model="activityDetail.endTime" :readonly="true"></el-input>
    </el-form-item> 
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="acDetail = false">关闭</el-button> 
  </div>
</el-dialog>

	</div>
</template>

<script>
	export default{
		data(){
			return{
    acDetail:false,//弹窗
		total: 5,
    currentPage: 1,
　　　 pageSize: 10,	
    searchForm:{},
    activityList: [{
          id:'1',
          acName: 'XX活动1',
          createTime: '2016-05-02 19:20',
          creator: 'ccc' ,
          status:'0',
          theme:'党建活动001'
        },
        {
          id:'2',
          acName: 'XX活动1',
          createTime: '2016-05-02 19:20',
          creator: 'ccc' ,
          status:'0',
          theme:'党建活动001'
        },
        {
          id:'3',
          acName: 'XX活动1',
          createTime: '2016-05-02 19:20',
          creator: 'ccc' ,
          status:'0',
          theme:'党建活动001'
        },
        {
          id:'4',
          acName: 'XX活动1',
          createTime: '2016-05-02 19:20',
          creator: 'ccc' ,
          status:'0',
          theme:'党建活动001'
        }],
        //活动详情
        activityDetail:{
          id:'',
          acName:'XXX活动',
          //participates:[],
          theme:'fsjfskljfsklfjsklfjskj',
          creator:'Tansy',
          createTime:'2019-06-19', 
        },
			}
		},
		created(){

		},
		methods:{
         //tab跳转
          tabTo(num){
            $(".is-active").removeClass("is-active");
            $("#tab-"+num).addClass("is-active");
          },
          //活动签到
			    signatureCon(row) {
       		 console.log(row);
       		 this.$router.push({
       		 	name:'ConSignate2',
       		 	params: {
                id: '123456'
               }
       		 })
      		},
      		handleSizeChange(){

      		},
      		handleCurrentChange(){

      		},
          //日期格式化
      		dateFormate(row, column, cellValue, index){ 
             return row.startTime
           }, 
          //活动记录查看详情
          checkDetail(row){
            this.acDetail=true;

        },
         //进入活动室
         enterRoom(row){

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