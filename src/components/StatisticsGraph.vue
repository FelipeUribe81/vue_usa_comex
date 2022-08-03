<template>
  <v-container>
    <v-card class="rounded-b-0">
      <v-toolbar flat color="usa-blue" dense>
        <v-toolbar-title class="text-h6 white--text pl-0">
          Gráficos
        </v-toolbar-title>
      </v-toolbar>
    </v-card>
    <v-card class="py-8 px-5 rounded-t-0">
      <!-- v-if="chartData && !chartLoading" -->
      <Graph
        :typeGraph="typeGraph"
        :chartData="chartData"
        v-if="chartData"
      ></Graph>
      <!-- <v-container> -->
      <v-img
        class="mb-2"
        lazy-src="../assets/img/ExampleChart.jpg"
        v-if="chartData==null"
  
      ></v-img>
      <v-progress-linear
        indeterminate
        color="usa-blue"
        v-if="chartLoading"
        class="mt-10"
      ></v-progress-linear>
      <!-- </v-container> -->
    </v-card>
  </v-container>
</template>

<script>
import Graph from "../components/ChartComponent.vue";

export default {
  name: "StatisticsOptionsComponets",
  components: {
    Graph,
  },
  props: ["typeGraph", "chartData", "chartLoading", "chartAltImage"],
  watch: {
    chartData: function (newVal, oldVal) {
      // this.$forceUpdate();
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
    },
  },
};
</script>