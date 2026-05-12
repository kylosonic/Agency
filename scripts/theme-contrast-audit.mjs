import { chromium } from '@playwright/test';

const BASE_URL = 'http://localhost:4173';

const ROUTES = [
  '/',
  '/services',
  '/pricing',
  '/workflow-audit',
  '/web-development',
  '/mobile-development',
  '/saas-solutions',
  '/additional-services',
  '/case-studies',
  '/portfolio',
  '/industries/real-estate',
  '/instant-quote',
  '/book-discovery-call',
  '/policy',
];

function formatColor(color) {
  return `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${color.a.toFixed(2)})`;
}

async function collectThemeFindings(page, route, theme) {
  return page.evaluate(({ route, theme }) => {
    const TARGET_SELECTOR = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'a',
      'button',
      'label',
      'li a',
      'small',
      'strong',
      '.btn',
      '.section-tag',
      '.hero-badge',
      '.page-hero-chip',
      '.searchable-brain-proof-label',
      '.ai-product-track-link',
      '.ai-pricing-audit-kicker',
      '.ai-supporting-kicker',
      '.footer-links a',
    ].join(',');

    const clamp = (v) => Math.max(0, Math.min(255, v));

    const parseColor = (input) => {
      if (!input || input === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0 };
      }

      const value = input.trim().toLowerCase();

      if (value.startsWith('rgba(') || value.startsWith('rgb(')) {
        const nums = value
          .replace(/rgba?\(/, '')
          .replace(')', '')
          .split(',')
          .map((part) => part.trim());

        return {
          r: Number(nums[0]) || 0,
          g: Number(nums[1]) || 0,
          b: Number(nums[2]) || 0,
          a: nums[3] == null ? 1 : Number(nums[3]) || 0,
        };
      }

      if (value.startsWith('#')) {
        let hex = value.slice(1);
        if (hex.length === 3) {
          hex = hex.split('').map((c) => c + c).join('');
        }

        if (hex.length === 6) {
          const num = Number.parseInt(hex, 16);
          return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255,
            a: 1,
          };
        }
      }

      if (value.startsWith('color(')) {
        const match = value.match(/color\(\s*srgb\s+([0-9\.]+)\s+([0-9\.]+)\s+([0-9\.]+)(?:\s*\/\s*([0-9\.]+))?\s*\)/);
        if (match) {
          return {
            r: Number(match[1]) * 255,
            g: Number(match[2]) * 255,
            b: Number(match[3]) * 255,
            a: match[4] == null ? 1 : Number(match[4]),
          };
        }
      }

      return { r: 0, g: 0, b: 0, a: 1 };
    };

    const parseGradientColor = (input) => {
      if (!input || input === 'none') {
        return null;
      }

      const matches = input.match(/rgba?\([^\)]+\)|color\(\s*srgb[^\)]+\)|#[0-9a-fA-F]{3,8}/g);
      if (!matches || !matches.length) {
        return null;
      }

      const swatches = matches.map((token) => parseColor(token)).filter((color) => color.a > 0);
      if (!swatches.length) {
        return null;
      }

      const avg = swatches.reduce(
        (acc, color) => ({
          r: acc.r + color.r,
          g: acc.g + color.g,
          b: acc.b + color.b,
        }),
        { r: 0, g: 0, b: 0 }
      );

      return {
        r: avg.r / swatches.length,
        g: avg.g / swatches.length,
        b: avg.b / swatches.length,
        a: 1,
      };
    };

    const blend = (fg, bg) => {
      const alpha = fg.a + bg.a * (1 - fg.a);
      if (alpha <= 0) {
        return { r: 0, g: 0, b: 0, a: 0 };
      }

      return {
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
        a: alpha,
      };
    };

    const toLinear = (channel) => {
      const c = clamp(channel) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };

    const luminance = (color) => {
      return 0.2126 * toLinear(color.r) + 0.7152 * toLinear(color.g) + 0.0722 * toLinear(color.b);
    };

    const contrastRatio = (fg, bg) => {
      const l1 = luminance(fg);
      const l2 = luminance(bg);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    };

    const isVisible = (element, style) => {
      if (!element || !style) {
        return false;
      }

      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) {
        return false;
      }

      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    const selectorPath = (element) => {
      if (!element || !element.tagName) {
        return 'unknown';
      }

      const parts = [];
      let node = element;

      for (let i = 0; i < 3 && node && node.tagName; i += 1) {
        const tag = node.tagName.toLowerCase();
        const id = node.id ? `#${node.id}` : '';
        const classes = node.classList?.length
          ? `.${Array.from(node.classList).slice(0, 2).join('.')}`
          : '';
        parts.unshift(`${tag}${id}${classes}`);
        node = node.parentElement;
      }

      return parts.join(' > ');
    };

    const htmlBg = parseColor(getComputedStyle(document.documentElement).backgroundColor);
    const bodyBg = parseColor(getComputedStyle(document.body).backgroundColor);
    const baseBg = bodyBg.a > 0 ? blend(bodyBg, htmlBg) : htmlBg;

    const nodes = Array.from(document.querySelectorAll(TARGET_SELECTOR));
    const findings = [];

    for (const element of nodes) {
      const style = getComputedStyle(element);
      if (!isVisible(element, style)) {
        continue;
      }

      const text = (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim();
      if (!text && element.tagName.toLowerCase() !== 'button') {
        continue;
      }

      let bg = { ...baseBg };
      const lineage = [];
      let current = element;

      while (current && current !== document.documentElement) {
        lineage.push(current);
        current = current.parentElement;
      }

      for (let i = lineage.length - 1; i >= 0; i -= 1) {
        const nodeStyle = getComputedStyle(lineage[i]);
        const gradientBg = parseGradientColor(nodeStyle.backgroundImage);

        if (gradientBg) {
          bg = blend(gradientBg, bg);
          continue;
        }

        const nodeBg = parseColor(nodeStyle.backgroundColor);
        if (nodeBg.a > 0) {
          bg = blend(nodeBg, bg);
        }
      }

      const fg = parseColor(style.color);
      const ratio = contrastRatio(fg, bg);
      const fontSize = Number.parseFloat(style.fontSize) || 16;
      const fontWeight = Number.parseInt(style.fontWeight, 10) || 400;
      const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      const minimum = isLarge ? 3 : 4.5;

      if (ratio < minimum) {
        findings.push({
          theme,
          route,
          selector: selectorPath(element),
          sample: text.slice(0, 80),
          ratio: Number(ratio.toFixed(2)),
          minimum,
          fontSize: Number(fontSize.toFixed(2)),
          fontWeight,
          foreground: {
            r: Math.round(fg.r),
            g: Math.round(fg.g),
            b: Math.round(fg.b),
            a: Number(fg.a.toFixed(2)),
          },
          background: {
            r: Math.round(bg.r),
            g: Math.round(bg.g),
            b: Math.round(bg.b),
            a: Number(bg.a.toFixed(2)),
          },
        });
      }
    }

    findings.sort((a, b) => a.ratio - b.ratio);

    return findings.slice(0, 40);
  }, { route, theme });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const allFindings = [];

  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

    await context.addInitScript((selectedTheme) => {
      localStorage.setItem('novatech-theme', selectedTheme);
      if (selectedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }, theme);

    const page = await context.newPage();

    for (const route of ROUTES) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(180);

      const findings = await collectThemeFindings(page, route, theme);
      allFindings.push(...findings);
    }

    await context.close();
  }

  await browser.close();

  const sorted = allFindings.sort((a, b) => a.ratio - b.ratio);

  if (!sorted.length) {
    console.log('No contrast issues detected with current scan rules.');
    return;
  }

  console.log(`Found ${sorted.length} potential contrast issues.`);
  console.log(JSON.stringify(sorted.slice(0, 120), null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
