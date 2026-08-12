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
  // `band.audit.title|subtitle` are the locked keys (TECH-32: orphaned
  // `band.cta.*` keys pruned). Values mirror the BandCta.jsx fallback defaults
  // 1:1; AM/OM mirrors live in amOverrides/omOverrides.
  band: {
    audit: {
      title: 'Start with the Workflow Audit.',
      subtitle: 'We map the bottlenecks, define the right path, and credit the audit fee toward the build if you continue.',
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
  // NATIVE-REVIEW FLAG (NB-09): `band.audit.*` Amharic values below mirror the
  // locked EN keys (TECH-15, arbitration 2) 1:1 — no new claims.
  band: {
    audit: {
      title: 'ከWorkflow Audit ጀምር።',
      subtitle: 'እንቅፋቶቹን እንለያለን፣ ትክክለኛውን መንገድ እንወስናለን፣ እና ከቀጠሉ የኦዲት ክፍያውን ለልማቱ እናስቆጥራለን።',
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
  // NATIVE-REVIEW FLAG (NB-09): `band.audit.*` Afaan Oromoo values below
  // mirror the locked EN keys (TECH-15, arbitration 2) 1:1 — no new claims.
  band: {
    audit: {
      title: 'Workflow Audit irraa jalqabi.',
      subtitle: 'Rakkoowwan qixxaarraa adda baasna, karaa sirrii murteessina, yoo itti fufte immoo gatii audit-ichaa ijaarama keessatti lakkaa\'ina.',
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
