<template>
  <div class="error-message">
    <span class="error-message__text">
      {{ message }}
    </span>
  </div>
</template>

<script setup lang="ts">

import type {
  ErrorMessageProps
} from '@/components/ui/ErrorMessage/interfaces/errorMessage.props.ts'

const props = defineProps<ErrorMessageProps>();
</script>

<style lang="scss" scoped>
@import url("./error.scss");
</style>
