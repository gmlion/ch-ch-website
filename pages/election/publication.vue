<script setup lang="ts">
import type {Publication} from "~/core/types/publicationsTypes";
import {getPublicationById} from "~/generate/store/publicationStore";
import {contentComponents} from "~/utils/contentComponentsHandler";

const router = useRouter();
const startItemId = router.currentRoute.value.meta.id as string;
const {locale} = useI18n();

const {data: publicationData} = await useAsyncData(async () => {
  const publication = getPublicationById(startItemId);
  if (publication) return publication;
});


const {data: contentComponentData} = await useAsyncData(async () => {
  if (publicationData.value?.content) {
    const contentComponentsData = publicationData.value.content[0].containers.right;
    return contentComponents(contentComponentsData, locale.value);
  }
})

const {data: contentComponentLeft} = await useAsyncData(async () => {
  if (publicationData.value?.content) {
    const contentComponentLeftData = publicationData.value.content[0].containers.left;
    return contentComponents(contentComponentLeftData, locale.value);
  }
})

if (publicationData.value) {
  useHead(
      metaDataGenerator(publicationData.value as Publication, locale.value)
  );


}
</script>

<template>
  <colored-layout
      class="color-index"
      left-color="layout-blue"
      footer-color="blue"
      right-color="layout-white"
      division-mode="fifths"
      :show-fader="false"
  >
    <template #side>
      <Breadcrumb/>

      <div v-if="contentComponentLeft">
        <ContentComponents :content-component="contentComponentLeft"/>
      </div>
    </template>

    <template #main>
      <div v-if="contentComponentData">
        <ContentComponents :content-component="contentComponentData"/>
      </div>

    </template>
  </colored-layout>
</template>