<script setup lang="ts">
import IconLogin from '@/components/icons/IconLogin.vue'
import ButtonUI from '@/components/ui/Button/ButtonUI.vue'
import LoginModal from '@/components/features/auth/components/LoginModal.vue'
import { useAuthService, useModalService } from '@/core/di/use-di.ts'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { authConstants } from '@/components/features/auth/auth.constants.ts'
import IconUser from '@/components/icons/IconUser.vue'
import TooltipUI from '@/components/ui/ToolTip/TooltipUI.vue'

const authService = useAuthService();
const modalService = useModalService()
const router = useRouter();

const isAuth = computed(() => authService.isAuth.value);
const currentUser = computed(() => authService.currentUser.value);

onMounted(async () => {
  await authService.checkAuth();
});

const openLoginModal = () => {
  modalService.open(authConstants.modalUuid)
}
const onLoginSuccess = () => {
  const redirect = router.currentRoute.value.query.redirect;
  router.push(redirect?.toString() || '/notes');
};

const logout = async () => {
  await authService.logout();
  router.push('/login');
};
</script>
<template>
  <ButtonUI
    v-if="!isAuth"
    label="Вход"
    @click="openLoginModal"
  >
    <template #prependIcon>
      <IconLogin />
    </template>
  </ButtonUI>
  <div class="user-menu" v-else>
       <span v-if="currentUser" >
        {{ currentUser.email }}
      </span>
    <TooltipUI position="bottom">
      <template #trigger>
        <IconUser class="user-menu--icon" />
      </template>
      <div class="logout-wrapper">
        <a
          href="#"
          class="logout-link"
          @click.prevent="logout"
        >
          Выйти
        </a>
      </div>
    </TooltipUI>
  </div>

  <LoginModal @success="onLoginSuccess"/>
</template>
<style lang="scss" scoped>
@use '@/styles/core/colors' as colors;
@use '@/styles/core/typography' as typography;

.logout-link {
  color: colors.$green-light;
  text-decoration: none;
  cursor: pointer;
  display: block;
  transition: opacity 0.2s;
  font-weight: typography.$font-weight-bold;
}

.logout-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.user-menu {
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 18px;
  gap: 13px;
  &--icon {
    cursor: pointer;
  }
}
</style>
