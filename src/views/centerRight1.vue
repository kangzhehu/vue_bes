<!-- 地图 -->
<template>
  <div id="centerRight1">
     <div class="bg-color-black">
         <div class="d-flex pt-2 pl-2">
             <span>
               <icon name="chart-pie" class="text-icon"></icon>  
             </span>
             <div class="d-flex">
                 <span class="fs-xl text mx-2">市矿山数</span>
             </div>
         </div>
         <div class="d-flex jc-centered">
              <centerRightChart/>
         </div>
     </div>
  </div>
 </template>
 
 <script>
 import centerRightChart from '@/components/echarts/centerRight';
 export default {
  components:{
    centerRightChart
  },
   data () {
     return {
 
     }
   },
 }
 </script>

<style lang="scss" scoped>
#centerRight1 {
  $box-height: 410px;
  $box-width: 380px;
  padding: 15px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-dec-1 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }
}
</style>