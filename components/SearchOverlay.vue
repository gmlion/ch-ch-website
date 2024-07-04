<template>
  <div
    tabindex="0"
    :class="[widthClasses, leftClasses]"
    class="fixed top-0 left-0 z-30 w-full h-screen px-4 pt-5 bg-primary-yellow lg:pt-36"
  >
    <div class="w-full m-auto lg:w-112">
      <div class="flex justify-between mb-24 lg:mb-12">
        <h2 class="text-3xl lg:text-4xl pt-7">{{ $t('search') }}</h2>
        <div class="lg:hidden">
          <button class="text-primary-blue" @click="toggleSearch">
            <svg-icon class="w-8 h-8 fill-current" name="close-small" />
            <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#accessibility_concerns -->
            <span class="hidden">
              {{ $t('toggleSearchButtonTitle') }}
            </span>
          </button>
        </div>
      </div>
      <search-input id="search-input" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SearchInput from './SearchInput.vue'

export default {
  name: 'SearchOverlay',
  components: { SearchInput },
  props: {
    divisionMode: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    ...mapState('global', ['isSearchOpen']),
    widthClasses() {
      return {
        'lg:w-3/5': this.divisionMode === 'fifths' && !this.isOpen,
        'lg:w-1/2': this.divisionMode === 'halves' && !this.isOpen,
      }
    },
    // these are to position the fixed element on the right side
    leftClasses() {
      return {
        'lg:left-2/5': this.divisionMode === 'fifths' && !this.isOpen,
        'lg:left-1/2': this.divisionMode === 'halves' && !this.isOpen,
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.onEscape)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onEscape)
  },
  methods: {
    ...mapMutations('global', ['toggleSearch']),
    onEscape(event) {
      if (event.key === 'Escape' && this.isSearchOpen) {
        this.toggleSearch()
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.search-input:focus {
  outline: none;
  border: none;
}
.search-input::placeholder {
  @apply text-primary-blue font-normal;
}
</style>
