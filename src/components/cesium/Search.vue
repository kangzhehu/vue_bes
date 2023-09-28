<template>
 <div class="search-container">
    <!-- 信息搜索 -->
   <el-select
    v-model="value"
   filterable 
   clearable 
   remote
   placeholder="Search"
   :remote-method="querySearch"
   :loading="loading"
   @change="change"
   >
        <el-option v-for="item in options" 
        :key="item.value"
        :label="item.label"
        :value="item.value"
        >
        </el-option>
   </el-select>
 </div>
</template>

<script>
import { HttpManager } from '../../api/index';
import * as ViewUtils from "../../utils/viewerUtils"
import * as Cesium from 'cesium/Cesium'
export default {
  data () {
    return {
        options:[],
        value: "",
        list:[],
        loading:false,
    }
  },
  mounted(){

  },
  methods:{
    querySearch(query){
        if(query!==''){
            this.loading = true;
            HttpManager.getMineOfWord(query).then((response)=>{
                // console.log(response);
                this.options = response.data.map(item=>{
                    return {value:item.id, label:item.name}
                })
                // console.log(this.options);
            })
            setTimeout(()=>{
                this.loading = false;
            },1000)
           
        }else{
           this.options=[] 
        }
    },
    change(val){
        HttpManager.getMineOfId(val).then(result=>{
            // console.log(result.data);
            if(ViewUtils.staticParams.viewer){
                ViewUtils.staticParams.viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(
                    result.data.lon,
                    result.data.lat-0.06,
                    8000.0
                ),
                //设置相机朝向：俯仰角、倾角
                orientation: {
                    heading: Cesium.Math.toRadians(350),
                    pitch: Cesium.Math.toRadians(-50),
                    roll: 0.0,
                },
            })
        }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
    .search-container{
        position: absolute;
        height: 40px;
        right: 30px;
        top: 100px;
    }
</style>