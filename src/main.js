import { createApp } from 'vue'
import App from './App'
import util from './utils/util'
import router from './router'
import store from './store'
import i18n from './i18n'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
import MarkdownIt from 'markdown-it'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Vant, { Toast, Dialog, Notify } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

// Register all Element Plus icons globally
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(store)
app.use(i18n)
app.use(Vant)
app.use(Toast)
app.use(Dialog)
app.use(Notify)
app.use(ElementPlus)
app.use(mavonEditor)

// Create a markdown-it instance
const md = new MarkdownIt()

app.config.globalProperties.$markdown = function (value) {
  try {
    if (!value) return ''
    return md.render(value)
  } catch (error) {
    console.error('Error rendering markdown:', error)
    return value || ''
  }
}

app.config.globalProperties.$reload = function (context) {
  const NewPage = '/empty'
  context.$router.push(NewPage)
  context.$nextTick(() => (context.$router.go(-1)))
}

app.config.globalProperties.$setTitle = function (title) {
  if (title) {
    document.title = store.state.configuration.htmlTitle + ' - ' + title
  } else {
    document.title = store.state.configuration.htmlTitle
  }
}

app.config.globalProperties.$share = function (message) {
  if (!message) {
    message = window.location
  } else {
    const arr = (window.location + '').split('#')
    message = arr[0] + '#' + message
  }
  if (util.copy(message)) {
    app.config.globalProperties.$confirm('链接已复制,去分享给好友吧!!', '分享', {
      showCancelButton: false,
      showClose: false,
      type: 'success'
    })
  } else {
    app.config.globalProperties.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
      showCancelButton: false,
      showClose: false,
      type: 'warning'
    })
  }
}

app.config.globalProperties.$mobileShare = function (message) {
  if (!message) {
    message = window.location
  } else {
    const arr = (window.location + '').split('#')
    message = arr[0] + '#' + message
  }
  if (util.copy(message)) {
    app.config.globalProperties.$dialog.alert({
      title: '分享',
      message: '链接已复制,去分享给好友吧!!'
    })
  } else {
    app.config.globalProperties.$dialog.alert({
      title: '分享',
      message: '链接复制失败,可能因为浏览器不兼容'
    })
  }
}

app.config.globalProperties.$util = util

app.mount('#app')
