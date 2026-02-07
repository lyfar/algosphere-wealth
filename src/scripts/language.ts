/**
 * Language switcher — toggles between Armenian (hy) and English (en).
 * Uses data-i18n elements with data-hy / data-en attributes.
 */

export function switchLanguage(lang: string): void {
  localStorage.setItem('algosphere-lang', lang);
  document.documentElement.lang = lang === 'hy' ? 'hy' : 'en';

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const text = (el as HTMLElement).dataset[lang] || (el as HTMLElement).dataset.en || '';
    if (text) {
      el.innerHTML = text;
    }
  });

  // Desktop lang buttons
  document.querySelectorAll('.lang-btn').forEach((b) => b.classList.remove('active'));
  const activeBtn = document.getElementById(`lang-${lang}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Mobile lang buttons
  document.querySelectorAll('.mobile-lang-btn').forEach((b) => {
    const btnLang = (b as HTMLElement).dataset.lang;
    b.classList.toggle('active', btnLang === lang);
  });
}

export function initLanguageSwitcher(): void {
  const savedLang = localStorage.getItem('algosphere-lang') || 'hy';

  if (savedLang === 'en') {
    switchLanguage('en');
  } else {
    // Make sure HY button is active by default
    document.querySelectorAll('.lang-btn').forEach((b) => b.classList.remove('active'));
    const hyBtn = document.getElementById('lang-hy');
    if (hyBtn) hyBtn.classList.add('active');
  }

  document.getElementById('lang-hy')?.addEventListener('click', () => switchLanguage('hy'));
  document.getElementById('lang-en')?.addEventListener('click', () => switchLanguage('en'));
}
