<template>
  <!-- <v-card id="boxCard" class="rounded-lg"> -->
  <v-container id="boxCard">
    <div></div>
    <!-- <h1 class="pl-8 pt-4">{{ text }}</h1> -->
    <v-row class="mb-2">
      <v-col cols="12" sm="12" md="6">
        <v-combobox
          v-model="eje_x"
          :items="options01"
          :placeholder="options01[0]"
          outlined
          small
          dense
          @change="sendAxes()"
        ></v-combobox>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-combobox
          v-model="eje_y"
          :items="options02"
          :placeholder="options02[0]"
          outlined
          small
          dense
          @change="sendAxes()"
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
  <!-- </v-card> -->
</template>

<script>
export default {
  name: "ComboBox",
  data() {
    return {
      eje_x: null,
      eje_y: null,
    };
  },
  props: ["options01", "options02", "text", "axis"],
  methods: {
    sendAxes() {
      this.axis({ eje_x: this.eje_x, eje_y: this.eje_y });
    },
  },
  mounted() {
    // this.sendAxes();
  },
};
</script>

<style scoped>
#boxCard {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.4);
}
</style>