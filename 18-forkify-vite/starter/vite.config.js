import { defineConfig } from 'vite';
import path from 'path';


export default defineConfig ({
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
    //   '@': path.resolve(__dirname, './src'),
    //   '@core': path.resolve(__dirname, './src/core'),
    //   '@components': path.resolve(__dirname, './src/components'),
    //   '@utils': path.resolve(__dirname, './src/util')
    }
  },
  build: {
    cssMinify: false,
    minify: false,
    outDir: 'production',
    rollupOptions: {
      output: {
        manualChunks: {
        //   component: ['src/core/Component.js'],
        //   factory: ['src/core/Factory.js'],
        //   app: ['src/main.js']
        }
      }
    }    
  }
})