<template>
  <v-container>
    <!-- GRAPH -->
    <BarChart v-if="typeGraph == 'bar'" :chartData="chartDataOne"> </BarChart>
    <DonutChart v-if="typeGraph == 'donut'" :chartData="chartDataOne">
    </DonutChart>
    <PieChart v-if="typeGraph == 'pie'" :chartData="chartDataOne"></PieChart>
    <LineChart v-if="typeGraph == 'line'" :chartData="chartDataOne"></LineChart>
    <!-- {{ chartData }} -->
  </v-container>
</template>

<script>
import BarChart from "./Graphs/Charts-JS/BarChart.vue";
import DonutChart from "./Graphs/Charts-JS/DonutChart.vue";
import PieChart from "./Graphs/Charts-JS/PieChart.vue";
import LineChart from "./Graphs/Charts-JS/LineChart.vue";
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