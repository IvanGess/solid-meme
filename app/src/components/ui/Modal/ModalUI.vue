<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useModalService } from '@/core/di/use-di.ts'
import ButtonUI from '@/components/ui/Button/ButtonUI.vue'
import IconClose from '@/components/icons/IconClose.vue'
import type { ModalProps } from '@/components/ui/Modal/interfaces/modal.props.ts'

const props = defineProps<ModalProps>()

const emit = defineEmits(['close'])

const modalService = useModalService()
const dialog = ref<HTMLDialogElement | null>(null)
const isOpen = modalService.getState(props.modalId)

onMounted(() => modalService.register(props.modalId))
onUnmounted(() => modalService.unregister(props.modalId))

watch(isOpen, (newVal) => {
  if (newVal) {
    dialog.value?.showModal()
    document.body.style.overflow = 'hidden'
  } else {
    dialog.value?.close()
    document.body.style.overflow = ''
    emit('close')
  }
})

const handleClose = () => {
  modalService.close(props.modalId)
  emit('close')
}
</script>

<template>
  <dialog
    ref="dialog"
    class="modal"
    @click="(e) => e.target === dialog && handleClose()"
    @close="handleClose"
  >
    <div class="modal-content">
      <ButtonUI @click="handleClose" class="modal-button__close">
        <template #appendIcon>
          <IconClose/>
        </template>
      </ButtonUI>

      <div class="modal-header">
        <h3>{{ header }}</h3>
      </div>

      <div class="modal-body">
        <slot name="content" />
      </div>

      <div class="modal-footer">
        <slot name="actions" />
      </div>
    </div>
  </dialog>
</template>
<style lang="scss">
@use '@/styles/core/colors' as colors;
@use '@/styles/core/breakpoints' as breakpoints;

$primary: #2563eb;
$background-overlay: colors.$dark;
$transition-speed: 0.3s;

.modal {
  border: none;
  padding: 0;
  background: transparent;
  max-width: 95vw;
  width: 100%;

  &::backdrop {
    background: $background-overlay;
    opacity: 0.7;
    backdrop-filter: blur(4px);
    transition: opacity $transition-speed;
  }
}

.modal-body {
  margin: 40px 0 30px;
}

.modal-button {
  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 780px;
  background-color: colors.$dark-middle;
  border-radius: 40px;
  z-index: 1000;
  padding: 80px;
}

.modal-header {

  h3 {
    margin: 0;
    font-weight: 600;
    font-size: 48px;
    line-height: 150%;
  }
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;

  &:hover {
    color: #374151;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-speed;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform $transition-speed ease, opacity $transition-speed ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

@media ((min-width:breakpoints.$breakpoint-lg-min) and (max-width: breakpoints.$breakpoint-lg-max)) {
  .modal-content {
    max-width: 594px;
    padding: 58px;
  }
  .modal-header {
    h3 {
      text-wrap: auto;
    }

  }
  .actions-group {
    &__switch-link {
      flex-direction: column;
    }
  }
}
@media ((min-width: breakpoints.$breakpoint-sm-max) and (max-width: breakpoints.$breakpoint-md-max)) {
  .modal-content {
    padding: 58px;
  }
}
@media (max-width:breakpoints.$breakpoint-sm-max) {
  .modal-content {
    padding: 90px 18px;
    width: 98%;
    height: 98%;
  }
.modal-header {
  h3 {
    font-weight: 600;
    font-size: 32px;
    line-height: 112%;
    text-wrap: auto;
  }
}

  .modal-button {
    &__close {
      top: 12px;
      right: 12px;
    }
  }

  .modal-body {
    margin: 26px 0 20px;
  }

  .actions-group {
    flex-direction: column-reverse;
  }

  .button-wrapper.submit-button {
    width: 100%;
    span {
      width: 100%;
    }
  }
}
</style>
