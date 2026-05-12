/**
 * src/services/pricingData.js
 * 
 * STATIC PRICING DATA
 * 
 * Static pricing package data. Returns arrays immediately with no simulated
 * network delay. To integrate a backend, replace return values with API calls.
 */

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const firebaseConfig = { ... };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

export const getWebPackages = async () => {
    // TODO: const snapshot = await getDocs(collection(db, 'webPackages'));
    // TODO: return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return [
        {
            icon: 'rocket',
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
            icon: 'chart',
            title: 'The "Growth & Conversion" Package',
            subtitle: "Recommended",
            price: "50,000 – 80,000",
            timeline: "3–5 Weeks Delivery",
            recommended: true,
            badgeText: 'Most Popular',
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
            icon: 'building',
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
    return [
        {
            icon: 'mobile',
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
            icon: 'lightning',
            title: 'The "Full Scale Platform" Package',
            subtitle: "Recommended",
            price: "150,000 – 250,000",
            timeline: "8–12 Weeks Delivery",
            recommended: true,
            badgeText: 'Best Value',
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
    return [
        {
            icon: 'book',
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
            icon: 'hospital',
            title: "Clinic/Hospital ERP",
            subtitle: "HealthTech",
            price: "25,000",
            period: "/ month",
            recommended: true,
            badgeText: 'High Demand',
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
            icon: 'building',
            title: "Real Estate CRM",
            subtitle: "PropTech",
            price: "10,000",
            period: "/ month",
            features: [
                'Property & unit management',
                'Tenant lifecycle tracking',
                'Automated rent reminders',
                'Lease renewal automation',
                'Maintenance request system',
                'Owner/investor portal',
                'Financial reporting dashboard',
                'Custom branding & domain',
            ],
            ctaText: "Request Demo"
        }
    ];
};

export const getMarketingAddons = async () => {
    return [
        {
            id: 'addon-1',
            icon: 'chart',
            title: "Social Media Growth",
            fee: "12,000",
            adSpend: "15,000",
            featured: true,
            features: [
                'Content calendar & strategy',
                '8–12 posts per month',
                'Community engagement',
                'Monthly performance report',
                'Story & reel production',
            ],
        },
        {
            id: 'addon-2',
            icon: 'search',
            title: "Google Ads & SEO",
            fee: "15,000",
            adSpend: "25,000",
            features: [
                'Keyword research & strategy',
                'Google Ads campaign setup',
                'On-page SEO optimization',
                'Monthly ranking report',
                'Conversion tracking',
            ],
        },
        {
            id: 'addon-3',
            icon: 'chart',
            title: "Meta Ads (Facebook/Instagram)",
            fee: "15,000",
            adSpend: "25,000",
            features: [
                'Audience targeting strategy',
                'Ad creative design (3–5 variants)',
                'A/B testing & optimization',
                'Retargeting campaigns',
                'Monthly ROI report',
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
            price: "From 3,500 ETB / year",
            description: "Professional .com or .et domain with fast, reliable hosting and free SSL certificate included.",
        },
        {
            id: 'featured-2',
            icon: 'palette',
            title: "Logo & Brand Identity",
            price: "From 8,000 ETB",
            description: "Complete brand identity package: primary logo, icon mark, color palette, and typography guide.",
        },
        {
            id: 'featured-3',
            icon: 'camera',
            title: "Professional Photography",
            price: "From 12,000 ETB / session",
            description: "On-location product, team, and facility photography with professional editing and retouching.",
        },
        {
            id: 'featured-4',
            icon: 'wrench',
            title: "Annual Maintenance",
            price: "From 15,000 ETB / year",
            description: "Content updates, security patches, backups, uptime monitoring, and priority support.",
        },
        {
            id: 'featured-5',
            icon: 'search',
            title: "Copywriting Services",
            price: "From 200 ETB / page",
            description: "SEO-optimized website copy, product descriptions, and brand storytelling in English and Amharic.",
        },
    ];
};

export const getAdditionalServices = async () => {
    return [
        { service: "Domain Registration (.com / .et)", description: "Professional domain name with privacy protection", price: "1,500 – 4,000 ETB", type: "One-Time" },
        { service: "Web Hosting (Standard)", description: "Fast shared hosting with cPanel and free SSL", price: "3,500 – 7,000 ETB/year", type: "Recurring" },
        { service: "Cloud Hosting (Business)", description: "Dedicated resources with auto-scaling and daily backups", price: "12,000 – 25,000 ETB/year", type: "Recurring" },
        { service: "Logo Design", description: "Professional logo with 3 concepts, unlimited revisions on chosen concept", price: "8,000 – 20,000 ETB", type: "One-Time" },
        { service: "Brand Identity Package", description: "Logo, color palette, typography guide, and brand guidelines document", price: "18,000 – 35,000 ETB", type: "One-Time" },
        { service: "Professional Photography", description: "On-location team, product, or facility photoshoot with editing", price: "12,000 – 30,000 ETB/session", type: "One-Time" },
        { service: "Copywriting (English)", description: "SEO-optimized website copy and product descriptions", price: "200 – 500 ETB/page", type: "One-Time" },
        { service: "Copywriting (Amharic)", description: "Culturally adapted Amharic content for local audiences", price: "250 – 600 ETB/page", type: "One-Time" },
        { service: "Annual Maintenance Retainer", description: "Content updates, security patches, backups, uptime monitoring, priority support", price: "15,000 – 45,000 ETB/year", type: "Recurring" },
        { service: "Email Marketing Setup", description: "Template design, list setup, and automation workflows", price: "8,000 – 18,000 ETB", type: "One-Time" },
        { service: "Social Media Kit", description: "Profile banners, post templates, and highlight covers for 3 platforms", price: "6,000 – 14,000 ETB", type: "One-Time" },
        { service: "Business Email Setup", description: "Professional email (you@yourbusiness.et) with Gmail/Outlook integration", price: "1,200 – 3,500 ETB/year", type: "Recurring" },
    ];
};

export const getFeaturedAddons = async () => {
    return [
        { icon: "globe", title: "Domain & Hosting", description: "Professional .com or .et domain with fast, reliable hosting and free SSL certificate included.", price: "From 3,500 ETB / year" },
        { icon: "palette", title: "Logo & Brand Identity", description: "Complete brand identity package: primary logo, icon mark, color palette, and typography guide.", price: "From 8,000 ETB" },
        { icon: "camera", title: "Professional Photography", description: "On-location product, team, and facility photography with professional editing and retouching.", price: "From 12,000 ETB / session" },
        { icon: "wrench", title: "Annual Maintenance", description: "Content updates, security patches, backups, uptime monitoring, and priority support.", price: "From 15,000 ETB / year" },
    ];
};
