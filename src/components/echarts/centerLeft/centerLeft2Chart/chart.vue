<template>
 <div>
    <Echart
      :options="options"
      id="centreLeft2Chart"
      height="220px"
      width="260px"
    ></Echart>
 </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
    components:{
        Echart
    },
    props:{
        pdata:{
            type:Object,
            default:()=>({})
        }
    },
    watch:{
       pdata :{
        handler(newData){
          this.options={
            color: [
            "#37a2da",
            "#32c5e9",
            "#9fe6b8",
            "#ffdb5c",
            "#ff9f7f",
            "#fb7293",
            "#e7bcf3",
            "#8378ea"
          ],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            show: true
          },
          calculable: true,
          legend: {
            orient: "horizontal",
            icon: "circle",
            bottom: 0,
            x: "center",
            data: newData.xData,
            textStyle: {
              color: "#fff"
            }
          },
          series: [
            {
              name: "矿区统计",
              type: "pie",
              radius: [10, 50],
              roseType: "area",
              center: ["50%", "40%"],
              data: newData.seriesData
            }
          ]
          }
        },
        immediate: true,
        deep: true
       }
    },
  data(){
    return{
        options:{}
    }
  }
}
</script>

<style>

</style>