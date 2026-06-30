/**
 * src/services/pricingData.js
 * 
 * STATIC PRICING DATA
 * 
 * Static pricing package data with optional remote overrides.
 * By default, this module returns local arrays immediately.
 *
 * Optional remote source:
 * - Set VITE_PRICING_DATA_ENDPOINT to a JSON endpoint that returns:
 *   { webPackages: [...] }
 * - When available and valid, webPackages from the endpoint are used.
 * - On any failure or invalid payload, local static fallback is used.
 */

const PRICING_DATA_ENDPOINT = (import.meta.env.VITE_PRICING_DATA_ENDPOINT || '').trim();
let remoteWebPackagesCache = null;
let remoteWebPackagesLoaded = false;

const WEB_PACKAGES = [
    {
        icon: 'rocket',
        title: 'Digital Presence',
        subtitle: 'Starter',
        price: '20,000 - 35,000',
        timeline: '2-3 Weeks Delivery',
        globalPrice: '$1,000 - $3,000',
        localPrice: '20,000 - 35,000 ETB',
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
        ctaText: 'Start Your Presence',
    },
    {
        icon: 'chart',
        title: 'Growth & Conversion',
        subtitle: 'Recommended',
        price: '45,000 - 75,000',
        timeline: '4-5 Weeks Delivery',
        globalPrice: '$5,000 - $12,000',
        localPrice: '45,000 - 75,000 ETB',
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
        ctaText: 'Accelerate Growth',
    },
    {
        icon: 'building',
        title: 'Enterprise',
        subtitle: 'Custom',
        price: '90,000 - 150,000+',
        timeline: '6-8 Weeks Delivery',
        globalPrice: '$20,000 - $50,000',
        localPrice: '90,000 - 150,000+ ETB',
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
        ctaText: 'Contact for Quote',
    },
];

const MOBILE_PACKAGES = [
    {
        icon: 'mobile',
        title: 'Basic Utility / Informational App',
        subtitle: 'Starter',
        price: '120,000 - 180,000',
        timeline: '4-6 Weeks Delivery',
        globalPrice: '$15,000 - $25,000',
        localPrice: '120,000 - 180,000 ETB',
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
        price: '250,000 - 450,000',
        timeline: '8-12 Weeks Delivery',
        globalPrice: '$30,000 - $50,000',
        localPrice: '250,000 - 450,000 ETB',
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
    {
        icon: 'building',
        title: 'Enterprise / FinTech / Custom SaaS App',
        subtitle: 'Custom',
        price: '500,000+',
        timeline: '16+ Weeks Delivery',
        globalPrice: '$120,000+',
        localPrice: '500,000+ ETB',
        idealFor: 'Tech startups, FinTech teams, and complex enterprise operations',
        features: [
            'Secure custom backend',
            'Role-based access',
            'Real-time sync',
            'Biometric login',
            'Advanced analytics',
            'Third-party API integrations',
            'QA and penetration testing',
        ],
        ctaText: 'Plan Enterprise Build',
    },
];

const SAAS_PACKAGES = [
    {
        icon: 'book',
        title: "School Management System",
        subtitle: "EduTech",
        setupFee: '15,000',
        monthlyFrom: '5,000',
        monthlyTo: '10,000',
        globalPricing: '$1,500 setup + $300 - $500 monthly',
        localPricing: '15,000 ETB setup + 5,000 - 10,000 ETB monthly',
        period: '/ month',
        billingNote: 'billed annually',
        features: [
            'Admissions and student records',
            'Timetables',
            'Grading and report cards',
            'Tuition invoices',
            'Telebirr/CBE parent payments',
            'Parent/student portals',
            'HR and payroll',
        ],
        ctaText: "Request Demo",
    },
    {
        icon: 'hospital',
        title: "Clinic/Hospital ERP",
        subtitle: "HealthTech",
        setupFee: '25,000',
        monthlyFrom: '8,000',
        monthlyTo: '15,000',
        globalPricing: '$2,500 setup + $500 - $1,000 monthly',
        localPricing: '25,000 ETB setup + 8,000 - 15,000 ETB monthly',
        period: '/ month',
        billingNote: 'billed annually',
        recommended: true,
        badgeText: 'High Demand',
        features: [
            'Electronic health records',
            'Appointment and queue management',
            'Billing and insurance workflows',
            'Pharmacy inventory with batch/expiry alerts',
            'Lab result linkage to doctor/patient portals',
        ],
        ctaText: "Request Demo",
    },
    {
        icon: 'building',
        title: "Real Estate CRM",
        subtitle: "PropTech",
        setupFee: '10,000',
        monthlyFrom: '4,000',
        monthlyTo: '8,000',
        globalPricing: '$1,000 setup + $200 - $400 monthly',
        localPricing: '10,000 ETB setup + 4,000 - 8,000 ETB monthly',
        period: '/ month',
        billingNote: 'billed annually',
        features: [
            'Tenant portals',
            'Lease tracking',
            'SMS rent reminders',
            'Payment tracking',
            'Maintenance request ticketing',
        ],
        ctaText: "Request Demo",
    }
];

const MARKETING_ADDONS = [
    {
        id: 'visibility_boost',
        icon: 'chart',
        title: 'Visibility Boost',
        focus: 'Brand awareness and local reach',
        globalPrice: '$300 / month',
        localPrice: '8,000 ETB / month',
        spendStructure: '$200 or 5,000 ETB ad spend + $100 or 3,000 ETB management',
        fee: '3,000',
        adSpend: '5,000',
        featured: true,
        features: [
            '1 active Meta campaign',
            'Basic audience targeting',
            'Monthly performance report',
        ],
    },
    {
        id: 'lead_generator',
        icon: 'search',
        title: 'Lead Generator',
        focus: 'Traffic and lead capture',
        globalPrice: '$1,000 / month',
        localPrice: '28,000 ETB / month',
        spendStructure: '$700 or 20,000 ETB ad spend + $300 or 8,000 ETB management',
        fee: '8,000',
        adSpend: '20,000',
        features: [
            '2-3 campaigns',
            'Meta Pixel and Google Tag Manager',
            'Basic retargeting',
            'Bi-weekly optimization',
        ],
    },
    {
        id: 'market_dominator',
        icon: 'chart',
        title: 'Market Dominator',
        focus: 'Sales and ROAS optimization',
        globalPrice: '$3,000+ / month',
        localPrice: '65,000+ ETB / month',
        spendStructure: '$2,500+ or 50,000+ ETB ad spend + $500 or 15,000 ETB management',
        fee: '15,000',
        adSpend: '50,000+',
        features: [
            'Unlimited Meta and Google campaigns',
            'A/B testing',
            'Conversion tracking',
            'Weekly calls',
            'Looker Studio dashboards',
        ],
    },
];

const APP_MARKETING_PACKAGES = [
    {
        id: 'app_launch_visibility',
        icon: 'rocket',
        title: 'App Launch & Visibility Setup',
        focus: 'ASO and first install campaigns',
        globalPrice: '$400 / month',
        localPrice: '10,000 ETB / month',
        spendStructure: '$200 or 5,000 ETB ad spend + $200 or 5,000 ETB management',
        features: [
            'Basic ASO for Google Play and Apple App Store',
            '1 install-focused Meta campaign',
        ],
    },
    {
        id: 'app_growth_acquisition',
        icon: 'chart',
        title: 'Growth & Acquisition',
        focus: 'Paid installs and tracking',
        globalPrice: '$1,000 / month',
        localPrice: '30,000 ETB / month',
        spendStructure: '$700 or 20,000 ETB ad spend + $300 or 10,000 ETB management',
        features: [
            'Advanced ASO',
            'Meta + Google App Campaigns',
            'AppsFlyer/Firebase tracking setup',
        ],
    },
    {
        id: 'app_scaling_retention',
        icon: 'lightning',
        title: 'App Scaling & User Retention',
        focus: 'Retention and re-engagement',
        globalPrice: '$3,000+ / month',
        localPrice: '65,000+ ETB / month',
        spendStructure: '$2,500+ or 50,000+ ETB ad spend + $500 or 15,000 ETB management',
        features: [
            'Influencer support',
            'Event tracking',
            'Retargeting campaigns',
            'Push-notification optimization',
        ],
    },
];

const ADDITIONAL_SERVICES = [
    { service: 'Domain & Cloud Hosting', description: 'Domain, SSL certificate and high-speed cloud server.', globalPrice: '$100 - $200 / year', price: '4,000 - 8,000 ETB / year', type: 'Recurring' },
    { service: 'Annual Web Maintenance', description: 'Security patches, plugin updates, daily backups and minor content changes.', globalPrice: '$500 - $1,000 / year', price: '10,000 - 20,000 ETB / year', type: 'Recurring' },
    { service: 'App Store Developer Accounts', description: 'Apple App Store and Google Play Store setup fees.', globalPrice: '$125 / year', price: 'About 4,500 ETB / year', type: 'Recurring' },
    { service: 'Logo & Visual Identity', description: 'Logo, typography, color palette and brand guidelines.', globalPrice: '$300 - $800', price: '8,000 - 15,000 ETB', type: 'One-Time' },
    { service: 'Professional Copywriting', description: 'SEO-optimized conversion-focused writing in English and Amharic.', globalPrice: '$50 - $150 / page', price: '800 - 1,500 ETB / page', type: 'One-Time' },
    { service: 'Commercial Photography', description: 'On-location professional shoots for products, staff or real estate.', globalPrice: 'Custom quote', price: 'Custom quote', type: 'One-Time' },
];

const FEATURED_ADDONS = [
    { icon: 'globe', title: 'Domain & Cloud Hosting', description: 'Domain, SSL certificate and high-speed cloud server.', globalPrice: '$100 - $200 / year', price: '4,000 - 8,000 ETB / year' },
    { icon: 'palette', title: 'Logo & Visual Identity', description: 'Logo, typography, color palette, and brand guideline starter kit.', globalPrice: '$300 - $800', price: '8,000 - 15,000 ETB' },
    { icon: 'camera', title: 'Professional Photography', description: 'On-location commercial shoots for products, teams, or properties.', globalPrice: 'Custom quote', price: 'Custom quote' },
    { icon: 'wrench', title: 'Annual Web Maintenance', description: 'Security patches, plugin updates, daily backups and minor content changes.', globalPrice: '$500 - $1,000 / year', price: '10,000 - 20,000 ETB / year' },
];

const AI_IMPLEMENTATION_TIERS = [
    {
        title: 'Tier 1: Foundational Automation',
        bestFor: 'Small businesses',
        timeline: '2-4 weeks',
        scope: 'Customer support chatbots, lead-routing tools, FAQ assistants, and simple internal workflow automation.',
        globalSetup: '$2,000 - $15,000',
        globalMonthly: '$200 - $1,000/mo',
        localSetup: '120,000 - 900,000 ETB',
        localMonthly: '12,000 - 60,000 ETB/mo',
        includes: [
            'Customer support chatbots',
            'Lead routing tools',
            'FAQ assistants',
            'Basic internal workflow automation',
        ],
    },
    {
        title: 'Tier 2: Operational Intelligence',
        bestFor: 'Mid-market firms',
        timeline: '2-4 months',
        scope: 'Multi-department automation, CRM integration, document generators, agent handoffs, and analytics workflows.',
        globalSetup: '$20,000 - $80,000',
        globalMonthly: '$2,000 - $8,000/mo',
        localSetup: '1,200,000 - 4,800,000 ETB',
        localMonthly: '120,000 - 480,000 ETB/mo',
        includes: [
            'Multi-agent systems',
            'Department workflows',
            'CRM integrations',
            'Document generation',
        ],
    },
    {
        title: 'Tier 3: Enterprise Agentic Systems',
        bestFor: 'Large organizations',
        timeline: '6-12 months',
        scope: 'Autonomous workflows, local models, air-gapped deployments, enterprise governance, and strict data protection.',
        globalSetup: '$100,000 - $300,000+',
        globalMonthly: '$10,000 - $25,000+/mo',
        localSetup: '6,000,000+ ETB',
        localMonthly: '600,000+ ETB/mo',
        includes: [
            'Autonomous workflows',
            'Private deployment options',
            'Enterprise governance and audit trails',
            'Cross-department orchestration',
        ],
    },
];

const AI_PREMIUM_PRICING = [
    {
        title: 'Basic AI App Integration',
        globalPrice: '$10,000 - $50,000',
        localPrice: '600,000 - 3,000,000 ETB',
        note: 'Adds AI assistants, recommendations, document workflows, or lightweight automation to a custom app.',
    },
    {
        title: 'Deep Architectural AI Integration',
        globalPrice: '$50,000 - $150,000',
        localPrice: '3,000,000 - 9,000,000 ETB',
        note: 'Adds multi-agent flows, custom data pipelines, advanced model orchestration, or secure deployment needs.',
    },
];

export const getPricingGuideSummary = () => ({
    geographicPolicy: 'Global clients are billed in USD. Ethiopia and East Africa are billed in ETB using purchasing-power parity.',
    workflowAudit: {
        title: 'Workflow Audit',
        kicker: 'Entry Point',
        globalPrice: '$2,500 - $10,000 USD',
        localPrice: '150,000 - 600,000 ETB',
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
            globalPrice: item.globalPrice,
            localPrice: item.localPrice,
            note: item.idealFor,
        })),
        ...MOBILE_PACKAGES.map((item) => ({
            category: 'Mobile Apps',
            title: item.title,
            timeline: item.timeline,
            globalPrice: item.globalPrice,
            localPrice: item.localPrice,
            note: item.idealFor,
        })),
        ...SAAS_PACKAGES.map((item) => ({
            category: 'Management SaaS',
            title: item.title,
            timeline: item.billingNote,
            globalPrice: item.globalPricing,
            localPrice: item.localPricing,
            note: item.features.slice(0, 3).join(', '),
        })),
    ],
    aiPremiumPricing: AI_PREMIUM_PRICING,
    growthRetainers: [...MARKETING_ADDONS, ...APP_MARKETING_PACKAGES],
    additionalServices: ADDITIONAL_SERVICES,
});

async function getRemoteWebPackages() {
    if (remoteWebPackagesLoaded) {
        return remoteWebPackagesCache;
    }

    remoteWebPackagesLoaded = true;

    if (!PRICING_DATA_ENDPOINT) {
        return null;
    }

    try {
        const response = await fetch(PRICING_DATA_ENDPOINT, {
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

export const getMarketingAddons = async () => {
    return MARKETING_ADDONS;
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
            title: "Annual Maintenance",
            price: '10,000 - 20,000 ETB / year',
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
