<template>
  <v-container id="boxCard" v-if="options01!=null && options02!=null">
    <v-row class="mb-2">
      <v-col cols="12" sm="12" md="6">
        <v-combobox
          label="Eje x"
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
          label="Eje y"
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
};
</script>

<style scoped>
#boxCard {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.4);
}
</style>