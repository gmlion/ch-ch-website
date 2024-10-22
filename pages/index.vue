<script setup lang="ts">
import type { Publication } from "~/core/types/publicationsTypes";
import { useStore } from "@nanostores/vue";
import { currentPaths } from "~/generate/store/menuStore";
import { getKeyedPublications } from "~/generate/store/publicationStore";
import { getCarouselItems } from "~/components/HomeCarousel/utils/homeCarouselUtils";


const currentPathsStore = useStore(currentPaths);
const router = useRouter();

const { data: homePageData } = await useAsyncData(async () => {

  const keyedPublications = await getKeyedPublications();

  if (!keyedPublications) {
    return null;
  }

  const homePageData = keyedPublications[router.currentRoute.value.meta.id as string];

  if (homePageData) {
    useHead(metaDataGenerator(homePageData as Publication, homePageData.metadata?.language?.locale));
  }

  return homePageData;
});

const { data: carouselItems } = await useAsyncData(async () => {
  if (homePageData.value?.content?.[0]?.containers?.right?.[0]?.containers?.carousel) {
    const carouselItems = await getCarouselItems(homePageData.value?.content?.[0]?.containers?.right?.[0]?.containers?.carousel)
    return carouselItems;
  }
})

</script>
<template>
  <colored-layout class="color-index" footer-color="white" division-mode="halves" :show-fader="true">
    <template #side>
      <div role="complementary" class="sr-only">
        <h1>{{ $t("homeTitle") }}</h1>
      </div>
      <main-navigation id="navigation" />

    </template>
    <template #main>
      <div v-if="currentPathsStore.length > 0" class="hidden lg:block">
        <sub-navigation-desktop />
      </div>
      <div class="h-full flex-1" v-show="carouselItems && currentPathsStore.length < 1">
        <home-carousel class="h-full" :carousel-items="carouselItems!" />
      </div>
    </template>
  </colored-layout>
</template>