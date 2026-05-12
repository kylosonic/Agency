import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const BASE_URL = 'http://localhost:4173';
const OUTPUT_DIR = path.resolve('reports', 'theme-visual-audit');

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

const SECTION_RULES = [
  { name: 'heroTitle', selectors: ['h1'] },
  {
    name: 'primaryBodyText',
    selectors: [
      '.hero-copy p',
      '.page-hero-content p',
      '.searchable-brain-copy p',
      'main p',
    ],
  },
  { name: 'primaryCTA', selectors: ['.btn.btn-primary', 'main button.btn-primary', 'main a.btn-primary'] },
  { name: 'footerHeading', selectors: ['.footer h4'] },
  { name: 'footerLink', selectors: ['.footer-links a', '.footer-bottom a'] },
];

function routeToSlug(route) {
  if (route === '/') {
    return 'home';
  }

  return route.replace(/^\//, '').replaceAll('/', '-');
}

function toPassFail(value) {
  return value ? 'PASS' : 'FAIL';
}

async function ensureOutputDirs() {
  await fs.mkdir(path.join(OUTPUT_DIR, 'light'), { recursive: true });
  await fs.mkdir(path.join(OUTPUT_DIR, 'dark'), { recursive: true });
}

function createMarkdown(report) {
  const header = [
    '| Route | Theme | Hero | Body | Primary CTA | Footer Heading | Footer Link | Overall |',
    '|---|---|---|---|---|---|---|---|',
  ];

  const rows = report.results.map((result) => {
    const sectionMap = Object.fromEntries(result.sections.map((section) => [section.name, section.pass]));

    return [
      result.route,
      result.theme,
      toPassFail(sectionMap.heroTitle),
      toPassFail(sectionMap.primaryBodyText),
      toPassFail(sectionMap.primaryCTA),
      toPassFail(sectionMap.footerHeading),
      toPassFail(sectionMap.footerLink),
      toPassFail(result.pass),
    ].join(' | ').replace(/^/, '| ').concat(' |');
  });

  const summary = [
    '',
    `Total rows: ${report.results.length}`,
    `Pass: ${report.summary.passCount}`,
    `Fail: ${report.summary.failCount}`,
  ];

  return [...header, ...rows, ...summary].join('\n');
}

async function runAudit() {
  await ensureOutputDirs();

  const browser = await chromium.launch({ headless: true });
  const results = [];

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
      const url = `${BASE_URL}${route}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(200);

      const audit = await page.evaluate((rules) => {
        const clamp = (value) => Math.max(0, Math.min(255, value));

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
              hex = hex.split('').map((char) => char + char).join('');
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

          const total = swatches.reduce(
            (acc, color) => ({
              r: acc.r + color.r,
              g: acc.g + color.g,
              b: acc.b + color.b,
            }),
            { r: 0, g: 0, b: 0 }
          );

          return {
            r: total.r / swatches.length,
            g: total.g / swatches.length,
            b: total.b / swatches.length,
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

        const isVisible = (el, style) => {
          if (!el || !style) {
            return false;
          }

          if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) {
            return false;
          }

          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        };

        const htmlBg = parseColor(getComputedStyle(document.documentElement).backgroundColor);
        const bodyBg = parseColor(getComputedStyle(document.body).backgroundColor);
        const baseBg = bodyBg.a > 0 ? blend(bodyBg, htmlBg) : htmlBg;

        const evaluateElementContrast = (el) => {
          const style = getComputedStyle(el);
          const fg = parseColor(style.color);

          let bg = { ...baseBg };
          const lineage = [];
          let current = el;

          while (current && current !== document.documentElement) {
            lineage.push(current);
            current = current.parentElement;
          }

          for (let i = lineage.length - 1; i >= 0; i -= 1) {
            const nodeStyle = getComputedStyle(lineage[i]);
            const gradient = parseGradientColor(nodeStyle.backgroundImage);
            if (gradient) {
              bg = blend(gradient, bg);
              continue;
            }

            const nodeBg = parseColor(nodeStyle.backgroundColor);
            if (nodeBg.a > 0) {
              bg = blend(nodeBg, bg);
            }
          }

          const ratio = contrastRatio(fg, bg);
          const fontSize = Number.parseFloat(style.fontSize) || 16;
          const fontWeight = Number.parseInt(style.fontWeight, 10) || 400;
          const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
          const minimum = isLarge ? 3 : 4.5;

          return {
            ratio: Number(ratio.toFixed(2)),
            minimum,
            pass: ratio >= minimum,
          };
        };

        const sectionResults = rules.map((rule) => {
          let target = null;

          for (const selector of rule.selectors) {
            const matches = Array.from(document.querySelectorAll(selector));
            const visibleMatch = matches.find((el) => isVisible(el, getComputedStyle(el)));
            if (visibleMatch) {
              target = visibleMatch;
              break;
            }
          }

          if (!target) {
            return {
              name: rule.name,
              pass: false,
              reason: 'No visible matching selector',
              selector: rule.selectors[0],
            };
          }

          const contrast = evaluateElementContrast(target);

          return {
            name: rule.name,
            pass: contrast.pass,
            ratio: contrast.ratio,
            minimum: contrast.minimum,
            selector: target.tagName.toLowerCase(),
            text: (target.innerText || target.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
          };
        });

        return {
          sections: sectionResults,
          pass: sectionResults.every((item) => item.pass),
        };
      }, SECTION_RULES);

      const slug = routeToSlug(route);
      const shotPath = path.join(OUTPUT_DIR, theme, `${slug}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });

      results.push({
        route,
        theme,
        screenshot: path.relative(process.cwd(), shotPath).replaceAll('\\', '/'),
        pass: audit.pass,
        sections: audit.sections,
      });
    }

    await context.close();
  }

  await browser.close();

  const report = {
    generatedAt: new Date().toISOString(),
    routes: ROUTES,
    sections: SECTION_RULES.map((rule) => rule.name),
    summary: {
      passCount: results.filter((item) => item.pass).length,
      failCount: results.filter((item) => !item.pass).length,
    },
    results,
  };

  await fs.writeFile(path.join(OUTPUT_DIR, 'report.json'), JSON.stringify(report, null, 2), 'utf8');
  await fs.writeFile(path.join(OUTPUT_DIR, 'report.md'), createMarkdown(report), 'utf8');

  console.log(`Visual theme audit complete. Pass: ${report.summary.passCount}, Fail: ${report.summary.failCount}`);
  console.log(`Artifacts: ${path.relative(process.cwd(), OUTPUT_DIR).replaceAll('\\', '/')}`);
}

runAudit().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
