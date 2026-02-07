/**
 * Navbar scroll behavior — adds .nav-solid on scroll.
 */
export function initNavbar(): void {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-solid', window.scrollY > 60);
  });
}

/**
 * Mobile menu — open/close with hamburger button.
 */
export function initMobileMenu(switchLanguage: (lang: string) => void): void {
  const btn = document.getElementById('hamburger-btn');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-close');
  if (!btn || !menu) return;

  const backdrop = menu.querySelector('.mobile-menu-backdrop') as HTMLElement;
  const content = menu.querySelector('.mobile-menu-content') as HTMLElement;
  const links = menu.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    menu!.classList.remove('pointer-events-none');
    menu!.classList.add('pointer-events-auto');
    backdrop!.classList.remove('opacity-0');
    backdrop!.classList.add('opacity-100');
    content!.classList.remove('opacity-0', 'translate-y-[-20px]');
    content!.classList.add('opacity-100', 'translate-y-0');
    document.body.style.overflow = 'hidden';
    btn!.querySelector('.hamburger-icon')?.classList.add('ham-open');
  }

  function closeMenu() {
    menu!.classList.add('pointer-events-none');
    menu!.classList.remove('pointer-events-auto');
    backdrop!.classList.add('opacity-0');
    backdrop!.classList.remove('opacity-100');
    content!.classList.add('opacity-0', 'translate-y-[-20px]');
    content!.classList.remove('opacity-100', 'translate-y-0');
    document.body.style.overflow = '';
    btn!.querySelector('.hamburger-icon')?.classList.remove('ham-open');
  }

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('pointer-events-none');
    isOpen ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener('click', closeMenu);
  links.forEach((link) => link.addEventListener('click', closeMenu));

  menu.querySelectorAll('.mobile-lang-btn').forEach((b) => {
    b.addEventListener('click', () => {
      const lang = (b as HTMLElement).dataset.lang || 'hy';
      switchLanguage(lang);
      closeMenu();
    });
  });
}
