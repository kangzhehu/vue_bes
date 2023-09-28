<template>
  <div>
    <Echart :options="options" :id="id" height="100px" width="100px"></Echart>
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
    id: {
      type: String,
      required: true,
      default: "chartRate",
    },
    tips: {
      type: Number,
      required: true,
      default: 50,
    },
    colorObj: {
      type: Object,
      default: function () {
        return {
          textStyle: "#3fc0fb",
          series: {
            color: ["#00bcd44a", "transparent"],
            dataColor: {
              normal: "#03a9f4",
              shadowColor: "#97e2f5",
            },
          },
        };
      },
    },
  },
  watch: {
    //*  进行tips的监听
    tips: {
      handler(newData) {
        this.options = {
          title: {
            text: newData + "%",
            x: "center",
            y: "center",
            textStyle: {
              color: this.colorObj.textStyle,
              fontSize: 16,
            },
          },
          series: [
            {
              type: "pie",
              radius: ["75%", "80%"],
              center: ["50%", "50%"],
              //! 取消鼠标悬浮放大的效果
              hoverAnimation: false,
              // color: this.colorObj.series.color,
              label: {
                normal: {
                  show: false,
                },
              },
              data: [
                {
                  value: newData,
                  itemStyle: {
                    normal: {
                      color: this.colorObj.series.dataColor.normal,
                      shadowBlur: 10,
                      shadowColor: this.colorObj.series.dataColor.shadowColor,
                    },
                  },
                },
                {
                  value: 100 - newData,
                },
              ],
            },
          ],
        };
      },
      immediate: true,
      deep: true
    },
  },
};
</script>

<style></style>
