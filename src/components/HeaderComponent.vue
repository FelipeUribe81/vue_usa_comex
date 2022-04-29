<template>
  <v-app-bar class="usa-blue" v-if="!$route.meta.hideNavbar" app>
    <v-img
      class="mx-2"
      src="../assets/img/usaLogo.png"
      max-height="60"
      max-width="60"
      contain
    ></v-img>

    <v-toolbar-title class="white--text"> UsaComex </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {};
  },
  methods: {
    logOut() {
      /*
            {"fecha_inicio": "2016-1", 
            "fecha_fin": "2016-3", 
            "eje_x": "Código Partida", 
            "eje_y":"Base de IVA"
            }
        */
      // axios.post();
    },
  },
};
</script>