import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        token: null,
        authenticated: false
    },
    mutations: {
        SET_USER (state, user) {
            state.user = user
        },
        SET_TOKEN (state, token) {
            state.token = token
            state.authenticated = true
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        },
        LOGOUT (state) {
            state.user = null
            state.authenticated = false
            state.token = null
            localStorage.clear()
        }
    },
    getters: {
        getToken: state => {
            return state.token
        },
        getUser: state => {
            return state.user
        },
        isAuth: state => {
            return state.authenticated
        }
    },
    actions: {
        checkAuth ({ commit, state }, { token, next }) {
            if (token !== null) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                axios.get('api/user').then( (res) => {
                    commit('SET_USER', res.data.data)
                    commit('SET_TOKEN', res.data.meta.token)
                }).catch( (e) => {
                    commit('LOGOUT')
                    next({
                        path: '/login'
                    }) 
                })
            }
        }
    }
})
