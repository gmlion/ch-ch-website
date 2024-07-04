<template>
  <div
    role="combobox"
    aria-haspopup="listbox"
    :aria-expanded="isSearchResultsOpen.toString()"
    class="relative max-w-full w-112"
  >
    <div class="flex flex-col-reverse">
      <input
        :id="`input-${id}`"
        role="searchbox"
        aria-autocomplete="list"
        :aria-controls="searchResultsId"
        class="w-full p-3 border rounded pr-14 border-primary-blue search-input"
        :placeholder="placeholder"
        :aria-activedescendant="activeDescendant"
        @input="onChange"
        @keydown.down="onKeyboardDown"
        @keydown.up="onKeyboardUp"
        @keyup.enter="selectResult"
      />
      <label :for="`input-${id}`" class="w-48 md:w-112 cursor-text">
        <span>{{ placeholder }}</span>
      </label>
      <button :aria-label="ariaLabel" @click="selectResult">
        <svg-icon
          name="search"
          class="w-6 h-6 absolute right-[20px] top-[32px] fill-current"
        />
      </button>
    </div>

    <ul
      v-show="isSearchResultsOpen"
      :id="searchResultsId"
      ref="scrollContainer"
      role="listbox"
      class="search-results"
    >
      <li v-if="searchResults.length === 0" class="text-gray-300">
        {{ $t('noResults') }}
      </li>
      <li
        v-for="(searchResult, i) in searchResults"
        :id="getId(i)"
        :key="getId(i)"
        ref="options"
        role="option"
        :class="{ 'bg-primary-blue text-primary-white': isSelected(i) }"
        :aria-selected="isSelected(i)"
        @click="updateSelected(searchResult)"
      >
        {{ searchResult.metadata.commune }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    ariaLabel: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      id: '',
      isSearchResultsOpen: false,
      searchResults: [],
      searchText: '',
      resultIndex: 0,
      activeDescendant: '',
    }
  },
  computed: {
    searchResultsId() {
      return `results-${this.id}`
    },
  },
  mounted() {
    this.id = Math.random().toString(36).slice(-6)
    window.addEventListener('click', this.handleOutsideClick)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.isSearchResultsOpen = false
      }
    },
    onChange(e) {
      this.searchText = e.target.value

      if (this.searchText.length > 1) {
        this.filterResults()
        this.isSearchResultsOpen = true
      } else {
        this.isSearchResultsOpen = false
      }
    },
    filterResults() {
      this.searchResults = this.items.filter((item) =>
        item.metadata.commune
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      )
      this.resultIndex = 0
    },
    getId(index) {
      return `result-${this.id}-${index}`
    },
    updateSelected(searchResult) {
      this.searchText = searchResult.metadata.commune
      this.isSearchResultsOpen = false
      this.$emit('selected', searchResult)
    },
    onKeyboardDown() {
      if (
        this.isSearchResultsOpen &&
        this.resultIndex < this.searchResults.length - 1
      ) {
        this.resultIndex++
        this.fixScrolling()
      }
    },
    onKeyboardUp() {
      if (this.isSearchResultsOpen && this.resultIndex > 0) {
        this.resultIndex--
        this.fixScrolling()
      }
    },
    isSelected(index) {
      return index === this.resultIndex
    },
    selectResult() {
      this.updateSelected(this.searchResults[this.resultIndex])
    },
    fixScrolling() {
      // Fix scrolling so the dropdown is scrolling on arrow navigation
      const clientHeight = this.$refs.options[this.resultIndex].clientHeight
      this.$refs.scrollContainer.scrollTop = clientHeight * this.resultIndex
    },
    setActiveDescendant() {
      this.activeDescendant = this.getId(this.resultIndex)
    },
  },
}
</script>

<style lang="postcss" scoped>
.search-results {
  @apply absolute z-50;
  @apply w-full max-h-48;
  @apply overflow-auto;
  @apply border-gray-900 border border-solid rounded;
  @apply text-primary-blue;
  @apply bg-primary-white;

  & li {
    @apply px-3;
  }
}

input:placeholder-shown + label {
  transform-origin: left bottom;
  transform: translate(0, 36px) scale(1.2);
}

label {
  @apply transition-all duration-200;
  @apply ml-2;
  @apply text-sm;

  & span {
    @apply bg-primary-white;
    @apply px-1;
  }
}

input:not(:placeholder-shown) + label,
input:focus + label {
  transform: translate(0, 12px) scale(1);
}

::-webkit-input-placeholder {
  opacity: 0;
  transition: inherit;
}
</style>
