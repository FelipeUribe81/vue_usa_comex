<template>
  <v-container>
    <!-- GRAPH -->
    <BarChart v-if="typeGraph == 'bar'" ></BarChart>
    <DonutChart v-if="typeGraph == 'donut'" :chartData="chartDataOne"></DonutChart>
    <PieChart v-if="typeGraph == 'pie'" ></PieChart>
    <!-- <PieChart v-if="typeGraph == 'pie'" :chartData="chartDataOne"></PieChart> -->
    <LineChart v-if="typeGraph == 'line'"></LineChart>
    <!-- {{ chartData }} -->
  </v-container>
</template>
 
<script>
import BarChart from "./Graphs/ChartsJs/BarChart/BarChart.vue";
// import BarChart from "./Graphs/VueCharts/BarChart.vue";
import DonutChart from "./Graphs/ChartsJs/DonutChart/DonutChart.vue";
// import DonutChart from "./Graphs/VueCharts/DonutChart.vue";
import PieChart from "./Graphs/ChartsJs/PieChart/PieChart.vue";
// import PieChart from "./Graphs/Charts-JS/PieChart.vue";
import LineChart from "./Graphs/ChartsJs/LineChart/LineChart.vue";
// import LineChart from "./Graphs/ChartsJs/LineChart/PlanetChart.vue";
import { Global } from "../Global";

export default {
  name: "GraphChart",
  components: {
    BarChart,
    DonutChart,
    PieChart,
    LineChart,
  },
  props: ["typeGraph", "chartData"],
  data() {
    return {
      url: Global.url,
      token: this.$cookies.get("sesion"),
    };
  },
  computed: {
    chartDataOne() {
      return {
        labels: this.chartData.map((label) => label.CLAVE),
        data: this.chartData.map((value) => value.VALOR),
      };
    },
    chartDataTwo() {
      return this.chartData.map((data) => ({
        value: data.VALOR,
        name: data.CLAVE,
      }));
    },
  },
};
</script>