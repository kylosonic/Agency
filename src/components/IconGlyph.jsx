const ICONS = {
  spark: (
    <>
      <path d="M12 3l2.2 4.8L19 10l-4.8 2.2L12 17l-2.2-4.8L5 10l4.8-2.2L12 3z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
    </>
  ),
  moon: (
    <>
      <path d="M15.2 3.2a8.8 8.8 0 1 0 5.6 15.2A8.1 8.1 0 0 1 15.2 3.2z" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12M18 6L6 18" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.2-2.8 7.8-7 10-4.2-2.2-7-5.8-7-10V6l7-3z" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v10" />
      <path d="M8.5 10.5L12 14l3.5-3.5" />
      <path d="M4 18h16" />
    </>
  ),
  check: (
    <>
      <path d="M5 12.5l4.2 4.2L19 7" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.8v4.6l3 1.9" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="M3.8 7l8.2 6 8.2-6" />
    </>
  ),
  phone: (
    <>
      <path d="M6.5 3.8h3l1.4 3.5-1.7 1.7a14 14 0 0 0 5.8 5.8l1.7-1.7 3.5 1.4v3c0 1-.8 1.8-1.8 1.8C10.2 19.3 4.7 13.8 4.7 6.3c0-1 .8-1.8 1.8-1.8z" />
    </>
  ),
  chat: (
    <>
      <path d="M5 5.5h14v10H9l-4 4V5.5z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.7 6-10.4A6 6 0 0 0 6 10.6C6 15.3 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.9 12h16.2M12 3.5c2.7 2.4 4.1 5.4 4.1 8.5S14.7 18.1 12 20.5M12 3.5c-2.7 2.4-4.1 5.4-4.1 8.5s1.4 6.1 4.1 8.5" />
    </>
  ),
  mobile: (
    <>
      <rect x="7.2" y="3.2" width="9.6" height="17.6" rx="2" />
      <path d="M10.2 6h3.6M11.4 17.2h1.2" />
    </>
  ),
  cloud: (
    <>
      <path d="M7.2 18h9.2a4.1 4.1 0 0 0 .3-8.2 5.5 5.5 0 0 0-10.6 1.8A3.5 3.5 0 0 0 7.2 18z" />
    </>
  ),
  building: (
    <>
      <path d="M4 20V5.5h7.5V20M11.5 9H20V20" />
      <path d="M6.5 8h2M6.5 11h2M6.5 14h2M14 12h2M14 15h2" />
    </>
  ),
  office: (
    <>
      <path d="M4 20V6l8-3 8 3v14" />
      <path d="M8 9h2M14 9h2M8 13h2M14 13h2M11 20v-4h2v4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3v2.2M4.6 6.1l1.6 1.3M17.8 16.6l1.6 1.3M3.5 12h2.2M18.3 12h2.2M4.6 17.9l1.6-1.3M17.8 7.4l1.6-1.3" />
    </>
  ),
  earth: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M7.2 9.1l2.2-2.2 2.8.8 1.8-1.8 2.6.6M7 15.2l2.2.9 1.6 2.3M15.8 18.2l.5-2.6 2.2-1.6" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.2c-5 0-8.8 3.6-8.8 8.3 0 3.8 2.8 6.8 6.5 6.8h.8c1 0 1.8-.8 1.8-1.8 0-.5-.2-1-.6-1.3a1.8 1.8 0 0 1 1.2-3.2h1.5c3.5 0 6.4-2.7 6.4-6.2 0-4.9-4-8.6-8.8-8.6z" />
      <circle cx="7.8" cy="10" r="1" />
      <circle cx="10.8" cy="8.2" r="1" />
      <circle cx="14.2" cy="8.6" r="1" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="M15 15l4 4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  crown: (
    <>
      <path d="M4 18l1.7-9 4.3 3.4L12 6l2 6.4L18.3 9 20 18H4z" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v3.8a4 4 0 0 1-8 0V4z" />
      <path d="M8 6H5.5A2.5 2.5 0 0 0 8 8.5M16 6h2.5A2.5 2.5 0 0 1 16 8.5" />
      <path d="M12 12v4M9 20h6" />
    </>
  ),
  rocket: (
    <>
      <path d="M14.5 4.5c3.3.3 5.2 2.2 5.5 5.5-2.2 2.2-4.8 4.1-8 5.3-1.2-3.2-3-5.8-5.3-8 1.2-3.2 3.1-5.8 7.8-2.8z" />
      <path d="M8.2 13.8l-3.7 3.7M5.5 11.5l2 2M13.8 18.5l2.7 2" />
      <circle cx="14.5" cy="9.5" r="1.4" />
    </>
  ),
  book: (
    <>
      <path d="M5 5.2A2.2 2.2 0 0 1 7.2 3H20v16H7.2A2.2 2.2 0 0 0 5 21V5.2z" />
      <path d="M8 6.8h8" />
    </>
  ),
  hospital: (
    <>
      <path d="M4 20V7.5h16V20" />
      <path d="M12 10v6M9 13h6M7 20v-4h10v4" />
    </>
  ),
  lightning: (
    <>
      <path d="M13 2.8L5.8 13h4.7L9.8 21.2 18.2 10h-4.7L13 2.8z" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10.2h18M7 14.4h4" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 6v5h-5" />
      <path d="M4 18v-5h5" />
      <path d="M18.5 11A7 7 0 0 0 6.6 6.2L5 7.8M5.5 13A7 7 0 0 0 17.4 17.8l1.6-1.6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19h16" />
      <path d="M7 16v-4M12 16V8M17 16v-6" />
    </>
  ),
  idea: (
    <>
      <path d="M8.2 14.8a5.4 5.4 0 1 1 7.6 0c-.8.8-1.3 1.8-1.5 2.9H9.7c-.2-1.1-.7-2.1-1.5-2.9z" />
      <path d="M9.5 20h5" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.6 3.7a4 4 0 0 0-4.9 4.9l-5.2 5.2a1.8 1.8 0 1 0 2.6 2.6l5.2-5.2a4 4 0 0 0 4.9-4.9l-2.5 2.5-2.3-.3-.3-2.3 2.5-2.5z" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M8 3.5v4M16 3.5v4M4 9.5h16" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h4l1.3-2h5.4L16 8h4v10H4V8z" />
      <circle cx="12" cy="13" r="3.2" />
    </>
  )
};

export default function IconGlyph({
  name,
  size = 18,
  className = '',
  strokeWidth = 1.8,
  title,
  ariaHidden = true,
}) {
  const icon = ICONS[name] || ICONS.spark;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      {icon}
    </svg>
  );
}
