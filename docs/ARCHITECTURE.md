# Algosphere Website — Architecture

## Stack
- **Framework**: Astro 5 (static site generation)
- **Styling**: Tailwind CSS v4 + custom CSS
- **Animations**: GSAP + Lenis (smooth scroll)
- **Fonts**: Cormorant Garamond (headings), Inter (body), Montserrat (nav wordmark)
- **Deploy**: GitHub Pages (auto on push to `main`)
- **Domain**: algosphere.lyfar.com

## Theme System

The site supports 6 color themes, selectable from `/branding`. The selected theme persists in `localStorage` and applies across all pages.

### How it works

1. **`src/scripts/theme.ts`** — Shared theme engine
   - Exports `THEMES[]` with 6 color configs (Gold Classic, Deep Navy, Emerald, Burgundy, Platinum, Sapphire & Gold)
   - `applyThemeToPage(theme)` — sets 37+ CSS custom properties on `:root`
   - `initTheme()` — reads localStorage, applies saved theme on page load
   - Injects dynamic `<style>` for gradients, scrollbar, selection colors

2. **CSS Custom Properties** (`src/styles/global.css` `@theme` block)
   - 38 variables defined as Gold Classic defaults
   - `--gold-r/g/b` and `--text-r/g/b` — raw RGB channels for `rgba()` compositing in CSS
   - Theme engine overrides all of these at runtime

3. **Page integration**
   - `index.astro` — calls `initTheme()` directly
   - All subpages — call `initTheme()` via `SubpageScripts.astro`
   - `branding.astro` — has its own theme switcher UI + calls `applyThemeToPage()` + `saveTheme()`

### Logo behavior
- Logo mark (`/logo-mark.svg`) **always stays gold** — no filters, no recoloring
- Wordmark text ("Algosphere", "Asset Management") adapts to theme text colors

### Theme color flow
```
User clicks theme pill on /branding
  → applyThemeToPage() sets 37+ CSS vars on :root
  → saveTheme() writes to localStorage
  → User navigates to homepage
  → initTheme() reads localStorage
  → applyThemeToPage() applies same vars
  → All Tailwind classes using var() tokens update automatically
```

## File Structure

```
src/
├── components/
│   ├── About.astro          — About section (homepage)
│   ├── Contact.astro         — Contact section (homepage)
│   ├── Footer.astro          — Homepage footer
│   ├── GlassCard.astro       — Reusable glass-morphism card
│   ├── GoldDivider.astro     — Themed horizontal divider
│   ├── Hero.astro            — Homepage hero section
│   ├── LanguageSwitcher.astro — EN/HY/RU language toggle
│   ├── Navigation.astro      — Site-wide nav bar
│   ├── PageFooter.astro      — Subpage footer
│   ├── PageHero.astro        — Subpage hero (title + subtitle)
│   ├── Principles.astro      — Investment principles section
│   ├── SectionHeader.astro   — Reusable section heading
│   └── SubpageScripts.astro  — Shared scripts for subpages (Lenis, cursor, nav, theme)
├── layouts/
│   └── Layout.astro          — Base HTML layout (head, fonts, meta)
├── pages/
│   ├── index.astro           — Homepage
│   ├── about.astro           — About/Team page
│   ├── approach.astro        — Investment approach
│   ├── branding.astro        — Brand direction + theme picker (not in nav)
│   ├── contact.astro         — Contact page
│   ├── funds.astro           — Fund information
│   ├── insights.astro        — Market insights
│   └── legal.astro           — Legal disclaimers
├── scripts/
│   ├── animations.ts         — GSAP scroll reveals, hero animation, parallax
│   ├── cursor.ts             — Custom cursor effect
│   ├── language.ts           — Language switching logic
│   ├── navigation.ts         — Navbar scroll behavior, mobile menu
│   ├── particles.ts          — Canvas particle network (theme-aware)
│   └── theme.ts              — Theme engine (shared across all pages)
└── styles/
    ├── global.css            — @theme vars, base styles, text-gold-gradient, scrollbar
    ├── components.css        — Component styles (glass cards, buttons, nav, hero, sections)
    └── animations.css        — GSAP reveal animation keyframes
```

## CSS Architecture

### Variable naming convention
- `--color-bg-*` — Background colors (primary, secondary, card, elevated, navy, navy-light)
- `--color-text-*` — Text colors (primary, secondary, muted)
- `--color-gold-*` — Accent palette (400, light, dark, accent, soft, warm)
- `--color-card-*` — Card-specific (title, body, body-muted)
- `--color-nav-*` — Navigation (text, text-hover, text-active)
- `--color-glass-*` — Glass-morphism (bg, border)
- `--color-footer-*` — Footer (text, muted)
- `--color-hero-*` — Hero section (tagline, accent)
- `--gold-r/g/b` — Raw RGB channels for CSS rgba() usage
- `--text-r/g/b` — Raw RGB channels for text color compositing
- `--font-heading` / `--font-body` — Font stacks

### No hardcoded colors rule
All color values in CSS use `var()` references or `rgba(var(--gold-r), ...)` patterns.
Hardcoded hex values only appear in:
1. `@theme` block in global.css (default definitions)
2. `theme.ts` THEMES array (source of truth)
3. SSR defaults in branding.astro (overridden by JS on load)

## Conventions

- **All pages** must import `Layout` and include `SubpageScripts` (or equivalent for homepage)
- **All pages** must call `initTheme()` on DOMContentLoaded
- **GSAP classes**: `gs-reveal`, `gs-reveal-scale`, `gs-reveal-left`, `gs-reveal-right`, `gs-hero-el`, `gs-line-h`
- **Ambient blobs**: `ambient-blob bg-gold-400` / `bg-burgundy-400` / `bg-navy-400`
- **Glass cards**: use `.glass-card` class, never raw `backdrop-filter`
- **Section accents**: `.section-accent` + `.section-label` for section headers

## Client Info
- **Company**: Algosphere Asset Management, Yerevan, Armenia
- **Licensed by**: Central Bank of Armenia
- **Contact**: Artour (via Natasha)
- **Budget**: €3,000 net
