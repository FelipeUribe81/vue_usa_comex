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
      <Graph
        :typeGraph="typeGraph"
        :chartData="chartData"
        v-if="chartData"
      ></Graph>
      <v-img
        id="firstLoadImg"
        v-if="chartFirstLoad"
        class="mb-2"
        src="../assets/img/ExampleChart.jpg"
      ></v-img>
      <v-progress-linear
        indeterminate
        color="usa-blue"
        v-if="chartLoading"
        class="mt-10"
      ></v-progress-linear>
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
  props: ["typeGraph", "chartData", "chartLoading", "chartFirstLoad"],
  watch: {
    chartData: function (newVal, oldVal) {
      // this.$forceUpdate();
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
    },
  },
};
</script>