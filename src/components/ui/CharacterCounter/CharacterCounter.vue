<template>
  <div
    class="character-counter"
    role="status"
    aria-live="polite"
    :aria-label="`Текущая длина: ${currentLength} из ${maxLength} символов`"
  >
    <span class="character-counter__text">
      {{ currentLength }} / {{ maxLength }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { CharacterCounterProps } from '@/components/ui/CharacterCounter/interfaces/characterCounter.props.ts';

defineProps<CharacterCounterProps>();
</script>

<style lang="scss" scoped>
@import url('./characterCounter.scss');
</style>
