import axios from 'axios'
import { ElMessage } from 'element-plus'
import { showToast } from 'vant'
import store from '../store/index'

// Detect if mobile device
function isMobile () {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

const service = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 15000
})

service.interceptors.request.use(
  config => {
    const token = store.state.token.token
    if (token) {
      config.headers = { Authorization: `token ${token}` }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let message
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = 'Token错误'
          break
        case 403:
          message = error.response.data.message || 'API访问受限'
          break
        default:
          message = error.response.data.message || '请求失败'
          break
      }
    } else {
      message = '网络错误或请求超时'
    }

    // Use appropriate UI library based on device
    if (isMobile()) {
      showToast({
        message,
        type: 'fail',
        duration: 3000
      })
    } else {
      ElMessage({
        message,
        type: 'error'
      })
    }
    return Promise.reject(new Error(message))
  }
)

export default service
