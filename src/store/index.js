// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false,
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData;
      state.isLoggedIn = !!user;
      console.log("User set in Vuex:", userData);
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  actions: {
    login({ commit }, userData) {
      commit("setUser", userData);
      console.log("User logged in with ID:", userData.userId);
    },
    logout({ commit }) {
      commit("clearUser");
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
  },
});
