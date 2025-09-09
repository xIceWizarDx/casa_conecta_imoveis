import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

// Desabilita o Wayfinder no CI (ou quando WAYFINDER_DISABLE=1)
const disableWayfinder =
  process.env.CI === 'true' || process.env.WAYFINDER_DISABLE === '1';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      ssr: 'resources/js/ssr.tsx',
      refresh: true,
    }),
    react(),
    tailwindcss(),
    ...(!disableWayfinder
      ? [
          wayfinder({
            // mantém seu comportamento atual
            formVariants: true,
          }),
        ]
      : []),
  ],
  esbuild: {
    jsx: 'automatic',
  },
});
