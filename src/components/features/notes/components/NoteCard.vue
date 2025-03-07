<template>
  <article class="note" aria-labelledby="note-title">
    <div class="note__header">
      <h4 class="note__header--title">{{ title }}</h4>
    </div>
    <div class="note__content">
      <div class="note__content--text">{{ content }}</div>
      <div class="note__content--btn-wrapper">
        <IconClose class="note__content--icon" />
        <button
          class="note__content--btn"
          @click="$emit('delete')"
          aria-label="Удалить заметку"
        >
          Удалить
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue';

defineProps<{
  title: string;
  content: string;
}>();

defineEmits<{
  (e: 'delete'): void;
}>();
</script>

<style lang="scss" scoped>
@use '@/styles/core/colors' as colors;
@use '@/styles/core/breakpoints' as breakpoints;

.note {
  width: 100%;
  color: colors.$white;
  min-width: 0;

  &__header {
    position: relative;
    background: colors.$green-light;
    border-radius: 12px 0 0 0;
    border-bottom: 1px solid colors.$green;
    clip-path: polygon(
      0px 0px,
      calc(100% - 2.5rem) 0px,
      100% 2.5rem,
      100% 101%,
      0% 101%
    );
    padding: 20px 28px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      background: colors.$green;
      border-bottom-left-radius: 8px;
    }

    &--title {
      font-size: 24px;
      line-height: 1.33;
      font-weight: 600;
      margin: 0;
      letter-spacing: 1.3px;
    }
  }

  &__content {
    background: colors.$green-light;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.4);
    &--text {
      padding: 20px 28px 28px;
      border-top: 1px solid colors.$green-middle;
      font-size: 20px;
      line-height: 1.6;
      font-weight: 500;
      letter-spacing: 1.7px;
      margin-top: -2px;
      width: 100%;
      max-height: 283px;
      display: -webkit-box;
      -webkit-line-clamp: 8;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &--btn-wrapper {
      display: flex;
      margin: 18px 30px 0 auto;
      padding-bottom: 20px;
      align-items: center;
      gap: 8px;
      justify-content: end;
    }

    &--btn {
      background-color: transparent;
      border: none;

      font-weight: 500;
      font-size: 20px;
      line-height: 160%;
      letter-spacing: 2.5px;
      cursor: pointer;
    }

    &--icon {
      cursor: pointer;
    }
  }
}

@media (max-width: breakpoints.$breakpoint-sm-max) {
  .note {
    &__header--title {
      font-size: 20px;
      padding-right: 40px;
    }

    &__content--text {
      font-size: 16px;
      line-height: 1.5;
    }
  }
}
</style>
