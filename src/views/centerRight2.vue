<template>
 <div id="centerRight2">
    <div class="bg-color-black">
        <div class="d-flex pt-2 pl-2">
            <span>
                <icon name="chart-line" class="text-icon"></icon>
            </span>
            <div class="d-flex">
                <span class="fs-xl text mx-2">勘察资源储量</span>
            </div>
        </div>
        <div class="d-flex jc-center body-box">
            <dv-scroll-board class="dv-scr-board" :config="config"/>
        </div>
    </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
        config:{
            header:['资源名称', '类别', '矿山数'],
            data:[
                ['煤矿','金属矿产',"<span  class='colorGrass'>3</span>"],
                ['铁矿','金属矿产',"<span  class='colorGrass'>78</span>"],
                ['铜矿','金属矿产',"<span  class='colorGrass'>526</span>"],
                ['铅矿','金属矿产',"<span  class='colorGrass'>187</span>"],
                ['锌矿','金属矿产',"<span  class='colorGrass'>7</span>"],
                ['钨矿','金属矿产',"<span  class='colorGrass'>32</span>"],
                ['锡矿','金属矿产',"<span  class='colorGrass'>26</span>"],
                ['钼矿','金属矿产',"<span  class='colorGrass'>45</span>"],
                ['稀土矿','金属矿产',"<span  class='colorGrass'>6</span>"],
                ['钽铌矿','金属矿产',"<span  class='colorGrass'>37</span>"],
                ['锂矿','金属矿产',"<span  class='colorGrass'>3</span>"],
                ['金矿','金属矿产',"<span  class='colorGrass'>428</span>"],
                ['银矿','金属矿产',"<span  class='colorGrass'>93</span>"],
                ['萤石矿','非金属矿产',"<span  class='colorGrass'>101</span>"],
                ['高岭土矿','非金属矿产',"<span  class='colorGrass'>27</span>"],
                ['水泥用灰岩矿','非金属矿产',"<span  class='colorGrass'>4</span>"],
                ['硅灰石矿','非金属矿产',"<span  class='colorGrass'>4</span>"],
                ['黑滑石矿','稀有矿产',"<span  class='colorGrass'>3</span>"],
                ['硅石矿','非金属矿产',"<span  class='colorGrass'>14</span>"],
                ['地热','能源矿产',"<span  class='colorGrass'>115</span>"],
                
            ],
            rowNum:7,//表格行数
            headerHeight:35,
            headerBGC:'#0f1325',
            oddRowBGC:'#0f1325',
            evenRowBGC:'#171css',
            index:true,
            columnWidth:[50],
            align:['center']
        }
    }
  },
}
</script>

<style lang="scss" scoped>
$box-height:410px;
$box-width:300px;
#centerRight2{
    padding:16px;
    padding-top: 20px;
    height: $box-height;
    width: $box-width;
    border-radius: 5px;
    .bg-color-black {
        height: $box-height - 30px;
        border-radius: 10px;
    }

    .text{
        color:#c3cbde;
    }

    .body-box {
    border-radius: 10px;
    overflow: hidden;
        .dv-scr-board {
        width: 270px;
        height: 340px;
        }
    }
}
</style>