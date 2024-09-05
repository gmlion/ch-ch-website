<script setup lang="ts">
import type {SearchResult} from "~/core/types/searchTypes";

const props = defineProps<{
  searchResultItem: SearchResult;
}>();
const allRoutes = useRouter().getRoutes();
const url = computed(() => {
  return allRoutes.find((route) => route.meta.id === props.searchResultItem.id.toString())?.path as string;

})
</script>

<template>

  <Breadcrumb :target-url="url" />
  <a
      :href="url"
      class="inline-block mt-3 mb-2 text-2xl font-semibold no-underline cursor-pointer text-tertiary-yellow hover:text-gray-600"
  >
    {{ searchResultItem.title }}
  </a>
  <picture v-if="searchResultItem.metadata.teaserImage" class="block mt-2">
    <img class="w-64" :src="searchResultItem.metadata.teaserImage" alt="" />
  </picture>

  <p
      class="mt-4 lg:w-3/4 richtext "
      v-html="searchResultItem.lead"
  ></p>

</template>

<style scoped lang="postcss">

</style>