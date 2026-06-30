const DEFAULT_SITE_URL = 'https://novatech.et';

function getEnvValue(value, fallback = '') {
  return (value || fallback).trim();
}

function normalizeSiteUrl(value) {
  const url = (value || DEFAULT_SITE_URL).trim();
  return url.replace(/\/+$/, '');
}

function toTelephoneHref(displayNumber) {
  return `tel:${displayNumber.replace(/[^\d+]/g, '')}`;
}

export const SITE_URL = normalizeSiteUrl(getEnvValue(import.meta.env.VITE_SITE_URL, DEFAULT_SITE_URL));
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png?v=20260512`;
export const PRICING_GUIDE_ASSET_PATH = '/NovaTech_AI_2026_Pricing_Guide_v3.pdf';

const CONTACT_EMAIL = getEnvValue(import.meta.env.VITE_CONTACT_EMAIL, 'nahomgwmichael@gmail.com');
const PHONE_DISPLAY = getEnvValue(import.meta.env.VITE_CONTACT_PHONE_DISPLAY, '+251 944 191 603');
const PHONE_HREF = getEnvValue(import.meta.env.VITE_CONTACT_PHONE_HREF, toTelephoneHref(PHONE_DISPLAY));
const WHATSAPP_NUMBER = getEnvValue(import.meta.env.VITE_WHATSAPP_NUMBER, '251944191603');
const TELEGRAM_HANDLE = getEnvValue(import.meta.env.VITE_TELEGRAM_HANDLE, '@NovaTechET');
const TELEGRAM_URL = getEnvValue(import.meta.env.VITE_TELEGRAM_URL, 'https://t.me/NovaTechET');
const LINKEDIN_URL = getEnvValue(import.meta.env.VITE_LINKEDIN_URL, 'https://www.linkedin.com/company/novatech-et/');
const LOCATION_LABEL = getEnvValue(import.meta.env.VITE_LOCATION_LABEL, 'Addis Ababa, Ethiopia');
const MAPS_URL = getEnvValue(import.meta.env.VITE_MAPS_URL, 'https://maps.google.com/?q=Addis%20Ababa%2C%20Ethiopia');

export const SITE_CONTACT = {
  email: CONTACT_EMAIL,
  phoneHref: PHONE_HREF,
  phoneDisplay: PHONE_DISPLAY,
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
  telegramHandle: TELEGRAM_HANDLE,
  telegramUrl: TELEGRAM_URL,
  linkedinUrl: LINKEDIN_URL,
  locationLabel: LOCATION_LABEL,
  mapsUrl: MAPS_URL,
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
