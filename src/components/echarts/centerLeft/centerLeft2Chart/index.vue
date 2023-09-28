<template>
 <div>
    <Chart :pdata="pdata"/>
 </div>
</template>

<script>
import Chart from './chart.vue'
export default {
  components:{
    Chart,
  },
  data(){
    return{
        pdata:{
            xData: ["大型","中型","小型","小矿"],
            seriesData: [
                {value:75, name: "大型"},
                {value:388, name: "中型"},
                {value:3110, name: "小型"},
                {value:1664, name: "小矿"},
            ]
        }
    }
  }
}
</script>

<style>

</style>