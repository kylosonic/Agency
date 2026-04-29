const CRM_QUEUE_STORAGE_KEY = 'novatech-crm-queue';

function getLocalStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
}

function safeParseQueue(rawValue) {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function inferInterestTag(source = '', routePath = '') {
  const key = `${source} ${routePath}`.toLowerCase();

  if (key.includes('mobile')) {
    return 'mobile_app';
  }

  if (key.includes('saas') || key.includes('school') || key.includes('clinic') || key.includes('hospital')) {
    return 'saas';
  }

  if (key.includes('additional') || key.includes('branding') || key.includes('hosting')) {
    return 'additional_services';
  }

  if (key.includes('marketing')) {
    return 'marketing';
  }

  if (key.includes('quote')) {
    return 'instant_quote';
  }

  if (key.includes('call') || key.includes('booking')) {
    return 'discovery_call';
  }

  return 'web_development';
}

function createFollowUps({ leadName, source, interestTag, createdAt }) {
  const createMessage = (hours, channel) => ({
    id: `${createdAt}-${hours}-${channel}`,
    sendAfterHours: hours,
    scheduledAt: new Date(new Date(createdAt).getTime() + hours * 60 * 60 * 1000).toISOString(),
    channel,
    subject: channel === 'email' ? `Follow-up: ${interestTag.replace('_', ' ')} plan` : 'Lead follow-up',
    message:
      channel === 'email'
        ? `Hi ${leadName || 'there'}, this is a quick follow-up on your ${interestTag.replace('_', ' ')} request from NovaTech (${source}).`
        : `Follow up with ${leadName || 'lead'} on ${interestTag.replace('_', ' ')} request (${source}).`,
  });

  return [
    createMessage(1, 'email'),
    createMessage(24, 'email'),
    createMessage(72, 'telegram'),
  ];
}

export function queueLeadFollowups({ lead = {}, source = '', channel = 'website', routePath = '' }) {
  const storage = getLocalStorage();
  if (!storage) {
    return null;
  }

  const createdAt = new Date().toISOString();
  const interestTag = inferInterestTag(source, routePath);

  const normalizedLead = {
    name: normalizeValue(lead.name),
    email: normalizeValue(lead.email),
    company: normalizeValue(lead.company),
    message: normalizeValue(lead.message),
    phone: normalizeValue(lead.phone),
  };

  const record = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    createdAt,
    source: source || `route:${routePath || '/'}`,
    channel,
    interestTag,
    lead: normalizedLead,
    followUps: createFollowUps({
      leadName: normalizedLead.name,
      source: source || routePath,
      interestTag,
      createdAt,
    }),
    status: 'queued',
  };

  const queue = safeParseQueue(storage.getItem(CRM_QUEUE_STORAGE_KEY));
  queue.unshift(record);
  storage.setItem(CRM_QUEUE_STORAGE_KEY, JSON.stringify(queue.slice(0, 120)));

  return record;
}

export function getQueuedLeads() {
  const storage = getLocalStorage();
  if (!storage) {
    return [];
  }

  return safeParseQueue(storage.getItem(CRM_QUEUE_STORAGE_KEY));
}

export function clearQueuedLeads() {
  const storage = getLocalStorage();
  if (!storage) {
    return;
  }

  storage.removeItem(CRM_QUEUE_STORAGE_KEY);
}
