<script setup lang="ts">
import type { Publication } from "~/core/types/publicationsTypes";
import { useStore } from "@nanostores/vue";
import { currentPaths } from "~/generate/store/menuStore";
import { getKeyedPublications } from "~/generate/store/publicationStore";


const currentPathsStore = useStore(currentPaths);
const router = useRouter();

const { data: homePageData } = await useAsyncData(async () => {
  const { locale } = useI18n();
  const keyedPublications = await getKeyedPublications();

  if (!keyedPublications) {
    return null;
  }

  const homePageData = keyedPublications[router.currentRoute.value.meta.id as string];

  if (homePageData) {
    useHead(metaDataGenerator(homePageData as Publication, locale.value));
  }

  return homePageData;
});

const galleryData = homePageData.value?.content?.[0]?.containers?.right?.[0]?.containers?.carousel;
</script>
<template>
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
      <main-navigation id="navigation"/>

    </template>
    <template #main>
      <div v-if="currentPathsStore.length > 0">
        <sub-navigation-desktop/>
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