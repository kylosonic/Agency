import { test, expect } from '@playwright/test';

const nodeEnv = globalThis.process?.env ?? {};
const BASE_URL = nodeEnv.PLAYWRIGHT_BASE_URL || 'http://localhost:4173';

const routes = [
  '/',
  '/web-development',
  '/mobile-development',
  '/saas-solutions',
  '/additional-services',
  '/case-studies',
  '/portfolio',
  '/instant-quote',
  '/book-discovery-call',
  '/industries/real-estate',
  '/policy',
];

const viewports = [
  { name: '390x844', width: 390, height: 844 },
  { name: '375x812', width: 375, height: 812 },
  { name: '414x896', width: 414, height: 896 },
  { name: '768x1024', width: 768, height: 1024 },
];

async function dismissLeadModalIfOpen(page) {
  const closeModalButton = page.getByRole('button', { name: 'Close pricing guide modal' });
  if (await closeModalButton.isVisible().catch(() => false)) {
    await closeModalButton.click();
  }
}

async function seedDataLayer(page) {
  await page.addInitScript(() => {
    window.dataLayer = [];
  });
}

async function preventMailtoNavigation(page) {
  await page.addInitScript(() => {
    document.addEventListener(
      'click',
      (event) => {
        if (!(event.target instanceof Element)) {
          return;
        }

        const mailtoLink = event.target.closest('a[href^="mailto:"]');
        if (mailtoLink) {
          event.preventDefault();
        }
      },
      true
    );
  });
}

async function getAnalyticsEventCount(page, eventName) {
  return page.evaluate((targetEventName) => {
    if (!Array.isArray(window.dataLayer)) {
      return 0;
    }

    return window.dataLayer.filter((entry) => entry?.event === targetEventName).length;
  }, eventName);
}

async function expectAnalyticsEvent(page, eventName) {
  await expect.poll(async () => getAnalyticsEventCount(page, eventName)).toBeGreaterThan(0);
}

async function expectAnalyticsEventWithSource(page, eventName, source) {
  await expect.poll(async () => page.evaluate(({ targetEventName, targetSource }) => {
    if (!Array.isArray(window.dataLayer)) {
      return false;
    }

    return window.dataLayer.some(
      (entry) => entry?.event === targetEventName && entry?.source === targetSource
    );
  }, { targetEventName: eventName, targetSource: source })).toBe(true);
}

test.describe('Live site responsive smoke', () => {
  for (const vp of viewports) {
    for (const route of routes) {
      test(`${vp.name} ${route} has visible hero and no page horizontal overflow`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

        await expect(page.locator('h1').first()).toBeVisible();

        const overflowPx = await page.evaluate(() => {
          const doc = document.documentElement;
          return Math.max(0, doc.scrollWidth - window.innerWidth);
        });

        expect(overflowPx).toBeLessThanOrEqual(1);

        const oversizedPrimary = await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('.btn.btn-primary'));
          return buttons.some((btn) => btn.getBoundingClientRect().width > window.innerWidth + 1);
        });

        expect(oversizedPrimary).toBeFalsy();
      });
    }
  }

  test('mobile nav and dark mode toggle work on home page', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const mobileToggle = page.locator('.mobile-menu-toggle');
    const desktopLinks = page.locator('.navbar-links');

    await expect(mobileToggle).toBeVisible();
    await expect(desktopLinks).toBeHidden();

    await mobileToggle.click();
    await expect(page.locator('.mobile-nav.open')).toBeVisible();

    await mobileToggle.click();
    await expect(page.locator('.mobile-nav.open')).toBeHidden();

    const mobileThemeToggle = page.locator('.navbar-mobile-actions .dark-mode-toggle');
    await expect(mobileThemeToggle).toBeVisible();

    const themeBefore = await page.getAttribute('html', 'data-theme');
    await mobileThemeToggle.click();
    const themeAfter = await page.getAttribute('html', 'data-theme');

    expect(themeAfter).not.toBe(themeBefore);
  });

  test('additional services table scrolls inside wrapper on small screens without page overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/additional-services`, { waitUntil: 'networkidle' });

    const tableBehavior = await page.evaluate(() => {
      const wrapper = document.querySelector('.services-table-wrapper');
      const table = document.querySelector('.services-table');
      const pageOverflow = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);

      if (!wrapper || !table) {
        return { found: false };
      }

      return {
        found: true,
        wrapperScrollable: wrapper.scrollWidth > wrapper.clientWidth,
        tableWiderThanWrapper: table.scrollWidth > wrapper.clientWidth,
        pageOverflow,
      };
    });

    expect(tableBehavior.found).toBeTruthy();
    expect(tableBehavior.tableWiderThanWrapper).toBeTruthy();
    expect(tableBehavior.wrapperScrollable).toBeTruthy();
    expect(tableBehavior.pageOverflow).toBeLessThanOrEqual(1);
  });

  test('instant quote wizard completes and shows estimate range', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/instant-quote`, { waitUntil: 'networkidle' });

    for (let index = 0; index < 3; index += 1) {
      await dismissLeadModalIfOpen(page);
      await page.getByRole('button', { name: 'Continue' }).click();
    }

    await dismissLeadModalIfOpen(page);
    await page.locator('.quote-step input[type="text"]').first().fill('Playwright Tester');
    await page.locator('.quote-step input[type="email"]').fill('playwright@example.com');
    await page.getByRole('button', { name: 'Generate Estimate' }).click();

    await expect(page.locator('.quote-result-range')).toBeVisible();
    await expect(page.getByText('Your estimated range')).toBeVisible();
  });

  test('discovery booking form submits successfully', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/book-discovery-call`, { waitUntil: 'networkidle' });

    await dismissLeadModalIfOpen(page);
    await page.locator('.discovery-slot input[type="radio"]').nth(1).check();
    await page.locator('#booking-name').fill('Playwright Tester');
    await page.locator('#booking-email').fill('playwright@example.com');
    await page.locator('#booking-company').fill('QA Labs');
    await page.locator('#booking-agenda').fill('Need roadmap and estimate for a multi-module platform.');

    await page.getByRole('button', { name: 'Confirm Session' }).click();

    await expect(page.getByText('Thanks. Your booking details were captured')).toBeVisible();
  });

  test('language switch updates html lang and route title metadata', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/portfolio`, { waitUntil: 'networkidle' });

    const titleBefore = await page.title();

    await page.locator('.navbar-mobile-actions .language-switcher-select').selectOption('am');

    await expect.poll(async () => page.getAttribute('html', 'lang')).toBe('am');
    await expect.poll(async () => page.title()).not.toBe(titleBefore);
  });

  test('home contact form submits and shows success feedback', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.route('https://formsubmit.co/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await page.locator('#contact-name').fill('Playwright Contact Tester');
    await page.locator('#contact-email').fill('playwright-contact@example.com');
    await page.locator('#contact-message').fill('Please contact us with implementation options and timeline.');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Thanks. Your message was sent successfully and our team will respond within 24 hours.')).toBeVisible();
  });
});

test.describe('Analytics smoke assertions', () => {
  test('tracks page views and lead capture modal lifecycle events', async ({ page }) => {
    await seedDataLayer(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/web-development`, { waitUntil: 'networkidle' });

    await expectAnalyticsEvent(page, 'page_view');

    await page.locator('.cta-section .cta-actions button.btn.btn-primary').first().click();
    await expect(page.locator('.modal-slide-panel')).toBeVisible();
    await expectAnalyticsEvent(page, 'pricing_guide_intent');

    await page.locator('#lead-name').fill('Playwright Analytics Tester');
    await page.locator('#lead-email').fill('analytics-playwright@example.com');
    await page.locator('#lead-company').fill('QA Labs');
    await page.locator('.modal-slide-panel form button.btn.btn-primary.btn-lg').click();

    await expect(page.locator('.modal-success-state')).toBeVisible();
    await expectAnalyticsEvent(page, 'pricing_guide_form_submitted');
    await expectAnalyticsEvent(page, 'pricing_guide_opened');
  });

  test('tracks contact form attempt/outcome and contact channel clicks', async ({ page }) => {
    await seedDataLayer(page);
    await page.setViewportSize({ width: 390, height: 844 });

    await page.route('https://formsubmit.co/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await page.locator('#contact-name').fill('Analytics Contact Tester');
    await page.locator('#contact-email').fill('analytics-contact@example.com');
    await page.locator('#contact-message').fill('Analytics smoke test contact form submission.');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Thanks. Your message was sent successfully and our team will respond within 24 hours.')).toBeVisible();
    await expectAnalyticsEvent(page, 'contact_form_attempt');
    await expectAnalyticsEvent(page, 'contact_form_outcome');

    await page.locator('.contact-info-card a[href^="mailto:"]').first().click();
    await expectAnalyticsEventWithSource(page, 'contact_channel_clicked', 'home_contact_info');

    await page.locator('.footer-links a[href^="mailto:"]').first().click();
    await expectAnalyticsEventWithSource(page, 'contact_channel_clicked', 'footer');
  });

  test('tracks discovery call CTA links across service pages', async ({ page }) => {
    await seedDataLayer(page);
    await preventMailtoNavigation(page);
    await page.setViewportSize({ width: 390, height: 844 });

    const discoveryRoutes = [
      { path: '/web-development', source: 'web_page_cta_discovery' },
      { path: '/mobile-development', source: 'mobile_page_cta_discovery' },
      { path: '/saas-solutions', source: 'saas_page_cta_discovery' },
      { path: '/additional-services', source: 'additional_page_cta_discovery' },
      { path: '/policy', source: 'policy_page_cta_discovery' },
    ];

    for (const route of discoveryRoutes) {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      await page.locator('.cta-actions a.btn.btn-secondary.btn-lg[href^="mailto:"]').first().click();
      await expectAnalyticsEventWithSource(page, 'discovery_call_clicked', route.source);
    }
  });
});
