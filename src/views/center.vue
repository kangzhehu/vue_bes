<template>
 <div id="center">
    <div class="up">
        <div 
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
        >
        <p class="ml-3 colorBlue fw-b fs-xl">{{ item.title }}</p>
        <div>
            <!-- 数字翻牌器 -->
            <dv-digital-flop
                class="dv-dig-flop m1-1 mt-2 pl-3"
                :config="item.number"
            />
        </div>
        </div>
    </div>
    <div class="down">
        <div class="ranking bg-color-black">
            <span>
                <icon name="chart-pie" class="text-icon"></icon>
            </span>
            <span class="fs-xl text mx-2 mb-1 pl-3">发现矿产种类</span>
            <dv-scroll-ranking-board class="dv-scr-rank-board mt-1" :config="ranking"/>
        </div>
        <div class="percent">
            <div class="item bg-color-black">
                <span>可规划利用矿区</span>
                <CenterChart
                    :id="rate[0].id"
                    :tips="rate[0].tips"
                    :colorObj="rate[0].colorData"
                />
            </div>
            <div class="item bg-color-black">
                <span>已利用矿区</span>
                <CenterChart
                    :id="rate[1].id"
                    :tips="rate[1].tips"
                    :colorObj="rate[1].colorData"
                />
            </div>
            <div class="water bg-color-black">
                <span>难以利用矿区</span>
                <CenterChart
                    :id="rate[2].id"
                    :tips="rate[2].tips"
                    :colorObj="rate[2].colorData"
                />
            </div>
        </div>
    </div>
 </div>
</template>

<script>
import CenterChart from '@/components/echarts/center';
export default {
    components:{
        CenterChart
    },
  data(){
    return{
        titleItem:[
            {
                title:"已证实矿产资源储量",
                number:{
                    number:[120],
                    toFixed:1,
                    textAlign:'left',
                    content:'{nt}',
                    style:{
                        fontSize:26
                    }
                }
            },
            {
                title:"可信矿产资源储量",
                number:{
                    number:[20],
                    toFixed:1,
                    textAlign:'left',
                    content:'{nt}',
                    style:{
                        fontSize:26
                    }
                }
            },
            {
                title:"探明矿产资源储量",
                number:{
                    number:[10],
                    toFixed:1,
                    textAlign:'left',
                    content:'{nt}',
                    style:{
                        fontSize:26
                    }
                }
            },
            {
                title:"推断矿产资源储量",
                number:{
                    number:[12],
                    toFixed:1,
                    textAlign:'left',
                    content:'{nt}',
                    style:{
                        fontSize:26
                    }
                }
            },
            {
                title:"潜在矿产资源储量",
                number:{
                    number:[100],
                    toFixed:1,
                    textAlign:'left',
                    content:'{nt}',
                    style:{
                        fontSize:26
                    }
                }
            },
            {
                title:"累计查明资源储量",
                number:{
                    number:[262],
                    toFixed:1,
                    textAlign:'left',
                    content:'{nt}',
                    style:{
                        fontSize:26
                    }
                }
            },
        ],
        ranking:{
            data:[
            {
                name: '南昌',
                value: 18
                },
                {
                name: '九江',
                value: 106
                },
                {
                name: '景德镇',
                value: 37
                },
                {
                name: '上饶',
                value: 79
                },
                {
                name: '鹰潭',
                value: 36
                },
                {
                name: '萍乡',
                value: 46
                },
                {
                name: '宜春',
                value: 76
                },
                {
                name: '新余',
                value: 44
                },
                {
                name: '抚州',
                value: 57
                },
                {
                name: '吉安',
                value: 55
                },
                {
                name: '赣州',
                value: 110
                },
            ]
        },
        rate:[
            {
               id:'centerRate1',
               tips:30,
                colorData:{
                    textStyle:'#45f415',
                    series:{
                        color:['#00bcd44a', 'transparent'],
                        dataColor: {
                        normal: '#2eb408',
                        shadowColor: '#71fb4b'
                        }
                    }
                }
            },
            {
                id: 'centerRate2',
                tips: 60,
                colorData: {
                    textStyle: '#67e0e3',
                    series: {
                    color: ['#faf3a378', 'transparent'],
                    dataColor: {
                        normal: '#ff9800',
                        shadowColor: '#fcebad'
                        }
                    }
                }
            },
            {
                id: 'centerRate3',
                tips: 10,
                colorData: {
                    textStyle: '#45f415',
                    series: {
                    color: ['#faf3a378', 'transparent'],
                    dataColor: {
                        normal: '#2eb408',
                        shadowColor: '#71fb4b'
                        }
                    }
                }
            }
        ]
    }
  }
}
</script>

<style lang="scss" scoped>
#center{
    display: flex;
    flex-direction: column;
    .up{
        width:100%;
        display: flex;
        flex-wrap: wrap;
        justify-content:space-around;

        .item{
            border-radius: 6px;
            padding-top: 8px;
            margin-top: 8px;
            width:32%;
            height: 70px;
        }
        .dv-dig-flop{
            width:150px;
            height:30px
        }
    }
    .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 5px;
    }
    .ranking {
      padding: 10px;
      width: 59%;
      .dv-scr-rank-board {
        height: 225px;
      }
    }
    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        height: 120px;
        span {
          margin-top: 8px;
          font-size: 14px;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        padding-left: 23%;
        width: 100%;
        height: 120px;
      }
    }
  }
    
}
</style>