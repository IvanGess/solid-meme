<template>
  <div class="note-card-list">
    <NoteCard
      v-for="note in notes"
      :key="note.id"
      :title="note.title"
      :content="note.content"
      @delete="$emit('delete', note.id)"
    />
  </div>
</template>

<script setup lang="ts">
import NoteCard from '@/components/features/notes/components/NoteCard.vue';
import type { Note } from '@/api/notes/notes.interfaces.ts';

defineProps<{
  notes: Note[];
}>();

defineEmits<{
  (e: 'delete', id: number): void;
}>();
</script>

<style lang="scss" scoped>
@use '@/styles/core/breakpoints' as breakpoints;
.note-card-list {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: breakpoints.$breakpoint-lg-min) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
