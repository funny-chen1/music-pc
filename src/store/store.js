import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './action'
Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        userInfo: null,
        isLogin: false,
        token: "",
        currentUrl: "",
        musicInfo: ""
    },
    getters,
    mutations,
    actions
})

export default store;