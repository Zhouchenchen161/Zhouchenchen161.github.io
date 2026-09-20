import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 项目页部署路径：https://xinyuez253-hue.github.io/chenchen-zhou-website/
  // 若以后改用 用户名.github.io 用户主页仓库，可改回 '/'
  base: '/chenchen-zhou-website/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})