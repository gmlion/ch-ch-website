<script setup lang="ts">
import type { Publication } from "~/core/types/publicationsTypes";
import { useStore } from "@nanostores/vue";
import { setIndexPublication } from "~/generate/store/publicationStore";
import { currentPaths } from "~/generate/store/menuStore";

const currentPathsStore = useStore(currentPaths);

const { data: homePageData } = await useAsyncData(async () => {
  const { locale } = useI18n();
  const homePageData = await setIndexPublication(locale.value);

  useHead(metaDataGenerator(homePageData as Publication, locale.value));

  return homePageData;
});
const galleryData =
  homePageData.value?.content[0].containers.right[0].containers.carousel;
</script>

<template>
  <div>
    <!-- {{ currentPathsStore }} -->
  </div>
  <colored-layout
    class="color-index"
    footer-color="white"
    division-mode="halves"
    :show-fader="true"
  >
    <template #side>
      <div role="complementary" class="sr-only">
        <h1>{{ $t("homeTitle") }}</h1>
      </div>
      <main-navigation id="navigation" />

    </template>
    <template #main>
      <div v-if="currentPathsStore.length > 0">
        <sub-navigation-desktop />
      </div>
      <div
        class="h-full flex-1"
        v-show="galleryData && currentPathsStore.length < 1"
      >
        <home-carousel
          class="h-full"
          :carousel-content="
            galleryData!
          "
        />
      </div>
    </template>
  </colored-layout>
</template>