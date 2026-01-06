// Test that music module routes are not accessible
module.exports = {
  'Music Module - No music routes should be accessible': function (browser) {
    const musicRoutes = [
      '/user/music/main',
      '/mobile/user/music/main',
      '/music',
      '/music/main',
      '/music/player'
    ]

    musicRoutes.forEach(route => {
      browser
        .url(`http://localhost:8080${route}`)
        .pause(1000)
        // Should either redirect to 404 or home, not show music content
        .assert.not.urlEquals(`http://localhost:8080${route}`)
    })

    browser.end()
  },

  'Music Module - Router should not contain music paths': function (browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      // Try to navigate to music route via hash
      .url('http://localhost:8080/#/user/music/main')
      .pause(1000)
      // Should redirect or show 404
      .execute(function () {
        return window.location.hash
      }, [], function (result) {
        // Hash should not be a music route
        this.assert.ok(
          !result.value.includes('/music/'),
          'Music routes should not be accessible'
        )
      })
      .end()
  }
}
