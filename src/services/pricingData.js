/**
 * src/services/pricingData.js
 *
 * STATIC PRICING DATA — ETB ONLY (ADR-001, ADR-003)
 *
 * The locked pricing table lives here as the single source of truth. The
 * 2026-11-16 revision aligns published anchors with current Ethiopian market
 * evidence. Source URLs and the reasoning are recorded in
 * docs/research/ethiopia-software-pricing-2026.md.
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
  web: [30000, 60000, 150000],
  mobile: [60000, 150000, 350000],
  custom: [100000, 250000, 600000],
  saas: [180000],
};

/**
 * The software blueprint entry offer: the hard floor below which no
 * wizard estimate may quote.
 */
export const ENTRY_OFFER_FLOOR = 25000;

export const PRICING_RESEARCH_DATE = '2026-11-16';

/**
 * Public, customer-visible market evidence used to set the published anchors.
 * These are reference points, not claims about a competitor's final quote.
 */
export const MARKET_SOURCES = [
  {
    name: 'PrimeTech PLC — website packages',
    url: 'https://primetechplc.com/pricing/website-design-development-package',
    evidence: '30,000 / 46,000 / 100,000 ETB website packages, excluding VAT',
  },
  {
    name: 'Creative Web Ethiopia — website pricing',
    url: 'https://www.creativewebet.com/website-design-price-in-ethiopia/',
    evidence: '25,000 landing page; 45,000 business site; 60,000 corporate; 120,000 e-commerce',
  },
  {
    name: 'Ampol Technologies — mobile app development',
    url: 'https://ampoltechethiopia.com/services/mobile-app-development',
    evidence: '60,000–250,000 ETB cross-platform; 100,000–500,000 ETB native apps',
  },
  {
    name: 'HahuCloud — Ethiopian hosting',
    url: 'https://www.hahucloud.com/',
    evidence: '6,500–9,800 ETB annual hosting reference',
  },
  {
    name: 'Techno Bros — Ethiopian hosting',
    url: 'https://technobros.net/',
    evidence: '11,500–30,000 ETB annual hosting reference',
  },
  {
    name: 'National Bank of Ethiopia — exchange rates',
    url: 'https://nbe.gov.et/exchange/',
    evidence: 'Currency reference for converting international benchmarks to ETB',
  },
];

/** Budget bands offered by the wizard, aligned to the locked table tiers (A2). */
export const QUOTE_BUDGET_BANDS = ['25k - 60k', '60k - 150k', '150k - 350k', '350k+'];

const BUDGET_BAND_TIER_INDEX = {
  '25k - 60k': 0,
  '60k - 150k': 1,
  '150k - 350k': 2,
  '350k+': 3,
};

const SERVICE_TO_FAMILY = {
  'Web Development': 'web',
  'Mobile App Development': 'mobile',
  'Custom Business Software': 'custom',
  'Platform Modernization': 'custom',
  'API and System Integration': 'custom',
  'SaaS Platform': 'saas',
};

/**
 * Pure derivation of the directional ETB estimate band for a wizard scope
 * (P-1 parity, P-1 floor). Returns `{ min, max }` in ETB integers, or
 * `null` for SaaS (A1 — no numeric one-time estimate).
 */
export function deriveEstimateBand(formState) {
  const family = SERVICE_TO_FAMILY[formState?.serviceType];
  if (!family) {
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
        title: 'Launch Website',
        subtitle: 'Starter',
        price: 'from 30,000 ETB',
        timeline: '2-4 Weeks Delivery',
        idealFor: 'New businesses that need a credible site and a clear inquiry path',
        features: [
            'Up to 7 core pages',
            'Custom responsive design',
            'WhatsApp and click-to-call integration',
            'Content management setup',
            'Technical SEO foundations',
            'Analytics and maps setup',
            'Accessibility and performance checks',
            '30 days of launch support',
        ],
        ctaText: 'Scope a Launch Website',
    },
    {
        icon: 'chart',
        title: 'Growth Website',
        subtitle: 'Scope-led',
        price: '60,000 – 120,000 ETB',
        timeline: '4-6 Weeks Delivery',
        idealFor: 'Teams that need richer content, stronger conversion, and managed sales flows',
        features: [
            'Everything in Launch Website',
            'Up to 20 unique templates',
            'Dynamic listings or resource library',
            'Lead pipeline and form automation',
            'Advanced local SEO and structured data',
            'GA4, Search Console, and event tracking',
            'Editor training and documentation',
        ],
        ctaText: 'Scope a Growth Website',
    },
    {
        icon: 'building',
        title: 'Custom Web Platform',
        subtitle: 'Custom',
        price: '150,000+ ETB',
        timeline: '8-12 Weeks Delivery',
        idealFor: 'Portals, dashboards, commerce systems, and multi-role web applications',
        features: [
            'Discovery and software blueprint',
            'Custom UI/UX and design system',
            'Role-based web application',
            'Payment and business API integrations',
            'CRM and ERP integrations',
            'Security and automated test coverage',
            'Deployment, monitoring, and handover',
        ],
        ctaText: 'Plan a Web Platform',
    },
];

const MOBILE_PACKAGES = [
    {
        icon: 'mobile',
        title: 'Mobile MVP',
        subtitle: 'Starter',
        price: 'from 60,000 ETB',
        timeline: '6-8 Weeks Delivery',
        idealFor: 'Focused customer, catalogue, booking, or field utility apps',
        features: [
            'Cross-platform (iOS & Android)',
            'Custom mobile UI/UX',
            'Push notifications',
            'Account and profile flows',
            'Social login',
            'Basic admin panel',
            'Store submission support',
            '90-day bug-fix warranty',
        ],
        ctaText: 'Scope a Mobile MVP',
    },
    {
        icon: 'lightning',
        title: 'Business Mobile App',
        subtitle: 'Scope-led',
        price: '150,000 – 300,000 ETB',
        timeline: '10-16 Weeks Delivery',
        idealFor: 'Retail, booking, delivery, payments, and multi-role operations',
        features: [
            'Customer, staff, and vendor roles',
            'Commerce, booking, or field workflows',
            'Telebirr/Chapa/mobile banking integration',
            'Google Maps integration',
            'Real-time notifications',
            'Web operations dashboard',
            'Automated testing and release setup',
        ],
        ctaText: 'Build Your Platform',
    },
    {
        icon: 'building',
        title: 'Enterprise Mobile Platform',
        subtitle: 'Mission-Critical',
        price: '350,000+ ETB',
        timeline: '16-24 Weeks Delivery',
        idealFor: 'Financial institutions, scale-ups, and regulated operators',
        features: [
            'Everything in Business tier',
            'Security and threat modeling',
            'Biometric authentication',
            'Complex API and service architecture',
            'Real-time data synchronization',
            'Compliance and audit readiness',
            'High-availability deployment',
            'Written support and response SLA',
        ],
        ctaText: 'Contact for Proposal',
    },
];

const SAAS_PACKAGES = [
    {
        icon: 'book',
        title: "School Management System",
        subtitle: "EduTech",
        setupFee: 45000,
        monthlyFrom: 4500,
        price: '4,500 ETB / month',
        period: '/month',
        annual: 45000,
        billingNote: '10 months billed annually',
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
        setupFee: 60000,
        monthlyFrom: 7500,
        price: '7,500 ETB / month',
        period: '/month',
        annual: 75000,
        billingNote: '10 months billed annually',
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
        setupFee: 40000,
        monthlyFrom: 5500,
        price: '5,500 ETB / month',
        period: '/month',
        annual: 55000,
        billingNote: '10 months billed annually',
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
    { service: 'Domain & Cloud Hosting', description: 'Domain, SSL, cloud hosting, backups, and baseline monitoring.', price: '6,500 – 15,000 ETB / year', type: 'Recurring' },
    { service: 'Application Maintenance', description: 'Security patches, dependency updates, backups, monitoring, and a written support allowance.', price: '18,000 – 60,000 ETB / year', type: 'Recurring' },
    { service: 'API & System Integration', description: 'Connect payments, CRM, ERP, messaging, and internal APIs with tested data flows.', price: '30,000 – 100,000 ETB', type: 'One-Time' },
    { service: 'Application Modernization', description: 'Upgrade legacy code, dependencies, deployment, data models, and test coverage.', price: '75,000 – 250,000 ETB', type: 'One-Time' },
    { service: 'QA & Security Review', description: 'Automated tests, dependency and secret checks, threat review, and release hardening.', price: '25,000 – 80,000 ETB', type: 'One-Time' },
    { service: 'Custom SaaS Product Build', description: 'Product architecture, billing, onboarding, multi-tenancy, and launch-ready delivery.', price: 'from 180,000 ETB', type: 'One-Time' },
];

const FEATURED_ADDONS = [
    { icon: 'globe', title: 'Domain & Cloud Hosting', description: 'Domain, SSL, cloud hosting, backups, and baseline monitoring.', price: '6,500 – 15,000 ETB / year' },
    { icon: 'wrench', title: 'Application Maintenance', description: 'Security patches, backups, monitoring, and a written annual support allowance.', price: '18,000 – 60,000 ETB / year' },
    { icon: 'settings', title: 'API & System Integration', description: 'Connect payments, CRM, ERP, messaging, and internal systems with tested data flows.', price: '30,000 – 100,000 ETB' },
    { icon: 'refresh', title: 'Application Modernization', description: 'Upgrade legacy code, dependencies, deployment, and data models.', price: '75,000 – 250,000 ETB' },
    { icon: 'shield', title: 'QA & Security Review', description: 'Automated tests, dependency and secret checks, threat review, and release hardening.', price: '25,000 – 80,000 ETB' },
];

const PRODUCT_ENGINEERING_TIERS = [
    {
        title: 'Tier 1: Focused Custom Software',
        bestFor: 'Small businesses',
        timeline: '6-10 weeks',
        setupPrice: 'from 100,000 ETB',
        monthlySupport: '18,000 – 35,000 ETB / year',
        scope: 'A focused application, internal tool, customer portal, or operational workflow.',
        includes: [
            'Requirements and technical discovery',
            'Custom application',
            'Admin and reporting screens',
            'Role-based access',
            'Up to 3 external integrations',
            'Automated tests and deployment handover',
        ],
        supportIncludes: [
            'Monitoring and alerting',
            'Security and dependency updates',
            '20 support hours per year',
            'Next-business-day response commitment',
        ],
    },
    {
        title: 'Tier 2: Multi-System Business Platform',
        bestFor: 'Mid-market firms',
        timeline: '3-6 months',
        setupPrice: 'from 250,000 ETB',
        monthlySupport: '35,000 – 60,000 ETB / year',
        scope: 'Multi-department business software with CRM, ERP, payment, and reporting integrations.',
        includes: [
            'Multi-role software platform',
            'Department workflows',
            'CRM integrations',
            'Custom analytics dashboards',
            'API and data migration',
        ],
        supportIncludes: [
            'Monitoring and alerting',
            'Security and dependency updates',
            '40 support hours per year',
            'Same-business-day response commitment',
        ],
    },
    {
        title: 'Tier 3: Enterprise Software Platform',
        bestFor: 'Large organizations',
        timeline: '6-12 months',
        setupPrice: 'from 600,000 ETB',
        monthlySupport: '15% – 25% of build value / year',
        scope: 'Mission-critical systems with private deployment, complex integrations, and governance.',
        includes: [
            'Enterprise architecture',
            'Private deployment options',
            'Enterprise governance and audit trails',
            'Cross-department orchestration',
            'Data protection and compliance reviews',
            'High-availability deployment',
        ],
        supportIncludes: [
            'Monitoring and alerting',
            'Security and dependency updates',
            'Annual support allowance scoped with the platform',
            '4-hour response commitment for critical issues',
        ],
    },
];

export const getPricingGuideSummary = () => ({
    geographicPolicy: 'All prices are quoted in Ethiopian Birr (ETB). International engagements are quoted individually.',
    workflowAudit: {
        title: 'Software Blueprint',
        kicker: 'Scoping',
        price: '25,000 ETB',
        description: 'Requirements analysis, architecture, integration plan, and an implementation-ready software blueprint.',
        outputs: [
            'Current-state process map',
            'Prioritized software scope',
            'Application and data architecture',
            'Security and hosting recommendation',
            'Implementation plan and estimate',
        ],
    },
    productEngineeringTiers: PRODUCT_ENGINEERING_TIERS,
    automationTiers: PRODUCT_ENGINEERING_TIERS,
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
            price: '6,500 – 15,000 ETB / year',
            description: 'Domain, SSL certificate, cloud hosting, backups, and baseline monitoring.',
        },
        {
            id: 'featured-2',
            icon: 'wrench',
            title: "Application Maintenance",
            price: '18,000 – 60,000 ETB / year',
            description: 'Security patches, backups, monitoring, and a written annual support allowance.',
        },
        {
            id: 'featured-3',
            icon: 'settings',
            title: "API & System Integration",
            price: '30,000 – 100,000 ETB',
            description: 'Connect CRMs, ERP, payment, and internal systems with tested data flows.',
        },
        {
            id: 'featured-4',
            icon: 'refresh',
            title: "Application Modernization",
            price: '75,000 – 250,000 ETB',
            description: 'Upgrade legacy code, dependencies, deployment, and data models.',
        },
        {
            id: 'featured-5',
            icon: 'shield',
            title: "QA & Security Review",
            price: '25,000 – 80,000 ETB',
            description: 'Automated tests, dependency and secret checks, threat review, and release hardening.',
        },
    ];
};

export const getAdditionalServices = async () => {
    return ADDITIONAL_SERVICES;
};

export const getFeaturedAddons = async () => {
    return FEATURED_ADDONS;
};
