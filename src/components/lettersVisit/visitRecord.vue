<!-- 会议签到-->
<template>
	<div>
		<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>信访中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>信访记录</el-breadcrumb-item> 
  </el-breadcrumb>
</div>
      <div class="search_box"> 
        <el-input style="width: 20%" v-model="searchForm.conName" placeholder="请输入会议名称"></el-input>
        <el-date-picker size="large" v-model="searchForm.startTime" type="datetime" placeholder="选择开始时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-date-picker size="large" v-model="searchForm.endTime" type="datetime" placeholder="选择结束时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-select v-model="searchForm.status" placeholder="请选择状态">
        <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
        </el-select>
        <el-button @click="searchCreateMeeting()" type="primary" size="small">查询</el-button> 
 
</div>   
	<div class="table_title">
		<span>信访记录</span>
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
      label="上访者" >
    </el-table-column>
    <el-table-column
      fixed
      prop="conName"
      align="center"
      label="上访者身份证号" >
    </el-table-column>
    <el-table-column
      fixed
      prop="conName"
      align="center"
      label="接访者" >
    </el-table-column>
    <el-table-column
      :formatter="dateFormate"
      prop="startTime"
      align="center"
      label="接访者身份证号" >
    </el-table-column>
    <el-table-column
      prop="creator"
      align="center"
      label="信访房间号" >
    </el-table-column>
    <el-table-column
      prop="creator"
      align="center"
      label="创建时间" >
    </el-table-column>   
    <el-table-column 
      label="操作" 
      align="center">
      <template slot-scope="scope">
        <el-button @click="checkDetail(scope.row)" type="primary" size="small">查看详情</el-button> 
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
		    total: 5,
        currentPage: 1,
　　　　pageSize: 10,		
 		    visitRecords: [],
        visitDtail:{},
        searchForm:{}
			}
    },
		created(){
            this.getLetterRecord();
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
      		//获取信访记录列表
      		getLetterRecord(){
           
      		},
      		//查看信访记录详情
      		checkDetail(row){

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