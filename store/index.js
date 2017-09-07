import Vuex from 'vuex'
import footer from './footer'
import experts from './experts'
import login from './login'
import user from './user'
import release from './release'
import demandOrder from './demandOrder'

const createStroe = () => {
  return new Vuex.Store({
    modules: {
      footer,
      experts,
      login,
      user,
      release,
      demandOrder
    }
  })
}

export default createStroe
