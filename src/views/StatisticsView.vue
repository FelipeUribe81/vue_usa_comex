<template>
  <v-container id="statistics-container" class="px-16" fluid fill-height>
    <div style="width: 100%">
      <v-row justify="center">
        <v-col cols="4">
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
          <v-card class="rounded-b-0">
            <v-toolbar flat color="usa-blue" dense>
              <v-toolbar-title class="text-h6 white--text pl-0">
                Opciones
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                text
                dark
                @click="
                  () => {
                    eChart = true;
                    if (typeGraph[0] != 'e') {
                      typeGraph = `e${typeGraph}`;
                    }
                  }
                "
              >
                OP1
                <v-icon>mdi-chart-scatter-plot</v-icon>
              </v-btn>
              <v-btn
                text
                dark
                @click="
                  () => {
                    eChart = false;
                    if (typeGraph[0] == 'e') {
                      typeGraph = typeGraph.substr(1);
                    }
                  }
                "
              >
                OP2
                <v-icon>mdi-chart-scatter-plot</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>

          <v-card class="py-8 px-5 rounded-t-0">
            <!-- TIPO -->
            <!-- <v-row>
              <v-btn outlined> Change grapht </v-btn>
            </v-row> -->
            <v-row justify="center">
              <v-btn
                class="mx-2"
                icon
                x-large
                color="green"
                @click="typeGraph = eChart ? 'epie' : 'pie'"
              >
                <v-icon dark> mdi-chart-pie </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                icon
                x-large
                color="orange"
                @click="typeGraph = eChart ? 'ebar' : 'bar'"
              >
                <v-icon dark> mdi-chart-bar </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                icon
                x-large
                color="red"
                @click="typeGraph = eChart ? 'edonut' : 'donut'"
              >
                <v-icon dark> mdi-chart-donut </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                icon
                x-large
                color="blue"
                @click="typeGraph = eChart ? 'eline' : 'line'"
              >
                <v-icon dark> mdi-chart-line </v-icon>
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="8">
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
            <!-- <v-img
              lazy-src="../assets/img/pie-simple.svg"
              v-if="chartAltImage"
              height="400px"
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
            </v-img> -->
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
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="rounded-b-0">
            <v-toolbar flat color="usa-blue" dense>
              <v-toolbar-title class="text-h6 white--text pl-0">
                Tabla
              </v-toolbar-title>
            </v-toolbar>
          </v-card>
          <Table></Table>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import ComboBox from "../components/ComboBoxComponent.vue";
import Table from "../components/TableComponent.vue";
// import DatePicker from "../components/DatePickerComponent.vue";
import Graph from "../components/ChartComponent.vue";
import axios from "axios";
import { Global } from "../Global.js";

export default {
  data() {
    return {
      url: Global.url,
      xAxis: [],
      yAxis: [],
      token: this.$cookies.get("sesion"),
      datesAvailable: null,
      // minDate: null,
      // maxDate: null,
      // startDate: null,
      // finalDate: null,
      // alert: false,
      typeGraph: "bar",
      eChart: false,
      dataParameters: null,
      chartData: null,
      chartLoading: false,
      chartAltImage: true,
    };
  },
  components: {
    ComboBox,
    Graph,
    Table,
  },
  mounted() {
    this.getAxes();
    // this.dataParameters = {
    //   fecha_inicio: "2015-01",
    //   fecha_fin: "2015-01",
    //   eje_x: "Acuerdo de tratamiendo arancelario",
    //   eje_y: "Arancel pagado",
    // };
    // this.getGraphData(this.dataParameters);
  },
  methods: {
    initialChartData(axes) {
      let dates = JSON.parse(localStorage.date);
      if (axes["eje_x"] != null && axes["eje_y"] != null) {
        this.dataParameters = {
          fecha_inicio: dates["start"],
          fecha_fin: dates["final"],
          eje_x: axes["eje_x"],
          eje_y: axes["eje_y"],
        };
        this.getGraphData(this.dataParameters);
      }
    },
    getCurrentAxes(axes) {
      this.initialChartData(axes);
    },
    getGraphData(dataParameters) {
      console.log(this.dataParameters);
      this.chartLoading = true;
      this.chartAltImage = true;
      axios
        .post(`${this.url}/importacion/data/`, dataParameters, {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((res) => {
          console.log("Data");
          console.log(res);
          if (res.status == 200) {
            this.chartAltImage = false;
            this.chartLoading = false;
            this.chartData = res.data;
          }
        });
    },
    getAxes() {
      axios
        .get(`${this.url}/importacion/axes/`, {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((res) => {
          console.log("Axes");
          console.log(res);
          if (res.status == 200) {
            this.xAxis = res.data.eje_x;
            this.yAxis = res.data.eje_y;
          }
        })
        .catch((err) => {
          console.log("ERROR");
          console.log(Object.values(err));
          console.log(Object.keys(err));
          console.log(err.response.status);
          console.log(err.response.statusText);
          console.log(err.message);
        });
    },
    // getDateInterval() {},
  },
};
</script>

<style>
#statistics-container {
  /* ESTILOS DEL FONDO */
  background: linear-gradient(to bottom right, #00457d40, #00447d40),
    url("https://www.toptal.com/designers/subtlepatterns/uploads/circles-light.png");
}

/* ESTILOS DE LAS ESTADISTICAS */
/* ESTILOS DEL BANNER DE BIENVENIDA */
#statistics-banner {
  height: 300px;
  background: linear-gradient(rgba(5, 5, 5, 0.2), rgba(5, 5, 5, 0.2)),
    url("../assets/img/background.jpg");
  background-size: cover;
  background-attachment: fixed;
}

/* ESTILOS PARA EL DATE PICKER */
.date-picker-input {
  height: 80px;
}

#date-picker-alert {
  height: 80px;
}
</style>