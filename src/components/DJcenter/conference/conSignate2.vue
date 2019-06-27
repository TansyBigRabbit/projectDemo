<!-- 会议签到刷卡页面 -->
<template>
	<el-row>
		<el-col :span="10">
			<div class="sign_box">
				<p style="text-align: center">{{meetName}}签到记录</p>
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
    		<el-input v-model="signInfo.userName" :readonly="true"></el-input>
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
    <el-input v-model="signInfo.idCard" :readonly="true"></el-input>
  </el-form-item>  
  <el-form-item style="width: 60%" label="签到时间">
    <el-input v-model="signInfo.signTime" :readonly="true"></el-input>
  </el-form-item>
   <el-form-item class="submitBtn">
    <el-button type="primary" @click="readCard()">读卡</el-button> 
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
            meetName:'',
            meetingId:this.$route.params.id,
            id:this.$route.params.id,
            sex:'',
            signInfo: {
              idCard:'',
              userName: '',
              nation: '',
              issuingUnit: '',
              timeFiled: '', 
              expirationDate:'',
              sex: '',
              birthDay:'',
              birthAddress: '',
            },
            /*signInfo:{
            name:'',
            sex:'',
            signTime:'',
            idNum:''
            },*/
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
		},
    created(){
      this.getMeetingInfo(this.$route.params.id);
    },
    methods:{
      getMeetingInfo(id){
         var _this = this;
           this.$http.get(this.$ports.conference.findById,{ 
            'id':id
           }).then(res=>{
          console.log("findbyId......");
          console.log(res.data);  
          _this.meetName = res.data.data.meetName;
          }); 
      },
      //刷卡读卡
      readCard(){
        var _this = this;
        _this.signInfo={};
        var value = "<0,A,张明泉,女,汉,01,19640217,四川省南充市高坪区龙门镇指路碑村4组５３号,512926196402171622,南充市公安局高坪分局,20070921,20270921,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>"
        this.handleIdCard(value); 
        console.log('开始签到......') 
        this.signMeeting();
           
      },
        signMeeting(){
           var _this = this;
           this.$http.post(this.$ports.meetsign.sign,{ 
           'id':'123456',
           'status':4
           }).then(res=>{
          console.log("取消会议......");
          console.log(res.data); 
          alert(res.data.msg)
          if(res.data.code==0){
          this.refreshTable();
          }
          });
},

          /*var _this = this;
          _this.$http.post(this.$ports.meetsign.sign,{ 
            'conferenceRoomId':_this.meetingId,
            'signName':_this.signInfo.userName,
            'signIdCard':_this.signInfo.idCard,
            'signTime':_this.signInfo.signTime,
           }).then(res=>{  
             console.log(res.data)
           }); 
        },*/

       /*if(!window.WebSocket){ 
        alert("该版本浏览器不支持WebSocket");
        return
        } 
        var websocket = new WebSocket("ws://127.0.0.1:9000/");
        websocket.onopen = function(evt){ 
        //onOpen(evt) 
        websocket.send("<ReadIdCard>");
        }; 
        websocket.onclose = function(evt){ 
        //onClose(evt) 
        }; 
        websocket.onmessage = function(evt){ 
        //onMessage(evt) 
        document.getElementById("cardinfo").value = evt.data;
        //处理读取出来的数据
        _this.handleIdCard(document.getElementById("cardinfo").value);
       //alert(document.getElementById("cardinfo").value)
        websocket.close();
        }; 
        websocket.onerror = function(evt){ 
        //onError(evt) 
        websocket.close();
        };*/
      
      handleIdCard(value){
      this.isShow = true
      console.log(value);
      var arr = value.split(",");
      arr[10]=this.dateFormat(arr[10]);
      arr[11]=this.dateFormat(arr[11]);
      arr[6]=this.dateFormat(arr[6]);
      arr[12]="data:image/jpeg;base64,"+arr[12].slice(0,arr[12].length-1)
      if(arr[3]=="女"){
        this.signInfo.sex = 1
      }else if(arr[3]=="男"){
        this.signInfo.sex = 0
      }else{
        this.signInfo.sex = 9
      }
      this.signInfo.idCard = arr[8];
      this.signInfo.userName = arr[2];
      this.signInfo.nation = arr[4];
      this.signInfo.issuingUnit = arr[9];
      this.signInfo.timeFiled = arr[10];
      this.signInfo.expirationDate = arr[11];
      this.sex = arr[3];
      this.signInfo.birthDay = arr[6];
      this.signInfo.birthAddress = arr[7];
      this.url=arr[12];
      this.signInfo.picturePath = arr[12];
      this.signInfo.signTime = this.dateToStr(new Date());
      },
      dateFormat(date){
       String.prototype.splice = function(start, newStr) {
      return this.slice(0, start) + newStr + this.slice(start);
       }; 
      var str = (date.splice(4, '-')).splice(7,'-');
      date = str;
      return date
      },
      dateToStr(date){
        var year = date.getFullYear();
        var month = date.getMonth();
        month+=1
        if(month<10){
          month='0'+month;
        }
        var day = date.getDate();
        if(day<10){
          day='0'+day;
        }
        var hour = date.getHours();
        if(hour<10){
         hour='0'+hour;
        }
        var minute = date.getMinutes();
        if(minute<10){
          minute='0'+minute;
        }
        var second = date.getSeconds();
        if(second<10){
          second='0'+second;
        }
        var newStr = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second
        return newStr;
      }
    }
	}

</script>

<style>
    
</style>