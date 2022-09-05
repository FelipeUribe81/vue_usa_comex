import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueCookies from 'vue-cookies';
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);
// import Chart from 'chart.js';


Vue.config.productionTip = false
Vue.use(VueCookies);
// Vue.use(Chart);

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')