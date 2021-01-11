import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuth: false,
  },
  mutations: {
    authSuccess(state) {
      state.isAuth = true;
    },
  },
  getters: {
    isAuth: state => state.isAuth,
  },
});
