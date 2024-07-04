<template>
  <ul class="flex flex-wrap items-center text-lg font-semibold text-gray-600">
    <li>
      <navigation-breadcrumb-item
        :label="$t('allTopics')"
        :href="`/${$i18n.locale}/${electionPath}`"
        mode="search"
      />
    </li>
    <li v-for="(entry, index) in path" :key="entry.label">
      <navigation-breadcrumb-item
        v-if="index != path.length - 1"
        :label="entry.label"
        :href="getUrl(index)"
        mode="search"
        :is-leaf="index === path.length - 1"
      />
      <!-- different one for the last entry -->
      <navigation-breadcrumb-item
        v-else
        :label="entry.label"
        :is-leaf="true"
        mode="search"
      />
    </li>
  </ul>
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
  computed: {
    electionPath() {
      if (this.isElection) {
        return electionSlugs[this.$i18n.locale] + '/'
      }
      return ''
    },
  },
  methods: {
    getUrl(index) {
      return (
        `/${this.$i18n.locale}/${this.electionPath}` +
        makeNavigationPath(this.path.slice(0, index + 1))
      )
    },
  },
}
</script>

<style lang="postcss" scoped>
.breadcrumb-caret {
  @apply inline-block w-5 h-5 mx-2 transform -rotate-90 text-gray-300;
}
</style>
