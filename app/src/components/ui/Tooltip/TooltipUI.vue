<script setup lang="ts">
import { ref } from 'vue';
import type { TooltipProps } from '@/components/ui/ToolTip/interfaces/tooltip.interface.ts'

defineProps<TooltipProps>()

const isVisible = ref(false);
const triggerElement = ref<HTMLElement>();
const tooltipElement = ref<HTMLElement>();
const timeoutId = ref<number>();

const showTooltip = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
    timeoutId.value = undefined;
  }
  isVisible.value = true;
};

const hideTooltip = () => {
  timeoutId.value = setTimeout(() => {
    isVisible.value = false;
  },  300);
};

</script>

<template>
  <div
    class="tooltip-container"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    ref="triggerElement"
  >
    <slot name="trigger" />

    <transition name="fade">
      <div
        v-if="isVisible"
        ref="tooltipElement"
        class="tooltip"
        :class="[`tooltip--${position}`]"
      >
        <div class="tooltip__arrow"></div>
        <div class="tooltip__content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss"  scoped>
@use '@/styles/core/colors' as colors;

.tooltip {
  position: fixed;
  background: colors.$dark-middle;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  min-width: 100px;
  z-index: 1000;
  border-radius: 12px;
  padding: 40px;
  background: colors.$dark-middle;
  transform: translateX(calc(-50% - 17px));
  margin-top: 22px;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.tooltip__arrow {
  &:before {
    content: '';
    position: absolute;
    top: 10px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
}

.tooltip--bottom .tooltip__arrow:before {
  bottom: auto;
  top: -10px;
  border-top: none;
  border-bottom: 10px solid colors.$dark-middle;
}


.tooltip__content {
  position: relative;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
