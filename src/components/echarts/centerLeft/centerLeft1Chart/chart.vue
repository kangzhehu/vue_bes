<template>
  <div>
    <Echart :options="options" id="centerLeft1Chart" height="360px" width="330px"></Echart>
  </div>
</template>

<script>
import Echart from "@/common/echart";
export default {
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      options: {},
    };
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          // backGroundColor:'rgba(39,46,74)',
          //! 图表信息触发
          tooltip: {
            trigger: "item",
          },
          //! 离容器的距离
          grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          },
          xAxis: [
            {
              data: newData.xdata,
              axisLabel: {
                textStyle: {
                  color: "rgba(122,173,212,1)",
                  fontSize: 8,
                },
                //!刻度标签和轴线之间的距离
                margin: 10,
              },
              axisLine: {
                show: true, //! 不显示x轴
                lineStyle: {
                  color: "rgba(53,65,95,1)",
                },
              },

              axisTick: {
                show: false, //! 不显示刻度
              },
              // ! 柱状在中间
              boundaryGap: true,
              splitLine: {
                show: false, //! 不显示分割线
              },
            },
          ],
          yAxis: [
            {
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(53,65,95,1)",
                  type: "dashed",
                },
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                textStyle: {
                  color: "rgba(122,173,212,1)",
                  fontSize: 8,
                },
              },
            },
          ],
          series: [
            {
              //!柱底圆片
              name: "",
              type: "pictorialBar",
              symbolSize: [20, 10],//! 调整截面形状
              symbolOffset: [0, 0],
              barWidth: 20,
              z: 8,
              itemStyle: {
                "normal": {
                  color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "rgba(0,171,255,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(0,171,255,1)"
                  }
                  ], false)
                },
                data: newData.seriesData
              }
            },
            //! 柱体
            {
              name: "",
              type: "pictorialBar",
              barWidth: 20,
              symbolOffset: [0, -10],
              symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
              itemStyle: {
                normal: {
                  //渐变色
                  color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "rgba(0,171,255,0.4)"
                  },
                  {
                    offset: 1,
                    color: "rgba(0,171,255,0.8)"
                  }
                  ])
                }
              },
              label: {
                normal: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "rgba(0,171,255,1)",
                    fontSize: 8
                  }
                }
              },
              data: newData.seriesData
            }
          ]
        };
      },
      immediate: true,
      deep: true
    },
  },
};
</script>

<style>
</style>
