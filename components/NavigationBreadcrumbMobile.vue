<template>
  <div class="font-semibold">
    <div class="flex justify-between mb-2">
      <a class="no-underline text-inherit" :href="allTopicsUrl">
        <span>{{ $t("allTopics") }}</span>
      </a>
      <meta content="1" />
      <button v-if="path && path.length > 0" @click="toggleOpen">
        <svg-icon
          aria-hidden="true"
          class="w-5 h-5 text-inherit"
          :class="{ 'transform rotate-180': isOpen }"
          name="caret-small-down"
        />
        <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns -->
        <span class="hidden">
          {{ $t("openBreadcrumbButtonAlt") }}
        </span>
      </button>
    </div>
    <div v-show="isOpen" class="mb-2">
      <div v-for="(entry, index) in path" :key="index">
        <a
          v-if="index !== path.length - 1 || isLeafLinked"
          :key="entry.label"
          class="block mt-2 no-underline text-inherit"
          :href="getUrl(index)"
          :style="getStyle(index)"
        >
          <span itemprop="name">{{ entry.label }}</span>
        </a>
        <span
          v-else
          :key="entry.label"
          class="block mt-2 text-gray-300"
          :style="getStyle(index)"
        >
          {{ entry.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { makeNavigationPath, electionSlugs } from "~/utils/url";

export default {
  name: "NavigationBreadcrumbMobile",
  props: {
    path: {
      required: true,
      type: Array,
    },
    /** Specifies if the last entry in the path is a link or not */
    isLeafLinked: {
      required: false,
      default: false,
      type: Boolean,
    },
    isElection: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    linkCss() {
      return ["text-secondary-yellow", "hover:text-tertiary-yellow"];
    },
    arrowCss() {
      return ["text-secondary-yellow"];
    },
    allTopicsUrl() {
      return "/" + this.$i18n.locale + "/" + this.electionPath;
    },
    electionPath() {
      if (this.isElection) {
        return electionSlugs[this.$i18n.locale] + "/";
      }
      return "";
    },
  },
  methods: {
    navigateTo(navigationEntry) {
      this.$store.commit("menu/goBackToEntry", navigationEntry);
    },
    getUrl(index) {
      return (
        `/${this.$i18n.locale}/${this.electionPath}` +
        makeNavigationPath(this.path.slice(0, index + 1))
      );
    },
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    getStyle(index) {
      return { "margin-left": (index + 1) * 1.5 + "rem" };
    },
  },
};
</script>
