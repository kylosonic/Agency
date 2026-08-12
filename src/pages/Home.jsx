import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import HeroChoreo, { HeroChoreoHeadline } from '../components/HeroChoreo';
import MarqueeStrip from '../components/MarqueeStrip';
import PriceCounter from '../components/PriceCounter';
import SectionHeader from '../components/SectionHeader';
import Apparatus from '../components/Apparatus';
import MeterStrip from '../components/MeterStrip';
import IconGlyph from '../components/IconGlyph';
import CaseStudyCard from '../components/CaseStudyCard';
import ProjectIntakeForm from '../components/ProjectIntakeForm';
import ProjectIntakeChatLinks from '../components/ProjectIntakeChatLinks';
import { useLanguage } from '../i18n/useLanguage';
import { getPricingGuideSummary, QUOTE_ANCHORS } from '../services/pricingData';

/* Phase 11 (TECH-43/45, R-2/A19/A20): every price on Home renders from the
   locked data sources only — never hardcoded figures (P-1/ADR-003). */
const PRICING_SUMMARY = getPricingGuideSummary();

const SAAS_ENTRY_PRICE = PRICING_SUMMARY.productEngineering.find(
  (item) => item.category === 'Management SaaS'
)?.price;

const TRUST_ROW_WEB = `Web from ${QUOTE_ANCHORS.web[0].toLocaleString()} ETB`;
const TRUST_ROW_MOBILE = `Mobile from ${QUOTE_ANCHORS.mobile[0].toLocaleString()} ETB`;
const TRUST_ROW_SAAS = `SaaS from ${SAAS_ENTRY_PRICE}`;

/* A19 (TECH-43): software-first apparatus callouts — locked facts only. */
const HOME_APPARATUS_CALLOUTS = [
  'WEB · FROM 20,000 ETB',
  'MOBILE · FROM 40,000 ETB',
  'SAAS · FROM 3,500 ETB / MO',
  'MILESTONES · 40/30/30',
  'SLA · 1 BUSINESS DAY',
];

/* Key-path maps for the i18n content (TECH-48): every string resolves via
   useLanguage().t('home.<path>', <EN fallback>); AM/OM mirrors live in
   translations.js (NB-09 native-review flag). */
const TRUST_FACT_KEYS = [
  { title: 'home.trust.facts.0.title', text: 'home.trust.facts.0.text' },
  { title: 'home.trust.facts.1.title', text: 'home.trust.facts.1.text' },
  { title: 'home.trust.facts.2.title', text: 'home.trust.facts.2.text' },
  { title: 'home.trust.facts.3.title', text: 'home.trust.facts.3.text' },
  { title: 'home.trust.facts.4.title', text: 'home.trust.facts.4.text' },
  { title: 'home.trust.facts.5.title', text: 'home.trust.facts.5.text' },
];

const SIGNAL_KEYS = [
  { title: 'home.trust.signals.0.title', text: 'home.trust.signals.0.text', icon: 'refresh' },
  { title: 'home.trust.signals.1.title', text: 'home.trust.signals.1.text', icon: 'shield' },
  { title: 'home.trust.signals.2.title', text: 'home.trust.signals.2.text', icon: 'lightning' },
  { title: 'home.trust.signals.3.title', text: 'home.trust.signals.3.text', icon: 'search' },
];

const WHAT_WE_BUILD_KEYS = [
  { title: 'home.wwb.items.0.title', text: 'home.wwb.items.0.text', icon: 'office' },
  { title: 'home.wwb.items.1.title', text: 'home.wwb.items.1.text', icon: 'globe' },
  { title: 'home.wwb.items.2.title', text: 'home.wwb.items.2.text', icon: 'chat' },
  { title: 'home.wwb.items.3.title', text: 'home.wwb.items.3.text', icon: 'card' },
  { title: 'home.wwb.items.4.title', text: 'home.wwb.items.4.text', icon: 'globe' },
  { title: 'home.wwb.items.5.title', text: 'home.wwb.items.5.text', icon: 'mobile' },
  { title: 'home.wwb.items.6.title', text: 'home.wwb.items.6.text', icon: 'cloud' },
  { title: 'home.wwb.items.7.title', text: 'home.wwb.items.7.text', icon: 'building' },
  { title: 'home.wwb.items.8.title', text: 'home.wwb.items.8.text', icon: 'settings' },
  { title: 'home.wwb.items.9.title', text: 'home.wwb.items.9.text', icon: 'spark' },
];

const CUSTOM_SOFTWARE_ROW_KEYS = [
  'home.customSoftware.rows.0',
  'home.customSoftware.rows.1',
  'home.customSoftware.rows.2',
  'home.customSoftware.rows.3',
  'home.customSoftware.rows.4',
];

const WEB_MOBILE_WEB_ROW_KEYS = [
  'home.webMobile.webRows.0',
  'home.webMobile.webRows.1',
  'home.webMobile.webRows.2',
  'home.webMobile.webRows.3',
];

const WEB_MOBILE_MOBILE_ROW_KEYS = [
  'home.webMobile.mobileRows.0',
  'home.webMobile.mobileRows.1',
  'home.webMobile.mobileRows.2',
  'home.webMobile.mobileRows.3',
];

const BUSINESS_SYSTEMS_ROW_KEYS = [
  'home.businessSystems.rows.0',
  'home.businessSystems.rows.1',
  'home.businessSystems.rows.2',
  'home.businessSystems.rows.3',
  'home.businessSystems.rows.4',
  'home.businessSystems.rows.5',
  'home.businessSystems.rows.6',
  'home.businessSystems.rows.7',
];

const SAAS_ROW_KEYS = [
  'home.saas.rows.0',
  'home.saas.rows.1',
  'home.saas.rows.2',
  'home.saas.rows.3',
];

const TRANSFORMATION_PAIR_KEYS = [
  { from: 'home.ai.pairs.0.from', to: 'home.ai.pairs.0.to' },
  { from: 'home.ai.pairs.1.from', to: 'home.ai.pairs.1.to' },
  { from: 'home.ai.pairs.2.from', to: 'home.ai.pairs.2.to' },
  { from: 'home.ai.pairs.3.from', to: 'home.ai.pairs.3.to' },
  { from: 'home.ai.pairs.4.from', to: 'home.ai.pairs.4.to' },
  { from: 'home.ai.pairs.5.from', to: 'home.ai.pairs.5.to' },
];

const PROCESS_STEP_KEYS = [
  { title: 'home.process.steps.0.title', text: 'home.process.steps.0.text' },
  { title: 'home.process.steps.1.title', text: 'home.process.steps.1.text' },
  { title: 'home.process.steps.2.title', text: 'home.process.steps.2.text' },
  { title: 'home.process.steps.3.title', text: 'home.process.steps.3.text' },
  { title: 'home.process.steps.4.title', text: 'home.process.steps.4.text' },
];

const WHY_NOVATECH_KEYS = [
  { title: 'home.why.rows.0.title', text: 'home.why.rows.0.text' },
  { title: 'home.why.rows.1.title', text: 'home.why.rows.1.text' },
  { title: 'home.why.rows.2.title', text: 'home.why.rows.2.text' },
  { title: 'home.why.rows.3.title', text: 'home.why.rows.3.text' },
  { title: 'home.why.rows.4.title', text: 'home.why.rows.4.text' },
];

const INDUSTRY_KEYS = [
  { title: 'home.industries.items.0.title', text: 'home.industries.items.0.text' },
  { title: 'home.industries.items.1.title', text: 'home.industries.items.1.text' },
  { title: 'home.industries.items.2.title', text: 'home.industries.items.2.text' },
  { title: 'home.industries.items.3.title', text: 'home.industries.items.3.text' },
  { title: 'home.industries.items.4.title', text: 'home.industries.items.4.text' },
  { title: 'home.industries.items.5.title', text: 'home.industries.items.5.text' },
  { title: 'home.industries.items.6.title', text: 'home.industries.items.6.text' },
  { title: 'home.industries.items.7.title', text: 'home.industries.items.7.text' },
];

const TRUST_FACT_ICONS = ['card', 'chart', 'clock', 'shield', 'lightning', 'pin'];

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      {/* 01 — HERO (R-2) */}
      <section className="hero ai-home-hero redesign-home-hero" id="hero" aria-labelledby="home-hero-title">
        <div className="container marquee-hero-grid">
          <div className="hero-copy">
            <HeroChoreo>
              <div className="eyebrow">{t('home.hero.eyebrow', '01 · SOFTWARE')}</div>

              <HeroChoreoHeadline id="home-hero-title">
                {t('home.hero.titleBefore', 'software ')}
                <em className="verb">{t('home.hero.titleVerb', 'built')}</em>
                {t('home.hero.titleAfter', ' around your business.')}
              </HeroChoreoHeadline>

              {/* R-2 subcopy — software first, AI named second. */}
              <p>
                {t(
                  'home.hero.subcopy',
                  'NovaTech builds custom software, web platforms, mobile applications, SaaS products, and business systems for organizations in Ethiopia and beyond — with AI automation available where it creates real business value.'
                )}
              </p>

              {/* R-6 (TECH-46): Start a Project primary → Home intake form;
                  Discuss Your Software Idea secondary; Explore AI tertiary. */}
              <div className="hero-actions" aria-label="Start a project">
                <Link className="btn btn-primary btn-lg" to="/#project-intake">
                  {t('home.hero.ctaPrimary', 'Start a Project')}
                </Link>
                <Link className="btn btn-secondary btn-lg" to="/book-discovery-call">
                  {t('home.hero.ctaSecondary', 'Discuss Your Software Idea')}
                </Link>
                <Link className="btn btn-dark btn-sm" to="#ai-automation">
                  {t('home.hero.ctaTertiary', 'Explore AI & Automation')}
                </Link>
              </div>

              {/* R-2/A20 trust row — locked anchors only (identical across languages). */}
              <div className="hero-trust-row" aria-label={t('home.hero.trustLabel', 'Software anchors from the live ETB table')}>
                <span className="trust-pill">{TRUST_ROW_WEB}</span>
                <span className="trust-pill">{TRUST_ROW_MOBILE}</span>
                <span className="trust-pill">{TRUST_ROW_SAAS}</span>
              </div>
            </HeroChoreo>
          </div>

          <div className="marquee-hero-side">
            <Apparatus
              type="topology"
              callouts={HOME_APPARATUS_CALLOUTS}
              label="Software apparatus: web from 20,000 ETB, mobile from 40,000 ETB, SaaS from 3,500 ETB per month, milestones 40/30/30, response within 1 business day"
            />
          </div>
        </div>
      </section>

      <MeterStrip labelLeft="WEB · FROM 20,000 ETB" labelRight="MOBILE · FROM 40,000 ETB" />

      {/* M-5 (TECH-33): exactly ONE marquee — locked P-1 figures only (G-5),
          software-first ordering (R-5). */}
      <MarqueeStrip
        items={[
          'WEB FROM 20,000 ETB',
          'MOBILE FROM 40,000 ETB',
          'SAAS FROM 3,500 ETB / MO',
          'AUDIT 15,000 ETB',
          '3 MONTHS FREE MAINTENANCE',
          'SAVE 2 MONTHS ANNUAL',
        ]}
      />

      {/* 02 — TRUST / CAPABILITIES (R-3 item 2, locked facts only) */}
      <section className="section" id="trust">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow={t('home.trust.eyebrow', '02 · TRUST')}
              title={t('home.trust.title', 'Software-first, priced in the open.')}
              subtitle={t('home.trust.subtitle', 'Published ETB prices, milestone billing, and written commitments — no invented metrics.')}
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid what-we-build-grid">
            {TRUST_FACT_KEYS.map((keys, index) => (
              <ScrollReveal key={keys.title}>
                <article className="editorial-card glass-card">
                  <div className="editorial-card-top">
                    <span className="ai-preview-icon" aria-hidden="true">
                      <IconGlyph name={TRUST_FACT_ICONS[index]} size={18} />
                    </span>
                    <h3>{t(keys.title, '')}</h3>
                  </div>
                  <p>{t(keys.text, '')}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <div className="hero-facts editorial-facts-panel" aria-label={t('home.trust.signalsLabel', 'Signs your business is ready for software')}>
              <div className="hero-facts-label">{t('home.trust.signalsLabel', 'Signs your business is ready for software')}</div>
              <ol className="hero-facts-list">
                {SIGNAL_KEYS.map((keys, index) => (
                  <li key={keys.title} className="hero-fact-row">
                    <span className="hero-fact-number" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="hero-fact-body">
                      <span className="hero-fact-title">{t(keys.title, '')}</span>
                      <span className="hero-fact-text">{t(keys.text, '')}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 03 — WHAT WE BUILD (R-4, the main section) */}
      <section className="section" id="what-we-build">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow={t('home.wwb.eyebrow', '03 · WHAT WE BUILD')}
              title={t('home.wwb.title', 'Software for the way your business actually runs.')}
              subtitle={t('home.wwb.subtitle', 'Ten real-world categories — each one replaces manual work with a working system.')}
              align="left"
            />
          </ScrollReveal>

          <div className="what-we-build-grid">
            {WHAT_WE_BUILD_KEYS.map((keys, index) => (
              <ScrollReveal key={keys.title}>
                <article className="editorial-card glass-card what-we-build-item">
                  <span className="receipt-row__numeral" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="what-we-build-item__body">
                    <h3>{t(keys.title, '')}</h3>
                    <p>{t(keys.text, '')}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — CUSTOM SOFTWARE DEVELOPMENT (R-5 track 1) */}
      <section className="section" id="custom-software">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <div className="editorial-panel glass-card">
              <SectionHeader
                eyebrow={t('home.customSoftware.eyebrow', '04 · CUSTOM SOFTWARE')}
                title={t('home.customSoftware.title', 'Business software, built around your operations.')}
                subtitle={t('home.customSoftware.subtitle', 'Enterprise systems, internal platforms, and workflow management — scoped from the live ETB table.')}
                align="left"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="editorial-panel glass-card">
              <ul className="editorial-checklist">
                {CUSTOM_SOFTWARE_ROW_KEYS.map((keyPath) => (
                  <li key={keyPath}>
                    <IconGlyph name="check" size={14} />
                    <span>{t(keyPath, '')}</span>
                  </li>
                ))}
              </ul>
              <Link className="editorial-inline-link" to="/services">
                {t('home.customSoftware.link', 'Explore Custom Software Development')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 05 — WEB & MOBILE DEVELOPMENT (R-5 tracks 2–3) */}
      <section className="section" id="web-mobile">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow={t('home.webMobile.eyebrow', '05 · WEB & MOBILE')}
              title={t('home.webMobile.title', 'Web and mobile products your customers actually use.')}
              subtitle={t('home.webMobile.subtitle', 'Business websites, web apps, portals, dashboards, e-commerce, and native mobile apps — from fixed ETB anchors.')}
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-two-column">
            <ScrollReveal>
              <div className="editorial-panel glass-card">
                <p className="editorial-kicker">{t('home.webMobile.webKicker', 'Web')}</p>
                <h3>{t('home.webMobile.webPrice', 'Web from 20,000 ETB')}</h3>
                <ul className="editorial-checklist">
                  {WEB_MOBILE_WEB_ROW_KEYS.map((keyPath) => (
                    <li key={keyPath}>
                      <IconGlyph name="check" size={14} />
                      <span>{t(keyPath, '')}</span>
                    </li>
                  ))}
                </ul>
                <Link className="editorial-inline-link" to="/web-development">
                  {t('home.webMobile.webLink', 'Open Web Development')}
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="editorial-panel glass-card">
                <p className="editorial-kicker">{t('home.webMobile.mobileKicker', 'Mobile')}</p>
                <h3>{t('home.webMobile.mobilePrice', 'Mobile from 40,000 ETB')}</h3>
                <ul className="editorial-checklist">
                  {WEB_MOBILE_MOBILE_ROW_KEYS.map((keyPath) => (
                    <li key={keyPath}>
                      <IconGlyph name="check" size={14} />
                      <span>{t(keyPath, '')}</span>
                    </li>
                  ))}
                </ul>
                <Link className="editorial-inline-link" to="/mobile-development">
                  {t('home.webMobile.mobileLink', 'Open Mobile Development')}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 06 — BUSINESS SYSTEMS (R-5 track 5) */}
      <section className="section" id="business-systems">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <div className="editorial-panel glass-card">
              <SectionHeader
                eyebrow={t('home.businessSystems.eyebrow', '06 · BUSINESS SYSTEMS')}
                title={t('home.businessSystems.title', 'The systems behind daily operations.')}
                subtitle={t('home.businessSystems.subtitle', 'Inventory, CRM, HR, finance, logistics, school, retail, and industry-specific systems — built as working software, not spreadsheets.')}
                align="left"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="editorial-panel glass-card">
              <ul className="editorial-checklist">
                {BUSINESS_SYSTEMS_ROW_KEYS.map((keyPath) => (
                  <li key={keyPath}>
                    <IconGlyph name="check" size={14} />
                    <span>{t(keyPath, '')}</span>
                  </li>
                ))}
              </ul>
              <Link className="editorial-inline-link" to="/services">
                {t('home.businessSystems.link', 'Explore Business Systems')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 07 — SAAS & PRODUCT ENGINEERING (R-5 track 4) */}
      <section className="section" id="saas-product">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <div className="editorial-panel glass-card">
              <SectionHeader
                eyebrow={t('home.saas.eyebrow', '07 · SAAS & PRODUCT')}
                title={t('home.saas.title', 'Subscription software and product engineering.')}
                subtitle={t('home.saas.subtitle', 'SaaS platforms, MVPs, and startup products with billing, onboarding, and multi-tenant architecture built in.')}
                align="left"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="editorial-panel glass-card">
              <ul className="editorial-checklist">
                {SAAS_ROW_KEYS.map((keyPath) => (
                  <li key={keyPath}>
                    <IconGlyph name="check" size={14} />
                    <span>{t(keyPath, '')}</span>
                  </li>
                ))}
              </ul>
              <Link className="editorial-inline-link" to="/saas-solutions">
                {t('home.saas.link', 'Open SaaS Solutions')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 08 — AI & AUTOMATION (R-12) — after the software story is established */}
      <section className="section" id="ai-automation">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow={t('home.ai.eyebrow', '08 · AI & AUTOMATION')}
              title={t('home.ai.title', 'Add intelligence to your software.')}
              subtitle={t('home.ai.subtitle', 'Make your software smarter. Add intelligent automation where it actually saves time.')}
              align="left"
            />
          </ScrollReveal>

          <div className="transformation-pairs">
            {TRANSFORMATION_PAIR_KEYS.map((keys) => (
              <ScrollReveal key={keys.from}>
                <article className="editorial-card glass-card transformation-pair">
                  <span>{t(keys.from, '')}</span>
                  <span className="transformation-pair__arrow" aria-hidden="true">→</span>
                  <strong>{t(keys.to, '')}</strong>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <div className="editorial-note-panel">
              <strong>{t('home.ai.noteStrong', 'Turn existing business workflows into intelligent systems.')}</strong>{' '}
              {t('home.ai.note', 'Integrate AI into the software your business already depends on.')}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" to="/services">
                {t('home.ai.cta', 'Explore AI & Automation')}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 09 — PROCESS (R-9) — band-1 dark (A5) */}
      <section className="section band-dark band-1" id="process">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow={t('home.process.eyebrow', '09 · PROCESS')}
              title={t('home.process.title', 'Five steps from first call to running software.')}
              subtitle={t('home.process.subtitle', 'Clear commercial terms and delivery expectations before a build starts.')}
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-step-grid">
            {PROCESS_STEP_KEYS.map((keys, index) => (
              <ScrollReveal key={keys.title}>
                <article className="editorial-step-card glass-card">
                  <div className="methodology-step-top">
                    <span className="methodology-step-number">0{index + 1}</span>
                  </div>
                  <h3>{t(keys.title, '')}</h3>
                  <p>{t(keys.text, '')}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — SELECTED WORK / CASE STUDIES (R-10) */}
      <section className="section" id="selected-work">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow={t('home.selectedWork.eyebrow', '10 · SELECTED WORK')}
              title={t('home.selectedWork.title', 'Real products, designed and developed by NovaTech.')}
              subtitle={t('home.selectedWork.subtitle', 'Verifiable builds — no invented client claims.')}
              align="left"
            />
          </ScrollReveal>

          <div className="what-we-build-grid">
            <ScrollReveal>
              <CaseStudyCard
                captionKey="home.caseStudies.stealthOverlay.caption"
                captionFallback="LIVE PRODUCT · STEALTH OVERLAY"
                titleKey="home.caseStudies.stealthOverlay.title"
                titleFallback="Stealth Overlay"
                descriptionKey="home.caseStudies.stealthOverlay.description"
                descriptionFallback="AI interview assistant for coding interviews — real-time DSA guidance and problem-solving support during technical interview practice."
                categoryKey="home.caseStudies.stealthOverlay.category"
                categoryFallback="AI-powered web application"
                altKey="home.caseStudies.stealthOverlay.alt"
                altFallback="Stealth Overlay — live product homepage screenshot"
                imageUrl="/case-studies/stealth-overlay.webp"
                href="https://www.stealthoverlay.com/"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <CaseStudyCard
                captionKey="home.caseStudies.rhobotAcademy.caption"
                captionFallback="LIVE PRODUCT · RHOBOT ACADEMY"
                titleKey="home.caseStudies.rhobotAcademy.title"
                titleFallback="Rhobot Academy"
                descriptionKey="home.caseStudies.rhobotAcademy.description"
                descriptionFallback="Amharic-language forex trading course platform — curriculum, student accounts, free registration, instructor-led content."
                categoryKey="home.caseStudies.rhobotAcademy.category"
                categoryFallback="Learning platform / LMS"
                altKey="home.caseStudies.rhobotAcademy.alt"
                altFallback="Rhobot Academy — live product homepage screenshot"
                imageUrl="/case-studies/rhobot-academy.webp"
                href="https://rhobotcapital.com/"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 11 — WHY NOVATECH (R-3 item 11, derived differentiators) */}
      <section className="section" id="why-novatech">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow={t('home.why.eyebrow', '11 · WHY NOVATECH')}
              title={t('home.why.title', 'The reasons are on the pricing page.')}
              subtitle={t('home.why.subtitle', 'Published prices, milestone billing, written commitments, and a response SLA.')}
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-card-grid receipt-stack">
            {WHY_NOVATECH_KEYS.map((keys, index) => (
              <ScrollReveal key={keys.title}>
                <article className="editorial-card editorial-track-card">
                  <span className="receipt-row__numeral" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="home-track-card__body">
                    <h3>{t(keys.title, '')}</h3>
                    <p>{t(keys.text, '')}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — INDUSTRIES / BUSINESS USE CASES (R-11) */}
      <section className="section" id="industries">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow={t('home.industries.eyebrow', '12 · INDUSTRIES')}
              title={t('home.industries.title', 'Systems for the realities of local businesses.')}
              subtitle={t('home.industries.subtitle', 'We understand the realities of local businesses and build software around how they actually work.')}
              align="left"
            />
          </ScrollReveal>

          <div className="what-we-build-grid">
            {INDUSTRY_KEYS.map((keys, index) => (
              <ScrollReveal key={keys.title}>
                <article className="editorial-card glass-card what-we-build-item">
                  <span className="receipt-row__numeral" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="what-we-build-item__body">
                    <h3>{t(keys.title, '')}</h3>
                    <p>{t(keys.text, '')}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 13 — WORKFLOW AUDIT / DIGITAL TRANSFORMATION (R-8) — demoted, unchanged terms */}
      <section className="section" id="workflow-audit">
        <div className="container editorial-two-column">
          <ScrollReveal>
            <article className="editorial-panel glass-card audit-card">
              <div className="eyebrow">{t('home.audit.eyebrow', '13 · AUDIT')}</div>
              <h2>{t('home.audit.title', 'Workflow Audit')}</h2>
              <p className="editorial-price-tag editorial-hero-price">
                {/* M-4 (A11): the audit figure counts 0 → 15,000 ETB once (locked). */}
                <PriceCounter value={PRICING_SUMMARY.workflowAudit.price} />
              </p>
              <div className="audit-terms-row" aria-label="Workflow audit terms">
                <span className="trust-pill">{t('home.audit.termsDay', '5 business days')}</span>
                <span className="trust-pill">{t('home.audit.termsCredit', '100% credited toward the build')}</span>
              </div>
              <p>{t('home.audit.description', PRICING_SUMMARY.workflowAudit.description)}</p>
              <div className="editorial-note-panel">
                <strong>Guarantee:</strong> {t('home.audit.guarantee', "If the audit doesn't produce a usable blueprint, you don't pay.")}
              </div>
              <div className="cta-actions">
                <Link className="btn btn-secondary btn-lg" to="/workflow-audit">
                  {t('home.audit.ctaBook', 'Book Workflow Audit')}
                </Link>
                <Link className="btn btn-dark btn-lg" to="/pricing">
                  {t('home.audit.ctaViewPricing', 'View Live Pricing')}
                </Link>
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="editorial-panel glass-card">
              <p className="editorial-kicker">{t('home.audit.sideKicker', 'Smart first step')}</p>
              <h3>{t('home.audit.sideTitle', 'Unsure which build you need?')}</h3>
              <p>
                {t('home.audit.sideText', 'The audit maps the current process and defines the right build path — the fee is 100% credited toward the build that follows.')}
              </p>
              <ul className="editorial-checklist">
                {PRICING_SUMMARY.workflowAudit.outputs.slice(0, 4).map((item) => (
                  <li key={item}>
                    <IconGlyph name="check" size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 14 — FINAL CTA + PROJECT INTAKE (R-7) — band-2 dark (A5) */}
      <section className="section band-dark band-2" id="project-intake">
        <div className="container">
          <ScrollReveal>
            <SectionHeader
              eyebrow={t('home.finalCta.eyebrow', '14 · START A PROJECT')}
              title={t('home.finalCta.title', 'Tell us what you want to build.')}
              subtitle={t('home.finalCta.subtitle', 'Your project request was designed to reach us with scope and budget context — we respond within 1 business day.')}
              align="left"
            />
          </ScrollReveal>

          <div className="editorial-two-column">
            <ScrollReveal static>
              <div className="contact-form-card glass-card intake-form">
                <h3>{t('home.finalCta.formTitle', 'Project intake')}</h3>
                <ProjectIntakeForm />
              </div>
            </ScrollReveal>

            <ScrollReveal static>
              <div className="editorial-panel glass-card">
                <p className="editorial-kicker">{t('home.finalCta.quoteKicker', 'Prefer a number now?')}</p>
                <h3>{t('home.finalCta.quoteTitle', 'Use the instant quote tool.')}</h3>
                <p>
                  {t('home.finalCta.quoteText', 'A directional ETB estimate in minutes, without a call.')}
                </p>
                <div className="cta-actions">
                  <Link className="btn btn-primary btn-lg" to="/instant-quote">
                    {t('home.finalCta.quoteCta', 'Instant Quote Tool')}
                  </Link>
                </div>
                <ProjectIntakeChatLinks />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
