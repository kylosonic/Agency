import ScrollReveal from '../components/ScrollReveal';
import RouteProofStrip from '../components/RouteProofStrip';
import IconGlyph from '../components/IconGlyph';
import { DISCOVERY_CALL_MAILTO } from '../config/siteConfig';
import { trackDiscoveryCallClick } from '../services/analyticsService';
import { useLanguage } from '../i18n/useLanguage';

export default function PolicyPage({ onDownloadClick }) {
    const { t } = useLanguage();

    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <h1>{t('policy.hero.title', 'Payment & Operational Policy')}</h1>
                    <p>{t('policy.hero.subtitle', 'Transparent terms to ensure a smooth, trust-based working relationship from kickoff to launch.')}</p>
                    <div className="page-hero-meta" aria-label={t('policy.hero.metaAria', 'Policy highlights')}>
                        <span className="page-hero-chip">{t('policy.hero.chip1', 'Milestone-Based Billing')}</span>
                        <span className="page-hero-chip">{t('policy.hero.chip2', 'Client IP Ownership')}</span>
                        <span className="page-hero-chip">{t('policy.hero.chip3', 'Clear Support Commitments')}</span>
                        <span className="page-hero-chip">{t('policy.hero.chip4', 'Bank Transfer Only')}</span>
                    </div>
                </div>
            </section>

            <RouteProofStrip
                items={[
                    {
                        title: t('policy.proof.0.title', 'Clarity Before Commitments'),
                        text: t('policy.proof.0.text', 'Every engagement is structured around visible milestones and clear deliverables.'),
                    },
                    {
                        title: t('policy.proof.1.title', 'No Surprises In Billing'),
                        text: t('policy.proof.1.text', 'Payment checkpoints and service boundaries are communicated before kickoff begins.'),
                    },
                    {
                        title: t('policy.proof.2.title', 'Long-Term Operational Support'),
                        text: t('policy.proof.2.text', 'Ongoing support, updates, and reporting terms are documented up front for continuity.'),
                    },
                ]}
            />

            <section className="section">
                <div className="container">
                    {/* Development Payment Terms */}
                    <ScrollReveal>
                        <div className="policy-section">
                            <h3 className="policy-heading">
                                <span className="policy-heading-icon" aria-hidden="true"><IconGlyph name="building" size={17} /></span>
                                <span>{t('policy.sections.development.title', 'Development Payment Terms')}</span>
                            </h3>
                            <p className="policy-intro">
                                {t('policy.sections.development.intro', 'All custom development projects (web, mobile, and SaaS customization) follow our milestone-based payment structure. This ensures clear checkpoints and mutual accountability at every stage.')}
                            </p>

                            <div className="milestone-grid">
                                <div className="milestone-card">
                                    <div className="percentage">40%</div>
                                    <div className="description">
                                        <strong>{t('policy.sections.development.m1.title', 'Upfront Deposit')}</strong>
                                        <br />
                                        {t('policy.sections.development.m1.body', 'Due upon project agreement and kickoff. Covers initial research, planning, and design phase.')}
                                    </div>
                                </div>

                                <div className="milestone-card">
                                    <div className="percentage">30%</div>
                                    <div className="description">
                                        <strong>{t('policy.sections.development.m2.title', 'After Design / Prototype Approval')}</strong>
                                        <br />
                                        {t('policy.sections.development.m2.body', 'Due when you approve the design mockups or working prototype. Development proceeds to full build.')}
                                    </div>
                                </div>

                                <div className="milestone-card">
                                    <div className="percentage">30%</div>
                                    <div className="description">
                                        <strong>{t('policy.sections.development.m3.title', 'Before Final Deployment')}</strong>
                                        <br />
                                        {t('policy.sections.development.m3.body', 'Due before the final go-live / deployment. All deliverables are handed over upon this payment.')}
                                    </div>
                                </div>
                            </div>

                            <div className="policy-note">
                                <span className="icon" aria-hidden="true"><IconGlyph name="check" size={14} /></span>
                                <span>
                                    <strong>{t('policy.sections.development.ownership.title', 'Full Ownership Guarantee:')}</strong> {t('policy.sections.development.ownership.body', 'Upon final payment, the client owns 100% of all custom design assets, source code, and intellectual property created during the project. No lock-in, no recurring license fees for custom work.')}
                                </span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Payment Methods */}
                    <ScrollReveal>
                        <div className="policy-section">
                            <h3 className="policy-heading">
                                <span className="policy-heading-icon" aria-hidden="true"><IconGlyph name="card" size={17} /></span>
                                <span>{t('policy.sections.payments.title', 'Payment Methods')}</span>
                            </h3>
                            <p className="policy-intro">
                                {t('policy.sections.payments.intro', 'Until the business license is secured, payment is accepted by bank transfer (CBE Birr) only.')}
                            </p>

                            <div className="services-grid policy-services-grid">
                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="card" size={21} /></div>
                                    <h3>{t('policy.sections.payments.cards.bankTransfer.title', 'Bank Transfer (CBE Birr)')}</h3>
                                    <p>
                                        {t('policy.sections.payments.cards.bankTransfer.body', 'Payments are made by direct bank transfer in Ethiopian Birr. This is the only accepted payment method until the business license is secured.')}
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="phone" size={21} /></div>
                                    <h3>{t('policy.sections.payments.cards.telebirr.title', 'Telebirr Merchant (Planned)')}</h3>
                                    <p>
                                        {t('policy.sections.payments.cards.telebirr.body', 'After licensing, we plan to add Telebirr merchant payments so clients can pay by mobile money. This is a plan, not a current capability.')}
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="globe" size={21} /></div>
                                    <h3>{t('policy.sections.payments.cards.chapa.title', 'Chapa & Card Payments (Planned)')}</h3>
                                    <p>
                                        {t('policy.sections.payments.cards.chapa.body', 'After licensing, we plan to add Chapa checkout and card payments for local and international clients. This is a plan, not a current capability.')}
                                    </p>
                                </div>
                            </div>

                            <div className="policy-note">
                                <span className="icon" aria-hidden="true"><IconGlyph name="idea" size={14} /></span>
                                <span>
                                    <strong>{t('policy.sections.payments.note.title', 'Payment plan:')}</strong> {t('policy.sections.payments.note.body', 'Telebirr merchant, Chapa, and card payments will be added after the business license is secured. Until they are live, bank transfer (CBE Birr) remains the only accepted payment method.')}
                                </span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* SaaS Terms */}
                    <ScrollReveal>
                        <div className="policy-section">
                            <h3 className="policy-heading">
                                <span className="policy-heading-icon" aria-hidden="true"><IconGlyph name="cloud" size={17} /></span>
                                <span>{t('policy.sections.saas.title', 'SaaS Subscription Terms')}</span>
                            </h3>
                            <p className="policy-intro">
                                {t('policy.sections.saas.intro', 'Our cloud management systems (SMS, HMS, PMS) are in development — tell us you want it and we will add you to the waitlist.')}
                            </p>

                            <div className="services-grid">
                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="wrench" size={21} /></div>
                                    <h3>{t('policy.sections.saas.cards.setup.title', 'Waitlist Only')}</h3>
                                    <p>
                                        {t('policy.sections.saas.cards.setup.body', 'SaaS products show no prices and no billing until a real product exists. Join the waitlist and we will contact you when a product is ready for your organization.')}
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="calendar" size={21} /></div>
                                    <h3>{t('policy.sections.saas.cards.billing.title', 'In Development')}</h3>
                                    <p>
                                        {t('policy.sections.saas.cards.billing.body', 'School Management, Clinic/Hospital ERP, and Real Estate CRM are being built. There is no monthly or annual billing today.')}
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="shield" size={21} /></div>
                                    <h3>{t('policy.sections.saas.cards.support.title', 'No Billing Until Launch')}</h3>
                                    <p>
                                        {t('policy.sections.saas.cards.support.body', 'Once a product is available, its terms will be published before any payment is requested. You will never be billed for a product that is not live.')}
                                    </p>
                                </div>
                            </div>

                            <div className="policy-note">
                                <span className="icon" aria-hidden="true"><IconGlyph name="spark" size={14} /></span>
                                <span>
                                    <strong>{t('policy.sections.saas.waitlistNote.title', 'Want it?')}</strong> {t('policy.sections.saas.waitlistNote.body', 'Tell us and we will keep you on the waitlist with no charge and no commitment.')}
                                </span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* General Terms */}
                    <ScrollReveal>
                        <div className="policy-section">
                            <h3 className="policy-heading">
                                <span className="policy-heading-icon" aria-hidden="true"><IconGlyph name="book" size={17} /></span>
                                <span>{t('policy.sections.general.title', 'General Terms')}</span>
                            </h3>
                            <div className="policy-note-stack">
                                <div className="policy-note">
                                    <span className="icon" aria-hidden="true"><IconGlyph name="spark" size={14} /></span>
                                    <span>
                                        {t('policy.sections.general.note1', 'All prices are quoted in Ethiopian Birr (ETB) and are subject to standard tax regulations. Prices may be adjusted annually based on market conditions.')}
                                    </span>
                                </div>
                                <div className="policy-note">
                                    <span className="icon" aria-hidden="true"><IconGlyph name="spark" size={14} /></span>
                                    <span>
                                        {t('policy.sections.general.note2', 'Project timelines are estimates and may vary based on scope complexity, client feedback turnaround, and content/asset delivery. We commit to clear communication on any timeline changes.')}
                                    </span>
                                </div>
                                <div className="policy-note">
                                    <span className="icon" aria-hidden="true"><IconGlyph name="spark" size={14} /></span>
                                    <span>
                                        {t('policy.sections.general.note3', 'Revision rounds are included as specified in each package. Additional revisions beyond the included scope are billed at an agreed hourly or per-revision rate.')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="section-sm cta-section">
                <div className="container">
                    <ScrollReveal>
                        <div className="cta-inner">
                            <h2>{t('policy.cta.title', 'Need Clarification Before You Start?')}</h2>
                            <p>{t('policy.cta.subtitle', 'Review the full service guide or book a discovery call and we will walk through the policy details with your team.')}</p>
                            <div className="cta-actions">
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => onDownloadClick('policy_page_cta_pricing')}>
                                    {t('actions.downloadFullPricingGuide', 'Download Full Pricing Guide')}
                                </button>
                                <a className="btn btn-secondary btn-lg" href={DISCOVERY_CALL_MAILTO} onClick={() => trackDiscoveryCallClick('policy_page_cta_discovery')}>
                                    {t('actions.bookDiscoveryCall', 'Book Discovery Call')}
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
