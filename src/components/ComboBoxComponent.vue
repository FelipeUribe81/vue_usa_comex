<template>
  <v-card id="boxCard" class="rounded-lg">
    <h1 class="pl-8 pt-4">{{text}}</h1>
    <v-row class="mb-2">
      <v-col cols="12" sm="12" md="6">
        <v-combobox class="px-8" :items="options01" auto-select-first outlined dense></v-combobox>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-combobox class="px-8" :items="options02" auto-select-first outlined dense></v-combobox>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ComboBox",
  data() {
    return {};
  },
  props: ["options01", "options02", "text"],
};
</script>

<style>
#boxCard {width: 80%;
background-color: rgba(255, 255, 255, 0.4); 
}
</style>