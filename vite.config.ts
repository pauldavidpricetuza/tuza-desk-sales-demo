import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import path from 'path'

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  // Must match netlify.toml [dev] targetPort (5173). If Vite picked another port, Netlify's proxy would show a blank page.
  server: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '#theme': path.resolve(__dirname, 'src/theme'),
      '#ui': path.resolve(__dirname, 'src/ui'),
      '#utils': path.resolve(__dirname, 'src/utils'),
    },
  },
})
