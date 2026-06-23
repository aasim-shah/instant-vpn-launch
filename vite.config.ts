import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Dev only: forward the dynamic sitemap to the local Node SEO service
    // (run `node server/index.mjs` alongside `npm run dev`). In production
    // Nginx proxies /sitemap.xml to that service instead.
    proxy: {
      "/sitemap.xml": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core — cached across pages
          if (id.includes('react-dom') || id.includes('react-router') || (id.includes('/react/') && id.includes('node_modules'))) {
            return 'react-vendor';
          }
          // Core UI — tiny, needed for first paint (Button, AuthContext, utils)
          if (id.includes('components/ui/button.tsx') || id.includes('contexts/AuthContext')
              || id.includes('class-variance-authority') || id.includes('clsx/') || id.includes('tailwind-merge')
              || id.includes('@radix-ui/react-slot') || id.includes('lib/utils.ts')) {
            return 'core-ui';
          }
          // Radix UI (minus slot) — loaded when UI components need it (deferred)
          if (id.includes('@radix-ui')) {
            return 'radix-ui';
          }
          // Query — only loaded by pages that need data fetching
          if (id.includes('@tanstack')) {
            return 'data-vendor';
          }
          // Forms libs
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
            return 'form-vendor';
          }
          // Axios — loaded on demand
          if (id.includes('/axios/')) {
            return 'axios';
          }
          // Auth modal + survey modal + auth service + api client
          if (id.includes('AuthModal.tsx') || id.includes('SurveyModal.tsx') || id.includes('authService') || id.includes('lib/api.ts')) {
            return 'auth-modal';
          }
          // CMS service — loaded by Footer and CMS pages
          if (id.includes('cmsService') || id.includes('use-cms')) {
            return 'cms';
          }
          // Chatbot widget — deferred
          if (id.includes('fyrebot-widget') || id.includes('fyrebot')) {
            return 'chatbot';
          }
          // Sonner toast lib - deferred
          if (id.includes('node_modules/sonner')) {
            return 'sonner';
          }
          // Lucide icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    // Target modern browsers for smaller output
    target: 'es2020',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
