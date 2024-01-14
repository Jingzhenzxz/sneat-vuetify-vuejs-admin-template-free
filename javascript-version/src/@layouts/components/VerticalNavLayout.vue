<script>
import { useDisplay } from 'vuetify' // useDisplay 从 Vuetify 导入，用于获取有关当前显示（如屏幕大小）的信息。
import VerticalNav from '@layouts/components/VerticalNav.vue' // VerticalNav 是一个自定义组件，可能是页面的垂直导航栏。

export default defineComponent({ //defineComponent 是定义 Vue 组件的方法。
  setup(props, { slots }) {
    // 使用 ref 创建响应式引用
    // isOverlayNavActive 和 isLayoutOverlayVisible 用于控制覆盖层的显示状态。
    const isOverlayNavActive = ref(false)
    const isLayoutOverlayVisible = ref(false)

    // toggleIsOverlayNavActive 是一个切换函数，用于改变覆盖层导航的激活状态。
    const toggleIsOverlayNavActive = useToggle(isOverlayNavActive)
    const route = useRoute() // useRoute 用于访问当前路由的信息。
    const { mdAndDown } = useDisplay() // mdAndDown 是一个计算属性，根据屏幕尺寸判断是否应该显示覆盖层导航。


    // ℹ️ This is alternative to below two commented watcher
    // We want to show overlay if overlay nav is visible and want to hide overlay if overlay is hidden and vice versa.
    // syncRef 用于同步 isOverlayNavActive 和 isLayoutOverlayVisible 的状态。
    syncRef(isOverlayNavActive, isLayoutOverlayVisible)

    return () => {
      // 👉 Vertical nav
      // verticalNav, navbar, main, footer, layoutOverlay 是不同的部分，用于构建页面的整体布局。
      // 使用 h 函数（Vue 的渲染函数）来创建 HTML 元素，并传递相关的 props 和插槽。
      // h 是 Vue 提供的一个函数，用于以编程的方式创建 VNode（虚拟节点）。它是 createElement 函数的别名，
      // 用于描述一个组件或 HTML 元素应该如何渲染。
      // 这个函数通常接受三个参数：要创建的组件或 HTML 元素，这个元素的 props 或属性，以及这个元素的子节点。
      // isOverlayNavActive 是一个布尔值，表示是否激活覆盖导航，而 toggleIsOverlayNavActive 可能是一个方法，用于切换导航的激活状态。
      // 第三个参数是一个对象，映射了 VerticalNav 组件的插槽。在 Vue 中，插槽用于提供一种方式来将内容分发到组件的视图中。
      // 代码中定义了几个不同的插槽，如 nav-header、before-nav-items、default（默认插槽）、after-nav-items。
      // 每个插槽对应一个函数，这些函数返回从父组件传递下来的插槽内容（如果存在）。使用 slots['slot-name']?.() 来安全地访问插槽内容，
      // ?.() 是可选链操作符，用于防止在插槽内容不存在时引发错误。
      const verticalNav = h(
        VerticalNav,
        { isOverlayNavActive: isOverlayNavActive.value, toggleIsOverlayNavActive },
        {
          'nav-header': () => slots['vertical-nav-header']?.(),
          'before-nav-items': () => slots['before-vertical-nav-items']?.(),
          'default': () => slots['vertical-nav-content']?.(),
          'after-nav-items': () => slots['after-vertical-nav-items']?.(),
        })


      // 👉 Navbar
      // 第一个参数 'header' 指定要创建的元素类型。
      // 第二个参数是一个对象，定义了该元素的属性。这里，它设置了 class 属性，
      // 使得 header 元素具有 layout-navbar 和 navbar-blur 这两个 CSS 类。
      // 第三个参数是一个子元素数组。这里使用了另一个 h 函数来创建一个 div 元素，该元素包含导航栏的内容。
      // 内容通过 slots.navbar 插槽提供，允许父组件自定义导航栏内容。传递给插槽的是一个对象，
      // 包含了 toggleVerticalOverlayNavActive 方法，这可能是用于控制垂直覆盖导航的显示状态。
      const navbar = h(
        'header',
        { class: ['layout-navbar navbar-blur'] },
        [
          h('div', { class: 'navbar-content-container' }, slots.navbar?.({
            toggleVerticalOverlayNavActive: toggleIsOverlayNavActive,
          })),
        ])

      // 这行代码使用 h 函数创建了一个 main HTML 元素，作为页面的主要内容区域。
      const main = h('main', { class: 'layout-page-content' }, h('div', { class: 'page-content-container' }, slots.default?.()))


      // 👉 Footer
      const footer = h('footer', { class: 'layout-footer' }, [
        h('div', { class: 'footer-content-container' }, slots.footer?.()),
      ])


      // 👉 Overlay
      const layoutOverlay = h('div', {
        // layout-overlay 是一个始终应用的类名。
        // { visible: isLayoutOverlayVisible.value } 是一个条件类名。如果 isLayoutOverlayVisible.value 为 true，
        // 则 visible 类名将被应用；如果为 false，则不应用。这是一种动态控制 CSS 类的常用方法
        class: ['layout-overlay', { visible: isLayoutOverlayVisible.value }],

        // 当用户点击这个 div 时，它会切换 isLayoutOverlayVisible 的值。
        // 这通常用于创建模态框、下拉菜单或其他需要显示和隐藏的元素。
        onClick: () => { isLayoutOverlayVisible.value = !isLayoutOverlayVisible.value },
      })

      return h('div', {
        // mdAndDown.value && 'layout-overlay-nav' 是一个条件类，当 mdAndDown.value 为 true 时应用，
        // 这通常意味着在中等及以下尺寸的屏幕上显示覆盖式导航。
        class: [
          'layout-wrapper layout-nav-type-vertical layout-navbar-static layout-footer-static layout-content-width-fluid',
          mdAndDown.value && 'layout-overlay-nav',

          // route.meta.layoutWrapperClasses 是从当前路由的元数据中获取的动态类，允许根据路由不同动态改变布局的样式。
          route.meta.layoutWrapperClasses,
        ],
      }, [
        verticalNav,
        h('div', { class: 'layout-content-wrapper' }, [
          navbar,
          main,
          footer,
        ]),
        layoutOverlay,
      ])
    }
  },
})
</script>

<style lang="scss">
// @use "@configured-variables" as variables;: 这行代码导入了名为 @configured-variables 的 SCSS 文件，
// 并使用 variables 作为其命名空间。这意味着从该文件导入的任何变量或混合（mixins）都可以通过 variables. 的前缀来访问。
@use "@configured-variables" as variables;

// 可能包含一些占位选择器或通用样式
@use "@layouts/styles/placeholders";

// 导入了 mixins 文件中定义的混合。混合是 SCSS 中的一种功能，允许定义可重用的样式块。
@use "@layouts/styles/mixins";

// 这是一个 CSS 类选择器，用于选择同时具有 layout-wrapper 和 layout-nav-type-vertical 类的元素。
.layout-wrapper.layout-nav-type-vertical {
  // TODO(v2): Check why we need height in vertical nav & min-height in horizontal nav
  // block-size: 100%;: 设置元素的块级尺寸（通常是高度）为 100%，确保它填满其父元素的高度。
  block-size: 100%;

  // .layout-content-wrapper 是 .layout-wrapper 的一个子元素的样式定义。
  .layout-content-wrapper {
    // display: flex;: 应用 Flexbox 布局。
    display: flex;
    // flex-direction: column;: 设置 Flexbox 子元素垂直排列。
    flex-direction: column;
    // flex-grow: 1;: 允许元素在必要时增长以填充可用空间。
    flex-grow: 1;
    // min-block-size: calc(var(--vh, 1vh) * 100);: 设置最小块尺寸（通常是最小高度）。
    // 这里使用了 CSS 变量 --vh（可能是视口高度的一个自定义定义）的 100 倍作为最小高度，如果变量未定义则默认为视口高度的 100%。
    min-block-size: calc(var(--vh, 1vh) * 100);
    // transition: padding-inline-start 0.2s ease-in-out;: 添加过渡效果，使内边距开始（padding-inline-start）的变化更平滑。
    transition: padding-inline-start 0.2s ease-in-out;
    // will-change: padding-inline-start;: 提示浏览器该属性将会变化，可能用于优化性能。
    will-change: padding-inline-start;
  }

  .layout-navbar {
    // z-index: variables.$layout-vertical-nav-layout-navbar-z-index;: 设置了 z-index 属性，这个值从 SCSS 变量中获取。
    // z-index 用于控制元素的堆叠顺序，这里可能用于确保导航栏位于其他元素之上。
    z-index: variables.$layout-vertical-nav-layout-navbar-z-index;

    // 针对 layout-navbar 内部的 navbar-content-container 类元素的样式定义。
    .navbar-content-container {
      // block-size: variables.$layout-vertical-nav-navbar-height;: 设置块尺寸（一般是高度），其值从 SCSS 变量中获取。
      block-size: variables.$layout-vertical-nav-navbar-height;
    }

    //  这个指令使得内部的样式规则跳出当前作用域，应用于全局作用域。
    @at-root {
      // 选择同时具有 layout-wrapper 和 layout-nav-type-vertical 类的元素。
      .layout-wrapper.layout-nav-type-vertical {
        // 再次针对 layout-navbar 的样式定义。
        .layout-navbar {
          // 使用 @if 条件指令检查变量 $layout-vertical-nav-navbar-is-contained 的值。如果为 true，应用一种样式规则。
          @if variables.$layout-vertical-nav-navbar-is-contained {
            // 如果条件为 true，使用 boxed-content 混合（mixin）添加样式。这可能包含了一组用于设置边框、内边距等的样式规则。
            @include mixins.boxed-content;
          }

          // 如果条件为 false，应用另一种样式规则。
          @else {
            // 在条件为 false 的情况下，针对 navbar-content-container 类的元素应用 boxed-content 混合。
            .navbar-content-container {
              @include mixins.boxed-content;
            }
          }
        }
      }
    }
  }

  // 这行代码针对同时具有 layout-navbar-sticky 类和 layout-navbar 类的元素。
  &.layout-navbar-sticky .layout-navbar {
    // @extend %layout-navbar-sticky; 表示该元素将继承在 %layout-navbar-sticky 占位选择器中定义的所有样式。
    // 这通常用于应用一组预定义的样式，以实现粘性导航栏的效果。
    @extend %layout-navbar-sticky;
  }

  &.layout-navbar-hidden .layout-navbar {
    // 继承隐藏导航栏时需要应用的样式。
    @extend %layout-navbar-hidden;
  }

  // 👉 Footer
  //  使用 boxed-content 混合（mixin）添加样式。这可能包含了一组用于设置边框、内边距、背景等的样式规则，
  // 从而为页脚元素提供一个“盒状”的外观和感觉。
  .layout-footer {
    @include mixins.boxed-content;
  }

  // 👉 Layout overlay
  // 这个覆盖层通常用于在某些 UI 交互（如模态窗口）时覆盖页面的其余部分
  .layout-overlay {
    // 设置元素的定位方式为固定定位，使其相对于视口定位，而不是父元素。
    position: fixed;
    // 设置元素的堆叠顺序（z-index），其值从 SCSS 变量中获取。
    z-index: variables.$layout-overlay-z-index;
    // 设置背景颜色为半透明的黑色，这里使用了 RGBA 颜色表示法。
    background-color: rgb(0 0 0 / 60%);
    // 将鼠标指针样式设置为指针，表明用户可以点击。
    cursor: pointer;
    // 等同于设置 top: 0; right: 0; bottom: 0; left: 0;，使元素填充整个视口。
    inset: 0;
    // 初始透明度设置为 0，使元素完全透明。
    opacity: 0;
    // 防止元素捕捉鼠标事件，当不可见时不会影响到下面的元素。
    pointer-events: none;
    // 定义透明度变化的过渡效果。
    transition: opacity 0.25s ease-in-out;
    // 优化性能，告诉浏览器该元素可能会有变换。
    will-change: transform;

    // 当 .layout-overlay 元素同时具有 visible 类时，将应用这些样式。
    &.visible {
      // 将透明度设置为 1，使元素完全不透明。
      opacity: 1;
      // 允许元素捕捉鼠标事件。
      pointer-events: auto;
    }
  }

  // 这个选择器针对同时具有当前选择器的上下文（可能是一个父级容器）
  // 且不具有 layout-overlay-nav 类的元素中的 .layout-content-wrapper 子元素。
  &:not(.layout-overlay-nav) .layout-content-wrapper {
    // 设置内联方向起始（通常是左侧）的内边距。其值从 SCSS 变量中获取，可能用于保持内容与垂直导航栏的间距。
    padding-inline-start: variables.$layout-vertical-nav-width;
  }

  // Adjust right column pl when vertical nav is collapsed
  // 选择具有 layout-vertical-nav-collapsed 类的元素内部的 .layout-content-wrapper 元素。
  &.layout-vertical-nav-collapsed .layout-content-wrapper {
    // 设置内联起始的内边距为垂直导航栏折叠时的宽度。
    padding-inline-start: variables.$layout-vertical-nav-collapsed-width;
  }

  // 👉 Content height fixed
  // 选择具有 layout-content-height-fixed 类的元素。
  &.layout-content-height-fixed {
    // 设置 .layout-content-wrapper 元素的最大块尺寸（高度），使用自定义的 CSS 变量 --vh 乘以 100。
    .layout-content-wrapper {
      max-block-size: calc(var(--vh) * 100);
    }

    // 设置 .layout-page-content 的样式为弹性盒子布局（flex），并隐藏溢出内容。
    .layout-page-content {
      display: flex;
      overflow: hidden;

      // 为 .page-content-container 设置内联尺寸（宽度）为 100%。
      .page-content-container {
        inline-size: 100%;

        // 选择 .page-content-container 的第一个子元素，设置其最大块尺寸为 100% 并允许 y 轴方向上的滚动。
        > :first-child {
          max-block-size: 100%;
          overflow-y: auto;
        }
      }
    }
  }
}
</style>
