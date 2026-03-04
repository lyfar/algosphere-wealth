// Investor Gate Script for Funds page
document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('investor-cert') as HTMLInputElement;
  const enterBtn = document.getElementById('gate-enter-btn') as HTMLButtonElement;
  const locked = document.getElementById('gate-locked') as HTMLElement;
  const unlocked = document.getElementById('gate-unlocked') as HTMLElement;

  if (!checkbox || !enterBtn || !locked || !unlocked) return;

  checkbox.addEventListener('change', () => {
    enterBtn.disabled = !checkbox.checked;
    if (checkbox.checked) {
      enterBtn.classList.remove('text-gold-400/50', 'border-gold-400/30');
      enterBtn.classList.add('text-gold-400', 'border-gold-400/50');
    } else {
      enterBtn.classList.add('text-gold-400/50', 'border-gold-400/30');
      enterBtn.classList.remove('text-gold-400', 'border-gold-400/50');
    }
  });

  enterBtn.addEventListener('click', () => {
    if (!checkbox.checked) return;
    locked.style.opacity = '0';
    locked.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      locked.classList.add('hidden');
      unlocked.classList.remove('hidden');
      unlocked.style.opacity = '0';
      unlocked.style.transition = 'opacity 0.5s ease';
      requestAnimationFrame(() => {
        unlocked.style.opacity = '1';
      });
    }, 500);
  });
});
