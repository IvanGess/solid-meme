<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import type { ButtonProps } from '@/components/ui/Button/interfaces/button.props.ts';

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  disabled: false,
});

const emit = defineEmits(['click']);
const router = useRouter();

const hasLabel = computed(() => {
  return props.label;
});

async function handleClick(event: Event) {
  emit('click', event);

  if (props.isLink && props.to) {
    await router.push(props.to);
  }
}
</script>

<style scoped>
@import url('./button.scss');
</style>
<template>
  <button
    :type="type"
    :disabled="disabled"
    class="button-wrapper"
    :class="{ 'button-wrapper--rounded': !hasLabel }"
    @click="handleClick"
  >
    <slot name="prependIcon"></slot>
    <span>{{ label }}</span>
    <slot name="appendIcon"></slot>
  </button>
</template>
