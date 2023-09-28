<template>
  <div>
    <!-- 矿山统计表：大型、中型、小型 -->
    <Chart :cdata="cdata"></Chart>
  </div>
</template>

<script>
import Chart from "./chart";
export default {
  components: {
    Chart
  },
  data() {
    return{
        cdata:{
            xdata: ["大型","中型","小型"],
            seriesData:[185,376,2272]
        }
    }
  },
};
</script>

<style></style>
