<script setup>
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue' // 这个组件可能是一个自定义布局组件，
// 包含了一个垂直导航栏。
</script>

<template>
  <!-- 这个自定义组件被用作当前布局的根元素。它可能包含了页面的基本布局结构，例如头部、侧边栏或其他通用元素 -->
  <DefaultLayoutWithVerticalNav>
    <!--
      这是 Vue Router 的一个内置组件，用于显示当前路由匹配到的组件。
      在这个布局中，任何由路由控制的视图都将显示在 DefaultLayoutWithVerticalNav 组件内部。 
    -->
    <RouterView />
  </DefaultLayoutWithVerticalNav>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
// 导入了与 default-layout 相关的样式。在 Vuetify 项目中，
// 使用 @use 规则来导入 SCSS 文件是常见的做法，这样可以确保只有相关的样式被应用到当前组件上
@use "@layouts/styles/default-layout";
</style>
