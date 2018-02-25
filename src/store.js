import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logged: true,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVsbmFyZHUiLCJpZCI6IjVhOTI0YTg5YWJiNDlmZWIxYmJhMjk5OSIsImlhdCI6MTUxOTUzODI5NSwiZXhwIjoxNTE5NjI0Njk1fQ.gLZIZe1PXnE7aJuqneScF0ujt2XubgTfbVKlHbteP0o"
  },
  mutations: {
    login(state, token) {
      state.logged = true
      state.token = token
    }
  },
  getters: {
    isAuthenticated: state => {
      return state.logged
    }
  }
})

export default store;
