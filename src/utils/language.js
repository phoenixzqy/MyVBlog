import Cookies from 'js-cookie'

const LANGUAGE_KEY = 'user-language'

/**
 * Get the user's preferred language
 * Priority: Cookie > Browser language > Default (zh)
 * @returns {string} 'en' or 'zh'
 */
export function getLanguage () {
  // Check cookie first
  const cookieLanguage = Cookies.get(LANGUAGE_KEY)
  if (cookieLanguage) {
    return cookieLanguage
  }

  // Check browser language
  const browserLanguage = navigator.language || navigator.userLanguage
  if (browserLanguage) {
    const lang = browserLanguage.toLowerCase()
    if (lang.startsWith('zh')) {
      return 'zh'
    }
    if (lang.startsWith('en')) {
      return 'en'
    }
  }

  // Default to Chinese
  return 'zh'
}

/**
 * Set the user's language preference
 * @param {string} language - 'en' or 'zh'
 */
export function setLanguage (language) {
  if (language !== 'en' && language !== 'zh') {
    console.warn(`Invalid language: ${language}. Must be 'en' or 'zh'.`)
    return
  }
  Cookies.set(LANGUAGE_KEY, language, { expires: 365 }) // Store for 1 year
}
