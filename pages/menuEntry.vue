<script setup lang="ts">
import { useStore } from "@nanostores/vue";
import { currentPaths, getBreadcrumb } from "~/generate/store/menuStore";
import { computed } from "vue";

const router = useRouter();
const startItemId = router.currentRoute.value.meta.id as string;
const currentPathsStore = useStore(currentPaths);

const isMainNavigationVisible = computed(
  () => currentPathsStore.value.length < 1
);

const { data: breadcrumbItems } = await useAsyncData(async () => {
  const { locale } = useI18n();
  return await getBreadcrumb(startItemId, locale.value);
});
</script>

<template>
  <colored-layout
    class="color-index"
    left-color="white"
    right-color="layout-blue"
    division-mode="halves"
    :show-fader="true"
  >
    <template #side>
      <div class="flex flex-col h-full">
        <Breadcrumb :breadcrumb="breadcrumbItems!" :visible-elements="4" />
        <h1 class="mt-6 text-3xl-fluid font-semibold">
          {{ router.currentRoute.value.meta.title }}
        </h1>
        <div class="mt-auto">
          <BackToOverviewLink />
        </div>
      </div>
    </template>

    <template #main>
      <div v-show="isMainNavigationVisible">
        <main-navigation id="navigation" :start-item-id="startItemId" />
      </div>
      <sub-navigation-desktop />
    </template>
  </colored-layout>
</template>
