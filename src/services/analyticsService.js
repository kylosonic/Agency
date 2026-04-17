const ANALYTICS_ENDPOINT = (import.meta.env.VITE_ANALYTICS_ENDPOINT || '').trim();

const isBrowser = typeof window !== 'undefined';

function getSafeLocation() {
  if (!isBrowser) {
    return {
      path: '',
      href: '',
    };
  }

  return {
    path: window.location.pathname,
    href: window.location.href,
  };
}

function sendToCustomEndpoint(payload) {
  if (!isBrowser || !ANALYTICS_ENDPOINT) {
    return;
  }

  const body = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon(ANALYTICS_ENDPOINT, blob);
    return;
  }

  fetch(ANALYTICS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  }).catch(() => {
    // Avoid throwing in UI flows if analytics delivery fails.
  });
}

export function trackEvent(eventName, metadata = {}) {
  if (!isBrowser || !eventName) {
    return;
  }

  const location = getSafeLocation();
  const payload = {
    eventName,
    timestamp: new Date().toISOString(),
    pagePath: location.path,
    pageHref: location.href,
    ...metadata,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, metadata);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...metadata,
    });
  }

  sendToCustomEndpoint(payload);

  if (import.meta.env.DEV) {
    console.info('[analytics]', payload);
  }
}

export function trackPageView(pagePath) {
  trackEvent('page_view', {
    pagePath,
    pageTitle: typeof document !== 'undefined' ? document.title : '',
  });
}

export function trackPricingGuideIntent(source) {
  trackEvent('pricing_guide_intent', { source });
}

export function trackPricingGuideOpened(source) {
  trackEvent('pricing_guide_opened', { source });
}

export function trackDiscoveryCallClick(source) {
  trackEvent('discovery_call_clicked', { source });
}

export function trackContactFormAttempt(source) {
  trackEvent('contact_form_attempt', { source });
}

export function trackContactFormOutcome(outcome, source, reason = '') {
  trackEvent('contact_form_outcome', {
    outcome,
    source,
    reason,
  });
}

export function trackContactChannelClick(channel, source) {
  trackEvent('contact_channel_clicked', {
    channel,
    source,
  });
}
