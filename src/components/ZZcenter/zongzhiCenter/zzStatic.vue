<!-- zzStatic.vue -->
<template>
	<div>
		<div class="breadcrumb">
			  <el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>综治中心系统</el-breadcrumb-item>
			  <el-breadcrumb-item>综治中心</el-breadcrumb-item> 
			  <el-breadcrumb-item>综治统计</el-breadcrumb-item> 
			  </el-breadcrumb>
			</div> 
		<el-card style="margin-top: 20px" class="boxcard">
			111
		</el-card>
		<el-card style="margin-top: 20px" class="boxcard">
			<div id="tabOneBar"></div>
			<div style="width: 400px;height: 300px" id="tabOnePie_1"></div>
		</el-card>
	</div>
</template>

<script>
	var that;
	import echarts from '../../../echarts/echarts'
	export default{
		data(){
			return{

			}
		},
		mounted(){
          that = this;
          that.getTabOneBar();
          that.getTabOnePie_1();
		},
		methods:{
			getTabOneBar(){
        let myChart01 = echarts.init(document.getElementById('tabOneBar'));
        // 绘制图表
        myChart01.setOption({
            title: { text: '信访数量趋势' },
            tooltip: {},
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"]
            },
            yAxis: {},
            series: [{
            	itemStyle:{
                normal:{
                  color:'#01ACF4'
                  }
                },
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
		},
		getTabOnePie_1(){
        let myPie01 = echarts.init(document.getElementById('tabOnePie_1'));
        myPie01.setOption({
	    title : {
	        text: '信访处理统计',
	       // subtext: '纯属虚构',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['未处理信访','已处理信访']
	    },
	    series : [
	        {
	            name: '访问来源',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:335, name:'未处理信访'},
	                {value:310, name:'已处理信访'},
	            ],
	            itemStyle: { 
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            },
	             color:[ //自定义的颜色
                    'rgb(0,0,0)',
                    'rgb(0,204,0)',
                    'rgb(254,0,0)',
                    'rgb(254,166,80)',
                   
                ]
	        }
	    ]
	});
			
		},
		}
	}
</script>

<style scoped>
#tabOneBar{
	width:50%;
	height:300px;
}
	
</style>