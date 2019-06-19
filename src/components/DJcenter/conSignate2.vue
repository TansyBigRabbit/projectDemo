<!-- 会议签到刷卡页面 -->
<template>
	<el-row>
		<el-col :span="10">
			<div class="sign_box">
				<p style="text-align: center">签到记录</p>
				<div>
					<ul class="sigList" v-for="record in records">
						<li>
							<span style="width:20%;text-align:left;">{{record.name}}</span>
			    	        <span style="width:70%;text-align:right;">签到时间：{{record.signatureTime}}</span>
						</li>
					</ul>
				</div> 
			</div>
		</el-col>

	<!-- --> 

		<el-col :span="12" style="margin-left: 30px">
        <el-form :model="signInfo"  ref="signInfo" label-width="130px" class="demo-signInfo">
    	<el-row>
    		<el-col :span="13">
    		<el-form-item style="width: 100%" label="姓名" >
    		<el-input v-model="signInfo.name" :readonly="true"></el-input>
  			</el-form-item>   
      		<el-form-item style="width: 100%" label="性别" >
    		<el-input v-model="signInfo.sex" :readonly="true"></el-input>
  			</el-form-item> 	
    		</el-col>
    		<el-col :span="11">
    		<el-container style="height: 100px" class="middle">
          	<img
      		style="max-width: 100%"
      		:src="url"/>
        	</el-container>	
    		</el-col>
    	</el-row>
        
   <el-form-item style="width: 60%" label="居民身份证号码">
    <el-input v-model="signInfo.idNum" :readonly="true"></el-input>
  </el-form-item>  
  <el-form-item style="width: 60%" label="签到时间">
    <el-input v-model="signInfo.signTime" :readonly="true"></el-input>
  </el-form-item>
   <el-form-item class="submitBtn">
    <el-button type="primary" @click=" ">读卡</el-button> 
  </el-form-item>
</el-form>

<div class="data_box">
	<el-row>
		<el-col class="data_col" :span="8" >
			<p >总人数</p>
			<div>
				<span>100</span>
			</div>
		</el-col>
		<el-col class="data_col" :span="8">
			<p >总人数</p>
			<div>
				<span>100</span>
			</div>
		</el-col>
		<el-col class="data_col" :span="8">
			<p >总人数</p>
			<div>
				<span>100</span>
			</div>
		</el-col>
	</el-row>
</div>
  </el-col> 
	</el-row>
</template>

<script>
	export default{
		data(){
			return{
            id:this.$route.params.id,
            signInfo:{
            name:'',
            sex:'',
            signTime:'',
            idNum:''
            },
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 
            records:[{
            	name:'Tansy',
            	signatureTime:'2019-06-18 20:00:00'
            },
            {
            	name:'Tansy',
            	signatureTime:'2019-06-18 20:01:01'
            },
            {
            	name:'Tansy',
            	signatureTime:'2019-06-18 20:02:02'
            },
            {
            	name:'Tansy',
            	signatureTime:'2019-06-18 20:02:02'
            } ]
			}
		}
	}
</script>

<style>
    .sigList{
    	padding-left: 0;
    }
	.sigList li{
		list-style: none
	}
	.sigList li>span{
		display: inline-block;
	}
	.middle{
		width: 50%;
    margin: 0 auto;
	}
	.sign_box{
		padding:25px;
		height: 80vh;
		border-radius: 15px;
		border:1px solid;
		overflow-y: scroll;
	}
	.data_col{
		padding: 30px
	}
	.data_col p{
		text-align: center;
	} 
	.data_col div{
		text-align: center;
		padding: 30px
	}
</style>