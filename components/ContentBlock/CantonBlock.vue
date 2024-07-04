<template>
  <ol
    v-if="cantonService"
    v-show="show"
    class="flex flex-wrap"
    :aria-hidden="show"
  >
    <li v-for="canton in cantons" :key="canton" class="mb-4 mr-4">
      <a
        :href="getLink(canton)"
        class="canton--entry"
        :class="{ 'is-disabled': isDisabled(canton) }"
        target="_blank"
      >
        <span class="text-inherit">{{ canton }}</span>
      </a>
    </li>
  </ol>
</template>

<script>
const cantons = [
  'AG',
  'AI',
  'AR',
  'BE',
  'BL',
  'BS',
  'FR',
  'GE',
  'GL',
  'GR',
  'JU',
  'LU',
  'NE',
  'NW',
  'OW',
  'SG',
  'SH',
  'SO',
  'SZ',
  'TG',
  'TI',
  'UR',
  'VD',
  'VS',
  'ZG',
  'ZH',
]

export default {
  props: {
    cantonService: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cantons,
      show: false,
    }
  },
  methods: {
    getLink(canton) {
      return this.cantonService.metadata[`${canton}-data`]
    },
    isDisabled(canton) {
      return !this.getLink(canton)
    },
    showBlock() {
      this.show = true
    },
  },
}
</script>

<style lang="postcss" scoped>
.canton--entry {
  @apply w-12 h-12;
  @apply flex items-center justify-center;
  @apply border-2 border-primary-blue;
  @apply text-center no-underline hover:bg-primary-blue hover:text-primary-white;

  &.is-disabled {
    @apply text-gray-300 cursor-not-allowed hover:bg-primary-white hover:text-gray-300;
  }
}
</style>
