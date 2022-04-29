import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueCookies from 'vue-cookies';

Vue.config.productionTip = false
Vue.use(VueCookies);

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')