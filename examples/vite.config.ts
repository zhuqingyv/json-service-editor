import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      "/set/demo.json": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: () => {
          debugger;
          return `http://localhost:3000/set/demo.json`
        }
      },
      "/get/demo.json": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: () => `http://localhost:3000/get/demo.json`
      },
    }
  }
})
