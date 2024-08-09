<script lang="ts" setup>
import { computed } from "vue";
import { isSearchOpen as isSearchOpenStore } from "../store/pageLayout";

import { useStore } from "@nanostores/vue";

const route = useRoute();

const isSearchOpen = useStore(isSearchOpenStore);

const isSearchPage = computed(() => {
  if (!route) {
    return false;
  }
  // Should be save enough because the name is search__de, search__fr ...
  return (route.name as string)?.startsWith("search__") ?? false;
});

const handleClick = () => {
  isSearchOpenStore.set(!isSearchOpen.value);
};
</script>
<template>
  <div class="absolute top-4 right-4 lg:static flex items-center">
    <button
      class="disabled:text-gray-300 disabled:cursor-not-allowed"
      :disabled="isSearchPage"
      :aria-label="$t('searchButtonAlt')"
      @click="handleClick"
    >
      <svg-icon
        class="w-6 h-6 fill-current search-icon"
        :class="isSearchOpen ? '' : 'text-primary-blue lg:text-primary-white'"
        :name="isSearchOpen ? 'close-small' : 'search'"
      />
      <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns -->
      <span class="hidden">
        {{ $t("searchButtonTitle") }}
      </span>
    </button>
  </div>
</template>
