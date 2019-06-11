<template>
	<div> 
		<el-row class="container">
			<el-col :span="11">
				<div class="box_1"></div>
				<div class="box_1"></div>
			</el-col>
			<el-col :span="11">
				<div>
					<el-row class="infoList">
						<p>房间信息：</p>
						<el-col :span="12">
							房间号：<span>12022152777</span>
						</el-col>
						<el-col :span="12">
							接访时间：<span>1</span>
						</el-col> 
					</el-row>
					 <el-divider class="divider"></el-divider>
				     <el-row class="infoList">
						<p>信访人员信息：</p>
						<el-col :span="6">
							姓名：<span>陈大颖</span>
						</el-col>
						<el-col :span="6">
							性别：<span>女</span>
						</el-col>
						<el-col :span="12">
							身份证号：<span>510723199401180043</span>
						</el-col>
					</el-row>
					 <el-divider class="divider"></el-divider>
					<el-row class="infoList">
						<p>信访人员信息：</p>
						<el-col :span="12">
							姓名：<span>陈小颖</span>
						</el-col>
						<el-col :span="12">
							工号：<span>10086</span>
						</el-col>
						<!-- <el-col :span="12">
							身份证号：<span>510723199401180043</span>
						</el-col> -->
					</el-row>
				</div>
				<div v-if="isRole">
					<el-input
					  type="textarea"
					  :rows="12"
					  placeholder="请记录上访内容内容"
					  v-model="textarea"
					  style="margin:30px 0" >
					</el-input>
					<div style="width: 20%;margin: 0 auto">
					 <el-button type="primary" style="width: 150px">提交</el-button>
				    </div>
				</div>
				<div v-if="!isRole"> 
					<div style="width: 20%;margin: 40px auto">
					 <el-button type="primary" style="width: 150px">结束上访</el-button>
				    </div>
				</div>
			</el-col>
        </el-row>
       </div>
</template>

<script>
	export default{
		data(){
			return{
              isRole:true,
              textarea:'',
			}
		}
	}
</script>

<style> 
    .container{
    	padding-top:25px;
    }
	.box_1{
		height: 300px;
		width: 450px;
		border:1px solid; 
		margin-bottom:25px;
	}
	.divider{
		margin: 20px 0 0 0;
	}
</style>