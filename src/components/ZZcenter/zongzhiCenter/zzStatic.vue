<template>
<div>
<div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>綜治中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>綜治系統统计</el-breadcrumb-item> 
  </el-breadcrumb>
</div>
<div style="margin-top: 20px"> 
	<el-card class="boxCard">
     <div v-loading="topLoading" class="topBox">
         <div>
             <div>信访量总数：{{topData.total}}</div>
             <div>已处理总数：{{topData.proportionProcessed}}</div>
             <div>已处理占比：{{topData.processedPercent}}%</div>
         </div>
         <div  >
             <div>本月信访量总数：{{topData.totalMonth}}</div>
             <div>本月已处理总数：{{topData.totalMonthProcessed}}</div>
             <div>本月已处理占比：{{topData.monthProcessedPercent}}%</div>
         </div>
         <div  >
             <div>本周信访量总数：{{topData.totalWeek}}</div>
             <div>本周已处理总数：{{topData.totalWeekProcessed}}</div>
             <div>本周已处理占比：{{topData.weekProcessedPercent}}%</div>
         </div>
     </div>   
    </el-card>
    <el-card class="boxCard" style="margin-top: 20px">
        <div class="dateBox">
           <el-select style="width: 120px;margin-right: 20px" v-model="form.dateType" @change="selectChange">
              <el-option v-for="item in options" :label="item.label" :value="item.value"></el-option> 
           </el-select>  
           <el-date-picker
              :editable="false"
              v-model="form.startDate"
              :type="dateType01"
              :placeholder="datePlaceHolder01">
            </el-date-picker>
            <el-date-picker
              :editable="false" 
              v-model="form.endDate"
              :type="dateType01"
              :placeholder="datePlaceHolder02">
            </el-date-picker>
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
        </div>
        <div class="barBox">
            <div v-loading="barLoading" id="tabOneBar">
                
            </div>
        </div>
        <div class="pieBox" style="display: flex;justify-content: space-around;margin-top: 20px">
            <div v-loading="pieLoading01" id="tabOnePie_1"></div>
            <div v-loading="pieLoading02" id="tabOnePie_2"></div>
        </div>
    </el-card>
</div>
</div>
</template>
<script> 
    var that;
import echarts from '../../../echarts/echarts'
export default{
	data(){
		return{
         activeName:'first',
         form:{
            dateType:0, 
         },
         dateType01:"date",//month year
         datePlaceHolder01:"选择查询开始日期",
         datePlaceHolder02:"选择查询结束日期",
         options: [{
          value: 0,
          label: '按日查询'
        }, {
          value: 1,
          label: '按月查询', 
        }, {
          value: 2,
          label: '按年查询'
        }],
        //
        topLoading:true,
        pieLoading01:true,
        pieLoading02:true,
        barLoading:true,
        topData:{
         total:0,
         proportionProcessed:0,
         processedPercent:0,
         totalMonth:0,
         totalMonthProcessed:0,
         monthProcessedPercent:0,
         totalWeek:0,
         totalWeekProcessed:0,
         weekProcessedPercent:0
        },
		}
	},
	mounted(){
        that = this;
        that.getCurrentDate();
        that.getTopData(); 
	},
	methods:{
        //获取当前时间
        getCurrentDate(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        if(month<10){
            month = "0"+month
        }
        var day = date.getDate();
        if(day<10){
            day = "0"+day
        }
        //that.form.startDate = year+"-"+month+"-"+day;
        that.$set(that.form,'startDate',year+"-"+month+"-"+day);
        that.$set(that.form,'endDate',year+"-"+month+"-"+day);
        //
        that.getBarData();
        that.getTerminalData();
        that.getTypeData();
        },
        getTopData(){
         that.$http.get(that.$ports.letterStatistics.topData,{}).then(res=>{
            console.log(res);
            if(res.data.code==0){
                var data = res.data.data;
                that.topData = data;
              if(data.total!=0){
                that.topData.processedPercent = ((data.proportionProcessed/data.total)*100).toFixed(2);
              }
              if(data.totalMonth!=0){
                that.topData.monthProcessedPercent = ((data.totalMonthProcessed/data.totalMonth)*100).toFixed(2);
              }
              if(data.totalWeek!=0){
                that.topData.weekProcessedPercent = ((data.totalWeekProcessed/data.totalWeek)*100).toFixed(2);
              }
              that.topLoading = false;
            }else{
                that.$message.error("数据获取失败");
                that.topLoading = false;
                return
            }
         });
        },
        getBarData(){
         that.$http.get(that.$ports.letterStatistics.barData,that.form).then(res=>{
            console.log(res);
            if(res.data.code==0){
              that.getTabOneBar(res.data.data);
              that.barLoading = false;
            }else{
               that.$message.error(res.data.msg);
                that.barLoading = false;
                return
            }
         });
        },
        getTerminalData(){
         that.$http.get(that.$ports.letterStatistics.terminalData,that.form).then(res=>{
            console.log(res);
            if(res.data.code==0){
            that.getTabOnePie_1(res.data.data);
            that.pieLoading01 = false;
            }else{
                that.$message.error(res.data.msg);
                that.pieLoading01 = false;
                return
            }
         });
        },
        getTypeData(){
         that.$http.get(that.$ports.letterStatistics.typeData,that.form).then(res=>{
            console.log(res);
            if(res.data.code==0){
            that.getTabOnePie_2(res.data.data);
            that.pieLoading02 = false;
            }else{
                that.$message.error(res.data.msg);
                that.pieLoading02 = false;
                return
            }
         });
        },
		getTabOneBar(data){
        let myChart01 = echarts.init(document.getElementById('tabOneBar'));
        // 绘制图表
        myChart01.setOption({
            title: { text: '信访数量趋势' },
            tooltip: {},
            xAxis: {
                data: data.date
            },
            yAxis: {},
            series: [{
                itemStyle:{
                normal:{
                  color:'#1890F5'
                  }
                },
                name: '信访数',
                type: 'bar',
                data: data.data
            }]
        });
		},
		//总次数与本月次数
		getTabOnePie_1(data){
        var pieData = [];
        for(let i=0;i<data.date.length;i++){
        var obj ={};
        obj.name = data.date[i];
        obj.value = data.data[i];
        pieData.push(obj);
        }
        let myPie01 = echarts.init(document.getElementById('tabOnePie_1'));
        myPie01.setOption({
        title : {
            text: '信访终端占比',
           // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
        orient: 'vertical',
        x: 'left',
        data: data.date, 
    },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:pieData,
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
		//分类比
		getTabOnePie_2(data){
        var pieData = [];
        for(let i=0;i<data.date.length;i++){
        var obj ={};
        obj.name = data.date[i];
        obj.value = data.data[i];
        pieData.push(obj);
        }
        let myPie03 = echarts.init(document.getElementById('tabOnePie_2'));
        myPie03.setOption({
           title : {
            text: '信访分类占比', 
            x:'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:data.date
        },
        series: [
            {
                name:'',
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
                data:pieData
            }
        ]
})
		},
		getTabTwoBar(){

		},
		handleClick(tab, event) {
        console.log(tab, event);
       },
        //select改变触发事件
        selectChange(){
            if(that.form.dateType==0){
                console.log("日");
                that.dateType01 = "date";
                that.datePlaceHolder01 = "选择查询开始日期";
                that.datePlaceHolder01 = "选择查询结束日期";
            }else if(that.form.dateType==1){
                console.log("月");
                that.dateType01 = "month";
                that.datePlaceHolder01 = "选择查询开始月份";
                that.datePlaceHolder01 = "选择查询结束月份";
            }else{
                console.log("年");
                that.dateType01 = "year";
                that.datePlaceHolder01 = "选择查询开始年份";
                that.datePlaceHolder01 = "选择查询结束年份";
            }
        },
        //查询
        searchData(){
        if(that.form.startDate==null){
            that.$message.error("请选择开始时间");
            return
        }
        if(that.form.endDate==null){
            that.$message.error("请选择结束时间");
            return
        }
        that.getBarData();
        that.getTypeData();
        that.getTerminalData();
        },
        //重置
        resetForm(){
            that.form={
                dateType:0
            }
        }
	}
}
</script>
<style>
	.topBox{
     display: flex;
     flex-wrap: wrap;
     width:80%;
     margin: 0 auto;
     justify-content: space-between;
    }
    .topBox>div>div{
        padding: 5px 0;
    }
    .barBox{
        margin: 20px 0
    }
    #tabOneBar{
        width: 80%;
        margin: 0 auto;
        height: 500px
    }
    .pieBox>div{
        height: 300px;
        width: 100%;
    }
</style>