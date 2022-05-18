<template>
  <v-container>
    <!-- GRAPH -->
    <BarChart v-if="typeGraph == 'bar'" :chartData="chartDataOne"> </BarChart>
    <DonutChart v-if="typeGraph == 'donut'" :chartData="chartDataOne">
    </DonutChart>
    <PieChart v-if="typeGraph == 'pie'" :chartData="chartDataOne"></PieChart>
    <LineChart v-if="typeGraph == 'line'" :chartData="chartDataOne"></LineChart>
    <PieEChart v-if="typeGraph == 'epie'" :chartData="chartDataTwo"></PieEChart>
    <DonutEChart
      v-if="typeGraph == 'edonut'"
      :chartData="chartDataTwo"
    ></DonutEChart>
    <LineEChart
      v-if="typeGraph == 'eline'"
      :chartData="chartDataOne"
    ></LineEChart>
    <BarEChart v-if="typeGraph == 'ebar'" :chartData="chartDataOne"></BarEChart>
    <!-- {{ chartData }} -->
  </v-container>
</template>

<script>
import BarChart from "./Graphs/Charts-JS/BarChart.vue";
import BarEChart from "./Graphs/E-Charts/BarEChart.vue";
import DonutChart from "./Graphs/Charts-JS/DonutChart.vue";
import PieChart from "./Graphs/Charts-JS/PieChart.vue";
import LineChart from "./Graphs/Charts-JS/LineChart.vue";
import LineEChart from "./Graphs/E-Charts/LineEChart.vue";
import PieEChart from "./Graphs/E-Charts/PieEChart.vue";
import DonutEChart from "./Graphs/E-Charts/DonutEChart.vue";
import { Global } from "../Global";

export default {
  name: "GraphChart",
  components: {
    BarChart,
    DonutChart,
    PieChart,
    LineChart,
    PieEChart,
    DonutEChart,
    LineEChart,
    BarEChart,
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