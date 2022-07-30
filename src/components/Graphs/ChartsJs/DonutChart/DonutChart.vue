<template>
  <div class="chartCard">
    <div class="chartBox">
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { donutData } from "./DonutChart.js";

export default {
  name: "PieChartJS",
  props: ["chartData", "dataChange"],
  mounted() {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, donutData(this.chartData.labels, this.chartData.data));
    myChart;

    function generateLegend() {
      //get the selected location
      const chartBox = document.querySelector(".chartBox");

      //Create div
      const div = document.createElement("DIV");
      div.setAttribute("id", "customLegend");

      // Create UL
      const ul = document.createElement("UL");

      myChart.legend.legendItems.forEach((dataset, index) => {
        const text = dataset.text;
        const datasetIndex = dataset.datasetIndex;
        const bgColor = dataset.fillStyle;
        const bdColor = dataset.strokeStyle;
        index;

        // Create list item in forEach loop
        const li = document.createElement("LI");

        // span colorBox
        const spanBox = document.createElement("SPAN");
        spanBox.style.borderColor = bdColor;
        spanBox.style.backgroundColor = bgColor;

        // p + text
        const p = document.createElement("P");
        const textNode = document.createTextNode(text);

        li.onclick = (click) => {
          // const isHidden = !myChart.isDatasetVisible(datasetIndex);
          myChart.hide(datasetIndex);
          updateLegend(click);
        };

        ul.appendChild(li);
        li.appendChild(spanBox);
        p.appendChild(textNode);
        li.appendChild(p);
      });

      // Insert div into chart box
      chartBox.appendChild(div);
      div.appendChild(ul);
    }

    function updateLegend(click) {
      const element = click.target.parentNode;
      element.classList.toggle("fade");
      myChart.update();
    }

    generateLegend();
  },
};
</script>
