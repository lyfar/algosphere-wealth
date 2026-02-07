# Algosphere Website Roadmap

Based on deep research (622 sources, Feb 2026).

## Phase 1: Foundation & Multi-Page Structure
**Priority: HIGH | ETA: 1-2 days**

### Task 1.1: Page Architecture
Convert single-page to multi-page Astro site:
- `/` — Home (cinematic hero + key metrics + latest insights teaser)
- `/about` — Company (founding story, CBA license, governance, team placeholder)
- `/approach` — Investment Approach (philosophy, process flow, risk management)
- `/funds` — Funds (public info + gated section for qualified investors)
- `/insights` — Insights/Research (market commentary, "Why Armenia" piece)
- `/contact` — Contact (form + details + map)
- `/legal` — Legal & Compliance (disclaimers, privacy, KYC/AML)

### Task 1.2: Navigation Upgrade
- Multi-page nav with active state
- Investor Portal button (login/gate placeholder)
- Trilingual switcher (AM/EN/RU)
- Mobile responsive hamburger with all pages

### Task 1.3: i18n System for 3 Languages
- Upgrade from AM/EN to AM/EN/RU
- URL structure: `/en/about`, `/hy/about`, `/ru/about` (or keep switcher-based)
- Central translation file with all 3 languages
- Legal content in Armenian (CBA requirement)

## Phase 2: Content & Design Polish
**Priority: HIGH | ETA: 2-3 days**

### Task 2.1: Hero Section Upgrade
- Video hero or cinematic Armenian landscape loop
- Animated key metrics (AUM placeholder, CBA license #, fund type)
- Premium serif headlines (Playfair Display or similar)
- "Qualified Investors Only" gate messaging

### Task 2.2: About Page
- Founding story connecting to Armenian economic transformation
- CBA license & regulatory status prominently displayed
- Third-party partners section (auditor, custodian, legal counsel)
- Corporate governance structure
- "Algo" = algorithmic/quantitative approach narrative

### Task 2.3: Investment Approach Page
- Visual investment process flow: Sourcing → Diligence → Execution → Monitoring
- Risk management framework
- ESG integration stance
- Diagrams/infographics (D3.js or static SVG)

### Task 2.4: Team Page (placeholder)
- Professional headshot layout (client to provide photos)
- Bio template: international credentials, CFA/ACCA, institutional experience
- Advisory board section

### Task 2.5: Funds Page with Investor Gate
- Public info: fund structure, objectives, asset classes
- "Qualified Investor" self-certification gate
- Behind gate: placeholder for PPMs, performance data, subscription docs
- Login/portal stub for future development

### Task 2.6: Insights Page
- Blog/article layout for market commentary
- "Why Armenia" flagship investment thesis article
- Quarterly letter template
- Clean typography for long-form reading

### Task 2.7: Contact Page
- Contact form (Formspree or similar)
- Office details + embedded map (Yerevan, Argishtii 7/6)
- Phone, email, hours
- Social links placeholder

### Task 2.8: Legal/Compliance Page
- Regulatory disclaimers (3 languages)
- Risk warnings per CBA requirements
- Privacy policy (GDPR for EU diaspora)
- Cookie consent mechanism
- KYC/AML process disclosure

## Phase 3: Armenian Cultural Design Elements
**Priority: MEDIUM | ETA: 1-2 days**

### Task 3.1: Color Palette Refinement
Research suggested pivot from pure black to navy:
- Deep navy #1E3A8A as primary trust color
- Apricot gold #D4A853 (Armenia's national orange → prosperity)
- Near-black #111827 for text
- Warm gray #F5F5F0 for light sections
- Burgundy accent #722F37 (Armenian brandy heritage)
- Keep as CSS vars — easy to A/B test with current dark theme

### Task 3.2: Typography
- Headlines: Playfair Display (or Cormorant Garamond — already using)
- Body: Inter (already using)
- Armenian script: find proper bilingual typeface (Granshan community)
- Consider Armenian letter Ա as design accent

### Task 3.3: Cultural Motifs
- Arevakhach (Wheel of Eternity) — subtle geometric patterns
- Khachkar patterns as background textures
- Armenian landscape photography (Ararat, monasteries, modern Yerevan)
- Subtle, rewards closer inspection — not nationalistic

## Phase 4: SEO & Technical
**Priority: MEDIUM | ETA: 1 day**

### Task 4.1: Meta & SEO
- FinancialService schema markup
- hreflang tags for trilingual content
- Google Business Profile optimization
- Target keywords: "asset management Armenia", "investment management Yerevan"
- OG images for social sharing

### Task 4.2: Performance
- Target: <2s page load
- Astro image optimization (WebP/AVIF)
- Lazy loading below-fold
- Lighthouse audit → 90+ scores

### Task 4.3: Security Headers
- CSP headers
- HSTS enforcement
- X-Frame-Options, X-Content-Type-Options

## Phase 5: Future (Post-Launch)
**Priority: LOW | When client requests**

- Investor portal with Auth0/Okta
- Document sharing system (PDFs with watermarking)
- Interactive fund performance charts (D3.js)
- Blog CMS integration (Sanity or Payload)
- Email newsletter signup
- Russian language full translation

---

## Execution Order (Next Steps)
1. **Task 1.1** — Multi-page structure (biggest architectural change)
2. **Task 1.2** — Navigation for multi-page
3. **Task 2.1** — Hero upgrade
4. **Task 2.2-2.8** — Individual pages (can be parallelized)
5. **Task 1.3** — Russian language
6. **Phase 3** — Design refinements
7. **Phase 4** — SEO & performance
