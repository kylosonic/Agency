/**
 * TECH-47 (NB-49 / R-10): capture real desktop-width screenshots of the two
 * live NovaTech-delivered products for the Selected Work cards.
 *
 * Contract (R-10 + plan §4):
 *  - One 1440×900 viewport, full-page capture per site.
 *  - Output: WebP (quality 80) into public/case-studies/<slug>.webp.
 *  - Meaningfulness probe BEFORE capture: the page must render an `h1` and
 *    >= ~120 chars of body text after settling; a blank SPA, login wall, or
 *    navigation failure → print `SKIP <site> — <reason>`, write NO asset,
 *    exit 0 (the build proceeds text-only; CaseStudyCard onError covers a
 *    missing/blocked asset at runtime).
 *  - Dev tooling making outbound GETs at build time only (plan §9).
 */

import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, '../public/case-studies');

const SITES = [
  {
    slug: 'stealth-overlay',
    url: 'https://www.stealthoverlay.com/',
    label: 'Stealth Overlay',
  },
  {
    slug: 'rhobot-academy',
    url: 'https://rhobotcapital.com/',
    label: 'Rhobot Academy',
  },
];

const MIN_BODY_TEXT_CHARS = 120;
const NAV_TIMEOUT_MS = 45_000;
const SETTLE_MS = 2_500;

async function skip(site, reason) {
  console.log(`SKIP ${site.label} (${site.url}) — ${reason}`);
}

async function captureSite(browser, site) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  let status = 'unknown';
  try {
    // Live marketing sites keep connections busy (analytics, chat widgets) —
    // domcontentloaded + a settle wait is more reliable than networkidle.
    const response = await page.goto(site.url, {
      waitUntil: 'domcontentloaded',
      timeout: NAV_TIMEOUT_MS,
    });
    status = response?.status() ?? 'no-response';
  } catch (error) {
    await skip(site, `navigation failed (${String(error.name || error)}: ${String(error.message || '').slice(0, 120)})`);
    await page.close();
    return;
  }

  try {
    await page.waitForTimeout(SETTLE_MS);

    // Meaningfulness probe (R-10): real rendered content, not a blank SPA.
    const probe = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1')).filter((node) => {
        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      const bodyText = (document.body?.innerText ?? '').replace(/\s+/g, ' ').trim();
      const loginWall = /sign\s*in|log\s*in|password/i.test(document.title || '') || bodyText.length < 20;
      return {
        hasH1: headings.length > 0,
        textLength: bodyText.length,
        loginWall,
      };
    });

    if (!probe.hasH1) {
      await skip(site, `no rendered h1 (blank SPA or unrenderable page, status ${status})`);
      await page.close();
      return;
    }

    if (probe.textLength < MIN_BODY_TEXT_CHARS) {
      await skip(site, `rendered body text too short (${probe.textLength} chars < ${MIN_BODY_TEXT_CHARS}, status ${status})`);
      await page.close();
      return;
    }

    if (probe.loginWall) {
      await skip(site, `login wall detected (status ${status})`);
      await page.close();
      return;
    }

    await mkdir(OUTPUT_DIR, { recursive: true });
    const outputPath = path.join(OUTPUT_DIR, `${site.slug}.webp`);

    // Playwright's screenshot API only encodes png|jpeg — capture a full-page
    // PNG, then re-encode to genuine WebP (quality 0.8) via canvas.toBlob
    // inside Chromium (zero new dependencies; R-10 asks for WebP).
    const pngBuffer = await page.screenshot({ fullPage: true, type: 'png' });
    const webpBase64 = await page.evaluate(async (pngBase64) => {
      const img = new Image();
      img.src = `data:image/png;base64,${pngBase64}`;
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return null;
      }
      ctx.drawImage(img, 0, 0);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.8));
      if (!blob) {
        return null;
      }
      const buffer = await blob.arrayBuffer();
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const chunk = 0x8000;
      for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
      }
      return btoa(binary);
    }, pngBuffer.toString('base64'));

    if (!webpBase64) {
      await skip(site, 'webp encode failed (canvas.toBlob unsupported)');
      await page.close();
      return;
    }

    await writeFile(outputPath, Buffer.from(webpBase64, 'base64'));
    const { size } = await stat(outputPath);
    console.log(`CAPTURED ${site.label} (${site.url}) — status ${status}, ${probe.textLength} chars, ${size} bytes -> public/case-studies/${site.slug}.webp`);
  } catch (error) {
    await skip(site, `capture failed (${String(error.name || error)}: ${String(error.message || '').slice(0, 120)})`);
  } finally {
    await page.close();
  }
}

async function captureWithRetry(browser, site) {
  await captureSite(browser, site);
  const outputPath = path.join(OUTPUT_DIR, `${site.slug}.webp`);
  const exists = await import('node:fs/promises').then((mod) =>
    mod.access(outputPath).then(() => true, () => false)
  );
  if (!exists) {
    // One bounded retry — transient network failures must not silently SKIP
    // a renderable product page (R-10 SKIP is for unrenderable pages only).
    console.log(`RETRY ${site.label} (${site.url})`);
    await captureSite(browser, site);
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const site of SITES) {
      await captureWithRetry(browser, site);
    }
  } finally {
    await browser.close();
  }
  console.log('Screenshot pipeline complete (SKIPs exit 0 — cards ship text-only).');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
