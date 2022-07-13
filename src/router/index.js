import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import StatisticsView from '../views/StatisticsView.vue'
import DatePickerView from '../views/DatePickerView.vue'
// import BarChartNew from '../components/Graphs/Charts-JS/BarChartNew.vue';
// import StatisticsViewC from '../views/StatisticsView copy.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: LoginView,
        meta: {
            hideNavbar: true,
        }
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {
            hideNavbar: true,
        }
    },
    {
        path: '/choose-date',
        name: 'choose-date',
        component: DatePickerView,
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: StatisticsView
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router