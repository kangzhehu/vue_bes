<template>
 <div id="bottomLeft">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
             <span>
               <icon name="chart-pie" class="text-icon"></icon>  
             </span>
             <div class="d-flex">
                 <span class="fs-xl text mx-2">矿山面积</span>
             </div>
         </div>
         <div >
              <bottomLeftChart/>
         </div>
    </div>
 </div>
</template>

<script>
import bottomLeftChart from '@/components/echarts/bottomLeft'
export default {
  data () {
    return {

    }
  },
  components:{
    bottomLeftChart
  }
}
</script>

<style lang="scss" scoped>
$box-height: 520px;
$box-width: 100%;
#bottomLeft {
  padding: 20px 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 35px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
}
</style>