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
  (e: 'update:modelValue', value: string): void
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

  &__container {
    &--textarea {
      height: auto;
      min-height: 72px;
      padding: 20px 28px;
      align-items: flex-start;
    }
  }

  &__field {
    &--textarea {
      height: auto;
      min-height: 100px;
      resize: vertical;
      line-height: 1.5;
      padding: 0;
      font-family: inherit;
    }
  }
}
</style>
