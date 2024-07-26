<script lang="ts" setup>
import { isSearchOpen as isSearchOpenStore } from "../store/pageLayout";
import { isElection as isElectionStore } from "~/store/pageState";

// import LanguagePickerDesktop from './LanguagePickerDesktop.vue' WIP
import { useStore } from "@nanostores/vue";
import Footer from "./Footer.vue";

const props = defineProps<{
  leftColor?: string;
  rightColor?: string;
  divisionMode?: string;
  isFooterHidden?: boolean;
  showFader?: boolean;
}>();

let isSearchOpen = useStore(isSearchOpenStore);
const isElection = useStore(isElectionStore);
</script>

<template>
  <div>
    <div
      :class="{ 'search-is-active': isSearchOpen }"
      class="w-full lg:min-h-screen lg:flex"
    >
      <search-overlay v-show="isSearchOpen" :division-mode="divisionMode" />
      <div
        class="left-layout relative flex flex-col w-full px-4 py-4 outline-none lg:px-14 lg:py-14 lg:pr-16 pusher min-w-[350px]"
      >
        <a href="#content" class="hidden">{{ $t("jumpToContent") }}</a>
        <logo :class="{ hidden: isSearchOpen, 'lg:block': true }" />
        <slot name="side" />
        <side-fader
          v-if="showFader"
          class="left-0 right-0 bottom-36 !lg:hidden"
        />
      </div>

      <main
        class="right-layout flex flex-col w-full px-4 py-10 transition-colors lg:px-12 main lg:py-14 main-content pusher"
      >
        <div
          :class="{ 'text-primary-blue': isSearchOpen }"
          class="flex lg:relative z-40 justify-end mb-20 h-[40px]"
        >
          <language-picker class="mr-12" />
          <search-link />
        </div>
        <a name="content"></a>
        <slot name="main" />
      </main>
      <slot name="right" />
    </div>
    <Footer
      :division-mode="divisionMode"
      :color="leftColor"
      :is-election="isElection"
    />
  </div>
</template>