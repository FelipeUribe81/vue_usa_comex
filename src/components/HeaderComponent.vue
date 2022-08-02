<template>
  <v-app-bar class="usa-header" v-if="!$route.meta.hideNavbar" app>
    <v-img
      class="mx-2"
      src="../assets/img/usaLogo.png"
      max-height="60"
      max-width="60"
      contain
    ></v-img>

    <v-toolbar-title class="white--text"> UsaComex </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon dark @click="logOut"> <v-icon> mdi-logout</v-icon></v-btn>
  </v-app-bar>
</template>

<script>
import { Global, isLogged, serverError } from "../Global.js";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "HeaderComponent",
  data() {
    return {
      url: Global.url,
    };
  },
  methods: {
    logOut() {
      Swal.fire({
        title: "Seguro que quiere cerrar sesión?",
        showCancelButton: true,
        confirmButtonText: "Cerrar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#00437A",
        cancelButtonColor: "#999",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .post(`${this.url}/users/logout/`, null, {
              headers: {
                Authorization: `Token ${this.$cookies.get("sesion")}`,
              },
            })
            .then((res) => {
              if (res.status == 204) {
                Swal.fire({
                  title: "Su sesión se cerrara en breve",
                  html: 'Usted está saliendo de UsaComex',
                  timerProgressBar: true,
                  timer: 3000,
                  showConfirmButton: false,
                  didOpen: () => {
                    Swal.showLoading();
                  }
                }).then(() => {
                  this.$cookies.remove("sesion");
                  this.$router.push("/");
                });
              }
            })
            .catch((err) => {
              isLogged(err.response.status, this.$router);
              serverError(err.response.status, this.$router);
            });
        }
      });
    },
  },
};
</script>