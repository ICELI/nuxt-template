const user = {
  state: {
    user: {}
  },

  getters: {
    getUser: state => {
      return state.user
    }
  },

  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    }
  }
}

export default user
