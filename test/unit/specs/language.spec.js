import { getLanguage, setLanguage } from '@/utils/language'
import Cookies from 'js-cookie'

// Mock js-cookie
jest.mock('js-cookie')

describe('Language Utility', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
    // Reset navigator.language for each test
    delete window.navigator
    window.navigator = { language: 'en-US' }
  })

  describe('getLanguage', () => {
    it('should return language from cookie if it exists', () => {
      Cookies.get.mockReturnValue('en')
      expect(getLanguage()).toBe('en')
      expect(Cookies.get).toHaveBeenCalledWith('user-language')
    })

    it('should return "zh" for Chinese browser language', () => {
      Cookies.get.mockReturnValue(null)
      window.navigator = { language: 'zh-CN' }
      expect(getLanguage()).toBe('zh')
    })

    it('should return "en" for English browser language', () => {
      Cookies.get.mockReturnValue(null)
      window.navigator = { language: 'en-US' }
      expect(getLanguage()).toBe('en')
    })

    it('should return "zh" as default when no cookie and no browser language', () => {
      Cookies.get.mockReturnValue(null)
      window.navigator = { language: null }
      expect(getLanguage()).toBe('zh')
    })

    it('should prioritize cookie over browser language', () => {
      Cookies.get.mockReturnValue('zh')
      window.navigator = { language: 'en-US' }
      expect(getLanguage()).toBe('zh')
    })

    it('should handle userLanguage fallback', () => {
      Cookies.get.mockReturnValue(null)
      window.navigator = { userLanguage: 'en-GB' }
      expect(getLanguage()).toBe('en')
    })

    it('should handle languages starting with zh', () => {
      Cookies.get.mockReturnValue(null)
      window.navigator = { language: 'zh-TW' }
      expect(getLanguage()).toBe('zh')
    })

    it('should return default for unsupported languages', () => {
      Cookies.get.mockReturnValue(null)
      window.navigator = { language: 'fr-FR' }
      expect(getLanguage()).toBe('zh')
    })
  })

  describe('setLanguage', () => {
    it('should set language cookie for valid "en" value', () => {
      setLanguage('en')
      expect(Cookies.set).toHaveBeenCalledWith('user-language', 'en', { expires: 365 })
    })

    it('should set language cookie for valid "zh" value', () => {
      setLanguage('zh')
      expect(Cookies.set).toHaveBeenCalledWith('user-language', 'zh', { expires: 365 })
    })

    it('should not set cookie for invalid language and log warning', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
      setLanguage('fr')
      expect(Cookies.set).not.toHaveBeenCalled()
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Invalid language: fr. Must be 'en' or 'zh'."
      )
      consoleWarnSpy.mockRestore()
    })

    it('should not set cookie for empty string', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
      setLanguage('')
      expect(Cookies.set).not.toHaveBeenCalled()
      expect(consoleWarnSpy).toHaveBeenCalled()
      consoleWarnSpy.mockRestore()
    })

    it('should not set cookie for null value', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
      setLanguage(null)
      expect(Cookies.set).not.toHaveBeenCalled()
      expect(consoleWarnSpy).toHaveBeenCalled()
      consoleWarnSpy.mockRestore()
    })
  })
})
