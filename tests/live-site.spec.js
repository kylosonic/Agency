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

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
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
 * Phase 11 (R-7): the two case-study screenshots (public/case-studies/*.webp,
 * `loading="lazy"`) begin loading when the page scrolls near the intake form
 * (#project-intake sits just below them). A lazy image load that lands between
 * scroll-into-view and the submit click can shift layout and swallow the click,
 * so the submit handler never runs. Make the load deterministic: bring the
 * #selected-work section into view (the browser then MUST schedule the lazy
 * loads), wait until every image has settled (load or error), and only then
 * click submit.
 */
async function waitForCaseStudyImagerySettled(page) {
  await page.locator('#selected-work').scrollIntoViewIfNeeded();
  await page.locator('.case-study-card img').evaluateAll((imgs) =>
    Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true });
              img.addEventListener('error', resolve, { once: true });
            })
      )
    )
  );
}

/**
 * Phase 11 (R-7): stable intake submit — bring the button into view, let the
 * lazy case-study imagery above the form settle, then click. Used by every
 * test that must land the submit event deterministically (never force-click).
 */
async function clickIntakeSubmit(page, form) {
  const submit = form.getByRole('button', { name: 'Start a Project' });
  await submit.scrollIntoViewIfNeeded();
  await waitForCaseStudyImagerySettled(page);
  await submit.click();
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

  test('mobile nav works and the site defaults light on home page', async ({ page }) => {
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
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    // R-16 — the canvas is warm light paper (oklch(96.5% 0.012 88)-family).
    const bodyBackground = await page.locator('body').evaluate((element) => {
      const color = window.getComputedStyle(element).backgroundColor;
      const probe = window.__probeColor(color);
      return { color, light: probe.decisive && probe.light, black: probe.black };
    });
    expect(bodyBackground.light, `body background must be light, got ${bodyBackground.color}`).toBe(true);
    expect(bodyBackground.black, `body background must not be black, got ${bodyBackground.color}`).toBe(false);
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

  test('home project intake form submits and shows success feedback', async ({ page }) => {
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

    const form = page.locator('#project-intake form');
    await form.locator('#project-intake-name').fill('Playwright Contact Tester');
    await form.locator('#project-intake-email').fill('playwright-contact@example.com');
    await form.locator('#project-intake-phone').fill('+251 911 000 003');
    await form.locator('#project-intake-need').selectOption('Website');
    await form.locator('#project-intake-message').fill('Please contact us with implementation options and timeline.');
    await clickIntakeSubmit(page, form);

    await expect(
      form.getByText(/your project request was received/i),
      'the intake confirmation must render (R-7)'
    ).toBeVisible();
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

  test('homepage hero is software-first typography with locked anchors (R-2)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await installColorProbe(page);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(page.locator('.hero-stats')).toHaveCount(0);
    await expect(page.locator('#agent-demo')).toHaveCount(0);
    await expect(page.locator('#impact-calculator')).toHaveCount(0);

    await expect(page.locator('.hero-copy')).toBeVisible();

    // R-2 — the hero H1 is the software-first headline (B40 lowercases prose).
    const h1Text = normalizeProse(await page.locator('section#hero h1').innerText());
    expect(h1Text, 'hero headline must lead with software (R-2)').toContain('software built around your business');

    // R-2 — subcopy names software first; AI is the named second capability.
    const subcopy = normalizeProse(await page.locator('section#hero p').first().innerText());
    expect(subcopy, 'hero subcopy must lead with software builds').toContain('builds custom software');
    expect(subcopy, 'hero subcopy must name AI as the second capability').toContain('ai automation');

    // R-2/A20 — trust row shows the software-first anchors (locked figures only).
    const trustRowText = normalizeProse(await page.locator('.hero-trust-row').innerText());
    expect(trustRowText, 'trust row must carry the web anchor').toContain('web from 20,000 etb');
    expect(trustRowText, 'trust row must carry the mobile anchor').toContain('mobile from 40,000 etb');
    expect(trustRowText, 'trust row must carry the SaaS anchor').toContain('saas from 3,500 etb / month');
    expect(trustRowText, 'trust row must not mention USD').not.toContain('usd');

    // R-19 — the audit pills no longer occupy the hero trust row.
    expect(trustRowText, 'audit terms must not sit in the hero trust row').not.toContain('15,000 etb');

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
   *
   * A12 re-baseline (TECH-49, phase-9 precedent): the 15-section software-first
   * Home (R-3) replaced the trimmed audit-first Home, so the old 616 ceiling
   * died with the rebuild. New constant measured 2026-08-12 from the Phase-11
   * EN build (`main` innerText, marquee excluded — the existing G-5 locked-data
   * exemption): 999 words. The gate now guards against regressions above the
   * measured trimmed build; QA re-verifies at Gate C.
   */
  const BASELINE_WORDS = {
    '/': 999,
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

  test('/ rendered word count stays at or below the measured Phase-11 baseline (A12)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    // The TECH-33 marquee (M-5) is a locked-figure surface (G-5): its rows
    // repeat P-1 price/discount strings that already exist on the page. It
    // was added AFTER the pre-trim baseline was captured, so it is excluded
    // from the measurement — the same locked-data exemption the C-2 ruling
    // applies to /pricing. Everything else on Home counts against the
    // measured Phase-11 ceiling (A12).
    const text = await page.locator('main').evaluate((main) => {
      const clone = main.cloneNode(true);
      clone.querySelectorAll('.marquee-strip').forEach((node) => node.remove());
      return String(clone.innerText).toLowerCase().replace(/\s+/g, ' ').trim();
    });
    const words = text.split(' ').filter((token) => token.length > 0).length;
    const limit = BASELINE_WORDS['/'];
    expect(
      words,
      `/ must stay within the measured Phase-11 word ceiling (baseline ${BASELINE_WORDS['/']} -> limit ${limit}, got ${words})`
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

  test('M4 — the audit price counter lands exactly on the locked figure (A11)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    // A11: the ladder is gone — the single audit counter lives at section 13.
    const counter = page.locator('#workflow-audit .price-counter');
    await expect(counter, 'the section-13 audit card must carry a price counter').toHaveCount(1);
    await counter.scrollIntoViewIfNeeded();
    // Auto-retries until the count-up settles — must land exactly on 15,000 ETB.
    await expect(counter, 'the counter must land exactly on the locked audit figure').toHaveText('15,000 ETB');
  });

  test('M4 — reduced motion renders the price statically at the locked figure (A11)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const counter = page.locator('#workflow-audit .price-counter');
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
  // TECH-45 (A6): the old #contact section is gone — the final-CTA section 14
  // (intake card + chat panel) carries the same padding contract.
  const MIN_CARD_PADDING_PX = 15; // 0.95rem base floor on the smallest breakpoint

  test('intake cards carry interior padding on desktop and mobile', async ({ page }) => {
    for (const viewport of [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'mobile', width: 390, height: 844 },
    ]) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      const paddings = await page
        .locator('#project-intake .contact-form-card, #project-intake .editorial-panel.glass-card')
        .evaluateAll((cards) =>
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

      expect(paddings.length, `${viewport.name}: both intake cards must render`).toBe(2);
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

  test('tracks intake form attempt/outcome and contact channel clicks', async ({ page }) => {
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

    const form = page.locator('#project-intake form');
    await form.locator('#project-intake-name').fill('Analytics Contact Tester');
    await form.locator('#project-intake-email').fill('analytics-contact@example.com');
    await form.locator('#project-intake-phone').fill('+251 911 000 004');
    await form.locator('#project-intake-need').selectOption('SaaS product');
    await form.locator('#project-intake-message').fill('Analytics smoke test intake submission.');
    await clickIntakeSubmit(page, form);

    await expect(form.getByText(/your project request was received/i)).toBeVisible();
    await expectAnalyticsEventWithSource(page, 'contact_form_attempt', 'project_intake');
    await expectAnalyticsEvent(page, 'contact_form_outcome');

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

test.describe('Phase 2 — audit-first hierarchy (superseded by R-3, TECH-49)', () => {
  // The Phase-2 audit-first Home assertion was deleted in TECH-49: the R-3
  // section-order gate (Phase 11 describe) supersedes it — Home now leads
  // with the software story and carries the audit at section 13. The audit
  // page and pricing-page audit terms are still covered by their own tests.
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

test.describe('Phase 8 — light-first visual system (TECH-22 re-baselined, TECH-42)', () => {
  test('N1 — every matrix route defaults light with no dark-mode toggle', async ({ page }) => {
    await installColorProbe(page);
    for (const route of routes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

      await expect(page.locator('html'), `${route} must default to the light theme`).toHaveAttribute('data-theme', 'light');
      await expect(page.locator('.dark-mode-toggle'), `${route} must have no dark-mode toggle`).toHaveCount(0);

      const bodyBackground = await page.locator('body').evaluate((element) => {
        const color = window.getComputedStyle(element).backgroundColor;
        const probe = window.__probeColor(color);
        return { color, light: probe.decisive && probe.light, black: probe.black };
      });
      expect(
        bodyBackground.light,
        `${route} body background must be light warm paper (oklch(96.5% 0.012 88)-family), got ${bodyBackground.color}`
      ).toBe(true);
      expect(bodyBackground.black, `${route} body background must not be black, got ${bodyBackground.color}`).toBe(false);
    }
  });

  test('N2 — light-first canvas with exactly two dark bands (band-1 process, band-2 final CTA)', async ({ page }) => {
    await installColorProbe(page);
    const bandRoutes = [...routes, '/services', '/workflow-audit'];

    for (const route of bandRoutes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      // R-16 — the canvas is light; the only dark surfaces are .band-dark sections.
      // Map to plain data inside the browser — DOM nodes cannot be serialized
      // out of page.evaluate (classList is undefined once back in Node).
      const darkSections = await page.evaluate(() => {
        const surfaceIsDark = (element) => {
          let node = element;
          while (node && node !== document.documentElement) {
            const probe = window.__probeColor(window.getComputedStyle(node).backgroundColor);
            if (probe.decisive) {
              return !probe.light;
            }
            node = node.parentElement;
          }
          return false;
        };

        return Array.from(document.querySelectorAll('main section'))
          .map((section) => ({
            id: section.id,
            className: section.className,
            dark: surfaceIsDark(section),
          }))
          .filter((section) => section.dark);
      });
      for (const section of darkSections) {
        expect(
          section.className.includes('band-dark'),
          `${route}: dark section ${section.id || section.className} must be a .band-dark band`
        ).toBe(true);
      }

      // R-16/A5 — Home carries exactly two dark bands, the last main section
      // being the dark final-CTA band (#project-intake).
      if (route === '/') {
        expect(darkSections.length, 'home must render exactly two dark bands (A5)').toBe(2);
        const finalSection = await page.locator('main section').last().evaluate((section) => ({
          id: section.id || section.className,
          dark: section.classList.contains('band-dark'),
        }));
        expect(finalSection.id, 'home must close on the final-CTA band (#project-intake)').toBe('project-intake');
        expect(finalSection.dark, 'the final-CTA band must be a dark band (band-2)').toBe(true);
      }
    }

    // R-6/N2 (Phase 11 re-baseline): the FINAL CTA surface on each marketing
    // page carries the primary CTA. Phase 11 moved the closing CTA out of the
    // dark band-1 sections into the light .page-closing-card — the R-6
    // hierarchy (exact "Start a Project" label + href) is enforced by the C1
    // gate; this loop keeps the structural check that the final CTA surface
    // (Home's dark #project-intake band or the closing card) carries a
    // .btn-primary.
    const finalCtaSelectors = [
      { route: '/', selector: '#project-intake' },
      { route: '/services', selector: '.page-closing-card' },
      { route: '/web-development', selector: '.page-closing-card' },
      { route: '/mobile-development', selector: '.page-closing-card' },
      { route: '/saas-solutions', selector: '.page-closing-card' },
      { route: '/additional-services', selector: '.page-closing-card' },
    ];
    for (const { route, selector } of finalCtaSelectors) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);
      await expect(
        page.locator(selector).locator('.btn-primary').first(),
        `${route}: the final CTA must carry a primary CTA`
      ).toBeVisible();
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
    // A7 (TECH-46): nav CTA → Start a Project → Home intake form.
    await expect(cta, 'nav CTA must be labeled "Start a Project"').toHaveText('Start a Project');
    await expect(cta, 'nav CTA must lead to the Home intake form').toHaveAttribute('href', '/#project-intake');

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

  test('N4 — imagery limited to the two case-study cards on home (R-16 exception)', async ({ page }) => {
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

      // R-16: the only imagery anywhere is the two case-study screenshots on Home.
      const expectedImages = route === '/' ? 2 : 0;
      expect(
        imagery.imgCount,
        `${route} must render exactly ${expectedImages} img elements (R-16 exception)`
      ).toBe(expectedImages);
      expect(imagery.urlBackgroundCount, `${route} must render no url() background images`).toBe(0);

      if (route === '/') {
        const caseStudyImages = await page.locator('.case-study-card img').evaluateAll((images) =>
          images.map((img) => ({
            loading: img.getAttribute('loading'),
            src: img.getAttribute('src'),
            hasAlt: Boolean(img.getAttribute('alt')),
          }))
        );
        for (const image of caseStudyImages) {
          expect(image.loading, 'case-study screenshots must load lazily (R-10)').toBe('lazy');
          expect(image.src, 'case-study screenshots must come from the public assets').toContain('/case-studies/');
          expect(image.hasAlt, 'case-study screenshots must carry alt text (R-10)').toBe(true);
        }
      }
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

  test('N6 — the single deep forest-green accent drives every primary CTA', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    // R-16 — one forest accent drives the system: --color-accent:
    // oklch(35% 0.09 152). No violet, no brass, no generic blue.
    const accentToken = await page.evaluate(() => {
      const root = window.getComputedStyle(document.documentElement);
      return (root.getPropertyValue('--color-accent') || root.getPropertyValue('--accent')).trim();
    });
    expect(
      normalizeOklchToken(accentToken),
      'the accent token must be the deep forest-green oklch value'
    ).toBe(normalizeOklchToken('oklch(35% 0.09 152)'));

    const primaryButton = await page.locator('.btn-primary').first().evaluate((element) => {
      const style = window.getComputedStyle(element);
      return { backgroundColor: style.backgroundColor, color: style.color };
    });
    expect(
      primaryButton.backgroundColor,
      `primary CTA must be filled with forest green (oklch), got ${primaryButton.backgroundColor}`
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
        // R-2 — the home hero CTA row leads with Start a Project (TECH-46).
        await expect(
          hero.getByRole('link', { name: 'Start a Project', exact: true }),
          'home hero must lead with Start a Project (R-6)'
        ).toBeVisible();
      }
    }
  });
});

test.describe('Phase 8 — light-first contract (TECH-22 re-baselined, TECH-42, NEW)', () => {
  test('N1 — light canvas and the forest-green accent are present on every matrix route', async ({ page }) => {
    await installColorProbe(page);
    for (const route of routes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      // R-16 — warm light paper canvas (oklch(96.5% 0.012 88)-family), never pure white.
      const canvas = await page.locator('body').evaluate((element) => {
        const color = window.getComputedStyle(element).backgroundColor;
        const probe = window.__probeColor(color);
        return { color, light: probe.decisive && probe.light, white: probe.light && color.includes('255, 255, 255') };
      });
      expect(canvas.light, `${route} canvas must be light (oklch(96.5% 0.012 88)-family), got ${canvas.color}`).toBe(true);

      // index.html — theme-color flips from the dark #14141c to the light paper #f7f4ec.
      const themeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
      expect(themeColor, `${route} must set the light theme-color`).toBe('#f7f4ec');

      // R-16 — one deep forest-green accent token drives the whole system.
      const accentToken = await page.evaluate(() => {
        const root = window.getComputedStyle(document.documentElement);
        return (root.getPropertyValue('--color-accent') || root.getPropertyValue('--accent')).trim();
      });
      expect(
        normalizeOklchToken(accentToken),
        `${route} must expose the forest-green accent token (R-16)`
      ).toBe(normalizeOklchToken('oklch(35% 0.09 152)'));
    }
  });

  test('N1b — no violet or brass surfaces render on any matrix route (R-16)', async ({ page }) => {
    await installColorProbe(page);
    for (const route of routes) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      const foreignHues = await page.evaluate(() => {
        const colorToHue = (color) => {
          const value = (color || '').trim();
          const nums = value.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
          if (nums.length < 3) {
            return null;
          }
          let r;
          let g;
          let b;
          if (/^oklch/i.test(value)) {
            // Phase 11 (NB-51): getComputedStyle serialises oklch() as
            // oklch(L C H [/ A]) — the first three numbers are LIGHTNESS,
            // CHROMA, HUE, not RGB. Convert OKLCH → OKLab → linear sRGB
            // (Björn Ottosson) so the hue math below matches rgb() input.
            const [L, C, H] = nums;
            // Near-neutral surfaces must never be hue-classified: the warm
            // paper (oklch(96.5% 0.012 88)) converts to HSL hue ≈ 42° and the
            // warm near-black ink (oklch(23% 0.015 90)) to hue ≈ 41° at high
            // RELATIVE saturation — both would false-positive as brass.
            // Absolute OKLCH chroma is the correct neutral detector; a real
            // violet/brass surface needs C ≥ 0.1.
            if (C < 0.05) {
              return null;
            }
            const a = C * Math.cos((H * Math.PI) / 180);
            const bChroma = C * Math.sin((H * Math.PI) / 180);
            const lPrime = L + 0.3963377774 * a + 0.2158037573 * bChroma;
            const mPrime = L - 0.1055613458 * a - 0.0638541728 * bChroma;
            const sPrime = L - 0.0894841775 * a - 1.291485548 * bChroma;
            const l = lPrime ** 3;
            const m = mPrime ** 3;
            const s = sPrime ** 3;
            r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
            g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
            b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
          } else {
            [r, g, b] = nums;
            if (r > 1 || g > 1 || b > 1) {
              r /= 255;
              g /= 255;
              b /= 255;
            }
            // Non-OKLCH inputs (rgb() and color(srgb ...) — the latter is how
            // color-mix() backgrounds serialize, e.g. services-table headers):
            // exclude pale warm neutrals by relative saturation — they convert
            // to HSL hue ≈ 43° at < 5% saturation, which is not brass. (Dark
            // OKLCH neutrals are handled by the chroma guard above; relative
            // saturation alone would misread them as saturated.)
            const sMax = Math.max(r, g, b);
            const sMin = Math.min(r, g, b);
            if (sMax - sMin > 0 && (sMax - sMin) / sMax < 0.15) {
              return null;
            }
          }
          r = Math.min(1, Math.max(0, r));
          g = Math.min(1, Math.max(0, g));
          b = Math.min(1, Math.max(0, b));
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const delta = max - min;
          if (delta === 0) {
            return null;
          }
          let hue = 0;
          if (max === r) {
            hue = ((g - b) / delta) % 6;
          } else if (max === g) {
            hue = (b - r) / delta + 2;
          } else {
            hue = (r - g) / delta + 4;
          }
          hue *= 60;
          if (hue < 0) {
            hue += 360;
          }
          return hue;
        };

        const isViolet = (hue) => hue !== null && hue >= 240 && hue <= 300;
        const isBrass = (hue) => hue !== null && hue >= 35 && hue <= 65;

        const offenders = [];
        const walk = (element) => {
          const style = window.getComputedStyle(element);
          const bg = style.backgroundColor;
          const probe = window.__probeColor(bg);
          const alpha = (bg || '').match(/-?\d+(\.\d+)?/g)?.map(Number)?.[3] ?? 1;
          if (probe.decisive && alpha > 0.35) {
            const hue = colorToHue(bg);
            if (isViolet(hue) || isBrass(hue)) {
              offenders.push({
                tag: element.tagName.toLowerCase(),
                cls: String(element.className || '').slice(0, 60),
                color: bg,
                hue: Math.round(hue),
              });
            }
          }
          Array.from(element.children).forEach(walk);
        };

        walk(document.body);
        return offenders.slice(0, 8);
      });

      expect(foreignHues, `${route} must render no violet or brass surfaces (R-16)`).toEqual([]);
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
      // R-19 (TECH-45): Home meter labels re-cut software-first.
      { route: '/', left: 'WEB · FROM 20,000 ETB', right: 'MOBILE · FROM 40,000 ETB' },
      // TECH-36 (A2): the Services meter leads with the software anchor.
      { route: '/services', left: 'WEB · FROM 20,000 ETB', right: 'MILESTONES · 40/30/30' },
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

    // TECH-38 (A8): BUILDS now leads AUTOMATION, so the first matched row is a
    // build track card without a receipt label. The B43 mono-UPPERCASE-label
    // contract lives on the AI tier rows ("Setup") — query them explicitly.
    const receipt = await page.locator('.pricing-tier-editorial-card').first().evaluate((row) => {
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

test.describe('Phase 10 — software prominence & booking (TECH-35..41)', () => {
  /**
   * TECH-41 gates (software-development-prominence.md §5): ordering (S-1),
   * forbidden strings (S-2/S-4), brand (S-4), booking (C-2/A1/A6), guarantee
   * (C-3), support paths (C-4/A7), and CTA hierarchy (C-1). The brand E2E
   * landed in TECH-41 per the phase-10 plan (assertions land per ticket).
   */

  test('S1 — software tracks render before AI on home, services, and the wizard (R-5)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    // Home: the software story sections precede the AI section (R-3 order).
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);
    const homeIds = await page.locator('main section[id]').evaluateAll((sections) =>
      sections.map((section) => section.id)
    );
    for (const softwareSection of ['custom-software', 'web-mobile', 'business-systems', 'saas-product']) {
      expect(
        homeIds.indexOf(softwareSection),
        `home must render #${softwareSection} before #ai-automation (S-1/R-5)`
      ).toBeLessThan(homeIds.indexOf('ai-automation'));
    }

    // Services delivery tracks: Custom Software leads, AI & Automation last (R-5).
    await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);
    const trackTitles = await page.locator('.service-track-card h3').allTextContents();
    expect(trackTitles, 'services must render exactly six tracks (R-5)').toHaveLength(6);
    const customIndex = trackTitles.findIndex((title) => title.includes('Custom Software Development'));
    const aiTrackIndex = trackTitles.findIndex((title) => title.includes('AI & Automation'));
    expect(customIndex, 'services must render the custom software track').toBeGreaterThanOrEqual(0);
    expect(aiTrackIndex, 'services must render the AI track').toBeGreaterThanOrEqual(0);
    expect(customIndex, 'services: custom software must precede AI (S-1/R-5)').toBeLessThan(aiTrackIndex);
    expect(aiTrackIndex, 'services: AI must be the final track (R-5)').toBe(trackTitles.length - 1);

    // Instant-quote selector: first software option before the first AI option.
    await page.goto(`${BASE_URL}/instant-quote`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);
    const optionLabels = await page.locator('.quote-option span').allTextContents();
    const firstSoftware = optionLabels.findIndex((label) => label.includes('Web system'));
    const firstAi = optionLabels.findIndex((label) => label.includes('AI automation'));
    expect(firstSoftware, 'wizard must render a software option').toBeGreaterThanOrEqual(0);
    expect(firstAi, 'wizard must render an AI option').toBeGreaterThanOrEqual(0);
    expect(firstSoftware, 'wizard: software must precede AI (S-1)').toBeLessThan(firstAi);
  });

  test('S2/S4 — forbidden brand and subordination strings are absent from source and rendered pages', async ({ page }) => {
    // Source sweep (src/ + index.html): the owner-side PDF path constant is the
    // only permitted legacy-brand token (plan §6.2, R6).
    const walkFiles = (dir, files = []) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          walkFiles(full, files);
        } else if (/\.(js|jsx|mjs|html)$/.test(entry.name)) {
          files.push(full);
        }
      }
      return files;
    };

    const sources = [
      ...walkFiles(fileURLToPath(new URL('../src/', import.meta.url))).map((file) => readFileSync(file, 'utf8')),
      readFileSync(new URL('../index.html', import.meta.url), 'utf8'),
    ];
    const countOf = (needle) => sources.reduce((sum, content) => sum + content.split(needle).length - 1, 0);

    expect(countOf('NovaTech AI'), 'no "NovaTech AI" may remain in src/ or index.html').toBe(0);
    expect(countOf('NovaTechAI'), 'only the exempt PDF path constant may carry "NovaTechAI"').toBe(1);
    expect(countOf('interface layer'), 'no "interface layer" subordination may remain in src/ or index.html').toBe(0);
    expect(countOf('Add the interface layer'), 'no "Add the interface layer" stage may remain').toBe(0);

    const pdfLine = sources.find((content) => content.includes('NovaTechAI'));
    expect(pdfLine, 'the remaining "NovaTechAI" token must be PRICING_GUIDE_ASSET_PATH').toContain('PRICING_GUIDE_ASSET_PATH');

    // Rendered check in all three languages (S-4).
    for (const lang of ['en', 'am', 'om']) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      if (lang !== 'en') {
        await page.locator('.navbar-mobile-actions .language-switcher-select').selectOption(lang);
        await expect.poll(async () => page.getAttribute('html', 'lang')).toBe(lang);
      }
      await dismissLeadModalIfOpen(page);
      const bodyText = (await page.locator('body').innerText()).toLowerCase();
      expect(bodyText, `${lang}: rendered page must not carry the legacy brand`).not.toContain('novatech ai');
      expect(bodyText, `${lang}: rendered page must not subordinate software to AI`).not.toContain('interface layer');
    }
  });

  test('S4 — the brand renders as NovaTech in the nav wordmark and document title', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await expect(
      page.locator('.navbar .navbar-logo span:not(.brand-mark)'),
      'nav wordmark must read NovaTech'
    ).toHaveText('NovaTech');

    const title = await page.title();
    expect(title, 'document title must carry the NovaTech brand').toContain('NovaTech');
    expect(title, 'document title must not carry the legacy brand').not.toContain('NovaTech AI');
  });

  test('C2/A1/C3 — audit booking flow confirms with the 48h hold copy and no checkout', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.route('https://formsubmit.co/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto(`${BASE_URL}/workflow-audit`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    await page.locator('#booking').scrollIntoViewIfNeeded();
    await expect(page.locator('#booking .contact-form'), 'the booking form must render inside #booking').toBeVisible();

    await page.locator('#audit-booking-name').fill('Booking Tester');
    await page.locator('#audit-booking-email').fill('booking-tester@example.com');
    await page.locator('#audit-booking-phone').fill('+251 911 000 000');
    await page.locator('#audit-booking-company').fill('QA Labs');
    await page.locator('#booking').getByRole('button', { name: 'Book Workflow Audit' }).click();

    const confirmation = page.locator('#booking [role="status"]');
    await expect(confirmation, 'the booking confirmation must render').toBeVisible();
    const confirmationText = normalizeProse(await confirmation.innerText());
    expect(confirmationText, 'confirmation must hold the slot for 48 hours (C-2)').toContain('48');
    expect(confirmationText, 'confirmation must mention the invoice (C-2)').toContain('invoice');
    expect(confirmationText, 'confirmation must state bank transfer as the active method (A1)').toContain('bank transfer');
    expect(confirmationText, 'confirmation must not claim live Telebirr (A1)').toContain('telebirr when activated');
    expect(confirmationText, 'confirmation must promise human confirmation within 1 business day (C-2)').toContain('1 business day');
    expect(confirmationText, 'confirmation must carry the guarantee line (C-3)').toContain('usable blueprint');

    // No payment/checkout UI anywhere in the flow (C-2 acceptance 3).
    await expect(page.locator('input[type="payment"]'), 'no payment inputs may render').toHaveCount(0);
    await expect(page.locator('.checkout'), 'no checkout UI may render').toHaveCount(0);
    const pageText = normalizeProse(await page.locator('body').innerText());
    expect(pageText, 'no pay-online claim may render').not.toContain('pay online');
  });

  test('C3 — the guarantee line renders on the audit page and policy audit terms', async ({ page }) => {
    for (const route of ['/workflow-audit', '/policy']) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);
      const bodyText = normalizeProse(await page.locator('main').innerText());
      expect(bodyText, `${route} must carry the audit guarantee (C-3)`).toContain('usable blueprint');
    }
  });

  test('C4/A7 — support paths prefill scope and budget into WhatsApp and Telegram links', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/workflow-audit`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);
    await page.locator('#booking').scrollIntoViewIfNeeded();

    await expect(
      page.locator('#booking').getByRole('link', { name: 'Book a free Discovery Call', exact: true }),
      'the free Discovery Call support path must be present (C-4)'
    ).toHaveAttribute('href', '/book-discovery-call');

    await page.locator('#booking').getByLabel('Scope').selectOption('web');
    await page.locator('#booking').getByLabel('Budget band').selectOption('15k - 40k');

    const whatsapp = page.locator('#booking').getByRole('link', { name: 'WhatsApp', exact: true });
    const whatsappHref = await whatsapp.getAttribute('href');
    expect(whatsappHref, 'WhatsApp link must use the wa.me channel').toContain('wa.me');
    const decodedWhatsapp = decodeURIComponent(String(whatsappHref).replace(/\+/g, ' '));
    expect(decodedWhatsapp, 'WhatsApp link must carry the selected scope').toContain('I need a web build');
    expect(decodedWhatsapp, 'WhatsApp link must carry the selected budget band').toContain('budget: 15k - 40k');

    const telegram = page.locator('#booking').getByRole('link', { name: 'Telegram', exact: true });
    const telegramHref = await telegram.getAttribute('href');
    expect(telegramHref, 'Telegram link must use the t.me direct channel').toContain('t.me/NovaTechET');
  });

  test('C1 — every marketing hero leads with Start a Project (R-6)', async ({ page }) => {
    // R-6: "Start a Project" is the primary CTA on every marketing hero/final
    // CTA, linking to the Home intake form (/#project-intake) from non-Home
    // pages. The nav CTA is the constant cross-page anchor. Exception: the
    // Workflow Audit page keeps "Book Workflow Audit" as its own primary.
    const primaries = [
      { route: '/', selector: 'section#hero' },
      { route: '/pricing', selector: 'section.page-hero' },
      { route: '/services', selector: '.page-closing-card' },
      { route: '/web-development', selector: '.page-closing-card' },
      { route: '/mobile-development', selector: '.page-closing-card' },
      { route: '/saas-solutions', selector: '.page-closing-card' },
      { route: '/additional-services', selector: '.page-closing-card' },
      { route: '/industries/real-estate', selector: '.industry-actions' },
    ];

    for (const { route, selector } of primaries) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      const primary = page
        .locator(selector)
        .first()
        .getByRole('link', { name: 'Start a Project', exact: true })
        .first();
      await expect(primary, `${route} must lead with Start a Project (R-6)`).toBeVisible();

      const expectedHref = route === '/' ? '/#project-intake' : '/#project-intake';
      await expect(primary, `${route} primary must land on the Home intake form`).toHaveAttribute('href', expectedHref);

      await expect(page.locator('.navbar-cta'), `${route} nav CTA must anchor the intake form`).toHaveAttribute('href', '/#project-intake');
    }

    // R-6 exception: the Workflow Audit page keeps its own primary.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/workflow-audit`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);
    const auditPrimary = page
      .locator('.page-closing-card')
      .getByRole('link', { name: 'Book Workflow Audit', exact: true });
    await expect(auditPrimary, '/workflow-audit must keep Book Workflow Audit primary (R-6 exception)').toBeVisible();
    await expect(auditPrimary).toHaveAttribute('href', '#booking');
  });

  test('R6 — home hero CTA hierarchy: Start a Project → Discuss → Explore AI (TECH-46)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const hero = page.locator('section#hero');
    const ctaLinks = hero.locator('.hero-actions a');

    await expect(ctaLinks, 'the hero CTA row must render three actions').toHaveCount(3);
    const ctaLabels = await ctaLinks.allTextContents();
    expect(normalizeProse(ctaLabels[0]), 'primary must be Start a Project').toContain('start a project');
    expect(normalizeProse(ctaLabels[1]), 'secondary must be Discuss Your Software Idea').toContain('discuss your software idea');
    expect(normalizeProse(ctaLabels[2]), 'tertiary must be Explore AI & Automation').toContain('explore ai & automation');

    await expect(hero.getByRole('link', { name: 'Start a Project', exact: true })).toHaveAttribute('href', '/#project-intake');
    await expect(hero.getByRole('link', { name: 'Discuss Your Software Idea', exact: true })).toHaveAttribute('href', '/book-discovery-call');
    // React Router resolves the relative hash to the canonical "/#ai-automation"
    // (same anchor as "/#project-intake" above — path "/" + hash).
    await expect(hero.getByRole('link', { name: 'Explore AI & Automation', exact: true })).toHaveAttribute('href', '/#ai-automation');

    // The anchor exists on Home (R3 risk mitigation): clicking the primary
    // scrolls to the intake form.
    await hero.getByRole('link', { name: 'Start a Project', exact: true }).click();
    await expect(page.locator('#project-intake')).toBeVisible();
    await expect(page.locator('#project-intake .intake-form')).toBeVisible();
  });

  test('R7 — the intake form submits and confirms with the 1-business-day line (TECH-46)', async ({ page }) => {
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

    const form = page.locator('#project-intake form');
    await expect(form, 'the intake form must render inside #project-intake (R-7)').toBeVisible();

    await form.locator('#project-intake-name').fill('Playwright Intake Tester');
    await form.locator('#project-intake-email').fill('intake-tester@example.com');
    await form.locator('#project-intake-phone').fill('+251 911 000 000');
    await form.locator('#project-intake-company').fill('QA Labs');
    await form.locator('#project-intake-need').selectOption('Web application');
    await form.locator('#project-intake-budget').selectOption('40k - 100k');
    await form.locator('#project-intake-message').fill('We need a customer portal for order tracking.');
    await clickIntakeSubmit(page, form);

    const confirmation = form.locator('[role="status"]');
    await expect(confirmation, 'the intake confirmation must render').toBeVisible();
    const confirmationText = normalizeProse(await confirmation.innerText());
    expect(confirmationText, 'confirmation must state the request was received (R-7)').toContain('project request was received');
    expect(confirmationText, 'confirmation must promise a 1-business-day response (R-7)').toContain('1 business day');
  });

  test('R7 — "Not sure yet" selections are valid and submit (no dead ends)', async ({ page }) => {
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

    const form = page.locator('#project-intake form');
    await form.locator('#project-intake-name').fill('Unsure Tester');
    await form.locator('#project-intake-email').fill('unsure-tester@example.com');
    await form.locator('#project-intake-phone').fill('+251 911 000 001');
    await form.locator('#project-intake-need').selectOption('Not sure yet');
    await form.locator('#project-intake-budget').selectOption('Not sure');
    await form.locator('#project-intake-message').fill('We know we need software but not which build.');
    await clickIntakeSubmit(page, form);

    const confirmation = form.locator('[role="status"]');
    await expect(confirmation, 'unsure selections must still submit (R-7 edge)').toBeVisible();
    expect(normalizeProse(await confirmation.innerText()), 'confirmation must carry the response promise').toContain('1 business day');
  });

  test('R7 — endpoint failure triggers the mailto fallback feedback (never silently vanishes)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.route('https://formsubmit.co/**', async (route) => {
      await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
    });

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const form = page.locator('#project-intake form');
    await form.locator('#project-intake-name').fill('Fallback Tester');
    await form.locator('#project-intake-email').fill('fallback-tester@example.com');
    await form.locator('#project-intake-phone').fill('+251 911 000 002');
    await form.locator('#project-intake-need').selectOption('Mobile app');
    await form.locator('#project-intake-message').fill('We need a field app for deliveries.');
    await clickIntakeSubmit(page, form);

    // The mailto fallback must surface visible feedback (R-7 failure outcome).
    await expect(
      form.getByText(/opened in your email client/i),
      'fallback feedback must render when the endpoint fails'
    ).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Phase 11 — software-first redesign (TECH-43..49)', () => {
  // R-3: the exact 15-section order (footer unnumbered per A2).
  const HOME_SECTION_IDS = [
    'hero',
    'trust',
    'what-we-build',
    'custom-software',
    'web-mobile',
    'business-systems',
    'saas-product',
    'ai-automation',
    'process',
    'selected-work',
    'why-novatech',
    'industries',
    'workflow-audit',
    'project-intake',
  ];

  test('R3 — home renders the 15 sections in the exact software-first order', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const sectionIds = await page.locator('main section[id]').evaluateAll((sections) =>
      sections.map((section) => section.id)
    );
    expect(sectionIds, 'home must render the R-3 section ids in order').toEqual(HOME_SECTION_IDS);

    // AI (section 8) must appear after the software story (sections 3–7).
    expect(sectionIds.indexOf('ai-automation'), 'AI must follow the software story (R-1)')
      .toBeGreaterThan(sectionIds.indexOf('what-we-build'));

    // The footer follows the final-CTA section (R-3 item 15).
    const footerAfter = await page.evaluate(() => {
      const intake = document.getElementById('project-intake');
      const footer = document.querySelector('footer.footer');
      if (!intake || !footer) {
        return false;
      }
      return (intake.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    });
    expect(footerAfter, 'footer must follow the final CTA section').toBe(true);
  });

  test('R4 — What We Build renders 10 business-framed categories, one line each', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const items = page.locator('#what-we-build .what-we-build-item');
    await expect(items, 'What We Build must render 10 categories (R-4)').toHaveCount(10);

    const itemTexts = await items.evaluateAll((cards) =>
      cards.map((card) => String(card.innerText).toLowerCase().replace(/\s+/g, ' ').trim())
    );
    expect(itemTexts[0], 'the first category is Business Management Systems').toContain('business management systems');
    expect(itemTexts[9], 'the final category is AI-Powered Software').toContain('ai-powered software');

    // Single-line at 1440x900 (copy-trim): every category line fits one row.
    const overflowLines = await items.evaluateAll((cards) =>
      cards.map((card) => {
        const body = card.querySelector('.what-we-build-item__body p');
        if (!body) {
          return true;
        }
        return body.scrollHeight > body.clientHeight + 2;
      })
    );
    expect(overflowLines, 'every What We Build line must fit on one row at 1440px').toEqual(
      Array(10).fill(false)
    );

    // No tech-stack leads (R-14) and no specialization claims (R-4 edge).
    const allText = normalizeProse(await page.locator('#what-we-build').innerText());
    for (const forbidden of ['react', 'node', 'wordpress', 'laravel', 'trusted by', 'clients']) {
      expect(allText, `What We Build must not lead with "${forbidden}"`).not.toContain(forbidden);
    }
  });

  test('R12 — AI section renders the title and all six transformation pairs (TECH-44)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const aiSection = page.locator('#ai-automation');
    await expect(aiSection, 'the AI section must render after the software story').toBeVisible();

    const sectionText = normalizeProse(await aiSection.innerText());
    expect(sectionText, 'AI section title must be "Add intelligence to your software." (R-12)')
      .toContain('add intelligence to your software');

    const pairs = aiSection.locator('.transformation-pair');
    await expect(pairs, 'the AI section must render six transformation pairs (R-12)').toHaveCount(6);
    const pairTexts = normalizeProse(await aiSection.locator('.transformation-pairs').innerText());
    expect(pairTexts, 'pair 1: Software → AI assistant').toContain('software');
    expect(pairTexts, 'pair 1: Software → AI assistant').toContain('ai assistant');
    expect(pairTexts, 'pair 6: Reporting → Intelligent analysis').toContain('reporting');
    expect(pairTexts, 'pair 6: Reporting → Intelligent analysis').toContain('intelligent analysis');

    await expect(
      aiSection.getByRole('link', { name: 'Explore AI & Automation', exact: true }),
      'the AI section CTA must lead to the AI service track (R-12)'
    ).toHaveAttribute('href', '/services');
  });

  test('R9 — process section renders five steps with the audit labeled optional (TECH-44)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const steps = page.locator('#process .editorial-step-card');
    await expect(steps, 'the process section must render five steps (R-9)').toHaveCount(5);

    const stepTitles = await steps.locator('h3').allTextContents();
    expect(stepTitles[0], 'step 01 must be Discovery').toContain('Discovery');
    expect(stepTitles[1], 'step 02 must be the optional Workflow Audit').toContain('Workflow Audit (optional)');
    expect(stepTitles[2], 'step 03 must be the scoped proposal').toContain('Scoped proposal');
    expect(stepTitles[3], 'step 04 must be Build').toContain('Build');
    expect(stepTitles[4], 'step 05 must be Support & maintenance').toContain('Support & maintenance');

    const processText = normalizeProse(await page.locator('#process').innerText());
    for (const lockedFact of ['15,000 etb', '40/30/30', '40 support hours']) {
      expect(processText, `process step must carry the locked fact "${lockedFact}"`).toContain(lockedFact);
    }
  });

  test('R11 — industries renders eight local-reality categories with no specialization claims (TECH-44)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const industries = page.locator('#industries .what-we-build-item');
    await expect(industries, 'industries must render eight categories (R-11)').toHaveCount(8);

    const sectionText = normalizeProse(await page.locator('#industries').innerText());
    expect(sectionText, 'industries must carry the local-reality anchoring line (R-11)')
      .toContain('we understand the realities of local businesses');
    for (const category of ['inventory & stock control', 'customer management / crm', 'school management', 'procurement']) {
      expect(sectionText, `industries must render the ${category} category`).toContain(category);
    }

    // Truth rule: no specialization claims, no "trusted by", no industry stats.
    for (const forbidden of ['trusted by', 'leading provider', 'top ', ' clients']) {
      expect(sectionText, `industries must not claim "${forbidden}"`).not.toContain(forbidden);
    }
  });

  test('R19/R8 — the offer ladder is gone; section 13 carries the audit terms, guarantee, and View Live Pricing (TECH-45)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    // R-19 — the 4-row offer ladder no longer exists on Home.
    await expect(page.locator('.offer-ladder'), 'the offer ladder must be removed from Home (R-19)').toHaveCount(0);

    // R-19 — meter labels are re-cut software-first.
    const meterText = (await page.locator('.meter-strip').innerText()).toUpperCase();
    expect(meterText, 'meter left label must be the web anchor').toContain('WEB · FROM 20,000 ETB');
    expect(meterText, 'meter right label must be the mobile anchor').toContain('MOBILE · FROM 40,000 ETB');

    // R-8 — section 13 renders the locked audit terms + guarantee + View Live Pricing.
    const auditCard = page.locator('#workflow-audit .audit-card');
    await expect(auditCard, 'section 13 must render the audit card').toBeVisible();
    // The PriceCounter count-up only starts once the counter enters the
    // viewport; a mid-animation read captures "0 etb". Scroll it in and let
    // toHaveText auto-retry until it lands on the locked figure.
    const counter = auditCard.locator('.price-counter');
    await counter.scrollIntoViewIfNeeded();
    await expect(counter, 'the audit counter must settle on the locked figure').toHaveText('15,000 ETB');
    const auditText = normalizeProse(await auditCard.innerText());
    expect(auditText, 'audit card must carry the locked 15,000 ETB figure').toContain('15,000 etb');
    expect(auditText, 'audit card must carry the 5 business days term').toContain('5 business days');
    expect(auditText, 'audit card must carry the 100% credit term').toContain('100% credited');
    expect(auditText, 'audit card must carry the guarantee line (C-3)').toContain('usable blueprint');

    const viewPricing = auditCard.getByRole('link', { name: 'View Live Pricing', exact: true });
    await expect(viewPricing, 'audit card must link to /pricing (R-8)').toHaveAttribute('href', '/pricing');

    // The audit CTA is secondary on Home (R-6 exception applies to the audit page).
    await expect(
      auditCard.getByRole('link', { name: 'Book Workflow Audit', exact: true }),
      'audit CTA must lead to the audit page'
    ).toHaveAttribute('href', '/workflow-audit');
  });

  test('R10 — case-study cards render locked copy, live links, and trilingual alt (TECH-47)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    const cards = page.locator('.case-study-card');
    await expect(cards, 'the Selected Work section must render two case-study cards (R-10)').toHaveCount(2);

    const sectionText = normalizeProse(await page.locator('#selected-work').innerText());
    expect(sectionText, 'Stealth Overlay copy must render').toContain('stealth overlay');
    expect(sectionText, 'Stealth Overlay description must render (R-10)').toContain('coding interviews');
    expect(sectionText, 'Rhobot Academy copy must render').toContain('rhobot academy');
    expect(sectionText, 'Rhobot Academy description must render (R-10)').toContain('amharic-language forex trading');
    expect(sectionText, 'claim level must be "Designed and developed by NovaTech"').toContain('designed and developed by novatech');

    // Live links open in a new tab (R-10).
    const stealthLink = page.locator('.case-study-card a[href="https://www.stealthoverlay.com/"]').first();
    await expect(stealthLink, 'Stealth Overlay must link to the live product').toBeVisible();
    await expect(stealthLink).toHaveAttribute('target', '_blank');
    const rhobotLink = page.locator('.case-study-card a[href="https://rhobotcapital.com/"]').first();
    await expect(rhobotLink, 'Rhobot Academy must link to the live product').toBeVisible();
    await expect(rhobotLink).toHaveAttribute('target', '_blank');

    // Truth gate (R-10): zero client business claims on the cards.
    for (const forbidden of ['4,000+ students', '4,000 students', 'six-figure', 'exness']) {
      expect(sectionText, `case-study cards must not claim "${forbidden}"`).not.toContain(forbidden);
    }

    // Screenshot alt text resolves in all three languages (R-17).
    for (const lang of ['am', 'om']) {
      // The mobile language switcher is only visible at the 390px viewport —
      // mirror the R17 test's viewport (the card copy above ran at 1440x900).
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      await page.locator('.navbar-mobile-actions .language-switcher-select').selectOption(lang);
      await expect.poll(async () => page.getAttribute('html', 'lang')).toBe(lang);

      const alts = await page.locator('.case-study-card img').evaluateAll((images) =>
        images.map((img) => img.getAttribute('alt') ?? '')
      );
      expect(alts.length, `${lang}: both screenshots must render alt text`).toBe(2);
      for (const alt of alts) {
        expect(alt.trim().length, `${lang}: alt text must not be empty`).toBeGreaterThan(0);
        expect(alt, `${lang}: alt text must not leak EN-only fallback markers`).not.toContain('undefined');
      }
    }
  });

  test('R17 — the home page renders in Amharic and Afaan Oromo without clipping, prices identical (TECH-48)', async ({ page }) => {
    const SECTIONS = [
      { id: 'hero', expectedEn: 'software built around your business' },
      { id: 'what-we-build', expectedEn: 'software for the way your business actually runs' },
      { id: 'ai-automation', expectedEn: 'add intelligence to your software' },
      { id: 'process', expectedEn: 'five steps from first call to running software' },
      { id: 'industries', expectedEn: 'systems for the realities of local businesses' },
    ];

    for (const lang of ['en', 'am', 'om']) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      await dismissLeadModalIfOpen(page);

      if (lang !== 'en') {
        await page.locator('.navbar-mobile-actions .language-switcher-select').selectOption(lang);
        await expect.poll(async () => page.getAttribute('html', 'lang')).toBe(lang);
      }

      // Sections render with translated content (not empty, not raw key paths).
      for (const { id } of SECTIONS) {
        const section = page.locator(`#${id}`);
        await expect(section, `${lang}: #${id} must render`).toBeVisible();
        const text = (await section.innerText()).trim();
        expect(text.length, `${lang}: #${id} must render translated content`).toBeGreaterThan(20);
        expect(text, `${lang}: #${id} must not leak raw i18n keys`).not.toContain('home.');
      }

      // Intake form labels resolve in the active language.
      const needLabel = await page.locator('label[for="project-intake-need"]').innerText();
      expect(needLabel.trim().length, `${lang}: the need field label must resolve`).toBeGreaterThan(0);
      await page.locator('#project-intake-need').selectOption('Not sure yet');
      const needOptionText = await page.locator('#project-intake-need option:checked').innerText();
      expect(needOptionText.trim().length, `${lang}: the "Not sure yet" option label must resolve`).toBeGreaterThan(0);

      // Prices identical across languages (R-17): the three trust anchors and
      // the audit figure must render byte-identical in every language.
      const trustRow = normalizeProse(await page.locator('.hero-trust-row').innerText());
      expect(trustRow, `${lang}: trust anchors must carry the web anchor`).toContain('web from 20,000 etb');
      expect(trustRow, `${lang}: trust anchors must carry the mobile anchor`).toContain('mobile from 40,000 etb');
      expect(trustRow, `${lang}: trust anchors must carry the SaaS anchor`).toContain('saas from 3,500 etb / month');
      // The audit counter count-up starts on viewport entry — scroll it in
      // and wait for it to settle before the byte-identical read. Read the
      // DOM text (textContent): the B40 body rule renders "etb" lowercase via
      // text-transform, and toHaveText/textContent compare pre-transform DOM
      // text ("15,000 ETB") — identical across languages either way.
      const auditCounter = page.locator('#workflow-audit .price-counter');
      await auditCounter.scrollIntoViewIfNeeded();
      await expect(auditCounter, `${lang}: the audit figure must be identical`).toHaveText('15,000 ETB');
      const auditPrice = ((await auditCounter.textContent()) ?? '').trim();
      expect(auditPrice, `${lang}: the audit figure must be identical`).toBe('15,000 ETB');

      // No horizontal clipping at 390px (Ethiopic line-height probe).
      const overflowPx = await page.evaluate(() => {
        const doc = document.documentElement;
        return Math.max(0, doc.scrollWidth - window.innerWidth);
      });
      expect(overflowPx, `${lang}: home must not clip horizontally at 390px`).toBeLessThanOrEqual(1);
    }
  });

  test('TECH-49 — brand and truth grep gates over src/, tests/, and public/ text sources', () => {
    const walkFiles = (dir, files = []) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          walkFiles(full, files);
        } else if (/\.(js|jsx|mjs|html|svg|txt|xml)$/.test(entry.name)) {
          // Self-reference exemption: this spec file intentionally names the
          // forbidden legacy brand ("NovaTech AI") in its own assertion
          // strings and messages. Excluding it by filename keeps the brand
          // and truth grep gates meaningful — src/, public/, and every other
          // test file are still scanned in full.
          if (entry.name === 'live-site.spec.js') {
            continue;
          }
          files.push(full);
        }
      }
      return files;
    };

    const sources = [
      ...walkFiles(fileURLToPath(new URL('../src/', import.meta.url))).map((file) => readFileSync(file, 'utf8')),
      ...walkFiles(fileURLToPath(new URL('../tests/', import.meta.url))).map((file) => readFileSync(file, 'utf8')),
      ...walkFiles(fileURLToPath(new URL('../public/', import.meta.url))).map((file) => readFileSync(file, 'utf8')),
    ];
    const countOf = (needle) => sources.reduce((sum, content) => sum + content.split(needle).length - 1, 0);

    // Brand gate (R-15): zero "NovaTech AI" in rendered sources (the owner-side
    // PDF binary is exempt per S-4 precedent; og-image.png regenerated in
    // TECH-50 and covered by the rendered meta/OG gate below).
    expect(countOf('NovaTech AI'), 'no "NovaTech AI" may remain in src/, tests/, or public/ text sources').toBe(0);

    // Truth gate (R-18): zero client business claims anywhere in sources.
    for (const claim of ['4,000+ students', '4,000 students', 'six-figure', 'Exness', 'trusted by']) {
      expect(countOf(claim), `no "${claim}" claim may remain in sources`).toBe(0);
    }
  });

  test('TECH-50 — document title and rendered meta lead with software; OG image cache-busted', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await dismissLeadModalIfOpen(page);

    // R-1/R-15 — the home title leads with software and carries the NovaTech brand.
    const title = await page.title();
    expect(title, 'home title must lead with software (R-1)').toMatch(/custom software/i);
    expect(title, 'home title must carry the NovaTech brand (R-15)').toContain('NovaTech');
    expect(title, 'home title must not carry the legacy brand').not.toContain('NovaTech AI');

    // Rendered meta description leads with software.
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description, 'meta description must lead with software (R-1)').toMatch(/custom software/i);

    // OG title/image reflect the software-first brand + cache-bust (A15).
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle, 'og:title must lead with software').toMatch(/custom software/i);
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage, 'og:image must carry the regenerated cache-bust (A15)').toContain('og-image.png?v=20260812');

    // /services title leads with the software lanes (R-5).
    await page.goto(`${BASE_URL}/services`, { waitUntil: 'networkidle' });
    const servicesTitle = await page.title();
    expect(servicesTitle, '/services title must lead with software lanes').toMatch(/custom software/i);
  });
});
