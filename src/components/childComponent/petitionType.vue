<!-- 信访类别组件 -->
<template>
	<el-dialog title="信访类型" :visible.sync="paramsObj.showDialog" :before-close="closeDialog">
		 <el-tree
		  :data="petitionTypeData"
		  show-checkbox
		  :default-expand-all="showall"
		  node-key="id"
		  ref="tree" 
		  highlight-current
		  @check-change="handleClick"
		  :props="defaultProps">
		</el-tree> 
	    <div slot="footer" class="dialog-footer">
	  	  <el-button @click="submitType()">提交</el-button> 
	      <el-button @click="closeDialog">关闭</el-button> 
	    </div>
	</el-dialog>
</template>
<script>
	export default{
		name:"petitionType",
		props:{
        paramsObj:Object
		},
		data(){
			return{
              petitionTypeData:[],
              showall:false,
		      defaultProps:{
		          children: 'children',
		          label: 'label'
		        },
			}
		},
		mounted(){
        if(!this.paramsObj.open){
        	console.log("组件还未触发...");
        } 
		},
		watch:{
		paramsObj(val){
         if(val.open){
         	console.log("组件已触发，开始执行...");
         	this.getPetititonType();
         }
		}

		},
		methods:{
 		getPetititonType(){
        var _this = this;
        _this.$http.get(_this.$ports.petitionType.list).then(res=>{
        	console.log("获取信访类别");
        	if(res.data.code==0){
            console.log(res.data.data);
            if(res.data.data.length>0){
            	_this.createTreeData(res.data.data);
            } 
        	}else{
        	_this.$message.error("获取信访类型失败！")
        	}
        })
 		},
 		createTreeData(data){
        console.log("拼接tree");
        this.petitionTypeData = [];
        for(let i=0;i<data.length;i++){
        	if(data[i].pid==0){
        	  var obj={children:[]};
        	  obj.id = data[i].id;
        	  obj.label = data[i].name;
        	  obj.disabled = true;
        	  for(let j=0;j<data.length;j++){
        	  	if(data[j].pid == data[i].id){
        	  		var obj1={children:[]};
        	  		obj1.id = data[j].id;
        	  		obj1.label = data[j].name;
        	  		obj.children.push(obj1)
        	  	}
        	  }
        	  this.petitionTypeData.push(obj);
        	}
        }
 		},
 		//设置单选
 		handleClick(data,checked,node){
          	if(checked){
			this.$refs.tree.setCheckedNodes([data]);
			}
 		},
 		closeDialog(){
 		 console.log("用户关闭组件");
 		 this.paramsObj.showDialog = false;
 		},
 		submitType(){
 			var id = this.$refs.tree.getCheckedKeys()[0];
 			console.log(id) 
 			if(id){
 				this.$emit("chooseId",id);
 				this.paramsObj.showDialog=false;
 			}else{
 				this.$message.error("请选择信访类别")
 			}
 			
 		}
		}
	}
</script>
<style></style>