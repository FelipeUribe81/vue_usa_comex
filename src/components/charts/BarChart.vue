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
  name: "BarChartJS",
  mounted() {
    console.log("Component mounted");

    // const ctx = document.getElementById("myChart").getContext("2d");
    // const myChart = new Chart(ctx);

    // setup
    const data = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Weekly Sales",
          data: [18, 12, 6, 9, 12, 3, 9],
          backgroundColor: [
            "#EE343060",
            "#893E9460",
            "#419BD560",
            "#00457C60",
            "#7DC46460",
            "#00B05060",
            "#FEDE4B60",
            "#FBAC3E60",
            "#EE467760",
            "#66777360",
          ],
          borderColor: [
            "#EE343080",
            "#893E9480",
            "#419BD580",
            "#00457C80",
            "#7DC46480",
            "#00B05080",
            "#FEDE4B80",
            "#FBAC3E80",
            "#EE467780",
            "#66777380",
          ],
          borderWidth: 1,
        },
      ],
    };

    // config
    const config = {
      type: "bar",
      data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const myChart = new Chart(document.getElementById("myChart"), config);

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

