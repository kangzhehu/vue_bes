<template>
  <div>
  <div class="popupwin-container"  v-if="this.$store.state.isShowPopupWindow">
    <div class="topContainer">
      <i class="el-icon-folder window-icon" @click="showImgDialog"></i>
        <span>Information Window</span>
        <i class="el-icon-circle-close closeIcon" @click="closeWindon"></i>
    </div>
  
    <el-row class="mainContainer">
      <!-- 左边部分 -->
      <el-col :span="12" class="leftContainer">
        <!-- 详细信息 -->

        <el-row class="row-1" :gutter="40">
          <div class="top-anme">
            {{ mineProperty.name }}
          </div>
        </el-row>
        <!-- 详细信息 -->
        <el-row class="row-2" :gutter="20">
          <el-col :span="12">
            <div class="info-item">
              <span class="info-item-one"> 编号: </span>
              <span>{{ mineProperty.number }}</span>
            </div>
            <div class="info-item">
              <span class="info-item-one"> 面积: </span>
              <span>{{ mineProperty.area }}</span>
            </div>
            <div class="info-item">
              <span class="info-item-one"> 行政区域: </span>
              <span>{{ mineProperty.region }}</span>
            </div>
            <div class="info-item">
              <span class="info-item-one"> 有效时间: </span>
              <span>{{ mineProperty.time }}</span>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="info-item">
              <span class="info-item-one"> 类别: </span>
              <span>{{ mineProperty.classification }}</span>
            </div>
            <div class="info-item">
              <span class="info-item-one"> 主要矿产: </span>
              <span>{{ mineProperty.products }}</span>
            </div>
            <div class="info-item">
              <span class="info-item-one"> 采矿权人: </span>
              <span>xxx</span>
            </div>
            <div class="info-item">
              <span class="info-item-one"> 备注: </span>
              <span>{{ mineProperty.notes }}</span>
            </div>
          </el-col>
        </el-row>
        <!-- 产品图表 -->
        <el-row class="row-3" :gutter="20"> 
            <div id="echarts-win">
              <pieChart :pdata="pdata"/>
            </div>
        </el-row>
      </el-col>
      <!-- 右边3维模型部分 -->
      <el-col :span="12" class="rightContainer">
        <ThreeMine/>
      </el-col>
    </el-row>
  </div>
  <el-dialog title="矿山图片" :visible.sync="dialogImgVisible">
      <el-image :src="src" :preview-src-list="srcList" fit="contain">
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
    </el-image>
    <div class="updatebox" :style="{color:color}">
      上传时间:{{ uploadImgTime }}
    </div>
    </el-dialog>
</div>
</template>

<script>
import pieChart from "./pieChart.vue"
// import ProductsChart from "./ProductsChart.vue"
import ThreeMine from "./ThreeMine.vue"
import {HttpManager} from "../../api/index"
export default {
  components:{
    // ProductsChart,
    ThreeMine,
    pieChart,
  },
  data() {
    return {
      dialogImgVisible:false,
      src:'http://localhost:8888/九江县城门山铜硫矿区.jpg',
      srcList:['http://localhost:8888/九江县城门山铜硫矿区.jpg'],
      uploadImgTime:'',
      color:'',
      mineProperty: {
        // name: "矿区",
        // number: "",
        // region: "",
        // area: "36",
        // calssification: "限制开采区",
        // products: "铜硫",
        // notes: "  ", //备注
        // people: "xxx", //采矿权人
        // time: "", //有效时间
      },
      pdata:{
        name:'',
        xData:[],
        seriesData:[],
      }
    };
  },
  methods: {
    closeWindon(){
      this.$store.dispatch('setIsShowPopupWindowAsync', false);
    },
    showImgDialog(){
      this.dialogImgVisible = true;
    },
    isExceedOneMonth(someTime) {
      const now = new Date();
      // console.log(someTime);
      const millisecondsDiff = now.getTime() - someTime.getTime();
      const monthsDiff = millisecondsDiff / (2592000000);
      // console.log(monthsDiff);
      return monthsDiff > 1;
    }
  },
  computed:{
    onPopupWindowState(){
      return this.$store.state.isShowPopUpWindow
    },
    onPopupWindowInfo(){
      return this.$store.state.popupWindowInfo
    },
    onChartProductInfo(){
      return this.$store.state.chartProductInfo;
    },
     //判断上传的时间是否超过1个月
    
  },
  watch:{
    // eslint-disable-next-line no-unused-vars
    onPopupWindowState(value){
      // console.log(value);
    },
    onPopupWindowInfo(value){
      this.$data.mineProperty = value;
      if(this.mineProperty && this.mineProperty.name){
        HttpManager.getMineOfName(this.mineProperty.name).then((response)=>{
          this.$data.mineProperty = response.data
        })
      }
      HttpManager.getMineImgTime(this.mineProperty.name).then((res)=>{
        this.src = 'http://localhost:8888/'+this.mineProperty.name+'.jpg';
        this.srcList[0] = this.src;
        this.uploadImgTime = res.data.update;
        const dateString = this.uploadImgTime;
        const [year, month, day, hour, minute, second] = dateString.split(/[- :]/).map(Number);
        const someDate = new Date(year, month - 1, day, hour, minute, second);
        // console.log(someDate); // 输出：Sun Feb 27 2023 16:34:03 GMT+0800 (中国标准时间)
        if(this.isExceedOneMonth(someDate)){ 
            this.color = 'red';
         }else{
          this.color='';
         }  
      })
      
    },
    // eslint-disable-next-line no-unused-vars
    onChartProductInfo(value){
      if(this.mineProperty && this.mineProperty.name){
        // console.log("winname",this.mineProperty.name);
        HttpManager.getProductByName(this.mineProperty.name).then((response)=>{
          // console.log("res",response);
          this.$data.pdata.seriesData = response.data.seriesData;
          this.$data.pdata.xData =response.data.xData; 
        })
      }
    },
   

  },
};
</script>

<style lang="scss" scoped>
.popupwin-container{
  position: absolute;
  top: 50%;
  left: 50%;
  width:60%;
  height:60%;
  color: #d3dcd3;
  transform: translate(-50%, -50%);
  background-color:rgba(56, 85, 89, 0.8);
  border: 1px solid skyblue;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

  .topContainer{
    display: flex;
    justify-content:space-between;
    border-bottom: 1px solid skyblue;
    .window-icon{
   
    left: 0;
    top: 0;
    padding: 5px;
    color: yellow;
    font: size 24px;
  }

  .closeIcon{
    
    right: 0;
    top: 3px;
    padding: 5px;
    font: size 24px;
  }
  }
 

  .mainContainer{
    position: relative;
    width: 100%;
    height:97%;
    overflow: hidden;
    .leftContainer{
      height: 100%;;
      overflow: hidden;

      .row-1{
        height:10%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .row-2{
        height:35%;
        border: 1px solid skyblue;
        .info-item{
          padding-top: 5px;
          text-align: left;
          .info-item-one{
            padding-right: 5px;
            color: white;
            font-size:650;
          }
        }

      }

      .row-3{
        height: 51%;
        #echarts-win{
          margin:0;
          height: 100%;

        }
      }

    }



    .rightContainer{
      height:96%;
      color: skyblue;
      overflow: hidden;
    }
  }


}
</style>
