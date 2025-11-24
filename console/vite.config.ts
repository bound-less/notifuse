/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { readFileSync, existsSync } from 'fs'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Check if SSL certificates exist
const certPath = resolve(__dirname, 'certificates/cert.pem')
const keyPath = resolve(__dirname, 'certificates/key.pem')
const hasCerts = existsSync(certPath) && existsSync(keyPath)

// Use environment variable or default to localhost if certs don't exist
const devHost = process.env.VITE_HOST || (hasCerts ? 'notifusedev.com' : '0.0.0.0')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()] as any,
  server: {
    host: devHost,
    port: 5173,
    ...(hasCerts && {
      https: {
        key: readFileSync(keyPath),
        cert: readFileSync(certPath)
      }
    }),
    proxy: {
      '/config.js': {
        target: process.env.VITE_API_TARGET || 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.tsx'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/setup.tsx']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  optimizeDeps: {
    include: ['@fortawesome/react-fontawesome', '@fortawesome/fontawesome-svg-core']
  }
})
