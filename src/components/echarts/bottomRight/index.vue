<template>
 <div>
    <Chart :cdata="cdata"/>
 </div>
</template>

<script>
import Chart from './chart.vue'
// import Echart from "@/common/echart";
export default {
components:{
    // Echart,
    Chart
  },
  data() {
    return {
        cdata:{
            name:'开发利用现状',
            children:[
                {
                    name:'部发证矿山',
                    children:[
                        {name:'铀矿', value:9},
                        {name:'煤矿', value:1},
                        {name:'铜矿', value:2},
                        {name:'金矿', value:1},
                        {name:'水泥用灰岩矿', value:1},
                        {name:'其它非金属矿', value:5},
                    ]
                },{
                    name:'省发证矿山',
                    children:[
                        {name:'煤矿', value:471},
                        {name:'铁矿', value:114},
                        {name:'铜矿', value:47},
                        {name:'铅矿', value:37},
                        {name:'锌矿', value:5},
                        {name:'钨矿', value:88},
                        {name:'锡矿', value:6},
                        {name:'钼矿', value:8},
                        {name:'稀土矿', value:56},
                        {name:'钽铌矿', value:5},
                        {name:'锂矿', value:3},
                        {name:'金矿', value:47},
                        {name:'银矿', value:12},
                        {name:'盐矿', value:8},
                        {name:'磷矿', value:2},
                        {name:'地热', value:14},
                        {name:'其它', value:55},
                    ]
                },{
                    name:'市发证矿山',
                    children:[
                        {name:'萤石矿', value:110},
                        {name:'高岭土矿', value:99},
                        {name:'水泥用灰岩矿', value:108},
                        {name:'硅灰石矿', value:10},
                        {name:'黑滑石矿', value:4},
                        {name:'硅石矿', value:79},
                        {name:'其它', value:507},
                    ]
                },{
                    name:'县发证矿山',
                    children:[
                        {name:'砖瓦用粘土矿',value:2200},
                        {name:'建筑用石料矿',value:1160},
                        {name:'饰面用石矿',value:26},
                    ]
                }
            ]
        },
    }
  },
  mounted(){
    // this.options= {
    //         tooltip: {
    //             trigger: 'item',
    //             triggerOn: 'mousemove'
    //         },
    //         series: [
    //             {
    //             type: 'tree',
    //             data: [this.cdata],
    //             left: '2%',
    //             right: '2%',
    //             top: '8%',
    //             bottom: '20%',
    //             symbol: 'emptyCircle',
    //             orient: 'vertical',
    //             expandAndCollapse: true,
    //             label: {
    //                 position: 'top',
    //                 rotate: -90,
    //                 verticalAlign: 'middle',
    //                 align: 'right',
    //                 fontSize: 9
    //             },
    //             leaves: {
    //                 label: {
    //                 position: 'bottom',
    //                 rotate: -90,
    //                 verticalAlign: 'middle',
    //                 align: 'left'
    //                 }
    //             },
    //             animationDurationUpdate: 750
    //             }
    //         ]
    //     }
  }
}
</script>

<style>

</style>