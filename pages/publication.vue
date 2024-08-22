<script setup lang="ts">
import type {Publication} from "~/core/types/publications";
import {getBreadcrumb} from "~/generate/store/menuStore";
import {getPublicationById} from "~/generate/store/publicationStore";
import {contentComponents} from "~/utils/contentComponentsHandler";
import type {ContentComponent} from "~/core/types/contentComponents";

const router = useRouter();
const startItemId = router.currentRoute.value.meta.id as string;
const {locale} = useI18n();
let titleLead: { title?: string; lead?: string } = {};
let contentComponentData: ContentComponent[] = [];
const {data: breadcrumbItems} = await useAsyncData(async () => {
  const {locale} = useI18n();
  return await getBreadcrumb(startItemId, locale.value);
});
const {data: publicationData} = await useAsyncData(async () => {
  const publication = getPublicationById(startItemId);
  if (publication) return publication;
});

if (publicationData.value) {
  const contentComponentsData = publicationData.value.content[0].containers.right;
  contentComponentData = await contentComponents(contentComponentsData);  // Await the result
}

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
      division-mode="halves"
      :show-fader="false"
  >
    <template #side>
      <Breadcrumb :breadcrumb="breadcrumbItems!" :visible-elements="4"/>

      <div>
        <h1 class="text-primary-white text-3xl-fluid">{{ titleLead.title }}</h1>
        <p class="text-xl-fluid mt-8">{{ titleLead.lead }}</p>
      </div>
      <div class="mt-auto">
        <BackToOverviewLink/>
      </div>
    </template>

    <template #main>
      <ContentComponents :content-component="contentComponentData"/>  <!-- Update to use the variable -->
    </template>
  </colored-layout>
</template>