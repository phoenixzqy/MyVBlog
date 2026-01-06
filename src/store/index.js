import { createStore } from 'vuex'
import token from './modules/token'
import user from './modules/user'
import configuration from './modules/configuration'
import getters from './getters'

const store = createStore({
  modules: {
    token,
    user,
    configuration
  },
  getters
})

export default store
