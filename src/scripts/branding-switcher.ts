/**
 * Branding page theme switcher — handles card selection UI,
 * swatch updates, combo card colors, typography accents, and
 * do/don't guideline styling. Imported as <script> on branding page.
 */
import { getTheme, getSavedThemeId, saveTheme, applyThemeToPage, hexToRGB, type ThemeConfig } from './theme';

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll<HTMLButtonElement>('.theme-card');

  function applyBrandingTheme(theme: ThemeConfig) {
    // 1) Apply global CSS vars (backgrounds, text, gradients, scrollbar)
    applyThemeToPage(theme);

    // 2) Save to localStorage so homepage picks it up
    saveTheme(theme.id);

    // 3) Update cards UI — selected card gets accent border + subtle bg
    cards.forEach(c => {
      if (c.dataset.theme === theme.id) {
        c.style.borderColor = theme.accent + '55';
        c.style.background = theme.accent + '0A';
        c.style.boxShadow = `0 0 0 1px ${theme.accent}22, 0 4px 20px ${theme.accent}08`;
      } else {
        c.style.borderColor = '';
        c.style.background = '';
        c.style.boxShadow = '';
      }
    });

    // 4) Logo showcase backgrounds (logo mark stays gold)
    const logoDark = document.getElementById('logo-dark-bg');
    const logoLight = document.getElementById('logo-light-bg');
    const logoH = document.getElementById('logo-h-lockup');
    const logoV = document.getElementById('logo-v-lockup');
    if (logoDark) logoDark.style.background = theme.bgDark;
    if (logoLight) logoLight.style.background = theme.bgLight;
    if (logoH) logoH.style.background = theme.bgDark;
    if (logoV) logoV.style.background = theme.bgDark;

    // Lockup text colors (wordmark adapts, logo mark stays gold)
    document.querySelectorAll<HTMLElement>('.lockup-title').forEach(el => {
      el.style.color = theme.textOnDark;
    });
    document.querySelectorAll<HTMLElement>('.lockup-sub').forEach(el => {
      el.style.color = theme.accentLight;
    });

    // 5) Palette swatches
    const setS = (elId: string, color: string) => {
      const el = document.getElementById(elId);
      if (el) el.style.background = color;
      const hexEl = document.getElementById(elId + '-hex');
      if (hexEl) {
        hexEl.textContent = color.toUpperCase();
        hexEl.style.color = theme.accent;
      }
    };
    setS('swatch-accent', theme.accent);
    setS('swatch-accent-light', theme.accentLight);
    setS('swatch-accent-dark', theme.accentDark);
    setS('swatch-bg-dark', theme.bgDark);
    setS('swatch-bg-light', theme.bgLight);
    setS('swatch-secondary', theme.secondary);

    // 6) Combination cards — contrast-aware text colors
    const { r: tr, g: tg, b: tb } = hexToRGB(theme.textOnDark);
    const { r: tlr, g: tlg, b: tlb } = hexToRGB(theme.textOnLight);

    function luminance(hex: string): number {
      const { r, g, b } = hexToRGB(hex);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    }

    const textForSecondary = luminance(theme.secondary) > 0.5 ? theme.bgDark : theme.textOnDark;
    const labelForSecondary = luminance(theme.secondary) > 0.5
      ? `rgba(${hexToRGB(theme.bgDark).r}, ${hexToRGB(theme.bgDark).g}, ${hexToRGB(theme.bgDark).b}, 0.5)`
      : `rgba(${tr}, ${tg}, ${tb}, 0.4)`;

    const combos: Record<string, { bg: string }> = {
      'combo-accent-dark': { bg: theme.bgDark },
      'combo-text-dark': { bg: theme.bgDark },
      'combo-text-light': { bg: theme.bgLight },
      'combo-accent-secondary': { bg: theme.secondary },
      'combo-secondary-dark': { bg: theme.bgDark },
      'combo-hero': { bg: theme.bgDark },
    };
    for (const [elId, colors] of Object.entries(combos)) {
      const card = document.getElementById(elId);
      if (!card) continue;
      card.style.background = colors.bg;
      card.querySelectorAll<HTMLElement>('.combo-text-accent').forEach(el => { el.style.color = theme.accent; });
      card.querySelectorAll<HTMLElement>('.combo-text-primary').forEach(el => { el.style.color = theme.textOnDark; });
      card.querySelectorAll<HTMLElement>('.combo-text-on-light').forEach(el => { el.style.color = theme.textOnLight; });
      card.querySelectorAll<HTMLElement>('.combo-text-accent-light').forEach(el => { el.style.color = textForSecondary; });
      card.querySelectorAll<HTMLElement>('.combo-text-secondary').forEach(el => { el.style.color = theme.secondary; });
    }

    // Fix label on secondary card
    const secCard = document.getElementById('combo-accent-secondary');
    if (secCard) {
      secCard.querySelectorAll<HTMLElement>('.combo-label-on-dark').forEach(el => {
        el.style.color = labelForSecondary;
      });
    }

    // 7) Typography accents
    document.querySelectorAll<HTMLElement>('.typo-accent').forEach(el => {
      el.style.color = theme.accent + 'D9';
    });

    // 8) Do/Don't guideline styling
    document.querySelectorAll<HTMLElement>('.guideline-icon, .guideline-strong, .guideline-bullet').forEach(el => {
      el.style.color = theme.accent + 'D9';
    });
    document.querySelectorAll<HTMLElement>('.do-card').forEach(el => {
      el.style.borderLeftColor = theme.accent + '66';
    });

    const dontColor = theme.secondary === '#D4AF37' ? '#9B3A3A' : theme.secondary;
    document.documentElement.style.setProperty('--dont-color', dontColor);
    document.querySelectorAll<HTMLElement>('.dont-bullet').forEach(el => {
      el.style.color = dontColor;
    });

    // 9) Combo/logo card labels
    document.querySelectorAll<HTMLElement>('.combo-label-on-dark').forEach(el => {
      el.style.color = `rgba(${tr}, ${tg}, ${tb}, 0.4)`;
    });
    document.querySelectorAll<HTMLElement>('.combo-label-on-light').forEach(el => {
      el.style.color = `rgba(${tlr}, ${tlg}, ${tlb}, 0.4)`;
    });
    document.querySelectorAll<HTMLElement>('.logo-label-dark').forEach(el => {
      el.style.color = `rgba(${tr}, ${tg}, ${tb}, 0.4)`;
    });
  }

  // Apply saved theme on load
  const savedId = getSavedThemeId();
  const savedTheme = getTheme(savedId);
  applyBrandingTheme(savedTheme);

  // Click handlers
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const theme = getTheme(card.dataset.theme || 'gold-classic');
      applyBrandingTheme(theme);
    });
  });
});
