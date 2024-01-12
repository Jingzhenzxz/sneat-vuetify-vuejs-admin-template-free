// 这个 vite.config.js 文件是 Vite 项目的主要配置文件，用于定义和自定义 Vite 构建工具的行为。
// 它包含了与 Vuetify 相关的配置，以及其他一些提高开发效率的插件
// @vitejs/plugin-vue 和 @vitejs/plugin-vue-jsx 分别用于支持 Vue SFC（单文件组件）和 JSX。
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from 'node:url'
// unplugin-auto-import 和 unplugin-vue-components 是用于自动导入和组件的插件。
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
// vite-plugin-vuetify 是 Vuetify 的 Vite 插件。
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: 这个数组定义了项目中使用的 Vite 插件：
  plugins: [
    // vue(): 添加对 Vue 3 的支持。
    vue(),
    // vueJsx(): 添加对 JSX 的支持，这对于在 Vue 中使用 JSX 语法非常有用。
    vueJsx(),

    // Docs: https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
    // vuetify(...): 配置 Vuetify 插件。在这里，它被用来指定 Vuetify 的样式文件位置。
    // styles: { configFile: 'src/styles/variables/_vuetify.scss' } 指出了 Vuetify 主题变量的自定义配置文件。
    vuetify({
      styles: {
        configFile: 'src/styles/variables/_vuetify.scss',
      },
    }),
    // Components(...): 这个插件用于自动导入 Vue 组件，避免了手动导入每个组件的需要。
    // 这里，它被配置为从 'src/@core/components' 目录自动导入组件，
    // 并且生成 TypeScript 声明文件 (dts: true)，这对于在 TypeScript 项目中提高类型安全性和自动完成功能很有帮助。
    Components({
      dirs: ['src/@core/components'],
      dts: true,
    }),

    // Docs: https://github.com/antfu/unplugin-auto-import#unplugin-auto-import
    // AutoImport(...): 自动导入插件，用于自动导入常用的函数和钩子，减少了手动导入的需要。
    // 在这里，它被配置为自动导入 vue, vue-router, @vueuse/core, @vueuse/math, pinia 等库中的内容，
    // 并且对 Vue 模板中的自动导入进行了优化 (vueTemplate: true)。
    AutoImport({
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
      },
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/math', 'pinia'],
      vueTemplate: true,
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles/', import.meta.url)),
      '@configured-variables': fileURLToPath(new URL('./src/styles/variables/_template.scss', import.meta.url)),
      '@axios': fileURLToPath(new URL('./src/plugins/axios', import.meta.url)),
      'apexcharts': fileURLToPath(new URL('node_modules/apexcharts-clevision', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    exclude: ['vuetify'],
    entries: [
      './src/**/*.vue',
    ],
  },
})
