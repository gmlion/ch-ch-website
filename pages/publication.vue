<script setup lang="ts">
import { getBreadcrumb } from "~/generate/store/menuStore";

const router = useRouter();
const startItemId = router.currentRoute.value.meta.id as string;
const { data: breadcrumbItems } = await useAsyncData(async () => {
  const { locale } = useI18n();
  return await getBreadcrumb(startItemId, locale.value);
});
</script>

<template>
  {{ router.currentRoute.value.meta.id }}
  <colored-layout
    class="color-index"
    footer-color="white"
    right-color="layout-white"
    division-mode="halves"
    :show-fader="true"
  >
    <template #side>
      <Breadcrumb :breadcrumb="breadcrumbItems!" :visible-elements="4" />
      <div class="mt-auto">
        <BackToOverviewLink />
      </div>
      <!-- <main-navigation id="navigation" /> -->
    </template>

    <template #main> </template>
  </colored-layout>
</template>
