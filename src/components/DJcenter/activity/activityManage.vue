<!-- 我的活动 --> 
<template>
  <div>
	<div v-if="creating">
		<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>党建中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>活动</el-breadcrumb-item> 
  <el-breadcrumb-item>活动管理</el-breadcrumb-item> 
  </el-breadcrumb>
</div>
<div>
	<el-button @click="" type="primary" size="small" @click="showModel('add')">创建活动</el-button>
</div>
<el-tabs class="tab_box" type="border-card" @tab-click="">
    <el-tab-pane label="我创建的活动">
      <div class="search_box">
        <el-input style="width: 20%" v-model="searchForm.name" placeholder="请输入活动名称"></el-input>
        <el-date-picker size="large" v-model="searchForm.activityStartTime" type="datetime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-date-picker size="large" v-model="searchForm.activityEndTime" type="datetime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-select v-model="searchForm.state" placeholder="请选择状态">
        <el-option  v-for="item in status" :label='item.text' :value="item.value"></el-option> 
        </el-select>
        <el-button @click="searhMyActivity()" type="primary" size="small">查询</el-button> 
 
</div> 
  <div class="table_title">
    <span>活动列表</span>
  </div>
  <el-table
    v-loading="createlLoading"
    class="table_body"
    :data="myActivityList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      align="center"
      label="活动名称" >
      <template slot-scope="scope">
    <span class="meetName" @click="showModel('check',scope.row)">{{ scope.row.name }}</span>
    </template>
    </el-table-column>
    <el-table-column
      fixed
      prop="eventLocation"
      align="center"
      label="活动地点" >
    </el-table-column>
    <el-table-column
      :formatter="dateFormate"
      prop="activityStartTime"
      align="center"
      label="活动开始时间" >
    </el-table-column>
    <el-table-column 
      prop="state"
      align="center"
      label="活动状态" >
      <template slot-scope="scope">
    <span v-if="scope.row.state==0">未发布</span>
    <span v-if="scope.row.state==1">已发布</span> 
    </template>
    </el-table-column>  
    <el-table-column 
      label="操作" 
      align="center">
      <template slot-scope="scope">
       <el-button v-if="scope.row.state==0" @click="publishActivity(scope.row)" type="primary" size="small">发布</el-button>
       <el-button v-if="scope.row.state==1" @click="publishActivity(scope.row)" type="primary" size="small">取消发布</el-button>
       <el-button  @click="showModel('edit',scope.row)" type="primary" size="small">编辑</el-button>
       <el-button @click="deleteActivity(scope.row)" type="primary" size="small">删除</el-button>
        
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
    </el-tab-pane> 
</el-tabs> 
</div>

  <div v-else>
    <div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>党建中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>活动</el-breadcrumb-item> 
  <el-breadcrumb-item @click="creating=true">活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>新建活动</el-breadcrumb-item>  
  </el-breadcrumb>
</div>
<e-card
<el-form :model="activityDetail" :rules="rules" ref="activityDetail" class="activity_form">
    <el-form-item label="活动名称" prop="name">
      <el-input class="notEdit" v-model="activityDetail.name"></el-input>
    </el-form-item>
    <el-form-item label="活动地点" prop="eventLocation ">
      <el-input  v-model="activityDetail.eventLocation "></el-input>
    </el-form-item>
    <el-form-item label="活动内容" prop="theme">
     <div>
      <quill-editor
      v-model="activityDetail.theme"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
    </div>
    </el-form-item>  
    <el-form-item label="活动开始时间" prop="activityStartTime">
      <el-date-picker size="large" v-model="activityDetail.activityStartTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
    </el-form-item> 
    <el-form-item label="活动结束时间" prop="activityEndTime">
      <el-date-picker size="large" v-model="activityDetail.activityEndTime" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
    </el-form-item> 
  </el-form>
  <el-button @click="submitForm('activityDetail')">提交</el-button> 
    <el-button @click="conDetail = false">关闭</el-button> 
  </div>
</div>
</template>

<script>
//调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from "vue-quill-editor"; 
const toolbarOptions = [
      ['bold'],
      ['image']                                     
    ]
	export default{
		components: {
         quillEditor
        },
		data(){
			return{
      creating:false,
      createlLoading:true,
			theme:'' /*`<p></p><p><br></p><ol><li><strong><em>Or drag/paste an image here.</em></strong></li><li><strong><em>rerew</em></strong></li><li><strong><em>rtrete</em></strong></li><li><strong><em>tytrytr</em></strong></li><li><strong><em>uytu</em></strong></li></ol>`*/,
       editorOption: {
     /*   modules: {
         toolbar: {
          container: toolbarOptions, // 工具栏 
      } 
  }*/ } 
 ,
    conDetail:false,//弹窗
    dialogTitle:'',//弹窗标题

		total: 0,
    currentPage: 1,
　　pageSize: 5,	
    
    //dialog下的按钮
    showBtn:false,
    searchForm:{},  
    status:[
    {text:'未发布',value:0},
    {text:'已发布',value:1},
    {text:'全部',value:''}
    ],
 		 myActivityList: [],
        //活动详情
        activityDetail:{}, 
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 60, message: '活动名称请控制在30字以内', trigger: 'blur' }
          ], 
          activityStartTime : [
            { required: true, message: '请选择活动开始时间', trigger: 'change' }
          ],
          activityEndTime : [
            {  required: true, message: '请选择活动结束时间', trigger: 'change' }
          ],
          theme: [
            { required: true, message: '请输入活动主题', trigger: 'blur' }, 
          ],
          eventLocation: [
            { required: true, message: '请输入活动地点', trigger: 'blur' }, 
          ]
        }
			}
		},
		created(){
    this.getMyActivity(1,5);
		},
		computed: {
        editor() {
      return this.$refs.myQuillEditor.quill;
    }
    },
		methods:{
      getMyActivity(num,size){
        this.createlLoading=true;
        var _this = this;
           this.$http.get(this.$ports.activity.list,{
           'pageNum':num,
           'size':size,
           'creator':window.localStorage.getItem('userId')
           }).then(res=>{
          console.log("获取我创建的活动数据......");
          console.log(res.data); 
          _this.myActivityList = res.data.data;
          _this.total = res.data.page.total;
          _this.pageSize = size;
          _this.currentPage = num;
          _this.createlLoading=false;
          });
      },
         //tab跳转
          tabTo(num){
            $(".is-active").removeClass("is-active");
            $("#tab-"+num).addClass("is-active");
          }, 
          jumpTo(){
            this.creating=true;
          },
      		handleSizeChange(size){
            console.log("条数:"+size);
            this.pageSize = size;
            this.getMyActivity(1,size); 
      		},
      		handleCurrentChange(currentPage){
            console.log("页数:"+currentPage);
            this.currentPage = currentPage;
            this.getMycreateList(this.currentPage,this.pageSize);
      		}, 
          //发布、取消发布活动 0未发布 1已发布
          publishActivity(row){
            var status;
            var _this = this;
           if(row.state==0){
             status=1;
             console.log("发布活动......");
           }else{
             status=0;
             console.log("取消活动......");
           }
           
           this.$http.post(this.$ports.activity.update,{ 
           'id':row.id,
           'state':status
           }).then(res=>{ 
          console.log(res.data);  
          if(res.data.code==0){
          this.$message({
          message: '操作成功！',
          type: 'success'
          });
          _this.getMyActivity(1,5);
          }else{
          this.$message.error(res.data.msg)
          }
          });
          },
          deleteActivity(row){
            var _this=this;
           this.$http.post(this.$ports.activity.delete,{
            id:row.id
           }).then(res=>{
            console.log(res.data);
             if(res.data.code==0){ 
             this.$message({
              message: '删除失败！',
              type: 'success'
            });
              //操作成功刷新页面退出弹窗 
              _this.getMyActivity(1,5); 
             } 
            this.$message.error(res.data.msg);

            });
          },
          //活动记录查看详情
          checkDetail(row){
            this.conDetail=true;

          },
          //日期格式化
      		dateFormate(row, column, cellValue, index){ 
             return row.activityStartTime.slice(0,row.activityStartTime.length-2);
           }, 
          
        //展示活动详情框
        showModel(type,obj){ //type:add,edit
          this.conDetail=true;
          var _this = this;
          $("input").removeAttr('disabled'); 
         if(type=='add'){
            this.showBtn=true;
            _this.dialogTitle="创建活动";
            _this.activityDetail={};
         }else{
            if (type=='edit') {
              _this.showBtn=true;
              $(".notEdit input").attr('disabled',true);
            _this.dialogTitle="编辑活动信息";
            }else{
               _this.showBtn=false;
               $("input").attr('disabled',true);
            _this.dialogTitle="活动详情";
            }
            //查询单条数据
           this.$http.get(this.$ports.activity.findById,{ 
            'id':obj.id
           }).then(res=>{
          console.log("findbyId......");
          console.log(res.data); 
          if(res.data.code==0){
           _this.activityDetail = res.data.data; 
          }else{
           this.$message.error(res.data.msg);
          }
         
          }); 
         }
         /*var _this = this;
         this.conDetail=true;
         setTimeout(function(){
         _this.$refs["activityDetail"].resetFields();
         if(type=='add'){
            _this.dialogTitle="创建活动";
            $(".notEdit input").removeAttr('disabled');
            _this.activityDetail={};
         }else{
            _this.dialogTitle="编辑活动信息";
            $(".notEdit input").attr('disabled',true);
            _this.activityDetail=obj;
         }
         
         },500);
         */
        },
        searhMyActivity(){ 
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
           'creator':window.localStorage.getItem('userId'),
           'name':_this.searchForm.name,
           'state':_this.searchForm.state,
           'activityStartTime':_this.searchForm.activityStartTime,
           'activityEndTime':_this.searchForm.activityEndTime
           }).then(res=>{
          console.log("查询我创建的活动数据......");
          console.log(res.data); 
          if(res.data.code==0){ 
          _this.myActivityList = res.data.data;
          _this.total = res.data.page.total; 
          _this.currentPage = 1;
        }else{
           this.$message.error("查询失败，"+res.data.msg);
        }
          
          });
        }, 
         //新增、修改提交活动信息
         submitForm(form){
          console.log("打印出富文本内容......");
          console.log(this.activityDetail.theme);
           this.$refs[form].validate((valid) => {
          if (valid) {
            console.log("验证通过，开始提交表单......");
            if(typeof(this.activityDetail.id)=='undefined'){
              //新增
             this.activityDetail.state=0;
             this.activityDetail.creator=window.localStorage.getItem('userId');
             this.operateData('add');
            }else{

             this.operateData('update');
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
         },
         operateData(type){
          var url ;
          var _this = this;
         if(type=='add'){
          url = this.$ports.activity.insert;
          console.log("新增活动......");
         }else{
          url = this.$ports.activity.update;
          console.log("修改活动......");
         }
          this.$http.post(url,_this.activityDetail).then(res=>{
            console.log(res.data);
             if(res.data.code==0){ 
              this.$message({
              message: '操作成功！',
              type: 'success'
            });
              //操作成功刷新页面退出弹窗
              _this.conDetail=false;
              _this.getMyActivity(1,5); 
             } 
            this.$message.error(res.data.msg);

            });
         }, 
         onEditorReady(editor) { // 准备编辑器
        },
         onEditorBlur(){}, // 失去焦点事件
         onEditorFocus(){}, // 获得焦点事件
         onEditorChange(){}, // 内容改变事件
	}
}

</script>

<style scoped>
  .meetName{
    text-decoration: underline;
    cursor: pointer;
    color: #409EFF
  }
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
  .activity_form .el-input{
    width: 60%
  }
  .activity_form label{
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
  .activity_form .el-select{
    width: 60%;
  }
  .el-select .el-input--suffix{
    width: 100%
  }
  .el-select-dropdown.el-popper.is-multiple{
    top:41%!important;
  }
  svg {
    width: auto; 
    height: auto; 
    border-radius: auto; 
    box-shadow: auto; 
    display: block; 
    margin: auto; 
    cursor: pointer; 
}
</style>