<!-- 地图 -->
<template>
    <div id="bottomRight">
       <div class="bg-color-black">
        <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-area" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">开发利用现状</span>
         
        </div>
      </div>
      <div>
        <bottomRightChart />
      </div>
       </div>
    </div>
   </template>
   
   <script>
   import bottomRightChart from '@/components/echarts/bottomRight';
   export default {
      components:{
        bottomRightChart,
      },
     data () {
       return {
   
       }
     },
   }
   </script>
   
   <style lang="scss" scoped>
   $box-height: 520px;
   $box-width:100%;
   #bottomRight{
    padding: 14px 16px;
    height:$box-height;
    width:$box-width;
    border-radius: 5px;
    .bg-color-black{
        height: $box-height - 30px;
        border-radius: 10px;
    }
    .text{
        color:#c3c3de;
    }
    
   }
   </style>