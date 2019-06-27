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
    <el-col style="text-align: center;" :span="12">
      <p>我创建的会议</p>
      <p @click="tabTo(0)">{{myCreateMeeting.pageTotal}}&nbsp;场</p>
    </el-col>
    <el-col style="text-align: center;" :span="12">
      <p>我参与的会议</p>
      <p @click="tabTo(1)">{{myJoinMeeting.pageTotal}}&nbsp;场</p>
    </el-col> 
    <!-- <el-col style="text-align: center;" :span="8">
      <p>我缺席的会议</p>
      <p @click="tabTo(2)">7场</p>
    </el-col> --> 
  </el-row> 
</el-card>
<div>
	<el-button @click="" type="primary" size="small" @click="showModel('add')">创建会议</el-button>
</div>
<el-tabs class="tab_box" type="border-card" @tab-click="handleClick">
    <el-tab-pane label="我创建的会议" >
      <div class="search_box">
      <el-form :model="myCreateMeeting.searchForm"  ref="myCreateMeeting.searchForm" label-width="30%" class="demo-myCreateMeeting.searchForm ">
      <el-row>
      <el-col :span="8">
        <el-form-item style="width: 80%" label="会议名称">
      <el-input v-model="myCreateMeeting.searchForm.conName" ></el-input>
    </el-form-item>
      </el-col> 
      <el-col :span="8">
        <el-form-item style="width: 80%" label="开始时间">
       <el-date-picker size="large" v-model="myCreateMeeting.searchForm.startTime" type="datetime" placeholder="选择日期时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
    </el-form-item>
      </el-col>  
      <el-col :span="6">
        <el-form-item style="width: 50%" label="状态">
      <el-select v-model="myCreateMeeting.searchForm.status" placeholder="请选择状态">
      <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
    </el-select>
    </el-form-item>
      </el-col> 
      <el-col :span="2">
         <el-button @click="searchCreateMeeting()" type="primary" size="small">查询</el-button>
      </el-col> 
     </el-row>  
    
  </el-form> 
 
</div> 
  <div class="table_title">
    <span>会议列表</span>
  </div>
  <el-table
  class="table_body"
    :data="myCreateMeeting.createMeetingList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="meetName"
      align="center"
      label="会议名称" >
      <template slot-scope="scope">
    <span class="meetName" @click="showModel('check',scope.row)">{{ scope.row.meetName }}</span>
    </template>
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
       <el-button v-if="scope.row.status==0" @click="startMeeting(scope.row)" type="primary" size="small">开启会议</el-button>
       <el-button v-if="scope.row.status==0" @click="showModel('edit',scope.row)" type="primary" size="small">编辑</el-button>
       <el-button v-if="scope.row.status!=0" @click="showModel('check',scope.row)" type="primary" size="small">查看</el-button>
       <el-button v-if="scope.row.status==0" @click="cancelMeeting(scope.row)" type="primary" size="small">取消会议</el-button>
        
      </template> 
    </el-table-column>
  </el-table>
  <el-pagination class="page" background
            @size-change="handleSizeChange($event)"
            @current-change="handleCurrentChange($event)"
            :current-page="myCreateMeeting.currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="myCreateMeeting.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="myCreateMeeting.pageTotal">
        </el-pagination>
    </el-tab-pane>

 
<el-tab-pane label="我参与的会议" > 
      <div class="search_box">
  <el-form :model="myJoinMeeting.searchForm"  ref="myCreateMeeting.searchForm" label-width="30%" class="demo-myCreateMeeting.searchForm ">
     <el-row>
      <el-col :span="8">
        <el-form-item style="width: 80%" label="会议名称">
      <el-input v-model="myJoinMeeting.searchForm.conName" ></el-input>
    </el-form-item>
      </el-col>  
      <el-col :span="8">
        <el-form-item style="width: 80%" label="开始时间">
       <el-date-picker size="large" v-model="myJoinMeeting.searchForm.startTime" type="datetime" placeholder="选择日期时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
    </el-form-item>
      </el-col> 
      <el-col :span="6">
        <el-form-item style="width: 50%" label="状态">
      <el-select v-model="myJoinMeeting.searchForm.status" placeholder="请选择状态">
      <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
    </el-select>
    </el-form-item>
      </el-col> 
      <el-col :span="2">
         <el-button @click="searchJoinMeeting()" type="primary" size="small">查询</el-button>
      </el-col>  
     </el-row> 
    
  </el-form>  
</div> 
  <div class="table_title">
    <span>会议列表</span>
  </div>
  <el-table
  class="table_body"
    :data="myJoinMeeting.myJoinMeetingList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="meetName"
      align="center"
      label="会议名称" >
      <template slot-scope="scope">
    <span class="meetName" @click="showModel('check',scope.row)">{{ scope.row.meetName }}</span>
    </template>
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
       <el-button v-if="scope.row.status==0" @click="signatureCon(scope.row)" type="primary" size="small">签到</el-button>
       <el-button @click="checkDetail(scope.row)" type="primary" size="small">详情</el-button>
       <el-button v-if="scope.row.status==4" @click="enterRoom(scope.row)" type="primary" size="small">加入会议</el-button> 
      </template> 
    </el-table-column>
  </el-table>
   <el-pagination class="page" background
            @size-change="handleSizeChange01"
            @current-change="handleCurrentChange01"
            :current-page="myJoinMeeting.currentPage"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="myJoinMeeting.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="myJoinMeeting.pageTotal">
        </el-pagination> 
    </el-tab-pane> 
    </el-tabs>
<!-- 
    <el-tab-pane label="我缺席的会议" > 
      <div class="search_box">
  <el-form :model="myCreateMeeting.searchForm"  ref="myCreateMeeting.searchForm" label-width="30%" class="demo-myCreateMeeting.searchForm ">
     <el-row>
      <el-col :span="8">
        <el-form-item style="width: 80%" label="会议名称">
      <el-input v-model="myCreateMeeting.searchForm.conName" ></el-input>
    </el-form-item>
      </el-col> 
      <el-col :span="8">
        <el-form-item style="width: 80%" label="开始时间">
       <el-date-picker size="large" v-model="myCreateMeeting.searchForm.startTime" type="datetime" placeholder="选择日期时间" value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"> </el-date-picker> 
    </el-form-item>
      </el-col>  
      <el-col :span="8">
        <el-form-item style="width: 50%" label="状态">
      <el-select v-model="myCreateMeeting.searchForm.status" placeholder="请选择状态">
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
    :data="myCreateMeeting.meetingList"
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
            :current-page="myCreateMeeting.currentPage"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="myCreateMeeting.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>  
    </el-tab-pane>  -->

  
  <!-- 详情弹窗 -->
  <el-dialog  :title="dialogTitle"  :visible.sync="conDetail">
  <el-form :model="meetingDetail" :rules="rules" ref="meetingDetail" class="meeting_form">
    <el-form-item label="会议名称" prop="meetName">
      <el-input class="notEdit" v-model="meetingDetail.meetName"></el-input>
    </el-form-item>
    <el-form-item label="会议主题" prop="meetTheme">
      <el-input class="notEdit" v-model="meetingDetail.meetTheme"></el-input>
    </el-form-item> 
    <el-form-item label="参会人员" prop="joinUserName">
     <el-select multiple v-model="meetingDetail.joinUserName" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.userId"
      :label="item.userName"
      :value="item.userId">
    </el-option>
  </el-select>
    </el-form-item>  
    <el-form-item label="会议开始时间" prop="startTime">
      <el-date-picker size="large" v-model="meetingDetail.startTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
    </el-form-item> 
    <el-form-item label="会议结束时间" prop="endTime">
      <el-date-picker size="large" v-model="meetingDetail.endTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
    </el-form-item> 
  </el-form>
  <div slot="footer" v-if="showBtn" class="dialog-footer">
     <el-button @click="submitForm('meetingDetail')">提交</el-button> 
    <el-button @click="closeForm('meetingDetail')">关闭</el-button> 
  </div> 
</el-dialog>

	</div>
</template>

<script>
	export default{
		data(){
			return{
    //我创建的会议部分参数
    myCreateMeeting:{
      currentPage: 1,
　　　   pagesize: 5,
      pageTotal:0,
      //查询对象
      searchForm:{
      conName:'',
      startTime:'',
      status:''
      },
      //我创建的会议记录列表
      createMeetingList: [],
     },
     //我参与的会议部分参数
     myJoinMeeting:{
      currentPage: 1,
　　　   pagesize: 5,
       pageTotal:0,
      myJoinMeetingList:[],
      searchForm:{
      conName:'',
      startTime:'',
      status:'' 
      }
     },
    conDetail:false,//弹窗
    dialogTitle:'',//弹窗标题 
    showBtn:false, 
    //会议详情
    meetingDetail:{},
    //用户下拉框
    options: [],
    status:[
      {text:'已取消',value:'0'},
      {text:'未开始',value:'1'},
      {text:'已过期',value:'2'},
      {text:'已完成',value:'3'},
      {text:'正在进行',value:'4'},
    ], 
    //表单验证规则
    rules: {
          meetName: [
            { required: true, message: '请输入会议名称', trigger: 'blur' },
            { min: 1, max: 60, message: '会议名称请控制在30字以内', trigger: 'blur' }
          ],
          joinUserName: [
            { required: true, message: '请选择参会人员', trigger: 'change' }
          ],
          startTime: [
            {required: true, message: '请选择会议开始时间', trigger: 'change' }
          ],
          endTime: [
            {required: true, message: '请选择会议结束时间', trigger: 'change' }
          ],
          meetTheme: [
            { required: true, message: '请输入会议主题', trigger: 'blur' },
            { min: 1, max: 200, message: '会议主题请控制在100字以内', trigger: 'blur' }
          ] 
        }
			}
		},
		created(){
     this.getMycreateList(1,5);
     this.getMyJoinList(1,5);
     //参会人员下拉数据填充
     this.getParticipants();
		},
		methods:{
      //获取我创建的会议列表数据
          getMycreateList(num,size){
          var _this = this;
           this.$http.get(this.$ports.conference.list,{
           'pageNum':num,
           'size':size,
           'creator':window.localStorage.getItem('userId')
           }).then(res=>{
          console.log("获取我创建的会议数据......");
          console.log(res.data); 
          _this.myCreateMeeting.createMeetingList = res.data.data;
          _this.myCreateMeeting.pageTotal = res.data.page.total;
          });
          },
          //获取我参与的会议列表
          getMyJoinList(num,size){
          var _this = this;
           this.$http.get(this.$ports.conference.list,{
           'pageNum':num,
           'size':size,
           'joinUserName':window.localStorage.getItem('userId')
           }).then(res=>{
          console.log("获取我参与的会议数据......");
          console.log(res.data); 
          _this.myJoinMeeting.myJoinMeetingList = res.data.data;
          _this.myJoinMeeting.pageTotal = res.data.page.total;
          });
         },
         //tab跳转
          tabTo(num){
            if(num==0){
            this.getMycreateList(1,5);
            }else{
            this.getMyJoinList(1,5);
            }
            $(".is-active").removeClass("is-active");
            $("#tab-"+num).addClass("is-active");
          },
          handleClick(tab,event){
            if(tab.index==0){
              this.getMycreateList(1,5);
            }else{
              this.getMyJoinList(1,5);
            }
          },
          //会议签到
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
            this.myCreateMeeting.pagesize = size;
            this.getMycreateList(1,size); 
      		},
      		handleCurrentChange(currentPage){
            console.log("页数:"+currentPage);
            this.myCreateMeeting.currentPage = currentPage;
            this.getMycreateList(this.myCreateMeeting.currentPage,this.myCreateMeeting.pagesize);
           },
           handleSizeChange01(size){
            console.log("条数:"+size);
            this.myJoinMeeting.pagesize = size;
            this.getMyJoinList(1,size); 
          },
          handleCurrentChange01(currentPage){
            console.log("页数:"+currentPage);
            this.myJoinMeeting.currentPage = currentPage;
            this.getMyJoinList(this.myJoinMeeting.currentPage,this.myJoinMeeting.pagesize);
           },
          //日期格式化
      		dateFormate(row, column, cellValue, index){ 
            if(typeof cellValue=='undefined'){
              return
            }else{
             var num = cellValue.length;
             return cellValue.slice(0,num-2); 
            }
             
           }, 
          //会议记录查看详情
          checkDetail(row){
            this.conDetail=true;

        },
        //展示会议详情框
        showModel(type,obj){ //type:add,edit
          this.conDetail=true;
          var _this = this;
          //this.$refs["meetingDetail"].resetFields();
         if(type=='add'){
            this.showBtn=true;
            _this.dialogTitle="创建会议";
            $(".notEdit input").removeAttr('disabled');
            _this.meetingDetail={};
         }else{
            if (type=='edit') {
            _this.dialogTitle="编辑会议信息";
            }else{
            _this.dialogTitle="会议详情";
            }
            //查询单条数据
            var _this = this;
           this.$http.get(this.$ports.conference.findById,{ 
            'id':obj.id
           }).then(res=>{
          console.log("findbyId......");
          console.log(res.data);  
          }); 
         }
         //else if(type=='edit'){
          /*var str ='2015-08-18 15:13:15';
            str = str.replace(/-/g,"/");
            obj.startTime = new Date(str ); */
           // this.showBtn=true;
           // _this.dialogTitle="编辑会议信息";
           // $(".notEdit input").attr('disabled',true);
            //_this.meetingDetail=obj;
        // }else{
           // this.showBtn=false;
           // _this.dialogTitle="会议详情";
           // $("input").attr('disabled',true);
           // _this.meetingDetail=obj;
        // }
         
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
         var _this = this;
           this.$http.post(this.$ports.userInfo+'/queryListWithNoPage',{ 
           'id':row.id,
           'status':4
           }).then(res=>{
          console.log("取消会议......");
          console.log(res.data); 
          });
         },
         closeForm(form){
          this.$refs[form].clearValidate();
          this.conDetail=false; 
         },
         //新增、修改提交会议信息
         submitForm(form){
           var _this = this;
           this.$refs[form].validate((valid) => {
          if (valid) {
            if(typeof(this.meetingDetail.id)=='undefined'){
             //新增
             _this.meetingDetail.status=0;
             _this.meetingDetail.creator=loginInfoMain.userId;
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
              _this.getMycreateList(1,5);
              _this.getMyJoinList(1,5);
              //操作成功刷新页面退出弹窗
              _this.conDetail=false;
             } 
            alert(res.data.msg);

            });
         },
         getParticipants(){
          var _this = this;
           this.$http.get(this.$ports.userInfo+'/queryListWithNoPage',{ 
           }).then(res=>{
          console.log("获取用户列表下拉框数据......");
          console.log(res.data);
          if(res.data.code==0){ 
             this.options = res.data.data;
          }else{
          alert(res.data.msg);
            }
          });
        },
        //查询我创建的会议列表
        searchCreateMeeting(){
            var _this = this;
           this.$http.get(this.$ports.conference.list,{
           'pageNum':1,
           'size':_this.myCreateMeeting.pagesize,
           'creator':window.localStorage.getItem('userId'),
           'meetName':_this.myCreateMeeting.searchForm.conName,
           'status':_this.myCreateMeeting.searchForm.status,
           'startTime':_this.myCreateMeeting.searchForm.startTime
           }).then(res=>{
          console.log("查询我创建的会议数据......");
          console.log(res.data); 
          _this.myCreateMeeting.createMeetingList = res.data.data;
          });
        },
        //查询我参与的会议列表
        searchJoinMeeting(){
         var _this = this;
           this.$http.get(this.$ports.conference.list,{
           'pageNum':1,
           'size':_this.myJoinMeeting.pagesize,
           'creator':window.localStorage.getItem('userId'),
           'meetName':_this.myJoinMeeting.searchForm.conName,
           'status':_this.myJoinMeeting.searchForm.status,
           'startTime':_this.myJoinMeeting.searchForm.startTime
           }).then(res=>{
          console.log("查询我参与的会议数据......");
          console.log(res.data); 
          _this.myJoinMeeting.myJoinMeetingList = res.data.data;
          });
        }
		}
	}
</script>

<style>

</style>