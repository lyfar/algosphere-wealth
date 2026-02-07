/**
 * Custom cursor — follows mouse with a dot + trailing circle.
 * Only active on desktop (no touch devices).
 */
export function initCustomCursor(): void {
  if (window.innerWidth < 768 || 'ontouchstart' in window) return;

  const dot = document.getElementById('cursor-dot');
  const circle = document.getElementById('cursor-circle');
  if (!dot || !circle) return;

  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateCircle() {
    circleX += (mouseX - circleX) * 0.12;
    circleY += (mouseY - circleY) * 0.12;
    circle!.style.left = `${circleX}px`;
    circle!.style.top = `${circleY}px`;
    requestAnimationFrame(animateCircle);
  }
  animateCircle();

  // Hover state for interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .glass-card, .nav-link');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}
