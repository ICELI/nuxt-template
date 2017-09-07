const demandOrder = {
  state: {
    loading: false
  },

  mutations: {
    SET_DEMANDORDER_LOADING (state, payload) {
      state.loading = payload
    }
  }
}

export default demandOrder
