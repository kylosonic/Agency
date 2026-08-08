/**
 * ================================================================
 * RE-BASELINE DIFF RECORD — TECH-21 (Phase 7: Fortune-500 Visual System)
 * ----------------------------------------------------------------
 * Date: 2026-08-08
 * Ticket: TECH-21 — E2E re-baseline (executed FIRST, in its TDD red state)
 * Direction: dark-only expectations → light-first expectations (B26/B38)
 * Governance: NB-24 (B38) — the automated visitor checks are deliberately
 *             updated, written down, and reviewed before the redesign
 *             counts as done. Contract: docs/plans/phase7-fortune500-visual-system.md §4,
 *             docs/behaviors/visual-system-fortune500.md (B26–B38),
 *             docs/behaviors/pending-behaviors.md (NB-24).
 * Delta: 67 → 76 tests (2 MUTATE + 9 NEW N1..N9, 0 DELETE)
 * QA-review: pending
 * ================================================================
 */

import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { deriveEstimateBand, ENTRY_OFFER_FLOOR, QUOTE_BUDGET_BANDS } from '../src/services/pricingData';
import { quoteWizardOptions } from '../src/config/contentData';

const nodeEnv = globalThis.process?.env ?? {};
const BASE_URL = nodeEnv.PLAYWRIGHT_BASE_URL || 'http://localhost:4173';

const routes = [
  '/',
  '/web-development',
  '/mobile-development',
  '/saas-solutions',
  '/additional-services',
  '/pricing',
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

  test('mobile nav works and the site defaults light-first on home page', async ({ page }) => {
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

    await expect(page.locator('.dark-mode-toggle')).toHaveCount(0);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    const bodyBackground = await page.locator('body').evaluate((element) => {
      const color = window.getComputedStyle(element).backgroundColor;
      const channels = color.match(/\d+(\.\d+)?/g)?.map(Number) ?? [];
      return { color, sum: channels.slice(0, 3).reduce((total, channel) => total + channel, 0) };
    });
    expect(
      bodyBackground.sum,
      `body background must be light (rgb sum > 600), got ${bodyBackground.color}`
    ).toBeGreaterThan(600);
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
    await page.goto(`${BASE_URL}/policy`, { waitUntil: 'networkidle' });

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

test.describe('Phase 1 — proof strip and ETB-only pricing', () => {
  test('no USD or dollar-denominated pricing renders on pricing surfaces', async ({ page }) => {
    const surfaces = ['/', '/pricing', '/web-development', '/mobile-development', '/additional-services'];

    for (const route of surfaces) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      const bodyText = await page.locator('body').innerText();
      expect(bodyText, `${route} must not render USD`).not.toContain('USD');
      expect(bodyText, `${route} must not render a dollar sign`).not.toContain('$');
      expect(bodyText, `${route} must not render "Global USD"`).not.toContain('Global USD');
    }
  });

  test('pricing page renders the locked ETB table and quoted-individually policy', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.getByText('quoted individually').first()).toBeVisible();

    // Audit: fixed 85,000 ETB entry offer
    await expect(page.getByText('85,000 ETB').first()).toBeVisible();

    // AI automation tiers: anchored from 250k / 750k / 1.5M+
    await expect(page.getByText('from 250,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 750,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 1,500,000+ ETB').first()).toBeVisible();

    // Monthly support band on every tier
    await expect(page.getByText('30,000 - 70,000 ETB / month').first()).toBeVisible();

    // Product engineering tab: web from 45k/150k/250k, mobile from 200k/400k, SaaS waitlist only
    await page.getByRole('tab', { name: 'Product Engineering (Web/Mobile/SaaS)' }).click();
    await expect(page.getByText('from 45,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 150,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 250,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 200,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 400,000 ETB').first()).toBeVisible();
    // SaaS: 3 products, waitlist only — each shows "Coming soon" in both the
    // delivery slot and the price slot (no prices, no billing).
    await expect(page.getByText('Coming soon')).toHaveCount(6);

    // Support & Add-ons tab: monthly maintenance band, no marketing retainers
    await page.getByRole('tab', { name: 'Support & Add-ons' }).click();
    await expect(page.getByText('5,000 - 15,000 ETB / month').first()).toBeVisible();
    await expect(page.getByText('Visibility Boost')).toHaveCount(0);
    await expect(page.getByText('Lead Generator')).toHaveCount(0);
    await expect(page.getByText('Market Dominator')).toHaveCount(0);

    const supportBodyText = await page.locator('body').innerText();
    expect(supportBodyText, 'support tab must not render USD').not.toContain('USD');
    expect(supportBodyText, 'support tab must not render $').not.toContain('$');
  });

  test('homepage hero is typography-led with real-facts strip', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.locator('.hero-stats')).toHaveCount(0);
    await expect(page.locator('#agent-demo')).toHaveCount(0);
    await expect(page.locator('#impact-calculator')).toHaveCount(0);

    await expect(page.locator('.hero-copy')).toBeVisible();
    await expect(page.locator('.hero-facts')).toBeVisible();
    await expect(page.locator('.hero-facts')).toContainText('5 business days');

    const trustRowText = await page.locator('.hero-trust-row').innerText();
    expect(trustRowText, 'trust row must not mention USD').not.toContain('USD');

    const bodyText = await page.locator('body').innerText();
    expect(bodyText, 'homepage must not render dollar signs').not.toContain('$');
  });

  test('policy page states bank-transfer-only payment and keeps milestone terms', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/policy`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.getByText('bank transfer').first()).toBeVisible();
    await expect(page.getByText('CBE Birr').first()).toBeVisible();
    await expect(page.getByText('tell us you want it').first()).toBeVisible();

    const bodyText = await page.locator('body').innerText();
    expect(bodyText, 'no international card handling mention').not.toContain('International Card Handling');
    expect(bodyText, 'no 15-20 percent handling fee').not.toContain('15–20%');
    expect(bodyText, 'no 15-20 percent handling fee').not.toContain('15-20%');
    expect(bodyText, 'no marketing terms section').not.toContain('Digital Marketing Terms');
    expect(bodyText, 'no 2-month annual discount claim').not.toContain('2-month');

    await expect(page.getByText('40%')).toBeVisible();
    await expect(page.getByText('30%')).toHaveCount(2);
    await expect(page.getByText('Full Ownership Guarantee')).toBeVisible();
  });

  test('no nav or footer links to removed routes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const desktopHrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href]')).map((anchor) => anchor.getAttribute('href'))
    );
    expect(desktopHrefs).not.toContain('/case-studies');
    expect(desktopHrefs).not.toContain('/portfolio');

    await page.locator('.mobile-menu-toggle').click();
    await expect(page.locator('.mobile-nav.open')).toBeVisible();
    const mobileHrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.mobile-nav a[href]')).map((anchor) => anchor.getAttribute('href'))
    );
    expect(mobileHrefs).not.toContain('/case-studies');
    expect(mobileHrefs).not.toContain('/portfolio');
  });

  test('removed routes land on the 404 page', async ({ page }) => {
    for (const route of ['/case-studies', '/portfolio']) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await expect(page.locator('.not-found-card')).toBeVisible();
    }
  });

  test('sitemap.xml no longer lists removed routes', () => {
    const sitemapXml = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
    expect(sitemapXml).not.toContain('/portfolio');
    expect(sitemapXml).not.toContain('/case-studies');
  });

  test('policy payments section renders in Amharic and Afaan Oromo without English fallback', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const localizedTitles = {
      am: 'የክፍያ ዘዴዎች',
      om: 'Maloota Kaffaltii',
    };

    for (const [lang, localizedTitle] of Object.entries(localizedTitles)) {
      await page.goto(`${BASE_URL}/policy`, { waitUntil: 'networkidle' });
      await page.locator('.navbar-mobile-actions .language-switcher-select').selectOption(lang);

      await expect.poll(async () => page.getAttribute('html', 'lang')).toBe(lang);
      await expect(page.getByText('Payment Methods')).toHaveCount(0);
      await expect(page.getByText(localizedTitle).first()).toBeVisible();
    }
  });

  test('no fabricated home stats strings render in any language', async ({ page }) => {
    for (const lang of ['en', 'am', 'om']) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      if (lang !== 'en') {
        await page.locator('.navbar-mobile-actions .language-switcher-select').selectOption(lang);
        await expect.poll(async () => page.getAttribute('html', 'lang')).toBe(lang);
      }

      const bodyText = await page.locator('body').innerText();
      expect(bodyText, `${lang} must not render Projects Delivered`).not.toContain('Projects Delivered');
      expect(bodyText, `${lang} must not render Active Clients`).not.toContain('Active Clients');
      expect(bodyText, `${lang} must not render Client Satisfaction`).not.toContain('Client Satisfaction');
    }
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

const PILOT_CLOSE_MODAL_LABELS = {
  en: 'Close pricing guide modal',
  am: 'የዋጋ መመሪያ ሞዳልን ዝጋ',
  om: 'Modal qajeelfama gatii cufi',
};

async function dismissLeadModalInLanguage(page, language) {
  const closeButton = page.getByRole('button', { name: PILOT_CLOSE_MODAL_LABELS[language] });
  if (await closeButton.isVisible().catch(() => false)) {
    await closeButton.click();
  }
}

const PILOT_HEADLINES_BY_LANGUAGE = {
  en: 'Be among the first three implementation clients',
  am: 'ከመጀመሪያዎቹ ሶስት የልማት ደንበኞች አንዱ ይሁኑ',
  om: "Maamiltoota jalqabaa sadii keessaa tokko ta'aa",
};

test.describe('Phase 2 — wizard/pricing unification (TECH-04)', () => {
  test('wizard and pricing page quote the same numbers for the same web scope', async ({ page }) => {
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

    const rangeText = await page.locator('.quote-result-range').innerText();
    expect(rangeText, 'web mid band must quote 150,000 ETB').toContain('150,000 ETB');
    expect(rangeText, 'web mid band must quote 250,000 ETB').toContain('250,000 ETB');
  });

  test('wizard offers no below-entry budget option and no add-on-only service', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/instant-quote`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.getByText('Branding and Additional Services')).toHaveCount(0);

    await page.getByRole('button', { name: 'Continue' }).click();
    await dismissLeadModalIfOpen(page);

    const budgetOptions = await page.locator('.quote-step select').first().locator('option').allTextContents();
    expect(budgetOptions, 'budget options must start at the 85k entry band').toEqual([
      '85k - 150k ETB',
      '150k - 400k ETB',
      '400k - 1M ETB',
      '1M+ ETB',
    ]);
    expect(budgetOptions, 'no Under 50k ETB option').not.toContain('Under 50k ETB');
  });

  test('entry floor holds even with every integration selected', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/instant-quote`, { waitUntil: 'networkidle' });

    await dismissLeadModalIfOpen(page);
    await page.getByRole('button', { name: 'Continue' }).click();

    await dismissLeadModalIfOpen(page);
    await page.locator('.quote-step select').first().selectOption('85k - 150k ETB');
    await page.getByRole('button', { name: 'Continue' }).click();

    await dismissLeadModalIfOpen(page);
    const integrationInputs = page.locator('.quote-step input[type="checkbox"]');
    await expect(integrationInputs).toHaveCount(8);
    for (let index = 0; index < 8; index += 1) {
      await integrationInputs.nth(index).check();
    }
    await page.getByRole('button', { name: 'Continue' }).click();

    await dismissLeadModalIfOpen(page);
    await page.locator('.quote-step input[type="text"]').first().fill('Playwright Tester');
    await page.locator('.quote-step input[type="email"]').fill('playwright@example.com');
    await page.getByRole('button', { name: 'Generate Estimate' }).click();

    const rangeText = await page.locator('.quote-result-range').innerText();
    expect(rangeText, 'entry band with all integrations must floor at 85,000 ETB').toContain('85,000 ETB');
  });

  test('exhaustive floor property: every service × budget combo quotes at or above the entry offer', () => {
    const services = quoteWizardOptions.serviceTypes;
    const bands = QUOTE_BUDGET_BANDS;

    expect(services.length, 'wizard must still expose service options').toBeGreaterThan(0);
    expect(bands, 'budget bands are exported from the pricing data module').toEqual([
      '85k - 150k ETB',
      '150k - 400k ETB',
      '400k - 1M ETB',
      '1M+ ETB',
    ]);

    for (const serviceType of services) {
      for (const budgetRange of bands) {
        const band = deriveEstimateBand({ serviceType, budgetRange });

        if (serviceType === 'SaaS Platform') {
          expect(band, `SaaS + ${budgetRange} must quote nothing`).toBeNull();
          continue;
        }

        expect(band, `${serviceType} + ${budgetRange} must produce a band`).not.toBeNull();
        expect(band.min, `${serviceType} + ${budgetRange} must not quote below the entry offer`).toBeGreaterThanOrEqual(ENTRY_OFFER_FLOOR);
        expect(band.max, `${serviceType} + ${budgetRange} max must not be below min`).toBeGreaterThanOrEqual(band.min);
      }
    }

    const webMidBand = deriveEstimateBand({ serviceType: 'Web Development', budgetRange: '150k - 400k ETB' });
    expect(webMidBand.min, 'web mid band min matches the published 150,000 ETB anchor').toBe(150000);
  });

  test('SaaS selection ends in a waitlist result with no numeric range', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/instant-quote`, { waitUntil: 'networkidle' });

    await dismissLeadModalIfOpen(page);
    await page.locator('.quote-option input[value="SaaS Platform"]').check();

    for (let index = 0; index < 3; index += 1) {
      await dismissLeadModalIfOpen(page);
      await page.getByRole('button', { name: 'Continue' }).click();
    }

    await dismissLeadModalIfOpen(page);
    await page.locator('.quote-step input[type="text"]').first().fill('Playwright Tester');
    await page.locator('.quote-step input[type="email"]').fill('playwright@example.com');
    await page.getByRole('button', { name: 'Generate Estimate' }).click();

    await expect(page.locator('.quote-result-range')).toHaveCount(0);
    await expect(page.getByText('tell us you want it').first()).toBeVisible();

    const resultCardText = await page.locator('.quote-result-card').innerText();
    expect(resultCardText, 'SaaS result must not render a numeric ETB range').not.toContain('ETB');
  });
});

test.describe('Phase 2 — founding-client pilot offer (TECH-05)', () => {
  test('pilot offer renders with exchange terms and founding-client framing', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const pilotOffer = page.getByTestId('pilot-offer');
    await expect(pilotOffer).toBeVisible();

    await expect(pilotOffer.getByText('Be among the first three implementation clients', { exact: true })).toBeVisible();
    await expect(pilotOffer.getByText('Open to the first three implementation clients.', { exact: true })).toBeVisible();
    await expect(pilotOffer.getByText('15–20%').first()).toBeVisible();
    await expect(pilotOffer.getByText('Permission to document your project as a case study', { exact: true })).toBeVisible();
    await expect(pilotOffer.getByText('A short written testimonial from your team', { exact: true })).toBeVisible();
    await expect(pilotOffer.getByText('Permission to refer you as a reference client', { exact: true })).toBeVisible();
    await expect(pilotOffer.getByText('Claim founding-client rate', { exact: true })).toBeVisible();
    await expect(pilotOffer.getByText('Founding-client rates apply to implementation projects only.', { exact: true })).toBeVisible();

    const pilotText = await pilotOffer.innerText();
    expect(pilotText, 'pilot copy must not render USD').not.toContain('USD');
    expect(pilotText, 'pilot copy must not render a dollar sign').not.toContain('$');
  });

  test('pilot offer section is visible and localized on home, pricing, and audit pages in all three languages', async ({ page }) => {
    const pilotRoutes = ['/', '/pricing', '/workflow-audit'];

    for (const language of ['en', 'am', 'om']) {
      for (const route of pilotRoutes) {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
        await dismissLeadModalInLanguage(page, language);

        if (language !== 'en') {
          await page.locator('.navbar-mobile-actions .language-switcher-select').selectOption(language);
          await expect.poll(async () => page.getAttribute('html', 'lang')).toBe(language);
        }

        const pilotOffer = page.getByTestId('pilot-offer');
        await expect(pilotOffer, `${language} ${route} must render the pilot section`).toBeVisible();
        await expect(pilotOffer.getByText(PILOT_HEADLINES_BY_LANGUAGE[language], { exact: true })).toBeVisible();
      }
    }
  });

  test('pilot offer CTA fires pilot_offer_cta_clicked with the page source', async ({ page }) => {
    await seedDataLayer(page);
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);
    await page.getByTestId('pilot-offer').getByRole('link', { name: 'Claim founding-client rate', exact: true }).click();
    await expectAnalyticsEventWithSource(page, 'pilot_offer_cta_clicked', 'home_pilot_offer');

    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);
    await page.getByTestId('pilot-offer').getByRole('link', { name: 'Claim founding-client rate', exact: true }).click();
    await expectAnalyticsEventWithSource(page, 'pilot_offer_cta_clicked', 'pricing_pilot_offer');
  });

  test('workflow audit page states the fixed 85k fee, 5-business-day delivery, and credit terms', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/workflow-audit`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.getByText('85,000 ETB').first()).toBeVisible();
    await expect(page.getByText('5 business days').first()).toBeVisible();
    await expect(page.getByText('credited toward').first()).toBeVisible();
    await expect(page.getByText('1-2 week audit cycle')).toHaveCount(0);
    await expect(page.getByTestId('pilot-offer')).toBeVisible();
  });
});

test.describe('Phase 7 — Fortune-500 visual system (TECH-21)', () => {
  test('N1 — every matrix route defaults light-first with no dark-mode toggle', async ({ page }) => {
    for (const route of routes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

      await expect(page.locator('html'), `${route} must default to the light theme`).toHaveAttribute('data-theme', 'light');
      await expect(page.locator('.dark-mode-toggle'), `${route} must have no dark-mode toggle`).toHaveCount(0);

      const bodyBackground = await page.locator('body').evaluate((element) => {
        const color = window.getComputedStyle(element).backgroundColor;
        const channels = color.match(/\d+(\.\d+)?/g)?.map(Number) ?? [];
        return { color, sum: channels.slice(0, 3).reduce((total, channel) => total + channel, 0) };
      });
      expect(
        bodyBackground.sum,
        `${route} body background must be light (rgb sum > 600), got ${bodyBackground.color}`
      ).toBeGreaterThan(600);
    }
  });

  test('N2 — every route renders exactly two near-black bands in fixed positions', async ({ page }) => {
    const bandRoutes = [...routes, '/services', '/workflow-audit'];

    for (const route of bandRoutes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

      const bandCount = await page.locator('.band-dark').count();
      expect(bandCount, `${route} must render exactly two dark bands, got ${bandCount}`).toBe(2);

      const positions = await page.evaluate(() => {
        const hero = document.querySelector('section#hero, section.page-hero');
        const footer = document.querySelector('footer');
        const bands = Array.from(document.querySelectorAll('.band-dark'));
        const follows = (reference, target) =>
          !!reference
          && !!target
          && (reference.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;

        return {
          firstBandAfterHero: bands.length > 0 && follows(hero, bands[0]),
          lastBandBeforeFooter: bands.length > 0 && follows(bands[bands.length - 1], footer),
        };
      });

      expect(positions.firstBandAfterHero, `${route}: the first dark band must sit after the hero`).toBe(true);
      expect(positions.lastBandBeforeFooter, `${route}: the last dark band must be the final block before the footer`).toBe(true);
    }
  });

  test('N3 — nav exposes five destinations, the services dropdown, and an instant-quote CTA', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const navLinks = page.locator('.navbar-links');
    await expect(navLinks).toBeVisible();
    await expect(navLinks.getByRole('button', { name: 'Services', exact: true })).toBeVisible();
    await expect(navLinks.getByRole('link', { name: 'Pricing', exact: true })).toBeVisible();
    await expect(navLinks.getByRole('link', { name: 'Instant Quote', exact: true })).toBeVisible();
    await expect(navLinks.getByRole('link', { name: 'Policy', exact: true })).toBeVisible();
    await expect(navLinks.getByRole('link', { name: 'Contact', exact: true })).toBeVisible();

    const cta = page.locator('.navbar-cta');
    await expect(cta, 'nav CTA must be labeled "Start a project"').toHaveText('Start a project');
    await expect(cta, 'nav CTA must lead to Instant Quote').toHaveAttribute('href', '/instant-quote');

    await navLinks.getByRole('button', { name: 'Services', exact: true }).click();
    const dropdown = page.locator('.navbar-services-menu');
    await expect(dropdown).toBeVisible();
    for (const label of ['Web', 'Mobile', 'SaaS', 'AI Automation', 'Workflow Audit']) {
      await expect(dropdown.getByText(label, { exact: true }), `dropdown must contain ${label}`).toBeVisible();
    }
    await expect(dropdown.locator('a'), 'dropdown must contain exactly five service destinations').toHaveCount(5);

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.navbar-mobile-actions .language-switcher-select')).toBeVisible();
  });

  test('N4 — zero imagery: no img elements and no url() background images', async ({ page }) => {
    const imageryRoutes = [...routes, '/services', '/workflow-audit'];

    for (const route of imageryRoutes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

      const imagery = await page.evaluate(() => {
        const imgCount = document.querySelectorAll('img').length;
        const urlBackgrounds = Array.from(document.querySelectorAll('body *')).filter((element) =>
          window.getComputedStyle(element).backgroundImage.includes('url(')
        );
        return { imgCount, urlBackgroundCount: urlBackgrounds.length };
      });

      expect(imagery.imgCount, `${route} must render no img elements`).toBe(0);
      expect(imagery.urlBackgroundCount, `${route} must render no url() background images`).toBe(0);
    }
  });

  test('N5 — price ranges and amounts render in JetBrains Mono', async ({ page }) => {
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

    const rangeFont = await page.locator('.quote-result-range').evaluate((element) =>
      window.getComputedStyle(element).fontFamily
    );
    expect(rangeFont, '.quote-result-range must render in JetBrains Mono').toContain('JetBrains Mono');

    await page.goto(`${BASE_URL}/web-development`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);
    const pricingFont = await page.locator('.pricing-amount').first().evaluate((element) =>
      window.getComputedStyle(element).fontFamily
    );
    expect(pricingFont, '.pricing-amount must render in JetBrains Mono').toContain('JetBrains Mono');
  });

  test('N6 — dual-mode accent: gold on dark bands, bronze on light surfaces', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const bandAccent = await page.locator('.band-dark .btn-primary, .band-dark a').first().evaluate((element) => {
      const style = window.getComputedStyle(element);
      return { color: style.color, backgroundColor: style.backgroundColor };
    });
    const isGold = bandAccent.color === 'rgb(232, 185, 98)'
      || bandAccent.backgroundColor === 'rgb(232, 185, 98)';
    expect(isGold, `dark-band accent must be gold, got ${JSON.stringify(bandAccent)}`).toBe(true);

    const lightAccent = await page.locator('.section-tag').first().evaluate((element) =>
      window.getComputedStyle(element).color
    );
    expect(lightAccent, 'light-surface accent must be bronze').toBe('rgb(138, 90, 43)');
  });

  test('N7 — Amharic headlines render in Noto Serif Ethiopic without transforms', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/policy`, { waitUntil: 'networkidle' });
    await page.locator('.navbar-mobile-actions .language-switcher-select').selectOption('am');
    await expect.poll(async () => page.getAttribute('html', 'lang')).toBe('am');

    const h1Styles = await page.locator('h1').first().evaluate((element) => {
      const style = window.getComputedStyle(element);
      return {
        fontFamily: style.fontFamily,
        fontStyle: style.fontStyle,
        textTransform: style.textTransform,
        letterSpacing: style.letterSpacing,
      };
    });

    expect(h1Styles.fontFamily, 'Amharic h1 must use Noto Serif Ethiopic').toContain('Noto Serif Ethiopic');
    expect(h1Styles.fontStyle, 'Amharic h1 must not be italicized').toBe('normal');
    expect(h1Styles.textTransform, 'Amharic h1 must not be uppercased').toBe('none');
    expect(
      parseFloat(h1Styles.letterSpacing),
      'Amharic h1 letter-spacing must not tighten below zero'
    ).toBeGreaterThanOrEqual(0);
  });

  test('N8 — reduced motion renders a static page with no page-open transition', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    await expect(page.locator('h1').first()).toBeVisible();

    const transitionStyles = await page.locator('.page-transition').evaluate((element) => {
      const style = window.getComputedStyle(element);
      return { transitionDuration: style.transitionDuration, opacity: style.opacity };
    });
    const isStatic = transitionStyles.transitionDuration === '0s'
      || transitionStyles.transitionDuration === '0ms'
      || Number(transitionStyles.opacity) === 1;
    expect(
      isStatic,
      `page-open must be static under reduced motion, got ${JSON.stringify(transitionStyles)}`
    ).toBe(true);
  });

  test('N9 — every hero is three-level: label, one headline, one supporting line', async ({ page }) => {
    for (const route of routes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

      const hero = page.locator('section#hero, section.page-hero').first();
      await expect(hero, `${route} must render a hero section`).toBeVisible();

      await expect(hero.locator('.page-hero-meta'), `${route} hero must contain the label level`).toHaveCount(1);
      await expect(hero.locator('h1'), `${route} hero must contain exactly one headline`).toHaveCount(1);
      await expect(hero.locator('p'), `${route} hero must contain exactly one supporting line`).toHaveCount(1);

      if (route === '/') {
        await expect(hero.locator('.hero-facts'), 'home hero must include the real-facts strip').toBeVisible();
      }
    }
  });
});
