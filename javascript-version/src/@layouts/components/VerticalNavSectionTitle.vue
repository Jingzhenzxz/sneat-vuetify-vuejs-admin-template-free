<!-- <script setup> 是 Vue 3 引入的一种新语法，用于定义组件的组成部分。它使得组件的编写更加简洁和易读。 -->
<script setup>
const props = defineProps({ // defineProps 是 Vue 3 中的一个帮助函数，用于声明组件的 props。
  // item: 这是一个 prop，它的类型设置为 null。在 Vue 中，将类型设置为 null 意味着 prop 可以是任何类型。
  // 这里 required: true 表明这个 prop 是必需的，意味着使用这个组件时必须传递 item prop。
  item: {
    type: null,
    required: true,
  },
})
</script>

<template>
  // 创建了一个列表项 (li) 元素，类名为 nav-section-title。
  <li class="nav-section-title">
    <!-- 在列表项内部定义了一个 div 容器，用于包裹标题文本。 -->
    <div class="title-wrapper">
      <!-- eslint-disable vue/no-v-text-v-html-on-component -->
      <!-- 使用 v-text 指令将 item.heading 的值设置为 span 元素的文本内容。这是一个动态绑定， -->
      <!-- 当 item.heading 的值改变时，span 元素的内容也会更新。v-text 是 Vue 的一个指令，用于更新元素的 textContent。 -->
      <span
        class="title-text"
        v-text="item.heading"
      />
      <!-- eslint-enable vue/no-v-text-v-html-on-component -->
    </div>
  </li>
</template>
