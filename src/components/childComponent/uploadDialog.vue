<!-- 学宣视频列表上传视频 -->
<template>
  <el-dialog  :title="videoName" :visible.sync="editVideo" :before-close="closeDialog">
  <el-form v-loading="loading" ref="form" :model="videoForm" label-width="80px">
  <el-form-item label="视频名称">
  <el-input v-model="videoForm.name"></el-input>
  </el-form-item>
  <el-form-item label="上传封面图片">
    <el-upload
class="avatar-uploader"
ref="upload01"
action="string"
accept="image/*" 
:http-request="httpRequestImg"
:show-file-list="false">  

<el-button size="mini" type="primary" >导入封面图片</el-button>
</el-upload> 
<div style="position: relative;">
	<img style="max-width: 100%" v-if="imgFlag" :src="imgUrl"/>
	<img class="delete_icon" v-if="imgFlag" :src="deleteImg" @click="clearImg "></img>
</div>

  </el-form-item>
  <el-form-item label="上传视频">
<el-upload
class="avatar-uploader"
ref="upload02"
action="string"
accept=".mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb" 
:http-request="httpRequestVideo"
:show-file-list="false">  

<el-button size="mini" type="primary" >导入视频</el-button>
</el-upload> 
<div style="position: relative;">
<video style="width: 100%" v-if="videoFlag" :src="videoUrl" controls="controls"></video> 
<img class="delete_icon" v-if="videoFlag" :src="deleteImg" @click="clearVideo "></img>
</div>
  </el-form-item>
  <el-form-item label="视频分类">
    <el-select v-model="videoForm.type" placeholder="请选择视频类别">
      <el-option v-for="item in videoTypes" :label='item.name' :value="item.id"></el-option> 
    </el-select>
  </el-form-item>
 <el-form-item label="视频介绍">
    <el-input type="textarea" v-model="videoForm.introduction"></el-input>
  </el-form-item>
<el-form-item>
    <el-button type="primary" @click="onSubmit">上传</el-button>
    <el-button @click="closeDialog">取消</el-button>
 </el-form-item>
</el-form>
    </el-dialog>
</template>
<script>
	var that;
	export default{
		name:"uploadDialog",
		props:{params:Object},
		data(){
			return{
			 loading:false,
             editVideo:false,
             imgFlag:false,
             videoFlag:false,
             deleteImg:"../../../../static/images/delete.png",
             imgUrl:'',
             videoUrl:'',
             videoForm:{

             },
             videoName:"新增视频",
             videoTypes:[]
			}
		},
		watch:{
			'params.videoItem':function vedioItem(){
             if(!this.params.videoItem==null){
             	this.videoName = this.params.videoItem.name
             }
			},
			'params.open':function open(){
				if(this.params.open){
					console.log("组件被触发");
					this.init(); 
					this.editVideo = true;
				}else{
					console.log("组件未被触发，所有方法不执行");
					this.editVideo = false;
				}
			} 
		},
		created(){
            that = this;
            that.getTypes();
		},
		methods:{
      getTypes(){
      console.log("获取视频类别");
         that.$http.get(that.$ports.videoType).then(res=>{
          if(res.data.code==0){
            that.videoTypes = res.data.data; 
          }else{
            that.$message.error("获取视频类别失败!");
          }
         })
      },
		init(){
      this.videoForm={}
		  this.videoFlag=false;
		  this.imgFlag=false;
		  this.imgUrl="";
		  this.videoUrl="";
		},
		 onSubmit(){
           var that = this;
           that.loading = true;
           that.videoForm.userId = window.localStorage.getItem('userId');
           console.log(that.videoForm);
           //json转formData
            const formData = new FormData();
			  Object.keys(that.videoForm).forEach((key) => {
			    formData.append(key, that.videoForm[key]);
			  });
			//
           that.$http.postFile(that.$ports.studyVideoList.insert,formData)
           .then(res=>{
            console.log(res);
            that.loading = false;
            if(res.data.code==0){
            	that.$message({
		          message: "操作成功!",
		          type: 'success'
		        }); 
		        that.$emit("refreshTab",true);
            }else{
               that.$message.error(res.data.msg);
            }
           })
			// var obj = {
			// 	open:false
			// }
   //       	  this.$emit("uploadVideo",obj);
   //       	  this.editVideo = false;
			 
		},
         closeDialog(){
         	that.loading = false;
            var obj = {
				open:false
			}
         	  this.$emit("closeDialog",obj);
         	  this.editVideo = false;
         },
         httpRequestImg(data){
         var _this = this;

         this.videoForm.img = data.file;
		 var reads = new FileReader(); //文件预览
		 reads.readAsDataURL(data.file);
		 reads.onload = function(e) {
		 _this.imgFlag = true;
		 _this.imgUrl = this.result; 
		 } 
         },
         httpRequestVideo(data){
         	var _this = this;
			console.log(data)
			if(data.file.size/1024/1024>100){
				that.$message.error("请勿上传大于100M的视频！");
				return;
			}
			this.videoForm.video = data.file;
			_this.videoFlag = true;
            //这一步是重点！
			_this.videoUrl = URL.createObjectURL(data.file);
         },
         clearImg(){
         	this.imgFlag=false
			this.videoForm.images = null;
         },
         clearVideo(){
         	this.videoFlag=false
         	this.videoForm.video = null;
         }
		}
	}
</script>
<style scoped>
	.delete_icon{
		position: absolute;
		right: -15px;
		max-width: 30px;
		top: -15px;
		cursor: pointer;
	}
	.el-loading-mask{
		width: calc(100% + 20px);
	}
</style>