<template>
  <component :is="component">
    <button
      class="disabled:text-gray-300 disabled:cursor-not-allowed"
      :disabled="isSearchPage"
      :aria-label="$t('searchButtonAlt')"
      @click="toggleSearch"
    >
      <svg-icon
        class="w-6 h-6 fill-current"
        :name="isSearchOpen ? 'close-small' : 'search'"
      />
      <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns -->
      <span class="hidden">
        {{ $t('searchButtonTitle') }}
      </span>
    </button>
  </component>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    isMobile: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapState('global', ['isSearchOpen']),
    component() {
      return this.isMobile ? 'div' : 'header'
    },
    isSearchPage() {
      if (!this.$route) {
        return false
      }
      // Should be save enough because the name is search__de, search__fr ...
      return this.$route.name.startsWith('search__')
    },
  },
  methods: {
    ...mapMutations('global', ['toggleSearch']),
  },
}
</script>
