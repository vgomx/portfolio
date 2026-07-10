// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
  vite: {
    server: {
      fs: { allow: ['..'] },
    },
  },
});
