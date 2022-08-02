<template>
  <v-container>
    <!-- GRAPH -->
    <BarChart v-if="typeGraph == 'bar'" :chartData="chartDataOne"></BarChart>
    <DonutChart
      v-if="typeGraph == 'donut'"
      :chartData="chartDataOne"
    ></DonutChart>
    <PieChart v-if="typeGraph == 'pie'" :chartData="chartDataOne"></PieChart>
    <!-- <PieChart v-if="typeGraph == 'pie'" :chartData="chartDataOne"></PieChart> -->
    <LineChart v-if="typeGraph == 'line'" :chartData="chartDataOne"></LineChart>
    <!-- {{ chartData }} -->
  </v-container>
</template>
 
<script>
import BarChart from "./charts/BarChart.vue";
// import BarChart from "./Graphs/VueCharts/BarChart.vue";
import DonutChart from "./charts/DonutChart.vue";
// import DonutChart from "./Graphs/VueCharts/DonutChart.vue";
import PieChart from "./charts/PieChart.vue";
// import PieChart from "./Graphs/Charts-JS/PieChart.vue";
import LineChart from "./charts/LineChart.vue";
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

<style>
#myChartPieOrDonut {
  max-height: 300px;
}

#myChartBarOrLine {
  max-height: 450px;
}

#customLegend {
  margin-top: 50px;
  display: flex;
  text-align: center;
}

#customLegend ul li {
  display: inline-flex;
  cursor: pointer;
  margin: 0 auto;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
  line-height: 22px;
}

#customLegend ul li span {
  display: inline-flex;
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border-style: solid;
  border-width: 1px;
}

#customLegend ul li a {
  display: -webkit-inline-box;
  width: 180px;
  color: rgb(102, 102, 102, 1);
  overflow: hidden;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
  line-clamp: 1;
  text-align: left;
}

#customLegend ul li.fade a {
  margin: 0;
  padding: 0;
  color: rgb(102, 102, 102, 0.5);
}
</style>