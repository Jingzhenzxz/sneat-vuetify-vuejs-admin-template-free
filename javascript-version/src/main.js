/* eslint-disable import/order */
// main.js 文件是 Vue 应用的入口点，它负责启动并配置 Vue 应用
import '@/@iconify/icons-bundle'
// 导入根组件 App.vue
import App from '@/App.vue'
// 导入 Vuetify 插件配置
import vuetify from '@/plugins/vuetify'
// 调用 loadFonts 函数，这可能会加载一些在应用中使用的自定义字体。
import { loadFonts } from '@/plugins/webfontloader'
// 导入 Vue Router 的配置
import router from '@/router'
// 导入 SCSS 样式文件，这些样式将应用于整个应用。
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
// 这行代码从 pinia 库中导入了 createPinia 函数。
import { createPinia } from 'pinia'
// createApp 是 Vue 3 中引入的一个函数，用于创建一个新的 Vue 应用实例。
import { createApp } from 'vue'

// 调用 loadFonts 函数，这可能会加载一些在应用中使用的自定义字体
loadFonts()


// Create vue app
// 使用 createApp 函数创建一个新的 Vue 应用实例，并传入根组件 App.vue
// 这个函数是启动 Vue 应用的第一步。它通常接收一个根组件（如 App.vue），
// 然后返回一个应用实例，该实例提供了一个应用上下文，并允许你配置应用（例如，通过添加插件、混入等）。
// 之后，你可以使用返回的应用实例的 mount 方法将 Vue 应用挂载到 DOM 上的某个元素。
const app = createApp(App)


// Use plugins
// 将 Vuetify 插件添加到 Vue 应用中，这允许您在整个应用中使用 Vuetify 组件和功能
app.use(vuetify)
// 创建并注册 Pinia 状态管理库的实例。Pinia 是 Vue 的一个状态管理库，类似于 Vuex，但更简单和灵活
// createPinia 函数用于创建一个新的 Pinia 实例。Pinia 实例可以被视为一个存储容器，
// 用于存储和管理应用的状态（例如，用户数据、应用设置等）。
// 在 Vue 应用中使用 Pinia 通常涉及到创建一个 Pinia 实例并将其注册到 Vue 应用实例上，这样整个应用就可以访问 Pinia 存储的状态了。
app.use(createPinia())
// 将 Vue Router 配置添加到应用中，这使得可以在应用中使用路由功能。
app.use(router)

// Mount vue app
// 将 Vue 应用挂载到 DOM 上。这里指定的选择器 '#app' 应该与 HTML 文件中的一个元素匹配，通常是一个具有 id="app" 的 div 元素
app.mount('#app')
