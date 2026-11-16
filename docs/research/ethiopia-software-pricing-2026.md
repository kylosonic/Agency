# Ethiopian software pricing research — November 2026

Research date: **2026-11-16**

This note records the public evidence used to set NovaTech's published ETB
anchors. It is a pricing input, not a claim that every project fits one number.
Final quotes still depend on scope, integrations, delivery speed, support, and
third-party fees.

## Sources checked

| Source | Public evidence used | URL |
| --- | --- | --- |
| PrimeTech PLC | Website packages at 30,000, 46,000, and 100,000 ETB, excluding VAT | https://primetechplc.com/pricing/website-design-development-package |
| Creative Web Ethiopia | Landing page 25,000; business site 45,000; corporate site 60,000; e-commerce 120,000 ETB. Domain and hosting 6,500–10,500 ETB/year | https://www.creativewebet.com/website-design-price-in-ethiopia/ |
| Ampol Technologies | Cross-platform mobile apps 60,000–250,000 ETB; native apps 100,000–500,000 ETB | https://ampoltechethiopia.com/services/mobile-app-development |
| HahuCloud | Ethiopian hosting plans around 6,500–9,800 ETB/year | https://www.hahucloud.com/ |
| Techno Bros | Ethiopian hosting plans around 11,500–30,000 ETB/year | https://technobros.net/ |
| Appther | Ethiopian mobile benchmark: simple apps USD 3,000–10,000; medium apps USD 10,000–30,000; complex apps USD 30,000–100,000+ | https://www.appther.com/blogs/mobile-app-development-cost-ethiopia |
| Intigate Technologies | Software maintenance commonly budgeted around 15–25% of the original build value per year | https://www.intigatetechnologies.com/software-maintenance-cost-per-year/ |
| National Bank of Ethiopia | Official foreign-exchange reference for planning conversions | https://nbe.gov.et/exchange/ |
| Clutch Ethiopia agency directory | Local agency location and service-market context; directory itself does not provide one standard project quote | https://clutch.co/et/web-designers |

The November 2026 research pass observed a planning range around USD 1 =
ETB 161–163. International benchmarks were converted only to sanity-check
local ranges; NovaTech's public website remains ETB-only.

## Published anchors

### Scoping and web

- Software blueprint: **25,000 ETB fixed**, credited toward the build.
- Launch website: **from 30,000 ETB**.
- Growth website: **60,000–120,000 ETB**.
- Custom web platform: **from 150,000 ETB**.

The web ladder follows local published packages, then adds a clearly separated
platform tier for authentication, dashboards, integrations, automated testing,
and operational handover.

### Mobile

- Mobile MVP: **from 60,000 ETB**.
- Business mobile app: **150,000–300,000 ETB**.
- Enterprise mobile platform: **from 350,000 ETB**.

The local cross-platform range starts at 60,000 ETB. Native work, regulated
workflows, multiple roles, and payment integration justify the higher bands.

### Custom software and SaaS

- Focused custom software: **from 100,000 ETB**.
- Multi-system platform: **from 250,000 ETB**.
- Enterprise platform: **from 600,000 ETB**.
- Custom SaaS product build: **from 180,000 ETB**.
- Ready-made SaaS: **4,500–7,500 ETB/month**, with implementation from
  **40,000–60,000 ETB**.

There is less transparent public ETB pricing for custom platforms and SaaS
product builds. Those anchors were set above the local website and mobile entry
ranges after using global product benchmarks as a sanity check, then reduced
for positioning in the Ethiopian market. They remain explicitly directional.

### Engineering support

- Hosting and infrastructure: **6,500–15,000 ETB/year**.
- API and system integration: **30,000–100,000 ETB**.
- Application modernization: **75,000–250,000 ETB**.
- QA and security review: **25,000–80,000 ETB**.
- Annual application maintenance: **18,000–60,000 ETB/year**, or
  **15–25% of build value** for larger platforms.

## Pricing rules

1. Every public product anchor uses ETB.
2. The blueprint is fixed and credited to implementation.
3. A price floor never replaces discovery; integrations and regulated data
   requirements can change scope.
4. Hosting, domains, transaction fees, SMS, and payment-provider fees are
   either included explicitly or quoted separately.
5. Maintenance is annual unless a custom SLA is agreed in writing.
6. Competitor figures are reference points, not commitments about their taxes,
   availability, or final scope.
7. Prices should be reviewed at least every six months while the birr and local
   supplier costs remain volatile.

## Customer-facing source ledger

The pricing page shows the same core source links and research date beside the
published rates. The machine-readable source list lives in
`src/services/pricingData.js` as `MARKET_SOURCES`.
