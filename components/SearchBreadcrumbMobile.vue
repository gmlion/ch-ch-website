<template>
  <div class="font-semibold text-gray-600">
    <div class="flex justify-between">
      <a class="no-underline text-inherit" :href="allTopicsUrl">
        <span>{{ $t('allTopics') }}</span>
      </a>
      <button @click="toggleOpen">
        <svg-icon
          class="w-5 h-5 text-gray-300"
          :class="{ 'transform rotate-180': isOpen }"
          name="caret-small-down"
          aria-hidden="true"
        />
        <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns -->
        <span class="hidden">
          {{ $t('openBreadcrumbButtonAlt') }}
        </span>
      </button>
    </div>
    <div v-show="isOpen">
      <div v-for="(entry, index) in path" :key="index">
        <a
          v-if="index !== path.length - 1"
          :key="entry.label"
          class="block mt-2 no-underline text-inherit"
          :href="getUrl(index)"
          :style="getStyle(index)"
        >
          {{ entry.label }}
        </a>
        <span
          v-else
          :key="entry.label"
          class="block mt-2"
          :style="getStyle(index)"
        >
          {{ entry.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { makeNavigationPath, electionSlugs } from '../utils/url'

export default {
  props: {
    path: {
      type: Array,
      required: true,
    },
    isElection: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    allTopicsUrl() {
      return '/' + this.$i18n.locale + '/' + this.electionPath
    },
    electionPath() {
      if (this.isElection) {
        return electionSlugs[this.$i18n.locale] + '/'
      }
      return ''
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    getUrl(index) {
      return (
        `/${this.$i18n.locale}/${this.electionPath}` +
        makeNavigationPath(this.path.slice(0, index + 1))
      )
    },
    getStyle(index) {
      return { 'margin-left': (index + 1) * 1.5 + 'rem' }
    },
  },
}
</script>
