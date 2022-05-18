import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueCookies from 'vue-cookies';
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
// import Chart from 'vue-frappe-chart'

// import ECharts modules manually to reduce bundle size
import {
    CanvasRenderer
} from 'echarts/renderers'
import {
    BarChart
} from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent
} from 'echarts/components'

use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    TooltipComponent
]);
// register globally (or you can do it locally)
Vue.component('v-chart', ECharts)



Vue.config.productionTip = false
Vue.use(VueCookies);
// Vue.use(Chart);

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')