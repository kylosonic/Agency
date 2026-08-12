export const SUPPORTED_LANGUAGES = ['en', 'am', 'om'];

export const LANGUAGE_LABELS = {
  en: 'English',
  am: 'Amharic',
  om: 'Afaan Oromoo',
};

const en = {
  brand: {
    name: 'NovaTech',
  },
  nav: {
    home: 'Home',
    web: 'Web Interfaces',
    mobile: 'Mobile Interfaces',
    saas: 'SaaS Interfaces',
    services: 'Services',
    aiAutomation: 'AI Automation',
    productEngineeringShort: 'Product Engineering',
    explore: 'Explore',
    exploreMenu: 'Explore services and proof',
    workflowAudit: 'Workflow Audit',
    engineering: 'Product Engineering',
    engineeringLinks: 'Product engineering links',
    policy: 'Policy',
    instantQuote: 'Instant Quote',
    // TECH-19 (B34): five-destination nav label delta. Locked keys — the only
    // new nav copy this phase adds. AM/OM values are machine-translated and
    // flagged for the existing native-review gate (NB-09).
    contact: 'Contact',
    startProject: 'Start a project',
    dropdownWeb: 'Web',
    dropdownMobile: 'Mobile',
    dropdownSaas: 'SaaS',
    bookCall: 'Workflow Audit Call',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mobileNavigation: 'Mobile navigation',
  },
  // Band CTA (TECH-15, B27): shared pre-footer near-black CTA band copy.
  // TECH-46 (R-6): band copy re-cut software-first — "Start a Project" is the
  // primary conversion; the audit is no longer the band's headline.
  band: {
    audit: {
      title: 'Tell us what you want to build.',
      subtitle: 'Start a project with scope and budget context — we respond within 1 business day.',
    },
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
  actions: {
    // TECH-35 (S-4): "AI Pricing Guide" → "Pricing Guide" (brand-neutral).
    pricingGuide: 'Pricing Guide',
    downloadPricingGuide: 'Download Pricing Guide',
    downloadFullPricingGuide: 'Download Full Pricing Guide',
    // TECH-36 (A2): BandCta secondary label → "Start Instant Quote".
    startQuote: 'Start Instant Quote',
    // TECH-46 (A7/R-6): the site-wide primary CTA label.
    startProject: 'Start a Project',
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
    // TECH-35 (S-4): software-first phrasing; brand framing no longer names AI.
    description: 'Software-first consultancy delivering web, mobile, and SaaS products, with AI automation where it solves a real bottleneck.',
    company: 'Company',
    connect: 'Connect',
    rights: '© 2026 NovaTech Systems. All rights reserved.',
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
      home: 'Hi NovaTech, I want to identify manual bottlenecks we can automate with custom agents.',
      services: 'Hi NovaTech, I want to discuss which AI solution stack fits our current operations.',
      workflowAudit: 'Hi NovaTech, I want to schedule a workflow audit and review required systems access.',
      pricing: 'Hi NovaTech, I need help selecting the right automation tier and monthly support model.',
      // TECH-36 (S-2): web named as a first-class surface, not a layer of AI.
      web: 'Hi NovaTech, we need a web surface for our internal AI workflows and dashboards.',
      // TECH-36 (S-2): mobile named for its own work, not as an AI shell.
      mobile: 'Hi NovaTech, we need a mobile app for field operations and approvals.',
      saas: 'Hi NovaTech, I want to discuss orchestration and deployment patterns for our SaaS operations.',
      additional: 'Hi NovaTech, I need scoped engineering support around integrations and automation reliability.',
      instantQuote: 'Hi NovaTech, I am completing the automation brief and need help validating scope and budget.',
      bookCall: 'Hi NovaTech, I want support selecting the best workflow audit slot and agenda.',
      policy: 'Hi NovaTech, I have a question about deployment, security, and operating policy terms.',
      default: 'Hi NovaTech, I want to discuss replacing manual workflows with custom agentic systems.',
    },
  },
  leadCapture: {
    closeAria: 'Close pricing guide modal',
    privacy: 'We respect your privacy. No spam, ever.',
    form: {
      fullName: 'Full Name',
      fullNamePlaceholder: 'Sara Tesfaye',
      email: 'Email Address',
      emailPlaceholder: 'sara.tesfaye@example.com',
      company: 'Company (optional)',
      companyPlaceholder: 'Mesob Trading PLC',
      submitting: 'Submitting...',
    },
    pricing_guide: {
      title: 'Get the current NovaTech ETB pricing sheet',
      subtitle: 'Download the current NovaTech pricing sheet built from the same ETB table used on the live site.',
      submitLabel: 'Download Pricing Sheet',
      successTitle: 'Pricing sheet ready',
      successSubtitle: 'Your current NovaTech ETB pricing sheet is open in a new tab. You can also reopen it below.',
      successPrimaryLabel: 'Open Pricing Sheet Again',
    },
    quote_offer: {
      title: 'Get a Tailored Project Estimate',
      subtitle: 'Share your details and continue to our Instant Quote Wizard for a custom estimate range in minutes.',
      submitLabel: 'Continue to Instant Quote',
      successTitle: 'Great, You Are In!',
      successSubtitle: 'Your request was saved. Continue to the quote wizard for your tailored estimate.',
      successPrimaryLabel: 'Open Instant Quote',
      successSla: 'We respond within one business day, schedule your discovery call within three, and deliver a proposal within five business days of discovery.',
    },
    book_call_offer: {
      title: 'Book a Discovery Call',
      subtitle: 'Leave your details and continue to booking. We will prepare a focused strategy agenda for your goals.',
      submitLabel: 'Continue to Booking',
      successTitle: 'Almost Done!',
      successSubtitle: 'Your request was captured. Select your preferred session slot on the booking page.',
      successPrimaryLabel: 'Open Booking Page',
      successSla: 'We respond within one business day, schedule your discovery call within three, and deliver a proposal within five business days of discovery.',
    },
  },
  // TECH-32: verified-dead trees pruned (zero t() consumers — pages are
  // hardcoded EN): `industry.*`, `instantQuote.*`, `web.*`, `mobile.*`,
  // `saas.*`, `additional.*`, `policy.*`, `roi.*`, `faqs.*`, `seo.*`,
  // `common.*`, `states.*`, `band.cta.*`. Live keys: nav, footer, channels,
  // labels, actions, liveChat, leadCapture, discovery (form/booking only),
  // notFound, brand.
  discovery: {
    // DiscoveryCallPage renders its hero/header hardcoded EN; only the form
    // feedback + booking field labels resolve through i18n.
    form: {
      success: 'Thanks. Your booking details were captured and our team will send a calendar invite shortly.',
      sla: 'We respond within one business day, schedule your discovery call within three, and deliver a proposal within five business days of discovery.',
      hint: 'You will receive confirmation by email with next steps and preparation notes.',
    },
    booking: {
      requestedSlot: 'Requested slot',
      agendaLabel: 'Agenda',
    },
  },
  // TECH-48 (Phase 11, R-17): the software-first Home rebuild's copy.
  // Every EN string below has an AM/OM mirror in amContentOverrides /
  // omContentOverrides (machine-translated, flagged NB-09 for native review).
  home: {
    hero: {
      eyebrow: '01 · SOFTWARE',
      title: 'software built around your business.',
      subcopy: 'NovaTech builds custom software, web platforms, mobile applications, SaaS products, and business systems for organizations in Ethiopia and beyond — with AI automation available where it creates real business value.',
      ctaPrimary: 'Start a Project',
      ctaSecondary: 'Discuss Your Software Idea',
      ctaTertiary: 'Explore AI & Automation',
      trustLabel: 'Software anchors from the live ETB table',
      trustWeb: 'Web from 20,000 ETB',
      trustMobile: 'Mobile from 40,000 ETB',
      trustSaas: 'SaaS from 3,500 ETB / month',
    },
    trust: {
      eyebrow: '02 · TRUST',
      title: 'Software-first, priced in the open.',
      subtitle: 'Published ETB prices, milestone billing, and written commitments — no invented metrics.',
      facts: [
        { title: 'Published ETB pricing', text: 'Every build quoted from the live ETB table.' },
        { title: 'Milestone billing 40/30/30', text: 'Pay as the build progresses, not all at once.' },
        { title: '5-day audit delivery', text: 'A usable blueprint within 5 business days.' },
        { title: 'Written support commitment', text: '40 support hours a year, next-business-day response.' },
        { title: '1-business-day response', text: 'Every inquiry answered within one business day.' },
        { title: 'Addis Ababa–based', text: 'Ethiopian engineering, international software standards.' },
      ],
      signalsLabel: 'Signs your business is ready for software',
      signals: [
        { title: 'Manual re-entry is everywhere', text: 'The same order is typed into three disconnected tools.' },
        { title: 'Approvals depend on one person', text: 'Work stops when the owner is away.' },
        { title: 'Customer response speed is too slow', text: 'Leads wait; quoting is trapped in docs.' },
        { title: 'The next build is not clearly scoped', text: 'Teams need software but not which build.' },
      ],
    },
    wwb: {
      eyebrow: '03 · WHAT WE BUILD',
      title: 'Software for the way your business actually runs.',
      subtitle: 'Ten real-world categories — each one replaces manual work with a working system.',
      items: [
        { title: 'Business Management Systems', text: 'Replace the spreadsheet and the paper ledger.' },
        { title: 'Inventory & Logistics Platforms', text: 'Know what is in stock and where it moves.' },
        { title: 'Customer Management Systems', text: 'One view of every customer instead of scattered notes.' },
        { title: 'Financial & Administrative Software', text: 'Track money, approvals, and records in one place.' },
        { title: 'Web Applications', text: 'Portals and dashboards your team and customers actually use.' },
        { title: 'Mobile Applications', text: 'Field work, approvals, and customer flows in your pocket.' },
        { title: 'SaaS Platforms', text: 'Subscription software with billing and accounts built in.' },
        { title: 'E-commerce Platforms', text: 'Sell online with orders and payments connected.' },
        { title: 'Internal Operations Tools', text: 'Stop re-typing data between disconnected tools.' },
        { title: 'AI-Powered Software', text: 'Software that automates repetitive work from your data.' },
      ],
    },
    customSoftware: {
      eyebrow: '04 · CUSTOM SOFTWARE',
      title: 'Business software, built around your operations.',
      subtitle: 'Enterprise systems, internal platforms, and workflow management — scoped from the live ETB table.',
      rows: [
        'Enterprise systems and internal platforms',
        'Workflow management and approvals',
        'Operations platforms for branches and field teams',
        'Customer portals and digital transformation',
        'Integrations that stop data re-entry',
      ],
      link: 'Explore Custom Software Development',
    },
    webMobile: {
      eyebrow: '05 · WEB & MOBILE',
      title: 'Web and mobile products your customers actually use.',
      subtitle: 'Business websites, web apps, portals, dashboards, e-commerce, and native mobile apps — from fixed ETB anchors.',
      webKicker: 'Web',
      webPrice: 'Web from 20,000 ETB',
      webRows: ['Business websites and corporate sites', 'Web applications and portals', 'Dashboards and admin surfaces', 'E-commerce storefronts'],
      webLink: 'Open Web Development',
      mobileKicker: 'Mobile',
      mobilePrice: 'Mobile from 40,000 ETB',
      mobileRows: ['Android and iOS apps', 'Cross-platform business apps', 'Customer-facing apps', 'Workforce and field apps'],
      mobileLink: 'Open Mobile Development',
    },
    businessSystems: {
      eyebrow: '06 · BUSINESS SYSTEMS',
      title: 'The systems behind daily operations.',
      subtitle: 'Inventory, CRM, HR, finance, logistics, school, retail, and industry-specific systems — built as working software, not spreadsheets.',
      rows: ['Inventory and stock control', 'CRM and customer records', 'ERP-style operations systems', 'HR, payroll, and finance', 'Logistics and delivery tracking', 'School management', 'Retail and POS', 'Industry-specific systems'],
      link: 'Explore Business Systems',
    },
    saas: {
      eyebrow: '07 · SAAS & PRODUCT',
      title: 'Subscription software and product engineering.',
      subtitle: 'SaaS platforms, MVPs, and startup products with billing, onboarding, and multi-tenant architecture built in.',
      rows: ['SaaS platforms and multi-tenant products', 'MVP builds for startup products', 'Subscription software with billing and onboarding', 'Product engineering and platform evolution'],
      link: 'Open SaaS Solutions',
    },
    ai: {
      eyebrow: '08 · AI & AUTOMATION',
      title: 'Add intelligence to your software.',
      subtitle: 'Make your software smarter. Add intelligent automation where it actually saves time.',
      pairs: [
        { from: 'Software', to: 'AI assistant' },
        { from: 'Documents', to: 'Automated extraction' },
        { from: 'Customer support', to: 'AI support agent' },
        { from: 'Operations', to: 'Automated workflows' },
        { from: 'Company knowledge', to: 'Searchable AI knowledge base' },
        { from: 'Reporting', to: 'Intelligent analysis' },
      ],
      noteStrong: 'Turn existing business workflows into intelligent systems.',
      note: 'Integrate AI into the software your business already depends on.',
      cta: 'Explore AI & Automation',
    },
    process: {
      eyebrow: '09 · PROCESS',
      title: 'Five steps from first call to running software.',
      subtitle: 'Clear commercial terms and delivery expectations before a build starts.',
      steps: [
        { title: 'Discovery', text: 'Free call. Response within 1 business day, call within 3, proposal within 5 of discovery.' },
        { title: 'Workflow Audit (optional)', text: '15,000 ETB fixed · 5 business days · 100% credited toward the build.' },
        { title: 'Scoped proposal', text: 'A fixed ETB quote from the published table before any build starts.' },
        { title: 'Build', text: 'Milestone billing 40/30/30. Full ownership on final payment.' },
        { title: 'Support & maintenance', text: 'Written commitment: 40 support hours a year, next-business-day response on critical issues.' },
      ],
    },
    selectedWork: {
      eyebrow: '10 · SELECTED WORK',
      title: 'Real products, designed and developed by NovaTech.',
      subtitle: 'Verifiable builds — no invented client claims.',
    },
    caseStudies: {
      stealthOverlay: {
        caption: 'LIVE PRODUCT · STEALTH OVERLAY',
        title: 'Stealth Overlay',
        description: 'AI interview assistant for coding interviews — real-time DSA guidance and problem-solving support during technical interview practice.',
        category: 'AI-powered web application',
        alt: 'Stealth Overlay — live product homepage screenshot',
      },
      rhobotAcademy: {
        caption: 'LIVE PRODUCT · RHOBOT ACADEMY',
        title: 'Rhobot Academy',
        description: 'Amharic-language forex trading course platform — curriculum, student accounts, free registration, instructor-led content.',
        category: 'Learning platform / LMS',
        alt: 'Rhobot Academy — live product homepage screenshot',
      },
    },
    why: {
      eyebrow: '11 · WHY NOVATECH',
      title: 'The reasons are on the pricing page.',
      subtitle: 'Published prices, milestone billing, written commitments, and a response SLA.',
      rows: [
        { title: 'Published ETB pricing', text: 'Web from 20,000, mobile from 40,000, SaaS from 3,500/month — on the site.' },
        { title: 'Milestone billing 40/30/30', text: 'You pay as the build progresses, not all at once.' },
        { title: 'Written support commitment', text: '40 support hours per year plus next-business-day response.' },
        { title: 'Response SLA', text: 'We answer every inquiry within 1 business day.' },
        { title: 'Addis Ababa–based', text: 'Local engineering with international software standards.' },
      ],
    },
    industries: {
      eyebrow: '12 · INDUSTRIES',
      title: 'Systems for the realities of local businesses.',
      subtitle: 'We understand the realities of local businesses and build software around how they actually work.',
      items: [
        { title: 'Inventory & stock control', text: 'Replace the stock spreadsheet and manual counts.' },
        { title: 'Customer management / CRM', text: 'Replace scattered notes and WhatsApp threads.' },
        { title: 'Finance & admin', text: 'Replace the paper ledger and the one-person approval chain.' },
        { title: 'HR & payroll', text: 'Replace manual payroll sheets and disconnected leave records.' },
        { title: 'Logistics & delivery tracking', text: 'Replace phone-call tracking and handwritten manifests.' },
        { title: 'School management', text: 'Replace paper registers, report cards, and fee chasing.' },
        { title: 'Retail & POS', text: 'Replace the notebook sales log and end-of-day reconciliation.' },
        { title: 'Procurement', text: 'Replace disconnected purchase requests and supplier files.' },
      ],
    },
    audit: {
      eyebrow: '13 · AUDIT',
      title: 'Workflow Audit',
      termsDay: '5 business days',
      termsCredit: '100% credited toward the build',
      description: 'Workflow analysis, automation roadmap, system blueprint, and implementation recommendation.',
      guarantee: 'If the audit doesn\u2019t produce a usable blueprint, you don\u2019t pay.',
      ctaBook: 'Book Workflow Audit',
      ctaViewPricing: 'View Live Pricing',
      sideKicker: 'Smart first step',
      sideTitle: 'Unsure which build you need?',
      sideText: 'The audit maps the current process and defines the right build path — its fee is fully credited toward the build that follows.',
    },
    finalCta: {
      eyebrow: '14 · START A PROJECT',
      title: 'Tell us what you want to build.',
      subtitle: 'Your project request was designed to reach us with scope and budget context — we respond within 1 business day.',
      formTitle: 'Project intake',
      quoteKicker: 'Prefer a number now?',
      quoteTitle: 'Use the instant quote tool.',
      quoteText: 'A directional ETB estimate in minutes, without a call.',
      quoteCta: 'Instant Quote Tool',
    },
    intake: {
      confirmation: 'Your project request was received. We\u2019ll respond within 1 business day with next steps.',
      fallbackNote: 'Your request opened in your email client because the contact endpoint is unavailable right now.',
      form: {
        aria: 'Project intake form',
        fullName: 'Full name',
        fullNamePlaceholder: 'Sara Tesfaye',
        email: 'Email address',
        emailPlaceholder: 'sara@example.com',
        phone: 'Phone',
        phonePlaceholder: '+251 9xx xxx xxx',
        company: 'Company (optional)',
        companyPlaceholder: 'Mesob Trading PLC',
        need: 'What do you need?',
        needPlaceholder: 'Select an option',
        needOptions: {
          Website: 'Website',
          Webapplication: 'Web application',
          Mobileapp: 'Mobile app',
          Businesssystem: 'Business system',
          SaaSproduct: 'SaaS product',
          AIautomation: 'AI & automation',
          Notsureyet: 'Not sure yet',
        },
        budget: 'Budget band',
        budgetPlaceholder: 'Select a band',
        notSureBudget: 'Not sure',
        problem: "What's the problem or idea?",
        problemPlaceholder: 'Manual approvals, inventory chaos, a new product, or the system you need to replace.',
        sending: 'Sending...',
        submit: 'Start a Project',
        error: 'We could not save your request. Please verify your details and try again.',
      },
      chat: {
        scope: 'Scope',
        budget: 'Budget band',
        note: 'Note (optional)',
        notePlaceholder: 'What is the problem or idea?',
      },
    },
  },
};

// NATIVE-REVIEW FLAG (NB-09): TECH-39/40/41 added the following NEW strings.
// They are hardcoded EN in the page components (matching the audit-page
// pattern — pages are hardcoded EN; nav/footer/modal use i18n), so they have
// no i18n keys and no AM/OM mirrors yet. Native review + translation required
// before launch:
//   - AuditBookingForm: "Slot held for 48 hours" / "Your invoice and bank
//     transfer (CBE Birr) details arrive by email. Telebirr when activated."
//     / "Human confirmation within 1 business day." / "If the audit doesn't
//     produce a usable blueprint, you don't pay." / "No payment step on this
//     page — the invoice arrives by email with bank transfer details." /
//     "We could not save your booking. Please verify your email and try
//     again." / "Book Workflow Audit" (submit) / "Booking..." / field labels
//     Full Name / Email Address / Phone / Company (optional)
//   - WorkflowAudit #booking: "Book the audit in one step." / "Hold your slot
//     now. Pay by bank transfer after the invoice arrives by email." /
//     "Workflow Audit booking"
//   - SupportPathLinks: "Not ready to book yet?" / "One-tap chat with your
//     scope pre-filled." / "Pick the build scope and budget band; the message
//     opens ready to send." / Scope / Budget band / Note (optional) /
//     "What is the bottleneck you want to solve?" / WhatsApp / Telegram /
//     "Book a free Discovery Call" / prefilled message "I need a [web /
//     mobile / SaaS] build · budget: [band] · [optional note]"
//   - PolicyPage: "Audit guarantee: if the workflow audit doesn't produce a
//     usable blueprint, you don't pay."
// All existing i18n keys retain EN/AM/OM parity.

const amOverrides = {
  nav: {
    home: 'መነሻ',
    web: 'ዌብ',
    mobile: 'ሞባይል',
    saas: 'SaaS',
    services: 'አገልግሎቶች',
    policy: 'ፖሊሲ',
    instantQuote: 'ፈጣን ዋጋ',
    // NATIVE-REVIEW FLAG (NB-09): `nav.contact|startProject|dropdown*` Amharic
    // values below are machine-translated (TECH-19, B34) and require native
    // review before launch. They mirror the locked EN keys 1:1 — no new claims.
    contact: 'አግኙን',
    startProject: 'ፕሮጀክት ጀምር',
    dropdownWeb: 'ዌብ',
    dropdownMobile: 'ሞባይል',
    dropdownSaas: 'SaaS',
    bookCall: 'ጥሪ ያስይዙ',
    openMenu: 'ሜኑ ክፈት',
    closeMenu: 'ሜኑ ዝጋ',
    mobileNavigation: 'የሞባይል አሰሳ',
  },
  // NATIVE-REVIEW FLAG (NB-09): `band.audit.*` Amharic values mirror the
  // re-cut software-first EN keys (TECH-46) — no new claims.
  band: {
    audit: {
      title: 'ምን እንዲገነባልዎ ይንገሩን።',
      subtitle: 'ፕሮጀክትዎን በስፋት እና በበጀት ይጀምሩ — በ1 የስራ ቀን ውስጥ እንመልሳለን።',
    },
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
    startQuote: 'ፈጣን ዋጋ ጀምር',
    // NATIVE-REVIEW FLAG (NB-09): `actions.startProject` machine-translated.
    startProject: 'ፕሮጀክት ጀምር',
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
};

const omOverrides = {
  nav: {
    home: 'Fuula Jalqabaa',
    web: 'Web',
    mobile: 'Moobaayilaa',
    saas: 'SaaS',
    services: 'Tajaajiloota',
    policy: 'Seera',
    instantQuote: 'Qorannoo Gatii',
    // NATIVE-REVIEW FLAG (NB-09): `nav.contact|startProject|dropdown*` Afaan
    // Oromoo values below are machine-translated (TECH-19, B34) and require
    // native review before launch. They mirror the locked EN keys 1:1 — no
    // new claims.
    contact: 'Qunnamtii',
    startProject: 'Piroojektii jalqabi',
    dropdownWeb: 'Web',
    dropdownMobile: 'Moobaayilaa',
    dropdownSaas: 'SaaS',
    bookCall: 'Bilbilaa Qabadhu',
    openMenu: 'Menu banaa',
    closeMenu: 'Menu cufi',
    mobileNavigation: 'Navigaashinii moobaayilaa',
  },
  // NATIVE-REVIEW FLAG (NB-09): `band.audit.*` Afaan Oromoo values mirror the
  // re-cut software-first EN keys (TECH-46) — no new claims.
  band: {
    audit: {
      title: 'Waan ijaarrachuu feetu nutti himi.',
      subtitle: 'Piroojektii kee waliin maal akka barbaaddu fi baajata keetiin jalqabi — guyyaa hojii 1 keessatti deebii kennina.',
    },
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
    startQuote: 'Qorannoo Gatii Jalqabi',
    // NATIVE-REVIEW FLAG (NB-09): `actions.startProject` machine-translated.
    startProject: 'Piroojektii jalqabi',
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
};

const amContentOverrides = {
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
      fullNamePlaceholder: 'ሳራ ተስፋዬ (ለምሳሌ)',
      email: 'የኢሜይል አድራሻ',
      emailPlaceholder: 'sara.tesfaye@example.com (ለምሳሌ)',
      company: 'ኩባንያ (አማራጭ)',
      companyPlaceholder: 'ሜሶብ ንግድ PLC (አማራጭ)',
      submitting: 'በመላክ ላይ...',
    },
    pricing_guide: {
      title: 'የአሁኑን NovaTech ETB የዋጋ ሉህ ያግኙ',
      subtitle: 'በላይቭ ሳይቱ ላይ ከሚጠቀመው ተመሳሳይ ETB ሰንጠረዥ የተሰራውን የአሁኑን NovaTech የዋጋ ሉህ ያውርዱ።',
      submitLabel: 'የዋጋ ሉህ አውርድ',
      successTitle: 'የዋጋ ሉህ ዝግጁ ነው',
      successSubtitle: 'የአሁኑ NovaTech ETB የዋጋ ሉህ በአዲስ ታብ ተከፍቷል። ከታች ደግሞ እንደገና መክፈት ይችላሉ።',
      successPrimaryLabel: 'የዋጋ ሉህን እንደገና ክፈት',
    },
    quote_offer: {
      title: 'ለፕሮጀክትዎ ብጁ ግምት ያግኙ',
      subtitle: 'ዝርዝሮችዎን ያስገቡ እና ወደ ፈጣን የዋጋ መለኪያ ይቀጥሉ።',
      submitLabel: 'ወደ ፈጣን ዋጋ ቀጥል',
      successTitle: 'በጣም ጥሩ!',
      successSubtitle: 'ጥያቄዎ ተመዝግቧል። ለብጁ ግምት ወደ መለኪያው ይቀጥሉ።',
      successPrimaryLabel: 'ፈጣን ዋጋ ክፈት',
      successSla: 'በአንድ የስራ ቀን ውስጥ እንመልሳለን፣ የግኝት ጥሪዎን በሶስት ቀን ውስጥ እንያዝልዎታለን፣ እና ፕሮፖዛልን ከግኝቱ በአምስት የስራ ቀን ውስጥ እናቀርባለን።',
    },
    book_call_offer: {
      title: 'የስትራቴጂ ግኝት ጥሪ ያስይዙ',
      subtitle: 'ዝርዝሮችዎን ያስገቡ እና ወደ ቦታ ማስያዣ ይቀጥሉ።',
      submitLabel: 'ወደ ቦታ ማስያዣ ቀጥል',
      successTitle: 'በቅርቡ ይጠናቀቃል!',
      successSubtitle: 'ጥያቄዎ ተመዝግቧል። በቦታ ማስያዣ ገጽ ተመራጭ ጊዜዎን ይምረጡ።',
      successPrimaryLabel: 'የቦታ ማስያዣ ገጽ ክፈት',
      successSla: 'በአንድ የስራ ቀን ውስጥ እንመልሳለን፣ የግኝት ጥሪዎን በሶስት ቀን ውስጥ እንያዝልዎታለን፣ እና ፕሮፖዛልን ከግኝቱ በአምስት የስራ ቀን ውስጥ እናቀርባለን።',
    },
  },
  // TECH-32: verified-dead AM trees pruned (`roi.*`, `industry.*`,
  // `instantQuote.*`, `web.*`, `mobile.*`, `saas.*`, `additional.*`,
  // `policy.*`, `faqs.*` — zero t() consumers).
  discovery: {
    form: {
      success: 'እናመሰግናለን። የቦታ ማስያዣ ዝርዝሮችዎ ተመዝግበዋል እና ቡድናችን የካሌንደር ግብዣ ይልካል።',
      sla: 'በአንድ የስራ ቀን ውስጥ እንመልሳለን፣ የግኝት ጥሪዎን በሶስት ቀን ውስጥ እንያዝልዎታለን፣ እና ፕሮፖዛልን ከግኝቱ በአምስት የስራ ቀን ውስጥ እናቀርባለን።',
      hint: 'የማረጋገጫ ኢሜይል ከቀጣይ እርምጃዎች ጋር ይደርስዎታል።',
    },
    booking: {
      requestedSlot: 'የተጠየቀ ጊዜ',
      agendaLabel: 'አጀንዳ',
    },
  },
  // NATIVE-REVIEW FLAG (NB-09): `home.*` Amharic values below are
  // machine-translated (TECH-48) and require native review before launch.
  // They mirror the locked EN keys 1:1 — no new claims; prices render
  // identically across languages (R-17).
  home: {
    hero: {
      eyebrow: '01 · ሶፍትዌር',
      titleBefore: 'በንግድዎ ዙሪያ ',
      titleVerb: 'የተገነባ',
      titleAfter: ' ሶፍትዌር።',
      subcopy: 'NovaTech ለኢትዮጵያ እና ከዚያ በላይ ላሉ ድርጅቶች ብጁ ሶፍትዌር፣ ዌብ መድረኮች፣ ሞባይል መተግበሪያዎች፣ SaaS ምርቶች እና የንግድ ስርዓቶችን ይገነባል — AI አውቶሜሽን እውነተኛ የንግድ እሴት በሚፈጥርበት ቦታ ይገኛል።',
      ctaPrimary: 'ፕሮጀክት ጀምር',
      ctaSecondary: 'የሶፍትዌር ሃሳብዎን ይወያዩ',
      ctaTertiary: 'AI እና አውቶሜሽን ያስሱ',
      trustLabel: 'ከላይቭ ETB ሰንጠረዥ የሶፍትዌር መነሻ ዋጋዎች',
      trustWeb: 'Web from 20,000 ETB',
      trustMobile: 'Mobile from 40,000 ETB',
      trustSaas: 'SaaS from 3,500 ETB / month',
    },
    trust: {
      eyebrow: '02 · እምነት',
      title: 'ሶፍትዌር መጀመሪያ፣ ዋጋ ግልጽ።',
      subtitle: 'የታተሙ ETB ዋጋዎች፣ የማዕዘን ክፍያ እና የጽሁፍ ቁርጠኝነት — የተፈጠሩ መለኪያዎች የሉም።',
      facts: [
        { title: 'የታተመ ETB ዋጋ', text: 'እያንዳንዱ ግንባታ ከላይቭ ETB ሰንጠረዥ ይጠቀሳል።' },
        { title: 'የማዕዘን ክፍያ 40/30/30', text: 'ለግንባታው እየተከናወነ ይክፈሉ፣ በአንድ ጊዜ አይደለም።' },
        { title: 'የ5 ቀን ኦዲት አቅርቦት', text: 'በ5 የስራ ቀን ውስጥ የሚሰራ ንድፍ።' },
        { title: 'የጽሁፍ ድጋፍ ቁርጠኝነት', text: 'በዓመት 40 ሰአት ድጋፍ፣ በሚቀጥለው የስራ ቀን ምላሽ።' },
        { title: 'የ1 የስራ ቀን ምላሽ', text: 'እያንዳንዱ ጥያቄ በአንድ የስራ ቀን ውስጥ ይመለሳል።' },
        { title: 'አዲስ አበባ ላይ የተመሰረተ', text: 'የኢትዮጵያ ኢንጂነሪንግ፣ አለም አቀፍ የሶፍትዌር ደረጃዎች።' },
      ],
      signalsLabel: 'ንግድዎ ለሶፍትዌር ዝግጁ መሆኑን የሚያሳዩ ምልክቶች',
      signals: [
        { title: 'በእጅ እንደገና ማስገባት በሁሉም ቦታ ነው', text: 'ተመሳሳይ ትዕዛዝ በሶስት ያልተገናኙ መሳሪያዎች ውስጥ ይተየባል።' },
        { title: 'ማጽደቅ በአንድ ሰው ላይ የተመሰረተ ነው', text: 'ባለቤቱ በሌለበት ጊዜ ስራ ይቆማል።' },
        { title: 'የደንበኛ ምላሽ ፍጥነት በጣም ቀርፋፋ ነው', text: 'መሪዎች ይጠብቃሉ፤ ጥቅሶች በሰነዶች ውስጥ ተይዘዋል።' },
        { title: 'የሚቀጥለው ግንባታ በግልጽ አልተወሰነም', text: 'ቡድኖች ሶፍትዌር ይፈልጋሉ ግን የትኛውን ግንባታ እንደሆነ አይታወቅም።' },
      ],
    },
    wwb: {
      eyebrow: '03 · ምን እንገነባለን',
      title: 'ንግድዎ በተግባር በሚሰራበት መንገድ ሶፍትዌር።',
      subtitle: 'አስር እውነተኛ ምድቦች — እያንዳንዱ የእጅ ስራን በሚሰራ ስርዓት ይተካል።',
      items: [
        { title: 'የንግድ አስተዳደር ስርዓቶች', text: 'ስፕሬድሼቱን እና የወረቀት መዝገቡን ይተኩ።' },
        { title: 'የክምችት እና ሎጂስቲክስ መድረኮች', text: 'ምን በክምችት እንዳለ እና ወዴት እንደሚንቀሳቀስ ይወቁ።' },
        { title: 'የደንበኛ አስተዳደር ስርዓቶች', text: 'ከተበታተኑ ማስታወሻዎች ይልቅ የእያንዳንዱን ደንበኛ አንድ እይታ።' },
        { title: 'የፋይናንስ እና አስተዳደር ሶፍትዌር', text: 'ገንዘብ፣ ማጽደቅ እና መዝገቦችን በአንድ ቦታ ይከታተሉ።' },
        { title: 'የዌብ መተግበሪያዎች', text: 'ቡድንዎ እና ደንበኞችዎ የሚጠቀሙባቸው ፖርታሎች እና ዳሽቦርዶች።' },
        { title: 'የሞባይል መተግበሪያዎች', text: 'የመስክ ስራ፣ ማጽደቅ እና የደንበኛ ፍሰቶች በኪስዎ ውስጥ።' },
        { title: 'የSaaS መድረኮች', text: 'ክፍያ እና መለያዎች የተገነቡበት የደንበኝነት ምዝገባ ሶፍትዌር።' },
        { title: 'የኢ-ኮሜርስ መድረኮች', text: 'ትዕዛዞች እና ክፍያዎች የተገናኙበት በመስመር ላይ ይሽጡ።' },
        { title: 'የውስጥ ኦፕሬሽን መሳሪያዎች', text: 'ባልተገናኙ መሳሪያዎች መካከል ዳታ እንደገና መተየብ ያቁሙ።' },
        { title: 'AI የተጎላበተ ሶፍትዌር', text: 'ተደጋጋሚ ስራዎችን ከዳታዎ የሚያራምድ ሶፍትዌር።' },
      ],
    },
    customSoftware: {
      eyebrow: '04 · ብጁ ሶፍትዌር',
      title: 'በኦፕሬሽኖችዎ ዙሪያ የተገነባ የንግድ ሶፍትዌር።',
      subtitle: 'የኢንተርፕራይዝ ስርዓቶች፣ የውስጥ መድረኮች እና የስራ ፍሰት አስተዳደር — ከላይቭ ETB ሰንጠረዥ የተጠቀሱ።',
      rows: [
        'የኢንተርፕራይዝ ስርዓቶች እና የውስጥ መድረኮች',
        'የስራ ፍሰት አስተዳደር እና ማጽደቅ',
        'ለቅርንጫፎች እና የመስክ ቡድኖች የኦፕሬሽን መድረኮች',
        'የደንበኛ ፖርታሎች እና ዲጂታል ሽግግር',
        'የዳታ እንደገና ማስገባትን የሚያቆሙ ውህደቶች',
      ],
      link: 'ብጁ ሶፍትዌር ልማት ያስሱ',
    },
    webMobile: {
      eyebrow: '05 · ዌብ እና ሞባይል',
      title: 'ደንበኞችዎ በትክክል የሚጠቀሙባቸው የዌብ እና ሞባይል ምርቶች።',
      subtitle: 'የንግድ ድረ-ገፆች፣ የዌብ መተግበሪያዎች፣ ፖርታሎች፣ ዳሽቦርዶች፣ ኢ-ኮሜርስ እና ቤተኛ የሞባይል መተግበሪያዎች — ከተወሰኑ ETB መነሻዎች።',
      webKicker: 'ዌብ',
      webPrice: 'Web from 20,000 ETB',
      webRows: ['የንግድ ድረ-ገፆች እና የኮርፖሬት ጣቢያዎች', 'የዌብ መተግበሪያዎች እና ፖርታሎች', 'ዳሽቦርዶች እና የአስተዳደር ገፆች', 'የኢ-ኮሜርስ መደብሮች'],
      webLink: 'የዌብ ልማት ክፈት',
      mobileKicker: 'ሞባይል',
      mobilePrice: 'Mobile from 40,000 ETB',
      mobileRows: ['የAndroid እና iOS መተግበሪያዎች', 'ተሻጋሪ የንግድ መተግበሪያዎች', 'ለደንበኞች የሚገጥሙ መተግበሪያዎች', 'ለሰራተኞች እና የመስክ ቡድኖች መተግበሪያዎች'],
      mobileLink: 'የሞባይል ልማት ክፈት',
    },
    businessSystems: {
      eyebrow: '06 · የንግድ ስርዓቶች',
      title: 'የዕለት ተዕለት ኦፕሬሽኖች ስርዓቶች።',
      subtitle: 'ክምችት፣ CRM፣ HR፣ ፋይናንስ፣ ሎጂስቲክስ፣ ትምህርት ቤት፣ ችርቻሮ እና የዘርፍ ስርዓቶች — እንደ ስፕሬድሼት ሳይሆን እንደ ሚሰራ ሶፍትዌር።',
      rows: ['ክምችት እና የአክሲዮን ቁጥጥር', 'CRM እና የደንበኛ መዝገቦች', 'የERP አይነት የኦፕሬሽን ስርዓቶች', 'HR፣ ደመወዝ እና ፋይናንስ', 'ሎጂስቲክስ እና የአቅርቦት ክትትል', 'የትምህርት ቤት አስተዳደር', 'ችርቻሮ እና POS', 'የዘርፍ-ተኮር ስርዓቶች'],
      link: 'የንግድ ስርዓቶች ያስሱ',
    },
    saas: {
      eyebrow: '07 · SaaS እና ምርት',
      title: 'የደንበኝነት ምዝገባ ሶፍትዌር እና የምርት ኢንጂነሪንግ።',
      subtitle: 'ክፍያ፣ መግቢያ እና ባለብዙ-ተከራይ አርክቴክቸር የተገነቡበት SaaS መድረኮች፣ MVPs እና ስታርትአፕ ምርቶች።',
      rows: ['SaaS መድረኮች እና ባለብዙ-ተከራይ ምርቶች', 'ለስታርትአፕ ምርቶች MVP ግንባታ', 'ክፍያ እና መግቢያ ያለው የደንበኝነት ምዝገባ ሶፍትዌር', 'የምርት ኢንጂነሪንግ እና የመድረክ ዝግመተ ለውጥ'],
      link: 'የSaaS መፍትሄዎች ክፈት',
    },
    ai: {
      eyebrow: '08 · AI እና አውቶሜሽን',
      title: 'ለሶፍትዌርዎ እውቀት ይጨምሩ።',
      subtitle: 'ሶፍትዌርዎን የበለጠ ብልህ ያድርጉት። ጊዜ በሚቆጥብበት ቦታ ብልህ አውቶሜሽን ይጨምሩ።',
      pairs: [
        { from: 'ሶፍትዌር', to: 'AI ረዳት' },
        { from: 'ሰነዶች', to: 'አውቶማቲክ ማውጣት' },
        { from: 'የደንበኛ ድጋፍ', to: 'AI የድጋፍ ወኪል' },
        { from: 'ኦፕሬሽኖች', to: 'አውቶማቲክ የስራ ፍሰቶች' },
        { from: 'የኩባንያ እውቀት', to: 'ሊፈለግ የሚችል AI የእውቀት መሰረት' },
        { from: 'ሪፖርት', to: 'ብልህ ትንተና' },
      ],
      noteStrong: 'ባሉት የንግድ ስራ ፍሰቶች ላይ ብልህ ስርዓቶችን ይገንቡ።',
      note: 'ንግድዎ በሚተማመንበት ሶፍትዌር ውስጥ AI ን ያዋህዱ።',
      cta: 'AI እና አውቶሜሽን ያስሱ',
    },
    process: {
      eyebrow: '09 · ሂደት',
      title: 'ከመጀመሪያ ጥሪ እስከ ሚሰራ ሶፍትዌር አምስት እርምጃዎች።',
      subtitle: 'ግንባታ ከመጀመሩ በፊት ግልጽ የንግድ ውሎች እና የአቅርቦት ግምቶች።',
      steps: [
        { title: 'ግኝት', text: 'ነጻ ጥሪ። በ1 የስራ ቀን ምላሽ፣ በ3 ቀን ጥሪ፣ ከግኝቱ በ5 ቀን ፕሮፖዛል።' },
        { title: 'የስራ ፍሰት ኦዲት (አማራጭ)', text: '15,000 ETB ቋሚ · 5 የስራ ቀናት · 100% ለግንባታው የሚቆጠር።' },
        { title: 'የተወሰነ ፕሮፖዛል', text: 'ግንባታ ከመጀመሩ በፊት ከታተመው ሰንጠረዥ ቋሚ ETB ጥቅስ።' },
        { title: 'ግንባታ', text: 'የማዕዘን ክፍያ 40/30/30። በመጨረሻው ክፍያ ሙሉ ባለቤትነት።' },
        { title: 'ድጋፍ እና ጥገና', text: 'የጽሁፍ ቁርጠኝነት፡ በዓመት 40 ሰአት ድጋፍ፣ ወሳኝ ጉዳዮች ላይ በሚቀጥለው የስራ ቀን ምላሽ።' },
      ],
    },
    selectedWork: {
      eyebrow: '10 · የተመረጡ ስራዎች',
      title: 'በNovaTech የተነደፉ እና የተገነቡ እውነተኛ ምርቶች።',
      subtitle: 'የሚረጋገጡ ግንባታዎች — የተፈጠሩ የደንበኛ ጥያቄዎች የሉም።',
    },
    caseStudies: {
      stealthOverlay: {
        caption: 'የቀጥታ ምርት · STEALTH OVERLAY',
        title: 'Stealth Overlay',
        description: 'ለኮዲንግ ቃለ-መጠይቅ የAI ቃለመጠይቅ ረዳት — በቴክኒካል ቃለ-መጠይቅ ልምምድ ወቅት የእውነተኛ ጊዜ DSA መመሪያ እና የችግር አፈታት ድጋፍ።',
        category: 'AI የተጎላበተ የዌብ መተግበሪያ',
        alt: 'Stealth Overlay — የቀጥታ ምርት መነሻ ገጽ ቅጽበታዊ ገጽ እይታ',
      },
      rhobotAcademy: {
        caption: 'የቀጥታ ምርት · RHOBOT ACADEMY',
        title: 'Rhobot Academy',
        description: 'በአማርኛ የፎረክስ ንግድ ኮርስ መድረክ — ስርዓተ-ትምህርት፣ የተማሪ መለያዎች፣ ነጻ ምዝገባ፣ በአስተማሪ የሚመራ ይዘት።',
        category: 'የመማሪያ መድረክ / LMS',
        alt: 'Rhobot Academy — የቀጥታ ምርት መነሻ ገጽ ቅጽበታዊ ገጽ እይታ',
      },
    },
    why: {
      eyebrow: '11 · ለምን NovaTech',
      title: 'ምክንያቶቹ በዋጋ ገጹ ላይ ናቸው።',
      subtitle: 'የታተሙ ዋጋዎች፣ የማዕዘን ክፍያ፣ የጽሁፍ ቁርጠኝነት እና የምላሽ SLA።',
      rows: [
        { title: 'የታተመ ETB ዋጋ', text: 'ዌብ ከ20,000፣ ሞባይል ከ40,000፣ SaaS ከ3,500/ወር — በጣቢያው ላይ።' },
        { title: 'የማዕዘን ክፍያ 40/30/30', text: 'ለግንባታው እየተከናወነ ይክፈሉ፣ በአንድ ጊዜ አይደለም።' },
        { title: 'የጽሁፍ ድጋፍ ቁርጠኝነት', text: 'በዓመት 40 ሰአት ድጋፍ እና በሚቀጥለው የስራ ቀን ምላሽ።' },
        { title: 'የምላሽ SLA', text: 'እያንዳንዱን ጥያቄ በ1 የስራ ቀን ውስጥ እንመልሳለን።' },
        { title: 'አዲስ አበባ ላይ የተመሰረተ', text: 'አካባቢያዊ ኢንጂነሪንግ ከአለም አቀፍ የሶፍትዌር ደረጃዎች ጋር።' },
      ],
    },
    industries: {
      eyebrow: '12 · ኢንዱስትሪዎች',
      title: 'ለአካባቢያዊ ንግዶች እውነታ የሚስማሙ ስርዓቶች።',
      subtitle: 'የአካባቢያዊ ንግዶችን እውነታ እንረዳለን እና በተግባር በሚሰሩበት መንገድ ሶፍትዌር እንገነባለን።',
      items: [
        { title: 'ክምችት እና የአክሲዮን ቁጥጥር', text: 'የክምችት ስፕሬድሼቱን እና የእጅ ቆጠራዎችን ይተኩ።' },
        { title: 'የደንበኛ አስተዳደር / CRM', text: 'የተበታተኑ ማስታወሻዎችን እና የዋትሳፕ ክሮችን ይተኩ።' },
        { title: 'ፋይናንስ እና አስተዳደር', text: 'የወረቀት መዝገቡን እና የአንድ-ሰው ማጽደቅ ሰንሰለቱን ይተኩ።' },
        { title: 'HR እና ደመወዝ', text: 'የእጅ ደመወዝ ሉሆችን እና የተበታተኑ የእረፍት መዝገቦችን ይተኩ።' },
        { title: 'ሎጂስቲክስ እና የአቅርቦት ክትትል', text: 'የስልክ ጥሪ ክትትልን እና የእጅ ጽሁፍ ማኒፌስቶችን ይተኩ።' },
        { title: 'የትምህርት ቤት አስተዳደር', text: 'የወረቀት መዝገቦችን፣ የውጤት ካርዶችን እና የክፍያ ማሳደድን ይተኩ።' },
        { title: 'ችርቻሮ እና POS', text: 'የማስታወሻ ደብተር ሽያጭ መዝገብን እና የቀን መጨረሻ ማስታረቅን ይተኩ።' },
        { title: 'ግዥ', text: 'የተበታተኑ የግዥ ጥያቄዎችን እና የአቅራቢ ፋይሎችን ይተኩ።' },
      ],
    },
    audit: {
      eyebrow: '13 · ኦዲት',
      title: 'Workflow Audit',
      termsDay: '5 የስራ ቀናት',
      termsCredit: '100% ለግንባታው የሚቆጠር',
      description: 'የስራ ፍሰት ትንተና፣ የአውቶሜሽን ካርታ፣ የስርዓት ንድፍ እና የትግበራ ምክር።',
      guarantee: 'ኦዲቱ የሚሰራ ንድፍ ካላመጣ፣ አይከፍሉም።',
      ctaBook: 'Workflow Audit ያስይዙ',
      ctaViewPricing: 'የቀጥታ ዋጋዎችን ይመልከቱ',
      sideKicker: 'ብልህ የመጀመሪያ እርምጃ',
      sideTitle: 'የትኛውን ግንባታ እንደሚፈልጉ እርግጠኛ አይደሉም?',
      sideText: 'ኦዲቱ የአሁኑን ሂደት ይቀርጻል እና ትክክለኛውን የግንባታ መንገድ ይወስናል — ክፍያው ሙሉ በሙሉ ለሚቀጥለው ግንባታ ይቆጠራል።',
    },
    finalCta: {
      eyebrow: '14 · ፕሮጀክት ይጀምሩ',
      title: 'ምን መገንባት እንደሚፈልጉ ይንገሩን።',
      subtitle: 'የፕሮጀክት ጥያቄዎ የስፋት እና የበጀት አውድ ይዞ ይደርሰናል — በ1 የስራ ቀን ውስጥ እንመልሳለን።',
      formTitle: 'የፕሮጀክት መግቢያ',
      quoteKicker: 'አሁኑኑ ቁጥር ይፈልጋሉ?',
      quoteTitle: 'የፈጣን ዋጋ መለኪያውን ይጠቀሙ።',
      quoteText: 'ያለ ጥሪ በደቂቃዎች ውስጥ አቅጣጫዊ ETB ግምት።',
      quoteCta: 'የፈጣን ዋጋ መለኪያ',
    },
    intake: {
      confirmation: 'የፕሮጀክት ጥያቄዎ ደርሷል። በ1 የስራ ቀን ውስጥ በቀጣይ እርምጃዎች እንመልሳለን።',
      fallbackNote: 'የእውቂያ አገልግሎቱ አሁን ስለማይገኝ ጥያቄዎ በኢሜይል መተግበሪያዎ ተከፍቷል።',
      form: {
        aria: 'የፕሮጀክት መግቢያ ቅጽ',
        fullName: 'ሙሉ ስም',
        fullNamePlaceholder: 'ሳራ ተስፋዬ',
        email: 'የኢሜይል አድራሻ',
        emailPlaceholder: 'sara@example.com',
        phone: 'ስልክ',
        phonePlaceholder: '+251 9xx xxx xxx',
        company: 'ኩባንያ (አማራጭ)',
        companyPlaceholder: 'ሜሶብ ንግድ PLC',
        need: 'ምን ያስፈልግዎታል?',
        needPlaceholder: 'አማራጭ ይምረጡ',
        needOptions: {
          Website: 'ድረ-ገጽ',
          Webapplication: 'የዌብ መተግበሪያ',
          Mobileapp: 'የሞባይል መተግበሪያ',
          Businesssystem: 'የንግድ ስርዓት',
          SaaSproduct: 'የSaaS ምርት',
          AIautomation: 'AI እና አውቶሜሽን',
          Notsureyet: 'ገና እርግጠኛ አይደለሁም',
        },
        budget: 'የበጀት ክልል',
        budgetPlaceholder: 'ክልል ይምረጡ',
        notSureBudget: 'እርግጠኛ አይደለሁም',
        problem: 'ችግሩ ወይም ሃሳቡ ምንድነው?',
        problemPlaceholder: 'የእጅ ማጽደቅ፣ የክምችት ትርምስ፣ አዲስ ምርት፣ ወይም መተካት የሚፈልጉት ስርዓት።',
        sending: 'በመላክ ላይ...',
        submit: 'ፕሮጀክት ጀምር',
        error: 'ጥያቄዎን ማስቀመጥ አልቻልንም። ዝርዝሮችዎን አረጋግጠው እንደገና ይሞክሩ።',
      },
      chat: {
        scope: 'ስፋት',
        budget: 'የበጀት ክልል',
        note: 'ማስታወሻ (አማራጭ)',
        notePlaceholder: 'ችግሩ ወይም ሃሳቡ ምንድነው?',
      },
    },
  },
};

const omContentOverrides = {
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
      fullNamePlaceholder: 'Sara Tesfaye (fakkeenya)',
      email: 'Imeelii',
      emailPlaceholder: 'sara.tesfaye@example.com (fakkeenya)',
      company: 'Dhaabbata (filannoo)',
      companyPlaceholder: 'Mesob Trading PLC (filannoo)',
      submitting: 'Ergaa jira...',
    },
    pricing_guide: {
      title: 'Current NovaTech ETB pricing sheet argadhaa',
      subtitle: 'Pricing sheet ammee NovaTech kan ETB table wal fakkaataa marsariitii irratti fayyadamu irraa ijaarame buufadhaa.',
      submitLabel: 'Pricing Sheet Buusi',
      successTitle: 'Pricing sheet qophaa’eera',
      successSubtitle: 'Current NovaTech ETB pricing sheet kee tab haaraa keessatti banameera. Asii gaditti irra deebitee banuu dandeessa.',
      successPrimaryLabel: 'Pricing Sheet Irra Deebi’ii Bani',
    },
    quote_offer: {
      title: 'Tilmaama pirojektii dhuunfaa argadhaa',
      subtitle: 'Odeeffannoo kee galchiitii gara Instant Quote itti fufi.',
      submitLabel: 'Gara Instant Quote itti fufi',
      successTitle: 'Baayyee gaarii!',
      successSubtitle: 'Gaaffiin kee galmaaheera. Tilmaama dhuunfaaaf itti fufi.',
      successPrimaryLabel: 'Instant Quote Bani',
      successSla: 'Guyyoota hojii tokko keessatti deebii kennina, bilbila marii keessan guyyoota sadii keessatti qopheessina, piroposal-ittis guyyoota hojii shan keessatti dhiheessina.',
    },
    book_call_offer: {
      title: 'Bilbila marii strategy qabadhu',
      subtitle: 'Odeeffannoo kee galchiitii gara booking itti fufi.',
      submitLabel: 'Gara Booking itti fufi',
      successTitle: 'Xiqqoo hafee jira!',
      successSubtitle: 'Gaaffiin kee qabameera. Fuula booking irratti yeroo filadhu.',
      successPrimaryLabel: 'Fuula Booking Bani',
      successSla: 'Guyyoota hojii tokko keessatti deebii kennina, bilbila marii keessan guyyoota sadii keessatti qopheessina, piroposal-ittis guyyoota hojii shan keessatti dhiheessina.',
    },
  },
  discovery: {
    form: {
      success: 'Galatoomaa. Odeeffannoon booking keessan qabameera; invite calendar yeroodhaaf ni ergame.',
      sla: 'Guyyoota hojii tokko keessatti deebii kennina, bilbila marii keessan guyyoota sadii keessatti qopheessina, piroposal-ittis guyyoota hojii shan keessatti dhiheessina.',
      hint: 'Mirkaneessi fi tarkaanfii itti aanan imeeliidhaan isin ga a.',
    },
    booking: {
      requestedSlot: 'Yeroo gaafatame',
      agendaLabel: 'Ajandaa',
    },
  },
  // NATIVE-REVIEW FLAG (NB-09): `home.*` Afaan Oromoo values below are
  // machine-translated (TECH-48) and require native review before launch.
  // They mirror the locked EN keys 1:1 — no new claims; prices render
  // identically across languages (R-17). Double-quoted: Afaan Oromoo uses
  // the apostrophe as a glottal stop.
  home: {
    hero: {
      eyebrow: "01 · SOFTIWERII",
      titleBefore: "Sofiitweerii naannoo daldala keetiitti ",
      titleVerb: "ijaarame",
      titleAfter: ".",
      subcopy: "NovaTech dhaabbata Itoophiyaa fi achiin ala jiraniif sofiitweerii dhuunfaa, platform web, appii moobaayilaa, oomisha SaaS fi sirna daldalaa ijaara — AI automation bakka gatii daldalaa dhugaa uumuutti argama.",
      ctaPrimary: "Piroojektii jalqabi",
      ctaSecondary: "Yaada sofiitweerii keessan mari'adhaa",
      ctaTertiary: "AI fi Automation sakatta'aa",
      trustLabel: "Ankora sofiitweerii table ETB jiraatu irraa",
      trustWeb: "Web from 20,000 ETB",
      trustMobile: "Mobile from 40,000 ETB",
      trustSaas: "SaaS from 3,500 ETB / month",
    },
    trust: {
      eyebrow: "02 · AMANAA",
      title: "Sofiitweerii jalqaba, gatii ifaan.",
      subtitle: "Gatii ETB maxxanfame, kaffaltii sadarkaa fi waadaa barreeffame — safartuu uumaman hin jiran.",
      facts: [
        { title: "Gatii ETB maxxanfame", text: "Ijaarri hundi table ETB jiraatu irraa ni odeeffama." },
        { title: "Kaffaltii sadarkaa 40/30/30", text: "Ijaarri yeroo itti fufu kaffalti — yeroo tokko miti." },
        { title: "Dhiheessii audit guyyoota 5", text: "Karoora hojjechaa guyyoota hojii 5 keessatti." },
        { title: "Waadaa deeggarsaa barreeffame", text: "Sa'aatii deeggarsaa 40 waggaatti, deebii guyyaa hojii itti aanu." },
        { title: "Deebii guyyaa hojii tokko", text: "Gaaffiin hundi guyyaa hojii tokko keessatti deebii argata." },
        { title: "Finfinnee irratti bu'uureeffame", text: "Injinariingii Itoophiyaa, sadarkaa sofiitweerii addunyaa." },
      ],
      signalsLabel: "Mallattooleen daldalli keessan sofiitweeriif qophaa'aa ta'uu agarsiisan",
      signals: [
        { title: "Galtee harkaan hundatti deebi'ama", text: "Ajajni wal fakkaatu meeshaa sadan wal hin qabne keessatti barreeffama." },
        { title: "Mirkannoon nama tokko irratti hundaa'a", text: "Abbaan yeroo hin jirretti hojii ni dhaabbata." },
        { title: "Saffisni deebii maamilaaf baay'ee suuta", text: "Leedonni eegu; qoodni dokumantii keessa taa'a." },
        { title: "Ijaarri itti aanu ifatti hin ramadame", text: "Gareen sofiitweerii barbaada, garuu kam akka ta'e hin beeku." },
      ],
    },
    wwb: {
      eyebrow: "03 · WAAAN IJAARNU",
      title: "Sofiitweerii akkaataa daldalli keessan itti hojjetuutti.",
      subtitle: "Ramaddii dhugaa kudhan — tokkoon tokkoon isaanii hojii harkaa sirna hojjechaa sanaan bakka bu'a.",
      items: [
        { title: "Sirna Bulchiinsa Daldalaa", text: "Spreadsheet fi kitaaba waraqaa bakka bu'i." },
        { title: "Platform Inventory fi Logistics", text: "Waan kuusaa jiru fi bakka itti socho'u beeki." },
        { title: "Sirna Bulchiinsa Maamila", text: "Yaadannoo faffaca'aa irra haaloo maamila tokko." },
        { title: "Sofiitweerii Maallaqaa fi Admin", text: "Maallaqa, mirkannoo fi galmee bakka tokko keessatti hordofi." },
        { title: "Appii Web", text: "Portalii fi dashboard gareen kee fi maamiloonni kee dhugaan itti fayyadaman." },
        { title: "Appii Moobaayilaa", text: "Hojii bakkaa, mirkannoo fi deemii maamilaa harkakee keessatti." },
        { title: "Platform SaaS", text: "Sofiitweerii subscription kaffaltii fi herrega wajjin ijaarame." },
        { title: "Platform E-commerce", text: "Ajaja fi kaffaltii wal qabatee online gurguri." },
        { title: "Meeshalee Hojii Keessaa", text: "Meeshalee wal hin qabne gidduutti daataa deebitee barreessuu dhaabi." },
        { title: "Sofiitweerii AI-n humnee", text: "Sofiitweerii daataa kee irraa hojii deddeebi'aa ofumaan hojjetu." },
      ],
    },
    customSoftware: {
      eyebrow: "04 · SOFIIWERII DHUUNFAA",
      title: "Sofiitweerii daldalaa, naannoo hojii keetiitti ijaarame.",
      subtitle: "Sirna enterprise, platform keessaa fi bulchiinsa deemsaa hojii — table ETB jiraatu irraa.",
      rows: [
        "Sirna enterprise fi platform keessaa",
        "Bulchiinsa deemsaa hojii fi mirkannoo",
        "Platform hojii damee fi garee bakkaa",
        "Portalii maamilaa fi jijjiirama dijitaalaa",
        "Walqabsiisuu galtee deebisan dhaabu",
      ],
      link: "Ijjaarsa sofiitweerii dhuunfaa sakatta'i",
    },
    webMobile: {
      eyebrow: "05 · WEB FI MOOBAAYILAA",
      title: "Oomisha web fi moobaayilaa maamiloonni kee dhugaan itti fayyadaman.",
      subtitle: "Weebsaayitii daldalaa, appii web, portalii, dashboard, e-commerce fi appii moobaayilaa — ankora ETB murtaa'e irraa.",
      webKicker: "Web",
      webPrice: "Web from 20,000 ETB",
      webRows: ["Weebsaayitii daldalaa fi site dhaabbataa", "Appii web fi portalii", "Dashboard fi fuula admin", "Suuqii e-commerce"],
      webLink: "Ijjaarsa Web bani",
      mobileKicker: "Moobaayilaa",
      mobilePrice: "Mobile from 40,000 ETB",
      mobileRows: ["Appii Android fi iOS", "Appii daldalaa gosa hunda", "Appii maamilaaf", "Appii hojjetootaa fi garee bakkaa"],
      mobileLink: "Ijjaarsa Moobaayilaa bani",
    },
    businessSystems: {
      eyebrow: "06 · SIRNA DALDALAA",
      title: "Sirni duubee hojii guyyaa guyyaa.",
      subtitle: "Inventory, CRM, HR, maallaqa, logistics, mana barumsaa, daldala fi sirna gosa hunda — akka sofiitweerii hojjechaa, akka spreadsheet miti.",
      rows: ["Inventory fi to'annoosa kuusaa", "CRM fi galmee maamila", "Sirna hojii akka ERP", "HR, mindaa fi maallaqa", "Logistics fi hordoffii dhiibbaa", "Bulchiinsa mana barumsaa", "Daldala fi POS", "Sirna gosa industirii"],
      link: "Sirna daldalaa sakatta'i",
    },
    saas: {
      eyebrow: "07 · SaaS FI OOMISHA",
      title: "Sofiitweerii subscription fi injinariingii oomishaa.",
      subtitle: "Platform SaaS, MVP fi oomisha start-up kaffaltii, galtee fi arkitektura baay'ee fayyadamtootaan ijaaraman.",
      rows: ["Platform SaaS fi oomisha baay'ee fayyadamtootaan", "Ijjaarsa MVP oomisha start-up", "Sofiitweerii subscription kaffaltii fi onboarding wajjin", "Injinariingii oomishaa fi guddina platform"],
      link: "Furmaata SaaS bani",
    },
    ai: {
      eyebrow: "08 · AI FI AUTOMATION",
      title: "Sofiitweerii keetti hubannoo dabali.",
      subtitle: "Sofiitweerii kee hubataa taasisi. Bakka yeroo dhugumaan qusatuutti automation hubataa dabali.",
      pairs: [
        { from: "Sofiitweerii", to: "Gargaaraa AI" },
        { from: "Dokumantii", to: "Baafannaa ofumaan" },
        { from: "Deeggarsa maamila", to: "Eegduu deeggarsaa AI" },
        { from: "Hojii", to: "Deemsa hojii ofumaan" },
        { from: "Beekumsa dhaabbataa", to: "Bu'uura beekumsaa AI barbaadamaa" },
        { from: "Ripoota", to: "Qorannoo hubataa" },
      ],
      noteStrong: "Deemsa hojii daldalaa jiran sirna hubataa godhi.",
      note: "AI sofiitweerii daldalli kee irratti hundaa'u keessa wal maki.",
      cta: "AI fi Automation sakatta'i",
    },
    process: {
      eyebrow: "09 · DEEMSA",
      title: "Tarkaanfii shan bilbila jalqabaa irraa hanga sofiitweerii hojjechaaatti.",
      subtitle: "Haala daldalaa fi gamaaggama dhiheessaa ifoo ijaarsa jalqabuun dura.",
      steps: [
        { title: "Raageeffannaa", text: "Bilbila bilisa. Deebii guyyaa hojii 1 keessatti, bilbila guyyoota 3 keessatti, piroposal guyyoota 5 keessatti." },
        { title: "Audit Deemsaa (filannoo)", text: "15,000 ETB murtaa'e · guyyoota hojii 5 · 100% gara ijaaramaatti lakkaa'ama." },
        { title: "Piroposal murtaa'e", text: "Qooda ETB murtaa'e table maxxanfame irraa ijaarsa jalqabuun dura." },
        { title: "Ijjaarsa", text: "Kaffaltii sadarkaa 40/30/30. Abbaa warraa guutuu kaffaltii dhumaa irratti." },
        { title: "Deeggarsaa fi suphaa", text: "Waadaa barreeffame: sa'aatii deeggarsaa 40 waggaatti, deebii guyyaa hojii itti aanu dhimma cimaatiif." },
      ],
    },
    selectedWork: {
      eyebrow: "10 · HOOJII FILATAME",
      title: "Oomisha dhugaa, isa NovaTechtti karoorfamee fi ijaarame.",
      subtitle: "Ijjaarsa mirkanaa'uu danda'u — yaadannoo maamila uumame hin jiru.",
    },
    caseStudies: {
      stealthOverlay: {
        caption: "OOMISHA JIRAATU · STEALTH OVERLAY",
        title: "Stealth Overlay",
        description: "Gargaaraa gaaffii gaafatamaa AI gaaffii codingiif — qajeelfama DSA yeroo dhugaa fi deeggarsa furmaata rakkoo yeroo leenjii gaaffii tekinikaa.",
        category: "Appii web AI-n humnee",
        alt: "Stealth Overlay — suuraa fuula jalqabaa oomisha jiraatu",
      },
      rhobotAcademy: {
        caption: "OOMISHA JIRAATU · RHOBOT ACADEMY",
        title: "Rhobot Academy",
        description: "Platform koorsii daldala forex afaan Amaaraatiin — karikulamii, herrega barattoota, galmee bilisaa, qabiyyee barsiisaa.",
        category: "Platform barumsaa / LMS",
        alt: "Rhobot Academy — suuraa fuula jalqabaa oomisha jiraatu",
      },
    },
    why: {
      eyebrow: "11 · MAALIIF NOVATECH",
      title: "Sababoonni fuula gatii irratti jiru.",
      subtitle: "Gatii maxxanfame, kaffaltii sadarkaa, waadaa barreeffame fi SLA deebii.",
      rows: [
        { title: "Gatii ETB maxxanfame", text: "Web 20,000 irraa, mobile 40,000 irraa, SaaS 3,500/ji'otti — marsariitii irratti." },
        { title: "Kaffaltii sadarkaa 40/30/30", text: "Ijjaarri yeroo itti fufu kaffalti — yeroo tokko miti." },
        { title: "Waadaa deeggarsaa barreeffame", text: "Sa'aatii deeggarsaa 40 waggaatti fi deebii guyyaa hojii itti aanu." },
        { title: "SLA deebii", text: "Gaaffii hunda guyyaa hojii 1 keessatti deebisna." },
        { title: "Finfinnee irratti bu'uureeffame", text: "Injinariingii naannoo sadarkaa sofiitweerii addunyaa wajjin." },
      ],
    },
    industries: {
      eyebrow: "12 · INDUSTIRII",
      title: "Sirna dhugaa daldalaa naannoo keetiif.",
      subtitle: "Dhugaa daldalaa naannoo hubanna; sofiitweerii akkaataa itti hojjetaniitti ijaarra.",
      items: [
        { title: "Inventory fi to'annoosa kuusaa", text: "Spreadsheet kuusaa fi lakkoofsa harkaa bakka bu'i." },
        { title: "Bulchiinsa maamila / CRM", text: "Yaadannoo faffaca'aa fi xuroo WhatsApp bakka bu'i." },
        { title: "Maallaqa fi admin", text: "Kitaaba waraqaa fi sabaqa mirkannoo nama tokkoo bakka bu'i." },
        { title: "HR fi mindaa", text: "Sheettii mindaa harkaa fi galmee hiriyyaa wal hin qabne bakka bu'i." },
        { title: "Logistics fi hordoffii dhiibbaa", text: "Hordoffii bilbilaa fi manifest harkaa bakka bu'i." },
        { title: "Bulchiinsa mana barumsaa", text: "Galmee waraqaa, kaardii qabxii fi ari'ataa kaffaltii bakka bu'i." },
        { title: "Daldala fi POS", text: "Galmee gurgurtaa kitaabaa fi waliigalaa guyyaa dhumaatti bakka bu'i." },
        { title: "Bituu", text: "Gaaffii bituu wal hin qabne fi faayila dhiheessaa bakka bu'i." },
      ],
    },
    audit: {
      eyebrow: "13 · AUDIT",
      title: "Workflow Audit",
      termsDay: "guyyoota hojii 5",
      termsCredit: "100% gara ijaaramaatti lakkaa'ama",
      description: "Qorannoo deemsaa hojii, kaartaa automation, karoora sirnaa fi gorsa raawwii.",
      guarantee: "Audit karoora hojjechaa yoo hin kennine, hin kaffaltu.",
      ctaBook: "Workflow Audit qabadhu",
      ctaViewPricing: "Gatii jiraatu ilaali",
      sideKicker: "Tarkaanfii jalqabaa hubataa",
      sideTitle: "Ijaarsa kami akka barbaaddu hin beektuu?",
      sideText: "Audit deemsa ammaa kaartaa godhaa fi karaa ijaarsaa sirrii murteessa — gatichi guutummaatti ijaarama itti aanuuf lakkaa'ama.",
    },
    finalCta: {
      eyebrow: "14 · PIROOJEKTII JALQABI",
      title: "Waan ijaarrachuu feetu nutti himi.",
      subtitle: "Gaaffiin pirojektii kee waan barbaaddu fi baajata keetiin nu ga'a — guyyaa hojii 1 keessatti deebina.",
      formTitle: "Galtee pirojektii",
      quoteKicker: "Yeroo ammaa lakkoofsa barbaadda?",
      quoteTitle: "Meeshaa qorannoo gatii saffisaa fayyadami.",
      quoteText: "Tilmaama ETB kallattii qabu daqiiqaawwan keessatti, bilbila malee.",
      quoteCta: "Meeshaa Qorannoo Gatii",
    },
    intake: {
      confirmation: "Gaaffiin pirojektii kee argameera. Guyyaa hojii 1 keessatti tarkaanfii itti aanuun deebina.",
      fallbackNote: "Sababa endpoint quunnamtii yeroo ammaa hin argamneef, gaaffiin kee appii imeelii kee keessatti banameera.",
      form: {
        aria: "Forma galtee pirojektii",
        fullName: "Maqaa guutuu",
        fullNamePlaceholder: "Sara Tesfaye",
        email: "Imeelii",
        emailPlaceholder: "sara@example.com",
        phone: "Bilbila",
        phonePlaceholder: "+251 9xx xxx xxx",
        company: "Dhaabbata (filannoo)",
        companyPlaceholder: "Mesob Trading PLC",
        need: "Maal barbaadda?",
        needPlaceholder: "Filannoo filadhu",
        needOptions: {
          Website: "Weebsaayitii",
          Webapplication: "Appii web",
          Mobileapp: "Appii moobaayilaa",
          Businesssystem: "Sirna daldalaa",
          SaaSproduct: "Oomisha SaaS",
          AIautomation: "AI fi automation",
          Notsureyet: "Hanga ammaa hin beeku",
        },
        budget: "Sadarkaa baajataa",
        budgetPlaceholder: "Sadarkaa filadhu",
        notSureBudget: "Hin beeku",
        problem: "Rakkoon ykn yaadni maali?",
        problemPlaceholder: "Mirkannoo harkaa, jeequmsa inventory, oomisha haaraa, ykn sirna bakka bu'uu barbaaddu.",
        sending: "Ergaa jira...",
        submit: "Piroojektii jalqabi",
        error: "Gaaffii kee galchuu hin dandeenye. Odeeffannoo kee mirkaneessiitii irra deebi'ii yaali.",
      },
      chat: {
        scope: "Sadarkaa",
        budget: "Sadarkaa baajataa",
        note: "Yaadannoo (filannoo)",
        notePlaceholder: "Rakkoon ykn yaadni maali?",
      },
    },
  },
};

const amFinalOverrides = {
  nav: {
    // TECH-19 (B34): changed nav keys realigned to their verified Amharic
    // values (see amOverrides.nav), keeping this final layer consistent.
    services: 'አገልግሎቶች',
    web: 'የዌብ ኢንተርፌስ',
    mobile: 'የሞባይል ኢንተርፌስ',
    saas: 'SaaS መፍትሄ',
    policy: 'ፖሊሲ',
    instantQuote: 'ፈጣን ዋጋ',
    // NATIVE-REVIEW FLAG (NB-09): `nav.contact|startProject|dropdown*` Amharic
    // values below are machine-translated (TECH-19, B34) and require native
    // review before launch. They mirror the locked EN keys 1:1 — no new claims.
    contact: 'አግኙን',
    startProject: 'ፕሮጀክት ጀምር',
    dropdownWeb: 'ዌብ',
    dropdownMobile: 'ሞባይል',
    dropdownSaas: 'SaaS',
    bookCall: 'Workflow Audit Call',
  },
  footer: {
    // TECH-35 (S-4): software-first mirror of the EN footer description.
    description: 'በሶፍትዌር ልማት ላይ ያተኮረ አማካሪ — ዌብ፣ ሞባይል እና SaaS ምርቶችን፣ እንዲሁም እውነተኛ ችግርን የሚፈታ AI አውቶሜሽንን ያቀርባል።',
    rights: '© 2026 NovaTech Systems. መብቶች ሁሉ የተጠበቁ ናቸው።',
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
      home: 'ሰላም NovaTech፣ በቡድናችን ውስጥ ያሉ የእጅ ስራ ቦታዎችን በብጁ AI ኤጀንቶች ለመቀየር መወያየት እፈልጋለሁ።',
      services: 'ሰላም NovaTech፣ ከAI መፍትሄዎቻችሁ ውስጥ ለኦፕሬሽኖቻችን የሚስማማውን ስታክ ለመምረጥ እገዛ እፈልጋለሁ።',
      workflowAudit: 'ሰላም NovaTech፣ Workflow Audit ለማስያዝ እና የሚፈለጉ የስርዓት መዳረሻዎችን ለመወያየት እፈልጋለሁ።',
      pricing: 'ሰላም NovaTech፣ ትክክለኛውን የAutomation Tier እና ወርሃዊ የድጋፍ ሞዴል ለመምረጥ እገዛ እፈልጋለሁ።',
      web: 'ሰላም NovaTech፣ የAI ዎርክፍሎዎቻችንን ለማሳየት የዌብ መፍትሄ እንፈልጋለን።',
      mobile: 'ሰላም NovaTech፣ ለመስክ ኦፕሬሽኖች እና ማረጋገጫዎች የሞባይል መተግበሪያ እንፈልጋለን።',
      saas: 'ሰላም NovaTech፣ ለSaaS ኦፕሬሽኖቻችን ኦርኬስትሬሽን እና ዲፕሎይመንት ስርዓት ላይ መወያየት እፈልጋለሁ።',
      additional: 'ሰላም NovaTech፣ በIntegration እና የAutomation Reliability ዙሪያ የኢንጂነሪንግ ድጋፍ እፈልጋለሁ።',
      instantQuote: 'ሰላም NovaTech፣ Automation Brief እሞላለሁ እና ስኮፕ/በጀት ለማረጋገጥ እገዛ እፈልጋለሁ።',
      bookCall: 'ሰላም NovaTech፣ ተስማሚ የWorkflow Audit ጊዜ እና አጀንዳ ለመምረጥ እገዛ እፈልጋለሁ።',
      policy: 'ሰላም NovaTech፣ ስለ ዲፕሎይመንት፣ ደህንነት እና ኦፕሬሽን ፖሊሲ ጥያቄ አለኝ።',
      default: 'ሰላም NovaTech፣ የእጅ ዎርክፍሎዎችን በብጁ ኤጀንቲክ ስርዓቶች ለመቀየር መወያየት እፈልጋለሁ።',
    },
  },
  leadCapture: {
    form: {
      emailPlaceholder: 'sara.tesfaye@example.com (ለምሳሌ)',
      companyPlaceholder: 'ሜሶብ ንግድ PLC (አማራጭ)',
    },
  },
};

const omFinalOverrides = {
  nav: {
    // TECH-19 (B34): changed nav keys realigned to their verified Afaan
    // Oromoo values (see omOverrides.nav), keeping this final layer consistent.
    services: 'Tajaajiloota',
    web: 'Interfeesii Web',
    mobile: 'Interfeesii Moobaayilaa',
    saas: 'Furmaata SaaS',
    policy: 'Seera',
    instantQuote: 'Qorannoo Gatii',
    // NATIVE-REVIEW FLAG (NB-09): `nav.contact|startProject|dropdown*` Afaan
    // Oromoo values below are machine-translated (TECH-19, B34) and require
    // native review before launch. They mirror the locked EN keys 1:1 — no
    // new claims.
    contact: 'Qunnamtii',
    startProject: 'Piroojektii jalqabi',
    dropdownWeb: 'Web',
    dropdownMobile: 'Moobaayilaa',
    dropdownSaas: 'SaaS',
    bookCall: 'Workflow Audit Call',
  },
  channels: {
    telegram: 'Telegiraamii',
    whatsapp: 'Waatsaappii',
  },
  footer: {
    // TECH-35 (S-4): software-first mirror of the EN footer description.
    description: 'Konsaltantii xiyyeeffannoo jalqabaa software — oomisha web, mobile fi SaaS, waliin automation AI kan rakkoo dhugaa furu.',
    rights: '© 2026 NovaTech Systems. Mirgi hundi eegameera.',
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
      home: 'Akkam NovaTech, hojii harkaan hojjetamu keessaa bottlenecks agentoota AI dhuunfaatiin jijjiiruuf marii barbaada.',
      services: 'Akkam NovaTech, furmaata AI keessaa stack hojii keenyaaf sirrii ta e filachuuf gargaarsa barbaada.',
      workflowAudit: 'Akkam NovaTech, workflow audit qopheessuuf fi system access barbaachisu irratti marii barbaada.',
      pricing: 'Akkam NovaTech, automation tier sirrii fi monthly support model filachuuf gargaarsa barbaada.',
      web: 'Akkam NovaTech, workflows AI keenyaaf fi dashboardiif furmaata web ijaaruu barbaanna.',
      mobile: 'Akkam NovaTech, hojii bakkaa fi ragaa mirkaneessuuf appii moobaayilaa barbaanna.',
      saas: 'Akkam NovaTech, orchestration fi deployment pattern SaaS operations keenyaaf marii barbaada.',
      additional: 'Akkam NovaTech, integrations fi automation reliability irratti engineering support barbaada.',
      instantQuote: 'Akkam NovaTech, automation brief guutaa jira; scope fi budget mirkaneessuuf gargaarsa barbaada.',
      bookCall: 'Akkam NovaTech, yeroo workflow audit call fi agenda filachuuf gargaarsa barbaada.',
      policy: 'Akkam NovaTech, deployment, security fi seera operations irratti gaaffii qaba.',
      default: 'Akkam NovaTech, workflows harkaan hojjetaman gara agentic systems dhuunfaatti jijjiiruuf marii barbaada.',
    },
  },
  discovery: {
    header: {
      tag: 'Sagantaalee',
    },
  },
  leadCapture: {
    form: {
      fullNamePlaceholder: 'Sara Tesfaye (fakkeenya)',
      emailPlaceholder: 'sara.tesfaye@example.com (fakkeenya)',
      companyPlaceholder: 'Mesob Trading PLC (filannoo)',
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
