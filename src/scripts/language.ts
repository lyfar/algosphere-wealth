/**
 * Language switcher — supports Armenian (hy), English (en), Russian (ru), French (fr), and Arabic (ar).
 * Uses data-i18n elements with data-hy / data-en / data-ru / data-fr / data-ar attributes.
 * Also handles data-placeholder-* for input placeholders and data-options-* for select elements.
 */

export function switchLanguage(lang: string): void {
  localStorage.setItem('algosphere-lang', lang);
  document.documentElement.lang = lang;

  // Set RTL for Arabic
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.removeAttribute('dir');
  }

  // Translate text content
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const text = (el as HTMLElement).dataset[lang] || (el as HTMLElement).dataset.en || '';
    if (text) {
      el.innerHTML = text;
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-placeholder-en]').forEach((el) => {
    const key = `placeholder${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    const placeholder = (el as HTMLElement).dataset[key] || (el as HTMLElement).dataset.placeholderEn || '';
    if (placeholder) {
      (el as HTMLInputElement | HTMLTextAreaElement).placeholder = placeholder;
    }
  });

  // Translate select options
  document.querySelectorAll('select[data-i18n-options]').forEach((sel) => {
    const options = (sel as HTMLSelectElement).options;
    for (let i = 0; i < options.length; i++) {
      const opt = options[i];
      const text = opt.dataset[lang] || opt.dataset.en || '';
      if (text) opt.textContent = text;
    }
  });

  // Desktop lang buttons
  document.querySelectorAll('.lang-btn').forEach((b) => b.classList.remove('active', 'text-gold-400'));
  const activeBtn = document.getElementById(`lang-${lang}`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'text-gold-400');
  }

  // Update dropdown current label
  const current = document.getElementById('lang-current');
  if (current && activeBtn) {
    current.textContent = (activeBtn as HTMLElement).dataset.label || lang.toUpperCase();
  }
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
