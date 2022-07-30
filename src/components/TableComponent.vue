<template>
  <v-card class="py-8 px-5 rounded">
    <!-- <v-data-table
      :headers="headers"
      :items="desserts"
      hide-default-header
      hide-default-footer
    ></v-data-table> -->
    <v-data-table
      :headers="tableHeader"
      :items="tableData"
      fixed-header
      :loading="loadingData"
      dense
    ></v-data-table>
    <!-- <div>
    <v-data-table
    v-if="tableHeaders && tableData"
      :headers="tableHeader"
      :items="desserts"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
      <v-text-field
        :value="itemsPerPage"
        label="Items per page"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>
    </div>
  </div> -->
    <!-- {{tableHeader}} -->
  </v-card>
</template>

<script>
import { Global } from "../Global.js";
import axios from "axios";
import InitialDataTable from "./InitialDataTable";

export default {
  name: "TableComponent",
  data() {
    return {
      url: Global.url,
      token: this.$cookies.get("sesion"),
      tableData: InitialDataTable.tableData,
      loadingData: true,
    };
  },
  mounted() {
    console.log("Dta");
    let dates = JSON.parse(localStorage.date);
    // this.getTableHeaders({
    //   fecha_inicio: dates["start"],
    //   fecha_fin: dates["final"],
    //   init_range: 1,
    //   end_range: 1,
    // });
    this.getTableData({
      fecha_inicio: dates["start"],
      fecha_fin: dates["final"],
      init_range: 1,
      end_range: 50,
    });
  },
  computed: {
    tableHeader() {
      let tableHeader = Object.keys(this.tableData[0]).slice(1);
      return tableHeader.map((current) => {
        return { text: current, value: current };
      });
    },
  },
  methods: {
    getTableData(tableParameters) {
      this.loadingData = true;
      axios
        .post(`${this.url}/importacion/table/`, tableParameters, {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((res) => {
          this.loadingData = false;
          if (res.status == 200) {
            this.tableData = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
