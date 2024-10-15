<script lang="ts" setup>
import {isSearchOpen as isSearchOpenStore} from "../store/pageLayout";
import {useStore} from "@nanostores/vue";

const props = defineProps<{
  footerColor?: string;
  rightColor?: "layout-blue" | "layout-yellow" | "layout-white";
  leftColor?: "layout-blue" | "layout-yellow" | "layout-red";
  isElection?: boolean;
  divisionMode?: string;
  hideSearch?: boolean;
  showFader?: boolean;
}>();

let isSearchOpen = useStore(isSearchOpenStore);
</script>

<template>
  <div>
    <div
        :class="[{ 'search-is-active': isSearchOpen }, {'division-fifths': props.divisionMode === 'fifths'}, {'bg-primary-blue': props.leftColor === 'layout-blue'}, {'bg-primary-yellow': props.leftColor === 'layout-yellow'}, {'bg-primary-red': props.leftColor === 'layout-red'}]"
        class="w-full lg:h-full lg:flex main-layout"
    >
      <search-overlay
          v-show="isSearchOpen"
          :division-mode="props.divisionMode"
      />
      <div
          class="left-layout relative flex flex-col w-full px-4 py-4 outline-none lg:px-14 lg:py-14 lg:pr-16 min-w-[350px]"
          :class="leftColor"
      >
        <a href="#content" class="hidden">{{ $t("jumpToContent") }}</a>

        <logo :class="{ hidden: isSearchOpen, 'lg:block': true }" v-if="!isElection"/>
        <logo-election :class="{ hidden: isSearchOpen, 'lg:block': true }" v-if="isElection"/>
        <slot name="side" />
        <side-fader
            v-if="props.showFader"
            class="left-0 right-0 bottom-36 !lg:hidden"
        />
      </div>

      <main
          class="right-layout flex flex-col w-full px-4 py-10 transition-colors lg:px-12 main lg:py-14 main-content pusher"
          :class="props.rightColor"
      >
        <div
            :class="{ 'text-primary-blue': isSearchOpen }"
            class="flex lg:relative z-40 justify-end mb-20 h-[40px]"
        >
          <language-picker class="mr-12"/>
          <div v-if="!hideSearch">

            <search-link/>
          </div>
        </div>
        <slot name="content"></slot>
        <slot name="main"/>
      </main>
      <slot name="right"/>
    </div>

    <Footer
        :division-mode="props.divisionMode"
        :color="props.footerColor"
        :is-election="isElection"
    />
  </div>
</template>