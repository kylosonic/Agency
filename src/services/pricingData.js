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

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const firebaseConfig = { ... };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const PRICING_DATA_ENDPOINT = (import.meta.env.VITE_PRICING_DATA_ENDPOINT || '').trim();
let remoteWebPackagesCache = null;
let remoteWebPackagesLoaded = false;

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

    return [
        {
            icon: 'rocket',
            title: 'Digital Presence',
            subtitle: 'Starter',
            price: '20,000 - 35,000',
            timeline: '2-3 Weeks Delivery',
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
        }
    ];
};

export const getMobilePackages = async () => {
    return [
        {
            icon: 'mobile',
            title: 'Basic Utility / Informational App',
            subtitle: 'Starter',
            price: '120,000 - 180,000',
            timeline: '4-6 Weeks Delivery',
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
};

export const getSaasPackages = async () => {
    return [
        {
            icon: 'book',
            title: "School Management System",
            subtitle: "EduTech",
            setupFee: '15,000',
            monthlyFrom: '5,000',
            monthlyTo: '10,000',
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
};

export const getMarketingAddons = async () => {
    return [
        {
            id: 'visibility_boost',
            icon: 'chart',
            title: 'Visibility Boost',
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
    return [
        { service: 'Domain & Cloud Hosting', description: 'Domain, SSL certificate and high-speed cloud server.', price: '4,000 - 8,000 ETB / year', type: 'Recurring' },
        { service: 'Annual Web Maintenance', description: 'Security patches, plugin updates, daily backups and minor content changes.', price: '10,000 - 20,000 ETB / year', type: 'Recurring' },
        { service: 'App Store Developer Accounts', description: 'Apple App Store and Google Play Store setup fees.', price: 'About 4,500 ETB / year', type: 'Recurring' },
        { service: 'Logo & Visual Identity', description: 'Logo, typography, color palette and brand guidelines.', price: '8,000 - 15,000 ETB', type: 'One-Time' },
        { service: 'Professional Copywriting', description: 'SEO-optimized conversion-focused writing in English and Amharic.', price: '800 - 1,500 ETB / page', type: 'One-Time' },
        { service: 'Commercial Photography', description: 'On-location professional shoots for products, staff or real estate.', price: 'Custom quote', type: 'One-Time' },
    ];
};

export const getFeaturedAddons = async () => {
    return [
        { icon: 'globe', title: 'Domain & Cloud Hosting', description: 'Domain, SSL certificate and high-speed cloud server.', price: '4,000 - 8,000 ETB / year' },
        { icon: 'palette', title: 'Logo & Visual Identity', description: 'Logo, typography, color palette, and brand guideline starter kit.', price: '8,000 - 15,000 ETB' },
        { icon: 'camera', title: 'Professional Photography', description: 'On-location commercial shoots for products, teams, or properties.', price: 'Custom quote' },
        { icon: 'wrench', title: 'Annual Web Maintenance', description: 'Security patches, plugin updates, daily backups and minor content changes.', price: '10,000 - 20,000 ETB / year' },
    ];
};
