const release = {
  state: {
    loading: false
  },

  mutations: {
    SET_RELEASE_LOADING (state, payload) {
      state.loading = payload
    }
  }
}

export default release
