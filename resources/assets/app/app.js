import Vue from 'vue'
import router from './router/';
import App from './components/App.vue';
import axios from 'axios';
import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import store from './store';
import auth from './middleware/auth';


Vue.use(iView);

window.Bus = new Vue({name: 'Bus'});

Vue.mixin({
    methods: {
        /**
         * Format the given date with respect to timezone.
         */
        formatDate(unixTime){
            return moment(unixTime * 1000).add(new Date().getTimezoneOffset() / 60)
        },

        /**
         * Convert to human readable timestamp.
         */
        readableTimestamp(timestamp){
            return this.formatDate(timestamp).format('HH:mm:ss');
        }
    }
});

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (! token){
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } 
        store.dispatch('checkAuth', { token, next })
    }

    if (to.matched.some(record => record.meta.requiresGuest)) {
        if (token){
            next({
                path: '/'
            }) 
        }
    }

    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
});


// axios setting header
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

new Vue({
    el: '#root',
    store,
    router,
    /**
     * The component's data.
     */
    data(){
        return {
            showModal: false
        }
    },
    mounted () {
        // this.$store.dispatch('checkAuth');
    },
    render: h => h(App),
});