<template>
  <v-container>
    <v-chart class="chart" :option="option" autoresize/>
    <!-- {{ chartData }} -->
  </v-container>
</template>

<script>
import { use } from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([TooltipComponent, LegendComponent, PieChart, SVGRenderer]);

export default {
  name: "HelloWorld",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "",
  },
  props: {
    chartData: {
      type: Array,
    },
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          bottom: "2%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "60%",
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            // data: [
            //   { value: 1048, name: "Search Engine" },
            //   { value: 735, name: "Direct" },
            //   { value: 580, name: "Email" },
            //   { value: 484, name: "Union Ads" },
            //   { value: 300, name: "Video Ads" },
            // ],
            data: this.chartData
            // data: null,
          },
        ],
      },
    };
  },
};
</script>

<style>
.chart {
  position: relative !important;
  height: 500px;
  overflow-y: scroll;
}
</style>