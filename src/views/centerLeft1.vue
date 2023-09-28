<template>
 <div id="centerLeft1">
    <div class="bg-color-black">
        <div class="d-flex pt-2 pl-2">
            <span>
                <icon name="chart-bar" class="text-icon"></icon>
            </span>
            <div class="d-flex">
                <span class="fs-xl text mx-2">矿区统计</span>
                <dv-decoration-3 class="dv-dec-3"></dv-decoration-3>
            </div>
        </div>
        <div class="d-flex jc-center">
            <centerLeft1Chart/>
        </div>
    </div>
 </div>
</template>

<script>
import centerLeft1Chart from '@/components/echarts/centerLeft/centerLeft1Chart'
export default {
    components:{
        centerLeft1Chart
    },
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
$box-width: 300px;
$box-height:410px;
#centerLeft1{
    padding: 16px;
    height: $box-height;
    width: $box-width;
    border-radius :10px;
    .bg-color-black{
        height: $box-height - 30px;
        border-radius: 10px;
    }
    .text{
        color:#c3c3de;
    }
    .dv-dec-3{
        position: relative;
        width: 100px;
        height: 20px;
        top: -10px
    }
}



</style>