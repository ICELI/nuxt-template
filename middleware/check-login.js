import login from '~/plugins/checkLogin'
import axios from '~/plugins/axios'

export default function ({ isServer, store, req }) {
  if (isServer && !req) { return }

  login.hasLogin()
    .then(data => {
      return axios.get(`/webapi/v2/userInfo`)
        .then(data => {
          return data.data.rows || {}
        })
    }, data => {
      console.log('Not Login')
    })
    .then(data => {
      store.commit('SET_USER', data || {})
    })
    .catch(e => store.commit({}))
}
