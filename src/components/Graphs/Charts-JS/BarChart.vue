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
    <Bar :chart-options="chartOptions" :chart-data="barData" ref="bar" />
    <v-btn @click="viewChart">
      MyTouch
    </v-btn>
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
  methods:{
    viewChart(){
      console.log("Holi");
      console.log(this.$refs.bar.legend);
    }
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
      default: 350,
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
  mounted() {},
  data() {
    return {
      barData: {
        labels: this.chartData["labels"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: this.chartData["data"],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              callback: function (val) {
                // Hide the label of every 2nd dataset
                return this.getLabelForValue(val).length > 5
                  ? String(this.getLabelForValue(val)).substring(0, 7) + "..."
                  : this.getLabelForValue(val);
              },
            },
          },
        },
      },
    };
  },
};
</script>
