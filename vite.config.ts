
import { resolve } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const pathResolve = (dir: string) => resolve(__dirname, dir)

const resolveFun = () => {
  return {
    "@": pathResolve("src")
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: resolveFun()
  }
})
