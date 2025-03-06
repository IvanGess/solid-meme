<template>
  <PageLayout>
    <template #header-logo>
      <TheLogo aria-label="Логотип приложения" />
    </template>
    <template #header-right-content>
      <UserAuthContent />
    </template>
    <template #main>
      <main>
        <RouterView v-slot="{ Component, route }">
          <Transition name="fade" mode="out-in">
            <component
              :is="Component"
              :key="route.path"
              role="main"
              aria-labelledby="page-title"
            />
          </Transition>
        </RouterView>
      </main>
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import TheLogo from '@/components/common/TheLogo.vue';
import UserAuthContent from '@/components/features/auth/components/UserAuthContent.vue';
import PageLayout from '@/components/layout/PageLayout.vue';
</script>
