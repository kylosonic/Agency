import { useState } from 'react';
import { useLanguage } from '../i18n/useLanguage';

/**
 * TECH-47 (NB-49 / R-10, R-16 imagery exception): artifact-framed case-study
 * card. Hairline border, mono UPPERCASE caption ("LIVE PRODUCT · …"), lazy
 * WebP screenshot with fixed max dimensions, alt text via i18n (EN/AM/OM),
 * `onError` → image hidden (text-only card — covers both a build-time SKIP
 * and a missing/blocked asset). Card copy = R-10 locked copy; the claim level
 * is "Designed and developed by NovaTech" (no client business claims).
 * External link opens in a new tab (target="_blank" rel="noopener noreferrer").
 */
export default function CaseStudyCard({
  captionKey,
  captionFallback,
  titleKey,
  titleFallback,
  descriptionKey,
  descriptionFallback,
  categoryKey,
  categoryFallback,
  altKey,
  altFallback,
  imageUrl,
  href,
}) {
  const { t } = useLanguage();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="case-study-card glass-card">
      <div className="eyebrow">{t(captionKey, captionFallback)}</div>

      {!imageFailed ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="case-study-card__shot"
          aria-label={`${t(titleKey, titleFallback)} — ${t(altKey, altFallback)}`}
        >
          <img
            src={imageUrl}
            alt={t(altKey, altFallback)}
            loading="lazy"
            width="1440"
            height="900"
            onError={() => setImageFailed(true)}
          />
        </a>
      ) : null}

      <div className="case-study-card__body">
        <p className="editorial-kicker">{t(categoryKey, categoryFallback)}</p>
        <h3>{t(titleKey, titleFallback)}</h3>
        <p>{t(descriptionKey, descriptionFallback)}</p>
        <p className="editorial-note">
          Designed and developed by NovaTech.
        </p>
        <a className="editorial-inline-link" href={href} target="_blank" rel="noopener noreferrer">
          Visit live product
        </a>
      </div>
    </article>
  );
}
