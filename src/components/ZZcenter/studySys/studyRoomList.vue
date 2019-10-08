<!--学宣中心房间列表-->
<template>
	<div>
		<readIdCard :params="params" @enterRoom="enterRoom($event)"></readIdCard>
		<div v-if="roomFlag">
			
		</div>
	</div>
</template>

<script>
	import readIdCard from "../../childComponent/readIdCard"
	export default{
		components:{readIdCard},
		data(){
			return{
				params:{show:true},
				roomFlag:false,
			}
		},
		created(){

		},
		methods:{
		enterRoom(e){
			console.log("获取房间列表信息")
		}	
		}
	}
</script>
