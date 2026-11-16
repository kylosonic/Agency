import { expect, test } from '@playwright/test';

const MARKETING_ROUTES = [
  '/',
  '/services',
  '/pricing',
  '/web-development',
  '/mobile-development',
  '/saas-solutions',
  '/additional-services',
];

const FORM_ROUTES = ['/instant-quote', '/book-discovery-call'];

async function settle(page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('h1')).toBeVisible();
  await page.waitForTimeout(250);
}

test('software-only offer and researched ETB anchors are visible', async ({ page }) => {
  await page.goto('/');
  await settle(page);

  const hero = page.locator('#hero');
  await expect(hero.getByText('NovaTech is a software development firm')).toBeVisible();
  await expect(hero.getByText('from 30,000 ETB', { exact: true })).toBeVisible();
  await expect(hero.getByText('from 60,000 ETB', { exact: true })).toBeVisible();
  await expect(hero.getByText('from 180,000 ETB', { exact: true })).toBeVisible();
  await expect(hero.getByText('from 100,000 ETB', { exact: true })).toBeVisible();

  const bodyText = await page.locator('body').innerText();
  expect(bodyText).not.toMatch(/NovaTech AI|AI automation|workflow audit/i);
});

test('pricing page exposes the market ledger and current blueprint', async ({ page }) => {
  await page.goto('/pricing');
  await settle(page);

  await expect(page.getByText('Software Blueprint: 25,000 ETB fixed')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The rates are researched in public.' })).toBeVisible();
  await expect(page.getByText(/reviewed 2026-11-16/i)).toBeVisible();
  await expect(page.locator('#pricing-evidence a')).toHaveCount(6);
  await expect(
    page.getByRole('link', { name: /PrimeTech PLC — website packages/i }),
  ).toHaveAttribute(
    'href',
    'https://primetechplc.com/pricing/website-design-development-package',
  );
});

test('neo-brutalist treatment is actually applied', async ({ page }) => {
  await page.goto('/');
  await settle(page);

  const board = page.locator('.brutal-price-board');
  await expect(board).toBeVisible();

  const styles = await board.evaluate((element) => {
    const computed = getComputedStyle(element);
    return {
      borderWidth: computed.borderTopWidth,
      borderRadius: computed.borderRadius,
      boxShadow: computed.boxShadow,
      fontFamily: getComputedStyle(element.querySelector('strong')).fontFamily,
    };
  });

  expect(styles.borderWidth).toBe('3px');
  expect(styles.borderRadius).toBe('0px');
  expect(styles.boxShadow).toMatch(/oklch|rgb/);
  expect(styles.fontFamily).toContain('Bricolage Grotesque');
});

test('workflow audit is retired to services', async ({ page }) => {
  await page.goto('/workflow-audit');
  await settle(page);
  await expect(page).toHaveURL(/\/services$/);
});

for (const route of [...MARKETING_ROUTES, ...FORM_ROUTES]) {
  test(`${route} renders without clipped heading or horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await settle(page);

    const layout = await page.evaluate(() => {
      const nav = document.querySelector('.navbar')?.getBoundingClientRect();
      const heading = document.querySelector('h1')?.getBoundingClientRect();
      return {
        viewport: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        navBottom: nav?.bottom ?? 0,
        headingTop: heading?.top ?? -1,
      };
    });

    expect(layout.scrollWidth, `${route} must not overflow horizontally`).toBeLessThanOrEqual(
      layout.viewport,
    );
    expect(layout.headingTop, `${route} heading must clear the fixed navbar`).toBeGreaterThanOrEqual(
      layout.navBottom - 1,
    );
  });
}

for (const width of [320, 375, 414, 768, 1440]) {
  test(`key pages hold at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });

    for (const route of ['/', '/services', '/pricing']) {
      await page.goto(route);
      await settle(page);
      const dimensions = await page.evaluate(() => ({
        client: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scroll, `${route} at ${width}px`).toBeLessThanOrEqual(dimensions.client);
    }
  });
}
