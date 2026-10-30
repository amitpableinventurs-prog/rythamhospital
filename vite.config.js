import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = `http://127.0.0.1:${env.PORT || 5088}`
  // Forward backend routes to the Node server while developing.
  const proxy = Object.fromEntries(
    ['/api', '/uploads', '/sitemap.xml', '/robots.txt'].map((path) => [path, { target: apiTarget }])
  )

  return {
    plugins: [react()],
    define: {
      // Public site address for canonical URLs; falls back to window.location in the app.
      'import.meta.env.VITE_SITE_URL': JSON.stringify(env.SITE_URL || ''),
    },
    css: {
      modules: {
        localsConvention: 'camelCase'
      }
    },
    // Fixed ports so SITE_URL in .env stays correct (other local projects use the usual Vite ports).
    server: { port: 5288, strictPort: true, proxy },
    preview: { port: 5289, strictPort: true, proxy },
  }
})
