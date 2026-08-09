/* Phase 7 G12 — trilingual screenshot + Amharic glyph-integrity evidence run */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'reports', 'phase7-screenshots');
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = ['/', '/services', '/pricing', '/instant-quote', '/policy', '/web-development'];
const VIEWPORTS = [
  { name: '1440x900', width: 1440, height: 900 },
  { name: '390x844', width: 390, height: 844 },
];
const LANGS = ['en', 'am', 'om'];

(async () => {
  const browser = await chromium.launch();
  const results = [];
  const glyphIssues = [];

  for (const lang of LANGS) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await ctx.newPage();
      await page.addInitScript((l) => localStorage.setItem('novatech-language', l), lang);

      for (const route of ROUTES) {
        const name = `route${route === '/' ? '-home' : route.replaceAll('/', '-')}`;
        const file = path.join(OUT, `${lang}_${vp.name}_${name}.png`);
        try {
          await page.goto('http://localhost:4173' + route, { waitUntil: 'networkidle', timeout: 30000 });
          await page.screenshot({ path: file, fullPage: false });
          results.push(`OK  ${lang}/${vp.name}${route} -> ${file}`);

          // Amharic glyph-integrity checks (machine evidence; human eyeballs PNGs in UAT)
          if (lang === 'am') {
            const h1 = page.locator('h1').first();
            if (await h1.count()) {
              const g = await h1.evaluate((el) => {
                const r = el.getBoundingClientRect();
                const cs = getComputedStyle(el);
                return {
                  overflowX: el.scrollWidth - el.clientWidth,
                  overflowY: el.scrollHeight - el.clientHeight,
                  top: r.top, bottom: r.bottom,
                  vh: window.innerHeight,
                  lineHeight: cs.lineHeight,
                  letterSpacing: cs.letterSpacing,
                  fontFamily: cs.fontFamily.slice(0, 60),
                  clipped: r.top < -1 || r.bottom > window.innerHeight + 1,
                };
              });
              const ok = g.overflowX <= 1 && !g.clipped && g.letterSpacing !== 'normal' || g.letterSpacing === 'normal' ? true : parseFloat(g.letterSpacing) >= 0;
              glyphIssues.push({
                route, viewport: vp.name, ok,
                overflowX: g.overflowX, clipped: g.clipped,
                lineHeight: g.lineHeight, letterSpacing: g.letterSpacing,
                font: g.fontFamily,
              });
            }
          }
        } catch (e) {
          results.push(`FAIL ${lang}/${vp.name}${route}: ${e.message.split('\n')[0]}`);
        }
      }
      await ctx.close();
    }
  }

  await browser.close();
  console.log('--- screenshots ---');
  results.forEach((r) => console.log(r));
  console.log('--- AM glyph checks (h1) ---');
  glyphIssues.forEach((g) => console.log(JSON.stringify(g)));
  const bad = glyphIssues.filter((g) => !g.ok || g.overflowX > 1 || g.clipped);
  console.log(`AM glyph issues: ${bad.length}/${glyphIssues.length}`);
  fs.writeFileSync(path.join(OUT, 'glyph-evidence.json'), JSON.stringify(glyphIssues, null, 2));
})().catch((e) => { console.error(e); process.exit(1); });
