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

                    {/* Digital Marketing Terms */}
                    <ScrollReveal>
                        <div className="policy-section">
                            <h3 className="policy-heading">
                                <span className="policy-heading-icon" aria-hidden="true"><IconGlyph name="chart" size={17} /></span>
                                <span>{t('policy.sections.marketing.title', 'Digital Marketing Terms')}</span>
                            </h3>
                            <p className="policy-intro">
                                {t('policy.sections.marketing.intro', 'All digital marketing packages operate on a prepaid monthly basis to ensure uninterrupted campaign delivery and optimal budget allocation.')}
                            </p>

                            <div className="services-grid policy-services-grid">
                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="card" size={21} /></div>
                                    <h3>{t('policy.sections.marketing.cards.billing.title', 'Pre-Paid Monthly Billing')}</h3>
                                    <p>
                                        {t('policy.sections.marketing.cards.billing.body', 'Both the Ad Management Fee and Ad Spend budget are invoiced and collected at the beginning of each month, before campaigns go live.')}
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="refresh" size={21} /></div>
                                    <h3>{t('policy.sections.marketing.cards.scaling.title', 'Flexible Scaling')}</h3>
                                    <p>
                                        {t('policy.sections.marketing.cards.scaling.body', 'You can adjust your ad spend up or down each month. We provide recommendations based on performance data to optimize your ROI.')}
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="chart" size={21} /></div>
                                    <h3>{t('policy.sections.marketing.cards.reporting.title', 'Transparent Reporting')}</h3>
                                    <p>
                                        {t('policy.sections.marketing.cards.reporting.body', 'Receive detailed monthly reports showing exactly how your budget was spent, campaign performance, and actionable insights.')}
                                    </p>
                                </div>
                            </div>

                            <div className="policy-note">
                                <span className="icon" aria-hidden="true"><IconGlyph name="idea" size={14} /></span>
                                <span>
                                    <strong>{t('policy.sections.marketing.note.title', 'International Card Handling:')}</strong> {t('policy.sections.marketing.note.body', 'If you do not have a valid international payment card (Visa/Mastercard) for ad platform payments (Google Ads, Meta Ads, etc.), we can process the Ad Spend on your behalf for an industry-standard handling fee of 15–20% of the ad spend amount. This covers currency conversion, transaction fees, and platform management.')}
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
                                {t('policy.sections.saas.intro', 'Our cloud management systems (SMS, HMS, PMS) are offered as a service with the following terms.')}
                            </p>

                            <div className="services-grid">
                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="wrench" size={21} /></div>
                                    <h3>{t('policy.sections.saas.cards.setup.title', 'Setup & Training')}</h3>
                                    <p>
                                        {t('policy.sections.saas.cards.setup.body', 'One-time setup fee covers system configuration, data migration, and comprehensive staff training. We ensure full onboarding before handoff.')}
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="calendar" size={21} /></div>
                                    <h3>{t('policy.sections.saas.cards.billing.title', 'Subscription Billing')}</h3>
                                    <p>
                                        {t('policy.sections.saas.cards.billing.body', 'Choose monthly or annual billing. Annual subscriptions receive a 2-month discount. Payment is due at the start of each billing cycle.')}
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="shield" size={21} /></div>
                                    <h3>{t('policy.sections.saas.cards.support.title', 'Support & Updates')}</h3>
                                    <p>
                                        {t('policy.sections.saas.cards.support.body', 'All subscriptions include continuous updates, security patches, data backups, and technical support via phone, email, and Telegram.')}
                                    </p>
                                </div>
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
