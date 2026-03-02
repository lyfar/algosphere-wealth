import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://algosphere.lyfar.com',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
