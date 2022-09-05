<template>
  <div class="chartCard">
    <div class="chartBox" justify="center">
      <canvas id="myChartPieOrDonut"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { doughnut_or_pie_data } from "./chartData.js";
import {
  generateLegend,
  clearLegend,
  // createChartImage,
} from "./chartUtilities";

var myChart;
export default {
  name: "DonutChart",
  props: ["chartData"],
  mounted() {
    var ctx = document.getElementById("myChartPieOrDonut").getContext("2d");
    myChart = new Chart(
      ctx,
      doughnut_or_pie_data(
        this.chartData.labels,
        this.chartData.data,
        "doughnut"
      )
    );
    generateLegend(myChart);
  },
  watch: {
    chartData: function (newVal) {
      myChart.data.datasets[0].data = newVal.data;
      myChart.data.labels = newVal.labels;
      clearLegend();
      generateLegend(myChart);
      myChart.update();
    },
  },
};
</script>
