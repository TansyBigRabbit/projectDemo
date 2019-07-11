<!-- 会议列表 --> 
<template>
	<div>
		<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>系统管理</el-breadcrumb-item>
  <el-breadcrumb-item>角色管理</el-breadcrumb-item>  
  </el-breadcrumb>
</div> 
  
<el-tree
  :data="treeData"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps">
</el-tree>

    <el-card class="box-card">
      <div class="search_box">
      <el-input style="width: 15%" v-model="roleList.searchForm.userName" placeholder="请输入角色名称"></el-input>  
        <!-- <el-select style="width: 15%" v-model="roleList.searchForm.state" placeholder="请选择成员">
          <el-option
        v-for="item in users"
        :key="item.userId"
        :label="item.userName"
        :value="item.userId">
              </el-option>
        </el-select>  -->
        <el-button @click="searchUser()" type="primary" size="large">查询</el-button> 
        <el-button @click="showModel('add')" type="warning" size="large">新增角色</el-button> 
 
</div> 
  <div class="table_title">
    <span>角色列表</span>
  </div>
 <el-table
  v-loading="createLoading"
  class="table_body"
    :data="roleList.userlistTable"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="userName"
      align="center"
      label="角色名称" >
      <template slot-scope="scope">
    <span class="meetName" @click="showModel('edit',scope.row)">{{ scope.row.userName }}</span>
    </template>
    </el-table-column>
    <el-table-column 
      prop="userId"
      align="center"
      label="成员" >
    </el-table-column>     
    <el-table-column 
      label="操作" 
      align="center">
      <template slot-scope="scope">
        <el-button @click="showModel('user',scope.row)" type="primary" size="small">人员维护</el-button>
        <el-button @click="showModel('right',scope.row)" type="primary" size="small">权限维护</el-button>  
      </template> 
    </el-table-column>
  </el-table>
  <el-pagination class="page" background
            @size-change="handleSizeChange($event)"
            @current-change="handleCurrentChange($event)"
            :current-page="roleList.currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="roleList.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="roleList.total">
        </el-pagination>  
  </el-card>
  <!-- 角色详情弹窗 -->
  <el-dialog  title="角色编辑" :visible.sync="roleDialog">
  <el-form :model="roleList.roleDetail" :rules="rules" ref="roleList.roleDetail" class="meeting_form">
    <el-form-item label="角色名称" prop="name">
      <el-input v-model="roleList.roleDetail.name" ></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
  	<el-button @click="submitRole()">提交</el-button> 
    <el-button @click="roleDialog = false">关闭</el-button> 
  </div>
</el-dialog>
 <!-- 角色权限维护 -->
  <el-dialog  title="角色权限维护" :visible.sync="roleRightDialog">
  <el-form :model="roleList.roleRight" :rules="rules" ref="roleList.roleRight" class="meeting_form">
    <el-form-item label="角色名称" prop="userName">
      <!-- <el-input v-model="userDetail.userName" ></el-input> -->
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
  	<el-button @click="submitUserInfo('userDetail')">提交</el-button> 
    <el-button @click="roleRightDialog = false">关闭</el-button> 
  </div>
</el-dialog>
 <!-- 人员维护 -->
  <el-dialog  title="角色人员维护" :visible.sync="roleUserDialog">
  <el-form :model="roleList.roleUser" :rules="rules" ref="roleList.roleUser" class="meeting_form">
    <el-form-item label="角色成员" prop="userName">
      <el-select multiple v-model="roleList.roleUser" filterable placeholder="请选择">
    <el-option
      v-for="item in users"
      :key="item.userId"
      :label="item.userName"
      :value="item.userId">
    </el-option>
  </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
  	<el-button @click="submitUserInfo('userDetail')">提交</el-button> 
    <el-button @click="roleUserDialog = false">关闭</el-button> 
  </div>
</el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
		return{
	//table加载时的loading 
    createLoading:true, 
    //新增角色弹窗
    roleDialog:false,
    //人员分配弹窗
    roleUserDialog:false,
    //权限分配弹窗
    roleRightDialog:false,
    //权限列表数据
    roleList:{
    pageSize:10,
    total:0,
    currentPage:1,
    rolelistTable:[],
    searchForm:{},
    roleDetail:{},
    roleUser:{},
    roleRight:{},
    },
    //人员列表
    users:[], 
    rules:{ 
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 1, max: 60, message: '角色名称请控制在30字以内', trigger: 'blur' }
          ] 
			},
      treeData:[],
      defaultProps:{
          children: 'children',
          label: 'label'
        },
    }
     

		},
		created(){
			//获取角色列表
		this.getRoleList(1,10);
		  //获取用户下拉数据
		this.getUserList();
        

        console.log("查询权限列表...");
          this.$http.get(this.$ports.permission.list).then((res)=>{
            if(res.data.code==0){
              console.log(res.data);
              //构造树形图
              this.createTree(res.data.data);
            }
          }) 
		},
		methods:{ 
        getRoleList(num,size){
        this.createLoading=true;
          var _this = this;
           this.$http.get(this.$ports.role.list,{
           'pageNum':num,
           'size':size, 
           }).then(res=>{
          this.createLoading=false
          console.log("获取角色列表......");
          console.log(res.data); 
          if(res.data.code==0){
           _this.roleList.rolelistTable = res.data.data;
          _this.roleList.total = res.data.page.total; 
          _this.roleList.pageSize = size;
          _this.roleList.currentPage = num;
        }else{
          _this.$message.error("查询失败!");
        }
          
          });
      },
        getUserList(){
           var _this = this;
           this.$http.get(this.$ports.userInfo+'/queryListWithNoPage',{ 
           }).then(res=>{
          console.log("获取用户列表下拉框数据......");
          console.log(res.data);
          if(res.data.code==0){ 
             _this.users = res.data.data;
          }else{
          _this.$message.error(res.data.msg);
            }
          });
      },
      //打开对应弹窗
      showModel(type,obj){ //type:add,edit
      	 var _this = this;
          if(type=='add'){
          //新增角色
          _this.roleDialog = true;
          }else if(type=='edit'){
          //编辑角色
          _this.roleDialog = true;
          _this.$http.get(_this.$ports.role.findbyId,obj.id).then(
          	function(res){
          		console.log('角色信息findbyid...');
          		console.log(res);
          	})
          }else if(type=='user'){
          //维护人员
          _this.roleUserDialog=true;
          }else{
          //维护权限
          console.log("查询权限列表...");
          _this.$http.get(_this.$ports.permission.list).then((res)=>{
            if(res.data.code==0){
              console.log(res.data);
              //构造树形图
            }
          })
          _this.roleRightDialog=true;

          } 
         },
         //新增、修改角色
        submitRole(){
        var url,reMsg;
        var _this = this;
        if(typeof this.roleList.roleDetail.id=='undefined'){
          //新增
          console.log("新增角色...");
          url = this.$ports.role.insert;
          reMsg = "新增成功!"
         }else{
          //修改
          url = this.$ports.role.update;
          reMsg = "新增失败!"
          console.log("修改角色...");
         }
         this.$http.post(url,_this.roleList.roleDetail).then(
          function(res){
            if(res.data.code==0){
              _this.$message({
              message: reMsg,
              type: 'success'
            });
              _this.roleDialog=false;
              _this.getRoleList(1,10);
            }else{
              _this.$message.error("操作失败!");
            }
          })
        },
       //构造树形图
       createTree(data){
       var num = data.length;
       for(let i=0;i<num;i++){
        if(data[i].pid==0){
          var obj={children:[]};
          obj.id=data[i].id;
          obj.label=data[i].name;
          for(let j=0;j<num;j++){
            if(data[j].pid==data[i].id){
            var obj1={};
            obj1.id = data[j].id;
            obj1.label = data[j].name;
            obj.children.push(obj1)
            }
          }
        this.treeData.push(obj);
        }
       }
       },



        //新增 修改
        submitUserInfo(form){ 
        	var _this = this;
           this.$refs[form].validate((valid) => {
          if (valid) {
            _this.userDetail.departId = '1';
            if(_this.add){
              if(_this.userDetail.password01!=_this.userDetail.password){
                _this.$message.error("两次输入的密码不一致!");
                return
              }
              delete _this.userDetail.password01;
             //新增  
             _this.operateData('add');
             }else{
              //修改
              delete _this.userDetail.password01;
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
          url = this.$ports.user.insert;
          console.log("新增角色......");
         }else{
          url = this.$ports.user.update;
          console.log("修改角色......");
         }
          this.$http.post(url,_this.userDetail).then(res=>{
            console.log(res.data);
             if(res.data.code==0){
              _this.$message({
              message: '操作成功！',
              type: 'success'
            });
              _this.getUserList(1,5)
              //操作成功刷新页面退出弹窗
              _this.conDetail=false;
             } 
            _this.$message.error(res.data.msg);

            });
         },
          searchUser(){
          var params={}  
          params={
            'pageNum':1,
            'size':5,
            'userName':this.roleList.searchForm.userName,
            'userId':this.roleList.searchForm.userId,
            'state':this.roleList.searchForm.state,
            'createTime':this.roleList.searchForm.createTime,
           }
          
          var _this = this;
           this.$http.get(this.$ports.user.list,params).then(res=>{
          console.log("查询角色数据......");
          console.log(res.data); 
          _this.roleList.userlistTable = res.data.data;
          _this.roleList.total = res.data.page.total;
          });
          },
      		handleSizeChange(size){
            console.log("条数:"+size);
            this.roleList.pageSize = size;
            this.getUserList(1,size); 
          },
          handleCurrentChange(currentPage){
            console.log("页数:"+currentPage);
            this.roleList.currentPage = currentPage;
            this.getUserList(this.roleList.currentPage,this.roleList.pageSize);
          },  
          //日期格式化
      		dateFormate(row, column, cellValue, index){
          var num =  row.createTime.length;
             return row.createTime.slice(0,num-2);
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
          _this.userdetAil = res.data.data; 
          }); 
          this.conDetail=true;

        }, 
		}
	}
</script>

<style> 
</style>