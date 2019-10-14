<!-- 综治中心记录、面谈记录共用的公共组件 -->
<template>
<div>111</div>
</template>
<script>
	var that;
export default{
    name:"",
    props:{
    params:Object
    },
	data(){
	return{

	}
	},
	watch:{
    "params.open":function open(){
    	if(!that.params.isFirst){
    	if(that.params.open&&that.times==0){
            if(this.params.modal=="zongzhi"){
        		console.log("综治中心触发");
         
		      }else if(this.params.modal=="face"){
		        console.log("面谈触发");
		      }
		      that.$emit("changeTimes",1);
		  }
     }
 }
	},
	created(){
     that = this;
     if(that.params.isFirst){
     	if(that.params.modal=="zongzhi"){
     		console.log("zongzhi 第一次触发");
     	}else{
     		console.log("face 第一次触发");
     	}
     }
	},
    methods:{

    }
}
</script>
<style>

</style>