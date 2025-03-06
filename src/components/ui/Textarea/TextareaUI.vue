<template>
  <div class="input">
    <label v-if="label" class="input__label">{{ label }}</label>
    <div class="input__container input__container--textarea">
      <textarea
        class="input__field input__field--textarea"
        :placeholder="placeholder"
        :value="modelValue"
        :rows="rows"
        :cols="cols"
        @input="handleInput"
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  placeholder?: string;
  modelValue?: string;
  rows?: number;
  cols?: number;
}

const { rows, cols } = withDefaults(defineProps<Props>(), {
  rows: 4,
  cols: 50,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

<style lang="scss" scoped>
@use '@/styles/core/colors' as colors;

.input {
  &__label {
    font-weight: 400;
    font-size: 18px;
    line-height: 156%;
    letter-spacing: 1.3px;
    color: colors.$gray;
    padding: 0 24px;
  }

  &__field {
    &--textarea {
      min-height: 244px;
      font-family: inherit;
      width: 100%;
      border-radius: 36px;
      padding: 16px;
      color: colors.$dark;
      margin-top: 8px;
    }
  }
}
</style>
