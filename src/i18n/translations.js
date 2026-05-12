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
    policy: 'Operations Policy',
    caseStudies: 'Case Studies',
    portfolio: 'Portfolio',
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
    loadingMarketingAddons: 'Loading Marketing Add-ons...',
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
  theme: {
    switchLight: 'Switch to light mode',
    switchDark: 'Switch to dark mode',
    light: 'Light mode',
    dark: 'Dark mode',
  },
  footer: {
    description: 'AI-first automation consultancy delivering custom agentic workflows while actively building web platforms, mobile apps, and SaaS products for scaling teams.',
    company: 'Company',
    connect: 'Connect',
    rights: '© 2026 NovaTech AI Systems. All rights reserved.',
    links: {
      aiSolutionsHeading: 'AI Solutions',
      aiSolutions: 'AI Solutions',
      workflowAudit: 'Workflow Audit',
      pricing: 'Pricing',
      strategyCall: 'Strategy Call',
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
    prompts: {
      home: 'Hi NovaTech AI, I want to identify manual bottlenecks we can automate with custom agents.',
      services: 'Hi NovaTech AI, I want to discuss which AI solution stack fits our current operations.',
      workflowAudit: 'Hi NovaTech AI, I want to schedule a workflow audit and review required systems access.',
      pricing: 'Hi NovaTech AI, I need help selecting the right automation tier and monthly support model.',
      web: 'Hi NovaTech AI, we need a web interface layer for our internal AI workflows and dashboards.',
      mobile: 'Hi NovaTech AI, we need a mobile interface for AI-powered field operations and approvals.',
      saas: 'Hi NovaTech AI, I want to discuss orchestration and deployment patterns for our SaaS operations.',
      additional: 'Hi NovaTech AI, I need scoped engineering support around integrations and automation reliability.',
      caseStudies: 'Hi NovaTech AI, I reviewed your outcomes and want to model similar automation ROI for our team.',
      portfolio: 'Hi NovaTech AI, I am reviewing your architecture patterns and need guidance for our industry.',
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
      title: 'Get Our 2026 Pricing Guide',
      subtitle: 'Download our complete overview of development, digital marketing, and SaaS packages, with full ETB pricing.',
      submitLabel: 'Download Pricing Guide',
      successTitle: 'Thank You!',
      successSubtitle: 'Your guide is open in a new tab. You can also reopen it below.',
      successPrimaryLabel: 'Open Guide Again',
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
      title: 'Book a Discovery Strategy Call',
      subtitle: 'Leave your details and continue to booking. We will prepare a focused strategy agenda for your goals.',
      submitLabel: 'Continue to Booking',
      successTitle: 'Almost Done!',
      successSubtitle: 'Your request was captured. Select your preferred session slot on the booking page.',
      successPrimaryLabel: 'Open Booking Page',
    },
  },
  home: {
    hero: {
      badge: '2026 Service Menu Available',
      title: 'Build better sites, faster',
      subtitle: 'From stunning websites to enterprise SaaS, we deliver end-to-end digital solutions tailored for the Ethiopian market and beyond.',
      trustAria: 'Core trust points',
      panelAria: 'Core service pillars',
      trust: {
        telebirr: 'Telebirr and Chapa Integration',
        multilingual: 'Multilingual Product Teams',
        launchSupport: 'Launch Support Included',
      },
      stats: {
        projects: 'Projects Delivered',
        clients: 'Active Clients',
        satisfaction: 'Client Satisfaction',
      },
      panelLabel: 'Core Solutions',
      cards: {
        web: {
          title: 'Web Development',
          text: 'Custom websites with modern technology, optimized for performance and conversions across all devices.',
        },
        mobile: {
          title: 'Mobile Apps',
          text: 'Cross-platform iOS & Android apps with offline-first architecture and local payment integrations.',
        },
        saas: {
          title: 'SaaS Solutions',
          text: 'Rent-to-use cloud management systems for schools, hospitals, and real estate companies.',
        },
      },
    },
    about: {
      header: {
        tag: 'About Us',
        title: 'Empowering Your Brand with Comprehensive Digital Solutions',
        subtitle: 'Cutting-edge development, data-driven marketing, and scalable SaaS platforms built for measurable growth.',
      },
      cards: {
        who: {
          title: 'Who We Are',
          text: 'We are a premier technology and digital marketing agency specializing in high-performance web architecture, cross-platform mobile application development, and enterprise-grade software. We understand that your digital presence needs to do more than just establish instant credibility, it must function as a dynamic sales tool and a robust operational hub tailored to your business needs.',
        },
        what: {
          title: 'What We Do',
          text: 'Our development tiers are meticulously designed to scale with you, accommodating varying technical complexities and platform requirements. We partner with a diverse range of clients, from local startups, personal brands, and NGOs to multi-national corporations, large hotels, and government bureaus. Whether you need a responsive, highly optimized web presence, a custom mobile app, or fully hosted enterprise systems, our packages are built to elevate your operations.',
        },
        market: {
          title: 'Built for the Local & Global Market',
          text: 'We proudly engineer software tailored for the Ethiopian market and beyond. Our custom architectures feature seamless multi-language support (English, Amharic, Afaan Oromoo) and direct API integrations with local payment gateways like Telebirr, Chapa, and CBE Birr. Paired with our targeted digital marketing strategies, focusing on everything from local reach to full market domination, we ensure your brand connects with the right audience and drives substantial ROI.',
        },
      },
    },
    services: {
      header: {
        tag: 'Our Services',
        title: 'Comprehensive Digital Solutions',
        subtitle: 'Everything you need to establish, grow, and dominate your digital presence.',
      },
      cards: {
        web: {
          title: 'Web Design & Development',
          text: 'From starter websites to enterprise platforms. Custom-built with modern technology, optimized for performance and conversions.',
        },
        mobile: {
          title: 'Mobile App Development',
          text: 'Cross-platform iOS & Android apps built with Flutter and React Native. Designed for the Ethiopian market.',
        },
        saas: {
          title: 'SaaS Cloud Solutions',
          text: 'Rent-to-use management systems for schools, hospitals, and real estate. Zero IT overhead.',
        },
        additional: {
          title: 'Branding & Additional',
          text: 'Logo design, photography, copywriting, domain hosting, and annual maintenance packages.',
        },
      },
    },
    roi: {
      title: 'Estimate Revenue Impact Before You Commit',
      subtitle: 'Use your current lead and conversion data to simulate potential growth from a focused digital rollout.',
    },
    testimonials: {
      header: {
        tag: 'Testimonials',
        title: 'What Our Clients Say',
        subtitle: "Don't take our word for it, here is what businesses we've partnered with have to say.",
      },
      rating: '5.0 Rating',
      items: [
        {
          quote: 'NovaTech completely transformed our online presence. Our new website loads 3x faster and conversions increased by 40% in the first month.',
          name: 'Abel Kebede',
          role: 'CEO, Habesha Brands',
        },
        {
          quote: 'The SaaS platform they built for our school has streamlined everything from attendance to grade reports. Parents love the Telegram notifications.',
          name: 'Sara Tesfaye',
          role: 'Director, Bright Future Academy',
        },
        {
          quote: 'Their mobile app with Telebirr integration has been a game-changer for our delivery service. Professional team with exceptional follow-through.',
          name: 'Daniel Mekonnen',
          role: 'Founder, QuickDeliver ET',
        },
      ],
    },
    process: {
      header: {
        tag: 'Our Process',
        title: 'How We Work',
        subtitle: 'A proven 4-step process that takes your project from idea to launch with transparency at every stage.',
      },
      steps: {
        discovery: {
          title: 'Discovery',
          text: 'We learn your business, goals, audience, and competition to define the perfect strategy.',
        },
        design: {
          title: 'Design',
          text: 'Wireframes and high-fidelity mockups crafted for your brand, reviewed until perfect.',
        },
        develop: {
          title: 'Develop',
          text: 'Clean, scalable code built with modern frameworks. Rigorous testing at every milestone.',
        },
        deploy: {
          title: 'Deploy',
          text: 'Launch with confidence. We handle hosting, SEO, and provide ongoing support and training.',
        },
      },
    },
    portfolio: {
      header: {
        tag: 'Our Work',
        title: 'Featured Projects',
        subtitle: "A glimpse of the digital experiences we've crafted for businesses across Ethiopia and beyond.",
      },
      cards: {
        web: {
          tag: 'Web Platform',
          title: 'E-Commerce Marketplace',
          text: 'Multi-vendor platform with Chapa payment integration, real-time inventory, and Amharic support.',
        },
        mobile: {
          tag: 'Mobile App',
          title: 'Delivery Service App',
          text: 'Cross-platform app with live tracking, Telebirr payments, and push notifications via Telegram.',
        },
        saas: {
          tag: 'SaaS Platform',
          title: 'School Management System',
          text: 'Cloud-based ERP serving 50+ schools with grading, attendance, fees, and parent portals.',
        },
      },
      comingSoon: 'Full portfolio page with detailed case studies coming soon. Stay tuned.',
    },
    contact: {
      header: {
        tag: 'Get In Touch',
        title: "Let's Start Your Project",
        subtitle: "Have a project in mind? Drop us a message and we'll get back to you within 24 hours.",
      },
      form: {
        title: 'Send Us a Message',
        fullName: 'Full Name',
        fullNamePlaceholder: 'Hana Bekele',
        email: 'Email Address',
        emailPlaceholder: 'team@company.et',
        message: 'Your Message',
        messagePlaceholder: 'Tell us about your project...',
        submit: 'Send Message',
        feedback: {
          sent: 'Thanks. Your message was submitted successfully and our team will respond within 24 hours.',
          fallback: 'We could not reach our API endpoint, so we opened your email app to complete the request.',
          error: 'Please verify your name, email, and message, then try again.',
          sending: 'Sending your request through our secure contact API...',
          idle: 'We usually respond in less than one business day.',
        },
      },
    },
    bottomCta: {
      title: 'Ready to Transform Your Business?',
      subtitle: 'Download our comprehensive 2026 Service Menu & Pricing Guide to find the perfect package.',
    },
  },
  caseStudies: {
    hero: {
      title: 'Case Studies',
      subtitle: 'Real delivery stories with measurable before and after outcomes across priority industries.',
    },
    header: {
      tag: 'Client Outcomes',
      title: 'Measured Impact',
      subtitle: 'Each case study captures business context, implementation path, and quantifiable results.',
    },
    delivery: 'Delivery',
    labels: {
      challenge: 'Challenge',
      solution: 'Solution',
      stack: 'Stack',
    },
  },
  portfolio: {
    hero: {
      title: 'Portfolio',
      subtitle: 'Filter by industry to explore projects and architecture patterns relevant to your business model.',
    },
    header: {
      tag: 'Project Library',
      title: 'Filter by Industry',
      subtitle: 'Use industry filters to focus on examples close to your operational context.',
    },
    filters: {
      aria: 'Portfolio industry filters',
      all: 'All',
      ecommerce: 'E-commerce',
      education: 'Education',
      healthcare: 'Healthcare',
      'real-estate': 'Real Estate',
      logistics: 'Logistics',
    },
    actions: {
      viewPlaybook: 'View Industry Playbook',
      viewRelated: 'View Related Work',
    },
  },
  industry: {
    notFound: {
      subtitle: 'We are still building this industry playbook. Explore the full portfolio in the meantime.',
      action: 'Go to Portfolio',
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
    caseStudies: 'የስራ ጥናቶች',
    portfolio: 'ፖርትፎሊዮ',
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
  home: {
    hero: {
      badge: 'የ2026 አገልግሎት መመሪያ ተዘጋጅቷል',
      title: 'የተሻለ ድር ጣቢያ በፍጥነት ይገንቡ',
      subtitle: 'ከአስደናቂ ድር ጣቢያዎች እስከ የኢንተርፕራይዝ SaaS ድረስ፣ ለኢትዮጵያ ገበያ እና ከዚያ በላይ የተሟላ ዲጂታል መፍትሄዎችን እናቀርባለን።',
      trustAria: 'ዋና የመታመኛ ነጥቦች',
      panelAria: 'ዋና የአገልግሎት ምሰሶዎች',
      trust: {
        telebirr: 'Telebirr እና Chapa ውህደት',
        multilingual: 'ባለብዙ ቋንቋ የምርት ቡድኖች',
        launchSupport: 'የማስጀመሪያ ድጋፍ ተካቷል',
      },
      stats: {
        projects: 'የተፈጸሙ ፕሮጀክቶች',
        clients: 'ንቁ ደንበኞች',
        satisfaction: 'የደንበኛ እርካታ',
      },
      panelLabel: 'ዋና መፍትሄዎች',
      cards: {
        web: {
          title: 'ዌብ ልማት',
        },
        mobile: {
          title: 'ሞባይል መተግበሪያዎች',
        },
        saas: {
          title: 'SaaS መፍትሄዎች',
        },
      },
    },
    about: {
      header: {
        tag: 'ስለ እኛ',
        title: 'ብራንድዎን በተሟላ ዲጂታል መፍትሄዎች እናጎለብታለን',
      },
      cards: {
        who: {
          title: 'እኛ ማን ነን',
        },
        what: {
          title: 'ምን እንሰራለን',
        },
        market: {
          title: 'ለአካባቢያዊ እና ለዓለም አቀፍ ገበያ የተገነባ',
        },
      },
    },
    services: {
      header: {
        tag: 'አገልግሎቶቻችን',
        title: 'ተሟላ ዲጂታል መፍትሄዎች',
      },
      cards: {
        web: {
          title: 'የዌብ ዲዛይን እና ልማት',
        },
        mobile: {
          title: 'የሞባይል መተግበሪያ ልማት',
        },
        saas: {
          title: 'SaaS ክላውድ መፍትሄዎች',
        },
        additional: {
          title: 'ብራንዲንግ እና ተጨማሪ',
        },
      },
    },
    roi: {
      title: 'ከመወሰንዎ በፊት የገቢ ተፅዕኖን ይገምቱ',
    },
    testimonials: {
      header: {
        tag: 'ምስክርነቶች',
        title: 'ደንበኞቻችን የሚሉት',
      },
      rating: '5.0 ደረጃ',
    },
    process: {
      header: {
        tag: 'የስራ ሂደታችን',
        title: 'እንዴት እንሰራለን',
      },
      steps: {
        discovery: {
          title: 'ግኝት',
        },
        design: {
          title: 'ዲዛይን',
        },
        develop: {
          title: 'ልማት',
        },
        deploy: {
          title: 'ማስጀመር',
        },
      },
    },
    portfolio: {
      header: {
        tag: 'ስራችን',
        title: 'የተመረጡ ፕሮጀክቶች',
      },
      comingSoon: 'ሙሉ የፖርትፎሊዮ ገፅ በቅርቡ ይገኛል።',
    },
    contact: {
      header: {
        tag: 'ያግኙን',
        title: 'ፕሮጀክትዎን እንጀምር',
      },
      form: {
        title: 'መልእክት ይላኩልን',
        fullName: 'ሙሉ ስም',
        email: 'የኢሜይል አድራሻ',
        message: 'መልእክትዎ',
        submit: 'መልእክት ላክ',
      },
    },
    bottomCta: {
      title: 'ንግድዎን ለመቀየር ዝግጁ ነዎት?',
    },
  },
  caseStudies: {
    hero: {
      title: 'የስራ ጥናቶች',
    },
  },
  portfolio: {
    hero: {
      title: 'ፖርትፎሊዮ',
    },
    actions: {
      viewPlaybook: 'የኢንዱስትሪ መመሪያ ይመልከቱ',
      viewRelated: 'ተዛማጅ ስራ ይመልከቱ',
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
    caseStudies: 'Qo annoo Hojii',
    portfolio: 'Portfolio',
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
  home: {
    hero: {
      badge: "Tarree tajaajilaa 2026 qophaa'eera",
      title: 'Marsariitii gaarii saffisaan ijaaraa',
      subtitle: 'Marsariitii bareedaa irraa kaasee hanga SaaS guddaadhaatti, furmaata dijitaalaa guutuu Itoophiyaa fi alaaf ni dhiyeessina.',
      trustAria: 'Qabxiilee amanamummaa ijoo',
      panelAria: 'Furmaata ijoo tajaajilaa',
      trust: {
        telebirr: 'Walitti hidhamiinsa Telebirr fi Chapa',
        multilingual: 'Gareewwan oomishaa afaan hedduu',
        launchSupport: 'Deeggarsa eegalchiisa dabalameera',
      },
      stats: {
        projects: 'Pirojektoota xumuraman',
        clients: 'Maamiltoota hojii irra jiran',
        satisfaction: 'Qulqullina maamilaa',
      },
      panelLabel: 'Furmaata Ijoo',
      cards: {
        web: {
          title: 'Misooma Web',
        },
        mobile: {
          title: 'Appii Moobaayilaa',
        },
        saas: {
          title: 'Furmaata SaaS',
        },
      },
    },
    about: {
      header: {
        tag: "Waa'ee keenya",
        title: 'Furmaata dijitaalaa guutuun maqaa keessan ni cimsina',
      },
      cards: {
        who: {
          title: 'Nu eenyu',
        },
        what: {
          title: 'Maal hojjanna',
        },
        market: {
          title: 'Gabaa biyya keessaa fi addunyaaf ijaarame',
        },
      },
    },
    services: {
      header: {
        tag: 'Tajaajiloota keenya',
        title: 'Furmaata Dijitaalaa Guutuu',
      },
      cards: {
        web: {
          title: 'Dizaayinii fi Misooma Web',
        },
        mobile: {
          title: 'Misooma Appii Moobaayilaa',
        },
        saas: {
          title: 'Furmaata SaaS Cloud',
        },
        additional: {
          title: 'Branding fi Dabalataa',
        },
      },
    },
    roi: {
      title: 'Utuu hin murteessin buʼaa galii tilmaami',
    },
    testimonials: {
      header: {
        tag: 'Ragaa Maamilaa',
        title: 'Maamiltoonni keenya maal jedhu',
      },
      rating: 'Sadarkaa 5.0',
    },
    process: {
      header: {
        tag: 'Adeemsa keenya',
        title: 'Akkaataa itti hojjennu',
      },
      steps: {
        discovery: {
          title: 'Qorannoo',
        },
        design: {
          title: 'Dizaayinii',
        },
        develop: {
          title: 'Misooma',
        },
        deploy: {
          title: 'Eegalchiisa',
        },
      },
    },
    portfolio: {
      header: {
        tag: 'Hojii keenya',
        title: 'Pirojektoota filatamoo',
      },
      comingSoon: 'Fuulli portfolio guutuun yeroo dhiyootti ni dhufa.',
    },
    contact: {
      header: {
        tag: 'Nu qunnamaa',
        title: 'Pirojektii keessan haa jalqabnu',
      },
      form: {
        title: 'Ergaa nuuf ergaa',
        fullName: 'Maqaa guutuu',
        email: 'Imeelii',
        message: 'Ergaa keessan',
        submit: 'Ergaa Ergi',
      },
    },
    bottomCta: {
      title: 'Daldala keessan jijjiiruuf qophaaʼaa?',
    },
  },
  caseStudies: {
    hero: {
      title: "Qo'annoolee Hojii",
    },
  },
  portfolio: {
    hero: {
      title: 'Portfolio',
    },
    actions: {
      viewPlaybook: 'Kitaaba Qajeelfamaa Industirii ilaali',
      viewRelated: 'Hojii wal-fakkaataa ilaali',
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
    loadingMarketingAddons: 'የማርኬቲንግ ተጨማሪዎች በመጫን ላይ...',
    loadingCloudPlatforms: 'የክላውድ መድረኮች በመጫን ላይ...',
    loadingServices: 'አገልግሎቶች በመጫን ላይ...',
    loadingFeaturedAddons: 'ተመራጭ ተጨማሪዎች በመጫን ላይ...',
  },
  theme: {
    switchLight: 'ወደ ብርሃን ሁነታ ቀይር',
    switchDark: 'ወደ ጨለማ ሁነታ ቀይር',
    light: 'ብርሃን ሁነታ',
    dark: 'ጨለማ ሁነታ',
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
      caseStudies: 'ሰላም NovaTech፣ የእናንተን የስራ ጥናቶች አይቻለሁ እና ተመሳሳይ ውጤት ስለማግኘት ልወያይ እፈልጋለሁ።',
      portfolio: 'ሰላም NovaTech፣ ፖርትፎሊዮዎን እመለከታለሁ እና ለኢንዱስትሪዬ ምክር እፈልጋለሁ።',
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
      title: 'የ2026 የዋጋ መመሪያችንን ያግኙ',
      subtitle: 'የልማት፣ የዲጂታል ማርኬቲንግ እና SaaS ፓኬጆችን ከሙሉ ETB ዋጋ ጋር ያውርዱ።',
      submitLabel: 'የዋጋ መመሪያ አውርድ',
      successTitle: 'እናመሰግናለን!',
      successSubtitle: 'መመሪያው በአዲስ ታብ ተከፍቷል። ከታች ደግሞ መክፈት ይችላሉ።',
      successPrimaryLabel: 'እንደገና ክፈት',
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
  home: {
    hero: {
      cards: {
        web: {
          text: 'በሁሉም መሳሪያዎች ላይ ፍጥነትና ቅየራ የተመቻቸ ዘመናዊ ብጁ ድር ጣቢያዎች።',
        },
        mobile: {
          text: 'ከኦፍላይን-መጀመሪያ አርክቴክቸር እና የአካባቢ ክፍያ ውህደቶች ጋር የiOS እና Android መተግበሪያዎች።',
        },
        saas: {
          text: 'ለትምህርት ቤቶች፣ ሆስፒታሎች እና ሪል እስቴት ድርጅቶች ኪራይ ላይ የሚውሉ የክላውድ ስርዓቶች።',
        },
      },
    },
    about: {
      header: {
        subtitle: 'በመለኪያ የሚለካ እድገት የሚያመጡ ዘመናዊ ልማት፣ በመረጃ የተመራ ማርኬቲንግ እና ስኬላብል SaaS መድረኮች።',
      },
      cards: {
        who: {
          text: 'በከፍተኛ የዌብ አዋቂነት፣ በመድረክ-አቋራጭ የሞባይል ልማት እና በኢንተርፕራይዝ የሶፍትዌር መፍትሄዎች የምንሰራ ዋና የቴክኖሎጂ እና የዲጂታል ማርኬቲንግ ኤጀንሲ ነን።',
        },
        what: {
          text: 'ከአካባቢ ስታርትአፕ እስከ ትልቅ ኩባንያ ድረስ ከተለያዩ ደንበኞች ጋር እንሰራለን፣ እና ፓኬጆቻችን ኦፕሬሽንዎን ለማሻሻል የተገነቡ ናቸው።',
        },
        market: {
          text: 'ለኢትዮጵያ ገበያ እና ከዚያ በላይ የተጣጣመ ሶፍትዌር እንገነባለን። የብዙ ቋንቋ ድጋፍ እና የTelebirr/Chapa/CBE Birr ውህደት እናቀርባለን።',
        },
      },
    },
    services: {
      header: {
        subtitle: 'ዲጂታል መገኘትዎን ለመጀመር፣ ለማሳደግ እና ለመግዛት የሚያስፈልጉ ሁሉንም ነገር።',
      },
      cards: {
        web: {
          text: 'ከጀማሪ ድር ጣቢያ እስከ የኢንተርፕራይዝ መድረኮች፣ በዘመናዊ ቴክኖሎጂ የተገነባ መፍትሄ።',
        },
        mobile: {
          text: 'በFlutter እና React Native የተገነቡ የiOS እና Android መተግበሪያዎች።',
        },
        saas: {
          text: 'ለትምህርት ቤቶች፣ ሆስፒታሎች እና ሪል እስቴት የኪራይ ስርዓት መፍትሄዎች።',
        },
        additional: {
          text: 'ሎጎ ዲዛይን፣ ፎቶግራፊ፣ ኮፒራይቲንግ፣ ዶሜይን ሆስቲንግ እና ዓመታዊ ጥገና ፓኬጆች።',
        },
      },
    },
    roi: {
      subtitle: 'በተለመደው የሊድ እና የመቀየር መረጃዎ ላይ ተመስርተው የእድገት ግምት ያድርጉ።',
    },
    testimonials: {
      header: {
        subtitle: 'ከእኛ የተሻለ የሚናገሩት ከእኛ ጋር የሰሩ ድርጅቶች ናቸው።',
      },
      items: [
        {
          quote: 'NovaTech የእኛን የመስመር ላይ መገኘት ሙሉ በሙሉ ቀይሯል። ድር ጣቢያችን በ3x ፍጥነት ይጫናል እና ቅየራ በ40% ጨምሯል።',
          role: 'CEO, Habesha Brands',
        },
        {
          quote: 'ለትምህርት ቤታችን የተገነባው የSaaS መድረክ ከተገኝነት እስከ ውጤት ሪፖርት ድረስ ሂደቶችን አቀላጥፏል።',
          role: 'Director, Bright Future Academy',
        },
        {
          quote: 'Telebirr የተዋሃደበት የሞባይል መተግበሪያቸው ለዴሊቨሪ አገልግሎታችን ትልቅ ለውጥ አመጣ።',
          role: 'Founder, QuickDeliver ET',
        },
      ],
    },
    process: {
      header: {
        subtitle: 'ፕሮጀክትዎን ከሀሳብ እስከ ማስጀመር የሚያደርስ የ4 እርምጃ የተረጋገጠ ሂደት።',
      },
      steps: {
        discovery: {
          text: 'ንግድዎን፣ ግቦችዎን እና ተወዳዳሪዎችን እንመርምራለን።',
        },
        design: {
          text: 'ለብራንድዎ ተስማሚ ዋይርፍሬሞች እና ከፍተኛ ጥራት ሞክአፕ እንሰራለን።',
        },
        develop: {
          text: 'በዘመናዊ ፍሬምወርኮች ንፁህ እና ስኬላብል ኮድ እንገነባለን።',
        },
        deploy: {
          text: 'በመተማመን እንለቃለን። ሆስቲንግ፣ SEO እና ቀጣይ ድጋፍ እንሰጣለን።',
        },
      },
    },
    portfolio: {
      header: {
        subtitle: 'በኢትዮጵያ እና ከዚያ በላይ ለቢዝነሶች የሰራናቸው የዲጂታል ልምዶች ናሙና።',
      },
      cards: {
        web: {
          tag: 'የዌብ መድረክ',
          title: 'ኢ-ኮሜርስ ማርኬትፕሌስ',
          text: 'ከChapa ክፍያ ውህደት እና የአማርኛ ድጋፍ ጋር የባለብዙ ሻጭ መድረክ።',
        },
        mobile: {
          tag: 'ሞባይል መተግበሪያ',
          title: 'የዴሊቨሪ አገልግሎት መተግበሪያ',
          text: 'በቀጥታ መከታተያ እና Telebirr ክፍያ ያለው መተግበሪያ።',
        },
        saas: {
          tag: 'SaaS መድረክ',
          title: 'የትምህርት ቤት አስተዳደር ስርዓት',
          text: 'ለ50+ ትምህርት ቤቶች የሚያገለግል የክላውድ ERP ስርዓት።',
        },
      },
      comingSoon: 'በዝርዝር የስራ ጥናት ያለው ሙሉ ፖርትፎሊዮ ገጽ በቅርቡ ይመጣል።',
    },
    contact: {
      header: {
        subtitle: 'ፕሮጀክት ካለዎት መልእክት ይላኩ፣ በ24 ሰዓት ውስጥ እንመልሳለን።',
      },
      form: {
        fullNamePlaceholder: 'ሀና በቀለ',
        emailPlaceholder: 'team@company.et',
        messagePlaceholder: 'ስለ ፕሮጀክትዎ ይንገሩን...',
        feedback: {
          sent: 'እናመሰግናለን። መልእክትዎ ተልኳል እና ቡድናችን በ24 ሰዓት ውስጥ ይመልሳል።',
          fallback: 'API ጋር መገናኘት አልተቻለም፣ ስለዚህ የኢሜይል መተግበሪያዎን ከፍተናል።',
          error: 'እባክዎ ስም፣ ኢሜይል እና መልእክትዎን ያረጋግጡ እና ድጋሚ ይሞክሩ።',
          sending: 'ጥያቄዎን በደህንነት ወደ API በመላክ ላይ...',
          idle: 'አብዛኛውን ጊዜ በአንድ የስራ ቀን ውስጥ እንመልሳለን።',
        },
      },
    },
    bottomCta: {
      subtitle: 'ለእርስዎ ተስማሚ ፓኬጅ ለማግኘት የ2026 ሙሉ የአገልግሎት እና ዋጋ መመሪያችንን ያውርዱ።',
    },
  },
  caseStudies: {
    hero: {
      subtitle: 'በቅድሚያ እና በኋላ የሚለኩ ውጤቶችን የሚያሳዩ እውነተኛ የማቅረቢያ ታሪኮች።',
    },
    header: {
      tag: 'የደንበኛ ውጤቶች',
      title: 'ተለክቷ የተመዘገበ ተፅዕኖ',
      subtitle: 'እያንዳንዱ የስራ ጥናት የቢዝነስ አውድ፣ የአፈጻጸም መንገድ እና የተለኩ ውጤቶችን ያቀርባል።',
    },
    delivery: 'ማቅረቢያ',
    labels: {
      challenge: 'ችግኝ',
      solution: 'መፍትሄ',
      stack: 'ቴክ ስታክ',
    },
    items: {
      'habesha-marketplace': {
        title: 'የHabesha Marketplace ዳግም መድረክ',
        industry: 'ኢ-ኮሜርስ',
        summary: 'ፍጥነት፣ ቼክአውት እና ባለሁለት ቋንቋ UX ላይ ያተኮረ የባለብዙ ሻጭ ማርኬትፕሌስ ሽግግር።',
        challenge: 'የቀድሞ ስቶርፍሮንት የሞባይል ፍጥነት ዝቅተኛ እና የቼክአውት ጨርስ መጠን ዝቅተኛ ነበር።',
        solution: 'በVite React ዳግም ተገንብቶ የቼክአውት ፍሰቶች ተሻሽለው Chapa ውህደት ተፈጥሯል።',
        timeline: '10 ሳምንት',
        results: [
          { label: 'የገጽ ፍጥነት ውጤት', delta: '+116%' },
          { label: 'የቼክአውት ቅየራ', delta: '+117%' },
          { label: 'የተተወ ጋሪ መመለስ', delta: '+14 ነጥብ' },
        ],
        testimonial: 'እንደገና መለቀቁ በአንድ ሩብ ውስጥ እራሱን አከፍሏል እና ለስኬል እምነት ሰጠን።',
      },
      'bright-future-academy': {
        title: 'የBright Future Academy SaaS ማስጀመሪያ',
        industry: 'ትምህርት',
        summary: 'የትምህርት ቤት አስተዳደር መድረክ ከተገኝነት እና ውጤት እስከ የወላጅ ግንኙነት።',
        challenge: 'በክፍሎች መካከል የተበታተነ መረጃ እና በእጅ ሪፖርት ሂደት።',
        solution: 'በሚና-ተመራ ዳሽቦርድ እና የወላጅ አዘምኖች የተዋቀረ ሞዱላር SaaS ተሰጠ።',
        timeline: '12 ሳምንት',
        results: [
          { label: 'የሪፖርት ዝግጅት ጊዜ', delta: '-84%' },
          { label: 'የዘገየ ክፍያ ስብስብ', delta: '+24 ነጥብ' },
          { label: 'የወላጅ እርካታ', delta: '+26 ነጥብ' },
        ],
      },
      'mercy-health-network': {
        title: 'Mercy Health ዲጂታል መግቢያ',
        industry: 'ጤና',
        summary: 'በብዙ ቋንቋ ድጋፍ የክሊኒክ መግቢያ እና ቀጠሮ ማዘመን።',
        challenge: 'በእጅ ስኬጁሊንግ ምክንያት ረዥም ረድፍ እና የቀጠሮ አለመገኘት።',
        solution: 'ዲጂታል መግቢያ፣ ራስ-ሰር አስታዋሽ እና የክትትል ፍሰቶች ተግባራዊ ተደረጉ።',
        timeline: '9 ሳምንት',
        results: [
          { label: 'አማካይ የመግቢያ ጊዜ', delta: '-62%' },
          { label: 'የአለመታየት መጠን', delta: '-10 ነጥብ' },
          { label: 'የፊት ዴስክ አቅም', delta: '+56%' },
        ],
      },
    },
  },
  portfolio: {
    hero: {
      subtitle: 'በኢንዱስትሪ መርጠው ከንግድ ሞዴልዎ ጋር የሚጣጣሙ ፕሮጀክቶችን ይመልከቱ።',
    },
    header: {
      tag: 'የፕሮጀክት ቤተ-መጽሐፍት',
      title: 'በኢንዱስትሪ ይምረጡ',
      subtitle: 'ከኦፕሬሽንዎ ጋር የሚቀርቡ ምሳሌዎችን ለማተኮር ማጣሪያዎችን ይጠቀሙ።',
    },
    filters: {
      aria: 'የፖርትፎሊዮ የኢንዱስትሪ ማጣሪያዎች',
      all: 'ሁሉም',
      ecommerce: 'ኢ-ኮሜርስ',
      education: 'ትምህርት',
      healthcare: 'ጤና',
      'real-estate': 'ሪል እስቴት',
      logistics: 'ሎጂስቲክስ',
    },
    items: {
      'proj-1': { category: 'የዌብ መድረክ', outcome: 'ከቼክአውት ዳግም ዲዛይን በኋላ ቅየራ በእጥፍ ጨምሯል።' },
      'proj-2': { category: 'SaaS መድረክ', outcome: 'የውጤት ሪፖርት ከቀናት ወደ ሰዓታት ቀንሷል።' },
      'proj-3': { category: 'የኦፕሬሽን መድረክ', outcome: 'የታካሚ መግቢያ ሂደት በ60%+ ተሻሽሏል።' },
      'proj-4': { category: 'CRM እና ሊዝ', outcome: 'በ2,000+ ክፍሎች ላይ የሊዝ እድሳት ፍሰቶች ራስ-ሰር ሆነዋል።' },
      'proj-5': { category: 'ሞባይል መተግበሪያ', outcome: 'የዴሊቨሪ SLA ማሟላት በ31% ጨምሯል።' },
      'proj-6': { category: 'Headless Commerce', outcome: 'ከምክር ፍሰቶች በኋላ AOV በ19% ጨምሯል።' },
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
      addons: {
        tag: 'የማርኬቲንግ ተጨማሪዎች',
        title: 'ወርሃዊ ዲጂታል ማርኬቲንግ ፓኬጆች',
        subtitle: 'ድር ጣቢያዎን ከማርኬቲንግ ፓኬጅ ጋር ያጣምሩ፣ ሊድ ያመነጩ።',
      },
    },
    addons: {
      managementFee: 'የአስተዳደር ክፍያ /ወር',
      adSpend: 'የማስታወቂያ ወጪ',
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
      marketing: {
        tag: 'የመተግበሪያ ማርኬቲንግ',
        title: 'የሞባይል አፕ ዲጂታል ማርኬቲንግ',
        subtitle: 'የመጫኛ ቁጥር ያሳድጉ፣ የስቶር መግለጫን ያሻሽሉ።',
      },
    },
    addons: {
      managementFee: 'የአስተዳደር ክፍያ /ወር',
      cpi: 'CPI',
      adSpend: 'የማስታወቂያ ወጪ',
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
      marketing: {
        title: 'የዲጂታል ማርኬቲንግ ደንቦች',
        intro: 'የዲጂታል ማርኬቲንግ ፓኬጆች በቅድሚያ ወርሃዊ ክፍያ ይሰራሉ።',
        cards: {
          billing: { title: 'ቅድሚያ ወርሃዊ ክፍያ', body: 'የአስተዳደር ክፍያ እና የማስታወቂያ በጀት በወሩ መጀመሪያ ይከፈላሉ።' },
          scaling: { title: 'ተለዋዋጭ ስኬል', body: 'የማስታወቂያ በጀት እንደ ውጤት ወራት ላይ ማስተካከል ይችላሉ።' },
          reporting: { title: 'ግልጽ ሪፖርት', body: 'የወርሃዊ ዝርዝር ሪፖርት በበጀት እና በውጤት ላይ ይሰጣል።' },
        },
        note: {
          title: 'ዓለም አቀፍ ካርድ አስተዳደር:',
          body: 'የውጭ ካርድ ካልኖረ የad spend ክፍያ በእኛ በ15-20% አስተዳደር ክፍያ እናስኬዳለን።',
        },
      },
      saas: {
        title: 'የSaaS የደንበኝነት ደንቦች',
        intro: 'የክላውድ አስተዳደር ስርዓቶቻችን እነዚህን ደንቦች ይከተላሉ።',
        cards: {
          setup: { title: 'ማስዋቀር እና ስልጠና', body: 'የአንድ ጊዜ ክፍያ ማስተካከል፣ ዳታ ማስገባት እና ስልጠና ያካትታል።' },
          billing: { title: 'የደንበኝነት ክፍያ', body: 'ወርሃዊ ወይም ዓመታዊ ክፍያ ይምረጡ፣ ዓመታዊ 2 ወር ቅናሽ አለው።' },
          support: { title: 'ድጋፍ እና አዘምን', body: 'ሁሉም ስብስክሪፕሽኖች አዘምን፣ ደህንነት እና ቴክኒክ ድጋፍ ያካትታሉ።' },
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
    loadingMarketingAddons: 'Dabalata marketing feenaa jira...',
    loadingCloudPlatforms: 'Platfoormii cloud feenaa jira...',
    loadingServices: 'Tajaajila feenaa jira...',
    loadingFeaturedAddons: 'Dabalata filatamoo feenaa jira...',
  },
  theme: {
    switchLight: 'Gara haala ifaa jijjiiri',
    switchDark: 'Gara haala dukkanaa jijjiiri',
    light: 'Haala ifaa',
    dark: 'Haala dukkanaa',
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
      caseStudies: 'Akkam NovaTech, case study keessan ilaaleera; buaa walfakkaataa daldala kooaf mariadhuu barbaada.',
      portfolio: 'Akkam NovaTech, portfolio keessan daawwachaa jira; industirii kooaf gorsa barbaada.',
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
      title: 'Qajeelfama Gatii 2026 keenya argadhaa',
      subtitle: 'Gatii ETB guutuu waliin overview misoomaa, marketing dijitaalaa fi pakeejii SaaS buufadhaa.',
      submitLabel: 'Qajeelfama Gatii Buusi',
      successTitle: 'Galatoomaa!',
      successSubtitle: 'Qajeelfamni tab haaraa keessatti banameera. Asii gaditti irra deebitanii banuu dandeessu.',
      successPrimaryLabel: 'Irra Deebiitii Bani',
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
  home: {
    hero: {
      cards: {
        web: { text: 'Marsariitii dhuunfaa tekinooloojii ammayyaan ijaaraman, saffisa fi conversionf fooyya an.' },
        mobile: { text: 'Appii iOS fi Android architecture offline-first fi kaffaltii biyya keessaa waliin.' },
        saas: { text: 'Sirna cloud kiraaf kennamu manneen barnootaa, hospitaalaa fi real estatef.' },
      },
    },
    about: {
      header: {
        subtitle: 'Misooma ammayyaa, marketing data irratti hundaae fi platfoormii SaaS guddachuu danda u.',
      },
      cards: {
        who: {
          text: 'Agency tekinoolojii fi marketing dijitaalaa olaanaa, web architecture, appii moobaayilaa fi software enterprise irratti hojjennu dha.',
        },
        what: {
          text: 'Startup irraa hanga dhaabbata guddaatti maamiltoota garaagaraa waliin hojjanna; pakeejji keenya hojii keessan guddisuuf qophaa an.',
        },
        market: {
          text: 'Furmaata Itoophiyaa fi gabaa addunyaaf tolu ni ijaarra. Deggersa afaan hedduu fi walitti hidhiinsa Telebirr, Chapa, CBE Birr ni kennina.',
        },
      },
    },
    services: {
      header: {
        subtitle: 'Argama dijitaalaa keessan jalqabuuf, guddisuuf fi cimsuuf waan isin barbaachisu hunda.',
      },
      cards: {
        web: { text: 'Marsariitii jalqabaa irraa hanga platfoormii enterprise tekniolojii ammayyaan ijaarame.' },
        mobile: { text: 'Appii iOS fi Android Flutter fi React Native n ijaaraman.' },
        saas: { text: 'Sirna kiraa bulchiinsaaf manneen barnootaa, hospitaalaa fi real estate.' },
        additional: { text: 'Logo design, suuraa, copywriting, domain hosting fi maintenance waggaa.' },
      },
    },
    roi: {
      subtitle: 'Data leads fi conversion ammaa keessaniin buaa guddinaaf tilmaama godhaa.',
    },
    testimonials: {
      header: {
        subtitle: 'Dubbiin keenya qofa miti; daldaltoonni waliin hojjenne maal akka jedhan dhaga aa.',
      },
      items: [
        {
          quote: 'NovaTech argama online keenya guutummaatti jijjiire. Marsariitiin keenya saffisa 3x ta ee fi conversion 40% dabale.',
          role: 'CEO, Habesha Brands',
        },
        {
          quote: 'Platfoormiin SaaS mana barumsaa keenyaaf ijaarame adeemsa hojii keenya hunda salphise.',
          role: 'Director, Bright Future Academy',
        },
        {
          quote: 'Appiin moobaayilaa Telebirr waliin walitti hidhame tajaajila keenyaaf jijjiirama guddaa fide.',
          role: 'Founder, QuickDeliver ET',
        },
      ],
    },
    process: {
      header: {
        subtitle: 'Adeemsa tarkaanfii 4 pirojektii yaada irraa hanga launch geessu.',
      },
      steps: {
        discovery: { text: 'Daldala, kaayyoo, maamilaa fi dorgommii keessan ni qoranna.' },
        design: { text: 'Wireframe fi mockup sadarkaa olaanaa maqaa keessaniif ni qopheessina.' },
        develop: { text: 'Code qulqulluu fi scale godhamu framework ammayyaan ni ijaarra.' },
        deploy: { text: 'Amanamummaadhaan ni eegalna; hosting, SEO fi deeggarsa itti fufiinsa ni kennina.' },
      },
    },
    portfolio: {
      header: {
        subtitle: 'Muuxannoo dijitaalaa daldala Itoophiyaa fi alaaaf ijaarre keessaa muraasa.',
      },
      cards: {
        web: {
          tag: 'Platfoormii Web',
          title: 'Marketplace E-Commerce',
          text: 'Platfoormii multi-vendor Chapa kaffaltii fi deggersa afaan Amaaraa waliin.',
        },
        mobile: {
          tag: 'Appii Moobaayilaa',
          title: 'Appii Tajaajila Geejjibaa',
          text: 'Appii tracking live fi kaffaltii Telebirr waliin.',
        },
        saas: {
          tag: 'Platfoormii SaaS',
          title: 'Sirna Bulchiinsa Mana Barumsaa',
          text: 'ERP cloud manneen barnootaa 50+ tajaajilu.',
        },
      },
      comingSoon: 'Fuulli portfolio guutuu case study balinaa waliin yeroo dhiyootti ni dhufa.',
    },
    contact: {
      header: {
        subtitle: 'Yoo pirojektii qabdan ergaa nuuf dhiyeessaa; sa a 24 keessatti ni deebina.',
      },
      form: {
        fullNamePlaceholder: 'Hana Bekele',
        emailPlaceholder: 'team@company.et',
        messagePlaceholder: 'Waa ee pirojektii keessanii nuu himaa...',
        feedback: {
          sent: 'Galatoomaa. Ergaan keessan galmaaheera; gareen keenya sa a 24 keessatti ni deebisa.',
          fallback: 'API ga uu hin dandeenye; kanaaf appii imeelii banuun gaaffii xumurra.',
          error: 'Maqaa, imeelii fi ergaa mirkaneessaa; itti aansee yaali.',
          sending: 'Gaaffii keessan karaa API nageenyaa ergaa jirra...',
          idle: 'Yeroo baayyee guyyaa hojii tokko keessatti ni deebina.',
        },
      },
    },
    bottomCta: {
      subtitle: 'Pakeejii sirrii filachuuf qajeelfama tajaajilaa fi gatii 2026 guutuu buufadhaa.',
    },
  },
  caseStudies: {
    hero: {
      subtitle: 'Seenaa hojii dhugaa buaa duraa fi boodaa safaramuun mul atan.',
    },
    header: {
      tag: 'Buaa Maamilaa',
      title: 'Dhiibbaa Safarame',
      subtitle: 'Case study hundi haala daldalaa, karaa hojii fi buaa lakkoofsaan ni agarsiisa.',
    },
    delivery: 'Yeroo geessii',
    labels: {
      challenge: 'Rakkoo',
      solution: 'Furmaata',
      stack: 'Stack',
    },
    items: {
      'habesha-marketplace': {
        title: 'Habesha Marketplace Replatform',
        industry: 'E-commerce',
        summary: 'Jijjiirama marketplace multi-vendor saffisa fi checkout irratti xiyyeeffate.',
        challenge: 'Storefront duraanii saffisa moobaayilaa gadi aanaa fi checkout xiqqaa qaba ture.',
        solution: 'Storefront Vite Reactn ijaarree checkout fooyyesinee Chapa walitti hidhame dabalne.',
        timeline: 'Torban 10',
        results: [
          { label: 'Saffisa Fuulaa', delta: '+116%' },
          { label: 'Checkout Conversion', delta: '+117%' },
          { label: 'Cart Deebisuu', delta: '+14 pts' },
        ],
      },
      'bright-future-academy': {
        title: 'Bright Future Academy SaaS Rollout',
        industry: 'Barnoota',
        summary: 'Platfoormii bulchiinsa mana barumsaa attendance, grading fi walqunnamtii maatii waliin.',
        challenge: 'Reporting harkaan fi records gargar ciccitan.',
        solution: 'SaaS modular dashboard role-based fi update maatii ofumaan geessu diriirsine.',
        timeline: 'Torban 12',
        results: [
          { label: 'Yeroo Qopheessa Reportii', delta: '-84%' },
          { label: 'Walitti Qabuu Kaffaltii Dheeraa', delta: '+24 pts' },
          { label: 'Qulqullina Maatii', delta: '+26 pts' },
        ],
      },
      'mercy-health-network': {
        title: 'Mercy Health Digital Intake',
        industry: 'Fayyaa',
        summary: 'Intake fi appointment dijitaalaa deggersa afaan hedduu waliin.',
        challenge: 'Hiriira dheeraa fi no-show baay ee scheduling harkaan irraa ka e.',
        solution: 'Intake dijitaalaa, yaadachiisa ofumaan fi workflow follow-up hojiirra oolche.',
        timeline: 'Torban 9',
        results: [
          { label: 'Yeroo Intake Giddugaleessa', delta: '-62%' },
          { label: 'No-Show Rate', delta: '-10 pts' },
          { label: 'Bu aalee Front Desk', delta: '+56%' },
        ],
      },
    },
  },
  portfolio: {
    hero: {
      subtitle: 'Industiriidhaan calalanii pirojektootaa fi pattern architecture daldala keessaniif barbaachisan ilaalaa.',
    },
    header: {
      tag: 'Kuusaa Pirojektii',
      title: 'Industiriidhaan Calali',
      subtitle: 'Misaalota hojii keessaniif dhihoo ta an irratti xiyyeeffachuuf filter fayyadamaa.',
    },
    filters: {
      aria: 'Filter industirii portfolio',
      all: 'Hunda',
      ecommerce: 'E-commerce',
      education: 'Barnoota',
      healthcare: 'Fayyaa',
      'real-estate': 'Real Estate',
      logistics: 'Loojistikii',
    },
    items: {
      'proj-1': { category: 'Platfoormii Web', outcome: 'Checkout redesign booda conversion dachaan dabale.' },
      'proj-2': { category: 'Platfoormii SaaS', outcome: 'Reporting grade guyyoota irraa gara sa aa dhufe.' },
      'proj-3': { category: 'Platfoormii Operations', outcome: 'Cycle intake patient 60% ol fooyya e.' },
      'proj-4': { category: 'CRM fi Leasing', outcome: 'Workflow renewal lease unit 2,000+ irratti ofumaan ta e.' },
      'proj-5': { category: 'Appii Moobaayilaa', outcome: 'SLA geejjibaa 31% dabale.' },
      'proj-6': { category: 'Headless Commerce', outcome: 'AOV recommendation booda 19% dabale.' },
    },
  },
  industry: {
    notFound: {
      title: 'Fuulli industirii kanaa amma hin jiru',
      subtitle: 'Playbook industirii kana ijaaruu irratti jirra. Yeroo kana portfolio guutuu ilaalaa.',
      action: 'Gara Portfolio deemi',
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
      addons: {
        tag: 'Dabalata Marketing',
        title: 'Pakeejjii Marketing Dijitaalaa Jihaa',
        subtitle: 'Marsariitii kee marketing waliin qindeesii leads fi traffic dabali.',
      },
    },
    addons: {
      managementFee: 'Kaffaltii bulchiinsaa /ji a',
      adSpend: 'Baasi beeksisaa',
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
      marketing: {
        tag: 'Marketing Appii',
        title: 'Marketing Dijitaalaa Appii Moobaayilaa',
        subtitle: 'Install dabali, listing store fooyyessi, base fayyadamaa guddisi.',
      },
    },
    addons: {
      managementFee: 'Kaffaltii bulchiinsaa /ji a',
      cpi: 'CPI',
      adSpend: 'Baasi beeksisaa',
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
      marketing: {
        title: 'Seera Marketing Dijitaalaa',
        intro: 'Pakeejjiin marketing dijitaalaa hundi prepaid jihaa ta ee ni hojjeta.',
        cards: {
          billing: { title: 'Billing Prepaid Jihaa', body: 'Kaffaltii bulchiinsaa fi budget ad spend jalqaba ji aatti dursanii ni kaffalamu.' },
          scaling: { title: 'Scaling laafaa', body: 'Ad spend jihaan ol yookaan gadi sirreessuu dandeessu; ROI irratti gorsa ni kennina.' },
          reporting: { title: 'Reporting ifaa', body: 'Jihaan report balinaa baasi fi performance agarsiisu ni argattu.' },
        },
        note: {
          title: 'Qabannaa kaardii idil-addunyaa:',
          body: 'Yoo kaardii Visa/Mastercard hin qabne ad spend bakka keessan kaffaluu dandeenya; kaffaltii bulchiinsaa 15-20% ni jiraata.',
        },
      },
      saas: {
        title: 'Seera Subscription SaaS',
        intro: 'Sirnoonni cloud keenya (SMS, HMS, PMS) seerota armaan gadii irratti kennamu.',
        cards: {
          setup: { title: 'Setup fi Training', body: 'Kaffaltiin yeroo tokkoo setup, migration data fi leenjii hojjettootaa guutuu of keessaa qaba.' },
          billing: { title: 'Kaffaltii Subscription', body: 'Kaffaltii jihaa yookaan waggaa filadhaa; waggaan discount ji a lama qaba.' },
          support: { title: 'Deeggarsa fi Update', body: 'Subscription hundi update itti fufiinsa, patch nageenyaa, backup fi deeggarsa teknikaa ni qaba.' },
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
    description: 'AI-first አውቶሜሽን ኮንሰልታንሲ፣ ብጁ ኤጀንቲክ ዎርክፍሎዎች፣ የግል ሞዴል ዲፕሎይመንት እና አስተማማኝ የኦፕሬሽን አፈጻጸም ላይ ያተኮረ።',
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
      caseStudies: 'ሰላም NovaTech AI፣ የእናንተን ውጤቶች አይቻለሁ፣ ተመሳሳይ Automation ROI ለቡድናችን ማስተካከል እፈልጋለሁ።',
      portfolio: 'ሰላም NovaTech AI፣ አርክቴክቸር ሞዴሎቻችሁን እመለከታለሁ እና ለኢንዱስትሪያችን መመሪያ እፈልጋለሁ።',
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
  home: {
    contact: {
      form: {
        emailPlaceholder: 'team@company.et (ለምሳሌ)',
      },
    },
    testimonials: {
      items: [
        {
          quote: 'NovaTech የእኛን የመስመር ላይ መገኘት በሙሉ ቀይሯል። አዲሱ ድር ጣቢያችን በ3x ፍጥነት እየተጫነ ቅየራ በ40% ጨምሯል።',
          role: 'ዋና ሥራ አስኪያጅ, Habesha Brands',
        },
        {
          quote: 'ለትምህርት ቤታችን የተገነባው የSaaS መድረክ ከተገኝነት እስከ ውጤት ሪፖርት ድረስ ሁሉንም አስቀላጥፏል።',
          role: 'ዳይሬክተር, Bright Future Academy',
        },
        {
          quote: 'Telebirr የተዋሃደበት የሞባይል መተግበሪያቸው ለእኛ የዴሊቨሪ አገልግሎት ትልቅ ለውጥ አምጥቷል።',
          role: 'መስራች, QuickDeliver ET',
        },
      ],
    },
  },
  industry: {
    header: {
      tag: 'የኢንዱስትሪ መመሪያ',
      title: 'የተለመዱ ችግኝና የማቅረቢያ ሞዴል',
    },
    notFound: {
      subtitle: 'ይህን የኢንዱስትሪ መመሪያ አሁንም በመገንባት ላይ ነን።',
      action: 'ወደ ፖርትፎሊዮ ይሂዱ',
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
    portfolio: 'Portifooliyoo',
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
    description: 'AI-first automation consultancy kan agentic workflows dhuunfaa, private model deployments fi execution layers hojii irratti xiyyeeffatan ijaaru.',
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
      caseStudies: 'Akkam NovaTech AI, outcomes keessan ilaaleera; automation ROI walfakkaataa garee keenyaaf madaalu barbaada.',
      portfolio: 'Akkam NovaTech AI, architecture patterns keessan ilaalaa jira; industirii keenyaaf gorsa barbaada.',
      instantQuote: 'Akkam NovaTech AI, automation brief guutaa jira; scope fi budget mirkaneessuuf gargaarsa barbaada.',
      bookCall: 'Akkam NovaTech AI, yeroo workflow audit call fi agenda filachuuf gargaarsa barbaada.',
      policy: 'Akkam NovaTech AI, deployment, security fi seera operations irratti gaaffii qaba.',
      default: 'Akkam NovaTech AI, workflows harkaan hojjetaman gara agentic systems dhuunfaatti jijjiiruuf marii barbaada.',
    },
  },
  caseStudies: {
    labels: {
      stack: 'Teek Staakii',
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
  home: {
    contact: {
      form: {
        fullNamePlaceholder: 'Hana Bekele (fakkeenya)',
        emailPlaceholder: 'team@company.et (fakkeenya)',
      },
    },
    testimonials: {
      items: [
        {
          quote: 'NovaTech argama online keenya guutummaatti jijjiire. Marsariitiin haaraan saffisa 3x qabaatee conversion 40% dabale.',
          role: 'Hogganaa Olaanaa, Habesha Brands',
        },
        {
          quote: 'Platfoormiin SaaS mana barumsaa keenyaaf ijaarame adeemsa attendance irraa hanga report grade salphise.',
          role: 'Daarektaraa, Bright Future Academy',
        },
        {
          quote: 'Appiin moobaayilaa Telebirr waliin walitti hidhame tajaajila keenyaaf jijjiirama guddaa fide.',
          role: 'Hundeesaa, QuickDeliver ET',
        },
      ],
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
  portfolio: {
    hero: {
      title: 'Portifooliyoo',
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
