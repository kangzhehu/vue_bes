<template>
  <div>
    <!-- 标题 -->
    <div class="d-flex jc-center">
      <dv-decoration-10 class="dv-dec-10" />
      <div class="d-flex jc-center">
        <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
        <div class="title">
          <span class="title-text">智慧矿产资源监测系统</span>
          <dv-decoration-6
            class="dv-dec-6"
            :reverse="true"
            :color="['#50e3c2', '#67a1e5']"
          />
        </div>
        <dv-decoration-8
          class="dv-dec-8"
          :reverse="true"
          :color="decorationColor"
        />
      </div>
      <dv-decoration-10 class="dv-dec-10-s" />
    </div>
    <!-- 第二行  导航栏-->
    <div class="d-flex jc-between px-2">
      <div class="d-flex aside-width">
        <router-link class="react-left ml-4 react-l-s" to="index">
          <span class="react-left"></span>
          <span class="text">首页</span>
        </router-link>
        <router-link class="react-left ml-3" to="three">
          <span class="text">三维展示</span>
        </router-link>
      </div>
      <div class="d-flex aside-width">
        <router-link class="react-right mr-3" to="map">
          <span class="text fw-b">地图</span>
        </router-link>
        <div class="react-right mr-4 react-l-s">
          <span class="react-after"></span>
          <span class="text">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from "../utils/index.js";
export default {
  data() {
    return {
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      decorationColor: ["#568aea", "#000000"],
    };
  },
  mounted() {
    this.timeFn();
    this.cancelLoading();
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), "HH: mm: ss");
        this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000);
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/theheader.scss";
</style>
