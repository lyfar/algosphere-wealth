/**
 * Logo variant definitions — SVG path data for the "A" letterform.
 * All paths designed for viewBox="0 0 140 140" with circle at cx=70 cy=70 r=64.
 * Colors: gold #D4AF37, dark bg #0A0A0A (for negative space).
 */

export interface LogoVariantData {
  id: number;
  name: string;
  context: string;
  paths: string;
}

export const logoVariants: LogoVariantData[] = [
  {
    id: 1,
    name: 'Didot Contrast',
    context: 'High fashion • editorial',
    paths: `
      <path d="M 55 100 L 70 38 L 85 100" stroke="#D4AF37" stroke-width="1" fill="none"/>
      <path d="M 55 100 L 70 38" stroke="#D4AF37" stroke-width="4" fill="none" stroke-linecap="butt"/>
      <path d="M 70 38 L 85 100" stroke="#D4AF37" stroke-width="1" fill="none" stroke-linecap="butt"/>
      <line x1="59" y1="76" x2="80" y2="76" stroke="#D4AF37" stroke-width="0.8"/>
      <line x1="49" y1="100" x2="61" y2="100" stroke="#D4AF37" stroke-width="1"/>
      <line x1="79" y1="100" x2="91" y2="100" stroke="#D4AF37" stroke-width="0.8"/>
      <line x1="66" y1="38" x2="74" y2="38" stroke="#D4AF37" stroke-width="0.6"/>
    `,
  },
  {
    id: 2,
    name: 'Trajan Classical',
    context: 'Institutional • carved stone',
    paths: `
      <path d="M 49 100 L 70 36 L 91 100" stroke="#D4AF37" stroke-width="2.8" fill="none" stroke-linejoin="miter"/>
      <line x1="56" y1="78" x2="84" y2="78" stroke="#D4AF37" stroke-width="1.8"/>
      <path d="M 44 100 L 49 100 L 49 97" fill="none" stroke="#D4AF37" stroke-width="1.2"/>
      <path d="M 54 100 L 49 100" stroke="#D4AF37" stroke-width="1.2"/>
      <path d="M 86 100 L 91 100 L 91 97" fill="none" stroke="#D4AF37" stroke-width="1.2"/>
      <path d="M 96 100 L 91 100" stroke="#D4AF37" stroke-width="1.2"/>
    `,
  },
  {
    id: 3,
    name: 'Geometric Pure',
    context: 'Modernist • tech',
    paths: `
      <path d="M 48 100 L 70 34 L 92 100" stroke="#D4AF37" stroke-width="3" fill="none" stroke-linejoin="miter" stroke-linecap="butt"/>
      <line x1="55" y1="78" x2="85" y2="78" stroke="#D4AF37" stroke-width="3"/>
    `,
  },
  {
    id: 4,
    name: 'Art Deco',
    context: 'Opulent • 1920s glamour',
    paths: `
      <circle cx="70" cy="70" r="59" fill="none" stroke="#D4AF37" stroke-width="0.5" opacity="0.35"/>
      <path d="M 50 98 L 70 36 L 90 98" stroke="#D4AF37" stroke-width="3" fill="none" stroke-linejoin="miter" stroke-linecap="square"/>
      <line x1="56" y1="74" x2="84" y2="74" stroke="#D4AF37" stroke-width="1.5"/>
      <line x1="58" y1="80" x2="82" y2="80" stroke="#D4AF37" stroke-width="1"/>
      <line x1="44" y1="98" x2="56" y2="98" stroke="#D4AF37" stroke-width="1.5"/>
      <line x1="84" y1="98" x2="96" y2="98" stroke="#D4AF37" stroke-width="1.5"/>
    `,
  },
  {
    id: 6,
    name: 'Monumental',
    context: 'Impact • signage • bold',
    paths: `
      <path d="M 46 100 L 70 34 L 94 100" stroke="#D4AF37" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <line x1="54" y1="78" x2="86" y2="78" stroke="#0A0A0A" stroke-width="8"/>
      <line x1="54" y1="78" x2="86" y2="78" stroke="#D4AF37" stroke-width="4"/>
    `,
  },
  {
    id: 7,
    name: 'Calligraphic',
    context: 'Heritage • hand-crafted',
    paths: `
      <path d="M 48 98 C 52 78, 58 48, 70 38 C 78 44, 85 68, 92 98" stroke="#D4AF37" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 54 76 Q 70 70, 86 76" stroke="#D4AF37" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M 42 102 Q 44 100, 48 98" stroke="#D4AF37" stroke-width="1" fill="none" stroke-linecap="round"/>
      <path d="M 92 98 Q 96 102, 100 100" stroke="#D4AF37" stroke-width="1" fill="none" stroke-linecap="round"/>
    `,
  },
  {
    id: 9,
    name: 'Stencil',
    context: 'Industrial • distinctive',
    paths: `
      <path d="M 48 100 L 56 72" stroke="#D4AF37" stroke-width="3" fill="none" stroke-linecap="butt"/>
      <path d="M 60 60 L 70 36" stroke="#D4AF37" stroke-width="3" fill="none" stroke-linecap="butt"/>
      <path d="M 70 36 L 80 60" stroke="#D4AF37" stroke-width="3" fill="none" stroke-linecap="butt"/>
      <path d="M 84 72 L 92 100" stroke="#D4AF37" stroke-width="3" fill="none" stroke-linecap="butt"/>
      <line x1="55" y1="78" x2="66" y2="78" stroke="#D4AF37" stroke-width="2.5"/>
      <line x1="74" y1="78" x2="85" y2="78" stroke="#D4AF37" stroke-width="2.5"/>
    `,
  },
  {
    id: 10,
    name: 'Engraved Inline',
    context: 'Luxury • metal engravings',
    paths: `
      <path d="M 48 100 L 70 36 L 92 100" stroke="#D4AF37" stroke-width="5" fill="none" stroke-linejoin="miter"/>
      <line x1="55" y1="78" x2="85" y2="78" stroke="#D4AF37" stroke-width="4"/>
      <path d="M 52 98 L 70 42 L 88 98" stroke="#0A0A0A" stroke-width="1.5" fill="none" stroke-linejoin="miter"/>
      <line x1="57" y1="78" x2="83" y2="78" stroke="#0A0A0A" stroke-width="1"/>
    `,
  },
  {
    id: 13,
    name: 'Slab Serif',
    context: 'Strong • authoritative',
    paths: `
      <path d="M 50 96 L 70 38 L 90 96" stroke="#D4AF37" stroke-width="3" fill="none" stroke-linejoin="miter"/>
      <line x1="56" y1="76" x2="84" y2="76" stroke="#D4AF37" stroke-width="3"/>
      <rect x="43" y="96" width="14" height="3" fill="#D4AF37" rx="0.5"/>
      <rect x="83" y="96" width="14" height="3" fill="#D4AF37" rx="0.5"/>
      <rect x="65" y="35" width="10" height="2.5" fill="#D4AF37" rx="0.5"/>
    `,
  },
  {
    id: 15,
    name: 'Algosphere Globe',
    context: 'Brand mark • global vision',
    paths: `
      <ellipse cx="70" cy="70" rx="64" ry="20" fill="none" stroke="#D4AF37" stroke-width="0.4" opacity="0.2"/>
      <ellipse cx="70" cy="70" rx="64" ry="42" fill="none" stroke="#D4AF37" stroke-width="0.4" opacity="0.2"/>
      <path d="M 50 98 L 70 38 L 90 98" stroke="#D4AF37" stroke-width="2.5" fill="none" stroke-linejoin="miter"/>
      <line x1="56" y1="76" x2="84" y2="76" stroke="#D4AF37" stroke-width="1.5"/>
    `,
  },
];
