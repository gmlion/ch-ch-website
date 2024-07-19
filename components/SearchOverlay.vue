<template>
  <div
    tabindex="0"
    :class="[widthClasses, leftClasses]"
    class="fixed top-0 left-0 z-30 w-full h-screen px-4 pt-5 bg-primary-yellow lg:pt-36"
  >
    <div class="w-full m-auto lg:w-112">
      <div class="flex justify-between mb-24 lg:mb-12">
        <h2 class="text-3xl lg:text-4xl pt-7">{{ $t("search") }}</h2>
        <div class="lg:hidden">
          <button class="text-primary-blue" @click="handleToggleSearch">
            <svg-icon class="w-8 h-8 fill-current" name="close-small" />
            <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns -->
            <span class="hidden">
              {{ $t("toggleSearchButtonTitle") }}
            </span>
          </button>
        </div>
      </div>
      <search-input id="search-input" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useStore } from "@nanostores/vue";
import { useRoute } from "vue-router";
import SearchInput from "./SearchInput.vue";
import {
  isSearchOpen as isSearchOpenStore,
  toggleSearch as toggleSearchStore,
} from "../store/pageLayout";

const props = defineProps<{
  divisionMode?: string;
}>();

const isSearchOpen = useStore(isSearchOpenStore);

const isOpen = ref(false);

const widthClasses = computed(() => {
  return {
    "lg:w-3/5": props.divisionMode === "fifths" && !isOpen.value,
    "lg:w-1/2": props.divisionMode === "halves" && !isOpen.value,
  };
});

const handleToggleSearch = () => {
  console.log("handleToggleSearch", isSearchOpen.value);
  toggleSearchStore.set(!isSearchOpen.value);
};

const leftClasses = computed(() => {
  return {
    "lg:left-2/5": props.divisionMode === "fifths" && !isOpen.value,
    "lg:left-1/2": props.divisionMode === "halves" && !isOpen.value,
  };
});

const onEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isSearchOpen.value) {
    toggleSearchStore.set(false);
  }
};

onMounted(() => {
  window.addEventListener("keydown", onEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onEscape);
});
</script>

<style lang="postcss" scoped>
.search-input:focus {
  outline: none;
  border: none;
}
.search-input::placeholder {
  @apply text-primary-blue font-normal;
}
</style>
