const CONTACT_EMAIL = 'hello@novatech.et';
const WHATSAPP_NUMBER = '251911000000';

export const SITE_CONTACT = {
  email: CONTACT_EMAIL,
  phoneHref: 'tel:+251911000000',
  phoneDisplay: '+251 911 000 000',
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
  telegramHandle: '@NovaTechET',
  telegramUrl: 'https://t.me/NovaTechET',
  linkedinUrl: 'https://www.linkedin.com/company/novatech-et/',
  locationLabel: 'Addis Ababa, Ethiopia',
  mapsUrl: 'https://maps.google.com/?q=Addis%20Ababa%2C%20Ethiopia',
};

export const DISCOVERY_CALL_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Discovery%20Call%20Request&body=Hi%20NovaTech%2C%20I%20want%20to%20book%20a%20discovery%20call.`;

export function buildWhatsAppMessageLink(message) {
  const params = new URLSearchParams({
    text: message,
  });

  return `${SITE_CONTACT.whatsappUrl}?${params.toString()}`;
}

export function buildTelegramShareLink(message, url = '') {
  const params = new URLSearchParams({
    url,
    text: message,
  });

  return `https://t.me/share/url?${params.toString()}`;
}

export function buildProjectInquiryMailto({ name, email, message }) {
  const subject = `New Project Inquiry - ${name || 'Website Visitor'}`;
  const body = [
    'Hello NovaTech Team,',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'Project Details:',
    message,
    '',
    'Please contact me with next steps.',
  ].join('\n');

  const params = new URLSearchParams({
    subject,
    body,
  });

  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}
