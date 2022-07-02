<template>
  <v-container>
    <v-card class="rounded-b-0">
      <v-toolbar flat color="usa-blue" dense>
        <v-toolbar-title class="text-h6 white--text pl-0">
          Graficos
        </v-toolbar-title>
      </v-toolbar>
    </v-card>
    <v-card class="py-8 px-5 rounded-t-0">
      <Graph
        :typeGraph="typeGraph"
        :chartData="chartData"
        v-if="chartData && !chartLoading"
      ></Graph>
      <v-img
        lazy-src="../assets/img/pie-simple.svg"
        v-if="chartAltImage"
        height="290px"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
              v-if="chartLoading"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <!-- <v-container> -->
      <!-- <v-img
                class="mb-2"
                lazy-src="../assets/img/pie-simple.svg"
                v-if="chartAltImage"
                height="400px"
              ></v-img> -->
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
export default {
  name: "StatisticsOptionsComponets",
};
</script>