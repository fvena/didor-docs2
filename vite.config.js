import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  plugins: [
    vue(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
         additionalData: `
          @import "./node_modules/@didor/styles/src/didor-share.scss";
          @import "./src/design/var.scss";
        `
      },
    },
  },
})
