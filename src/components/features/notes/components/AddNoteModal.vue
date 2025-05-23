<template>
  <ModalUI
    :modal-id="notesConstants.modalUuid"
    header="Добавление заметки"
    @close="resetForm"
    role="dialog"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <template #content>
      <form @submit.prevent="handleSubmit" aria-label="Форма добавления заметки">
        <div class="form-group">
          <FieldUI
            :max-length="100"
            :value-length="title.length"
            :error-message="formErrors.title"
            :show-error="true"
            v-model="title"
            type="text"
            placeholder="Введите заголовок"
            label="Заголовок"
            aria-describedby="title-error"
          />
          <span id="title-error" class="sr-only" v-if="formErrors.title">
            {{ formErrors.title }}
          </span>
        </div>

        <div class="form-group">
          <FieldUI
            :component="TextareaUI"
            v-model="content"
            :max-length="500"
            :value-length="content.length"
            :error-message="formErrors.content"
            :show-error="true"
            :is-textarea="true"
            placeholder="Введите содержание заметки"
            label="Содержание"
            aria-describedby="content-error"
          />
          <span id="content-error" class="sr-only" v-if="formErrors.content">
            {{ formErrors.content }}
          </span>
        </div>
      </form>
    </template>

    <template #actions>
      <div class="actions-group">
        <ButtonUI
          :label="isSubmitting ? 'Добавление...' : 'Добавить'"
          :disabled="isSubmitting"
          @click="handleSubmit"
          aria-label="Добавить заметку"
        />
      </div>

      <div v-if="errorMessage" class="error-message" role="alert" aria-live="assertive">
        {{ errorMessage }}
      </div>
    </template>
  </ModalUI>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ModalUI from '@/components/ui/Modal/ModalUI.vue';
import ButtonUI from '@/components/ui/Button/ButtonUI.vue';
import { useModalService, useNoteService } from '@/core/di/use-di.ts';
import { notesConstants } from '@/components/features/notes/notes.constants.ts';
import { AddNoteValidator } from '@/utils/validators/add-note.validator.ts';
import FieldUI from '@/components/ui/Field/FieldUI.vue';
import TextareaUI from '@/components/ui/Textarea/TextareaUI.vue';

const emit = defineEmits(['success']);

const notesService = useNoteService();
const modalService = useModalService();

const isOpen = modalService.getState(notesConstants.modalUuid);

watch(isOpen, (newVal) => {
  if (!newVal) resetForm();
});

const title = ref('');
const content = ref('');

const formErrors = ref<Record<string, string>>({
  email: '',
  password: '',
  confirmPassword: '',
});
const errorMessage = ref('');

const isSubmitting = ref(false);

const validateForm = () => {
  formErrors.value = { title: '', content: '' };

  const validationErrors = AddNoteValidator.validate(
    title.value,
    content.value
  );

  validationErrors.forEach((error) => {
    formErrors.value[error.field] = error.message;
  });

  return validationErrors.length === 0;
};

const close = () => {
  modalService.close(notesConstants.modalUuid);
};

const handleSubmit = async () => {
  if (!validateForm() || isSubmitting.value) return;

  isSubmitting.value = true;
  const response = await notesService.createNote({
    title: title.value,
    content: content.value,
  });
  isSubmitting.value = false;

  if (response.error) {
    errorMessage.value = response.error.messages.join(', ');
    return;
  }

  emit('success');
  close();
};

const resetForm = () => {
  title.value = '';
  content.value = '';
  errorMessage.value = '';
  isSubmitting.value = false;
};
</script>

<style lang="scss" scoped>
@use '@/styles/core/colors' as colors;
$primary-color: #2563eb;
$error-color: #dc2626;

.actions-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: colors.$gray;
  }
}

.error-message {
  color: $error-color;
  font-size: 0.875rem;
  margin-top: 1rem;
  padding: 0.5rem;
  background: rgba($error-color, 0.05);
  border-radius: 4px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
