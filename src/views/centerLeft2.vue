<!-- 饼状图 -->
<template>
 <div id="centerLeft2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">矿山统计</span>
          <dv-decoration-1 class="dv-dec-1" />
        </div>
      </div>
      <div class="d-flex jc-center">
          <CenterLeft2Chart/>
      </div>
      
      <div class="bottom-data">
        <div class="item-box mt-2"
        v-for="(item,index) in Data"
        :key="index"
        >
        <div class="d-flex">
          <dv-digital-flop class="dv-digital-flop" :config="item.number"/>
        </div>
        <p class="text" style="text-align: center;">
          {{ item.text }}
          <span class="colorYellowgreen">(个)</span>
         </p> 
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import CenterLeft2Chart from '@/components/echarts/centerLeft/centerLeft2Chart'
export default {
  components:{
    CenterLeft2Chart
  },
  data () {
    return {
      Data: [
      {
          number: {
            number: [15],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '特大型'
        },
        {
          number: {
            number: [1144],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '大型'
        },
        {
          number: {
            number: [361],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '中型'
        },
        {
          number: {
            number: [157],
            toFixed: 1,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '小型'
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
$box-width: 300px;
$box-height:410px;
#centerLeft2{
  width:$box-width;
  height:$box-height;
  padding:16px;
  border-radius: 10px;

  .bg-color-black{
    height:$box-height - 30px;
    border-radius:10px;
  }
  .text{
    color:#c3cbde;
  }
  .dv-dec-1{
    position: relative;
    width: 100px;
    height: 20px;
    top:-3px;
  }

  .bottom-data{
    .item-box{
      & > div{
        padding-right: 5px;
      }
      font-size: 14px;
      float: right;
      position: relative;
      width: 50%;
      color:#d3d6dd;  
    }
    .dv-digital-flop{
      width: 120px;
      height:30px;
    }
    .colorYellowgreen{
      color: yellowgreen;
    }

    p{
      text-align: center;
    }
  }

}
</style>