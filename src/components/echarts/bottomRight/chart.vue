<template>
  <div>
    <Echart
      :options="options"
      id="bottomRightChart"
      height="480px"
      width="100%"
    ></Echart>
  </div>
</template>

<script>
import Echart from "@/common/echart";
export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    cdata: {
      handler(newData) {
        // console.log(newData);
        this.options = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        // backgroundColor:'#fff',
      },
      series: [
        {
          type: 'tree',
          data: [newData],
          left: '2%',
          right: '2%',
          top: '8%',
          bottom: '20%',
          symbol: 'emptyCircle',
          orient: 'vertical',
          roam:true,
          expandAndCollapse: true,
          itemStyle:{
            color:'lightsteelblue',
            borderWidth:1.5
          },
          label: {
            position: 'top',
            rotate: 0,
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 18,
            color: 'white',
          },
          leaves: {
            label: {
              position: 'bottom',
              rotate: -90,
              verticalAlign: 'middle',
              align: 'left',
              fontSize:18,
            }
          },
          animationDurationUpdate: 750
        }
      ]
        }
      },
      immediate:true,
      deep:true
    },
  },
};
</script>

<style></style>
