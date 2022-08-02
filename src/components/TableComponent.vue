<template>
  <v-card class="py-8 px-5 rounded">
    <v-data-table
      :headers="tableHeader"
      :items="tableData"
      :loading="loadingData"
      loading-text="Cargando datos... Por favor espere"
      :items-per-page="itemsPerPage"
      hide-default-footer
    ></v-data-table>
    <v-row justify="center" class="text-center pt-2 mt-5">
      <v-pagination
        v-model="page"
        :length="pageCount"
        total-visible="6"
        v-if="!loadingRows"
      ></v-pagination>
      <v-progress-circular
        :size="50"
        indeterminate
        v-if="loadingRows"
        color="usa-blue"
      ></v-progress-circular>
    </v-row>
  </v-card>
</template>

<script>
import { Global, serverError, isLogged } from "../Global.js";
import axios from "axios";
import InitialDataTable from "./InitialDataTable";

export default {
  name: "TableComponent",
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      url: Global.url,
      token: this.$cookies.get("sesion"),
      tableData: InitialDataTable.tableData,
      tableRows: 0,
      loadingData: false,
      loadingRows: false,
    };
  },
  mounted() {
    console.log("Dta");
    let dates = JSON.parse(localStorage.date);
    this.getTableData({
      fecha_inicio: dates["start"],
      fecha_fin: dates["final"],
      init_range: 1,
      end_range: 10,
    });
    this.getPagination({
      fecha_inicio: dates["start"],
      fecha_fin: dates["final"],
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
  watch: {
    page: function (newVal) {
      console.log(newVal);
      this.tableDataP(newVal);
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
            console.log(this.tableData);
          }
        })
        .catch((err) => {
          isLogged(err.response.status, this.$router);
          serverError(err.response.status, this.$router);
        });
    },
    getPagination(paginationParameters) {
      this.loadingRows = true;
      axios
        .post(`${this.url}/importacion/page/`, paginationParameters, {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((res) => {
          this.loadingRows = false;
          if (res.status == 200) {
            this.tableRows = res.data[0]["FILAS"];
            this.pageCount = Math.ceil(this.tableRows / this.itemsPerPage);
          }
        })
        .catch((err) => {
          isLogged(err.response.status, this.$router);
          serverError(err.response.status, this.$router);
        });
    },
    tableDataP(newPage) {
      let dates = JSON.parse(localStorage.date);
      let end_range = newPage * this.itemsPerPage;
      let init_range = end_range - 9;
      this.tableData = InitialDataTable.tableData;
      console.log();
      this.getTableData({
        fecha_inicio: dates["start"],
        fecha_fin: dates["final"],
        init_range: init_range,
        end_range: end_range,
      });
    },
  },
};
</script>
