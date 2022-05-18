<template>
  <v-container id="boxCard">
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          :label="label"
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          v-on="on"
          outlined
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        type="month"
        no-title
        scrollable
        :min="minDate"
        :max="maxDate"
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="sendDate(date)"> OK </v-btn>
      </v-date-picker>
    </v-menu>
  </v-container>
</template>

<script>
export default {
  name: "ComboBox",
  data() {
    return {
      date: null,
      menu: false,
      modal: false,
    };
  },
  mounted() {
    this.setInitial();
  },
  props: ["label", "getDate", "minDate", "maxDate"],
  methods: {
    sendDate(date) {
      this.$refs.menu.save(date);
      this.getDate(date);
    },
    setInitial() {
      this.date = this.minDate;
      this.sendDate(this.date);
    },
  },
};
</script>

<style>
#boxCard {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
}
</style>