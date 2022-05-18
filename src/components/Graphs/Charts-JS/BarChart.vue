<template>
  <v-container>
    <!-- <Bar
      :chart-options="chartOptions"
      :chart-data="barData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    /> -->
    <Bar :chart-options="chartOptions" :chart-data="barData" />
    <!-- Hola
    {{ chartData }} -->
  </v-container>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
// import VueCharts from 'vue-chartjs'

import {
  Chart as ChartJS,
  // Title,
  Tooltip,
  // Legend,
  BarElement,
  // CategoryScale,
  // LinearScale,
} from "chart.js";

ChartJS.register(
  // Title,
  Tooltip,
  // Legend,
  BarElement
  // CategoryScale,
  // LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartData: {
      type: Object,
      // default: () => {},
    },
    chartId: {
      type: String,
      default: "bar-chart",
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
  // mixins: [VueCharts.mixins.reactiveProp],
  mounted() {
    // this.renderChart(this.chartData, this.options);
  },
  data() {
    return {
      barData: {
        // labels: [
        //   "January",
        //   "February",
        //   "March",
        //   "April",
        //   "May",
        //   "June",
        //   "July",
        //   "August",
        //   "September",
        //   "October",
        //   "November",
        //   "December",
        // ],
        labels: this.chartData["labels"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            // data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
            data: this.chartData["data"],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
