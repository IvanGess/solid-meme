<template>
  <div class="input">
    <label v-if="label" class="input__label">{{ label }}</label>
    <div class="input__container" :class="{ 'input__container--password': isPassword }">
      <input
        class="input__field"
        :type="computedInputType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
      />

      <div v-if="isPassword" class="input__icon" @click="togglePasswordVisibility">
        <component :is="showPassword ? IconOffPassword : IconOnPassword" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import IconOffPassword from '@/components/icons/IconOffPassword.vue'
import IconOnPassword from '@/components/icons/IconOnPassword.vue'


interface Props {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  modelValue?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>();

const showPassword = ref(false);

const isPassword = computed(() => props.type === 'password');
const computedInputType = computed(() =>
  isPassword.value && !showPassword.value ? 'password' : 'text'
);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
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
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 36px;
    padding: 0 12px;
    width: 100%;
    height: 72px;
    background-color: colors.$white;
    margin-top: 8px;

    &:hover,
    &:focus-within {
      outline: 2px solid colors.$green-light;
    }

    &--password {
      padding-right: 28px;
    }
  }

  &__field {
    width: 100%;
    height: 27px;
    font-weight: 400;
    font-size: 18px;
    line-height: 156%;
    letter-spacing: 1.3px;
    color: colors.$dark;
    border: none;
    outline: none;

    &::placeholder {
      color: colors.$gray;
    }
  }

  &__icon {
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
}
</style>
