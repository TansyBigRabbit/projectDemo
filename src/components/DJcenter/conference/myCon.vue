<!-- 我的会议 --> 
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

<el-card class="box-card data_card">
 <el-row>
    <el-col style="text-align: center;" :span="8">
      <p>我创建的会议</p>
      <p @click="tabTo(0)">132场</p>
    </el-col>
    <el-col style="text-align: center;" :span="8">
      <p>我参与的会议</p>
      <p @click="tabTo(1)">7场</p>
    </el-col> 
    <el-col style="text-align: center;" :span="8">
      <p>我缺席的会议</p>
      <p @click="tabTo(2)">7场</p>
    </el-col> 
  </el-row> 
</el-card>
<div>
	<el-button @click="" type="primary" size="small" @click="showModel('add')">创建会议</el-button>
</div>
<el-tabs class="tab_box" type="border-card" @tab-click="">
    <el-tab-pane label="我创建的会议">
      <div class="search_box">
      <el-form :model="searchForm"  ref="searchForm" label-width="30%" class="demo-searchForm ">
      <el-row>
      <el-col :span="8">
        <el-form-item style="width: 80%" label="会议名称">
      <el-input v-model="searchForm.conName" ></el-input>
    </el-form-item>
      </el-col> 
      <el-col :span="8">
        <el-form-item style="width: 80%" label="开始时间">
       <el-date-picker size="large" v-model="searchForm.startTime" type="datetime" placeholder="选择日期时间" value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"> </el-date-picker> 
    </el-form-item>
      </el-col>  
      <el-col :span="8">
        <el-form-item style="width: 50%" label="状态">
      <el-select v-model="searchForm.status" placeholder="请选择状态">
      <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
    </el-select>
    </el-form-item>
      </el-col> 
     </el-row>  
    
  </el-form> 
 
</div> 
  <div class="table_title">
    <span>会议列表</span>
  </div>
  <el-table
  class="table_body"
    :data="signMeetingList"
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
       <el-button v-if="scope.row.status==0" :id="'btn'+scope.row.id" @click="startMeeting(scope.row)" type="primary" size="small">开启会议</el-button>
       <el-button v-if="scope.row.status==0" :id="'btn'+scope.row.id" @click="showModel('edit',scope.row)" type="primary" size="small">编辑</el-button>
       <el-button @click="cancelMeeting(scope.row)" type="primary" size="small">取消会议</el-button>
        
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

 
<el-tab-pane label="我参与的会议" > 
      <div class="search_box">
  <el-form :model="searchForm"  ref="searchForm" label-width="30%" class="demo-searchForm ">
     <el-row>
      <el-col :span="8">
        <el-form-item style="width: 80%" label="会议名称">
      <el-input v-model="searchForm.conName" ></el-input>
    </el-form-item>
      </el-col> 
      <el-col :span="8">
        <el-form-item style="width: 80%" label="开始时间">
       <el-date-picker size="large" v-model="searchForm.startTime" type="datetime" placeholder="选择日期时间" value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"> </el-date-picker> 
    </el-form-item>
      </el-col>  
      <el-col :span="8">
        <el-form-item style="width: 50%" label="状态">
      <el-select v-model="searchForm.status" placeholder="请选择状态">
      <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
    </el-select>
    </el-form-item>
      </el-col> 
     </el-row> 
    
  </el-form>  
</div> 
  <div class="table_title">
    <span>会议列表</span>
  </div>
  <el-table
  class="table_body"
    :data="meetingList"
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
       <el-button v-if="scope.row.status==0" :id="'btn'+scope.row.id" @click="signatureCon(scope.row)" type="primary" size="small">签到</el-button>
       <el-button @click="checkDetail(scope.row)" type="primary" size="small">详情</el-button>
       <el-button v-if="scope.row.status==4" @click="enterRoom(scope.row)" type="primary" size="small">加入会议</el-button> 
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

    <el-tab-pane label="我缺席的会议" > 
      <div class="search_box">
  <el-form :model="searchForm"  ref="searchForm" label-width="30%" class="demo-searchForm ">
     <el-row>
      <el-col :span="8">
        <el-form-item style="width: 80%" label="会议名称">
      <el-input v-model="searchForm.conName" ></el-input>
    </el-form-item>
      </el-col> 
      <el-col :span="8">
        <el-form-item style="width: 80%" label="开始时间">
       <el-date-picker size="large" v-model="searchForm.startTime" type="datetime" placeholder="选择日期时间" value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"> </el-date-picker> 
    </el-form-item>
      </el-col>  
      <el-col :span="8">
        <el-form-item style="width: 50%" label="状态">
      <el-select v-model="searchForm.status" placeholder="请选择状态">
      <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
    </el-select>
    </el-form-item>
      </el-col> 
     </el-row> 
    
  </el-form>  
</div> 
  <div class="table_title">
    <span>会议列表</span>
  </div>
  <el-table
  class="table_body"
    :data="meetingList"
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
            :current-page="currentPage"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </el-tab-pane> 
</el-tabs>
  
  <!-- 详情弹窗 -->
  <el-dialog  :title="dialogTitle"  :visible.sync="conDetail">
  <el-form :model="meetingDetail" :rules="rules" ref="meetingDetail" class="meeting_form">
    <el-form-item label="会议名称" prop="meeting_name">
      <el-input class="notEdit" v-model="meetingDetail.name"></el-input>
    </el-form-item>
    <el-form-item label="会议主题" prop="meeting_theme">
      <el-input class="notEdit" v-model="meetingDetail.theme"></el-input>
    </el-form-item> 
    <el-form-item label="参会人员" prop="meeting_join">
     <el-select multiple v-model="meetingDetail.participates" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>  
    <el-form-item label="会议开始时间" prop="meeting_startTime">
      <el-date-picker size="large" v-model="meetingDetail.startTime" type="datetime" placeholder="选择日期时间" value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"> </el-date-picker> 
    </el-form-item> 
    <el-form-item label="会议结束时间" prop="meeting_endTime">
      <el-date-picker size="large" v-model="meetingDetail.endTime" type="datetime" placeholder="选择日期时间" value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"> </el-date-picker> 
    </el-form-item> 
  </el-form>
  <div slot="footer" class="dialog-footer">
     <el-button @click="submitForm('meetingDetail')">提交</el-button> 
    <el-button @click="conDetail = false">关闭</el-button> 
  </div>
</el-dialog>

	</div>
</template>

<script>
	export default{
		data(){
			return{
    conDetail:false,//弹窗
    dialogTitle:'',//弹窗标题
		total: 5,
    currentPage: 1,
　　　 pageSize: 10,	
    searchForm:{
    conName:'',
    startTime:'',
    status:''
    },
    status:[
      {text:'已取消',value:'0'},
      {text:'未开始',value:'1'},
      {text:'已过期',value:'2'},
      {text:'已完成',value:'3'},
      {text:'正在进行',value:'4'},
    ],
    signMeetingList: [{
          id:'1',
          conName: 'XX会议1',
          startTime: '2016-05-02 19:20',
          creator: 'ccc' ,
          status:'0'
        }, {
          id:'2',
          conName: 'XX会议2',
          startTime: '2016-05-02 19:20',
          creator: 'ccc',
          status:'0'  
        }, {
          id:'3',
          conName: 'XX会议3',
          startTime: '2016-05-02 19:20',
          creator: 'ccc' ,
          status:'0'
        }, {
          id:'4',
          conName: 'XX会议4',
          startTime: '2016-05-02 19:20',
          creator: 'ccc' ,
          status:'0'
        }],
 		meetingList: [{
          id:'1',
          conName: 'XX会议1',
          startTime: '2016-05-02 19:20',
          creator: 'ccc',
          status:'1' 
        }, {
          id:'2',
          conName: 'XX会议2',
          startTime: '2016-05-02 19:20',
          creator: 'ccc',
          status:'0'  
        }, {
          id:'3',
          conName: 'XX会议3',
          startTime: '2016-05-02 19:20',
          creator: 'ccc' ,
          status:'2'
        }, {
          id:'4',
          conName: 'XX会议4',
          startTime: '2016-05-02 19:20',
          creator: 'ccc' ,
          status:'3'
        }, {
          id:'5',
          conName: 'XX会议4',
          startTime: '2016-05-02 19:20',
          creator: 'ccc' ,
          status:'4'
        }],
        //会议详情
        meetingDetail:{
          creator:'',
          name:'XXX会议',
          participates:[],
          theme:'fsjfskljfsklfjsklfjskj',
          creator:'Tansy',
          startTime:'2019-06-19 20:00:00',
          endTime:'2019-06-19 20:30:00'
        },
        //用户下拉框
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        rules: {
          meeting_name: [
            { required: true, message: '请输入会议名称', trigger: 'blur' },
            { min: 1, max: 60, message: '会议名称请控制在30字以内', trigger: 'blur' }
          ],
          meeting_join: [
            { required: true, message: '请选择参会人员', trigger: 'change' }
          ],
          meeting_startTime: [
            { type: 'date', required: true, message: '请选择会议开始时间', trigger: 'change' }
          ],
          meeting_endTime: [
            { type: 'date', required: true, message: '请选择会议结束时间', trigger: 'change' }
          ],
          meeting_theme: [
            { required: true, message: '请输入会议主题', trigger: 'blur' },
            { min: 1, max: 200, message: '会议主题请控制在100字以内', trigger: 'blur' }
          ] 
        }
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
          //会议签到
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
          //会议记录查看详情
          checkDetail(row){
            this.conDetail=true;

        },
        //展示会议详情框
        showModel(type,obj){ //type:add,edit
         var _this = this;
         this.conDetail=true;
         setTimeout(function(){
         _this.$refs["meetingDetail"].resetFields();
         if(type=='add'){
            _this.dialogTitle="创建会议";
            $(".notEdit input").removeAttr('disabled');
            _this.meetingDetail={};
         }else{
            _this.dialogTitle="编辑会议信息";
            $(".notEdit input").attr('disabled',true);
            _this.meetingDetail=obj;
         }
         
         },500);
         
        },
         //进入会议室
         enterRoom(row){
         this.$router.push({
            name:'ConRoom',
            params:{
              roonNum:row.conName,
              role:'LiveGuest',//房间观众
            }
          })
         },
         //开启会议
         startMeeting(row){ 
          this.$router.push({
            name:'ConRoom',
            params:{
              roonNum:row.conName,
              role:'LiveMaster',//房间创建者--主播
            }
          })
         },
         //取消会议
         cancelMeeting(row){

         },
         //新增、修改提交会议信息
         submitForm(form){
           this.$refs[form].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
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
  .el-form-item__error{
    left: 20%!important
  }
  .meeting_form .el-select{
    width: 60%;
  }
  .el-select .el-input--suffix{
    width: 100%
  }
  .el-select-dropdown.el-popper.is-multiple{
    top:41%!important;
  }
</style>