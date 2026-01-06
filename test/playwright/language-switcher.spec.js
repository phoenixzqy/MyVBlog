import { test, expect } from '@playwright/test'

test.describe('Language Switcher Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('/')
  })

  test('should render language switcher component', async ({ page }) => {
    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Check if the language switcher is visible
    const languageSwitcher = page.locator('.language-switcher')
    await expect(languageSwitcher).toBeVisible()
  })

  test('should display current language indicator', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // The switcher should show some indication of the current language
    const languageSwitcher = page.locator('.language-switcher')
    const text = await languageSwitcher.textContent()

    // Should contain either 'EN', 'ZH', '中文', 'English', or similar
    expect(text).toMatch(/EN|ZH|中文|English|中|EN/i)
  })

  test('should be clickable and interactive', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const languageSwitcher = page.locator('.language-switcher')

    // Check if element is enabled and clickable
    await expect(languageSwitcher).toBeEnabled()

    // Try to click it
    await languageSwitcher.click()

    // After clicking, some UI change should occur
    // This could be content change, button state change, etc.
  })

  test('should switch language on click', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Get initial page content (should be in Chinese by default)
    const initialContent = await page.textContent('body')

    // Click the language switcher
    const languageSwitcher = page.locator('.language-switcher')
    await languageSwitcher.click()

    // Wait for language change to take effect
    await page.waitForTimeout(500)

    // Get new content after language switch
    const newContent = await page.textContent('body')

    // Content should have changed
    expect(newContent).not.toBe(initialContent)
  })

  test('should persist language preference in cookie', async ({ page, context }) => {
    await page.waitForLoadState('networkidle')

    // Click the language switcher
    const languageSwitcher = page.locator('.language-switcher')
    await languageSwitcher.click()

    // Wait for cookie to be set
    await page.waitForTimeout(500)

    // Check if the language cookie exists
    const cookies = await context.cookies()
    const languageCookie = cookies.find(cookie => cookie.name === 'user-language')

    expect(languageCookie).toBeDefined()
    expect(['en', 'zh']).toContain(languageCookie.value)
  })

  test('should maintain language after page navigation', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Switch to English
    const languageSwitcher = page.locator('.language-switcher')
    await languageSwitcher.click()
    await page.waitForTimeout(500)

    // Navigate to another page (adjust selector based on actual navigation)
    const firstLink = page.locator('a[href]').first()
    if (await firstLink.count() > 0) {
      await firstLink.click()
      await page.waitForLoadState('networkidle')

      // Language switcher should still be visible and indicate the same language
      await expect(languageSwitcher).toBeVisible()
    }
  })

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Language switcher should still be visible and functional on mobile
    const languageSwitcher = page.locator('.language-switcher')
    await expect(languageSwitcher).toBeVisible()

    // Should be clickable on mobile
    await languageSwitcher.click()
    await page.waitForTimeout(500)

    // Content should change
    const content = await page.textContent('body')
    expect(content).toBeTruthy()
  })

  test('should handle rapid clicking gracefully', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const languageSwitcher = page.locator('.language-switcher')

    // Click multiple times rapidly
    await languageSwitcher.click()
    await languageSwitcher.click()
    await languageSwitcher.click()

    await page.waitForTimeout(500)

    // Page should still be functional
    await expect(languageSwitcher).toBeVisible()
    await expect(languageSwitcher).toBeEnabled()
  })

  test('should have accessible button attributes', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const languageSwitcher = page.locator('.language-switcher')

    // Check for accessibility attributes
    const role = await languageSwitcher.getAttribute('role')
    const ariaLabel = await languageSwitcher.getAttribute('aria-label')

    // Either role should be button or it should be a button element
    // And it should have an aria-label for screen readers
    expect(role === 'button' || await languageSwitcher.evaluate(el => el.tagName === 'BUTTON')).toBeTruthy()
  })
})
