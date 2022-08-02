<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="12">
        <v-card class="rounded-b-0">
          <v-toolbar flat color="usa-blue" dense>
            <v-toolbar-title class="text-h6 white--text pl-0">
              Filtrar
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text dark icon to="/choose-date">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
        <v-card class="py-8 px-5 mb-4 rounded-t-0">
          <!-- <h1 class="pl-3">Filtrar</h1> -->
          <ComboBox
            :options01="xAxis"
            :options02="yAxis"
            text="Filtrar por:"
            :axis="getCurrentAxes"
          >
          </ComboBox>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="12">
        <v-card class="rounded-b-0">
          <v-toolbar flat color="usa-blue" dense>
            <v-toolbar-title class="text-h6 white--text pl-0">
              Opciones
            </v-toolbar-title>
          </v-toolbar>
        </v-card>

        <v-card class="py-8 px-5 rounded-t-0">
          <!-- TIPO -->
          <v-row justify="center">
            <v-btn
              class="mx-2"
              icon
              x-large
              color="green"
              @click="updateGraph('pie')"
            >
              <v-icon dark> mdi-chart-pie </v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              icon
              x-large
              color="orange"
              @click="updateGraph('bar')"
            >
              <v-icon dark> mdi-chart-bar </v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              icon
              x-large
              color="red"
              @click="updateGraph('donut')"
            >
              <v-icon dark> mdi-chart-donut </v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              icon
              x-large
              color="blue"
              @click="updateGraph('line')"
            >
              <v-icon dark> mdi-chart-line </v-icon>
            </v-btn>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="12">
        <v-card class="rounded-b-0">
          <v-toolbar flat color="usa-blue" dense>
            <v-toolbar-title class="text-h6 white--text pl-0">
              Reporte Grafico
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
        <v-card class="py-8 px-5 mb-4 rounded-t-0">
          <v-row justify="center">
          <v-btn
            plain
            
          >
            <v-icon dark class="mr-2"> mdi-download </v-icon>
            Descargar
          </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ComboBox from "../components/ComboBoxComponent.vue";

export default {
  name: "StatisticsOptionsComponets",
  components: {
    ComboBox,
  },
  props: ["xAxis", "yAxis", "getCurrentAxes", "typeGraph"],
  methods: {
    updateGraph(typeGraph) {
      this.typeGraph(typeGraph);
    },
  },
};
</script>