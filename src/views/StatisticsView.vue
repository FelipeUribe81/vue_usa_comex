<template>
  <v-container id="statistics-container" class="px-16" fluid fill-height>
    <div style="width: 100%">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8">
          <v-card>
            <v-img id="statistics-banner"> </v-img>
            <v-card-title> Bienvenido a UsaComex </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" v-if="startDate && finalDate">
          <v-card class="px-4 pt-4">
            <p class="ml-3">
              Rango de tiempo: Puede seleccionar un rango de tiempo de máximo un
              año para su consulta.
            </p>
            <v-row>
              <v-col cols="12" md="6" class="date-picker-input mb-2">
                <!-- <DatePicker
                  text="Selecciona fecha inicio"
                  @getDate="getstartDate" v-model="startDate"
                  :initialDate="`${startDate.year}-${startDate.month}`"
                ></DatePicker> -->
                <DatePicker
                  text="Selecciona fecha inicio"
                  :getDate="getStartDate"
                  :initialDate="startDate"
                ></DatePicker>
              </v-col>
              <v-col cols="12" md="6" class="date-picker-input mb-2">
                <!-- <DatePicker
                  text="Selecciona fecha final"
                  @getDate="getFinalDate" v-model="finalDate"
                  :initialDate="`${finalDate.year}-${finalDate.month}`"
                ></DatePicker> -->
                <DatePicker
                  text="Selecciona fecha final"
                  :getDate="getFinalDate"
                  :initialDate="finalDate"
                ></DatePicker>
              </v-col>
              <v-col v-if="alert" cols="12" class="mb-2" id="date-picker-alert">
                <v-alert
                  :type="
                    validateDate(startDate) && validateDate(finalDate)
                      ? 'success'
                      : 'error'
                  "
                  >La fecha fue escogida con exito</v-alert
                >
              </v-col>
              <v-col cols="12" align="right">
                <v-btn
                  class="mb-2 mr-3"
                  color="usa-blue"
                  @click="alert = true"
                  
                  elevation="0"
                  dark
                  >Consultar</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col v-else cols="12" sm="10" md="8" align="center">
          <v-card class="px-4 pa-4">
            <v-progress-linear
              indeterminate
              color="usa-blue"
            ></v-progress-linear>
          </v-card>
        </v-col>
        <!-- <v-col cols="6">
          <v-card class="px-4 pt-4">
            <p>
              Rango de tiempo: Puede seleccionar un rango de tiempo de máximo un
              año para su consulta.
            </p>
            <v-row>
              <v-col cols="12" md="6">
                <DatePicker text="Selecciona fecha inicio"></DatePicker>
              </v-col>
              <v-col cols="12" md="6">
                <DatePicker text="Selecciona fecha inicio"></DatePicker>
              </v-col>
            </v-row>
          </v-card>
        </v-col> -->
      </v-row>
      <v-row>
        <!-- <ComboBox :options01="xAxis" :options02="yAxis" text="Filtrar por:">
        </ComboBox> -->
      </v-row>
    </div>
    <!-- <v-row>
      <v-col cols="12" md="12" lg="7"
        ><v-card class="pa-8">Graph</v-card></v-col
      >
      <v-col cols="12" md="12" lg="5"
        ><v-card class="pa-8">Table</v-card></v-col
      >
    </v-row> -->
  </v-container>
</template>

<script>
// import ComboBox from "../components/ComboBoxComponent.vue";
import DatePicker from "../components/DatePickerComponent.vue";
import axios from "axios";
import { Global } from "../Global";

var datesAvailable = null;

export default {
  data() {
    return {
      url: Global.url,
      xAxis: [],
      yAxis: [],
      token: this.$cookies.get("sesion"),

      startDate: null,
      finalDate: null,
      alert: false,
    };
  },
  components: {
    // ComboBox,
    DatePicker,
  },
  mounted() {
    this.getAxes();
    this.getDatesAvailable();
  },
  methods: {
    getStartDate(date) {
      this.startDate = date;
      // this.startDate.year = date.split("-")[0];
      // this.startDate.month = date.split("-")[1];
      console.log("Inicio");
      console.log(this.startDate);
    },
    getFinalDate(date) {
      this.finalDate = date;
      // this.finalDate.year = date.split("-")[0];
      // this.finalDate.month = date.split("-")[1];
      console.log("Final");
      console.log(this.finalDate);
    },
    validateDate(date) {
      console.log("Validation");
      let dateValid = false;
      datesAvailable.forEach((item) => {
        console.log(item);
        console.log(date);
        if (item.year == date.split("-")[0]) {
          if (parseInt(item.month) == parseInt(date.split("-")[1])) {
            console.log("Pase");
            dateValid |= true;
          }
        } else {
          dateValid |= false;
        }
      });
      // console.log(dateValid);
      return dateValid;
    },
    // Se necesita tener una sola vez
    getAxes() {
      axios
        .get(`${this.url}/importacion/axes/`, {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.xAxis = res.data.eje_x;
            this.yAxis = res.data.eje_y;
          }
        });
    },
    getDatesAvailable() {
      axios
        .get(`${this.url}/importacion/years/`, {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            datesAvailable = res.data;
            // console.log("datesAvailable");
            // console.log(this.datesAvailable);
            // this.startDate = res.data[0];
            this.startDate = `${res.data[0].year}-${res.data[0].month}`;
            // console.log("Set: "+ this.startDate.year);
            // this.finalDate = res.data[0];
            this.finalDate = `${res.data[0].year}-${res.data[0].month}`;
            // console.log("Set: "+ this.finalDate.year);
          }
        });
    },
  },
};
</script>

<style>
#statistics-container {
  /* background: linear-gradient(rgba(5, 7, 12, 0.54), rgba(5, 7, 12, 0.54)),
    url(../assets/img/background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed; */

  /* align-items: initial; */

  /* ESTILOS DEL FONDO */
  background: linear-gradient(to bottom right, #00457d40  , #00447d40),
    url("https://www.toptal.com/designers/subtlepatterns/uploads/circles-light.png");
  /* background: linear-gradient(to bottom right, #fdf21d71, #00447d71),
    url("https://www.toptal.com/designers/subtlepatterns/uploads/circles-light.png"); */
  /* display: block !important; */
}

/* ESTILOS DE LAS ESTADISTICAS */
/* ESTILOS DEL BANNER DE BIENVENIDA */
#statistics-banner {
  height: 300px;
  background: linear-gradient(rgba(5, 5, 5, 0.2), rgba(5, 5, 5, 0.2)),
    url("../assets/img/background.jpg");
  background-size: cover;
  background-attachment: fixed;
  /* background-position: 0px -200px; */
  /* filter: blur(2px); */
}

/* ESTILOS PARA EL DATE PICKER */
.date-picker-input {
  height: 80px;
}

#date-picker-alert {
  height: 80px;
}

/* .v-text-field--filled>.v-input__control>.v-input__slot, .v-text-field--full-width>.v-input__control>.v-input__slot, .v-text-field--outlined>.v-input__control>.v-input__slot {
    height: 40px;
} */
/* .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #0252ca !important;
} */
</style>