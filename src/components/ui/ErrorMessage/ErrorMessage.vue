<template>
  <div
    class="error-message"
    role="alert"
    aria-live="assertive"
    :aria-label="`Ошибка: ${message}`"
  >
    <span class="error-message__text">
      {{ message }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { ErrorMessageProps } from '@/components/ui/ErrorMessage/interfaces/errorMessage.props.ts';

defineProps<ErrorMessageProps>();
</script>

<style lang="scss" scoped>
@import url('./error.scss');
</style>
