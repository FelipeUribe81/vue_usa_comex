<template>
  <div>
    <Pie
      :chart-options="chartOptions"
      :chart-data="pieData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Pie } from "vue-chartjs/legacy";

const barBackgroundColors = [
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
];

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "PieChart",
  components: {
    Pie,
  },
  props: {
    chartData: {
      type: Object,
      // default: () => {},
    },
    chartId: {
      type: String,
      default: "pie-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      pieData: {
        labels: this.chartData["labels"],
        datasets: [
          {
            backgroundColor: [
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
            data: this.chartData["data"],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              generateLabels() {
                return this.chartData["labels"].map((label, index) => ({
                  text: label,
                  fillStyle: barBackgroundColors[index],
                }));
              },
            },
          },
        },
      },
    };
  },
};
</script>
