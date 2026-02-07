import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://wealth.lyfar.com',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
