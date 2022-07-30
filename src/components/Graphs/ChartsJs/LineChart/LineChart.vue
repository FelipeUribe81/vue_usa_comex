<template>
  <v-container>
    <div class="chartCard">
      <div class="chartBox">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  </v-container>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "LineChartJS",
  mounted() {
    console.log("Component mounted");

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "#893E9420",
              "#00457C20",
              "#419BD520",
              "#00B05020",
              "#7DC46420",
              "#FBAC3E20",
              "#FEDE4B20",
              "#EE343020",
              "#EE467720",
              "#66777320",
            ],
            // backgroundColor: [
            //   "rgba(255, 99, 132, 0.2)",
            //   "rgba(54, 162, 235, 0.2)",
            //   "rgba(255, 206, 86, 0.2)",
            //   "rgba(75, 192, 192, 0.2)",
            //   "rgba(153, 102, 255, 0.2)",
            //   "rgba(255, 159, 64, 0.2)",
            // ],
            borderColor: [
              "#893E94",
              "#00457C",
              "#419BD5",
              "#00B050",
              "#7DC464",
              "#FBAC3E",
              "#FEDE4B",
              "#EE3430",
              "#EE4677",
              "#667773",
            ],
            // borderColor: [
            //   "rgba(255, 99, 132, 1)",
            //   "rgba(54, 162, 235, 1)",
            //   "rgba(255, 206, 86, 1)",
            //   "rgba(75, 192, 192, 1)",
            //   "rgba(153, 102, 255, 1)",
            //   "rgba(255, 159, 64, 1)",
            // ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
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
          const isHidden = !myChart.isDatasetVisible(datasetIndex);
          myChart.setDatasetVisibility(datasetIndex, isHidden);
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
