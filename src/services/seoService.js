import { OG_IMAGE_URL, SITE_CONTACT, SITE_URL } from '../config/siteConfig';

const LANGUAGE_ALTERNATES = [
  { hreflang: 'en-ET', language: 'en' },
  { hreflang: 'am-ET', language: 'am' },
  { hreflang: 'om-ET', language: 'om' },
];

const SEO_BY_ROUTE = {
  '/': {
    en: {
      title: 'NovaTech | Workflow Audit and Digital Systems',
      // TECH-35/41 (S-1): software-first enumeration; AI named as the second,
      // bottleneck-scoped track. Same word budget as the pre-phase-10 string.
      description: 'Start with a Workflow Audit, then scope web, mobile, or SaaS build — AI automation where it solves a real bottleneck.',
    },
    am: {
      title: 'NovaTech - Agentic Workflow Consultancy',
      description: 'Stop manual work at the source while scaling software delivery. NovaTech deploys autonomous agents and builds web, mobile, and SaaS products with equal execution focus.',
    },
    om: {
      title: 'NovaTech - Agentic Workflow Consultancy',
      description: 'Stop manual work at the source while scaling software delivery. NovaTech deploys autonomous agents and builds web, mobile, and SaaS products with equal execution focus.',
    },
  },
  '/404': {
    en: {
      title: '404 - Page Not Found | NovaTech',
      description: 'The page you requested does not exist. Explore NovaTech workflow automation and product engineering services.',
    },
    am: {
      title: '404 - Page Not Found | NovaTech',
      description: 'The page you requested does not exist. Explore NovaTech workflow automation and product engineering services.',
    },
    om: {
      title: '404 - Page Not Found | NovaTech',
      description: 'The page you requested does not exist. Explore NovaTech workflow automation and product engineering services.',
    },
  },
  '/services': {
    // TECH-41 (A2): /services SEO title re-cut software-first.
    en: {
      title: 'Services | NovaTech',
      description: 'See the web, mobile, and live-priced SaaS lanes NovaTech builds — plus AI automation scoped to a real bottleneck — after the Workflow Audit clarifies the right path.',
    },
    am: {
      title: 'አገልግሎቶች | NovaTech',
      description: 'የዌብ፣ ሞባይል እና SaaS የሶፍትዌር መስመሮችን እንዲሁም እውነተኛ ችግርን የሚፈታ AI አውቶሜሽንን ይመልከቱ — ከWorkflow Audit በኋላ ትክክለኛውን መንገድ ያብራራል።',
    },
    om: {
      title: 'Tajaajiloota | NovaTech',
      description: 'Karaalee software web, mobile fi SaaS gatii argisiisan ilaali — waliin automation AI rakkoo dhugaa furu — erga Workflow Audit karaa sirrii ifa goonee booda.',
    },
  },
  '/pricing': {
    en: {
      title: 'Pricing | NovaTech',
      // TECH-41 (S-1): software-first enumeration — web, mobile, SaaS, then AI.
      description: 'Review the live ETB pricing table for the Workflow Audit, web systems, mobile, SaaS, AI automation, and support bands.',
    },
    am: {
      title: 'Pricing | NovaTech',
      description: 'Review pricing for workflow audits, AI automation tiers, and co-equal web/mobile/SaaS product engineering engagements.',
    },
    om: {
      title: 'Pricing | NovaTech',
      description: 'Review pricing for workflow audits, AI automation tiers, and co-equal web/mobile/SaaS product engineering engagements.',
    },
  },
  '/workflow-audit': {
    en: {
      title: 'Workflow Audit | NovaTech',
      description: 'Book a workflow audit to map bottlenecks, estimate recoverable capacity, and receive an implementation-ready automation blueprint.',
    },
    am: {
      title: 'Workflow Audit | NovaTech',
      description: 'Book a workflow audit to map bottlenecks, estimate recoverable capacity, and receive an implementation-ready automation blueprint.',
    },
    om: {
      title: 'Workflow Audit | NovaTech',
      description: 'Book a workflow audit to map bottlenecks, estimate recoverable capacity, and receive an implementation-ready automation blueprint.',
    },
  },
  '/web-development': {
    en: {
      title: 'Web Development | NovaTech',
      description: 'Web systems, portals, and dashboard layers quoted from live ETB package anchors and scoped around real commercial needs.',
    },
    am: {
      title: 'የዌብ ልማት | NovaTech',
      description: 'ቅየራ-ተኮር የመረጃ አደረጃጀት፣ የSEO እና አናሊቲክስ መሠረት እና ሳምንታዊ የስፕሪንት ግምገማ ያላቸው ዌብሳይቶች፣ ፖርታሎች እና ዳሽቦርዶች — አብዛኛውን ጊዜ በ3 እስከ 8 ሳምንት የሚደርሱ።',
    },
    om: {
      title: 'Web Development | NovaTech',
      description: "Websaayitii, portalii fi dashboard kan IA conversion irratti xiyyeeffate, bu'uura SEO fi analytics fi gamaaggama sprint torbeetuma qaban — baay'inaan torban 3 hanga 8 keessatti.",
    },
  },
  '/mobile-development': {
    en: {
      title: 'Mobile App Development | NovaTech',
      description: 'Mobile products for field operations, approvals, payments, and customer workflows, scoped from the live ETB table.',
    },
    am: {
      title: 'ሞባይል መተግበሪያ ልማት | NovaTech',
      description: 'ከአካባቢ ክፍያ ውህደት ጋር ከፍተኛ አፈፃፀም ያላቸው ሞባይል መተግበሪያዎች።',
    },
    om: {
      title: 'Mobile App Development | NovaTech',
      description: 'Appii mobile cross-platform kan hojii gaarii fi kaffaltii naannoo wajjin hojjetan.',
    },
  },
  '/saas-solutions': {
    en: {
      title: 'SaaS Product Engineering | NovaTech',
      description: 'Live SaaS pricing for school, clinic, and real estate systems: setup fee, monthly subscription, and an annual plan that saves two months.',
    },
    am: {
      title: 'የSaaS ምርት እንጂነሪንግ | NovaTech',
      description: 'ለትምህርት ቤቶች፣ ሆስፒታሎች እና ሪል እስቴት የSaaS ስርዓቶችን ያስጀምሩ።',
    },
    om: {
      title: 'SaaS Product Engineering | NovaTech',
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
      description: 'Review milestone billing, current payment methods, ownership transfer, and SaaS subscription terms.',
    },
    am: {
      title: 'የክፍያ እና ኦፕሬሽን ፖሊሲ | NovaTech',
      description: 'የልማት ክፍያ ደረጃዎችን፣ የአሁኑን የክፍያ ዘዴዎች፣ የባለቤትነት ሽግግር እና የSaaS ምዝገባ ውሎችን ይመልከቱ።',
    },
    om: {
      title: 'Imaammata Kaffaltii fi Hojii | NovaTech',
      description: 'Milestone kaffaltii, maloota kaffaltii ammaa, dabarsa abbaa qabeenyaa fi haala subscription SaaS ilaali.',
    },
  },
  '/instant-quote': {
    en: {
      title: 'Instant Quote Wizard | NovaTech',
      description: 'Get a lower-friction directional estimate for web, mobile, or AI automation work when the build direction is already clear.',
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
      description: 'Schedule a practical discovery call to decide whether the next step is the Workflow Audit, a scoped build, or a live SaaS subscription.',
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
      description: 'Read sector-specific workflow notes that lead back to the Workflow Audit and live ETB pricing paths.',
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
    serviceType: 'SaaS product engineering and subscription delivery',
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
      answer: 'Once the final payment clears, clients receive full ownership of custom design assets, source code, and project intellectual property.',
    },
    {
      question: 'Is SaaS available as a live subscription today?',
      answer: 'Yes. School, clinic, and real estate plans are published with setup, monthly, and annual pricing on the pricing page, and billing follows each plan terms.',
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

function ensureAlternateLinks(canonicalUrl) {
  if (typeof document === 'undefined') {
    return;
  }

  const expectedKeys = new Set([...LANGUAGE_ALTERNATES.map((item) => item.hreflang), 'x-default']);

  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((element) => {
    if (!expectedKeys.has(element.getAttribute('hreflang'))) {
      element.remove();
    }
  });

  [...LANGUAGE_ALTERNATES, { hreflang: 'x-default', language: 'en' }].forEach((item) => {
    let element = document.querySelector(`link[rel="alternate"][hreflang="${item.hreflang}"]`);
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', 'alternate');
      element.setAttribute('hreflang', item.hreflang);
      document.head.appendChild(element);
    }

    element.setAttribute('href', canonicalUrl);
    element.dataset.language = item.language;
  });
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
    name: 'NovaTech',
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
    name: 'NovaTech',
    url: SITE_URL,
    inLanguage: localeTag,
    publisher: {
      '@type': 'Organization',
      name: 'NovaTech',
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
      name: 'NovaTech',
      url: SITE_URL,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
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
      name: 'NovaTech',
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
  ensureAlternateLinks(canonicalUrl);

  // Open Graph / Twitter Card
  ensurePropertyMeta('og:title', selected.title);
  ensurePropertyMeta('og:description', selected.description);
  ensurePropertyMeta('og:url', canonicalUrl);
  ensurePropertyMeta('og:image', OG_IMAGE_URL);
  ensurePropertyMeta('og:image:alt', 'NovaTech automation and product engineering preview');
  ensurePropertyMeta('og:type', 'website');
  ensurePropertyMeta('og:site_name', 'NovaTech');
  ensurePropertyMeta('og:locale', language === 'am' ? 'am_ET' : language === 'om' ? 'om_ET' : 'en_US');
  ensureMeta('twitter:card', 'summary_large_image');
  ensureMeta('twitter:title', selected.title);
  ensureMeta('twitter:description', selected.description);
  ensureMeta('twitter:image', OG_IMAGE_URL);

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
