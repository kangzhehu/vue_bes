<template>
 <div class="switcher-container">
    <div>
        <span>矿区点: </span>
        <el-switch
        v-model="minePointShow"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="switchMinePoint"
        >
        </el-switch>
    </div>
    <div>
        <span>行政区: </span>
        <el-switch
        v-model="adminPointShow"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="switchAdminPoint"
        >
        </el-switch>
    </div>
    <div>
        <span>三维模型:</span>
        <el-switch
        v-model="threeModelShow"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="switchThreeModel"
        >
        </el-switch>
    </div>
 </div>
</template>

<script>
import * as ViewUtils from '../../utils/viewerUtils'
export default {
  data () {
    return {
        minePointShow:true,
        adminPointShow:false,
        threeModelShow:true,
    }
  },
  watch:{
    
  },
  computed:{
   
  },
  methods:{
    switchMinePoint(value){
      ViewUtils.showHidePoints(ViewUtils.staticParams.mountainsCollection, value)
    },
    switchAdminPoint(value){
      ViewUtils.showShpData(value);
    },
    switchThreeModel(value){
      ViewUtils.createBuilds(ViewUtils.staticParams.viewer,value);
    }
  }
}
</script>

<style lang="scss" scoped>
.switcher-container{
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  width: 120px;
  height: 120px;
  align-items: center;
  position: relative;
  background-color:rgba(56, 85, 89, 0.8);
  z-index: 1000;
  border:1px solid skyblue;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;

}
</style>