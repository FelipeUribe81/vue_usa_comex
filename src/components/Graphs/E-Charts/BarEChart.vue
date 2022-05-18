<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
// import { PieChart } from "echarts/charts";
import { BarChart } from "echarts/charts";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
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
          // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data : this.chartData["labels"],
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            data: this.chartData["data"],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
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