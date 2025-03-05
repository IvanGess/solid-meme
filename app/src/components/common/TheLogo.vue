<template>
<div class="logo">
  <div class="logo__desktop">
    <IconLogoDesktop/>
  </div>
  <div class="logo__mobile">
    <div v-if="false">
      <IconLogoMobile/>
    </div>
    <div v-else>
      <IconLogoMobileGuest/>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import IconLogoDesktop from "@/components/icons/IconLogoDesktop.vue";
import IconLogoMobile from "@/components/icons/IconLogoMobile.vue";
import IconLogoMobileGuest from "@/components/icons/IconLogoMobileGuest.vue";
</script>

<style scoped lang="scss">
@use '@/styles/core/breakpoints' as breakpoints;

@media (min-width: breakpoints.$breakpoint-md-min) {
  .logo {
    &__desktop {
      display: block;
    }
    &__mobile {
      display: none;
    }
  }
}
@media (max-width: breakpoints.$breakpoint-sm-max) {
  .logo {
    &__desktop {
      display: none;
    }

    &__mobile {
      display: block;
    }
  }
}
</style>
