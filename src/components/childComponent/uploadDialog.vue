<template>
  <el-dialog title="params.videoItem.name" :visible.sync="editVideo" :before-close="closeDialog">
  <el-form ref="form" :model="videoForm" label-width="80px">
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
	<img class="delete_icon" v-if="imgFlag" :src="deleteImg" @click="imgFlag=false"></img>
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
<img class="delete_icon" v-if="videoFlag" :src="deleteImg" @click="videoFlag=false"></img>
</div>
  </el-form-item>
  <el-form-item label="视频分类">
    <el-select v-model="videoForm.type" placeholder="请选择视频类别">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
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
	export default{
		name:"uploadDialog",
		props:{params:Object},
		data(){
			return{
             editVideo:false,
             imgFlag:false,
             videoFlag:false,
             deleteImg:"../../../../static/images/delete.png",
             imgUrl:'',
             videoUrl:'',
             videoForm:{

             },
			}
		},
		watch:{
			params(obj){
				if(obj.open){
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

		},
		methods:{
		init(){
          this.videoForm={}
		  this.videoFlag=false;
		  this.imgFlag=false;
		  this.imgUrl="";
		  this.videoUrl="";
		},
		 onSubmit(){
           
			var obj = {
				open:false
			}
         	  this.$emit("uploadVideo",obj);
         	  this.editVideo = false;
			 
		},
         closeDialog(){
            var obj = {
				open:false
			}
         	  this.$emit("closeDialog",obj);
         	  this.editVideo = false;
         },
         httpRequestImg(data){
         var _this = this;
         this.videoForm.imageData = data.file;
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
			this.videoForm.vedioData = data.file;
			_this.videoFlag = true;
            //这一步是重点！
			_this.videoUrl = URL.createObjectURL(data.file);
         }
		}
	}
</script>
<style>
	.delete_icon{
		position: absolute;
		right: -15px;
		max-width: 30px;
		top: -15px;
		cursor: pointer;
	}
</style>