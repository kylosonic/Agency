import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  getPricingGuideSummary,
  getWebPackages,
  getMobilePackages,
  getAdditionalServices,
  getSaasPackages,
} from '../src/services/pricingData.js';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderList(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderPackageCards(packages) {
  return packages.map((pkg) => `
    <article class="card">
      <p class="eyebrow">${escapeHtml(pkg.price)}</p>
      <h3>${escapeHtml(pkg.title)}</h3>
      <p class="meta">${escapeHtml(pkg.timeline)}</p>
      <p>${escapeHtml(pkg.idealFor)}</p>
      ${renderList(pkg.features)}
    </article>
  `).join('');
}

function renderAutomationCards(tiers) {
  return tiers.map((tier) => `
    <article class="card">
      <p class="eyebrow">${escapeHtml(tier.setupPrice)}</p>
      <h3>${escapeHtml(tier.title)}</h3>
      <p class="meta">${escapeHtml(`${tier.bestFor} / ${tier.timeline}`)}</p>
      <p>${escapeHtml(tier.scope)}</p>
      <p><strong>Monthly support:</strong> ${escapeHtml(tier.monthlySupport)}</p>
      <h4>Setup includes</h4>
      ${renderList(tier.includes)}
      <h4>Monthly support includes</h4>
      ${renderList(tier.supportIncludes)}
    </article>
  `).join('');
}

function renderAdditionalServices(services) {
  return `
    <table>
      <thead>
        <tr>
          <th>Service</th>
          <th>Description</th>
          <th>Price</th>
          <th>Billing</th>
        </tr>
      </thead>
      <tbody>
        ${services.map((item) => `
          <tr>
            <td>${escapeHtml(item.service)}</td>
            <td>${escapeHtml(item.description)}</td>
            <td>${escapeHtml(item.price)}</td>
            <td>${escapeHtml(item.type)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderSaasCards(plans) {
  return plans.map((pkg) => `
    <article class="card">
      <p class="eyebrow">${escapeHtml(pkg.price)}</p>
      <h3>${escapeHtml(pkg.title)}</h3>
      <p class="meta">Setup ${pkg.setupFee.toLocaleString()} ETB · Annual ${pkg.annual.toLocaleString()} ETB · ${escapeHtml(pkg.billingNote)}</p>
      ${renderList(pkg.features)}
    </article>
  `).join('');
}

async function main() {
  const summary = getPricingGuideSummary();
  const webPackages = await getWebPackages();
  const mobilePackages = await getMobilePackages();
  const additionalServices = await getAdditionalServices();
  const saasPackages = await getSaasPackages();
  const outputPath = resolve('public', 'NovaTechAI_2026_Service_Menu_and_Pricing_Guide.pdf');
  const generatedAt = new Date().toISOString().slice(0, 10);

  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>NovaTech Pricing Sheet</title>
        <style>
          :root {
            --bg: #fafaf9;
            --surface: #ffffff;
            --ink: #1c1917;
            --muted: #57534e;
            --line: #d6d3d1;
            --accent: #8a5a2b;
            --band: #0c0c0e;
            --bandInk: #f5f5f4;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: var(--ink);
            background: var(--bg);
            line-height: 1.5;
          }
          .page {
            padding: 40px 46px 56px;
          }
          .hero {
            border: 1px solid var(--line);
            background: var(--surface);
            border-radius: 22px;
            padding: 28px 30px;
            margin-bottom: 28px;
          }
          .eyebrow {
            margin: 0 0 8px;
            font-size: 12px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--accent);
            font-weight: 700;
          }
          h1 {
            margin: 0 0 10px;
            font-size: 30px;
            line-height: 1.15;
          }
          h2 {
            margin: 0 0 10px;
            font-size: 22px;
            line-height: 1.2;
          }
          h3 {
            margin: 0 0 8px;
            font-size: 16px;
          }
          h4 {
            margin: 14px 0 8px;
            font-size: 13px;
          }
          p {
            margin: 0 0 10px;
          }
          .meta {
            color: var(--muted);
            font-size: 13px;
            font-weight: 700;
          }
          .pill-row {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-top: 14px;
          }
          .pill {
            border: 1px solid var(--line);
            border-radius: 999px;
            padding: 6px 10px;
            font-size: 11px;
            font-weight: 700;
            background: var(--surface);
          }
          .section {
            margin-bottom: 28px;
          }
          .band {
            background: var(--band);
            color: var(--bandInk);
            border-radius: 22px;
            padding: 24px 26px;
            margin-bottom: 28px;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }
          .grid.three {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .card {
            border: 1px solid var(--line);
            background: var(--surface);
            border-radius: 18px;
            padding: 18px;
            break-inside: avoid;
          }
          .band .card {
            background: rgba(255,255,255,0.05);
            border-color: rgba(255,255,255,0.12);
            color: var(--bandInk);
          }
          ul {
            padding-left: 18px;
            margin: 0;
          }
          li { margin-bottom: 6px; }
          table {
            width: 100%;
            border-collapse: collapse;
            background: var(--surface);
            border-radius: 18px;
            overflow: hidden;
          }
          th, td {
            border: 1px solid var(--line);
            padding: 10px 12px;
            vertical-align: top;
            font-size: 12px;
            text-align: left;
          }
          th {
            background: #f5f5f4;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 10px;
          }
          .small-note {
            font-size: 12px;
            color: var(--muted);
          }
          .footer-note {
            margin-top: 16px;
            font-size: 11px;
            color: var(--muted);
          }
        </style>
      </head>
      <body>
        <div class="page">
          <section class="hero">
            <p class="eyebrow">NovaTech pricing sheet</p>
            <h1>Current ETB pricing and engagement model</h1>
            <p>This document is generated from the same live ETB source used on the redesigned site.</p>
            <div class="pill-row">
              <span class="pill">Generated ${escapeHtml(generatedAt)}</span>
              <span class="pill">ETB only</span>
              <span class="pill">International engagements quoted individually</span>
              <span class="pill">SaaS: setup + monthly pricing</span>
            </div>
          </section>

          <section class="section">
            <p class="eyebrow">Start here</p>
            <div class="card">
              <h2>${escapeHtml(summary.workflowAudit.title)} — ${escapeHtml(summary.workflowAudit.price)}</h2>
              <p>${escapeHtml(summary.workflowAudit.description)}</p>
              ${renderList(summary.workflowAudit.outputs)}
            </div>
          </section>

          <section class="section">
            <p class="eyebrow">AI automation</p>
            <div class="grid">
              ${renderAutomationCards(summary.automationTiers)}
            </div>
          </section>

          <section class="band">
            <p class="eyebrow">Product builds</p>
            <h2>Web and mobile packages</h2>
            <div class="grid three">
              ${renderPackageCards(webPackages)}
            </div>
            <div style="height:14px"></div>
            <div class="grid">
              ${renderPackageCards(mobilePackages)}
            </div>
          </section>

          <section class="section">
            <p class="eyebrow">Support and add-ons</p>
            ${renderAdditionalServices(additionalServices)}
          </section>

          <section class="section">
            <div class="grid three">
              ${renderSaasCards(saasPackages)}
            </div>
            <p class="small-note">Each SaaS plan is a one-time setup plus a monthly subscription. Annual billing covers 10 months for the price of 12 — "Save 2 months".</p>
          </section>

          <section class="section">
            <div class="card">
              <p class="eyebrow">Terms</p>
              <h2>Commercial terms</h2>
              <ul>
                <li>Development projects use milestone billing: 40% at kickoff, 30% at design or prototype approval, and 30% before deployment.</li>
                <li>Client ownership transfers after final payment.</li>
                <li>Bank transfer (CBE Birr) is the only live payment method today.</li>
                <li>Telebirr, Chapa, and card payments are after-licensing capabilities, not current promises.</li>
              </ul>
            </div>
            <p class="footer-note">NovaTech AI · Addis Ababa, Ethiopia · This sheet reflects the live ETB table currently published on the site.</p>
          </section>
        </div>
      </body>
    </html>
  `;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '16mm', right: '12mm', bottom: '16mm', left: '12mm' },
    printBackground: true,
  });
  await browser.close();

  await writeFile(resolve('public', 'NovaTechAI_2026_Service_Menu_and_Pricing_Guide.readme.txt'), `Generated from scripts/generate-pricing-guide.mjs on ${generatedAt}.\n`);
  console.log(`Generated pricing guide at ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});