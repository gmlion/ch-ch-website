<script setup lang="ts">
import type { Publication } from "~/core/types/publications";
import { useIndexMenu } from "~/generate/store/menuStore";
import { useStore } from "@nanostores/vue";
import { hideCarousel } from "~/store/pageState";

const hideCarouselState = useStore(hideCarousel);

const { data: homePageData } = await useAsyncData(async () => {
  const { locale } = useI18n();
  const homePageData = (await useIndexMenu(locale.value)).homePublication;

  useHead(metaDataGenerator(homePageData as Publication, locale.value));

  return homePageData;
});

// TODO: Carousel & Colorful scrollbar
</script>

<template>
  <colored-layout
    class="color-index"
    left-color="white"
    division-mode="halves"
    :show-fader="true"
  >
    <template #side>
      <div role="complementary" class="sr-only">
        <h1>{{ $t("homeTitle") }}</h1>
      </div>
      <main-navigation id="navigation" />
    </template>
    <template v-if="hideCarouselState" #main>
      <sub-navigation-desktop />
    </template>
    <template v-else #main>
      <div
        class="h-full flex-1"
        v-if="homePageData?.content[0].containers.right[0].containers.carousel"
      >
        <home-carousel
          class="h-full"
          :carousel-content="
            homePageData?.content[0].containers.right[0].containers.carousel
          "
        />
      </div>
    </template>
  </colored-layout>
</template>
