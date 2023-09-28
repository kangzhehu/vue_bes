<template>
 <div :id="id" :class="className" :style="{height:height, width :width}">
 </div>
</template>

<script>
import tdTheme from './theme.json'
import '../map/jiangxi.js'
export default {
  name:'echart',
  props:{
    className:{
        type: String,
        default:'chart'
    },
    id:{
        type: String,
        default:'chart'
    },
    width:{
        type: String,
        default:'100%'
    },
    height: {
      type: String,
      default: '2.5rem'
    },
    options: {
      type: Object,
      default: ()=>({})
    }
  },
  data (){
    return {
        chart:null
    }
  },
  watch:{
    options: {
        handler(options){
            //设置ture清空echarts
            this.chart.setOption(options,true)
        },
        deep:true
    }
  },
  mounted(){
    //* 覆盖默认主题
    this.$echarts.registerTheme('tdTheme', tdTheme);
    this.initChart();
  },
  beforeDestroy() {
    this.chart.dispose();
    this.chart = null;
  },
  methods:{
    initChart(){
       // 初始化echart
       //$el即是  Vue实例挂载的元素节点
      this.chart = this.$echarts.init(this.$el, 'tdTheme')
      this.chart.setOption(this.options, true)
    }
  }
}
</script>

<style>

</style>