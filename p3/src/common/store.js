import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {
        // [...existing actions...]
        authUser(context) {
            axios.post('auth').then((response) => {
                if (response.data.authenticated) {
                    context.commit('setUser', response.data.user);
                }
            });
        },
    }
})