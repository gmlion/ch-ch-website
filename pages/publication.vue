<script setup lang="ts">
import type {Publication} from "~/core/types/publications";
import {getPublicationById} from "~/generate/store/publicationStore";
import {contentComponents} from "~/utils/contentComponentsHandler";
import routerCollection from "~/plugins/routerCollection";
// const routerCollectionObj = routerCollection();/**/
const router = useRouter();
const startItemId = router.currentRoute.value.meta.id as string;
const {locale} = useI18n();
let titleLead: { title?: string; lead?: string } = {};

const {data: publicationData} = await useAsyncData(async () => {
  const publication = getPublicationById(startItemId);
  if (publication) return publication;
});

const {data: contentComponentData} = await useAsyncData(async () => {
  if(publicationData.value) {
    const contentComponentsData = publicationData.value.content[0].containers.right;
    return await contentComponents(contentComponentsData);
  }
})

const {data: contentComponentLeft} = await useAsyncData(async () => {
    if (publicationData.value) {
      const contentComponentLeftData = publicationData.value.content[0].containers.left;
      return await contentComponents(contentComponentLeftData);
    }
})

if (publicationData) {
  useHead(
      metaDataGenerator(publicationData.value as Publication, locale.value)
  );

  titleLead = {
    title: publicationData.value?.content[0].containers.left[0].content.title,
    lead: publicationData.value?.content[0].containers.left[1].content.text,
  };
}

</script>

<template>
  <colored-layout
      class="color-index"
      left-color="layout-blue"
      footer-color="blue"
      right-color="layout-white"
      division-mode="fifth"
      :show-fader="false"
  >
    <template #side>
      <Breadcrumb />

      <div>
        <h1 class="text-primary-white text-3xl-fluid">{{ titleLead.title }}</h1>
        <p class="text-xl-fluid mt-8">{{ titleLead.lead }}</p>
      </div>
      <div v-if="contentComponentLeft">
        <div class="px-6 pt-6 border-2 border-secondary-yellow mt-8" data-v-eec3be88="">
          <p
              class="mb-8 text-xl font-semibold leading-6">Placeholder</p>
          <div tabindex="0" class="mb-8 not-italic">
            <ContentComponents :content-component="contentComponentLeft!"/>
          </div>
        </div>
      </div>
      <div class="mt-auto">
        <BackToOverviewLink/>
      </div>
    </template>

    <template #main>
      <ContentComponents :content-component="contentComponentData!"/>
    </template>
  </colored-layout>
</template>