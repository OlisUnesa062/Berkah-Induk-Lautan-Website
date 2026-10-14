import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Domain produksi untuk canonical, hreflang, dan sitemap.
// Urutan: env SITE_URL (mis. https://domainanda.com), lalu domain produksi Vercel.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/+$/, '')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // `pnpm preview`: sajikan /en dari dist/en/index.html, sama seperti rewrite di vercel.json.
      name: 'lang-routes-preview',
      configurePreviewServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && /^\/en(\?|$)/.test(req.url)) req.url = req.url.replace(/^\/en/, '/en/index.html')
          next()
        })
      },
    },
  ],
  define: {
    __SITE_URL__: JSON.stringify(siteUrl),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
