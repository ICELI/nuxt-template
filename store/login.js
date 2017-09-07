const login = {
  state: {
    opend: false
  },

  mutations: {
    SET_OPEN (state, payload) {
      Object.assign(state, payload)
    }
  }
}

export default login
