<template>
 <div>
    <Echart
        :options="options"
        id="bottomLeftChart"
        height="480px"
        width="100%"
    ></Echart>
 </div>
</template>

<script>
import Echart from '@/common/echart';
export default {
  data () {
    return {
        options:{},
    }
  },
  components:{
    Echart
  },
  props:{
    cdata:{
        type: Object,
        default:()=>({})
    },
  },
  watch:{
    cdata:{
        handler(newData){
            // console.log(newData);
            this.options={
                textStyle: {
                    color: "#c0c3cd",
                    fontSize: 14
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
                            backgroundColor: "#031245"
                        },
                        restore: {}
                    },
                    iconStyle: {
                        borderColor: "#c0c3cd"
                    },    
                },
                dataZoom: [
                        {
                            xAxisIndex: 0,
                            show: false,
                            type: "slider",
                            startValue: 0,
                            endValue: 1,
                            //  filterMode: "none",
                        }
                    ],
                legend:{
                    top:10,
                    itemWidth:8,
                    itemHeight:8,
                    icon:"circle",
                    left:"center",
                    padding:0,
                    textStyle:{
                        color:"#c0c3cd",
                        fontSize:14,
                        padding:[2,0,0,0]
                    }
                },
                color:["rgba(70,135,255,1)", "rgba(70,135,255,1)"],
                grid:{
                    containLabel:true,
                    left:20,
                    right:20,
                    bottom:20,
                    top:40
                },
                xAxis:{
                    nameTextStyle:{
                        color:"#c0c3cd",
                        padding:[0,0,-10,0],
                        fontSize:14
                    },
                    axisLabel:{
                        color:"#fff",
                        fontSize:14,
                        interval:0,
                        margin:18,
                        rotate:0
                    },
                    axisTick:{
                        show:false,
                        lineStyle:{
                            color:"#384267",
                            width:1,
                        }
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'rgba(15,30,64,1)',
                            width:15
                        },
                    },
                    splitArea:{
                        interval:0,
                        show:true,
                        areaStyle:{
                            color:["rgba(250,250,250,0.05)", "rgba(250,250,250,0.05)"]
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:"#335971"
                        },
                        show:false,
                    },
                    data:newData.xData,
                    type:"category"
                },
                yAxis:{
                    nameTextStyle:{
                        color:"#c0c3cd",
                        padding:[0,0,-10,0],
                        fontSize:14
                    },
                    axisLabel:{
                        color:"#fff",
                        fontSize:14,
                    },
                    axisTick:{
                        lineStyle:{
                            color:"#668092",
                            width:1,
                        },
                        show:false,
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            color:'rgba(255,255,255,0.1)',
                            width:0.5
                        },
                    },
                    axisLine:{
                        lineStyle:{
                            color:"#668092",
                            width:1
                        },
                        show:false,
                    },
                },
                series:[
                    {
                        name:"矿区面积",
                        data:newData.ckdata,
                        type:"bar",
                        barMaxWidth:"auto",
                        barWidth:"16",
                        itemStyle:{
                            color:{
                                x:0,
                                y:0,
                                x2:0,
                                y2:1,
                                type:"linear",
                                colorStops:[
                                 {
                                    offset: 0,
                                    color: "rgba(70,135,255,0.11)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(70,135,255,1)"
                                    }
                                ]
                            }
                        },
                        label:{
                            show:true,
                            position:"top",
                            distance:10,
                            fontSize:12,
                            color:"#4dffff"
                        }
                    },
                    {
                        data: [1, 1, 1, 1, 1, 1],
                        type: "pictorialBar",
                        barMaxWidth: "20",
                        symbol: "diamond",
                        symbolOffset: [-10, "50%"],
                        symbolSize: [16, 8],
                    },
                    {
                        data:newData.ckdata,
                        type: "pictorialBar",
                        barMaxWidth: "20",
                        symbolPosition: "end",
                        symbol: "diamond",
                        symbolOffset: [-10, "-50%"],
                        symbolSize: [16, 8],
                        zlevel: 2,
                    },
                    {
                        name:"勘探面积",
                        data:newData.tmdata,
                        type:"bar",
                        barMaxWidth:"auto",
                        barWidth:"16",
                        itemStyle:{
                            color:{
                                x:0,
                                y:0,
                                x2:0,
                                y2:1,
                                type:"linear",
                                colorStops:[
                                 {
                                    offset: 0,
                                    color: "rgba(70,135,255,0.11)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(70,135,255,1)"
                                    }
                                ]
                            }
                        },
                        label:{
                            show:true,
                            position:"top",
                            distance:10,
                            fontSize:12,
                            color:"#4dffff"
                        }
                    },
                    {
                        data: [1, 1, 1, 1, 1, 1],
                        type: "pictorialBar",
                        barMaxWidth: "20",
                        symbol: "diamond",
                        symbolOffset: [10, "50%"],
                        symbolSize: [16, 8],
                    },
                    {
                        data: newData.tmdata,
                        type: "pictorialBar",
                        barMaxWidth: "20",
                        symbolPosition: "end",
                        symbol: "diamond",
                        symbolOffset: [10, "-50%"],
                        symbolSize: [16, 8],
                        zlevel: 2,
                    },
                ],
                tooltip: {
                    show: true,
                    formatter:"{c0}平方千米"
                }
            }
            this.fun()
        },
        immediate:true,
        deep:true
    },

  },
  methods:{
    fun(){
        setInterval(() => {
            if (this.options.dataZoom[0].endValue == 11) {
        this.options.dataZoom[0].endValue = 1;
        this.options.dataZoom[0].startValue = 0;
            } else {
                this.options.dataZoom[0].endValue = this.options.dataZoom[0].endValue + 1;
                this.options.dataZoom[0].startValue = this.options.dataZoom[0].startValue + 1;
            }
        }, 2000);
    }
  }
}
</script>

<style>

</style>