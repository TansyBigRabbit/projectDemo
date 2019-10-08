<template>
	<div v-if="showFlag">
		123123
	</div>
</template>

<script>
	export default{
		name:"readIdCard",
		props:{
			params:Object
		},
		data(){
			return{
                showFlag:false,
			}
		},
		watch:{
			params(obj){
				if(obj.show){
					console.log("show");
					this.showFlag=true;
				}else{
					this.showFlag=false;
				}
			}
		},
		created(){
		this.showFlag=true;
		},
		methods:{
			enterRoom(){
				this.$emit("enterRoom",obj)
				this.showFlag = false;
			}
		}
	}
</script>