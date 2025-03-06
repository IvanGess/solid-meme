<template>
  <div class="input-wrapper">
    <component
      :is="component"
      v-bind="$attrs"
      :modelValue="modelValue"
      @update:modelValue="handleInput"
    />

    <div v-if="showFooter" class="input-wrapper__footer">
      <div class="input-wrapper__error">
        <ErrorMessage
          v-if="showError && errorMessage"
          :message="errorMessage"
        />
      </div>

      <div class="input-wrapper__counter">
        <CharacterCounter
          v-if="maxLength"
          :current-length="valueLength"
          :max-length="maxLength"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputUI from '@/components/ui/Input/InputUI.vue';
import type TextareaUI from '@/components/ui/Textarea/TextareaUI.vue';
import { computed } from 'vue';
import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage.vue';
import CharacterCounter from '@/components/ui/CharacterCounter/CharacterCounter.vue';

interface Props {
  component?: typeof InputUI | typeof TextareaUI;
  modelValue?: string | number;
  errorMessage?: string;
  showError?: boolean;
  maxLength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  component: InputUI,
  showError: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const valueLength = computed(() => {
  return String(props.modelValue).length;
});

const showFooter = computed(() => {
  return props.showError || props.maxLength;
});

const handleInput = (value: string | number) => {
  if (props.maxLength && String(value).length > props.maxLength) return;
  emit('update:modelValue', value);
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  width: 100%;
  position: relative;

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    padding: 0 28px;
    width: 100%;
  }

  &__error {
    flex: 1;
    text-align: left;
  }

  &__counter {
    flex-shrink: 0;
    margin-left: auto;
    padding-left: 20px;
  }
}
</style>
