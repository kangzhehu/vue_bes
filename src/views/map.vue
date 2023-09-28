<template>
 <div class="cesiumMap">
    <Viewer/>
    <Meun/>
    <Search/>
    <hoverOver/>
    <PopupOver/>
    <PopupWin/>
    <Footer/>
 </div>
</template>

<script>
import Viewer from '../components/cesium/Viewer.vue'
import Footer from '../components/cesium/Footer.vue'
import hoverOver from '../components/cesium/hoverOver.vue'
import Meun from '../components/cesium/Meun.vue'
import PopupOver from '../components/cesium/PopupOver.vue'
import PopupWin from '../components/cesium/PopupWin.vue'
import Search from '../components/cesium/Search.vue'
export default {
  components:{
    Viewer,
    Footer,
    hoverOver,
    Meun,
    PopupOver,
    PopupWin,
    Search,
  },
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>

</style>