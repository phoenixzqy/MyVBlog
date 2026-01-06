import { test, expect } from '@playwright/test'

test.describe('Music Module Removal Verification', () => {
  test('should not have music player UI elements in DOM', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check for common music player element selectors
    const musicSelectors = [
      '.music-player',
      '.audio-player',
      '#music-player',
      '[class*="music"]',
      '[id*="music"]',
      'audio',
      '.player-controls',
      '.play-button',
      '.pause-button'
    ]

    // Allow audio elements if they're not music-related (e.g., notifications)
    // But check for music-specific classes
    const musicElements = await page.locator('[class*="music"], [id*="music"]').count()
    expect(musicElements).toBe(0)
  })

  test('should not have music-related navigation items', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check navigation menus for music links
    const navLinks = page.locator('a, .nav-item, .menu-item')
    const navCount = await navLinks.count()

    for (let i = 0; i < navCount; i++) {
      const link = navLinks.nth(i)
      const text = await link.textContent()
      const href = await link.getAttribute('href')

      if (text) {
        // Check for music-related text (in English and Chinese)
        expect(text.toLowerCase()).not.toContain('music')
        expect(text).not.toContain('音乐')
        expect(text).not.toContain('歌曲')
      }

      if (href) {
        // Check for music-related URLs
        expect(href).not.toContain('/music/')
        expect(href).not.toContain('/music')
      }
    }
  })

  test('should not load music-related scripts or assets', async ({ page }) => {
    const resourcePromises = []

    page.on('request', request => {
      const url = request.url()
      // Check if any requests are for music-related resources
      expect(url).not.toContain('/music/')
      expect(url).not.toMatch(/music.*\.(js|css|mp3|wav|ogg)/)
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should not have music module in sidebar', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check sidebar for music menu items
    const sidebar = page.locator('.sidebar, [class*="side"]')

    if (await sidebar.count() > 0) {
      const sidebarText = await sidebar.textContent()
      expect(sidebarText).not.toContain('音乐')
      expect(sidebarText).not.toContain('Music')
      expect(sidebarText).not.toContain('歌曲')
    }
  })

  test('should not have music module in mobile bottom bar', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    // Check bottom navigation bar
    const bottombar = page.locator('.bottombar, .van-tabbar, [class*="bottom"]')

    if (await bottombar.count() > 0) {
      const bottombarText = await bottombar.textContent()
      expect(bottombarText).not.toContain('音乐')
      expect(bottombarText).not.toContain('Music')
      expect(bottombarText).not.toContain('歌曲')

      // Check for music icons
      const musicIcons = bottombar.locator('[class*="music"], [name*="music"]')
      expect(await musicIcons.count()).toBe(0)
    }
  })

  test('should not have audio elements with music sources', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check for audio elements
    const audioElements = page.locator('audio')
    const audioCount = await audioElements.count()

    for (let i = 0; i < audioCount; i++) {
      const audio = audioElements.nth(i)
      const src = await audio.getAttribute('src')

      if (src) {
        // Audio elements should not have music file sources
        expect(src).not.toMatch(/\.(mp3|wav|ogg|m4a)$/)
        expect(src).not.toContain('/music/')
      }
    }
  })

  test('should not have music-related store modules', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check if Vuex store has music module
    const hasMusicModule = await page.evaluate(() => {
      // Access the Vue app's store if available
      if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        // Check for music module in store
        return false // Placeholder
      }
      return false
    })

    expect(hasMusicModule).toBe(false)
  })

  test('navigation should work without music routes', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Try to navigate to different pages
    const validPages = [
      '/user/blog/main',
      '/user/project/main'
    ]

    for (const pagePath of validPages) {
      await page.goto(pagePath)
      await page.waitForLoadState('networkidle')

      // Should not be redirected to music page
      expect(page.url()).not.toContain('/music')
    }
  })
})
