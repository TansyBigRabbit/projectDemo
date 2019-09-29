<!-- 学宣--视频列表 -->
<template>
	<!--  accept='.mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb'  -->
	<div>
		          <el-upload
                    class="avatar-uploader"
                    ref="upload01"
                    action="string"
                    accept=".mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb" 
                    :http-request="httpRequest"  
                    :show-file-list="false"
                    > 
                    <video v-if="imgFlag" :src="item.url" controls="controls"> </video>
                    <el-button size="mini" type="primary" >导入</el-button>
                </el-upload>
	</div>
</template>

<script>
	export default{
		data(){
            return{
            imgFlag:false,
			fileList:[],
			item:{

			}
            }
		},
		methods:{
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
		 }
	   }
	}
</script>