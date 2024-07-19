<template>
  <div class="flex border outline-none border-primary-blue">
    <input
      ref="searchInput"
      v-model="searchText"
      class="w-full p-4 text-xl font-bold bg-transparent search-input text-primary-blue lg:p-3"
      :placeholder="$t('searchPlaceholder')"
      :aria-label="$t('searchPlaceholder')"
      type="text"
      @keyup="onKeyUp"
    />
    <button class="p-4 lg:p-3" @click="search">
      <svg-icon class="fill-current w-7 h-7 text-primary-blue" name="search" />
      <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns -->
      <span class="hidden">
        {{ $t("searchButtonTitle") }}
      </span>
    </button>
  </div>
</template>

<script>
import { electionSlugs } from "../utils/url";
import { isSearchOpen } from "../store/pageLayout";
import { isElection } from "../store/pageState";
export default {
  props: {
    initialValue: {
      required: false,
      type: String,
      default: "",
    },
  },
  data() {
    return {
      searchText: this.initialValue,
    };
  },
  computed: {
    isSearchOpen() {
      return isSearchOpen.get();
    },
    isElection() {
      return isElection.get();
    },
  },
  watch: {
    isSearchOpen(newValue) {
      if (newValue) {
        this.$refs.searchInput.focus();
      }
    },
  },
  methods: {
    onKeyUp(event) {
      // If enter was pressed
      if (event.keyCode === 13) {
        this.search(this.searchText);
      }
    },
    search() {
      let electionPath = "";
      if (this.isElection) {
        electionPath = electionSlugs[this.$i18n.locale] + "/";
      }
      window.location.href = `/${this.$i18n.locale}/${electionPath}search?q=${this.searchText}`;
    },
  },
};
</script>
