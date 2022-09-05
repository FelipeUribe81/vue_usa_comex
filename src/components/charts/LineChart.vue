<template>
  <div class="chartCard">
    <div class="chartBox" justify="center">
      <canvas id="myChartBarOrLine"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { bar_or_line_data } from "./chartData.js";
// import { createChartImage } from "./chartUtilities";

var myChart;
export default {
  name: "LineChart",
  props: ["chartData", "currentAxes"],
  mounted() {
    var ctx = document.getElementById("myChartBarOrLine").getContext("2d");
    myChart = new Chart(
      ctx,
      bar_or_line_data(
        this.chartData.labels,
        this.chartData.data,
        "line",
        this.currentAxes["eje_y"]
      )
    );
  },
  watch: {
    chartData: function (newVal) {
      myChart.data.datasets[0].data = newVal.data;
      myChart.data.labels = newVal.labels;
      myChart.update();
    },
    currentAxes: function (newVal) {
      myChart.data.datasets[0].label = newVal["eje_y"];
      myChart.update();
    },
  },
};
</script>
