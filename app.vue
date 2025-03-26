<script setup lang="ts">
import localeMiddleware from '~/middleware/locale-detection.global';
definePageMeta({
  middleware: localeMiddleware,
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>