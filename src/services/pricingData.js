/**
 * src/services/pricingData.js
 * 
 * STATIC PRICING DATA — ETB ONLY (ADR-001, launch-readiness B4–B9, B11, B12)
 * 
 * The locked launch table lives here as the single source of truth:
 *   - Workflow Audit: fixed 85,000 ETB (credited toward implementation)
 *   - AI automation tiers: from 250,000 / 750,000 / 1,500,000+ ETB
 *   - Monthly AI support band: 30,000 - 70,000 ETB / month
 *   - Web: from 45,000 / 150,000 / 250,000 ETB
 *   - Mobile: from 200,000 / 400,000 ETB
 *   - Maintenance: 5,000 - 15,000 ETB / month (monthly only, with commitment)
 *   - SaaS: waitlist only — no prices
 * No USD or dual-currency fields exist anywhere in this module.
 *
 * Optional remote source:
 * - Set VITE_PRICING_DATA_ENDPOINT to a JSON endpoint that returns:
 *   { webPackages: [...] }
 * - The remote payload is validated to be ETB-only: any payload containing
 *   global-prefixed or local-prefixed keys, '$' or 'USD' is rejected and the static fallback is used.
 */

const PRICING_DATA_ENDPOINT_KEY = 'VITE_PRICING_DATA_ENDPOINT';
let remoteWebPackagesCache = null;
let remoteWebPackagesLoaded = false;
const SAAS_AVAILABILITY_STATUS = 'Coming soon';

/**
 * Numeric anchors derived from the locked ETB table (ADR-001, B5–B9).
 * Index i anchors the i-th published tier; `saas` is intentionally null
 * because SaaS shows no prices (B11).
 */
export const QUOTE_ANCHORS = {
  web: [45000, 150000, 250000],
  mobile: [200000, 400000],
  ai: [250000, 750000, 1500000],
  saas: null,
};

/**
 * The Workflow Audit entry offer (B5): the hard floor below which no
 * wizard estimate may quote (B17, arbitration decision 4).
 */
export const ENTRY_OFFER_FLOOR = 85000;

/** Budget bands offered by the wizard, aligned to the locked table tiers. */
export const QUOTE_BUDGET_BANDS = ['85k - 150k ETB', '150k - 400k ETB', '400k - 1M ETB', '1M+ ETB'];

const BUDGET_BAND_TIER_INDEX = {
  '85k - 150k ETB': 0,
  '150k - 400k ETB': 1,
  '400k - 1M ETB': 2,
  '1M+ ETB': 3,
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
 * (B16 parity, B17 floor). Returns `{ min, max }` in ETB integers, or
 * `null` for SaaS (B11 — no numeric estimate).
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
        price: 'from 45,000 ETB',
        timeline: '2-3 Weeks Delivery',
        idealFor: 'Consultants, personal brands, small NGOs, and local startups',
        features: [
            '5-7 core pages',
            'Responsive design',
            'WhatsApp and click-to-call integration',
            'CMS setup',
            'Basic SEO',
            'Maps integration',
            'Security and speed setup',
        ],
        ctaText: 'Request Website Estimate',
    },
    {
        icon: 'chart',
        title: 'Growth & Conversion',
        subtitle: 'Recommended',
        price: 'from 150,000 ETB',
        timeline: '4-5 Weeks Delivery',
        idealFor: 'Tour operators, real estate, construction, and import/export teams',
        recommended: true,
        badgeText: 'Most Popular',
        features: [
            'Everything in Starter',
            '15-20 pages',
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
        price: 'from 250,000 ETB',
        timeline: '6-8 Weeks Delivery',
        idealFor: 'E-commerce, hotels, bureaus, and larger organizations',
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
        title: 'Basic / Informational App',
        subtitle: 'Starter',
        price: 'from 200,000 ETB',
        timeline: '4-6 Weeks Delivery',
        idealFor: 'Content creators, media brands, directories, and service catalogs',
        features: [
            'Cross-platform (iOS & Android)',
            'Intuitive UI/UX',
            'Push notifications',
            'Offline reading mode',
            'Social login',
            'Basic admin panel',
        ],
        ctaText: 'Launch Your App',
    },
    {
        icon: 'lightning',
        title: 'Business & E-Commerce Application',
        subtitle: 'Recommended',
        price: 'from 400,000 ETB',
        timeline: '8-12 Weeks Delivery',
        idealFor: 'Retail, delivery, booking, ride-hailing, and food delivery platforms',
        recommended: true,
        badgeText: 'Best Value',
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
];

const SAAS_PACKAGES = [
    {
        icon: 'book',
        title: "School Management System",
        subtitle: "EduTech",
        availabilityStatus: SAAS_AVAILABILITY_STATUS,
        setupFee: SAAS_AVAILABILITY_STATUS,
        monthlyFrom: SAAS_AVAILABILITY_STATUS,
        monthlyTo: SAAS_AVAILABILITY_STATUS,
        period: '',
        billingNote: SAAS_AVAILABILITY_STATUS,
        features: [
            'Admissions and student records',
            'Timetables',
            'Grading and report cards',
            'Tuition invoices',
            'Telebirr/CBE parent payments',
            'Parent/student portals',
            'HR and payroll',
        ],
        ctaText: SAAS_AVAILABILITY_STATUS,
    },
    {
        icon: 'hospital',
        title: "Clinic/Hospital ERP",
        subtitle: "HealthTech",
        availabilityStatus: SAAS_AVAILABILITY_STATUS,
        setupFee: SAAS_AVAILABILITY_STATUS,
        monthlyFrom: SAAS_AVAILABILITY_STATUS,
        monthlyTo: SAAS_AVAILABILITY_STATUS,
        period: '',
        billingNote: SAAS_AVAILABILITY_STATUS,
        recommended: true,
        badgeText: 'High Demand',
        features: [
            'Electronic health records',
            'Appointment and queue management',
            'Billing and insurance workflows',
            'Pharmacy inventory with batch/expiry alerts',
            'Lab result linkage to doctor/patient portals',
        ],
        ctaText: SAAS_AVAILABILITY_STATUS,
    },
    {
        icon: 'building',
        title: "Real Estate CRM",
        subtitle: "PropTech",
        availabilityStatus: SAAS_AVAILABILITY_STATUS,
        setupFee: SAAS_AVAILABILITY_STATUS,
        monthlyFrom: SAAS_AVAILABILITY_STATUS,
        monthlyTo: SAAS_AVAILABILITY_STATUS,
        period: '',
        billingNote: SAAS_AVAILABILITY_STATUS,
        features: [
            'Tenant portals',
            'Lease tracking',
            'SMS rent reminders',
            'Payment tracking',
            'Maintenance request ticketing',
        ],
        ctaText: SAAS_AVAILABILITY_STATUS,
    }
];

const ADDITIONAL_SERVICES = [
    { service: 'Domain & Cloud Hosting', description: 'Domain, SSL certificate and high-speed cloud server.', price: '4,000 - 8,000 ETB / year', type: 'Recurring' },
    { service: 'Monthly Web Maintenance', description: 'Security patches, plugin updates, daily backups and minor content changes. Written commitment: 5 support hours per month and next-business-day response on critical issues.', price: '5,000 - 15,000 ETB / month', type: 'Recurring' },
    { service: 'Logo & Visual Identity', description: 'Logo, typography, color palette and brand guidelines.', price: '8,000 - 15,000 ETB', type: 'One-Time' },
    { service: 'Professional Copywriting', description: 'SEO-optimized conversion-focused writing in English and Amharic.', price: '800 - 1,500 ETB / page', type: 'One-Time' },
    { service: 'Commercial Photography', description: 'On-location professional shoots for products, staff or real estate.', price: 'Custom quote', type: 'One-Time' },
];

const FEATURED_ADDONS = [
    { icon: 'globe', title: 'Domain & Cloud Hosting', description: 'Domain, SSL certificate and high-speed cloud server.', price: '4,000 - 8,000 ETB / year' },
    { icon: 'palette', title: 'Logo & Visual Identity', description: 'Logo, typography, color palette, and brand guideline starter kit.', price: '8,000 - 15,000 ETB' },
    { icon: 'camera', title: 'Professional Photography', description: 'On-location commercial shoots for products, teams, or properties.', price: 'Custom quote' },
    { icon: 'wrench', title: 'Monthly Web Maintenance', description: 'Security patches, plugin updates, daily backups and minor content changes.', price: '5,000 - 15,000 ETB / month' },
];

const AI_IMPLEMENTATION_TIERS = [
    {
        title: 'Tier 1: Foundational Automation',
        bestFor: 'Small businesses',
        timeline: '2-4 weeks',
        setupPrice: 'from 250,000 ETB',
        monthlySupport: '30,000 - 70,000 ETB / month',
        scope: 'Customer support chatbots, lead-routing tools, FAQ assistants, and simple internal workflow automation. Scope drivers that raise the price: the number of workflows, conversation volume, and how deeply the automation integrates with your existing tools.',
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
        setupPrice: 'from 750,000 ETB',
        monthlySupport: '30,000 - 70,000 ETB / month',
        scope: 'Multi-department automation, CRM integration, document generators, agent handoffs, and analytics workflows. Scope drivers that raise the price: the number of departments, third-party system count, document volume, and custom reporting depth.',
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
        setupPrice: 'from 1,500,000+ ETB',
        monthlySupport: '30,000 - 70,000 ETB / month',
        scope: 'Autonomous workflows, local models, air-gapped deployments, enterprise governance, and strict data protection. Scope drivers that raise the price: data isolation requirements, model size and hosting, compliance audits, and cross-department orchestration breadth.',
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
        price: '85,000 ETB',
        description: 'Workflow analysis, automation roadmap, system blueprint, and implementation recommendation. Fixed fee, delivered within 5 business days, and the full fee is credited toward any implementation project that follows.',
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
        })),
        ...MOBILE_PACKAGES.map((item) => ({
            category: 'Mobile Apps',
            title: item.title,
            timeline: item.timeline,
            price: item.price,
            note: item.idealFor,
        })),
        ...SAAS_PACKAGES.map((item) => ({
            category: 'Management SaaS',
            title: item.title,
            timeline: item.availabilityStatus || item.billingNote,
            price: item.availabilityStatus,
            note: item.features.slice(0, 3).join(', '),
        })),
    ],
    additionalServices: ADDITIONAL_SERVICES,
});

function isEtbOnlyPackage(pkg) {
    if (!pkg || typeof pkg !== 'object' || Array.isArray(pkg)) {
        return false;
    }

    const hasForbiddenKeys = Object.keys(pkg).some((key) => /^(global|local)/.test(key));
    if (hasForbiddenKeys) {
        return false;
    }

    const serialized = JSON.stringify(pkg);
    return !serialized.includes('$') && !serialized.includes('USD');
}

async function getRemoteWebPackages() {
    if (remoteWebPackagesLoaded) {
        return remoteWebPackagesCache;
    }

    remoteWebPackagesLoaded = true;

    // Lazy environment read so this module can be imported in Node-side
    // tests without `import.meta.env` (R1). Browser behavior is identical.
    const pricingDataEndpoint = (import.meta.env?.[PRICING_DATA_ENDPOINT_KEY] || '').trim();

    if (!pricingDataEndpoint) {
        return null;
    }

    try {
        const response = await fetch(pricingDataEndpoint, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Pricing endpoint responded with ${response.status}`);
        }

        const payload = await response.json();
        if (!Array.isArray(payload?.webPackages)) {
            throw new Error('Pricing endpoint payload missing webPackages[]');
        }

        if (!payload.webPackages.every(isEtbOnlyPackage)) {
            throw new Error('Pricing endpoint payload contains non-ETB pricing; static ETB table used instead');
        }

        remoteWebPackagesCache = payload.webPackages;
        return remoteWebPackagesCache;
    } catch (error) {
        console.warn('Falling back to static web pricing packages:', error);
        remoteWebPackagesCache = null;
        return null;
    }
}

export const getWebPackages = async () => {
    const remotePackages = await getRemoteWebPackages();
    if (remotePackages) {
        return remotePackages;
    }

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
            price: '4,000 - 8,000 ETB / year',
            description: 'Domain, SSL certificate, and high-speed cloud server.',
        },
        {
            id: 'featured-2',
            icon: 'palette',
            title: "Logo & Brand Identity",
            price: '8,000 - 15,000 ETB',
            description: 'Logo, typography, color palette, and brand guideline starter kit.',
        },
        {
            id: 'featured-3',
            icon: 'camera',
            title: "Professional Photography",
            price: 'Custom quote',
            description: 'On-location commercial shoots for products, teams, or properties.',
        },
        {
            id: 'featured-4',
            icon: 'wrench',
            title: "Monthly Web Maintenance",
            price: '5,000 - 15,000 ETB / month',
            description: 'Security patches, plugin updates, daily backups, and minor content changes.',
        },
        {
            id: 'featured-5',
            icon: 'search',
            title: "Copywriting Services",
            price: '800 - 1,500 ETB / page',
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
