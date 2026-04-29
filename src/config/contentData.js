export const caseStudies = [
  {
    slug: 'habesha-marketplace',
    title: 'Habesha Marketplace Replatform',
    industry: 'ecommerce',
    summary: 'A multi-vendor marketplace migration focused on speed, checkout completion, and bilingual UX.',
    challenge: 'Legacy storefront had poor mobile speed and low checkout completion.',
    solution: 'Rebuilt storefront with Vite React, optimized checkout funnels, and integrated Chapa with recovery flows.',
    stack: ['React', 'Node API', 'Chapa API', 'Cloudflare'],
    timeline: '10 weeks',
    results: [
      { label: 'Page Speed Score', before: '42', after: '91', delta: '+116%' },
      { label: 'Checkout Conversion', before: '1.8%', after: '3.9%', delta: '+117%' },
      { label: 'Abandoned Cart Recovery', before: '0%', after: '14%', delta: '+14 pts' },
    ],
    testimonial: 'The relaunch paid for itself within one quarter and gave us confidence to scale.',
    contact: 'Abel Kebede, COO',
  },
  {
    slug: 'bright-future-academy',
    title: 'Bright Future Academy SaaS Rollout',
    industry: 'education',
    summary: 'School management platform with attendance, grading, and parent communication.',
    challenge: 'Manual reporting and fragmented records across departments.',
    solution: 'Deployed a modular SaaS platform with role-based dashboards and automated parent updates.',
    stack: ['React', 'PostgreSQL', 'Queue Workers', 'Telegram Bot'],
    timeline: '12 weeks',
    results: [
      { label: 'Report Preparation Time', before: '3 days', after: '4 hours', delta: '-84%' },
      { label: 'Late Fee Collections', before: '63%', after: '87%', delta: '+24 pts' },
      { label: 'Parent Satisfaction', before: '68%', after: '94%', delta: '+26 pts' },
    ],
    testimonial: 'The system gave us visibility and discipline we could not maintain before.',
    contact: 'Sara Tesfaye, Director',
  },
  {
    slug: 'mercy-health-network',
    title: 'Mercy Health Digital Intake',
    industry: 'healthcare',
    summary: 'Clinic intake and appointment modernization with multilingual support.',
    challenge: 'Long queues and appointment no-shows due to manual scheduling.',
    solution: 'Implemented digital intake, automated reminders, and patient follow-up workflows.',
    stack: ['React', 'Express', 'SMS Gateway', 'Analytics Pipeline'],
    timeline: '9 weeks',
    results: [
      { label: 'Average Intake Time', before: '24 min', after: '9 min', delta: '-62%' },
      { label: 'No-Show Rate', before: '21%', after: '11%', delta: '-10 pts' },
      { label: 'Front Desk Throughput', before: '100/day', after: '156/day', delta: '+56%' },
    ],
    testimonial: 'We reduced pressure on staff while improving patient communication.',
    contact: 'Dr. Hana Alemu, Operations Lead',
  },
];

export const portfolioProjects = [
  {
    id: 'proj-1',
    name: 'Habesha Marketplace',
    industry: 'ecommerce',
    category: 'Web Platform',
    outcome: 'Marketplace conversion doubled after checkout redesign.',
    path: '/case-studies',
  },
  {
    id: 'proj-2',
    name: 'Bright Future Academy',
    industry: 'education',
    category: 'SaaS Platform',
    outcome: 'Grade reporting reduced from days to hours.',
    path: '/case-studies',
  },
  {
    id: 'proj-3',
    name: 'Mercy Health Network',
    industry: 'healthcare',
    category: 'Operations Platform',
    outcome: 'Patient intake cycle improved by over 60%.',
    path: '/case-studies',
  },
  {
    id: 'proj-4',
    name: 'Addis Property Hub',
    industry: 'real-estate',
    category: 'CRM and Leasing',
    outcome: 'Lease renewal workflows automated across 2,000+ units.',
    path: '/industries/real-estate',
  },
  {
    id: 'proj-5',
    name: 'FastCart Delivery',
    industry: 'logistics',
    category: 'Mobile App',
    outcome: 'Delivery SLA compliance increased by 31%.',
    path: '/portfolio',
  },
  {
    id: 'proj-6',
    name: 'Nile Retail Suite',
    industry: 'ecommerce',
    category: 'Headless Commerce',
    outcome: 'AOV increased by 19% after recommendation flows.',
    path: '/portfolio',
  },
];

export const industryLandingContent = {
  education: {
    title: 'Education Digital Systems',
    hero: 'Digitize admissions, grading, attendance, and parent communication.',
    pains: ['Manual reporting cycles', 'Low parent communication visibility', 'Disconnected finance and attendance records'],
    solutions: ['Role-based dashboards', 'Automated SMS and Telegram notices', 'Integrated fee, attendance, and grade modules'],
    scope: 'Typical rollout: 8 to 12 weeks with onboarding and training.',
  },
  healthcare: {
    title: 'Healthcare Operations Platforms',
    hero: 'Improve intake, scheduling, and patient communication end to end.',
    pains: ['Queue bottlenecks at front desk', 'Frequent appointment no-shows', 'Limited reporting across departments'],
    solutions: ['Digital triage and intake', 'Reminder automation and follow-up', 'Operational KPI dashboards for leadership'],
    scope: 'Typical rollout: 8 to 10 weeks with phased deployment.',
  },
  'real-estate': {
    title: 'Real Estate CRM and Leasing',
    hero: 'Unify listings, tenant lifecycle, and payment follow-up workflows.',
    pains: ['Scattered tenant data', 'Manual rent reminders', 'Low visibility into occupancy and renewals'],
    solutions: ['Central tenant and property ledger', 'Automated renewal and payment reminders', 'Lease performance dashboards'],
    scope: 'Typical rollout: 6 to 10 weeks depending on property count.',
  },
  ecommerce: {
    title: 'E-commerce Growth Systems',
    hero: 'Scale storefront performance, checkout conversion, and retention.',
    pains: ['Slow mobile checkout', 'Low repeat purchase rates', 'Unclear campaign attribution'],
    solutions: ['Conversion-first information architecture', 'Lifecycle automation for retention', 'Unified attribution and campaign reporting'],
    scope: 'Typical rollout: 6 to 9 weeks with iterative optimization.',
  },
};

export const serviceFaqs = {
  web: [
    {
      question: 'Do I own the source code and design files after launch?',
      answer: 'Yes. Once final milestone payment is completed, ownership transfers fully to your team.',
    },
    {
      question: 'How long does a typical web project take?',
      answer: 'Most projects run 3 to 8 weeks depending on complexity, integrations, and content readiness.',
    },
    {
      question: 'Can we continue support after launch?',
      answer: 'Yes. We offer annual maintenance and growth retainers with SLA-backed support.',
    },
  ],
  mobile: [
    {
      question: 'Do you build for both Android and iOS?',
      answer: 'Yes. We use cross-platform frameworks and native bridges when required for performance-critical modules.',
    },
    {
      question: 'Do you handle store submission and compliance?',
      answer: 'Yes. We prepare submission artifacts, policy compliance checks, and release checklists for both stores.',
    },
    {
      question: 'Can local payment gateways be integrated?',
      answer: 'Yes. Telebirr, Chapa, and card-processing gateways can be integrated based on business model.',
    },
  ],
  saas: [
    {
      question: 'What is included in SaaS onboarding?',
      answer: 'Setup, data import planning, role setup, and team onboarding sessions are included in initial rollout.',
    },
    {
      question: 'Is there an annual billing advantage?',
      answer: 'Yes. Annual subscriptions are discounted and include planned optimization checkpoints.',
    },
    {
      question: 'How is data backup handled?',
      answer: 'All systems include managed backups, access controls, and regular security update cycles.',
    },
  ],
  additional: [
    {
      question: 'Can add-on services be purchased separately?',
      answer: 'Yes. Each add-on can be scoped independently or bundled with your development package.',
    },
    {
      question: 'Are there recurring commitments for one-time services?',
      answer: 'No. One-time services stay one-time unless you explicitly add maintenance or retainers.',
    },
    {
      question: 'Do you provide custom service bundles?',
      answer: 'Yes. We can assemble bundle pricing based on your launch timeline and growth priorities.',
    },
  ],
};

export const quoteWizardOptions = {
  serviceTypes: [
    'Web Development',
    'Mobile App Development',
    'SaaS Platform',
    'Branding and Additional Services',
  ],
  budgetRanges: ['Under 50k ETB', '50k - 120k ETB', '120k - 250k ETB', '250k+ ETB'],
  timelineRanges: ['2-4 weeks', '1-2 months', '2-4 months', 'Flexible timeline'],
  integrations: ['Telebirr', 'Chapa', 'CRM Sync', 'Analytics Dashboard', 'Multilingual Content'],
};

export const bookingSlotsUtc = [
  '2026-05-04T09:00:00.000Z',
  '2026-05-04T12:00:00.000Z',
  '2026-05-05T09:00:00.000Z',
  '2026-05-05T12:00:00.000Z',
  '2026-05-06T09:00:00.000Z',
  '2026-05-06T12:00:00.000Z',
];

export const liveChatPromptsByRoute = {
  '/': 'Hi NovaTech, I am exploring your services and want quick guidance on the right package.',
  '/web-development': 'Hi NovaTech, I need help choosing the right web development package for my business.',
  '/mobile-development': 'Hi NovaTech, I am planning a mobile app and want a delivery estimate.',
  '/saas-solutions': 'Hi NovaTech, I want to discuss SaaS options for my organization.',
  '/additional-services': 'Hi NovaTech, I need a custom quote for additional services and add-ons.',
  '/case-studies': 'Hi NovaTech, I reviewed your case studies and want to discuss similar outcomes for my business.',
  '/portfolio': 'Hi NovaTech, I am browsing your portfolio and want recommendations for my industry.',
  '/instant-quote': 'Hi NovaTech, I am completing the quote wizard and need help validating scope and budget.',
  '/book-discovery-call': 'Hi NovaTech, I want help choosing the best discovery call slot and agenda.',
  '/policy': 'Hi NovaTech, I have a question about your payment and operational policy.',
  default: 'Hi NovaTech, I want to talk to your team about a digital project.',
};
