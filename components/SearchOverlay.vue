<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { useStore } from "@nanostores/vue";
import SearchInput from "./SearchInput.vue";
import {
  isSearchOpen as isSearchOpenStore,
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

const onEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isSearchOpen.value) {
    isSearchOpenStore.set(false);
  }
};

onMounted(() => {
  window.addEventListener("keydown", onEscape);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onEscape);
});
</script>
<template>
  <div
      tabindex="0"
      :class="[
      props.divisionMode === 'fifths' && !isOpen ? 'lg:w-3/5' : '',
      props.divisionMode === 'halves' && !isOpen ? 'lg:w-1/2' : '',
      props.divisionMode === 'fifths' && !isOpen ? 'lg:left-2/5' : '',
      props.divisionMode === 'halves' && !isOpen ? 'lg:left-1/2' : ''
    ]"
      class="fixed top-0 left-0 z-30 w-full h-screen px-4 pt-5 bg-primary-yellow lg:pt-36"
  >
    <div class="w-full m-auto lg:w-112">
      <div class="flex justify-between mb-24 lg:mb-12">
        <h2 class="text-3xl lg:text-4xl pt-7">{{ $t("search") }}</h2>
      </div>
      <search-input id="search-input" />
    </div>
  </div>
</template>



<style lang="postcss" scoped>
.search-input:focus {
  outline: none;
  border: none;
}
.search-input::placeholder {
  @apply text-primary-blue font-normal;
}
</style>