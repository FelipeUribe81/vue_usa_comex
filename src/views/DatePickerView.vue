<template>
  <v-container id="statistics-container" class="px-16" fluid fill-height>
    <div style="width: 100%">
      <v-row justify="center">
        <v-col cols="12" sm="12" md="12">
          <v-card>
            <v-img id="statistics-banner" src="../assets/img/background.jpg">
            </v-img>
            <v-card-title> Bienvenido a UsaComex </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="12" v-if="minDate && maxDate">
          <v-card class="px-4 pt-4">
            <p class="ml-3">
              Rango de tiempo: Puede realizar consulta de máximo dos años
            </p>
            <v-row>
              <v-col cols="12" md="6" class="date-picker-input mb-2">
                <DatePicker
                  label="Selecciona fecha inicio"
                  :getDate="getStartDate"
                  :minDate="minDate"
                  :maxDate="maxDate"
                ></DatePicker>
              </v-col>
              <v-col cols="12" md="6" class="date-picker-input mb-2">
                <DatePicker
                  label="Selecciona fecha final"
                  :getDate="getFinalDate"
                  :minDate="minDate"
                  :maxDate="maxDate"
                ></DatePicker>
              </v-col>
              <v-col cols="12" class="px-6">
                <v-alert dense outlined text type="error" v-if="!vaildDate || validRange"
                  >{{!vaildDate ? "La fecha inicial no puede ser mayor a la final" : validRange ? 
                  "El limite de búsqueda es de máximo dos años":""}}</v-alert
                >
              </v-col>
              <v-col cols="12" align="right" v-if="vaildDate && !validRange">
                <v-btn
                  class="mb-2 mr-3"
                  color="usa-blue"
                  @click="saveDate()"
                  elevation="0"
                  dark
                  >Consultar</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col v-else cols="12" sm="12" md="12" align="center">
          <v-card class="px-4 pa-4">
            <v-progress-linear
              indeterminate
              color="usa-blue"
            ></v-progress-linear>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import DatePicker from "../components/DatePickerComponent.vue";
import moment from "moment";
import axios from "axios";
import { Global, isLogged, serverError } from "../Global.js";

export default {
  data() {
    return {
      url: Global.url,
      token: this.$cookies.get("sesion"),
      minDate: null,
      maxDate: null,
      startDate: null,
      finalDate: null,
    };
  },
  computed: {
    vaildDate() {
      return new Date(this.startDate) <= new Date(this.finalDate)
    },
    validRange() {
      return this.monthDiff(new Date(this.finalDate), new Date(this.startDate)) > 24;
    },
  },
  components: {
    DatePicker,
  },
  mounted() {
    this.getDatesAvailable();
  },
  methods: {
    monthDiff(dateFrom, dateTo) {
      return Math.abs(
        dateTo.getMonth() -
        dateFrom.getMonth() +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear())
      );
    },
    getStartDate(date) {
      this.startDate = date;
    },
    getFinalDate(date) {
      this.finalDate = date;
    },
    saveDate() {
      localStorage.date = JSON.stringify({
        start: this.startDate,
        final: this.finalDate,
      });
      this.$router.push({ name: "statistics" });
    },
    getDatesAvailable() {
      axios
        .get(`${this.url}/importacion/years/`, {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            let datesAvailable = res.data.map((date) =>
              moment(
                `${date.year}-${date.month}-01 08:00`,
                "YYYY-MM-DD HH:mm"
              ).toDate()
            );
            this.maxDate = new Date(Math.max.apply(null, datesAvailable))
              .toISOString()
              .substr(0, 7);
            this.minDate = new Date(Math.min.apply(null, datesAvailable))
              .toISOString()
              .substr(0, 7);
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

<style>
/* #statistics-container {
   background: linear-gradient(rgba(5, 7, 12, 0.2), rgba(5, 7, 12, 0.54)),
    url(https://img.freepik.com/foto-gratis/terminal-contenedores_1205-1193.jpg?w=2000);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed; } */

/* align-items: initial; */

/* ESTILOS DEL FONDO */
/* background: linear-gradient(to bottom right, #00457d40, #00447d40),
    url("https://www.toptal.com/designers/subtlepatterns/uploads/circles-light.png"); */
/* background: linear-gradient(to bottom right, #fdf21d71, #00447d71),
    url("https://www.toptal.com/designers/subtlepatterns/uploads/circles-light.png"); } */
/* display: block !important;
}

/* ESTILOS DE LAS ESTADISTICAS */
/* ESTILOS DEL BANNER DE BIENVENIDA */
#statistics-banner {
  height: 500px;
  /* background: linear-gradient(rgba(5, 5, 5, 0.2), rgba(5, 5, 5, 0.2)),
    url("../assets/img/background.jpg"); */
  background-size: 100%;
  background-attachment: inherit;
  background-repeat: no-repeat;
  background-position: 0px -350px;
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