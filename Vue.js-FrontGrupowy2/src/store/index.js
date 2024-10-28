// store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || null,
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.role = payload.role;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("role", payload.role);
    },
    logout(state) {
      state.token = "";
      state.role = null;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      commit("logout");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.role,
  },
});
