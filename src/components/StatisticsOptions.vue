<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-card class="rounded-b-0">
          <v-toolbar flat color="usa-blue" dense>
            <v-toolbar-title class="text-h6 white--text pl-0">
              Seleccionar ejes
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
              Descargar reportes
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
        <v-card
          :class="{
            'py-8 px-5 rounded-0': chartAlert,
            'py-8 px-5 rounded-t-0': !chartAlert,
          }"
        >
          <v-row justify="center">
            <v-col cols="12" sm="6" md="6" justify="center">
              <v-btn plain @click="createChartImage">
                <v-icon dark class="mr-2"> mdi-download </v-icon>
                Grafico
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6" justify="center">
              <v-btn plain>
                <v-icon dark class="mr-2"> mdi-download </v-icon>
                Tabla
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-alert
          class="rounded-t-0"
          dense
          color="usa-blue"
          type="info"
          v-if="chartAlert"
        >
          ¿Está seguro de descargar el grafico?
          <a
            id="download-chart"
            download="chart.jpeg"
            @click="chartAlert = false"
          >
            <v-btn plain> Si </v-btn>
          </a>
          <v-btn plain @click="chartAlert = false"> No </v-btn>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ComboBox from "../components/ComboBoxComponent.vue";
import html2canvas from "html2canvas";
// const xl = require("excel4node");

export default {
  name: "StatisticsOptionsComponets",
  components: {
    ComboBox,
  },
  data() {
    return {
      chartAlert: false,
    };
  },
  props: ["xAxis", "yAxis", "getCurrentAxes", "typeGraph"],
  methods: {
    updateGraph(typeGraph) {
      this.typeGraph(typeGraph);
    },
    createChartImage() {
      this.chartAlert = true;
      var element = document.getElementById("vue-chart-container");
      html2canvas(element).then(function (canvas) {
        var url_base64 = canvas.toDataURL("image/jpeg");
        var button = document.getElementById("download-chart");
        button.href = url_base64;
        button.style = "text-decoration: none;";
      });
    },
    downloadTable() {
      // const wb = new xl.Workbook();
      // const ws = wb.addWorksheet("Worksheet Name");
      // const data = [
      //   {
      //     name: "Shadab Shaikh",
      //     email: "shadab@gmail.com",
      //     mobile: "1234567890",
      //   },
      // ];
      // const headingColumnNames = ["Name", "Email", "Mobile"];
      // //Write Column Title in Excel file
      // let headingColumnIndex = 1;
      // headingColumnNames.forEach((heading) => {
      //   ws.cell(1, headingColumnIndex++).string(heading);
      // });
      // //Write Data in Excel file
      // let rowIndex = 2;
      // data.forEach((record) => {
      //   let columnIndex = 1;
      //   Object.keys(record).forEach((columnName) => {
      //     ws.cell(rowIndex, columnIndex++).string(record[columnName]);
      //   });
      //   rowIndex++;
      // });
      // wb.write("data.xlsx");
    },
  },
};
</script>