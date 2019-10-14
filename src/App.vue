<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script> 

export default {
  name: 'App'
}
</script>

<style> 
body{
	margin:0
}
.el-loading-mask{
		width: calc(100% + 20px);
	}
</style>
