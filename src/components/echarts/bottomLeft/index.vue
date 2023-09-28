<template>
 <div>
    <Chart :cdata="cdata"/>
 </div>
</template>

<script>
import Chart from './chart.vue'
export default {
  setup () {
    return {
        cdata:{
          xData: ["南昌市","九江市","上饶市","抚州市","吉安市","鹰潭市","景德镇市","宜春市","新余市","赣州市","萍乡市"],
          ckdata:[0.9813, 185.20, 137.75, 52.13, 326.71, 7.33, 70.94, 160.82, 84.27, 645.57, 87.33],
          tmdata:[76.77, 502.3, 244.69, 213.31, 478.80,40.19, 220.18, 397.37, 88.06, 1137.48,71.16],
        }
    }
  },
  components:{
    Chart
  },
  mounted(){

  },
  methods:{
    
  }
}
</script>

<style>

</style>