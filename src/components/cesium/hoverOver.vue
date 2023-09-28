<template>
 <div 
    class="hoverOverContainer"
    v-show="isShowHoverOver" 
    :style="itemProperty.positionStyle"  
 >
    <div class="title">
        {{ itemProperty.name }}
    </div>
    <div class="content">
        <div class="content-item">面积:{{ itemProperty.area }}</div>
        <div class="content-item">类别:{{ itemProperty.classification }}</div>
        <div class="content-item">主要矿产:{{ itemProperty.products }}</div>
    </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
        isShowHoverOver:false,
        itemProperty: {
            name:'矿区',
            area:'36',
            calssification:'限制开采区',
            products:'铜硫',
            positionStyle:{
                top:'400px',
                left:'350px'
            }
        }
    }
  },
  computed:{
    changeShowHoverOverState(){
        return this.$store.state.isShowHoverOver
    },
    changeHoverInfo(){
        return this.$store.state.hoverOverInfo
    }    
  },
  watch:{
    changeShowHoverOverState(value){
        this.$data.isShowHoverOver = value
        if(value){
            setTimeout(()=>{
                this.$store.dispatch('setIsShowHoverOverAsync',false);
            },3000)
        }
    },
    changeHoverInfo(value){
        this.$data.itemProperty = value
    }

  }
}
</script>

<style lang="scss" scoped> 
.hoverOverContainer{
  position: absolute;
  width: 340px;
  height: 70px;
  // background: rgba(42, 187, 242, 0.5);
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 15px;

  .title{
    margin: 6px 0 0 6px;
    width: 140px;
    height: 25px;
    line-height: 25px;
    color: orange;
    background-color: rgba(42, 187, 242, 0.5);
    border-radius: 6px;
  }

  .content{
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    color: white;
    span {
      width: 85px;
      line-height: 21px;
      color: white;
      border-radius: 8px;
      background-color: burlywood;
    }
  }

}
</style>