/**
 * GSAP + ScrollTrigger + Lenis — all animation orchestration.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis Smooth Scroll — silky momentum scrolling.
 */
export function initLenis(): Lenis {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // @ts-ignore
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Anchor links use Lenis
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (a as HTMLAnchorElement).getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (target) lenis.scrollTo(target as HTMLElement, { offset: 0 });
    });
  });

  return lenis;
}

/**
 * Hero entrance — fade in hero elements with staggered delays.
 */
export function animateHero(): void {
  const els = document.querySelectorAll('.gs-hero-el');
  els.forEach((el) => {
    const delay = parseFloat((el as HTMLElement).dataset.heroDelay || '0');
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.3,
      delay: 0.4 + delay,
      ease: 'power3.out',
    });
  });

  document.querySelectorAll('#hero .gs-line-h').forEach((line) => {
    gsap.to(line, {
      scaleX: 1,
      duration: 1.5,
      delay: 1.2,
      ease: 'power3.out',
    });
  });
}

/**
 * Parallax — hero content fades out, section content floats.
 */
export function initParallax(): void {
  const hero = document.querySelector('#hero > .relative.z-10') as HTMLElement;
  if (hero) {
    gsap.to(hero, {
      y: 150,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  }

  // Section parallax
  document.querySelectorAll('.section-inner').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 30 },
      {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      }
    );
  });
}

/**
 * Scroll-triggered reveals — .gs-reveal, .gs-reveal-left/right, .gs-reveal-scale, .gs-line-h
 */
export function initScrollAnimations(): void {
  gsap.utils.toArray<HTMLElement>('.gs-reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });

  gsap.utils.toArray<HTMLElement>('.gs-reveal-left').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });

  gsap.utils.toArray<HTMLElement>('.gs-reveal-right').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  });

  // Staggered card reveal
  const cards = gsap.utils.toArray<HTMLElement>('.gs-reveal-scale');
  if (cards.length) {
    gsap.to(cards, {
      opacity: 1,
      scale: 1,
      duration: 1.0,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: cards[0], start: 'top 85%', toggleActions: 'play none none none' },
    });
  }

  // Gold divider lines (skip hero ones)
  gsap.utils.toArray<HTMLElement>('.gs-line-h').forEach((el) => {
    if (el.closest('#hero')) return;
    gsap.to(el, {
      scaleX: 1,
      duration: 1.3,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
    });
  });
}
