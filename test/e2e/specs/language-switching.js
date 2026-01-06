// Test language switching and persistence
module.exports = {
  'Language Switcher - Switch to English': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.language-switcher', 5000)
      .assert.containsText('body', '博客') // Verify initial Chinese content
      .click('.language-switcher') // Click language switcher
      .pause(500)
      .assert.containsText('body', 'Blog') // Verify English content after switch
      .end()
  },

  'Language Switcher - Switch to Chinese': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.language-switcher', 5000)
      // First switch to English
      .click('.language-switcher')
      .pause(500)
      .assert.containsText('body', 'Blog')
      // Then switch back to Chinese
      .click('.language-switcher')
      .pause(500)
      .assert.containsText('body', '博客')
      .end()
  },

  'Language Switcher - Persistence across page reload': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.language-switcher', 5000)
      // Switch to English
      .click('.language-switcher')
      .pause(500)
      .assert.containsText('body', 'Blog')
      // Reload the page
      .refresh()
      .waitForElementVisible('body', 5000)
      // Verify English is still active after reload
      .assert.containsText('body', 'Blog')
      .end()
  },

  'Language Switcher - Cookie persistence': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.language-switcher', 5000)
      // Switch to English
      .click('.language-switcher')
      .pause(500)
      // Check that the cookie is set
      .getCookie('user-language', function (result) {
        this.assert.equal(result.value, 'en', 'Language cookie should be set to "en"')
      })
      // Switch back to Chinese
      .click('.language-switcher')
      .pause(500)
      // Check that the cookie is updated
      .getCookie('user-language', function (result) {
        this.assert.equal(result.value, 'zh', 'Language cookie should be set to "zh"')
      })
      .end()
  },

  'Language Switcher - Navigation preserves language': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.language-switcher', 5000)
      // Switch to English
      .click('.language-switcher')
      .pause(500)
      .assert.containsText('body', 'Blog')
      // Navigate to another page (if exists)
      .click('a[href*="project"]') // Adjust selector based on actual nav structure
      .pause(1000)
      // Verify language is still English
      .assert.containsText('body', 'Project') // Adjust based on actual content
      .end()
  }
}
