import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
        },
        {
            path: '/login',
            component: require('../pages/login.vue'),
            meta: { requiresGuest: true }
        },
        {
            path: '/dashboard',
            component: require('../pages/dashboard.vue'),
            meta: { requiresAuth: true }
        },
    ]
})
