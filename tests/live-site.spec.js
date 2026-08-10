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
 * QA-review: PENDING — flips on TECH-29 final green
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
    budgetRange = '150k - 400k ETB',
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

    // Audit: fixed 85,000 ETB entry offer
    await expect(page.getByText('85,000 ETB').first()).toBeVisible();

    // AI automation tiers: anchored from 250k / 750k / 1.5M+
    await expect(page.getByText('from 250,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 750,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 1,500,000+ ETB').first()).toBeVisible();

    // Monthly support band on every tier
    await expect(page.getByText('30,000 - 70,000 ETB / month').first()).toBeVisible();

    // Product builds: web from 45k/150k/250k, mobile from 200k/400k, SaaS waitlist only
    await expect(page.getByText('from 45,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 150,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 250,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 200,000 ETB').first()).toBeVisible();
    await expect(page.getByText('from 400,000 ETB').first()).toBeVisible();
    await expect(page.getByText('Waitlist only').first()).toBeVisible();

    // Support & add-ons: monthly maintenance band, no marketing retainers
    await expect(page.getByText('5,000 - 15,000 ETB / month').first()).toBeVisible();
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
    await expect(page.getByText('waitlist only until a real product exists').first()).toBeVisible();

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

    const rangeText = await page.locator('.quote-result-range').innerText();
    expect(rangeText, 'web mid band must quote 150,000 ETB').toContain('150,000 ETB');
    expect(rangeText, 'web mid band must quote 250,000 ETB').toContain('250,000 ETB');
  });

  test('wizard offers no below-entry budget option and no add-on-only service', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/instant-quote`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.getByText('Branding and Additional Services')).toHaveCount(0);

    const budgetOptions = await page.getByLabel('Budget range').locator('option').allTextContents();
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

    await submitInstantQuoteRequest(page, {
      budgetRange: '85k - 150k ETB',
      timelineRange: '2-4 weeks',
      notes: 'Keep the scope as lean as possible.',
    });

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

    await submitInstantQuoteRequest(page, {
      serviceValue: 'SaaS Platform',
      notes: 'Registering interest in a future product.',
    });

    await expect(page.locator('.quote-result-range')).toHaveCount(0);
    await expect(page.getByText('tell us you want it').first()).toBeVisible();

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

      const pageText = await page.locator('main').innerText();
      expect(pageText, `${route} must foreground the workflow audit`).toContain('Workflow Audit');
      expect(pageText, `${route} must not promote the stale pricing guide`).not.toContain('Pricing Guide');
    }
  });

  test('workflow audit page states the fixed 85k fee, 5-business-day delivery, and credit terms', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/workflow-audit`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.getByText('85,000 ETB').first()).toBeVisible();
    await expect(page.getByText('5 business days').first()).toBeVisible();
    await expect(page.getByText('credited toward').first()).toBeVisible();
    await expect(page.getByText('1-2 week audit cycle')).toHaveCount(0);
  });

  test('SaaS page is explicitly waitlist-only with no pricing-guide or coming-soon product framing', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/saas-solutions`, { waitUntil: 'networkidle' });

    const pageText = await page.locator('main').innerText();
    expect(pageText).toContain('waitlist only');
    expect(pageText).not.toContain('Pricing Guide');
    expect(pageText).not.toContain('Coming soon');
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
      const finalBand = await page.locator('main > section').last().evaluate((section) => {
        const probe = window.__probeColor(window.getComputedStyle(section).backgroundColor);
        return {
          className: section.className || section.id,
          dark: probe.decisive && !probe.light,
        };
      });
      expect(finalBand.dark, `${route}: the final band (${finalBand.className}) must be dark (B39)`).toBe(true);

      if (marketingRoutes.includes(route)) {
        await expect(
          page.locator('main > section').last().locator('.btn-primary').first(),
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
    expect(accentToken, 'the accent token must be the molten-brass oklch value').toBe('oklch(76% 0.17 50)');

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
      expect(accentToken, `${route} must expose the molten-brass accent token (B39/design.md)`).toBe('oklch(76% 0.17 50)');
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
      { route: '/', left: 'AUDIT · 85,000 ETB · FIXED', right: 'DELIVERY · 5 BUSINESS DAYS' },
      { route: '/services', left: 'AUTOMATION · FROM 250,000 ETB', right: 'MILESTONES · 40/30/30' },
      { route: '/workflow-audit', left: 'AUDIT · 85,000 ETB · FIXED', right: 'DELIVERY · 5 BUSINESS DAYS' },
      { route: '/web-development', left: 'WEB · FROM 45,000 ETB', right: 'MILESTONES · 40/30/30' },
      { route: '/mobile-development', left: 'MOBILE · FROM 200,000 ETB', right: 'MILESTONES · 40/30/30' },
      { route: '/saas-solutions', left: 'SAAS · WAITLIST ONLY', right: 'PILOT · 15–20% OFF' },
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
    const activeAnimations = await page.evaluate(() => {
      const animated = document.querySelectorAll(
        '.page-transition, .navbar, .navbar-inner, .mobile-nav, .floating-cta-container, .floating-cta-btn, '
        + '.live-chat-dock, .live-chat-toggle, .visible, .stagger-children, .staggered-text, .apparatus, .meter-strip'
      );
      return Array.from(animated).filter((element) => {
        const style = window.getComputedStyle(element);
        const className = String(element.className || '');
        const isRevealClass = /page-transition|visible|stagger|apparatus|meter-strip/.test(className);
        const hasTransition = Array.from(style.transitionDuration.split(',')).some((duration) => duration.trim() !== '0s');
        const hasAnimation = Array.from(style.animationDuration.split(',')).some((duration) => duration.trim() !== '0s');
        const opacityPending = isRevealClass && Number(style.opacity) < 1;
        return hasTransition || hasAnimation || opacityPending;
      }).map((element) => element.className || element.tagName);
    });
    expect(activeAnimations, 'no animation classes may be active under reduced motion (B47)').toEqual([]);
  });
});
