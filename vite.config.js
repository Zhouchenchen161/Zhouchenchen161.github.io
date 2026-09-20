import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  // 部署在用户主页仓库 Zhouchenchen161.github.io，根路径部署，base 保持 '/'
  // 若以后改用项目页仓库（如 用户名.github.io/仓库名），需改为 '/仓库名/'
  base: '/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})