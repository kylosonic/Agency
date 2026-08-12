# Fortune-500 Visual System — NovaTech Redesign (Phase 7)

> SUPERSEDED (2026-08-12, ADR-004): AI-forward positioning/framing superseded by software-first prominence + brand rename to "NovaTech" (docs/behaviors/software-development-prominence.md). Locked prices/figures remain in force per ADR-003.

> ✅ **IMPLEMENTED** — Phase 7 shipped 2026-08-08 in commits `3e39452` · `76b41b8` · `8b38348` ·
> `7d0a67e` · `e3caffe` · `f588973` · `4abf0d8` (TECH-21 + TECH-15–20, QA APPROVED per ticket).
> Final gate: 76/76 E2E, lint + build clean, G1–G13 pass, 36 trilingual screenshots,
> 0/12 Amharic glyph issues. NB-18–NB-24 marked [IMPLEMENTED].
> These rules supersede B20–B22 in `launch-readiness.md` where they conflict; B23–B25 and every
> other rule in that file remain in force.

## Scope

Every page of the site (all 11 pages) in all three languages (English, Amharic, Afaan Oromo).
The redesign changes how the site looks and moves. It does not change what the site claims,
what it charges, or how inquiries are handled.

## 1. Base & Rhythm

- **B26.** A visitor sees a light-first site on every page: near-white surfaces, near-black text, and muted gray secondary text. No page shows a dark background as its default state.
- **B27.** Every page shows exactly two near-black bands, in the same two positions on every page: one directly after the services index and one as the final call-to-action band before the footer. A page never adds, removes, or moves a dark band.
- **B28.** The site uses one accent color in two modes: a deep bronze on light surfaces for anything that carries text (links, labels, buttons), readable at the AA contrast standard; and a bright gold on dark bands and large decorative moments only. The accent never appears as a gradient, and never as a background wash behind text on light surfaces.

## 2. Typography

- **B29.** A visitor reads display headlines in a distinctive grotesque family, body copy in a separate readable family, and numbers and labels in a monospaced family. Amharic headlines render in a serif Ethiopic family and Amharic body copy in a sans Ethiopic family. (This replaces the family set locked in B22.)
- **B30.** A visitor reading Amharic never sees clipped or colliding glyphs, fake italics, or transformed letterforms: Amharic text uses taller line spacing than Latin (about 1.8 for body, 1.3 for headlines), never tightens letter spacing below zero, is never italicized or uppercased, and every number and price renders from the Latin family so figures look identical across all three languages.
- **B31.** Every headline block presents exactly three levels — a small label, one large headline, and one quiet supporting line — and never more than three.

## 3. Structure

- **B32.** The hero of every page is typography-led: an oversized headline, aligned to one side, with no product mockup, no dashboard image, and no illustration. Any number shown in or near the hero is a real published fact (a locked price or a published response commitment) — never an invented figure.
- **B33.** Services appear as a ruled editorial index: rows separated by thin lines with monospaced numerals. Equal boxes in a row are prohibited for service listings. Bordered boxes appear only where a distinct action or boundary genuinely earns them.
- **B34.** A visitor can reach every core destination from the header on any page: Services (the single dropdown, containing Web, Mobile, SaaS, AI Automation, and Workflow Audit), Pricing, Instant Quote, Policy, and Contact — plus one prominent action button that leads to Instant Quote. The language switcher (English, Amharic, Afaan Oromo) is always visible in the header.
- **B35.** The header is quiet on the light background and gains a soft blur only after the visitor scrolls. The footer is lean and ordered: four link columns plus a legal bar.

## 4. Material & Motion

- **B36.** The site uses no photography, no illustrations, and no generated imagery anywhere. Visual interest comes from typography, subtle paper-like grain, thin rules, and real artifacts already on the site (published tables, real numbers).
- **B37.** Motion is calm and purposeful: one choreographed reveal when a page opens (elements appear in sequence over roughly half a second), gentle fade-and-rise as sections come into view, and hover states that only shift color or lift slightly. No bouncing, no scrolling logo strips, no decorative looping animation. A visitor who requests reduced motion sees a static page.

## 5. Governance

- **B38.** After the redesign, the automated visitor checks are updated deliberately and recorded: the old dark-only expectations are replaced with light-first expectations, the change is reviewed and documented, and every check passes before the redesign is considered complete.
