<template>
  <component :is="component">
    <button
      class="disabled:text-gray-300 disabled:cursor-not-allowed"
      :disabled="isSearchPage"
      :aria-label="$t('searchButtonAlt')"
      @click="handleClick"
    >
      <svg-icon
        class="w-6 h-6 fill-current"
        :name="isSearchOpen ? 'close-small' : 'search'"
      />
      <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns -->
      <span class="hidden">
        {{ $t("searchButtonTitle") }}
      </span>
    </button>
  </component>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import {
  isSearchOpen as isSearchOpenStore,
  toggleSearch as toggleSearchStore,
} from "../store/pageLayout";

import { useStore } from "@nanostores/vue";

const props = defineProps<{
  isMobile?: boolean;
}>();

const route = useRoute();

const isSearchOpen = useStore(isSearchOpenStore);

const component = computed(() => (props.isMobile ? "div" : "header"));

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
