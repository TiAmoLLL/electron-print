import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Path from 'node:path'
import electron from 'vite-plugin-electron'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // root: Path.join(__dirname, 'src'),
  build: {
    outDir: Path.join(__dirname, 'build', 'renderer'),
    emptyOutDir: true,
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['./src/typings/*.d.ts'],
  },
  resolve: {
    alias: {
      '@': Path.join(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },

  // base: path.resolve(__dirname, './dist/'), // 新增
})
