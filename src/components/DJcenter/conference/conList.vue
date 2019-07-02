<!-- 会议列表 --> 
<template>
	<div>
		<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>党建中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>会议</el-breadcrumb-item> 
  <el-breadcrumb-item>会议列表</el-breadcrumb-item> 
  </el-breadcrumb>
</div> 

<el-card class="box-card data_card">
 <el-row>
    <el-col style="text-align: center;" :span="12">
      <p>会议总场数</p>
      <p @click="tabTo(0)">{{meeting.totalNum}}&nbsp;场</p>
    </el-col>
    <el-col style="text-align: center;" :span="12">
      <p>本月会议总场数</p>
      <p @click="tabTo(1)">{{monthMeeting.totalNum}}&nbsp;场</p>
    </el-col>
    <!-- <el-col style="text-align: center;" :span="8">
      <p>待开展会议场数</p>
      <p @click="tabTo(2)">17场</p>
    </el-col> -->
  </el-row> 
</el-card>

<el-tabs class="tab_box" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="所有会议">
      <div class="search_box">
      <el-input style="width: 15%" v-model="meeting.searchForm.conName" placeholder="请输入会议名称"></el-input>
        <el-date-picker style="width: 20%" size="large" v-model="meeting.searchForm.startTime" type="datetime" placeholder="选择开始时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-date-picker style="width: 20%" size="large" v-model="meeting.searchForm.endTime" type="datetime" placeholder="选择结束时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-select style="width: 15%" v-model="meeting.searchForm.status" placeholder="请选择创建人">
        <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
        </el-select>
        <el-select style="width: 15%" v-model="meeting.searchForm.status" placeholder="请选择状态">
        <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
        </el-select>
        <el-button @click="searchMeeting('all')" type="primary" size="small">查询</el-button> 
 
</div> 
  <div class="table_title">
    <span>会议列表</span>
  </div>
 <el-table
  v-loading="createLoading"
  class="table_body"
    :data="meeting.meetingList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="meetName"
      align="center"
      label="会议名称" >
    </el-table-column>
    <el-table-column 
      prop="meetTheme"
      align="center"
      label="会议主题" >
    </el-table-column>
    <el-table-column
      :formatter="dateFormate"
      prop="startTime"
      align="center"
      label="会议开始时间" >
    </el-table-column>
    <el-table-column 
      prop="status"
      align="center"
      label="会议状态" >
      <template slot-scope="scope">
    <span v-if="scope.row.status==1">已取消</span>
    <span v-if="scope.row.status==2">已过期</span>
    <span v-if="scope.row.status==3">已完成</span>
    <span v-if="scope.row.status==4">正在进行</span>
    <span v-if="scope.row.status==0">未开始</span>
    </template>
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
        <el-button @click="checkDetail(scope.row)" type="primary" size="small">详情</el-button> 
      </template> 
    </el-table-column>
  </el-table>
  <el-pagination class="page" background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="meeting.currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="meeting.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="meeting.total">
        </el-pagination>
    </el-tab-pane>

<!--本月会议-->
<el-tab-pane label="本月会议" > 
      <div class="search_box">
    <el-input style="width: 15%" v-model="monthMeeting.searchForm.conName" placeholder="请输入会议名称"></el-input>
        <el-date-picker style="width: 20%" size="large" v-model="monthMeeting.searchForm.startTime" type="datetime" placeholder="选择开始时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-date-picker style="width: 20%" size="large" v-model="monthMeeting.searchForm.endTime" type="datetime" placeholder="选择结束时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-select style="width: 15%" v-model="monthMeeting.searchForm.status" placeholder="请选择创建人">
        <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
        </el-select>
        <el-select style="width: 15%" v-model="monthMeeting.searchForm.status" placeholder="请选择状态">
        <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
        </el-select>
        <el-button @click="searchMeeting('month')" type="primary" size="small">查询</el-button>
</div> 
  <div class="table_title">
    <span>会议列表</span>
  </div>
  <el-table
  v-loading="monthLoading"
  class="table_body"
    :data="monthMeeting.meetingList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="meetName"
      align="center"
      label="会议名称" >
    </el-table-column>
    <el-table-column 
      prop="meetTheme"
      align="center"
      label="会议主题" >
    </el-table-column>
    <el-table-column
      :formatter="dateFormate"
      prop="startTime"
      align="center"
      label="会议开始时间" >
    </el-table-column>
    <el-table-column 
      prop="status"
      align="center"
      label="会议状态" >
      <template slot-scope="scope">
    <span v-if="scope.row.status==1">已取消</span>
    <span v-if="scope.row.status==2">已过期</span>
    <span v-if="scope.row.status==3">已完成</span>
    <span v-if="scope.row.status==4">正在进行</span>
    <span v-if="scope.row.status==0">未开始</span>
    </template>
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
        <el-button @click="checkDetail(scope.row)" type="primary" size="small">详情</el-button> 
      </template> 
    </el-table-column>
  </el-table>
  <el-pagination class="page" background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="monthMeeting.currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="monthMeeting.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="monthMeeting.total">
        </el-pagination>
    </el-tab-pane>
</el-tabs>
  
  <!-- 详情弹窗 -->
  <el-dialog  title="会议详情" :visible.sync="conDetail">
  <el-form :model="meetingDetail" class="meeting_form">
    <el-form-item label="会议名称">
      <el-input v-model="meetingDetail.meetName" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="会议主题">
      <el-input v-model="meetingDetail.meetTheme" :readonly="true"></el-input>
    </el-form-item>
    <el-form-item label="会议创建人">
      <el-input v-model="meetingDetail.creator" :readonly="true"></el-input>
    </el-form-item> 
    <el-form-item label="参会人员">
      <el-input v-model="meetingDetail.joinUserName" :readonly="true"></el-input>
    </el-form-item>  
    <el-form-item label="会议开始时间">
      <el-input v-model="meetingDetail.startTime" :readonly="true"></el-input>
    </el-form-item> 
    <el-form-item label="会议结束时间">
      <el-input v-model="meetingDetail.endTime" :readonly="true"></el-input>
    </el-form-item> 
  </el-form>
  <div slot="footer" class="dialog-footer">
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

    meeting:{
    totalNum:0,
    pageSize:5,
    total:0,
    currentPage:1,
    meetingList:[],
    searchForm:{},
    detail:{}
    },

    monthMeeting:{
    totalNum:0,
    pageSize:5,
    total:0,
    currentPage:1,
    meetingList:[],
    searchForm:{},
    detail:{}
    },
    //当前月份
    month:1,
    //下一月月份
    nextMonth:1,
    year:2019,
    nextYear:2020,
 
    status:[
      {text:'已取消',value:'0'},
      {text:'未开始',value:'1'},
      {text:'已过期',value:'2'},
      {text:'已完成',value:'3'},
      {text:'正在进行',value:'4'},
    ],  
        //会议详情
        meetingDetail:{}
			}
		},
		created(){
    this.getMonth();
    this.getMeetingList(1,5);
    this.getMonthMeetingList(1,5);

		},
		methods:{
      //获取当前月份和年份
      getMonth(){
      var date = new Date();
      this.month = date.getMonth()+1;
      this.year = date.getFullYear(); 
      if(this.month==12){
        this.nextMonth='0'+1;
        this.nextYear = this.year+1;
      }else if(this.month<10){
        this.nextMonth = this.month+1;
        this.month='0'+this.month;
        if(this.nextMonth<10){
          this.nextMonth='0'+this.nextMonth;
        }
        this.nextYear = this.year
      }else{
        this.nextMonth = this.month+1;
      }
      console.log(this.month);
      console.log(this.nextMonth);
      console.log(this.year);
      console.log(this.nextYear); 
      },
      getMeetingList(num,size){
       this.createLoading=true;
          var _this = this;
           this.$http.get(this.$ports.conference.list,{
           'pageNum':num,
           'size':size, 
           }).then(res=>{
          this.createLoading=false
          console.log("获取所有的会议数据......");
          console.log(res.data); 
          _this.meeting.meetingList = res.data.data;
          _this.meeting.total = res.data.page.total;
          _this.meeting.totalNum=res.data.page.total;
    
          _this.meeting.pageSize = size;
          _this.meeting.currentPage = num;
          });
      },
      getMonthMeetingList(num,size){
          var startTime = this.year+'-'+this.month+'-'+'01'+' '+'00:00:00',
          endTime=this.nextYear+'-'+this.nextMonth+'-'+'01'+' '+'00:00:00';
          this.monthLoading=true;
          var _this = this;
           this.$http.get(this.$ports.conference.list,{
           'pageNum':num,
           'size':size, 
           'startTime':startTime,
           'endTime':endTime
           }).then(res=>{
          this.monthLoading=false
          console.log("获取当前月的会议数据......");
          console.log(res.data); 
          _this.monthMeeting.meetingList = res.data.data;
          _this.monthMeeting.total = res.data.page.total;
          _this.monthMeeting.totalNum= res.data.page.total;
          _this.monthMeeting.pageSize = size;
          _this.monthMeeting.currentPage = num;
          });
      },
         //tab跳转
          tabTo(num){
            if(num==0){
              this.getMeetingList(1,5);
              $(".is-active").removeClass("is-active");
              $("#tab-"+num).addClass("is-active");
              $("#pane-0").css('display','block');
              $("#pane-1").css('display','none'); 
            }else{
              this.getMonthMeetingList(1,5);
              $(".is-active").removeClass("is-active");
              $("#tab-"+num).addClass("is-active");
              $("#pane-0").css('display','none');
              $("#pane-1").css('display','block');
            } 
          },
          //会议签到
			    signatureCon(row) {
       		 console.log(row);
       		 this.$router.push({
       		 	name:'ConSignate2',
       		 	params: {
                id: '1'
               }
       		 })
      		},
          searchMeeting(type){
          var params={}
          if(type=='all'){
          if(typeof this.meeting.searchForm.endTime=='undefined'&&typeof this.meeting.searchForm.startTime=='string'){
            alert("请输入会议结束时间");
            return
          }
          if(typeof this.meeting.searchForm.startTime=='undefined'&&typeof this.meeting.searchForm.endTime=='string'){
            alert("请输入会议开始时间");
            return
          }
          params={
            'pageNum':1,
            'size':5,
            'meetName':this.meeting.searchForm.conName,
            'startTime':this.meeting.searchForm.startTime,
            'endTime':this.meeting.searchForm.endTime,
            'status':this.meeting.searchForm.status,
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
          _this.meeting.meetingList = res.data.data;
          _this.meeting.total = res.data.page.total;
          }else{
          _this.monthMeeting.meetingList = res.data.data;
          _this.monthMeeting.total = res.data.page.total;
          }
          
          });
          },
      		handleSizeChange(){

      		},
      		handleCurrentChange(){

      		},
          //日期格式化
      		dateFormate(row, column, cellValue, index){
          var num =  row.startTime.length;
             return row.startTime.slice(0,num-2);
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
          _this.meetingDetail = res.data.data; 
          }); 
          this.conDetail=true;

        },
        handleClick(tab,event){
            if(tab.index==0){
              this.getMeetingList(1,5);
            }else{
              this.getMonthMeetingList(1,5);
            }
          }
		}
	}
</script>

<style> 
</style>