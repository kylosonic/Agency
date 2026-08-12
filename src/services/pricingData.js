/**
 * src/services/pricingData.js
 *
 * STATIC PRICING DATA — ETB ONLY (ADR-001, ADR-003)
 *
 * The locked pricing table lives here as the single source of truth
 * (docs/behaviors/pricing-revert-and-motion.md §1, P-1):
 *   - Workflow Audit: fixed 15,000 ETB (credited toward implementation)
 *   - AI automation tiers: from 40,000 / 100,000 / 200,000+ ETB
 *   - Monthly AI support band: 10,000 - 25,000 ETB / month
 *   - Web: from 20,000 / 50,000 - 80,000 / 150,000+ ETB
 *   - Mobile: 40,000 - 60,000 / 80,000 - 150,000 / 200,000+ ETB
 *   - SaaS: real monthly prices + setup + annual ("Save 2 months")
 *   - Maintenance: 8,000 - 20,000 ETB / year (annual, with commitment)
 *   - Add-ons: original annual/one-time bands
 *
 * SUPERSEDED FIGURES (historical note only — do not re-apply): the August
 * 2026 inflation era quoted audit 85,000 ETB; AI from 250,000 / 750,000 /
 * 1,500,000+ ETB; AI support 30,000 - 70,000 ETB / month; web from 45,000 /
 * 150,000 / 250,000 ETB; mobile from 200,000 / 400,000 ETB; maintenance
 * 5,000 - 15,000 ETB / month; SaaS waitlist only. Replaced 2026-08-11 by
 * owner confirmation (Scenario B / trim).
 *
 * The remote pricing override mechanism (VITE_PRICING_DATA_ENDPOINT) has been
 * REMOVED per Gate A decision — a stale remote payload could resurrect old
 * figures over the locked table. The static table is the sole source.
 * No USD or dual-currency fields exist anywhere in this module.
 */

/**
 * Numeric anchors derived from the locked ETB table (ADR-003).
 * Index i anchors the i-th published tier; `saas` is intentionally null
 * because SaaS is quoted monthly on the pricing page (A1), not as a
 * one-time wizard band.
 */
export const QUOTE_ANCHORS = {
  web: [20000, 50000, 150000],
  mobile: [40000, 80000, 150000, 200000],
  ai: [40000, 100000, 200000],
  saas: null,
};

/**
 * The Workflow Audit entry offer: the hard floor below which no
 * wizard estimate may quote.
 */
export const ENTRY_OFFER_FLOOR = 15000;

/** Budget bands offered by the wizard, aligned to the locked table tiers (A2). */
export const QUOTE_BUDGET_BANDS = ['15k - 40k', '40k - 100k', '100k - 250k', '250k+'];

const BUDGET_BAND_TIER_INDEX = {
  '15k - 40k': 0,
  '40k - 100k': 1,
  '100k - 250k': 2,
  '250k+': 3,
};

const SERVICE_TO_FAMILY = {
  'Web Development': 'web',
  'Mobile App Development': 'mobile',
  'AI Invoice Processing': 'ai',
  'Engineering Knowledge Assistant': 'ai',
  'Sales Order Automation': 'ai',
  'SaaS Platform': 'saas',
};

/**
 * Pure derivation of the directional ETB estimate band for a wizard scope
 * (P-1 parity, P-1 floor). Returns `{ min, max }` in ETB integers, or
 * `null` for SaaS (A1 — no numeric one-time estimate).
 */
export function deriveEstimateBand(formState) {
  const family = SERVICE_TO_FAMILY[formState?.serviceType];
  if (!family || family === 'saas') {
    return null;
  }

  const anchors = QUOTE_ANCHORS[family];
  const requestedIndex = BUDGET_BAND_TIER_INDEX[formState?.budgetRange] ?? 1;
  const tierIndex = Math.min(requestedIndex, anchors.length - 1);

  const min = Math.max(anchors[tierIndex], ENTRY_OFFER_FLOOR);
  const max = anchors[tierIndex + 1] ?? 2 * anchors[tierIndex];

  return { min, max };
}

const WEB_PACKAGES = [
    {
        icon: 'rocket',
        title: 'Digital Presence',
        subtitle: 'Starter',
        price: 'from 20,000 ETB',
        timeline: '2-3 Weeks Delivery',
        idealFor: 'Founders, personal brands, and local startups',
        features: [
            '5-7 core pages',
            'Responsive design',
            'WhatsApp and click-to-call integration',
            'CMS setup',
            'Basic SEO',
            'Maps integration',
            'Security and speed setup',
            '3 months free maintenance',
        ],
        ctaText: 'Request Website Estimate',
    },
    {
        icon: 'chart',
        title: 'Growth & Conversion',
        subtitle: 'Scope-led',
        price: '50,000 – 80,000 ETB',
        timeline: '4-5 Weeks Delivery',
        idealFor: 'Tour operators, real estate, and import/export teams',
        features: [
            'Everything in Starter',
            '15 to 20 pages',
            'Dynamic listings',
            'Lead funnel setup',
            'Advanced local SEO',
            'GA4 and Search Console setup',
            'Testimonials and social feeds',
        ],
        ctaText: 'Scope Growth Website',
    },
    {
        icon: 'building',
        title: 'Enterprise',
        subtitle: 'Custom',
        price: '150,000+ ETB',
        timeline: '6-8 Weeks Delivery',
        idealFor: 'E-commerce, hotels, and larger organizations',
        features: [
            'Custom UI/UX',
            'Scalable architecture',
            'Multi-language support',
            'Advanced filtering',
            'Payment API integrations',
            'CRM and ERP integrations',
            'Cloud backups',
        ],
        ctaText: 'Plan Enterprise Platform',
    },
];

const MOBILE_PACKAGES = [
    {
        icon: 'mobile',
        title: 'Basic Utility App',
        subtitle: 'Starter',
        price: '40,000 – 60,000 ETB',
        timeline: '4-6 Weeks Delivery',
        idealFor: 'Content creators, media brands, and service catalogs',
        features: [
            'Cross-platform (iOS & Android)',
            'Intuitive UI/UX',
            'Push notifications',
            'Offline reading mode',
            'Social login',
            'Basic admin panel',
            '3-month bug-fix warranty',
        ],
        ctaText: 'Launch Your App',
    },
    {
        icon: 'lightning',
        title: 'Business & E-Commerce App',
        subtitle: 'Scope-led',
        price: '80,000 – 150,000 ETB',
        timeline: '8-12 Weeks Delivery',
        idealFor: 'Retail, booking, and food delivery platforms',
        features: [
            'User and vendor profiles',
            'Cart and checkout',
            'Telebirr/Chapa/mobile banking integration',
            'Google Maps integration',
            'Advanced push notifications',
            'Super admin dashboard',
        ],
        ctaText: 'Build Your Platform',
    },
    {
        icon: 'building',
        title: 'Enterprise / FinTech App',
        subtitle: 'Mission-Critical',
        price: '200,000+ ETB',
        timeline: '12-16 Weeks Delivery',
        idealFor: 'Financial institutions, scale-ups, and regulated operators',
        features: [
            'Everything in Business tier',
            'Advanced security and encryption',
            'Biometric authentication',
            'Complex API and microservices',
            'Real-time data synchronization',
            'Compliance and audit readiness',
            'SLA with 24/7 support',
        ],
        ctaText: 'Contact for Proposal',
    },
];

const SAAS_PACKAGES = [
    {
        icon: 'book',
        title: "School Management System",
        subtitle: "EduTech",
        setupFee: 25000,
        monthlyFrom: 3500,
        price: '3,500 ETB / month',
        period: '/month',
        annual: 35000,
        billingNote: 'Save 2 months',
        features: [
            'Admissions and student records',
            'Timetables',
            'Grading and report cards',
            'Tuition invoices',
            'Telebirr/CBE parent payments',
            'Parent/student portals',
            'HR and payroll',
        ],
        ctaText: 'Scope School Setup',
    },
    {
        icon: 'hospital',
        title: "Clinic/Hospital ERP",
        subtitle: "HealthTech",
        setupFee: 35000,
        monthlyFrom: 5000,
        price: '5,000 ETB / month',
        period: '/month',
        annual: 50000,
        billingNote: 'Save 2 months',
        recommended: true,
        features: [
            'Electronic health records',
            'Appointment and queue management',
            'Billing and insurance workflows',
            'Pharmacy inventory with batch/expiry alerts',
            'Lab result linkage to doctor/patient portals',
        ],
        ctaText: 'Scope Hospital Setup',
    },
    {
        icon: 'building',
        title: "Real Estate CRM",
        subtitle: "PropTech",
        setupFee: 20000,
        monthlyFrom: 3000,
        price: '3,000 ETB / month',
        period: '/month',
        annual: 30000,
        billingNote: 'Save 2 months',
        features: [
            'Tenant portals',
            'Lease tracking',
            'SMS rent reminders',
            'Payment tracking',
            'Maintenance request ticketing',
        ],
        ctaText: 'Scope CRM Setup',
    }
];

const ADDITIONAL_SERVICES = [
    { service: 'Domain & Cloud Hosting', description: 'Domain, SSL, and high-speed cloud server.', price: '1,500 – 5,000 ETB / year', type: 'Recurring' },
    { service: 'Cloud Web Hosting', description: 'High-speed cloud server for production sites.', price: '5,000 – 15,000 ETB / year', type: 'Recurring' },
    { service: 'Web Maintenance', description: 'Security patches, plugin updates, daily backups and minor content changes. Written commitment: 40 support hours per year and next-business-day response on critical issues.', price: '8,000 – 20,000 ETB / year', type: 'Recurring' },
    { service: 'Logo & Visual Identity', description: 'Logo, typography, colors, and brand guidelines.', price: '5,000 – 15,000 ETB', type: 'One-Time' },
    { service: 'Professional Copywriting', description: 'Conversion-focused writing in English and Amharic.', price: '3,000 – 10,000 ETB / project', type: 'One-Time' },
    { service: 'Commercial Photography', description: 'Professional shoots for products, staff, or real estate.', price: '5,000 – 20,000 ETB / session', type: 'One-Time' },
];

const FEATURED_ADDONS = [
    { icon: 'globe', title: 'Domain & Cloud Hosting', description: 'Domain, SSL, and high-speed cloud server.', price: '1,500 – 5,000 ETB / year' },
    { icon: 'palette', title: 'Logo & Visual Identity', description: 'Logo, typography, color palette, and brand guideline starter kit.', price: '5,000 – 15,000 ETB' },
    { icon: 'camera', title: 'Commercial Photography', description: 'On-location commercial shoots for products, teams, or properties.', price: '5,000 – 20,000 ETB / session' },
    { icon: 'wrench', title: 'Web Maintenance', description: 'Security patches, plugin updates, daily backups and minor content changes. Annual plan with a written support commitment.', price: '8,000 – 20,000 ETB / year' },
    { icon: 'search', title: 'Copywriting Services', description: 'SEO-oriented conversion copy in English and Amharic.', price: '3,000 – 10,000 ETB / project' },
];

const AI_IMPLEMENTATION_TIERS = [
    {
        title: 'Tier 1: Foundational Automation',
        bestFor: 'Small businesses',
        timeline: '2-4 weeks',
        setupPrice: 'from 40,000 ETB',
        monthlySupport: '10,000 – 25,000 ETB / month',
        scope: 'Chatbots, lead routing, FAQ assistants, and simple internal automation.',
        includes: [
            'Customer support chatbots',
            'Lead routing tools',
            'FAQ assistants',
            'Basic internal workflow automation',
            'Integration with up to 3 existing tools',
        ],
        supportIncludes: [
            'Hosting and infrastructure management',
            'Model usage and API costs',
            'Monitoring and alerting',
            '15 support hours per month',
            'Next-business-day response commitment',
        ],
    },
    {
        title: 'Tier 2: Operational Intelligence',
        bestFor: 'Mid-market firms',
        timeline: '2-4 months',
        setupPrice: 'from 100,000 ETB',
        monthlySupport: '10,000 – 25,000 ETB / month',
        scope: 'Multi-department automation, CRM integration, document generation, and agent handoffs.',
        includes: [
            'Multi-agent systems',
            'Department workflows',
            'CRM integrations',
            'Document generation',
            'Custom analytics dashboards',
            'Agent handoff and escalation paths',
        ],
        supportIncludes: [
            'Hosting and infrastructure management',
            'Model usage and API costs',
            'Monitoring and alerting',
            '25 support hours per month',
            'Same-business-day response commitment',
        ],
    },
    {
        title: 'Tier 3: Enterprise Agentic Systems',
        bestFor: 'Large organizations',
        timeline: '6-12 months',
        setupPrice: 'from 200,000+ ETB',
        monthlySupport: '10,000 – 25,000 ETB / month',
        scope: 'Autonomous workflows, local models, air-gapped deployments, and enterprise governance.',
        includes: [
            'Autonomous workflows',
            'Private deployment options',
            'Enterprise governance and audit trails',
            'Cross-department orchestration',
            'Data protection and compliance reviews',
            'Local model deployment where required',
        ],
        supportIncludes: [
            'Hosting and infrastructure management',
            'Model usage and API costs',
            'Monitoring and alerting',
            '40 support hours per month',
            '4-hour response commitment for critical issues',
        ],
    },
];

export const getPricingGuideSummary = () => ({
    geographicPolicy: 'All prices are quoted in Ethiopian Birr (ETB). International engagements are quoted individually.',
    workflowAudit: {
        title: 'Workflow Audit',
        kicker: 'Entry Point',
        price: '15,000 ETB',
        description: 'Workflow analysis, automation roadmap, system blueprint, and implementation recommendation.',
        outputs: [
            'Current-state process map',
            'Priority automation shortlist',
            'Data-readiness review',
            'Security and hosting recommendation',
            'Implementation and retainer estimate',
        ],
    },
    automationTiers: AI_IMPLEMENTATION_TIERS,
    productEngineering: [
        ...WEB_PACKAGES.map((item) => ({
            category: 'Web Development',
            title: item.title,
            timeline: item.timeline,
            price: item.price,
            note: item.idealFor,
            features: item.features,
        })),
        ...MOBILE_PACKAGES.map((item) => ({
            category: 'Mobile Apps',
            title: item.title,
            timeline: item.timeline,
            price: item.price,
            note: item.idealFor,
            features: item.features,
        })),
        ...SAAS_PACKAGES.map((item) => ({
            category: 'Management SaaS',
            title: item.title,
            subtitle: item.subtitle,
            timeline: item.period,
            price: item.price,
            setupFee: item.setupFee,
            monthlyFrom: item.monthlyFrom,
            annual: item.annual,
            billingNote: item.billingNote,
            recommended: item.recommended,
            note: item.features.slice(0, 3).join(', '),
            features: item.features,
        })),
    ],
    additionalServices: ADDITIONAL_SERVICES,
});

export const getWebPackages = async () => {
    return WEB_PACKAGES;
};

export const getMobilePackages = async () => {
    return MOBILE_PACKAGES;
};

export const getSaasPackages = async () => {
    return SAAS_PACKAGES;
};

export const getAddonsGrid = async () => {
    return [
        {
            id: 'featured-1',
            icon: 'globe',
            title: "Domain & Hosting",
            price: '1,500 – 5,000 ETB / year',
            description: 'Domain, SSL certificate, and high-speed cloud server.',
        },
        {
            id: 'featured-2',
            icon: 'palette',
            title: "Logo & Brand Identity",
            price: '5,000 – 15,000 ETB',
            description: 'Logo, typography, color palette, and brand guideline starter kit.',
        },
        {
            id: 'featured-3',
            icon: 'camera',
            title: "Commercial Photography",
            price: '5,000 – 20,000 ETB / session',
            description: 'On-location commercial shoots for products, teams, or properties.',
        },
        {
            id: 'featured-4',
            icon: 'wrench',
            title: "Web Maintenance",
            price: '8,000 – 20,000 ETB / year',
            description: 'Security patches, plugin updates, daily backups, and minor content changes. Annual plan with a written support commitment.',
        },
        {
            id: 'featured-5',
            icon: 'search',
            title: "Copywriting Services",
            price: '3,000 – 10,000 ETB / project',
            description: 'SEO-oriented conversion copy in English and Amharic.',
        },
    ];
};

export const getAdditionalServices = async () => {
    return ADDITIONAL_SERVICES;
};

export const getFeaturedAddons = async () => {
    return FEATURED_ADDONS;
};
