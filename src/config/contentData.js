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
      answer: 'Once the final milestone payment clears, ownership of the source code and design files transfers fully to your team.',
    },
    {
      question: 'How long does a typical web project take?',
      answer: 'Most projects run 3 to 8 weeks depending on complexity, integrations, and content readiness.',
    },
    {
      question: 'Can we continue support after launch?',
      answer: 'After launch, monthly maintenance or a broader support retainer can be scoped from the live ETB table when ongoing support is actually needed.',
    },
  ],
  mobile: [
    {
      question: 'Do you build for both Android and iOS?',
      answer: 'Both platforms ship from the same codebase using cross-platform frameworks, with native bridges reserved for performance-critical modules.',
    },
    {
      question: 'Do you handle store submission and compliance?',
      answer: 'Store submission is part of the build — we prepare the submission artifacts, policy compliance checks, and release checklists for both stores.',
    },
    {
      question: 'Can local payment gateways be integrated?',
      answer: 'Telebirr, Chapa, and card gateways can be integrated; the right choice depends on your business model and where your users pay.',
    },
  ],
  saas: [
    {
      question: 'What is included in SaaS onboarding?',
      answer: 'SaaS is waitlist only today, so there is no live onboarding package yet. If you need a system now, start with the Workflow Audit or a scoped custom build.',
    },
    {
      question: 'Is there an annual billing option yet?',
      answer: 'No. There is no monthly or annual SaaS billing until a real product exists and truthful pricing is published.',
    },
    {
      question: 'How is data backup handled?',
      answer: 'Backup, access, and support terms will be published with each product once it is live. We do not promise subscription operations before launch.',
    },
  ],
  additional: [
    {
      question: 'Can add-on services be purchased separately?',
      answer: 'Each add-on can be scoped on its own or bundled with your development package.',
    },
    {
      question: 'Are there recurring commitments for one-time services?',
      answer: 'No. One-time services stay one-time unless you explicitly add maintenance or retainers.',
    },
    {
      question: 'Do you provide custom service bundles?',
      answer: 'Bundles are built around your launch timeline and growth priorities, so pricing follows the scope you actually need.',
    },
  ],
};

export const quoteWizardOptions = {
  serviceTypes: [
    'Web Development',
    'Mobile App Development',
    'SaaS Platform',
    'AI Invoice Processing',
    'Engineering Knowledge Assistant',
    'Sales Order Automation',
  ],
  budgetRanges: ['85k - 150k ETB', '150k - 400k ETB', '400k - 1M ETB', '1M+ ETB'],
  timelineRanges: ['2-4 weeks', '1-2 months', '2-4 months', 'Flexible timeline'],
  integrations: [
    'Telebirr',
    'Chapa',
    'CRM Sync',
    'ERP/Accounting Sync',
    'Inventory Sync',
    'Internal Knowledge Base',
    'Analytics Dashboard',
    'Multilingual Content',
  ],
};

export const liveChatPromptsByRoute = {
  '/': 'Hi NovaTech, I am exploring your services and want quick guidance on the right package.',
  '/web-development': 'Hi NovaTech, I need help choosing the right web development package for my business.',
  '/mobile-development': 'Hi NovaTech, I am planning a mobile app and want a delivery estimate.',
  '/saas-solutions': 'Hi NovaTech, I want to discuss SaaS options for my organization.',
  '/additional-services': 'Hi NovaTech, I need a custom quote for additional services and add-ons.',
  '/instant-quote': 'Hi NovaTech, I am completing the quote wizard and need help validating scope and budget.',
  '/book-discovery-call': 'Hi NovaTech, I want help choosing the best discovery call slot and agenda.',
  '/policy': 'Hi NovaTech, I have a question about your payment and operational policy.',
  default: 'Hi NovaTech, I want to talk to your team about a digital project.',
};
