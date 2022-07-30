<template>
  <div class="container">
    <h2>Chart.js — Pie Chart Demo Percent</h2>
    <div>
      <div id="chart"><canvas id="myChart"></canvas></div>
      <div id="legend"></div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "PieChartJS",
  mounted() {
    var ctx = document.getElementById("myChart").getContext("2d");

    var chartData = [60, 90, 120, 150];
    var chartLabels = ["apples", "bananas", "oranges", "pears"];
  chart;
    var chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: chartLabels,
        datasets: [
          {
            backgroundColor: ["#f43004", "#decf3f", "#FFA500", "#9b59b6"],
            data: chartData,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          legendCallback: function (chart) {
            var text = [];
            text.push('<ul class="0-legend">');
            var ds = chart.data.datasets[0];
            console.log("Holi");
            console.log(ds);
            var sum = ds.data.reduce(function add(a, b) {
              return a + b;
            }, 0);
            for (var i = 0; i < ds.data.length; i++) {
              text.push("<li>s");
              var perc = Math.round((100 * ds.data[i]) / sum, 0);
              text.push(
                '<span style="background-color:' +
                  ds.backgroundColor[i] +
                  '">' +
                  "</span>" +
                  chart.data.labels[i] +
                  " (" +
                  ds.data[i] +
                  ") (" +
                  perc +
                  "%)"
              );
              text.push("</li>");
            }
            text.push("</ul>");
            return text.join("");
          },
        },
      },
    });

    var myLegendContainer = document.getElementById("legend");
    // generate HTML legend
    // myLegendContainer.innerHTML = chart.generateLegend();
    // bind onClick event to all LI-tags of the legend
    var legendItems = myLegendContainer.getElementsByTagName("li");
    console.log(legendItems);
    for (var i = 0; i < legendItems.length; i += 1) {
      console.log(legendItems[i]);
      legendItems[i].addEventListener("click", legendClickCallback, false);
    }

    function legendClickCallback(event) {
      event = event || window.event;

      var target = event.target || event.srcElement;
      while (target.nodeName !== "LI") {
        target = target.parentElement;
      }
      var parent = target.parentElement;
      var chartId = parseInt(parent.classList[0].split("-")[0], 10);
      var chart = Chart.instances[chartId];
      var index = Array.prototype.slice.call(parent.children).indexOf(target);
      var meta = chart.getDatasetMeta(0);
      console.log(index);
      var item = meta.data[index];

      if (item.hidden === null || item.hidden === false) {
        item.hidden = true;
        target.classList.add("hidden");
      } else {
        target.classList.remove("hidden");
        item.hidden = null;
      }
      chart.update();
    }
  },
};
</script>
<style scoped>
body {
  font-family: "Arial";
}

.container {
  margin: 15px auto;
}

#chart {
  float: left;
  width: 70%;
}

#legend {
  float: right;
}

[class$="-legend"] {
  list-style: none;
  cursor: pointer;
  padding-left: 0;
}

[class$="-legend"] li {
  display: block;
  padding: 0 5px;
}

[class$="-legend"] li.hidden {
  text-decoration: line-through;
}

[class$="-legend"] li span {
  border-radius: 5px;
  display: inline-block;
  height: 10px;
  margin-right: 10px;
  width: 10px;
}
</style>