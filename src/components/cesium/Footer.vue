<template>
 <div class="footerContainer">
    <div class="item">
        <i>经度:</i><span>{{ itemProperty.lng }}</span>
    </div>
    <div class="item">
        <i>维度:</i><span>{{ itemProperty.lat }}</span>
    </div>
    <div class="item">
        <i>海拔:</i><span>{{ itemProperty.alt }}</span>
    </div>
    <div class="item">
        <i>方向:</i><span>{{ itemProperty.dir }}</span>
    </div>
    <div class="item">
        <i>俯仰角:</i><span>{{ itemProperty.angle }}</span>
    </div>
    <div class="item">
        <i>视高:</i><span>{{ itemProperty.sceneAlt }}</span>
    </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
        itemProperty: {
            lng:115,    
            lat:23,
            alt:90,//海拔
            dir:35,//方向
            angle:-90,//倾角
            sceneAlt:8000,//视高
        }
    }
  },
  mounted(){

  },
  computed:{
    changeItemProperty() {
        return this.$store.state.footerProperties
    }
  },
  watch:{
    changeItemProperty(value){
        this.itemProperty = value;
    }
  }
}
</script>

<style lang="scss" scoped>
.footerContainer{
    display:flex;
    flex-direction:row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 25px;
    color: #d3d6dd;
    font-size: 14px;
    overflow: hidden;

    .item{
        margin-right: 25px;
        i{
            font-style: normal;
            padding-right: 4px;
        }
    }


}
</style>