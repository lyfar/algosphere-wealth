/**
 * Starfield — procedural twinkling stars in the hero section.
 */
export function createStarfield(): void {
  const el = document.getElementById('starfield');
  if (!el) return;

  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 40 : 80;

  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = 0.8 + Math.random() * 1.5;
    Object.assign(s.style, {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${Math.random() * 8}s`,
    });
    s.style.setProperty('--dur', `${3 + Math.random() * 6}s`);
    s.style.setProperty('--peak', `${0.15 + Math.random() * 0.4}`);
    el.appendChild(s);
  }
}

/**
 * Particle Canvas — subtle gold particles with connecting lines.
 */
export function initParticles(): void {
  const canvas = document.getElementById('particles-canvas') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = (canvas.width = canvas.offsetWidth);
  let h = (canvas.height = canvas.offsetHeight);

  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 25 : 45;

  const pts: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
  for (let i = 0; i < count; i++) {
    pts.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.3 + 0.05,
    });
  }

  function frame() {
    ctx!.clearRect(0, 0, w, h);
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) {
          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(212,175,55,${0.03 * (1 - d / 140)})`;
          ctx!.lineWidth = 0.5;
          ctx!.moveTo(pts[i].x, pts[i].y);
          ctx!.lineTo(pts[j].x, pts[j].y);
          ctx!.stroke();
        }
      }
    }
    for (const p of pts) {
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(212,175,55,${p.a})`;
      ctx!.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    requestAnimationFrame(frame);
  }
  frame();

  window.addEventListener('resize', () => {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  });
}
