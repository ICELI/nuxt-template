const experts = {
  state: {
    loading: false,
    totalPage: 0
  },

  mutations: {
    SET_LOADING (state, payload) {
      state.loading = payload
    },

    GET_TOTALPAGE (state, payload) {
      state.totalPage = payload
    }
  }
}

export default experts
