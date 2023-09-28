<template>
  <div id="app">
    <div class="specified-area">
    <div class="head" >
        <div class="leftLogo">
          矿产资源储量监管应用系统
        </div>
        <div class="rightRouter">
            <div class="rightRouter-item">
              <router-link to="/map" class="navBut">地图</router-link>
            </div>
            <div class="rightRouter-item">
              <router-link to="/index" class="navBut">图表</router-link>
            </div>
            <div class="rightRouter-item">
              <router-link to="/table" class="navBut">数据管理</router-link>
            </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  data(){
    return{
      
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
#app{
  width: 100vw;
  height: 100vh;
  background-color: #020308;
  overflow: hidden;
  .head{
    position: absolute;
    height: 50px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    background-color: rgb(112, 105, 246);
    display: flex;
    color: #ffffff;
    padding: 0 20px;
    justify-content:space-between;
    align-items:center;
    z-index: 1000;
    outline: none;
    
    opacity: 0;
    transition: opacity 0.3s;
    .leftLogo{
      font-size: 24px;
    }
    .rightRouter{
      display: flex;
      justify-content:space-around;
      align-items:center;
      
      width: 30%;
      .rightRouter-item{
        font-size: 20px;
        cursor: pointer;
        display: flex;
        height:50px;
        width: 80px;
        justify-content: center;
        align-items:center;
        transition: background-color 0.3s ease-in-out;
        .navBut{
          color: white;
    
        }

        .router-link-active{
          background-color: rgba(42, 187, 242, 0.8);
        }

      }
    }
  }


  .specified-area:hover .head {
    opacity: 1;
  }
     
}

 
  
</style>
