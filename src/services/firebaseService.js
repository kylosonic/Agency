/**
 * src/services/firebaseService.js
 * 
 * PLACEHOLDER SERVICE FOR FIREBASE INTEGRATION
 * 
 * This file acts as a dummy backend layer. Currently, it returns hardcoded
 * arrays wrapped in async Promises to simulate network requests.
 * 
 * Once you connect to Firebase, you can replace the contents of these functions
 * with real Firestore queries (e.g., `getDocs(collection(db, 'webPackages'))`).
 * No UI components will need to be changed.
 */

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const firebaseConfig = { ... };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// Simulated network delay (ms)
const SIMULATED_DELAY = 600;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getWebPackages = async () => {
    await delay(SIMULATED_DELAY);
    // TODO: const snapshot = await getDocs(collection(db, 'webPackages'));
    // TODO: return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return [
        {
            icon: "🚀",
            title: 'The "Digital Presence" Package',
            subtitle: "Starter",
            price: "20,000",
            period: "starting",
            timeline: "2–3 Weeks Delivery",
            features: [
                'Up to 5 custom-designed pages',
                'Mobile-responsive design',
                'Basic SEO setup',
                'Contact form integration',
                'Social media linking',
                'Google Analytics setup',
                'SSL certificate & basic security',
                '3 months free maintenance',
            ],
            ctaText: "Start Your Presence"
        },
        {
            icon: "📈",
            title: 'The "Growth & Conversion" Package',
            subtitle: "Recommended",
            price: "50,000 – 80,000",
            timeline: "3–5 Weeks Delivery",
            recommended: true,
            badgeText: "★ Most Popular",
            features: [
                'Up to 15 custom pages',
                'Advanced UI/UX design',
                'CMS integration (WordPress/Headless)',
                'E-commerce ready (up to 50 products)',
                'Payment gateway integration',
                'Advanced SEO & speed optimization',
                'Blog/News section',
                'Email marketing integration',
                'Live chat widget',
                'Admin dashboard',
            ],
            ctaText: "Accelerate Growth"
        },
        {
            icon: "🏛️",
            title: 'The "Enterprise" Package',
            subtitle: "Custom",
            price: "150,000+",
            timeline: "6–8 Weeks Delivery",
            features: [
                'Unlimited custom pages',
                'Custom web application development',
                'Advanced database architecture',
                'API development & integrations',
                'Multi-language support',
                'Role-based admin panel',
                'Custom analytics dashboard',
                'Load testing & optimization',
                'Dedicated project manager',
                'Priority 24/7 support',
                'SLA guarantee',
            ],
            ctaText: "Contact for Quote"
        }
    ];
};

export const getMobilePackages = async () => {
    await delay(SIMULATED_DELAY);
    return [
        {
            icon: "📱",
            title: 'The "Essential App" Package',
            subtitle: "Starter",
            price: "80,000 – 120,000",
            timeline: "4–6 Weeks Delivery",
            features: [
                'Cross-platform (iOS & Android)',
                'Up to 10 core screens',
                'User authentication (Email/Social)',
                'Basic database integration',
                'Push notifications setup',
                'App Store & Play Store submission',
                'Standard UI animations',
                '3 months bug-fix warranty',
            ],
            ctaText: "Launch Your App"
        },
        {
            icon: "⚡",
            title: 'The "Full Scale Platform" Package',
            subtitle: "Recommended",
            price: "150,000 – 250,000",
            timeline: "8–12 Weeks Delivery",
            recommended: true,
            badgeText: "★ Best Value",
            features: [
                'Everything in Essential App',
                'Advanced state management',
                'Local payment integration (Telebirr/Chapa)',
                'Offline-first architecture capability',
                'Real-time chat / messaging features',
                'GPS & Location services integration',
                'Complex animation & transitions',
                'Admin dashboard (Web panel)',
                'Advanced analytics tracking',
                '6 months priority support',
            ],
            ctaText: "Build Your Platform"
        }
    ];
};

export const getSaasPackages = async () => {
    await delay(SIMULATED_DELAY);
    return [
        {
            icon: "📚",
            title: "School Management System",
            subtitle: "EduTech",
            price: "15,000",
            period: "/ month",
            features: [
                'Student & staff directory',
                'Attendance tracking system',
                'Gradebook & report card generation',
                'Parent communication portal',
                'Timetable management',
                'Fee management & invoicing',
                'Library management module',
                'Free implementation & training',
            ],
            ctaText: "Request Demo"
        },
        {
            icon: "🏥",
            title: "Clinic/Hospital ERP",
            subtitle: "HealthTech",
            price: "25,000",
            period: "/ month",
            recommended: true,
            badgeText: "★ High Demand",
            features: [
                'Patient electronic health records (EHR)',
                'Appointment scheduling & reminders',
                'Billing & insurance claim management',
                'Pharmacy & inventory tracking',
                'Laboratory systems integration',
                'Doctor/Staff roaster management',
                'Telemedicine capability ready',
                'HIPAA compliant architecture',
            ],
            ctaText: "Request Demo"
        },
        {
            icon: "🏢",
            title: "Real Estate CRM",
            subtitle: "PropTech",
            price: "10,000",
            period: "/ month",
            features: [
                'Property listing management',
                'Client & lead tracking pipeline',
                'Agent performance dashboard',
                'Automated email/SMS follow-ups',
                'Document management & e-signatures',
                'Payment schedule tracking',
                'Virtual tour integration capability',
                'Custom branding',
            ],
            ctaText: "Request Demo"
        }
    ];
};

export const getMarketingAddons = async () => {
    await delay(SIMULATED_DELAY);
    return [
        {
            id: 'visibility',
            icon: "🔍",
            title: "The Visibility Boost",
            fee: "5,000",
            adSpend: "3,000–5,000",
            features: [
                'Google Business Profile optimization',
                'Basic social media ads (Facebook/Instagram)',
                'Monthly performance report',
                'Keyword research & basic SEO',
            ]
        },
        {
            id: 'lead',
            icon: "🎯",
            title: "The Lead Generator",
            featured: true,
            fee: "10,000",
            adSpend: "7,000–15,000",
            features: [
                'Everything in Visibility Boost',
                'Google Ads (Search + Display)',
                'Landing page optimization',
                'A/B testing & conversion tracking',
                'Lead nurturing email sequences',
                'Bi-weekly strategy calls',
            ]
        },
        {
            id: 'dominator',
            icon: "👑",
            title: "The Market Dominator",
            fee: "20,000",
            adSpend: "20,000–50,000",
            features: [
                'Everything in Lead Generator',
                'Full omnichannel campaigns',
                'Video ad production',
                'Influencer partnership management',
                'Advanced analytics & attribution',
                'Dedicated marketing strategist',
                'Weekly strategy sessions',
            ]
        }
    ];
};

export const getAppMarketingAddons = async () => {
    await delay(SIMULATED_DELAY);
    return [
        {
            id: 'launch',
            icon: "🚀",
            title: "App Launch & Visibility Setup",
            fee: "8,000",
            adSpend: "One-time setup + 3,000/mo management",
            features: [
                'App Store Optimization (ASO)',
                'Keyword research & metadata optimization',
                'Screenshot & preview video design',
                'App description copywriting',
                'Rating & review strategy',
                'Initial launch campaign setup',
            ]
        },
        {
            id: 'growth',
            icon: "📈",
            title: "Growth & Acquisition",
            featured: true,
            fee: "12,000",
            adSpend: "10,000–25,000",
            features: [
                'Everything in Launch & Visibility',
                'Cost Per Install (CPI) campaigns',
                'Google UAC & Meta App Install ads',
                'Audience targeting & retargeting',
                'Weekly performance reporting',
                'A/B testing of creatives',
            ]
        },
        {
            id: 'scaling',
            icon: "🏆",
            title: "App Scaling & User Retention",
            fee: "25,000",
            adSpend: "30,000–60,000",
            features: [
                'Everything in Growth & Acquisition',
                'Push notification campaigns',
                'In-app engagement optimization',
                'User retention & churn analysis',
                'Referral program setup',
                'Advanced analytics & cohort analysis',
                'Dedicated app marketing strategist',
            ]
        }
    ];
};

export const getAdditionalServices = async () => {
    await delay(SIMULATED_DELAY);
    return [
        {
            service: 'Domain Registration',
            description: 'Annual .com, .et, or custom domain registration',
            price: '1,500 – 5,000 ETB',
            type: 'Annual',
        },
        {
            service: 'Cloud Web Hosting',
            description: 'Secure, fast SSD-based hosting with SSL & backups',
            price: '5,000 – 15,000 ETB',
            type: 'Annual',
        },
        {
            service: 'Annual Web Maintenance',
            description: 'Updates, security patches, backups, and uptime monitoring',
            price: '8,000 – 20,000 ETB',
            type: 'Annual',
        },
        {
            service: 'App Store Developer Account (Apple)',
            description: 'Apple Developer Program enrollment and submission',
            price: '5,500 ETB',
            type: 'Annual',
        },
        {
            service: 'App Store Developer Account (Google)',
            description: 'Google Play Console one-time registration',
            price: '1,500 ETB',
            type: 'One-Time',
        },
        {
            service: 'Logo & Visual Identity Design',
            description: 'Professional logo, color palette, typography, & brand guidelines',
            price: '5,000 – 15,000 ETB',
            type: 'One-Time',
        },
        {
            service: 'Professional Copywriting',
            description: 'Website copy, product descriptions, and marketing content',
            price: '3,000 – 10,000 ETB',
            type: 'Per Project',
        },
        {
            service: 'Commercial Photography',
            description: 'Product photography, office/team photos, lifestyle shoots',
            price: '5,000 – 20,000 ETB',
            type: 'Per Session',
        },
    ];
};

export const getFeaturedAddons = async () => {
    await delay(SIMULATED_DELAY);
    return [
        {
            icon: '🌐',
            title: 'Domain & Hosting Bundle',
            description: 'Get your domain registration and cloud hosting together at a discounted annual rate. Includes free SSL, daily backups, and 99.9% uptime SLA.',
            price: 'Starting at 6,000 ETB/yr',
        },
        {
            icon: '🎨',
            title: 'Complete Brand Identity',
            description: 'Professional logo design, color system, typography selection, and comprehensive brand guidelines document. Includes 3 revision rounds.',
            price: 'Starting at 5,000 ETB',
        },
        {
            icon: '📸',
            title: 'Professional Photography',
            description: 'High-quality commercial photography for your products, team, and workspace. Includes editing, retouching, and web-optimized deliverables.',
            price: 'Starting at 5,000 ETB',
        }
    ];
};
