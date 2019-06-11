<template>
	<div>
		<div>
			<h3>房间列表</h3>
		</div>
		<el-divider class="divider"></el-divider>
		<div>
			<el-row>
				<el-col class="margin_r" :span="5">
				 <el-card :body-style="{ padding: '0px' }">
			      <img :src="imgUrl" class="image">
			      <div style="padding: 14px;">
			        <span>房间1</span>
			        <div class="bottom clearfix">
			          
			          <el-button type="text" >操作按钮</el-button>
			        </div>
			      </div>
			    </el-card>	
				</el-col>
				<el-col class="margin_r" :span="5">
				 <el-card :body-style="{ padding: '0px' }">
			      <img :src="imgUrl" class="image">
			      <div style="padding: 14px;">
			        <span>房间1</span>
			        <div class="bottom clearfix">
			          
			          <el-button type="text" >操作按钮</el-button>
			        </div>
			      </div>
			    </el-card>	
				</el-col>
				<el-col class="margin_r" :span="5">
				 <el-card :body-style="{ padding: '0px' }">
			      <img :src="imgUrl" class="image">
			      <div style="padding: 14px;">
			        <span>房间1</span>
			        <div class="bottom clearfix">
			          
			          <el-button type="text" >操作按钮</el-button>
			        </div>
			      </div>
			    </el-card>	
				</el-col>
				<el-col class="margin_r" :span="5">
				 <el-card :body-style="{ padding: '0px' }">
			      <img :src="imgUrl" class="image">
			      <div style="padding: 14px;">
			        <span>房间1</span>
			        <div class="bottom clearfix">
			          
			          <el-button type="text" >操作按钮</el-button>
			        </div>
			      </div>
			    </el-card>	
				</el-col>
				<el-col class="margin_r" :span="5">
				 <el-card :body-style="{ padding: '0px' }">
			      <img :src="imgUrl" class="image">
			      <div style="padding: 14px;">
			        <span>房间1</span>
			        <div class="bottom clearfix">
			          
			          <el-button type="text" >操作按钮</el-button>
			        </div>
			      </div>
			    </el-card>	
				</el-col>
				<el-col class="margin_r" :span="5">
				 <el-card :body-style="{ padding: '0px' }">
			      <img :src="imgUrl" class="image">
			      <div style="padding: 14px;">
			        <span>房间1</span>
			        <div class="bottom clearfix">
			          
			          <el-button type="text" >操作按钮</el-button>
			        </div>
			      </div>
			    </el-card>	
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
              imgUrl:'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
			}
		}
	}
</script>
<style>
   .margin_r{
    margin-right: 25px;
    margin-bottom: 25px;
   	}
	 .bottom { 
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>