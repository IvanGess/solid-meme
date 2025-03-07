<template>
  <div class="page-layout">
    <header class="page-layout__header" role="banner">
      <slot name="header-logo"></slot>

      <div class="right-section" aria-label="Дополнительные элементы">
        <slot name="header-right-content"></slot>
      </div>
    </header>
    <slot name="main"></slot>
  </div>
</template>

<style lang="scss">
@use '@/styles/core/colors' as colors;
@use '@/styles/core/breakpoints' as breakpoints;

.page-layout {
  background-color: colors.$dark;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 360px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 160px;
    height: 136px;
    max-width: 1920px;
    min-width: 360px;
    width: 100%;
  }

  @media ((min-width: breakpoints.$breakpoint-lg-min) and (max-width: breakpoints.$breakpoint-lg-max)) {
    &__header {
      padding: 0 80px;
      height: 96px;
    }
  }
  @media ((min-width: breakpoints.$breakpoint-sm-max) and (max-width: breakpoints.$breakpoint-md-max)) {
    &__header {
      padding: 0 40px;
      height: 96px;
    }
  }
  @media (max-width: breakpoints.$breakpoint-sm-max) {
    &__header {
      padding: 0 20px;
      height: 96px;
    }
  }
}
</style>
