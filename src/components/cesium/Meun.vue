<template>
  <div class="meun-switch">
 <div class="meunContainers">
   <div class="item" @click="showTdAnalysis">
      <dv-decoration-9 class="buttonSty">三维分析</dv-decoration-9>
   </div> 
   <div class="item" @click="resetView">
      <dv-decoration-9 class="buttonSty" >重新加载</dv-decoration-9>
   </div> 
   <div class="item">
      <dv-decoration-9 class="buttonSty">信息查询</dv-decoration-9>
   </div> 
   <div class="item" @click="showOrHideSwitch">
      <dv-decoration-9 class="buttonSty" >地图管理</dv-decoration-9>
   </div> 
 </div>
 <div class="switchBox"  v-show="showSwitcher">
    <mySwitch/>
 </div>
 <div class="tdBox"  v-show="tdAnalysis">
    <TdAnalysis/>
 </div>
</div>
</template>

<script>
import * as ViewUtils from "../../utils/viewerUtils"
import * as Cesium from 'cesium/Cesium'
import mySwitch from './Switch.vue'
import TdAnalysis from "./TdAnalysis.vue"
export default {
  components:{
    mySwitch,
    TdAnalysis
  },
  data () {
    return {
      showSwitcher:false,
      tdAnalysis:false,
    }
  },
  methods:{
    resetView(){
      if(ViewUtils.staticParams.viewer){
        ViewUtils.staticParams.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          115.846268,
          28.629769,
          8000.0
        ),
        //设置相机朝向：俯仰角、倾角
        orientation: {
          heading: Cesium.Math.toRadians(350),
          pitch: Cesium.Math.toRadians(-50),
          roll: 0.0,
        },
      })
      }
    },
    showOrHideSwitch(){
      // console.log(this.showSwitcher);
     this.showSwitcher = !this.showSwitcher;
    //  console.log(this.showSwitcher);
    },
    showTdAnalysis(){
      this.tdAnalysis = !this.tdAnalysis;
    }
  }
}
</script>

<style lang="scss" scoped>
  .meun-switch{
    position: absolute;
    width: 410px;
    height: 100px;
    top:100px;
    left: 10px;
  .meunContainers{ 
    display:flex;
    width: 400px;
    height:80px;
    background-color:rgba(56, 85, 89, 0.8);
    border: 1px solid skyblue;
    border: radius 10px;
    z-index: 1000;
    justify-content: space-around;
    flex-direction:row;
    flex-wrap: nowrap;
  
    .item{
      font-size: 12px;
      color: #d3dcd3;

      .buttonSty{
        width: 80px;
        height: 80px;
      }
    }
  }

  .switchBox{
    width: 120px;
    height: 120px;
   
  }
  
}

</style>