<template>
 <div 
    class="popupOver-container"
    v-bind:style="itemProperty.positionStyle"
    v-show="showPopupOver"
 >
  <h4 class="title">{{ itemProperty.name}}</h4>
  <el-image
    style="width:24px; height:24px"
    :src="imgurl"
    title="信息明细"
    @click="openMoreInfo"
  >
  </el-image>
   <!-- 关闭按钮 -->
   <i class="el-icon-circle-close close-btn-icon" @click="closePopUpOver"></i>
  <div class="popup-content">
    <ul>
      <li>
        <i class="item-name">编号:</i>
        <span class="item-value">{{ itemProperty.number }}</span>
      </li>
      <li>
        <i class="item-name">所在行政区:</i>
        <span class="item-value">{{ itemProperty.region }}</span>
      </li>
      <li>
        <i class="item-name">面积:</i>
        <span class="item-value">{{ itemProperty.area }}</span>
      </li>
      <li>
        <i class="item-name">类别:</i>
        <span class="item-value">{{itemProperty.classification  }}</span>
      </li>
      <li>
        <i class="item-name">主要矿产:</i>
        <span class="item-value">{{itemProperty.products  }}</span>
      </li>
      <li>
        <i class="item-name">备注</i>
        <span class="item-value">{{itemProperty.notes }}</span>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
        imgurl:require('../../assets/imgs/more.png') ,
        showPopupOver:false,
        itemProperty:{
            name:'矿区',
            number:'',
            region:'',
            area:'36',
            classification:'限制开采区',
            products:'铜硫',
            notes:'  ',//备注
            positionStyle:{
                top:'400px',
                left:'350px'
            }
        }
    }
  },
  watch:{
    changePopupOverState(value){
        this.$data.showPopupOver = value;
    },
    onItemProperty(value){
        this.$data.itemProperty = value;
    }
  },
  computed:{
    changePopupOverState(){
      return this.$store.state.isShowPopupOver
    },
    onItemProperty(){
      return this.$store.state.popupOverInfo
    }
  },
  mounted(){
    this.$data.showPopupOver = this.$store.getters.getIsShowPopupOver
  },
  methods:{
    closePopUpOver(){
      this.$store.dispatch('setIsShowPopupOverAsync', false)
    },
    openMoreInfo(){
      // console.log("点击了");
      this.$store.dispatch('setIsShowPopupWindowAsync', true);
      this.$store.dispatch('setPopupWindowInfoAsync',{
        name:this.itemProperty.name
      });
      this.$store.dispatch('setChartProductInfoAsync',{
        name:this.itemProperty.name
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.popupOver-container{
  position: absolute;
  top: 0;
  left: 0;
  width: 280px;
  height:250px;
  background:
    linear-gradient(135deg,transparent 25px, rgba(42,187,242,0.5) 0 ) top left,
    linear-gradient(-135deg, transparent 0px, rgba(42, 187, 242, 0.5) 0) top
      right,
    linear-gradient(-45deg, transparent 25px, rgba(42, 187, 242, 0.5) 0) bottom
      right,
    linear-gradient(45deg, transparent 0px, rgba(42, 187, 242, 0.5) 0) bottom
      left;

  background-size:50% 50%;
  background-repeat: no-repeat;

  .title {
    margin: 0 auto;
    margin-top: 8px;
    width: 70%;
    height: 12%;
    line-height: 25px;
    color: #fff;
    background-color: rgba(42, 187, 242, 0.8);
  }
  .el-image {
    position: absolute;
    right: 12px;
    top: 9px;
  }
  .close-btn-icon {
    position: absolute;
    right: -8px;
    top: -8px;
    color: #fff;
  }
  // 内容样式
  .content {
    li {
      list-style: none;
      text-align: left;
      // 属性名称样式
      .item-name {
        font-style: normal;
        display: inline-block;
        margin-bottom: 2px;
        width: 33%;
        color: #fff;
      }
      // .item-name-last {
      //   // margin-bottom: 5px;
      // }
      // 属性值样式
      .item-value {
        display: inline-block;
        width: 65%;
        color: #fff;
        text-align: center;
        overflow: hidden;
      }

      .item-value-last {
        margin-top: 5px;
        // text-align: left;
        font-size: 12px;
      }
    }
  }
}
</style>