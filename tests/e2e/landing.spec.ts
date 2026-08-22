import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByText('Море Котиков', { exact: true }).first()).toBeVisible();
});

test('anchor navigation reaches each scene and preserves target focus', async ({ page }) => {
  const menuToggle = page.getByRole('button', { name: 'Открыть меню' });
  let navigation = page.getByRole('navigation', { name: 'Основная навигация' });

  if (await menuToggle.isVisible()) {
    await menuToggle.click();
    navigation = page.getByRole('navigation', { name: 'Мобильная навигация' });
  }

  for (const id of ['about', 'cats', 'inside', 'visit', 'contact']) {
    await expect(navigation.locator(`a[href="#${id}"]`)).toHaveCount(1);
  }

  await navigation.locator('a[href="#cats"]').click();

  await expect(page).toHaveURL(/#cats$/);
  await expect(page.locator('#cats')).toBeInViewport();
  await expect(page.locator('#cats')).toBeFocused();
});

test('primary visit and public contact actions use real destinations', async ({ page }) => {
  const primaryCta = page.locator('main a[href="#contact"]').first();
  const phone = page.locator('a[href="tel:+79022995543"]:visible').first();
  const vk = page.locator('a[href="https://vk.ru/club233883954"]').first();
  const max = page
    .locator('a[href="https://max.ru/u/f9LHodD0cOIOSaX4KAQ_CBVFRgvaZvaD_L17fsowg6he_oanH9lVQxSGXcY"]')
    .first();
  const route = page.locator('a[href="https://yandex.ru/maps/-/CTwNq86O"]').first();

  await expect(primaryCta).toBeVisible();
  await expect(primaryCta).toHaveAccessibleName(/\S/);
  await expect(phone).toBeVisible();
  await expect(phone).toHaveAccessibleName(/\S/);
  await expect(vk).toBeVisible();
  await expect(max).toBeVisible();
  await expect(route).toBeVisible();
});

test('document has no horizontal overflow', async ({ page }) => {
  await page.evaluate(() => document.fonts.ready);

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));

  expect(
    dimensions.scrollWidth,
    `document width ${dimensions.scrollWidth}px exceeds viewport width ${dimensions.viewportWidth}px`,
  ).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
});

test('meets the page-level WCAG 2.2 AA contract', async ({ page }) => {
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('link', { name: /перейти к (?:основному )?содержанию/i })).toHaveAttribute(
    'href',
    '#main-content',
  );

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});
