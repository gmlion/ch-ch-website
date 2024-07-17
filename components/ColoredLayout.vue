<template>
  <!-- A fragment is destroying the navigation layout and i dont know why -->
  <div>
    <div
      :class="{ 'search-is-active': isSearchOpen }"
      class="w-full lg:min-h-screen lg:flex"
    >
      <search-overlay
        v-show="isSearchOpen"
        v-body-scroll-lock="isSearchOpen"
        :division-mode="divisionMode"
      />
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
        <!-- todo: check how to get search accessibilitywise, perhaps show in v-show and dont use display none but position to hide -->
      </div>

      <main
        class="flex flex-col w-full px-4 py-10 transition-colors lg:px-12 main lg:py-14 main-content pusher"
        :class="rightClasses"
      >
        <!-- Give it the same height as the logo -->
        <div
          :class="{ 'text-primary-blue': isSearchOpen }"
          class="flex relative z-40 justify-end mb-20 !lg:hidden h-[40px]"
        >
          <language-picker-desktop class="mr-12" />
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
    <footer-mobile-minimal v-if="!isFooterHidden" class="lg:hidden" />
    <footer-mobile-normal class="lg:hidden" :is-election="isElection" />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "@/components/Logo.vue";
import SideFader from "@/components/SideFader.vue";
import SearchLink from "@/components/SearchLink.vue";
import FooterDesktop from "./FooterDesktop.vue";
import FooterMobileMinimal from "./FooterMobileMinimal.vue";
import FooterMobileNormal from "./FooterMobileNormal.vue";
import LanguagePickerDesktop from "./LanguagePickerDesktop.vue";
import SearchOverlay from "./SearchOverlay.vue";

const DIVISION_MODES = {
  HALVES: "halves",
  FIFTHS: "fifths",
};

const colorValidator = (value) => {
  return ["blue", "red", "yellow", "white"].includes(value);
};

export default {
  name: "ColoredLayout",
  components: {
    LanguagePickerDesktop,
    Logo,
    SideFader,
    FooterDesktop,
    FooterMobileMinimal,
    FooterMobileNormal,
    SearchOverlay,
    SearchLink,
  },
  props: {
    leftColor: {
      type: String,
      required: false,
      default: "blue",
      validator: colorValidator,
    },
    /**
     * Maybe at some point it makes more sense to define a few sets
     * of combinations... for instance:
     * * Menu:white/blue
     * * Search: white/yellow,
     * * Search-Result: yellow/white
     * ... etc.
     * So we can only set the "type" of site to the prop, but for now
     * I leave it like this here, because I'm unsure
     */
    rightColor: {
      type: String,
      required: false,
      default: "white",
      validator: colorValidator,
    },
    divisionMode: {
      type: String,
      required: false,
      default: "fifths",
      validator(value) {
        return Object.values(DIVISION_MODES).includes(value);
      },
    },
    isFooterHidden: {
      type: Boolean,
      required: false,
      default: false,
    },
    showFader: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    ...mapGetters(["global/isScreenMd"]),
    ...mapState("global", ["isSearchOpen"]),
    ...mapState("menu", ["isElection"]),
    logoClasses() {
      let classes = "";
      if (this.leftColor === "blue") classes = "text-primary-white";
      else if (this.leftColor === "white") classes = "text-primary-claim";
      else if (this.leftColor === "yellow") classes = "text-primary-blue";
      else if (this.leftColor === "red") classes = "text-primary-white";
      else classes = "text-black";
      classes += ` bg-primary-${this.leftColor}`;

      return classes;
    },

    leftClasses() {
      return Object.assign(
        {
          [`bg-primary-${this.leftColor}`]: true,
          [`text-${this.textcolor(this.leftColor)}`]: true,
          "lg:h-screen": this.showFader,
          "lg:relative": this.showFader,
          // We need an lower padding on the index page (for the scrollbar)
          "lg:pr-10": this.$route.name.startsWith("index"),
        },
        this.leftWidth
      );
    },
    rightClasses() {
      return Object.assign(
        {
          [`bg-primary-${this.rightColor}`]: true,
          [`text-${this.textcolor(this.rightColor)}`]: true,
        },
        this.rightWidth
      );
    },
    /**
     * The width of the left part regarding the division mode
     */
    leftWidth() {
      return {
        "lg:w-2/5": this.divisionMode === DIVISION_MODES.FIFTHS,
        "lg:w-1/2": this.divisionMode === DIVISION_MODES.HALVES,
      };
    },
    /**
     * The width of the right part regarding the division mode
     */
    rightWidth() {
      return {
        "lg:w-3/5": this.divisionMode === DIVISION_MODES.FIFTHS,
        "lg:w-1/2": this.divisionMode === DIVISION_MODES.HALVES,
      };
    },
  },
  methods: {
    textcolor(bgColor) {
      if (bgColor === "blue") return "primary-white";
      if (bgColor === "red") return "primary-white";
      if (bgColor === "yellow") return "primary-blue";
      if (bgColor === "white") return "primary-blue";
      return "primary-white";
    },
  },
};
</script>

<style lang="postcss">
.sidebar {
  min-width: 350px;
}
</style>
