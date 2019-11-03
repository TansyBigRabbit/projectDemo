<template>
<div>
<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>信访中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>信访统计</el-breadcrumb-item> 
  </el-breadcrumb>
</div>
<div style="margin-top: 25px">
	<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="本月数据统计" name="first">
    <div> 
    	<div>
    		<el-select v-model="value" placeholder="请选择区域">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled">
    </el-option>
  </el-select>
     <el-button type="primary">本月</el-button>
      <el-button type="primary">本周</el-button>
       <el-button type="primary">今日</el-button>
       </div>
    <div style="width: 400px;height: 300px" id="tabOneBar"></div>
    </div>
    <div>
    	<el-col :span="12">
    		<div style="width: 400px;height: 300px" id="tabOnePie_1"></div>
    	</el-col>
    	<!-- <el-col :span="8">
    		<div style="width: 400px;height: 300px" id="tabOnePie_2"></div>
    	</el-col> -->
    	<el-col :span="12">
    		<div style="width: 600px;height: 300px" id="tabOnePie_3"></div>
    	</el-col>
    </div>
    </el-tab-pane>
    <el-tab-pane label="信访排名" name="second">
    	<div>
    		paiming
    	</div>
    </el-tab-pane> 
    </el-tabs>
	
</div>
</div>
</template>
<script> 
var that;
import echarts from '../../echarts/echarts'
export default{
	data(){
		return{
         activeName:'first',
         options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
		}
	},
	mounted(){
        that = this;
        that.getBarData();
		// this.getTabOneBar();
		// this.getTabOnePie_1();
		// //this.getTabOnePie_2();
		// this.getTabOnePie_3();
	},
	methods:{
        getBarData(){

        },
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
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
		},
		//总次数与本月次数
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
            }
        }
    ]
});
		},
		//总次数与已处理
		getTabOnePie_2(){
        let myPie02 = echarts.init(document.getElementById('tabOnePie_2'));
		},
		//分类比
		getTabOnePie_3(){
        let myPie03 = echarts.init(document.getElementById('tabOnePie_3'));
        myPie03.setOption({
        	 title : {
        text: '信访类型占比', 
        x:'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            center: ['50%', '60%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
})
		},
		getTabTwoBar(){

		},
		handleClick(tab, event) {
        console.log(tab, event);
       },

	}
}
</script>
<style>
	
</style>