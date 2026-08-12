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

export const quoteWizardOptions = {
  serviceTypes: [
    'Web Development',
    'Mobile App Development',
    'SaaS Platform',
    'AI Invoice Processing',
    'Engineering Knowledge Assistant',
    'Sales Order Automation',
  ],
  budgetRanges: ['15k - 40k', '40k - 100k', '100k - 250k', '250k+'],
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
