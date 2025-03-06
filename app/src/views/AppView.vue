<script setup lang="ts">
import TheLogo from '@/components/common/TheLogo.vue';
import UserAuthContent from '@/components/features/auth/components/UserAuthContent.vue';
import PageLayout from '@/components/layout/PageLayout.vue';
</script>
<template>
  <PageLayout>
    <template #header-logo>
      <TheLogo />
    </template>
    <template #header-right-content>
      <UserAuthContent />
    </template>
    <template #main>
      <main>
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </template>
  </PageLayout>
</template>
