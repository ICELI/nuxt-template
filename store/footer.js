import axios from '~/plugins/axios'

const footer = {
  state: {
    footer: []
  },

  mutations: {
    SET_FOOTER (state, payload) {
      state.footer = payload
    }
  },

  actions: {
    async getFooter ({state, commit}) {
      const {data} = await axios.get(`/webapi/v2/indexBottomMenu`)
      commit('SET_FOOTER', data.rows)
    }
  }
}

export default footer
