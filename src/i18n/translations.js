export const SUPPORTED_LANGUAGES = ['en', 'am', 'om'];

export const LANGUAGE_LABELS = {
  en: 'English',
  am: 'Amharic',
  om: 'Afaan Oromoo',
};

const en = {
  brand: {
    name: 'NovaTech AI',
  },
  common: {
    to: 'to',
    none: 'None',
  },
  nav: {
    home: 'Home',
    web: 'Web Interfaces',
    mobile: 'Mobile Interfaces',
    saas: 'SaaS Interfaces',
    services: 'AI Solutions',
    aiAutomation: 'AI Automation',
    productEngineeringShort: 'Product Engineering',
    explore: 'Explore',
    exploreMenu: 'Explore services and proof',
    workflowAudit: 'Workflow Audit',
    engineering: 'Product Engineering',
    engineeringLinks: 'Product engineering links',
    policy: 'Operations Policy',
    instantQuote: 'Automation Brief',
    bookCall: 'Workflow Audit Call',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mobileNavigation: 'Mobile navigation',
  },
  labels: {
    language: 'Language',
    languageShort: 'Lang',
  },
  channels: {
    email: 'Email',
    phone: 'Phone',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    location: 'Location',
  },
  states: {
    sending: 'Sending...',
    loadingPackages: 'Loading Packages...',
    loadingCloudPlatforms: 'Loading Cloud Platforms...',
    loadingServices: 'Loading Services...',
    loadingFeaturedAddons: 'Loading Featured Add-Ons...',
  },
  actions: {
    pricingGuide: 'AI Pricing Guide',
    downloadPricingGuide: 'Download AI Pricing Guide',
    downloadFullPricingGuide: 'Download Full AI Pricing Guide',
    bookDiscoveryCall: 'Book Workflow Audit Call',
    startQuote: 'Start Automation Brief',
    switchLanguage: 'Switch language',
    exploreServices: 'Explore AI Solutions',
    openChat: 'Chat with us',
    scrollTop: 'Scroll to top',
    close: 'Close',
    previous: 'Previous',
    continue: 'Continue',
    startAgain: 'Start Again',
    viewPackages: 'View Scope',
  },
  footer: {
    description: 'AI-first automation consultancy with equal focus on custom agentic workflows and full-scale web, mobile, and SaaS product engineering.',
    company: 'Company',
    connect: 'Connect',
    rights: '© 2026 NovaTech AI Systems. All rights reserved.',
    links: {
      aiSolutionsHeading: 'AI Solutions',
      aiSolutions: 'AI Solutions',
      workflowAudit: 'Workflow Audit',
      pricing: 'Pricing',
      strategyCall: 'Discovery Call',
      automationBrief: 'Automation Brief Wizard',
      engineeringLayer: 'Product Engineering (Web, Mobile, SaaS)',
      searchableBrain: 'The Searchable Brain',
      methodology: 'Methodology',
      additionalServices: 'Product Engineering (Web, Mobile, SaaS)',
      aboutUs: 'Methodology',
      linkedin: 'LinkedIn',
    },
  },
  liveChat: {
    toggle: 'Toggle live chat options',
    dialog: 'Chat options',
    heading: 'Need a technical answer fast?',
    open: 'Open AI operations chat',
    close: 'Close AI operations chat',
    unavailable: 'Chat is unavailable.',
    prompts: {
      home: 'Hi NovaTech AI, I want to identify manual bottlenecks we can automate with custom agents.',
      services: 'Hi NovaTech AI, I want to discuss which AI solution stack fits our current operations.',
      workflowAudit: 'Hi NovaTech AI, I want to schedule a workflow audit and review required systems access.',
      pricing: 'Hi NovaTech AI, I need help selecting the right automation tier and monthly support model.',
      web: 'Hi NovaTech AI, we need a web interface layer for our internal AI workflows and dashboards.',
      mobile: 'Hi NovaTech AI, we need a mobile interface for AI-powered field operations and approvals.',
      saas: 'Hi NovaTech AI, I want to discuss orchestration and deployment patterns for our SaaS operations.',
      additional: 'Hi NovaTech AI, I need scoped engineering support around integrations and automation reliability.',
      instantQuote: 'Hi NovaTech AI, I am completing the automation brief and need help validating scope and budget.',
      bookCall: 'Hi NovaTech AI, I want support selecting the best workflow audit slot and agenda.',
      policy: 'Hi NovaTech AI, I have a question about deployment, security, and operating policy terms.',
      default: 'Hi NovaTech AI, I want to discuss replacing manual workflows with custom agentic systems.',
    },
  },
  roi: {
    title: 'ROI Estimator',
    subtitle: 'Model expected revenue impact using your current funnel assumptions.',
    aria: 'ROI estimator',
    inputs: {
      monthlyLeads: 'Monthly leads',
      conversionRate: 'Conversion rate (%)',
      averageDealValue: 'Average deal value (ETB)',
      monthlySpend: 'Monthly spend (ETB)',
      expectedLift: 'Expected traffic lift (%)',
    },
    output: {
      title: 'Projected monthly outcome',
      projectedLeads: 'Projected leads',
      currentRevenue: 'Current revenue (ETB)',
      projectedRevenue: 'Projected revenue (ETB)',
      revenueLift: 'Revenue lift (ETB)',
      estimatedRoi: 'Estimated ROI',
    },
  },
  leadCapture: {
    closeAria: 'Close pricing guide modal',
    privacy: 'We respect your privacy. No spam, ever.',
    form: {
      fullName: 'Full Name',
      fullNamePlaceholder: 'Hana Bekele',
      email: 'Email Address',
      emailPlaceholder: 'team@company.et',
      company: 'Company (optional)',
      companyPlaceholder: 'Aster Ventures',
      submitting: 'Submitting...',
    },
    pricing_guide: {
      title: 'Get the NovaTechAI 2026 Service Menu & Pricing Guide',
      subtitle: 'Download the official NovaTechAI 2026 Service Menu & Pricing Guide with AI automation, web, mobile, and SaaS pricing in ETB.',
      submitLabel: 'Download NovaTechAI Guide',
      successTitle: 'Thank You!',
      successSubtitle: 'Your NovaTechAI 2026 Service Menu & Pricing Guide is open in a new tab. You can also reopen it below.',
      successPrimaryLabel: 'Open NovaTechAI Guide Again',
    },
    quote_offer: {
      title: 'Get a Tailored Project Estimate',
      subtitle: 'Share your details and continue to our Instant Quote Wizard for a custom estimate range in minutes.',
      submitLabel: 'Continue to Instant Quote',
      successTitle: 'Great, You Are In!',
      successSubtitle: 'Your request was saved. Continue to the quote wizard for your tailored estimate.',
      successPrimaryLabel: 'Open Instant Quote',
    },
    book_call_offer: {
      title: 'Book a Discovery Call',
      subtitle: 'Leave your details and continue to booking. We will prepare a focused strategy agenda for your goals.',
      submitLabel: 'Continue to Booking',
      successTitle: 'Almost Done!',
      successSubtitle: 'Your request was captured. Select your preferred session slot on the booking page.',
      successPrimaryLabel: 'Open Booking Page',
    },
  },
  industry: {
    notFound: {
      subtitle: 'We are still building this industry playbook. Explore our services in the meantime.',
      action: 'Explore Our Services',
    },
    header: {
      tag: 'Industry Playbook',
      title: 'Typical Challenges and Delivery Model',
    },
    pains: {
      title: 'Common pain points',
    },
    solutions: {
      title: 'Recommended solution stack',
    },
  },
  instantQuote: {
    hero: {
      title: 'Instant Quote Wizard',
      subtitle: 'Answer a few questions and get a working estimate range in under two minutes.',
    },
    progress: {
      projectType: 'Project',
      budget: 'Budget',
      requirements: 'Details',
      contact: 'Contact',
    },
    header: {
      tag: 'Fast Estimate',
      title: 'Plan Scope, Budget, and Timeline',
      subtitle: 'This estimate is directional and helps us prepare the right architecture and proposal for your team.',
    },
    progressAria: 'Quote wizard progress',
    steps: {
      projectType: {
        title: 'Project Type',
        subtitle: 'Select the primary service for this estimate.',
      },
      budget: {
        title: 'Budget and Timeline',
      },
      requirements: {
        title: 'Technical Requirements',
        subtitle: 'Choose integrations and notes that apply to your project.',
      },
      contact: {
        title: 'Contact Details',
      },
    },
    labels: {
      budgetRange: 'Budget range',
      deliveryTimeline: 'Delivery timeline',
      projectGoals: 'Project goals',
      projectGoalsPlaceholder: 'Describe goals, priorities, and constraints.',
      fullName: 'Full name',
      workEmail: 'Work email',
      phoneOptional: 'Phone (optional)',
    },
    actions: {
      generate: 'Generate Estimate',
    },
    result: {
      title: 'Your estimated range',
      subtitle: 'This range is based on your selected scope, timeline, and integration complexity. Our team has queued a follow-up and can deliver a final proposal after a 30-minute discovery session.',
    },
    options: {
      service: {
        web: 'Web Development',
        mobile: 'Mobile App Development',
        saas: 'SaaS Platform',
        invoiceProcessing: 'AI Invoice Processing',
        engineeringKnowledge: 'Engineering Knowledge Assistant',
        salesOrderAutomation: 'Sales Order Automation',
        additional: 'Branding and Additional Services',
      },
      budget: {
        under50: 'Under 50k ETB',
        mid: '50k - 120k ETB',
        high: '120k - 250k ETB',
        enterprise: '250k+ ETB',
      },
      timeline: {
        fast: '2-4 weeks',
        standard: '1-2 months',
        extended: '2-4 months',
        flexible: 'Flexible timeline',
      },
      integrations: {
        telebirr: 'Telebirr',
        chapa: 'Chapa',
        crm: 'CRM Sync',
        erpAccounting: 'ERP/Accounting Sync',
        inventory: 'Inventory Sync',
        internalKnowledge: 'Internal Knowledge Base',
        analytics: 'Analytics Dashboard',
        multilingual: 'Multilingual Content',
      },
    },
  },
  discovery: {
    hero: {
      title: 'Book a Discovery Call',
      subtitle: 'Choose a slot in your timezone and share key priorities so we can prepare a focused strategy session.',
      metaAria: 'Booking support details',
      chip1: 'Timezone-aware scheduling',
      chip2: '30-minute strategic session',
      chip3: 'Actionable roadmap output',
    },
    header: {
      tag: 'Scheduling',
      title: 'Pick a Session Slot',
      timezone: 'Detected timezone',
    },
    sessions: {
      title: 'Available Sessions',
    },
    form: {
      title: 'Meeting Details',
      fullName: 'Full name',
      workEmail: 'Work email',
      company: 'Company',
      agenda: 'Session agenda',
      agendaPlaceholder: 'Share project goals, blockers, and timeline expectations.',
      submit: 'Confirm Session',
      success: 'Thanks. Your booking details were captured and our team will send a calendar invite shortly.',
      hint: 'You will receive confirmation by email with next steps and preparation notes.',
    },
    booking: {
      requestedSlot: 'Requested slot',
      agendaLabel: 'Agenda',
    },
  },
  web: {
    hero: {
      title: 'Web Design & Development',
      subtitle: 'Three tailored packages to match your business stage — from establishing your digital presence to dominating your market.',
      metaAria: 'Web delivery highlights',
      chip1: 'Conversion-Focused IA',
      chip2: 'SEO and Analytics Baseline',
      chip3: 'Weekly Sprint Reviews',
    },
    cta: {
      title: 'Need a Custom Quote?',
      subtitle: 'Download our full pricing guide for detailed breakdowns of every package, feature, and add-on.',
      secondary: 'Talk To A Strategist',
    },
  },
  mobile: {
    hero: {
      title: 'Mobile App Development',
      subtitle: 'Cross-platform and native iOS & Android apps built with Flutter and React Native — designed for the Ethiopian market.',
      metaAria: 'Mobile delivery highlights',
      chip1: 'Store Submission Support',
      chip2: 'Offline-Ready Architecture',
      chip3: 'Telebirr and Chapa Integration',
    },
    cta: {
      title: 'Have an App Idea?',
      subtitle: "Let's turn your vision into a market-ready mobile application. Download our full guide for detailed specs and pricing.",
      secondary: 'Schedule App Strategy Call',
    },
    roi: {
      title: 'Mobile Acquisition ROI Estimator',
      subtitle: 'Estimate expected gain from app-store readiness, paid acquisition, and retention improvements.',
    },
  },
  saas: {
    hero: {
      title: 'SaaS Cloud Solutions',
      subtitle: 'Rent-to-use cloud management systems — zero IT overhead, instant deployment, and full support. Pay monthly and scale at your pace.',
      metaAria: 'SaaS delivery highlights',
      chip1: 'Rapid Team Onboarding',
      chip2: 'Managed Backups and Security',
      chip3: 'Annual Plan Savings',
    },
    labels: {
      annualSave: 'Save 2 months',
      comingSoon: 'Coming soon',
    },
    roi: {
      title: 'SaaS Operations ROI Estimator',
      subtitle: 'Model the business impact of process automation, reduced admin workload, and better collection discipline.',
    },
  },
  additional: {
    hero: {
      title: 'Additional Services',
      subtitle: 'Essential one-time and recurring services to complement your digital presence — from hosting to branding.',
      metaAria: 'Additional services highlights',
      chip1: 'Transparent Cost Bands',
      chip2: 'One-Time and Recurring Options',
      chip3: 'Bundle-Ready Add-Ons',
    },
  },
  policy: {
    hero: {
      title: 'Payment & Operational Policy',
      subtitle: 'Transparent terms to ensure a smooth, trust-based working relationship from kickoff to launch.',
      metaAria: 'Policy highlights',
      chip1: 'Milestone-Based Billing',
      chip2: 'Client IP Ownership',
      chip3: 'Clear Support Commitments',
      chip4: 'Bank Transfer Only',
    },
    sections: {
      payments: {
        title: 'Payment Methods',
        intro: 'Until the business license is secured, payment is accepted by bank transfer (CBE Birr) only.',
        cards: {
          bankTransfer: {
            title: 'Bank Transfer (CBE Birr)',
            body: 'Payments are made by direct bank transfer in Ethiopian Birr. This is the only accepted payment method until the business license is secured.',
          },
          telebirr: {
            title: 'Telebirr Merchant (Planned)',
            body: 'After licensing, we plan to add Telebirr merchant payments so clients can pay by mobile money. This is a plan, not a current capability.',
          },
          chapa: {
            title: 'Chapa & Card Payments (Planned)',
            body: 'After licensing, we plan to add Chapa checkout and card payments for local and international clients. This is a plan, not a current capability.',
          },
        },
        note: {
          title: 'Payment plan:',
          body: 'Telebirr merchant, Chapa, and card payments will be added after the business license is secured. Until they are live, bank transfer (CBE Birr) remains the only accepted payment method.',
        },
      },
      saas: {
        title: 'SaaS Subscription Terms',
        intro: 'Our cloud management systems (SMS, HMS, PMS) are in development — tell us you want it and we will add you to the waitlist.',
        cards: {
          setup: {
            title: 'Waitlist Only',
            body: 'SaaS products show no prices and no billing until a real product exists. Join the waitlist and we will contact you when a product is ready for your organization.',
          },
          billing: {
            title: 'In Development',
            body: 'School Management, Clinic/Hospital ERP, and Real Estate CRM are being built. There is no monthly or annual billing today.',
          },
          support: {
            title: 'No Billing Until Launch',
            body: 'Once a product is available, its terms will be published before any payment is requested. You will never be billed for a product that is not live.',
          },
        },
        waitlistNote: {
          title: 'Want it?',
          body: 'Tell us and we will keep you on the waitlist with no charge and no commitment.',
        },
      },
    },
  },
  seo: {
    defaultTitle: 'NovaTech AI - Agentic Workflow Consultancy',
    defaultDescription: 'NovaTech AI designs and deploys autonomous agents, private assistants, and workflow automation systems for operations-heavy teams.',
  },
};

const amOverrides = {
  nav: {
    home: 'መነሻ',
    web: 'ዌብ',
    mobile: 'ሞባይል',
    saas: 'SaaS',
    services: 'አገልግሎቶች',
    policy: 'ፖሊሲ',
    instantQuote: 'ፈጣን ዋጋ',
    bookCall: 'ጥሪ ያስይዙ',
    openMenu: 'ሜኑ ክፈት',
    closeMenu: 'ሜኑ ዝጋ',
    mobileNavigation: 'የሞባይል አሰሳ',
  },
  labels: {
    language: 'ቋንቋ',
    languageShort: 'ቋ',
  },
  channels: {
    email: 'ኢሜይል',
    phone: 'ስልክ',
    telegram: 'ቴሌግራም',
    whatsapp: 'ዋትሳፕ',
    location: 'አድራሻ',
  },
  actions: {
    pricingGuide: 'የዋጋ መመሪያ',
    downloadPricingGuide: 'የዋጋ መመሪያ አውርድ',
    downloadFullPricingGuide: 'ሙሉ የዋጋ መመሪያ አውርድ',
    bookDiscoveryCall: 'የግኝት ጥሪ ያስይዙ',
    startQuote: 'ፈጣን ዋጋ ጀምር',
    switchLanguage: 'ቋንቋ ቀይር',
    exploreServices: 'አገልግሎቶችን ያስሱ',
    openChat: 'ከእኛ ጋር ይወያዩ',
    scrollTop: 'ወደ ላይ ሂድ',
    close: 'ዝጋ',
    previous: 'ቀዳሚ',
    continue: 'ቀጥል',
    startAgain: 'እንደገና ጀምር',
    viewPackages: 'ፓኬጆችን ይመልከቱ',
  },
  footer: {
    description: 'ለዲጂታል ለውጥ የሚታመን አጋርዎ። ለኢትዮጵያ ገበያ እና ከዚያ በላይ የተለመዱ ዌብ፣ ሞባይል እና SaaS መፍትሄዎችን እንገነባለን።',
    company: 'ኩባንያ',
    connect: 'ግንኙነት',
    rights: '© 2026 NovaTech ዲጂታል ኤጀንሲ. መብቶች ሁሉ የተጠበቁ ናቸው።',
    links: {
      additionalServices: 'ተጨማሪ አገልግሎቶች',
      aboutUs: 'ስለ እኛ',
      linkedin: 'LinkedIn',
    },
  },
  liveChat: {
    heading: 'ፈጣን መልስ ይፈልጋሉ?',
  },
  roi: {
    title: 'ROI መለኪያ',
    output: {
      title: 'የወርሃዊ ትንበያ ውጤት',
      estimatedRoi: 'ተገመተ ROI',
    },
  },
  instantQuote: {
    hero: {
      title: 'ፈጣን የዋጋ መለኪያ',
    },
    result: {
      title: 'የተገመተ የዋጋ ክልልዎ',
    },
  },
  discovery: {
    hero: {
      title: 'የግኝት ጥሪ ያስይዙ',
    },
    form: {
      submit: 'ጊዜ ያረጋግጡ',
    },
  },
  seo: {
    defaultTitle: 'NovaTech AI - የAgentic Workflow ኮንሰልታንሲ',
    defaultDescription: 'NovaTech AI ለኦፕሬሽን-ተኮር ቡድኖች ራስ-ሰር ኤጀንቶች፣ የግል አሲስታንቶች እና የWorkflow Automation ስርዓቶችን ይንደፍና ይገነባል።',
  },
};

const omOverrides = {
  nav: {
    home: 'Fuula Jalqabaa',
    web: 'Web',
    mobile: 'Moobaayila',
    saas: 'SaaS',
    services: 'Tajaajiloota',
    policy: 'Seera',
    instantQuote: 'Qorannoo Gatii',
    bookCall: 'Bilbilaa Qabadhu',
    openMenu: 'Menu banaa',
    closeMenu: 'Menu cufi',
    mobileNavigation: 'Navigaashinii moobaayilaa',
  },
  labels: {
    language: 'Afaan',
    languageShort: 'Af',
  },
  channels: {
    email: 'Imeelii',
    phone: 'Bilbila',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    location: 'Bakka',
  },
  actions: {
    pricingGuide: 'Qajeelfama Gatii',
    downloadPricingGuide: 'Qajeelfama Gatii Buusi',
    downloadFullPricingGuide: 'Qajeelfama Gatii Guutuu Buusi',
    bookDiscoveryCall: 'Bilbila Marii Qabadhu',
    startQuote: 'Qorannoo Gatii Jalqabi',
    switchLanguage: 'Afaan jijjiiri',
    exploreServices: 'Tajaajiloota ilaali',
    openChat: "Nu waliin haasa'i",
    scrollTop: "Gara olitti deebi'",
    close: 'Cufi',
    previous: 'Duubatti',
    continue: 'Itti fufi',
    startAgain: 'Ammas jalqabi',
    viewPackages: 'Pakeejii ilaali',
  },
  footer: {
    description: 'Dijitaala jijjiiramaaf hiriyaa amanamaa keessan. Furmaata web, moobaayilaa fi SaaS Itoophiyaa fi gabaa addunyaatiif ni ijaarra.',
    company: 'Dhaabbata',
    connect: 'Walqunnamtii',
    rights: '© 2026 NovaTech Digital Agency. Mirgi hundi eegameera.',
    links: {
      additionalServices: 'Tajaajiloota Dabalataa',
      aboutUs: "Waa'ee keenya",
      linkedin: 'LinkedIn',
    },
  },
  instantQuote: {
    hero: {
      title: 'Qorannoo Gatii Saffisaa',
    },
    result: {
      title: 'Daangaa gatii tilmaamaa kee',
    },
  },
  discovery: {
    hero: {
      title: 'Bilbila Marii Qabadhu',
    },
    form: {
      submit: 'Yeroo Mirkaneessi',
    },
  },
  seo: {
    defaultTitle: 'NovaTech AI - Agentic Workflow Consultancy',
    defaultDescription: 'NovaTech AI gareewwan hojii irratti xiyyeeffatanif autonomous agents, private assistants fi workflow automation systems ijaara.',
  },
};

const amContentOverrides = {
  common: {
    to: 'ወደ',
    none: 'የለም',
  },
  states: {
    sending: 'በመላክ ላይ...',
    loadingPackages: 'ፓኬጆች በመጫን ላይ...',
    loadingCloudPlatforms: 'የክላውድ መድረኮች በመጫን ላይ...',
    loadingServices: 'አገልግሎቶች በመጫን ላይ...',
    loadingFeaturedAddons: 'ተመራጭ ተጨማሪዎች በመጫን ላይ...',
  },
  liveChat: {
    toggle: 'የቀጥታ ውይይት አማራጮችን ቀይር',
    dialog: 'የውይይት አማራጮች',
    open: 'የድጋፍ ውይይት ክፈት',
    close: 'የድጋፍ ውይይት ዝጋ',
    prompts: {
      home: 'ሰላም NovaTech፣ አገልግሎቶቻችሁን እመለከታለሁ እና የሚመጥነኝን ፓኬጅ ለመምረጥ ፈጣን መመሪያ እፈልጋለሁ።',
      web: 'ሰላም NovaTech፣ ለንግዴ ትክክለኛውን የዌብ ልማት ፓኬጅ ለመምረጥ እርዳታ እፈልጋለሁ።',
      mobile: 'ሰላም NovaTech፣ የሞባይል መተግበሪያ እቅድ አለኝ እና የማቅረቢያ ጊዜ ግምት እፈልጋለሁ።',
      saas: 'ሰላም NovaTech፣ ለድርጅቴ የSaaS አማራጮችን ልወያይ እፈልጋለሁ።',
      additional: 'ሰላም NovaTech፣ ለተጨማሪ አገልግሎቶች ብጁ ጥቅስ እፈልጋለሁ።',
      instantQuote: 'ሰላም NovaTech፣ ፈጣን የዋጋ መለኪያውን እሞላለሁ እና የክልል እና በጀት ማረጋገጫ እፈልጋለሁ።',
      bookCall: 'ሰላም NovaTech፣ ለግኝት ጥሪ ተስማሚ ጊዜ እና አጀንዳ ለመምረጥ እገዛ እፈልጋለሁ።',
      policy: 'ሰላም NovaTech፣ ስለ ክፍያ እና ኦፕሬሽን ፖሊሲዎ ጥያቄ አለኝ።',
      default: 'ሰላም NovaTech፣ ስለ ዲጂታል ፕሮጀክት ከቡድናችሁ ጋር መነጋገር እፈልጋለሁ።',
    },
  },
  leadCapture: {
    closeAria: 'የዋጋ መመሪያ ሞዳልን ዝጋ',
    privacy: 'ግላዊነትዎን እናከብራለን። ስፓም አንልክም።',
    form: {
      fullName: 'ሙሉ ስም',
      fullNamePlaceholder: 'ሀና በቀለ',
      email: 'የኢሜይል አድራሻ',
      emailPlaceholder: 'team@company.et',
      company: 'ኩባንያ (አማራጭ)',
      companyPlaceholder: 'Aster Ventures',
      submitting: 'በመላክ ላይ...',
    },
    pricing_guide: {
      title: 'NovaTechAI 2026 የService Menu & Pricing Guide ያግኙ',
      subtitle: 'የAI አውቶሜሽን፣ ዌብ፣ ሞባይል እና SaaS ዋጋዎችን በETB የያዘውን መደበኛ NovaTechAI 2026 መመሪያ ያውርዱ።',
      submitLabel: 'NovaTechAI መመሪያ አውርድ',
      successTitle: 'እናመሰግናለን!',
      successSubtitle: 'የNovaTechAI 2026 Service Menu & Pricing Guide በአዲስ ታብ ተከፍቷል። ከታች ደግሞ እንደገና መክፈት ይችላሉ።',
      successPrimaryLabel: 'NovaTechAI መመሪያን እንደገና ክፈት',
    },
    quote_offer: {
      title: 'ለፕሮጀክትዎ ብጁ ግምት ያግኙ',
      subtitle: 'ዝርዝሮችዎን ያስገቡ እና ወደ ፈጣን የዋጋ መለኪያ ይቀጥሉ።',
      submitLabel: 'ወደ ፈጣን ዋጋ ቀጥል',
      successTitle: 'በጣም ጥሩ!',
      successSubtitle: 'ጥያቄዎ ተመዝግቧል። ለብጁ ግምት ወደ መለኪያው ይቀጥሉ።',
      successPrimaryLabel: 'ፈጣን ዋጋ ክፈት',
    },
    book_call_offer: {
      title: 'የስትራቴጂ ግኝት ጥሪ ያስይዙ',
      subtitle: 'ዝርዝሮችዎን ያስገቡ እና ወደ ቦታ ማስያዣ ይቀጥሉ።',
      submitLabel: 'ወደ ቦታ ማስያዣ ቀጥል',
      successTitle: 'በቅርቡ ይጠናቀቃል!',
      successSubtitle: 'ጥያቄዎ ተመዝግቧል። በቦታ ማስያዣ ገጽ ተመራጭ ጊዜዎን ይምረጡ።',
      successPrimaryLabel: 'የቦታ ማስያዣ ገጽ ክፈት',
    },
  },
  roi: {
    subtitle: 'የአሁኑን የሽያጭ ፍሰት መረጃ ተጠቅመው የተጠበቀ የገቢ ተፅዕኖ ይገምቱ።',
    aria: 'የROI መለኪያ',
    inputs: {
      monthlyLeads: 'ወርሃዊ ሊድ',
      conversionRate: 'የመቀየር መጠን (%)',
      averageDealValue: 'አማካይ የውል ዋጋ (ETB)',
      monthlySpend: 'ወርሃዊ ወጪ (ETB)',
      expectedLift: 'የትራፊክ ጭማሪ ግምት (%)',
    },
    output: {
      projectedLeads: 'ተገመተ ሊድ',
      currentRevenue: 'የአሁኑ ገቢ (ETB)',
      projectedRevenue: 'ተገመተ ገቢ (ETB)',
      revenueLift: 'የገቢ ጭማሪ (ETB)',
    },
  },
  industry: {
    notFound: {
      title: 'የዚህ ኢንዱስትሪ ገጽ አሁን አልተዘጋጀም',
    },
    items: {
      education: {
        title: 'የትምህርት ዲጂታል ስርዓቶች',
        hero: 'መቀበያ፣ ውጤት፣ ተገኝነት እና የወላጅ ግንኙነትን ዲጂታላይዝ ያድርጉ።',
        pains: ['በእጅ ሪፖርት ሂደቶች', 'የወላጅ ግንኙነት ግልጽነት እጥረት', 'የፋይናንስ እና ተገኝነት መረጃ እጥረት'],
        solutions: ['በሚና የተመራ ዳሽቦርድ', 'ራስ-ሰር SMS/Telegram ማሳወቂያ', 'የክፍያ እና ውጤት ሞዱሎች ውህደት'],
        scope: 'መደበኛ ማስጀመሪያ: 8-12 ሳምንት ከስልጠና ጋር።',
      },
      healthcare: {
        title: 'የጤና ኦፕሬሽን መድረኮች',
        hero: 'መግቢያ፣ ቀጠሮ እና የታካሚ ግንኙነትን ከመጨረሻ እስከ መጨረሻ ያሻሽሉ።',
        pains: ['በፊት ዴስክ ረድፍ መጨናነቅ', 'ብዙ የቀጠሮ አለመገኘት', 'በክፍሎች መካከል የሪፖርት እጥረት'],
        solutions: ['ዲጂታል ትሪያጅ እና መግቢያ', 'ራስ-ሰር አስታዋሽ እና ክትትል', 'ለመሪዎች KPI ዳሽቦርድ'],
        scope: 'መደበኛ ማስጀመሪያ: 8-10 ሳምንት በደረጃ መልቀቅ።',
      },
      'real-estate': {
        title: 'የሪል እስቴት CRM እና ሊዝ',
        hero: 'ዝርዝሮችን፣ የተከራይ ሂደትን እና የክፍያ ክትትልን አንድ ላይ ያመጡ።',
        pains: ['የተበታተነ የተከራይ መረጃ', 'በእጅ የኪራይ አስታዋሽ', 'የoccupancy ግልጽነት እጥረት'],
        solutions: ['የተከራይ እና ንብረት ማዕከላዊ መዝገብ', 'ራስ-ሰር እድሳት እና ክፍያ ማሳወቂያ', 'የሊዝ አፈጻጸም ዳሽቦርድ'],
        scope: 'መደበኛ ማስጀመሪያ: 6-10 ሳምንት እንደ ንብረት ብዛት።',
      },
      ecommerce: {
        title: 'የኢ-ኮሜርስ እድገት ስርዓቶች',
        hero: 'የስቶር ፍጥነትን፣ የቼክአውት ቅየራን እና የደንበኛ መመለስን ያሳድጉ።',
        pains: ['ዘገይ የሞባይል ቼክአውት', 'ዝቅተኛ የድጋሚ ግዢ መጠን', 'ያልተገለጸ የዘመቻ መለያየት'],
        solutions: ['ቅየራ-ተኮር IA', 'ለመመለስ የዑደት አውቶሜሽን', 'የዘመቻ እና አትሪቢዩሽን ሪፖርት'],
        scope: 'መደበኛ ማስጀመሪያ: 6-9 ሳምንት ከቀጣይ ማሻሻያ ጋር።',
      },
    },
  },
  instantQuote: {
    hero: {
      subtitle: 'ጥቂት ጥያቄዎችን መልሱ እና በ2 ደቂቃ ውስጥ የሚሰራ የዋጋ ግምት ያግኙ።',
    },
    header: {
      tag: 'ፈጣን ግምት',
      title: 'ክልል፣ በጀት እና ጊዜ ያቅዱ',
      subtitle: 'ይህ ግምት አቅጣጫ የሚሰጥ ሲሆን ለቡድንዎ ተስማሚ አርክቴክቸር እና ፕሮፖዛል ለማዘጋጀት ይረዳናል።',
    },
    progressAria: 'የዋጋ መለኪያ ሂደት',
    steps: {
      projectType: {
        title: 'የፕሮጀክት አይነት',
        subtitle: 'ለዚህ ግምት ዋናውን አገልግሎት ይምረጡ።',
      },
      budget: {
        title: 'በጀት እና ጊዜ',
      },
      requirements: {
        title: 'ቴክኒካዊ መስፈርቶች',
        subtitle: 'ከፕሮጀክትዎ ጋር የሚመጡ ውህደቶችን እና ማስታወሻዎችን ይምረጡ።',
      },
      contact: {
        title: 'የመገናኛ ዝርዝሮች',
      },
    },
    labels: {
      budgetRange: 'የበጀት ክልል',
      deliveryTimeline: 'የማቅረቢያ ጊዜ',
      projectGoals: 'የፕሮጀክት ግቦች',
      projectGoalsPlaceholder: 'ግቦች፣ ቅድሚያዎች እና ገደቦችን ይግለጹ።',
      fullName: 'ሙሉ ስም',
      workEmail: 'የስራ ኢሜይል',
      phoneOptional: 'ስልክ (አማራጭ)',
    },
    actions: {
      generate: 'ግምት አመንጭ',
    },
    result: {
      subtitle: 'ይህ ክልል በመረጡት ክልል፣ ጊዜ እና የውህደት ውስብስብነት ላይ የተመሰረተ ነው።',
    },
    options: {
      service: {
        web: 'የዌብ ልማት',
        mobile: 'የሞባይል መተግበሪያ ልማት',
        saas: 'SaaS መድረክ',
        additional: 'ብራንዲንግ እና ተጨማሪ አገልግሎቶች',
      },
      budget: {
        under50: 'ከ50ሺ ETB በታች',
        mid: '50ሺ - 120ሺ ETB',
        high: '120ሺ - 250ሺ ETB',
        enterprise: '250ሺ+ ETB',
      },
      timeline: {
        fast: '2-4 ሳምንት',
        standard: '1-2 ወር',
        extended: '2-4 ወር',
        flexible: 'ተለዋዋጭ ጊዜ',
      },
      integrations: {
        crm: 'CRM ማስማማት',
        analytics: 'የአናሊቲክስ ዳሽቦርድ',
        multilingual: 'ባለብዙ ቋንቋ ይዘት',
      },
    },
  },
  discovery: {
    hero: {
      subtitle: 'በጊዜ ክልልዎ ውስጥ ጊዜ ይምረጡ እና ቁልፍ ቅድሚያዎችዎን ያጋሩ።',
      metaAria: 'የቦታ ማስያዣ ድጋፍ ዝርዝሮች',
      chip1: 'ከጊዜ ክልል ጋር የሚሄድ መርሃ ግብር',
      chip2: '30 ደቂቃ የስትራቴጂ ክፍለ ጊዜ',
      chip3: 'ተግባራዊ የመንገድ ካርታ ውጤት',
    },
    header: {
      tag: 'ማስያዣ',
      title: 'የክፍለ ጊዜ ጊዜ ይምረጡ',
      timezone: 'የታወቀ ጊዜ ክልል',
    },
    sessions: {
      title: 'የሚገኙ ክፍለ ጊዜዎች',
    },
    form: {
      title: 'የስብሰባ ዝርዝሮች',
      fullName: 'ሙሉ ስም',
      workEmail: 'የስራ ኢሜይል',
      company: 'ኩባንያ',
      agenda: 'የክፍለ ጊዜ አጀንዳ',
      agendaPlaceholder: 'የፕሮጀክት ግቦች፣ ችግኝነቶች እና የጊዜ ተስፋዎችን ያካፍሉ።',
      submit: 'ክፍለ ጊዜ አረጋግጥ',
      success: 'እናመሰግናለን። የቦታ ማስያዣ ዝርዝሮችዎ ተመዝግበዋል እና ቡድናችን የካሌንደር ግብዣ ይልካል።',
      hint: 'የማረጋገጫ ኢሜይል ከቀጣይ እርምጃዎች ጋር ይደርስዎታል።',
    },
    booking: {
      requestedSlot: 'የተጠየቀ ጊዜ',
      agendaLabel: 'አጀንዳ',
    },
  },
  web: {
    hero: {
      subtitle: 'ከዲጂታል መገኘት እስከ ገበያ መሪነት ድረስ የሚስማሙ 3 ፓኬጆች።',
      metaAria: 'የዌብ ማቅረቢያ አበረክቶች',
      chip1: 'ቅየራ-ተኮር IA',
      chip2: 'የSEO እና አናሊቲክስ መሠረት',
      chip3: 'ሳምንታዊ የስፕሪንት ግምገማዎች',
    },
    proof: {
      0: { title: 'በ48 ሰዓት ውስጥ ጅምር', text: 'ክልል ከተፀደቀ በኋላ በ2 የስራ ቀን ውስጥ ዲስከቨሪ እና ዋይርፍሬም እንጀምራለን።' },
      1: { title: 'ግልጽ የግንባታ ደረጃዎች', text: 'በሳምንት በግልጽ የሂደት እይታ ላይ ግምገማ ያደርጋሉ።' },
      2: { title: 'የመለቀቅ ዝግጁነት ተካቷል', text: 'እያንዳንዱ ፓኬጅ የፍጥነት ሙከራ፣ ኢንዴክሲንግ እና ሀንድኦቨር መመሪያን ያካትታል።' },
    },
    sections: {
      packages: {
        tag: 'የልማት ፓኬጆች',
        title: 'ፓኬጅዎን ይምረጡ',
        subtitle: 'ሁሉም ፓኬጆች ሪስፖንሲቭ ዲዛይን፣ SEO እና 3 ወር ነፃ ድጋፍ ያካትታሉ።',
      },
    },
    faq: {
      title: 'የዌብ ልማት ተደጋጋሚ ጥያቄዎች',
      subtitle: 'ስለ ባለቤትነት፣ የማቅረቢያ ጊዜ እና ከመለቀቅ በኋላ ድጋፍ ፈጣን መልሶች።',
    },
    cta: {
      subtitle: 'የእያንዳንዱ ፓኬጅ እና ባህሪ ዝርዝር ለማየት ሙሉ መመሪያውን ያውርዱ።',
    },
  },
  mobile: {
    hero: {
      subtitle: 'በFlutter እና React Native የተገነቡ የiOS እና Android መተግበሪያዎች።',
      metaAria: 'የሞባይል ማቅረቢያ አበረክቶች',
      chip1: 'የስቶር ማስገባት ድጋፍ',
      chip2: 'ኦፍላይን-ዝግጁ አርክቴክቸር',
      chip3: 'Telebirr እና Chapa ውህደት',
    },
    proof: {
      0: { title: 'የተጠቃሚ ፍሰት ቀድሞ', text: 'ኮድ ከመፃፍ በፊት ዋና የተጠቃሚ ጉዞዎችን እናጣጣማለን።' },
      1: { title: 'በእውነተኛ መሳሪያ ሙከራ', text: 'እያንዳንዱ ስፕሪንት በAndroid/iOS መሳሪያዎች ላይ QA ያካትታል።' },
      2: { title: 'መለቀቅ እና ማሻሻል', text: 'ከመለቀቅ በፊት የአናሊቲክስ እና የbacklog ቅድሚያዎች ይዘጋጃሉ።' },
    },
    sections: {
      packages: {
        tag: 'የመተግበሪያ ፓኬጆች',
        title: 'የሞባይል መተግበሪያዎን ይገንቡ',
        subtitle: 'ከቀላል መተግበሪያ እስከ ውስብስብ FinTech መድረክ ድረስ።',
      },
    },
    faq: {
      title: 'የሞባይል ልማት ተደጋጋሚ ጥያቄዎች',
      subtitle: 'ስለ ስቶር ማስገባት፣ መድረክ እና የአካባቢ ክፍያ ውህደት መልሶች።',
    },
  },
  saas: {
    hero: {
      subtitle: 'ኪራይ ላይ የሚሰጡ የክላውድ አስተዳደር ስርዓቶች፣ የIT ጫና የለም።',
      metaAria: 'የSaaS ማቅረቢያ አበረክቶች',
      chip1: 'ፈጣን የቡድን ማስጀመር',
      chip2: 'የሚተዳደር መጠባበቂያ እና ደህንነት',
      chip3: 'ዓመታዊ እቅድ ቅናሽ',
    },
    proof: {
      0: { title: 'ፈጣን የመለቀቅ መንገድ', text: 'አብዛኛዎቹ ድርጅቶች በአጭር ጊዜ ማስጀመር ይጨርሳሉ።' },
      1: { title: 'የኦፕሬሽን ግልጽነት', text: 'ዳሽቦርዶች እና ሪፖርቶች በየቀኑ ሂደትዎ መሰረት ይዋቀራሉ።' },
      2: { title: 'ቀጣይ ማሻሻያዎች', text: 'የደህንነት እና የፕላትፎርም ማሻሻያዎች ቀጣይ ይደርሳሉ።' },
    },
    sections: {
      catalog: {
        tag: 'የክላውድ መድረክ',
        title: 'የአስተዳደር ስርዓቶቻችን',
        subtitle: 'የኢንተርፕራይዝ ደረጃ ሶፍትዌር በተመጣጣኝ ወርሃዊ ክፍያ።',
      },
    },
    pricing: {
      setup: 'አንድ ጊዜ ማስዋቀር እና ስልጠና',
      monthly: 'ወርሃዊ የደንበኝነት ክፍያ',
      annual: 'ዓመታዊ የደንበኝነት ክፍያ',
    },
    modulesTitle: 'የተካተቱ ዋና ሞዱሎች:',
    faq: {
      title: 'የSaaS መፍትሄ ተደጋጋሚ ጥያቄዎች',
      subtitle: 'ስለ ማስጀመር፣ ክፍያ እና ድጋፍ ግልጽ ማብራሪያ።',
    },
    cta: {
      title: 'ኦፕሬሽንዎን ለማዘመን ዝግጁ ነዎት?',
      subtitle: 'የባህሪ ንጽጽር ለማየት ሙሉ መመሪያውን ያውርዱ።',
      secondary: 'የSaaS ምክክር ይጠይቁ',
    },
  },
  additional: {
    proof: {
      0: { title: 'ተግባራዊ የአገልግሎት ጥቅሎች', text: 'ሆስቲንግ፣ ዲዛይን እና ጥገና አገልግሎቶችን ያቀናብሩ።' },
      1: { title: 'ተገምታ የሚታወቅ እድሳት', text: 'የተደጋጋሚ አገልግሎቶች በግልጽ ይለያሉ።' },
      2: { title: 'ስኬላብል የድጋፍ አማራጮች', text: 'በመሠረታዊ አገልግሎቶች ይጀምሩ እና እንደ እድገትዎ ያስፋፉ።' },
    },
    sections: {
      catalog: {
        tag: 'የአገልግሎት ካታሎግ',
        title: 'አንድ-ጊዜ እና ተደጋጋሚ አገልግሎቶች',
        subtitle: 'ለማስጀመር፣ ለማቆየት እና ለማሳደግ የሚያስፈልጉ ሁሉ።',
      },
      featured: {
        tag: 'ልዩ ምርጫዎች',
        title: 'ተመራጭ ተጨማሪዎች',
        subtitle: 'ከፍተኛ ዋጋ የሚሰጡ ታዋቂ ተጨማሪ አገልግሎቶች።',
      },
    },
    table: {
      service: 'አገልግሎት',
      description: 'መግለጫ',
      cost: 'የተገመተ ወጪ',
      billing: 'ክፍያ',
    },
    billing: {
      'one-time': 'አንድ-ጊዜ',
      recurring: 'ተደጋጋሚ',
    },
    faq: {
      title: 'የተጨማሪ አገልግሎቶች FAQ',
      subtitle: 'ስለ ክፍያ ሞዴሎች እና ብጁ ክልል ማብራሪያ።',
    },
  },
  policy: {
    proof: {
      0: { title: 'ከመስማማት በፊት ግልጽነት', text: 'እያንዳንዱ ስምምነት በግልጽ ደረጃ እና ተረካቢ ውጤት ይመራል።' },
      1: { title: 'በክፍያ ላይ አስገራሚ ነገር የለም', text: 'የክፍያ ደረጃዎች እና ክልሎች ከመጀመር በፊት ይገለጻሉ።' },
      2: { title: 'ረዥም ጊዜ የኦፕሬሽን ድጋፍ', text: 'ቀጣይ ድጋፍ፣ አዘምን እና ሪፖርት መመሪያዎች ቀድሞ ይዘጋጃሉ።' },
    },
    cta: {
      subtitle: 'ሙሉ መመሪያውን ይመልከቱ ወይም የግኝት ጥሪ ያስይዙ እና ዝርዝር እንወያይ።',
    },
    sections: {
      development: {
        title: 'የልማት ክፍያ ደንቦች',
        intro: 'ሁሉም ብጁ የልማት ፕሮጀክቶች በደረጃ የተመሠረተ ክፍያ እቅድን ይከተላሉ።',
        m1: { title: 'ቅድሚያ ክፍያ', body: 'የፕሮጀክት ስምምነት እና ጅምር ጊዜ የሚከፈል።' },
        m2: { title: 'ዲዛይን/ፕሮቶታይፕ ከፀደቀ በኋላ', body: 'ሞክአፕ ከፀደቀ በኋላ ሙሉ ልማት ይቀጥላል።' },
        m3: { title: 'ከመጨረሻ መለቀቅ በፊት', body: 'ከgo-live በፊት የመጨረሻ ክፍያ ይፈጸማል።' },
        ownership: {
          title: 'ሙሉ ባለቤትነት:',
          body: 'የመጨረሻ ክፍያ በኋላ ደንበኛው የኮድ እና የዲዛይን ባለቤትነት 100% ይወስዳል።',
        },
      },
      payments: {
        title: 'የክፍያ ዘዴዎች',
        intro: 'የቢዝነስ ፍቃዱ እስኪገኝ ድረስ ክፍያ በባንክ ማስተላለፍ (CBE Birr) ብቻ ይቀበላል።',
        cards: {
          bankTransfer: { title: 'የባንክ ማስተላለፍ (CBE Birr)', body: 'ክፍያ በኢትዮጵያ ብር በቀጥታ በባንክ ማስተላለፍ ይከፈላል። የቢዝነስ ፍቃዱ እስኪገኝ ድረስ ይህ ብቸኛው ተቀባይነት ያለው የክፍያ ዘዴ ነው።' },
          telebirr: { title: 'Telebirr ነጋዴ (በእቅድ)', body: 'ከፍቃድ በኋላ ደንበኞች በሞባይል ገንዘብ እንዲከፍሉ የTelebirr merchant ክፍያ ለመጨመር እቅድ አለን። ይህ እቅድ ነው እንጂ የአሁኑ አቅም አይደለም።' },
          chapa: { title: 'Chapa እና ካርድ ክፍያ (በእቅድ)', body: 'ከፍቃድ በኋላ ለአካባቢያዊ እና አለም አቀፍ ደንበኞች የChapa እና የካርድ ክፍያ ለመጨመር እቅድ አለን። ይህ እቅድ ነው እንጂ የአሁኑ አቅም አይደለም።' },
        },
        note: {
          title: 'የክፍያ እቅድ:',
          body: 'Telebirr merchant፣ Chapa እና የካርድ ክፍያዎች የቢዝነስ ፍቃዱ ከተገኘ በኋላ ይጨመራሉ። እስከዚያ ድረስ የባንክ ማስተላለፍ (CBE Birr) ብቸኛው ተቀባይነት ያለው የክፍያ ዘዴ ነው።',
        },
      },
      saas: {
        title: 'የSaaS የደንበኝነት ደንቦች',
        intro: 'የክላውድ አስተዳደር ስርዓቶቻችን (SMS፣ HMS፣ PMS) በግንባታ ላይ ናቸው — ይፈልጋሉ ከሆነ ይንገሩን እና ወደ የጥበቃ ዝርዝሩ እንጨምርዎታለን።',
        cards: {
          setup: { title: 'የጥበቃ ዝርዝር ብቻ', body: 'እውነተኛ ምርት እስኪኖር ድረስ SaaS ምርቶች ዋጋ እና ክፍያ አይታዩም። ወደ የጥበቃ ዝርዝሩ ይቀላቀሉ እና ምርት ሲዘጋጅ እናገኝዎታለን።' },
          billing: { title: 'በግንባታ ላይ', body: 'የትምህርት ቤት አስተዳደር፣ ክሊኒክ/ሆስፒታል ERP እና ሪል እስቴት CRM እየተገነቡ ናቸው። ዛሬ ወርሃዊ ወይም ዓመታዊ ክፍያ የለም።' },
          support: { title: 'እስከ ማስጀመር ድረስ ክፍያ የለም', body: 'ምርት ሲገኝ ውሎቹ ማንኛውም ክፍያ ከመጠየቁ በፊት ይታተማሉ። ላልተጀመረ ምርት በጭራሽ አይከፍሉም።' },
        },
        waitlistNote: {
          title: 'ይፈልጋሉ?',
          body: 'ይንገሩን እና ያለምንም ክፍያ እና ግዴታ በጥበቃ ዝርዝሩ ላይ እናቆይዎታለን።',
        },
      },
      general: {
        title: 'አጠቃላይ ደንቦች',
        note1: 'ሁሉም ዋጋዎች በETB ይቀርባሉ እና እንደ ገበያ ሁኔታ በየዓመቱ ሊሻሻሉ ይችላሉ።',
        note2: 'የፕሮጀክት ጊዜ ግምት ነው እና እንደ ክልል ውስብስብነት ሊለዋወጥ ይችላል።',
        note3: 'በፓኬጅ ውስጥ የተካተቱ ሪቪዥኖች ከተሟሉ በላይ ተጨማሪ ክፍያ ይኖራል።',
      },
    },
  },
  faqs: {
    web: [
      {
        question: 'ከመለቀቅ በኋላ የሶስ ኮድ እና የዲዛይን ፋይሎች ባለቤት እሆናለሁ?',
        answer: 'አዎ። የመጨረሻ የደረጃ ክፍያ ከተጠናቀቀ በኋላ ባለቤትነት ሙሉ በሙሉ ወደ ቡድንዎ ይተላለፋል።',
      },
      {
        question: 'መደበኛ የዌብ ፕሮጀክት ስንት ጊዜ ይወስዳል?',
        answer: 'እንደ ውስብስብነት እና ውህደቶች አብዛኛውን ጊዜ 3 እስከ 8 ሳምንት ይወስዳል።',
      },
      {
        question: 'ከመለቀቅ በኋላ ድጋፍ መቀጠል እንችላለን?',
        answer: 'አዎ። ከSLA የተደገፈ የዓመታዊ ጥገና እና እድገት ፓኬጆች አሉ።',
      },
    ],
    mobile: [
      {
        question: 'ለAndroid እና iOS ሁለቱም ታገነባላችሁ?',
        answer: 'አዎ። የcross-platform ፍሬምወርክ እና አስፈላጊ ሲሆን native bridge እንጠቀማለን።',
      },
      {
        question: 'የstore submission እና ኮምፕላየንስ ትያዙታላችሁ?',
        answer: 'አዎ። ሁለቱም ሱቆች ላይ የማስገባት ሰነዶችን እና የመለቀቅ ቼክሊስት እናዘጋጃለን።',
      },
      {
        question: 'የአካባቢ ክፍያ ጌትዌዎች ሊዋሃዱ ይችላሉ?',
        answer: 'አዎ። እንደ ንግድ ሞዴል በTelebirr፣ Chapa እና ካርድ ጌትዌዎች ማዋሃድ እንችላለን።',
      },
    ],
    saas: [
      {
        question: 'በSaaS ማስጀመር ውስጥ ምን ይካተታል?',
        answer: 'ማስዋቀር፣ የዳታ እቅድ፣ የሚና ማቀናበር እና የቡድን ስልጠና ይካተታሉ።',
      },
      {
        question: 'ዓመታዊ ክፍያ ላይ ጥቅም አለ?',
        answer: 'አዎ። ዓመታዊ ስብስክሪፕሽኖች ቅናሽ አላቸው እና የማሻሻያ ቼክፖይንቶችን ያካትታሉ።',
      },
      {
        question: 'የዳታ መጠባበቂያ እንዴት ይደረጋል?',
        answer: 'ሁሉም ስርዓቶች የሚተዳደር ባክአፕ፣ የመዳረሻ ቁጥጥር እና የደህንነት አዘምን ያካትታሉ።',
      },
    ],
    additional: [
      {
        question: 'ተጨማሪ አገልግሎቶች ብቻቸውን ሊገዙ ይችላሉ?',
        answer: 'አዎ። እያንዳንዱ ተጨማሪ አገልግሎት ብቻውን ወይም ከልማት ፓኬጅ ጋር ሊወሰን ይችላል።',
      },
      {
        question: 'ለአንድ-ጊዜ አገልግሎት ተደጋጋሚ ግዴታ አለ?',
        answer: 'የለም። አንድ-ጊዜ አገልግሎቶች እንደ አንድ-ጊዜ ይቆያሉ እርስዎ በግልፅ ካልጨመሩ በቀር።',
      },
      {
        question: 'ብጁ የአገልግሎት ጥቅሎች ትሰጣላችሁ?',
        answer: 'አዎ። እንደ የማስጀመሪያ ጊዜ እና የእድገት ቅድሚያዎች ተመጣጣኝ ጥቅል ማሰናጃ እንችላለን።',
      },
    ],
  },
};

const omContentOverrides = {
  common: {
    to: 'gara',
    none: 'Hin jiru',
  },
  states: {
    sending: 'Ergaa jirra...',
    loadingPackages: 'Pakeejjii feenaa jira...',
    loadingCloudPlatforms: 'Platfoormii cloud feenaa jira...',
    loadingServices: 'Tajaajila feenaa jira...',
    loadingFeaturedAddons: 'Dabalata filatamoo feenaa jira...',
  },
  liveChat: {
    toggle: 'Filannoo chat jijjiiri',
    dialog: 'Filannoo chat',
    heading: 'Deebii saffisaa barbaadda?',
    open: 'Chat deeggarsaa bani',
    close: 'Chat deeggarsaa cufi',
    prompts: {
      home: 'Akkam NovaTech, tajaajiloota keessan ilaalaa jiraa fi pakeejii sirrii filachuuf gorsa saffisaa barbaada.',
      web: 'Akkam NovaTech, daldala koo irratti pakeejii web sirrii filachuuf gargaarsa barbaada.',
      mobile: 'Akkam NovaTech, appii moobaayilaa karoorfadheera, tilmaama yeroo barbaada.',
      saas: 'Akkam NovaTech, dhaabbata kooaf filannoo SaaS irratti marii barbaada.',
      additional: 'Akkam NovaTech, tajaajila dabalataaf quote dhuunfaa barbaada.',
      instantQuote: 'Akkam NovaTech, wizard quote guutaa jira; scope fi budget mirkaneessuuf gargaarsa barbaada.',
      bookCall: 'Akkam NovaTech, yeroo bilbilaa marii filachuuf gargaarsa barbaada.',
      policy: 'Akkam NovaTech, seera kaffaltii fi hojii irratti gaaffii qaba.',
      default: 'Akkam NovaTech, pirojektii dijitaalaa irratti garee keessan waliin mariadhuu barbaada.',
    },
  },
  leadCapture: {
    closeAria: 'Modal qajeelfama gatii cufi',
    privacy: 'Iccitii kee ni kabajna. Spam hin ergnu.',
    form: {
      fullName: 'Maqaa guutuu',
      fullNamePlaceholder: 'Hana Bekele',
      email: 'Imeelii',
      emailPlaceholder: 'team@company.et',
      company: 'Dhaabbata (filannoo)',
      companyPlaceholder: 'Aster Ventures',
      submitting: 'Ergaa jira...',
    },
    pricing_guide: {
      title: 'NovaTechAI 2026 Service Menu & Pricing Guide argadhaa',
      subtitle: 'Qajeelfama seera qabeessa NovaTechAI 2026 kan gatii AI automation, web, mobile fi SaaS ETB keessatti qabate buufadhaa.',
      submitLabel: 'Qajeelfama NovaTechAI Buusi',
      successTitle: 'Galatoomaa!',
      successSubtitle: 'NovaTechAI 2026 Service Menu & Pricing Guide kee tab haaraa keessatti banameera. Asii gaditti irra deebitee banuu dandeessa.',
      successPrimaryLabel: 'Qajeelfama NovaTechAI Irra Deebiitee Bani',
    },
    quote_offer: {
      title: 'Tilmaama pirojektii dhuunfaa argadhaa',
      subtitle: 'Odeeffannoo kee galchiitii gara Instant Quote itti fufi.',
      submitLabel: 'Gara Instant Quote itti fufi',
      successTitle: 'Baayyee gaarii!',
      successSubtitle: 'Gaaffiin kee galmaaheera. Tilmaama dhuunfaaaf itti fufi.',
      successPrimaryLabel: 'Instant Quote Bani',
    },
    book_call_offer: {
      title: 'Bilbila marii strategy qabadhu',
      subtitle: 'Odeeffannoo kee galchiitii gara booking itti fufi.',
      submitLabel: 'Gara Booking itti fufi',
      successTitle: 'Xiqqoo hafee jira!',
      successSubtitle: 'Gaaffiin kee qabameera. Fuula booking irratti yeroo filadhu.',
      successPrimaryLabel: 'Fuula Booking Bani',
    },
  },
  roi: {
    subtitle: 'Funnel ammaa kee irratti hundaaun buaa galii eegamu tilmaami.',
    aria: 'Tilmaama ROI',
    inputs: {
      monthlyLeads: 'Leads jihaa',
      conversionRate: 'Sadarkaa jijjiirraa (%)',
      averageDealValue: 'Gatii walii galtee giddugaleessa (ETB)',
      monthlySpend: 'Baasi jihaa (ETB)',
      expectedLift: 'Dabala tiraafikaa eegamu (%)',
    },
    output: {
      projectedLeads: 'Leads tilmaamaa',
      currentRevenue: 'Galii ammaa (ETB)',
      projectedRevenue: 'Galii tilmaamaa (ETB)',
      revenueLift: 'Dabala galii (ETB)',
      estimatedRoi: 'ROI tilmaamaa',
    },
  },
  industry: {
    notFound: {
      title: 'Fuulli industirii kanaa amma hin jiru',
      subtitle: 'Playbook industirii kana ijaaruu irratti jirra. Yeroo kana tajaajiloota keenya ilaalaa.',
      action: 'Tajaajiloota Ilaali',
    },
    header: {
      tag: 'Playbook Industirii',
      title: 'Rakkoolee idilee fi fakkeenya geessii',
    },
    pains: {
      title: 'Rakkoolee idilee',
    },
    solutions: {
      title: 'Stack furmaataa filatamaa',
    },
    items: {
      education: {
        title: 'Sirna Dijitaalaa Barnootaa',
        hero: 'Admissions, grading, attendance fi walqunnamtii maatii dijitaalessi.',
        pains: ['Reporting harkaan', 'Mul atni walqunnamtii maatii gadi aanaa', 'Rikoodii finance fi attendance wal hin qabne'],
        solutions: ['Dashboard role-based', 'Beeksisa SMS fi Telegram ofumaan', 'Modules fee, attendance fi grade walitti hidhaman'],
        scope: 'Rollout idilee: torban 8 hanga 12 training waliin.',
      },
      healthcare: {
        title: 'Platfoormii Hojii Fayyaa',
        hero: 'Intake, scheduling fi walqunnamtii patient guutummaatti fooyyessi.',
        pains: ['Bottleneck front desk', 'Appointment no-show baay ee', 'Reporting kutaa kutaan daangeffame'],
        solutions: ['Triage fi intake dijitaalaa', 'Yaadachiisa fi follow-up ofumaan', 'Dashboard KPI hoggansaaf'],
        scope: 'Rollout idilee: torban 8 hanga 10 phased deployment.',
      },
      'real-estate': {
        title: 'Real Estate CRM fi Leasing',
        hero: 'Listings, lifecycle tenant fi payment reminder workflow walitti hidhi.',
        pains: ['Data tenant facaasame', 'Yaadachiisa kiraa harkaan', 'Mul atni occupancy fi renewal gadi aanaa'],
        solutions: ['Ledger tenant fi property giddugaleessa', 'Renewal fi reminder payment ofumaan', 'Dashboard bu aa lease'],
        scope: 'Rollout idilee: torban 6 hanga 10 akka baayina propertytti.',
      },
      ecommerce: {
        title: 'Sirna Guddina E-commerce',
        hero: 'Saffisa storefront, checkout conversion fi retention guddisi.',
        pains: ['Checkout moobaayilaa suuta', 'Repeat purchase gadi aanaa', 'Attribution campaign iftoomina dhabuu'],
        solutions: ['IA conversion-first', 'Automation lifecycle retentionf', 'Reporting attribution walitti qabame'],
        scope: 'Rollout idilee: torban 6 hanga 9 fooyya ii itti fufiinsa waliin.',
      },
    },
  },
  instantQuote: {
    hero: {
      subtitle: 'Gaaffii muraasa deebisii daangaa tilmaama gatii daqiiqaa lama keessatti argadhu.',
    },
    header: {
      tag: 'Tilmaama Saffisaa',
      title: 'Scope, Budget fi Timeline karoorsi',
      subtitle: 'Tilmaamni kun kallattii kennu dha; architecture fi proposal sirrii qopheessuuf nu gargaara.',
    },
    progressAria: 'Adeemsa wizard quote',
    steps: {
      projectType: {
        title: 'Akaakuu Pirojektii',
        subtitle: 'Tajaajila ijoo quote kanaaf filadhu.',
      },
      budget: {
        title: 'Budget fi Timeline',
      },
      requirements: {
        title: 'Fedhii Teknikaa',
        subtitle: 'Walitti hidhamiinsa fi yaadannoo pirojektii kee waliin deeman filadhu.',
      },
      contact: {
        title: 'Odeeffannoo Qunnamtii',
      },
    },
    labels: {
      budgetRange: 'Daangaa budget',
      deliveryTimeline: 'Yeroo geessii',
      projectGoals: 'Kaayyoo pirojektii',
      projectGoalsPlaceholder: 'Kaayyoo, dursa fi daangaa ibsi.',
      fullName: 'Maqaa guutuu',
      workEmail: 'Imeelii hojii',
      phoneOptional: 'Bilbila (filannoo)',
    },
    actions: {
      generate: 'Tilmaama Uumi',
    },
    result: {
      title: 'Daangaa gatii tilmaamaa kee',
      subtitle: 'Daangaan kun scope, timeline fi complexity integration filattan irratti hundaa eera.',
    },
    options: {
      service: {
        web: 'Misooma Web',
        mobile: 'Misooma Appii Moobaayilaa',
        saas: 'Platfoormii SaaS',
        additional: 'Branding fi Tajaajila Dabalataa',
      },
      budget: {
        under50: '50k ETB gadi',
        mid: '50k - 120k ETB',
        high: '120k - 250k ETB',
        enterprise: '250k+ ETB',
      },
      timeline: {
        fast: 'Torban 2-4',
        standard: 'Ji a 1-2',
        extended: 'Ji a 2-4',
        flexible: 'Yeroo laafaa',
      },
      integrations: {
        crm: 'CRM Walitti Hidhamiinsa',
        analytics: 'Dashboard Analytics',
        multilingual: 'Qabiyyee Afaan hedduu',
      },
    },
  },
  discovery: {
    hero: {
      subtitle: 'Yeroo naannoo keessanii filadhaa fi dursa ijoo nuuf qoodaa.',
      metaAria: 'Odeeffannoo deeggarsa booking',
      chip1: 'Karoora yeroo naannootti madaalu',
      chip2: 'Kuta yeroo strategy daqiiqaa 30',
      chip3: 'Bu aa roadmap hojiirra oolu',
    },
    header: {
      tag: 'Scheduling',
      title: 'Yeroo Kuta filadhu',
      timezone: 'Yeroo naannoo argame',
    },
    sessions: {
      title: 'Kutaalee argaman',
    },
    form: {
      title: 'Odeeffannoo Walga ii',
      fullName: 'Maqaa guutuu',
      workEmail: 'Imeelii hojii',
      company: 'Dhaabbata',
      agenda: 'Ajandaa walga ii',
      agendaPlaceholder: 'Kaayyoo pirojektii, rakkina fi eeggannoo yeroo qoodi.',
      submit: 'Kuta Mirkaneessi',
      success: 'Galatoomaa. Odeeffannoon booking keessan qabameera; invite calendar yeroodhaaf ni ergame.',
      hint: 'Mirkaneessi fi tarkaanfii itti aanan imeeliidhaan isin ga a.',
    },
    booking: {
      requestedSlot: 'Yeroo gaafatame',
      agendaLabel: 'Ajandaa',
    },
  },
  web: {
    hero: {
      subtitle: 'Pakeejjii 3 sadarkaa daldalaa keessaniif mijatan.',
      metaAria: 'Ibsa geessii web',
      chip1: 'IA conversion irratti xiyyeeffate',
      chip2: 'Bu uura SEO fi Analytics',
      chip3: 'Review sprint torbee torbeen',
    },
    proof: {
      0: { title: 'Kickoff sa aa 48 keessatti', text: 'Scope erga mirkanaa ee booda guyyoota hojii lama keessatti discovery fi wireframe jalqabna.' },
      1: { title: 'Milestone ijaarsa ifaa', text: 'Torbee torbeedhaan progress ifaa ilaaltanii gara sprint itti aanu ceena.' },
      2: { title: 'Qophiin launch dabalameera', text: 'Pakeejji hundi check performance, setup indexing fi qajeelfama handover qaba.' },
    },
    sections: {
      packages: {
        tag: 'Pakeejjii Misoomaa',
        title: 'Pakeejjii kee filadhu',
        subtitle: 'Pakeejjii hundi responsive design, SEO fi deeggarsa baatii 3 of keessaa qaba.',
      },
    },
    faq: {
      title: 'Gaaffilee Misooma Web',
      subtitle: 'Deebii saffisaa abbummaa, yeroo geessii fi deeggarsa launch booda irratti.',
    },
    cta: {
      subtitle: 'Bal ina pakeejjii fi amaloota hundaaf qajeelfama guutuu buufadhaa.',
      secondary: 'Istiraateejistii waliin mariadhu',
    },
  },
  mobile: {
    hero: {
      subtitle: 'Appii iOS fi Android Flutter fi React Native n ijaaraman gabaa Itoophiyaaf qophaa an.',
      metaAria: 'Ibsa geessii moobaayilaa',
      chip1: 'Deeggarsa submission store',
      chip2: 'Architecture offline-ready',
      chip3: 'Walitti hidhamiinsa Telebirr fi Chapa',
    },
    proof: {
      0: { title: 'Flow fayyadamaa dura', text: 'Kodee dura user journey ijoo irratti walii galla.' },
      1: { title: 'Qormaata meeshaa dhugaa irratti', text: 'Sprint hundi QA practical Android fi iOS irratti ni qabaata.' },
      2: { title: 'Launch fi fooyya ii', text: 'Analytics fi backlog dursa launch dura ni qophaa a.' },
    },
    sections: {
      packages: {
        tag: 'Pakeejjii Appii',
        title: 'Appii Moobaayilaa kee ijaari',
        subtitle: 'Appii salphaa irraa hanga platfoormii FinTech walxaxaa tti.',
      },
    },
    faq: {
      title: 'Gaaffilee Misooma Moobaayilaa',
      subtitle: 'Submission store, platform coverage fi integration kaffaltii biyya keessaa irratti deebii.',
    },
    cta: {
      subtitle: 'Yaada appii kee gara appii qophaa ee gabaa geessu jijjiirra.',
      secondary: 'Bilbila strategy appii qabadhu',
    },
  },
  saas: {
    hero: {
      subtitle: 'Sirna bulchiinsaa cloud kiraan kennamu; IT overhead hin qabu, saffisaan ni diriirfama.',
      metaAria: 'Ibsa geessii SaaS',
      chip1: 'Onboarding garee saffisaa',
      chip2: 'Backup fi nageenya bulchaa',
      chip3: 'Qusannaa karoora waggaa',
    },
    labels: {
      annualSave: 'Ji a 2 qusadhu',
      comingSoon: 'Coming soon',
    },
    proof: {
      0: { title: 'Karaa diriirfama saffisaa', text: 'Dhaabbileen baay een onboarding gabaabaa keessatti xumuru.' },
      1: { title: 'Mul atina hojii', text: 'Dashboard fi reporting adeemsa guyyaa guyyaa keessan irratti qindaa a.' },
      2: { title: 'Fooyya ii itti fufiinsa', text: 'Update nageenyaa fi platform yeroo yeroon ni kennama.' },
    },
    sections: {
      catalog: {
        tag: 'Platfoormii Cloud',
        title: 'Sirnoota Bulchiinsaa keenya',
        subtitle: 'Software sadarkaa enterprise subscription jihaa madaalawaadhaan argamu.',
      },
    },
    pricing: {
      setup: 'Setup fi Leenjii yeroo tokko',
      monthly: 'Subscription Jihaa',
      annual: 'Subscription Waggaa',
    },
    modulesTitle: 'Modules ijoo keessatti dabalaman:',
    faq: {
      title: 'Gaaffilee Furmaata SaaS',
      subtitle: 'Onboarding, billing, backup fi deeggarsa irratti ibsa ifaa.',
    },
    cta: {
      title: 'Hojii keessan ammayyeessuuf qophooftee?',
      subtitle: 'Comparison amaloota bal inaaf qajeelfama guutuu buufadhaa.',
      secondary: 'Marii SaaS gaafadhu',
    },
    systems: {
      school: { description: 'Platfoormii bulchiinsa mana barumsaa guutuu: barataa, grade, attendance, fee fi walqunnamtii maatii.' },
      clinic: { description: 'Sirna bulchiinsa fayyaa guutuu klinikaa fi hospitaalaa, galmee patient irraa hanga billing fi lab result.' },
      property: { description: 'Qabeenya, tenant, lease, walitti qabuu kiraa fi maintenance dashboard tokkotti bulchi.' },
    },
  },
  additional: {
    hero: {
      subtitle: 'Tajaajiloota yeroo tokkoo fi deddeebii jiran argama dijitaalaa keessan cimsuuf.',
      metaAria: 'Ibsa tajaajila dabalataa',
      chip1: 'Bandii baasii ifaa',
      chip2: 'Filannoo yeroo tokkoo fi deddeebii',
      chip3: 'Dabalata bundle qophaa an',
    },
    proof: {
      0: { title: 'Bundla tajaajilaa hojii irra oolu', text: 'Hosting, design fi maintenance package dhokataa malee qindeessi.' },
      1: { title: 'Renewal tilmaamamaa', text: 'Tajaajiloonni deddeebiin ifatti mallattoo qabaniiru; budget salphaatti qopheessa.' },
      2: { title: 'Filannoo deeggarsa guddataa', text: 'Barbaachisoo irraa jalqabi; akka guddataan deeggarsa dabaluu dandeessa.' },
    },
    sections: {
      catalog: {
        tag: 'Kaataaloga Tajaajilaa',
        title: 'Tajaajiloota yeroo tokkoo fi deddeebii',
        subtitle: 'Waan jalqabuuf, tikfachuuf fi guddifachuuf barbaachisu hunda.',
      },
      featured: {
        tag: 'Filatamoo',
        title: 'Dabalata filatamoo',
        subtitle: 'Tajaajiloota dabalataa beekamoo gatii olaanaa kennan.',
      },
    },
    table: {
      service: 'Tajaajila',
      description: 'Ibsa',
      cost: 'Baasii tilmaamaa',
      billing: 'Kaffaltii',
    },
    billing: {
      'one-time': 'Yeroo tokkoo',
      recurring: 'Deddeebii',
    },
    faq: {
      title: 'Gaaffilee Tajaajila Dabalataa',
      subtitle: 'Modelii kaffaltii, bundle fi scope dhuunfaa irratti hubannoo argadhu.',
    },
    cta: {
      subtitle: 'Tajaajila kamiyyuu irratti quote dhuunfaa nu gaafadhaa.',
      secondary: 'Quote dhuunfaa gaafadhu',
    },
  },
  policy: {
    hero: {
      subtitle: 'Haala iftoomina qabuun hariiroo hojii amanamaa kickoff irraa hanga launch mirkaneessina.',
      metaAria: 'Ibsa seeraa',
      chip1: 'Kaffaltii milestone irratti hundaa e',
      chip2: 'Abbummaa IP maamilaa',
      chip3: 'Waadaa deeggarsa ifaa',
      chip4: 'Daddabarsa Baankii Qofa',
    },
    proof: {
      0: { title: 'Ifa waliigaltee dura', text: 'Engagement hundi milestone ifaa fi deliverable beekamaa irratti ijaarama.' },
      1: { title: 'Kaffaltii irratti waan hin eegamne hin jiru', text: 'Checkpoints kaffaltii fi daangaan tajaajilaa kickoff dura ibsama.' },
      2: { title: 'Deeggarsa hojii yeroo dheeraa', text: 'Deeggarsa, update fi reporting terms dursanii galma a an.' },
    },
    cta: {
      title: 'Jalqabuu dura ibsa dabalataa barbaaddaa?',
      subtitle: 'Qajeelfama guutuu ilaalaa yookaan bilbila marii qabadhaa; balinaan isinif ibsina.',
    },
    sections: {
      development: {
        title: 'Seera Kaffaltii Misoomaa',
        intro: 'Pirojektoonni misoomaa dhuunfaa hundi (web, mobile, SaaS) kaffaltii milestone irratti hundaa e ni hordofu.',
        m1: { title: 'Deposit dura', body: 'Waliigaltee fi kickoff irratti kaffalama; qophii fi design jalqabaa uwwisa.' },
        m2: { title: 'Erga design/prototype mirkanaa e booda', body: 'Mockup yookaan prototype erga mirkanaa e booda full build itti fufa.' },
        m3: { title: 'Deploy final dura', body: 'Go-live dura kaffaltiin xumuraa ni taasifama; achumaan deliverable hundi ni kennama.' },
        ownership: {
          title: 'Mirkana Abbummaa Guutuu:',
          body: 'Kaffaltii xumuraa booda maamilaan asset design, source code fi IP hundaa 100% ni qabaata.',
        },
      },
      payments: {
        title: 'Maloota Kaffaltii',
        intro: 'Hanga liisensii daldalaa argamutti kaffaltiin daddabarsa baankii (CBE Birr) qofaan fudhatama.',
        cards: {
          bankTransfer: { title: 'Daddabarsa Baankii (CBE Birr)', body: 'Kaffaltiin birrii Itoophiyaa keessatti daddabarsa baankii qajeelaa ta een kan godhamu dha. Hanga liisensii daldalaa argamutti karaan kaffaltii fudhatamu qofa kan ta e dha.' },
          telebirr: { title: 'Daldalaa Telebirr (Karoora)', body: 'Liisensii booda maamiltoonni maallaqa moobaayilaatiin akka kaffalan karaa daldalaa Telebirr dabaluuf karoorra qabna. Kun karoora dha, dandeettii ammaa miti.' },
          chapa: { title: 'Kaffaltii Chapa fi Kaardii (Karoora)', body: 'Liisensii booda maamiltoota biyya keessaa fi alaa fiif kaffaltii Chapa fi kaardii dabaluuf karoorra qabna. Kun karoora dha, dandeettii ammaa miti.' },
        },
        note: {
          title: 'Karoora kaffaltii:',
          body: 'Daldalaan Telebirr, Chapa fi kaffaltii kaardii liisensii daldalaa erga argamee booda ni dabalamu. Hanga hojiirra oolutti daddabarsa baankii (CBE Birr) karaa kaffaltii fudhatamu qofa dha.',
        },
      },
      saas: {
        title: 'Seera Subscription SaaS',
        intro: 'Sirnoonni cloud keenya (SMS, HMS, PMS) miseensaaf jiraa jiru — isin barbaadda yoo ta e nu himaa; tartiiba eeggachaa irratti isin galchina.',
        cards: {
          setup: { title: 'Tartiiba Eeggachaa Qofa', body: 'Hanga oomisha dhugaa argamutti SaaS gatii fi kaffaltii hin agarsiisu. Tartiiba eeggachaa irratti galmaa aa; yeroo oomishni qophaa u deemnu isin qunnamna.' },
          billing: { title: 'Miseensa Jira', body: 'Sirna Bulchiinsa Mana Barumsaa, Clinic/Hospital ERP fi Real Estate CRM miseensaaf jiraa jiru. Har a kaffaltii ji aa yookaan waggaa hin jiru.' },
          support: { title: 'Hanga Launch tti Kaffaltii Hin Jiru', body: 'Yeroo oomishni argamutti haalli isaa kaffaltii isaan gaafachuu dura maxxanfama. Oomisha hin jirreef gonkumaa hin kaffaltan.' },
        },
        waitlistNote: {
          title: 'Barbaaddaa?',
          body: 'Nu himaa; kaffaltii fi waadaa malee tartiiba eeggachaa irratti isin ni eegna.',
        },
      },
      general: {
        title: 'Seerota Waliigalaa',
        note1: 'Gatiin hundi ETBn kan ibsamu; haala gabaa irratti hundaa ee waggaan sirreeffamuu danda a.',
        note2: 'Yeroon pirojektii tilmaama qofa; akka walxaxina scope fi deebi i maamilaa irratti jijjiiramuu danda a.',
        note3: 'Revision package keessatti ibsame ni jira; revision dabalataaf kaffaltiin dabalataa ni jiraata.',
      },
    },
  },
  faqs: {
    web: [
      {
        question: 'Launch booda source code fi design files anatu qabaataa?',
        answer: 'Eeyyee. Erga milestone kaffaltii xumurtanii booda abbummaan guutuun gara garee keessanitti darbu.',
      },
      {
        question: 'Pirojektiin web idileen yeroo meeqa fudhata?',
        answer: 'Baayinaan torban 3 hanga 8, akka walxaxina fi integrations irratti hundaa a.',
      },
      {
        question: 'Launch booda deeggarsa itti fufuu dandeenyaa?',
        answer: 'Eeyyee. Maintenance waggaa fi growth retainers deeggarsa SLA qabu ni kennina.',
      },
    ],
    mobile: [
      {
        question: 'Android fi iOS lamaaniif ni ijaartu?',
        answer: 'Eeyyee. Framework cross-platform fayyadamna; modules performance olaanaaf native bridge ni dabalna.',
      },
      {
        question: 'Submission store fi compliance ni qabattu?',
        answer: 'Eeyyee. Artifacts submission, policy checks fi checklists release stores lamaaniif ni qopheessina.',
      },
      {
        question: 'Gateway kaffaltii biyya keessaa walitti hidhuu ni dandeessuu?',
        answer: 'Eeyyee. Telebirr, Chapa fi gateway kaardii akka model daldalaa irratti hundaa ee ni walitti hidhama.',
      },
    ],
    saas: [
      {
        question: 'Onboarding SaaS keessatti maal dabalama?',
        answer: 'Setup, karoora import data, role setup fi leenjii garee rollout jalqabaa keessatti dabalama.',
      },
      {
        question: 'Kaffaltii waggaa irratti faayidaan jiraa?',
        answer: 'Eeyyee. Subscription waggaa discount qaba; checkpoint optimization dursamee dabalama.',
      },
      {
        question: 'Backup data akkamitti geggeeffama?',
        answer: 'Sirni hundi backup bulchaa, to annannoo access fi update nageenyaa yeroo yeroon qaba.',
      },
    ],
    additional: [
      {
        question: 'Tajaajiloonni add-on adda addaan bitamuu ni danda u?',
        answer: 'Eeyyee. Add-on hundi of danda ee scope ta uu yookaan package misoomaa waliin walitti qabamuu danda a.',
      },
      {
        question: 'Tajaajila yeroo tokkoof waadaa deddeebii ni jiraa?',
        answer: 'Lakki. Tajaajiloonni yeroo tokkoo yeroo tokko qofa; yoo maintenance yookaan retainer dabalte qofa.',
      },
      {
        question: 'Bundle tajaajila dhuunfaa ni kennituu?',
        answer: 'Eeyyee. Akka yeroo launch fi dursa guddina keessaniitti gatii bundle qopheessuu dandeenya.',
      },
    ],
  },
};

const amFinalOverrides = {
  nav: {
    services: 'AI መፍትሄዎች',
    web: 'የዌብ ኢንተርፌስ',
    mobile: 'የሞባይል ኢንተርፌስ',
    saas: 'SaaS መፍትሄ',
    policy: 'ኦፕሬሽን ፖሊሲ',
    instantQuote: 'Automation Brief',
    bookCall: 'Workflow Audit Call',
  },
  footer: {
    description: 'AI-first አውቶሜሽን ኮንሰልታንሲ፣ በብጁ ኤጀንቲክ ዎርክፍሎዎች እና በዌብ፣ ሞባይል እና SaaS የሶፍትዌር ልማት ላይ እኩል ትኩረት ያደርጋል።',
    rights: '© 2026 NovaTech AI Systems. መብቶች ሁሉ የተጠበቁ ናቸው።',
    links: {
      aiSolutionsHeading: 'AI መፍትሄዎች',
      aiSolutions: 'AI መፍትሄዎች',
      workflowAudit: 'Workflow Audit',
      pricing: 'ዋጋ',
      strategyCall: 'የስትራቴጂ ጥሪ',
      automationBrief: 'Automation Brief Wizard',
      engineeringLayer: 'የኢንጂነሪንግ ዴሊቨሪ ሽፋን',
      searchableBrain: 'The Searchable Brain',
      methodology: 'የስራ ዘዴ',
      additionalServices: 'የኢንጂነሪንግ ድጋፍ',
      aboutUs: 'የስራ ዘዴ',
      linkedin: 'ሊንክዲን',
    },
  },
  liveChat: {
    heading: 'በፍጥነት ቴክኒካዊ ምላሽ ይፈልጋሉ?',
    open: 'የAI ኦፕሬሽንስ ቻት ክፈት',
    close: 'የAI ኦፕሬሽንስ ቻት ዝጋ',
    prompts: {
      home: 'ሰላም NovaTech AI፣ በቡድናችን ውስጥ ያሉ የእጅ ስራ ቦታዎችን በብጁ AI ኤጀንቶች ለመቀየር መወያየት እፈልጋለሁ።',
      services: 'ሰላም NovaTech AI፣ ከAI መፍትሄዎቻችሁ ውስጥ ለኦፕሬሽኖቻችን የሚስማማውን ስታክ ለመምረጥ እገዛ እፈልጋለሁ።',
      workflowAudit: 'ሰላም NovaTech AI፣ Workflow Audit ለማስያዝ እና የሚፈለጉ የስርዓት መዳረሻዎችን ለመወያየት እፈልጋለሁ።',
      pricing: 'ሰላም NovaTech AI፣ ትክክለኛውን የAutomation Tier እና ወርሃዊ የድጋፍ ሞዴል ለመምረጥ እገዛ እፈልጋለሁ።',
      web: 'ሰላም NovaTech AI፣ የAI ዎርክፍሎዎቻችንን ለማሳየት የዌብ ኢንተርፌስ ሽፋን እንፈልጋለን።',
      mobile: 'ሰላም NovaTech AI፣ ለAI-ተመራ የመስክ ኦፕሬሽኖች የሞባይል ኢንተርፌስ እንፈልጋለን።',
      saas: 'ሰላም NovaTech AI፣ ለSaaS ኦፕሬሽኖቻችን ኦርኬስትሬሽን እና ዲፕሎይመንት ስርዓት ላይ መወያየት እፈልጋለሁ።',
      additional: 'ሰላም NovaTech AI፣ በIntegration እና የAutomation Reliability ዙሪያ የኢንጂነሪንግ ድጋፍ እፈልጋለሁ።',
      instantQuote: 'ሰላም NovaTech AI፣ Automation Brief እሞላለሁ እና ስኮፕ/በጀት ለማረጋገጥ እገዛ እፈልጋለሁ።',
      bookCall: 'ሰላም NovaTech AI፣ ተስማሚ የWorkflow Audit ጊዜ እና አጀንዳ ለመምረጥ እገዛ እፈልጋለሁ።',
      policy: 'ሰላም NovaTech AI፣ ስለ ዲፕሎይመንት፣ ደህንነት እና ኦፕሬሽን ፖሊሲ ጥያቄ አለኝ።',
      default: 'ሰላም NovaTech AI፣ የእጅ ዎርክፍሎዎችን በብጁ ኤጀንቲክ ስርዓቶች ለመቀየር መወያየት እፈልጋለሁ።',
    },
  },
  additional: {
    hero: {
      title: 'ተጨማሪ አገልግሎቶች',
      subtitle: 'ዲጂታል መገኘትዎን ለማጠናከር አስፈላጊ የአንድ-ጊዜ እና የተደጋጋሚ አገልግሎቶች።',
      metaAria: 'የተጨማሪ አገልግሎት አበረክቶች',
      chip1: 'ግልፅ የወጪ ክልሎች',
      chip2: 'የአንድ-ጊዜ እና የተደጋጋሚ አማራጮች',
      chip3: 'ለጥቅል ዝግጁ ተጨማሪዎች',
    },
    cta: {
      title: 'ብጁ አገልግሎት ይፈልጋሉ?',
      subtitle: 'ለማንኛውም አገልግሎት ብጁ ዋጋ ይጠይቁ።',
      secondary: 'ብጁ ዋጋ ይጠይቁ',
    },
  },
  industry: {
    header: {
      tag: 'የኢንዱስትሪ መመሪያ',
      title: 'የተለመዱ ችግኝና የማቅረቢያ ሞዴል',
    },
    notFound: {
      subtitle: 'ይህን የኢንዱስትሪ መመሪያ አሁንም በመገንባት ላይ ነን።',
      action: 'አገልግሎቶቻችንን ይመልከቱ',
    },
    pains: {
      title: 'የተለመዱ የህመም ነጥቦች',
    },
    solutions: {
      title: 'የተመከረ የመፍትሄ ስታክ',
    },
  },
  leadCapture: {
    form: {
      emailPlaceholder: 'team@company.et (ለምሳሌ)',
      companyPlaceholder: 'Aster Ventures (አማራጭ)',
    },
  },
  mobile: {
    hero: {
      title: 'የሞባይል መተግበሪያ ልማት',
    },
    cta: {
      title: 'የአፕ ሀሳብ አለዎት?',
      subtitle: 'ሀሳብዎን ወደ ገበያ-ዝግጁ የሞባይል መተግበሪያ እንቀይራለን።',
      secondary: 'የአፕ ስትራቴጂ ጥሪ ያስይዙ',
    },
  },
  policy: {
    hero: {
      title: 'የክፍያ እና ኦፕሬሽን ፖሊሲ',
      subtitle: 'ከጅምር እስከ መለቀቅ ድረስ በእምነት ላይ የተመሰረተ ግንኙነት እንዲኖር ግልፅ መመሪያዎች።',
      metaAria: 'የፖሊሲ አበረክቶች',
      chip1: 'በማይልስቶን ላይ የተመሰረተ ክፍያ',
      chip2: 'የደንበኛ IP ባለቤትነት',
      chip3: 'ግልፅ የድጋፍ ቃል ኪዳኖች',
      chip4: 'የባንክ ማስተላለፍ ብቻ',
    },
    cta: {
      title: 'ከመጀመርዎ በፊት ማብራሪያ ይፈልጋሉ?',
    },
  },
  saas: {
    hero: {
      title: 'SaaS የክላውድ መፍትሄዎች',
    },
    labels: {
      annualSave: '2 ወር ይቆጥቡ',
      comingSoon: 'Coming soon',
    },
    systems: {
      school: {
        description: 'የተማሪ አስተዳደር፣ ውጤት፣ ተገኝነት እና የወላጅ ግንኙነት የሚያካትት ሙሉ የትምህርት ቤት መድረክ።',
      },
      clinic: {
        description: 'ከታካሚ ምዝገባ እስከ ክፍያ እና የላብ ውጤት ድረስ የሚሰራ የጤና አስተዳደር ስርዓት።',
      },
      property: {
        description: 'ንብረቶችን፣ ተከራዮችን፣ ሊዝ እና የጥገና ሂደቶችን በአንድ የክላውድ ዳሽቦርድ ያስተዳድሩ።',
      },
    },
  },
  web: {
    hero: {
      title: 'የዌብ ዲዛይን እና ልማት',
    },
    cta: {
      title: 'ብጁ ዋጋ ይፈልጋሉ?',
      secondary: 'ከስትራቴጂስት ጋር ይነጋገሩ',
    },
  },
};

const omFinalOverrides = {
  nav: {
    services: 'Furmaata AI',
    web: 'Interfeesii Web',
    mobile: 'Interfeesii Moobaayilaa',
    saas: 'Furmaata SaaS',
    policy: 'Seera Operations',
    instantQuote: 'Automation Brief',
    bookCall: 'Workflow Audit Call',
  },
  channels: {
    telegram: 'Telegiraamii',
    whatsapp: 'Waatsaappii',
  },
  footer: {
    description: 'AI-first automation consultancy kan agentic workflows dhuunfaa fi web, mobile, SaaS software engineering irratti xiyyeeffannoo walqixa qabu.',
    rights: '© 2026 NovaTech AI Systems. Mirgi hundi eegameera.',
    links: {
      aiSolutionsHeading: 'Furmaata AI',
      aiSolutions: 'Furmaata AI',
      workflowAudit: 'Workflow Audit',
      pricing: 'Gatii',
      strategyCall: 'Bilbila Strategy',
      automationBrief: 'Automation Brief Wizard',
      engineeringLayer: 'Engineering Delivery Layer',
      searchableBrain: 'The Searchable Brain',
      methodology: 'Methodology',
      additionalServices: 'Engineering Support',
      aboutUs: 'Methodology',
      linkedin: 'Liinkidiin',
    },
  },
  liveChat: {
    heading: 'Deebii tekinikaa saffisaa barbaaddaa?',
    open: 'AI operations chat bani',
    close: 'AI operations chat cufi',
    prompts: {
      home: 'Akkam NovaTech AI, hojii harkaan hojjetamu keessaa bottlenecks agentoota AI dhuunfaatiin jijjiiruuf marii barbaada.',
      services: 'Akkam NovaTech AI, furmaata AI keessaa stack hojii keenyaaf sirrii ta e filachuuf gargaarsa barbaada.',
      workflowAudit: 'Akkam NovaTech AI, workflow audit qopheessuuf fi system access barbaachisu irratti marii barbaada.',
      pricing: 'Akkam NovaTech AI, automation tier sirrii fi monthly support model filachuuf gargaarsa barbaada.',
      web: 'Akkam NovaTech AI, workflows AI keenyaaf interfeesii web (dashboard) ijaaruu barbaanna.',
      mobile: 'Akkam NovaTech AI, hojii field AI-poweredf interfeesii moobaayilaa barbaanna.',
      saas: 'Akkam NovaTech AI, orchestration fi deployment pattern SaaS operations keenyaaf marii barbaada.',
      additional: 'Akkam NovaTech AI, integrations fi automation reliability irratti engineering support barbaada.',
      instantQuote: 'Akkam NovaTech AI, automation brief guutaa jira; scope fi budget mirkaneessuuf gargaarsa barbaada.',
      bookCall: 'Akkam NovaTech AI, yeroo workflow audit call fi agenda filachuuf gargaarsa barbaada.',
      policy: 'Akkam NovaTech AI, deployment, security fi seera operations irratti gaaffii qaba.',
      default: 'Akkam NovaTech AI, workflows harkaan hojjetaman gara agentic systems dhuunfaatti jijjiiruuf marii barbaada.',
    },
  },
  additional: {
    hero: {
      title: 'Tajaajiloota Dabalataa',
    },
    cta: {
      title: 'Wanta addaa barbaaddaa?',
    },
  },
  discovery: {
    header: {
      tag: 'Sagantaalee',
    },
  },
  leadCapture: {
    form: {
      fullNamePlaceholder: 'Hana Bekele (fakkeenya)',
      emailPlaceholder: 'team@company.et (fakkeenya)',
      companyPlaceholder: 'Aster Ventures (filannoo)',
    },
  },
  mobile: {
    hero: {
      title: 'Misooma Appii Moobaayilaa',
    },
    cta: {
      title: 'Yaada appii qabdaa?',
    },
  },
  policy: {
    hero: {
      title: 'Seera Kaffaltii fi Hojii',
    },
  },
  roi: {
    title: 'Tilmaama ROI',
    output: {
      title: 'Buaa jihaa tilmaamaa',
    },
  },
  saas: {
    hero: {
      title: 'Furmaata SaaS Cloud',
    },
  },
  web: {
    hero: {
      title: 'Dizaayinii fi Misooma Web',
    },
    cta: {
      title: 'Quote dhuunfaa barbaaddaa?',
    },
  },
};

function mergeTranslations(base, overrides) {
  const output = { ...base };

  Object.entries(overrides).forEach(([key, value]) => {
    const baseValue = output[key];

    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      baseValue &&
      typeof baseValue === 'object' &&
      !Array.isArray(baseValue)
    ) {
      output[key] = mergeTranslations(baseValue, value);
      return;
    }

    output[key] = value;
  });

  return output;
}

export const translations = {
  en,
  am: mergeTranslations(mergeTranslations(mergeTranslations(en, amOverrides), amContentOverrides), amFinalOverrides),
  om: mergeTranslations(mergeTranslations(mergeTranslations(en, omOverrides), omContentOverrides), omFinalOverrides),
};
