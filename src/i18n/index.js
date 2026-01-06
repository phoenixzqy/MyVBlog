import { createI18n } from 'vue-i18n'
import { getLanguage } from '@/utils/language'
import en from './en.json'
import zh from './zh.json'

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: getLanguage(), // Get initial locale from language utility
  fallbackLocale: 'zh', // Default fallback to Chinese
  messages: {
    en,
    zh
  }
})

export default i18n
