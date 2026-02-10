/**
 * Language switcher — supports Armenian (hy), English (en), Russian (ru), French (fr), and Arabic (ar).
 * Uses data-i18n elements with data-hy / data-en / data-ru / data-fr / data-ar attributes.
 */

export function switchLanguage(lang: string): void {
  localStorage.setItem('algosphere-lang', lang);
  document.documentElement.lang = lang;

  // Set RTL for Arabic, remove for others
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.removeAttribute('dir');
  }

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

  switchLanguage(savedLang);

  document.getElementById('lang-hy')?.addEventListener('click', () => switchLanguage('hy'));
  document.getElementById('lang-en')?.addEventListener('click', () => switchLanguage('en'));
  document.getElementById('lang-ru')?.addEventListener('click', () => switchLanguage('ru'));
  document.getElementById('lang-fr')?.addEventListener('click', () => switchLanguage('fr'));
  document.getElementById('lang-ar')?.addEventListener('click', () => switchLanguage('ar'));
}
