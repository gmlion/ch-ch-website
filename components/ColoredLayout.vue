<template>
  <!-- A fragment is destroying the navigation layout and I don't know why -->
  <div>
    <div
      :class="{ 'search-is-active': isSearchOpen }"
      class="w-full lg:min-h-screen lg:flex"
    >
      <search-overlay v-show="isSearchOpen" :division-mode="divisionMode" />
      <div
        class="relative flex flex-col w-full px-4 py-4 outline-none lg:px-14 sidebar lg:py-14 lg:pr-16 pusher"
        :class="leftClasses"
      >
        <a href="#content" class="hidden">{{ $t("jumpToContent") }}</a>
        <logo
          :class="{ hidden: isSearchOpen, 'lg:block': true }"
          :color-classes="logoClasses"
          :is-election="isElection"
        />
        <slot name="side" />
        <side-fader
          v-if="showFader"
          class="left-0 right-0 bottom-36 !lg:hidden"
        />
      </div>

      <main
        class="flex flex-col w-full px-4 py-10 transition-colors lg:px-12 main lg:py-14 main-content pusher"
        :class="rightClasses"
      >
        <div
          :class="{ 'text-primary-blue': isSearchOpen }"
          class="flex relative z-40 justify-end mb-20 !lg:hidden h-[40px]"
        >
          <search-link />
        </div>
        <a name="content"></a>
        <slot name="main" />
      </main>
      <slot name="right" />
    </div>
    <footer-desktop
      class="!lg:hidden"
      :division-mode="divisionMode"
      :color="leftColor"
      :is-election="isElection"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from "vue";
import { isSearchOpen as isSearchOpenStore } from "../store/pageLayout";
import { isElection as isElectionStore } from "~/store/pageState";

import Logo from "@/components/Logo.vue";
import SideFader from "@/components/SideFader.vue";
// import FooterDesktop from './FooterDesktop.vue'
// import FooterMobileMinimal from './FooterMobileMinimal.vue'
// import FooterMobileNormal from './FooterMobileNormal.vue'
// import LanguagePickerDesktop from './LanguagePickerDesktop.vue'
import { useStore } from "@nanostores/vue";

const DIVISION_MODES = {
  HALVES: "halves",
  FIFTHS: "fifths",
};

const colorValidator = (value: string): boolean =>
  ["blue", "red", "yellow", "white"].includes(value);

const props = defineProps<{
  leftColor?: string;
  rightColor?: string;
  divisionMode?: string;
  isFooterHidden?: boolean;
  showFader?: boolean;
}>();

let isSearchOpen = useStore(isSearchOpenStore);
watch(isSearchOpen, (newValue) => {
  console.log("isSearchOpen changed to:", newValue);
});
const isElection = useStore(isElectionStore);

const logoClasses = computed(() => {
  let classes = "";
  if (props.leftColor === "blue") classes = "text-primary-white";
  else if (props.leftColor === "white") classes = "text-primary-claim";
  else if (props.leftColor === "yellow") classes = "text-primary-blue";
  else if (props.leftColor === "red") classes = "text-primary-white";
  else classes = "text-black";
  classes += ` bg-primary-${props.leftColor}`;
  return classes;
});

const textcolor = (bgColor: string): string => {
  if (bgColor === "blue") return "primary-white";
  if (bgColor === "red") return "primary-white";
  if (bgColor === "yellow") return "primary-blue";
  if (bgColor === "white") return "primary-blue";
  return "primary-white";
};

const leftClasses = computed(() => ({
  [`bg-primary-${props.leftColor}`]: true,
  [`text-${textcolor(props.leftColor!)}`]: true,
  "lg:h-screen": props.showFader,
  "lg:relative": props.showFader,
  "lg:pr-10": false, // Update this condition as per your requirement
  ...leftWidth.value,
}));

const rightClasses = computed(() => ({
  [`bg-primary-${props.rightColor}`]: true,
  [`text-${textcolor(props.rightColor!)}`]: true,
  ...rightWidth.value,
}));

const leftWidth = computed(() => ({
  "lg:w-2/5": props.divisionMode === DIVISION_MODES.FIFTHS,
  "lg:w-1/2": props.divisionMode === DIVISION_MODES.HALVES,
}));

const rightWidth = computed(() => ({
  "lg:w-3/5": props.divisionMode === DIVISION_MODES.FIFTHS,
  "lg:w-1/2": props.divisionMode === DIVISION_MODES.HALVES,
}));
</script>

<style lang="postcss">
.sidebar {
  min-width: 350px;
}
</style>
