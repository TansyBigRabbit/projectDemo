<template>
  <div>
    <textarea style="display: none" userName="cardinfo" cols="100" rows="10" id="cardinfo"></textarea>
  <div class="breadcrumb">
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>信访中心系统</el-breadcrumb-item>
  <el-breadcrumb-item>开启信访</el-breadcrumb-item> 
  </el-breadcrumb>
</div> 
<el-card class="box-card idCard"> 
  <el-form :model="userinfoExtend"  ref="userinfoExtend" label-width="130px" class="demo-userinfoExtend">
    <!-- 基本信息 -->
    <el-row>
      <el-col :span="13">
  <el-form-item style="width: 100%" label="居民身份证号码">
    <el-input v-model="userinfoExtend.idCard" :readonly="true"></el-input>
  </el-form-item>

  <el-row>
    <el-col :span="12">
     <el-form-item style="width: 100%" label="姓名" >
    <el-input v-model="userinfoExtend.userName" :readonly="true"></el-input>
  </el-form-item> 
    </el-col>
    <el-col :span="12">
      <el-form-item style="width: 100%" label="性别" >
    <el-input :readonly="true" :value="sex"></el-input>
  </el-form-item> 
    </el-col>
  </el-row>
  <el-form-item style="width: 100%" label="出生日期" >
    <el-input v-model="userinfoExtend.birthDay" :readonly="true"></el-input>
  </el-form-item>
  <el-form-item style="width: 100%" label="民族" >
    <el-input v-model="userinfoExtend.nation" :readonly="true"></el-input>
  </el-form-item>
  
  <el-form-item style="width: 100%" label="出生地址">
    <el-input v-model="userinfoExtend.birthAddress" :readonly="true"></el-input>
  </el-form-item>
    <el-form-item style="width: 100%" label="签发单位" >
    <el-input v-model="userinfoExtend.issuingUnit" :readonly="true"></el-input>
  </el-form-item> 
  <el-row>
    <el-col :span="12">
    <el-form-item style="width: 100%" label="签发时间" >
    <el-input v-model="userinfoExtend.timeFiled" :readonly="true"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="12">
     <el-form-item style="width: 100%" label="有效截止日期" >
    <el-input v-model="userinfoExtend.expirationDate" :readonly="true"></el-input>
  </el-form-item>
    </el-col>
  </el-row>
   <el-form-item class="submitBtn">
    <el-button type="primary" @click="readCard()">{{btnText}}</el-button>
   <el-button type="cancel" :disabled="isShow?false:true" @click="submitForm('userinfoExtend')">下一步</el-button>

    <!-- <el-button @click="resetForm('userinfoExtend')">取消上访</el-button> -->
  </el-form-item>
  </el-col>

  <!-- 照片部分 -->
      <el-col :span="10" >
        <el-container class="middle">
          <img
      style="width: 120px; height: 150px"
      :src="url"/>
        </el-container>
      </el-col>
 </el-row>
</el-form>
 </el-card> 
<!-- 选择部门弹窗 -->
<el-dialog title="选择上访类型" :visible.sync="dialogDepartment" width=30% >
  <!-- <div v-if="!checkDepart">
  <el-button type="primary" @click="checkDepartMethod(0)" plain>县级信访</el-button>
  <el-button type="success" @click="checkDepartMethod(1)" plain>乡镇信访</el-button>
  <el-button type="info" @click="checkDepartMethod(2)" plain>村信访</el-button>
  </div> -->
  <div >
    <el-select  v-model="countryId" filterable placeholder="请选择上访部门">
        <el-option v-for="item1 in department_country"
        :key="item1.departId" :label='item1.departName' :value="item1.departId"></el-option> 
      </el-select> 
  </div> 
  <div slot="footer" class="dialog-footer">
    <el-button  @click="dialogDepartment = false">取 消</el-button>
    <el-button v-if="checkDepart" type="primary" @click="createRoom()">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
  export default {
    data() {
      return {
        sex:'',
        //所有信访者的信息
        petitionArr:[],
        //所有上访者的身份证号码集合
        idCardList:[],
        userinfoExtend: {
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
        dialogDepartment: false, 
        checkDepart:false,
        //表单禁用
        formDisable:true,
        countryId:'',
        villageId:'',
        //查询出来的房间信息
        roomInfo:{},
        department_country:[],
        department_town:[],
        department_village:[],
        //true,读卡成功进入下一步骤
        isShow:false,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 
        //
        btnText:"读卡"
      };
    },
    mounted(){ 

    },
    methods: { 
      submitForm(formuserName) {
        //提交表单数据成功
        //之后根据接口返回的状态判断
        //是否异常退出房间
        //是--回到之前房间
        //否--打开选择部门弹窗
        // if(this.userinfoExtend.sex=='女'){
        //   this.userinfoExtend.sex=1;
        // }else if(this.userinfoExtend.sex=='男'){
        //   this.userinfoExtend.sex=0;
        // }else{
        //   this.userinfoExtend.sex=9;
        // }
        var _this = this;
        //保存上访者身份信息
        this.$http.post(this.$ports.userinfoextend.insertList,
        this.petitionArr).then(res=>{
        console.log(res.data);
        if(res.data.code==0){
          //获取部门信息
           _this.countryId="";
           _this.checkDepartMethod();
           _this.dialogDepartment=true;
        }else{
          this.$message.error("数据保存失败，请联系管理员！");
        }
        })
        
      },

      //创建信访房间
      createRoom(){
        //获取上访者的token
        //判断有无选择部门
        var _this = this; 
        if(_this.countryId==""){
        _this.$message.error("请选择信访部门!");
        return
        }
        
        this.$http.get(this.$ports.getToken,{
        idCard:this.userinfoExtend.idCard
        }).then(res=>{
          console.log("获取上访者的token......");
          console.log(res.data);
          if(res.data.errorCode==0){  
           _this.dialogDepartment=false;
           //全局变量存储
           ILiveSDK.loginInfo.token = res.data.data.token;
           name =  res.data.data.userName;  

           _this.$router.push({
              name:'VisitRoom',
              params:{
               roleType:"petitionCreate",
               departId:_this.countryId, 
               idCardList:_this.idCardList
              }
           });
        }else{
          _this.$message.error(res.data.msg);
        }
        });
        
        
      },
      //选择上方模式之后查询的对应乡镇信息
      checkDepartMethod(typeVal){ 
        var _this = this;
      this.$http.get(this.$ports.department,{
        departId:JSON.parse(window.localStorage.getItem('userInfo')).departId
      }).then(res=>{
          if(res.data.code==0){ 
          this.department_country = res.data.data;
          this.checkDepart=true;
        }else{
          _this.$message.error(res.data.msg);
        }
          });  
      },
      //刷卡读卡
      readCard(){
        var _this = this;
        var value = "<0,A,张明泉,女,汉,01,19640217,四川省南充市高坪区龙门镇指路碑村4组５３号,512926196402171622,南充市公安局高坪分局,20070921,20270921,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>"
        this.handleIdCard(value);
        //根据上访者身份证号码查询其有无正在进行中的房间 
        this.checkRoom(this.userinfoExtend.idCard); 



       /*if(!window.WebSocket){ 
        this.$message.error("该版本浏览器不支持WebSocket");
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
      },
      handleIdCard(value){
      this.isShow = true
      console.log(value);
      var arr = value.split(",");
      arr[10]=this.dateFormat(arr[10]);
      arr[11]=this.dateFormat(arr[11]);
      arr[6]=this.dateFormat(arr[6]);
      arr[12]="data:image/jpeg;base64,"+arr[12].slice(0,arr[12].length-1)
      if(arr[3]=="女"){
        this.userinfoExtend.sex = 1
      }else if(arr[3]=="男"){
        this.userinfoExtend.sex = 0
      }else{
        this.userinfoExtend.sex = 9
      }
      this.userinfoExtend.idCard = arr[8];
      this.userinfoExtend.userName = arr[2];
      this.userinfoExtend.nation = arr[4];
      this.userinfoExtend.issuingUnit = arr[9];
      this.userinfoExtend.timeFiled = arr[10];
      this.userinfoExtend.expirationDate = arr[11];
      this.sex = arr[3];
      this.userinfoExtend.birthDay = arr[6];
      this.userinfoExtend.birthAddress = arr[7];
      this.url=arr[12];
      this.userinfoExtend.picturePath = arr[12];
      //
      this.petitionArr.push(this.userinfoExtend);
      this.idCardList.push(this.userinfoExtend.idCard);
      },
      dateFormat(date){
       String.prototype.splice = function(start, newStr) {
      return this.slice(0, start) + newStr + this.slice(start);
       }; 
      var str = (date.splice(4, '-')).splice(7,'-');
      date = str;
      return date
      },
      //查询有无房间
      checkRoom(idNum){
        var _this = this;
         console.log("获取有无正在进行的房间......");
         this.$http.get(this.$ports.checkRoom,{ 
          'petitionIdCard':idNum,
          'stateList':'0,1',
          }).then(res=>{
            console.log(res.data); 
          if(res.data.code==0){ 
            if(res.data.data.length>0){
              _this.roomInfo = res.data.data[0]; 
                
                this.$http.get(this.$ports.getToken,{
                idCard:this.userinfoExtend.idCard
                }).then(json=>{
                console.log("获取上访异常退出者的token......");
                console.log(json.data);
                if(json.data.errorCode==0){   
                //全局变量存储
                ILiveSDK.loginInfo.token = json.data.data.token;
                name =  json.data.data.userName; 

                _this.$router.push({
                name:'VisitRoom', 
                params:{
                roleType:"petitionJoin",
                roomNum:_this.roomInfo.roomName, 
                departId:_this.roomInfo.interviewDepartId,}});

                }else{
                _this.$message.error(json.data.msg);
                }
            }); 
      }else{
        console.log("没有异常退出的房间");
        _this.btnText = "继续读卡";
      } 
        }else{
          _this.$message.error(res.data.msg);
        }
          });  
      } 

    }
  }
</script>

<style>
  .middle{
    width: 50%;
    margin: 0 auto;
  }
  .submitBtn{
    margin-top: 25px;
    text-align: center;
  }
  .breadcrumb{
    padding-bottom: 30px;
  }
  .container { 
    background-color: #fff;
  }
  .el-form-item > label {
    text-align: right;
}
.idCard{
  padding-top: 30px;
}
</style>