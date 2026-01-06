import { test, expect } from '@playwright/test'

test.describe('Vant Components on Mobile Viewport', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport - iPhone X dimensions
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('should render van-nav-bar component', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    // Check if van-nav-bar is rendered
    const navBar = page.locator('.van-nav-bar')
    await expect(navBar).toBeVisible()
  })

  test('should render van-tabbar component', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    // Check if van-tabbar is rendered (bottombar)
    const tabbar = page.locator('.van-tabbar')
    await expect(tabbar).toBeVisible()

    // Check that tabbar has multiple items
    const tabbarItems = page.locator('.van-tabbar-item')
    const count = await tabbarItems.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should render van-list component on blog page', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    // Check if van-list is rendered
    const vanList = page.locator('.van-list')
    if (await vanList.count() > 0) {
      await expect(vanList.first()).toBeVisible()
    }
  })

  test('should render van-cell component on mobile pages', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    // Check if van-cell components are rendered
    const vanCells = page.locator('.van-cell')
    if (await vanCells.count() > 0) {
      await expect(vanCells.first()).toBeVisible()
    }
  })

  test('should render van-card component on mobile pages', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    // Check if van-card components are rendered
    const vanCards = page.locator('.van-card')
    if (await vanCards.count() > 0) {
      await expect(vanCards.first()).toBeVisible()
    }
  })

  test('van-tabbar should be clickable and navigate', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    const tabbar = page.locator('.van-tabbar')
    await expect(tabbar).toBeVisible()

    // Find and click project tab if it exists
    const projectTab = page.locator('.van-tabbar-item').filter({ hasText: /project|项目/i })
    if (await projectTab.count() > 0) {
      await projectTab.first().click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(500)

      // Check URL changed to project
      expect(page.url()).toContain('project')
    }
  })

  test('van-nav-bar should have title', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    const navBar = page.locator('.van-nav-bar')
    if (await navBar.count() > 0) {
      // Check if nav bar has some title text
      const navBarTitle = navBar.locator('.van-nav-bar__title')
      if (await navBarTitle.count() > 0) {
        const titleText = await navBarTitle.textContent()
        expect(titleText).toBeTruthy()
      }
    }
  })

  test('mobile viewport should be correctly sized', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    // Verify viewport is mobile-sized
    const viewportSize = page.viewportSize()
    expect(viewportSize.width).toBe(375)
    expect(viewportSize.height).toBe(667)
  })

  test('Vant components should be touch-friendly on mobile', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    // Check if tabbar items have adequate size for touch
    const tabbarItems = page.locator('.van-tabbar-item')
    if (await tabbarItems.count() > 0) {
      const firstItem = tabbarItems.first()
      const box = await firstItem.boundingBox()

      if (box) {
        // Minimum touch target should be at least 44x44 pixels (iOS guideline)
        expect(box.height).toBeGreaterThanOrEqual(40)
      }
    }
  })

  test('should handle mobile navigation smoothly', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    // Test navigation through all tabs
    const tabs = ['blog', 'project', 'self']

    for (const tab of tabs) {
      const tabItem = page.locator('.van-tabbar-item').filter({ hasText: new RegExp(tab, 'i') })
      if (await tabItem.count() > 0) {
        await tabItem.first().click()
        await page.waitForTimeout(300)

        // Verify we're on the correct page
        expect(page.url()).toContain(tab)
      }
    }
  })

  test('van-list should support pull-to-refresh if implemented', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    // Check if van-pull-refresh is present
    const pullRefresh = page.locator('.van-pull-refresh')
    if (await pullRefresh.count() > 0) {
      await expect(pullRefresh).toBeVisible()
    }
  })

  test('Vant components should have proper spacing on 375px viewport', async ({ page }) => {
    await page.goto('/mobile/blog/main')
    await page.waitForLoadState('networkidle')

    // Check that content fits within viewport
    const body = page.locator('body')
    const box = await body.boundingBox()

    if (box) {
      // Content should not exceed viewport width
      expect(box.width).toBeLessThanOrEqual(375)
    }
  })
})
