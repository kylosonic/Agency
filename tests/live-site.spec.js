/**
 * ================================================================
 * RE-BASELINE DIFF RECORD — TECH-22 (Phase 8: Lumen Night Visual System)
 * ----------------------------------------------------------------
 * Date: 2026-08-10
 * Ticket: TECH-22 — E2E re-baseline (executed FIRST, in its TDD red state)
 * Direction: light-first expectations → Lumen Night dark expectations (B39–B48)
 * Governance: NB-25–35 (B38 convention) — the automated visitor checks are
 *             deliberately updated, written down, and reviewed before the
 *             redesign counts as done. Contract: docs/plans/phase8-lumen-visual-system.md §4,
 *             docs/behaviors/visual-system-lumen.md (B39–B48), design.md (project root).
 * Delta: 76 → 85 tests (6 MUTATE + 9 NEW N1..N9, 0 DELETE)
 * QA-review: APPROVED — 2026-08-11 — 2 consecutive independent green runs (D1–D3 resolved)
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
  const closeModalButton = page.locator('button[aria-label="Close pricing guide modal"], button[aria-label="Close message"]');
  if (await closeModalButton.first().isVisible().catch(() => false)) {
    await closeModalButton.first().click();
  }
}

/**
 * TECH-22 (B40): the two-register system renders ALL prose lowercase via CSS
 * (text-transform: lowercase on body). `innerText()` reflects the RENDERED
 * case, so case-sensitive text assertions against sentence-case source copy
 * drift. Normalize both sides to lowercase when asserting on rendered text.
 * Whitespace runs (including the &nbsp; U+00A0 separators used around brass
 * verb landmarks) collapse to a single space so phrase checks survive the
 * markup the design uses to render the verb.
 */
function normalizeProse(value) {
  return String(value).toLowerCase().replace(/\s+/g, ' ').trim();
}

/**
 * TECH-22 (B39): Chromium serialises oklch() components by dropping leading
 * zeros (oklch(76% 0.17 50) -> oklch(76% .17 50) in getComputedStyle).
 * Normalize both sides before comparing so the assertion stays tolerant of
 * CSS serialization while still requiring the authored molten-brass token.
 */
function normalizeOklchToken(value) {
  return String(value).replace(/\b0+(?=\.\d)/g, '');
}

async function seedDataLayer(page) {
  await page.addInitScript(() => {
    window.dataLayer = [];
  });
}

/**
 * TECH-22 (B39): the dark-canvas contract is expressed in OKLCH
 * (oklch(13% 0.014 265)-family), which Chromium serialises as oklch() in
 * computed styles. A plain rgb-sum check (Phase 7) cannot read those.
 * This probe classifies a computed color string as a light or dark surface:
 *  - rgb()/hex: light when the rgb sum exceeds 400
 *  - oklch():   light when lightness exceeds 0.35
 *  - transparent / alpha 0: not decisive (callers walk up the tree)
 */
async function installColorProbe(page) {
  await page.addInitScript(() => {
    window.__probeColor = (color) => {
      const nums = (color || '').match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
      if (nums.length === 0) {
        return { decisive: false, light: false, black: false };
      }
      if (/^oklch/i.test(color)) {
        const lightness = nums[0];
        const alpha = nums.length > 3 ? nums[3] : 1;
        if (alpha === 0) {
          return { decisive: false, light: false, black: false };
        }
        return {
          decisive: true,
          light: lightness > 0.35,
          black: lightness < 0.05,
        };
      }
      if (/^rgb/i.test(color)) {
        const alpha = nums.length > 3 ? nums[3] : 1;
        if (alpha === 0) {
          return { decisive: false, light: false, black: false };
        }
        const sum = nums.slice(0, 3).reduce((total, channel) => total + channel, 0);
        return { decisive: true, light: sum > 400, black: sum < 30 };
      }
      const sum = nums.slice(0, 3).reduce((total, channel) => total + channel, 0);
      return { decisive: true, light: sum > 400, black: sum < 30 };
    };
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

async function submitInstantQuoteRequest(
  page,
  {
    serviceValue = 'Web Development',
    budgetRange = '40k - 100k',
    timelineRange = '1-2 months',
    notes = 'Need a directional estimate for a serious project.',
    name = 'Playwright Tester',
    email = 'playwright@example.com',
    phone = '',
  } = {}
) {
  await dismissLeadModalIfOpen(page);
  await page.locator(`.quote-option input[value="${serviceValue}"]`).check();
  await page.getByLabel('Budget range').selectOption(budgetRange);
  await page.getByLabel('Timeline').selectOption(timelineRange);
  await page.locator('textarea').first().fill(notes);
  await page.getByLabel('Full name').fill(name);
  await page.getByLabel('Work email').fill(email);
  if (phone) {
    await page.getByLabel('Phone (optional)').fill(phone);
  }
  await page.getByRole('button', { name: 'Send Estimate Request' }).click();
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

  test('mobile nav works and the site defaults dark on home page', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await installColorProbe(page);
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
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    // B39 — the canvas is dark cool-violet (oklch(13% 0.014 265)-family), not pure black.
    const bodyBackground = await page.locator('body').evaluate((element) => {
      const color = window.getComputedStyle(element).backgroundColor;
      const probe = window.__probeColor(color);
      return { color, dark: probe.decisive && !probe.light, black: probe.black };
    });
    expect(bodyBackground.dark, `body background must be dark, got ${bodyBackground.color}`).toBe(true);
    expect(bodyBackground.black, `body background must not be pure black, got ${bodyBackground.color}`).toBe(false);
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

    await submitInstantQuoteRequest(page);

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

    // Audit: fixed 15,000 ETB entry offer
    await expect(page.getByText('15,000 ETB').first()).toBeVisible();

    // AI automation tiers: anchored from 40k / 100k / 200k+
    await expect(page.getByText('from 40,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 100,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 200,000+ ETB').first()).toBeVisible();

    // Monthly support band on every tier
    await expect(page.getByText('10,000 – 25,000 ETB / month').first()).toBeVisible();

    // Product builds: web from 20k / 50-80k / 150k+, mobile 40-60k / 80-150k / 200k+
    await expect(page.getByText('from 20,000 ETB').first()).toBeVisible();
    await expect(page.getByText('50,000 – 80,000 ETB').first()).toBeVisible();
    await expect(page.getByText('150,000+ ETB').first()).toBeVisible();
    await expect(page.getByText('40,000 – 60,000 ETB').first()).toBeVisible();
    await expect(page.getByText('80,000 – 150,000 ETB').first()).toBeVisible();
    await expect(page.getByText('200,000+ ETB').first()).toBeVisible();

    // SaaS cards show live monthly pricing + setup + annual "Save 2 months"
    await expect(page.getByText('3,500 ETB / month').first()).toBeVisible();
    await expect(page.getByText('Save 2 months').first()).toBeVisible();
    await expect(page.getByText('Setup 25,000 ETB').first()).toBeVisible();

    // Support & add-ons: annual maintenance band, no marketing retainers
    await expect(page.getByText('8,000 – 20,000 ETB / year').first()).toBeVisible();
    await expect(page.getByText('Visibility Boost')).toHaveCount(0);
    await expect(page.getByText('Lead Generator')).toHaveCount(0);
    await expect(page.getByText('Market Dominator')).toHaveCount(0);

    const supportBodyText = await page.locator('main').innerText();
    expect(supportBodyText, 'support tab must not render USD').not.toContain('USD');
    expect(supportBodyText, 'support tab must not render $').not.toContain('$');
  });

  test('pricing page exposes the downloadable current pricing sheet', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });

    const downloadButton = page.getByRole('button', { name: 'Download Current Pricing Sheet' });
    await expect(downloadButton).toBeVisible();
    await downloadButton.click();
    await expect(page.locator('.modal-slide-panel')).toBeVisible();
    await expect(page.getByText('Download the current ETB pricing sheet')).toBeVisible();
  });

  test('homepage hero is typography-led with real-facts strip', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await installColorProbe(page);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.locator('.hero-stats')).toHaveCount(0);
    await expect(page.locator('#agent-demo')).toHaveCount(0);
    await expect(page.locator('#impact-calculator')).toHaveCount(0);

    await expect(page.locator('.hero-copy')).toBeVisible();
    await expect(page.locator('.hero-facts')).toBeVisible();
    await expect(page.locator('.hero-facts')).toContainText('5 business days');

    // B43/B40 — hero facts render as ruled receipt rows: no boxed panel chrome,
    // hairline rules, mono UPPERCASE label. The Phase 7 editorial panel surface dies.
    const factsReceipt = await page.locator('.hero-facts').evaluate((element) => {
      const style = window.getComputedStyle(element);
      const label = element.querySelector('.hero-facts-label');
      const labelStyle = label ? window.getComputedStyle(label) : null;
      const firstRow = element.querySelector('.hero-fact-row');
      const rowStyle = firstRow ? window.getComputedStyle(firstRow) : null;
      const background = window.__probeColor(style.backgroundColor);
      return {
        borderRadius: style.borderRadius,
        lightBackground: background.decisive && background.light,
        labelFont: labelStyle ? labelStyle.fontFamily : '',
        labelTransform: labelStyle ? labelStyle.textTransform : '',
        rowRule: rowStyle ? rowStyle.borderBottomWidth : null,
      };
    });
    expect(factsReceipt.borderRadius, 'hero facts must be a ruled receipt, not a boxed panel (B43)').toBe('0px');
    expect(factsReceipt.lightBackground, 'hero facts must not sit on a light panel surface (B39)').toBe(false);
    expect(factsReceipt.labelFont, 'hero facts label must render in JetBrains Mono').toContain('JetBrains Mono');
    expect(factsReceipt.labelTransform, 'hero facts label must be UPPERCASE (mono register, B40)').toBe('uppercase');
    expect(factsReceipt.rowRule, 'hero fact rows must be separated by hairline rules (B43)').toBe('1px');

    const trustRowText = await page.locator('.hero-trust-row').innerText();
    expect(trustRowText, 'trust row must not mention USD').not.toContain('USD');

    const bodyText = await page.locator('main').innerText();
    expect(bodyText, 'homepage must not render dollar signs').not.toContain('$');
  });

  test('policy page states bank-transfer-only payment and keeps milestone terms', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/policy`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.getByText('bank transfer').first()).toBeVisible();
    await expect(page.getByText('CBE Birr').first()).toBeVisible();
    await expect(page.getByText('SaaS pricing is published').first()).toBeVisible();

    const bodyText = await page.locator('body').innerText();
    expect(bodyText, 'no international card handling mention').not.toContain('International Card Handling');
    expect(bodyText, 'no 15-20 percent handling fee').not.toContain('15–20%');
    expect(bodyText, 'no 15-20 percent handling fee').not.toContain('15-20%');
    expect(bodyText, 'no marketing terms section').not.toContain('Digital Marketing Terms');
    expect(bodyText, 'no 2-month annual discount claim').not.toContain('2-month');

    await expect(page.getByText('40%')).toBeVisible();
    await expect(page.getByText('30%')).toHaveCount(2);
    await expect(page.getByText('Ownership:').first()).toBeVisible();
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

  test('policy page still renders core sections after switching languages', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    for (const lang of ['am', 'om']) {
      await page.goto(`${BASE_URL}/policy`, { waitUntil: 'networkidle' });
      await page.locator('.navbar-mobile-actions .language-switcher-select').selectOption(lang);

      await expect.poll(async () => page.getAttribute('html', 'lang')).toBe(lang);
      await expect(page.locator('main h1').first()).toBeVisible();
      await expect(page.getByText('Bank transfer').first()).toBeVisible();
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

test.describe('Phase 9 — discount program and pilot removal (TECH-31)', () => {
  test('founding-client pilot messaging is gone from home and pricing', async ({ page }) => {
    for (const route of ['/', '/pricing']) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      const bodyText = normalizeProse(await page.locator('body').innerText());
      expect(bodyText, `${route} must not mention the founding-client pilot`).not.toContain('founding-client');
      expect(bodyText, `${route} must not render the 15–20% pilot discount`).not.toContain('15–20%');
      expect(bodyText, `${route} must not render the 15-20% pilot discount`).not.toContain('15-20%');
    }
  });

  test('web + ai bundle line renders exactly once, on the pricing page only', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(
      page.getByText('Web + AI automation booked together: 10% off', { exact: true }),
      'the bundle line must render exactly once on /pricing'
    ).toHaveCount(1);

    for (const route of ['/', '/services', '/web-development', '/mobile-development', '/saas-solutions', '/instant-quote', '/workflow-audit']) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);
      await expect(
        page.getByText('Web + AI automation booked together: 10% off', { exact: true }),
        `${route} must not repeat the bundle line`
      ).toHaveCount(0);
    }
  });

  test('discount features surface on pricing, web, mobile, and saas pages', async ({ page }) => {
    const surfaces = [
      { route: '/pricing', phrases: ['3 months free maintenance', '3-month bug-fix warranty'] },
      { route: '/web-development', phrases: ['3 months free maintenance'] },
      { route: '/mobile-development', phrases: ['3-month bug-fix warranty'] },
      { route: '/saas-solutions', phrases: ['Save 2 months'] },
    ];

    for (const { route, phrases } of surfaces) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);
      const pageText = normalizeProse(await page.locator('main').innerText());
      for (const phrase of phrases) {
        expect(pageText, `${route} must surface the discount feature "${phrase}"`).toContain(phrase.toLowerCase());
      }
    }
  });

  test('audit credit is stated as 100% on home, pricing, and workflow audit pages', async ({ page }) => {
    for (const route of ['/', '/pricing', '/workflow-audit']) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);
      const pageText = normalizeProse(await page.locator('main').innerText());
      expect(pageText, `${route} must state the audit fee is 100% credited`).toContain('100% credited');
    }
  });
});

test.describe('Phase 9 — copy trim gate (TECH-32)', () => {
  /**
   * QA gate 4 (pricing-revert-and-motion.md §5) evidence — rendered baseline
   * word counts captured 2026-08-11 BEFORE the trim (same surface this test
   * measures: `main` innerText, EN, `normalizeProse`). Values were produced
   * by `scripts/tech32-wordcount.tmp.mjs` against the pre-trim build.
   * Gate: post-trim <= 0.65 x baseline (>= 35% cut).
   *
   * C-2 ruling (@architect, 2026-08-11): Gate 4 applies per page.
   * · Home: full rendered `main` text must cut >= 35% (baseline 948 → limit 616).
   * · Pricing: the gate measures EDITORIAL copy only — hero paragraph, audit
   *   panel sentence, the three section subtitles, and the three AI tier scope
   *   sentences — because ~71% of /pricing rendered text is locked product
   *   data (P-1 figure surfaces: features, price rows, add-ons table, receipt
   *   outputs), which must not be cut. The editorial baseline (215 words) was
   *   extracted from the PRE-TRIM source (git HEAD 7eab150): hero p (24) +
   *   audit panel p (32) + subtitles (20/26/18) + AI scopes (34/30/31).
   */
  const BASELINE_WORDS = {
    '/': 948,
  };
  const PRICING_EDITORIAL_BASELINE_WORDS = 215;
  // Contract C-1/C-2 repeat targets: each message at most twice per page.
  const REPEAT_MESSAGES = [
    'audit fee credited',
    '100% credited',
    'etb only',
    'quoted individually',
    'no fake urgency',
    'no hidden currency',
    'waitlist only',
    'coming soon',
  ];

  test('/ rendered word count is at least 35% below the pre-trim baseline', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    // The TECH-33 marquee (M-5) is a locked-figure surface (G-5): its rows
    // repeat P-1 price/discount strings that already exist on the page. It
    // was added AFTER the pre-trim baseline was captured, so it is excluded
    // from the measurement — the same locked-data exemption the C-2 ruling
    // applies to /pricing. Everything else on Home keeps the >= 35% cut.
    const text = await page.locator('main').evaluate((main) => {
      const clone = main.cloneNode(true);
      clone.querySelectorAll('.marquee-strip').forEach((node) => node.remove());
      return String(clone.innerText).toLowerCase().replace(/\s+/g, ' ').trim();
    });
    const words = text.split(' ').filter((token) => token.length > 0).length;
    const limit = Math.floor(BASELINE_WORDS['/'] * 0.65);
    expect(
      words,
      `/ must cut at least 35% of rendered words (baseline ${BASELINE_WORDS['/']} -> limit ${limit}, got ${words})`
    ).toBeLessThanOrEqual(limit);
  });

  test('/pricing editorial copy is at least 35% below the pre-trim baseline (C-2 ruling)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    // The 8 editorial surfaces the ruling names: hero paragraph, audit panel
    // sentence, the three section subtitles, and the three AI tier scope
    // sentences. Locked product data (features, price rows, add-ons, receipts)
    // is excluded by construction.
    const editorial = await page.evaluate(() => {
      const selectors = [
        '.page-hero p',
        '#workflow-audit-pricing .glass-card p:not(.editorial-kicker)',
        '.section-header p',
        '.pricing-tier-editorial-card > p:not(.editorial-meta-line):not(.receipt-row__label):not(.editorial-price-tag)',
      ];
      return selectors.flatMap((selector) =>
        Array.from(document.querySelectorAll(selector)).map((node) => node.textContent ?? '')
      );
    });
    expect(editorial.length, '/pricing must render exactly 8 editorial strings').toBe(8);
    const words = normalizeProse(editorial.join(' ')).split(' ').filter((token) => token.length > 0).length;
    const limit = Math.floor(PRICING_EDITORIAL_BASELINE_WORDS * 0.65);
    expect(
      words,
      `/pricing editorial copy must cut at least 35% (baseline ${PRICING_EDITORIAL_BASELINE_WORDS} -> limit ${limit}, got ${words})`
    ).toBeLessThanOrEqual(limit);
  });

  test('no repeat message appears more than twice on home or pricing', async ({ page }) => {
    for (const route of ['/', '/pricing']) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      const text = normalizeProse(await page.locator('main').innerText());
      for (const message of REPEAT_MESSAGES) {
        const occurrences = text.split(message).length - 1;
        expect(
          occurrences,
          `${route} must not repeat "${message}" more than twice (got ${occurrences})`
        ).toBeLessThanOrEqual(2);
      }
    }
  });
});

test.describe('Phase 9 — editorial motion gate (TECH-33)', () => {
  const HERO_ROUTES = [
    '/',
    '/pricing',
    '/services',
    '/workflow-audit',
    '/web-development',
    '/mobile-development',
    '/saas-solutions',
    '/additional-services',
  ];
  // M-1: 120–200ms between phases, phases 400ms, per-word step 60ms (EN).
  // The hard contract bound is 1.2s TOTAL from first movement to last settle.
  const CHOREO_BUDGET_S = 1.2;

  test('M1 — every marketing hero choreography stays within the 1.2s budget', async ({ page }) => {
    for (const route of HERO_ROUTES) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      const hero = page.locator('section#hero, section.page-hero').first();
      await expect(hero, `${route} must render a hero section`).toBeVisible();

      const spans = await hero.evaluate((element) => {
        const nodes = element.querySelectorAll('.hero-choreo__item, .hero-choreo-word');
        return Array.from(nodes).map((node) => {
          const style = window.getComputedStyle(node);
          const delay = parseFloat(style.animationDelay) || 0;
          const duration = parseFloat(style.animationDuration) || 0;
          return { cls: String(node.className), delay, duration, end: delay + duration };
        });
      });
      expect(spans.length, `${route} hero must render choreography phases/words`).toBeGreaterThan(0);
      const maxEnd = Math.max(...spans.map((span) => span.end));
      expect(
        maxEnd,
        `${route} hero choreography must settle within ${CHOREO_BUDGET_S}s (got ${maxEnd}s — max ${spans
          .map((span) => `${span.cls.split(' ').pop()}:${span.end}s`)
          .join(', ')})`
      ).toBeLessThanOrEqual(CHOREO_BUDGET_S);
    }
  });

  test('M5 — exactly one marquee on home, slow (<= 20 px/s), with locked figures', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.locator('.marquee-strip'), 'home must render exactly one marquee').toHaveCount(1);
    const marqueeText = normalizeProse(await page.locator('.marquee-strip').innerText());
    expect(marqueeText, 'marquee must carry the locked audit figure').toContain('audit 15,000 etb');
    expect(marqueeText, 'marquee must carry the locked web anchor').toContain('web from 20,000 etb');
    expect(marqueeText, 'marquee must carry the free-maintenance discount').toContain('3 months free maintenance');

    const speed = await page.locator('.marquee-strip__track').evaluate((track) => {
      const style = window.getComputedStyle(track);
      const duration = parseFloat(style.animationDuration) || 0;
      return {
        duration,
        pxPerSec: duration > 0 ? track.scrollWidth / 2 / duration : Infinity,
        itemsPerGroup: track.querySelectorAll('.marquee-strip__group:first-child .marquee-strip__item').length,
        groups: track.querySelectorAll('.marquee-strip__group').length,
      };
    });
    expect(speed.duration, 'marquee must animate outside reduced motion').toBeGreaterThan(0);
    expect(speed.pxPerSec, `marquee must move at <= 20 px/s (got ${speed.pxPerSec.toFixed(1)} px/s)`).toBeLessThanOrEqual(20);
    expect(speed.groups, 'marquee must duplicate its content for a seamless loop').toBe(2);
    expect(speed.itemsPerGroup, 'marquee groups must repeat the same offer set').toBeGreaterThanOrEqual(4);

    // G-2: exactly one marquee per page — spot-check a second marketing page.
    await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);
    await expect(page.locator('.marquee-strip'), '/services must not repeat the marquee').toHaveCount(0);
  });

  test('M5 — marquee renders static under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const trackState = await page.locator('.marquee-strip__track').evaluate((track) => {
      const style = window.getComputedStyle(track);
      const dupGroup = track.querySelector('.marquee-strip__group[aria-hidden="true"]');
      return {
        duration: style.animationDuration,
        dupDisplay: dupGroup ? window.getComputedStyle(dupGroup).display : 'missing',
      };
    });
    expect(trackState.duration, 'marquee must not animate under reduced motion').toBe('0s');
    expect(trackState.dupDisplay, 'marquee duplicate group must hide under reduced motion').toBe('none');
  });

  test('M4 — the audit price counter lands exactly on the locked figure', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const counter = page.locator('.offer-ladder-row').first().locator('.offer-ladder-price strong .price-counter');
    await expect(counter, 'the offer ladder first row must carry a price counter').toHaveCount(1);
    await counter.scrollIntoViewIfNeeded();
    // Auto-retries until the count-up settles — must land exactly on 15,000 ETB.
    await expect(counter, 'the counter must land exactly on the locked audit figure').toHaveText('15,000 ETB');
  });

  test('M4 — reduced motion renders the price statically at the locked figure', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const counter = page.locator('.offer-ladder-row').first().locator('.offer-ladder-price strong .price-counter');
    await expect(counter).toHaveCount(1);
    await counter.scrollIntoViewIfNeeded();
    await expect(counter, 'reduced motion must render the final figure with no count-up').toHaveText('15,000 ETB');
  });

  test('M3 — card hover lift stays within the 4px limit and buttons within 2px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const card = page.locator('.editorial-two-column .glass-card').first();
    await card.scrollIntoViewIfNeeded();
    await card.hover();
    await page.waitForTimeout(350); // hover transition is 220ms — settle before reading

    const cardLift = await card.evaluate((element) => {
      const matrix = new DOMMatrixReadOnly(window.getComputedStyle(element).transform);
      return matrix.m42; // translateY in px (negative = lifted up)
    });
    expect(cardLift, `card hover lift must be a real lift of <= 4px (got ${cardLift}px)`).toBeLessThan(0);
    expect(cardLift, `card hover lift must not exceed 4px (got ${cardLift}px)`).toBeGreaterThanOrEqual(-4);

    const button = page.locator('.btn-primary').first();
    await button.hover();
    await page.waitForTimeout(350);
    const buttonLift = await button.evaluate((element) => {
      const matrix = new DOMMatrixReadOnly(window.getComputedStyle(element).transform);
      return matrix.m42;
    });
    expect(buttonLift, `button hover lift must not exceed 2px (got ${buttonLift}px)`).toBeGreaterThanOrEqual(-2);
  });
});

test.describe('Phase 9 — page transitions gate (TECH-34)', () => {
  test('M6 — route change renders within budget with a 250ms fade and no spinner', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const startedAt = Date.now();
    await page.locator('.navbar-links a[href="/pricing"]').click();
    await expect(page.locator('.ai-pricing-hero h1')).toBeVisible();
    const elapsed = Date.now() - startedAt;
    expect(elapsed, `route swap must render the target hero within budget (got ${elapsed}ms)`).toBeLessThan(3000);

    const declared = await page.locator('.page-transition').getAttribute('data-transition-duration');
    expect(declared, 'incoming page must declare the 200-300ms transition duration').toBe('250');
    await expect(page.locator('.route-loader-ring'), 'route swaps must not show a spinner ring').toHaveCount(0);
  });

  test('M6 — back and forward navigation both render with the transition', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await page.locator('.navbar-links a[href="/pricing"]').click();
    await expect(page.locator('.ai-pricing-hero h1')).toBeVisible();

    await page.goBack();
    await expect(page.locator('#home-hero-title'), 'back must restore the home hero').toBeVisible();

    await page.goForward();
    await expect(page.locator('.ai-pricing-hero h1'), 'forward must restore the pricing hero').toBeVisible();
    const declared = await page.locator('.page-transition').getAttribute('data-transition-duration');
    expect(declared, 'forward navigation must declare the same transition').toBe('250');
  });

  test('M6 — reduced motion swaps routes instantly (duration 0)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await page.locator('.navbar-links a[href="/pricing"]').click();
    await expect(page.locator('.ai-pricing-hero h1')).toBeVisible();
    const declared = await page.locator('.page-transition').getAttribute('data-transition-duration');
    expect(declared, 'reduced motion must declare an instant swap (0ms)').toBe('0');
  });
});

test.describe('Phase 9 — contact section spacing (owner-reported regression)', () => {
  // Owner: "no padding around the sections and lines are overlapping".
  // Root cause: .contact-form-card / .contact-info-card had zero interior
  // padding (content flush against card hairlines; input borders merged with
  // card borders) and the mobile media queries padded a dead class
  // (.contact-info-item) so the info card was never padded at any viewport.
  const MIN_CARD_PADDING_PX = 15; // 0.95rem base floor on the smallest breakpoint

  test('contact cards carry interior padding on desktop and mobile', async ({ page }) => {
    for (const viewport of [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'mobile', width: 390, height: 844 },
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      const paddings = await page.locator('.contact-info-card, .contact-form-card').evaluateAll((cards) =>
        cards.map((card) => {
          const style = window.getComputedStyle(card);
          return {
            cls: String(card.className),
            top: parseFloat(style.paddingTop) || 0,
            left: parseFloat(style.paddingLeft) || 0,
            right: parseFloat(style.paddingRight) || 0,
            bottom: parseFloat(style.paddingBottom) || 0,
          };
        })
      );

      expect(paddings.length, `${viewport.name}: both contact cards must render`).toBe(2);
      for (const card of paddings) {
        for (const edge of ['top', 'left', 'right', 'bottom']) {
          expect(
            card[edge],
            `${viewport.name}: ${card.cls} must keep ${edge} padding >= ${MIN_CARD_PADDING_PX}px (got ${card[edge]}px)`
          ).toBeGreaterThanOrEqual(MIN_CARD_PADDING_PX);
        }
      }
    }
  });

  test('offer-ladder price and detail lines keep a visible gap', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const gap = await page.locator('.offer-ladder-price').first().evaluate((element) => {
      const style = window.getComputedStyle(element);
      return parseFloat(style.rowGap) || parseFloat(style.gap) || 0;
    });
    expect(gap, `offer-ladder price gap must stay >= 0.3rem (got ${gap}px)`).toBeGreaterThanOrEqual(4);
  });
});

test.describe('Analytics smoke assertions', () => {
  test('tracks page views and instant-quote submission events', async ({ page }) => {
    await seedDataLayer(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/instant-quote`, { waitUntil: 'networkidle' });

    await expectAnalyticsEvent(page, 'page_view');

    await submitInstantQuoteRequest(page, {
      notes: 'Analytics smoke test estimate request.',
      name: 'Playwright Analytics Tester',
      email: 'analytics-playwright@example.com',
    });

    await expect(page.locator('.quote-result-card')).toBeVisible();
    await expectAnalyticsEvent(page, 'instant_quote_submitted');
    await expectAnalyticsEvent(page, 'instant_quote_outcome');
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
    await expectAnalyticsEventWithSource(page, 'contact_channel_clicked', 'home_contact_card');

    await page.locator('.footer-links a[href^="mailto:"]').first().click();
    await expectAnalyticsEventWithSource(page, 'contact_channel_clicked', 'footer');
  });

  test('core commercial pages no longer promote the stale pricing guide', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const routesToCheck = ['/', '/pricing', '/workflow-audit', '/web-development', '/mobile-development', '/saas-solutions', '/policy'];

    for (const route of routesToCheck) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      const bodyText = await page.locator('body').innerText();
      expect(bodyText, `${route} must not promote the stale pricing guide`).not.toContain('Pricing Guide');
    }
  });
});

test.describe('Phase 2 — wizard/pricing unification (TECH-04)', () => {
  test('wizard and pricing page quote the same numbers for the same web scope', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/instant-quote`, { waitUntil: 'networkidle' });

    await submitInstantQuoteRequest(page);

    const rangeText = normalizeProse(await page.locator('.quote-result-range').innerText());
    expect(rangeText, 'web mid band must quote 50,000 ETB').toContain('50,000 etb');
    expect(rangeText, 'web mid band must quote 150,000 ETB').toContain('150,000 etb');
  });

  test('wizard offers no below-entry budget option and no add-on-only service', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/instant-quote`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.getByText('Branding and Additional Services')).toHaveCount(0);

    const budgetOptions = await page.getByLabel('Budget range').locator('option').allTextContents();
    expect(budgetOptions, 'budget options must start at the 15k entry band').toEqual([
      '15k - 40k',
      '40k - 100k',
      '100k - 250k',
      '250k+',
    ]);
    expect(budgetOptions, 'no Under 50k ETB option').not.toContain('Under 50k ETB');
  });

  test('entry floor holds even with every integration selected', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/instant-quote`, { waitUntil: 'networkidle' });

    // TECH-29 (D3): under full-suite load the wizard surface can render
    // slower than the default expect budget — wait on a stable selector
    // instead of racing the first interaction. The business invariant below
    // is asserted exactly as before (no logic change).
    await expect(page.locator('.quote-option input[value="Web Development"]')).toBeVisible({ timeout: 15000 });

    await submitInstantQuoteRequest(page, {
      budgetRange: '15k - 40k',
      timelineRange: '2-4 weeks',
      notes: 'Keep the scope as lean as possible.',
    });

    // Same load guard before reading the result surface.
    await expect(page.locator('.quote-result-range')).toBeVisible({ timeout: 15000 });
    const rangeText = normalizeProse(await page.locator('.quote-result-range').innerText());
    expect(rangeText, 'entry band with all integrations must floor at the 20,000 ETB web entry anchor').toContain('20,000 etb');
    expect(rangeText, 'no wizard band may quote below the 15,000 ETB entry offer').not.toContain('15,000 etb');
  });

  test('exhaustive floor property: every service × budget combo quotes at or above the entry offer', () => {
    const services = quoteWizardOptions.serviceTypes;
    const bands = QUOTE_BUDGET_BANDS;

    expect(services.length, 'wizard must still expose service options').toBeGreaterThan(0);
    expect(bands, 'budget bands are exported from the pricing data module').toEqual([
      '15k - 40k',
      '40k - 100k',
      '100k - 250k',
      '250k+',
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

    const webMidBand = deriveEstimateBand({ serviceType: 'Web Development', budgetRange: '40k - 100k' });
    expect(webMidBand.min, 'web mid band min matches the published 50,000 ETB anchor').toBe(50000);
  });

  test('SaaS selection ends in a live-pricing result with no numeric range', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/instant-quote`, { waitUntil: 'networkidle' });

    await submitInstantQuoteRequest(page, {
      serviceValue: 'SaaS Platform',
      notes: 'Comparing SaaS plans for our organization.',
    });

    await expect(page.locator('.quote-result-range')).toHaveCount(0);
    await expect(page.getByText('Live SaaS pricing is on the pricing page').first()).toBeVisible();

    const resultCardText = await page.locator('.quote-result-card').innerText();
    expect(resultCardText, 'SaaS result must not render a numeric ETB range').not.toContain('ETB');
  });
});

test.describe('Phase 2 — audit-first hierarchy', () => {
  test('home, pricing, and workflow audit pages foreground the Workflow Audit first', async ({ page }) => {
    const routesToCheck = ['/', '/pricing', '/workflow-audit'];

    for (const route of routesToCheck) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      const pageText = normalizeProse(await page.locator('main').innerText());
      // Phase 8 (B41/B43) rewrote the audit pitch: home and pricing still carry
      // the literal "Workflow Audit" phrase, while the audit page itself leads
      // with the verb-first line "audit the workflow before the build."
      // Accept both — the invariant is audit-first framing on all three routes.
      const auditFirst = pageText.includes('workflow audit') || pageText.includes('audit the workflow');
      expect(auditFirst, `${route} must foreground the workflow audit`).toBe(true);
      expect(pageText, `${route} must not promote the stale pricing guide`).not.toContain('pricing guide');
    }
  });

  test('workflow audit page states the fixed 15k fee, 5-business-day delivery, and credit terms', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/workflow-audit`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.getByText('15,000 ETB').first()).toBeVisible();
    await expect(page.getByText('5 business days').first()).toBeVisible();
    await expect(page.getByText('credited toward').first()).toBeVisible();
    await expect(page.getByText('1-2 week audit cycle')).toHaveCount(0);
  });

  test('SaaS page shows live prices with annual savings and no waitlist framing', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/saas-solutions`, { waitUntil: 'networkidle' });

    const pageText = normalizeProse(await page.locator('main').innerText());
    expect(pageText, 'SaaS page must show live monthly pricing').toContain('3,500 etb / month');
    expect(pageText, 'SaaS page must show the annual savings note').toContain('save 2 months');
    expect(pageText, 'SaaS page must not frame the offer as waitlist only').not.toContain('waitlist only');
    expect(pageText, 'SaaS page must not promote the stale pricing guide').not.toContain('pricing guide');
    expect(pageText, 'SaaS page must not frame the product as coming soon').not.toContain('coming soon');
  });
});

test.describe('Phase 8 — Lumen Night visual system (TECH-22)', () => {
  test('N1 — every matrix route defaults dark with no dark-mode toggle', async ({ page }) => {
    await installColorProbe(page);
    for (const route of routes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

      await expect(page.locator('html'), `${route} must default to the dark theme`).toHaveAttribute('data-theme', 'dark');
      await expect(page.locator('.dark-mode-toggle'), `${route} must have no dark-mode toggle`).toHaveCount(0);

      const bodyBackground = await page.locator('body').evaluate((element) => {
        const color = window.getComputedStyle(element).backgroundColor;
        const probe = window.__probeColor(color);
        return { color, dark: probe.decisive && !probe.light, black: probe.black };
      });
      expect(
        bodyBackground.dark,
        `${route} body background must be dark cool-violet (oklch(13% 0.014 265)-family), got ${bodyBackground.color}`
      ).toBe(true);
      expect(bodyBackground.black, `${route} body background must not be pure black, got ${bodyBackground.color}`).toBe(false);
    }
  });

  test('N2 — no light-paper sections anywhere; the brass final-CTA band closes the page', async ({ page }) => {
    await installColorProbe(page);
    const bandRoutes = [...routes, '/services', '/workflow-audit'];
    const marketingRoutes = ['/', '/services', '/workflow-audit', '/web-development', '/mobile-development', '/saas-solutions', '/additional-services'];

    for (const route of bandRoutes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      // B39 — dark from edge to edge: every main section must sit on the dark canvas
      // family (paper/paper-2/paper-3). Any light surface is a Phase 7 leftover.
      const lightSections = await page.evaluate(() => {
        const surfaceOf = (element) => {
          let node = element;
          while (node && node !== document.documentElement) {
            const probe = window.__probeColor(window.getComputedStyle(node).backgroundColor);
            if (probe.decisive) {
              return probe.light;
            }
            node = node.parentElement;
          }
          return window.__probeColor(window.getComputedStyle(document.documentElement).backgroundColor).light;
        };

        return Array.from(document.querySelectorAll('main section'))
          .filter((section) => surfaceOf(section))
          .map((section) => section.id || section.className || section.tagName);
      });
      expect(lightSections, `${route} must have no light-paper sections (B39)`).toEqual([]);

      // The page closes on a dark band (brass final-CTA band on marketing pages).
      // App.jsx wraps every route in .page-transition, so sections are never
      // direct children of main — use the descendant selector. Most sections
      // (incl. the closing contact/CTA bands) sit transparent on the dark
      // canvas — only .band-dark paints paper-2 — so B39 is evaluated on the
      // effective surface, exactly like the light-sections walk above.
      const finalBand = await page.locator('main section').last().evaluate((section) => {
        const surfaceOf = (element) => {
          let node = element;
          while (node && node !== document.documentElement) {
            const probe = window.__probeColor(window.getComputedStyle(node).backgroundColor);
            if (probe.decisive) {
              return probe;
            }
            node = node.parentElement;
          }
          return window.__probeColor(window.getComputedStyle(document.documentElement).backgroundColor);
        };
        const probe = surfaceOf(section);
        return {
          className: section.className || section.id,
          dark: probe.decisive && !probe.light,
        };
      });
      expect(finalBand.dark, `${route}: the final band (${finalBand.className}) must be dark (B39)`).toBe(true);

      if (marketingRoutes.includes(route)) {
        await expect(
          page.locator('main section').last().locator('.btn-primary').first(),
          `${route}: the final band must carry a brass CTA`
        ).toBeVisible();
      }
    }
  });

  test('N3 — nav exposes five destinations, the services dropdown, and a workflow-audit CTA', async ({ page }) => {
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
    await expect(cta, 'nav CTA must be labeled "Book Workflow Audit"').toHaveText('Book Workflow Audit');
    await expect(cta, 'nav CTA must lead to Workflow Audit').toHaveAttribute('href', '/workflow-audit');

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
    await submitInstantQuoteRequest(page);
    await expect(page.locator('.quote-result-range')).toBeVisible();

    const rangeFont = await page.locator('.quote-result-range').evaluate((element) =>
      window.getComputedStyle(element).fontFamily
    );
    expect(rangeFont, '.quote-result-range must render in JetBrains Mono').toContain('JetBrains Mono');

    await page.goto(`${BASE_URL}/web-development`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);
    const pricingFont = await page.locator('.editorial-price-tag').first().evaluate((element) =>
      window.getComputedStyle(element).fontFamily
    );
    expect(pricingFont, '.editorial-price-tag must render in JetBrains Mono').toContain('JetBrains Mono');
  });

  test('N6 — the single molten-brass accent drives every primary CTA', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    // design.md exports: --color-accent: oklch(76% 0.17 50). The phase-7 dual-mode
    // gold/bronze pair is gone — one molten-brass accent drives the system (B39).
    const accentToken = await page.evaluate(() => {
      const root = window.getComputedStyle(document.documentElement);
      return (root.getPropertyValue('--color-accent') || root.getPropertyValue('--accent')).trim();
    });
    expect(
      normalizeOklchToken(accentToken),
      'the accent token must be the molten-brass oklch value'
    ).toBe(normalizeOklchToken('oklch(76% 0.17 50)'));

    const primaryButton = await page.locator('.btn-primary').first().evaluate((element) => {
      const style = window.getComputedStyle(element);
      return { backgroundColor: style.backgroundColor, color: style.color };
    });
    expect(
      primaryButton.backgroundColor,
      `primary CTA must be filled with brass (oklch), got ${primaryButton.backgroundColor}`
    ).toContain('oklch');
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

  test('N9 — every hero carries the mono eyebrow, one headline, and one supporting line', async ({ page }) => {
    for (const route of routes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

      const hero = page.locator('section#hero, section.page-hero').first();
      await expect(hero, `${route} must render a hero section`).toBeVisible();

      // B41/B40 — the label level is the mono UPPERCASE eyebrow (NN · ROLE) rendered by
      // JetBrains Mono. The Phase 7 badge/chip set is replaced by the eyebrow system.
      const eyebrowCount = await hero.evaluate((element) =>
        Array.from(element.querySelectorAll('*')).filter((node) => {
          const style = window.getComputedStyle(node);
          const text = node.textContent?.trim() ?? '';
          return style.fontFamily.includes('JetBrains Mono')
            && style.textTransform === 'uppercase'
            && /^\d{2} · /.test(text);
        }).length
      );
      expect(eyebrowCount, `${route} hero must carry exactly one mono UPPERCASE eyebrow (NN · ROLE)`).toBe(1);

      await expect(hero.locator('h1'), `${route} hero must contain exactly one headline`).toHaveCount(1);
      await expect(hero.locator('p'), `${route} hero must contain exactly one supporting line`).toHaveCount(1);

      if (route === '/') {
        await expect(hero.locator('.hero-facts'), 'home hero must include the real-facts strip').toBeVisible();
      }
    }
  });
});

test.describe('Phase 8 — Lumen Night contract (TECH-22, NEW)', () => {
  test('N1 — dark canvas and the molten-brass accent are present on every matrix route', async ({ page }) => {
    await installColorProbe(page);
    for (const route of routes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      // B39 — dark cool-violet canvas (oklch(13% 0.014 265)-family), never pure black.
      const canvas = await page.locator('body').evaluate((element) => {
        const color = window.getComputedStyle(element).backgroundColor;
        const probe = window.__probeColor(color);
        return { color, dark: probe.decisive && !probe.light, black: probe.black };
      });
      expect(canvas.dark, `${route} canvas must be dark (oklch(13% 0.014 265)-family), got ${canvas.color}`).toBe(true);
      expect(canvas.black, `${route} canvas must not be pure black, got ${canvas.color}`).toBe(false);

      // index.html — theme-color flips from the light #fafaf9 to the dark #14141c.
      const themeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
      expect(themeColor, `${route} must set the dark theme-color`).toBe('#14141c');

      // design.md — one molten-brass accent token drives the whole system.
      const accentToken = await page.evaluate(() => {
        const root = window.getComputedStyle(document.documentElement);
        return (root.getPropertyValue('--color-accent') || root.getPropertyValue('--accent')).trim();
      });
      expect(
        normalizeOklchToken(accentToken),
        `${route} must expose the molten-brass accent token (B39/design.md)`
      ).toBe(normalizeOklchToken('oklch(76% 0.17 50)'));
    }
  });

  test('N2 — lowercase Instrument Serif display with a mono UPPERCASE eyebrow (two-register)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    // B41 — display headlines render in Instrument Serif; B40 — prose renders lowercase.
    const h1Styles = await page.locator('h1').first().evaluate((element) => {
      const style = window.getComputedStyle(element);
      return { fontFamily: style.fontFamily, textTransform: style.textTransform };
    });
    expect(h1Styles.fontFamily, 'display headline must render in Instrument Serif').toContain('Instrument Serif');
    expect(h1Styles.textTransform, 'headline prose must render lowercase (B40)').toBe('lowercase');

    // B41 — body copy renders in Geist; the body rule lowercases every prose surface.
    const bodyStyles = await page.locator('body').evaluate((element) => {
      const style = window.getComputedStyle(element);
      return { fontFamily: style.fontFamily, textTransform: style.textTransform };
    });
    expect(bodyStyles.fontFamily, 'body copy must render in Geist').toContain('Geist');
    expect(bodyStyles.textTransform, 'body rule must lowercase all prose (B40)').toBe('lowercase');

    // B41 — the hero eyebrow renders mono UPPERCASE in NN · ROLE form.
    const eyebrow = await page.locator('section#hero, section.page-hero').first().evaluate((hero) => {
      const match = Array.from(hero.querySelectorAll('*')).find((node) => {
        const style = window.getComputedStyle(node);
        const text = node.textContent?.trim() ?? '';
        return style.fontFamily.includes('JetBrains Mono') && /^\d{2} · /.test(text);
      });
      if (!match) {
        return null;
      }
      const style = window.getComputedStyle(match);
      return { text: match.textContent.trim(), transform: style.textTransform };
    });
    expect(eyebrow, 'home hero must carry a mono eyebrow in NN · ROLE form').not.toBeNull();
    expect(eyebrow.text, 'eyebrow must follow the NN · ROLE pattern').toMatch(/^\d{2} · /);
    expect(eyebrow.transform, 'eyebrow must render UPPERCASE (mono register, B40)').toBe('uppercase');
  });

  test('N3 — one hand-built apparatus in each marketing hero; no orb class anywhere', async ({ page }) => {
    const marketingRoutes = ['/', '/services', '/workflow-audit', '/web-development', '/mobile-development', '/saas-solutions'];

    for (const route of marketingRoutes) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      // B42 — exactly one hand-built apparatus inside the marketing hero.
      const hero = page.locator('section#hero, section.page-hero').first();
      await expect(hero, `${route} must render a hero section`).toBeVisible();
      await expect(hero.locator('.apparatus'), `${route} hero must contain exactly one apparatus (B42)`).toHaveCount(1);

      // B42 — the apparatus carries 3-5 mono leader-line callouts.
      const calloutCount = await hero.locator('.apparatus .callout').count();
      expect(calloutCount, `${route} apparatus must carry at least 3 callouts`).toBeGreaterThanOrEqual(3);
      expect(calloutCount, `${route} apparatus must carry no more than 5 callouts`).toBeLessThanOrEqual(5);

      // B39/B42 — no glowing orb anywhere on the page (the apparatus is the only emitter).
      await expect(page.locator('[class*="orb"]'), `${route} must render no orb class`).toHaveCount(0);
    }

    // Rate-sheet, content, and form pages must NOT carry an apparatus (B42).
    for (const route of ['/pricing', '/policy', '/instant-quote', '/book-discovery-call']) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await expect(page.locator('.apparatus'), `${route} is a rate-sheet/content/form page — no apparatus`).toHaveCount(0);
    }
  });

  test('N4 — the meter strip sits under each marketing hero with real end-labels', async ({ page }) => {
    const meters = [
      { route: '/', left: 'AUDIT · 15,000 ETB · FIXED', right: 'DELIVERY · 5 BUSINESS DAYS' },
      { route: '/services', left: 'AUTOMATION · FROM 40,000 ETB', right: 'MILESTONES · 40/30/30' },
      { route: '/workflow-audit', left: 'AUDIT · 15,000 ETB · FIXED', right: 'DELIVERY · 5 BUSINESS DAYS' },
      { route: '/web-development', left: 'WEB · FROM 20,000 ETB', right: 'MILESTONES · 40/30/30' },
      { route: '/mobile-development', left: 'MOBILE · FROM 40,000 ETB', right: 'MILESTONES · 40/30/30' },
      { route: '/saas-solutions', left: 'SAAS · FROM 3,500 ETB / MO', right: 'ANNUAL · SAVE 2 MONTHS' },
    ];

    for (const { route, left, right } of meters) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      // B45 — the full-bleed meter strip sits under the hero, after it in document order.
      const meter = page.locator('.meter-strip');
      await expect(meter, `${route} must render the meter strip under the hero (B45)`).toBeVisible();

      const order = await page.evaluate(() => {
        const hero = document.querySelector('section#hero, section.page-hero');
        const strip = document.querySelector('.meter-strip');
        if (!hero || !strip) {
          return null;
        }
        return (hero.compareDocumentPosition(strip) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
      });
      expect(order, `${route}: the meter strip must sit after the hero (B45)`).toBe(true);

      // B45/B45a — mono end-labels carry the locked figures (markup renders the case
      // via CSS, so match case-insensitively; the en-dash is preserved).
      const meterText = await meter.innerText();
      const normalized = meterText.toUpperCase();
      expect(normalized, `${route} meter must carry the left end-label`).toContain(left);
      expect(normalized, `${route} meter must carry the right end-label`).toContain(right);
      expect(normalized.indexOf(left), `${route} meter left label must precede the right label`).toBeLessThan(normalized.indexOf(right));
    }
  });

  test('N5 — pricing renders a ruled receipt rate sheet (B43)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    // B43 — no tier-card icon tops anywhere on the rate sheet.
    await expect(
      page.locator('.pricing-tier-editorial-card .ai-preview-icon, .editorial-track-card .ai-preview-icon'),
      'tier rows must not carry icon tops (B43)'
    ).toHaveCount(0);

    // B43 — the pricing surface is a ruled receipt: rows with mono UPPERCASE labels.
    const rows = page.locator('.pricing-tier-editorial-card, .editorial-track-card, .offer-ladder-row');
    const rowCount = await rows.count();
    expect(rowCount, 'the pricing page must render rate rows').toBeGreaterThanOrEqual(3);

    const receipt = await rows.first().evaluate((row) => {
      const style = window.getComputedStyle(row);
      const labelCount = Array.from(row.querySelectorAll('*')).filter((node) => {
        const nodeStyle = window.getComputedStyle(node);
        return nodeStyle.textTransform === 'uppercase' && nodeStyle.fontFamily.includes('JetBrains Mono');
      }).length;
      return { rowRule: style.borderTopWidth, labelCount };
    });
    expect(receipt.rowRule, 'receipt rows must be ruled with hairline borders (B43)').toBe('1px');
    expect(receipt.labelCount, 'receipt rows must carry mono UPPERCASE labels (B43)').toBeGreaterThan(0);

    // B43 — ETB figures render in JetBrains Mono with tabular numerals.
    const figure = await page.locator('.editorial-price-tag').first().evaluate((element) => {
      const style = window.getComputedStyle(element);
      return { font: style.fontFamily, variant: style.fontVariantNumeric };
    });
    expect(figure.font, 'ETB figures must render in JetBrains Mono').toContain('JetBrains Mono');
    expect(figure.variant, 'ETB figures must use tabular numerals').toContain('tabular-nums');
  });

  test('N6 — services page renders ruled rows with mono numerals (B43/B41)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    // The service grid is a ruled receipt: every row carries a mono numeral (01, 02, ...).
    const numerals = await page.locator('#service-lanes article').evaluateAll((cards) =>
      cards.map((card) => {
        const numeral = Array.from(card.querySelectorAll('*')).find((node) => {
          const style = window.getComputedStyle(node);
          return style.fontFamily.includes('JetBrains Mono') && /^\d{2}$/.test(node.textContent?.trim() ?? '');
        });
        return numeral ? numeral.textContent.trim() : null;
      })
    );
    expect(numerals.length, 'the services grid must render ruled rows (B43)').toBeGreaterThanOrEqual(3);
    for (const numeral of numerals) {
      expect(numeral, 'every service row must carry a mono numeral').toMatch(/^\d{2}$/);
    }
    expect(numerals, 'service row numerals must start at 01').toContain('01');

    // B43 — rows are separated by hairline rules.
    const rowRule = await page.locator('#service-lanes article').first().evaluate((row) =>
      window.getComputedStyle(row).borderTopWidth
    );
    expect(rowRule, 'service rows must be ruled with hairline rules (B43)').toBe('1px');
  });

  test('N7 — the nav is a flat hairline bar with no floating pill (B46)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const navInner = page.locator('.navbar-inner');
    await expect(navInner, 'navbar-inner must render').toBeVisible();

    const navStyles = await navInner.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return {
        borderRadius: style.borderRadius,
        boxShadow: style.boxShadow,
        backdropFilter: style.backdropFilter,
        borderBottomWidth: style.borderBottomWidth,
      };
    });
    expect(navStyles.borderRadius, `the nav must be a flat bar, not a floating pill (B46), got ${navStyles.borderRadius}`).toBe('0px');
    expect(navStyles.boxShadow, 'the nav must not float on a shadow (B46)').toBe('none');
    expect(navStyles.backdropFilter, 'the nav must not blur (B46 bans backdrop-filter)').toBe('none');
    expect(navStyles.borderBottomWidth, 'the flat nav must sit on a hairline rule (B46)').toBe('1px');

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.navbar-mobile-actions .language-switcher-select')).toBeVisible();
  });

  test('N8 — the footer is a statement footer, not a four-column link maze (B46)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Ft5 Statement — one statement sentence, hairline, then minimal links + contact.
    const footer = page.locator('footer.footer');
    await expect(footer).toBeVisible();

    const footerStats = await footer.evaluate((element) => {
      const columns = Array.from(element.querySelectorAll('.footer-grid > div, .footer-grid > section'));
      const linkColumnCount = columns.filter((column) => column.querySelectorAll('a').length > 1).length;
      const statement = Array.from(element.querySelectorAll('p'))
        .map((paragraph) => paragraph.textContent?.trim() ?? '')
        .find((text) => text.length >= 60) ?? null;
      const connectColumn = columns.find((column) => /connect/i.test(column.textContent ?? ''));
      const connectLinks = connectColumn ? Array.from(connectColumn.querySelectorAll('a')) : [];
      return {
        columnCount: columns.length,
        linkColumnCount,
        statement,
        mailtoFirst: connectLinks.length > 0 && (connectLinks[0].getAttribute('href') ?? '').startsWith('mailto:'),
      };
    });

    expect(footerStats.linkColumnCount, 'the footer must not be a four-column link maze (B46)').toBeLessThan(4);
    expect(footerStats.columnCount, 'the footer must collapse to statement + minimal links (B46)').toBeLessThan(5);
    expect(footerStats.statement, 'the footer must open with one statement sentence (Ft5)').not.toBeNull();
    expect(footerStats.mailtoFirst, 'Connect must keep the mailto: anchor first (E2E hook)').toBe(true);
  });

  test('N9 — reduced motion renders a fully static page (B47)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    await expect(page.locator('h1').first()).toBeVisible();

    // B47 — no animation classes are active: reveal/stagger/page/chrome transitions
    // resolve to 0s and nothing sits below final opacity. Hover-only chrome (floating
    // CTA, chat dock, scroll-top) is included — under reduced motion it must be static.
    // TECH-33 (M-1/M-4/M-5): the hero choreography phases/words, price counter, and
    // marquee track join the freeze list — they must resolve to 0s and full opacity.
    const activeAnimations = await page.evaluate(() => {
      const animated = document.querySelectorAll(
        '.page-transition, .navbar, .navbar-inner, .mobile-nav, .floating-cta-container, .floating-cta-btn, '
        + '.live-chat-dock, .live-chat-toggle, .visible, .stagger-children, .staggered-text, .apparatus, .meter-strip, '
        + '.hero-choreo, .hero-choreo__item, .hero-choreo-word, .marquee-strip, .marquee-strip__track, .price-counter'
      );
      return Array.from(animated).filter((element) => {
        const style = window.getComputedStyle(element);
        const className = String(element.className || '');
        const isRevealClass = /page-transition|visible|stagger|apparatus|meter-strip|hero-choreo|marquee|price-counter/.test(className);
        const hasTransition = Array.from(style.transitionDuration.split(',')).some((duration) => duration.trim() !== '0s');
        const hasAnimation = Array.from(style.animationDuration.split(',')).some((duration) => duration.trim() !== '0s');
        const opacityPending = isRevealClass && Number(style.opacity) < 1;
        return hasTransition || hasAnimation || opacityPending;
      }).map((element) => element.className || element.tagName);
    });
    expect(activeAnimations, 'no animation classes may be active under reduced motion (B47)').toEqual([]);
  });
});
