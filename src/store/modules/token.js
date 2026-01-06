import Cookie from '@/utils/cookie'
import UserApi from '@/api/user'
import store from '../index'
import { ElMessage, ElNotification } from 'element-plus'

const TOKEN_KEY = 'TOKEN_KEY'
const EXPIRATION_DAYS = 180
const token = {
  state: {
    token: Cookie.getAttribute(TOKEN_KEY)
  },

  mutations: {
    SET_TOKEN: (state, value) => {
      state.token = value
      Cookie.setAttribute(TOKEN_KEY, value, EXPIRATION_DAYS)
    },
    REMOVE_TOKEN: (state) => {
      state.token = null
      Cookie.remove(TOKEN_KEY)
    }
  },

  actions: {
    Authentication ({ commit }, accessToken) {
      UserApi.verifyToken(accessToken).then((response) => {
        const result = response.data
        const githubUsername = store.state.configuration.githubUsername
        if (githubUsername === result.login) {
          commit('SET_TOKEN', accessToken)
          ElNotification({
            title: '成功',
            message: 'Token绑定成功',
            type: 'success'
          })
        } else {
          ElMessage({
            message: 'Token用户不一致',
            type: 'error'
          })
        }
      }).catch(() => {

      })
    },
    Cancellation ({ commit }) {
      commit('REMOVE_TOKEN')
      ElMessage({
        message: 'Token取消绑定',
        type: 'info'
      })
    }
  }
}

export default token
