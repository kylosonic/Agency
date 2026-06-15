import { SITE_CONTACT } from '../config/siteConfig';

const SEO_BY_ROUTE = {
  '/': {
    en: {
      title: 'NovaTech AI - Agentic Workflow Consultancy',
      description: 'Stop manual work at the source while scaling software delivery. NovaTech AI deploys autonomous agents and builds web, mobile, and SaaS products with equal execution focus.',
    },
    am: {
      title: 'NovaTech AI - Agentic Workflow Consultancy',
      description: 'Stop manual work at the source while scaling software delivery. NovaTech AI deploys autonomous agents and builds web, mobile, and SaaS products with equal execution focus.',
    },
    om: {
      title: 'NovaTech AI - Agentic Workflow Consultancy',
      description: 'Stop manual work at the source while scaling software delivery. NovaTech AI deploys autonomous agents and builds web, mobile, and SaaS products with equal execution focus.',
    },
  },
  '/404': {
    en: {
      title: '404 - Page Not Found | NovaTech AI',
      description: 'The page you requested does not exist. Explore NovaTech AI workflow automation and product engineering services.',
    },
    am: {
      title: '404 - Page Not Found | NovaTech AI',
      description: 'The page you requested does not exist. Explore NovaTech AI workflow automation and product engineering services.',
    },
    om: {
      title: '404 - Page Not Found | NovaTech AI',
      description: 'The page you requested does not exist. Explore NovaTech AI workflow automation and product engineering services.',
    },
  },
  '/services': {
    en: {
      title: 'AI Solutions | NovaTech AI',
      description: 'Explore custom agentic systems plus co-equal web, mobile, and SaaS product engineering delivery for full operational transformation.',
    },
    am: {
      title: 'AI Solutions | NovaTech AI',
      description: 'Explore custom agentic systems plus co-equal web, mobile, and SaaS product engineering delivery for full operational transformation.',
    },
    om: {
      title: 'AI Solutions | NovaTech AI',
      description: 'Explore custom agentic systems plus co-equal web, mobile, and SaaS product engineering delivery for full operational transformation.',
    },
  },
  '/pricing': {
    en: {
      title: 'Pricing | NovaTech AI',
      description: 'Review pricing for workflow audits, AI automation tiers, and co-equal web/mobile/SaaS product engineering engagements.',
    },
    am: {
      title: 'Pricing | NovaTech AI',
      description: 'Review pricing for workflow audits, AI automation tiers, and co-equal web/mobile/SaaS product engineering engagements.',
    },
    om: {
      title: 'Pricing | NovaTech AI',
      description: 'Review pricing for workflow audits, AI automation tiers, and co-equal web/mobile/SaaS product engineering engagements.',
    },
  },
  '/workflow-audit': {
    en: {
      title: 'Workflow Audit | NovaTech AI',
      description: 'Book a workflow audit to map bottlenecks, estimate recoverable capacity, and receive an implementation-ready automation blueprint.',
    },
    am: {
      title: 'Workflow Audit | NovaTech AI',
      description: 'Book a workflow audit to map bottlenecks, estimate recoverable capacity, and receive an implementation-ready automation blueprint.',
    },
    om: {
      title: 'Workflow Audit | NovaTech AI',
      description: 'Book a workflow audit to map bottlenecks, estimate recoverable capacity, and receive an implementation-ready automation blueprint.',
    },
  },
  '/web-development': {
    en: {
      title: 'Web Development | NovaTech AI',
      description: 'Conversion-focused web platforms and portals that operationalize your workflows with AI-ready architecture.',
    },
    am: {
      title: 'የዌብ ልማት | NovaTech AI',
      description: 'SEO እና የማስጀመሪያ ድጋፍ ያላቸውን የዌብ ፓኬጆች ይምረጡ።',
    },
    om: {
      title: 'Web Development | NovaTech AI',
      description: 'Paakeejii web kan jijjiirraa dabalu, SEO fi deeggarsa launch waliin filadhu.',
    },
  },
  '/mobile-development': {
    en: {
      title: 'Mobile App Development | NovaTech AI',
      description: 'Cross-platform mobile apps built for performance, retention, and local payment integrations.',
    },
    am: {
      title: 'ሞባይል መተግበሪያ ልማት | NovaTech AI',
      description: 'ከአካባቢ ክፍያ ውህደት ጋር ከፍተኛ አፈፃፀም ያላቸው ሞባይል መተግበሪያዎች።',
    },
    om: {
      title: 'Mobile App Development | NovaTech AI',
      description: 'Appii mobile cross-platform kan hojii gaarii fi kaffaltii naannoo wajjin hojjetan.',
    },
  },
  '/saas-solutions': {
    en: {
      title: 'SaaS Product Engineering | NovaTech AI',
      description: 'Build and scale SaaS platforms with multi-tenant architecture, analytics, and automation-ready workflows.',
    },
    am: {
      title: 'የSaaS ምርት እንጂነሪንግ | NovaTech AI',
      description: 'ለትምህርት ቤቶች፣ ሆስፒታሎች እና ሪል እስቴት የSaaS ስርዓቶችን ያስጀምሩ።',
    },
    om: {
      title: 'SaaS Product Engineering | NovaTech AI',
      description: 'Mana barumsaa, hospitaala fi real estatef sirna SaaS tajaajilamaa diriirsi.',
    },
  },
  '/additional-services': {
    en: {
      title: 'Additional Services and Add-ons | NovaTech',
      description: 'Explore domain, hosting, branding, photography, and maintenance add-ons with transparent pricing.',
    },
    am: {
      title: 'ተጨማሪ አገልግሎቶች | NovaTech',
      description: 'ዶሜይን፣ ሆስቲንግ፣ ብራንዲንግ እና ሌሎች ተጨማሪ አገልግሎቶችን ይመልከቱ።',
    },
    om: {
      title: 'Tajaajiloota Dabalataa | NovaTech',
      description: 'Domain, hosting, branding, suuraa fi maintenance gatii ifa taeen ilaali.',
    },
  },
  '/policy': {
    en: {
      title: 'Payment and Operational Policy | NovaTech',
      description: 'Review development payment milestones, marketing terms, SaaS subscription rules, and support commitments.',
    },
    am: {
      title: 'የክፍያ እና ኦፕሬሽን ፖሊሲ | NovaTech',
      description: 'የልማት ክፍያ ደረጃዎችን፣ የማርኬቲንግ እና SaaS ውሎችን ይመልከቱ።',
    },
    om: {
      title: 'Imaammata Kaffaltii fi Hojii | NovaTech',
      description: 'Milestone kaffaltii, haala marketing fi seera SaaS keessatti ibsa guutuu argadhu.',
    },
  },
  '/case-studies': {
    en: {
      title: 'Case Studies | NovaTech',
      description: 'Explore measurable outcomes from NovaTech projects across e-commerce, healthcare, education, and logistics.',
    },
    am: {
      title: 'የስራ ምሳሌዎች | NovaTech',
      description: 'ከተለያዩ ኢንዱስትሪዎች ውጤት የተመዘኑ የNovaTech ፕሮጀክቶችን ይመልከቱ።',
    },
    om: {
      title: 'Case Studies | NovaTech',
      description: 'Pirojektoota NovaTech keessaa buaa madaalame e-commerce, health fi education keessatti ilaali.',
    },
  },
  '/portfolio': {
    en: {
      title: 'Portfolio | NovaTech',
      description: 'Filter our portfolio by industry and discover digital products tailored for specific business domains.',
    },
    am: {
      title: 'ፖርትፎሊዮ | NovaTech',
      description: 'በኢንዱስትሪ የተደረገ ማጣሪያ በመጠቀም የስራ ምሳሌዎቻችንን ይመልከቱ።',
    },
    om: {
      title: 'Portfolio | NovaTech',
      description: 'Portfolio keenya industry irratti filachuun hojiiwwan garaagaraa ilaali.',
    },
  },
  '/instant-quote': {
    en: {
      title: 'Instant Quote Wizard | NovaTech',
      description: 'Generate a project estimate in minutes based on goals, timeline, and budget constraints.',
    },
    am: {
      title: 'ፈጣን ዋጋ ግምት | NovaTech',
      description: 'በግቦች፣ ጊዜ እና በጀት መሰረት ፕሮጀክት ዋጋን በፍጥነት ያግኙ።',
    },
    om: {
      title: 'Instant Quote Wizard | NovaTech',
      description: 'Daandii saffisaa keessatti gatii pirojektii kaayyoo fi baajata irratti hundaaee argadhu.',
    },
  },
  '/book-discovery-call': {
    en: {
      title: 'Book a Discovery Call | NovaTech',
      description: 'Schedule a discovery call with timezone-aware booking and project intake details.',
    },
    am: {
      title: 'የመግቢያ ጥሪ ያስይዙ | NovaTech',
      description: 'በሰዓት ክልል የሚስማማ ቅጥር በመጠቀም የመግቢያ ጥሪ ያስይዙ።',
    },
    om: {
      title: 'Discovery Call Book Godhi | NovaTech',
      description: 'Saatii naannoo keetiin wal simsiisuun discovery call salphatti qabsiifadhu.',
    },
  },
  '/industries': {
    en: {
      title: 'Industry Solutions | NovaTech',
      description: 'See NovaTech industry-ready solutions for education, healthcare, real estate, and e-commerce businesses.',
    },
    am: {
      title: 'የኢንዱስትሪ መፍትሄዎች | NovaTech',
      description: 'ለትምህርት፣ ጤና፣ ሪል እስቴት እና ኢ-ኮሜርስ የNovaTech መፍትሄዎችን ይመልከቱ።',
    },
    om: {
      title: 'Furmaata Industry | NovaTech',
      description: 'Education, healthcare, real-estate fi e-commercef furmaata NovaTech qophaae ilaali.',
    },
  },
};

const SERVICE_SCHEMA_BY_ROUTE = {
  '/services': {
    name: 'AI Automation and Agentic Systems',
    serviceType: 'AI automation consultancy',
  },
  '/workflow-audit': {
    name: 'Workflow Automation Audit',
    serviceType: 'Workflow optimization consulting',
  },
  '/web-development': {
    name: 'Web Development Services',
    serviceType: 'Web design and development',
  },
  '/mobile-development': {
    name: 'Mobile App Development Services',
    serviceType: 'Cross-platform mobile app development',
  },
  '/saas-solutions': {
    name: 'SaaS Product Engineering',
    serviceType: 'SaaS architecture and development',
  },
  '/additional-services': {
    name: 'Additional Digital Services and Add-ons',
    serviceType: 'Branding, hosting, and launch support services',
  },
  '/book-discovery-call': {
    name: 'Discovery Call Session',
    serviceType: 'Technical strategy consultation',
  },
};

const FAQ_SCHEMA_BY_ROUTE = {
  '/policy': [
    {
      question: 'How are development payments structured?',
      answer: 'Development projects follow milestone billing with 40 percent upfront, 30 percent after design or prototype approval, and 30 percent before final deployment.',
    },
    {
      question: 'Do clients own their deliverables after project completion?',
      answer: 'Yes. After final payment, clients receive full ownership of custom design assets, source code, and project intellectual property.',
    },
    {
      question: 'Are SaaS subscriptions available monthly and annually?',
      answer: 'Yes. SaaS offerings support monthly and annual billing, and annual plans include a two-month discount.',
    },
  ],
};

function resolveRoute(pathname) {
  if (pathname.startsWith('/industries/')) {
    return '/industries';
  }

  return SEO_BY_ROUTE[pathname] ? pathname : '/404';
}

function ensureCanonicalLink(href) {
  if (typeof document === 'undefined') {
    return;
  }

  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function ensureMeta(name, content) {
  if (typeof document === 'undefined') {
    return;
  }

  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function ensurePropertyMeta(property, content) {
  if (typeof document === 'undefined') {
    return;
  }

  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function ensureJsonLdScript(id, schemaObject) {
  if (typeof document === 'undefined' || !schemaObject) {
    return;
  }

  let element = document.querySelector(`script[data-seo-schema="${id}"]`);
  if (!element) {
    element = document.createElement('script');
    element.setAttribute('type', 'application/ld+json');
    element.setAttribute('data-seo-schema', id);
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schemaObject);
}

function removeJsonLdScript(id) {
  if (typeof document === 'undefined') {
    return;
  }

  const element = document.querySelector(`script[data-seo-schema="${id}"]`);
  if (element) {
    element.remove();
  }
}

function toLocaleTag(language) {
  if (language === 'am') {
    return 'am-ET';
  }

  if (language === 'om') {
    return 'om-ET';
  }

  return 'en-ET';
}

function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NovaTech AI',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    email: `mailto:${SITE_CONTACT.email}`,
    telephone: SITE_CONTACT.phoneDisplay,
    sameAs: [SITE_CONTACT.linkedinUrl, SITE_CONTACT.telegramUrl].filter(Boolean),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: SITE_CONTACT.email,
        telephone: SITE_CONTACT.phoneDisplay,
        areaServed: 'ET',
        availableLanguage: ['en', 'am', 'om'],
      },
    ],
  };
}

function buildWebsiteSchema(localeTag) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NovaTech AI',
    url: SITE_URL,
    inLanguage: localeTag,
    publisher: {
      '@type': 'Organization',
      name: 'NovaTech AI',
      url: SITE_URL,
    },
  };
}

function buildWebPageSchema({ title, description, canonicalUrl, localeTag }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: localeTag,
    isPartOf: {
      '@type': 'WebSite',
      name: 'NovaTech AI',
      url: SITE_URL,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: OG_IMAGE,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: canonicalUrl,
        },
      ],
    },
  };
}

function buildServiceSchema(pathname, description, localeTag, canonicalUrl) {
  const serviceEntry = SERVICE_SCHEMA_BY_ROUTE[pathname];
  if (!serviceEntry) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceEntry.name,
    description,
    serviceType: serviceEntry.serviceType,
    url: canonicalUrl,
    areaServed: 'ET',
    inLanguage: localeTag,
    provider: {
      '@type': 'Organization',
      name: 'NovaTech AI',
      url: SITE_URL,
    },
  };
}

function buildFaqSchema(pathname) {
  const entries = FAQ_SCHEMA_BY_ROUTE[pathname];
  if (!entries || !entries.length) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}

const SITE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://novatech.et';
const OG_IMAGE = `${SITE_URL}/og-image.png?v=20260512`;

export function setDocumentMetadata({ pathname, language = 'en' }) {
  if (typeof document === 'undefined') {
    return;
  }

  const route = resolveRoute(pathname);
  const routeSeo = SEO_BY_ROUTE[route] || SEO_BY_ROUTE['/'];
  const selected = routeSeo[language] || routeSeo.en;
  const isNotFoundRoute = route === '/404';
  const canonicalUrl = `${SITE_URL}${pathname}`;
  const localeTag = toLocaleTag(language);

  document.title = selected.title;
  ensureMeta('description', selected.description);
  ensureMeta('robots', isNotFoundRoute ? 'noindex, nofollow' : 'index, follow');
  ensureCanonicalLink(canonicalUrl);

  // Open Graph / Twitter Card
  ensurePropertyMeta('og:title', selected.title);
  ensurePropertyMeta('og:description', selected.description);
  ensurePropertyMeta('og:url', canonicalUrl);
  ensurePropertyMeta('og:image', OG_IMAGE);
  ensurePropertyMeta('og:image:alt', 'NovaTech AI automation and product engineering preview');
  ensurePropertyMeta('og:type', 'website');
  ensurePropertyMeta('og:site_name', 'NovaTech AI');
  ensurePropertyMeta('og:locale', language === 'am' ? 'am_ET' : language === 'om' ? 'om_ET' : 'en_US');
  ensureMeta('twitter:card', 'summary_large_image');
  ensureMeta('twitter:title', selected.title);
  ensureMeta('twitter:description', selected.description);
  ensureMeta('twitter:image', OG_IMAGE);

  ensureJsonLdScript('organization', buildOrganizationSchema());
  ensureJsonLdScript('website', buildWebsiteSchema(localeTag));
  ensureJsonLdScript('webpage', buildWebPageSchema({
    title: selected.title,
    description: selected.description,
    canonicalUrl,
    localeTag,
  }));

  const serviceSchema = buildServiceSchema(pathname, selected.description, localeTag, canonicalUrl);
  if (serviceSchema) {
    ensureJsonLdScript('service', serviceSchema);
  } else {
    removeJsonLdScript('service');
  }

  const faqSchema = buildFaqSchema(pathname);
  if (faqSchema) {
    ensureJsonLdScript('faq', faqSchema);
  } else {
    removeJsonLdScript('faq');
  }
}
