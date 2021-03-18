import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSvgIcons from 'vite-plugin-svg-icons'
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
    viteSvgIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
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
