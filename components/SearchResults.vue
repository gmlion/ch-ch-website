<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type {SearchResult} from "~/core/types/searchTypes";
import SearchResultItem from "~/components/SearchResultItem.vue";

const props = defineProps<{
  searchQuery: string;
}>();

const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();


// Async function to fetch search results
//todo: this will only work local, this needs to do client side fetching as soon as it hits the stage environment
const fetchSearchResults = async (): Promise<SearchResult[]> => {
    const searchUrl = `${runtimeConfig.public.searchUrl}/ne/search?lang=${locale.value}&q=${props.searchQuery}`;
    const response = await fetch(searchUrl);
    return await response.json();
};

const {data: searchResults} = await useAsyncData(async () => {
  if (!props.searchQuery) return [];
  return await fetchSearchResults();
});

</script>

<template>
  <div class="richtext">
    <h2>{{ $t('searchResults') }}</h2>
    <div v-if="searchResults?.length">
      <ul class="py-8 border-b border-primary-blue" v-for="result in searchResults" :key="result.id">
        <SearchResultItem :search-result-item="result"/>
      </ul>
    </div>
    <div v-else>
      <p class="mt-8">{{ $t('noSearchResults') }}</p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
/* Your styles here */
</style>