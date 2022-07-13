<template>
  <v-container id="statistics-container" class="px-16" fluid fill-height>
    <div style="width: 100%">
      <v-row justify="center" align="center">
        <v-col
          cols="12"
          sm="12"
          md="4"
          v-if="
            $vuetify.breakpoint.name == 'xs' || $vuetify.breakpoint.name == 'sm'
          "
        >
          <!-- Statistics Options -->
          <StatisticsOptions :xAxis=xAxis :yAxis=yAxis :getCurrentAxes=getCurrentAxes :typeGraph=getCurrentGraph></StatisticsOptions>
        </v-col>
        <v-col cols="12" sm="12" md="8">
          <!-- Statistics Graph -->
          <StatisticsGraph :typeGraph=typeGraph :chartData=chartData :chartLoading=chartLoading :chartAltImage=chartAltImage></StatisticsGraph>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          v-if="
            $vuetify.breakpoint.name != 'xs' && $vuetify.breakpoint.name != 'sm'
          "
        >
          <!-- Statistics Options -->
          <StatisticsOptions :xAxis=xAxis :yAxis=yAxis :getCurrentAxes=getCurrentAxes :typeGraph=getCurrentGraph></StatisticsOptions>
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
import Table from "../components/TableComponent.vue";
// import DatePicker from "../components/DatePickerComponent.vue";
import StatisticsOptions from "../components/StatisticsOptions.vue";
import StatisticsGraph from "../components/StatisticsGraph.vue";
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
    Table,
    StatisticsOptions,
    StatisticsGraph,
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
    getCurrentGraph(typeGraph){
      this.typeGraph = typeGraph;
      console.log(typeGraph);
    },
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
  /* background: linear-gradient(to bottom right, #00457d40, #00447d40),
    url("https://www.toptal.com/designers/subtlepatterns/uploads/circles-light.png");
} */
  /* background: linear-gradient(to bottom right, #4d7d0040, #8d870d40),
    url("https://www.toptal.com/designers/subtlepatterns/uploads/circles-light.png");
} */
  background-color: aqua;
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