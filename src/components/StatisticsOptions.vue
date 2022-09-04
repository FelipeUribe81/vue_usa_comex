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
          <ComboBox :options01="xAxis" :options02="yAxis" text="Filtrar por:" :axis="getCurrentAxes">
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
            <v-btn class="mx-2" icon x-large color="green" @click="updateGraph('pie')">
              <v-icon dark> mdi-chart-pie </v-icon>
            </v-btn>
            <v-btn class="mx-2" icon x-large color="orange" @click="updateGraph('bar')">
              <v-icon dark> mdi-chart-bar </v-icon>
            </v-btn>
            <v-btn class="mx-2" icon x-large color="red" @click="updateGraph('donut')">
              <v-icon dark> mdi-chart-donut </v-icon>
            </v-btn>
            <v-btn class="mx-2" icon x-large color="blue" @click="updateGraph('line')">
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
        <v-card :class="{
          'py-8 px-5 rounded-0': chartAlert,
          'py-8 px-5 rounded-t-0': !chartAlert,
        }">
          <v-row justify="center">
            <v-col cols="12" sm="6" md="6" justify="center">
              <v-btn plain small block @click="createChartImage">
                <v-icon dark class="mr-2"> mdi-download </v-icon>
                Grafico
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6" justify="center">
              <v-btn plain small block @click="downloadTable">
                <v-icon dark class="mr-2"> mdi-download </v-icon>
                Tabla
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-alert class="rounded-t-0" dense color="usa-blue" type="info" v-if="chartAlert">
          <p v-if="downloadChartAlert">
            ¿Está seguro de descargar el grafico?
            <a id="download-chart" download="chart.jpeg" @click="chartAlert = false">
              <v-btn plain>Si</v-btn>
            </a>
            <v-btn plain @click="chartAlert = false">No</v-btn>
          </p>
          <p v-if="downloadTableAlert">
            Porfavor elija entre que páginas desea generar el reporte (Elija entre un máximo de 10 paginas)
            <v-row class="mt-4">
              <v-col cols="10">
                <v-range-slider v-model="range" :max="max" :min="min" hide-details class="align-center" thumb-label
                  thumb-color="usa-header" thumb-size="25" :loading="loadingData">
                  <template v-slot:prepend>
                    <v-text-field :value="range[0]" class="mt-0 pt-0" hide-details single-line type="number"
                      style="width: 60px" @change="$set(range, 0, $event)"></v-text-field>
                  </template>
                  <template v-slot:append>
                    <v-text-field :value="range[1]" class="mt-0 pt-0" hide-details single-line type="number"
                      style="width: 60px" @change="$set(range, 1, $event)"></v-text-field>
                  </template>
                </v-range-slider>
              </v-col>
              <v-col cols="2">
                <download-excel class="btn btn-default" :fetch="fetchData" :fields="tableHeaders" worksheet="usa_comex" type="xls"
                  name="UsaComexStatistics.xls">
                  <v-btn icon>
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                </download-excel>
              </v-col>
            </v-row>
          </p>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ComboBox from "../components/ComboBoxComponent.vue";
import html2canvas from "html2canvas";
import axios from "axios";
import { Global, serverError, isLogged } from "../Global.js";
import {tableDataDownload} from "./InitialDataTable";
// import excel4node from "excel4node";
// var xl = require('excel4node');
// xl;
// const xl = require("excel4node");

export default {
  name: "StatisticsOptionsComponets",
  components: {
    ComboBox,
  },
  data() {
    return {
      url: Global.url,
      token: this.$cookies.get("sesion"),
      chartAlert: false,
      downloadChartAlert: false,
      downloadTableAlert: false,
      tableHeaders: tableDataDownload,
      min: 1,
      max: 10,
      range: [1, 2],
      loadingData : false,
    };
  },
  props: ["xAxis", "yAxis", "getCurrentAxes", "typeGraph"],
  mounted(){
    let dates = JSON.parse(localStorage.date);
    this.getPagination({
      fecha_inicio: dates["start"],
      fecha_fin: dates["final"],
    });
  },
  methods: {
    updateGraph(typeGraph) {
      this.typeGraph(typeGraph);
    },
    createChartImage() {
      this.chartAlert = true;
      this.downloadChartAlert = true;
      this.downloadTableAlert = false;
      var element = document.getElementById("vue-chart-container");
      html2canvas(element).then(function (canvas) {
        var url_base64 = canvas.toDataURL("image/jpeg");
        var button = document.getElementById("download-chart");
        button.href = url_base64;
        button.style = "text-decoration: none;";
      });
    },
    downloadTable() {
      this.chartAlert = true;
      this.downloadTableAlert = true;
      this.downloadChartAlert = false;
    },
    async fetchData(){
      this.loadingData = true;
      let dates = JSON.parse(localStorage.date);
      let tableParameters = {      fecha_inicio: dates["start"],
      fecha_fin: dates["final"],
      init_range: this.range[0]*10,
      end_range: this.range[1]*10,}
      const response = await axios.post(`${this.url}/importacion/table/`, tableParameters, {
          headers: {
            Authorization: `Token ${this.token}`,
          }})
          this.loadingData = false;
      console.log(response);
      if (response.status == 200) {
          this.tableData = response.data;
      }
      else {
        isLogged(response.status, this.$router);
        serverError(response.status, this.$router);
      }
      return response.data;
    },
    getPagination(paginationParameters) {
      this.loadingRows = true;
      axios
        .post(`${this.url}/importacion/page/`, paginationParameters, {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((res) => {
          this.loadingRows = false;
          if (res.status == 200) {
            this.tableRows = res.data[0]["FILAS"];
            this.max = Math.ceil(this.tableRows / 10);
          }
        })
        .catch((err) => {
          isLogged(err.response.status, this.$router);
          serverError(err.response.status, this.$router);
        });
    },    
  },
};
</script>