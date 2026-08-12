import { Children, cloneElement, createElement, isValidElement } from 'react';

/**
 * M-1 (TECH-33) — one choreographed editorial reveal for marketing heroes.
 *
 * Each direct child of <HeroChoreo> is one phase — eyebrow → headline →
 * subcopy → CTA row — and starts PHASE_GAP_MS (150ms, inside the 120–200ms
 * contract window) after the previous phase. Every phase animates
 * PHASE_DUR_MS (400ms) as a fade-and-rise (translateY 20px → 0, opacity
 * 0 → 1, cubic-bezier ease-out, transform/opacity only — G-4). For the
 * largest hero (6 phases) the last settle lands at 5 × 150 + 400 = 1150ms
 * — inside the ≤1.2s total budget (G-3). Nothing loops; nothing moves after.
 *
 * EN headlines render a per-word stagger via <HeroChoreoHeadline>
 * (60ms step, 300ms per word). Under :lang(am) / :lang(om) the headline
 * reveals as ONE BLOCK — no per-word splitting (Ethiopic glyph integrity,
 * B30) — via CSS overrides in index.css.
 *
 * prefers-reduced-motion: the index.css freeze list renders every phase and
 * word fully static at opacity 1 (G-1) — the hero is fully rendered on first
 * paint. Hero choreography is the only load-triggered motion on the page (G-2);
 * the route-level page transition (TECH-34) never overlaps it (first load has
 * no transition).
 */

const PHASE_GAP_MS = 150;
const PHASE_DUR_MS = 400;
const WORD_STEP_MS = 60;
const WORD_DUR_MS = 300;

/**
 * Flatten headline children into word-level parts: text strings split into
 * words AND their original separators (spaces, U+00A0 nbsp) — separators are
 * kept as plain text nodes so innerText, line-wrapping, and screen readers
 * keep real whitespace between the word spans. Element children (e.g. the
 * verb em) stay intact as opaque atoms. No mutation during render.
 */
function flattenHeadlineParts(children) {
  const parts = [];

  Children.toArray(children).forEach((child) => {
    if (typeof child === 'string') {
      parts.push(...child.split(/(\s+)/).filter((token) => token.length > 0));
      return;
    }

    if (isValidElement(child)) {
      parts.push(child);
    }
  });

  return parts;
}

const isWordPart = (part) => typeof part !== 'string' || !/^\s+$/.test(part);

/**
 * Headline phase that splits its text into `.hero-choreo-word` spans for the
 * EN per-word stagger. Element children (e.g. <em className="verb">) stay
 * intact as opaque single-word spans. The `--word-index` custom property
 * drives each word's animation-delay in CSS; the ordinal is derived without
 * mutation (slice-count), keeping the component lint-clean.
 */
export function HeroChoreoHeadline({ tag: Tag = 'h1', children, className = '', ...rest }) {
  const parts = flattenHeadlineParts(children);
  const words = parts.map((part, key) => {
    if (!isWordPart(part)) {
      return part; // original separator — real whitespace between words
    }

    const index = parts.slice(0, key).filter(isWordPart).length;
    return (
      <span key={key} className="hero-choreo-word" style={{ '--word-index': index }}>
        {part}
      </span>
    );
  });

  // createElement so the dynamic tag counts as a value usage (JSX usage is
  // not tracked by the repo's no-unused-vars config).
  return createElement(
    Tag,
    { className: `hero-choreo-headline ${className}`.trim(), ...rest },
    words
  );
}

export default function HeroChoreo({ children, className = '' }) {
  const phases = Children.toArray(children);

  return (
    <div className={`hero-choreo ${className}`.trim()}>
      {phases.map((child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        return cloneElement(child, {
          className: `${child.props.className ?? ''} hero-choreo__item`.trim(),
          style: {
            ...(child.props.style ?? {}),
            '--choreo-delay': `${index * PHASE_GAP_MS}ms`,
            '--choreo-dur': `${PHASE_DUR_MS}ms`,
          },
        });
      })}
    </div>
  );
}
