<!-- 学宣&视频列表 -->
<template>
	<!--  accept='.mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb'  -->
  <div>
  <div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>综治中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>学宣中心</el-breadcrumb-item> 
  <el-breadcrumb-item>视频列表</el-breadcrumb-item> 
  </el-breadcrumb>
  </div> 
  <el-tabs type="border-card" @tab-click="handleClick">
  <el-tab-pane label="视频列表">
  	<div class="searchBox">
  		 <el-input style="width: 20%" v-model="searchForm01.name" placeholder="请输入视频名称"></el-input>
  		  
        <el-date-picker style="width: 20%" size="large" v-model="searchForm01.startTime" type="datetime" placeholder="选择开始时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-date-picker style="width: 20%" size="large" v-model="searchForm01.endTime" type="datetime" placeholder="选择结束时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-select v-model="searchForm01.type" placeholder="请选择视频类别">
        <el-option  v-for="item in videoTypes" :label='item.name' :value="item.id"></el-option> 
        </el-select>
        <el-button @click="getVideoList()" type="primary" size="small">查询</el-button> 
        <el-button @click="reset('searchForm01')" type="primary" size="small">重置</el-button>
  	</div>
  	<div v-loading="tab1Loading" class="containerBox">
  		<div v-if="videoList.length>0" class="videoItem" style="position: relative;" v-for="item in videoList" @click="showVideoDialog(item)">
  			<img style="max-width: 100%;cursor: pointer" :src="item.imgPath">
  			<div :style='styleList'  >{{item.type}}</div>
  			 
  			 
  			<div>
  				<div><span class="sub_title">上传人:{{item.userName}}</span></div> 
  				<div><span class="sub_title">上传时间:</span> {{item.createTime}}</div> 
  			</div>
  		</div>
       <div v-else>暂无视频</div>
  	</div>
     <el-pagination
        v-if="videoList.length>0"
        style="text-align: center;"
        layout="prev, pager, next"
        background
        :total="videoTotal"
        :current-page="currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>
  </el-tab-pane>
  <el-tab-pane label="我的视频">
  	<div class="searchBox">
  		 <el-input style="width: 20%" v-model="searchForm02.name" placeholder="请输入视频名称"></el-input>
  		  
        <el-date-picker style="width: 20%" size="large" v-model="searchForm02.startTime" type="datetime" placeholder="选择开始时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-date-picker style="width: 20%" size="large" v-model="searchForm02.endTime" type="datetime" placeholder="选择结束时间" value-format=" yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> 
        <el-select v-model="searchForm02.type" placeholder="请选择视频类别">
        <el-option  v-for="item in videoTypes" :label='item.name' :value="item.id"></el-option> 
        </el-select>
        <el-button @click="getMyVideo()" type="primary" size="small">查询</el-button>
        <el-button @click="reset('searchForm02')" type="primary" size="small">重置</el-button>  
        <el-button @click="showEditDialog('add')" type="primary" size="small">上传视频</el-button> 
  	</div>
  	<div v-loading="tab2Loading" class="containerBox" > 
  		<div v-if="myVideoList.length>0" class="videoItem" style="position: relative;" v-for="(item,index) in myVideoList" >
  			<div @mouseover="itemOver(index)" @mouseout="itemOut(index)" style="position: relative;"><img style="max-width: 100%;cursor: pointer" :src="item.imgPath">
            <div :id="'video'+index" class="operateBox" style="position: absolute;bottom: 5px;display: none">
            	<span @click="showEditDialog('edit',item)">编辑</span>
            	<span @click="showVideoDialog(item)">播放</span>
              <span @click="deleteVideo(item)">删除</span>
            </div>
  			</div>
  			<div :style='styleList'>{{item.type}}</div>
  			 
  			 
  			<div>
  				<div><span class="sub_title">上传人:{{item.userName}}</span></div> 
          <div><span class="sub_title">上传时间:</span> {{item.createTime}}</div> 
  			</div>
  		</div> 
      <div v-else>暂无视频</div>
  </div>
        <el-pagination
        v-if="myVideoList.length>0"
        style="text-align: center;"
        layout="prev, pager, next"
        background
        :total="videoTotal01"
        :current-page="currentPage01"
        @current-change="handleCurrentChange01">
      </el-pagination>
  </el-tab-pane> 
  </el-tabs>

		         <!--  <el-upload
                    class="avatar-uploader"
                    ref="upload01"
                    action="string"
                    accept=".mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb" 
                    :http-request="httpRequest"  
                    :show-file-list="false"
                    > 
                    <video v-if="imgFlag" :src="item.url" controls="controls"> </video>
                    <el-button size="mini" type="primary" >导入</el-button>
                </el-upload> -->
    <!--观看视频弹窗-->
    <el-dialog :title="currentVideo.name" :visible.sync="showVideo">
    	<div style="text-align: center;">
    		<video style="width: 90%" :src="currentVideo.videoPath" controls="controls"></video>
    	</div>
    </el-dialog>
  
    <!--新增/修改视频弹窗-->
    <uploadDialog :params="params" v-on:refreshTab="refreshTab" v-on:closeDialog="closeEditDialog" 
    @uploadVideo="uploadVideo($event)"></uploadDialog>

	</div>
</template>

<script>
  var that;
  import uploadDialog from '../../childComponent/uploadDialog'
	export default{
    components:{
      uploadDialog
    },
		data(){
            return{
            imgFlag:false,
			fileList:[],
			item:{

			},
			//
			searchForm01:{

			},
      searchForm02:{

      },
      //
      currentPage:1,
      videoTotal:0,
      videoTotal01:0,
      currentPage01:1,
      //
      tab2Loading:false,
      tab1Loading:false,
      //
			videoList:[],
      //
      myVideoList:[],
             currentVideo:{},
             videoTypes:[],
             showVideo:false,
             editVideo:false,
             styleList:{
             	position:'absolute',
             	top:0,
             	right:0,
             	backgroundColor:'#FFB400',
             	color:'white',
             	padding:'3px 3px'
             }, 
             videoForm:{},
             //传给子组件的参数
             params:{
              open:false,
              videoItem:null
             }
            }
		},
		created(){
        that = this;
        this.getVideoType();
        this.getVideoList();
		},
		methods:{
      getVideoType(){
         console.log("获取视频类别");
         that.$http.get(that.$ports.videoType).then(res=>{
          if(res.data.code==0){
            that.videoTypes = res.data.data;
          }else{
            that.$message.error("获取视频类别失败!");
          }
         })
      },
		httpRequest(data){
			var _this = this;
			console.log(data)
			_this.imgFlag = true;
			 _this.item.url = URL.createObjectURL(data.file);
			 // var reads = new FileReader();
			 // reads.readAsDataURL(data.file);
			 // reads.onload = function(e) {
			 // 	_this.imgFlag = true;
			 //    _this.item.url = this.result; 
			 // };
		 },
		 //点击tab切换触发事件
		 handleClick(tab,event){
		 	this.searchForm={};
            if(tab.index==0){
              this.getVideoList();
            }else{
              this.getMyVideo();
            }
          },
         getVideoList(){
          that.tab1Loading = true; 
          console.log("获取所有视频列表");
          that.searchForm01 = Object.assign(that.searchForm01,{
            'pageNum':that.currentPage,
            'size':8, 
          });
          that.$http.get(that.$ports.studyVideoList.list,that.searchForm01).then(res=>{
            that.tab1Loading = false;
            if(res.data.code==0){
              that.videoList = res.data.data;
            }else{
              that.$message.error(res.data.msg);
            } 
          })
         },
         getMyVideo(){ 
          that.tab2Loading = true;
		     console.log("获取我的视频列表");
         that.searchForm02 = Object.assign(that.searchForm02,{
            'pageNum':that.currentPage01,
            'size':8, 
            'userId':window.localStorage.getItem("userId")
          });
          that.$http.get(that.$ports.studyVideoList.list,that.searchForm02).then(res=>{
             that.tab2Loading = false;
            if(res.data.code==0){
              that.myVideoList = res.data.data;
            }else{
              that.$message.error(res.data.msg);
            } 
          })
         },
         reset(name){
          that[name]={}
         },
         showVideoDialog(obj){
          this.currentVideo = obj;
          this.showVideo = true;
         },
         showEditDialog(type,obj){
         	this.formData = null;
         	if(type=='edit'){
         		this.formData = JSON.parse(JSON.stringify(obj));
         	}
         	this.params = {
            open:true,
            videoItem:this.formData
          }
         },
         deleteVideo(obj){
          this.$confirm('确定删除该视频？删除后将无法恢复', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
         }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
         });
         },
         //新增或者修改成功后都要刷新tab
         refreshTab(val){
         if(val){
          that.getMyVideo();
         }
         },
         itemOver(index){
         	console.log("over"+index);
         	document.getElementById('video'+index).style.display="flex"
         },
         itemOut(index){
         	console.log("out"+index);
         	document.getElementById('video'+index).style.display="none"
         }, 
         closeEditDialog(e){
          console.log(e)
          this.params = e;
         },
         uploadVideo(e){
          console.log(e)
         },
         //分页方法
         handleCurrentChange(val){
          console.log("当前页数"+val);
         },
         handleCurrentChange01(val){
          console.log("当前页数"+val);
         }
	   }
	}
</script>
<style>
	.containerBox{
		display: flex;
		flex-wrap: wrap;
	}
	.videoItem{
       width: 25%;
       padding: 10px;
       box-sizing: border-box;
	}
    .searchBox{
    	padding: 15px 0 ;
    }
    .breadcrumb{
    	padding-bottom: 15px;
    }
    .sub_title{
    	color: #66B1FF
    }
    .operateBox{
    	display: flex;
    	padding: 10px;
    	box-sizing: border-box;
    	background-color: rgba(0,0,0,0.3);
    	width: 100%;
    }
    .operateBox>span{
    	flex: 1;
    	text-align: center;
    	cursor: pointer;
    	color: #fff; 
    }
</style>