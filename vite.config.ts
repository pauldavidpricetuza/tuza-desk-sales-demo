import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import path from 'path'

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      '#theme': path.resolve(__dirname, 'src/theme'),
      '#ui': path.resolve(__dirname, 'src/ui'),
      '#utils': path.resolve(__dirname, 'src/utils'),
    },
  },
})
