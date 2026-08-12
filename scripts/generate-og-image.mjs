import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, '../public/og-image.png');

const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      :root {
        color-scheme: light;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        width: 1200px;
        height: 630px;
        font-family: "Segoe UI", "Trebuchet MS", sans-serif;
        color: #26241f;
        background:
          radial-gradient(circle at 82% 18%, rgba(36, 81, 58, 0.14), transparent 38%),
          radial-gradient(circle at 16% 84%, rgba(36, 81, 58, 0.18), transparent 42%),
          linear-gradient(138deg, #f7f4ec 0%, #efe9dc 42%, #e8e0cf 100%);
        position: relative;
        overflow: hidden;
      }

      .frame {
        width: 100%;
        height: 100%;
        padding: 58px 72px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
      }

      .grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(38, 36, 31, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(38, 36, 31, 0.08) 1px, transparent 1px);
        background-size: 42px 42px;
        opacity: 0.25;
        mask-image: linear-gradient(160deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2));
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 14px;
        z-index: 2;
      }

      .dot {
        width: 22px;
        height: 22px;
        border-radius: 999px;
        background: linear-gradient(145deg, #2f6b4a, #1d4430);
        box-shadow: 0 0 0 7px rgba(36, 81, 58, 0.16);
      }

      .brand-name {
        font-size: 36px;
        font-weight: 700;
        letter-spacing: 0.8px;
      }

      .headline {
        z-index: 2;
        max-width: 1000px;
      }

      .title {
        font-size: 66px;
        line-height: 1.03;
        margin: 0;
        font-weight: 800;
      }

      .subtitle {
        margin-top: 22px;
        font-size: 31px;
        line-height: 1.25;
        color: #57534e;
        max-width: 1000px;
      }

      .pill-row {
        display: flex;
        gap: 14px;
        z-index: 2;
      }

      .pill {
        font-size: 24px;
        font-weight: 600;
        color: #1d4430;
        border: 1px solid rgba(36, 81, 58, 0.32);
        border-radius: 999px;
        padding: 12px 20px;
        background: rgba(255, 255, 255, 0.62);
        backdrop-filter: blur(4px);
      }
    </style>
  </head>
  <body>
    <div class="grid"></div>
    <div class="frame">
      <div class="brand">
        <div class="dot"></div>
        <div class="brand-name">NovaTech</div>
      </div>
      <section class="headline">
        <h1 class="title">Software built around your business.</h1>
        <p class="subtitle">Custom software, web, mobile, and SaaS — with AI automation where it creates real business value.</p>
      </section>
      <div class="pill-row">
        <span class="pill">Custom Software</span>
        <span class="pill">Web + Mobile</span>
        <span class="pill">SaaS Delivery</span>
        <span class="pill">AI Automation</span>
      </div>
    </div>
  </body>
</html>
`;

await mkdir(path.dirname(outputPath), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.screenshot({ path: outputPath, type: 'png' });
await browser.close();

console.log(`Created OG image at: ${outputPath}`);
