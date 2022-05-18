<template>
  <!-- <v-container> -->
  <!-- <v-card style="overflow: scroll"> -->
  <v-chart class="chart" :option="option" autoresize />
  <!-- </v-card> -->
  <!-- </v-container> -->
</template>

<script>
import { use } from "echarts/core";
// import { SVGRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { TooltipComponent, LegendComponent } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  GridComponent,
  LineChart,
  UniversalTransition,
]);

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
      type: Object,
      // default: () => {},
    },
  },
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data : this.chartData["labels"],
        },
        tooltip: {
          trigger: "item",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.chartData["data"],
            type: "line",
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
  height: 400px;
}
</style>