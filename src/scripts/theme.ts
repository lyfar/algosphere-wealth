/**
 * Theme Engine — shared between branding page and all other pages.
 * Stores selected theme in localStorage, applies via CSS custom properties.
 * Logo always stays gold (no recoloring).
 */

export interface ThemeConfig {
  id: string;
  name: string;
  desc: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  bgDark: string;
  bgLight: string;
  textOnDark: string;
  textOnLight: string;
  secondary: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'gold-classic',
    name: 'Gold Classic',
    desc: 'Timeless. The original palette of old-world finance.',
    accent: '#D4AF37',
    accentLight: '#F0D78C',
    accentDark: '#A48111',
    bgDark: '#0A0A0A',
    bgLight: '#F5F0E8',
    textOnDark: '#F5F5F5',
    textOnLight: '#1A1A1A',
    secondary: '#722F37',
  },
  {
    id: 'deep-navy',
    name: 'Deep Navy',
    desc: 'Trust. The confidence of institutional banking.',
    accent: '#5B8DB8',
    accentLight: '#8EBAE0',
    accentDark: '#2E5A7E',
    bgDark: '#0B1628',
    bgLight: '#EFF4F9',
    textOnDark: '#E8ECF0',
    textOnLight: '#0B1628',
    secondary: '#D4AF37',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    desc: 'Growth. Prosperity with measured restraint.',
    accent: '#3D8B6E',
    accentLight: '#6BB89A',
    accentDark: '#1F5C44',
    bgDark: '#0A1410',
    bgLight: '#EFF6F2',
    textOnDark: '#E8F0EC',
    textOnLight: '#0A1410',
    secondary: '#C4A35A',
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    desc: 'Heritage. Armenian warmth meets financial authority.',
    accent: '#8B3A42',
    accentLight: '#C06B75',
    accentDark: '#5C1F26',
    bgDark: '#120A0B',
    bgLight: '#F5EEEF',
    textOnDark: '#F0E8E9',
    textOnLight: '#120A0B',
    secondary: '#D4AF37',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    desc: 'Precision. Monochromatic clarity for modern wealth.',
    accent: '#9CA3AF',
    accentLight: '#D1D5DB',
    accentDark: '#6B7280',
    bgDark: '#09090B',
    bgLight: '#F4F4F5',
    textOnDark: '#E4E4E7',
    textOnLight: '#18181B',
    secondary: '#D4AF37',
  },
  {
    id: 'sapphire',
    name: 'Sapphire & Gold',
    desc: 'Regal. The crown jewels of investment management.',
    accent: '#2E4A8E',
    accentLight: '#5A7AC4',
    accentDark: '#1B2D5A',
    bgDark: '#080C1A',
    bgLight: '#EBEEF6',
    textOnDark: '#E0E4F0',
    textOnLight: '#080C1A',
    secondary: '#D4AF37',
  },
];

const STORAGE_KEY = 'algosphere-theme';

/** Parse hex (#RRGGBB) to {r,g,b} 0-255 */
function hexToRGB(hex: string): { r: number; g: number; b: number } {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** Get currently saved theme id, fallback to gold-classic */
export function getSavedThemeId(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'gold-classic';
  } catch {
    return 'gold-classic';
  }
}

/** Get theme config by id */
export function getTheme(id: string): ThemeConfig {
  return THEMES.find(t => t.id === id) || THEMES[0];
}

/** Save theme to localStorage */
export function saveTheme(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch { /* noop */ }
}

/**
 * Apply theme colors to the entire page via CSS custom properties.
 * This updates the @theme tokens so all Tailwind classes pick them up.
 * Logo stays untouched (always gold).
 */
export function applyThemeToPage(theme: ThemeConfig): void {
  const root = document.documentElement;
  const { r: ar, g: ag, b: ab } = hexToRGB(theme.accent);

  // Core accent colors (override the gold-* tokens)
  root.style.setProperty('--color-gold-400', theme.accent);
  root.style.setProperty('--color-gold-light', theme.accentLight);
  root.style.setProperty('--color-gold-dark', theme.accentDark);
  root.style.setProperty('--color-gold-accent', `rgba(${ar}, ${ag}, ${ab}, 0.85)`);
  root.style.setProperty('--color-gold-soft', `rgba(${ar}, ${ag}, ${ab}, 0.65)`);
  root.style.setProperty('--color-gold-warm', theme.accent);

  // Backgrounds
  root.style.setProperty('--color-bg-primary', theme.bgDark);
  root.style.setProperty('--color-bg-secondary', adjustBrightness(theme.bgDark, 10));
  root.style.setProperty('--color-bg-card', adjustBrightness(theme.bgDark, 16));
  root.style.setProperty('--color-bg-elevated', adjustBrightness(theme.bgDark, 26));

  // Text
  root.style.setProperty('--color-text-primary', theme.textOnDark);

  // Section label & nav
  root.style.setProperty('--color-section-label', `rgba(${ar}, ${ag}, ${ab}, 0.65)`);
  root.style.setProperty('--color-nav-text-hover', theme.accent);
  root.style.setProperty('--color-nav-text-active', theme.accent);

  // Secondary / cultural accent
  root.style.setProperty('--color-accent-burgundy', theme.secondary);

  // Navy section backgrounds: subtle lift from bgDark, no blue tint
  root.style.setProperty('--color-bg-navy', adjustBrightness(theme.bgDark, 8));
  root.style.setProperty('--color-bg-navy-light', adjustBrightness(theme.bgDark, 14));

  // Update the gold gradient text globally
  updateGoldGradient(theme);

  // Fix body & html background immediately
  document.body.style.backgroundColor = theme.bgDark;
  document.documentElement.style.backgroundColor = theme.bgDark;

  // Scrollbar thumb
  updateScrollbar(theme);

  // Selection color
  root.style.setProperty('--selection-bg', `rgba(${ar}, ${ag}, ${ab}, 0.25)`);
}

/** Adjust hex color brightness by adding delta to each channel */
function adjustBrightness(hex: string, delta: number): string {
  const { r, g, b } = hexToRGB(hex);
  const clamp = (v: number) => Math.min(255, Math.max(0, v + delta));
  return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b).toString(16).padStart(2, '0')}`;
}

/** Update the .text-gold-gradient CSS dynamically */
function updateGoldGradient(theme: ThemeConfig): void {
  let styleEl = document.getElementById('theme-gradient-override') as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'theme-gradient-override';
    document.head.appendChild(styleEl);
  }

  const { accent, accentLight, accentDark } = theme;
  styleEl.textContent = `
    .text-gold-gradient {
      background: linear-gradient(135deg, ${accentDark}, ${accentLight}, ${accent}, ${accentLight}, ${accentDark}) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
    }
    .text-gold-warm-gradient {
      background: linear-gradient(135deg, ${accent}, ${accentLight}, ${accentDark}, ${accent}) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
    }
    ::selection {
      background-color: rgba(${hexToRGB(accent).r}, ${hexToRGB(accent).g}, ${hexToRGB(accent).b}, 0.25) !important;
      color: #fff !important;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(${hexToRGB(accent).r}, ${hexToRGB(accent).g}, ${hexToRGB(accent).b}, 0.2) !important;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(${hexToRGB(accent).r}, ${hexToRGB(accent).g}, ${hexToRGB(accent).b}, 0.4) !important;
    }
  `;
}

/** Update scrollbar colors */
function updateScrollbar(theme: ThemeConfig): void {
  // Handled in updateGoldGradient via <style> injection
}

/**
 * Auto-apply saved theme on page load.
 * Call this from every page's DOMContentLoaded.
 */
export function initTheme(): void {
  const id = getSavedThemeId();
  if (id !== 'gold-classic') {
    const theme = getTheme(id);
    applyThemeToPage(theme);
  }
}
