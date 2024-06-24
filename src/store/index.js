import { createStore } from 'vuex';
import { login as loginService } from '@/services/authService';

const store = createStore({
  state: {
    userId: null,
  },
  mutations: {
    setUser(state, userId) {
      state.userId = userId;
      console.log("User set in Vuex:", userId);
    },
    clearUser(state) {
      state.userId = null;
    },
  },
  actions: {
    async login({ commit }, userData) {
      try {
        const user = await loginService(userData);
        commit('setUser', user.userId);
        return user;  
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearUser');
    },
  },
  getters: {
    userId: (state) => state.userId,
  },
});

export default store;
