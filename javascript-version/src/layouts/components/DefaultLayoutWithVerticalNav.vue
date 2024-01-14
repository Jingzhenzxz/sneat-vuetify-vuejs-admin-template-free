<script setup>
import { useTheme } from 'vuetify'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@images/pro/upgrade-banner-light.png'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// 使用 useTheme 钩子获取当前的主题信息。
const vuetifyTheme = useTheme()

const upgradeBanner = computed(() => {
  // 响应式计算属性 upgradeBanner，根据当前的主题是深色还是浅色，选择相应的横幅图片
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <!-- 使用自定义的 VerticalNavLayout 组件作为主要布局容器，它可能包含了整个页面的基本布局，如侧边导航栏、内容区域等 -->
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <!-- 定义了一个具名插槽 navbar。这个插槽用于定制垂直导航布局中的导航栏部分。 -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <!-- 包括一个按钮用于切换导航的显示状态，在移动视图或较小的屏幕上可能显示为一个菜单图标。 -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>

        <!-- 👉 Search -->
        <!-- 这是一个 div 元素，用作搜索区域的容器。 -->
        <!-- 启用了 Flexbox 布局，使内部元素水平排列。 -->
        <!-- align-center 类确保容器内的元素垂直居中。 -->
        <!-- cursor-pointer 类使鼠标悬停在此元素上时变成指针，暗示这是一个可交互的元素。 -->
        <!-- style="user-select: none;" 是一个内联样式，防止用户选择（即高亮）这个区域的文本。 -->
        <div
          class="d-flex align-center cursor-pointer"
          style="user-select: none;"
        >
          <!-- 👉 Search Trigger button -->
          <IconBtn>
            <VIcon icon="bx-search" />
          </IconBtn>

          <!-- d-none 类在默认情况下隐藏这个元素。 -->
          <!-- d-md-flex 类表示在中等尺寸屏幕及以上（如平板电脑和桌面屏幕）这个元素将显示。 -->
          <!-- text-disabled 类可能用于给文本一种禁用或次要的视觉效果。 -->
          <span class="d-none d-md-flex align-center text-disabled">
            <span class="me-3">Search</span>
            <!-- 显示一个代表快捷键的符号（这里是 Mac 的 Command 键符号）和字母 K，暗示用户可以使用这个快捷键进行搜索。 -->
            <span class="meta-key">&#8984;K</span>
          </span>
        </div>

        <VSpacer />

        <IconBtn
          class="me-2"
          href="https://github.com/themeselection/sneat-vuetify-vuejs-admin-template-free"
          target="_blank"
          rel="noopener noreferrer"
        >
          <VIcon icon="bxl-github" />
        </IconBtn>

        <IconBtn class="me-2">
          <VIcon icon="bx-bell" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Dashboard',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Account Settings',
          icon: 'mdi-account-cog-outline',
          to: '/account-settings',
        }"
      />

      <!-- 👉 Pages -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Pages',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Login',
          icon: 'bx-log-in',
          to: '/login',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Register',
          icon: 'bx-user-plus',
          to: '/register',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Error',
          icon: 'bx-info-circle',
          to: '/no-existence',
        }"
      />

      <!-- 👉 User Interface -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'User Interface',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Typography',
          icon: 'mdi-alpha-t-box-outline',
          to: '/typography',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Icons',
          icon: 'bx-show',
          to: '/icons',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Cards',
          icon: 'bx-credit-card',
          to: '/cards',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Tables',
          icon: 'bx-table',
          to: '/tables',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Form Layouts',
          icon: 'mdi-form-select',
          to: '/form-layouts',
        }"
      />
    </template>

    <template #after-vertical-nav-items>
      <!-- 👉 illustration -->
      <a
        href="https://themeselection.com/item/sneat-vuetify-vuejs-admin-template"
        target="_blank"
        rel="noopener noreferrer"
        style="margin-left: 7px;"
      >
        <img
          :src="upgradeBanner"
          alt="upgrade-banner"
          transition="scale-transition"
          class="upgrade-banner mx-auto"
          style="max-width: 230px;"
        >
      </a>
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
