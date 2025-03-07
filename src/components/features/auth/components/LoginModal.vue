<template>
  <ModalUI
    :modal-id="authConstants.modalUuid"
    :header="formTitle"
    @close="resetForm"
    role="dialog"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <template #content>
      <form @submit.prevent="handleSubmit" class="form-group__wrapper" aria-label="Форма авторизации">
        <div class="form-group">
          <FieldUI
            :error-message="formErrors.email"
            :show-error="true"
            v-model="email"
            type="email"
            placeholder="Введите значение"
            label="Email"
            :required="true"
            autocomplete="username"
            aria-describedby="email-error"
          />
          <span id="email-error" class="sr-only" v-if="formErrors.email">{{ formErrors.email }}</span>
        </div>

        <div class="form-group">
          <FieldUI
            :show-error="true"
            :error-message="formErrors.password"
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            :label="passwordLabel"
            :autocomplete="!isLoginForm ? 'current-password' : 'new-password'"
            aria-describedby="password-error"
          />
          <span id="password-error" class="sr-only" v-if="formErrors.password">{{ formErrors.password }}</span>
        </div>

        <div v-if="!isLoginForm" class="form-group">
          <FieldUI
            v-model="confirmPassword"
            type="password"
            placeholder="Ввод"
            label="Пароль ещё раз"
            aria-describedby="confirm-password-error"
          />
          <span id="confirm-password-error" class="sr-only" v-if="formErrors.confirmPassword">{{ formErrors.confirmPassword }}</span>
        </div>
      </form>
    </template>

    <template #actions>
      <div class="actions-group">
        <div class="actions-group__switch-link">
          {{ switchFormText }}
          <button
            type="button"
            class="switch-form"
            @click="switchForm"
            aria-label="Переключить форму"
          >
            {{ switchFormButton }}
          </button>
        </div>

        <ButtonUI
          type="submit"
          :label="isSubmitted"
          class="submit-button"
          :disabled="isSubmitting"
          @click="handleSubmit"
          aria-label="Отправить форму"
        />
      </div>

      <div v-if="errorMessage" class="message-error" role="alert" aria-live="assertive">
        {{ errorMessage }}
      </div>
    </template>
  </ModalUI>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import ModalUI from '@/components/ui/Modal/ModalUI.vue';
import { useRouter } from 'vue-router';
import {
  useAuthService,
  useModalService,
  useUserService,
} from '@/core/di/use-di.ts';
import { AuthValidator } from '@/utils/validators/auth.validator.ts';
import ButtonUI from '@/components/ui/Button/ButtonUI.vue';
import { authConstants } from '@/components/features/auth/auth.constants.ts';
import FieldUI from '@/components/ui/Field/FieldUI.vue';

const emit = defineEmits(['success']);

const authService = useAuthService();
const userService = useUserService();
const router = useRouter();
const modalService = useModalService();

const isOpen = modalService.getState(authConstants.modalUuid);

watch(isOpen, (newVal) => {
  if (!newVal) resetForm();
});

const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const isSubmitting = ref(false);
const isLoginForm = ref(true);

const formTitle = computed(() =>
  isLoginForm.value ? 'Вход в ваш аккаунт' : 'Регистрация'
);
const switchFormText = computed(() =>
  isLoginForm.value ? 'У вас нет аккаунта? ' : 'У вас есть аккаунт? '
);

const switchFormButton = computed(() =>
  isLoginForm.value ? 'Зарегистрируйтесь' : 'Войдите'
);

const formErrors = ref<Record<string, string>>({
  email: '',
  password: '',
  confirmPassword: '',
});
const errorMessage = ref('');
const clearErrors = () => {
  errorMessage.value = '';
  formErrors.value = { email: '', password: '', confirmPassword: '' };
};

const validateForm = () => {
  clearErrors();

  const validationErrors = AuthValidator.validate(
    email.value,
    password.value,
    confirmPassword.value,
    isLoginForm.value
  );

  validationErrors.forEach((error) => {
    formErrors.value[error.field] = error.message;
  });

  return validationErrors.length === 0;
};

const close = () => {
  modalService.close(authConstants.modalUuid);
};
const login = async () => {
  const response = await authService.login({
    email: email.value,
    password: password.value,
  });

  if (response.error) {
    errorMessage.value = response.error.messages.join(', ');
    isSubmitting.value = false;
    return;
  }

  close();
  emit('success');
};
const register = async () => {
  const response = await userService.register({
    email: email.value,
    password: password.value,
    confirm_password: confirmPassword.value,
  });

  if (response.error) {
    errorMessage.value = response.error.messages.join(', ');
    isSubmitting.value = false;
    return;
  }
  close();
  emit('success');
  router.push('/login');
};

const handleSubmit = () => {
  if (!validateForm() || isSubmitting.value) return;
  isSubmitting.value = true;
  errorMessage.value = '';
  const request = isLoginForm.value ? login : register;
  request();
};

const passwordLabel = computed(() =>
  isLoginForm.value ? 'Пароль' : 'Новый пароль'
);
const isSubmitted = computed(() =>
  isSubmitting.value
    ? 'Отправка...'
    : isLoginForm.value
      ? 'Войти'
      : 'Зарегистрироваться'
);

const clearForm = () => {
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
};

const switchForm = () => {
  isLoginForm.value = !isLoginForm.value;

  clearForm();
  clearErrors();
};

const resetForm = () => {
  clearForm();
  clearErrors();

  isLoginForm.value = true;
  isSubmitting.value = false;
};
</script>

<style lang="scss">
@use '@/styles/core/colors' as colors;
@use '@/styles/core/breakpoints' as breakpoints;
$primary-color: #2563eb;

.modal-footer {
  display: flex;
  flex-direction: column;
}

.actions-group {
  display: flex;
  justify-content: space-between;

  &__switch-link {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 18px;
    line-height: 156%;
    color: colors.$gray;
    gap: 4px;
  }
}

.form-group {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  label {
    font-weight: 400;
    font-size: 18px;
    line-height: 156%;
    color: colors.$gray;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: $primary-color;
    }
  }
}

.message-error {
  color: colors.$error;
  border-radius: 24px;
  padding: 8px 20px;
  background: rgba(255, 116, 97, 0.1);
  font-weight: 400;
  font-size: 18px;
  line-height: 156%;
  margin: 20px 0 0;
}

.switch-form {
  background: none;
  border: none;
  font-weight: 700;
  font-size: 18px;
  line-height: 156%;
  color: colors.$green-light;
  cursor: pointer;

  &:hover {
    color: colors.$white;
  }
}

.submit-button {
  background: $primary-color;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: $primary-color;
  }

  &:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }
}
@media (max-width: breakpoints.$breakpoint-sm-max) {
  .form-group {
    &__wrapper {
      gap: 8px;
    }
  }
  .actions-group {
    &__switch-link {
      font-weight: 400;
      font-size: 14px;
      line-height: 171%;
      margin: 10px;
      justify-content: center;
    }
  }
  .switch-form {
    font-weight: 700;
    font-size: 14px;
    line-height: 171%;
  }
  .message-error {
    font-size: 14px;
  }
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
