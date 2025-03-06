<script setup lang="ts">
import NoteList from '@/components/features/notes/components/NoteList.vue';
import { useModalService, useNoteService } from '@/core/di/use-di.ts';
import { onMounted, ref } from 'vue';
import type { Note } from '@/api/notes/notes.interfaces.ts';
import ButtonUI from '@/components/ui/Button/ButtonUI.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import AddNoteModal from '@/components/features/notes/components/AddNoteModal.vue';
import { notesConstants } from '@/components/features/notes/notes.constants.ts';

const notesService = useNoteService();
const modalService = useModalService();

const notes = ref<Note[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

onMounted(() => {
  fetchNotes();
});

const fetchNotes = async () => {
  isLoading.value = true;
  error.value = null;

  const { data, error: fetchError } = await notesService.getList();

  if (fetchError) {
    error.value = fetchError.message;
    return;
  }

  notes.value = data || [];
  isLoading.value = false;
};
const openAddNoteModal = () => {
  modalService.open(notesConstants.modalUuid);
};
const handleDeleteNote = async (id: number) => {
  const { error: deleteError } = await notesService.deleteNote(id);

  if (deleteError) {
    error.value = deleteError.message;
    return;
  }

  await fetchNotes();
};
</script>

<template>
  <div class="container">
    <div v-if="isLoading && !error" class="loading-state">
      Загружаем заметки...
    </div>

    <div v-if="error" class="error-state">Ошибка: {{ error }}</div>

    <NoteList
      v-if="!isLoading && !error"
      :notes="notes"
      @delete="handleDeleteNote"
    />

    <ButtonUI
      v-if="!isLoading && !error"
      class="floating-button"
      @click="openAddNoteModal"
    >
      <template #appendIcon>
        <IconAdd />
      </template>
    </ButtonUI>
    <AddNoteModal @success="fetchNotes" />
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/core/breakpoints' as breakpoints;

.container {
  margin: 0 auto;
  padding: 40px 0;
  position: relative;
}

.loading-state,
.error-state {
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 2rem;
}

.loading-state {
  background-color: #f0f4ff;
  color: #2c3e50;
}

.error-state {
  background-color: #ffe3e3;
  color: #dc3545;
}

.floating-button {
  position: fixed;
  bottom: 40px;
  right: 40px;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.6);

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

@media ((min-width: breakpoints.$breakpoint-lg-min) and (max-width: breakpoints.$breakpoint-lg-max)) {
  .container {
    padding: 40px 0;
  }
  .floating-button {
    bottom: 30px;
    right: 30px;
  }
}
@media ((min-width: breakpoints.$breakpoint-sm-max) and (max-width: breakpoints.$breakpoint-md-max)) {
  .container {
    padding: 40px 0;
  }
  .floating-button {
    bottom: 25px;
    right: 25px;
  }
}
@media (max-width: breakpoints.$breakpoint-sm-max) {
  .container {
    padding: 20px 0;
  }
  .floating-button {
    bottom: 20px;
    right: 20px;
  }
}
</style>
