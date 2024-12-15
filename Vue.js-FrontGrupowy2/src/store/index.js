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
      state.role = String(payload.role);
      localStorage.setItem("token", payload.token);
      localStorage.setItem("role", payload.role);
    },
    logout(state) {
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    logout({ commit }) {
      commit("logout");
    },
    initializeStore({ commit }) {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (token && role) {
        commit("setUser", { token, role: parseInt(role) });
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.role,
  },
});
