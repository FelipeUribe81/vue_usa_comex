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
// import { generateLegend, clearLegend } from './chartUtilities'

var myChart;
export default {
  name: "LineChart",
  props: ["chartData"],
  mounted() {
    var ctx = document.getElementById("myChartBarOrLine").getContext("2d");
    myChart = new Chart(
      ctx,
      bar_or_line_data(this.chartData.labels, this.chartData.data, "line", "Precio Unitario CIF (COP) Peso Bruto")
    );
    // generateLegend(myChart);
  },
  watch: {
    chartData: function (newVal) {
      console.log("Desde el donut");
      console.log(myChart);
      console.log("Dtasets");
      myChart.data.datasets[0].data = newVal.data
      myChart.data.labels = newVal.labels;
      // clearLegend()
      // generateLegend(myChart);
      myChart.update();
      console.log("Prop changed: ", newVal, " | was: ");
    },
  },
};
</script>
