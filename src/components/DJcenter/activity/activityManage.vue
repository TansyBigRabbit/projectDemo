<!-- 我的活动 --> 
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
<!-- 
<el-card class="box-card data_card">
 <el-row>
    <el-col style="text-align: center;" :span="8">
      <p>我创建的活动</p>
      <p @click="tabTo(0)">132场</p>
    </el-col>
    <el-col style="text-align: center;" :span="8">
      <p>我参与的活动</p>
      <p @click="tabTo(1)">7场</p>
    </el-col> 
    <el-col style="text-align: center;" :span="8">
      <p>我缺席的活动</p>
      <p @click="tabTo(2)">7场</p>
    </el-col> 
  </el-row> 
</el-card> -->
<div>
	<el-button @click="" type="primary" size="small" @click="showModel('add')">创建活动</el-button>
</div>
<el-tabs class="tab_box" type="border-card" @tab-click="">
    <el-tab-pane label="我创建的活动">
      <div class="search_box">
      <el-form :model="searchForm"  ref="searchForm" label-width="30%" class="demo-searchForm ">
      <el-row>
      <el-col :span="8">
        <el-form-item style="width: 80%" label="活动名称">
      <el-input v-model="searchForm.conName" ></el-input>
    </el-form-item>
      </el-col> 
      <el-col :span="8">
        <el-form-item style="width: 80%" label="发布时间">
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
    <span>活动列表</span>
  </div>
  <el-table
  class="table_body"
    :data="myActivityList"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="acName"
      align="center"
      label="活动名称" >
    </el-table-column>
    <el-table-column
      :formatter="dateFormate"
      prop="createTime"
      align="center"
      label="活动开始时间" >
    </el-table-column>
    <el-table-column 
      prop="status"
      align="center"
      label="活动状态" >
      <template slot-scope="scope">
    <span v-if="scope.row.status==0">未发布</span>
    <span v-if="scope.row.status==1">已发布</span> 
    </template>
    </el-table-column>
    <el-table-column
      prop="creator"
      align="center"
      label="活动创建人" >
    </el-table-column>  
    <el-table-column 
      label="操作" 
      align="center">
      <template slot-scope="scope">
       <el-button v-if="scope.row.status==0" :id="'btn'+scope.row.id" @click="publishActivity(scope.row)" type="primary" size="small">发布</el-button>
       <el-button v-if="scope.row.status==1" :id="'btn'+scope.row.id" @click="publishActivity(scope.row)" type="primary" size="small">取消发布</el-button>
       <el-button v-if="scope.row.status==0" :id="'btn'+scope.row.id" @click="showModel('edit',scope.row)" type="primary" size="small">编辑</el-button>
       <el-button @click="deleteActivity(scope.row)" type="primary" size="small">删除</el-button>
        
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
  <el-form :model="activityDetail" :rules="rules" ref="activityDetail" class="activity_form">
    <el-form-item label="活动名称" prop="activity_name">
      <el-input class="notEdit" v-model="activityDetail.name"></el-input>
    </el-form-item>
    <div>
    	<quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
    </div>
    <el-form-item label="活动主题" prop="activity_theme">
     <!--  <el-input class="notEdit" v-model="activityDetail.theme"></el-input> -->
      
    </el-form-item>  
    <el-form-item label="活动开始时间" prop="activity_startTime">
      <el-date-picker size="large" v-model="activityDetail.startTime" type="date" placeholder="选择日期时间" value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"> </el-date-picker> 
    </el-form-item> 
    <el-form-item label="活动结束时间" prop="activity_endTime">
      <el-date-picker size="large" v-model="activityDetail.endTime" type="date" placeholder="选择日期时间" value-format=" yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"> </el-date-picker> 
    </el-form-item> 
  </el-form>
  <div slot="footer" class="dialog-footer">
     <el-button @click="submitForm('activityDetail')">提交</el-button> 
    <el-button @click="conDetail = false">关闭</el-button> 
  </div>
</el-dialog>

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
			content: `<p></p><p><br></p><ol><li><strong><em>Or drag/paste an image here.</em></strong></li><li><strong><em>rerew</em></strong></li><li><strong><em>rtrete</em></strong></li><li><strong><em>tytrytr</em></strong></li><li><strong><em>uytu</em></strong></li></ol>`,
       editorOption: {
     /*   modules: {
         toolbar: {
          container: toolbarOptions, // 工具栏 
      } 
  }*/ } 
 ,
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
    {text:'未发布',value:0},
    {text:'已发布',value:1}
    ],
 		 myActivityList: [{
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
        rules: {
          activity_name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 1, max: 60, message: '活动名称请控制在30字以内', trigger: 'blur' }
          ],
          activity_join: [
            { required: true, message: '请选择参会人员', trigger: 'change' }
          ],
          activity_startTime: [
            { type: 'date', required: true, message: '请选择活动开始时间', trigger: 'change' }
          ],
          activity_endTime: [
            { type: 'date', required: true, message: '请选择活动结束时间', trigger: 'change' }
          ],
          activity_theme: [
            { required: true, message: '请输入活动主题', trigger: 'blur' },
            { min: 1, max: 200, message: '活动主题请控制在100字以内', trigger: 'blur' }
          ] 
        }
			}
		},
		created(){

		},
		computed: {
        editor() {
      return this.$refs.myQuillEditor.quill;
    }
    },
		methods:{
         //tab跳转
          tabTo(num){
            $(".is-active").removeClass("is-active");
            $("#tab-"+num).addClass("is-active");
          }, 
      		handleSizeChange(){

      		},
      		handleCurrentChange(){

      		}, 
          //发布、取消发布活动 0未发布 1已发布
          publishActivity(type){

          },
          deleteActivity(row){

          },
          //活动记录查看详情
          checkDetail(row){
            this.conDetail=true;

          },
          //日期格式化
      		dateFormate(row, column, cellValue, index){ 
             return row.startTime
           }, 
          
        //展示活动详情框
        showModel(type,obj){ //type:add,edit
         var _this = this;
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
         
        },  
         //新增、修改提交活动信息
         submitForm(form){
           this.$refs[form].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
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