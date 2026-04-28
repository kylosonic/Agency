import ScrollReveal from '../components/ScrollReveal';
import RouteProofStrip from '../components/RouteProofStrip';
import IconGlyph from '../components/IconGlyph';
import { DISCOVERY_CALL_MAILTO } from '../config/siteConfig';
import { trackDiscoveryCallClick } from '../services/analyticsService';

export default function PolicyPage({ onDownloadClick }) {
    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container page-hero-content">
                    <h1>Payment &<br />Operational Policy</h1>
                    <p>Transparent terms to ensure a smooth, trust-based working relationship from kickoff to launch.</p>
                    <div className="page-hero-meta" aria-label="Policy highlights">
                        <span className="page-hero-chip">Milestone-Based Billing</span>
                        <span className="page-hero-chip">Client IP Ownership</span>
                        <span className="page-hero-chip">Clear Support Commitments</span>
                    </div>
                </div>
            </section>

            <RouteProofStrip
                items={[
                    {
                        title: 'Clarity Before Commitments',
                        text: 'Every engagement is structured around visible milestones and clear deliverables.',
                    },
                    {
                        title: 'No Surprises In Billing',
                        text: 'Payment checkpoints and service boundaries are communicated before kickoff begins.',
                    },
                    {
                        title: 'Long-Term Operational Support',
                        text: 'Ongoing support, updates, and reporting terms are documented up front for continuity.',
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
                                <span>Development Payment Terms</span>
                            </h3>
                            <p className="policy-intro">
                                All custom development projects (web, mobile, and SaaS customization) follow our milestone-based payment structure. This ensures clear checkpoints and mutual accountability at every stage.
                            </p>

                            <div className="milestone-grid">
                                <div className="milestone-card">
                                    <div className="percentage">40%</div>
                                    <div className="description">
                                        <strong>Upfront Deposit</strong>
                                        <br />
                                        Due upon project agreement and kickoff. Covers initial research, planning, and design phase.
                                    </div>
                                </div>

                                <div className="milestone-card">
                                    <div className="percentage">30%</div>
                                    <div className="description">
                                        <strong>After Design / Prototype Approval</strong>
                                        <br />
                                        Due when you approve the design mockups or working prototype. Development proceeds to full build.
                                    </div>
                                </div>

                                <div className="milestone-card">
                                    <div className="percentage">30%</div>
                                    <div className="description">
                                        <strong>Before Final Deployment</strong>
                                        <br />
                                        Due before the final go-live / deployment. All deliverables are handed over upon this payment.
                                    </div>
                                </div>
                            </div>

                            <div className="policy-note">
                                <span className="icon" aria-hidden="true"><IconGlyph name="check" size={14} /></span>
                                <span>
                                    <strong>Full Ownership Guarantee:</strong> Upon final payment, the client owns 100% of all custom design assets, source code, and intellectual property created during the project. No lock-in, no recurring license fees for custom work.
                                </span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Digital Marketing Terms */}
                    <ScrollReveal>
                        <div className="policy-section">
                            <h3 className="policy-heading">
                                <span className="policy-heading-icon" aria-hidden="true"><IconGlyph name="chart" size={17} /></span>
                                <span>Digital Marketing Terms</span>
                            </h3>
                            <p className="policy-intro">
                                All digital marketing packages operate on a prepaid monthly basis to ensure uninterrupted campaign delivery and optimal budget allocation.
                            </p>

                            <div className="services-grid policy-services-grid">
                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="card" size={21} /></div>
                                    <h3>Pre-Paid Monthly Billing</h3>
                                    <p>
                                        Both the <strong>Ad Management Fee</strong> and <strong>Ad Spend budget</strong> are invoiced and collected at the beginning of each month, before campaigns go live.
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="refresh" size={21} /></div>
                                    <h3>Flexible Scaling</h3>
                                    <p>
                                        You can adjust your ad spend up or down each month. We provide recommendations based on performance data to optimize your ROI.
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="chart" size={21} /></div>
                                    <h3>Transparent Reporting</h3>
                                    <p>
                                        Receive detailed monthly reports showing exactly how your budget was spent, campaign performance, and actionable insights.
                                    </p>
                                </div>
                            </div>

                            <div className="policy-note">
                                <span className="icon" aria-hidden="true"><IconGlyph name="idea" size={14} /></span>
                                <span>
                                    <strong>International Card Handling:</strong> If you do not have a valid international payment card (Visa/Mastercard) for ad platform payments (Google Ads, Meta Ads, etc.), we can process the Ad Spend on your behalf for an industry-standard handling fee of <strong>15–20%</strong> of the ad spend amount. This covers currency conversion, transaction fees, and platform management.
                                </span>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* SaaS Terms */}
                    <ScrollReveal>
                        <div className="policy-section">
                            <h3 className="policy-heading">
                                <span className="policy-heading-icon" aria-hidden="true"><IconGlyph name="cloud" size={17} /></span>
                                <span>SaaS Subscription Terms</span>
                            </h3>
                            <p className="policy-intro">
                                Our cloud management systems (SMS, HMS, PMS) are offered as a service with the following terms.
                            </p>

                            <div className="services-grid">
                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="wrench" size={21} /></div>
                                    <h3>Setup & Training</h3>
                                    <p>
                                        One-time setup fee covers system configuration, data migration, and comprehensive staff training. We ensure full onboarding before handoff.
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="calendar" size={21} /></div>
                                    <h3>Subscription Billing</h3>
                                    <p>
                                        Choose monthly or annual billing. Annual subscriptions receive a <strong>2-month discount</strong>. Payment is due at the start of each billing cycle.
                                    </p>
                                </div>

                                <div className="service-card">
                                    <div className="service-card-icon" aria-hidden="true"><IconGlyph name="shield" size={21} /></div>
                                    <h3>Support & Updates</h3>
                                    <p>
                                        All subscriptions include continuous updates, security patches, data backups, and technical support via phone, email, and Telegram.
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
                                <span>General Terms</span>
                            </h3>
                            <div className="policy-note-stack">
                                <div className="policy-note">
                                    <span className="icon" aria-hidden="true"><IconGlyph name="spark" size={14} /></span>
                                    <span>
                                        All prices are quoted in <strong>Ethiopian Birr (ETB)</strong> and are subject to standard tax regulations. Prices may be adjusted annually based on market conditions.
                                    </span>
                                </div>
                                <div className="policy-note">
                                    <span className="icon" aria-hidden="true"><IconGlyph name="spark" size={14} /></span>
                                    <span>
                                        Project timelines are estimates and may vary based on scope complexity, client feedback turnaround, and content/asset delivery. We commit to clear communication on any timeline changes.
                                    </span>
                                </div>
                                <div className="policy-note">
                                    <span className="icon" aria-hidden="true"><IconGlyph name="spark" size={14} /></span>
                                    <span>
                                        Revision rounds are included as specified in each package. Additional revisions beyond the included scope are billed at an agreed hourly or per-revision rate.
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
                            <h2>Need Clarification Before You Start?</h2>
                            <p>Review the full service guide or book a discovery call and we will walk through the policy details with your team.</p>
                            <div className="cta-actions">
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => onDownloadClick('policy_page_cta_pricing')}>
                                    Download Full Pricing Guide
                                </button>
                                <a className="btn btn-secondary btn-lg" href={DISCOVERY_CALL_MAILTO} onClick={() => trackDiscoveryCallClick('policy_page_cta_discovery')}>
                                    Book Discovery Call
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
