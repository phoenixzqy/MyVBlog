// Test mobile navigation for main pages
module.exports = {
  'Mobile Navigation - Blog Page': function (browser) {
    browser
      .url('http://localhost:8080/mobile/blog/main')
      .waitForElementVisible('body', 5000)
      .assert.urlContains('/mobile/blog/main')
      .assert.visible('.bottombar')
      .end()
  },

  'Mobile Navigation - Project Page': function (browser) {
    browser
      .url('http://localhost:8080/mobile/project/main')
      .waitForElementVisible('body', 5000)
      .assert.urlContains('/mobile/project/main')
      .assert.visible('.bottombar')
      .end()
  },

  'Mobile Navigation - Self Page': function (browser) {
    browser
      .url('http://localhost:8080/mobile/self/main')
      .waitForElementVisible('body', 5000)
      .assert.urlContains('/mobile/self/main')
      .assert.visible('.bottombar')
      .end()
  },

  'Mobile Navigation - Bottom Navigation Bar': function (browser) {
    browser
      .url('http://localhost:8080/mobile/blog/main')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.bottombar', 5000)
      // Click on project tab
      .click('.bottombar a[href*="project"]')
      .pause(1000)
      .assert.urlContains('/mobile/project/main')
      // Click on self tab
      .click('.bottombar a[href*="self"]')
      .pause(1000)
      .assert.urlContains('/mobile/self/main')
      // Click on blog tab
      .click('.bottombar a[href*="blog"]')
      .pause(1000)
      .assert.urlContains('/mobile/blog/main')
      .end()
  },

  'Mobile Navigation - Blog Details': function (browser) {
    browser
      .url('http://localhost:8080/mobile/blog/main')
      .waitForElementVisible('body', 5000)
      // Try to find and click on first blog item (if exists)
      .elements('css selector', '.blog-item', function (result) {
        if (result.value.length > 0) {
          this.click('.blog-item:first-child')
            .pause(1000)
            .assert.urlContains('/mobile/blog/details')
        }
      })
      .end()
  },

  'Mobile Navigation - Project Details': function (browser) {
    browser
      .url('http://localhost:8080/mobile/project/main')
      .waitForElementVisible('body', 5000)
      // Try to find and click on first project item (if exists)
      .elements('css selector', '.project-item', function (result) {
        if (result.value.length > 0) {
          this.click('.project-item:first-child')
            .pause(1000)
            .assert.urlContains('/mobile/project/details')
        }
      })
      .end()
  }
}
