<template>
  <div>
    <h2>{{ $t('searchResults') }}</h2>
    <div
      v-for="searchResult in searchResults"
      :key="searchResult.id"
      class="py-8 border-b border-primary-blue"
    >
      <search-breadcrumb
        v-if="searchResult.path"
        :path="searchResult.path"
        class="!lg:hidden"
        :is-election="searchResult.isElection"
      />
      <search-breadcrumb-mobile
        v-if="searchResult.path"
        :path="searchResult.path"
        class="lg:hidden"
        :is-election="searchResult.isElection"
      />
      <a
        :href="searchResult.url"
        class="inline-block mt-3 mb-2 text-2xl font-semibold no-underline cursor-pointer text-tertiary-yellow hover:text-gray-600"
      >
        {{ searchResult.title }}
      </a>
      <picture v-if="searchResult.image" class="block mt-2">
        <img class="w-64" :src="searchResult.image" alt="" />
      </picture>
      <!-- Used v-html here because otherwise we need to build an component which splits the text into chunks and renders them -->
      <!-- eslint-disable vue/no-v-html -->
      <p
        class="mt-4 lg:w-3/4 search-result-text"
        v-html="getText(searchResult)"
      ></p>
      <!-- eslint-enable vue/no-v-html -->
    </div>
    <p
      v-if="
        searchResults !== null && searchResults.length === 0 && !isSearching
      "
      class="mt-8"
    >
      {{ $t('noSearchResults') }}
    </p>
  </div>
</template>

<script>
import SearchBreadcrumb from '@/components/SearchBreadcrumb.vue'
import SearchBreadcrumbMobile from '@/components/SearchBreadcrumbMobile.vue'
export default {
  components: {
    SearchBreadcrumb,
    SearchBreadcrumbMobile,
  },
  props: {
    searchResults: {
      type: Array,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    isSearching: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getText(searchResult) {
      const regEx = new RegExp(this.query, 'ig')
      return searchResult.text.replaceAll(
        regEx,
        (match) => `<span>${match}</span>`
      )
    },
  },
}
</script>

<style lang="postcss" scoped>
:deep(.search-result-text span) {
  @apply font-bold;
}
</style>
