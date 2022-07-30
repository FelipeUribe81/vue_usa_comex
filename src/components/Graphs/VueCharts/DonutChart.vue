<template>
<div>
  {{plugins.legend}}
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="donutData"
  />
</div>
</template>

<script>
import { Doughnut } from "vue-chartjs/legacy";

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
  name: "DoughnutChart",
  components: {
    Doughnut,
  },
  props: {
    chartData: {
      type: Object,
      // default: () => {},
    },
    chartId: {
      type: String,
      default: "doughnut-chart",
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
      donutData: {
        labels: this.chartData["labels"],
        datasets: [
          {
            // backgroundColor: [
            //   "#41B883",
            //   "#E46651",
            //   "#00D8FF",
            //   "#DD1B16",
            //   "#41B883",
            //   "#E46651",
            //   "#00D8FF",
            //   "#DD1B16",
            //   "#41B883",
            //   "#E46651",
            // ],
            backgroundColor : [
              "#893E94",
              "#00457C",
              "#419BD5",
              "#00B050",
              "#7DC464",
              "#FBAC3E",
              "#FEDE4B",
              "#EE3430",
              "#EE4677",
              "#667773"
            ],
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
