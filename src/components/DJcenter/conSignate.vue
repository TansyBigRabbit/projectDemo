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
	class="table_body"
    :data="meetings"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="conName"
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
      label="操作" 
      align="center">
      <template slot-scope="scope">
        <el-button @click="signatureCon(scope.row)" type="primary" size="small">签到</el-button> 
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
	</div>
</template>

<script>
	export default{
		data(){
			return{
		total: 5,
        currentPage: 1,
　　　　pageSize: 10,		
 		meetings: [{
          conName: 'XX会议',
          startTime: '2016-05-02 19:20',
          creator: 'ccc' 
        }, {
          conName: 'XX会议',
          startTime: '2016-05-02 19:20',
          creator: 'ccc'  
        }, {
          conName: 'XX会议',
          startTime: '2016-05-02 19:20',
          creator: 'ccc' 
        }, {
          conName: 'XX会议',
          startTime: '2016-05-02 19:20',
          creator: 'ccc' 
        }]
			}
		},
		created(){

		},
		methods:{
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
      		dateFormate(val){
             return val.startTime
      		}
		}
	}
</script>

<style>
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
</style>