<script setup>
import { useTheme } from 'vuetify' // 从 Vuetify 导入了 useTheme 函数，这是 Vuetify 的主题系统的一部分，用于访问和修改主题。
import UpgradeToPro from '@/components/UpgradeToPro.vue'
import { hexToRgb } from '@layouts/utils'

// 使用 useTheme 函数来获取当前的全局主题对象。
const { global } = useTheme()
</script>

// 这是组件的模板部分，它定义了组件的 HTML 结构。
// VApp :style="...": 这是 Vuetify 的应用容器组件。:style 绑定用于动态设置 CSS 样式。
// 这里，它设置了一个自定义属性 --v-global-theme-primary，其值基于当前主题的主要颜色，使用了之前导入的 hexToRgb 函数进行颜色格式转换。
// <RouterView />: 这是 Vue Router 的路由视图组件，用于显示当前路由的组件。

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView />
    <UpgradeToPro />
  </VApp>
</template>
