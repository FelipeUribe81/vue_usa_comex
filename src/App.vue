<template>
  <v-app>
    <HeaderComponent></HeaderComponent>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
  },
  mounted() {

  },
};
</script>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
